import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, Cell, ComposedChart, Area,
} from "recharts";
import KPICard from "@/components/dashboard/KPICard";
import ExportButton from "@/components/ExportButton";
import { Globe, Skull, TrendingDown, Target, Syringe, ShieldAlert, DollarSign, AlertTriangle, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  globalCasesDeathsTrend, wmr2025KPIs, gtsProgress,
  topCountriesByCases, topCountriesByDeaths, africaCasesDeathsTrend,
  fundingWMR2025, drugResistance, interventionsCoverage,
} from "@/data/wmr2025Data";

const casesChartData = globalCasesDeathsTrend.map((d) => ({
  year: String(d.year),
  cases: d.cases,
  deaths: d.deaths,
}));

const gtsIncidenceData = [
  { year: "2015", actual: gtsProgress.incidence2015, target: gtsProgress.incidence2015 },
  { year: "2020", actual: 64.4, target: 35.4 },
  { year: "2024", actual: gtsProgress.incidence2024, target: gtsProgress.incidenceTarget2025 },
  { year: "2025", actual: null, target: gtsProgress.incidenceTarget2025 },
  { year: "2030", actual: null, target: gtsProgress.incidenceTarget2030 },
];

const gtsMortalityData = [
  { year: "2015", actual: gtsProgress.mortality2015, target: gtsProgress.mortality2015 },
  { year: "2020", actual: 14.8, target: 8.9 },
  { year: "2024", actual: gtsProgress.mortality2024, target: gtsProgress.mortalityTarget2025 },
  { year: "2025", actual: null, target: gtsProgress.mortalityTarget2025 },
  { year: "2030", actual: null, target: gtsProgress.mortalityTarget2030 },
];

