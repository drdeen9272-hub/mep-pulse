// Nigeria Malaria Indicator Survey (MIS) 2021 — Key Findings
// Source: NMEP, NPC, ICF. Nigeria MIS 2021 Final Report. November 2022.

// ── Elimination Tracking Score ──
// Composite score (0–100) derived from weighted MIS indicators vs 2025 NMSP targets
export const eliminationScore = {
  overall: 54,
  components: [
    {
      label: "Malaria Prevalence (Microscopy)", current: 22, target: 10, weight: 30, score: 37, unit: "%",
      trend: "improving" as const,
      history: [{ year: "2010", value: 42 }, { year: "2015", value: 27 }, { year: "2021", value: 22 }],
    },
    {
      label: "ITN Ownership", current: 56, target: 80, weight: 15, score: 70, unit: "%",
      trend: "declining" as const,
      history: [{ year: "2010", value: 42 }, { year: "2015", value: 50 }, { year: "2018", value: 61 }, { year: "2021", value: 56 }],
    },
    {
      label: "ITN Use (Children <5)", current: 41, target: 80, weight: 15, score: 51, unit: "%",
      trend: "declining" as const,
      history: [{ year: "2013", value: 22 }, { year: "2015", value: 43 }, { year: "2018", value: 43 }, { year: "2021", value: 41 }],
    },
    {
      label: "ITN Use (Pregnant Women)", current: 50, target: 80, weight: 10, score: 63, unit: "%",
      trend: "improving" as const,
      history: [{ year: "2013", value: 30 }, { year: "2015", value: 39 }, { year: "2018", value: 42 }, { year: "2021", value: 50 }],
    },
    {
      label: "IPTp 3+ Doses", current: 31, target: 60, weight: 10, score: 52, unit: "%",
      trend: "improving" as const,
      history: [{ year: "2015", value: 17 }, { year: "2018", value: 17 }, { year: "2021", value: 31 }],
    },
    {
      label: "Fever Care-Seeking", current: 49, target: 80, weight: 10, score: 61, unit: "%",
      trend: "stable" as const,
      history: [{ year: "2015", value: 45 }, { year: "2018", value: 48 }, { year: "2021", value: 49 }],
    },
    {
      label: "Diagnostic Testing of Febrile Children", current: 34, target: 80, weight: 10, score: 43, unit: "%",
      trend: "improving" as const,
      history: [{ year: "2015", value: 15 }, { year: "2018", value: 24 }, { year: "2021", value: 34 }],
    },
  ],
};

// ── Headline KPIs ──
export const misKPIs = {
  malariaPrevalenceRDT: 39.0,
  malariaPrevalenceMicroscopy: 22.0,
  itnOwnership: 56,
  itnAccessPopulation: 43,
  itnUsePopulation: 36,
  itnUseChildren: 41,
  itnUsePregnantWomen: 50,
  iptp3Plus: 31,
  householdsInterviewed: 13727,
  womenInterviewed: 14476,
  clusters: 568,
  responseRate: 98.8,
  surveyYear: 2021,
};

// ── Prevalence Trends (% by microscopy) ──
export const prevalenceTrend = [
  { year: "2010", prevalence: 42 },
  { year: "2015", prevalence: 27 },
  { year: "2021", prevalence: 22 },
];

// ── ITN Trends ──
export const itnTrends = [
  { year: "2008", access: 5, use: 3 },
  { year: "2010", access: 8, use: 6 },
  { year: "2013", access: 28, use: 22 },
  { year: "2015", access: 55, use: 43 },
  { year: "2018", access: 43, use: 43 },
  { year: "2021", access: 43, use: 36 },
];

export const itnOwnershipTrend = [
  { year: "2010", ownership: 42 },
  { year: "2015", ownership: 50 },
  { year: "2018", ownership: 61 },
  { year: "2021", ownership: 56 },
];

// ── IPTp Trends ──
export const iptpTrend = [
  { year: "2015", ipt1: 40, ipt3: 17 },
  { year: "2018", ipt1: 57, ipt3: 17 },
  { year: "2021", ipt1: 56, ipt3: 31 },
];

