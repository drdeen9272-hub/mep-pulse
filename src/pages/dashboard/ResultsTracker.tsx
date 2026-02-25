import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Target, Calendar, Building2, Activity, ShieldCheck, Handshake, CheckCircle2, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import ExportButton from "@/components/ExportButton";
import { resultsFramework, resultsSummary, type ResultItem } from "@/data/resultsTrackerData";
import { Progress } from "@/components/ui/progress";

const ioLabels: Record<number, { label: string; icon: React.ReactNode; color: string }> = {
  0: { label: "Primary Outcome", icon: <Target className="h-5 w-5" />, color: "hsl(var(--primary))" },
  1: { label: "IO1: Surveillance System", icon: <Activity className="h-5 w-5" />, color: "hsl(var(--primary))" },
  2: { label: "IO2: Case Management", icon: <ShieldCheck className="h-5 w-5" />, color: "hsl(var(--secondary))" },
  3: { label: "IO3: Sustainability & Partnerships", icon: <Handshake className="h-5 w-5" />, color: "hsl(var(--accent))" },
};

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  "Not Started": { color: "bg-muted text-muted-foreground", icon: <Clock className="h-3 w-3" /> },
  "In Progress": { color: "bg-primary/10 text-primary border-primary/30", icon: <ArrowRight className="h-3 w-3" /> },
  "On Track": { color: "bg-[hsl(140,50%,90%)] text-[hsl(140,50%,30%)] border-[hsl(140,50%,50%)]", icon: <CheckCircle2 className="h-3 w-3" /> },
  "Delayed": { color: "bg-destructive/10 text-destructive border-destructive/30", icon: <AlertTriangle className="h-3 w-3" /> },
  "Completed": { color: "bg-[hsl(140,50%,35%)] text-white", icon: <CheckCircle2 className="h-3 w-3" /> },
};

// Timeline data by quarter
const timelineData = [
  { quarter: "Q2 2026", outputs: 4, label: "M1–3" },
  { quarter: "Q3 2026", outputs: 5, label: "M4–6" },
  { quarter: "Q4 2026", outputs: 3, label: "M7–9" },
  { quarter: "Q1 2027", outputs: 4, label: "M10–12" },
  { quarter: "Q2 2027", outputs: 5, label: "M13–15" },
  { quarter: "Q3 2027", outputs: 2, label: "M16–18" },
  { quarter: "Q4 2027", outputs: 1, label: "M19–21" },
  { quarter: "Q1 2028", outputs: 6, label: "M22–24" },
];

const ioDistribution = [
  { name: "IO1: Surveillance", value: 6, fill: "hsl(var(--primary))" },
  { name: "IO2: Case Mgmt", value: 7, fill: "hsl(var(--secondary))" },
  { name: "IO3: Sustainability", value: 10, fill: "hsl(var(--accent))" },
];

const chartConfig = {
  outputs: { label: "Deliverables Due", color: "hsl(var(--primary))" },
};

function KPICard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <Card className="border-primary/20">
      <CardContent className="pt-4 pb-3 px-4 text-center">
        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-primary mt-1">{value}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
      </CardContent>
    </Card>
  );
}

