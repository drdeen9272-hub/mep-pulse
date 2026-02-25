import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, Treemap,
} from "recharts";
import FilterBar from "@/components/dashboard/FilterBar";
import ExportButton from "@/components/ExportButton";
import KPICard from "@/components/dashboard/KPICard";
import { Package, AlertTriangle, ShieldCheck } from "lucide-react";
import { getStockStatus, getAuthenticationTreemap, getCounterfeitTimeline, getExpiryTracking } from "@/data/phase5Data";

const stockData = getStockStatus();
const treemapData = getAuthenticationTreemap();
const counterfeitData = getCounterfeitTimeline();
const expiryData = getExpiryTracking();

// Flatten treemap for recharts
const treemapFlat = treemapData.map((d) => ({
  name: `${d.product} (${d.brand})`,
  size: d.volume,
}));

const CustomTreemapContent = (props: any) => {
  const { x, y, width, height, name, index } = props;
  const colors = [
    "hsl(211, 53%, 23%)", "hsl(211, 53%, 33%)", "hsl(174, 100%, 33%)", "hsl(174, 100%, 43%)",
    "hsl(30, 93%, 54%)", "hsl(30, 93%, 64%)", "hsl(211, 53%, 45%)", "hsl(174, 80%, 50%)",
    "hsl(30, 80%, 50%)", "hsl(211, 40%, 55%)",
  ];
  if (width < 30 || height < 20) return null;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={colors[index % colors.length]} stroke="hsl(var(--card))" strokeWidth={2} rx={4} />
      {width > 60 && height > 30 && (
        <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="central" className="fill-white" style={{ fontSize: Math.min(11, width / 10) }}>
          {name?.split("(")[0]?.trim()}
        </text>
      )}
    </g>
  );
};

export default function Commodities() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <FilterBar showAge={false} showSex={false} />
      <div className="container py-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">Commodities & Supply Chain</h1>
            <p className="text-sm text-muted-foreground">Stock status, pharmaceutical authentication volumes, and counterfeit detection.</p>
          </div>
          <ExportButton />
        </div>

        {/* KPI Row */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
          <KPICard title="ACTs in Stock" value="84.7%" subtitle="of facilities nationally" icon={<Package className="h-5 w-5 text-success" />} />
          <KPICard title="RDTs in Stock" value="78.2%" subtitle="of facilities nationally" icon={<Package className="h-5 w-5 text-secondary" />} delay={0.05} />
          <KPICard title="Stock-Out Alerts" value="47 LGAs" trend={{ value: "Active alerts", positive: false }} icon={<AlertTriangle className="h-5 w-5 text-destructive" />} delay={0.1} />
        </div>

        {/* Row 1: Stock Status + Treemap */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">Stock Status by Commodity (%)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="commodity" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${v}%`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="inStock" name="In Stock" fill="hsl(var(--success))" stackId="a" />
                <Bar dataKey="belowMin" name="Below Minimum" fill="hsl(var(--accent))" stackId="a" />
                <Bar dataKey="stockedOut" name="Stocked Out" fill="hsl(var(--destructive))" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-heading text-sm font-semibold">Authentication Volume by Product</h3>
            <ResponsiveContainer width="100%" height={260}>
              <Treemap data={treemapFlat} dataKey="size" nameKey="name" content={<CustomTreemapContent />} />
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 2: Counterfeit Timeline */}
        <div className="mb-6 rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">Counterfeit / Suspicious Product Flags</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={counterfeitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="flagged" name="Flagged" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="resolved" name="Resolved" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Row 3: Expiry Tracking */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-heading text-sm font-semibold">Products Approaching Expiry (90 days)</h3>
            <ExportButton />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="px-3 py-2 font-medium">Product</th>
                  <th className="px-3 py-2 font-medium">Batch</th>
                  <th className="px-3 py-2 text-right font-medium">Quantity</th>
                  <th className="px-3 py-2 font-medium">Expiry Date</th>
                  <th className="px-3 py-2 font-medium">Warehouse</th>
                </tr>
              </thead>
              <tbody>
                {expiryData.map((row) => (
                  <tr key={row.batch} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="px-3 py-2 font-medium">{row.product}</td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">{row.batch}</td>
                    <td className="px-3 py-2 text-right">{row.qty.toLocaleString()}</td>
                    <td className="px-3 py-2">
                      <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-destructive">{row.expiry}</span>
                    </td>
                    <td className="px-3 py-2">{row.warehouse}</td>
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
