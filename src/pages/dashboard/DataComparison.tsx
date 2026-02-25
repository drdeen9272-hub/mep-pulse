import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Cell, PieChart, Pie } from "recharts";
import { AlertTriangle, CheckCircle2, XCircle, ArrowRight, GitCompare, Database, FileText, Activity, ShieldCheck, Building, DollarSign } from "lucide-react";
import ExportButton from "@/components/ExportButton";

// ─── Cross-source comparison data ───

const prevalenceComparison = [
  { indicator: "Malaria Prevalence (Microscopy)", mis2021: 22.0, wmr2025: null, smis2: null, unit: "%", note: "Gold standard — MIS only" },
  { indicator: "Malaria Prevalence (RDT)", mis2021: 39.0, wmr2025: null, smis2: null, unit: "%", note: "Higher due to HRP2 persistence" },
  { indicator: "Not Tested Before Treatment", mis2021: null, wmr2025: null, smis2: 29.97, unit: "%", note: "Critical gap — drives presumptive Tx" },
  { indicator: "Blood Sample Taken (Yes)", mis2021: null, wmr2025: null, smis2: 67.8, unit: "%", note: "Self-reported; likely overestimate" },
  { indicator: "Incidence per 1,000 pop", mis2021: null, wmr2025: 64.0, unit: "per 1K", note: "GTS baseline was 59/1K in 2015" },
  { indicator: "Mortality per 100,000 pop", mis2021: null, wmr2025: 13.8, unit: "per 100K", note: "GTS target: 4.5 by 2025" },
];

const preventionComparison = [
  { indicator: "ITN Ownership", mis2021: 56, wmr2025: 55, smis2: null, target: 80, unit: "%" },
  { indicator: "ITN Use (All)", mis2021: 36, wmr2025: 46, smis2: null, target: 80, unit: "%" },
  { indicator: "ITN Use (Children <5)", mis2021: 41, wmr2025: null, smis2: null, target: 80, unit: "%" },
  { indicator: "ITN Use (Pregnant Women)", mis2021: 50, wmr2025: null, smis2: null, target: 80, unit: "%" },
  { indicator: "IPTp 3+ Doses", mis2021: 31, wmr2025: 34, smis2: null, target: 60, unit: "%" },
  { indicator: "RDT Testing Rate", mis2021: 34, wmr2025: 76, smis2: null, target: 80, unit: "%" },
  { indicator: "ACT Treatment Rate", mis2021: null, wmr2025: 80, smis2: null, target: 100, unit: "%" },
];

const healthSystemComparison = [
  { indicator: "Gov Hospital as Primary Source", mis2021: null, wmr2025: null, smis2: 34.49, unit: "%" },
  { indicator: "Pharmacy as Source", mis2021: null, wmr2025: null, smis2: 25.2, unit: "%" },
  { indicator: "Private Sector (All)", mis2021: null, wmr2025: null, smis2: 14.4, unit: "%", note: "Private hospital + doctor" },
  { indicator: "Drugs Affordable (Believe)", mis2021: null, wmr2025: null, smis2: 39.4, unit: "%", note: "Only 39% think drugs are affordable" },
  { indicator: "Female Literacy Rate", mis2021: 56, wmr2025: null, smis2: null, unit: "%" },
  { indicator: "Electricity Access", mis2021: 49, wmr2025: null, smis2: null, unit: "%" },
];

const burdenComparison = [
  { indicator: "Nigeria Share of Global Cases", mis2021: null, wmr2025: 24.3, smis2: null, unit: "%" },
  { indicator: "Nigeria Share of Global Deaths", mis2021: null, wmr2025: 30.3, smis2: null, unit: "%" },
  { indicator: "Estimated Cases (Nigeria)", mis2021: null, wmr2025: 68.5, smis2: null, unit: "M" },
  { indicator: "Estimated Deaths (Nigeria)", mis2021: null, wmr2025: 184830, smis2: null, unit: "" },
  { indicator: "Funding Coverage", mis2021: null, wmr2025: 42, smis2: null, unit: "%" },
  { indicator: "Funding Gap", mis2021: null, wmr2025: 58, smis2: null, unit: "%" },
];

// Radar chart data for prevention convergence
const radarData = [
  { indicator: "ITN Ownership", MIS: 70, WMR: 69, target: 100 },
  { indicator: "ITN Use", MIS: 45, WMR: 58, target: 100 },
  { indicator: "IPTp 3+", MIS: 52, WMR: 57, target: 100 },
  { indicator: "Testing", MIS: 43, WMR: 95, target: 100 },
  { indicator: "Treatment", MIS: 50, WMR: 100, target: 100 },
  { indicator: "Care-Seeking", MIS: 61, WMR: 70, target: 100 },
];

