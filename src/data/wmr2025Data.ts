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
