import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Building2, ShieldCheck, Microscope, BarChart3, DollarSign,
  Target, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp, Info,
} from "lucide-react";
import {
  nmspObjectives, nmspGoals, previousNMSPPerformance, stratificationBands,
  nmspInterventionData, type NMSPObjective,
} from "@/data/wmr2025Data";
import { nigeriaStates } from "@/data/nigeriaData";
import { Progress } from "@/components/ui/progress";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, Legend, ReferenceLine,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";
import ExportButton from "@/components/ExportButton";

// WHO MPR rating methodology
function getRating(score: number): { label: string; color: string; bg: string } {
  if (score >= 90) return { label: "High", color: "text-success", bg: "bg-success/10" };
  if (score >= 75) return { label: "Moderate", color: "text-accent", bg: "bg-accent/10" };
  return { label: "Low", color: "text-destructive", bg: "bg-destructive/10" };
}

const objectiveIcons = [Building2, ShieldCheck, Microscope, BarChart3, DollarSign];
const objectiveColors = [
  "hsl(var(--primary))",
  "hsl(145 60% 45%)",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(25 80% 55%)",
];

// Compute progress %: how far baseline has come toward target
function progressPct(baseline: number, current: number, target: number): number {
  if (target === baseline) return current >= target ? 100 : 0;
  return Math.min(100, Math.max(0, Math.round(((current - baseline) / (target - baseline)) * 100)));
}

