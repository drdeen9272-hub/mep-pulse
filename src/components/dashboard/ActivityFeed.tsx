import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Microscope, ClipboardList, Banknote } from "lucide-react";
import { generateActivityFeed } from "@/data/nigeriaData";

const typeIcons = {
  auth: ShieldCheck,
  rdt: Microscope,
  survey: ClipboardList,
  transfer: Banknote,
};

const typeColors = {
  auth: "text-secondary",
  rdt: "text-destructive",
  survey: "text-primary",
  transfer: "text-success",
};

export default function ActivityFeed() {
  const allItems = useRef(generateActivityFeed());
  const [visible, setVisible] = useState(allItems.current.slice(0, 4));
  const idx = useRef(4);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = allItems.current[idx.current % allItems.current.length];
      // Update time for freshness
      const updated = { ...next, time: "just now", id: Date.now() };
      setVisible((prev) => [updated, ...prev.slice(0, 4)]);
      idx.current++;
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="mb-4 font-heading text-sm font-semibold">Live Activity Feed</h3>
      <div className="space-y-1">
        <AnimatePresence initial={false}>
          {visible.map((item) => {
            const Icon = typeIcons[item.type];
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="flex items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-muted/50"
              >
                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${typeColors[item.type]}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs leading-relaxed">{item.text}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{item.time}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
