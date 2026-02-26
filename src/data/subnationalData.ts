// Subnational province/state data for high-burden African countries
// Aligned with WMR 2025 estimates and national health surveys

export interface Province {
  name: string;
  code: string;
  population: number; // millions
  incidencePerThousand: number;
  itnCoverage: number;
  testPositivityRate: number;
  trend: "improving" | "declining" | "stable";
}

export interface SubnationalCountry {
  countryCode: string;
  viewBox: string;
  provinces: Province[];
  positions: Record<string, { x: number; y: number }>;
}

// ===================== DR CONGO (26 provinces) =====================
const drcProvinces: Province[] = [
  { name: "Kinshasa", code: "KN", population: 17.1, incidencePerThousand: 180, itnCoverage: 55, testPositivityRate: 38, trend: "stable" },
  { name: "Haut-Katanga", code: "HK", population: 6.4, incidencePerThousand: 380, itnCoverage: 42, testPositivityRate: 62, trend: "declining" },
  { name: "Nord-Kivu", code: "NK", population: 8.9, incidencePerThousand: 420, itnCoverage: 35, testPositivityRate: 68, trend: "declining" },
  { name: "Sud-Kivu", code: "SK", population: 7.2, incidencePerThousand: 390, itnCoverage: 38, testPositivityRate: 64, trend: "declining" },
  { name: "Kasaï-Oriental", code: "KO", population: 3.2, incidencePerThousand: 450, itnCoverage: 30, testPositivityRate: 72, trend: "declining" },
  { name: "Kasaï-Central", code: "KC", population: 3.6, incidencePerThousand: 430, itnCoverage: 32, testPositivityRate: 70, trend: "declining" },
  { name: "Maniema", code: "MA", population: 2.9, incidencePerThousand: 400, itnCoverage: 28, testPositivityRate: 66, trend: "declining" },
  { name: "Tshopo", code: "TS", population: 3.1, incidencePerThousand: 410, itnCoverage: 30, testPositivityRate: 67, trend: "declining" },
  { name: "Équateur", code: "EQ", population: 2.5, incidencePerThousand: 380, itnCoverage: 35, testPositivityRate: 60, trend: "stable" },
  { name: "Mongala", code: "MO", population: 2.2, incidencePerThousand: 360, itnCoverage: 33, testPositivityRate: 58, trend: "stable" },
  { name: "Sud-Ubangi", code: "SU", population: 3.5, incidencePerThousand: 370, itnCoverage: 30, testPositivityRate: 61, trend: "declining" },
  { name: "Nord-Ubangi", code: "NU", population: 1.8, incidencePerThousand: 350, itnCoverage: 28, testPositivityRate: 57, trend: "stable" },
  { name: "Bas-Uélé", code: "BU", population: 1.6, incidencePerThousand: 340, itnCoverage: 25, testPositivityRate: 55, trend: "stable" },
  { name: "Haut-Uélé", code: "HU", population: 2.4, incidencePerThousand: 360, itnCoverage: 27, testPositivityRate: 59, trend: "stable" },
  { name: "Ituri", code: "IT", population: 5.7, incidencePerThousand: 400, itnCoverage: 32, testPositivityRate: 65, trend: "declining" },
  { name: "Tanganyika", code: "TA", population: 3.5, incidencePerThousand: 370, itnCoverage: 35, testPositivityRate: 60, trend: "stable" },
  { name: "Haut-Lomami", code: "HL", population: 3.1, incidencePerThousand: 350, itnCoverage: 38, testPositivityRate: 57, trend: "stable" },
  { name: "Lualaba", code: "LU", population: 2.4, incidencePerThousand: 320, itnCoverage: 45, testPositivityRate: 52, trend: "improving" },
  { name: "Lomami", code: "LO", population: 2.8, incidencePerThousand: 360, itnCoverage: 34, testPositivityRate: 58, trend: "stable" },
  { name: "Sankuru", code: "SA", population: 2.0, incidencePerThousand: 380, itnCoverage: 25, testPositivityRate: 62, trend: "declining" },
  { name: "Kwilu", code: "KL", population: 5.2, incidencePerThousand: 340, itnCoverage: 40, testPositivityRate: 55, trend: "stable" },
  { name: "Kwango", code: "KG", population: 2.6, incidencePerThousand: 330, itnCoverage: 38, testPositivityRate: 53, trend: "stable" },
  { name: "Maï-Ndombe", code: "MN", population: 2.1, incidencePerThousand: 350, itnCoverage: 36, testPositivityRate: 56, trend: "stable" },
  { name: "Kongo-Central", code: "KE", population: 6.2, incidencePerThousand: 280, itnCoverage: 48, testPositivityRate: 45, trend: "improving" },
  { name: "Kasaï", code: "KS", population: 3.4, incidencePerThousand: 420, itnCoverage: 28, testPositivityRate: 68, trend: "declining" },
  { name: "Tshuapa", code: "TH", population: 1.5, incidencePerThousand: 340, itnCoverage: 22, testPositivityRate: 55, trend: "stable" },
];

