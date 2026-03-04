// WHO World Malaria Report 2025 — Key data extracted from the report

// === GLOBAL BURDEN (Table 2.1) ===
export const globalCasesDeathsTrend = [
  { year: 2000, cases: 239, deaths: 864, pVivaxPct: 6.4 },
  { year: 2001, cases: 246, deaths: 873, pVivaxPct: 7.2 },
  { year: 2002, cases: 244, deaths: 840, pVivaxPct: 6.7 },
  { year: 2003, cases: 249, deaths: 811, pVivaxPct: 7.2 },
  { year: 2004, cases: 251, deaths: 806, pVivaxPct: 7.5 },
  { year: 2005, cases: 251, deaths: 767, pVivaxPct: 7.6 },
  { year: 2006, cases: 245, deaths: 771, pVivaxPct: 6.2 },
  { year: 2007, cases: 240, deaths: 747, pVivaxPct: 5.7 },
  { year: 2008, cases: 238, deaths: 708, pVivaxPct: 5.3 },
  { year: 2009, cases: 243, deaths: 715, pVivaxPct: 5.2 },
  { year: 2010, cases: 245, deaths: 693, pVivaxPct: 5.3 },
  { year: 2011, cases: 238, deaths: 655, pVivaxPct: 5.3 },
  { year: 2012, cases: 233, deaths: 610, pVivaxPct: 5.0 },
  { year: 2013, cases: 228, deaths: 583, pVivaxPct: 4.0 },
  { year: 2014, cases: 225, deaths: 579, pVivaxPct: 3.1 },
  { year: 2015, cases: 230, deaths: 578, pVivaxPct: 2.8 },
  { year: 2016, cases: 232, deaths: 576, pVivaxPct: 2.8 },
  { year: 2017, cases: 240, deaths: 574, pVivaxPct: 2.5 },
  { year: 2018, cases: 238, deaths: 575, pVivaxPct: 2.3 },
  { year: 2019, cases: 240, deaths: 567, pVivaxPct: 2.1 },
  { year: 2020, cases: 251, deaths: 621, pVivaxPct: 1.5 },
  { year: 2021, cases: 254, deaths: 601, pVivaxPct: 1.5 },
  { year: 2022, cases: 259, deaths: 598, pVivaxPct: 2.1 },
  { year: 2023, cases: 273, deaths: 598, pVivaxPct: 3.1 },
  { year: 2024, cases: 282, deaths: 610, pVivaxPct: 3.5 },
];

// Cases in thousands (000). Deaths in raw numbers (000).

// === HEADLINE KPIs (2024) ===
export const wmr2025KPIs = {
  globalCases: "282 million",
  globalDeaths: "610,000",
  globalCasesRaw: 282_000_000,
  globalDeathsRaw: 610_000,
  casesPreventedSince2000: "170 million+",
  deathsPreventedSince2000: "1 million+",
  incidencePerThousand: 64.0,
  mortalityPer100k: 13.8,
  gtsIncidenceTarget2025: 18.0,
  gtsMortalityTarget2025: 4.5,
  fundingCoverageOfNeed: "42%",
  countriesWithVaccine: 24,
  countriesCertifiedFree: 44,
  smcChildrenReached: "54 million",
  smcCountries: 20,
  itnCoverageGlobal: "55%",
};

// === NIGERIA SPECIFIC ===
export const nigeriaWMR2025 = {
  shareOfGlobalCases: 24.3,       // % of all cases
  shareOfGlobalDeaths: 30.3,      // % of all deaths
  estimatedCases: 68_526_000,     // 24.3% of 282M
  estimatedDeaths: 184_830,       // 30.3% of 610K
  shareOfAfricaCases: 25.8,       // % in WHO African Region
  shareOfAfricaDeaths: 31.9,
};

// === AFRICA REGION (Table 2.4) ===
export const africaCasesDeathsTrend = [
  { year: 2015, cases: 214, deaths: 550 },
  { year: 2016, cases: 215, deaths: 546 },
  { year: 2017, cases: 225, deaths: 548 },
  { year: 2018, cases: 225, deaths: 552 },
  { year: 2019, cases: 227, deaths: 545 },
  { year: 2020, cases: 239, deaths: 598 },
  { year: 2021, cases: 242, deaths: 577 },
  { year: 2022, cases: 245, deaths: 573 },
  { year: 2023, cases: 256, deaths: 567 },
  { year: 2024, cases: 265, deaths: 579 },
];

