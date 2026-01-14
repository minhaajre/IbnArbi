// data/buni.ts
// Buni framework data based on Shams al-Ma'arif al-Kubra
// Planetary angels, incense, jinn kings, divine names, and mansion guidelines

export interface PlanetarySpirit {
  angel: string;
  angelArabic: string;
  incense: string;
  incenseArabic: string;
  jinnKing: string;
  jinnKingArabic: string;
  dayOfWeek: string;
  metal: string;
  color: string;
}

export const PLANETARY_SPIRITS: Record<string, PlanetarySpirit> = {
  Saturn: {
    angel: "Kasfiyail",
    angelArabic: "كسفياييل",
    incense: "Sulfur",
    incenseArabic: "كبريت",
    jinnKing: "Maymun",
    jinnKingArabic: "ميمون",
    dayOfWeek: "Saturday",
    metal: "Lead",
    color: "Black",
  },
  Jupiter: {
    angel: "Sarfiyail",
    angelArabic: "صرفياييل",
    incense: "Oudh",
    incenseArabic: "عود",
    jinnKing: "Shamhurash",
    jinnKingArabic: "شمهورش",
    dayOfWeek: "Thursday",
    metal: "Tin",
    color: "Blue",
  },
  Mars: {
    angel: "Samsamail",
    angelArabic: "سمسماييل",
    incense: "Pepper",
    incenseArabic: "فلفل",
    jinnKing: "Al-Ahmar",
    jinnKingArabic: "الأحمر",
    dayOfWeek: "Tuesday",
    metal: "Iron",
    color: "Red",
  },
  Sun: {
    angel: "Ruqiyail",
    angelArabic: "روقياييل",
    incense: "Sandalwood",
    incenseArabic: "صندل",
    jinnKing: "Mudhhib",
    jinnKingArabic: "مذهب",
    dayOfWeek: "Sunday",
    metal: "Gold",
    color: "Yellow",
  },
  Venus: {
    angel: "Aniyail",
    angelArabic: "عنياييل",
    incense: "Mastic",
    incenseArabic: "مصطكى",
    jinnKing: "Zawba'a",
    jinnKingArabic: "زوبعة",
    dayOfWeek: "Friday",
    metal: "Copper",
    color: "Green",
  },
  Mercury: {
    angel: "Mikail",
    angelArabic: "ميكاييل",
    incense: "Saffron",
    incenseArabic: "زعفران",
    jinnKing: "Barqan",
    jinnKingArabic: "برقان",
    dayOfWeek: "Wednesday",
    metal: "Mercury",
    color: "Mixed",
  },
  Moon: {
    angel: "Jibrail",
    angelArabic: "جبراييل",
    incense: "Camphor",
    incenseArabic: "كافور",
    jinnKing: "Abyadh",
    jinnKingArabic: "الأبيض",
    dayOfWeek: "Monday",
    metal: "Silver",
    color: "White",
  },
};

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

