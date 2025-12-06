import { Search, Sun, Moon, Circle, Eclipse, Star, Cloud, CloudRain, Zap, Snowflake, Wind } from "lucide-react";

export const IBN_ARABI_MANSIONS = [
  {
    number: 1,
    name: "Al-Sharatain",
    arabic: "الشراطان",
    meaning: "The Two Signs",
    attribute: "Divine Essence (The Preserver)",
    letter: "Hamza & Alef",
    degrees: "0° Aries",
    description: "The beginning of the cycle. Represents the First Intellect and the Universal Pen."
  },
  {
    number: 2,
    name: "Al-Butain",
    arabic: "البطين",
    meaning: "The Belly",
    attribute: "The One Who Calls Forth",
    letter: "Hâ'",
    degrees: "12°51' Aries",
    description: "Associated with the Universal Soul and the Preserved Tablet."
  },
  {
    number: 3,
    name: "Al-Thurayya",
    arabic: "الثريا",
    meaning: "The Pleiades",
    attribute: "Primordial Nature",
    letter: "Ain",
    degrees: "25°42' Aries",
    description: "The Many Little Ones. Represents the multiplicity emerging from unity."
  },
  {
    number: 4,
    name: "Al-Dabaran",
    arabic: "الدبران",
    meaning: "The Follower",
    attribute: "Universal Matter",
    letter: "Haa",
    degrees: "8°34' Taurus",
    description: "Follows the Pleiades. Represents the raw material of the universe."
  },
  {
    number: 5,
    name: "Al-Haq'ah",
    arabic: "الهقعة",
    meaning: "The White Spot",
    attribute: "The Ninth Heaven",
    letter: "Ghain",
    degrees: "21°25' Taurus",
    description: "The mark on the horse. Represents the highest sphere."
  },
  {
    number: 6,
    name: "Al-Han'ah",
    arabic: "الهنعة",
    meaning: "The Brand",
    attribute: "The Sphere of Fixed Stars",
    letter: "Kha",
    degrees: "4°17' Gemini",
    description: "The mark on the camel. Represents the patterns of destiny."
  },
  {
    number: 7,
    name: "Al-Dhira",
    arabic: "الذراع",
    meaning: "The Forearm",
    attribute: "The All-Encompassing",
    letter: "Qaf",
    degrees: "17°08' Gemini",
    description: "The Throne of God in Ibn Arabi's cosmology."
  },
  {
    number: 8,
    name: "Al-Nathrah",
    arabic: "النثرة",
    meaning: "The Gap",
    attribute: "The Footstool",
    letter: "Kaf",
    degrees: "0° Cancer",
    description: "The mist or gap. Represents the pedestal of the universe."
  },
  {
    number: 9,
    name: "Al-Tarf",
    arabic: "الطرف",
    meaning: "The Glance",
    attribute: "The Independent",
    letter: "Jeem",
    degrees: "12°51' Cancer",
    description: "The eye of the lion. Represents the Starless Sky."
  },
  {
    number: 10,
    name: "Al-Jabhah",
    arabic: "الجبهة",
    meaning: "The Forehead",
    attribute: "The Powerful",
    letter: "Sheen",
    degrees: "25°42' Cancer",
    description: "The forehead of the lion. Represents the Sphere of Stations."
  },
  {
    number: 11,
    name: "Al-Zubrah",
    arabic: "الزبرة",
    meaning: "The Mane",
    attribute: "The Knowing",
    letter: "Ya",
    degrees: "8°34' Leo",
    description: "The mane of the lion. Associated with divine knowledge."
  },
  {
    number: 12,
    name: "Al-Sarfah",
    arabic: "الصرفة",
    meaning: "The Turner",
    attribute: "The Willing",
    letter: "Dad",
    degrees: "21°25' Leo",
    description: "The weather changer. Represents divine will."
  },
  {
    number: 13,
    name: "Al-Awwa",
    arabic: "العواء",
    meaning: "The Barker",
    attribute: "The Living",
    letter: "Lam",
    degrees: "4°17' Virgo",
    description: "The barking dog. Represents life and vitality."
  },
  {
    number: 14,
    name: "Al-Simak",
    arabic: "السماك",
    meaning: "The Uplifted",
    attribute: "The Speaking",
    letter: "Nun",
    degrees: "17°08' Virgo",
    description: "The unarmed one. Represents divine speech."
  },
  {
    number: 15,
    name: "Al-Ghafr",
    arabic: "الغفر",
    meaning: "The Covering",
    attribute: "The Hearing",
    letter: "Ra",
    degrees: "0° Libra",
    description: "The veil or covering. Represents divine hearing."
  },
  {
    number: 16,
    name: "Al-Zubana",
    arabic: "الزبانى",
    meaning: "The Claws",
    attribute: "The Seeing",
    letter: "Ta",
    degrees: "12°51' Libra",
    description: "The scorpion's claws. Represents divine sight."
  },
  {
    number: 17,
    name: "Al-Iklil",
    arabic: "الإكليل",
    meaning: "The Crown",
    attribute: "The Clarifying",
    letter: "Dal",
    degrees: "25°42' Libra",
    description: "The crown of the scorpion. Associated with the Moon sphere."
  },
  {
    number: 18,
    name: "Al-Qalb",
    arabic: "القلب",
    meaning: "The Heart",
    attribute: "The Seizer",
    letter: "Ta (emphatic)",
    degrees: "8°34' Scorpio",
    description: "The heart of the scorpion. Represents the Sphere of Ether."
  },
  {
    number: 19,
    name: "Al-Shaulah",
    arabic: "الشولة",
    meaning: "The Sting",
    attribute: "The Expander",
    letter: "Zay",
    degrees: "21°25' Scorpio",
    description: "The scorpion's sting. Represents expansion and release."
  },
  {
    number: 20,
    name: "Al-Na'am",
    arabic: "النعائم",
    meaning: "The Ostriches",
    attribute: "The Life-Giver",
    letter: "Sin",
    degrees: "4°17' Sagittarius",
    description: "The ostriches going to water. Represents the element of Water."
  },
  {
    number: 21,
    name: "Al-Baldah",
    arabic: "البلدة",
    meaning: "The City",
    attribute: "The Death-Giver",
    letter: "Sad",
    degrees: "17°08' Sagittarius",
    description: "The empty city. Represents endings and the element of Earth."
  },
  {
    number: 22,
    name: "Sa'd al-Dhabih",
    arabic: "سعد الذابح",
    meaning: "Fortune of the Slayer",
    attribute: "The Nourisher",
    letter: "Za (emphatic)",
    degrees: "0° Capricorn",
    description: "The lucky one of the slaughterers. Represents sustenance."
  },
  {
    number: 23,
    name: "Sa'd Bula",
    arabic: "سعد بلع",
    meaning: "Fortune of the Glutton",
    attribute: "The Reckoner",
    letter: "Thal",
    degrees: "12°51' Capricorn",
    description: "The lucky swallower. Represents calculation and accounting."
  },
  {
    number: 24,
    name: "Sa'd al-Su'ud",
    arabic: "سعد السعود",
    meaning: "Fortune of Fortunes",
    attribute: "The Restorer",
    letter: "Tha",
    degrees: "25°42' Capricorn",
    description: "The luckiest of the lucky. Represents restoration."
  },
  {
    number: 25,
    name: "Sa'd al-Akhbiyah",
    arabic: "سعد الأخبية",
    meaning: "Fortune of Tents",
    attribute: "The Avenger",
    letter: "Fa",
    degrees: "8°34' Aquarius",
    description: "The lucky stars of the tents. Hidden things revealed."
  },
  {
    number: 26,
    name: "Al-Fargh al-Muqaddam",
    arabic: "الفرغ المقدم",
    meaning: "The Fore Spout",
    attribute: "The Gatherer",
    letter: "Ba",
    degrees: "21°25' Aquarius",
    description: "The front mouth of the bucket. Represents gathering together."
  },
  {
    number: 27,
    name: "Al-Fargh al-Mu'akhkhar",
    arabic: "الفرغ المؤخر",
    meaning: "The Rear Spout",
    attribute: "The Unique",
    letter: "Mim",
    degrees: "4°17' Pisces",
    description: "The rear mouth of the bucket. Represents uniqueness."
  },
  {
    number: 28,
    name: "Batn al-Hut",
    arabic: "بطن الحوت",
    meaning: "Belly of the Fish",
    attribute: "The Finder",
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

export const PLANET_STATUS_RULES = {
  Sun: { exaltation: "Aries", debilitation: "Libra", exaltationDegree: 10, debilitationDegree: 10 },
  Moon: { exaltation: "Taurus", debilitation: "Scorpio", exaltationDegree: 3, debilitationDegree: 3 },
  Mars: { exaltation: "Capricorn", debilitation: "Cancer", exaltationDegree: 28, debilitationDegree: 28 },
  Mercury: { exaltation: "Virgo", debilitation: "Pisces", exaltationDegree: 15, debilitationDegree: 15 },
  Jupiter: { exaltation: "Cancer", debilitation: "Capricorn", exaltationDegree: 5, debilitationDegree: 5 },
  Venus: { exaltation: "Pisces", debilitation: "Virgo", exaltationDegree: 27, debilitationDegree: 27 },
  Saturn: { exaltation: "Libra", debilitation: "Aries", exaltationDegree: 20, debilitationDegree: 20 }
};

export const SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export const API_KEY = "e511b43a614249ea9efbcda01488f374";