// ── Malaria Prevalence by Age (RDT & Microscopy, children 6–59 months) ──
export const prevalenceByAge = [
  { age: "6–8 mo", rdt: 20.9, microscopy: 11.1, n: 582 },
  { age: "9–11 mo", rdt: 23.7, microscopy: 14.8, n: 489 },
  { age: "12–17 mo", rdt: 33.1, microscopy: 16.7, n: 1175 },
  { age: "18–23 mo", rdt: 31.2, microscopy: 14.6, n: 987 },
  { age: "24–35 mo", rdt: 39.3, microscopy: 20.6, n: 2367 },
  { age: "36–47 mo", rdt: 44.2, microscopy: 24.4, n: 2549 },
  { age: "48–59 mo", rdt: 47.6, microscopy: 29.9, n: 2954 },
];

// ── Prevalence by Residence ──
export const prevalenceByResidence = [
  { area: "Urban", rdt: 25.0, microscopy: 10.5 },
  { area: "Rural", rdt: 45.0, microscopy: 26.7 },
];

// ── Prevalence by Zone (RDT) ──
export const prevalenceByZone = [
  { zone: "North Central", rdt: 32.3, microscopy: 17.0 },
  { zone: "North East", rdt: 43.0, microscopy: 20.1 },
  { zone: "North West", rdt: 51.2, microscopy: 30.7 },
  { zone: "South East", rdt: 28.7, microscopy: 13.0 },
  { zone: "South South", rdt: 27.5, microscopy: 11.0 },
  { zone: "South West", rdt: 17.0, microscopy: 7.2 },
];

// ── ITN Access by State (selected extremes + all 6 zones) ──
export const itnAccessByState = [
  { state: "Adamawa", access: 74 },
  { state: "Zamfara", access: 70 },
  { state: "Katsina", access: 65 },
  { state: "Yobe", access: 62 },
  { state: "Borno", access: 60 },
  { state: "Taraba", access: 57 },
  { state: "Kebbi", access: 55 },
  { state: "Plateau", access: 52 },
  { state: "Niger", access: 50 },
  { state: "Kaduna", access: 48 },
  { state: "Kano", access: 46 },
  { state: "Bauchi", access: 45 },
  { state: "Gombe", access: 44 },
  { state: "Nasarawa", access: 43 },
  { state: "FCT", access: 40 },
  { state: "Jigawa", access: 38 },
  { state: "Benue", access: 37 },
  { state: "Kwara", access: 36 },
  { state: "Sokoto", access: 35 },
  { state: "Oyo", access: 33 },
  { state: "Osun", access: 32 },
  { state: "Ekiti", access: 30 },
  { state: "Ondo", access: 29 },
  { state: "Kogi", access: 28 },
  { state: "Edo", access: 27 },
  { state: "Ogun", access: 26 },
  { state: "Enugu", access: 25 },
  { state: "Lagos", access: 24 },
  { state: "Anambra", access: 23 },
  { state: "Delta", access: 22 },
  { state: "Abia", access: 21 },
  { state: "Imo", access: 20 },
  { state: "Cross River", access: 19 },
  { state: "Akwa Ibom", access: 19 },
  { state: "Ebonyi", access: 18 },
  { state: "Bayelsa", access: 18 },
  { state: "Rivers", access: 17 },
];

// ── Socio-demographic context ──
export const socioContext = {
  improvedWater: 79,
  improvedSanitation: 64,
  electricityAccess: 49,
  femaleLiteracy: 56,
  mobilePhoneOwnership: 82,
  smartphoneOwnership: 23,
  internetUsed: 25,
  avgHouseholdSize: 5.3,
  populationUnder15Pct: 47,
};

// ── Prevention summary for infographic ──
export const preventionSummary = [
  { indicator: "ITN Ownership", value: 56, target: 80, icon: "shield" },
  { indicator: "ITN Use (All)", value: 36, target: 80, icon: "bed" },
  { indicator: "ITN Use (Children)", value: 41, target: 80, icon: "baby" },
  { indicator: "ITN Use (Pregnant)", value: 50, target: 80, icon: "heart" },
  { indicator: "IPTp 3+ Doses", value: 31, target: 60, icon: "pill" },
  { indicator: "ANC from Skilled Provider", value: 67, target: 90, icon: "stethoscope" },
];
