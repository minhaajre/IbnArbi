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
    sphere: "The First Intellect, The Pen",
    sphereArabic: "العقل الأول، القلم",
    attribute: "Divine Essence",
    attributeArabic: "الذات الإلهية",
    letter: "Hamza & Alef",
    letterArabic: "ء ا",
    degrees: "0° Aries",
    nature: "blessed",
    activities: "This mansion is traditionally associated with new beginnings. Intentions set here may carry particular potency.",
    description: "The beginning of the cosmic cycle. Represents the primordial consciousness from which all creation emanates."
  },
  {
    number: 2,
    name: "Al-Butain",
    arabic: "البطين",
    meaning: "The Belly of Aries",
    sphere: "The Universal Soul, The Preserved Tablet",
    sphereArabic: "النفس الكلية، اللوح المحفوظ",
    attribute: "The One Who Calls Forth",
    attributeArabic: "الباعث",
    letter: "Hā'",
    letterArabic: "ه",
    degrees: "12°51' Aries",
    nature: "challenging",
    activities: "This mansion may support introspection and recording intentions. Major ventures may benefit from waiting.",
    description: "The Guarded Tablet upon which all destinies are inscribed. The repository of divine decrees."
  },
  {
    number: 3,
    name: "Al-Thurayya",
    arabic: "الثريا",
    meaning: "The Pleiades",
    sphere: "Universal Nature",
    sphereArabic: "الطبيعة الكلية",
    attribute: "The Interior",
    attributeArabic: "الباطن",
    letter: "'Ayn",
    letterArabic: "ع",
    degrees: "25°42' Aries",
    nature: "blessed",
    activities: "This mansion is traditionally associated with seeking hidden knowledge. Inner reflection may settle well here.",
    description: "The Many Little Ones. Represents the multiplicity of forms emerging from unity."
  },
  {
    number: 4,
    name: "Al-Dabaran",
    arabic: "الدبران",
    meaning: "The Follower",
    sphere: "Universal Substance (Prima Materia)",
    sphereArabic: "الجوهر الهيولي (المادة الأولى)",
    attribute: "The Last",
    attributeArabic: "الآخر",
    letter: "Hā (stressed)",
    letterArabic: "ح",
    degrees: "8°34' Taurus",
    nature: "blessed",
    activities: "This mansion may support completing tasks and following through with patience. Steady effort tends to settle well here.",
    description: "Al-jawhar al-hayūlī. The primordial matter from which all material forms arise."
  },
  {
    number: 5,
    name: "Al-Haq'ah",
    arabic: "الهقعة",
    meaning: "The White Spot",
    sphere: "The Universal Body",
    sphereArabic: "الجسم الكلي",
    attribute: "The Manifest",
    attributeArabic: "الظاهر",
    letter: "Ghayn",
    letterArabic: "غ",
    degrees: "21°25' Taurus",
    nature: "challenging",
    activities: "This mansion invites caution. Quiet contemplation may serve better than outward striving.",
    description: "The luminous mark signifying the manifestation of the divine in material form."
  },
  {
    number: 6,
    name: "Al-Han'ah",
    arabic: "الهنعة",
    meaning: "The Mark",
    sphere: "Form",
    sphereArabic: "الصورة",
    attribute: "The Wise",
    attributeArabic: "الحكيم",
    letter: "Khā",
    letterArabic: "خ",
    degrees: "4°17' Gemini",
    nature: "blessed",
    activities: "This mansion is traditionally associated with wisdom. Studying sacred texts and sharing knowledge may settle well here.",
    description: "The patterns of creation. Divine wisdom expressed through archetypal forms."
  },
  {
    number: 7,
    name: "Al-Dhira",
    arabic: "الذراع",
    meaning: "The Forearm",
    sphere: "The Throne",
    sphereArabic: "العرش",
    attribute: "The All-Encompassing",
    attributeArabic: "الواسع",
    letter: "Qāf",
    letterArabic: "ق",
    degrees: "17°08' Gemini",
    nature: "blessed",
    activities: "This mansion may support expansive thinking and charitable works. Embracing divine vastness tends to harmonize here.",
    description: "The Divine Throne (Al-'Arsh) that encompasses all of creation."
  },
  {
    number: 8,
    name: "Al-Nathrah",
    arabic: "النثرة",
    meaning: "The Gap (or Crib)",
    sphere: "The Footstool",
    sphereArabic: "الكرسي",
    attribute: "The Grateful",
    attributeArabic: "الشكور",
    letter: "Kāf",
    letterArabic: "ك",
    degrees: "0° Cancer",
    nature: "challenging",
    activities: "This mansion invites gratitude and thankfulness. Expectations may not harmonize well with this time.",
    description: "The Kursi. The pedestal of divine governance over the heavens and earth."
  },
  {
    number: 9,
    name: "Al-Tarf",
    arabic: "الطرف",
    meaning: "The Glance",
    sphere: "The Self-Existing Ultimate Sphere, The Starless Sky, The Zodiacal Towers",
    sphereArabic: "الفلك الأطلس، السماء بلا نجوم، البروج",
    attribute: "The Independent, The Rich",
    attributeArabic: "الغني",
    letter: "Jīm",
    letterArabic: "ج",
    degrees: "12°51' Cancer",
    nature: "challenging",
    activities: "This mansion invites self-sufficiency and contentment. Solitary spiritual practice may settle well here.",
    description: "The outermost sphere where no stars reside. The boundary between creation and the divine."
  },
  {
    number: 10,
    name: "Al-Jabhah",
    arabic: "الجبهة",
    meaning: "The Forehead",
    sphere: "The Sky of Fixed Stars, The Sphere of Stations, The Sun of Paradise, The Roof of Hell",
    sphereArabic: "سماء الكواكب الثابتة، فلك المنازل، شمس الجنة، سقف جهنم",
    attribute: "The Powerful",
    attributeArabic: "القوي",
    letter: "Shīn",
    letterArabic: "ش",
    degrees: "25°42' Cancer",
    nature: "blessed",
    activities: "This mansion is traditionally associated with inner strength. Decisive clarity approached with composure may settle well here.",
    description: "The sphere of the constellations. The realm where the zodiac signs dwell."
  },
  {
    number: 11,
    name: "Al-Zubrah",
    arabic: "الزبرة",
    meaning: "The Mane",
    sphere: "The First Heaven, The Sphere of Saturn, The Sky of the Visited House, Lotus of the Extreme Limit, The Abode of Ibrahim (Abraham)",
    sphereArabic: "السماء الأولى، فلك زحل، سماء البيت المعمور، سدرة المنتهى، مقام إبراهيم",
    attribute: "The Lord",
    attributeArabic: "الرب",
    letter: "Yā",
    letterArabic: "ي",
    degrees: "8°34' Leo",
    nature: "blessed",
    activities: "This mansion may support devotional practices and surrender. Honoring traditions tends to harmonize here.",
    description: "Saturn's celestial domain. The abode where Prophet Ibrahim resides in eternal peace."
  },
  {
    number: 12,
    name: "Al-Sarfah",
    arabic: "الصرفة",
    meaning: "The Changer",
    sphere: "The Second Heaven, The Sphere of Jupiter, The Abode of Musa (Moses)",
    sphereArabic: "السماء الثانية، فلك المشتري، مقام موسى",
    attribute: "The Knowing",
    attributeArabic: "العليم",
    letter: "Dād (stressed)",
    letterArabic: "ض",
    degrees: "21°25' Leo",
    nature: "challenging",
    activities: "This mansion carries a quality of transition. Seeking knowledge and remaining open to change may serve well here.",
    description: "Jupiter's celestial domain. The abode where Prophet Musa received divine wisdom."
  },
  {
    number: 13,
    name: "Al-Awwa",
    arabic: "العواء",
    meaning: "The Barker",
    sphere: "The Third Heaven, The Sphere of Mars, The Abode of Harun (Aaron)",
    sphereArabic: "السماء الثالثة، فلك المريخ، مقام هارون",
    attribute: "The Victorious",
    attributeArabic: "القاهر",
    letter: "Lām",
    letterArabic: "ل",
    degrees: "4°17' Virgo",
    nature: "blessed",
    activities: "This mansion is traditionally associated with meeting challenges. Standing firm in truth with composure may settle well here.",
    description: "Mars' celestial domain. The abode where Prophet Harun dwells in radiant light."
  },
  {
    number: 14,
    name: "Al-Simak",
    arabic: "السماك",
    meaning: "The Unarmed",
    sphere: "The Fourth Heaven, The Sphere of the Sun, The Abode of Idris (Enoch, Hermes)",
    sphereArabic: "السماء الرابعة، فلك الشمس، مقام إدريس",
    attribute: "The Light",
    attributeArabic: "النور",
    letter: "Nūn",
    letterArabic: "ن",
    degrees: "17°08' Virgo",
    nature: "challenging",
    activities: "This mansion invites seeking illumination through humility. Study may settle well; confrontation may not harmonize.",
    description: "The Sun's celestial domain. The abode of Prophet Idris, master of sacred sciences."
  },
  {
    number: 15,
    name: "Al-Ghafr",
    arabic: "الغفر",
    meaning: "The Cover",
    sphere: "The Fifth Heaven, The Sphere of Venus, The Abode of Yusuf (Joseph)",
    sphereArabic: "السماء الخامسة، فلك الزهرة، مقام يوسف",
    attribute: "The Form-Giver",
    attributeArabic: "المصور",
    letter: "Rā",
    letterArabic: "ر",
    degrees: "0° Libra",
    nature: "blessed",
    activities: "This mansion may support creative expression and beauty. Covering the faults of others tends to harmonize here.",
    description: "Venus' celestial domain. The abode of Prophet Yusuf, embodiment of divine beauty."
  },
  {
    number: 16,
    name: "Al-Zubana",
    arabic: "الزبانى",
    meaning: "The Claws",
    sphere: "The Sixth Heaven, The Sphere of Mercury, The Abode of 'Isa (Jesus)",
    sphereArabic: "السماء السادسة، فلك عطارد، مقام عيسى",
    attribute: "The Numberer",
    attributeArabic: "المحصي",
    letter: "Tā (stressed)",
    letterArabic: "ط",
    degrees: "12°51' Libra",
    nature: "blessed",
    activities: "This mansion is traditionally associated with organization and communication. Healing work may settle well here.",
    description: "Mercury's celestial domain. The abode of Prophet 'Isa, the living word."
  },
  {
    number: 17,
    name: "Al-Iklil",
    arabic: "الإكليل",
    meaning: "The Crown of the Forehead",
    sphere: "The Seventh Heaven, The Sphere of the Moon, The Abode of Adam",
    sphereArabic: "السماء السابعة، فلك القمر، مقام آدم",
    attribute: "The Evident",
    attributeArabic: "المبين",
    letter: "Dāl",
    letterArabic: "د",
    degrees: "25°42' Libra",
    nature: "blessed",
    activities: "This mansion may support clarity and making things manifest. Honoring one's humanity tends to harmonize here.",
    description: "The Moon's celestial domain. The abode of Prophet Adam, father of humanity."
  },
  {
    number: 18,
    name: "Al-Qalb",
    arabic: "القلب",
    meaning: "The Heart",
    sphere: "The Sphere of Ether, Meteors and Fire",
    sphereArabic: "فلك الأثير، الشهب والنار",
    attribute: "The Seizer",
    attributeArabic: "القابض",
    letter: "Tā (unstressed)",
    letterArabic: "ت",
    degrees: "8°34' Scorpio",
    nature: "challenging",
    activities: "This mansion carries an intense quality. Heart purification and releasing attachments may settle well here.",
    description: "The heart of the scorpion. The ethereal realm where fire and light interweave."
  },
  {
    number: 19,
    name: "Al-Shaulah",
    arabic: "الشولة",
    meaning: "The Sting",
    sphere: "Air",
    sphereArabic: "الهواء",
    attribute: "The Living One",
    attributeArabic: "الحي",
    letter: "Zāy",
    letterArabic: "ز",
    degrees: "21°25' Scorpio",
    nature: "challenging",
    activities: "This mansion invites caution. Breathwork and cultivating vital presence may harmonize here.",
    description: "The realm of the aerial element. Life-breath permeating all existence."
  },
  {
    number: 20,
    name: "Al-Na'am",
    arabic: "النعائم",
    meaning: "The Ostriches",
    sphere: "Water",
    sphereArabic: "الماء",
    attribute: "The Life-Giver",
    attributeArabic: "المحيي",
    letter: "Sīn",
    letterArabic: "س",
    degrees: "4°17' Sagittarius",
    nature: "challenging",
    activities: "This mansion may support nurturing what is valuable. Healing and purification practices tend to harmonize here.",
    description: "The realm of the water element. Source of all life and sustenance."
  },
  {
    number: 21,
    name: "Al-Baldah",
    arabic: "البلدة",
    meaning: "The City",
    sphere: "Earth",
    sphereArabic: "الأرض",
    attribute: "The Death-Giver",
    attributeArabic: "المميت",
    letter: "Sād (stressed)",
    letterArabic: "ص",
    degrees: "17°08' Sagittarius",
    nature: "blessed",
    activities: "This mansion is traditionally associated with endings and transformation. Letting go may settle well here.",
    description: "The realm of the earth element. The domain of endings and transformation."
  },
  {
    number: 22,
    name: "Sa'd al-Dhabih",
    arabic: "سعد الذابح",
    meaning: "Fortune of the Slayers",
    sphere: "Minerals and Metals",
    sphereArabic: "المعادن والفلزات",
    attribute: "The Precious",
    attributeArabic: "الكريم",
    letter: "Zā (stressed)",
    letterArabic: "ظ",
    degrees: "0° Capricorn",
    nature: "challenging",
    activities: "This mansion invites sacrifice and generosity. Releasing what no longer serves may harmonize here.",
    description: "The mineral kingdom. Hidden treasures and precious substances of the earth."
  },
  {
    number: 23,
    name: "Sa'd Bula",
    arabic: "سعد بلع",
    meaning: "Fortune of the Swallower",
    sphere: "Plants",
    sphereArabic: "النباتات",
    attribute: "The Nourisher",
    attributeArabic: "المقيت",
    letter: "Thā",
    letterArabic: "ث",
    degrees: "12°51' Capricorn",
    nature: "blessed",
    activities: "This mansion may support planting seeds and nourishment. Growth tends to harmonize here.",
    description: "The plant kingdom. The realm of growth, nourishment, and verdant life."
  },
  {
    number: 24,
    name: "Sa'd al-Su'ud",
    arabic: "سعد السعود",
    meaning: "Fortune of the Fortunate",
    sphere: "Animals",
    sphereArabic: "الحيوانات",
    attribute: "The Humbler",
    attributeArabic: "المذل",
    letter: "Dhāl",
    letterArabic: "ذ",
    degrees: "25°42' Capricorn",
    nature: "challenging",
    activities: "This mansion invites humility and care for creatures. Pride may not harmonize well with this time.",
    description: "The animal kingdom. Creatures of instinct and embodied souls."
  },
  {
    number: 25,
    name: "Sa'd al-Akhbiyah",
    arabic: "سعد الأخبية",
    meaning: "Fortune of the Hidden",
    sphere: "The Angels",
    sphereArabic: "الملائكة",
    attribute: "The Strong",
    attributeArabic: "القوي",
    letter: "Fā",
    letterArabic: "ف",
    degrees: "8°34' Aquarius",
    nature: "blessed",
    activities: "This mansion is traditionally associated with hidden spiritual work. Seeking protection in quietness may settle well here.",
    description: "The angelic realm. Celestial beings of light who carry out divine commands."
  },
  {
    number: 26,
    name: "Al-Fargh al-Muqaddam",
    arabic: "الفرغ المقدم",
    meaning: "The First Spout",
    sphere: "The Jinn",
    sphereArabic: "الجن",
    attribute: "The Subtle",
    attributeArabic: "اللطيف",
    letter: "Bā",
    letterArabic: "ب",
    degrees: "21°25' Aquarius",
    nature: "challenging",
    activities: "This mansion invites spiritual vigilance. Subtle awareness and protection practices may harmonize here.",
    description: "The realm of the jinn. Beings of smokeless fire dwelling between worlds."
  },
  {
    number: 27,
    name: "Al-Fargh al-Mu'akhkhar",
    arabic: "الفرغ المؤخر",
    meaning: "The Second Spout",
    sphere: "Humanity",
    sphereArabic: "الإنسان",
    attribute: "The Uniter",
    attributeArabic: "الجامع",
    letter: "Mīm",
    letterArabic: "م",
    degrees: "4°17' Pisces",
    nature: "blessed",
    activities: "This mansion is traditionally associated with community. Bringing people together tends to harmonize here.",
    description: "The human realm. The vicegerent of God uniting heavenly and earthly natures."
  },
  {
    number: 28,
    name: "Batn al-Hut",
    arabic: "بطن الحوت",
    meaning: "Belly of the Fish",
    sphere: "The Hierarchy of the Degrees of Existence, not their Manifestation",
    sphereArabic: "مراتب الوجود، لا تجليها",
    attribute: "The One Who Elevates by Degrees",
    attributeArabic: "الرافع",
    letter: "Wāw",
    letterArabic: "و",
    degrees: "17°08' Pisces",
    nature: "challenging",
    activities: "This mansion invites deep reflection on spiritual station. Surrender and cycle completion may harmonize here.",
    description: "The completion of the cycle. The hidden order underlying all manifest existence."
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
