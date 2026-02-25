// Demo data for Financing and Data Quality dashboards

// === FINANCING ===

export function getFundingSources() {
  return [
    { name: "Global Fund", value: 42, color: "hsl(211 53% 23%)" },
    { name: "PMI/USAID", value: 22, color: "hsl(174 100% 33%)" },
    { name: "Government", value: 18, color: "hsl(30 93% 54%)" },
    { name: "World Bank", value: 8, color: "hsl(142 71% 45%)" },
    { name: "Gates Foundation", value: 4, color: "hsl(211 53% 45%)" },
    { name: "Other Donors", value: 6, color: "hsl(var(--muted-foreground))" },
  ];
}

export function getExpenditureByIntervention() {
  return [
    { intervention: "Vector Control", pct: 35 },
    { intervention: "Case Management", pct: 28 },
    { intervention: "Chemoprevention", pct: 15 },
    { intervention: "Programme Mgmt", pct: 12 },
    { intervention: "Surveillance", pct: 10 },
  ];
}

export function getFundingGapWaterfall() {
  return [
    { year: "2022", need: 820, available: 620, gap: 200 },
    { year: "2023", need: 890, available: 680, gap: 210 },
    { year: "2024", need: 950, available: 740, gap: 210 },
    { year: "2025 (proj)", need: 1020, available: 780, gap: 240 },
  ];
}

export function getCostPerIntervention() {
  return [
    { intervention: "ITN Distribution", costPerCaseAverted: 4.20, costPerDALY: 12.50 },
    { intervention: "IRS", costPerCaseAverted: 8.70, costPerDALY: 27.30 },
    { intervention: "SMC", costPerCaseAverted: 3.10, costPerDALY: 9.40 },
    { intervention: "IPTp", costPerCaseAverted: 5.60, costPerDALY: 16.80 },
    { intervention: "Case Management", costPerCaseAverted: 6.40, costPerDALY: 19.20 },
    { intervention: "Surveillance (Sproxil)", costPerCaseAverted: 2.80, costPerDALY: 8.50 },
  ];
}

export function getDomesticFundingTrend() {
  return [
    { year: "2015", domestic: 42, total: 380 },
    { year: "2016", domestic: 48, total: 410 },
    { year: "2017", domestic: 55, total: 450 },
    { year: "2018", domestic: 68, total: 520 },
    { year: "2019", domestic: 82, total: 580 },
    { year: "2020", domestic: 75, total: 540 },
    { year: "2021", domestic: 95, total: 620 },
    { year: "2022", domestic: 112, total: 680 },
    { year: "2023", domestic: 135, total: 740 },
    { year: "2024", domestic: 158, total: 780 },
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
  return [
    { indicator: "Confirmed malaria cases", hmis: "11,240,000", sproxil: "12,847,293", concordance: "87.5%" },
    { indicator: "Test positivity rate", hmis: "45.2%", sproxil: "42.7%", concordance: "94.5%" },
    { indicator: "RDT testing rate", hmis: "58.1%", sproxil: "61.2%", concordance: "95.0%" },
    { indicator: "ACT treatment rate", hmis: "62.4%", sproxil: "67.3%", concordance: "92.7%" },
    { indicator: "Reporting completeness", hmis: "82.1%", sproxil: "87.2%", concordance: "94.1%" },
    { indicator: "ITN use last night", hmis: "50.8%", sproxil: "55.8%", concordance: "91.0%" },
  ];
}
