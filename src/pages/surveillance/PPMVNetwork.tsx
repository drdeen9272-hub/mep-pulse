import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from "recharts";
import FilterBar from "@/components/dashboard/FilterBar";
import ExportButton from "@/components/ExportButton";
import KPICard from "@/components/dashboard/KPICard";
import { MapPin, TestTube, ShieldCheck, TrendingUp } from "lucide-react";
import { nigeriaStates, getStateBurden } from "@/data/nigeriaData";
import { generatePPMVRegistry, getPPMVStateLeaderboard, getPPMVEnrollmentTrend } from "@/data/surveillanceData";

const ppvms = generatePPMVRegistry();
const leaderboard = getPPMVStateLeaderboard();
const enrollTrend = getPPMVEnrollmentTrend();

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

export default function PPMVNetwork() {
  const [page, setPage] = useState(0);
  const perPage = 15;
  const totalPages = Math.ceil(ppvms.length / perPage);
  const slice = ppvms.slice(page * perPage, (page + 1) * perPage);

  // State PPMV counts for map
  const statePPMVCounts = leaderboard.reduce((acc, s) => { acc[s.state] = s.ppvms; return acc; }, {} as Record<string, number>);
  const maxCount = Math.max(...Object.values(statePPMVCounts));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <FilterBar showAge={false} showSex={false} />
      <div className="container py-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">PPMV Network</h1>
            <p className="text-sm text-muted-foreground">
              8,000+ PPMVs (Patent and Proprietary Medicine Vendors — community pharmacies and drug shops that serve as the
              primary point of healthcare access for most Nigerians) enrolled and tracked.
            </p>
          </div>
          <ExportButton />
        </div>

        {/* KPIs */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KPICard title="Enrolled PPMVs" value="8,247" icon={<MapPin className="h-5 w-5 text-secondary" />} />
          <KPICard title="Tests Conducted" value="1.2M" subtitle="Via PPMV network" icon={<TestTube className="h-5 w-5 text-primary" />} delay={0.05} />
          <KPICard title="Drugs Authenticated" value="4.8M" subtitle="Verified genuine" icon={<ShieldCheck className="h-5 w-5 text-success" />} delay={0.1} />
          <KPICard title="Growth Rate" value="+18.2%" subtitle="Year-over-year" icon={<TrendingUp className="h-5 w-5 text-accent" />} delay={0.15} />
        </div>

        {/* Row 1: Map + Leaderboard */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">PPMV Distribution by State</h3>
            <svg viewBox="10 10 340 280" className="w-full">
              {nigeriaStates.map((s) => {
                const pos = statePositions[s.code];
                if (!pos) return null;
                const count = statePPMVCounts[s.name] || 10;
                const ratio = count / maxCount;
                return (
                  <g key={s.code}>
                    <circle
                      cx={pos.x} cy={pos.y}
                      r={Math.max(6, ratio * 16)}
                      fill="hsl(var(--secondary))"
                      opacity={0.3 + ratio * 0.5}
                      stroke="hsl(var(--secondary))"
                      strokeWidth="1"
                    />
                    <text x={pos.x} y={pos.y + 1} textAnchor="middle" dominantBaseline="central"
                      className="pointer-events-none fill-foreground text-[6px] font-medium">{s.code}</text>
                  </g>
                );
              })}
            </svg>
            <p className="mt-1 text-center text-[10px] text-muted-foreground">Bubble size indicates PPMV concentration</p>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">State Leaderboard (Top 15)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="px-2 py-2 font-medium">#</th>
                    <th className="px-2 py-2 font-medium">State</th>
                    <th className="px-2 py-2 text-right font-medium">PPMVs</th>
                    <th className="px-2 py-2 text-right font-medium">Avg Tests</th>
                    <th className="px-2 py-2 text-right font-medium">Avg Score</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((s, i) => (
                    <tr key={s.state} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="px-2 py-1.5 font-medium">{i + 1}</td>
                      <td className="px-2 py-1.5 font-medium">{s.state}</td>
                      <td className="px-2 py-1.5 text-right">{s.ppvms.toLocaleString()}</td>
                      <td className="px-2 py-1.5 text-right">{s.avgTests}</td>
                      <td className="px-2 py-1.5 text-right">
                        <span className={`rounded px-1 py-0.5 font-medium ${
                          s.avgScore >= 80 ? "bg-success/10 text-success" : s.avgScore >= 70 ? "bg-accent/10 text-accent-foreground" : "text-muted-foreground"
                        }`}>{s.avgScore}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Row 2: Enrollment Trend */}
        <div className="mb-6 rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">PPMV Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={enrollTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="quarter" tick={{ fontSize: 10 }} interval={1} angle={-30} textAnchor="end" height={45} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(1)}K`} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => v.toLocaleString()} />
              <Line type="monotone" dataKey="cumulative" name="Total Enrolled" stroke="hsl(var(--secondary))" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Row 3: PPMV Registry Table */}
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="flex items-center justify-between p-5 pb-3">
            <h3 className="font-heading text-sm font-semibold">PPMV Registry (Top Performers)</h3>
            <ExportButton />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="sticky left-0 bg-card px-3 py-2.5 font-medium">PPMV ID</th>
                  <th className="px-3 py-2.5 font-medium">Name</th>
                  <th className="px-3 py-2.5 font-medium">State</th>
                  <th className="px-3 py-2.5 font-medium">LGA</th>
                  <th className="px-3 py-2.5 text-right font-medium">Tests</th>
                  <th className="px-3 py-2.5 text-right font-medium">Auth'd</th>
                  <th className="px-3 py-2.5 text-right font-medium">Surveys</th>
                  <th className="px-3 py-2.5 text-right font-medium">Score</th>
                  <th className="px-3 py-2.5 font-medium">Enrolled</th>
                </tr>
              </thead>
              <tbody>
                {slice.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="sticky left-0 bg-card px-3 py-2 font-mono font-medium">{p.id}</td>
                    <td className="px-3 py-2">{p.name}</td>
                    <td className="px-3 py-2">{p.state}</td>
                    <td className="px-3 py-2">{p.lga}</td>
                    <td className="px-3 py-2 text-right">{p.tests}</td>
                    <td className="px-3 py-2 text-right">{p.authenticated}</td>
                    <td className="px-3 py-2 text-right">{p.surveys}</td>
                    <td className="px-3 py-2 text-right">
                      <span className={`rounded px-1.5 py-0.5 font-medium ${
                        p.score >= 85 ? "bg-success/10 text-success" : p.score >= 70 ? "bg-accent/10 text-accent-foreground" : "text-muted-foreground"
                      }`}>{p.score}</span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">{p.enrolled}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t px-4 py-3 text-xs text-muted-foreground">
            <span>Page {page + 1} of {totalPages} ({ppvms.length} PPMVs)</span>
            <div className="flex gap-1">
              <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="rounded border px-2 py-1 disabled:opacity-30">Prev</button>
              <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="rounded border px-2 py-1 disabled:opacity-30">Next</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