const drcPositions: Record<string, { x: number; y: number }> = {
  KN: { x: 80, y: 280 }, HK: { x: 330, y: 380 }, NK: { x: 380, y: 210 },
  SK: { x: 370, y: 260 }, KO: { x: 290, y: 300 }, KC: { x: 260, y: 310 },
  MA: { x: 330, y: 260 }, TS: { x: 290, y: 140 }, EQ: { x: 170, y: 100 },
  MO: { x: 210, y: 110 }, SU: { x: 130, y: 90 }, NU: { x: 150, y: 60 },
  BU: { x: 300, y: 80 }, HU: { x: 350, y: 90 }, IT: { x: 380, y: 140 },
  TA: { x: 350, y: 320 }, HL: { x: 310, y: 350 }, LU: { x: 290, y: 390 },
  LO: { x: 280, y: 280 }, SA: { x: 280, y: 240 }, KL: { x: 140, y: 260 },
  KG: { x: 100, y: 290 }, MN: { x: 130, y: 220 }, KE: { x: 60, y: 310 },
  KS: { x: 230, y: 300 }, TH: { x: 210, y: 170 },
};

// ===================== UGANDA (15 sub-regions) =====================
const ugandaProvinces: Province[] = [
  { name: "Central", code: "CE", population: 10.5, incidencePerThousand: 180, itnCoverage: 72, testPositivityRate: 35, trend: "improving" },
  { name: "Kampala", code: "KA", population: 3.7, incidencePerThousand: 85, itnCoverage: 60, testPositivityRate: 20, trend: "improving" },
  { name: "Eastern", code: "EA", population: 10.2, incidencePerThousand: 350, itnCoverage: 62, testPositivityRate: 58, trend: "declining" },
  { name: "Northern", code: "NO", population: 8.8, incidencePerThousand: 420, itnCoverage: 55, testPositivityRate: 68, trend: "declining" },
  { name: "Karamoja", code: "KR", population: 1.2, incidencePerThousand: 280, itnCoverage: 40, testPositivityRate: 48, trend: "stable" },
  { name: "West Nile", code: "WN", population: 4.5, incidencePerThousand: 380, itnCoverage: 58, testPositivityRate: 62, trend: "declining" },
  { name: "Western", code: "WE", population: 9.8, incidencePerThousand: 300, itnCoverage: 68, testPositivityRate: 50, trend: "stable" },
  { name: "South Western", code: "SW", population: 4.2, incidencePerThousand: 220, itnCoverage: 70, testPositivityRate: 38, trend: "improving" },
  { name: "Busoga", code: "BU", population: 4.1, incidencePerThousand: 380, itnCoverage: 60, testPositivityRate: 63, trend: "declining" },
  { name: "Bukedi", code: "BK", population: 2.3, incidencePerThousand: 360, itnCoverage: 58, testPositivityRate: 60, trend: "declining" },
  { name: "Teso", code: "TE", population: 2.8, incidencePerThousand: 340, itnCoverage: 55, testPositivityRate: 56, trend: "stable" },
  { name: "Lango", code: "LA", population: 2.5, incidencePerThousand: 370, itnCoverage: 60, testPositivityRate: 61, trend: "declining" },
  { name: "Acholi", code: "AC", population: 2.2, incidencePerThousand: 400, itnCoverage: 52, testPositivityRate: 65, trend: "declining" },
  { name: "Bunyoro", code: "BY", population: 2.8, incidencePerThousand: 310, itnCoverage: 65, testPositivityRate: 52, trend: "stable" },
  { name: "Ankole", code: "AN", population: 3.6, incidencePerThousand: 200, itnCoverage: 72, testPositivityRate: 35, trend: "improving" },
];

