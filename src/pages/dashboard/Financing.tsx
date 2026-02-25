import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  LineChart, Line, ComposedChart, Area,
} from "recharts";
import FilterBar from "@/components/dashboard/FilterBar";
import ExportButton from "@/components/ExportButton";
import KPICard from "@/components/dashboard/KPICard";
import { DollarSign, TrendingUp, AlertTriangle, Landmark } from "lucide-react";
import {
  getFundingSources, getExpenditureByIntervention, getFundingGapWaterfall,
  getCostPerIntervention, getDomesticFundingTrend,
} from "@/data/phase6Data";

const fundingData = getFundingSources();
const expenditureData = getExpenditureByIntervention();
const gapData = getFundingGapWaterfall();
const costData = getCostPerIntervention();
const domesticTrend = getDomesticFundingTrend();

export default function Financing() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <FilterBar showAge={false} showSex={false} />
      <div className="container py-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">Financing Dashboard</h1>
            <p className="text-sm text-muted-foreground">Funding sources, expenditure allocation, gap analysis, and cost-effectiveness.</p>
          </div>
          <ExportButton />
        </div>

        {/* Row 1: Funding Sources Donut + Expenditure Bars */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">Funding Sources (%)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={fundingData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={2} dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}>
                  {fundingData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">Expenditure by Intervention (%)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={expenditureData} layout="vertical" margin={{ left: 100 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 40]} tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="intervention" tick={{ fontSize: 10 }} width={95} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="pct" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 2: Funding Gap Waterfall */}
        <div className="mb-6 rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">Funding Gap Analysis (USD Millions)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={gapData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `$${v}M`} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `$${v}M`} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="available" name="Available Funding" fill="hsl(var(--secondary))" stackId="a" />
              <Bar dataKey="gap" name="Funding Gap" fill="hsl(var(--destructive)/0.6)" stackId="a" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="need" name="Total Need" stroke="hsl(var(--foreground))" strokeWidth={2} dot={{ r: 4 }} strokeDasharray="5 3" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Row 3: Cost Table + Domestic Trend */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">Cost per Intervention (USD)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="px-3 py-2 font-medium">Intervention</th>
                    <th className="px-3 py-2 text-right font-medium">Cost/Case Averted</th>
                    <th className="px-3 py-2 text-right font-medium">Cost/DALY</th>
                  </tr>
                </thead>
                <tbody>
                  {costData.map((row) => (
                    <tr key={row.intervention} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="px-3 py-2 font-medium">{row.intervention}</td>
                      <td className="px-3 py-2 text-right">${row.costPerCaseAverted.toFixed(2)}</td>
                      <td className="px-3 py-2 text-right">${row.costPerDALY.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground">
              Sproxil surveillance shows the lowest cost per case averted at $2.80, leveraging existing authentication infrastructure.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">Domestic Funding Trend (USD Millions, 10-Year)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart data={domesticTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `$${v}M`} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `$${v}M`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="total" name="Total Funding" stroke="hsl(var(--border))" fill="hsl(var(--muted))" />
                <Line type="monotone" dataKey="domestic" name="Domestic Allocation" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
