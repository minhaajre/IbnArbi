import { Search, Sun, Moon, Circle, Eclipse, Star, Cloud, CloudRain, Zap, Snowflake, Wind } from "lucide-react";

// Lahiri Ayanamsha Constants
export const AYANAMSHA_J2000 = 23.85; // Degrees
export const PRECESSION_RATE = 0.01397; // Degrees per year

export const IBN_ARABI_MANSIONS = [
  {
    number: 1,
    name: "Al-Sharatain",
    arabic: "الشراطان",
    meaning: "The Two Signs",
    attribute: "Al-Mubdi (The Originator)",
    letter: "Hamza & Alef",
    degrees: "0° Aries",
    description: "The beginning of the cycle. Represents the First Intellect and the Universal Pen."
  },
  {
    number: 2,
    name: "Al-Butain",
    arabic: "البطين",
    meaning: "The Belly",
    attribute: "Al-Ba'ith (The Resurrector)",
    letter: "Hâ'",
    degrees: "12°51' Aries",
    description: "Associated with the Universal Soul and the Preserved Tablet."
  },
  {
    number: 3,
    name: "Al-Thurayya",
    arabic: "الثريا",
    meaning: "The Pleiades",
    attribute: "Al-Batin (The Hidden)",
    letter: "Ain",
    degrees: "25°42' Aries",
    description: "The Many Little Ones. Represents the multiplicity emerging from unity."
  },
  {
    number: 4,
    name: "Al-Dabaran",
    arabic: "الدبران",
    meaning: "The Follower",
    attribute: "Al-Akhir (The Last)",
    letter: "Haa",
    degrees: "8°34' Taurus",
    description: "Follows the Pleiades. Represents the raw material of the universe."
  },
  {
    number: 5,
    name: "Al-Haq'ah",
    arabic: "الهقعة",
    meaning: "The White Spot",
    attribute: "Al-Zahir (The Manifest)",
    letter: "Ghain",
    degrees: "21°25' Taurus",
    description: "The mark on the horse. Represents the highest sphere."
  },
  {
    number: 6,
    name: "Al-Han'ah",
    arabic: "الهنعة",
    meaning: "The Brand",
    attribute: "Al-Hakim (The Wise)",
    letter: "Kha",
    degrees: "4°17' Gemini",
    description: "The mark on the camel. Represents the patterns of destiny."
  },
  {
    number: 7,
    name: "Al-Dhira",
    arabic: "الذراع",
    meaning: "The Forearm",
    attribute: "Al-Muhit (The All-Encompassing)",
    letter: "Qaf",
    degrees: "17°08' Gemini",
    description: "The Throne of God in Ibn Arabi's cosmology."
  },
  {
    number: 8,
    name: "Al-Nathrah",
    arabic: "النثرة",
    meaning: "The Gap",
    attribute: "Al-Shakur (The Grateful)",
    letter: "Kaf",
    degrees: "0° Cancer",
    description: "The mist or gap. Represents the pedestal of the universe."
  },
  {
    number: 9,
    name: "Al-Tarf",
    arabic: "الطرف",
    meaning: "The Glance",
    attribute: "Al-Ghani (The Independent)",
    letter: "Jeem",
    degrees: "12°51' Cancer",
    description: "The eye of the lion. Represents the Starless Sky."
  },
  {
    number: 10,
    name: "Al-Jabhah",
    arabic: "الجبهة",
    meaning: "The Forehead",
    attribute: "Al-Muqtadir (The Powerful)",
    letter: "Sheen",
    degrees: "25°42' Cancer",
    description: "The forehead of the lion. Represents the Sphere of Stations."
  },
  {
    number: 11,
    name: "Al-Zubrah",
    arabic: "الزبرة",
    meaning: "The Mane",
    attribute: "Al-Alim (The All-Knowing)",
    letter: "Ya",
    degrees: "8°34' Leo",
    description: "The mane of the lion. Associated with divine knowledge."
  },
  {
    number: 12,
    name: "Al-Sarfah",
    arabic: "الصرفة",
    meaning: "The Turner",
    attribute: "Al-Qahhar (The Subduer)",
    letter: "Dad",
    degrees: "21°25' Leo",
    description: "The weather changer. Represents divine will."
  },
  {
    number: 13,
    name: "Al-Awwa",
    arabic: "العواء",
    meaning: "The Barker",
    attribute: "Al-Musawwir (The Shaper)",
    letter: "Lam",
    degrees: "4°17' Virgo",
    description: "The barking dog. Represents life and vitality."
  },
  {
    number: 14,
    name: "Al-Simak",
    arabic: "السماك",
    meaning: "The Uplifted",
    attribute: "Al-Khaliq (The Creator)",
    letter: "Nun",
    degrees: "17°08' Virgo",
    description: "The unarmed one. Represents divine speech."
  },
  {
    number: 15,
    name: "Al-Ghafr",
    arabic: "الغفر",
    meaning: "The Covering",
    attribute: "Al-Bari (The Maker)",
    letter: "Ra",
    degrees: "0° Libra",
    description: "The veil or covering. Represents divine hearing."
  },
  {
    number: 16,
    name: "Al-Zubana",
    arabic: "الزبانى",
    meaning: "The Claws",
    attribute: "Al-Musawwir (The Fashioner)",
    letter: "Ta",
    degrees: "12°51' Libra",
    description: "The scorpion's claws. Represents divine sight."
  },
  {
    number: 17,
    name: "Al-Iklil",
    arabic: "الإكليل",
    meaning: "The Crown",
    attribute: "Al-Ghaffar (The Forgiver)",
    letter: "Dal",
    degrees: "25°42' Libra",
    description: "The crown of the scorpion. Associated with the Moon sphere."
  },
  {
    number: 18,
    name: "Al-Qalb",
    arabic: "القلب",
    meaning: "The Heart",
    attribute: "Al-Qabid (The Constrictor)",
    letter: "Ta (emphatic)",
    degrees: "8°34' Scorpio",
    description: "The heart of the scorpion. Represents the Sphere of Ether."
  },
  {
    number: 19,
    name: "Al-Shaulah",
    arabic: "الشولة",
    meaning: "The Sting",
    attribute: "Al-Basit (The Expander)",
    letter: "Zay",
    degrees: "21°25' Scorpio",
    description: "The scorpion's sting. Represents expansion and release."
  },
  {
    number: 20,
    name: "Al-Na'am",
    arabic: "النعائم",
    meaning: "The Ostriches",
    attribute: "Al-Muhyi (The Giver of Life)",
    letter: "Sin",
    degrees: "4°17' Sagittarius",
    description: "The ostriches going to water. Represents the element of Water."
  },
  {
    number: 21,
    name: "Al-Baldah",
    arabic: "البلدة",
    meaning: "The City",
    attribute: "Al-Mumit (The Taker of Life)",
    letter: "Sad",
    degrees: "17°08' Sagittarius",
    description: "The empty city. Represents endings and the element of Earth."
  },
  {
    number: 22,
    name: "Sa'd al-Dhabih",
    arabic: "سعد الذابح",
    meaning: "Fortune of the Slayer",
    attribute: "Al-Hayy (The Ever-Living)",
    letter: "Za (emphatic)",
    degrees: "0° Capricorn",
    description: "The lucky one of the slaughterers. Represents sustenance."
  },
  {
    number: 23,
    name: "Sa'd Bula",
    arabic: "سعد بلع",
    meaning: "Fortune of the Glutton",
    attribute: "Al-Qayyum (The Self-Subsisting)",
    letter: "Thal",
    degrees: "12°51' Capricorn",
    description: "The lucky swallower. Represents calculation and accounting."
  },
  {
    number: 24,
    name: "Sa'd al-Su'ud",
    arabic: "سعد السعود",
    meaning: "Fortune of Fortunes",
    attribute: "Al-Wajid (The Finder)",
    letter: "Tha",
    degrees: "25°42' Capricorn",
    description: "The luckiest of the lucky. Represents restoration."
  },
  {
    number: 25,
    name: "Sa'd al-Akhbiyah",
    arabic: "سعد الأخبية",
    meaning: "Fortune of Tents",
    attribute: "Al-Majid (The Glorious)",
    letter: "Fa",
    degrees: "8°34' Aquarius",
    description: "The lucky stars of the tents. Hidden things revealed."
  },
  {
    number: 26,
    name: "Al-Fargh al-Muqaddam",
    arabic: "الفرغ المقدم",
    meaning: "The Fore Spout",
    attribute: "Al-Wahid (The One)",
    letter: "Ba",
    degrees: "21°25' Aquarius",
    description: "The front mouth of the bucket. Represents gathering together."
  },
  {
    number: 27,
    name: "Al-Fargh al-Mu'akhkhar",
    arabic: "الفرغ المؤخر",
    meaning: "The Rear Spout",
    attribute: "Al-Samad (The Eternal)",
    letter: "Mim",
    degrees: "4°17' Pisces",
    description: "The rear mouth of the bucket. Represents uniqueness."
  },
  {
    number: 28,
    name: "Batn al-Hut",
    arabic: "بطن الحوت",
    meaning: "Belly of the Fish",
    attribute: "Al-Qadir (The Capable)",
    letter: "Waw",
    degrees: "17°08' Pisces",
    description: "The belly of the fish. Completion and finding."
  }
];

