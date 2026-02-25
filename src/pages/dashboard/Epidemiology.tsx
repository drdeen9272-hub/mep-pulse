import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, AreaChart, Area,
} from "recharts";
import FilterBar from "@/components/dashboard/FilterBar";
import ExportButton from "@/components/ExportButton";
import {
  generateMonthlyIncidence,
} from "@/data/nigeriaData";
import {
  generateMortalityData,
  generateSeasonalityHeatmap,
  generateEpidemicCurve,
  generateLGATableData,
  getMISComparison,
} from "@/data/epidemiologyData";

const incidenceData = generateMonthlyIncidence();
const mortalityData = generateMortalityData();
const seasonalityData = generateSeasonalityHeatmap();
const epiCurveData = generateEpidemicCurve();
const lgaData = generateLGATableData();
const misData = getMISComparison();

function SeasonalityHeatmap() {
  const data = seasonalityData.slice(0, 20);
  const maxVal = Math.max(...data.flatMap((d) => d.months.map((m) => m.value)));

  const getColor = (v: number) => {
    const ratio = v / maxVal;
    if (ratio > 0.75) return "bg-destructive/80";
    if (ratio > 0.5) return "bg-accent/70";
    if (ratio > 0.3) return "bg-accent/40";
    return "bg-accent/15";
  };

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm overflow-x-auto">
      <h3 className="mb-3 font-heading text-sm font-semibold">Seasonality Heatmap (Cases Intensity)</h3>
      <div className="min-w-[600px]">
        <div className="grid grid-cols-[120px_repeat(12,1fr)] gap-0.5 text-[10px]">
          <div />
          {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
            <div key={m} className="text-center font-medium text-muted-foreground">{m}</div>
          ))}
          {data.map((row) => (
            <div key={row.state} className="contents">
              <div className="flex items-center pr-2 text-xs font-medium truncate">{row.state}</div>
              {row.months.map((cell) => (
                <div
                  key={`${row.state}-${cell.month}`}
                  className={`h-5 rounded-sm ${getColor(cell.value)}`}
                  title={`${row.state} - ${cell.month}: ${cell.value}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
          <span>Low</span>
          <div className="h-3 w-4 rounded-sm bg-accent/15" />
          <div className="h-3 w-4 rounded-sm bg-accent/40" />
          <div className="h-3 w-4 rounded-sm bg-accent/70" />
          <div className="h-3 w-4 rounded-sm bg-destructive/80" />
          <span>High</span>
        </div>
      </div>
    </div>
  );
}

function DataTable() {
  const [page, setPage] = useState(0);
  const perPage = 15;
  const totalPages = Math.ceil(lgaData.length / perPage);
  const slice = lgaData.slice(page * perPage, (page + 1) * perPage);

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-heading text-sm font-semibold">LGA-Level Epidemiological Data</h3>
        <ExportButton />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="sticky left-0 bg-card px-3 py-2 font-medium">State</th>
              <th className="px-3 py-2 font-medium">LGA (District)</th>
              <th className="px-3 py-2 text-right font-medium">Population</th>
              <th className="px-3 py-2 text-right font-medium">Cases</th>
              <th className="px-3 py-2 text-right font-medium">Incidence</th>
              <th className="px-3 py-2 text-right font-medium">TPR %</th>
              <th className="px-3 py-2 text-right font-medium">Deaths</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((row, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                <td className="sticky left-0 bg-card px-3 py-2 font-medium">{row.state}</td>
                <td className="px-3 py-2">{row.lga}</td>
                <td className="px-3 py-2 text-right">{row.population.toLocaleString()}</td>
                <td className="px-3 py-2 text-right">{row.cases.toLocaleString()}</td>
                <td className="px-3 py-2 text-right">{row.incidence}</td>
                <td className="px-3 py-2 text-right">{row.tpr}%</td>
                <td className="px-3 py-2 text-right">{row.deaths}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>Showing {page * perPage + 1}–{Math.min((page + 1) * perPage, lgaData.length)} of {lgaData.length}</span>
        <div className="flex gap-1">
          <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="rounded border px-2 py-1 disabled:opacity-30">Prev</button>
          <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="rounded border px-2 py-1 disabled:opacity-30">Next</button>
        </div>
      </div>
    </div>
  );
}

export default function Epidemiology() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <FilterBar showSpecies showAge showSex />
      <div className="container py-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">Epidemiology Dashboard</h1>
            <p className="text-sm text-muted-foreground">Case data, trends, and geographic distribution across Nigeria.</p>
          </div>
          <ExportButton />
        </div>

        {/* Row 1: Incidence Trend + Mortality */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">Monthly Incidence Trend (per 1,000 pop.)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={incidenceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} interval={2} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="national" name="National Avg" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="northWest" name="North-West" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} strokeDasharray="5 3" />
                <Line type="monotone" dataKey="southWest" name="South-West" stroke="hsl(var(--secondary))" strokeWidth={2} dot={false} strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">Malaria Deaths by State (Top 15)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={mortalityData} layout="vertical" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="state" tick={{ fontSize: 10 }} width={55} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="under5" name="Under 5" stackId="a" fill="hsl(var(--destructive))" />
                <Bar dataKey="over5" name="5+" stackId="a" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 2: Seasonality Heatmap */}
        <div className="mb-6">
          <SeasonalityHeatmap />
        </div>

        {/* Row 3: Epidemic Curve */}
        <div className="mb-6 rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">Epidemiological Curve (Weekly Cases)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={epiCurveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} interval={3} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="cases" name="Confirmed Cases" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.15)" strokeWidth={2} />
              <Line type="monotone" dataKey="threshold" name="Epidemic Threshold" stroke="hsl(var(--destructive))" strokeWidth={2} strokeDasharray="6 3" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Row 4: MIS Comparison */}
        <div className="mb-6 rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">Sproxil Digital MIS vs. National MIS 2021</h3>
          <p className="mb-3 text-xs text-muted-foreground">
            Side-by-side comparison demonstrating data concordance and enhanced reach through Sproxil's digital platform.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="px-3 py-2 font-medium">Indicator</th>
                  <th className="px-3 py-2 text-right font-medium">National MIS 2021</th>
                  <th className="px-3 py-2 text-right font-medium">Sproxil Digital MIS 2024</th>
                </tr>
              </thead>
              <tbody>
                {misData.map((row) => (
                  <tr key={row.indicator} className="border-b last:border-0">
                    <td className="px-3 py-2 font-medium">{row.indicator}</td>
                    <td className="px-3 py-2 text-right">{row.national2021}</td>
                    <td className="px-3 py-2 text-right font-semibold text-secondary">{row.sproxil2024}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Row 5: Data Table */}
        <DataTable />
      </div>
    </motion.div>
  );
}
