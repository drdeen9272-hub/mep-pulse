// Demo data for Financing and Data Quality dashboards
// Updated with WHO World Malaria Report 2025 data

// === FINANCING (aligned with WMR 2025 Chapter 4) ===

export function getFundingSources() {
  // WMR 2025: Total funding covered only 42% of need. Global Fund is largest contributor.
  return [
    { name: "Global Fund", value: 39, color: "hsl(211 53% 23%)" },
    { name: "PMI/USAID", value: 24, color: "hsl(174 100% 33%)" },
    { name: "Government (Domestic)", value: 20, color: "hsl(30 93% 54%)" },
    { name: "World Bank", value: 7, color: "hsl(142 71% 45%)" },
    { name: "Gates Foundation", value: 4, color: "hsl(211 53% 45%)" },
    { name: "Other Donors", value: 6, color: "hsl(var(--muted-foreground))" },
  ];
}

export function getExpenditureByIntervention() {
  // WMR 2025 Ch. 5: vector control & case management dominate spend
  return [
    { intervention: "Vector Control (ITN/IRS)", pct: 33 },
    { intervention: "Case Management", pct: 26 },
    { intervention: "Chemoprevention (SMC/PMC)", pct: 16 },
    { intervention: "Vaccine Rollout", pct: 5 },
    { intervention: "Programme Mgmt", pct: 11 },
    { intervention: "Surveillance & M&E", pct: 9 },
  ];
}

export function getFundingGapWaterfall() {
  // WMR 2025: funding at 42% of $8.3B need. Gap widening.
  return [
    { year: "2021", need: 7200, available: 3500, gap: 3700 },
    { year: "2022", need: 7800, available: 4100, gap: 3700 },
    { year: "2023", need: 8100, available: 4100, gap: 4000 },
    { year: "2024", need: 8300, available: 4100, gap: 4200 },
    { year: "2025 (proj)", need: 8700, available: 3600, gap: 5100 },
  ];
}

export function getCostPerIntervention() {
  return [
    { intervention: "ITN Distribution", costPerCaseAverted: 4.20, costPerDALY: 12.50 },
    { intervention: "IRS", costPerCaseAverted: 8.70, costPerDALY: 27.30 },
    { intervention: "SMC (54M children)", costPerCaseAverted: 3.10, costPerDALY: 9.40 },
    { intervention: "IPTp", costPerCaseAverted: 5.60, costPerDALY: 16.80 },
    { intervention: "Case Management", costPerCaseAverted: 6.40, costPerDALY: 19.20 },
    { intervention: "Malaria Vaccine", costPerCaseAverted: 7.80, costPerDALY: 22.10 },
    { intervention: "Surveillance (Sproxil)", costPerCaseAverted: 2.80, costPerDALY: 8.50 },
  ];
}

export function getDomesticFundingTrend() {
  // WMR 2025: Yaoundé Declaration — African countries committing to domestic funding
  return [
    { year: "2015", domestic: 42, total: 3200 },
    { year: "2016", domestic: 48, total: 3400 },
    { year: "2017", domestic: 55, total: 3600 },
    { year: "2018", domestic: 68, total: 3800 },
    { year: "2019", domestic: 82, total: 4200 },
    { year: "2020", domestic: 75, total: 3800 },
    { year: "2021", domestic: 95, total: 3500 },
    { year: "2022", domestic: 112, total: 4100 },
    { year: "2023", domestic: 135, total: 4100 },
    { year: "2024", domestic: 158, total: 4100 },
  ];
}

// === DATA QUALITY ===

import { nigeriaStates } from "./nigeriaData";

export function getCompletenessbyState() {
  return nigeriaStates
    .map((s) => ({
      state: s.name,
      completeness: Math.round((70 + Math.random() * 28) * 10) / 10,
    }))
    .sort((a, b) => b.completeness - a.completeness);
}

export function getTimelinessTrend() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return months.map((m, i) => ({
    month: m,
    timeliness: Math.round((65 + Math.sin(i * 0.8) * 8 + i * 0.7) * 10) / 10,
  }));
}

export function getOutlierData() {
  const points: Array<{ lga: string; state: string; expected: number; reported: number; outlier: boolean }> = [];
  nigeriaStates.slice(0, 20).forEach((s) => {
    for (let i = 0; i < 3; i++) {
      const expected = Math.round(200 + Math.random() * 800);
      const isOutlier = Math.random() < 0.12;
      const reported = isOutlier
        ? Math.round(expected * (Math.random() > 0.5 ? 2.5 + Math.random() : 0.2 + Math.random() * 0.3))
        : Math.round(expected * (0.8 + Math.random() * 0.4));
      points.push({
        lga: `${s.name} LGA ${i + 1}`,
        state: s.name,
        expected,
        reported,
        outlier: isOutlier,
      });
    }
  });
  return points;
}

export function getHMISComparison() {
  // Updated with WMR 2025 figures: 282M global cases, Nigeria = 68.5M estimated
  return [
    { indicator: "Confirmed malaria cases", hmis: "62,400,000", sproxil: "68,526,000", concordance: "91.1%" },
    { indicator: "Test positivity rate", hmis: "45.2%", sproxil: "42.7%", concordance: "94.5%" },
    { indicator: "RDT testing rate", hmis: "76.0%", sproxil: "78.4%", concordance: "97.0%" },
    { indicator: "ACT treatment rate", hmis: "80.0%", sproxil: "82.3%", concordance: "97.2%" },
    { indicator: "Reporting completeness", hmis: "82.1%", sproxil: "87.2%", concordance: "94.1%" },
    { indicator: "ITN use last night", hmis: "50.8%", sproxil: "55.8%", concordance: "91.0%" },
    { indicator: "SMC coverage (eligible)", hmis: "68.0%", sproxil: "72.1%", concordance: "94.3%" },
  ];
}
