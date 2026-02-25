import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Bug, Microscope, Pill, Package, DollarSign, BarChart3,
  ArrowRight, Target, ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: Bug,
    label: "Vector Control",
    sub: "ITN, IRS, Larval Source",
    link: "/dashboard/entomology",
    color: "text-primary",
    bg: "bg-primary/10",
    metrics: ["55% ITN access", "46% ITN use"],
  },
  {
    icon: Microscope,
    label: "Diagnosis",
    sub: "RDT, Microscopy, AI",
    link: "/dashboard/diagnostics",
    color: "text-secondary",
    bg: "bg-secondary/10",
    metrics: ["76% testing rate", "96.8% AI accuracy"],
  },
  {
    icon: Pill,
    label: "Treatment",
    sub: "ACT, Severe Malaria",
    link: "/dashboard/diagnostics",
    color: "text-accent",
    bg: "bg-accent/10",
    metrics: ["80% ACT rate", "67% compliance"],
  },
  {
    icon: ShieldCheck,
    label: "Prevention",
    sub: "SMC, IPTp, PMC, Vaccine",
    link: "/dashboard/chemoprevention",
    color: "text-success",
    bg: "bg-success/10",
    metrics: ["54M SMC children", "31% IPTp3+"],
  },
  {
    icon: Package,
    label: "Supply Chain",
    sub: "Commodities, Quality",
    link: "/dashboard/commodities",
    color: "text-primary",
    bg: "bg-primary/10",
    metrics: ["84.7% ACT stock", "47 LGA alerts"],
  },
  {
    icon: DollarSign,
    label: "Financing",
    sub: "Domestic & External",
    link: "/dashboard/financing",
    color: "text-accent",
    bg: "bg-accent/10",
    metrics: ["42% of need", "$4.2B gap"],
  },
  {
    icon: BarChart3,
    label: "Surveillance",
    sub: "Case-Based, DHIS2",
    link: "/surveillance/case-based",
    color: "text-secondary",
    bg: "bg-secondary/10",
    metrics: ["87% completeness", "Real-time"],
  },
];

export default function SectorFramework() {
  return (
    <div className="rounded-2xl border-2 border-primary/15 bg-gradient-to-br from-primary/5 via-card to-secondary/5 p-6">
      <div className="mb-4 flex items-center gap-3">
        <Target className="h-5 w-5 text-primary" />
        <div>
          <h3 className="font-heading text-base font-bold">Sector-Wide Malaria Elimination Framework</h3>
          <p className="text-xs text-muted-foreground">
            All thematic areas are interconnected — each pillar feeds into the national elimination score. Click any pillar to drill down.
          </p>
        </div>
      </div>

      {/* Flow diagram */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-1">
        {pillars.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-1"
          >
            <Link
              to={p.link}
              className={cn(
                "group flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-all hover:shadow-md hover:border-primary/30",
                "w-[110px] md:w-[120px]"
              )}
            >
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", p.bg)}>
                <p.icon className={cn("h-4 w-4", p.color)} />
              </div>
              <p className="text-xs font-semibold text-center leading-tight">{p.label}</p>
              <p className="text-[9px] text-muted-foreground text-center">{p.sub}</p>
              <div className="space-y-0.5 w-full">
                {p.metrics.map((m) => (
                  <p key={m} className="text-[9px] text-center font-medium text-muted-foreground bg-muted/50 rounded px-1 py-0.5">{m}</p>
                ))}
              </div>
            </Link>
            {i < pillars.length - 1 && (
              <ArrowRight className="h-3 w-3 text-muted-foreground/40 hidden md:block flex-shrink-0" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Convergence arrow */}
      <div className="mt-4 flex flex-col items-center gap-1">
        <div className="h-6 w-px bg-gradient-to-b from-primary/30 to-primary" />
        <div className="rounded-full bg-primary/10 border border-primary/30 px-4 py-1.5 text-center">
          <p className="text-xs font-bold text-primary">→ Elimination Tracking Score: 54/100</p>
          <p className="text-[9px] text-muted-foreground">Grade C — Off Track | Target: 80+ by 2030</p>
        </div>
      </div>
    </div>
  );
}
