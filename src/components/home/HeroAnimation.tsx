import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import { Check, MessageSquare, MapPin, Send, Camera } from "lucide-react";

const frames = [
  {
    key: "verify",
    content: (
      <div className="space-y-3 p-1">
        <div className="text-center text-xs font-semibold text-muted-foreground">SMS • 38353</div>
        <div className="flex justify-end">
          <div className="max-w-[75%] rounded-xl rounded-br-sm bg-secondary px-3 py-2 text-xs text-secondary-foreground">
            A7X92K
          </div>
        </div>
        <div className="flex items-end gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">S</div>
          <div className="max-w-[80%] rounded-xl rounded-bl-sm bg-muted px-3 py-2 text-xs">
            Scratch the label and send the code to <span className="font-semibold">38353</span> to verify your medicine.
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border bg-card p-2">
          <Send className="h-3 w-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Type verification code...</span>
        </div>
      </div>
    ),
  },
  {
    key: "ok-original",
    content: (
      <div className="space-y-3 p-1">
        <div className="text-center text-xs font-semibold text-muted-foreground">SMS • 38353</div>
        <div className="flex justify-end">
          <div className="max-w-[75%] rounded-xl rounded-br-sm bg-secondary px-3 py-2 text-xs text-secondary-foreground">
            A7X92K
          </div>
        </div>
        <div className="flex items-end gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">S</div>
          <div className="max-w-[80%] space-y-2 rounded-xl rounded-bl-sm bg-muted px-3 py-2 text-xs">
            <div className="flex items-center gap-1 font-bold text-success">
              <Check className="h-3 w-3" /> OK – ORIGINAL
            </div>
            <p>Coartem 80/480mg by Novartis. Batch: NV2024031.</p>
            <p className="text-muted-foreground">Complete a short survey and earn ₦1,000 airtime!</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "rdt",
    content: (
      <div className="space-y-3 p-1">
        <div className="flex items-center gap-2 border-b pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-success text-[10px] text-success-foreground">A</div>
          <div>
            <div className="text-xs font-semibold">AISHA Health</div>
            <div className="text-[10px] text-muted-foreground">WhatsApp</div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[75%] space-y-1 rounded-xl rounded-br-sm bg-secondary px-3 py-2">
            <div className="flex items-center gap-1 text-[10px] text-secondary-foreground">
              <Camera className="h-3 w-3" /> RDT Photo sent
            </div>
            <div className="h-12 rounded bg-secondary-foreground/10" />
          </div>
        </div>
        <div className="flex items-end gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-[10px] text-success-foreground">A</div>
          <div className="max-w-[80%] space-y-1 rounded-xl rounded-bl-sm bg-muted px-3 py-2 text-xs">
            <div className="font-bold text-destructive">POSITIVE – Pf detected</div>
            <p className="text-muted-foreground">Confidence: 97.2%. Recommend ACT treatment. Refer patient if severe symptoms.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "map",
    content: (
      <div className="space-y-2 p-1">
        <div className="text-center text-xs font-semibold">Live Surveillance</div>
        <div className="relative flex h-36 items-center justify-center rounded-lg bg-primary/10">
          <svg viewBox="0 0 200 180" className="h-full w-full p-2">
            <path d="M60 20 L100 10 L140 15 L160 40 L170 80 L165 120 L150 150 L120 170 L80 165 L50 140 L35 100 L40 60 Z" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
            {[
              [80, 50], [110, 45], [130, 55], [70, 80], [100, 70],
              [120, 90], [90, 110], [110, 130], [75, 140], [140, 70],
            ].map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={x} cy={y} r="3"
                fill="hsl(var(--accent))"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.5, 1, 0] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              />
            ))}
          </svg>
          <div className="absolute bottom-1 right-1 rounded bg-card/90 px-1.5 py-0.5 text-[8px] font-medium shadow">
            <MapPin className="mr-0.5 inline h-2 w-2" />774 LGAs tracked
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { label: "Cases Today", value: "3,241" },
            { label: "Tests", value: "7,892" },
            { label: "Positivity", value: "42.7%" },
            { label: "Alerts", value: "12" },
          ].map((m) => (
            <div key={m.label} className="rounded bg-muted px-2 py-1 text-center">
              <div className="text-xs font-bold">{m.value}</div>
              <div className="text-[8px] text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "transfer",
    content: (
      <div className="flex flex-col items-center justify-center space-y-3 p-1 pt-6">
        <motion.div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <Check className="h-8 w-8 text-success" />
        </motion.div>
        <div className="text-center">
          <div className="text-sm font-bold">Transfer Successful</div>
          <div className="mt-1 text-xs text-muted-foreground">Conditional incentive credited</div>
        </div>
        <div className="w-full rounded-lg border bg-muted/50 p-3 text-center">
          <div className="font-heading text-2xl font-bold text-success">₦850</div>
          <div className="text-[8px] text-muted-foreground">(~$0.50 USD)</div>
          <div className="text-[10px] text-muted-foreground">Airtime sent to patient</div>
        </div>
        <div className="w-full rounded-lg border bg-muted/50 p-3 text-center">
          <div className="font-heading text-lg font-bold text-secondary">₦150</div>
          <div className="text-[8px] text-muted-foreground">(~$0.09 USD)</div>
          <div className="text-[10px] text-muted-foreground">Credited to PPMV</div>
        </div>
        <div className="text-[9px] text-muted-foreground">Thank you for helping fight malaria!</div>
      </div>
    ),
  },
];

export default function HeroAnimation() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % frames.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PhoneMockup scale="md">
      <AnimatePresence mode="wait">
        <motion.div
          key={frames[index].key}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4 }}
        >
          {frames[index].content}
        </motion.div>
      </AnimatePresence>
    </PhoneMockup>
  );
}
