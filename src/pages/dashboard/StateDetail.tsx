import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Users, Activity, Shield, Syringe, Bug, Banknote, Target, ChevronUp, ChevronDown, Search, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { nigeriaStates } from "@/data/nigeriaData";
import { stratificationBands, type TransmissionBand } from "@/data/wmr2025Data";
import { generateLGAData, type LGA } from "@/data/lgaData";

const bandColorMap: Record<TransmissionBand, string> = {
  very_low:   "hsl(145 60% 45%)",
  low_b:      "hsl(145 40% 55%)",
  low_a:      "hsl(48 80% 55%)",
  moderate_b: "hsl(25 80% 55%)",
  moderate_a: "hsl(0 70% 50%)",
};

const interventionMix: Record<TransmissionBand, { priority: string; interventions: { name: string; icon: React.ElementType; detail: string }[] }> = {
  very_low: {
    priority: "Surveillance & Elimination",
    interventions: [
      { name: "Active Case Detection", icon: Target, detail: "Reactive & proactive case investigation in every focus" },
      { name: "Focal IRS", icon: Shield, detail: "Targeted indoor residual spraying around confirmed foci" },
      { name: "Enhanced Surveillance", icon: Activity, detail: "Real-time case-based reporting with 1-3-7 response" },
      { name: "Entomological Monitoring", icon: Bug, detail: "Longitudinal vector surveillance & insecticide resistance testing" },
    ],
  },
  low_b: {
    priority: "Accelerated Reduction",
    interventions: [
      { name: "Mass ITN Distribution", icon: Shield, detail: "Universal coverage campaign with PBO/dual-AI nets" },
      { name: "Case Management", icon: Syringe, detail: "Parasitological confirmation (RDT/microscopy) + quality ACTs" },
      { name: "Active Surveillance", icon: Activity, detail: "Proactive case detection in residual transmission foci" },
      { name: "Larval Source Management", icon: Bug, detail: "Environmental management & larviciding in urban settings" },
    ],
  },
  low_a: {
    priority: "Sustained Control & Reduction",
    interventions: [
      { name: "Mass ITN + IRS", icon: Shield, detail: "Dual vector control: PBO nets + targeted IRS in high-burden LGAs" },
      { name: "SMC (eligible areas)", icon: Syringe, detail: "Seasonal malaria chemoprevention for children 3–59 months" },
      { name: "Malaria Vaccine", icon: Syringe, detail: "RTS,S/R21 integration into routine EPI for eligible LGAs" },
      { name: "Community Case Management", icon: Users, detail: "iCCM with trained CHWs for prompt diagnosis & treatment" },
    ],
  },
  moderate_b: {
    priority: "High-Impact Intervention Package",
    interventions: [
      { name: "Universal ITN Coverage", icon: Shield, detail: "Mass campaigns + continuous distribution (ANC/EPI/schools)" },
      { name: "Expanded IRS", icon: Shield, detail: "IRS with next-gen insecticides in priority LGAs" },
      { name: "SMC Scale-Up", icon: Syringe, detail: "Full geographic & age-group expansion of SMC cycles" },
      { name: "IPTp Optimization", icon: Syringe, detail: "≥3 doses SP for all pregnant women at ANC contacts" },
      { name: "Vaccine Rollout", icon: Syringe, detail: "Phased R21/RTS,S introduction in eligible LGAs" },
    ],
  },
  moderate_a: {
    priority: "Maximum Impact — Full Package",
    interventions: [
      { name: "Mass ITN + IRS Combo", icon: Shield, detail: "Dual vector control across all LGAs with PBO/pyrethroid-PBO nets" },
      { name: "Full SMC Coverage", icon: Syringe, detail: "4+ cycles SPAQ for all eligible children during transmission season" },
      { name: "IPTp (≥3 doses SP)", icon: Syringe, detail: "Intermittent preventive treatment in pregnancy at every ANC visit" },
      { name: "iCCM + PPMV Network", icon: Users, detail: "Community-level diagnosis & treatment via CHWs and PPMV outlets" },
      { name: "Vaccine Introduction", icon: Syringe, detail: "Priority phased introduction of malaria vaccine" },
      { name: "Increased Domestic Financing", icon: Banknote, detail: "State counterpart funding + private sector co-investment" },
    ],
  },
};

