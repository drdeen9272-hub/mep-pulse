import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, Users, Clock, MapPin, Activity, Stethoscope, PillBottle, HeartPulse } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  smisKPIs, treatmentSourceData, affordabilityData, bloodSampleData, genderData,
} from "@/data/smisData";

const surveyFlow = [
  { type: "system", text: "🏥 Health Survey — Post-Authentication\n\nThank you for verifying your medicine! Please answer 4 quick questions to help improve healthcare in your area." },
  { type: "system", text: "Q1: What symptoms are you currently experiencing?\n\n1️⃣ Fever\n2️⃣ Headache\n3️⃣ Body pain\n4️⃣ Other" },
  { type: "user", text: "1" },
  { type: "system", text: "Q2: How many days have you had these symptoms?\n\n1️⃣ 1-2 days\n2️⃣ 3-5 days\n3️⃣ More than 5 days" },
  { type: "user", text: "2" },
  { type: "system", text: "Q3: Did you receive a malaria test?\n\n1️⃣ Yes — RDT\n2️⃣ Yes — Microscopy\n3️⃣ No test" },
  { type: "user", text: "1" },
  { type: "system", text: "✅ Thank you! Your responses help improve malaria care in Nigeria. 🇳🇬" },
];

const stats = [
  { label: "Surveys Completed", value: "134K+", icon: ClipboardList, color: "text-secondary" },
  { label: "Unique Respondents", value: "98,200+", icon: Users, color: "text-accent" },
  { label: "Avg. Completion Time", value: "47s", icon: Clock, color: "text-secondary" },
  { label: "States Covered", value: "36/36", icon: MapPin, color: "text-accent" },
];

const categoryData = [
  { category: "Symptoms", count: 134000 },
  { category: "Treatment", count: 128500 },
  { category: "Testing", count: 121000 },
  { category: "Side Effects", count: 89400 },
  { category: "Healthcare Access", count: 72300 },
];

const monthlyTrend = [
  { month: "Sep", surveys: 8200 }, { month: "Oct", surveys: 11400 }, { month: "Nov", surveys: 14800 },
  { month: "Dec", surveys: 16200 }, { month: "Jan", surveys: 19500 }, { month: "Feb", surveys: 22100 },
];

const smisStats = [
  { label: "Not Tested Before Treatment", value: `${smisKPIs.notTestedBeforeTreatment}%`, icon: Activity, color: "text-destructive" },
  { label: "Gov. Hospital as Primary Source", value: `${smisKPIs.govHospitalPrimarySource}%`, icon: Stethoscope, color: "text-primary" },
  { label: "Drugs Very Affordable", value: `${smisKPIs.believeDrugsAffordable}%`, icon: PillBottle, color: "text-secondary" },
  { label: "Blood Sample Taken", value: `${smisKPIs.bloodSampleYes}%`, icon: HeartPulse, color: "text-accent" },
];

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--muted-foreground))",
  "hsl(var(--destructive))",
];

export default function Surveys() {
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    if (visibleMessages < surveyFlow.length) {
      const timer = setTimeout(() => setVisibleMessages((v) => v + 1), 1500);
      return () => clearTimeout(timer);
    }
    const restart = setTimeout(() => setVisibleMessages(0), 4000);
    return () => clearTimeout(restart);
  }, [visibleMessages]);

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">Health Surveys</h1>
        <p className="mt-1 text-muted-foreground">Mobile health surveys triggered after product authentication — WMR 2025 underscores that stronger surveillance is essential as only 42% of funding needs are met.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <s.icon className={`h-8 w-8 ${s.color}`} />
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="smis" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="smis">SMIS 2.0 Insights</TabsTrigger>
          <TabsTrigger value="survey-flow">Survey Flow & Analytics</TabsTrigger>
        </TabsList>

        {/* ── SMIS 2.0 TAB ── */}
        <TabsContent value="smis" className="space-y-6 mt-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-5">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-primary border-primary/40">SMIS 2.0</Badge>
              <h2 className="font-heading text-lg font-bold">Nigeria Malaria Insights Dashboard</h2>
            </div>
            <p className="text-xs text-muted-foreground">Key indicators from the SMIS 2.0 survey, showing how Nigerians access prevention, testing, and treatment.</p>
          </motion.div>

          {/* SMIS KPI cards */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {smisStats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <s.icon className={`h-8 w-8 ${s.color}`} />
                    <div>
                      <p className="text-2xl font-bold">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Treatment Sources */}
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base">Where Do People Seek Malaria Treatment?</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={treatmentSourceData} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                    <YAxis dataKey="source" type="category" tick={{ fontSize: 10 }} width={120} />
                    <Tooltip formatter={(v: number) => `${v}%`} />
                    <Bar dataKey="pct" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Blood Sample Donut */}
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base">Was a Blood Sample Taken Before Treatment?</CardTitle></CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={bloodSampleData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} label={({ name, value }) => `${name}: ${value}%`}>
                      {bloodSampleData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => `${v}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Affordability */}
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base">Rate The Affordability Of Malaria Drugs</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={affordabilityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="rating" tick={{ fontSize: 9 }} angle={-20} textAnchor="end" height={60} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                    <Tooltip formatter={(v: number) => `${v}%`} />
                    <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
                      {affordabilityData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Gender Donut */}
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base">Gender Distribution of Respondents</CardTitle></CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3} label={({ name, value }) => `${name}: ${value}%`}>
                      {genderData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => `${v}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Comparison table */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold mb-2">Digital MIS vs Traditional MIS</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr><th className="p-2 text-left border-b border-border">Metric</th><th className="p-2 text-left border-b border-border">Sproxil Digital</th><th className="p-2 text-left border-b border-border">Traditional</th></tr></thead>
                  <tbody>
                    {[
                      ["Data Latency", "Real-time", "30-90 days"],
                      ["Geographic Granularity", "GPS coordinates", "LGA level"],
                      ["Response Rate", "89%", "42%"],
                      ["Cost per Survey", "₦15", "₦2,800"],
                      ["Fraud Detection", "Built-in", "None"],
                    ].map(([metric, digital, trad]) => (
                      <tr key={metric}><td className="p-2 border-b border-border font-medium">{metric}</td><td className="p-2 border-b border-border text-secondary font-semibold">{digital}</td><td className="p-2 border-b border-border text-muted-foreground">{trad}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── SURVEY FLOW TAB ── */}
        <TabsContent value="survey-flow" className="mt-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-lg font-semibold">Survey Flow (Post-Authentication)</h2>
              <PhoneMockup>
                <div className="rounded-lg bg-muted/50 p-2 mb-2 text-center">
                  <p className="text-xs font-semibold">Sproxil Health Survey</p>
                </div>
                <div className="space-y-2">
                  <AnimatePresence>
                    {surveyFlow.slice(0, visibleMessages).map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`max-w-[90%] rounded-xl px-3 py-2 text-[11px] leading-snug whitespace-pre-line ${
                          msg.type === "user"
                            ? "ml-auto bg-secondary text-secondary-foreground rounded-br-sm"
                            : "bg-card border border-border rounded-bl-sm"
                        }`}
                      >
                        {msg.text}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </PhoneMockup>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-base">Survey Responses by Category</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={categoryData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                      <YAxis dataKey="category" type="category" tick={{ fontSize: 10 }} width={100} />
                      <Tooltip formatter={(v: number) => v.toLocaleString()} />
                      <Bar dataKey="count" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-base">Monthly Survey Growth</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(v: number) => v.toLocaleString()} />
                      <Line type="monotone" dataKey="surveys" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
