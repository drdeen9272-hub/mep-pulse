import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, Activity, ShieldCheck, Syringe, TrendingUp, TrendingDown, Minus } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import CountrySelector from "@/components/dashboard/CountrySelector";
import ExportButton from "@/components/ExportButton";
import { getCountryByCode, getBurdenColor, type AfricanCountry } from "@/data/africaData";
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function TrendBadge({ trend }: { trend: string }) {
  if (trend === "improving") return <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700"><TrendingUp className="h-3 w-3" /> Improving</span>;
  if (trend === "declining") return <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700"><TrendingDown className="h-3 w-3" /> Declining</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"><Minus className="h-3 w-3" /> Stable</span>;
}

export default function CountryDashboard() {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const country = getCountryByCode(countryCode || "");

  if (!country) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-heading text-2xl font-bold mb-4">Country Not Found</h1>
        <p className="text-muted-foreground mb-4">No data available for code "{countryCode}"</p>
        <button onClick={() => navigate("/dashboard/africa")} className="text-primary underline">← Back to Africa Overview</button>
      </div>
    );
  }

  const coverageData = [
    { name: "ITN Coverage", value: country.itnCoverage, fill: "hsl(var(--primary))" },
    { name: "ACT Coverage", value: country.actCoverage, fill: "hsl(var(--secondary))" },
    { name: "RDT Testing", value: country.rdtTestingRate, fill: "hsl(var(--accent))" },
  ];

  const phaseLabel: Record<string, string> = {
    control: "Control Phase — High burden, focus on reducing transmission",
    "pre-elimination": "Pre-Elimination — Low burden, transitioning to elimination",
    elimination: "Elimination Phase — Near-zero cases, targeting certification",
    prevention: "Prevention of Reintroduction — Certified malaria-free",
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="container py-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button onClick={() => navigate("/dashboard/africa")} className="mb-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Africa Overview
          </button>
          <h1 className="font-heading text-2xl font-bold">{country.flag} {country.name} — Malaria Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            {country.region} · Population: {country.population}M · <TrendBadge trend={country.trend} />
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CountrySelector />
          <ExportButton />
        </div>
      </div>

      {/* Elimination Phase */}
      <div className="mb-6 rounded-xl border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full" style={{ background: getBurdenColor(country.incidencePerThousand) }} />
          <div>
            <span className="font-heading text-sm font-semibold capitalize">{country.eliminationPhase}</span>
            <p className="text-xs text-muted-foreground">{phaseLabel[country.eliminationPhase]}</p>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard
          title="Estimated Cases"
          value={`${country.estimatedCases.toLocaleString()}K`}
          trend={{ value: `${country.casesSharePct}% of global`, positive: false }}
          icon={<Globe className="h-5 w-5 text-destructive" />}
          delay={0}
        />
        <KPICard
          title="Estimated Deaths"
          value={country.estimatedDeaths.toLocaleString()}
          trend={{ value: `${country.deathsSharePct}% of global`, positive: false }}
          icon={<Activity className="h-5 w-5 text-destructive" />}
          delay={0.1}
        />
        <KPICard
          title="Incidence Rate"
          value={`${country.incidencePerThousand}/1K`}
          subtitle="Per 1,000 population at risk"
          icon={<ShieldCheck className="h-5 w-5 text-secondary" />}
          delay={0.2}
        />
        <KPICard
          title="Mortality Rate"
          value={`${country.mortalityPer100k}/100K`}
          subtitle="Per 100,000 population"
          icon={<Syringe className="h-5 w-5 text-accent" />}
          delay={0.3}
        />
      </div>

      {/* Intervention Coverage */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">Intervention Coverage</h3>
          <div className="space-y-4">
            {coverageData.map(d => (
              <div key={d.name}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium">{d.name}</span>
                  <span className="text-muted-foreground">{d.value}%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: d.fill }}
                    initial={{ width: 0 }}
                    animate={{ width: `${d.value}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">Key Metrics Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Population", value: `${country.population}M` },
              { label: "Cases Share (Global)", value: `${country.casesSharePct}%` },
              { label: "Deaths Share (Global)", value: `${country.deathsSharePct}%` },
              { label: "ITN Access", value: `${country.itnCoverage}%` },
              { label: "ACT Treatment", value: `${country.actCoverage}%` },
              { label: "RDT Testing", value: `${country.rdtTestingRate}%` },
            ].map(m => (
              <div key={m.label} className="rounded-lg bg-muted/50 p-3">
                <div className="text-[10px] text-muted-foreground">{m.label}</div>
                <div className="text-sm font-semibold">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contextual note */}
      <div className="rounded-xl border bg-muted/30 p-4 text-xs text-muted-foreground">
        <p>
          <strong>Note:</strong> This dashboard displays estimated data aligned with the WHO World Malaria Report 2025. 
          Subnational breakdowns, surveillance data, and program-specific modules are available for countries with active Sproxil deployments.
          {country.code === "NG" && (
            <a href="/dashboard" className="ml-1 text-primary underline">View full Nigeria dashboard →</a>
          )}
        </p>
      </div>
    </motion.div>
  );
}
