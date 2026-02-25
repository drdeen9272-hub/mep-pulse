import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Users, Clock, MapPin } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";

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
        <p className="mt-1 text-muted-foreground">Mobile health surveys triggered after product authentication — building Nigeria's largest real-time Digital MIS.</p>
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
        </div>
      </div>
    </div>
  );
}