function IOSection({ io, items }: { io: number; items: ResultItem[] }) {
  const config = ioLabels[io];
  const ioItem = items.find((i) => i.type === "Intermediate Outcome" || i.type === "Primary Outcome");
  const outputs = items.filter((i) => i.type === "Output");

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div style={{ color: config.color }}>{config.icon}</div>
          <CardTitle className="text-base">{config.label}</CardTitle>
          <Badge variant="outline" className="ml-auto text-[10px]">
            {outputs.length} outputs
          </Badge>
        </div>
        {ioItem && (
          <p className="text-xs text-muted-foreground mt-1">{ioItem.description}</p>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/5">
                <TableHead className="font-semibold w-[35%]">Deliverable</TableHead>
                <TableHead className="font-semibold w-[30%] hidden md:table-cell">Target</TableHead>
                <TableHead className="text-center font-semibold">Due</TableHead>
                <TableHead className="text-center font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {outputs.map((item) => {
                const sc = statusConfig[item.status];
                return (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell className="text-xs font-medium">{item.result}</TableCell>
                    <TableCell className="text-[11px] text-muted-foreground hidden md:table-cell">{item.description}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {new Date(item.dueDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={`text-[10px] gap-1 ${sc.color}`}>
                        {sc.icon}
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ResultsTracker() {
  const io1 = resultsFramework.filter((r) => r.io === 1);
  const io2 = resultsFramework.filter((r) => r.io === 2);
  const io3 = resultsFramework.filter((r) => r.io === 3);
  const po = resultsFramework.find((r) => r.io === 0);

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
            <Target className="h-7 w-7 text-primary" />
            Gates Foundation Results Tracker
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Investment results framework tracking 1 Primary Outcome, 3 Intermediate Outcomes, and 20 Outputs across a 24-month grant period (Apr 2026 – Mar 2028).
          </p>
        </div>
        <ExportButton />
      </div>

      {/* Primary Outcome Banner */}
      {po && (
        <Card className="mb-6 border-2 border-primary/30 bg-primary/5">
          <CardContent className="py-4 px-5">
            <div className="flex items-start gap-3">
              <Target className="h-6 w-6 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-primary">Primary Outcome</p>
                <p className="text-sm font-semibold mt-1">{po.result}</p>
                <p className="text-xs text-muted-foreground mt-1">{po.description}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-[10px] font-mono">
                    <Calendar className="h-3 w-3 mr-1" />
                    Due: Mar 2028
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPI Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
        <KPICard label="Grant Period" value="24 mo" sub="Apr 2026 – Mar 2028" />
        <KPICard label="Facilities Target" value="100K+" sub="PPMVs + Pharmacies" />
        <KPICard label="Annual Tests" value="38.5M" sub="mRDT images/year" />
        <KPICard label="States Covered" value="36+FCT" sub="Nationwide by M24" />
        <KPICard label="Providers Trained" value="100K+" sub="PPMVs & pharmacists" />
        <KPICard label="Testing Rate Goal" value="30→60%" sub="Confirmatory testing" />
      </div>

      {/* Progress Overview */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {[
          { label: "IO1: Surveillance", count: io1.filter(r => r.type === "Output").length, completed: 0, color: "hsl(var(--primary))" },
          { label: "IO2: Case Management", count: io2.filter(r => r.type === "Output").length, completed: 0, color: "hsl(var(--secondary))" },
          { label: "IO3: Sustainability", count: io3.filter(r => r.type === "Output").length, completed: 0, color: "hsl(var(--accent))" },
        ].map((io) => (
          <Card key={io.label} className="border-primary/20">
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold">{io.label}</p>
                <span className="text-xs text-muted-foreground">{io.completed}/{io.count} outputs</span>
              </div>
              <Progress value={(io.completed / io.count) * 100} className="h-2" />
              <p className="text-[10px] text-muted-foreground mt-1">Grant not yet started — all outputs pending</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Deliverables Timeline (by Quarter)</CardTitle>
            <p className="text-[11px] text-muted-foreground">Number of outputs due per quarter across the 24-month grant</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="quarter" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="outputs" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Deliverables Due" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Output Distribution by Intermediate Outcome</CardTitle>
            <p className="text-[11px] text-muted-foreground">How outputs are distributed across the three workstreams</p>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <PieChart>
                <Pie data={ioDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name}: ${value}`} labelLine={true}>
                  {ioDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* IO Sections */}
      <div className="space-y-6 mb-6">
        <IOSection io={1} items={io1} />
        <IOSection io={2} items={io2} />
        <IOSection io={3} items={io3} />
      </div>

      {/* Key Milestones */}
      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-primary">🎯 Critical Milestones for the Minister</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { title: "Month 6: Platform Go-Live", detail: "Sproxil surveillance platform operational in 6 foundation states with 8,000–10,000 enrolled facilities processing AI-interpreted mRDT images." },
              { title: "Month 12: Go/No-Go Decision", detail: "Formal mid-grant review determines whether Phase 3 national expansion proceeds — requires 15M cumulative tests, >80% facility retention, and data quality validation." },
              { title: "Month 18: Sustainability Transition", detail: "Incentive model shifts from $545K cash to hybrid monetary/non-monetary. 100,000+ providers trained. Government budget integration pathway documented." },
              { title: "Month 24: Full Handover to NMEP", detail: "NMEP assumes operational control of surveillance system. Financial sustainability validated. Nigeria's first national private sector TPR map established." },
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