export const MANSION_BUNI_DATA: MansionBuniData[] = [
  {
    id: 1,
    nature: "sad",
    divineName: "Allah",
    divineNameArabic: "الله",
    divineNameCount: 66,
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
    nature: "nahs",
    divineName: "Al-Ba'ith",
    divineNameArabic: "الباعث",
    divineNameCount: 573,
    categories: ["introspection", "recording"],
    guidelines: {
      health: "Avoid major procedures. Rest and observe.",
      career: "Delay contracts. Focus on planning, not action.",
      love: "Maintain distance. Avoid confrontations.",
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
    nature: "sad",
    divineName: "Al-Akhir",
    divineNameArabic: "الآخر",
    divineNameCount: 801,
    categories: ["completion", "patience", "persistence"],
    guidelines: {
      health: "Good for long-term treatments and follow-ups.",
      career: "Excellent for completing projects and steady work.",
      love: "Supports commitment and lasting bonds.",
      spirit: "Recite for patience and seeing matters to their end.",
    },
  },
  {
    id: 5,
    nature: "nahs",
    divineName: "Al-Zahir",
    divineNameArabic: "الظاهر",
    divineNameCount: 1106,
    categories: ["caution", "contemplation"],
    guidelines: {
      health: "Risk of inflammation. Avoid surgery.",
      career: "Delay public appearances and announcements.",
      love: "Keep feelings hidden for now.",
      spirit: "Recite for making truth manifest in its proper time.",
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
    divineName: "Al-Wasi",
    divineNameArabic: "الواسع",
    divineNameCount: 137,
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
    nature: "nahs",
    divineName: "Al-Shakur",
    divineNameArabic: "الشكور",
    divineNameCount: 526,
    categories: ["gratitude", "patience"],
    guidelines: {
      health: "Moderate. Focus on gratitude practices.",
      career: "Expectations may disappoint. Practice acceptance.",
      love: "Express gratitude rather than demands.",
      spirit: "Recite to cultivate true thankfulness.",
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
    divineName: "Al-Qawi",
    divineNameArabic: "القوي",
    divineNameCount: 116,
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
    divineName: "Al-Qahir",
    divineNameArabic: "القاهر",
    divineNameCount: 306,
    categories: ["victory", "courage", "challenges"],
    guidelines: {
      health: "Good for overcoming illness with strength.",
      career: "Favorable for competition and asserting oneself.",
      love: "Stand firm in truth with compassion.",
      spirit: "Recite for victory over obstacles and enemies.",
    },
  },
  {
    id: 14,
    nature: "nahs",
    divineName: "Al-Nur",
    divineNameArabic: "النور",
    divineNameCount: 256,
    categories: ["illumination", "study", "humility"],
    guidelines: {
      health: "Seek second opinions. Avoid rushed decisions.",
      career: "Study rather than act. Confrontation unhelpful.",
      love: "Approach with humility, not assertion.",
      spirit: "Recite to receive divine illumination.",
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
    nature: "sad",
    divineName: "Al-Muhsi",
    divineNameArabic: "المحصي",
    divineNameCount: 148,
    categories: ["organization", "communication", "healing"],
    guidelines: {
      health: "Good for detailed diagnosis and treatment plans.",
      career: "Excellent for contracts, communication, healing work.",
      love: "Clear communication strengthens bonds.",
      spirit: "Recite for precision and clear accounting.",
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
    nature: "nahs",
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
    nature: "nahs",
    divineName: "Al-Karim",
    divineNameArabic: "الكريم",
    divineNameCount: 270,
    categories: ["generosity", "sacrifice", "release"],
    guidelines: {
      health: "Avoid major procedures. Minor sacrifice helps.",
      career: "Generosity required. Release what drains you.",
      love: "Sacrifice may be needed for harmony.",
      spirit: "Recite for generous spirit and noble character.",
    },
  },
  {
    id: 23,
    nature: "sad",
    divineName: "Al-Muqit",
    divineNameArabic: "المقيت",
    divineNameCount: 550,
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
    nature: "nahs",
    divineName: "Al-Mudhill",
    divineNameArabic: "المذل",
    divineNameCount: 770,
    categories: ["humility", "caution", "creatures"],
    guidelines: {
      health: "Avoid pride in health matters. Be humble.",
      career: "Pride may cause downfall. Practice humility.",
      love: "Arrogance destroys. Approach with humility.",
      spirit: "Recite to understand divine humbling.",
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
    nature: "nahs",
    divineName: "Al-Latif",
    divineNameArabic: "اللطيف",
    divineNameCount: 129,
    categories: ["subtlety", "vigilance", "jinn"],
    guidelines: {
      health: "Subtle imbalances may arise. Be vigilant.",
      career: "Hidden enemies possible. Maintain awareness.",
      love: "Subtle manipulation possible. Stay alert.",
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
    nature: "nahs",
    divineName: "Al-Rafi",
    divineNameArabic: "الرافع",
    divineNameCount: 351,
    categories: ["surrender", "completion", "elevation"],
    guidelines: {
      health: "Time for rest, not aggressive treatment.",
      career: "Cycle completion. Prepare for new beginning.",
      love: "Surrender outcomes. Accept what is.",
      spirit: "Recite for elevation through surrender.",
    },
  },
];

export interface CategoryOptimalMansions {
  category: string;
  categoryArabic: string;
  description: string;
  optimalMansions: number[];
  avoidMansions: number[];
}

export const WORK_CATEGORIES: CategoryOptimalMansions[] = [
  {
    category: "Love & Relationships",
    categoryArabic: "الحب والعلاقات",
    description: "Marriage, romance, reconciliation, and strengthening bonds",
    optimalMansions: [3, 6, 15, 16, 17, 27],
    avoidMansions: [5, 8, 18, 19, 24],
  },
  {
    category: "Authority & Leadership",
    categoryArabic: "السلطة والقيادة",
    description: "Gaining power, meeting officials, promotions, and recognition",
    optimalMansions: [1, 10, 11, 13, 17],
    avoidMansions: [2, 9, 12, 24],
  },
  {
    category: "Protection & Safety",
    categoryArabic: "الحماية والأمان",
    description: "Warding off enemies, protection from harm, and spiritual shielding",
    optimalMansions: [3, 7, 25, 11],
    avoidMansions: [5, 18, 19, 26],
  },
  {
    category: "Wealth & Business",
    categoryArabic: "الثروة والتجارة",
    description: "Financial gain, starting businesses, and increasing prosperity",
    optimalMansions: [4, 7, 10, 16, 23],
    avoidMansions: [2, 8, 22, 28],
  },
  {
    category: "Travel & Journeys",
    categoryArabic: "السفر والرحلات",
    description: "Safe travels, exploring new places, and returning safely",
    optimalMansions: [1, 4, 7, 13, 27],
    avoidMansions: [5, 18, 19, 26],
  },
  {
    category: "Health & Healing",
    categoryArabic: "الصحة والشفاء",
    description: "Recovery from illness, starting treatments, and vitality",
    optimalMansions: [6, 15, 16, 20, 23],
    avoidMansions: [5, 18, 19, 22],
  },
  {
    category: "Knowledge & Learning",
    categoryArabic: "العلم والتعلم",
    description: "Study, acquiring wisdom, and discovering hidden knowledge",
    optimalMansions: [3, 6, 12, 14],
    avoidMansions: [5, 8, 19],
  },
  {
    category: "Conflict & Victory",
    categoryArabic: "الصراع والنصر",
    description: "Overcoming enemies, legal matters, and asserting oneself",
    optimalMansions: [10, 13, 25],
    avoidMansions: [2, 9, 24, 28],
  },
];

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
