import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Globe, Brain, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const chatFlow = [
  { type: "system", text: "👋 Hello! I'm AISHA, your AI health assistant.\n\nI can help in English, Hausa, Yoruba, Igbo, or Pidgin.\n\nHow can I help you today?" },
  { type: "user", text: "Ina taimako game da zazzabin cizon sauro" },
  { type: "system", text: "🩺 Na fahimci kuna neman taimako game da zazzabin cizon sauro (malaria).\n\nAlamomin sun haɗa da:\n• Zazzabi\n• Ciwon kai\n• Rawar jiki\n• Gumi\n\nYa kamata ku:\n1️⃣ Je asibiti don gwajin RDT\n2️⃣ Sha maganin ACT idan aka tabbatar\n3️⃣ Sha ruwa da yawa\n\nShin kuna son ƙarin bayani?" },
  { type: "user", text: "Yes, where can I get tested?" },
  { type: "system", text: "📍 Based on your location, the nearest facilities are:\n\n1. PHC Ungwan Rimi — 0.8km\n2. General Hospital Kaduna — 2.1km\n3. PPMV Musa Pharmacy — 0.3km\n   ✅ Sproxil-verified, RDT available\n\nWould you like directions?" },
];

const stats = [
  { label: "Conversations", value: "1.2M+", icon: MessageCircle, color: "text-secondary" },
  { label: "Languages", value: "5", icon: Globe, color: "text-accent" },
  { label: "Accuracy Rate", value: "94.6%", icon: Brain, color: "text-secondary" },
  { label: "Monthly Growth", value: "+15%", icon: TrendingUp, color: "text-accent" },
];

const languageData = [
  { name: "English", value: 42, color: "hsl(211, 53%, 23%)" },
  { name: "Hausa", value: 28, color: "hsl(174, 100%, 33%)" },
  { name: "Pidgin", value: 15, color: "hsl(30, 93%, 54%)" },
  { name: "Yoruba", value: 10, color: "hsl(142, 71%, 45%)" },
  { name: "Igbo", value: 5, color: "hsl(0, 84%, 60%)" },
];

const queryCategories = [
  { category: "Symptom Assessment", pct: 34 },
  { category: "Treatment Guidance", pct: 26 },
  { category: "Facility Finder", pct: 18 },
  { category: "Drug Information", pct: 14 },
  { category: "Prevention Tips", pct: 8 },
];

export default function AISHAChat() {
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    if (visibleMessages < chatFlow.length) {
      const timer = setTimeout(() => setVisibleMessages((v) => v + 1), 2200);
      return () => clearTimeout(timer);
    }
    const restart = setTimeout(() => setVisibleMessages(0), 5000);
    return () => clearTimeout(restart);
  }, [visibleMessages]);

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">AISHA Chat</h1>
        <p className="mt-1 text-muted-foreground">LLM-powered health assistant supporting English, Hausa, Yoruba, Igbo, and Pidgin — delivering personalized health guidance via WhatsApp.</p>
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

      <div className="flex flex-wrap gap-2">
        {["English", "Hausa", "Yoruba", "Igbo", "Pidgin"].map((lang) => (
          <Badge key={lang} variant="secondary" className="text-xs">{lang}</Badge>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold">Multilingual Chat Demo</h2>
          <PhoneMockup>
            <div className="flex items-center gap-2 rounded-lg bg-secondary/10 p-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                <Brain className="h-4 w-4 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-xs font-semibold">AISHA Health Bot</p>
                <p className="text-[10px] text-muted-foreground">AI-powered • 5 languages</p>
              </div>
            </div>
            <div className="space-y-2">
              <AnimatePresence>
                {chatFlow.slice(0, visibleMessages).map((msg, i) => (
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
            <CardHeader className="pb-2"><CardTitle className="text-base">Conversations by Language</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={languageData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                    {languageData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {languageData.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name} ({d.value}%)
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Query Categories</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {queryCategories.map((q) => (
                <div key={q.category}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{q.category}</span>
                    <span className="font-bold">{q.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${q.pct}%` }} transition={{ duration: 1, delay: 0.2 }} className="h-full rounded-full bg-primary" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
