// Lahiri Ayanamsha Constants
export const AYANAMSHA_J2000 = 23.85; // Degrees
export const PRECESSION_RATE = 0.01397; // Degrees per year

// IBN_ARABI_MANSIONS has been moved to data/ibn-arabi-mansions.ts (P8 refactor).
// Import from there or from data/mansions.ts (unified Mansion type).

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

export const ADVANCED_AZKAAR: Record<string, { suggestions: string[]; phrasing: string }> = {
  Sun: {
    suggestions: ["Dalā'il al-Khairāt", "al-Dawr al-Aʿlā"],
    phrasing: "This hour, associated with illumination, may resonate with litanies such as Dalā'il al-Khairāt."
  },
  Moon: {
    suggestions: ["Hizb al-Baḥr", "Qasīdat al-Burda", "Surah Yā-Sīn"],
    phrasing: "This hour may harmonize with recitations emphasizing trust and surrender, such as Hizb al-Baḥr."
  },
  Mercury: {
    suggestions: ["Wird al-Laṭīf", "Yā Laṭīf (dhikr)"],
    phrasing: "This hour may support subtle shifts in understanding; some find resonance with Wird al-Laṭīf."
  },
  Venus: {
    suggestions: ["Qasīdat al-Burda", "Dalā'il al-Khairāt"],
    phrasing: "A time associated with beauty and gentleness; some may find resonance in reciting Qasīdat al-Burda."
  },
  Mars: {
    suggestions: ["Ḥizb al-Naṣr"],
    phrasing: "This hour may harmonize with litanies emphasizing inner clarity and strength, such as Ḥizb al-Naṣr."
  },
  Jupiter: {
    suggestions: ["Hizb al-Baḥr", "al-Dawr al-Aʿlā", "Surah al-Wāqiʿah"],
    phrasing: "This hour carries expansive openings; some seekers resonate with litanies such as al-Dawr al-Aʿlā."
  },
  Saturn: {
    suggestions: ["Wird al-Laṭīf", "Istighfār"],
    phrasing: "This hour may support introspection and clearing; some find support in Wird al-Laṭīf or Istighfār."
  }
};

export const MANSION_AZKAAR_SUGGESTIONS: Record<number, string> = {
  1: "This mansion may harmonize with litanies of new beginnings, such as invocations of the Divine Names of initiation.",
  2: "This mansion may support devotional recitations emphasizing patience and trust.",
  3: "This mansion may resonate with litanies associated with hidden knowledge and inner reflection.",
  4: "This mansion may harmonize with recitations emphasizing stability and grounding.",
  5: "This mansion may support litanies of clarity and illumination.",
  6: "This mansion may resonate with devotional practices emphasizing wisdom and understanding.",
  7: "This mansion may harmonize with recitations of the Divine Name 'The Guide' (al-Hādī).",
  8: "This mansion may support litanies associated with communication and connection.",
  9: "This mansion may harmonize with devotional practices emphasizing resilience.",
  10: "This mansion may resonate with recitations of the Divine Name 'The Mighty' (al-ʿAzīz).",
  11: "This mansion may support litanies associated with refinement and purification.",
  12: "This mansion may harmonize with devotional practices emphasizing gathering and cohesion.",
  13: "This mansion may resonate with litanies of transformation and transmutation.",
  14: "This mansion may support recitations emphasizing release and letting go.",
  15: "This mansion may harmonize with devotional practices of profound witnessing.",
  16: "This mansion may resonate with litanies associated with clarity and discernment.",
  17: "This mansion may support practices emphasizing compassion and softening.",
  18: "This mansion may harmonize with recitations of gratitude and abundance.",
  19: "This mansion may resonate with devotional practices emphasizing restoration.",
  20: "This mansion may support litanies associated with deepening and concentration.",
  21: "This mansion may harmonize with practices emphasizing courage and breakthrough.",
  22: "This mansion may resonate with recitations of the Divine Names of protection.",
  23: "This mansion may support devotional practices emphasizing community and gathering.",
  24: "This mansion may harmonize with litanies associated with completion and fulfillment.",
  25: "This mansion may resonate with practices emphasizing joy and celebration.",
  26: "This mansion may support recitations of the Divine Name 'The Pardoner' (al-ʿAfw).",
  27: "This mansion may harmonize with devotional practices emphasizing ascension and elevation.",
  28: "This mansion may resonate with litanies associated with return and homecoming."
};

