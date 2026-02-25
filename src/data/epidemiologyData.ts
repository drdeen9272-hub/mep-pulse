import { nigeriaStates, getStateBurden, type NigeriaState } from "./nigeriaData";

// Seasonality data: 12 months x states, higher in rainy season (Jun-Oct) and higher in northern zones
export function generateSeasonalityHeatmap() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return nigeriaStates.map((state) => {
    const burden = getStateBurden(state);
    return {
      state: state.name,
      zone: state.zone,
      months: months.map((m, i) => {
        const seasonal = (i >= 5 && i <= 9) ? 1.4 : (i >= 4 && i <= 10) ? 1.1 : 0.7;
        const base = burden * 50 * seasonal;
        const jitter = Math.sin(i * 2.1 + state.name.length) * 8;
        return { month: m, value: Math.max(5, Math.round(base + jitter)) };
      }),
    };
  });
}

// Weekly epidemic curve data (52 weeks)
export function generateEpidemicCurve() {
  return Array.from({ length: 52 }, (_, i) => {
    const weekMonth = Math.floor(i / 4.33);
    const seasonal = (weekMonth >= 5 && weekMonth <= 9) ? 1.4 : 0.75;
    const base = 24000 * seasonal;
    const jitter = Math.sin(i * 0.8) * 3000 + Math.cos(i * 1.3) * 2000;
    const cases = Math.round(base + jitter);
    const threshold = Math.round(28000 * seasonal * 1.15);
    return { week: `W${i + 1}`, cases, threshold };
  });
}

// Mortality by state (top 15)
export function generateMortalityData() {
  return nigeriaStates
    .map((s) => {
      const burden = getStateBurden(s);
      const total = Math.round(s.population * burden * 0.00012);
      return {
        state: s.name,
        under5: Math.round(total * 0.55),
        over5: Math.round(total * 0.45),
      };
    })
    .sort((a, b) => (b.under5 + b.over5) - (a.under5 + a.over5))
    .slice(0, 15);
}

// LGA-level table data
export function generateLGATableData() {
  const rows: Array<{
    state: string; lga: string; population: number; cases: number;
    incidence: number; tpr: number; deaths: number;
  }> = [];

  nigeriaStates.forEach((s) => {
    const burden = getStateBurden(s);
    const lgaCount = Math.min(s.lgaCount, 5); // show 5 per state for demo
    for (let i = 0; i < lgaCount; i++) {
      const pop = Math.round(s.population / s.lgaCount * (0.7 + Math.random() * 0.6));
      const cases = Math.round(pop * burden * 0.058 * (0.8 + Math.random() * 0.4));
      rows.push({
        state: s.name,
        lga: `${s.name} LGA ${i + 1}`,
        population: pop,
        cases,
        incidence: Math.round(cases / pop * 1000 * 10) / 10,
        tpr: Math.round(42.7 * burden * (0.85 + Math.random() * 0.3) * 10) / 10,
        deaths: Math.round(cases * 0.002 * (0.5 + Math.random())),
      });
    }
  });

  return rows.sort((a, b) => b.cases - a.cases);
}

// MIS comparison data
export function getMISComparison() {
  return [
    { indicator: "ITN Use (slept under net last night)", national2021: "52.0%", sproxil2024: "55.8%" },
    { indicator: "Fever treatment-seeking within 24h", national2021: "42.1%", sproxil2024: "58.4%" },
    { indicator: "RDT testing rate (febrile children <5)", national2021: "34.7%", sproxil2024: "61.2%" },
    { indicator: "ACT treatment for confirmed cases", national2021: "58.9%", sproxil2024: "67.3%" },
    { indicator: "IPTp3+ coverage", national2021: "32.1%", sproxil2024: "38.4%" },
  ];
}

// Entomology data
export function getITNCoverage() {
  return nigeriaStates.map((s) => {
    const zoneBase: Record<string, number> = {
      "North-West": 72, "North-East": 65, "North-Central": 58,
      "South-West": 50, "South-South": 45, "South-East": 35,
    };
    const base = zoneBase[s.zone] || 55;
    return {
      state: s.name,
      zone: s.zone,
      coverage: Math.round((base + (Math.sin(s.name.length) * 8)) * 10) / 10,
    };
  }).sort((a, b) => b.coverage - a.coverage);
}

export function getIRSData() {
  return [
    { state: "Sokoto", coverage: 78 },
    { state: "Zamfara", coverage: 65 },
    { state: "Katsina", coverage: 72 },
    { state: "Kebbi", coverage: 58 },
    { state: "Jigawa", coverage: 45 },
    { state: "Borno", coverage: 52 },
    { state: "Yobe", coverage: 38 },
    { state: "Bauchi", coverage: 42 },
  ];
}

export function getVectorSpecies() {
  return [
    { name: "An. gambiae s.s.", value: 45, color: "hsl(211 53% 23%)" },
    { name: "An. arabiensis", value: 30, color: "hsl(174 100% 33%)" },
    { name: "An. funestus", value: 20, color: "hsl(30 93% 54%)" },
    { name: "Other", value: 5, color: "hsl(var(--muted-foreground))" },
  ];
}

export function getNetDistributionTrend() {
  return [
    { year: "2020", distributed: 18_200_000, target: 25_000_000 },
    { year: "2021", distributed: 22_500_000, target: 25_000_000 },
    { year: "2022", distributed: 27_800_000, target: 30_000_000 },
    { year: "2023", distributed: 31_200_000, target: 35_000_000 },
    { year: "2024", distributed: 34_500_000, target: 38_000_000 },
  ];
}

export function getResistanceData() {
  return nigeriaStates.map((s) => {
    const zoneRisk: Record<string, string> = {
      "North-West": "confirmed", "North-East": "confirmed",
      "North-Central": "possible", "South-West": "possible",
      "South-South": "susceptible", "South-East": "susceptible",
    };
    return { state: s.name, code: s.code, status: zoneRisk[s.zone] || "susceptible" };
  });
}
