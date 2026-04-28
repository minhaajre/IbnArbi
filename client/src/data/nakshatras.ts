// Deity context sourced from Brihat Parashara Hora Shastra (BPHS), Ch. 3–4.
// Etymological meanings from Sanskrit lexicography (Monier-Williams, Apte).
export interface Nakshatra {
  number: number;
  name: string;
  sanskrit: string;
  meaning: string;       // etymological meaning of the Sanskrit name
  category: string;
  categoryArabic: string;
  nature: string;
  rulingPlanet: string;
  deity: string;
  deityContext: string;  // spiritual role of the presiding deity per BPHS
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
    number: 1, name: "Ashwini", sanskrit: "अश्विनी", meaning: "Born of a horse; the horse-woman",
    category: "Short", categoryArabic: "سريع", nature: "Swift", rulingPlanet: "Ketu",
    deity: "Ashwini Kumaras", deityContext: "The divine twin physicians, sons of the Sun god; BPHS names them healers of the gods who restore youth, vitality, and swift renewal.",
    symbol: "Horse Head", element: "Fire",
    bestFor: ["Starting business", "Learning skills", "Trade", "Buying jewelry", "Medicine"],
    avoid: ["Long projects"],
    startDegree: 0, endDegree: 13.333
  },
  {
    number: 2, name: "Bharani", sanskrit: "भरणी", meaning: "The bearer; she who carries and sustains",
    category: "Cruel", categoryArabic: "شديد", nature: "Aggressive", rulingPlanet: "Venus",
    deity: "Yama", deityContext: "Lord of dharma and death; BPHS describes Yama as the impartial judge who weighs karma and governs restraint, moral accountability, and transformation through endings.",
    symbol: "Yoni", element: "Fire",
    bestFor: ["Surgery", "Destroying obstacles", "Competitive actions"],
    avoid: ["Marriage", "Spiritual ceremonies", "Diplomacy"],
    startDegree: 13.333, endDegree: 26.667
  },
  {
    number: 3, name: "Krittika", sanskrit: "कृत्तिका", meaning: "The cutters; the Pleiades star cluster",
    category: "Ordinary", categoryArabic: "مختلط", nature: "Mixed", rulingPlanet: "Sun",
    deity: "Agni", deityContext: "God of sacred fire and purification; BPHS places Agni as the cosmic priest whose flame cuts impurity, receives sacrifice, and carries offerings to the divine realm.",
    symbol: "Razor / Flame", element: "Fire",
    bestFor: ["Fire related work", "Metalwork", "Engineering", "Industrial processes"],
    avoid: ["Sensitive negotiations", "Marriage"],
    startDegree: 26.667, endDegree: 40
  },
  {
    number: 4, name: "Rohini", sanskrit: "रोहिणी", meaning: "The red one; she who is rising and flourishing",
    category: "Fixed", categoryArabic: "ثابت", nature: "Stable", rulingPlanet: "Moon",
    deity: "Brahma", deityContext: "The creator-god and lord of Prajapati; BPHS describes Brahma as the source of all manifest creation, bestowing fertility, abundance, and the power to establish lasting forms.",
    symbol: "Chariot / Temple", element: "Earth",
    bestFor: ["Buying property", "Foundations", "Agriculture", "Long-term business", "Marriage alliances", "Government positions"],
    avoid: ["Temporary work", "Short-term trades", "Travel"],
    startDegree: 40, endDegree: 53.333
  },
  {
    number: 5, name: "Mrigashira", sanskrit: "मृगशिरा", meaning: "The deer's head; the antelope's brow",
    category: "Gentle", categoryArabic: "لطيف", nature: "Soft", rulingPlanet: "Mars",
    deity: "Soma", deityContext: "The Moon deity and lord of plants and nectar; BPHS names Soma as the wandering seeker whose gentle light nourishes perception, longing, and the quest for beauty.",
    symbol: "Deer Head", element: "Earth",
    bestFor: ["Marriage", "Friendship", "Music", "Education", "Social gatherings"],
    avoid: ["Aggressive actions", "Conflict"],
    startDegree: 53.333, endDegree: 66.667
  },
  {
    number: 6, name: "Ardra", sanskrit: "आर्द्रा", meaning: "The moist one; the fresh and tender",
    category: "Ferocious", categoryArabic: "شرس", nature: "Intense", rulingPlanet: "Rahu",
    deity: "Rudra", deityContext: "The fierce storm deity, a wild form of Shiva; BPHS describes Rudra as the one who howls and dismantles, presiding over upheaval that clears the ground for radical renewal.",
    symbol: "Teardrop", element: "Water",
    bestFor: ["Research", "Destroying enemies", "Psychological transformation"],
    avoid: ["Marriage", "Financial deals", "Celebrations"],
    startDegree: 66.667, endDegree: 80
  },
  {
    number: 7, name: "Punarvasu", sanskrit: "पुनर्वसु", meaning: "Return of the light; restoration of goods and dwelling",
    category: "Movable", categoryArabic: "متحرك", nature: "Dynamic", rulingPlanet: "Jupiter",
    deity: "Aditi", deityContext: "The boundless mother goddess, mother of all gods; BPHS names Aditi as the infinite and inexhaustible source who grants restoration, freedom, and renewed expansion after difficulty.",
    symbol: "Bow / Quiver", element: "Water",
    bestFor: ["Travel", "Business trade", "Changing jobs", "Moving house", "Negotiations"],
    avoid: ["Foundations", "Real estate", "Permanent commitments"],
    startDegree: 80, endDegree: 93.333
  },
  {
    number: 8, name: "Pushya", sanskrit: "पुष्य", meaning: "The nourisher; the flower in full bloom",
    category: "Short", categoryArabic: "سريع", nature: "Swift", rulingPlanet: "Saturn",
    deity: "Brihaspati", deityContext: "Guru of the gods and lord of sacred speech; BPHS places Brihaspati as the divine teacher whose wisdom nourishes the soul, grants dharmic clarity, and strengthens devotion.",
    symbol: "Lotus / Circle", element: "Water",
    bestFor: ["Starting business", "Learning skills", "Trade", "Creative arts", "Medicine"],
    avoid: ["Long projects", "Marriage"],
    startDegree: 93.333, endDegree: 106.667
  },
  {
    number: 9, name: "Ashlesha", sanskrit: "आश्लेषा", meaning: "The embracer; the clinging and entwining one",
    category: "Ferocious", categoryArabic: "شرس", nature: "Intense", rulingPlanet: "Mercury",
    deity: "Nagas", deityContext: "The serpent deities, guardians of hidden knowledge and the earth's depths; BPHS names the Nagas as keepers of secret wisdom, kundalini energy, and penetrating, coiled insight.",
    symbol: "Serpent", element: "Water",
    bestFor: ["Research", "Tantra", "Psychological transformation"],
    avoid: ["Marriage", "Financial deals", "Celebrations"],
    startDegree: 106.667, endDegree: 120
  },
  {
    number: 10, name: "Magha", sanskrit: "मघा", meaning: "The mighty; the magnificent and great",
    category: "Cruel", categoryArabic: "شديد", nature: "Aggressive", rulingPlanet: "Ketu",
    deity: "Pitris", deityContext: "The ancestral spirits and forebears of humanity; BPHS describes the Pitris as guardians of lineage and tradition who confer authority, ancestral blessings, and the power of inherited legacy.",
    symbol: "Throne", element: "Fire",
    bestFor: ["Surgery", "Military acts", "Destroying obstacles", "Competitive actions"],
    avoid: ["Marriage", "Spiritual ceremonies", "Diplomacy"],
    startDegree: 120, endDegree: 133.333
  },
  {
    number: 11, name: "Purva Phalguni", sanskrit: "पूर्वफाल्गुनी", meaning: "The former fig tree; the earlier reddish one",
    category: "Cruel", categoryArabic: "شديد", nature: "Aggressive", rulingPlanet: "Venus",
    deity: "Bhaga", deityContext: "God of marital bliss, prosperity, and good fortune; BPHS names Bhaga as the one who grants enjoyment, creative pleasure, and the wealth that comes through union and inheritance.",
    symbol: "Hammock", element: "Fire",
    bestFor: ["Surgery", "Competitive actions", "Fire or chemical work"],
    avoid: ["Marriage", "Spiritual ceremonies", "Diplomacy"],
    startDegree: 133.333, endDegree: 146.667
  },
  {
    number: 12, name: "Uttara Phalguni", sanskrit: "उत्तरफाल्गुनी", meaning: "The latter fig tree; the later reddish one",
    category: "Fixed", categoryArabic: "ثابت", nature: "Stable", rulingPlanet: "Sun",
    deity: "Aryaman", deityContext: "God of patronage, hospitality, and binding contracts; BPHS describes Aryaman as the upholder of social bonds who governs lasting agreements, noble friendship, and enduring obligations.",
    symbol: "Bed", element: "Fire",
    bestFor: ["Buying property", "Foundations", "Agriculture", "Long-term business", "Marriage alliances"],
    avoid: ["Temporary work", "Short-term trades", "Travel"],
    startDegree: 146.667, endDegree: 160
  },
  {
    number: 13, name: "Hasta", sanskrit: "हस्ता", meaning: "The hand; the open palm",
    category: "Short", categoryArabic: "سريع", nature: "Swift", rulingPlanet: "Moon",
    deity: "Savitar", deityContext: "The creative form of the Sun as the divine craftsman and animating impulse; BPHS names Savitar as the one who activates and sets in motion, governing skill, dexterity, and the daily rhythm of craft.",
    symbol: "Open Hand", element: "Earth",
    bestFor: ["Starting business", "Learning skills", "Trade", "Buying jewelry", "Creative arts"],
    avoid: ["Long projects"],
    startDegree: 160, endDegree: 173.333
  },
  {
    number: 14, name: "Chitra", sanskrit: "चित्रा", meaning: "The bright and variegated; the distinguished jewel",
    category: "Gentle", categoryArabic: "لطيف", nature: "Soft", rulingPlanet: "Mars",
    deity: "Tvashtar", deityContext: "The divine architect and celestial craftsman (Vishvakarman); BPHS names Tvashtar as the fashioner of cosmic forms who governs beauty, artistry, and the creation of wondrous things.",
    symbol: "Bright Jewel", element: "Earth",
    bestFor: ["Marriage", "Friendship", "Music", "Education", "Social gatherings"],
    avoid: ["Aggressive actions", "Conflict"],
    startDegree: 173.333, endDegree: 186.667
  },
  {
    number: 15, name: "Swati", sanskrit: "स्वाती", meaning: "The pure one; the sword; the self-going star",
    category: "Movable", categoryArabic: "متحرك", nature: "Dynamic", rulingPlanet: "Rahu",
    deity: "Vayu", deityContext: "God of wind, breath, and the vital life force (prana); BPHS describes Vayu as the invisible mover who governs flexibility, independence, circulation, and the unbound quality of open space.",
    symbol: "Coral / Sapphire", element: "Air",
    bestFor: ["Travel", "Transport", "Business trade", "Changing jobs", "Moving house"],
    avoid: ["Foundations", "Real estate", "Permanent commitments"],
    startDegree: 186.667, endDegree: 200
  },
  {
    number: 16, name: "Vishakha", sanskrit: "विशाखा", meaning: "The forked branch; the two-branched and divided",
    category: "Ordinary", categoryArabic: "مختلط", nature: "Mixed", rulingPlanet: "Jupiter",
    deity: "Indra-Agni", deityContext: "The joint deity of heavenly sovereignty (Indra) and sacred fire (Agni); BPHS names this dual force as the union of royal will and transformative power, governing ambition and the drive to achieve.",
    symbol: "Archway", element: "Air",
    bestFor: ["Fire related work", "Metalwork", "Engineering", "Industrial processes"],
    avoid: ["Sensitive negotiations", "Marriage"],
    startDegree: 200, endDegree: 213.333
  },
  {
    number: 17, name: "Anuradha", sanskrit: "अनुराधा", meaning: "Following Radha; subsequent success and good fortune",
    category: "Gentle", categoryArabic: "لطيف", nature: "Soft", rulingPlanet: "Saturn",
    deity: "Mitra", deityContext: "God of friendship, covenants, and the binding light of day; BPHS names Mitra as the one who upholds trust and mutual loyalty, governing sincere cooperation and devotion between allies.",
    symbol: "Lotus", element: "Air",
    bestFor: ["Marriage", "Friendship", "Music", "Education", "Social gatherings"],
    avoid: ["Aggressive actions", "Conflict"],
    startDegree: 213.333, endDegree: 226.667
  },
  {
    number: 18, name: "Jyeshtha", sanskrit: "ज्येष्ठा", meaning: "The eldest; the chief and most senior",
    category: "Ferocious", categoryArabic: "شرس", nature: "Intense", rulingPlanet: "Mercury",
    deity: "Indra", deityContext: "King of the gods and lord of heaven; BPHS describes Indra as the sovereign who wields the thunderbolt, governing the power of authority, the courage to face adversaries, and mastery over all obstacles.",
    symbol: "Earring / Umbrella", element: "Air",
    bestFor: ["Research", "Destroying enemies", "Psychological transformation"],
    avoid: ["Marriage", "Financial deals", "Celebrations"],
    startDegree: 226.667, endDegree: 240
  },
  {
    number: 19, name: "Mula", sanskrit: "मूला", meaning: "The root; the foundation and origin",
    category: "Ferocious", categoryArabic: "شرس", nature: "Intense", rulingPlanet: "Ketu",
    deity: "Nirriti", deityContext: "Goddess of dissolution, the formless, and the void; BPHS names Nirriti as the one who presides over decomposition and chaos so that deeper roots may be exposed and true foundations rebuilt.",
    symbol: "Tied Roots", element: "Fire",
    bestFor: ["Research", "Tantra", "Destroying enemies", "Transformation"],
    avoid: ["Marriage", "Financial deals", "Celebrations"],
    startDegree: 240, endDegree: 253.333
  },
  {
    number: 20, name: "Purva Ashadha", sanskrit: "पूर्वाषाढा", meaning: "The former invincible one; the earlier undefeated",
    category: "Cruel", categoryArabic: "شديد", nature: "Aggressive", rulingPlanet: "Venus",
    deity: "Apas", deityContext: "Deity of the cosmic waters and primordial fluid; BPHS names Apas as the purifying flood that overcomes all obstacles, governing invincibility through cleansing, emotional depth, and unstoppable force.",
    symbol: "Fan / Winnowing Basket", element: "Fire",
    bestFor: ["Surgery", "Military acts", "Competitive actions"],
    avoid: ["Marriage", "Spiritual ceremonies", "Diplomacy"],
    startDegree: 253.333, endDegree: 266.667
  },
  {
    number: 21, name: "Uttara Ashadha", sanskrit: "उत्तराषाढा", meaning: "The latter invincible one; the later undefeated",
    category: "Fixed", categoryArabic: "ثابت", nature: "Stable", rulingPlanet: "Sun",
    deity: "Vishvadevas", deityContext: "The ten universal gods representing the foundational principles of cosmic order; BPHS names Vishvadevas as the collective divine force of righteousness, governing final victory and universally upheld dharma.",
    symbol: "Elephant Tusk", element: "Fire",
    bestFor: ["Buying property", "Foundations", "Long-term business", "Government positions"],
    avoid: ["Temporary work", "Short-term trades", "Travel"],
    startDegree: 266.667, endDegree: 280
  },
  {
    number: 22, name: "Shravana", sanskrit: "श्रवण", meaning: "The ear; the act of hearing and learning",
    category: "Movable", categoryArabic: "متحرك", nature: "Dynamic", rulingPlanet: "Moon",
    deity: "Vishnu", deityContext: "The cosmic preserver and sustainer of dharmic order; BPHS places Vishnu here as the all-pervasive listener who governs receptivity, the transmission of sacred knowledge, and the preservation of cosmic rhythm.",
    symbol: "Three Footprints / Ear", element: "Earth",
    bestFor: ["Travel", "Business trade", "Changing jobs", "Negotiations"],
    avoid: ["Foundations", "Real estate", "Permanent commitments"],
    startDegree: 280, endDegree: 293.333
  },
  {
    number: 23, name: "Dhanishtha", sanskrit: "धनिष्ठा", meaning: "The wealthiest; the most famous and renowned",
    category: "Movable", categoryArabic: "متحرك", nature: "Dynamic", rulingPlanet: "Mars",
    deity: "Vasus", deityContext: "The eight elemental gods of material existence (earth, water, fire, etc.); BPHS names the Vasus as bestowers of abundance, rhythm, and the material prosperity that flows through right action.",
    symbol: "Drum", element: "Earth",
    bestFor: ["Travel", "Transport", "Business trade", "Moving house"],
    avoid: ["Foundations", "Real estate", "Permanent commitments"],
    startDegree: 293.333, endDegree: 306.667
  },
  {
    number: 24, name: "Shatabhisha", sanskrit: "शतभिषा", meaning: "The hundred healers; the hundred physicians",
    category: "Movable", categoryArabic: "متحرك", nature: "Dynamic", rulingPlanet: "Rahu",
    deity: "Varuna", deityContext: "God of the cosmic ocean, night sky, and cosmic law (rita); BPHS describes Varuna as the all-seeing sovereign who governs purification, hidden knowledge, mystical healing, and the law of cause and effect.",
    symbol: "Circle / 100 Flowers", element: "Water",
    bestFor: ["Travel", "Business trade", "Changing jobs", "Negotiations"],
    avoid: ["Foundations", "Real estate", "Permanent commitments"],
    startDegree: 306.667, endDegree: 320
  },
  {
    number: 25, name: "Purva Bhadrapada", sanskrit: "पूर्वभाद्रपदा", meaning: "The former auspicious feet; the earlier lucky steps",
    category: "Cruel", categoryArabic: "شديد", nature: "Aggressive", rulingPlanet: "Jupiter",
    deity: "Aja Ekapada", deityContext: "The one-footed unborn goat, a deity of primordial lightning and transcendent sacrifice; BPHS names Aja Ekapada as the fierce force of single-pointed spiritual will and terrifying transformation.",
    symbol: "Sword / Two-faced Man", element: "Water",
    bestFor: ["Surgery", "Destroying obstacles", "Competitive actions"],
    avoid: ["Marriage", "Spiritual ceremonies", "Diplomacy"],
    startDegree: 320, endDegree: 333.333
  },
  {
    number: 26, name: "Uttara Bhadrapada", sanskrit: "उत्तरभाद्रपदा", meaning: "The latter auspicious feet; the later lucky steps",
    category: "Fixed", categoryArabic: "ثابت", nature: "Stable", rulingPlanet: "Saturn",
    deity: "Ahir Budhnya", deityContext: "The serpent dwelling at the bottom of the cosmic atmosphere, a form of the deep-water dragon; BPHS describes Ahir Budhnya as the force of depth, latent power, discipline, and wisdom that rests in the cosmic foundations.",
    symbol: "Serpent / Back Legs of Bed", element: "Water",
    bestFor: ["Buying property", "Foundations", "Agriculture", "Long-term business", "Spiritual vows"],
    avoid: ["Temporary work", "Short-term trades", "Travel"],
    startDegree: 333.333, endDegree: 346.667
  },
  {
    number: 27, name: "Revati", sanskrit: "रेवती", meaning: "The wealthy and prosperous; the abundant one",
    category: "Gentle", categoryArabic: "لطيف", nature: "Soft", rulingPlanet: "Mercury",
    deity: "Pushan", deityContext: "God of safe passage, nourishment, and the paths of the world; BPHS names Pushan as the gentle guide who illuminates roads, protects travellers, oversees journeys to completion, and grants divine nourishment.",
    symbol: "Fish / Drum", element: "Water",
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
