import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area,
} from "recharts";
import {
  ShieldCheck, Baby, Heart, Pill, Stethoscope, BedDouble,
  TrendingDown, MapPin, Users, Activity,
} from "lucide-react";
import EliminationScore from "@/components/dashboard/EliminationScore";
import {
  misKPIs, prevalenceTrend, itnTrends, itnOwnershipTrend, iptpTrend,
  prevalenceByAge, prevalenceByResidence, prevalenceByZone,
  itnAccessByState, preventionSummary, socioContext,
} from "@/data/misData";

const ZONE_COLORS = [
  "hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))",
  "hsl(var(--destructive))", "hsl(var(--success))", "hsl(var(--muted-foreground))",
];

const iconMap: Record<string, React.ElementType> = {
  shield: ShieldCheck, bed: BedDouble, baby: Baby, heart: Heart,
  pill: Pill, stethoscope: Stethoscope,
};

const kpiCards = [
  { label: "Malaria Prevalence (RDT)", value: `${misKPIs.malariaPrevalenceRDT}%`, icon: Activity, color: "text-destructive", sub: "Children 6–59 months" },
  { label: "Malaria Prevalence (Microscopy)", value: `${misKPIs.malariaPrevalenceMicroscopy}%`, icon: TrendingDown, color: "text-accent", sub: "Down from 42% in 2010" },
  { label: "ITN Ownership", value: `${misKPIs.itnOwnership}%`, icon: ShieldCheck, color: "text-secondary", sub: "Households with ≥1 ITN" },
  { label: "IPTp 3+ Doses", value: `${misKPIs.iptp3Plus}%`, icon: Pill, color: "text-primary", sub: "Up from 17% in 2018" },
  { label: "Women Interviewed", value: misKPIs.womenInterviewed.toLocaleString(), icon: Users, color: "text-secondary", sub: `${misKPIs.clusters} clusters, 99% response` },
  { label: "States Covered", value: "36 + FCT", icon: MapPin, color: "text-accent", sub: "774 LGAs (districts)" },
];

// Top/bottom 10 ITN states
const topStates = itnAccessByState.slice(0, 10);
const bottomStates = itnAccessByState.slice(-10).reverse();