export default function NMSPTracker() {
  const [expandedObj, setExpandedObj] = useState<number | null>(null);

  const overallPerf = previousNMSPPerformance.overallImplementationRate;
  const overallRating = getRating(overallPerf);

  // Radar data
  const radarData = nmspObjectives.map((obj) => {
    const perf = previousNMSPPerformance.objectivePerformance.find(o => o.id === obj.id);
    return {
      subject: obj.shortTitle,
      baseline: typeof obj.baseline === "number" ? obj.baseline : 0,
      target: typeof obj.target2030 === "number" ? obj.target2030 : 0,
      current: perf?.avg ?? 0,
    };
  });

  // Year-over-year trend data for all objectives
  const yearLabels = ["2021", "2022", "2023", "2024"];
  const trendData = yearLabels.map((year) => {
    const row: Record<string, string | number> = { year };
    previousNMSPPerformance.objectivePerformance.forEach((perf) => {
      const key = `y${year}` as keyof typeof perf;
      row[`obj${perf.id}`] = (perf[key] as number) ?? 0;
    });
    return row;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container py-6"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">NMSP 2026–2030 Progress Tracker</h1>
          <p className="text-sm text-muted-foreground">
            Tracking Nigeria's 5 strategic objectives against the WHO MPR performance rating methodology.
            Overall previous NMSP implementation:{" "}
            <span className={cn("font-bold", overallRating.color)}>{overallPerf}% ({overallRating.label})</span>
          </p>
        </div>
        <ExportButton />
      </div>

      {/* Goals summary strip */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <GoalCard label="Prevalence Reduction" value={`${nmspGoals.national.prevalenceReductionPct}%`} sub={`From ${nmspGoals.national.baselinePrevalence2025}% → ${nmspGoals.national.targetPrevalence2030}%`} />
        <GoalCard label="Mortality Reduction" value={`${nmspGoals.national.mortalityReductionPct}%`} sub="From 2025 levels by 2030" />
        <GoalCard label="Under-5 Mortality" value={`${nmspGoals.national.baselineUnder5Mortality}/1000`} sub="Baseline (NDHS 2024)" />
        <GoalCard label="Population" value={`${(nmspInterventionData.population2025 / 1_000_000).toFixed(0)}M`} sub={`${nmspInterventionData.under15Pct}% under 15`} />
      </div>

      {/* Rating methodology legend */}
      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border bg-card p-4">
        <div className="flex items-center gap-1.5">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-semibold">WHO MPR Rating Scale:</span>
        </div>
        <RatingBadge label="High" range="≥90%" color="text-success" bg="bg-success/10" />
        <RatingBadge label="Moderate" range="75–89%" color="text-accent" bg="bg-accent/10" />
        <RatingBadge label="Low" range="<75%" color="text-destructive" bg="bg-destructive/10" />
      </div>

      {/* Radar overview + Trend chart */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        {/* Radar */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">Objective Performance vs Targets</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9 }} />
              <Radar name="Target 2030" dataKey="target" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.1} strokeDasharray="5 3" />
              <Radar name="Current (MPR)" dataKey="current" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.25} strokeWidth={2} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Trend lines */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">Year-over-Year Implementation Trend (2021–2024)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${v}%`} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <ReferenceLine y={75} stroke="hsl(var(--accent))" strokeDasharray="6 3" label={{ value: "Moderate", position: "insideTopRight", fontSize: 9 }} />
              {previousNMSPPerformance.objectivePerformance.map((perf, i) => (
                <Line
                  key={perf.id}
                  type="monotone"
                  dataKey={`obj${perf.id}`}
                  name={nmspObjectives[i]?.shortTitle ?? perf.title}
                  stroke={objectiveColors[i]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Objective detail cards */}
      <div className="space-y-4">
        {nmspObjectives.map((obj, i) => {
          const perf = previousNMSPPerformance.objectivePerformance.find(o => o.id === obj.id);
          const rating = getRating(perf?.avg ?? 0);
          const Icon = objectiveIcons[i];
          const isExpanded = expandedObj === obj.id;
          const baseline = typeof obj.baseline === "number" ? obj.baseline : 0;
          const target = typeof obj.target2030 === "number" ? obj.target2030 : 0;
          const current = perf?.avg ?? baseline;
          const progress = progressPct(baseline, current, target);
          const trend = perf
            ? perf.y2024 > perf.y2021 ? "improving" : perf.y2024 < perf.y2021 ? "declining" : "stable"
            : "stable";

          return (
            <motion.div
              key={obj.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border bg-card shadow-sm overflow-hidden"
            >
              {/* Main row */}
              <button
                onClick={() => setExpandedObj(isExpanded ? null : obj.id)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${objectiveColors[i]}15` }}>
                  <Icon className="h-5 w-5" style={{ color: objectiveColors[i] }} />
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground">Obj {obj.id}</span>
                    <span className="text-sm font-semibold truncate">{obj.shortTitle}</span>
                    {trend === "improving" && <TrendingUp className="h-3.5 w-3.5 text-success flex-shrink-0" />}
                    {trend === "declining" && <TrendingDown className="h-3.5 w-3.5 text-destructive flex-shrink-0" />}
                    {trend === "stable" && <Minus className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />}
                  </div>
                  <Progress value={progress} className="h-2.5" />
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span>Baseline: {obj.baseline}{obj.unit}</span>
                    <span>Current: {current}{obj.unit}</span>
                    <span className="font-semibold">Target: {obj.target2030}{obj.unit}</span>
                    <span className="ml-auto">{progress}% to target</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <span className={cn("text-lg font-bold", rating.color)}>{perf?.avg ?? "–"}%</span>
                  <span className={cn("text-[10px] font-semibold rounded-full px-2 py-0.5", rating.bg, rating.color)}>
                    {rating.label}
                  </span>
                </div>

                {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
              </button>

              {/* Expanded detail */}
              <AnimatePresence>
                {isExpanded && perf && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t"
                  >
                    <div className="p-5 space-y-4">
                      <p className="text-xs text-muted-foreground">{obj.title}</p>

                      {/* Year bars */}
                      <div className="rounded-lg border p-4">
                        <h4 className="mb-2 text-xs font-semibold">Annual Performance (2021–2024)</h4>
                        <ResponsiveContainer width="100%" height={180}>
                          <BarChart data={[
                            { year: "2021", value: perf.y2021 },
                            { year: "2022", value: perf.y2022 },
                            { year: "2023", value: perf.y2023 },
                            { year: "2024", value: perf.y2024 },
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                            <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                            <ReferenceLine y={75} stroke="hsl(var(--accent))" strokeDasharray="6 3" />
                            <ReferenceLine y={90} stroke="hsl(var(--success))" strokeDasharray="6 3" />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                              {[perf.y2021, perf.y2022, perf.y2023, perf.y2024].map((v, idx) => (
                                <Cell key={idx} fill={v >= 90 ? "hsl(145 60% 45%)" : v >= 75 ? "hsl(var(--accent))" : objectiveColors[i]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Gap analysis */}
                      <div className="grid grid-cols-3 gap-3">
                        <MiniStat label="Gap to Target" value={`${target - current}${obj.unit}`} sub="Remaining improvement needed" />
                        <MiniStat label="Avg. Annual Growth Needed" value={`${((target - current) / 5).toFixed(1)}${obj.unit}/yr`} sub="To reach 2030 target" />
                        <MiniStat
                          label="Best Year"
                          value={`${Math.max(perf.y2021, perf.y2022, perf.y2023, perf.y2024)}%`}
                          sub={`in ${perf.y2024 === Math.max(perf.y2021, perf.y2022, perf.y2023, perf.y2024) ? "2024" : perf.y2023 === Math.max(perf.y2021, perf.y2022, perf.y2023, perf.y2024) ? "2023" : perf.y2022 === Math.max(perf.y2021, perf.y2022, perf.y2023, perf.y2024) ? "2022" : "2021"}`}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Stratification summary */}
      <div className="mt-8 rounded-xl border bg-card p-5 shadow-sm">
        <h3 className="mb-3 font-heading text-sm font-semibold">NMSP Transmission Stratification — State Distribution</h3>
        <p className="mb-4 text-xs text-muted-foreground">
          No states currently classified as high burden (&gt;35%). The NMSP targets very low prevalence in low-prev states,
          60% reduction in moderate states, and 30% reduction in formerly high states by 2030.
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {stratificationBands.map((band) => {
            const count = nigeriaStates.filter((s) => s.transmissionBand === band.key).length;
            return (
              <div key={band.key} className="rounded-lg border p-3 text-center" style={{ borderTopColor: band.color, borderTopWidth: 3 }}>
                <p className="text-2xl font-bold" style={{ color: band.color }}>{count}</p>
                <p className="text-xs font-semibold">{band.label}</p>
                <p className="text-[9px] text-muted-foreground">{band.prevalenceRange}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Source */}
      <p className="mt-6 text-[10px] text-muted-foreground italic text-center">
        Source: Draft NMSP 2026–2030, Federal Ministry of Health & Social Welfare / NMEP, November 2025.
        Performance data from Malaria Programme Review (MPR) 2025. Rating methodology: WHO MPR Guide (High ≥90%, Moderate 75–89%, Low &lt;75%).
      </p>
    </motion.div>
  );
}

// --- Sub-components ---

function GoalCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm text-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-[10px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function MiniStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg bg-muted/50 p-3 text-center">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="text-sm font-bold">{value}</p>
      <p className="text-[9px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function RatingBadge({ label, range, color, bg }: { label: string; range: string; color: string; bg: string }) {
  return (
    <span className={cn("text-[10px] font-semibold rounded-full px-2.5 py-1", bg, color)}>
      {label} ({range})
    </span>
  );
}
