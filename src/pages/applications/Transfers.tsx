import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Banknote, CheckCircle2, Users, TrendingUp, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const transferFlow = [
  { type: "system", text: "🎉 Congratulations! You've completed all 3 steps:\n\n✅ Test — RDT completed\n✅ Treat — Verified ACT purchased\n✅ Track — Health survey submitted\n\nYou've earned ₦500!" },
  { type: "system", text: "💰 Transfer Details:\n\nAmount: ₦500.00\nRecipient: 080****4521\nProvider: MTN Mobile Money\nRef: SPX-2024-847291\n\nProcessing..." },
  { type: "system", text: "✅ Transfer Complete!\n\nYour ₦500 reward has been sent to your mobile money wallet.\n\nBalance updated.\n\nThank you for protecting your health! 🇳🇬" },
];

const stats = [
  { label: "Total Disbursed", value: "₦1.8B", icon: Banknote, color: "text-secondary" },
  { label: "Recipients", value: "245K+", icon: Users, color: "text-accent" },
  { label: "Completion Rate", value: "78.3%", icon: CheckCircle2, color: "text-secondary" },
  { label: "Cost per Outcome", value: "₦1,240", icon: TrendingUp, color: "text-accent" },
];

const monthlyDisbursements = [
  { month: "Sep", amount: 180 }, { month: "Oct", amount: 210 }, { month: "Nov", amount: 245 },
  { month: "Dec", amount: 268 }, { month: "Jan", amount: 312 }, { month: "Feb", amount: 340 },
];

const flowSteps = [
  { step: "Test", desc: "Complete malaria RDT via AI reader", completion: 92 },
  { step: "Treat", desc: "Purchase & verify authentic ACT", completion: 85 },
  { step: "Track", desc: "Complete health survey", completion: 78 },
  { step: "Reward", desc: "Receive mobile money transfer", completion: 78 },
];

export default function Transfers() {
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    if (visibleMessages < transferFlow.length) {
      const timer = setTimeout(() => setVisibleMessages((v) => v + 1), 2500);
      return () => clearTimeout(timer);
    }
    const restart = setTimeout(() => setVisibleMessages(0), 4000);
    return () => clearTimeout(restart);
  }, [visibleMessages]);

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">Conditional Transfers</h1>
        <p className="mt-1 text-muted-foreground">Incentive system driving Test-Treat-Track accountability — WMR 2025 reports 282M cases globally; financial incentives improve treatment-seeking and ACT adherence.</p>
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

      {/* Test-Treat-Track Flow */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Test → Treat → Track Flow</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {flowSteps.map((s, i) => (
              <div key={s.step} className="flex items-center gap-2">
                <div className="text-center">
                  <div className={`mx-auto mb-1 flex h-12 w-12 items-center justify-center rounded-full ${s.completion >= 78 ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>
                    <span className="text-sm font-bold">{s.completion}%</span>
                  </div>
                  <p className="text-xs font-semibold">{s.step}</p>
                  <p className="text-[10px] text-muted-foreground max-w-[100px]">{s.desc}</p>
                </div>
                {i < flowSteps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold">Transfer Notification</h2>
          <PhoneMockup>
            <div className="rounded-lg bg-muted/50 p-2 mb-2 text-center">
              <p className="text-xs font-semibold">Sproxil Rewards</p>
            </div>
            <div className="space-y-2">
              <AnimatePresence>
                {transferFlow.slice(0, visibleMessages).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="max-w-[90%] rounded-xl px-3 py-2 text-[11px] leading-snug whitespace-pre-line bg-card border border-border rounded-bl-sm"
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
            <CardHeader className="pb-2"><CardTitle className="text-base">Monthly Disbursements (₦M)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyDisbursements}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => `₦${v}M`} />
                  <Bar dataKey="amount" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Cost-Effectiveness Comparison</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr><th className="p-2 text-left border-b border-border">Approach</th><th className="p-2 text-left border-b border-border">Cost/Outcome</th><th className="p-2 text-left border-b border-border">Compliance</th></tr></thead>
                  <tbody>
                    {[
                      ["Sproxil CCT", "₦1,240", "78%"],
                      ["Traditional CHW", "₦4,800", "45%"],
                      ["Mass Campaign", "₦2,100", "62%"],
                      ["Facility-Only", "₦3,500", "38%"],
                    ].map(([approach, cost, compliance]) => (
                      <tr key={approach}><td className="p-2 border-b border-border font-medium">{approach}</td><td className="p-2 border-b border-border">{cost}</td><td className="p-2 border-b border-border">{compliance}</td></tr>
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
