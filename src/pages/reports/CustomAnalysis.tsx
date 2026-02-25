import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, BarChart3 } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line, ScatterChart, Scatter,
  XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell,
} from "recharts";

const xOptions = ["State", "Month", "Age Group", "Diagnostic Method", "Parasite Species"];
const yOptions = ["Confirmed Cases", "Test Positivity Rate", "Authentications", "Survey Responses", "RDT Accuracy"];
const chartTypes = ["Bar", "Line", "Scatter", "Pie"] as const;
const filterStates = ["All States", "Lagos", "Kano", "Rivers", "Kaduna", "Oyo", "Abuja FCT"];

type ChartType = typeof chartTypes[number];

const stateData = [
  { name: "Lagos", value: 12400 }, { name: "Kano", value: 18900 }, { name: "Rivers", value: 8700 },
  { name: "Kaduna", value: 15200 }, { name: "Oyo", value: 10800 }, { name: "Abuja", value: 5400 },
  { name: "Borno", value: 21300 }, { name: "Enugu", value: 7600 }, { name: "Sokoto", value: 19100 },
  { name: "Delta", value: 9200 },
];

const monthData = [
  { name: "Jul", value: 14200 }, { name: "Aug", value: 16800 }, { name: "Sep", value: 19400 },
  { name: "Oct", value: 17600 }, { name: "Nov", value: 13200 }, { name: "Dec", value: 10800 },
  { name: "Jan", value: 9400 }, { name: "Feb", value: 11200 },
];

const ageData = [
  { name: "0-4", value: 28400 }, { name: "5-14", value: 22100 }, { name: "15-24", value: 15600 },
  { name: "25-44", value: 18900 }, { name: "45-64", value: 9800 }, { name: "65+", value: 5200 },
];

const COLORS = [
  "hsl(174, 100%, 33%)", "hsl(211, 53%, 23%)", "hsl(30, 93%, 54%)",
  "hsl(142, 71%, 45%)", "hsl(0, 84%, 60%)", "hsl(234, 50%, 14%)",
  "hsl(174, 60%, 50%)", "hsl(211, 40%, 40%)", "hsl(30, 70%, 60%)", "hsl(142, 50%, 55%)",
];

export default function CustomAnalysis() {
  const [xAxis, setXAxis] = useState("State");
  const [yAxis, setYAxis] = useState("Confirmed Cases");
  const [chartType, setChartType] = useState<ChartType>("Bar");
  const [stateFilter, setStateFilter] = useState("All States");

  const data = useMemo(() => {
    if (xAxis === "Month") return monthData;
    if (xAxis === "Age Group") return ageData;
    return stateData;
  }, [xAxis]);

  const renderChart = () => {
    switch (chartType) {
      case "Line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="hsl(var(--secondary))" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        );
      case "Scatter":
        return (
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} name={xAxis} />
            <YAxis dataKey="value" tick={{ fontSize: 10 }} name={yAxis} />
            <Tooltip />
            <Scatter data={data} fill="hsl(var(--secondary))" />
          </ScatterChart>
        );
      case "Pie":
        return (
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      default:
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="value" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
    }
  };

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">Custom Analysis</h1>
        <p className="mt-1 text-muted-foreground">Build on-the-fly visualizations by selecting axes, chart types, and filters.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Query Builder</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">X Axis</label>
              <select value={xAxis} onChange={(e) => setXAxis(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {xOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Y Axis</label>
              <select value={yAxis} onChange={(e) => setYAxis(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {yOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Chart Type</label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {chartTypes.map((ct) => (
                  <Badge key={ct} variant={chartType === ct ? "default" : "outline"} className="cursor-pointer text-xs" onClick={() => setChartType(ct)}>
                    {ct}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">State Filter</label>
              <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {filterStates.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <Button size="sm" variant="outline" className="w-full gap-1.5"><Download className="h-3.5 w-3.5" /> Export Chart</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{yAxis} by {xAxis}</CardTitle>
              <Badge variant="secondary" className="text-[10px]">{chartType} Chart</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              {renderChart()}
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
