import { motion } from "framer-motion";
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import FilterBar from "@/components/dashboard/FilterBar";
import ExportButton from "@/components/ExportButton";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { generateOutbreakAlerts, generateOutbreakTimeseries } from "@/data/surveillanceData";

const alerts = generateOutbreakAlerts();
const tsData = generateOutbreakTimeseries();
const activeAlerts = alerts.filter((a) => a.status === "Active").length;

export default function OutbreakDetection() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <FilterBar showAge={false} showSex={false} />
      <div className="container py-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">Outbreak Detection</h1>
            <p className="text-sm text-muted-foreground">
              Automated epidemic threshold monitoring (mean + 2 SD method) and active alert management across LGAs (districts).
            </p>
          </div>
          <ExportButton />
        </div>

        {/* Alert summary */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div>
              <div className="font-heading text-2xl font-bold text-destructive">{activeAlerts}</div>
              <div className="text-sm text-muted-foreground">Active Outbreak Alerts</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
            <CheckCircle className="h-8 w-8 text-success" />
            <div>
              <div className="font-heading text-2xl font-bold">{alerts.length - activeAlerts}</div>
              <div className="text-sm text-muted-foreground">Resolved This Quarter</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
            <Clock className="h-8 w-8 text-accent" />
            <div>
              <div className="font-heading text-2xl font-bold">48h</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
          </div>
        </div>

        {/* Time Series */}
        <div className="mb-6 rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">Weekly Cases vs. Epidemic Threshold (Sokoto LGA)</h3>
          <p className="mb-2 text-xs text-muted-foreground">
            Threshold calculated using mean + 2 standard deviations of the preceding 5-year weekly case counts.
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={tsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} interval={3} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="cases" name="Reported Cases" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.15)" strokeWidth={2} />
              <Line type="monotone" dataKey="mean" name="5-Year Mean" stroke="hsl(var(--muted-foreground))" strokeWidth={1.5} dot={false} strokeDasharray="4 4" />
              <Line type="monotone" dataKey="threshold" name="Epidemic Threshold" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} strokeDasharray="6 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Alert Table */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-heading text-sm font-semibold">Outbreak Alert Panel</h3>
            <ExportButton />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="px-3 py-2.5 font-medium">Alert ID</th>
                  <th className="px-3 py-2.5 font-medium">LGA (District)</th>
                  <th className="px-3 py-2.5 font-medium">State</th>
                  <th className="px-3 py-2.5 font-medium">Status</th>
                  <th className="px-3 py-2.5 font-medium">Severity</th>
                  <th className="px-3 py-2.5 font-medium">Start Date</th>
                  <th className="px-3 py-2.5 text-right font-medium">Cases</th>
                  <th className="px-3 py-2.5 text-right font-medium">Threshold</th>
                  <th className="px-3 py-2.5 font-medium">Response</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((a) => (
                  <tr key={a.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="px-3 py-2 font-mono font-medium">{a.id}</td>
                    <td className="px-3 py-2">{a.lga}</td>
                    <td className="px-3 py-2">{a.state}</td>
                    <td className="px-3 py-2">
                      <span className={`rounded px-1.5 py-0.5 font-medium ${
                        a.status === "Active" ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"
                      }`}>{a.status}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`rounded px-1.5 py-0.5 font-medium ${
                        a.severity === "High" ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent-foreground"
                      }`}>{a.severity}</span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">{a.startDate}</td>
                    <td className="px-3 py-2 text-right font-semibold">{a.cases.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right text-muted-foreground">{a.threshold.toLocaleString()}</td>
                    <td className="px-3 py-2">{a.response}</td>
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
