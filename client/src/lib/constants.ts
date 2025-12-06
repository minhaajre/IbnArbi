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

export const ELEMENT_RULES = {
  Fire: ["Aries", "Leo", "Sagittarius"],
  Earth: ["Taurus", "Virgo", "Capricorn"],
  Air: ["Gemini", "Libra", "Aquarius"],
  Water: ["Cancer", "Scorpio", "Pisces"]
};

export const ELEMENT_ACTIVITIES = {
  Fire: "Take action, start new projects, exercise, lead",
  Earth: "Ground yourself, handle finances, organize, garden",
  Air: "Communicate, study, socialize, plan",
  Water: "Reflect, meditate, create art, connect emotionally"
};

export const API_KEY = "e511b43a614249ea9efbcda01488f374";
