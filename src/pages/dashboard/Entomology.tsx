import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
  LineChart, Line,
} from "recharts";
import FilterBar from "@/components/dashboard/FilterBar";
import ExportButton from "@/components/ExportButton";
import {
  getITNCoverage, getIRSData, getVectorSpecies, getNetDistributionTrend, getResistanceData,
} from "@/data/epidemiologyData";

const itnData = getITNCoverage().slice(0, 20);
const irsData = getIRSData();
const vectorData = getVectorSpecies();
const netTrend = getNetDistributionTrend();
const resistanceData = getResistanceData();

const statePositions: Record<string, { x: number; y: number }> = {
  SO: { x: 90, y: 30 }, KB: { x: 55, y: 55 }, ZA: { x: 110, y: 65 },
  KT: { x: 150, y: 45 }, KN: { x: 180, y: 55 }, JG: { x: 210, y: 40 },
  YO: { x: 260, y: 40 }, BO: { x: 300, y: 50 },
  KD: { x: 155, y: 95 }, BA: { x: 230, y: 85 }, GO: { x: 260, y: 90 },
  AD: { x: 300, y: 100 }, TA: { x: 270, y: 120 },
  NI: { x: 115, y: 120 }, FC: { x: 165, y: 130 }, NA: { x: 195, y: 130 },
  PL: { x: 225, y: 120 }, BE: { x: 210, y: 150 },
  KW: { x: 100, y: 155 }, KG: { x: 150, y: 170 },
  OY: { x: 70, y: 180 }, OS: { x: 85, y: 200 }, EK: { x: 105, y: 210 },
  OG: { x: 55, y: 205 }, LA: { x: 40, y: 220 }, ON: { x: 110, y: 225 },
  ED: { x: 140, y: 215 }, DE: { x: 130, y: 240 },
  AN: { x: 165, y: 220 }, EN: { x: 190, y: 205 }, EB: { x: 210, y: 200 },
  IM: { x: 170, y: 240 }, AB: { x: 185, y: 245 },
  CR: { x: 235, y: 220 }, AK: { x: 215, y: 250 },
  RI: { x: 160, y: 265 }, BY: { x: 140, y: 275 },
};

const statusColors: Record<string, string> = {
  confirmed: "hsl(0 70% 50%)",
  possible: "hsl(45 90% 50%)",
  susceptible: "hsl(142 71% 45%)",
};

export default function Entomology() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <FilterBar showAge={false} showSex={false} />
      <div className="container py-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">Entomology & Vector Control</h1>
            <p className="text-sm text-muted-foreground">
              WMR 2025: Pyrethroid resistance is reducing ITN effectiveness. Dual-ingredient nets and IRS expansion are critical. SMC now reaches 54M children in 20 countries.
            </p>
          </div>
          <ExportButton />
        </div>

        {/* Row 1: ITN Coverage + IRS */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">ITN Coverage by State (%, Top 20)</h3>
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={itnData} layout="vertical" margin={{ left: 70 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="state" tick={{ fontSize: 10 }} width={65} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="coverage" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="mt-2 text-[10px] text-muted-foreground">National average: 55%. Target: 80%</p>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">IRS Coverage by State (%)</h3>
            <p className="mb-2 text-xs text-muted-foreground">States with active Indoor Residual Spraying programmes.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={irsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="state" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="coverage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 2: Resistance Map + Vector Species */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">Insecticide Resistance Status</h3>
            <p className="mb-2 text-xs text-muted-foreground">Pyrethroid resistance by state. Northern zones show confirmed resistance.</p>
            <svg viewBox="10 10 340 280" className="w-full">
              {resistanceData.map((s) => {
                const pos = statePositions[s.code];
                if (!pos) return null;
                return (
                  <circle key={s.code} cx={pos.x} cy={pos.y} r={8}
                    fill={statusColors[s.status]} stroke="hsl(var(--card))" strokeWidth="1.5" opacity={0.85} />
                );
              })}
              {resistanceData.map((s) => {
                const pos = statePositions[s.code];
                if (!pos) return null;
                return (
                  <text key={`t-${s.code}`} x={pos.x} y={pos.y + 1} textAnchor="middle" dominantBaseline="central"
                    className="pointer-events-none fill-foreground text-[6px] font-medium">{s.code}</text>
                );
              })}
            </svg>
            <div className="mt-2 flex justify-center gap-4 text-[10px] text-muted-foreground">
              {[
                { label: "Susceptible", color: statusColors.susceptible },
                { label: "Possible Resistance", color: statusColors.possible },
                { label: "Confirmed Resistance", color: statusColors.confirmed },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">Vector Species Distribution</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={vectorData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}>
                  {vectorData.map((d, i) => (<Cell key={i} fill={d.color} />))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 3: Net Distribution Trend */}
        <div className="mb-6 rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">LLIN Distribution Trend (5-Year)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={netTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="distributed" name="LLINs Distributed" stroke="hsl(var(--secondary))" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="target" name="Target" stroke="hsl(var(--destructive))" strokeWidth={2} strokeDasharray="6 3" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
