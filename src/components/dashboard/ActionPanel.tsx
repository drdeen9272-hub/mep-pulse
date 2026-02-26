import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Clock, CalendarDays, Target } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { eliminationScore } from "@/data/misData";
import { nigeriaWMR2025 } from "@/data/wmr2025Data";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dashboard-actions`;

interface ActionResponse {
  shortTerm: string;
  mediumTerm: string;
  longTerm: string;
}

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

export default function ActionPanel() {
  const [actions, setActions] = useState<ActionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateActions = async () => {
    setLoading(true);
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

      if (resp.status === 429) {
        setError("Rate limit reached. Please try again in a moment.");
        return;
      }
      if (resp.status === 402) {
        setError("AI credits exhausted. Please top up your workspace.");
        return;
      }
      if (!resp.ok) throw new Error("Failed to generate actions");

      const data = await resp.json();
      setActions(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const sections = actions ? [
    { title: "Short Term (0–3 months)", icon: <Clock className="h-4 w-4 text-destructive" />, content: actions.shortTerm },
    { title: "Medium Term (3–12 months)", icon: <CalendarDays className="h-4 w-4 text-accent" />, content: actions.mediumTerm },
    { title: "Long Term (1–3 years)", icon: <Target className="h-4 w-4 text-secondary" />, content: actions.longTerm },
  ] : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border-2 border-accent/20 bg-gradient-to-br from-accent/5 via-card to-primary/5 p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            "So what should I do about this?"
          </h2>
          <p className="text-xs text-muted-foreground">
            AI-generated action recommendations based on current dashboard indicators
          </p>
        </div>
        <Button onClick={generateActions} disabled={loading} size="sm" variant="default">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Analyzing..." : actions ? "Refresh" : "Generate Actions"}
        </Button>
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
      )}

      <AnimatePresence mode="wait">
        {actions && (
          <motion.div
            key="actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid gap-4 md:grid-cols-3"
          >
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border bg-card p-4 shadow-sm"
              >
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  {section.icon}
                  {section.title}
                </h3>
                <div className="prose prose-sm max-w-none text-xs text-muted-foreground [&_ul]:space-y-1 [&_li]:leading-relaxed">
                  <ReactMarkdown>{section.content}</ReactMarkdown>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!actions && !loading && !error && (
        <div className="rounded-lg border border-dashed border-muted-foreground/20 p-8 text-center text-sm text-muted-foreground">
          Click "Generate Actions" to get AI-powered recommendations based on the current state of Nigeria's malaria elimination indicators.
        </div>
      )}
    </motion.div>
  );
}
