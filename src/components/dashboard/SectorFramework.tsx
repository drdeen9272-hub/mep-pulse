import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Building2, ShieldCheck, Microscope, BarChart3, DollarSign,
  ArrowRight, Target, ChevronDown, ChevronUp, X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { nmspObjectives, stratificationBands, previousNMSPPerformance, nmspInterventionData } from "@/data/wmr2025Data";
import { eliminationScore } from "@/data/misData";

const objectiveCards = [
  {
    objectiveId: 1,
    icon: Building2,
    label: "Governance & Capacity",
    sub: "Leadership, SWAp, Coordination",
    link: "/dashboard/data-quality",
    color: "text-primary",
    bg: "bg-primary/10",
    metrics: ["62% baseline (MPR)", "Target: 90% by 2030"],
    strategies: [
      "Integrate malaria into national & subnational plans",
      "Deploy ALMA scorecard & accountability framework",
      "Strengthen multi-sectoral coordination (SWAp/PVAC)",
      "Scale up private sector partnerships",
    ],
  },
  {
    objectiveId: 2,
    icon: ShieldCheck,
    label: "Prevention Access",
    sub: "ITN, IRS, SMC, IPTp, Vaccine",
    link: "/dashboard/chemoprevention",
    color: "text-success",
    bg: "bg-success/10",
    metrics: [`${nmspInterventionData.itnHouseholdOwnership2024}% ITN ownership`, `${nmspInterventionData.smcStates} SMC states`],
    strategies: [
      "Deploy stratified IVM by transmission intensity band",
      "Scale SMC/PMC/IPTp/IPTsc in eligible populations",
      "Expand R21 malaria vaccine rollout nationally",
      "Entomological surveillance & insecticide resistance monitoring",
    ],
  },
  {
    objectiveId: 3,
    icon: Microscope,
    label: "Diagnosis & Treatment",
    sub: "RDT, ACT, iCCM, MFT",
    link: "/dashboard/diagnostics",
    color: "text-secondary",
    bg: "bg-secondary/10",
    metrics: [`${nmspInterventionData.actEfficacy}% ACT efficacy`, `TPR: ${nmspInterventionData.tprDecline.to}%`],
    strategies: [
      "Parasitological confirmation in all facilities (public & private)",
      "Scale community case management (iCCM/CBHWP)",
      "Pilot Multiple First Line Therapy (MFT)",
      "Active case detection in pre-elimination settings",
    ],
  },
  {
    objectiveId: 4,
    icon: BarChart3,
    label: "Surveillance Systems",
    sub: "DHIS2, NMDR, Entomological",
    link: "/surveillance/case-based",
    color: "text-accent",
    bg: "bg-accent/10",
    metrics: [`${nmspInterventionData.surveillanceCoverage2022}% cases tracked`, "Target: 70% by 2030"],
    strategies: [
      "Expand digital reporting & EMR standardization",
      "Strengthen NMDR integration of all data sources",
      "Improve data quality, dashboards & automated alerts",
      "Scale entomological & drug efficacy surveillance",
    ],
  },
  {
    objectiveId: 5,
    icon: DollarSign,
    label: "Domestic Financing",
    sub: "DRM, BHCPF, NHIA, PPP",
    link: "/dashboard/financing",
    color: "text-primary",
    bg: "bg-primary/10",
    metrics: [`${nmspInterventionData.oopExpenditure2024}% OOP spending`, `Health: ${nmspInterventionData.healthBudgetPctOfNational} of budget`],
    strategies: [
      "Mobilize 80% resources from domestic sources",
      "Leverage BHCPF & NHIA for malaria financial protection",
      "Institutionalize Public-Private-Philanthropic Partnerships",
      "Establish End Malaria Fund at state level",
    ],
  },
];

// Intervention mixes per transmission band from NMSP Table 3
const interventionMixes: Record<string, string[]> = {
  very_low: ["ITN continuous (risk groups)", "Targeted IRS in active foci", "LSM where feasible", "Active case detection"],
  low_b: ["ITN continuous (risk groups)", "Targeted IRS in hotspots", "LSM in urban areas", "Active case detection"],
  low_a: ["Targeted ITN mass distribution", "ITN continuous", "Targeted IRS", "LSM in urban/semi-urban"],
  moderate_b: ["ITN mass distribution", "ITN continuous", "Targeted IRS in hotspots", "LSM in urban/semi-urban"],
  moderate_a: ["ITN mass + continuous", "Targeted IRS in hotspots", "LSM where feasible", "SMC/PMC in eligible LGAs"],
};

