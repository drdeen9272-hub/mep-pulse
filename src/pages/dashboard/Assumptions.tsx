import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, BookOpen, Database, Calculator, Globe, FileText } from "lucide-react";
import ExportButton from "@/components/ExportButton";

const dataSources = [
  {
    source: "WHO World Malaria Report 2025",
    scope: "Global & regional burden estimates, GTS progress, intervention coverage",
    period: "2000–2024",
    methodology: "Statistical modelling using routine surveillance data from 85 endemic countries, household surveys, and demographic data. Bayesian hierarchical models for case/death estimation.",
    limitations: "Estimates rely on reporting completeness; countries with weak HMIS may have wider confidence intervals. Nigeria's estimates carry ±15% uncertainty.",
    url: "https://iris.who.int/bitstream/handle/10665/381432/9789240117822-eng.pdf",
  },
  {
    source: "Nigeria Malaria Indicator Survey (MIS) 2021",
    scope: "Nationally representative household survey — prevalence, ITN, IPTp, care-seeking",
    period: "October–December 2021",
    methodology: "Two-stage cluster sampling: 568 clusters across 36 states + FCT. 13,727 households, 14,476 women 15–49, 11,103 children 6–59 months tested (RDT + microscopy).",
    limitations: "Cross-sectional design captures a single time point. Self-reported net use subject to recall/social desirability bias. No data on malaria in pregnancy outcomes.",
    url: "https://dhsprogram.com/pubs/pdf/MIS41/MIS41.pdf",
  },
  {
    source: "Sproxil NMDR / AISHA Platform",
    scope: "Real-time digital surveillance from product authentication, RDT readings, and health surveys",
    period: "2023–2025 (continuous)",
    methodology: "Passive surveillance via consumer interactions: scratch-code authentication, AI-powered RDT interpretation, WhatsApp-based health surveys. Geolocation triangulated from mobile network data.",
    limitations: "Non-probability sample — skewed toward urban populations with mobile access (82% phone ownership but 23% smartphone). Selection bias toward consumers who authenticate products.",
    url: null,
  },
  {
    source: "DHIS2 / HMIS (Nigeria)",
    scope: "Routine facility-level case reporting, stock management",
    period: "Monthly aggregate (2022–2024)",
    methodology: "Facility-level reporting through DHIS2. Data validated through outlier detection and triangulation with survey data.",
    limitations: "Reporting completeness varies by state (62%–97%). Community-level cases (PPMVs, informal sector) largely uncaptured. Estimated 40% of malaria treatment occurs outside formal facilities.",
    url: null,
  },
];

const keyAssumptions = [
  {
    category: "Epidemiological",
    assumptions: [
      "Nigeria's population at risk is estimated at 220M (100% at risk, per WHO classification).",
      "Malaria prevalence by microscopy (22% in children 6–59 months) is applied as the gold-standard baseline. RDT prevalence (39%) overestimates due to persistent HRP2 antigenemia.",
      "Case estimates assume a reporting adjustment factor of 1.4× to account for unreported cases in the private sector and community level.",
      "Mortality estimates assume a case fatality rate of 0.27% (WMR 2025), applied uniformly across age groups. Under-5 CFR is likely higher (~0.5%).",
      "Seasonal patterns follow the bimodal rainfall pattern in southern Nigeria and unimodal in the north, with peak transmission July–October.",
    ],
  },
  {
    category: "Intervention Coverage",
    assumptions: [
      "ITN ownership of 56% (MIS 2021) is assumed stable through 2024 pending the next mass distribution campaign. Actual current coverage may be lower due to net attrition (estimated 20% annual loss rate).",
      "IPTp coverage uses ANC-based estimates. Women not attending ANC (estimated 33%) are assumed to have near-zero IPTp coverage.",
      "SMC coverage assumes 4 complete cycles. Partial cycle completion (receiving 1–3 of 4 cycles) provides reduced but non-zero protection.",
      "ACT treatment rates assume first-line artemether-lumefantrine. Monotherapy and herbal treatment (estimated 15–20% of treatments) are excluded.",
      "Vaccine rollout (RTS,S/AS01) projected based on Gavi allocation; Nigeria's inclusion assumed from 2025 pending NPHCDA approval.",
    ],
  },
  {
    category: "Financing",
    assumptions: [
      "Total global need of $8.3B annually (GTS 2025 target). Nigeria's proportional share estimated at ~$2B based on burden-weighted allocation.",
      "Domestic funding projections assume continued growth at 15% CAGR from the 2024 baseline of $158M. Political transitions may affect actual allocations.",
      "Global Fund replenishment for 2024–2026 cycle assumes flat funding. USAID/PMI contributions assume 10–15% reduction based on 2025 policy changes.",
      "Cost-effectiveness ratios (cost per case averted, cost per DALY) are based on WHO-CHOICE 2023 values adapted for Nigeria's cost environment.",
      "Exchange rate assumed at ₦1,500/USD for 2025 projections. Naira volatility could significantly affect purchasing power of domestic allocations.",
    ],
  },
  {
    category: "Digital Surveillance (Sproxil)",
    assumptions: [
      "Authentication events are used as a proxy for treatment episodes. Not all authenticated products are consumed, and not all consumed products are authenticated.",
      "AI RDT reader accuracy of 96.8% is validated against expert microscopist panel (n=22,341). Performance may vary with image quality in field conditions.",
      "Geographic coverage is limited to states with active Sproxil partnerships (18 states). National extrapolation applies regional adjustment factors.",
      "Mobile survey response rates (~15–20%) introduce non-response bias. Weighting adjusts for age, sex, and urban/rural distribution.",
      "Real-time data has a maximum latency of 24 hours. HMIS comparison data may lag by 30–90 days.",
    ],
  },
  {
    category: "Elimination Tracking Score",
    assumptions: [
      "The composite score (0–100) is calculated using 7 indicators weighted by their relative importance to elimination: prevalence (30%), ITN access (15%), ITN use children (15%), ITN use pregnant women (10%), IPTp3+ (10%), care-seeking (10%), diagnostic testing (10%).",
      "Weights reflect WHO-recommended prioritization and Nigeria's NMSP 2021–2025 strategic framework. Alternative weighting schemes may produce different scores.",
      "Targets are drawn from the National Malaria Strategic Plan 2021–2025. Some targets have been revised in the draft 2026–2030 plan.",
      "Score methodology: each indicator score = (current/target) × 100, capped at 100. Composite = Σ(score × weight). A score of 54 indicates Nigeria is achieving approximately half of its targets.",
      "The Elimination Tracking Score is a Sproxil-developed composite metric. It is NOT an official WHO, Global Fund, or NMEP indicator.",
    ],
  },
];