// Source methodology comparison
const methodologyComparison = [
  {
    source: "MIS 2021",
    org: "NMEP / NPC / ICF",
    method: "Nationally representative household survey",
    sample: "13,727 households; 568 clusters",
    period: "Oct–Dec 2021",
    strengths: "Gold-standard biomarker data (microscopy + RDT), household-level detail",
    limitations: "Conducted every 3–5 years; cross-sectional snapshot only",
    color: "hsl(var(--primary))",
  },
  {
    source: "WMR 2025",
    org: "WHO Global Malaria Programme",
    method: "Statistical modelling from DHIS2, surveys & vital registration",
    sample: "All 84 endemic countries",
    period: "Annual (data up to 2024)",
    strengths: "Global comparability, trend analysis, policy benchmarking",
    limitations: "Modelled estimates with wide uncertainty intervals for Nigeria",
    color: "hsl(var(--secondary))",
  },
  {
    source: "SMIS 2.0",
    org: "Sproxil / NMEP / Malaria Consortium",
    method: "Digital community-level survey via mobile (NMDR platform)",
    sample: "Continuous; real-time data collection",
    period: "Ongoing (2023–present)",
    strengths: "Real-time, low-cost (₦15/response), demand-side insights, behavioural data",
    limitations: "Non-probability sampling; skews to digitally-connected populations",
    color: "hsl(var(--accent))",
  },
];

// Bar chart for ITN comparison
const itnBarData = [
  { name: "ITN Ownership", MIS: 56, WMR: 55 },
  { name: "ITN Use (All)", MIS: 36, WMR: 46 },
  { name: "IPTp 3+", MIS: 31, WMR: 34 },
  { name: "RDT Testing", MIS: 34, WMR: 76 },
];

// Convergence/divergence summary
const convergenceSummary = [
  { area: "ITN Ownership", status: "converge", detail: "MIS (56%) ≈ WMR (55%) — strong agreement across sources" },
  { area: "ITN Use", status: "diverge", detail: "MIS (36%) vs WMR (46%) — WMR model may overestimate actual use" },
  { area: "IPTp Coverage", status: "converge", detail: "MIS (31%) ≈ WMR (34%) — both confirm major gap vs 60% target" },
  { area: "RDT Testing Rate", status: "diverge", detail: "MIS (34%) vs WMR (76%) — WMR includes facility data; MIS is community-level" },
  { area: "Treatment Source", status: "unique", detail: "SMIS uniquely captures that 34.5% use gov hospitals, 25% pharmacies" },
  { area: "Affordability", status: "unique", detail: "SMIS uniquely shows only 39% believe drugs are affordable — demand-side gap" },
  { area: "Presumptive Treatment", status: "critical", detail: "SMIS reveals 30% not tested before treatment — invisible in MIS/WMR" },
];

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "converge") return <CheckCircle2 className="h-4 w-4 text-[hsl(140,50%,35%)]" />;
  if (status === "diverge") return <AlertTriangle className="h-4 w-4 text-[hsl(35,90%,50%)]" />;
  if (status === "critical") return <XCircle className="h-4 w-4 text-destructive" />;
  return <Database className="h-4 w-4 text-primary" />;
};

const chartConfig = {
  MIS: { label: "MIS 2021", color: "hsl(var(--primary))" },
  WMR: { label: "WMR 2025", color: "hsl(var(--secondary))" },
  SMIS: { label: "SMIS 2.0", color: "hsl(var(--accent))" },
};

