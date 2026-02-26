import { useState } from "react";
import { motion } from "framer-motion";
import FilterBar from "@/components/dashboard/FilterBar";
import ExportButton from "@/components/ExportButton";
import KPICard from "@/components/dashboard/KPICard";
import { FileText, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { generateFacilityReports } from "@/data/surveillanceData";

const facilities = generateFacilityReports();

export default function Aggregate() {
  const [page, setPage] = useState(0);
  const perPage = 15;
  const totalPages = Math.ceil(facilities.length / perPage);
  const slice = facilities.slice(page * perPage, (page + 1) * perPage);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <FilterBar showAge={false} showSex={false} />
      <div className="container py-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">Aggregate Reporting</h1>
            <p className="text-sm text-muted-foreground">Monthly facility-level reporting across LGAs (Local Government Areas — district-level), completeness tracking, and automated data quality checks.</p>
          </div>
          <ExportButton />
        </div>

        {/* KPIs */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KPICard title="Total Facilities" value="4,218" icon={<FileText className="h-5 w-5 text-primary" />} />
          <KPICard title="Reports Received" value="87.2%" subtitle="This period" icon={<CheckCircle className="h-5 w-5 text-success" />} delay={0.05} />
          <KPICard title="Data Errors Flagged" value="342" subtitle="Automated checks" icon={<AlertTriangle className="h-5 w-5 text-accent" />} delay={0.1} />
          <KPICard title="DHIS2 Compatible" value="100%" subtitle="Data structure" icon={<Info className="h-5 w-5 text-secondary" />} delay={0.15} />
        </div>

        {/* DHIS2 info */}
        <div className="mb-6 rounded-xl border-2 border-secondary/20 bg-secondary/5 p-5">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
            <div>
              <h3 className="font-heading text-sm font-semibold text-secondary">DHIS2 Compatibility</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                All aggregate data follows the DHIS2 (District Health Information Software 2) data structure used by Nigeria's
                national health information system. Reports can be directly imported into DHIS2 for integration with existing
                government reporting workflows.
              </p>
            </div>
          </div>
        </div>

        {/* Facility Table */}
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="sticky left-0 bg-card px-3 py-2.5 font-medium">Facility</th>
                  <th className="px-3 py-2.5 font-medium">State</th>
                  <th className="px-3 py-2.5 font-medium">LGA (District)</th>
                  <th className="px-3 py-2.5 text-right font-medium">Expected</th>
                  <th className="px-3 py-2.5 text-right font-medium">Received</th>
                  <th className="px-3 py-2.5 text-right font-medium">Completeness</th>
                  <th className="px-3 py-2.5 text-right font-medium">Timeliness</th>
                  <th className="px-3 py-2.5 text-right font-medium">Errors</th>
                  <th className="px-3 py-2.5 font-medium">Last Report</th>
                </tr>
              </thead>
              <tbody>
                {slice.map((f, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="sticky left-0 bg-card px-3 py-2 font-medium">{f.facility}</td>
                    <td className="px-3 py-2">{f.state}</td>
                    <td className="px-3 py-2">{f.lga}</td>
                    <td className="px-3 py-2 text-right">{f.reportsExpected}</td>
                    <td className="px-3 py-2 text-right">{f.reportsReceived}</td>
                    <td className="px-3 py-2 text-right">
                      <span className={`rounded px-1.5 py-0.5 font-medium ${
                        f.completeness >= 85 ? "bg-success/10 text-success" :
                        f.completeness >= 70 ? "bg-accent/10 text-accent-foreground" :
                        "bg-destructive/10 text-destructive"
                      }`}>{f.completeness}%</span>
                    </td>
                    <td className="px-3 py-2 text-right">{f.timeliness}%</td>
                    <td className="px-3 py-2 text-right">
                      {f.errors > 0 ? <span className="text-destructive">{f.errors}</span> : <span className="text-success">0</span>}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">{f.lastReport}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t px-4 py-3 text-xs text-muted-foreground">
            <span>Page {page + 1} of {totalPages}</span>
            <div className="flex gap-1">
              <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="rounded border px-2 py-1 disabled:opacity-30">Prev</button>
              <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="rounded border px-2 py-1 disabled:opacity-30">Next</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