export const PLANETARY_RULERS_ORDER = [
  "Saturn", "Jupiter", "Mars", "Sun", "Venus", "Mercury", "Moon"
];

export const DAY_RULERS = {
  0: "Sun",    // Sunday
  1: "Moon",   // Monday
  2: "Mars",   // Tuesday
  3: "Mercury",// Wednesday
  4: "Jupiter",// Thursday
  5: "Venus",  // Friday
  6: "Saturn"  // Saturday
};

// Ibn Arabi's Planet-Prophet Associations (Fusus al-Hikam)
// With Arabic script as requested
export const PLANET_PROPHETS: Record<string, { name: string; arabic: string }> = {
  Saturn: { name: "Abraham (Ibrahim)", arabic: "إبراهيم" },
  Jupiter: { name: "Moses (Musa)", arabic: "موسى" },
  Mars: { name: "Aaron (Harun)", arabic: "هارون" },
  Sun: { name: "Idris (Enoch)", arabic: "إدريس" },
  Venus: { name: "Joseph (Yusuf)", arabic: "يوسف" },
  Mercury: { name: "Jesus (Isa)", arabic: "عيسى" },
  Moon: { name: "Adam", arabic: "آدم" }
};

export const PLANET_STATUS_RULES = {
  Sun: { 
    rulership: ["Leo"], 
    detriment: ["Aquarius"],
    exaltation: "Aries", 
    fall: "Libra", 
    exaltationDegree: 10, 
    fallDegree: 10 
  },
  Moon: { 
    rulership: ["Cancer"], 
    detriment: ["Capricorn"],
    exaltation: "Taurus", 
    fall: "Scorpio", 
    exaltationDegree: 3, 
    fallDegree: 3 
  },
  Mars: { 
    rulership: ["Aries", "Scorpio"], 
    detriment: ["Libra", "Taurus"],
    exaltation: "Capricorn", 
    fall: "Cancer", 
    exaltationDegree: 28, 
    fallDegree: 28 
  },
  Mercury: { 
    rulership: ["Gemini", "Virgo"], 
    detriment: ["Sagittarius", "Pisces"],
    exaltation: "Virgo", 
    fall: "Pisces", 
    exaltationDegree: 15, 
    fallDegree: 15 
  },
  Jupiter: { 
    rulership: ["Sagittarius", "Pisces"], 
    detriment: ["Gemini", "Virgo"],
    exaltation: "Cancer", 
    fall: "Capricorn", 
    exaltationDegree: 5, 
    fallDegree: 5 
  },
  Venus: { 
    rulership: ["Taurus", "Libra"], 
    detriment: ["Scorpio", "Aries"],
    exaltation: "Pisces", 
    fall: "Virgo", 
    exaltationDegree: 27, 
    fallDegree: 27 
  },
  Saturn: { 
    rulership: ["Capricorn", "Aquarius"], 
    detriment: ["Cancer", "Leo"],
    exaltation: "Libra", 
    fall: "Aries", 
    exaltationDegree: 20, 
    fallDegree: 20 
  }
};