const caveats = [
  "All projections are based on current trajectory and assume no major epidemiological shocks (floods, displacement, new drug resistance).",
  "pfhrp2/3 gene deletions have been confirmed in Nigeria but prevalence data is limited. If deletions exceed 5%, HRP2-based RDT accuracy will be materially affected.",
  "The 2025 aid landscape is highly uncertain. Announced cuts to USAID/PMI could reduce available funding by $500M–$1B globally, with Nigeria disproportionately affected.",
  "Climate change is expected to expand transmission zones southward and extend transmission seasons by 2–4 weeks by 2030.",
  "Artemisinin partial resistance (validated in Rwanda, suspected in Uganda and Tanzania) has NOT been confirmed in Nigeria but remains a critical surveillance priority.",
];

export default function Assumptions() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="container py-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="border-primary/40 text-primary">Methodology</Badge>
            <Badge variant="outline" className="border-accent/40 text-accent">Peer Review Ready</Badge>
          </div>
          <h1 className="font-heading text-2xl font-bold">Assumptions & Methodology</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Transparency framework for all data sources, analytical assumptions, and limitations. Designed for Global Fund reviewers, development partners, and NMEP leadership.
          </p>
        </div>
        <ExportButton />
      </div>

      {/* Data Sources */}
      <div className="mb-8">
        <h2 className="font-heading text-lg font-bold flex items-center gap-2 mb-4">
          <Database className="h-5 w-5 text-primary" /> Data Sources
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {dataSources.map((ds) => (
            <Card key={ds.source}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-secondary" />
                  {ds.source}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-muted-foreground">Scope: </span>
                  {ds.scope}
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Period: </span>
                  {ds.period}
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Methodology: </span>
                  {ds.methodology}
                </div>
                <div className="rounded-md bg-accent/10 p-2">
                  <span className="font-semibold text-accent">Limitations: </span>
                  {ds.limitations}
                </div>
                {ds.url && (
                  <a href={ds.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                    <FileText className="h-3 w-3" /> Access source document →
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Key Assumptions */}
      <div className="mb-8">
        <h2 className="font-heading text-lg font-bold flex items-center gap-2 mb-4">
          <Calculator className="h-5 w-5 text-secondary" /> Key Assumptions by Thematic Area
        </h2>
        <div className="space-y-4">
          {keyAssumptions.map((cat) => (
            <Card key={cat.category}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{cat.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-xs text-muted-foreground">
                  {cat.assumptions.map((a, i) => (
                    <li key={i} className="leading-relaxed">{a}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Critical Caveats */}
      <div className="mb-8">
        <h2 className="font-heading text-lg font-bold flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-destructive" /> Critical Caveats & Risk Factors
        </h2>
        <Card className="border-destructive/20">
          <CardContent className="pt-4">
            <ul className="space-y-3">
              {caveats.map((c, i) => (
                <li key={i} className="flex gap-3 text-xs">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-destructive/10 text-[10px] font-bold text-destructive">{i + 1}</span>
                  <span className="text-muted-foreground leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Scoring methodology */}
      <div className="mb-6 rounded-xl border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-card p-6">
        <h3 className="font-heading text-sm font-bold flex items-center gap-2 mb-3">
          <Globe className="h-4 w-4 text-secondary" /> Alignment with Global Frameworks
        </h3>
        <div className="grid gap-4 md:grid-cols-3 text-xs text-muted-foreground">
          <div className="space-y-1">
            <p className="font-semibold text-foreground">WHO Global Technical Strategy (GTS)</p>
            <p>Targets: 90% reduction in incidence and mortality by 2030 vs. 2015 baseline. Nigeria is currently off-track on both indicators.</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-foreground">Global Fund KPI Framework</p>
            <p>Aligned with KPI 1 (lives saved), KPI 6a (incidence rate), and KPI 9 (domestic financing). Grant performance ratings mapped to dashboard indicators.</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-foreground">Nigeria NMSP 2021–2025</p>
            <p>Strategic pillars: vector control, case management, chemoprevention, surveillance, advocacy. All dashboard thematic areas map to NMSP pillars.</p>
          </div>
        </div>
      </div>

      <div className="text-center text-[10px] text-muted-foreground border-t pt-4">
        This assumptions framework is maintained by Sproxil Health Intelligence and reviewed quarterly. Last updated: February 2025.
        <br />For methodology queries, contact the Sproxil M&E team or NMEP Surveillance Unit.
      </div>
    </motion.div>
  );
}