const ugandaPositions: Record<string, { x: number; y: number }> = {
  CE: { x: 220, y: 280 }, KA: { x: 200, y: 300 }, EA: { x: 320, y: 260 },
  NO: { x: 230, y: 120 }, KR: { x: 350, y: 100 }, WN: { x: 150, y: 80 },
  WE: { x: 130, y: 250 }, SW: { x: 110, y: 340 }, BU: { x: 290, y: 290 },
  BK: { x: 340, y: 250 }, TE: { x: 330, y: 190 }, LA: { x: 250, y: 160 },
  AC: { x: 210, y: 100 }, BY: { x: 160, y: 210 }, AN: { x: 140, y: 310 },
};

// ===================== ETHIOPIA (11 regions) =====================
const ethiopiaProvinces: Province[] = [
  { name: "Oromia", code: "OR", population: 40.1, incidencePerThousand: 85, itnCoverage: 58, testPositivityRate: 28, trend: "improving" },
  { name: "Amhara", code: "AM", population: 22.9, incidencePerThousand: 150, itnCoverage: 62, testPositivityRate: 42, trend: "declining" },
  { name: "SNNPR", code: "SN", population: 21.4, incidencePerThousand: 120, itnCoverage: 55, testPositivityRate: 35, trend: "stable" },
  { name: "Tigray", code: "TI", population: 5.7, incidencePerThousand: 100, itnCoverage: 48, testPositivityRate: 30, trend: "declining" },
  { name: "Somali", code: "SO", population: 6.3, incidencePerThousand: 60, itnCoverage: 25, testPositivityRate: 18, trend: "stable" },
  { name: "Afar", code: "AF", population: 2.0, incidencePerThousand: 130, itnCoverage: 30, testPositivityRate: 38, trend: "declining" },
  { name: "Benishangul-Gumuz", code: "BG", population: 1.2, incidencePerThousand: 250, itnCoverage: 55, testPositivityRate: 55, trend: "declining" },
  { name: "Gambella", code: "GA", population: 0.5, incidencePerThousand: 320, itnCoverage: 45, testPositivityRate: 62, trend: "declining" },
  { name: "Sidama", code: "SI", population: 4.3, incidencePerThousand: 90, itnCoverage: 52, testPositivityRate: 25, trend: "improving" },
  { name: "Addis Ababa", code: "AA", population: 5.5, incidencePerThousand: 5, itnCoverage: 10, testPositivityRate: 3, trend: "improving" },
  { name: "Dire Dawa", code: "DD", population: 0.5, incidencePerThousand: 40, itnCoverage: 35, testPositivityRate: 15, trend: "improving" },
  { name: "Harari", code: "HA", population: 0.3, incidencePerThousand: 35, itnCoverage: 32, testPositivityRate: 12, trend: "improving" },
  { name: "South West", code: "SW", population: 3.2, incidencePerThousand: 180, itnCoverage: 50, testPositivityRate: 45, trend: "declining" },
];

const ethiopiaPositions: Record<string, { x: number; y: number }> = {
  OR: { x: 250, y: 270 }, AM: { x: 230, y: 150 }, SN: { x: 210, y: 340 },
  TI: { x: 220, y: 70 }, SO: { x: 390, y: 280 }, AF: { x: 320, y: 130 },
  BG: { x: 140, y: 180 }, GA: { x: 100, y: 270 }, SI: { x: 240, y: 320 },
  AA: { x: 260, y: 220 }, DD: { x: 340, y: 230 }, HA: { x: 330, y: 240 },
  SW: { x: 150, y: 310 },
};

