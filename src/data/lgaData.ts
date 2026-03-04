import type { NigeriaState } from "./nigeriaData";

export interface LGA {
  name: string;
  stateCode: string;
  population: number;
  prevalence: number;
  itnCoverage: number;
  actCoverage: number;
  smcCoverage: number;
  testPositivityRate: number;
  phcCount: number;
  chwCount: number;
}

// Seeded PRNG for deterministic LGA data per state
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashCode(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// Realistic LGA names by state (subset; rest are generated)
const lgaNames: Record<string, string[]> = {
  KN: ["Kano Municipal", "Fagge", "Dala", "Gwale", "Nassarawa (KN)", "Tarauni", "Ungogo", "Kumbotso", "Gezawa", "Gabasawa", "Minjibir", "Dambatta", "Bunkure", "Dawakin Tofa", "Dawakin Kudu", "Gwarzo", "Karaye", "Rogo", "Kiru", "Bebeji", "Doguwa", "Tudun Wada", "Sumaila", "Garko", "Wudil", "Warawa", "Madobi", "Tofa", "Rimingado", "Kibiya", "Rano", "Bichi", "Bagwai", "Shanono", "Kunchi", "Tsanyawa", "Garun Malam", "Gaya", "Ajingi", "Albasu", "Takai", "Makoda", "Kabo", "Kura"],
  LA: ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"],
  SO: ["Sokoto North", "Sokoto South", "Wamakko", "Bodinga", "Dange-Shuni", "Kebbe", "Tambuwal", "Yabo", "Shagari", "Silame", "Binji", "Tangaza", "Goronyo", "Gada", "Sabon Birni", "Illela", "Gwadabawa", "Kware", "Rabah", "Wurno", "Tureta", "Isa", "Gudu"],
  KT: ["Katsina", "Daura", "Dutsin-Ma", "Funtua", "Malumfashi", "Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", "Charanchi", "Dan Musa", "Dandume", "Danja", "Faskari", "Ingawa", "Jibia", "Kafur", "Kaita", "Kankara", "Kankia", "Kurfi", "Kusada", "Mai'Adua", "Mani", "Mashi", "Matazu", "Musawa", "Rimi", "Sabuwa", "Safana", "Sandamu", "Zango"],
  OY: ["Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Akinyele", "Egbeda", "Lagelu", "Oluyole", "Ona-Ara", "Ido", "Ibarapa Central", "Ibarapa East", "Ibarapa North", "Oyo East", "Oyo West", "Atisbo", "Saki West", "Saki East", "Iwajowa", "Kajola", "Iseyin", "Itesiwaju", "Ogbomosho North", "Ogbomosho South", "Orire", "Surulere (OY)", "Ogo-Oluwa", "Afijio", "Olorunsogo", "Oorelope", "Oriire", "Atiba"],
  RI: ["Port Harcourt", "Obio-Akpor", "Eleme", "Oyigbo", "Tai", "Gokana", "Khana", "Opobo-Nkoro", "Andoni", "Bonny", "Degema", "Asari-Toru", "Akuku-Toru", "Abua-Odual", "Ahoada East", "Ahoada West", "Ogba-Egbema-Ndoni", "Emohua", "Ikwerre", "Etche", "Omuma", "Ogu-Bolo", "Okrika"],
  BO: ["Maiduguri", "Jere", "Konduga", "Bama", "Gwoza", "Dikwa", "Ngala", "Kala-Balge", "Monguno", "Kukawa", "Abadam", "Mobbar", "Guzamala", "Gubio", "Magumeri", "Nganzai", "Mafa", "Kaga", "Bayo", "Biu", "Hawul", "Kwaya Kusar", "Shani", "Chibok", "Damboa", "Askira-Uba", "Damaturur"],
  FC: ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"],
  BA: ["Bauchi", "Alkaleri", "Bogoro", "Dass", "Darazo", "Gamawa", "Ganjuwa", "Giade", "Itas-Gadau", "Jama'are", "Katagum", "Kirfi", "Misau", "Ningi", "Shira", "Tafawa Balewa", "Toro", "Warji", "Zaki", "Dambam"],
  AD: ["Yola North", "Yola South", "Girei", "Fufore", "Song", "Gombi", "Hong", "Mubi North", "Mubi South", "Michika", "Madagali", "Maiha", "Shelleng", "Guyuk", "Lamurde", "Numan", "Demsa", "Jada", "Ganye", "Toungo", "Mayo-Belwa"],
};

function generateLGAName(stateCode: string, index: number, rng: () => number): string {
  const prefixes = ["North", "South", "East", "West", "Central", "Upper", "Lower"];
  const roots = ["Agu", "Oke", "Aba", "Ede", "Ise", "Ila", "Obi", "Udi", "Aro", "Ika", "Owo", "Asa", "Ifo", "Ado", "Eti", "Ojo", "Emu", "Ika"];
  const suffixes = ["wa", "ri", "na", "de", "le", "mo", "ko", "ta", "ga", "ji", "shi", "ki"];
  const usePrefix = rng() > 0.7;
  const root = roots[Math.floor(rng() * roots.length)] + suffixes[Math.floor(rng() * suffixes.length)];
  return usePrefix ? `${prefixes[Math.floor(rng() * prefixes.length)]} ${root}` : root;
}

export function generateLGAData(state: NigeriaState): LGA[] {
  const seed = hashCode(state.code);
  const rng = seededRandom(seed);
  const known = lgaNames[state.code] || [];
  const count = state.lgaCount;

  const names: string[] = [];
  for (let i = 0; i < count; i++) {
    names.push(i < known.length ? known[i] : generateLGAName(state.code, i, rng));
  }

  // Distribute population across LGAs
  const rawWeights = names.map(() => 0.5 + rng() * 1.5);
  const totalW = rawWeights.reduce((a, b) => a + b, 0);

  const isSmcEligible = ["moderate_a", "moderate_b", "low_a"].includes(state.transmissionBand);
  const basePrevalence = state.prevalence2025;

  return names.map((name, i) => {
    const popShare = rawWeights[i] / totalW;
    const population = Math.round(state.population * popShare);
    // LGA prevalence varies ±40% around state average
    const prevVariation = 0.6 + rng() * 0.8;
    const prevalence = Math.round(basePrevalence * prevVariation * 10) / 10;
    const itnCoverage = Math.round(40 + rng() * 45);
    const actCoverage = Math.round(35 + rng() * 45);
    const smcCoverage = isSmcEligible ? Math.round(20 + rng() * 60) : 0;
    const testPositivityRate = Math.round(Math.min(90, prevalence * 2.5 + rng() * 15));
    const phcCount = Math.max(1, Math.round(population / 20000 * (0.6 + rng() * 0.8)));
    const chwCount = Math.max(2, Math.round(population / 5000 * (0.5 + rng() * 1.0)));

    return { name, stateCode: state.code, population, prevalence, itnCoverage, actCoverage, smcCoverage, testPositivityRate, phcCount, chwCount };
  });
}
