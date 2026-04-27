// data/buni.ts
// Al-Buni framework data (Shams al-Ma'arif al-Kubra) — electional layer only.
// Removed 2026-04-28: angel names, jinn kings, incense, metals, ink recipes.
// These belong to ilm al-hikmah (talismanic operations), not electional timing.
// What remains: Sa'd/Nahs nature, divine names (from Ibn Arabi PDF), and
// practical activity guidelines for electional timing.


export type MansionNature = "sad" | "nahs";

export interface MansionBuniData {
  id: number;
  nature: MansionNature;
  divineName: string;
  divineNameArabic: string;
  divineNameCount: number;
  categories: string[];
  guidelines: {
    health: string;
    career: string;
    love: string;
    spirit: string;
  };
}

// Sa'd / Nahs values below follow Abu Mashar (Kitab al-Madkhal al-Kabir).
// 11 values corrected 2026-04-28 from undocumented prior assignments.
// "sad" mirrors nature:"blessed" in ibn-arabi-mansions.ts; "nahs" mirrors "challenging".
export const MANSION_BUNI_DATA: MansionBuniData[] = [
  {
    id: 1,
    nature: "sad",
    divineName: "Al-Badi'",
    divineNameArabic: "البديع",
    divineNameCount: 86,
    categories: ["travel", "authority", "beginnings"],
    guidelines: {
      health: "Favorable for starting treatments. Good for vitality.",
      career: "Excellent for new ventures and leadership roles.",
      love: "Supports new relationships and declarations.",
      spirit: "Recite the Divine Name to align with primordial intention.",
    },
  },
  {
    id: 2,
    nature: "sad",
    divineName: "Al-Ba'ith",
    divineNameArabic: "الباعث",
    divineNameCount: 573,
    categories: ["introspection", "recording"],
    guidelines: {
      health: "Favorable for starting treatments and remedies. Good for recovery.",
      career: "Good for financial dealings, intellectual work, and commerce.",
      love: "Supports new connections and expressions of affection.",
      spirit: "Recite for awakening hidden potential within.",
    },
  },
  {
    id: 3,
    nature: "sad",
    divineName: "Al-Batin",
    divineNameArabic: "الباطن",
    divineNameCount: 62,
    categories: ["hidden knowledge", "protection", "secrets"],
    guidelines: {
      health: "Good for discovering root causes of illness.",
      career: "Favorable for research and uncovering hidden matters.",
      love: "Supports secret meetings and private affairs.",
      spirit: "Recite to access inner wisdom and hidden realities.",
    },
  },
  {
    id: 4,
    nature: "nahs",
    divineName: "Al-Akhir",
    divineNameArabic: "الآخر",
    divineNameCount: 801,
    categories: ["completion", "patience", "persistence"],
    guidelines: {
      health: "Avoid surgery and major interventions. Rest and monitor only.",
      career: "Avoid contracts and new ventures. Delay until conditions improve.",
      love: "Unfavorable. Avoid declarations and new commitments.",
      spirit: "Recite for patience and equanimity through difficulty.",
    },
  },
  {
    id: 5,
    nature: "sad",
    divineName: "Al-Zahir",
    divineNameArabic: "الظاهر",
    divineNameCount: 1106,
    categories: ["learning", "health", "manifestation"],
    guidelines: {
      health: "Favorable for health work, medicine, and treatments.",
      career: "Good for learning, skill-building, and making things public.",
      love: "Expressing feelings openly is supported.",
      spirit: "Recite for making inner truth visible in the world.",
    },
  },
  {
    id: 6,
    nature: "sad",
    divineName: "Al-Hakim",
    divineNameArabic: "الحكيم",
    divineNameCount: 78,
    categories: ["wisdom", "learning", "teaching"],
    guidelines: {
      health: "Good for seeking expert medical advice.",
      career: "Excellent for education, writing, and teaching.",
      love: "Wisdom in relationships is favored.",
      spirit: "Recite to gain wisdom and discernment.",
    },
  },
  {
    id: 7,
    nature: "sad",
    divineName: "Al-Muhit",
    divineNameArabic: "المحيط",
    divineNameCount: 67,
    categories: ["expansion", "charity", "abundance"],
    guidelines: {
      health: "Favorable for expansive treatments and healing.",
      career: "Good for expanding business and reaching new markets.",
      love: "Supports generosity and widening social circles.",
      spirit: "Recite to expand capacity and embrace divine vastness.",
    },
  },
  {
    id: 8,
    nature: "sad",
    divineName: "Al-Shakur",
    divineNameArabic: "الشكور",
    divineNameCount: 526,
    categories: ["gratitude", "commerce", "relationships"],
    guidelines: {
      health: "Excellent for treatments, health decisions, and recovery.",
      career: "Top priority — financial dealings, commerce, and relational outreach.",
      love: "Highly favorable for connection, outreach, and new relationships.",
      spirit: "Recite to cultivate deep thankfulness for all that is given.",
    },
  },
  {
    id: 9,
    nature: "nahs",
    divineName: "Al-Ghani",
    divineNameArabic: "الغني",
    divineNameCount: 1060,
    categories: ["solitude", "self-sufficiency"],
    guidelines: {
      health: "Good for solitary healing practices.",
      career: "Work alone rather than in groups.",
      love: "Time for independence, not partnership.",
      spirit: "Recite to cultivate inner richness and contentment.",
    },
  },
  {
    id: 10,
    nature: "sad",
    divineName: "Al-Muqtadir",
    divineNameArabic: "المقتدر",
    divineNameCount: 744,
    categories: ["strength", "authority", "power"],
    guidelines: {
      health: "Good for building strength and vitality.",
      career: "Excellent for asserting authority and leadership.",
      love: "Strong declarations and commitments favored.",
      spirit: "Recite to invoke divine strength in challenges.",
    },
  },
  {
    id: 11,
    nature: "sad",
    divineName: "Al-Rabb",
    divineNameArabic: "الرب",
    divineNameCount: 202,
    categories: ["devotion", "surrender", "tradition"],
    guidelines: {
      health: "Favorable for traditional remedies.",
      career: "Good for working with established institutions.",
      love: "Honor traditions and family bonds.",
      spirit: "Recite for lordly care and divine nurturing.",
    },
  },
  {
    id: 12,
    nature: "nahs",
    divineName: "Al-'Alim",
    divineNameArabic: "العليم",
    divineNameCount: 150,
    categories: ["knowledge", "transition", "change"],
    guidelines: {
      health: "Time of transition. Monitor health closely.",
      career: "Prepare for change. Gather knowledge.",
      love: "Relationships may shift. Seek understanding.",
      spirit: "Recite to access divine knowledge in transitions.",
    },
  },
  {
    id: 13,
    nature: "sad",
    divineName: "Al-Qahhar",
    divineNameArabic: "القهار",
    divineNameCount: 306,
    categories: ["commerce", "alliances", "intellectual work"],
    guidelines: {
      health: "Favorable for health decisions and seeking expert advice.",
      career: "Excellent for commercial proposals, trade agreements, and publishing.",
      love: "Alliances, reconciliation, and expressions of affection are supported.",
      spirit: "Recite for resolve and clarity in overcoming obstacles.",
    },
  },
  {
    id: 14,
    nature: "sad",
    divineName: "Al-Nur",
    divineNameArabic: "النور",
    divineNameCount: 256,
    categories: ["illumination", "fortune", "healing"],
    guidelines: {
      health: "Exceptional — prime window for healing, medical decisions, and recovery.",
      career: "Prime for financial moves, commerce, learning, and key decisions.",
      love: "Highly favorable — one of the finest windows for love and deepening bonds.",
      spirit: "Recite to receive divine illumination in its fullest expression.",
    },
  },
  {
    id: 15,
    nature: "sad",
    divineName: "Al-Musawwir",
    divineNameArabic: "المصور",
    divineNameCount: 336,
    categories: ["beauty", "creativity", "forgiveness"],
    guidelines: {
      health: "Good for cosmetic and aesthetic treatments.",
      career: "Excellent for artistic and creative work.",
      love: "Beauty and romance are favored.",
      spirit: "Recite to perceive divine beauty in all forms.",
    },
  },
  {
    id: 16,
    nature: "nahs",
    divineName: "Al-Muhsi",
    divineNameArabic: "المحصي",
    divineNameCount: 148,
    categories: ["caution", "observation", "restraint"],
    guidelines: {
      health: "Health vulnerability window. Avoid major procedures; monitor instead.",
      career: "Avoid contracts, commerce, and commitments. Delay signings.",
      love: "Unfavorable for relationships and new bonds. Proceed with caution.",
      spirit: "Recite for precision and accepting the divine measure.",
    },
  },
  {
    id: 17,
    nature: "sad",
    divineName: "Al-Mubin",
    divineNameArabic: "المبين",
    divineNameCount: 102,
    categories: ["clarity", "manifestation", "humanity"],
    guidelines: {
      health: "Good for making health visible and clear.",
      career: "Favorable for public announcements and clarity.",
      love: "Express feelings openly and clearly.",
      spirit: "Recite for making truth evident and manifest.",
    },
  },
  {
    id: 18,
    nature: "nahs",
    divineName: "Al-Qabid",
    divineNameArabic: "القابض",
    divineNameCount: 903,
    categories: ["constriction", "release", "purification"],
    guidelines: {
      health: "Risk of heart issues. Avoid stress.",
      career: "Contracts may constrict. Avoid commitments.",
      love: "Intense emotions. Practice release.",
      spirit: "Recite to accept divine constriction with grace.",
    },
  },
  {
    id: 19,
    nature: "nahs",
    divineName: "Al-Hayy",
    divineNameArabic: "الحي",
    divineNameCount: 18,
    categories: ["vitality", "caution", "breathwork"],
    guidelines: {
      health: "Risk of bites and stings. Be cautious.",
      career: "Sharp communication may wound. Be careful.",
      love: "Prohibited. Results tend toward separation.",
      spirit: "Recite for life force and vital presence.",
    },
  },
  {
    id: 20,
    nature: "sad",
    divineName: "Al-Muhyi",
    divineNameArabic: "المحيي",
    divineNameCount: 68,
    categories: ["nurturing", "healing", "water"],
    guidelines: {
      health: "Good for water-based healing and purification.",
      career: "Nurturing roles favored over aggressive ones.",
      love: "Tenderness and care are needed.",
      spirit: "Recite for life-giving blessing and revival.",
    },
  },
  {
    id: 21,
    nature: "sad",
    divineName: "Al-Mumit",
    divineNameArabic: "المميت",
    divineNameCount: 490,
    categories: ["endings", "transformation", "release"],
    guidelines: {
      health: "Good for ending harmful habits.",
      career: "Favorable for closing chapters and transitions.",
      love: "Letting go of what no longer serves.",
      spirit: "Recite to accept endings as transformation.",
    },
  },
  {
    id: 22,
    nature: "sad",
    divineName: "Al-'Aziz",
    divineNameArabic: "العزيز",
    divineNameCount: 94,
    categories: ["career", "healing", "commerce"],
    guidelines: {
      health: "Favorable for healing practices and health decisions.",
      career: "Good for career reputation, commerce, and structured achievement.",
      love: "Supports stable relationships and expressions of commitment.",
      spirit: "Recite for generous spirit and noble character.",
    },
  },
  {
    id: 23,
    nature: "sad",
    divineName: "Al-Razzaq",
    divineNameArabic: "الرزاق",
    divineNameCount: 308,
    categories: ["nourishment", "growth", "planting"],
    guidelines: {
      health: "Excellent for nutrition and building strength.",
      career: "Good for planting seeds and long-term growth.",
      love: "Nurture relationships with patience.",
      spirit: "Recite for sustenance and divine nourishment.",
    },
  },
  {
    id: 24,
    nature: "sad",
    divineName: "Al-Mudhill",
    divineNameArabic: "المذل",
    divineNameCount: 770,
    categories: ["liberation", "new directions", "expansion"],
    guidelines: {
      health: "Favorable — good for new directions in health and recovery.",
      career: "Supports intellectual pivots, new ventures, and breaking from constraints.",
      love: "Open-minded connection and fresh starts in relationships are favored.",
      spirit: "Recite to understand divine mercy and liberation from limitation.",
    },
  },
  {
    id: 25,
    nature: "sad",
    divineName: "Al-Qawi",
    divineNameArabic: "القوي",
    divineNameCount: 116,
    categories: ["protection", "hidden work", "angels"],
    guidelines: {
      health: "Good for protection from illness.",
      career: "Hidden spiritual work favored over public.",
      love: "Protect your heart from exposure.",
      spirit: "Recite for angelic protection and strength.",
    },
  },
  {
    id: 26,
    nature: "sad",
    divineName: "Al-Latif",
    divineNameArabic: "اللطيف",
    divineNameCount: 129,
    categories: ["community", "alliances", "networking"],
    guidelines: {
      health: "Favorable for health and recovery. Gentle approaches work well.",
      career: "Community building, alliances, and strategic networking are favored.",
      love: "Gentle connection and quiet affection are supported.",
      spirit: "Recite for subtle perception and divine gentleness.",
    },
  },
  {
    id: 27,
    nature: "sad",
    divineName: "Al-Jami",
    divineNameArabic: "الجامع",
    divineNameCount: 114,
    categories: ["community", "unity", "reconciliation"],
    guidelines: {
      health: "Community support aids healing.",
      career: "Excellent for bringing people together.",
      love: "Reconciliation and reunion favored.",
      spirit: "Recite to gather scattered matters into unity.",
    },
  },
  {
    id: 28,
    nature: "sad",
    divineName: "Al-Rafi' al-Darajat",
    divineNameArabic: "الرافع الدرجات",
    divineNameCount: 351,
    categories: ["completion", "community", "aspiration"],
    guidelines: {
      health: "Favorable for healing and completing treatment courses.",
      career: "Good for completing projects, community work, and collective endeavors.",
      love: "Friendship, community cultivation, and aspiration are supported.",
      spirit: "Recite for elevation through completion of the cycle.",
    },
  },
];

