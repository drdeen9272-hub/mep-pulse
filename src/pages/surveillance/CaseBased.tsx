import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import FilterBar from "@/components/dashboard/FilterBar";
import ExportButton from "@/components/ExportButton";
import { generateCaseRecords } from "@/data/surveillanceData";
import { Search } from "lucide-react";

const allCases = generateCaseRecords(200);

export default function CaseBased() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const perPage = 20;

  const filtered = useMemo(() => {
    if (!search) return allCases;
    const q = search.toLowerCase();
    return allCases.filter((c) =>
      c.id.toLowerCase().includes(q) || c.state.toLowerCase().includes(q) ||
      c.lga.toLowerCase().includes(q) || c.species.toLowerCase().includes(q)
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const slice = filtered.slice(page * perPage, (page + 1) * perPage);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <FilterBar showSpecies showAge showSex />
      <div className="container py-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">Case-Based Surveillance</h1>
            <p className="text-sm text-muted-foreground">
              Individual malaria case records across Nigeria's 774 LGAs (Local Government Areas, equivalent to districts).
            </p>
          </div>
          <ExportButton />
        </div>

        {/* Search */}
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by Case ID, State, or LGA..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="w-full rounded-md border bg-card py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <span className="text-xs text-muted-foreground">{filtered.length} records</span>
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="sticky left-0 bg-card px-3 py-2.5 font-medium">Case ID</th>
                  <th className="px-3 py-2.5 font-medium">Date</th>
                  <th className="px-3 py-2.5 font-medium">State</th>
                  <th className="px-3 py-2.5 font-medium">LGA</th>
                  <th className="px-3 py-2.5 text-right font-medium">Age</th>
                  <th className="px-3 py-2.5 font-medium">Sex</th>
                  <th className="px-3 py-2.5 font-medium">Species</th>
                  <th className="px-3 py-2.5 font-medium">Method</th>
                  <th className="px-3 py-2.5 font-medium">Treatment</th>
                  <th className="px-3 py-2.5 font-medium">Auth'd</th>
                  <th className="px-3 py-2.5 font-medium">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {slice.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="sticky left-0 bg-card px-3 py-2 font-mono font-medium">{c.id}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{c.date}</td>
                    <td className="px-3 py-2">{c.state}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{c.lga}</td>
                    <td className="px-3 py-2 text-right">{c.age}</td>
                    <td className="px-3 py-2">{c.sex}</td>
                    <td className="px-3 py-2">
                      {c.species !== "—" ? (
                        <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-destructive">{c.species}</span>
                      ) : "—"}
                    </td>
                    <td className="px-3 py-2">{c.method}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{c.treatment}</td>
                    <td className="px-3 py-2">
                      <span className={c.authenticated === "Yes" ? "text-success font-medium" : "text-muted-foreground"}>{c.authenticated}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={c.outcome === "Deceased" ? "text-destructive font-medium" : ""}>{c.outcome}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t px-4 py-3 text-xs text-muted-foreground">
            <span>Page {page + 1} of {totalPages} ({filtered.length} records)</span>
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