export const SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export const SIGN_DATA: Record<string, {
  symbol: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  modality: "Cardinal" | "Fixed" | "Mutable";
  polarity: "Masculine" | "Feminine";
  season: string;
  ruler: string;
  dates: string;
  arabic: string;
  arabicName: string;
}> = {
  Aries: { symbol: "♈", element: "Fire", modality: "Cardinal", polarity: "Masculine", season: "Spring", ruler: "Mars", dates: "Mar 21 - Apr 19", arabic: "الحمل", arabicName: "Al-Hamal" },
  Taurus: { symbol: "♉", element: "Earth", modality: "Fixed", polarity: "Feminine", season: "Spring", ruler: "Venus", dates: "Apr 20 - May 20", arabic: "الثور", arabicName: "Al-Thawr" },
  Gemini: { symbol: "♊", element: "Air", modality: "Mutable", polarity: "Masculine", season: "Spring", ruler: "Mercury", dates: "May 21 - Jun 20", arabic: "الجوزاء", arabicName: "Al-Jawza" },
  Cancer: { symbol: "♋", element: "Water", modality: "Cardinal", polarity: "Feminine", season: "Summer", ruler: "Moon", dates: "Jun 21 - Jul 22", arabic: "السرطان", arabicName: "Al-Saratan" },
  Leo: { symbol: "♌", element: "Fire", modality: "Fixed", polarity: "Masculine", season: "Summer", ruler: "Sun", dates: "Jul 23 - Aug 22", arabic: "الأسد", arabicName: "Al-Asad" },
  Virgo: { symbol: "♍", element: "Earth", modality: "Mutable", polarity: "Feminine", season: "Summer", ruler: "Mercury", dates: "Aug 23 - Sep 22", arabic: "العذراء", arabicName: "Al-Adhra" },
  Libra: { symbol: "♎", element: "Air", modality: "Cardinal", polarity: "Masculine", season: "Autumn", ruler: "Venus", dates: "Sep 23 - Oct 22", arabic: "الميزان", arabicName: "Al-Mizan" },
  Scorpio: { symbol: "♏", element: "Water", modality: "Fixed", polarity: "Feminine", season: "Autumn", ruler: "Mars", dates: "Oct 23 - Nov 21", arabic: "العقرب", arabicName: "Al-Aqrab" },
  Sagittarius: { symbol: "♐", element: "Fire", modality: "Mutable", polarity: "Masculine", season: "Autumn", ruler: "Jupiter", dates: "Nov 22 - Dec 21", arabic: "القوس", arabicName: "Al-Qaws" },
  Capricorn: { symbol: "♑", element: "Earth", modality: "Cardinal", polarity: "Feminine", season: "Winter", ruler: "Saturn", dates: "Dec 22 - Jan 19", arabic: "الجدي", arabicName: "Al-Jady" },
  Aquarius: { symbol: "♒", element: "Air", modality: "Fixed", polarity: "Masculine", season: "Winter", ruler: "Saturn", dates: "Jan 20 - Feb 18", arabic: "الدلو", arabicName: "Al-Dalw" },
  Pisces: { symbol: "♓", element: "Water", modality: "Mutable", polarity: "Feminine", season: "Winter", ruler: "Jupiter", dates: "Feb 19 - Mar 20", arabic: "الحوت", arabicName: "Al-Hut" }
};

