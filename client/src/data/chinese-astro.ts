export interface LunarMansionXiu {
  number: number;
  name: string;
  chinese: string;
  group: string;
  groupChinese: string;
  element: string;
  animal: string;
  themes: string[];
  recommended: string[];
  avoid: string[];
}

export interface HeavenlyStem {
  name: string;
  chinese: string;
  element: string;
  polarity: "Yang" | "Yin";
  themes: string[];
}

export interface EarthlyBranch {
  name: string;
  chinese: string;
  animal: string;
  emoji: string;
  element: string;
  polarity: "Yang" | "Yin";
}

export interface DayOfficer {
  name: string;
  chinese: string;
  nature: "auspicious" | "inauspicious" | "neutral";
  recommended: string[];
  avoid: string[];
}

export interface SolarTerm {
  name: string;
  chinese: string;
  season: string;
  element: string;
  sunLongitude: number;
  themes: string[];
}

export interface FiveElement {
  name: string;
  chinese: string;
  keywords: string[];
  produces: string;
  controls: string;
  season: string;
}

export const FIVE_ELEMENTS: Record<string, FiveElement> = {
  Wood: { name: "Wood", chinese: "木", keywords: ["growth", "study", "planning", "expansion"], produces: "Fire", controls: "Earth", season: "Spring" },
  Fire: { name: "Fire", chinese: "火", keywords: ["creativity", "visibility", "activity", "passion"], produces: "Earth", controls: "Metal", season: "Summer" },
  Earth: { name: "Earth", chinese: "土", keywords: ["stability", "construction", "nourishment", "grounding"], produces: "Metal", controls: "Water", season: "Late Summer" },
  Metal: { name: "Metal", chinese: "金", keywords: ["structure", "finance", "organization", "precision"], produces: "Water", controls: "Wood", season: "Autumn" },
  Water: { name: "Water", chinese: "水", keywords: ["research", "strategy", "wisdom", "adaptability"], produces: "Wood", controls: "Fire", season: "Winter" },
};

export const HEAVENLY_STEMS: HeavenlyStem[] = [
  { name: "Jiǎ", chinese: "甲", element: "Wood", polarity: "Yang", themes: ["initiative", "leadership", "new growth"] },
  { name: "Yǐ", chinese: "乙", element: "Wood", polarity: "Yin", themes: ["flexibility", "diplomacy", "gentle growth"] },
  { name: "Bǐng", chinese: "丙", element: "Fire", polarity: "Yang", themes: ["brilliance", "visibility", "bold action"] },
  { name: "Dīng", chinese: "丁", element: "Fire", polarity: "Yin", themes: ["refinement", "inner clarity", "craft"] },
  { name: "Wù", chinese: "戊", element: "Earth", polarity: "Yang", themes: ["stability", "foundations", "large projects"] },
  { name: "Jǐ", chinese: "己", element: "Earth", polarity: "Yin", themes: ["nourishment", "cultivation", "patience"] },
  { name: "Gēng", chinese: "庚", element: "Metal", polarity: "Yang", themes: ["decisiveness", "reform", "finance"] },
  { name: "Xīn", chinese: "辛", element: "Metal", polarity: "Yin", themes: ["precision", "beauty", "detail work"] },
  { name: "Rén", chinese: "壬", element: "Water", polarity: "Yang", themes: ["flow", "strategy", "networking"] },
  { name: "Guǐ", chinese: "癸", element: "Water", polarity: "Yin", themes: ["intuition", "research", "contemplation"] },
];