function DataTable({ title, data, icon }: { title: string; data: typeof prevalenceComparison; icon: React.ReactNode }) {
  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/5">
                <TableHead className="font-semibold">Indicator</TableHead>
                <TableHead className="text-center font-semibold text-primary">MIS 2021</TableHead>
                <TableHead className="text-center font-semibold text-secondary">WMR 2025</TableHead>
                <TableHead className="text-center font-semibold">SMIS 2.0</TableHead>
                <TableHead className="hidden md:table-cell">Note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.indicator} className="hover:bg-muted/50">
                  <TableCell className="text-xs font-medium">{row.indicator}</TableCell>
                  <TableCell className="text-center">
                    {row.mis2021 !== null && row.mis2021 !== undefined ? (
                      <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary font-mono">
                        {row.mis2021}{row.unit}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground/40">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.wmr2025 !== null && row.wmr2025 !== undefined ? (
                      <Badge variant="outline" className="border-secondary/30 bg-secondary/5 text-secondary font-mono">
                        {row.wmr2025}{row.unit}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground/40">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.smis2 !== null && row.smis2 !== undefined ? (
                      <Badge variant="outline" className="border-accent/30 bg-accent/10 font-mono">
                        {row.smis2}{row.unit}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground/40">—</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden text-[11px] text-muted-foreground md:table-cell max-w-[200px]">
                    {row.note || "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DataComparison() {
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
          <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
            <GitCompare className="h-7 w-7 text-primary" />
            Cross-Source Data Triangulation
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Side-by-side comparison of MIS 2021, WMR 2025 & SMIS 2.0 — identifying convergence, divergence and blind spots across Nigeria's three principal malaria data sources.
          </p>
        </div>
        <ExportButton />
      </div>

      {/* Source Methodology Cards */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {methodologyComparison.map((src) => (
          <motion.div
            key={src.source}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full border-t-4" style={{ borderTopColor: src.color }}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold">{src.source}</CardTitle>
                  <Badge variant="secondary" className="text-[10px]">{src.period}</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground">{src.org}</p>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-foreground">Method:</span>{" "}
                  <span className="text-muted-foreground">{src.method}</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Sample:</span>{" "}
                  <span className="text-muted-foreground">{src.sample}</span>
                </div>
                <div className="pt-1 border-t">
                  <div className="flex items-start gap-1 text-[hsl(140,50%,35%)]">
                    <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" />
                    <span>{src.strengths}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-start gap-1 text-destructive">
                    <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
                    <span>{src.limitations}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Convergence / Divergence Summary */}
      <Card className="mb-6 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Convergence & Divergence Analysis
          </CardTitle>
          <p className="text-xs text-muted-foreground">Where do the three sources agree, disagree, or provide unique insights?</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {convergenceSummary.map((item) => (
              <div key={item.area} className="flex items-start gap-3 rounded-lg border p-3 hover:bg-muted/30 transition-colors">
                <StatusIcon status={item.status} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{item.area}</span>
                    <Badge
                      variant={item.status === "converge" ? "default" : item.status === "critical" ? "destructive" : "secondary"}
                      className="text-[10px] h-5"
                    >
                      {item.status === "converge" ? "Sources Agree" :
                       item.status === "diverge" ? "Sources Differ" :
                       item.status === "critical" ? "Critical Gap" : "Unique Insight"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row: Bar + Radar */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        {/* Bar Chart */}
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">MIS vs WMR: Key Intervention Coverage (%)</CardTitle>
            <p className="text-[11px] text-muted-foreground">Direct comparison where both sources report the same indicators</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <BarChart data={itnBarData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="MIS" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="MIS 2021" />
                <Bar dataKey="WMR" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="WMR 2025" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Prevention Score Convergence (% of Target)</CardTitle>
            <p className="text-[11px] text-muted-foreground">Normalized to NMSP/GTS targets — shows how close each source places Nigeria to goals</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="indicator" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="MIS 2021" dataKey="MIS" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.25} strokeWidth={2} />
                <Radar name="WMR 2025" dataKey="WMR" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.15} strokeWidth={2} />
                <Legend />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Data Tables */}
      <div className="space-y-6 mb-6">
        <DataTable
          title="Epidemiological Indicators"
          data={prevalenceComparison}
          icon={<Activity className="h-5 w-5 text-primary" />}
        />
        <DataTable
          title="Prevention & Treatment Coverage"
          data={preventionComparison as any}
          icon={<ShieldCheck className="h-5 w-5 text-secondary" />}
        />
        <DataTable
          title="Health System & Demand-Side"
          data={healthSystemComparison as any}
          icon={<Building className="h-5 w-5 text-accent" />}
        />
        <DataTable
          title="Disease Burden & Financing"
          data={burdenComparison as any}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
        />
      </div>

      {/* Key Takeaways */}
      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-primary">🔑 Key Takeaways for the Minister</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              {
                title: "Triangulation validates ITN crisis",
                detail: "Both MIS (56%) and WMR (55%) confirm ITN ownership is 25 points below the 80% target. This is not a data artefact — it's a real gap.",
              },
              {
                title: "Testing rates are contested",
                detail: "WMR reports 76% testing rate (facility data), but MIS shows only 34% at community level. SMIS confirms 30% are NOT tested before treatment. The truth is likely closer to MIS/SMIS.",
              },
              {
                title: "SMIS fills critical demand-side blind spots",
                detail: "Only SMIS captures treatment-seeking behaviour, affordability perceptions (39%), and primary care pathways (34.5% gov hospitals, 25% pharmacies). Neither MIS nor WMR collect this.",
              },
              {
                title: "Presumptive treatment is an invisible crisis",
                detail: "30% of patients receive antimalarials without diagnostic testing (SMIS). This drives drug resistance, waste, and misdiagnosis — yet it's invisible in MIS/WMR frameworks.",
              },
              {
                title: "IPTp convergence confirms urgent ANC gap",
                detail: "Both MIS (31%) and WMR (34%) confirm IPTp3+ coverage is roughly half the 60% target. This is a missed opportunity given 67% ANC attendance.",
              },
              {
                title: "Fund the data ecosystem, not just interventions",
                detail: "With only 42% funding coverage (WMR), Nigeria must integrate all three data streams into a unified decision-support platform to maximize impact per dollar spent.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border bg-card p-3">
                <div className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
