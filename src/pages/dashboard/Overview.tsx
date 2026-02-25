import { motion } from "framer-motion";
import { Activity, Microscope, ShieldCheck, Users } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import { IncidenceChart, AgeDonutChart, Top10StatesChart, DiagnosticMethodChart } from "@/components/dashboard/OverviewCharts";
import NigeriaMap from "@/components/dashboard/NigeriaMap";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import ExportButton from "@/components/ExportButton";
import mrdtImg from "@/assets/mrdt-sample.png";
import productImg from "@/assets/product-sample.png";

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
          <h1 className="font-heading text-2xl font-bold">Overview Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Command-center view of Nigeria's malaria surveillance data.
          </p>
        </div>
        <ExportButton />
      </div>

      {/* KPI Row */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard
          title="Total Confirmed Cases"
          value="12,847,293"
          trend={{ value: "+3.2% vs last year", positive: false }}
          icon={<Activity className="h-5 w-5 text-destructive" />}
          delay={0}
        />
        <KPICard
          title="Test Positivity Rate"
          value="42.7%"
          trend={{ value: "Down from 48.1%", positive: true }}
          icon={<Microscope className="h-5 w-5 text-secondary" />}
          delay={0.1}
        />
        <KPICard
          title="Products Authenticated"
          value="287.4M"
          subtitle="This quarter"
          icon={<ShieldCheck className="h-5 w-5 text-accent" />}
          delay={0.2}
        />
        <KPICard
          title="Active PPMV Network"
          value="8,247"
          subtitle="Across 18 states"
          icon={<Users className="h-5 w-5 text-primary" />}
          delay={0.3}
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
