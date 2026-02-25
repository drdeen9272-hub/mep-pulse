import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import FilterBar from "@/components/dashboard/FilterBar";
import ExportButton from "@/components/ExportButton";
import KPICard from "@/components/dashboard/KPICard";
import { Baby, CloudRain, Pill, FlaskConical } from "lucide-react";
import { getIPTpCoverage, getSMCCoverage, getPMCCoverage, getMDAPilotData } from "@/data/phase5Data";

const iptpData = getIPTpCoverage();
const smcData = getSMCCoverage();
const pmcData = getPMCCoverage();
const mdaData = getMDAPilotData();

export default function Chemoprevention() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <FilterBar showAge={false} showSex={false} />
      <div className="container py-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">Chemoprevention</h1>
            <p className="text-sm text-muted-foreground">
              IPTp (Intermittent Preventive Treatment in Pregnancy), SMC (Seasonal Malaria Chemoprevention),
              PMC (Perennial Malaria Chemoprevention), and MDA (Mass Drug Administration) coverage.
            </p>
          </div>
          <ExportButton />
        </div>

        {/* KPI Row */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KPICard title="IPTp3+ National" value="38.4%" subtitle="Coverage among pregnant women" icon={<Baby className="h-5 w-5 text-accent" />} />
          <KPICard title="SMC Eligible States" value="7" subtitle="Sahel zone states" icon={<CloudRain className="h-5 w-5 text-primary" />} delay={0.05} />
          <KPICard title="PMC Coverage" value="39.6%" subtitle="Children under 2" icon={<Pill className="h-5 w-5 text-secondary" />} delay={0.1} />
          <KPICard title="MDA Pilot Areas" value="4 LGAs" subtitle="Active pilot districts" icon={<FlaskConical className="h-5 w-5 text-success" />} delay={0.15} />
        </div>

        {/* IPTp Coverage */}
        <div className="mb-6 rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">IPTp Coverage by Dose & State (%)</h3>
          <p className="mb-2 text-xs text-muted-foreground">
            Intermittent Preventive Treatment in Pregnancy — percentage of pregnant women receiving each dose at ANC visits.
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={iptpData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="state" tick={{ fontSize: 9 }} interval={0} angle={-35} textAnchor="end" height={50} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${v}%`} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="iptp1" name="IPTp1" fill="hsl(var(--primary))" />
              <Bar dataKey="iptp2" name="IPTp2" fill="hsl(var(--secondary))" />
              <Bar dataKey="iptp3" name="IPTp3+" fill="hsl(var(--accent))" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* SMC Coverage */}
        <div className="mb-6 rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">SMC Coverage by Cycle — Sahel Zone States (%)</h3>
          <p className="mb-2 text-xs text-muted-foreground">
            Seasonal Malaria Chemoprevention delivered in 4 monthly cycles during the rainy season (July–October) to children 3–59 months.
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={smcData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="state" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${v}%`} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="cycle1" name="Cycle 1" fill="hsl(var(--primary))" />
              <Bar dataKey="cycle2" name="Cycle 2" fill="hsl(var(--secondary))" />
              <Bar dataKey="cycle3" name="Cycle 3" fill="hsl(var(--accent))" />
              <Bar dataKey="cycle4" name="Cycle 4" fill="hsl(var(--muted-foreground))" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PMC + MDA side by side */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          {/* PMC */}
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">PMC Coverage — Children Under 2 (%)</h3>
            <p className="mb-2 text-xs text-muted-foreground">Perennial Malaria Chemoprevention for eligible children in high-burden states.</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={pmcData} layout="vertical" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="state" tick={{ fontSize: 10 }} width={55} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="coverage" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* MDA */}
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">MDA Pilot — Pre/Post Incidence</h3>
            <p className="mb-2 text-xs text-muted-foreground">Mass Drug Administration in pilot LGAs (districts) with incidence per 1,000 population.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="px-3 py-2 font-medium">Area</th>
                    <th className="px-3 py-2 text-right font-medium">Pre-MDA</th>
                    <th className="px-3 py-2 text-right font-medium">Post-MDA</th>
                    <th className="px-3 py-2 text-right font-medium">Reduction</th>
                  </tr>
                </thead>
                <tbody>
                  {mdaData.map((row) => (
                    <tr key={row.area} className="border-b last:border-0">
                      <td className="px-3 py-2 font-medium">{row.area}</td>
                      <td className="px-3 py-2 text-right">{row.preIncidence}</td>
                      <td className="px-3 py-2 text-right">{row.postIncidence}</td>
                      <td className="px-3 py-2 text-right">
                        <span className="rounded bg-success/10 px-1.5 py-0.5 font-semibold text-success">-{row.reduction}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
