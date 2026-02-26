import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, X, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { africanCountries, type AfricanCountry } from "@/data/africaData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ExportButton from "@/components/ExportButton";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell,
} from "recharts";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(25 80% 50%)",
  "hsl(280 60% 55%)",
  "hsl(140 60% 40%)",
];

const sorted = [...africanCountries].sort((a, b) => a.name.localeCompare(b.name));

// Default: top 3 burden countries
const defaultCodes = ["NG", "CD", "UG"];

export default function CountryComparison() {
  const navigate = useNavigate();
  const [selectedCodes, setSelectedCodes] = useState<string[]>(defaultCodes);

  const selected = selectedCodes.map(c => africanCountries.find(x => x.code === c)!).filter(Boolean);

  const addCountry = (code: string) => {
    if (code && !selectedCodes.includes(code) && selectedCodes.length < 5) {
      setSelectedCodes([...selectedCodes, code]);
    }
  };

  const removeCountry = (code: string) => {
    if (selectedCodes.length > 2) {
      setSelectedCodes(selectedCodes.filter(c => c !== code));
    }
  };

  // Radar data — normalized to 0-100 scale
  const maxIncidence = Math.max(...selected.map(c => c.incidencePerThousand));
  const radarIndicators = ["ITN Coverage", "ACT Coverage", "RDT Testing", "Low Incidence", "Low Mortality"];
  const radarData = radarIndicators.map((indicator, i) => {
    const row: Record<string, string | number> = { indicator };
    selected.forEach(c => {
      let val = 0;
      if (i === 0) val = c.itnCoverage;
      else if (i === 1) val = c.actCoverage;
      else if (i === 2) val = c.rdtTestingRate;
      else if (i === 3) val = Math.max(0, 100 - (c.incidencePerThousand / maxIncidence) * 100);
      else if (i === 4) val = Math.max(0, 100 - c.mortalityPer100k);
      row[c.name] = Math.round(val);
    });
    return row;
  });

  // Bar chart data
  const barMetrics: { key: keyof AfricanCountry; label: string; unit: string }[] = [
    { key: "estimatedCases", label: "Cases (thousands)", unit: "K" },
    { key: "estimatedDeaths", label: "Deaths", unit: "" },
    { key: "incidencePerThousand", label: "Incidence / 1,000", unit: "" },
    { key: "mortalityPer100k", label: "Mortality / 100K", unit: "" },
    { key: "itnCoverage", label: "ITN Coverage %", unit: "%" },
    { key: "actCoverage", label: "ACT Coverage %", unit: "%" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="container py-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button onClick={() => navigate("/dashboard/africa")} className="mb-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Africa Overview
          </button>
          <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" /> Country Comparison
          </h1>
          <p className="text-sm text-muted-foreground">Compare 2–5 African countries across key malaria indicators</p>
        </div>
        <ExportButton />
      </div>

      {/* Country selector chips */}
      <div className="mb-6 rounded-xl border bg-card p-4 shadow-sm">
        <p className="text-xs font-medium text-muted-foreground mb-3">Selected Countries ({selected.length}/5)</p>
        <div className="flex flex-wrap items-center gap-2">
          {selected.map((c, i) => (
            <span
              key={c.code}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white"
              style={{ background: COLORS[i] }}
            >
              {c.flag} {c.name}
              {selectedCodes.length > 2 && (
                <button onClick={() => removeCountry(c.code)} className="ml-0.5 hover:opacity-80">
                  <X className="h-3 w-3" />
                </button>
              )}
            </span>
          ))}
          {selectedCodes.length < 5 && (
            <Select onValueChange={addCountry}>
              <SelectTrigger className="w-[180px] h-8 text-xs">
                <Plus className="h-3 w-3 mr-1" />
                <SelectValue placeholder="Add country..." />
              </SelectTrigger>
              <SelectContent className="z-50 bg-card border shadow-lg max-h-[250px]">
                {sorted.filter(c => !selectedCodes.includes(c.code)).map(c => (
                  <SelectItem key={c.code} value={c.code}>{c.flag} {c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Radar + Summary */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">Performance Radar</h3>
          <p className="mb-2 text-[10px] text-muted-foreground">Higher = better. Incidence & mortality inverted so outward = less burden.</p>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="indicator" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8 }} />
              {selected.map((c, i) => (
                <Radar key={c.code} name={c.name} dataKey={c.name} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.15} strokeWidth={2} />
              ))}
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Comparison table */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">Side-by-Side Indicators</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-2 pr-3">Indicator</th>
                  {selected.map((c, i) => (
                    <th key={c.code} className="pb-2 pr-3 text-right">
                      <span className="inline-block h-2 w-2 rounded-full mr-1" style={{ background: COLORS[i] }} />
                      {c.flag} {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Population (M)", fn: (c: AfricanCountry) => c.population.toFixed(1) },
                  { label: "Cases (K)", fn: (c: AfricanCountry) => c.estimatedCases.toLocaleString() },
                  { label: "Deaths", fn: (c: AfricanCountry) => c.estimatedDeaths.toLocaleString() },
                  { label: "Cases % (Global)", fn: (c: AfricanCountry) => `${c.casesSharePct}%` },
                  { label: "Deaths % (Global)", fn: (c: AfricanCountry) => `${c.deathsSharePct}%` },
                  { label: "Incidence /1K", fn: (c: AfricanCountry) => String(c.incidencePerThousand) },
                  { label: "Mortality /100K", fn: (c: AfricanCountry) => String(c.mortalityPer100k) },
                  { label: "ITN Coverage", fn: (c: AfricanCountry) => `${c.itnCoverage}%` },
                  { label: "ACT Coverage", fn: (c: AfricanCountry) => `${c.actCoverage}%` },
                  { label: "RDT Testing", fn: (c: AfricanCountry) => `${c.rdtTestingRate}%` },
                  { label: "Phase", fn: (c: AfricanCountry) => c.eliminationPhase },
                  { label: "Trend", fn: (c: AfricanCountry) => c.trend },
                ].map(row => (
                  <tr key={row.label} className="border-b border-muted/40">
                    <td className="py-1.5 pr-3 font-medium">{row.label}</td>
                    {selected.map(c => (
                      <td key={c.code} className="py-1.5 pr-3 text-right">{row.fn(c)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bar charts grid */}
      <div className="mb-6">
        <h2 className="mb-4 font-heading text-lg font-semibold">Indicator Breakdown</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {barMetrics.map(metric => {
            const chartData = selected.map((c, i) => ({
              name: c.name,
              value: c[metric.key] as number,
              color: COLORS[i],
            }));
            return (
              <div key={metric.key} className="rounded-xl border bg-card p-4 shadow-sm">
                <h4 className="mb-2 text-xs font-semibold">{metric.label}</h4>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={chartData} margin={{ left: 0, right: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 9 }} />
                    <Tooltip formatter={(v: number) => [metric.key.includes("Cases") ? `${v.toLocaleString()}K` : v.toLocaleString(), metric.label]} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {chartData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            );
          })}
        </div>
      </div>

      {/* Note */}
      <div className="rounded-xl border bg-muted/30 p-4 text-xs text-muted-foreground">
        <strong>Note:</strong> All data aligned with the WHO World Malaria Report 2025. Coverage indicators are national estimates and may vary subnationally.
      </div>
    </motion.div>
  );
}