function getStateKPIs(_code: string, band: TransmissionBand, prevalence: number, population: number) {
  const itnOwnership = band === "moderate_a" ? 52 + Math.round(prevalence * 0.3) :
                       band === "moderate_b" ? 58 + Math.round(prevalence * 0.4) :
                       band === "low_a" ? 65 + Math.round(prevalence * 0.5) : 72 + Math.round(prevalence * 0.3);
  const itnUse = Math.round(itnOwnership * 0.68);
  const testRate = band === "moderate_a" ? 42 : band === "moderate_b" ? 55 : band === "low_a" ? 63 : 71;
  const tpr = Math.min(85, Math.round(prevalence * 2.8 + 12));
  const actCoverage = band === "moderate_a" ? 48 : band === "moderate_b" ? 56 : 65;
  const smcCoverage = ["moderate_a", "moderate_b", "low_a"].includes(band) ? Math.round(35 + Math.random() * 30) : 0;
  const iptpCoverage = Math.round(28 + Math.random() * 35);
  const estimatedCases = Math.round(population * prevalence / 100 * 1.8);
  const estimatedDeaths = Math.round(estimatedCases * 0.0027);
  return { itnOwnership, itnUse, testRate, tpr, actCoverage, smcCoverage, iptpCoverage, estimatedCases, estimatedDeaths };
}

function MetricBar({ label, value, max = 100 }: { label: string; value: number; max?: number; color?: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}{max === 100 ? "%" : ""}</span>
      </div>
      <Progress value={(value / max) * 100} className="h-2" />
    </div>
  );
}

// ---------- LGA Table ----------
type SortKey = keyof Pick<LGA, "name" | "population" | "prevalence" | "itnCoverage" | "actCoverage" | "smcCoverage" | "testPositivityRate" | "phcCount" | "chwCount">;

function LGATable({ lgas }: { lgas: LGA[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("prevalence");
  const [sortAsc, setSortAsc] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = [...lgas];
    if (search) list = list.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));
    list.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (typeof av === "string") return sortAsc ? av.localeCompare(bv as string) : (bv as string).localeCompare(av);
      return sortAsc ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return list;
  }, [lgas, sortKey, sortAsc, search]);

  const toggle = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronDown className="h-3 w-3 opacity-30" />;
    return sortAsc ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />;
  };

  const cols: { key: SortKey; label: string; right?: boolean }[] = [
    { key: "name", label: "LGA" },
    { key: "population", label: "Pop", right: true },
    { key: "prevalence", label: "Prev%", right: true },
    { key: "itnCoverage", label: "ITN%", right: true },
    { key: "actCoverage", label: "ACT%", right: true },
    { key: "smcCoverage", label: "SMC%", right: true },
    { key: "testPositivityRate", label: "TPR%", right: true },
    { key: "phcCount", label: "PHCs", right: true },
    { key: "chwCount", label: "CHWs", right: true },
  ];

  const prevColor = (v: number) =>
    v >= 15 ? "text-destructive" : v >= 10 ? "text-orange-500" : v >= 5 ? "text-yellow-600" : "text-green-600";

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">LGA-Level Breakdown</CardTitle>
            <Badge variant="secondary" className="text-[10px]">{lgas.length} LGAs</Badge>
          </div>
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search LGA…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-8 pl-8 text-xs"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="max-h-[420px] overflow-auto rounded-md border">
          <table className="w-full text-[11px]">
            <thead className="sticky top-0 bg-muted/95 backdrop-blur-sm z-10">
              <tr>
                {cols.map(c => (
                  <th
                    key={c.key}
                    onClick={() => toggle(c.key)}
                    className={`cursor-pointer select-none whitespace-nowrap px-2.5 py-2 font-semibold text-muted-foreground hover:text-foreground transition-colors ${c.right ? "text-right" : "text-left"}`}
                  >
                    <span className="inline-flex items-center gap-0.5">
                      {c.label} <SortIcon col={c.key} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lga, i) => (
                <motion.tr
                  key={lga.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(i * 0.01, 0.3) }}
                  className="border-b border-muted/40 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-2.5 py-1.5 font-medium">{lga.name}</td>
                  <td className="px-2.5 py-1.5 text-right tabular-nums">{(lga.population / 1000).toFixed(0)}K</td>
                  <td className={`px-2.5 py-1.5 text-right font-semibold tabular-nums ${prevColor(lga.prevalence)}`}>{lga.prevalence}</td>
                  <td className="px-2.5 py-1.5 text-right tabular-nums">{lga.itnCoverage}</td>
                  <td className="px-2.5 py-1.5 text-right tabular-nums">{lga.actCoverage}</td>
                  <td className="px-2.5 py-1.5 text-right tabular-nums">{lga.smcCoverage > 0 ? lga.smcCoverage : "—"}</td>
                  <td className="px-2.5 py-1.5 text-right tabular-nums">{lga.testPositivityRate}</td>
                  <td className="px-2.5 py-1.5 text-right tabular-nums">{lga.phcCount}</td>
                  <td className="px-2.5 py-1.5 text-right tabular-nums">{lga.chwCount}</td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="py-6 text-center text-muted-foreground">No LGAs match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground text-center">
          Click column headers to sort · Prevalence color: <span className="text-green-600 font-semibold">&lt;5%</span>{" "}
          <span className="text-yellow-600 font-semibold">5–9%</span>{" "}
          <span className="text-orange-500 font-semibold">10–14%</span>{" "}
          <span className="text-destructive font-semibold">≥15%</span>
        </p>
      </CardContent>
    </Card>
  );
}

