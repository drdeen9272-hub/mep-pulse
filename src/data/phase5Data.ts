// Demo data for Diagnostics, Commodities, and Chemoprevention dashboards

// === DIAGNOSTICS ===

export function getRDTvsMicroscopyTrend() {
  const months: string[] = [];
  for (let i = 23; i >= 0; i--) {
    const d = new Date(2024, 11 - i);
    months.push(d.toLocaleDateString("en", { year: "2-digit", month: "short" }));
  }
  return months.map((month, i) => ({
    month,
    rdt: Math.round(850000 + Math.sin(i * 0.5) * 120000 + i * 8000),
    microscopy: Math.round(210000 + Math.cos(i * 0.7) * 30000 + i * 2000),
  }));
}

export function getTreatmentCascade() {
  return [
    { stage: "Fever Cases", value: 18_400_000, pct: 100 },
    { stage: "Tested", value: 12_800_000, pct: 69.6 },
    { stage: "Confirmed Positive", value: 5_460_000, pct: 29.7 },
    { stage: "Treated with ACT", value: 4_370_000, pct: 23.7 },
    { stage: "Verified Drug", value: 2_940_000, pct: 16.0 },
    { stage: "Completed Follow-up", value: 1_820_000, pct: 9.9 },
  ];
}

export function getACTBrands() {
  return [
    { brand: "Coartem", volume: 4_250_000 },
    { brand: "Lonart", volume: 3_180_000 },
    { brand: "Amatem", volume: 2_740_000 },
    { brand: "P-Alaxin", volume: 2_120_000 },
    { brand: "Lumartem", volume: 1_850_000 },
    { brand: "Combisunate", volume: 1_420_000 },
    { brand: "Artesunate", volume: 980_000 },
    { brand: "Other ACTs", volume: 1_650_000 },
  ];
}

export function getAIConfusionMatrix() {
  return {
    labels: ["Positive", "Negative", "Invalid"],
    matrix: [
      [9420, 180, 45],   // AI says Positive
      [210, 11350, 80],  // AI says Negative
      [30, 60, 966],     // AI says Invalid
    ],
  };
}

// === COMMODITIES ===

export function getStockStatus() {
  return [
    { commodity: "ACTs", inStock: 84.7, belowMin: 10.2, stockedOut: 5.1 },
    { commodity: "RDTs", inStock: 78.2, belowMin: 14.5, stockedOut: 7.3 },
    { commodity: "LLINs", inStock: 72.1, belowMin: 18.3, stockedOut: 9.6 },
    { commodity: "SP (IPTp)", inStock: 68.5, belowMin: 20.1, stockedOut: 11.4 },
  ];
}

export function getAuthenticationTreemap() {
  return [
    { brand: "Novartis", product: "Coartem", volume: 42_500 },
    { brand: "Novartis", product: "Riamet", volume: 12_300 },
    { brand: "Cipla", product: "Lonart", volume: 31_800 },
    { brand: "Bliss GVS", product: "Amatem", volume: 27_400 },
    { brand: "Emzor", product: "P-Alaxin", volume: 21_200 },
    { brand: "Dafra Pharma", product: "Lumartem", volume: 18_500 },
    { brand: "Sanofi", product: "Artesunate", volume: 14_200 },
    { brand: "Roche", product: "Fansidar", volume: 9_800 },
    { brand: "GSK", product: "Malarone", volume: 7_600 },
    { brand: "Merck", product: "Quinine", volume: 5_400 },
  ];
}