export const ELEMENT_RULES = {
  Fire: ["Aries", "Leo", "Sagittarius"],
  Earth: ["Taurus", "Virgo", "Capricorn"],
  Air: ["Gemini", "Libra", "Aquarius"],
  Water: ["Cancer", "Scorpio", "Pisces"]
};

export const ELEMENT_ACTIVITIES: Record<string, { english: string; arabic: string }> = {
  Fire: { english: "Take action, start new projects, exercise, lead", arabic: "اتخذ إجراءً، ابدأ مشاريع جديدة، مارس الرياضة، قُد" },
  Earth: { english: "Ground yourself, handle finances, organize, garden", arabic: "ثبّت نفسك، تعامل مع المالية، نظّم، ازرع" },
  Air: { english: "Communicate, study, socialize, plan", arabic: "تواصل، ادرس، اختلط بالناس، خطط" },
  Water: { english: "Reflect, meditate, create art, connect emotionally", arabic: "تأمل، تفكّر، أبدع فنًا، تواصل عاطفيًا" }
};

export const PLANET_ARABIC: Record<string, { arabic: string; arabicName: string }> = {
  Sun: { arabic: "الشمس", arabicName: "Al-Shams" },
  Moon: { arabic: "القمر", arabicName: "Al-Qamar" },
  Mercury: { arabic: "عطارد", arabicName: "Utarid" },
  Venus: { arabic: "الزهرة", arabicName: "Al-Zuhra" },
  Mars: { arabic: "المريخ", arabicName: "Al-Mirrikh" },
  Jupiter: { arabic: "المشتري", arabicName: "Al-Mushtari" },
  Saturn: { arabic: "زحل", arabicName: "Zuhal" }
};