export interface CategoryOptimalMansions {
  category: string;
  categoryArabic: string;
  description: string;
  optimalMansions: number[];
  avoidMansions: number[];
  divineName: string;
  divineNameArabic: string;
  divineNameAbjad: number;
  secondaryName: string;
  secondaryNameArabic: string;
  secondaryNameAbjad: number;
  letter: string;
  letterArabic: string;
  letterValue: number;
  guideline: string;
  planetaryHour: string;
  affectedByWaning?: boolean;
  blockedInScorpio?: boolean;
}

export const WORK_CATEGORIES: CategoryOptimalMansions[] = [
  {
    category: "Love & Relationships",
    categoryArabic: "الحب",
    description: "Reconciliation, fostering sympathy, and strengthening bonds",
    optimalMansions: [6, 8, 13, 24],
    avoidMansions: [4, 12, 19],
    divineName: "Ya Wadud",
    divineNameArabic: "يا ودود",
    divineNameAbjad: 20,
    secondaryName: "Ya Latif",
    secondaryNameArabic: "يا لطيف",
    secondaryNameAbjad: 129,
    letter: "Waw",
    letterArabic: "و",
    letterValue: 6,
    guideline: "Best used during the Hour of Venus. Focus on reconciliation and fostering sympathy.",
    planetaryHour: "Venus",
    affectedByWaning: true,
    blockedInScorpio: true,
  },
  {
    category: "Wealth & Business",
    categoryArabic: "الثروة",
    description: "Financial gain, starting businesses, increasing prosperity",
    optimalMansions: [7, 10, 24, 26, 28],
    avoidMansions: [4, 9, 19],
    divineName: "Ya Ghani",
    divineNameArabic: "يا غني",
    divineNameAbjad: 1060,
    secondaryName: "Ya Wahhab",
    secondaryNameArabic: "يا وهاب",
    secondaryNameAbjad: 14,
    letter: "Mim",
    letterArabic: "م",
    letterValue: 40,
    guideline: "Best used during the Hour of Jupiter while the Moon is waxing.",
    planetaryHour: "Jupiter",
    affectedByWaning: true,
  },
  {
    category: "Authority & Leadership",
    categoryArabic: "السلطة",
    description: "Gaining power, meeting officials, promotions, and recognition",
    optimalMansions: [10, 11, 21, 28],
    avoidMansions: [1, 9, 16],
    divineName: "Ya Aziz",
    divineNameArabic: "يا عزيز",
    divineNameAbjad: 94,
    secondaryName: "Ya Rafi'",
    secondaryNameArabic: "يا رافع",
    secondaryNameAbjad: 351,
    letter: "Alif",
    letterArabic: "ا",
    letterValue: 1,
    guideline: "Use during the Hour of the Sun for charisma or Jupiter for rank.",
    planetaryHour: "Sun",
  },
  {
    category: "Protection & Safety",
    categoryArabic: "الحماية",
    description: "Warding off enemies, protection from harm, and spiritual shielding",
    optimalMansions: [17, 18, 21],
    avoidMansions: [19],
    divineName: "Ya Hafiz",
    divineNameArabic: "يا حفيظ",
    divineNameAbjad: 998,
    secondaryName: "Ya Mani'",
    secondaryNameArabic: "يا مانع",
    secondaryNameAbjad: 161,
    letter: "Sad",
    letterArabic: "ص",
    letterValue: 90,
    guideline: "Use Hour of Saturn for binding enemies or Mars for active defense.",
    planetaryHour: "Saturn",
  },
  {
    category: "Health & Healing",
    categoryArabic: "الصحة",
    description: "Recovery from illness, starting treatments, and vitality",
    optimalMansions: [2, 14, 23],
    avoidMansions: [9, 18, 19],
    divineName: "Ya Shafi",
    divineNameArabic: "يا شافي",
    divineNameAbjad: 391,
    secondaryName: "Ya Salam",
    secondaryNameArabic: "يا سلام",
    secondaryNameAbjad: 131,
    letter: "Hah",
    letterArabic: "ح",
    letterValue: 8,
    guideline: "Use the Hour of the Moon. Never perform surgery during Mansion 19 (Al-Shawla).",
    planetaryHour: "Moon",
    blockedInScorpio: true,
  },
  {
    category: "Knowledge & Learning",
    categoryArabic: "العلم",
    description: "Study, acquiring wisdom, and discovering hidden knowledge",
    optimalMansions: [5, 11, 15],
    avoidMansions: [19],
    divineName: "Ya 'Alim",
    divineNameArabic: "يا عليم",
    divineNameAbjad: 150,
    secondaryName: "Ya Hadi",
    secondaryNameArabic: "يا هادي",
    secondaryNameAbjad: 20,
    letter: "Ya",
    letterArabic: "ي",
    letterValue: 10,
    guideline: "Best used during the Hour of Mercury.",
    planetaryHour: "Mercury",
  },
  {
    category: "Conflict & Victory",
    categoryArabic: "النصر",
    description: "Subduing internal ego or external oppression, overcoming enemies",
    optimalMansions: [1, 18, 19],
    avoidMansions: [],
    divineName: "Ya Qahhar",
    divineNameArabic: "يا قهار",
    divineNameAbjad: 306,
    secondaryName: "Ya Jabbar",
    secondaryNameArabic: "يا جبار",
    secondaryNameAbjad: 206,
    letter: "Qaf",
    letterArabic: "ق",
    letterValue: 100,
    guideline: "Use for subduing internal ego or external oppression during the Hour of Mars.",
    planetaryHour: "Mars",
  },
];

