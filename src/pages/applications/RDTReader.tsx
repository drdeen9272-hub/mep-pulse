import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Brain, CheckCircle2, BarChart3 } from "lucide-react";

const chatFlow = [
  { type: "system", text: "📸 Welcome to Sproxil AI RDT Reader.\n\nPlease take a clear photo of the RDT cassette showing the result window." },
  { type: "user", text: "📷 [Image: RDT cassette photo]" },
  { type: "system", text: "🔍 Analyzing image...\nDetecting control and test lines..." },
  { type: "system", text: "✅ Result: Pf POSITIVE\n\nControl line: ✓ Detected\nPf line: ✓ Detected (strong)\nPv line: ✗ Not detected\n\nConfidence: 97.2%\nSpecies: P. falciparum\n\n⚡ Recommended: ACT treatment\nPlease refer to treatment guidelines." },
];

const stats = [
  { label: "Tests Interpreted", value: "284,500+", icon: Camera, color: "text-secondary" },
  { label: "AI Accuracy", value: "96.8%", icon: Brain, color: "text-accent" },
  { label: "Concordance w/ Experts", value: "98.1%", icon: CheckCircle2, color: "text-secondary" },
  { label: "Avg. Response Time", value: "3.2s", icon: BarChart3, color: "text-accent" },
];

const confusionMatrix = {
  headers: ["", "AI: Positive", "AI: Negative", "AI: Invalid"],
  rows: [
    ["Expert: Positive", "4,821", "48", "12"],
    ["Expert: Negative", "62", "4,634", "8"],
    ["Expert: Invalid", "5", "11", "399"],
  ],
};

export default function RDTReader() {
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    if (visibleMessages < chatFlow.length) {
      const timer = setTimeout(() => setVisibleMessages((v) => v + 1), 2000);
      return () => clearTimeout(timer);
    }
    const restart = setTimeout(() => setVisibleMessages(0), 5000);
    return () => clearTimeout(restart);
  }, [visibleMessages]);

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">AI RDT Reader</h1>
        <p className="mt-1 text-muted-foreground">AI-powered malaria RDT interpretation via WhatsApp — WMR 2025 reports pfhrp2/3 gene deletions in 42 countries, making accurate RDT reading more critical than ever.</p>
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
          <h2 className="text-lg font-semibold">WhatsApp RDT Flow</h2>
          <PhoneMockup>
            <div className="flex items-center gap-2 rounded-lg bg-[hsl(142,71%,45%)]/10 p-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-[hsl(142,71%,45%)] flex items-center justify-center">
                <Camera className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold">Sproxil RDT Reader</p>
                <p className="text-[10px] text-muted-foreground">Online</p>
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
              {visibleMessages < chatFlow.length && (
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2 }} className="flex gap-1 px-3 py-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                  <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                  <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                </motion.div>
              )}
            </div>
          </PhoneMockup>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">AI vs Expert Confusion Matrix</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr>{confusionMatrix.headers.map((h, i) => <th key={i} className="p-2 text-left font-semibold border-b border-border">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {confusionMatrix.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci} className={`p-2 border-b border-border ${ci === 0 ? "font-medium" : ""} ${ri === ci - 1 ? "bg-secondary/10 font-bold" : ""}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Performance Metrics</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Sensitivity", value: 98.8, desc: "Correctly identifies positive results" },
                { label: "Specificity", value: 98.5, desc: "Correctly identifies negative results" },
                { label: "PPV", value: 98.6, desc: "Positive predictive value" },
                { label: "NPV", value: 98.7, desc: "Negative predictive value" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">{m.label}</span>
                    <span className="font-bold">{m.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${m.value}%` }} transition={{ duration: 1, delay: 0.3 }} className="h-full rounded-full bg-secondary" />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{m.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
