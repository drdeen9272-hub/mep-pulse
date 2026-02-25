import { motion } from "framer-motion";
import { Activity, Microscope, ShieldCheck, Users, Globe, Syringe } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import { IncidenceChart, AgeDonutChart, Top10StatesChart, DiagnosticMethodChart } from "@/components/dashboard/OverviewCharts";
import NigeriaMap from "@/components/dashboard/NigeriaMap";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import ExportButton from "@/components/ExportButton";
import EliminationScore from "@/components/dashboard/EliminationScore";
import SectorFramework from "@/components/dashboard/SectorFramework";
import mrdtImg from "@/assets/mrdt-sample.png";
import productImg from "@/assets/product-sample.png";
import { wmr2025KPIs, nigeriaWMR2025 } from "@/data/wmr2025Data";

export default function DashboardOverview() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container py-6"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">National Malaria Elimination Command Centre</h1>
          <p className="text-sm text-muted-foreground">
            Sector-wide intelligence — sourced from WMR 2025, MIS 2021, DHIS2 & Sproxil NMDR. Nigeria accounts for {nigeriaWMR2025.shareOfGlobalCases}% of global cases and {nigeriaWMR2025.shareOfGlobalDeaths}% of global deaths.
          </p>
        </div>
        <ExportButton />
      </div>

      {/* Elimination Tracking Score — the single most important metric */}
      <div className="mb-6">
        <EliminationScore />
      </div>

      {/* Sector-Wide Framework */}
      <div className="mb-6">
        <SectorFramework />
      </div>

      {/* KPI Row */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard
          title="Global Estimated Cases"
          value={wmr2025KPIs.globalCases}
          trend={{ value: "+3% vs 2023 (WMR 2025)", positive: false }}
          icon={<Globe className="h-5 w-5 text-destructive" />}
          delay={0}
        />
        <KPICard
          title="Nigeria Cases (24.3%)"
          value="68.5M"
          trend={{ value: `${nigeriaWMR2025.shareOfGlobalDeaths}% of global deaths`, positive: false }}
          icon={<Activity className="h-5 w-5 text-destructive" />}
          delay={0.1}
        />
        <KPICard
          title="Global Deaths"
          value={wmr2025KPIs.globalDeaths}
          trend={{ value: "Mortality rate: 13.8/100K", positive: false }}
          icon={<Microscope className="h-5 w-5 text-secondary" />}
          delay={0.2}
        />
        <KPICard
          title="Funding Coverage"
          value={wmr2025KPIs.fundingCoverageOfNeed}
          subtitle={`of $8.3B needed (GTS)`}
          icon={<ShieldCheck className="h-5 w-5 text-accent" />}
          delay={0.3}
        />
      </div>

      {/* Secondary KPIs */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard
          title="Cases Prevented (Since 2000)"
          value={wmr2025KPIs.casesPreventedSince2000}
          icon={<ShieldCheck className="h-5 w-5 text-secondary" />}
          delay={0.4}
        />
        <KPICard
          title="SMC Children Reached"
          value={wmr2025KPIs.smcChildrenReached}
          subtitle={`Across ${wmr2025KPIs.smcCountries} countries`}
          icon={<Syringe className="h-5 w-5 text-primary" />}
          delay={0.5}
        />
        <KPICard
          title="Vaccine Countries"
          value={String(wmr2025KPIs.countriesWithVaccine)}
          subtitle="Routine immunization"
          icon={<Syringe className="h-5 w-5 text-accent" />}
          delay={0.6}
        />
        <KPICard
          title="Active PPMV Network"
          value="8,247"
          subtitle="Across 18 states"
          icon={<Users className="h-5 w-5 text-primary" />}
          delay={0.7}
        />
      </div>

      {/* Charts Row 1: Incidence + Map */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <IncidenceChart />
        <NigeriaMap />
      </div>

      {/* Charts Row 2: Age + Top 10 + Diagnostic */}
      <div className="mb-6 grid gap-6 md:grid-cols-3">
        <AgeDonutChart />
        <Top10StatesChart />
        <DiagnosticMethodChart />
      </div>

      {/* Sample Artifacts */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">Sample mRDT (Rapid Diagnostic Test)</h3>
          <p className="mb-3 text-xs text-muted-foreground">AI-powered RDT reader captures and interprets test results via smartphone camera.</p>
          <div className="flex justify-center">
            <motion.img
              src={mrdtImg}
              alt="Malaria rapid diagnostic test kit with QR code"
              className="h-52 rounded-lg object-contain shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-heading text-sm font-semibold">Authenticated Product Sample</h3>
          <p className="mb-3 text-xs text-muted-foreground">Sproxil product authentication verifies antimalarial drugs via scratch-code or RFID.</p>
          <div className="flex justify-center">
            <motion.img
              src={productImg}
              alt="Authenticated antimalarial product tablet blister pack"
              className="h-52 rounded-lg object-contain shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            />
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <ActivityFeed />
    </motion.div>
  );
}