export const EARTHLY_BRANCHES: EarthlyBranch[] = [
  { name: "Zǐ", chinese: "子", animal: "Rat", emoji: "🐀", element: "Water", polarity: "Yang" },
  { name: "Chǒu", chinese: "丑", animal: "Ox", emoji: "🐂", element: "Earth", polarity: "Yin" },
  { name: "Yín", chinese: "寅", animal: "Tiger", emoji: "🐅", element: "Wood", polarity: "Yang" },
  { name: "Mǎo", chinese: "卯", animal: "Rabbit", emoji: "🐇", element: "Wood", polarity: "Yin" },
  { name: "Chén", chinese: "辰", animal: "Dragon", emoji: "🐉", element: "Earth", polarity: "Yang" },
  { name: "Sì", chinese: "巳", animal: "Snake", emoji: "🐍", element: "Fire", polarity: "Yin" },
  { name: "Wǔ", chinese: "午", animal: "Horse", emoji: "🐴", element: "Fire", polarity: "Yang" },
  { name: "Wèi", chinese: "未", animal: "Goat", emoji: "🐐", element: "Earth", polarity: "Yin" },
  { name: "Shēn", chinese: "申", animal: "Monkey", emoji: "🐒", element: "Metal", polarity: "Yang" },
  { name: "Yǒu", chinese: "酉", animal: "Rooster", emoji: "🐓", element: "Metal", polarity: "Yin" },
  { name: "Xū", chinese: "戌", animal: "Dog", emoji: "🐕", element: "Earth", polarity: "Yang" },
  { name: "Hài", chinese: "亥", animal: "Pig", emoji: "🐖", element: "Water", polarity: "Yin" },
];

export const DAY_OFFICERS: DayOfficer[] = [
  { name: "Establish", chinese: "建", nature: "auspicious", recommended: ["starting projects", "planning", "setting intentions"], avoid: ["demolition", "endings"] },
  { name: "Remove", chinese: "除", nature: "auspicious", recommended: ["clearing obstacles", "cleaning", "medical treatment", "detox"], avoid: ["starting new ventures", "construction"] },
  { name: "Full", chinese: "满", nature: "auspicious", recommended: ["celebrations", "opening business", "trade", "harvesting"], avoid: ["litigation", "funerals"] },
  { name: "Balance", chinese: "平", nature: "neutral", recommended: ["routine tasks", "maintenance", "minor repairs"], avoid: ["major decisions", "large investments"] },
  { name: "Stable", chinese: "定", nature: "auspicious", recommended: ["long-term commitments", "construction", "buying property", "contracts"], avoid: ["travel", "litigation"] },
  { name: "Initiate", chinese: "执", nature: "neutral", recommended: ["building", "craftsmanship", "construction", "planting"], avoid: ["finance", "opening business"] },
  { name: "Destroy", chinese: "破", nature: "inauspicious", recommended: ["demolition", "breaking bad habits", "ending contracts"], avoid: ["construction", "starting projects", "celebrations"] },
  { name: "Danger", chinese: "危", nature: "inauspicious", recommended: ["prayer", "spiritual work", "fasting", "caution"], avoid: ["travel", "climbing", "risky ventures", "surgery"] },
  { name: "Success", chinese: "成", nature: "auspicious", recommended: ["business", "trade", "negotiations", "signing contracts", "learning"], avoid: ["litigation", "aggressive action"] },
  { name: "Receive", chinese: "收", nature: "auspicious", recommended: ["collecting debts", "harvesting", "receiving goods", "trade"], avoid: ["funerals", "medical procedures"] },
  { name: "Open", chinese: "开", nature: "auspicious", recommended: ["launching activities", "opening business", "travel", "starting study"], avoid: ["funerals", "burials"] },
  { name: "Close", chinese: "闭", nature: "neutral", recommended: ["finishing tasks", "storage", "sealing", "meditation"], avoid: ["starting projects", "opening business", "travel"] },
];

