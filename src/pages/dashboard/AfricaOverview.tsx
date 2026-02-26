import { motion } from "framer-motion";
import { Globe, Activity, ShieldCheck, TrendingDown, TrendingUp, Minus } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import AfricaMap from "@/components/dashboard/AfricaMap";
import CountrySelector from "@/components/dashboard/CountrySelector";
import ExportButton from "@/components/ExportButton";
import { africanCountries, africaRegions, getCountriesByRegion, getTotalAfricaCases, getTotalAfricaDeaths, getTop15ByBurden } from "@/data/africaData";
import { wmr2025KPIs } from "@/data/wmr2025Data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const trendIcon = (t: string) => {
  if (t === "improving") return <TrendingUp className="h-3.5 w-3.5 text-green-600" />;
  if (t === "declining") return <TrendingDown className="h-3.5 w-3.5 text-destructive" />;
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
};

export default function AfricaOverview() {
  const totalCases = getTotalAfricaCases();
  const totalDeaths = getTotalAfricaDeaths();
  const top15 = getTop15ByBurden();
  const improvingCount = africanCountries.filter(c => c.trend === "improving").length;
  const decliningCount = africanCountries.filter(c => c.trend === "declining").length;

  const top15ChartData = top15.map(c => ({
    name: c.name,
    cases: c.estimatedCases,
    color: c.code === "NG" ? "hsl(var(--primary))" : c.code === "CD" ? "hsl(var(--secondary))" : "hsl(var(--muted-foreground) / 0.5)",
  }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="container py-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Africa Malaria Command Centre</h1>
          <p className="text-sm text-muted-foreground">
            Continental overview — {africanCountries.length} countries across the WHO African Region. Data aligned with WMR 2025.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CountrySelector />
          <ExportButton />
        </div>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard
          title="Africa Estimated Cases"
          value={`${Math.round(totalCases / 1000)}M`}
          trend={{ value: "94% of global malaria", positive: false }}
          icon={<Globe className="h-5 w-5 text-destructive" />}
          delay={0}
        />
        <KPICard
          title="Africa Estimated Deaths"
          value={totalDeaths.toLocaleString()}
          trend={{ value: "95% of global deaths", positive: false }}
          icon={<Activity className="h-5 w-5 text-destructive" />}
          delay={0.1}
        />
        <KPICard
          title="Countries Improving"
          value={String(improvingCount)}
          subtitle={`of ${africanCountries.length} countries`}
          icon={<TrendingUp className="h-5 w-5 text-green-600" />}
          delay={0.2}
        />
        <KPICard
          title="Countries Declining"
          value={String(decliningCount)}
          trend={{ value: "Need urgent intervention", positive: false }}
          icon={<TrendingDown className="h-5 w-5 text-destructive" />}
          delay={0.3}
        />
      </div>

      {/* Map + Top 15 */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <AfricaMap />
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">Top 15 Countries by Case Burden (thousands)</h3>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={top15ChartData} layout="vertical" margin={{ left: 80, right: 10 }}>
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={75} />
              <Tooltip formatter={(v: number) => [`${v.toLocaleString()}K cases`, "Estimated"]} />
              <Bar dataKey="cases" radius={[0, 4, 4, 0]}>
                {top15ChartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional breakdown */}
      <div className="mb-6">
        <h2 className="mb-4 font-heading text-lg font-semibold">Regional Breakdown</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {africaRegions.map(region => {
            const countries = getCountriesByRegion(region);
            const regionCases = countries.reduce((s, c) => s + c.estimatedCases, 0);
            return (
              <div key={region} className="rounded-xl border bg-card p-4 shadow-sm">
                <h3 className="font-heading text-sm font-semibold mb-2">{region}</h3>
                <p className="text-xs text-muted-foreground mb-3">{countries.length} countries · {Math.round(regionCases / 1000)}M cases</p>
                <div className="space-y-1.5 max-h-52 overflow-y-auto">
                  {countries.sort((a, b) => b.estimatedCases - a.estimatedCases).map(c => (
                    <a
                      key={c.code}
                      href={c.code === "NG" ? "/dashboard" : `/dashboard/country/${c.code}`}
                      className="flex items-center justify-between rounded-md px-2 py-1.5 text-xs hover:bg-muted transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{c.flag}</span>
                        <span className="font-medium">{c.name}</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="text-muted-foreground">{c.estimatedCases.toLocaleString()}K</span>
                        {trendIcon(c.trend)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Country table */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h3 className="mb-3 font-heading text-sm font-semibold">All Countries — Key Indicators</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-2 pr-3">Country</th>
                <th className="pb-2 pr-3">Region</th>
                <th className="pb-2 pr-3 text-right">Cases (K)</th>
                <th className="pb-2 pr-3 text-right">Deaths</th>
                <th className="pb-2 pr-3 text-right">Inc./1K</th>
                <th className="pb-2 pr-3 text-right">ITN %</th>
                <th className="pb-2 pr-3 text-right">ACT %</th>
                <th className="pb-2 pr-3">Phase</th>
                <th className="pb-2">Trend</th>
              </tr>
            </thead>
            <tbody>
              {[...africanCountries].sort((a, b) => b.estimatedCases - a.estimatedCases).map(c => (
                <tr key={c.code} className="border-b border-muted/50 hover:bg-muted/30 transition-colors">
                  <td className="py-1.5 pr-3 font-medium">
                    <a href={c.code === "NG" ? "/dashboard" : `/dashboard/country/${c.code}`} className="hover:text-primary">
                      {c.flag} {c.name}
                    </a>
                  </td>
                  <td className="py-1.5 pr-3 text-muted-foreground">{c.region}</td>
                  <td className="py-1.5 pr-3 text-right">{c.estimatedCases.toLocaleString()}</td>
                  <td className="py-1.5 pr-3 text-right">{c.estimatedDeaths.toLocaleString()}</td>
                  <td className="py-1.5 pr-3 text-right">{c.incidencePerThousand}</td>
                  <td className="py-1.5 pr-3 text-right">{c.itnCoverage}%</td>
                  <td className="py-1.5 pr-3 text-right">{c.actCoverage}%</td>
                  <td className="py-1.5 pr-3 capitalize">{c.eliminationPhase}</td>
                  <td className="py-1.5">{trendIcon(c.trend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
