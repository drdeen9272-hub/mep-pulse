import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, FunnelChart, Funnel, LabelList, Cell,
} from "recharts";
import FilterBar from "@/components/dashboard/FilterBar";
import ExportButton from "@/components/ExportButton";
import KPICard from "@/components/dashboard/KPICard";
import { Microscope, TestTube, Brain, Activity, Info } from "lucide-react";
import { getRDTvsMicroscopyTrend, getTreatmentCascade, getACTBrands, getAIConfusionMatrix } from "@/data/phase5Data";

const rdtTrend = getRDTvsMicroscopyTrend();
const cascade = getTreatmentCascade();
const actBrands = getACTBrands();
const cm = getAIConfusionMatrix();

function ComplianceGauge({ value, target }: { value: number; target: number }) {
  const angle = (value / 100) * 180;
  const targetAngle = (target / 100) * 180;
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-full max-w-[240px]">
        {/* Background arc */}
        <path d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke="hsl(var(--muted))" strokeWidth="16" strokeLinecap="round" />
        {/* Value arc */}
        <path
          d={`M 20 110 A 80 80 0 ${angle > 90 ? 1 : 0} 1 ${100 + 80 * Math.cos(Math.PI - (angle * Math.PI) / 180)} ${110 - 80 * Math.sin((angle * Math.PI) / 180)}`}
          fill="none"
          stroke={value >= target ? "hsl(var(--success))" : "hsl(var(--accent))"}
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Target marker */}
        <line
          x1={100 + 70 * Math.cos(Math.PI - (targetAngle * Math.PI) / 180)}
          y1={110 - 70 * Math.sin((targetAngle * Math.PI) / 180)}
          x2={100 + 90 * Math.cos(Math.PI - (targetAngle * Math.PI) / 180)}
          y2={110 - 90 * Math.sin((targetAngle * Math.PI) / 180)}
          stroke="hsl(var(--destructive))"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <text x="100" y="100" textAnchor="middle" className="fill-foreground text-2xl font-bold" style={{ fontSize: 28 }}>
          {value}%
        </text>
        <text x="100" y="116" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: 10 }}>
          Target: {target}%
        </text>
      </svg>
    </div>
  );
}

function ConfusionMatrix() {
  const labels = cm.labels;
  const matrix = cm.matrix;
  const total = matrix.flat().reduce((a, b) => a + b, 0);
  const correct = matrix[0][0] + matrix[1][1] + matrix[2][2];

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="mb-1 font-heading text-sm font-semibold">AI RDT Performance (Confusion Matrix)</h3>
      <p className="mb-3 text-xs text-muted-foreground">AI interpretation vs. expert panel (n={total.toLocaleString()}). Accuracy: {((correct / total) * 100).toFixed(1)}%</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="px-2 py-1.5" />
              <th className="px-2 py-1.5" />
              <th colSpan={3} className="border-b px-2 py-1.5 text-center font-semibold text-muted-foreground">Expert Panel Result</th>
            </tr>
            <tr className="text-muted-foreground">
              <th className="px-2 py-1.5" />
              <th className="px-2 py-1.5" />
              {labels.map((l) => <th key={l} className="px-3 py-1.5 text-center font-medium">{l}</th>)}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                {i === 0 && (
                  <td rowSpan={3} className="px-2 py-1.5 text-center text-[10px] font-semibold text-muted-foreground" style={{ writingMode: "vertical-rl" }}>
                    AI Result
                  </td>
                )}
                <td className="px-2 py-1.5 font-medium">{labels[i]}</td>
                {row.map((val, j) => (
                  <td
                    key={j}
                    className={`px-3 py-2 text-center font-mono text-sm ${
                      i === j ? "bg-success/15 font-bold text-success" : val > 100 ? "bg-destructive/10 text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    {val.toLocaleString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Diagnostics() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <FilterBar showAge showSex />
      <div className="container py-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">Diagnostics & Treatment</h1>
            <p className="text-sm text-muted-foreground">Testing volumes, AI-powered RDT interpretation, treatment cascade, and compliance.</p>
          </div>
          <ExportButton />
        </div>

        {/* KPI Row */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
          <KPICard title="Total Tests" value="28.5M" icon={<TestTube className="h-5 w-5 text-secondary" />} />
          <KPICard title="RDT Tests" value="22.8M" subtitle="80.2% of total" icon={<Microscope className="h-5 w-5 text-primary" />} delay={0.05} />
          <KPICard title="Microscopy" value="5.6M" subtitle="19.8% of total" delay={0.1} />
          <KPICard title="AI-Interpreted RDTs" value="22,341" subtitle="via Audere" icon={<Brain className="h-5 w-5 text-accent" />} delay={0.15} />
          <KPICard title="AI Accuracy" value="96.8%" trend={{ value: "Above 95% target", positive: true }} icon={<Activity className="h-5 w-5 text-success" />} delay={0.2} />
        </div>

        {/* Row 1: RDT vs Microscopy + Treatment Cascade */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">RDT vs. Microscopy Trend (24 months)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={rdtTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} interval={3} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => v.toLocaleString()} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="rdt" name="RDT Tests" stroke="hsl(var(--secondary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="microscopy" name="Microscopy" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} strokeDasharray="5 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">Treatment Cascade</h3>
            <div className="space-y-2">
              {cascade.map((step, i) => (
                <div key={step.stage} className="flex items-center gap-3">
                  <div className="w-36 text-xs font-medium truncate">{step.stage}</div>
                  <div className="flex-1">
                    <div className="h-6 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `hsl(var(--primary) / ${1 - i * 0.12})` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${step.pct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right text-xs">
                    <span className="font-bold">{step.pct}%</span>
                    <span className="ml-1 text-muted-foreground">({(step.value / 1_000_000).toFixed(1)}M)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: ACT Brands + Compliance Gauge */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">ACT Treatment by Brand (Authentication Volume)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={actBrands} layout="vertical" margin={{ left: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} />
                <YAxis type="category" dataKey="brand" tick={{ fontSize: 10 }} width={75} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => v.toLocaleString()} />
                <Bar dataKey="volume" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">First-Line Treatment Compliance</h3>
            <p className="mb-2 text-xs text-muted-foreground">% of confirmed cases receiving recommended ACT</p>
            <ComplianceGauge value={67.3} target={80} />
            <p className="mt-3 text-center text-xs text-muted-foreground">12.7 percentage points below 80% target</p>
          </div>
        </div>

        {/* Row 3: Confusion Matrix */}
        <div className="mb-6">
          <ConfusionMatrix />
        </div>

        {/* Integration Highlight */}
        <div className="mb-6 rounded-xl border-2 border-secondary/30 bg-secondary/5 p-6">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
            <div>
              <h3 className="font-heading text-sm font-semibold text-secondary">Sproxil Test-Treat-Track Integration</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Sproxil's integrated flow verifies both diagnosis accuracy (via AI RDT reader) and treatment quality
                (via pharmaceutical authentication) in a single patient encounter, creating a complete accountability
                chain from symptom to cure. This enables real-time monitoring of treatment compliance at the
                community pharmacy (PPMV) level across Nigeria's 774 Local Government Areas (districts).
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
