import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
  BarChart, Bar,
} from "recharts";
import { generateMonthlyIncidence, getTop10States } from "@/data/nigeriaData";

const incidenceData = generateMonthlyIncidence();
const top10Data = getTop10States();

const ageData = [
  { name: "Under 5", value: 38, color: "hsl(0 70% 50%)" },
  { name: "5–14", value: 27, color: "hsl(25 80% 55%)" },
  { name: "15+", value: 35, color: "hsl(211 53% 23%)" },
];

const diagnosticData = [
  { name: "RDT", confirmed: 62 },
  { name: "Microscopy", confirmed: 18 },
  { name: "Clinical Only", confirmed: 20 },
];

export function IncidenceChart() {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="mb-4 font-heading text-sm font-semibold">
        Monthly Malaria Incidence (per 1,000 pop.)
      </h3>
      <ResponsiveContainer width="100%" height={280}>
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
  );
}

export function AgeDonutChart() {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="mb-2 font-heading text-sm font-semibold">Cases by Age Group</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={ageData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
            {ageData.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
          <Tooltip formatter={(v: number) => `${v}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Top10StatesChart() {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="mb-2 font-heading text-sm font-semibold">Top 10 States by Cases</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={top10Data} layout="vertical" margin={{ left: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis type="number" tick={{ fontSize: 10 }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={55} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          <Bar dataKey="cases" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DiagnosticMethodChart() {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="mb-2 font-heading text-sm font-semibold">Diagnostic Method (%)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={diagnosticData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          <Bar dataKey="confirmed" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