// ---------- Main Page ----------
export default function StateDetail() {
  const { stateCode } = useParams<{ stateCode: string }>();
  const navigate = useNavigate();

  const state = nigeriaStates.find(s => s.code === stateCode?.toUpperCase());
  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-muted-foreground">State not found.</p>
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
    );
  }

  const band = stratificationBands.find(b => b.key === state.transmissionBand)!;
  const mix = interventionMix[state.transmissionBand];
  const kpis = getStateKPIs(state.code, state.transmissionBand, state.prevalence2025, state.population);
  const bandColor = bandColorMap[state.transmissionBand];
  const lgas = useMemo(() => generateLGAData(state), [state]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-heading text-2xl font-bold">{state.name} State</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {state.zone} · {state.lgaCount} LGAs · {(state.population / 1_000_000).toFixed(1)}M pop
            </div>
          </div>
        </div>
        <Badge
          className="self-start px-3 py-1.5 text-sm font-semibold border-0"
          style={{ background: `${bandColor}20`, color: bandColor }}
        >
          {band.label} — {band.prevalenceRange}
        </Badge>
      </div>

      {/* Top KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Prevalence (2025)", value: `${state.prevalence2025}%`, sub: band.prevalenceRange },
          { label: "Est. Cases", value: `${(kpis.estimatedCases / 1000).toFixed(0)}K`, sub: "per year" },
          { label: "Est. Deaths", value: kpis.estimatedDeaths.toLocaleString(), sub: "per year" },
          { label: "Test Positivity", value: `${kpis.tpr}%`, sub: `${kpis.testRate}% tested` },
        ].map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{k.label}</p>
                <p className="text-xl font-bold mt-1">{k.value}</p>
                <p className="text-[10px] text-muted-foreground">{k.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Coverage Metrics */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Coverage Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <MetricBar label="ITN Ownership" value={kpis.itnOwnership} color={bandColor} />
            <MetricBar label="ITN Use (slept under net)" value={kpis.itnUse} color={bandColor} />
            <MetricBar label="ACT Treatment Coverage" value={kpis.actCoverage} color={bandColor} />
            <MetricBar label="IPTp ≥3 doses Coverage" value={kpis.iptpCoverage} color={bandColor} />
            {kpis.smcCoverage > 0 && (
              <MetricBar label="SMC Coverage" value={kpis.smcCoverage} color={bandColor} />
            )}
          </CardContent>
        </Card>

        {/* Recommended Intervention Mix */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">NMSP Intervention Mix</CardTitle>
              <Badge variant="outline" className="text-[10px]" style={{ borderColor: bandColor, color: bandColor }}>
                {mix.priority}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Recommended package for <span className="font-semibold" style={{ color: bandColor }}>{band.label}</span> transmission band
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mix.interventions.map((iv, i) => (
                <motion.div
                  key={iv.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                  className="flex gap-3 rounded-lg border p-3"
                >
                  <div
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                    style={{ background: `${bandColor}18` }}
                  >
                    <iv.icon className="h-3.5 w-3.5" style={{ color: bandColor }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{iv.name}</p>
                    <p className="text-xs text-muted-foreground">{iv.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* LGA Breakdown Table */}
      <LGATable lgas={lgas} />

      {/* Stratification context */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">NMSP 2026–2030 Stratification Context</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Current Band</p>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ background: bandColor }} />
                <span className="font-semibold">{band.label}</span>
                <span className="text-xs text-muted-foreground">({band.prevalenceRange})</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">API Range</p>
              <p className="font-semibold">{band.apiRange}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">2030 Target</p>
              <p className="font-semibold">
                {state.transmissionBand === "moderate_a" ? "60% prevalence reduction" :
                 state.transmissionBand === "moderate_b" ? "60% prevalence reduction" :
                 state.transmissionBand === "low_a" ? "Move to Low-B or Very Low" :
                 state.transmissionBand === "low_b" ? "Achieve Very Low / pre-elimination" :
                 "Maintain & move to elimination"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Same-Band States</p>
              <p className="text-sm">
                {nigeriaStates.filter(s => s.transmissionBand === state.transmissionBand).map(s => s.code).join(", ")}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Zone Avg Prevalence</p>
              <p className="font-semibold">
                {(nigeriaStates.filter(s => s.zone === state.zone).reduce((a, s) => a + s.prevalence2025, 0) /
                  nigeriaStates.filter(s => s.zone === state.zone).length).toFixed(1)}%
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">SNT Approach</p>
              <p className="text-sm font-medium">
                {state.transmissionBand === "moderate_a" ? "High-intensity universal coverage" :
                 state.transmissionBand === "moderate_b" ? "Targeted high-impact package" :
                 state.transmissionBand === "low_a" ? "Sustained control + focal intensification" :
                 "Focal response & surveillance"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