export default function WMR2025Summary() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="container py-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">World Malaria Report 2025</h1>
          <p className="text-sm text-muted-foreground">
            Key findings from the WHO WMR 2025 — Addressing the threat of antimalarial drug resistance.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <a href="https://iris.who.int/bitstream/handle/10665/381432/9789240117822-eng.pdf" target="_blank" rel="noopener noreferrer">
              <FileDown className="mr-2 h-4 w-4" />
              Download PDF
            </a>
          </Button>
          <ExportButton />
        </div>
      </div>

      {/* Headline KPIs */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard title="Global Cases (2024)" value={wmr2025KPIs.globalCases} trend={{ value: "+3% vs 2023", positive: false }} icon={<Globe className="h-5 w-5 text-destructive" />} delay={0} />
        <KPICard title="Global Deaths (2024)" value={wmr2025KPIs.globalDeaths} trend={{ value: "+2% vs 2023", positive: false }} icon={<Skull className="h-5 w-5 text-destructive" />} delay={0.1} />
        <KPICard title="Case Incidence" value={`${wmr2025KPIs.incidencePerThousand}/1000`} trend={{ value: `GTS target: ${gtsProgress.incidenceTarget2025}`, positive: false }} icon={<TrendingDown className="h-5 w-5 text-secondary" />} delay={0.2} />
        <KPICard title="Mortality Rate" value={`${wmr2025KPIs.mortalityPer100k}/100K`} trend={{ value: `GTS target: ${gtsProgress.mortalityTarget2025}`, positive: false }} icon={<Target className="h-5 w-5 text-accent" />} delay={0.3} />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard title="Funding Coverage" value={wmr2025KPIs.fundingCoverageOfNeed} subtitle="of $8.3B needed" icon={<DollarSign className="h-5 w-5 text-accent" />} delay={0.4} />
        <KPICard title="SMC Reached" value={wmr2025KPIs.smcChildrenReached} subtitle={`${wmr2025KPIs.smcCountries} countries`} icon={<Syringe className="h-5 w-5 text-primary" />} delay={0.5} />
        <KPICard title="Vaccine Rollout" value={`${wmr2025KPIs.countriesWithVaccine} countries`} subtitle="Routine immunization" icon={<Syringe className="h-5 w-5 text-secondary" />} delay={0.6} />
        <KPICard title="pfhrp2 Deletions" value={`${drugResistance.pfhrp2DeletionCountries} countries`} subtitle="Threatening RDT accuracy" icon={<AlertTriangle className="h-5 w-5 text-destructive" />} delay={0.7} />
      </div>

      {/* Global Cases & Deaths 2000–2024 */}
      <div className="mb-6 rounded-xl border bg-card p-5 shadow-sm">
        <h3 className="mb-1 font-heading text-sm font-semibold">Global Malaria Cases & Deaths, 2000–2024</h3>
        <p className="mb-3 text-xs text-muted-foreground">Cases in thousands (000). Deaths in thousands (000). Source: WHO WMR 2025 Table 2.1</p>
        <ResponsiveContainer width="100%" height={340}>
          <ComposedChart data={casesChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" tick={{ fontSize: 10 }} interval={2} />
            <YAxis yAxisId="left" tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}K`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}K`} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number, name: string) => [`${v.toLocaleString()}K`, name === "cases" ? "Cases" : "Deaths"]} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area yAxisId="left" type="monotone" dataKey="cases" name="Cases (000)" fill="hsl(var(--destructive)/0.15)" stroke="hsl(var(--destructive))" strokeWidth={2.5} />
            <Line yAxisId="right" type="monotone" dataKey="deaths" name="Deaths (000)" stroke="hsl(var(--foreground))" strokeWidth={2} dot={{ r: 2 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* GTS Progress: Incidence + Mortality */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-1 font-heading text-sm font-semibold">GTS Progress: Case Incidence</h3>
          <p className="mb-3 text-xs text-muted-foreground">Cases per 1,000 population at risk. 2024 incidence is 3.5× the target.</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={gtsIncidenceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} domain={[0, 80]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="actual" name="Actual" stroke="hsl(var(--destructive))" strokeWidth={2.5} dot={{ r: 5 }} connectNulls={false} />
              <Line type="monotone" dataKey="target" name="GTS Target" stroke="hsl(var(--secondary))" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-1 font-heading text-sm font-semibold">GTS Progress: Mortality Rate</h3>
          <p className="mb-3 text-xs text-muted-foreground">Deaths per 100,000 population at risk. 2024 mortality is 3× the target.</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={gtsMortalityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} domain={[0, 20]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="actual" name="Actual" stroke="hsl(var(--destructive))" strokeWidth={2.5} dot={{ r: 5 }} connectNulls={false} />
              <Line type="monotone" dataKey="target" name="GTS Target" stroke="hsl(var(--secondary))" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Countries */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-1 font-heading text-sm font-semibold">Top 15 Countries by Cases (%)</h3>
          <p className="mb-3 text-xs text-muted-foreground">Nigeria alone accounts for 24.3% of all global malaria cases.</p>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={topCountriesByCases} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" domain={[0, 30]} tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="country" tick={{ fontSize: 10 }} width={75} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${v}%`} />
              <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
                {topCountriesByCases.map((entry, i) => (
                  <Cell key={i} fill={entry.country === "Nigeria" ? "hsl(var(--destructive))" : "hsl(var(--secondary))"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-1 font-heading text-sm font-semibold">Top 10 Countries by Deaths (%)</h3>
          <p className="mb-3 text-xs text-muted-foreground">Nigeria accounts for 30.3% of all malaria deaths globally.</p>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={topCountriesByDeaths} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" domain={[0, 35]} tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="country" tick={{ fontSize: 10 }} width={75} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${v}%`} />
              <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
                {topCountriesByDeaths.map((entry, i) => (
                  <Cell key={i} fill={entry.country === "Nigeria" ? "hsl(var(--destructive))" : "hsl(var(--primary))"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Africa Region Trend */}
      <div className="mb-6 rounded-xl border bg-card p-5 shadow-sm">
        <h3 className="mb-1 font-heading text-sm font-semibold">WHO African Region: Cases & Deaths, 2015–2024</h3>
        <p className="mb-3 text-xs text-muted-foreground">94% of global cases and 95% of deaths occur in the African Region. Source: WMR 2025 Table 2.4</p>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={africaCasesDeathsTrend.map((d) => ({ year: String(d.year), cases: d.cases, deaths: d.deaths }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}K`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}K`} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area yAxisId="left" type="monotone" dataKey="cases" name="Cases (000)" fill="hsl(var(--destructive)/0.12)" stroke="hsl(var(--destructive))" strokeWidth={2} />
            <Line yAxisId="right" type="monotone" dataKey="deaths" name="Deaths (000)" stroke="hsl(var(--foreground))" strokeWidth={2} dot={{ r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Key Threats & Drug Resistance */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-destructive" /> Biological Threats
          </h3>
          <div className="space-y-3 text-sm">
            <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-3">
              <p className="font-semibold text-destructive">Antimalarial Drug Resistance</p>
              <p className="text-xs text-muted-foreground mt-1">{drugResistance.description}</p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="font-semibold">Insecticide Resistance</p>
              <p className="text-xs text-muted-foreground mt-1">Pyrethroid resistance widespread; dual-ingredient ITNs and next-gen IRS formulations recommended. WMR 2025 Ch. 6.3.</p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="font-semibold">Invasive Vector Species</p>
              <p className="text-xs text-muted-foreground mt-1">An. stephensi expanding in Africa, requiring urban vector control strategies. WMR 2025 Ch. 6.4.</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">Intervention Coverage (2024)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="px-3 py-2 font-medium">Intervention</th>
                  <th className="px-3 py-2 text-right font-medium">Coverage</th>
                  <th className="px-3 py-2 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "ITN Access", value: `${interventionsCoverage.itnAccess}%`, target: "80%", met: false },
                  { name: "ITN Use (slept under)", value: `${interventionsCoverage.itnUse}%`, target: "80%", met: false },
                  { name: "IRS Population Protected", value: interventionsCoverage.irsPopulationProtected, target: "—", met: false },
                  { name: "RDT Testing Rate", value: `${interventionsCoverage.rdtTestingRate}%`, target: "100%", met: false },
                  { name: "ACT Treatment Rate", value: `${interventionsCoverage.actTreatmentRate}%`, target: "100%", met: false },
                  { name: "IPTp 3+ Coverage", value: `${interventionsCoverage.iptpCoverage3Plus}%`, target: "80%", met: false },
                  { name: "SMC Children Reached", value: "54M", target: "—", met: true },
                  { name: "Vaccine Countries", value: String(interventionsCoverage.vaccineCountries), target: "—", met: true },
                ].map((row) => (
                  <tr key={row.name} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="px-3 py-2 font-medium">{row.name}</td>
                    <td className="px-3 py-2 text-right">{row.value}</td>
                    <td className="px-3 py-2 text-right">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${row.met ? "bg-secondary/10 text-secondary" : "bg-destructive/10 text-destructive"}`}>
                        {row.met ? "On track" : `Target: ${row.target}`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Source attribution */}
      <div className="rounded-xl border bg-muted/30 p-4 text-xs text-muted-foreground">
        <p className="font-semibold mb-1">Source</p>
        <p>World malaria report 2025: addressing the threat of antimalarial drug resistance. Geneva: World Health Organization; 2025. Licence: CC BY-NC-SA 3.0 IGO. ISBN 978-92-4-011782-2.</p>
      </div>
    </motion.div>
  );
}
