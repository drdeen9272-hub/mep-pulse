import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, MapPin, BarChart3, Activity, Shield, Stethoscope } from "lucide-react";

const reports = [
  {
    title: "Monthly Malaria Bulletin",
    desc: "Comprehensive monthly summary of malaria indicators across all 36 states including incidence trends, diagnostic coverage, and treatment outcomes.",
    icon: Activity,
    frequency: "Monthly",
    pages: 24,
    lastGenerated: "Feb 2024",
    tags: ["Epidemiology", "Diagnostics", "Treatment"],
  },
  {
    title: "PPMV Network Performance Report",
    desc: "Quarterly analysis of the 8,000+ PPMV network including testing volumes, authentication rates, survey completion, and geographic coverage.",
    icon: MapPin,
    frequency: "Quarterly",
    pages: 18,
    lastGenerated: "Q4 2023",
    tags: ["PPMV", "Network", "Performance"],
  },
  {
    title: "Product Authentication Summary",
    desc: "Real-time authentication statistics including verification volumes, counterfeit detection rates, and brand-level breakdown with geographic heatmaps.",
    icon: Shield,
    frequency: "Weekly",
    pages: 12,
    lastGenerated: "Week 8, 2024",
    tags: ["Authentication", "Counterfeits", "Brands"],
  },
  {
    title: "AI Diagnostics Accuracy Report",
    desc: "Performance evaluation of the AI RDT reader including sensitivity, specificity, concordance with expert microscopists, and quality metrics.",
    icon: Stethoscope,
    frequency: "Monthly",
    pages: 16,
    lastGenerated: "Feb 2024",
    tags: ["AI", "RDT", "Quality"],
  },
  {
    title: "Financing & Cost-Effectiveness Analysis",
    desc: "Detailed breakdown of funding sources, expenditure by intervention, cost-per-case-averted calculations, and domestic funding trends.",
    icon: BarChart3,
    frequency: "Quarterly",
    pages: 20,
    lastGenerated: "Q4 2023",
    tags: ["Financing", "Cost", "Donors"],
  },
];

export default function AutomatedReports() {
  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">Automated Reports</h1>
        <p className="mt-1 text-muted-foreground">Pre-built report templates generated automatically from platform data — ready for stakeholder distribution.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.title} className="flex flex-col hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <report.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="outline" className="text-[10px]">{report.frequency}</Badge>
              </div>
              <CardTitle className="text-base mt-3">{report.title}</CardTitle>
              <CardDescription className="text-xs">{report.desc}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto space-y-3">
              <div className="flex flex-wrap gap-1">
                {report.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><FileText className="h-3 w-3" />{report.pages} pages</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{report.lastGenerated}</span>
              </div>
              <Button size="sm" className="w-full gap-1.5"><Download className="h-3.5 w-3.5" /> Generate Report</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