export const ELEMENT_ARABIC: Record<string, { arabic: string; arabicName: string }> = {
  Fire: { arabic: "نار", arabicName: "Nar" },
  Earth: { arabic: "أرض", arabicName: "Ard" },
  Air: { arabic: "هواء", arabicName: "Hawa" },
  Water: { arabic: "ماء", arabicName: "Ma" }
};

export const SEASON_ARABIC: Record<string, { arabic: string; arabicName: string }> = {
  Spring: { arabic: "الربيع", arabicName: "Al-Rabi" },
  Summer: { arabic: "الصيف", arabicName: "Al-Sayf" },
  Autumn: { arabic: "الخريف", arabicName: "Al-Kharif" },
  Winter: { arabic: "الشتاء", arabicName: "Al-Shita" }
};

export const DIGNITY_ARABIC: Record<string, { arabic: string; arabicName: string }> = {
  Exalted: { arabic: "الشرف", arabicName: "Al-Sharaf" },
  Fall: { arabic: "الهبوط", arabicName: "Al-Hubut" },
  Rulership: { arabic: "السيادة", arabicName: "Al-Siyadah" },
  Detriment: { arabic: "الوبال", arabicName: "Al-Wabal" },
  Neutral: { arabic: "محايد", arabicName: "Muhayid" }
};

export const MODALITY_ARABIC: Record<string, { arabic: string; arabicName: string }> = {
  Cardinal: { arabic: "أساسي", arabicName: "Asasi" },
  Fixed: { arabic: "ثابت", arabicName: "Thabit" },
  Mutable: { arabic: "متغير", arabicName: "Mutaghayyir" }
};

export const POLARITY_ARABIC: Record<string, { arabic: string; arabicName: string }> = {
  Masculine: { arabic: "مذكر", arabicName: "Mudhakkar" },
  Feminine: { arabic: "مؤنث", arabicName: "Mu'annath" }
};

export const UI_LABELS_ARABIC: Record<string, string> = {
  "Legend": "دليل",
  "Fire": "نار",
  "Earth": "أرض",
  "Air": "هواء",
  "Water": "ماء",
  "Spring": "الربيع",
  "Summer": "الصيف",
  "Autumn": "الخريف",
  "Winter": "الشتاء",
  "Cardinal": "أساسي",
  "Fixed": "ثابت",
  "Mutable": "متغير",
  "Masculine": "مذكر",
  "Feminine": "مؤنث",
  "Retrograde": "راجع",
  "Ruled by": "يحكمه",
  "Current Station": "المنزلة الحالية",
  "Current Hour": "الساعة الحالية",
  "Celestial Dignities": "الكرامات السماوية",
  "Elemental Balance": "توازن العناصر",
  "Current Sky Map": "خريطة السماء الحالية",
  "Sidereal": "فلكي",
  "Tropical": "مداري",
  "Day": "يوم",
  "Night": "ليل",
  "Planet": "كوكب",
  "Sign": "برج",
  "Degree": "درجة",
  "Status": "حالة",
  "Next": "التالي",
  "Progress": "تقدم",
  "Time until next": "الوقت حتى التالي",
  "Station Meaning": "معنى المنزلة",
  "Activities": "الأنشطة",
  "Avoid": "تجنب",
  "White Day": "يوم أبيض",
  "Blessed Fast": "صوم مبارك"
};

export const API_KEY = "e511b43a614249ea9efbcda01488f374";

export type CriticalDegreeType = 
  | "first" 
  | "anaretic" 
  | "cardinal_critical" 
  | "fixed_critical" 
  | "mutable_critical" 
  | null;

export interface CriticalDegreeInfo {
  type: CriticalDegreeType;
  label: string;
  description: string;
}