export const SCORPIO_MANSIONS = [16, 17, 18, 19, 20, 21];

export function isInScorpio(mansionNumber: number): boolean {
  return SCORPIO_MANSIONS.includes(mansionNumber);
}

export function isCategoryBlocked(
  category: string,
  currentMansion: number,
  isWaning: boolean
): { blocked: boolean; reason?: string } {
  const categoryData = WORK_CATEGORIES.find(c => c.category === category);
  if (!categoryData) return { blocked: false };

  if (categoryData.blockedInScorpio && isInScorpio(currentMansion)) {
    return { blocked: true, reason: "Blocked: Moon in Scorpio (Mansions 16-21)" };
  }

  if (categoryData.affectedByWaning && isWaning) {
    return { blocked: false, reason: "Caution: Moon is waning - energy weakened" };
  }

  return { blocked: false };
}

export function calculateRecitationCount(userNameAbjad: number, divineName: string): number {
  const categoryData = WORK_CATEGORIES.find(c => c.divineName === divineName);
  if (!categoryData) return 0;
  return userNameAbjad + categoryData.divineNameAbjad;
}

export function getMansionBuniData(mansionNumber: number): MansionBuniData | undefined {
  return MANSION_BUNI_DATA.find(m => m.id === mansionNumber);
}

export function getOptimalDatesForCategory(
  category: string,
  currentMansion: number,
  mansionDurationHours: number = 23
): { nextOptimal: number; daysUntil: number; nextAvoid: number; daysUntilAvoid: number } | null {
  const categoryData = WORK_CATEGORIES.find(c => c.category === category);
  if (!categoryData) return null;

  let nextOptimal = -1;
  let stepsToOptimal = 0;
  
  for (let i = 1; i <= 28; i++) {
    const checkMansion = ((currentMansion - 1 + i) % 28) + 1;
    if (categoryData.optimalMansions.includes(checkMansion)) {
      nextOptimal = checkMansion;
      stepsToOptimal = i;
      break;
    }
  }

  let nextAvoid = -1;
  let stepsToAvoid = 0;
  
  for (let i = 1; i <= 28; i++) {
    const checkMansion = ((currentMansion - 1 + i) % 28) + 1;
    if (categoryData.avoidMansions.includes(checkMansion)) {
      nextAvoid = checkMansion;
      stepsToAvoid = i;
      break;
    }
  }

  const daysUntil = Math.round((stepsToOptimal * mansionDurationHours) / 24);
  const daysUntilAvoid = Math.round((stepsToAvoid * mansionDurationHours) / 24);

  return { nextOptimal, daysUntil, nextAvoid, daysUntilAvoid };
}