// === TOP COUNTRIES BY CASES SHARE (%) ===
export const topCountriesByCases = [
  { country: "Nigeria", pct: 24.3 },
  { country: "DR Congo", pct: 12.5 },
  { country: "Uganda", pct: 5.0 },
  { country: "Ethiopia", pct: 4.7 },
  { country: "Mozambique", pct: 3.9 },
  { country: "Niger", pct: 3.5 },
  { country: "Tanzania", pct: 3.0 },
  { country: "Burkina Faso", pct: 2.9 },
  { country: "Mali", pct: 2.4 },
  { country: "Cameroon", pct: 2.3 },
  { country: "Ghana", pct: 2.2 },
  { country: "Côte d'Ivoire", pct: 2.1 },
  { country: "Angola", pct: 2.0 },
  { country: "Benin", pct: 1.8 },
  { country: "Sudan", pct: 1.8 },
];

// === TOP COUNTRIES BY DEATHS SHARE (%) ===
export const topCountriesByDeaths = [
  { country: "Nigeria", pct: 30.3 },
  { country: "DR Congo", pct: 11.1 },
  { country: "Niger", pct: 5.8 },
  { country: "Tanzania", pct: 4.3 },
  { country: "Ethiopia", pct: 3.7 },
  { country: "Madagascar", pct: 3.4 },
  { country: "Mozambique", pct: 2.9 },
  { country: "Angola", pct: 2.7 },
  { country: "Uganda", pct: 2.7 },
  { country: "Burkina Faso", pct: 2.7 },
];

// === GTS PROGRESS ===
export const gtsProgress = {
  incidence2015: 59.0,
  incidence2024: 64.0,
  incidenceTarget2025: 18.0,
  incidenceTarget2030: 5.9,
  mortality2015: 14.9,
  mortality2024: 13.8,
  mortalityTarget2025: 4.5,
  mortalityTarget2030: 1.5,
  countriesOnTrackIncidence: 21,
  countriesWithIncrease: 30,
  countriesWithIncrease70plus: 18,
};

// === FUNDING DATA (Chapter 4) ===
export const fundingWMR2025 = {
  totalFunding2024Pct: 42, // % of what's needed
  gtsTargetFunding: 9_300_000_000, // USD needed annually by 2025
  actualFunding2024: 3_900_000_000, // approx based on 42%
  fundingGapPct: 58,
};

// === INTERVENTIONS (Chapter 5) ===
export const interventionsCoverage = {
  itnAccess: 55,
  itnUse: 46,
  irsPopulationProtected: "5.6%",
  smcChildrenReached2024: 54_000_000,
  smcCountries: 20,
  iptpCoverage3Plus: 34, // approx %
  rdtTestingRate: 76,
  actTreatmentRate: 80,
  vaccineCountries: 24,
};

// === DRUG RESISTANCE (Chapter 6 & 7) ===
export const drugResistance = {
  pfhrp2DeletionCountries: 42,
  artemisininPartialResistanceAfrica: true,
  insecticideResistancePrevalent: true,
  mftRecommended: true,
  description: "Partial resistance to artemisinin confirmed or suspected in multiple African countries. Early signs of declining efficacy of ACT partner drugs. pfhrp2/3 gene deletions identified in 42 countries, undermining HRP2-based RDT accuracy.",
};

// ======================================================================
// NMSP 2026-2030 — Nigeria National Malaria Strategic Plan
// ======================================================================

// --- Transmission Stratification Bands (Section 3.2.5 / Fig 8) ---
export type TransmissionBand =
  | "very_low"    // prevalence 0 to <1%
  | "low_b"       // prevalence 1 to <5%
  | "low_a"       // prevalence 5 to <10%
  | "moderate_b"  // prevalence 10 to <15%
  | "moderate_a"; // prevalence 15 to <35%

export interface StratificationBand {
  key: TransmissionBand;
  label: string;
  prevalenceRange: string;
  apiRange: string;
  color: string; // semantic HSL token-friendly
}

export const stratificationBands: StratificationBand[] = [
  { key: "very_low",   label: "Very Low",   prevalenceRange: "0–<1%",   apiRange: "<100/1000",     color: "hsl(145 60% 45%)" },
  { key: "low_b",      label: "Low-B",      prevalenceRange: "1–<5%",   apiRange: "100–250/1000",  color: "hsl(145 40% 55%)" },
  { key: "low_a",      label: "Low-A",      prevalenceRange: "5–<10%",  apiRange: "100–250/1000",  color: "hsl(48 80% 55%)" },
  { key: "moderate_b", label: "Moderate-B", prevalenceRange: "10–<15%", apiRange: "250–450/1000",  color: "hsl(25 80% 55%)" },
  { key: "moderate_a", label: "Moderate-A", prevalenceRange: "15–<35%", apiRange: "≥450/1000",     color: "hsl(0 70% 50%)" },
];