export function getCounterfeitTimeline() {
  return [
    { month: "Jan 24", flagged: 23, resolved: 21, product: "Coartem", location: "Kano" },
    { month: "Feb 24", flagged: 18, resolved: 17, product: "Lonart", location: "Lagos" },
    { month: "Mar 24", flagged: 31, resolved: 28, product: "Amatem", location: "Sokoto" },
    { month: "Apr 24", flagged: 15, resolved: 14, product: "P-Alaxin", location: "Kaduna" },
    { month: "May 24", flagged: 27, resolved: 24, product: "Coartem", location: "Katsina" },
    { month: "Jun 24", flagged: 42, resolved: 38, product: "Lonart", location: "Oyo" },
    { month: "Jul 24", flagged: 35, resolved: 31, product: "Artesunate", location: "Borno" },
    { month: "Aug 24", flagged: 29, resolved: 26, product: "Amatem", location: "Rivers" },
    { month: "Sep 24", flagged: 38, resolved: 35, product: "Coartem", location: "Zamfara" },
    { month: "Oct 24", flagged: 22, resolved: 20, product: "Lumartem", location: "Bauchi" },
    { month: "Nov 24", flagged: 19, resolved: 18, product: "P-Alaxin", location: "Delta" },
    { month: "Dec 24", flagged: 25, resolved: 22, product: "Lonart", location: "Jigawa" },
  ];
}

export function getExpiryTracking() {
  return [
    { product: "Coartem 80/480mg", batch: "NV2024-089", qty: 12400, expiry: "2025-03-15", warehouse: "Kano Zonal" },
    { product: "Lonart DS", batch: "CP2024-145", qty: 8700, expiry: "2025-02-28", warehouse: "Lagos Central" },
    { product: "RDT CareStart", batch: "CS2024-312", qty: 45000, expiry: "2025-04-10", warehouse: "Abuja National" },
    { product: "SP Fansidar", batch: "RO2024-067", qty: 6200, expiry: "2025-03-22", warehouse: "Sokoto Zonal" },
    { product: "Artesunate Inj.", batch: "GV2024-201", qty: 3100, expiry: "2025-02-18", warehouse: "Maiduguri Zonal" },
    { product: "Amatem Forte", batch: "BG2024-098", qty: 9800, expiry: "2025-04-05", warehouse: "Kaduna State" },
  ];
}

// === CHEMOPREVENTION ===

export function getIPTpCoverage() {
  const states = ["Kano", "Katsina", "Sokoto", "Zamfara", "Kaduna", "Lagos", "Oyo", "Rivers", "Borno", "Bauchi", "Enugu", "Anambra", "Edo", "Kwara", "Niger"];
  return states.map((state) => {
    const base = 25 + Math.random() * 30;
    return {
      state,
      iptp1: Math.round(base + 35),
      iptp2: Math.round(base + 15),
      iptp3: Math.round(base),
    };
  });
}

export function getSMCCoverage() {
  return [
    { state: "Sokoto", cycle1: 92, cycle2: 88, cycle3: 84, cycle4: 78 },
    { state: "Zamfara", cycle1: 89, cycle2: 85, cycle3: 81, cycle4: 74 },
    { state: "Katsina", cycle1: 91, cycle2: 87, cycle3: 82, cycle4: 76 },
    { state: "Kebbi", cycle1: 86, cycle2: 82, cycle3: 78, cycle4: 71 },
    { state: "Jigawa", cycle1: 88, cycle2: 84, cycle3: 79, cycle4: 72 },
    { state: "Yobe", cycle1: 82, cycle2: 78, cycle3: 73, cycle4: 67 },
    { state: "Borno", cycle1: 75, cycle2: 70, cycle3: 65, cycle4: 58 },
  ];
}

export function getPMCCoverage() {
  return [
    { state: "Kano", coverage: 42 },
    { state: "Katsina", coverage: 38 },
    { state: "Sokoto", coverage: 35 },
    { state: "Zamfara", coverage: 31 },
    { state: "Kaduna", coverage: 44 },
    { state: "Bauchi", coverage: 28 },
    { state: "Lagos", coverage: 52 },
    { state: "Oyo", coverage: 47 },
  ];
}

export function getMDAPilotData() {
  return [
    { area: "Birnin Kebbi LGA", preIncidence: 420, postIncidence: 185, reduction: 56 },
    { area: "Sokoto South LGA", preIncidence: 385, postIncidence: 162, reduction: 58 },
    { area: "Katsina Central LGA", preIncidence: 398, postIncidence: 201, reduction: 49 },
    { area: "Zamfara West LGA", preIncidence: 445, postIncidence: 178, reduction: 60 },
  ];
}