export const PLANET_PROFILES: Record<string, PlanetProfile> = {
  Saturn: {
    name: "Saturn",
    arabic: "زحل",
    keywords: ["discipline", "limits", "patience", "responsibility"],
    colors: ["black", "lead grey", "charcoal"],
    colorHex: ["#000000", "#556b7d", "#36454f"],
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
    colors: ["white", "bright cream", "pale radiance"],
    colorHex: ["#ffffff", "#fffacd", "#f0f8ff"],
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
    colors: ["soft luminous green", "emerald glow", "jade"],
    colorHex: ["#90ee90", "#50c878", "#00a86b"],
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
    colors: ["iridescent", "shifting pearl", "opalescent"],
    colorHex: ["#c0c0c0", "#a6a9c0", "#e0d5f5"],
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
    colors: ["silver-white", "moonlight", "luminous pearl"],
    colorHex: ["#e8e8e8", "#d3d3d3", "#f0f0f0"],
    scents: ["sandalwood", "neroli", "chamomile", "mild floral"],
    supportiveFoods: ["warm soups and stews", "cooked vegetables", "gentle grains", "herbal teas"],
    avoidFoods: ["late heavy meals", "very cold drinks", "chaotic eating times"],
    fastingInstruction: "Fast from emotional reactivity; pause before responding to emotional triggers.",
    serviceInstruction: "Offer care, listening, or nourishment to someone; tend to your home or environment.",
    behaviorFocus: "Be gentle, rhythmic, and nurturing."
  }
};

// ─── Shared Planet Constants ───────────────────────────────────────────────
// Single source of truth — import from here, never redefine locally.

/** Unicode astronomical symbols for each planet. */
export const PLANET_SYMBOLS: Record<string, string> = {
  Sun: "☉",
  Moon: "☾",
  Mars: "♂",
  Mercury: "☿",
  Jupiter: "♃",
  Venus: "♀",
  Saturn: "♄",
  Rahu: "☊",
  Ketu: "☋",
};

/**
 * Hex colours for canvas / SVG rendering (ZodiacWheel, dynamic favicon).
 * Aligned with the Tailwind palette used elsewhere (amber/slate/red/emerald/orange/pink/indigo).
 */
export const PLANET_HEX_COLORS: Record<string, string> = {
  Sun: "#f59e0b",      // amber-500
  Moon: "#94a3b8",     // slate-400
  Mars: "#ef4444",     // red-500
  Mercury: "#10b981",  // emerald-500
  Jupiter: "#f97316",  // orange-500
  Venus: "#ec4899",    // pink-500
  Saturn: "#6366f1",   // indigo-500
};

/**
 * Tailwind text-colour classes for inline UI (tables, hour displays, nakshatra cards).
 * Uses dark-mode variants for proper theming.
 */
export const PLANET_TAILWIND_COLORS: Record<string, string> = {
  Sun: "text-amber-500 dark:text-yellow-400",
  Moon: "text-slate-500 dark:text-slate-300",
  Mars: "text-red-500 dark:text-red-400",
  Mercury: "text-emerald-600 dark:text-emerald-400",
  Jupiter: "text-orange-500 dark:text-orange-400",
  Venus: "text-pink-500 dark:text-pink-400",
  Saturn: "text-indigo-500 dark:text-indigo-400",
  Rahu: "text-violet-500 dark:text-violet-400",
  Ketu: "text-rose-400 dark:text-rose-300",
};
