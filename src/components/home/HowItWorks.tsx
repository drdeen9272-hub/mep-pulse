import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import { Check, Camera, ClipboardList, Banknote, Send, MessageSquare } from "lucide-react";

const tabs = [
  {
    key: "test",
    label: "Test",
    icon: Camera,
    phone: (
      <div className="space-y-2 p-1">
        <div className="flex items-center gap-2 border-b pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-success text-[10px] font-bold text-success-foreground">A</div>
          <div>
            <div className="text-xs font-semibold">AISHA Health</div>
            <div className="text-[10px] text-muted-foreground">WhatsApp</div>
          </div>
        </div>
        <div className="flex items-end gap-2">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success text-[8px] text-success-foreground">A</div>
          <div className="max-w-[80%] rounded-xl rounded-bl-sm bg-muted px-3 py-2 text-xs">
            Welcome! Send a photo of the RDT cassette for AI interpretation.
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[75%] space-y-1 rounded-xl rounded-br-sm bg-secondary px-3 py-2">
            <div className="flex items-center gap-1 text-[10px] text-secondary-foreground">
              <Camera className="h-3 w-3" /> Photo
            </div>
            <div className="h-16 rounded bg-secondary-foreground/10 flex items-center justify-center text-[10px] text-secondary-foreground/50">RDT Image</div>
          </div>
        </div>
        <div className="flex items-end gap-2">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success text-[8px] text-success-foreground">A</div>
          <div className="max-w-[80%] space-y-1 rounded-xl rounded-bl-sm bg-muted px-3 py-2 text-xs">
            <div className="font-bold text-destructive">Result: POSITIVE</div>
            <div className="text-muted-foreground">P. falciparum detected. Confidence: 96.8%</div>
            <div className="text-muted-foreground">Recommend ACT treatment immediately.</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "treat",
    label: "Treat",
    icon: Check,
    phone: (
      <div className="space-y-2 p-1">
        <div className="text-center text-xs font-semibold text-muted-foreground">SMS • 38353</div>
        <div className="flex justify-end">
          <div className="max-w-[75%] rounded-xl rounded-br-sm bg-secondary px-3 py-2 text-xs text-secondary-foreground">
            K9M2X7
          </div>
        </div>
        <div className="flex items-end gap-2">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[8px] text-primary-foreground">S</div>
          <div className="max-w-[80%] space-y-2 rounded-xl rounded-bl-sm bg-muted px-3 py-2 text-xs">
            <div className="flex items-center gap-1 font-bold text-success">
              <Check className="h-3 w-3" /> OK – ORIGINAL
            </div>
            <p className="font-medium">Coartem 80/480mg</p>
            <p className="text-muted-foreground">Manufacturer: Novartis</p>
            <p className="text-muted-foreground">Batch: NV2024031</p>
            <p className="text-muted-foreground">Verified by NAFDAC</p>
          </div>
        </div>
        <div className="rounded-lg border border-success/30 bg-success/5 p-2 text-center text-[10px] text-success">
          ✓ This medicine is genuine and safe to use
        </div>
      </div>
    ),
  },
  {
    key: "track",
    label: "Track",
    icon: ClipboardList,
    phone: (
      <div className="space-y-2 p-1">
        <div className="text-center text-xs font-semibold">Health Survey</div>
        <div className="rounded-full bg-secondary/20 h-2 overflow-hidden">
          <div className="h-full w-[79%] rounded-full bg-secondary" />
        </div>
        <div className="text-right text-[10px] text-muted-foreground">78.8% avg completion</div>
        <div className="space-y-3 pt-1">
          {[
            { q: "Did anyone in your household sleep under a mosquito net last night?", a: ["Yes", "No"] },
            { q: "Has anyone had fever in the last 2 weeks?", a: ["Yes", "No"] },
            { q: "Where did you seek treatment?", a: ["PPMV", "Hospital", "None"] },
          ].map((item, i) => (
            <div key={i} className="space-y-1.5">
              <div className="text-xs font-medium">{item.q}</div>
              <div className="flex flex-wrap gap-1">
                {item.a.map((opt, j) => (
                  <button
                    key={opt}
                    className={`rounded-full px-3 py-1 text-[10px] font-medium transition ${
                      j === 0
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-lg bg-muted p-2">
          <span className="text-[10px] text-muted-foreground">📍 GPS: 11.9964° N, 8.5167° E</span>
        </div>
      </div>
    ),
  },
  {
    key: "incentivize",
    label: "Incentivize",
    icon: Banknote,
    phone: (
      <div className="flex flex-col items-center space-y-3 p-1 pt-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/20">
          <Check className="h-7 w-7 text-success" />
        </div>
        <div className="text-center">
          <div className="text-sm font-bold">Reward Credited!</div>
          <div className="text-[10px] text-muted-foreground">Thank you for completing your health survey</div>
        </div>
        <div className="w-full space-y-2">
          <div className="rounded-lg border p-3">
            <div className="text-[10px] text-muted-foreground">Patient Airtime Reward</div>
            <div className="font-heading text-xl font-bold text-success">₦850</div>
            <div className="text-[8px] text-muted-foreground">(~$0.50 USD)</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-[10px] text-muted-foreground">PPMV Incentive</div>
            <div className="font-heading text-lg font-bold text-secondary">₦150</div>
            <div className="text-[8px] text-muted-foreground">(~$0.09 USD)</div>
          </div>
        </div>
        <div className="rounded-lg bg-accent/10 p-2 text-center text-[10px] text-accent-foreground">
          <Banknote className="mr-1 inline h-3 w-3" />
          Total disbursed this month: ₦4,250,000
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState("test");
  const current = tabs.find((t) => t.key === active)!;

  return (
    <section id="how-it-works" className="bg-muted/50 py-16 md:py-24">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">See How It Works</h2>
          <p className="mt-2 text-muted-foreground">
            The AISHA platform integrates testing, treatment verification, data collection, and incentives into a single patient journey.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="mx-auto mb-8 flex max-w-lg justify-center gap-1 rounded-full bg-card p-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Phone */}
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PhoneMockup scale="lg">{current.phone}</PhoneMockup>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
