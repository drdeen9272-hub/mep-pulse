import { nigeriaStates, getStateBurden } from "./nigeriaData";

const firstNames = ["Amina","Ibrahim","Fatima","Usman","Aisha","Yusuf","Hauwa","Bello","Maryam","Sani","Zainab","Aliyu","Blessing","Chidi","Ngozi","Emeka","Oluwaseun","Adebayo"];
const lastInitials = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const treatments = ["Coartem (AL)", "Lonart DS", "Artesunate Inj.", "Amatem Forte", "P-Alaxin", "SP (Fansidar)", "None"];
const outcomes = ["Recovered", "Recovered", "Recovered", "Recovered", "Under treatment", "Referred", "Deceased"];

export function generateCaseRecords(count = 200) {
  const records = [];
  for (let i = 0; i < count; i++) {
    const state = nigeriaStates[Math.floor(Math.random() * nigeriaStates.length)];
    const age = Math.floor(Math.random() * 65) + 1;
    const isMicroscopy = Math.random() < 0.2;
    const isPositive = Math.random() < 0.43;
    const day = Math.floor(Math.random() * 28) + 1;
    const month = Math.floor(Math.random() * 12);
    records.push({
      id: `CS-2024-${String(i + 1).padStart(5, "0")}`,
      date: new Date(2024, month, day).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      state: state.name,
      lga: `${state.name} LGA ${Math.floor(Math.random() * state.lgaCount) + 1}`,
      age,
      sex: Math.random() > 0.48 ? "Female" : "Male",
      species: isPositive ? (Math.random() > 0.05 ? "P. falciparum" : "P. vivax") : "—",
      method: isMicroscopy ? "Microscopy" : "RDT",
      treatment: isPositive ? treatments[Math.floor(Math.random() * (treatments.length - 1))] : "None",
      authenticated: isPositive && Math.random() > 0.35 ? "Yes" : "No",
      outcome: isPositive ? outcomes[Math.floor(Math.random() * (outcomes.length - 1))] : "—",
    });
  }
  return records;
}

export function generateFacilityReports() {
  const facilities = [];
  nigeriaStates.slice(0, 15).forEach((s) => {
    for (let i = 0; i < 3; i++) {
      const completeness = Math.round((60 + Math.random() * 38) * 10) / 10;
      facilities.push({
        facility: `${s.name} PHC ${i + 1}`,
        state: s.name,
        lga: `${s.name} LGA ${i + 1}`,
        reportsExpected: 12,
        reportsReceived: Math.round(12 * completeness / 100),
        completeness,
        timeliness: Math.round((55 + Math.random() * 40) * 10) / 10,
        errors: Math.floor(Math.random() * 5),
        lastReport: `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][Math.floor(Math.random() * 12)]} 2024`,
      });
    }
  });
  return facilities.sort((a, b) => b.completeness - a.completeness);
}

export function generateOutbreakAlerts() {
  return [
    { id: "OB-001", lga: "Sokoto South", state: "Sokoto", status: "Active", severity: "High", startDate: "12 Sep 2024", cases: 1240, threshold: 850, response: "Team deployed" },
    { id: "OB-002", lga: "Katsina North", state: "Katsina", status: "Active", severity: "High", startDate: "18 Sep 2024", cases: 980, threshold: 720, response: "Investigation ongoing" },
    { id: "OB-003", lga: "Zamfara East", state: "Zamfara", status: "Active", severity: "Medium", startDate: "25 Sep 2024", cases: 650, threshold: 580, response: "Enhanced surveillance" },
    { id: "OB-004", lga: "Jigawa Central", state: "Jigawa", status: "Resolved", severity: "High", startDate: "01 Aug 2024", cases: 1100, threshold: 780, response: "Contained" },
    { id: "OB-005", lga: "Kebbi South", state: "Kebbi", status: "Resolved", severity: "Medium", startDate: "15 Jul 2024", cases: 720, threshold: 640, response: "Contained" },
    { id: "OB-006", lga: "Borno West", state: "Borno", status: "Active", severity: "Medium", startDate: "02 Oct 2024", cases: 480, threshold: 410, response: "Monitoring" },
  ];
}

export function generateOutbreakTimeseries() {
  return Array.from({ length: 52 }, (_, i) => {
    const weekMonth = Math.floor(i / 4.33);
    const seasonal = (weekMonth >= 5 && weekMonth <= 9) ? 1.45 : 0.7;
    const base = 820 * seasonal;
    const jitter = Math.sin(i * 0.9) * 120 + Math.cos(i * 1.5) * 80;
    const cases = Math.round(base + jitter);
    const mean = Math.round(780 * seasonal);
    const threshold = Math.round(mean * 1.35);
    return { week: `W${i + 1}`, cases, mean, threshold };
  });
}

export function generatePPMVRegistry() {
  const ppvms: Array<{
    id: string; name: string; state: string; lga: string;
    tests: number; authenticated: number; surveys: number;
    enrolled: string; score: number;
  }> = [];
  let counter = 0;
  nigeriaStates.forEach((s) => {
    const count = Math.round(8000 / nigeriaStates.length * getStateBurden(s));
    for (let i = 0; i < Math.min(count, 8); i++) {
      counter++;
      const fn = firstNames[counter % firstNames.length];
      ppvms.push({
        id: `PPMV-${String(counter).padStart(5, "0")}`,
        name: `${fn}'s Pharmacy`,
        state: s.name,
        lga: `${s.name} LGA ${(i % s.lgaCount) + 1}`,
        tests: Math.round(50 + Math.random() * 400),
        authenticated: Math.round(100 + Math.random() * 800),
        surveys: Math.round(20 + Math.random() * 200),
        enrolled: `${["Jan","Mar","May","Jul","Sep","Nov"][i % 6]} ${2022 + Math.floor(i / 6)}`,
        score: Math.round((60 + Math.random() * 38) * 10) / 10,
      });
    }
  });
  return ppvms.sort((a, b) => b.score - a.score);
}

export function getPPMVStateLeaderboard() {
  return nigeriaStates
    .map((s) => ({
      state: s.name,
      ppvms: Math.round(8000 / nigeriaStates.length * getStateBurden(s) * s.lgaCount / 5),
      avgTests: Math.round(80 + Math.random() * 200),
      avgAuth: Math.round(150 + Math.random() * 400),
      avgScore: Math.round((65 + Math.random() * 30) * 10) / 10,
    }))
    .sort((a, b) => b.ppvms - a.ppvms)
    .slice(0, 15);
}

export function getPPMVEnrollmentTrend() {
  return [
    { quarter: "Q1 2022", cumulative: 1200 },
    { quarter: "Q2 2022", cumulative: 2100 },
    { quarter: "Q3 2022", cumulative: 3000 },
    { quarter: "Q4 2022", cumulative: 3800 },
    { quarter: "Q1 2023", cumulative: 4500 },
    { quarter: "Q2 2023", cumulative: 5200 },
    { quarter: "Q3 2023", cumulative: 6100 },
    { quarter: "Q4 2023", cumulative: 6900 },
    { quarter: "Q1 2024", cumulative: 7400 },
    { quarter: "Q2 2024", cumulative: 7800 },
    { quarter: "Q3 2024", cumulative: 8100 },
    { quarter: "Q4 2024", cumulative: 8247 },
  ];
}
