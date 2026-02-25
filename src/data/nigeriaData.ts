export interface NigeriaState {
  name: string;
  code: string;
  zone: string;
  population: number;
  lgaCount: number;
}

export const zones = [
  "North-West",
  "North-East",
  "North-Central",
  "South-West",
  "South-South",
  "South-East",
] as const;

export type Zone = (typeof zones)[number];

export const nigeriaStates: NigeriaState[] = [
  // North-West
  { name: "Kano", code: "KN", zone: "North-West", population: 16_000_000, lgaCount: 44 },
  { name: "Katsina", code: "KT", zone: "North-West", population: 8_900_000, lgaCount: 34 },
  { name: "Sokoto", code: "SO", zone: "North-West", population: 5_600_000, lgaCount: 23 },
  { name: "Zamfara", code: "ZA", zone: "North-West", population: 4_500_000, lgaCount: 14 },
  { name: "Kebbi", code: "KB", zone: "North-West", population: 4_400_000, lgaCount: 21 },
  { name: "Jigawa", code: "JG", zone: "North-West", population: 5_800_000, lgaCount: 27 },
  { name: "Kaduna", code: "KD", zone: "North-West", population: 8_300_000, lgaCount: 23 },
  // North-East
  { name: "Borno", code: "BO", zone: "North-East", population: 6_000_000, lgaCount: 27 },
  { name: "Bauchi", code: "BA", zone: "North-East", population: 6_500_000, lgaCount: 20 },
  { name: "Yobe", code: "YO", zone: "North-East", population: 3_300_000, lgaCount: 17 },
  { name: "Adamawa", code: "AD", zone: "North-East", population: 4_200_000, lgaCount: 21 },
  { name: "Gombe", code: "GO", zone: "North-East", population: 3_300_000, lgaCount: 11 },
  { name: "Taraba", code: "TA", zone: "North-East", population: 3_100_000, lgaCount: 16 },
  // North-Central
  { name: "Niger", code: "NI", zone: "North-Central", population: 5_600_000, lgaCount: 25 },
  { name: "Kwara", code: "KW", zone: "North-Central", population: 3_200_000, lgaCount: 16 },
  { name: "Kogi", code: "KG", zone: "North-Central", population: 4_000_000, lgaCount: 21 },
  { name: "Benue", code: "BE", zone: "North-Central", population: 5_700_000, lgaCount: 23 },
  { name: "Plateau", code: "PL", zone: "North-Central", population: 4_200_000, lgaCount: 17 },
  { name: "Nassarawa", code: "NA", zone: "North-Central", population: 2_500_000, lgaCount: 13 },
  { name: "FCT", code: "FC", zone: "North-Central", population: 3_600_000, lgaCount: 6 },
  // South-West
  { name: "Lagos", code: "LA", zone: "South-West", population: 15_400_000, lgaCount: 20 },
  { name: "Oyo", code: "OY", zone: "South-West", population: 7_800_000, lgaCount: 33 },
  { name: "Ogun", code: "OG", zone: "South-West", population: 5_200_000, lgaCount: 20 },
  { name: "Ondo", code: "ON", zone: "South-West", population: 4_700_000, lgaCount: 18 },
  { name: "Osun", code: "OS", zone: "South-West", population: 4_700_000, lgaCount: 30 },
  { name: "Ekiti", code: "EK", zone: "South-West", population: 3_300_000, lgaCount: 16 },
  // South-South
  { name: "Rivers", code: "RI", zone: "South-South", population: 7_300_000, lgaCount: 23 },
  { name: "Delta", code: "DE", zone: "South-South", population: 5_700_000, lgaCount: 25 },
  { name: "Edo", code: "ED", zone: "South-South", population: 4_200_000, lgaCount: 18 },
  { name: "Cross River", code: "CR", zone: "South-South", population: 3_900_000, lgaCount: 18 },
  { name: "Akwa Ibom", code: "AK", zone: "South-South", population: 5_500_000, lgaCount: 31 },
  { name: "Bayelsa", code: "BY", zone: "South-South", population: 2_300_000, lgaCount: 8 },
  // South-East
  { name: "Anambra", code: "AN", zone: "South-East", population: 5_500_000, lgaCount: 21 },
  { name: "Enugu", code: "EN", zone: "South-East", population: 4_400_000, lgaCount: 17 },
  { name: "Imo", code: "IM", zone: "South-East", population: 5_400_000, lgaCount: 27 },
  { name: "Abia", code: "AB", zone: "South-East", population: 3_700_000, lgaCount: 17 },
  { name: "Ebonyi", code: "EB", zone: "South-East", population: 2_900_000, lgaCount: 13 },
];

