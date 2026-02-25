// SMIS 2.0 Survey Data — extracted from Nigeria Malaria Insights Dashboard (Power BI)

export const smisKPIs = {
  notTestedBeforeTreatment: 29.97,
  govHospitalPrimarySource: 34.49,
  believeDrugsAffordable: 39.40,
  bloodSampleYes: 67.8,
  bloodSampleNo: 30.0,
  bloodSampleDontKnow: 2.16,
  maleRespondents: 59.76,
  femaleRespondents: 40.21,
};

export const treatmentSourceData = [
  { source: "Government hospital", pct: 34.5 },
  { source: "Pharmacy", pct: 25.2 },
  { source: "Private hospital/clinic", pct: 10.1 },
  { source: "Local drug store", pct: 5.8 },
  { source: "Private doctor", pct: 4.3 },
  { source: "Mobile clinic", pct: 4.0 },
  { source: "Community Nurse", pct: 3.5 },
  { source: "NGO hospital", pct: 3.2 },
  { source: "Mobile drug seller", pct: 1.4 },
  { source: "Traditional healer", pct: 1.2 },
  { source: "Religious healer", pct: 0.5 },
];

export const affordabilityData = [
  { rating: "Very affordable", pct: 39.4 },
  { rating: "Somewhat affordable", pct: 22.1 },
  { rating: "Neutral", pct: 15.3 },
  { rating: "Somewhat expensive", pct: 12.8 },
  { rating: "Very expensive", pct: 10.4 },
];

export const bloodSampleData = [
  { name: "Yes", value: 67.8, fill: "hsl(var(--primary))" },
  { name: "No", value: 30.0, fill: "hsl(var(--muted-foreground))" },
  { name: "Don't know", value: 2.16, fill: "hsl(var(--accent))" },
];

export const genderData = [
  { name: "Female", value: 59.76, fill: "hsl(var(--primary))" },
  { name: "Male", value: 40.21, fill: "hsl(var(--secondary))" },
  { name: "Both", value: 0.03, fill: "hsl(var(--accent))" },
];