export const LUNAR_MANSIONS_XIU: LunarMansionXiu[] = [
  { number: 1, name: "Horn", chinese: "角", group: "Azure Dragon", groupChinese: "青龍", element: "Wood", animal: "Dragon", themes: ["beginnings", "growth"], recommended: ["construction", "planning", "study"], avoid: ["funerals", "demolition"] },
  { number: 2, name: "Neck", chinese: "亢", group: "Azure Dragon", groupChinese: "青龍", element: "Metal", animal: "Dragon", themes: ["caution", "restraint"], recommended: ["spiritual work", "meditation"], avoid: ["construction", "travel", "trade"] },
  { number: 3, name: "Root", chinese: "氐", group: "Azure Dragon", groupChinese: "青龍", element: "Earth", animal: "Dragon", themes: ["foundations", "stability"], recommended: ["construction", "business", "marriage"], avoid: ["water travel"] },
  { number: 4, name: "Room", chinese: "房", group: "Azure Dragon", groupChinese: "青龍", element: "Water", animal: "Dragon", themes: ["prosperity", "abundance"], recommended: ["trade", "business", "construction", "negotiation"], avoid: ["funerals"] },
  { number: 5, name: "Heart", chinese: "心", group: "Azure Dragon", groupChinese: "青龍", element: "Fire", animal: "Dragon", themes: ["danger", "intensity"], recommended: ["spiritual work", "prayer"], avoid: ["construction", "travel", "business"] },
  { number: 6, name: "Tail", chinese: "尾", group: "Azure Dragon", groupChinese: "青龍", element: "Fire", animal: "Dragon", themes: ["completion", "rewards"], recommended: ["business", "study", "construction"], avoid: ["litigation"] },
  { number: 7, name: "Winnowing Basket", chinese: "箕", group: "Azure Dragon", groupChinese: "青龍", element: "Water", animal: "Dragon", themes: ["movement", "clearing"], recommended: ["travel", "cleaning", "clearing"], avoid: ["funerals", "celebrations"] },

  { number: 8, name: "Dipper", chinese: "斗", group: "Black Tortoise", groupChinese: "玄武", element: "Water", animal: "Tortoise", themes: ["wisdom", "strategy"], recommended: ["research", "strategy", "construction"], avoid: ["litigation"] },
  { number: 9, name: "Ox", chinese: "牛", group: "Black Tortoise", groupChinese: "玄武", element: "Metal", animal: "Tortoise", themes: ["labor", "endurance"], recommended: ["construction", "craftsmanship", "hard work"], avoid: ["celebrations", "feasts"] },
  { number: 10, name: "Girl", chinese: "女", group: "Black Tortoise", groupChinese: "玄武", element: "Earth", animal: "Tortoise", themes: ["caution", "modesty"], recommended: ["healing", "spiritual work"], avoid: ["marriage", "construction", "trade"] },
  { number: 11, name: "Emptiness", chinese: "虚", group: "Black Tortoise", groupChinese: "玄武", element: "Water", animal: "Tortoise", themes: ["void", "loss"], recommended: ["meditation", "fasting", "mourning"], avoid: ["business", "construction", "travel"] },
  { number: 12, name: "Rooftop", chinese: "危", group: "Black Tortoise", groupChinese: "玄武", element: "Fire", animal: "Tortoise", themes: ["precariousness", "risk"], recommended: ["spiritual work", "prayer"], avoid: ["construction", "climbing", "travel"] },
  { number: 13, name: "Encampment", chinese: "室", group: "Black Tortoise", groupChinese: "玄武", element: "Earth", animal: "Tortoise", themes: ["settlement", "building"], recommended: ["construction", "business", "marriage"], avoid: ["water travel"] },
  { number: 14, name: "Wall", chinese: "壁", group: "Black Tortoise", groupChinese: "玄武", element: "Wood", animal: "Tortoise", themes: ["protection", "knowledge"], recommended: ["study", "learning", "writing", "construction"], avoid: ["travel"] },

  { number: 15, name: "Legs", chinese: "奎", group: "White Tiger", groupChinese: "白虎", element: "Wood", animal: "Tiger", themes: ["authority", "literature"], recommended: ["writing", "learning", "construction"], avoid: ["funerals"] },
  { number: 16, name: "Bond", chinese: "娄", group: "White Tiger", groupChinese: "白虎", element: "Metal", animal: "Tiger", themes: ["gathering", "unity"], recommended: ["trade", "negotiation", "construction", "marriage"], avoid: ["litigation"] },
  { number: 17, name: "Stomach", chinese: "胃", group: "White Tiger", groupChinese: "白虎", element: "Earth", animal: "Tiger", themes: ["storage", "accumulation"], recommended: ["business", "trade", "storage", "planning"], avoid: ["funerals"] },
  { number: 18, name: "Hairy Head", chinese: "昴", group: "White Tiger", groupChinese: "白虎", element: "Fire", animal: "Tiger", themes: ["illumination", "clarity"], recommended: ["spiritual work", "study", "construction"], avoid: ["travel by water"] },
  { number: 19, name: "Net", chinese: "毕", group: "White Tiger", groupChinese: "白虎", element: "Water", animal: "Tiger", themes: ["capture", "hunting"], recommended: ["business", "construction", "hunting", "trade"], avoid: ["funerals"] },
  { number: 20, name: "Turtle Beak", chinese: "觜", group: "White Tiger", groupChinese: "白虎", element: "Fire", animal: "Tiger", themes: ["speech", "communication"], recommended: ["writing", "study", "negotiation"], avoid: ["construction", "marriage"] },
  { number: 21, name: "Three Stars", chinese: "参", group: "White Tiger", groupChinese: "白虎", element: "Water", animal: "Tiger", themes: ["battle", "separation"], recommended: ["clearing", "demolition", "ending"], avoid: ["construction", "marriage", "trade"] },

  { number: 22, name: "Well", chinese: "井", group: "Vermilion Bird", groupChinese: "朱雀", element: "Water", animal: "Bird", themes: ["resources", "nourishment"], recommended: ["construction", "business", "study"], avoid: ["funerals"] },
  { number: 23, name: "Ghost", chinese: "鬼", group: "Vermilion Bird", groupChinese: "朱雀", element: "Metal", animal: "Bird", themes: ["spirits", "unseen"], recommended: ["spiritual work", "prayer", "offerings"], avoid: ["construction", "business", "marriage"] },
  { number: 24, name: "Willow", chinese: "柳", group: "Vermilion Bird", groupChinese: "朱雀", element: "Earth", animal: "Bird", themes: ["flexibility", "mourning"], recommended: ["healing", "spiritual work"], avoid: ["construction", "business", "celebrations"] },
  { number: 25, name: "Star", chinese: "星", group: "Vermilion Bird", groupChinese: "朱雀", element: "Fire", animal: "Bird", themes: ["brilliance", "fame"], recommended: ["business", "construction", "trade", "celebrations"], avoid: ["funerals"] },
  { number: 26, name: "Extended Net", chinese: "张", group: "Vermilion Bird", groupChinese: "朱雀", element: "Water", animal: "Bird", themes: ["expansion", "spreading"], recommended: ["construction", "business", "celebrations", "trade"], avoid: ["funerals"] },
  { number: 27, name: "Wings", chinese: "翼", group: "Vermilion Bird", groupChinese: "朱雀", element: "Fire", animal: "Bird", themes: ["support", "assistance"], recommended: ["study", "learning", "planning"], avoid: ["construction", "business", "marriage"] },
  { number: 28, name: "Chariot", chinese: "轸", group: "Vermilion Bird", groupChinese: "朱雀", element: "Water", animal: "Bird", themes: ["travel", "transportation"], recommended: ["travel", "trade", "construction"], avoid: ["funerals"] },
];