// Burden multiplier by zone (realistic distribution)
const zoneBurden: Record<Zone, number> = {
  "North-West": 1.6,
  "North-East": 1.4,
  "North-Central": 1.0,
  "South-West": 0.7,
  "South-South": 0.6,
  "South-East": 0.55,
};

export function getStateBurden(state: NigeriaState): number {
  return zoneBurden[state.zone as Zone] ?? 1;
}

// Generate 24 months of incidence data (WMR 2025: 282M global, Nigeria = 24.3%)
export function generateMonthlyIncidence() {
  const months: string[] = [];
  const now = new Date(2024, 11);
  for (let i = 23; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i);
    months.push(d.toLocaleDateString("en", { year: "2-digit", month: "short" }));
  }

  return months.map((month, i) => {
    const monthIdx = (new Date(2024, 11).getMonth() - 23 + i + 24) % 12;
    // Seasonal factor: peak Jun-Oct (indices 5-9) — aligned with WMR 2025 Africa Region data
    const seasonal = monthIdx >= 5 && monthIdx <= 9 ? 1.35 : 0.8;
    const base = 320; // scaled up per WMR 2025 case estimates
    const jitter = (Math.sin(i * 1.7) * 20) + (Math.cos(i * 0.9) * 15);
    return {
      month,
      national: Math.round((base * seasonal + jitter) * 10) / 10,
      northWest: Math.round((base * 1.6 * seasonal + jitter * 1.2) * 10) / 10,
      southWest: Math.round((base * 0.7 * seasonal + jitter * 0.8) * 10) / 10,
    };
  });
}

// Top 10 states by case burden
export function getTop10States() {
  return nigeriaStates
    .map((s) => ({
      name: s.name,
      cases: Math.round(s.population * getStateBurden(s) * 0.058),
    }))
    .sort((a, b) => b.cases - a.cases)
    .slice(0, 10);
}

// Activity feed items (aligned with WMR 2025 context)
export function generateActivityFeed() {
  const states = ["Kano", "Sokoto", "Katsina", "Zamfara", "Jigawa", "Kaduna", "Borno", "Bauchi", "Lagos", "Oyo"];
  const items = [
    { type: "auth" as const, template: (s: string) => `Product authenticated: Coartem 80/480mg, ${s} State` },
    { type: "rdt" as const, template: (s: string) => `RDT interpreted: Positive (Pf), ${s} LGA — pfhrp2 intact` },
    { type: "survey" as const, template: (s: string) => `Survey completed: ${s}, Female, Age ${20 + Math.floor(Math.random() * 20)}, Pregnant` },
    { type: "transfer" as const, template: (s: string) => `Conditional transfer: ₦850 sent to patient, ${s}` },
    { type: "auth" as const, template: (s: string) => `ACT batch verified: Artemether-Lumefantrine, ${s} — WHO MFT-aligned` },
  ];
  return Array.from({ length: 20 }, (_, i) => {
    const item = items[i % items.length];
    const state = states[i % states.length];
    return {
      id: i,
      type: item.type,
      text: item.template(state),
      time: `${(i + 1) * 3} min ago`,
    };
  });
}
