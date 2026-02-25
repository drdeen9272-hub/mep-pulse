import { motion } from "framer-motion";
import { eliminationScore } from "@/data/misData";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

function getGrade(score: number) {
  if (score >= 80) return { grade: "A", color: "text-success", label: "On Track" };
  if (score >= 60) return { grade: "B", color: "text-secondary", label: "Progressing" };
  if (score >= 40) return { grade: "C", color: "text-accent", label: "Off Track" };
  return { grade: "D", color: "text-destructive", label: "Critical" };
}

export default function EliminationScore() {
  const { overall, components } = eliminationScore;
  const { grade, color, label } = getGrade(overall);

  return (
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
        </div>
      </div>

      {/* Component breakdown */}
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {components.map((c, i) => {
          const { color: cColor } = getGrade(c.score);
          return (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-3 rounded-lg border bg-card/50 p-3"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{c.label}</span>
                  <span className={cn("font-bold", cColor)}>{c.score}/100</span>
                </div>
                <Progress value={c.score} className="h-2" />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Current: {c.current}{c.unit}</span>
                  <span>Target: {c.target}{c.unit}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
