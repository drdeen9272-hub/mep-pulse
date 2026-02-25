import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, AlertTriangle, Package, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const smsFlow = [
  { type: "user", text: "PIN 7382 9104 2847" },
  { type: "system", text: "✅ OK ORIGINAL\n\nProduct: Coartem 80/480mg\nManufacturer: Novartis\nBatch: CT-2024-0847\nExpiry: 2026-03\n\nThis medicine is genuine.\nThank you for verifying!" },
  { type: "user", text: "PIN 9281 4523 1095" },
  { type: "system", text: "⚠️ ALERT: SUSPECT\n\nThis code has been verified 4 times previously from different locations.\n\nDo NOT use this product.\nReport to NAFDAC: 0800-162-3322" },
];

const stats = [
  { label: "Total Authentications", value: "4.5B+", icon: ShieldCheck, color: "text-secondary" },
  { label: "Counterfeits Flagged", value: "12,847", icon: AlertTriangle, color: "text-destructive" },
  { label: "Products Covered", value: "2,340+", icon: Package, color: "text-accent" },
  { label: "Monthly Growth", value: "+8.3%", icon: TrendingUp, color: "text-secondary" },
];

const monthlyData = [
  { month: "Jul", auths: 380 }, { month: "Aug", auths: 412 }, { month: "Sep", auths: 445 },
  { month: "Oct", auths: 478 }, { month: "Nov", auths: 502 }, { month: "Dec", auths: 534 },
  { month: "Jan", auths: 561 }, { month: "Feb", auths: 589 },
];

const resultBreakdown = [
  { name: "Genuine", value: 4487153, color: "hsl(142, 71%, 45%)" },
  { name: "Suspect", value: 12847, color: "hsl(0, 84%, 60%)" },
  { name: "Already Verified", value: 45230, color: "hsl(30, 93%, 54%)" },
];

export default function Authentication() {
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    if (visibleMessages < smsFlow.length) {
      const timer = setTimeout(() => setVisibleMessages((v) => v + 1), 1800);
      return () => clearTimeout(timer);
    }
    const restart = setTimeout(() => setVisibleMessages(0), 4000);
    return () => clearTimeout(restart);
  }, [visibleMessages]);

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">Product Authentication</h1>
        <p className="mt-1 text-muted-foreground">Scratch-and-verify SMS/WhatsApp pharmaceutical authentication protecting consumers from counterfeits.</p>
      </div>

      {/* Stats */}
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
        {/* Phone mockup */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold">SMS Verification Flow</h2>
          <PhoneMockup>
            <div className="rounded-lg bg-muted/50 p-2 mb-2 text-center">
              <p className="text-xs font-semibold">Sproxil Verify</p>
            </div>
            <div className="space-y-2">
              <AnimatePresence>
                {smsFlow.slice(0, visibleMessages).map((msg, i) => (
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
              {visibleMessages < smsFlow.length && (
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2 }} className="flex gap-1 px-3 py-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                  <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                  <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                </motion.div>
              )}
            </div>
          </PhoneMockup>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Verification Results</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={resultBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                    {resultBreakdown.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => v.toLocaleString()} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                {resultBreakdown.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Monthly Authentications (M)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="auths" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Badge variant="outline" className="mt-0.5 shrink-0">How it works</Badge>
            <p className="text-sm text-muted-foreground">
              Consumers scratch a panel on the drug packaging to reveal a unique PIN. They send this PIN via SMS or WhatsApp to a short code.
              The system checks the code against the manufacturer database and instantly replies with the product's authenticity status,
              batch details, and expiry date. Suspected counterfeits trigger alerts to NAFDAC and the manufacturer.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