export default function MIS2021() {
  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="border-primary/40 text-primary">MIS 2021</Badge>
          <Badge variant="outline" className="border-secondary/40 text-secondary">Gold Standard</Badge>
        </div>
        <h1 className="font-heading text-3xl font-bold">Nigeria Malaria Indicator Survey 2021</h1>
        <p className="mt-1 text-muted-foreground max-w-3xl">
          AI-reimagined insights from the national MIS — the gold standard for malaria data reporting. Conducted across 568 clusters in all 36 states + FCT, with 13,727 households and 14,476 women interviewed.
        </p>
      </div>

      {/* Elimination Tracking Score */}
      <EliminationScore />

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {kpiCards.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card className="h-full">
              <CardContent className="flex flex-col items-start gap-2 p-4">
                <k.icon className={`h-6 w-6 ${k.color}`} />
                <p className="text-2xl font-bold">{k.value}</p>
                <p className="text-xs font-medium leading-tight">{k.label}</p>
                <p className="text-[10px] text-muted-foreground">{k.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="prevalence">Prevalence</TabsTrigger>
          <TabsTrigger value="prevention">Prevention</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
        </TabsList>

        {/* ── TRENDS TAB ── */}
        <TabsContent value="trends" className="space-y-6 mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Prevalence trend */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Malaria Prevalence Trend (Microscopy)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={prevalenceTrend}>
                    <defs>
                      <linearGradient id="prevGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} domain={[0, 50]} />
                    <Tooltip formatter={(v: number) => `${v}%`} />
                    <Area type="monotone" dataKey="prevalence" stroke="hsl(var(--destructive))" fill="url(#prevGrad)" strokeWidth={3} dot={{ r: 5, fill: "hsl(var(--destructive))" }} />
                  </AreaChart>
                </ResponsiveContainer>
                <p className="mt-2 text-xs text-muted-foreground text-center">
                  ↓ 48% decline from 42% (2010) to 22% (2021) — but pace is slowing
                </p>
              </CardContent>
            </Card>

            {/* ITN access & use trend */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">ITN Access & Use Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={itnTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} domain={[0, 60]} />
                    <Tooltip formatter={(v: number) => `${v}%`} />
                    <Line type="monotone" dataKey="access" stroke="hsl(var(--secondary))" strokeWidth={2} dot={{ r: 4 }} name="Access" />
                    <Line type="monotone" dataKey="use" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4 }} name="Use" />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
                <p className="mt-2 text-xs text-muted-foreground text-center">
                  Access peaked at 55% in 2015, declined to 43% in 2021 — net replacement cycles matter
                </p>
              </CardContent>
            </Card>

            {/* ITN Ownership trend */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">ITN Ownership Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={itnOwnershipTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} domain={[0, 80]} />
                    <Tooltip formatter={(v: number) => `${v}%`} />
                    <Bar dataKey="ownership" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="% HH with ≥1 ITN" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* IPTp trend */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">IPTp Coverage Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={iptpTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} domain={[0, 70]} />
                    <Tooltip formatter={(v: number) => `${v}%`} />
                    <Bar dataKey="ipt1" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} name="IPTp 1+ dose" />
                    <Bar dataKey="ipt3" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="IPTp 3+ doses" />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
                <p className="mt-2 text-xs text-muted-foreground text-center">
                  IPTp3+ nearly doubled from 17% to 31% — a major win, but still far from the 60% target
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── PREVALENCE TAB ── */}
        <TabsContent value="prevalence" className="space-y-6 mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* By age */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Malaria Prevalence by Age Group (Children 6–59 mo)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={prevalenceByAge}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="age" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                    <Tooltip formatter={(v: number) => `${v}%`} />
                    <Bar dataKey="rdt" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="RDT" />
                    <Bar dataKey="microscopy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Microscopy" />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
                <p className="mt-2 text-xs text-muted-foreground text-center">
                  Prevalence increases sharply with age — older children (48–59 mo) are nearly 2× more affected than infants
                </p>
              </CardContent>
            </Card>

            {/* By residence */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Urban vs Rural Divide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {prevalenceByResidence.map((r) => (
                  <div key={r.area} className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>{r.area}</span>
                      <span className="text-destructive font-bold">{r.rdt}% RDT</span>
                    </div>
                    <Progress value={r.rdt} className="h-4" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Microscopy: {r.microscopy}%</span>
                      <span>{r.area === "Rural" ? "1.8× higher than urban" : "Reference"}</span>
                    </div>
                  </div>
                ))}

                <div className="mt-4 rounded-lg bg-muted/50 p-4 text-xs text-muted-foreground space-y-1">
                  <p className="font-semibold text-foreground">Key Insight</p>
                  <p>Rural children are nearly <strong>twice as likely</strong> to have malaria. This urban-rural gap drives national strategy — community-level interventions (PPMVs, SMC) are critical for reaching the most affected populations.</p>
                </div>
              </CardContent>
            </Card>

            {/* By zone */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Malaria Prevalence by Geopolitical Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={prevalenceByZone}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="zone" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} domain={[0, 60]} />
                    <Tooltip formatter={(v: number) => `${v}%`} />
                    <Bar dataKey="rdt" name="RDT" radius={[4, 4, 0, 0]}>
                      {prevalenceByZone.map((_, i) => (
                        <Cell key={i} fill={ZONE_COLORS[i]} />
                      ))}
                    </Bar>
                    <Bar dataKey="microscopy" fill="hsl(var(--primary))" name="Microscopy" radius={[4, 4, 0, 0]} />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
                <p className="mt-2 text-xs text-muted-foreground text-center">
                  North West carries the heaviest burden (51.2% RDT). South West is closest to elimination at 17%.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── PREVENTION TAB ── */}
        <TabsContent value="prevention" className="space-y-6 mt-6">
          {/* Prevention scorecard */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {preventionSummary.map((p, i) => {
              const Icon = iconMap[p.icon] || ShieldCheck;
              const pct = Math.round((p.value / p.target) * 100);
              return (
                <motion.div key={p.indicator} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{p.indicator}</p>
                          <p className="text-xs text-muted-foreground">Target: {p.target}%</p>
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold">{p.value}%</span>
                        <span className={`text-xs font-medium ${pct >= 70 ? "text-success" : pct >= 50 ? "text-accent" : "text-destructive"}`}>
                          {pct}% of target
                        </span>
                      </div>
                      <Progress value={pct} className="h-2" />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Socioeconomic context */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Socioeconomic Context — Why Prevention Gaps Persist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  { label: "Electricity Access", value: socioContext.electricityAccess },
                  { label: "Improved Water", value: socioContext.improvedWater },
                  { label: "Female Literacy", value: socioContext.femaleLiteracy },
                  { label: "Mobile Phone", value: socioContext.mobilePhoneOwnership },
                ].map((s) => (
                  <div key={s.label} className="text-center space-y-2">
                    <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xl font-bold">{s.value}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Only 49% of households have electricity and 56% of women are literate — these structural barriers directly impact health-seeking behaviour and malaria prevention uptake. Mobile phone penetration (82%) offers the strongest channel for digital health interventions.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── GEOGRAPHY TAB ── */}
        <TabsContent value="geography" className="space-y-6 mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Top 10 States — ITN Access</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topStates} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} domain={[0, 80]} />
                    <YAxis dataKey="state" type="category" tick={{ fontSize: 10 }} width={80} />
                    <Tooltip formatter={(v: number) => `${v}%`} />
                    <Bar dataKey="access" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Bottom 10 States — ITN Access</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={bottomStates} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} domain={[0, 30]} />
                    <YAxis dataKey="state" type="category" tick={{ fontSize: 10 }} width={80} />
                    <Tooltip formatter={(v: number) => `${v}%`} />
                    <Bar dataKey="access" fill="hsl(var(--destructive))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Full state heatmap table */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">All 37 States — ITN Access Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 md:grid-cols-8">
                  {itnAccessByState.map((s) => {
                    const bg =
                      s.access >= 60 ? "bg-success/20 text-success" :
                      s.access >= 40 ? "bg-secondary/20 text-secondary" :
                      s.access >= 25 ? "bg-accent/20 text-accent" :
                      "bg-destructive/20 text-destructive";
                    return (
                      <div key={s.state} className={`rounded-md p-2 text-center ${bg}`}>
                        <p className="text-[10px] font-medium truncate">{s.state}</p>
                        <p className="text-sm font-bold">{s.access}%</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 flex gap-4 text-[10px] text-muted-foreground justify-center">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success/40" />≥60%</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-secondary/40" />40–59%</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-accent/40" />25–39%</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-destructive/40" />&lt;25%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Source attribution */}
      <div className="text-center text-[10px] text-muted-foreground border-t pt-4">
        Source: NMEP, NPC, ICF. Nigeria Malaria Indicator Survey 2021 Final Report. Abuja, Nigeria, November 2022.
        <br />Elimination Tracking Score is a Sproxil composite metric — not an official WHO/NMEP indicator.
      </div>
    </div>
  );
}
