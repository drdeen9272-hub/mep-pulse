import { useState } from "react";
import { Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExportButtonProps {
  onExport?: (format: "csv" | "pdf" | "excel") => void;
  className?: string;
}

export default function ExportButton({ onExport, className }: ExportButtonProps) {
  const [open, setOpen] = useState(false);

  const formats = [
    { key: "csv" as const, label: "Export as CSV" },
    { key: "pdf" as const, label: "Export as PDF Report" },
    { key: "excel" as const, label: "Export as Excel" },
  ];

  return (
    <div className={cn("relative", className)} onMouseLeave={() => setOpen(false)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Export Data
        <ChevronDown className="h-3 w-3" />
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute right-0 top-full z-10 mt-1 min-w-[180px] rounded-md border bg-card p-1 shadow-lg"
          >
            {formats.map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  onExport?.(f.key);
                  setOpen(false);
                }}
                className="block w-full rounded-sm px-3 py-2 text-left text-sm hover:bg-muted"
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
