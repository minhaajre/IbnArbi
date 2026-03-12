export interface Nakshatra {
  number: number;
  name: string;
  sanskrit: string;
  category: string;
  categoryArabic: string;
  nature: string;
  rulingPlanet: string;
  deity: string;
  symbol: string;
  element: string;
  bestFor: string[];
  avoid: string[];
  startDegree: number;
  endDegree: number;
}

export type NakshatraCategory = {
  name: string;
  sanskrit: string;
  arabic: string;
  nature: string;
  color: string;
  icon: string;
};

export const NAKSHATRA_CATEGORIES: Record<string, NakshatraCategory> = {
  Fixed: { name: "Fixed", sanskrit: "Dhruva / Sthira", arabic: "ثابت", nature: "Stable", color: "text-emerald-500", icon: "🏛" },
  Movable: { name: "Movable", sanskrit: "Chara", arabic: "متحرك", nature: "Dynamic", color: "text-sky-500", icon: "🌊" },
  Cruel: { name: "Cruel", sanskrit: "Ugra / Krura", arabic: "شديد", nature: "Aggressive", color: "text-red-500", icon: "⚔" },
  Ordinary: { name: "Ordinary", sanskrit: "Mishra", arabic: "مختلط", nature: "Neutral", color: "text-amber-500", icon: "⚖" },
  Short: { name: "Short / Swift", sanskrit: "Kshipra / Laghu", arabic: "سريع", nature: "Quick", color: "text-violet-500", icon: "⚡" },
  Gentle: { name: "Gentle", sanskrit: "Mridu", arabic: "لطيف", nature: "Soft", color: "text-pink-500", icon: "🌸" },
  Ferocious: { name: "Ferocious", sanskrit: "Tikshna / Daruna", arabic: "شرس", nature: "Intense", color: "text-orange-500", icon: "🔥" },
};