export default function SectorFramework() {
  const [expandedObj, setExpandedObj] = useState<number | null>(null);
  const [showBands, setShowBands] = useState(false);

  return (
    <div className="rounded-2xl border-2 border-primary/15 bg-gradient-to-br from-primary/5 via-card to-secondary/5 p-6">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <Target className="h-5 w-5 text-primary" />
        <div>
          <h3 className="font-heading text-base font-bold">NMSP 2026–2030 Strategic Framework</h3>
          <p className="text-xs text-muted-foreground">
            Five strategic objectives driving Nigeria's malaria elimination response. Click any objective to see sub-strategies.
          </p>
        </div>
      </div>

      {/* Objectives flow */}
      <div className="flex flex-wrap items-stretch justify-center gap-2 md:gap-1">
        {objectiveCards.map((p, i) => {
          const perf = previousNMSPPerformance.objectivePerformance.find(o => o.id === p.objectiveId);
          const isExpanded = expandedObj === p.objectiveId;

          return (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-1"
            >
              <div className="flex flex-col w-[140px] md:w-[155px]">
                <Link
                  to={p.link}
                  className={cn(
                    "group flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-all hover:shadow-md hover:border-primary/30",
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
                  {perf && (
                    <p className={cn(
                      "text-[9px] font-bold rounded px-1.5 py-0.5",
                      perf.avg >= 75 ? "text-success bg-success/10" : perf.avg >= 60 ? "text-accent bg-accent/10" : "text-destructive bg-destructive/10",
                    )}>
                      MPR Avg: {perf.avg}%
                    </p>
                  )}
                </Link>

                {/* Expand strategies */}
                <button
                  onClick={() => setExpandedObj(isExpanded ? null : p.objectiveId)}
                  className="mt-1 flex items-center justify-center gap-1 text-[9px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  {isExpanded ? "Hide" : "Strategies"}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-1 space-y-1 rounded-lg border bg-card p-2">
                        {p.strategies.map((s, si) => (
                          <li key={si} className="text-[9px] text-muted-foreground flex items-start gap-1">
                            <span className="mt-0.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {i < objectiveCards.length - 1 && (
                <ArrowRight className="h-3 w-3 text-muted-foreground/40 hidden md:block flex-shrink-0" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Convergence to score */}
      <div className="mt-5 flex flex-col items-center gap-1">
        <div className="h-6 w-px bg-gradient-to-b from-primary/30 to-primary" />
        <div className="rounded-full bg-primary/10 border border-primary/30 px-4 py-1.5 text-center">
          <p className="text-xs font-bold text-primary">→ Elimination Tracking Score: {eliminationScore.overall}/100</p>
          <p className="text-[9px] text-muted-foreground">
            {eliminationScore.overall >= 80 ? "Grade A — On Track" :
             eliminationScore.overall >= 60 ? "Grade B — Progressing" :
             eliminationScore.overall >= 40 ? "Grade C — Off Track" : "Grade D — Critical"} | Target: 80+ by 2030
          </p>
        </div>
      </div>

      {/* Stratification bands toggle */}
      <div className="mt-5">
        <button
          onClick={() => setShowBands(!showBands)}
          className="flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
        >
          {showBands ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          Transmission Stratification & Intervention Mixes
        </button>

        <AnimatePresence>
          {showBands && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 grid gap-2 md:grid-cols-5">
                {stratificationBands.map((band) => (
                  <div
                    key={band.key}
                    className="rounded-lg border p-3 space-y-2"
                    style={{ borderLeftColor: band.color, borderLeftWidth: 3 }}
                  >
                    <div>
                      <p className="text-xs font-bold" style={{ color: band.color }}>{band.label}</p>
                      <p className="text-[9px] text-muted-foreground">Prevalence: {band.prevalenceRange}</p>
                    </div>
                    <ul className="space-y-0.5">
                      {interventionMixes[band.key]?.map((int, idx) => (
                        <li key={idx} className="text-[9px] text-muted-foreground flex items-start gap-1">
                          <span className="mt-0.5 h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: band.color }} />
                          {int}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[9px] text-muted-foreground italic">
                Source: NMSP 2026–2030, Table 3 — Sub-national tailoring (SNT) of interventions by LGA transmission intensity.
                No states currently classified as high burden (&gt;35%). Core interventions (case management, IPTp, ITN) deployed across all bands.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
