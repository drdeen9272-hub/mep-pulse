import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Clock, CalendarDays, Target, CheckCircle2, Circle, AlertTriangle, PlayCircle, Trash2, Plus, PartyPopper } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { eliminationScore } from "@/data/misData";
import { nigeriaWMR2025 } from "@/data/wmr2025Data";
import { supabase } from "@/integrations/supabase/client";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dashboard-actions`;

type ActionStatus = "pending" | "in_progress" | "completed" | "off_track";
type Timeline = "short_term" | "medium_term" | "long_term";

interface ActionItem {
  id: string;
  country_code: string;
  timeline: Timeline;
  title: string;
  description: string | null;
  status: ActionStatus;
  priority: number;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  due_date: string | null;
  notes: string | null;
  created_by: string | null;
}

const statusConfig: Record<ActionStatus, { icon: React.ReactNode; label: string; className: string }> = {
  pending: { icon: <Circle className="h-4 w-4" />, label: "Pending", className: "text-muted-foreground" },
  in_progress: { icon: <PlayCircle className="h-4 w-4 text-primary" />, label: "In Progress", className: "text-primary" },
  completed: { icon: <CheckCircle2 className="h-4 w-4 text-green-600" />, label: "Completed", className: "text-green-600" },
  off_track: { icon: <AlertTriangle className="h-4 w-4 text-destructive" />, label: "Off Track", className: "text-destructive" },
};

const timelineConfig: Record<Timeline, { title: string; icon: React.ReactNode; color: string }> = {
  short_term: { title: "Short Term (0–3 months)", icon: <Clock className="h-4 w-4 text-destructive" />, color: "border-destructive/30" },
  medium_term: { title: "Medium Term (3–12 months)", icon: <CalendarDays className="h-4 w-4 text-accent" />, color: "border-accent/30" },
  long_term: { title: "Long Term (1–3 years)", icon: <Target className="h-4 w-4 text-secondary" />, color: "border-secondary/30" },
};

const nextStatus: Record<ActionStatus, ActionStatus> = {
  pending: "in_progress",
  in_progress: "completed",
  completed: "pending",
  off_track: "in_progress",
};

function buildPromptContext() {
  const indicators = eliminationScore.components.map(c =>
    `${c.label}: ${c.current}${c.unit} (target: ${c.target}${c.unit}, trend: ${c.trend}, score: ${c.score}/100)`
  ).join("\n");

  return `Nigeria Malaria Elimination Dashboard Status:
Overall Elimination Score: ${eliminationScore.overall}/100
Nigeria accounts for ${nigeriaWMR2025.shareOfGlobalCases}% of global malaria cases and ${nigeriaWMR2025.shareOfGlobalDeaths}% of global malaria deaths.

Indicator Breakdown:
${indicators}