export const SOLAR_TERMS: SolarTerm[] = [
  { name: "Beginning of Spring", chinese: "立春", season: "Spring", element: "Wood", sunLongitude: 315, themes: ["renewal", "planting seeds"] },
  { name: "Rain Water", chinese: "雨水", season: "Spring", element: "Wood", sunLongitude: 330, themes: ["nourishment", "gentle action"] },
  { name: "Awakening of Insects", chinese: "惊蛰", season: "Spring", element: "Wood", sunLongitude: 345, themes: ["activation", "emergence"] },
  { name: "Spring Equinox", chinese: "春分", season: "Spring", element: "Wood", sunLongitude: 0, themes: ["balance", "equal day and night"] },
  { name: "Clear Bright", chinese: "清明", season: "Spring", element: "Wood", sunLongitude: 15, themes: ["clarity", "honoring ancestors"] },
  { name: "Grain Rain", chinese: "谷雨", season: "Spring", element: "Wood", sunLongitude: 30, themes: ["abundance", "fertility"] },
  { name: "Beginning of Summer", chinese: "立夏", season: "Summer", element: "Fire", sunLongitude: 45, themes: ["growth", "activity"] },
  { name: "Grain Buds", chinese: "小满", season: "Summer", element: "Fire", sunLongitude: 60, themes: ["fullness", "near completion"] },
  { name: "Grain in Ear", chinese: "芒种", season: "Summer", element: "Fire", sunLongitude: 75, themes: ["harvest", "hard work"] },
  { name: "Summer Solstice", chinese: "夏至", season: "Summer", element: "Fire", sunLongitude: 90, themes: ["peak yang", "maximum light"] },
  { name: "Minor Heat", chinese: "小暑", season: "Summer", element: "Fire", sunLongitude: 105, themes: ["intensity", "caution"] },
  { name: "Major Heat", chinese: "大暑", season: "Summer", element: "Fire", sunLongitude: 120, themes: ["peak heat", "endurance"] },
  { name: "Beginning of Autumn", chinese: "立秋", season: "Autumn", element: "Metal", sunLongitude: 135, themes: ["transition", "harvest preparation"] },
  { name: "End of Heat", chinese: "处暑", season: "Autumn", element: "Metal", sunLongitude: 150, themes: ["cooling", "reflection"] },
  { name: "White Dew", chinese: "白露", season: "Autumn", element: "Metal", sunLongitude: 165, themes: ["purity", "organization"] },
  { name: "Autumn Equinox", chinese: "秋分", season: "Autumn", element: "Metal", sunLongitude: 180, themes: ["balance", "equal day and night"] },
  { name: "Cold Dew", chinese: "寒露", season: "Autumn", element: "Metal", sunLongitude: 195, themes: ["introspection", "preparation"] },
  { name: "Frost Descent", chinese: "霜降", season: "Autumn", element: "Metal", sunLongitude: 210, themes: ["stillness", "storage"] },
  { name: "Beginning of Winter", chinese: "立冬", season: "Winter", element: "Water", sunLongitude: 225, themes: ["withdrawal", "conservation"] },
  { name: "Minor Snow", chinese: "小雪", season: "Winter", element: "Water", sunLongitude: 240, themes: ["rest", "inner work"] },
  { name: "Major Snow", chinese: "大雪", season: "Winter", element: "Water", sunLongitude: 255, themes: ["deep rest", "hibernation"] },
  { name: "Winter Solstice", chinese: "冬至", season: "Winter", element: "Water", sunLongitude: 270, themes: ["peak yin", "rebirth of light"] },
  { name: "Minor Cold", chinese: "小寒", season: "Winter", element: "Water", sunLongitude: 285, themes: ["deep cold", "patience"] },
  { name: "Major Cold", chinese: "大寒", season: "Winter", element: "Water", sunLongitude: 300, themes: ["deepest yin", "preparation for spring"] },
];

export const GROUP_COLORS: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  "Azure Dragon": { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-500", icon: "🐉" },
  "Black Tortoise": { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-500", icon: "🐢" },
  "White Tiger": { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-500", icon: "🐅" },
  "Vermilion Bird": { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-500", icon: "🐦" },
};

export const ELEMENT_ICONS: Record<string, string> = {
  Wood: "🌳",
  Fire: "🔥",
  Earth: "⛰",
  Metal: "⚙",
  Water: "💧",
};

export const OFFICER_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  auspicious: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-500" },
  inauspicious: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-500" },
  neutral: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-500" },
};
