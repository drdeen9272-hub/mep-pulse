import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileSpreadsheet, Filter } from "lucide-react";

const modules = ["Epidemiology", "Diagnostics", "Commodities", "Surveillance", "Authentication", "Surveys", "Transfers"];
const states = ["All States", "Lagos", "Kano", "Rivers", "Kaduna", "Oyo", "Abuja FCT", "Borno", "Enugu", "Sokoto", "Delta"];
const indicators = [
  "Confirmed Cases", "Test Positivity Rate", "Authentications", "RDT Results",
  "Survey Responses", "Transfer Disbursements", "Stock Status", "Reporting Completeness",
];

const previewData = [
  { state: "Lagos", lga: "Ikeja", period: "2024-01", cases: 3842, tpr: "28.4%", auths: 182400, surveys: 1240 },
  { state: "Lagos", lga: "Surulere", period: "2024-01", cases: 2915, tpr: "31.2%", auths: 94300, surveys: 890 },
  { state: "Kano", lga: "Nassarawa", period: "2024-01", cases: 5210, tpr: "42.1%", auths: 67200, surveys: 1560 },
  { state: "Kano", lga: "Dala", period: "2024-01", cases: 4870, tpr: "39.8%", auths: 51800, surveys: 1340 },
  { state: "Rivers", lga: "Port Harcourt", period: "2024-01", cases: 3120, tpr: "25.6%", auths: 112500, surveys: 980 },
  { state: "Kaduna", lga: "Kaduna North", period: "2024-01", cases: 4450, tpr: "36.7%", auths: 73400, surveys: 1180 },
  { state: "Oyo", lga: "Ibadan North", period: "2024-01", cases: 3680, tpr: "30.5%", auths: 89100, surveys: 1050 },
  { state: "Abuja FCT", lga: "Municipal", period: "2024-01", cases: 1890, tpr: "18.2%", auths: 145600, surveys: 760 },
  { state: "Borno", lga: "Maiduguri", period: "2024-01", cases: 6240, tpr: "48.3%", auths: 28900, surveys: 2100 },
  { state: "Enugu", lga: "Enugu East", period: "2024-01", cases: 2760, tpr: "27.1%", auths: 62300, surveys: 840 },
  { state: "Sokoto", lga: "Sokoto South", period: "2024-01", cases: 5890, tpr: "45.6%", auths: 31200, surveys: 1890 },
  { state: "Delta", lga: "Warri South", period: "2024-01", cases: 3340, tpr: "29.8%", auths: 78500, surveys: 920 },
  { state: "Lagos", lga: "Alimosho", period: "2024-01", cases: 4120, tpr: "33.4%", auths: 156200, surveys: 1380 },
  { state: "Kano", lga: "Fagge", period: "2024-01", cases: 4680, tpr: "40.2%", auths: 42100, surveys: 1420 },
  { state: "Rivers", lga: "Obio-Akpor", period: "2024-01", cases: 2890, tpr: "24.3%", auths: 98700, surveys: 870 },
  { state: "Kaduna", lga: "Zaria", period: "2024-01", cases: 5120, tpr: "38.9%", auths: 54600, surveys: 1540 },
  { state: "Oyo", lga: "Ogbomoso", period: "2024-01", cases: 3250, tpr: "32.1%", auths: 67800, surveys: 960 },
  { state: "Borno", lga: "Jere", period: "2024-01", cases: 5780, tpr: "46.5%", auths: 21400, surveys: 1950 },
  { state: "Enugu", lga: "Nsukka", period: "2024-01", cases: 2340, tpr: "25.8%", auths: 48900, surveys: 720 },
  { state: "Delta", lga: "Ughelli North", period: "2024-01", cases: 3560, tpr: "31.7%", auths: 65200, surveys: 890 },
];

export default function ExportData() {
  const [selectedModule, setSelectedModule] = useState("Epidemiology");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>(["Confirmed Cases", "Test Positivity Rate"]);
  const [dateFrom, setDateFrom] = useState("2024-01");
  const [dateTo, setDateTo] = useState("2024-06");

  const toggleIndicator = (ind: string) => {
    setSelectedIndicators((prev) =>
      prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind]
    );
  };

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">Export Data</h1>
        <p className="mt-1 text-muted-foreground">Configure and download datasets from any module with geographic and temporal filters.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Filter className="h-4 w-4" /> Export Configuration</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Module</label>
              <select value={selectedModule} onChange={(e) => setSelectedModule(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {modules.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Geographic Scope</label>
              <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {states.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground">From</label>
                <input type="month" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">To</label>
                <input type="month" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Indicators</label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {indicators.map((ind) => (
                  <Badge key={ind} variant={selectedIndicators.includes(ind) ? "default" : "outline"} className="cursor-pointer text-[10px]" onClick={() => toggleIndicator(ind)}>
                    {ind}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1 gap-1.5"><Download className="h-3.5 w-3.5" /> CSV</Button>
              <Button size="sm" variant="outline" className="flex-1 gap-1.5"><FileSpreadsheet className="h-3.5 w-3.5" /> Excel</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Data Preview</CardTitle>
              <span className="text-xs text-muted-foreground">Showing 20 of 1,247 rows</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-2 text-left font-semibold">State</th>
                    <th className="p-2 text-left font-semibold">LGA</th>
                    <th className="p-2 text-left font-semibold">Period</th>
                    <th className="p-2 text-right font-semibold">Cases</th>
                    <th className="p-2 text-right font-semibold">TPR</th>
                    <th className="p-2 text-right font-semibold">Auths</th>
                    <th className="p-2 text-right font-semibold">Surveys</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="p-2 font-medium">{row.state}</td>
                      <td className="p-2">{row.lga}</td>
                      <td className="p-2">{row.period}</td>
                      <td className="p-2 text-right">{row.cases.toLocaleString()}</td>
                      <td className="p-2 text-right">{row.tpr}</td>
                      <td className="p-2 text-right">{row.auths.toLocaleString()}</td>
                      <td className="p-2 text-right">{row.surveys.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
