// WHO African Region — 47 countries with WMR 2025-aligned data
// Cases/deaths are estimates in thousands for 2024

export interface AfricanCountry {
  name: string;
  code: string; // ISO 3166-1 alpha-2
  region: AfricaRegion;
  population: number; // millions
  estimatedCases: number; // thousands
  estimatedDeaths: number; // raw
  casesSharePct: number; // % of global
  deathsSharePct: number;
  incidencePerThousand: number;
  mortalityPer100k: number;
  itnCoverage: number; // %
  actCoverage: number; // %
  rdtTestingRate: number; // %
  trend: "improving" | "declining" | "stable";
  eliminationPhase: "control" | "pre-elimination" | "elimination" | "prevention";
  flag: string; // emoji
}

export type AfricaRegion = "West Africa" | "East Africa" | "Central Africa" | "Southern Africa" | "North Africa";

export const africaRegions: AfricaRegion[] = [
  "West Africa", "East Africa", "Central Africa", "Southern Africa", "North Africa"
];

export const africanCountries: AfricanCountry[] = [
  // === WEST AFRICA ===
  { name: "Nigeria", code: "NG", region: "West Africa", population: 223.8, estimatedCases: 68526, estimatedDeaths: 184830, casesSharePct: 24.3, deathsSharePct: 30.3, incidencePerThousand: 306, mortalityPer100k: 82.6, itnCoverage: 52, actCoverage: 35, rdtTestingRate: 40, trend: "declining", eliminationPhase: "control", flag: "🇳🇬" },
  { name: "Ghana", code: "GH", region: "West Africa", population: 33.5, estimatedCases: 6204, estimatedDeaths: 5490, casesSharePct: 2.2, deathsSharePct: 0.9, incidencePerThousand: 185, mortalityPer100k: 16.4, itnCoverage: 60, actCoverage: 45, rdtTestingRate: 55, trend: "stable", eliminationPhase: "control", flag: "🇬🇭" },
  { name: "Burkina Faso", code: "BF", region: "West Africa", population: 22.7, estimatedCases: 8178, estimatedDeaths: 16470, casesSharePct: 2.9, deathsSharePct: 2.7, incidencePerThousand: 360, mortalityPer100k: 72.6, itnCoverage: 70, actCoverage: 50, rdtTestingRate: 65, trend: "declining", eliminationPhase: "control", flag: "🇧🇫" },
  { name: "Mali", code: "ML", region: "West Africa", population: 22.4, estimatedCases: 6768, estimatedDeaths: 9150, casesSharePct: 2.4, deathsSharePct: 1.5, incidencePerThousand: 302, mortalityPer100k: 40.8, itnCoverage: 65, actCoverage: 40, rdtTestingRate: 60, trend: "stable", eliminationPhase: "control", flag: "🇲🇱" },
  { name: "Niger", code: "NE", region: "West Africa", population: 26.2, estimatedCases: 9870, estimatedDeaths: 35380, casesSharePct: 3.5, deathsSharePct: 5.8, incidencePerThousand: 377, mortalityPer100k: 135.0, itnCoverage: 55, actCoverage: 30, rdtTestingRate: 45, trend: "declining", eliminationPhase: "control", flag: "🇳🇪" },
  { name: "Côte d'Ivoire", code: "CI", region: "West Africa", population: 28.2, estimatedCases: 5922, estimatedDeaths: 6710, casesSharePct: 2.1, deathsSharePct: 1.1, incidencePerThousand: 210, mortalityPer100k: 23.8, itnCoverage: 58, actCoverage: 42, rdtTestingRate: 50, trend: "stable", eliminationPhase: "control", flag: "🇨🇮" },
  { name: "Senegal", code: "SN", region: "West Africa", population: 17.8, estimatedCases: 1424, estimatedDeaths: 1220, casesSharePct: 0.5, deathsSharePct: 0.2, incidencePerThousand: 80, mortalityPer100k: 6.9, itnCoverage: 72, actCoverage: 65, rdtTestingRate: 78, trend: "improving", eliminationPhase: "control", flag: "🇸🇳" },
  { name: "Guinea", code: "GN", region: "West Africa", population: 14.2, estimatedCases: 3976, estimatedDeaths: 4270, casesSharePct: 1.4, deathsSharePct: 0.7, incidencePerThousand: 280, mortalityPer100k: 30.1, itnCoverage: 50, actCoverage: 35, rdtTestingRate: 45, trend: "declining", eliminationPhase: "control", flag: "🇬🇳" },
  { name: "Benin", code: "BJ", region: "West Africa", population: 13.4, estimatedCases: 5076, estimatedDeaths: 10980, casesSharePct: 1.8, deathsSharePct: 1.8, incidencePerThousand: 379, mortalityPer100k: 81.9, itnCoverage: 62, actCoverage: 38, rdtTestingRate: 52, trend: "declining", eliminationPhase: "control", flag: "🇧🇯" },
  { name: "Sierra Leone", code: "SL", region: "West Africa", population: 8.6, estimatedCases: 2838, estimatedDeaths: 3050, casesSharePct: 1.0, deathsSharePct: 0.5, incidencePerThousand: 330, mortalityPer100k: 35.5, itnCoverage: 58, actCoverage: 40, rdtTestingRate: 60, trend: "stable", eliminationPhase: "control", flag: "🇸🇱" },
  { name: "Togo", code: "TG", region: "West Africa", population: 8.9, estimatedCases: 2670, estimatedDeaths: 2440, casesSharePct: 0.9, deathsSharePct: 0.4, incidencePerThousand: 300, mortalityPer100k: 27.4, itnCoverage: 55, actCoverage: 42, rdtTestingRate: 55, trend: "stable", eliminationPhase: "control", flag: "🇹🇬" },
  { name: "Liberia", code: "LR", region: "West Africa", population: 5.3, estimatedCases: 1802, estimatedDeaths: 1590, casesSharePct: 0.6, deathsSharePct: 0.3, incidencePerThousand: 340, mortalityPer100k: 30.0, itnCoverage: 48, actCoverage: 35, rdtTestingRate: 50, trend: "stable", eliminationPhase: "control", flag: "🇱🇷" },
  { name: "Guinea-Bissau", code: "GW", region: "West Africa", population: 2.1, estimatedCases: 546, estimatedDeaths: 488, casesSharePct: 0.2, deathsSharePct: 0.1, incidencePerThousand: 260, mortalityPer100k: 23.2, itnCoverage: 45, actCoverage: 30, rdtTestingRate: 42, trend: "stable", eliminationPhase: "control", flag: "🇬🇼" },
  { name: "The Gambia", code: "GM", region: "West Africa", population: 2.7, estimatedCases: 270, estimatedDeaths: 162, casesSharePct: 0.1, deathsSharePct: 0.03, incidencePerThousand: 100, mortalityPer100k: 6.0, itnCoverage: 70, actCoverage: 60, rdtTestingRate: 75, trend: "improving", eliminationPhase: "control", flag: "🇬🇲" },
  { name: "Mauritania", code: "MR", region: "West Africa", population: 4.9, estimatedCases: 539, estimatedDeaths: 392, casesSharePct: 0.2, deathsSharePct: 0.06, incidencePerThousand: 110, mortalityPer100k: 8.0, itnCoverage: 42, actCoverage: 30, rdtTestingRate: 40, trend: "stable", eliminationPhase: "control", flag: "🇲🇷" },
  { name: "Cabo Verde", code: "CV", region: "West Africa", population: 0.6, estimatedCases: 0.3, estimatedDeaths: 0, casesSharePct: 0, deathsSharePct: 0, incidencePerThousand: 0.5, mortalityPer100k: 0, itnCoverage: 0, actCoverage: 90, rdtTestingRate: 95, trend: "improving", eliminationPhase: "elimination", flag: "🇨🇻" },

  // === EAST AFRICA ===
  { name: "Uganda", code: "UG", region: "East Africa", population: 48.6, estimatedCases: 14100, estimatedDeaths: 16470, casesSharePct: 5.0, deathsSharePct: 2.7, incidencePerThousand: 290, mortalityPer100k: 33.9, itnCoverage: 65, actCoverage: 55, rdtTestingRate: 68, trend: "declining", eliminationPhase: "control", flag: "🇺🇬" },
  { name: "Ethiopia", code: "ET", region: "East Africa", population: 126.5, estimatedCases: 13254, estimatedDeaths: 22570, casesSharePct: 4.7, deathsSharePct: 3.7, incidencePerThousand: 105, mortalityPer100k: 17.8, itnCoverage: 55, actCoverage: 45, rdtTestingRate: 72, trend: "declining", eliminationPhase: "control", flag: "🇪🇹" },
  { name: "Tanzania", code: "TZ", region: "East Africa", population: 65.5, estimatedCases: 8460, estimatedDeaths: 26230, casesSharePct: 3.0, deathsSharePct: 4.3, incidencePerThousand: 129, mortalityPer100k: 40.0, itnCoverage: 62, actCoverage: 50, rdtTestingRate: 65, trend: "declining", eliminationPhase: "control", flag: "🇹🇿" },
  { name: "Kenya", code: "KE", region: "East Africa", population: 55.1, estimatedCases: 4408, estimatedDeaths: 5490, casesSharePct: 1.6, deathsSharePct: 0.9, incidencePerThousand: 80, mortalityPer100k: 10.0, itnCoverage: 58, actCoverage: 55, rdtTestingRate: 70, trend: "improving", eliminationPhase: "control", flag: "🇰🇪" },
  { name: "Rwanda", code: "RW", region: "East Africa", population: 14.1, estimatedCases: 3384, estimatedDeaths: 1830, casesSharePct: 1.2, deathsSharePct: 0.3, incidencePerThousand: 240, mortalityPer100k: 13.0, itnCoverage: 72, actCoverage: 60, rdtTestingRate: 80, trend: "stable", eliminationPhase: "control", flag: "🇷🇼" },
  { name: "Burundi", code: "BI", region: "East Africa", population: 13.2, estimatedCases: 4224, estimatedDeaths: 3660, casesSharePct: 1.5, deathsSharePct: 0.6, incidencePerThousand: 320, mortalityPer100k: 27.7, itnCoverage: 60, actCoverage: 45, rdtTestingRate: 62, trend: "declining", eliminationPhase: "control", flag: "🇧🇮" },
  { name: "South Sudan", code: "SS", region: "East Africa", population: 11.1, estimatedCases: 3330, estimatedDeaths: 5490, casesSharePct: 1.2, deathsSharePct: 0.9, incidencePerThousand: 300, mortalityPer100k: 49.5, itnCoverage: 35, actCoverage: 20, rdtTestingRate: 35, trend: "declining", eliminationPhase: "control", flag: "🇸🇸" },
  { name: "Madagascar", code: "MG", region: "East Africa", population: 30.3, estimatedCases: 3636, estimatedDeaths: 20740, casesSharePct: 1.3, deathsSharePct: 3.4, incidencePerThousand: 120, mortalityPer100k: 68.4, itnCoverage: 48, actCoverage: 30, rdtTestingRate: 45, trend: "declining", eliminationPhase: "control", flag: "🇲🇬" },
  { name: "Somalia", code: "SO_", region: "East Africa", population: 18.1, estimatedCases: 1448, estimatedDeaths: 1830, casesSharePct: 0.5, deathsSharePct: 0.3, incidencePerThousand: 80, mortalityPer100k: 10.1, itnCoverage: 25, actCoverage: 15, rdtTestingRate: 30, trend: "stable", eliminationPhase: "control", flag: "🇸🇴" },
  { name: "Eritrea", code: "ER", region: "East Africa", population: 3.7, estimatedCases: 148, estimatedDeaths: 37, casesSharePct: 0.05, deathsSharePct: 0.01, incidencePerThousand: 40, mortalityPer100k: 1.0, itnCoverage: 55, actCoverage: 60, rdtTestingRate: 70, trend: "improving", eliminationPhase: "pre-elimination", flag: "🇪🇷" },
  { name: "Djibouti", code: "DJ", region: "East Africa", population: 1.1, estimatedCases: 22, estimatedDeaths: 6, casesSharePct: 0.01, deathsSharePct: 0, incidencePerThousand: 20, mortalityPer100k: 0.5, itnCoverage: 40, actCoverage: 55, rdtTestingRate: 65, trend: "improving", eliminationPhase: "pre-elimination", flag: "🇩🇯" },
  { name: "Comoros", code: "KM", region: "East Africa", population: 0.9, estimatedCases: 36, estimatedDeaths: 9, casesSharePct: 0.01, deathsSharePct: 0, incidencePerThousand: 40, mortalityPer100k: 1.0, itnCoverage: 50, actCoverage: 60, rdtTestingRate: 70, trend: "improving", eliminationPhase: "pre-elimination", flag: "🇰🇲" },

  // === CENTRAL AFRICA ===
  { name: "DR Congo", code: "CD", region: "Central Africa", population: 102.3, estimatedCases: 35250, estimatedDeaths: 67710, casesSharePct: 12.5, deathsSharePct: 11.1, incidencePerThousand: 345, mortalityPer100k: 66.2, itnCoverage: 50, actCoverage: 25, rdtTestingRate: 35, trend: "declining", eliminationPhase: "control", flag: "🇨🇩" },
  { name: "Cameroon", code: "CM", region: "Central Africa", population: 28.6, estimatedCases: 6486, estimatedDeaths: 7930, casesSharePct: 2.3, deathsSharePct: 1.3, incidencePerThousand: 227, mortalityPer100k: 27.7, itnCoverage: 55, actCoverage: 40, rdtTestingRate: 50, trend: "stable", eliminationPhase: "control", flag: "🇨🇲" },
  { name: "Chad", code: "TD", region: "Central Africa", population: 18.3, estimatedCases: 4758, estimatedDeaths: 6710, casesSharePct: 1.7, deathsSharePct: 1.1, incidencePerThousand: 260, mortalityPer100k: 36.7, itnCoverage: 42, actCoverage: 25, rdtTestingRate: 38, trend: "declining", eliminationPhase: "control", flag: "🇹🇩" },
  { name: "Central African Republic", code: "CF", region: "Central Africa", population: 5.6, estimatedCases: 2240, estimatedDeaths: 3050, casesSharePct: 0.8, deathsSharePct: 0.5, incidencePerThousand: 400, mortalityPer100k: 54.5, itnCoverage: 38, actCoverage: 20, rdtTestingRate: 32, trend: "declining", eliminationPhase: "control", flag: "🇨🇫" },
  { name: "Republic of Congo", code: "CG", region: "Central Africa", population: 6.1, estimatedCases: 1708, estimatedDeaths: 1830, casesSharePct: 0.6, deathsSharePct: 0.3, incidencePerThousand: 280, mortalityPer100k: 30.0, itnCoverage: 45, actCoverage: 32, rdtTestingRate: 42, trend: "stable", eliminationPhase: "control", flag: "🇨🇬" },
  { name: "Gabon", code: "GA", region: "Central Africa", population: 2.4, estimatedCases: 480, estimatedDeaths: 366, casesSharePct: 0.2, deathsSharePct: 0.06, incidencePerThousand: 200, mortalityPer100k: 15.3, itnCoverage: 52, actCoverage: 45, rdtTestingRate: 55, trend: "stable", eliminationPhase: "control", flag: "🇬🇦" },
  { name: "Equatorial Guinea", code: "GQ", region: "Central Africa", population: 1.7, estimatedCases: 374, estimatedDeaths: 256, casesSharePct: 0.1, deathsSharePct: 0.04, incidencePerThousand: 220, mortalityPer100k: 15.1, itnCoverage: 50, actCoverage: 40, rdtTestingRate: 48, trend: "stable", eliminationPhase: "control", flag: "🇬🇶" },
  { name: "São Tomé and Príncipe", code: "ST", region: "Central Africa", population: 0.23, estimatedCases: 4.6, estimatedDeaths: 2, casesSharePct: 0, deathsSharePct: 0, incidencePerThousand: 20, mortalityPer100k: 0.9, itnCoverage: 65, actCoverage: 70, rdtTestingRate: 80, trend: "improving", eliminationPhase: "pre-elimination", flag: "🇸🇹" },

  // === SOUTHERN AFRICA ===
  { name: "Mozambique", code: "MZ", region: "Southern Africa", population: 33.9, estimatedCases: 10998, estimatedDeaths: 17690, casesSharePct: 3.9, deathsSharePct: 2.9, incidencePerThousand: 324, mortalityPer100k: 52.2, itnCoverage: 60, actCoverage: 38, rdtTestingRate: 55, trend: "declining", eliminationPhase: "control", flag: "🇲🇿" },
  { name: "Angola", code: "AO", region: "Southern Africa", population: 36.7, estimatedCases: 5640, estimatedDeaths: 16470, casesSharePct: 2.0, deathsSharePct: 2.7, incidencePerThousand: 154, mortalityPer100k: 44.9, itnCoverage: 42, actCoverage: 30, rdtTestingRate: 40, trend: "declining", eliminationPhase: "control", flag: "🇦🇴" },
  { name: "Malawi", code: "MW", region: "Southern Africa", population: 20.4, estimatedCases: 4896, estimatedDeaths: 5490, casesSharePct: 1.7, deathsSharePct: 0.9, incidencePerThousand: 240, mortalityPer100k: 26.9, itnCoverage: 62, actCoverage: 50, rdtTestingRate: 65, trend: "stable", eliminationPhase: "control", flag: "🇲🇼" },
  { name: "Zambia", code: "ZM", region: "Southern Africa", population: 20.6, estimatedCases: 4120, estimatedDeaths: 3050, casesSharePct: 1.5, deathsSharePct: 0.5, incidencePerThousand: 200, mortalityPer100k: 14.8, itnCoverage: 65, actCoverage: 55, rdtTestingRate: 70, trend: "improving", eliminationPhase: "control", flag: "🇿🇲" },
  { name: "Zimbabwe", code: "ZW", region: "Southern Africa", population: 16.7, estimatedCases: 1336, estimatedDeaths: 1220, casesSharePct: 0.5, deathsSharePct: 0.2, incidencePerThousand: 80, mortalityPer100k: 7.3, itnCoverage: 58, actCoverage: 60, rdtTestingRate: 72, trend: "improving", eliminationPhase: "control", flag: "🇿🇼" },
  { name: "Namibia", code: "NA_", region: "Southern Africa", population: 2.6, estimatedCases: 52, estimatedDeaths: 13, casesSharePct: 0.02, deathsSharePct: 0, incidencePerThousand: 20, mortalityPer100k: 0.5, itnCoverage: 55, actCoverage: 70, rdtTestingRate: 82, trend: "improving", eliminationPhase: "pre-elimination", flag: "🇳🇦" },
  { name: "Botswana", code: "BW", region: "Southern Africa", population: 2.6, estimatedCases: 13, estimatedDeaths: 3, casesSharePct: 0, deathsSharePct: 0, incidencePerThousand: 5, mortalityPer100k: 0.1, itnCoverage: 45, actCoverage: 80, rdtTestingRate: 90, trend: "improving", eliminationPhase: "elimination", flag: "🇧🇼" },
  { name: "Eswatini", code: "SZ", region: "Southern Africa", population: 1.2, estimatedCases: 1.2, estimatedDeaths: 0, casesSharePct: 0, deathsSharePct: 0, incidencePerThousand: 1, mortalityPer100k: 0, itnCoverage: 55, actCoverage: 85, rdtTestingRate: 92, trend: "improving", eliminationPhase: "elimination", flag: "🇸🇿" },
  { name: "South Africa", code: "ZA", region: "Southern Africa", population: 60.4, estimatedCases: 604, estimatedDeaths: 183, casesSharePct: 0.2, deathsSharePct: 0.03, incidencePerThousand: 10, mortalityPer100k: 0.3, itnCoverage: 50, actCoverage: 75, rdtTestingRate: 85, trend: "improving", eliminationPhase: "pre-elimination", flag: "🇿🇦" },

  // === NORTH AFRICA (mostly eliminated) ===
  { name: "Sudan", code: "SD", region: "North Africa", population: 48.1, estimatedCases: 5076, estimatedDeaths: 10980, casesSharePct: 1.8, deathsSharePct: 1.8, incidencePerThousand: 105, mortalityPer100k: 22.8, itnCoverage: 35, actCoverage: 30, rdtTestingRate: 40, trend: "declining", eliminationPhase: "control", flag: "🇸🇩" },
];

