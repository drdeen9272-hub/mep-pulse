import { useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nigeriaStates } from "@/data/nigeriaData";
import { motion, AnimatePresence } from "framer-motion";

interface FilterBarProps {
  showSpecies?: boolean;
  showAge?: boolean;
  showSex?: boolean;
  className?: string;
}

const ageGroups = ["All Ages", "Under 5", "5–14", "15–49", "50+"];
const sexOptions = ["All", "Male", "Female"];
const speciesOptions = ["All Species", "P. falciparum", "P. vivax", "Mixed", "Unknown"];
const states = ["All States", ...nigeriaStates.map((s) => s.name)];

function Select({ label, options, value, onChange, className }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void; className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-md border bg-card py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
}

export default function FilterBar({ showSpecies = false, showAge = true, showSex = true, className }: FilterBarProps) {
  const [state, setState] = useState("All States");
  const [age, setAge] = useState("All Ages");
  const [sex, setSex] = useState("All");
  const [species, setSpecies] = useState("All Species");
  const [dateFrom, setDateFrom] = useState("2024-01");
  const [dateTo, setDateTo] = useState("2024-12");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filters = (
    <>
      <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:items-end md:gap-3">
        <div>
          <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">From</label>
          <input type="month" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
            className="w-full rounded-md border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">To</label>
          <input type="month" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
            className="w-full rounded-md border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <Select label="State" options={states} value={state} onChange={setState} className="min-w-[140px]" />
        {showAge && <Select label="Age Group" options={ageGroups} value={age} onChange={setAge} className="min-w-[110px]" />}
        {showSex && <Select label="Sex" options={sexOptions} value={sex} onChange={setSex} className="min-w-[80px]" />}
        {showSpecies && <Select label="Parasite Species" options={speciesOptions} value={species} onChange={setSpecies} className="min-w-[140px]" />}
      </div>
    </>
  );

  return (
    <div className={cn("sticky top-16 z-30 border-b bg-card/95 backdrop-blur", className)}>
      <div className="container py-3">
        {/* Desktop */}
        <div className="hidden md:block">{filters}</div>
        {/* Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm">
            <span className="flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</span>
            {mobileOpen ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <AnimatePresence>
            {mobileOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-3">
                {filters}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
