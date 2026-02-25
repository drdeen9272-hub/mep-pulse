import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Zap, Globe } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const menuFlow = [
  { type: "system", text: "🤖 Welcome to Sproxil WhatsApp!\n\nChoose a service:\n\n1️⃣ Verify Medicine\n2️⃣ AI Malaria Test (RDT)\n3️⃣ Health Survey\n4️⃣ AISHA Health Chat\n5️⃣ Check Transfer Status\n6️⃣ Find Nearest Pharmacy\n\nReply with a number." },
  { type: "user", text: "2" },
  { type: "system", text: "📸 AI RDT Reader\n\nPlease send a clear photo of your RDT cassette showing the result window.\n\nTips:\n• Good lighting\n• Place on flat surface\n• Wait 15 min after test" },
  { type: "user", text: "📷 [RDT photo sent]" },
  { type: "system", text: "✅ Result: Pf POSITIVE\nConfidence: 96.5%\n\nPlease visit a nearby facility for ACT treatment. Reply 6 for pharmacy finder." },
];

const stats = [
  { label: "Monthly Users", value: "2.8M", icon: Users, color: "text-secondary" },
  { label: "Messages/Month", value: "18.4M", icon: MessageSquare, color: "text-accent" },
  { label: "Avg Response", value: "1.8s", icon: Zap, color: "text-secondary" },
  { label: "States Active", value: "36/36", icon: Globe, color: "text-accent" },
];

const serviceUsage = [
  { service: "Verify", users: 1420000 },
  { service: "RDT", users: 284500 },
  { service: "Survey", users: 134000 },
  { service: "AISHA", users: 680000 },
  { service: "Transfers", users: 245000 },
  { service: "Pharmacy", users: 89000 },
];

const integrations = [
  { name: "Product Authentication", desc: "Real-time medicine verification via scratch codes", status: "Live" },
  { name: "AI RDT Reader", desc: "Computer vision malaria test interpretation", status: "Live" },
  { name: "Health Surveys", desc: "Post-authentication symptom & treatment surveys", status: "Live" },
  { name: "AISHA LLM", desc: "Multilingual AI health assistant", status: "Live" },
  { name: "Conditional Transfers", desc: "Mobile money incentive disbursement", status: "Live" },
  { name: "Pharmacy Finder", desc: "GPS-based Sproxil PPMV locator", status: "Beta" },
];

export default function WhatsAppBot() {
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    if (visibleMessages < menuFlow.length) {
      const timer = setTimeout(() => setVisibleMessages((v) => v + 1), 2000);
      return () => clearTimeout(timer);
    }
    const restart = setTimeout(() => setVisibleMessages(0), 4000);
    return () => clearTimeout(restart);
  }, [visibleMessages]);

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">WhatsApp Bot</h1>
        <p className="mt-1 text-muted-foreground">Unified WhatsApp interface providing access to all Sproxil AISHA services through a single conversation.</p>
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
          <h2 className="text-lg font-semibold">Unified Menu Experience</h2>
          <PhoneMockup>
            <div className="flex items-center gap-2 rounded-lg bg-[hsl(142,71%,45%)]/10 p-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-[hsl(142,71%,45%)] flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold">Sproxil AISHA</p>
                <p className="text-[10px] text-muted-foreground">Verified Business</p>
              </div>
            </div>
            <div className="space-y-2">
              <AnimatePresence>
                {menuFlow.slice(0, visibleMessages).map((msg, i) => (
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
            <CardHeader className="pb-2"><CardTitle className="text-base">Service Usage (Monthly Users)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={serviceUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="service" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1e6).toFixed(1)}M`} />
                  <Tooltip formatter={(v: number) => v.toLocaleString()} />
                  <Bar dataKey="users" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Integration Status</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {integrations.map((int) => (
                  <div key={int.name} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                    <div>
                      <p className="text-xs font-medium">{int.name}</p>
                      <p className="text-[10px] text-muted-foreground">{int.desc}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${int.status === "Live" ? "bg-[hsl(142,71%,45%)]/10 text-[hsl(142,71%,45%)]" : "bg-accent/10 text-accent"}`}>
                      {int.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
