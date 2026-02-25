import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
  ScatterChart, Scatter, ZAxis, Cell,
} from "recharts";
import FilterBar from "@/components/dashboard/FilterBar";
import ExportButton from "@/components/ExportButton";
import KPICard from "@/components/dashboard/KPICard";
import { CheckCircle, Clock, BarChart3, GitCompare } from "lucide-react";
import {
  getCompletenessbyState, getTimelinessTrend, getOutlierData, getHMISComparison,
} from "@/data/phase6Data";

const completenessData = getCompletenessbyState().slice(0, 20);
const timelinessTrend = getTimelinessTrend();
const outlierData = getOutlierData();
const hmisData = getHMISComparison();

export default function DataQuality() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <FilterBar showAge={false} showSex={false} />
      <div className="container py-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">Data Quality Dashboard</h1>
            <p className="text-sm text-muted-foreground">Reporting completeness, timeliness, consistency, and validation against national systems.</p>
          </div>
          <ExportButton />
        </div>

        {/* KPI Row */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
          <KPICard title="Reporting Completeness" value="87.2%" subtitle="of expected facility reports" icon={<CheckCircle className="h-5 w-5 text-success" />} />
          <KPICard title="Reporting Timeliness" value="72.4%" subtitle="within deadline" icon={<Clock className="h-5 w-5 text-accent" />} delay={0.05} />
          <KPICard title="Data Consistency" value="84.1%" subtitle="Cross-indicator score" icon={<BarChart3 className="h-5 w-5 text-secondary" />} delay={0.1} />
        </div>

        {/* Row 1: Completeness by State + Timeliness Trend */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">Completeness by State (%, Top 20)</h3>
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={completenessData} layout="vertical" margin={{ left: 70 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[60, 100]} tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="state" tick={{ fontSize: 10 }} width={65} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="completeness" radius={[0, 4, 4, 0]}>
                  {completenessData.map((d, i) => (
                    <Cell key={i} fill={d.completeness >= 85 ? "hsl(var(--success))" : d.completeness >= 75 ? "hsl(var(--accent))" : "hsl(var(--destructive))"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">Timeliness Trend (12 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelinessTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis domain={[50, 90]} tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${v}%`} />
                <Line type="monotone" dataKey="timeliness" name="Timeliness %" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-2 text-[10px] text-muted-foreground">Target: 80% of reports submitted within the reporting deadline.</p>
          </div>
        </div>

        {/* Row 2: Outlier Scatter */}
        <div className="mb-6 rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">Outlier Detection — Expected vs. Reported Cases</h3>
          <p className="mb-2 text-xs text-muted-foreground">
            LGAs (districts) with reported values deviating significantly from expected ranges are flagged as potential data quality issues.
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" dataKey="expected" name="Expected" tick={{ fontSize: 10 }} label={{ value: "Expected Cases", position: "insideBottom", offset: -5, fontSize: 10 }} />
              <YAxis type="number" dataKey="reported" name="Reported" tick={{ fontSize: 10 }} label={{ value: "Reported Cases", angle: -90, position: "insideLeft", fontSize: 10 }} />
              <ZAxis range={[40, 40]} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                formatter={(v: number, name: string) => [v.toLocaleString(), name]}
                labelFormatter={() => ""}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-card p-2 shadow-lg text-xs">
                      <div className="font-semibold">{d.lga}</div>
                      <div>Expected: {d.expected.toLocaleString()}</div>
                      <div>Reported: {d.reported.toLocaleString()}</div>
                      {d.outlier && <div className="mt-1 font-semibold text-destructive">⚠ Flagged as outlier</div>}
                    </div>
                  );
                }}
              />
              <Scatter data={outlierData} name="LGAs">
                {outlierData.map((d, i) => (
                  <Cell key={i} fill={d.outlier ? "hsl(var(--destructive))" : "hsl(var(--secondary)/0.6)"} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-center gap-4 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="h-2.5 w-2.5 rounded-full bg-secondary/60" />
              Normal range
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
              Flagged outlier
            </div>
          </div>
        </div>

        {/* Row 3: HMIS Comparison */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <GitCompare className="h-4 w-4 text-secondary" />
            <h3 className="font-heading text-sm font-semibold">Sproxil vs. DHIS2/HMIS Data Concordance</h3>
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            Comparison of Sproxil survey data against Nigeria's District Health Information System (DHIS2) for overlapping indicators,
            demonstrating data validation and concordance.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="px-3 py-2 font-medium">Indicator</th>
                  <th className="px-3 py-2 text-right font-medium">DHIS2/HMIS</th>
                  <th className="px-3 py-2 text-right font-medium">Sproxil Platform</th>
                  <th className="px-3 py-2 text-right font-medium">Concordance</th>
                </tr>
              </thead>
              <tbody>
                {hmisData.map((row) => (
                  <tr key={row.indicator} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="px-3 py-2 font-medium">{row.indicator}</td>
                    <td className="px-3 py-2 text-right">{row.hmis}</td>
                    <td className="px-3 py-2 text-right font-semibold text-secondary">{row.sproxil}</td>
                    <td className="px-3 py-2 text-right">
                      <span className="rounded bg-success/10 px-1.5 py-0.5 font-semibold text-success">{row.concordance}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