// Helpers
export function getCountryByCode(code: string): AfricanCountry | undefined {
  return africanCountries.find(c => c.code === code);
}

export function getCountriesByRegion(region: AfricaRegion): AfricanCountry[] {
  return africanCountries.filter(c => c.region === region);
}

export function getTop15ByBurden(): AfricanCountry[] {
  return [...africanCountries].sort((a, b) => b.estimatedCases - a.estimatedCases).slice(0, 15);
}

export function getTotalAfricaCases(): number {
  return africanCountries.reduce((sum, c) => sum + c.estimatedCases, 0);
}

export function getTotalAfricaDeaths(): number {
  return africanCountries.reduce((sum, c) => sum + c.estimatedDeaths, 0);
}

// SVG positions for Africa map (viewBox 0 0 500 550)
export const countryPositions: Record<string, { x: number; y: number }> = {
  // North Africa
  SD: { x: 370, y: 165 },
  // West Africa
  MR: { x: 105, y: 160 },
  SN: { x: 68, y: 192 },
  GM: { x: 68, y: 200 },
  GW: { x: 72, y: 212 },
  GN: { x: 88, y: 222 },
  SL: { x: 82, y: 240 },
  LR: { x: 92, y: 252 },
  CI: { x: 118, y: 248 },
  ML: { x: 138, y: 178 },
  BF: { x: 148, y: 218 },
  GH: { x: 145, y: 248 },
  TG: { x: 157, y: 248 },
  BJ: { x: 165, y: 242 },
  NG: { x: 195, y: 235 },
  NE: { x: 195, y: 178 },
  CV: { x: 38, y: 195 },
  // Central Africa
  CM: { x: 225, y: 260 },
  TD: { x: 265, y: 195 },
  CF: { x: 285, y: 248 },
  CD: { x: 310, y: 310 },
  CG: { x: 265, y: 310 },
  GA: { x: 240, y: 300 },
  GQ: { x: 228, y: 288 },
  ST: { x: 208, y: 290 },
  // East Africa
  ET: { x: 395, y: 225 },
  SO_: { x: 435, y: 240 },
  KE: { x: 395, y: 290 },
  UG: { x: 365, y: 285 },
  RW: { x: 355, y: 310 },
  BI: { x: 350, y: 322 },
  TZ: { x: 380, y: 340 },
  SS: { x: 350, y: 245 },
  ER: { x: 400, y: 195 },
  DJ: { x: 425, y: 210 },
  MG: { x: 435, y: 400 },
  KM: { x: 420, y: 375 },
  // Southern Africa
  MZ: { x: 395, y: 410 },
  MW: { x: 375, y: 385 },
  ZM: { x: 340, y: 380 },
  ZW: { x: 355, y: 420 },
  AO: { x: 278, y: 370 },
  NA_: { x: 295, y: 440 },
  BW: { x: 330, y: 445 },
  ZA: { x: 335, y: 490 },
  SZ: { x: 368, y: 470 },
};

// Burden color
export function getBurdenColor(incidence: number): string {
  if (incidence >= 300) return "hsl(0 70% 50%)";
  if (incidence >= 200) return "hsl(25 80% 50%)";
  if (incidence >= 100) return "hsl(35 85% 55%)";
  if (incidence >= 50) return "hsl(45 90% 60%)";
  if (incidence >= 10) return "hsl(50 90% 75%)";
  return "hsl(140 60% 50%)";
}