// ===================== MOZAMBIQUE (10 provinces + Maputo) =====================
const mozambiqueProvinces: Province[] = [
  { name: "Nampula", code: "NP", population: 6.4, incidencePerThousand: 420, itnCoverage: 65, testPositivityRate: 68, trend: "declining" },
  { name: "Zambezia", code: "ZA", population: 5.8, incidencePerThousand: 450, itnCoverage: 58, testPositivityRate: 72, trend: "declining" },
  { name: "Cabo Delgado", code: "CD", population: 2.3, incidencePerThousand: 380, itnCoverage: 52, testPositivityRate: 62, trend: "declining" },
  { name: "Niassa", code: "NI", population: 1.9, incidencePerThousand: 340, itnCoverage: 55, testPositivityRate: 56, trend: "stable" },
  { name: "Tete", code: "TE", population: 2.9, incidencePerThousand: 350, itnCoverage: 50, testPositivityRate: 58, trend: "stable" },
  { name: "Manica", code: "MA", population: 2.1, incidencePerThousand: 300, itnCoverage: 60, testPositivityRate: 50, trend: "stable" },
  { name: "Sofala", code: "SO", population: 2.4, incidencePerThousand: 320, itnCoverage: 62, testPositivityRate: 52, trend: "stable" },
  { name: "Inhambane", code: "IN", population: 1.5, incidencePerThousand: 220, itnCoverage: 65, testPositivityRate: 38, trend: "improving" },
  { name: "Gaza", code: "GA", population: 1.4, incidencePerThousand: 180, itnCoverage: 68, testPositivityRate: 32, trend: "improving" },
  { name: "Maputo Province", code: "MP", population: 2.1, incidencePerThousand: 120, itnCoverage: 55, testPositivityRate: 22, trend: "improving" },
  { name: "Maputo City", code: "MC", population: 1.3, incidencePerThousand: 60, itnCoverage: 40, testPositivityRate: 12, trend: "improving" },
];

const mozambiquePositions: Record<string, { x: number; y: number }> = {
  NP: { x: 290, y: 180 }, ZA: { x: 240, y: 230 }, CD: { x: 280, y: 90 },
  NI: { x: 220, y: 110 }, TE: { x: 180, y: 230 }, MA: { x: 180, y: 290 },
  SO: { x: 200, y: 310 }, IN: { x: 220, y: 380 }, GA: { x: 190, y: 410 },
  MP: { x: 185, y: 450 }, MC: { x: 200, y: 470 },
};

// ===================== REGISTRY =====================
export const subnationalRegistry: Record<string, SubnationalCountry> = {
  CD: { countryCode: "CD", viewBox: "0 0 450 450", provinces: drcProvinces, positions: drcPositions },
  UG: { countryCode: "UG", viewBox: "0 0 450 420", provinces: ugandaProvinces, positions: ugandaPositions },
  ET: { countryCode: "ET", viewBox: "0 0 480 420", provinces: ethiopiaProvinces, positions: ethiopiaPositions },
  MZ: { countryCode: "MZ", viewBox: "0 0 400 520", provinces: mozambiqueProvinces, positions: mozambiquePositions },
};

export function hasSubnationalData(countryCode: string): boolean {
  return countryCode in subnationalRegistry;
}

export function getSubnationalData(countryCode: string): SubnationalCountry | undefined {
  return subnationalRegistry[countryCode];
}

export function getProvinceBurdenColor(incidence: number): string {
  if (incidence >= 400) return "hsl(0 70% 50%)";
  if (incidence >= 300) return "hsl(25 80% 50%)";
  if (incidence >= 200) return "hsl(35 85% 55%)";
  if (incidence >= 100) return "hsl(45 90% 60%)";
  if (incidence >= 50) return "hsl(50 90% 75%)";
  return "hsl(140 60% 50%)";
}