Key declining indicators: ${eliminationScore.components.filter(c => c.trend === "declining").map(c => c.label).join(", ")}
Key improving indicators: ${eliminationScore.components.filter(c => c.trend === "improving").map(c => c.label).join(", ")}`;
}

function parseActionsToItems(text: string, timeline: Timeline): Omit<ActionItem, "id" | "created_at" | "updated_at" | "completed_at">[] {
  // Extract bullet points from markdown
  const lines = text.split("\n").filter(l => l.trim().startsWith("-") || l.trim().startsWith("*") || l.trim().match(/^\d+\./));
  return lines.map((line, i) => {
    const cleaned = line.replace(/^[\s\-\*\d\.]+/, "").replace(/\*\*/g, "").trim();
    return {
      country_code: "NG",
      timeline,
      title: cleaned.slice(0, 120),
      description: cleaned.length > 120 ? cleaned : null,
      status: "pending" as ActionStatus,
      priority: i < 2 ? 1 : 2,
      due_date: null,
      notes: null,
      created_by: "ai",
    };
  }).filter(a => a.title.length > 5);
}

export default function ActionPanel() {
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [celebrateId, setCelebrateId] = useState<string | null>(null);

  // Load saved actions
  useEffect(() => {
    loadActions();
    // Subscribe to realtime updates
    const channel = supabase
      .channel("action_items")
      .on("postgres_changes", { event: "*", schema: "public", table: "action_items" }, () => {
        loadActions();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  async function loadActions() {
    setLoading(true);
    const { data, error: err } = await supabase
      .from("action_items")
      .select("*")
      .eq("country_code", "NG")
      .order("timeline")
      .order("priority")
      .order("created_at");
    if (err) setError(err.message);
    else setActions((data as ActionItem[]) || []);
    setLoading(false);
  }

  async function generateActions() {
    setGenerating(true);
    setError(null);
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ context: buildPromptContext() }),
      });
      if (resp.status === 429) { setError("Rate limit reached. Please try again in a moment."); return; }
      if (resp.status === 402) { setError("AI credits exhausted."); return; }
      if (!resp.ok) throw new Error("Failed to generate actions");

      const data = await resp.json();

      // Parse AI response into structured items and save to DB
      const allItems = [
        ...parseActionsToItems(data.shortTerm || "", "short_term"),
        ...parseActionsToItems(data.mediumTerm || "", "medium_term"),
        ...parseActionsToItems(data.longTerm || "", "long_term"),
      ];

      if (allItems.length > 0) {
        const { error: insertErr } = await supabase.from("action_items").insert(allItems);
        if (insertErr) throw new Error(insertErr.message);
        await loadActions();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setGenerating(false);
    }
  }

  async function toggleStatus(item: ActionItem) {
    const newStatus = nextStatus[item.status];
    const updates: Record<string, unknown> = { status: newStatus };
    if (newStatus === "completed") {
      updates.completed_at = new Date().toISOString();
      setCelebrateId(item.id);
      setTimeout(() => setCelebrateId(null), 2000);
    } else {
      updates.completed_at = null;
    }
    await supabase.from("action_items").update(updates).eq("id", item.id);
  }

  async function markOffTrack(item: ActionItem) {
    await supabase.from("action_items").update({ status: "off_track" }).eq("id", item.id);
  }

  async function deleteAction(id: string) {
    await supabase.from("action_items").delete().eq("id", id);
  }

  async function clearAll() {
    await supabase.from("action_items").delete().eq("country_code", "NG");
  }

  const grouped = {
    short_term: actions.filter(a => a.timeline === "short_term"),
    medium_term: actions.filter(a => a.timeline === "medium_term"),
    long_term: actions.filter(a => a.timeline === "long_term"),
  };

  const totalItems = actions.length;
  const completedItems = actions.filter(a => a.status === "completed").length;
  const offTrackItems = actions.filter(a => a.status === "off_track").length;
  const progressPct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border-2 border-accent/20 bg-gradient-to-br from-accent/5 via-card to-primary/5 p-6"
    >
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            Action Tracker — "So what should I do?"
          </h2>
          <p className="text-xs text-muted-foreground">
            AI-generated actions with persistent progress tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          {totalItems > 0 && (
            <Button onClick={clearAll} size="sm" variant="ghost" className="text-xs text-muted-foreground">
              <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear All
            </Button>
          )}
          <Button onClick={generateActions} disabled={generating} size="sm" variant="default">
            {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            {generating ? "Analyzing..." : "Generate New Actions"}
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      {totalItems > 0 && (
        <div className="mb-4 rounded-lg border bg-card p-3 shadow-sm">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-medium">Overall Progress</span>
            <span className="text-muted-foreground">
              {completedItems}/{totalItems} completed
              {offTrackItems > 0 && <span className="text-destructive ml-2">· {offTrackItems} off track</span>}
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">
            {progressPct === 100 ? "🎉 All actions completed!" :
             offTrackItems > 0 ? `⚠️ ${offTrackItems} item(s) off track — consider revising strategy` :
             progressPct > 50 ? "Good momentum! Keep pushing." :
             "Track progress by clicking status icons to advance items."}
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
      )}

      {/* Action items by timeline */}
      {totalItems > 0 ? (
        <div className="grid gap-4 md:grid-cols-3">
          {(["short_term", "medium_term", "long_term"] as Timeline[]).map(tl => {
            const config = timelineConfig[tl];
            const items = grouped[tl];
            return (
              <div key={tl} className={`rounded-xl border-2 ${config.color} bg-card p-4 shadow-sm`}>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  {config.icon}
                  {config.title}
                  <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px]">{items.length}</span>
                </h3>
                <div className="space-y-2">
                  <AnimatePresence>
                    {items.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className={`group relative rounded-lg border p-2.5 text-xs transition-colors hover:bg-muted/50 ${
                          item.status === "completed" ? "opacity-60" : ""
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <button
                            onClick={() => toggleStatus(item)}
                            className={`mt-0.5 flex-shrink-0 transition-transform hover:scale-110 ${statusConfig[item.status].className}`}
                            title={`Status: ${statusConfig[item.status].label}. Click to advance.`}
                          >
                            {statusConfig[item.status].icon}
                          </button>
                          <div className="flex-1 min-w-0">
                            <p className={`leading-relaxed ${item.status === "completed" ? "line-through" : ""}`}>
                              {item.title}
                            </p>
                            {item.status === "off_track" && (
                              <p className="mt-1 text-[10px] text-destructive">⚠️ This item needs attention — consider revising approach</p>
                            )}
                          </div>
                          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            {item.status !== "off_track" && item.status !== "completed" && (
                              <button onClick={() => markOffTrack(item)} className="text-destructive hover:text-destructive/80" title="Mark off track">
                                <AlertTriangle className="h-3 w-3" />
                              </button>
                            )}
                            <button onClick={() => deleteAction(item.id)} className="text-muted-foreground hover:text-destructive" title="Delete">
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Celebration animation */}
                        {celebrateId === item.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-2 -right-2 text-lg"
                          >
                            <PartyPopper className="h-5 w-5 text-yellow-500" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {items.length === 0 && (
                    <p className="text-[10px] text-muted-foreground text-center py-2">No actions yet</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : !loading && !generating ? (
        <div className="rounded-lg border border-dashed border-muted-foreground/20 p-8 text-center text-sm text-muted-foreground">
          Click "Generate New Actions" to get AI-powered recommendations that you can track, mark complete, and monitor over time.
        </div>
      ) : null}

      {(loading || generating) && !totalItems && (
        <div className="flex items-center justify-center py-8 text-muted-foreground text-sm gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {generating ? "AI is analyzing indicators..." : "Loading saved actions..."}
        </div>
      )}
    </motion.div>
  );
}