export function getCriticalDegree(degree: number, sign: string): CriticalDegreeInfo | null {
  const signData = SIGN_DATA[sign];
  if (!signData) return null;
  
  const degreeInSign = degree % 30;
  const modality = signData.modality;
  
  if (degreeInSign >= 0 && degreeInSign < 1) {
    return {
      type: "first",
      label: "0° Critical",
      description: "Fresh start, new beginnings, pure energy"
    };
  }
  
  if (degreeInSign >= 29) {
    return {
      type: "anaretic",
      label: "29° Anaretic",
      description: "Degree of fate, karmic lessons, cycle completion"
    };
  }
  
  if (modality === "Cardinal") {
    if ((degreeInSign >= 13 && degreeInSign < 14) || (degreeInSign >= 26 && degreeInSign < 27)) {
      return {
        type: "cardinal_critical",
        label: `${Math.floor(degreeInSign)}° Cardinal Critical`,
        description: "Heightened cardinal energy, pivotal turning point"
      };
    }
  }
  
  if (modality === "Fixed") {
    if ((degreeInSign >= 8 && degreeInSign < 10) || (degreeInSign >= 21 && degreeInSign < 23)) {
      return {
        type: "fixed_critical",
        label: `${Math.floor(degreeInSign)}° Fixed Critical`,
        description: "Intensified fixed energy, significant challenge"
      };
    }
  }
  
  if (modality === "Mutable") {
    if ((degreeInSign >= 4 && degreeInSign < 5) || (degreeInSign >= 17 && degreeInSign < 18)) {
      return {
        type: "mutable_critical",
        label: `${Math.floor(degreeInSign)}° Mutable Critical`,
        description: "Amplified mutable energy, key transition"
      };
    }
  }
  
  return null;
}

// Planet Profiles for Protocols
export interface PlanetProfile {
  name: string;
  arabic: string;
  keywords: string[];
  colors: string[];
  colorHex: string[];
  scents: string[];
  supportiveFoods: string[];
  avoidFoods: string[];
  fastingInstruction: string;
  serviceInstruction: string;
  behaviorFocus: string;
}

// Sufi Spiritual Work Recommendations by Element
export const SUFI_ELEMENT_PRACTICES: Record<string, { english: string; arabic: string; practice: string; arabicPractice: string }> = {
  Fire: {
    english: "Active Dhikr & Movement",
    arabic: "الذكر الحركي",
    practice: "Engage in standing dhikr, whirling meditation, or walking contemplation. Channel energy through sacred movement and vocal remembrance.",
    arabicPractice: "انخرط في الذكر القائم أو التأمل الدوار أو المشي التأملي"
  },
  Earth: {
    english: "Grounded Contemplation",
    arabic: "التأمل المتين",
    practice: "Practice sitting muraqaba (meditation), work with prayer beads (tasbih), or engage in mindful service. Ground spiritual energy through stillness.",
    arabicPractice: "مارس المراقبة الجالسة أو العمل بالتسبيح أو الخدمة الواعية"
  },
  Air: {
    english: "Breath & Recitation",
    arabic: "التنفس والتلاوة",
    practice: "Focus on breath awareness during dhikr, Quran recitation with tajweed, or contemplative study. Let knowledge flow through inspired breath.",
    arabicPractice: "ركز على وعي التنفس أثناء الذكر أو تلاوة القرآن بالتجويد"
  },
  Water: {
    english: "Heart Purification",
    arabic: "تزكية القلب",
    practice: "Engage in tearful supplication (du'a), heart-centered silent dhikr, or reflection on Divine mercy. Allow emotions to flow toward purification.",
    arabicPractice: "انخرط في الدعاء الخاشع أو الذكر الصامت من القلب"
  }
};