// --- NMSP 2026-2030 Goals (Section 4.4.1) ---
export const nmspGoals = {
  national: {
    prevalenceReductionPct: 60,       // 60% reduction from 2025 levels
    mortalityReductionPct: 60,        // 60% reduction in malaria deaths
    baselinePrevalence2025: 15,       // % among children <5 (MIS 2025)
    targetPrevalence2030: 6,          // 15 × 0.40 = 6%
    baselineUnder5Mortality: 110,     // per 1000 live births (NDHS 2024)
  },
  subnational: {
    lowPrevalenceTarget: "very_low" as TransmissionBand,  // achieve very low in low-prev states
    moderateReductionPct: 60,         // 60% reduction in moderate states
    highReductionPct: 30,             // 30% reduction in (previously) high states
  },
};

// --- NMSP 2026-2030 Strategic Objectives (Section 4.4.2) ---
export interface NMSPObjective {
  id: number;
  title: string;
  shortTitle: string;
  baseline: number | string;
  target2030: number | string;
  unit: string;
}

export const nmspObjectives: NMSPObjective[] = [
  {
    id: 1,
    title: "Strengthen governance and improve organizational capacity for malaria programme implementation",
    shortTitle: "Governance & Capacity",
    baseline: 62,
    target2030: 90,
    unit: "%",
  },
  {
    id: 2,
    title: "Improve access to and utilization of preventive interventions",
    shortTitle: "Prevention Access",
    baseline: 64,
    target2030: 80,
    unit: "%",
  },
  {
    id: 3,
    title: "Improve effective coverage for diagnosis and appropriate treatment for all target populations",
    shortTitle: "Diagnosis & Treatment",
    baseline: 69,
    target2030: 80,
    unit: "%",
  },
  {
    id: 4,
    title: "Improve effectiveness of malaria surveillance systems in generating complete, timely, and accurate data",
    shortTitle: "Surveillance",
    baseline: 47,
    target2030: 70,
    unit: "%",
  },
  {
    id: 5,
    title: "Achieve sustainable malaria financing with resources mobilized from domestic sources",
    shortTitle: "Domestic Financing",
    baseline: 54,
    target2030: 80,
    unit: "%",
  },
];

// --- Previous NMSP 2021-2025 Performance (MPR 2025, Section 3.3.3) ---
export const previousNMSPPerformance = {
  overallImplementationRate: 62,  // %
  rating: "Low" as const,        // WHO scale: High >90%, Moderate 75-90%, Low <75%
  objectivePerformance: [
    { id: 1, title: "Vector Control",                      avg: 64, y2021: 45, y2022: 67, y2023: 63, y2024: 82 },
    { id: 2, title: "Chemoprevention, Diagnosis & Treatment", avg: 69, y2021: 60, y2022: 57, y2023: 83, y2024: 77 },
    { id: 3, title: "Surveillance & Data",                 avg: 64, y2021: 38, y2022: 71, y2023: 81, y2024: 66 },
    { id: 4, title: "Coordination & Partnerships",         avg: 60, y2021: 63, y2022: 56, y2023: 50, y2024: 70 },
    { id: 5, title: "Financing & Sustainability",          avg: 54, y2021: 40, y2022: 69, y2023: 52, y2024: 55 },
  ],
};

// --- Key Intervention Milestones from NMSP (Section 3.3.4) ---
export const nmspInterventionData = {
  itnHouseholdOwnership2024: 59,              // %
  itnOwnership1Per2People: 32,                // %
  itnUsePregWomen: 46,                         // %, declined from 50%
  itnUseUrban: 80,                             // %
  itnUseRural: 87,                             // %
  smcStates: 21,                               // scaled from 9
  smcChildrenReached: 28_000_000,              // ~28 million (3-59 months)
  iptpCoverage3PlusDoses: 27,                  // % (NDHS 2024)
  vaccineR21StatesRolledOut: ["Kebbi", "Bayelsa"],
  vaccineChildrenYear1: 58_000,                // 25% of MV1 target
  tprDecline: { from: 76, to: 73, years: "2021-2024" },
  actEfficacy: 98,                             // % (TES 2021-2023)
  surveillanceCoverage2022: 47,                // % of all malaria cases tracked
  population2025: 237_000_000,
  under15Pct: 46,                              // %
  refugeesAndAsylumSeekers: 126_000,
  healthBudgetPctOfNational: "4-5%",           // vs 15% Abuja Declaration
  oopExpenditure2024: 84,                      // % (up from 71% in 2018)
  malariaDirectGovFunding: "<1% of health budget",
};
