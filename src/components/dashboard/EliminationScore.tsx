import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { eliminationScore } from "@/data/misData";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

function getGrade(score: number) {
  if (score >= 80) return { grade: "A", color: "text-success", label: "On Track" };
  if (score >= 60) return { grade: "B", color: "text-secondary", label: "Progressing" };
  if (score >= 40) return { grade: "C", color: "text-accent", label: "Off Track" };
  return { grade: "D", color: "text-destructive", label: "Critical" };
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "improving") return <TrendingUp className="h-3.5 w-3.5 text-success" />;
  if (trend === "declining") return <TrendingDown className="h-3.5 w-3.5 text-destructive" />;
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
}

type Component = (typeof eliminationScore.components)[number];

function TrendModal({ component, onClose }: { component: Component; onClose: () => void }) {
  const data = component.history.map(h => ({ ...h, target: component.target }));
  const isInverse = component.label.includes("Prevalence"); // lower is better

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="font-heading text-base font-bold">{component.label}</h3>
            <p className="text-xs text-muted-foreground">
              Longitudinal trend — {isInverse ? "lower is better" : "higher is better"}
            </p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-4 flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <TrendIcon trend={component.trend} />
            <span className={cn(
              "font-medium",
              component.trend === "improving" ? "text-success" : component.trend === "declining" ? "text-destructive" : "text-muted-foreground"
            )}>
              {component.trend === "improving" ? "Momentum building" : component.trend === "declining" ? "Losing momentum" : "Stagnant"}
            </span>
          </span>
          <span className="text-muted-foreground">
            Current: {component.current}{component.unit} → Target: {component.target}{component.unit}
          </span>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, "auto"]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${v}%`} />
            <ReferenceLine y={component.target} stroke="hsl(var(--secondary))" strokeDasharray="6 3" label={{ value: `Target: ${component.target}%`, position: "insideTopRight", fontSize: 10, fill: "hsl(var(--secondary))" }} />
            <Line type="monotone" dataKey="value" name={component.label} stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
          {component.trend === "improving"
            ? `✅ Progress is positive. ${isInverse ? "Prevalence declining" : "Coverage increasing"} across survey periods. Sustain current interventions.`
            : component.trend === "declining"
            ? `⚠️ Momentum has reversed. ${component.label} was higher in earlier surveys. Investigate supply chain, distribution, or behavioral factors.`
            : `➡️ Indicator has plateaued. New strategies may be needed to break through the current level.`}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function EliminationScore() {
  const { overall, components } = eliminationScore;
  const { grade, color, label } = getGrade(overall);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-card to-secondary/5 p-6"
      >
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
          {/* Big score ring */}
          <div className="relative flex h-40 w-40 flex-shrink-0 items-center justify-center">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
              <motion.circle
                cx="60" cy="60" r="52" fill="none"
                stroke="hsl(var(--secondary))"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 52}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - overall / 100) }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className={cn("font-heading text-4xl font-bold", color)}>{overall}</span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
          </div>

          <div className="flex-1 space-y-1 text-center md:text-left">
            <h2 className="font-heading text-xl font-bold">Malaria Elimination Tracking Score</h2>
            <p className="text-sm text-muted-foreground">
              Composite score based on 7 key MIS 2021 indicators weighted against Nigeria's 2025 NMSP targets.
            </p>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <span className={cn("text-3xl font-bold", color)}>Grade {grade}</span>
              <span className="rounded-full bg-muted px-3 py-0.5 text-xs font-medium">{label}</span>
            </div>
            <p className="text-[11px] text-muted-foreground">Click any indicator below to see its longitudinal trend →</p>
          </div>
        </div>

        {/* Component breakdown */}
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {components.map((c, i) => {
            const { color: cColor } = getGrade(c.score);
            return (
              <motion.button
                key={c.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-3 rounded-lg border bg-card/50 p-3 text-left transition-colors hover:bg-muted/60 cursor-pointer"
                onClick={() => setSelectedComponent(c)}
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-medium">
                      <TrendIcon trend={c.trend} />
                      {c.label}
                    </span>
                    <span className={cn("font-bold", cColor)}>{c.score}/100</span>
                  </div>
                  <Progress value={c.score} className="h-2" />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Current: {c.current}{c.unit}</span>
                    <span>Target: {c.target}{c.unit}</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedComponent && (
          <TrendModal component={selectedComponent} onClose={() => setSelectedComponent(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