export const PLANET_PROFILES: Record<string, PlanetProfile> = {
  Saturn: {
    name: "Saturn",
    arabic: "زحل",
    keywords: ["discipline", "limits", "patience", "responsibility"],
    colors: ["black", "dark blue", "dark brown"],
    colorHex: ["#1a1a2e", "#1e3a5f", "#3d2914"],
    scents: ["myrrh", "cypress", "vetiver", "patchouli", "sage"],
    supportiveFoods: ["warm root vegetables", "whole grains", "sesame", "dark leafy greens"],
    avoidFoods: ["heavy junk food", "extreme restriction", "skipped meals"],
    fastingInstruction: "Fast from distraction and excess: keep food simple, no sugar/junk, reduce entertainment.",
    serviceInstruction: "Finish a pending task, honor a commitment, or support someone older in your life.",
    behaviorFocus: "Be consistent, sober, and reliable."
  },
  Jupiter: {
    name: "Jupiter",
    arabic: "المشتري",
    keywords: ["expansion", "faith", "generosity", "wisdom"],
    colors: ["royal blue", "purple", "rich green"],
    colorHex: ["#4169e1", "#7b2d8e", "#228b22"],
    scents: ["frankincense", "clove", "nutmeg", "sage", "cedar"],
    supportiveFoods: ["complex carbs", "dates", "figs", "lightly sweet spiced dishes"],
    avoidFoods: ["overeating", "constant snacking", "heavy feasting"],
    fastingInstruction: "Fast from complaining and cynicism; practice gratitude and generosity instead.",
    serviceInstruction: "Teach, encourage, or materially support someone; share knowledge or resources.",
    behaviorFocus: "Think big, act generous, stay ethical."
  },
  Mars: {
    name: "Mars",
    arabic: "المريخ",
    keywords: ["action", "courage", "assertion", "cutting through"],
    colors: ["red", "scarlet", "strong orange"],
    colorHex: ["#dc143c", "#ff2400", "#ff4500"],
    scents: ["ginger", "black pepper", "garlic", "eucalyptus", "rosemary"],
    supportiveFoods: ["lean proteins", "warm soups", "mild spices", "plenty of water"],
    avoidFoods: ["excessive chili", "fried foods", "stimulants when angry"],
    fastingInstruction: "Fast from reactive anger: no impulsive messages, arguments, or revenge behaviors.",
    serviceInstruction: "Protect or defend someone; take a difficult but necessary action.",
    behaviorFocus: "Be direct, brave, and controlled."
  },
  Sun: {
    name: "Sun",
    arabic: "الشمس",
    keywords: ["core identity", "vitality", "integrity", "leadership"],
    colors: ["gold", "bright yellow", "warm orange"],
    colorHex: ["#ffd700", "#ffea00", "#ff8c00"],
    scents: ["frankincense", "cinnamon", "saffron", "bay leaf", "citrus"],
    supportiveFoods: ["warm regular meals", "quality fats", "lightly spiced dishes", "bright fruits"],
    avoidFoods: ["sugar spikes", "fake energy drinks"],
    fastingInstruction: "Fast from self-promotion; do at least one good deed anonymously.",
    serviceInstruction: "Take responsibility, bring clarity, or lead a situation constructively.",
    behaviorFocus: "Act with dignity, honesty, and steady confidence."
  },
  Venus: {
    name: "Venus",
    arabic: "الزهرة",
    keywords: ["love", "pleasure", "harmony", "aesthetics"],
    colors: ["green", "soft pink", "pastel tones"],
    colorHex: ["#3cb371", "#ffb6c1", "#e6e6fa"],
    scents: ["rose", "jasmine", "ylang-ylang", "sandalwood", "vanilla"],
    supportiveFoods: ["simple pleasurable meals", "natural sweetness", "calming teas"],
    avoidFoods: ["emotional bingeing", "mindless snacking"],
    fastingInstruction: "Fast from low-quality pleasure: doom scrolling, drama, cheap gratification.",
    serviceInstruction: "Create beauty or comfort for someone; mediate or soften a conflict.",
    behaviorFocus: "Be kind, receptive, and appreciative."
  },
  Mercury: {
    name: "Mercury",
    arabic: "عطارد",
    keywords: ["mind", "communication", "learning", "trade"],
    colors: ["yellow", "light grey", "multicolored"],
    colorHex: ["#f0e68c", "#c0c0c0", "#9370db"],
    scents: ["lavender", "peppermint", "lemongrass", "eucalyptus"],
    supportiveFoods: ["complex carbs for focus", "nuts and seeds", "light herbal teas"],
    avoidFoods: ["excessive caffeine", "sugar highs"],
    fastingInstruction: "Fast from gossip and info overload; limit media and unnecessary talk.",
    serviceInstruction: "Explain something clearly, help someone understand or organize information.",
    behaviorFocus: "Be clear, curious, and honest."
  },
  Moon: {
    name: "Moon",
    arabic: "القمر",
    keywords: ["emotions", "body", "habits", "memory"],
    colors: ["white", "silver", "pearl", "soft grey"],
    colorHex: ["#f5f5f5", "#c0c0c0", "#e8e8e8"],
    scents: ["sandalwood", "neroli", "chamomile", "mild floral"],
    supportiveFoods: ["warm soups and stews", "cooked vegetables", "gentle grains", "herbal teas"],
    avoidFoods: ["late heavy meals", "very cold drinks", "chaotic eating times"],
    fastingInstruction: "Fast from emotional reactivity; pause before responding to emotional triggers.",
    serviceInstruction: "Offer care, listening, or nourishment to someone; tend to your home or environment.",
    behaviorFocus: "Be gentle, rhythmic, and nurturing."
  }
};