export const NAKSHATRAS: Nakshatra[] = [
  {
    number: 1, name: "Ashwini", sanskrit: "अश्विनी", category: "Short",
    categoryArabic: "سريع", nature: "Swift", rulingPlanet: "Ketu",
    deity: "Ashwini Kumaras", symbol: "Horse Head", element: "Fire",
    bestFor: ["Starting business", "Learning skills", "Trade", "Buying jewelry", "Medicine"],
    avoid: ["Long projects"],
    startDegree: 0, endDegree: 13.333
  },
  {
    number: 2, name: "Bharani", sanskrit: "भरणी", category: "Cruel",
    categoryArabic: "شديد", nature: "Aggressive", rulingPlanet: "Venus",
    deity: "Yama", symbol: "Yoni", element: "Fire",
    bestFor: ["Surgery", "Destroying obstacles", "Competitive actions"],
    avoid: ["Marriage", "Spiritual ceremonies", "Diplomacy"],
    startDegree: 13.333, endDegree: 26.667
  },
  {
    number: 3, name: "Krittika", sanskrit: "कृत्तिका", category: "Ordinary",
    categoryArabic: "مختلط", nature: "Mixed", rulingPlanet: "Sun",
    deity: "Agni", symbol: "Razor / Flame", element: "Fire",
    bestFor: ["Fire related work", "Metalwork", "Engineering", "Industrial processes"],
    avoid: ["Sensitive negotiations", "Marriage"],
    startDegree: 26.667, endDegree: 40
  },
  {
    number: 4, name: "Rohini", sanskrit: "रोहिणी", category: "Fixed",
    categoryArabic: "ثابت", nature: "Stable", rulingPlanet: "Moon",
    deity: "Brahma", symbol: "Chariot / Temple", element: "Earth",
    bestFor: ["Buying property", "Foundations", "Agriculture", "Long-term business", "Marriage alliances", "Government positions"],
    avoid: ["Temporary work", "Short-term trades", "Travel"],
    startDegree: 40, endDegree: 53.333
  },
  {
    number: 5, name: "Mrigashira", sanskrit: "मृगशिरा", category: "Gentle",
    categoryArabic: "لطيف", nature: "Soft", rulingPlanet: "Mars",
    deity: "Soma", symbol: "Deer Head", element: "Earth",
    bestFor: ["Marriage", "Friendship", "Music", "Education", "Social gatherings"],
    avoid: ["Aggressive actions", "Conflict"],
    startDegree: 53.333, endDegree: 66.667
  },
  {
    number: 6, name: "Ardra", sanskrit: "आर्द्रा", category: "Ferocious",
    categoryArabic: "شرس", nature: "Intense", rulingPlanet: "Rahu",
    deity: "Rudra", symbol: "Teardrop", element: "Water",
    bestFor: ["Research", "Destroying enemies", "Psychological transformation"],
    avoid: ["Marriage", "Financial deals", "Celebrations"],
    startDegree: 66.667, endDegree: 80
  },
  {
    number: 7, name: "Punarvasu", sanskrit: "पुनर्वसु", category: "Movable",
    categoryArabic: "متحرك", nature: "Dynamic", rulingPlanet: "Jupiter",
    deity: "Aditi", symbol: "Bow / Quiver", element: "Water",
    bestFor: ["Travel", "Business trade", "Changing jobs", "Moving house", "Negotiations"],
    avoid: ["Foundations", "Real estate", "Permanent commitments"],
    startDegree: 80, endDegree: 93.333
  },
  {
    number: 8, name: "Pushya", sanskrit: "पुष्य", category: "Short",
    categoryArabic: "سريع", nature: "Swift", rulingPlanet: "Saturn",
    deity: "Brihaspati", symbol: "Lotus / Circle", element: "Water",
    bestFor: ["Starting business", "Learning skills", "Trade", "Creative arts", "Medicine"],
    avoid: ["Long projects", "Marriage"],
    startDegree: 93.333, endDegree: 106.667
  },
  {
    number: 9, name: "Ashlesha", sanskrit: "आश्लेषा", category: "Ferocious",
    categoryArabic: "شرس", nature: "Intense", rulingPlanet: "Mercury",
    deity: "Nagas", symbol: "Serpent", element: "Water",
    bestFor: ["Research", "Tantra", "Psychological transformation"],
    avoid: ["Marriage", "Financial deals", "Celebrations"],
    startDegree: 106.667, endDegree: 120
  },
  {
    number: 10, name: "Magha", sanskrit: "मघा", category: "Cruel",
    categoryArabic: "شديد", nature: "Aggressive", rulingPlanet: "Ketu",
    deity: "Pitris", symbol: "Throne", element: "Fire",
    bestFor: ["Surgery", "Military acts", "Destroying obstacles", "Competitive actions"],
    avoid: ["Marriage", "Spiritual ceremonies", "Diplomacy"],
    startDegree: 120, endDegree: 133.333
  },
  {
    number: 11, name: "Purva Phalguni", sanskrit: "पूर्वफाल्गुनी", category: "Cruel",
    categoryArabic: "شديد", nature: "Aggressive", rulingPlanet: "Venus",
    deity: "Bhaga", symbol: "Hammock", element: "Fire",
    bestFor: ["Surgery", "Competitive actions", "Fire or chemical work"],
    avoid: ["Marriage", "Spiritual ceremonies", "Diplomacy"],
    startDegree: 133.333, endDegree: 146.667
  },
  {
    number: 12, name: "Uttara Phalguni", sanskrit: "उत्तरफाल्गुनी", category: "Fixed",
    categoryArabic: "ثابت", nature: "Stable", rulingPlanet: "Sun",
    deity: "Aryaman", symbol: "Bed", element: "Fire",
    bestFor: ["Buying property", "Foundations", "Agriculture", "Long-term business", "Marriage alliances"],
    avoid: ["Temporary work", "Short-term trades", "Travel"],
    startDegree: 146.667, endDegree: 160
  },
  {
    number: 13, name: "Hasta", sanskrit: "हस्ता", category: "Short",
    categoryArabic: "سريع", nature: "Swift", rulingPlanet: "Moon",
    deity: "Savitar", symbol: "Open Hand", element: "Earth",
    bestFor: ["Starting business", "Learning skills", "Trade", "Buying jewelry", "Creative arts"],
    avoid: ["Long projects"],
    startDegree: 160, endDegree: 173.333
  },
  {
    number: 14, name: "Chitra", sanskrit: "चित्रा", category: "Gentle",
    categoryArabic: "لطيف", nature: "Soft", rulingPlanet: "Mars",
    deity: "Tvashtar", symbol: "Bright Jewel", element: "Earth",
    bestFor: ["Marriage", "Friendship", "Music", "Education", "Social gatherings"],
    avoid: ["Aggressive actions", "Conflict"],
    startDegree: 173.333, endDegree: 186.667
  },
  {
    number: 15, name: "Swati", sanskrit: "स्वाती", category: "Movable",
    categoryArabic: "متحرك", nature: "Dynamic", rulingPlanet: "Rahu",
    deity: "Vayu", symbol: "Coral / Sapphire", element: "Air",
    bestFor: ["Travel", "Transport", "Business trade", "Changing jobs", "Moving house"],
    avoid: ["Foundations", "Real estate", "Permanent commitments"],
    startDegree: 186.667, endDegree: 200
  },
  {
    number: 16, name: "Vishakha", sanskrit: "विशाखा", category: "Ordinary",
    categoryArabic: "مختلط", nature: "Mixed", rulingPlanet: "Jupiter",
    deity: "Indra-Agni", symbol: "Archway", element: "Air",
    bestFor: ["Fire related work", "Metalwork", "Engineering", "Industrial processes"],
    avoid: ["Sensitive negotiations", "Marriage"],
    startDegree: 200, endDegree: 213.333
  },
  {
    number: 17, name: "Anuradha", sanskrit: "अनुराधा", category: "Gentle",
    categoryArabic: "لطيف", nature: "Soft", rulingPlanet: "Saturn",
    deity: "Mitra", symbol: "Lotus", element: "Air",
    bestFor: ["Marriage", "Friendship", "Music", "Education", "Social gatherings"],
    avoid: ["Aggressive actions", "Conflict"],
    startDegree: 213.333, endDegree: 226.667
  },
  {
    number: 18, name: "Jyeshtha", sanskrit: "ज्येष्ठा", category: "Ferocious",
    categoryArabic: "شرس", nature: "Intense", rulingPlanet: "Mercury",
    deity: "Indra", symbol: "Earring / Umbrella", element: "Air",
    bestFor: ["Research", "Destroying enemies", "Psychological transformation"],
    avoid: ["Marriage", "Financial deals", "Celebrations"],
    startDegree: 226.667, endDegree: 240
  },
  {
    number: 19, name: "Mula", sanskrit: "मूला", category: "Ferocious",
    categoryArabic: "شرس", nature: "Intense", rulingPlanet: "Ketu",
    deity: "Nirriti", symbol: "Tied Roots", element: "Fire",
    bestFor: ["Research", "Tantra", "Destroying enemies", "Transformation"],
    avoid: ["Marriage", "Financial deals", "Celebrations"],
    startDegree: 240, endDegree: 253.333
  },
  {
    number: 20, name: "Purva Ashadha", sanskrit: "पूर्वाषाढा", category: "Cruel",
    categoryArabic: "شديد", nature: "Aggressive", rulingPlanet: "Venus",
    deity: "Apas", symbol: "Fan / Winnowing Basket", element: "Fire",
    bestFor: ["Surgery", "Military acts", "Competitive actions"],
    avoid: ["Marriage", "Spiritual ceremonies", "Diplomacy"],
    startDegree: 253.333, endDegree: 266.667
  },
  {
    number: 21, name: "Uttara Ashadha", sanskrit: "उत्तराषाढा", category: "Fixed",
    categoryArabic: "ثابت", nature: "Stable", rulingPlanet: "Sun",
    deity: "Vishvadevas", symbol: "Elephant Tusk", element: "Fire",
    bestFor: ["Buying property", "Foundations", "Long-term business", "Government positions"],
    avoid: ["Temporary work", "Short-term trades", "Travel"],
    startDegree: 266.667, endDegree: 280
  },
  {
    number: 22, name: "Shravana", sanskrit: "श्रवण", category: "Movable",
    categoryArabic: "متحرك", nature: "Dynamic", rulingPlanet: "Moon",
    deity: "Vishnu", symbol: "Three Footprints / Ear", element: "Earth",
    bestFor: ["Travel", "Business trade", "Changing jobs", "Negotiations"],
    avoid: ["Foundations", "Real estate", "Permanent commitments"],
    startDegree: 280, endDegree: 293.333
  },
  {
    number: 23, name: "Dhanishtha", sanskrit: "धनिष्ठा", category: "Movable",
    categoryArabic: "متحرك", nature: "Dynamic", rulingPlanet: "Mars",
    deity: "Vasus", symbol: "Drum", element: "Earth",
    bestFor: ["Travel", "Transport", "Business trade", "Moving house"],
    avoid: ["Foundations", "Real estate", "Permanent commitments"],
    startDegree: 293.333, endDegree: 306.667
  },
  {
    number: 24, name: "Shatabhisha", sanskrit: "शतभिषा", category: "Movable",
    categoryArabic: "متحرك", nature: "Dynamic", rulingPlanet: "Rahu",
    deity: "Varuna", symbol: "Circle / 100 Flowers", element: "Water",
    bestFor: ["Travel", "Business trade", "Changing jobs", "Negotiations"],
    avoid: ["Foundations", "Real estate", "Permanent commitments"],
    startDegree: 306.667, endDegree: 320
  },
  {
    number: 25, name: "Purva Bhadrapada", sanskrit: "पूर्वभाद्रपदा", category: "Cruel",
    categoryArabic: "شديد", nature: "Aggressive", rulingPlanet: "Jupiter",
    deity: "Aja Ekapada", symbol: "Sword / Two-faced Man", element: "Water",
    bestFor: ["Surgery", "Destroying obstacles", "Competitive actions"],
    avoid: ["Marriage", "Spiritual ceremonies", "Diplomacy"],
    startDegree: 320, endDegree: 333.333
  },
  {
    number: 26, name: "Uttara Bhadrapada", sanskrit: "उत्तरभाद्रपदा", category: "Fixed",
    categoryArabic: "ثابت", nature: "Stable", rulingPlanet: "Saturn",
    deity: "Ahir Budhnya", symbol: "Serpent / Back Legs of Bed", element: "Water",
    bestFor: ["Buying property", "Foundations", "Agriculture", "Long-term business", "Spiritual vows"],
    avoid: ["Temporary work", "Short-term trades", "Travel"],
    startDegree: 333.333, endDegree: 346.667
  },
  {
    number: 27, name: "Revati", sanskrit: "रेवती", category: "Gentle",
    categoryArabic: "لطيف", nature: "Soft", rulingPlanet: "Mercury",
    deity: "Pushan", symbol: "Fish / Drum", element: "Water",
    bestFor: ["Marriage", "Friendship", "Music", "Education", "Social gatherings"],
    avoid: ["Aggressive actions", "Conflict"],
    startDegree: 346.667, endDegree: 360
  },
];

export function getNakshatraFromLongitude(siderealLongitude: number): Nakshatra {
  const lon = ((siderealLongitude % 360) + 360) % 360;
  const nakshatraSize = 360 / 27;
  const index = Math.floor(lon / nakshatraSize);
  const safeIndex = Math.max(0, Math.min(26, index));
  return NAKSHATRAS[safeIndex];
}

export function getNakshatraProgress(siderealLongitude: number): { nakshatra: Nakshatra; progressPercent: number; degreesRemaining: number } {
  const lon = ((siderealLongitude % 360) + 360) % 360;
  const nakshatraSize = 360 / 27;
  const index = Math.floor(lon / nakshatraSize);
  const safeIndex = Math.max(0, Math.min(26, index));
  const positionInNakshatra = lon - (safeIndex * nakshatraSize);
  const progressPercent = (positionInNakshatra / nakshatraSize) * 100;
  const degreesRemaining = nakshatraSize - positionInNakshatra;
  return {
    nakshatra: NAKSHATRAS[safeIndex],
    progressPercent,
    degreesRemaining
  };
}
