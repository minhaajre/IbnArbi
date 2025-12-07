export interface PlanetaryHourGuidance {
  meaning: string;
  quality: 'jalāl' | 'jamāl' | 'kamāl';
  qualityArabic: string;
  opensOrTests: string;
  adab: string;
  dhikr: {
    name: string;
    nameArabic: string;
    meaning: string;
  };
  doAction: string;
  avoidAction: string;
  practice: string;
  innerStateExpansion: string;
  innerStateContraction: string;
}

export interface MansionGuidance {
  theme: string;
  themeArabic: string;
  energy: 'beginning' | 'stabilizing' | 'ending';
  cycleRole: 'Seed' | 'Build' | 'Relate' | 'Release';
  cycleRoleArabic: string;
  goodFor: string[];
  notIdealFor: string[];
  dhikr: {
    name: string;
    nameArabic: string;
    meaning: string;
  };
  practice: string;
  practiceArabic: string;
}

export const PLANETARY_HOUR_GUIDANCE: Record<string, PlanetaryHourGuidance> = {
  Sun: {
    meaning: "This is an hour of Divine Light (al-Nūr): clarity illuminates, truth becomes visible, and the heart's intention is magnified. The Sun hour reveals what is real and dispels illusion.",
    quality: 'kamāl',
    qualityArabic: 'كمال',
    opensOrTests: "Opens: vision, leadership, noble intention. Tests: pride, self-importance.",
    adab: "Stand in your truth with humility, not arrogance. Let your light serve others.",
    dhikr: {
      name: "al-Nūr",
      nameArabic: "النور",
      meaning: "The Light"
    },
    doAction: "Make important decisions, seek clarity on matters, express your authentic self.",
    avoidAction: "Boasting, seeking attention for ego, overshadowing others.",
    practice: "Face the direction of the sun (if visible) and recite al-Nūr 7 times, asking for clarity.",
    innerStateExpansion: "Your heart is open to receive guidance. Act with confidence and generosity.",
    innerStateContraction: "Remain still. Let the light work within you before acting outwardly."
  },
  Moon: {
    meaning: "This is an hour of Divine Receptivity (al-Laṭīf): feelings flow, intuition speaks, and the soul mirrors celestial decrees. The Moon hour is for receiving, not pushing.",
    quality: 'jamāl',
    qualityArabic: 'جمال',
    opensOrTests: "Opens: intuition, nurturing, emotional depth. Tests: moodiness, over-sensitivity.",
    adab: "Be gentle with yourself and others. Listen more than you speak.",
    dhikr: {
      name: "al-Laṭīf",
      nameArabic: "اللطيف",
      meaning: "The Subtle, The Gentle"
    },
    doAction: "Reflect on dreams, nurture relationships, care for home and family.",
    avoidAction: "Forcing outcomes, making harsh demands, ignoring emotional needs.",
    practice: "Sit in stillness and ask: 'What is my heart truly feeling?' Write what arises.",
    innerStateExpansion: "Your intuition is clear. Trust the subtle guidance you receive.",
    innerStateContraction: "Rest and receive. The Moon purifies through gentleness, not effort."
  },
  Mars: {
    meaning: "This is a Majestic hour (jalāl): energy rises, truth cuts through confusion, and impatience may appear. It is good for courage and cutting distractions, but not for impulsive arguments.",
    quality: 'jalāl',
    qualityArabic: 'جلال',
    opensOrTests: "Opens: courage, decisive action, protection. Tests: anger, rashness, conflict.",
    adab: "Channel strength into righteous action. Do not let fire consume without purpose.",
    dhikr: {
      name: "al-Qawī",
      nameArabic: "القوي",
      meaning: "The Strong"
    },
    doAction: "Cut one distraction, stand up for truth, tackle difficult tasks requiring energy.",
    avoidAction: "Sending messages in anger, starting arguments, making impulsive decisions.",
    practice: "Physical movement: walk briskly or do brief exercise while reciting al-Qawī.",
    innerStateExpansion: "Your strength is ready. Act decisively on what matters most.",
    innerStateContraction: "Hold your fire. Channel intensity into silent dhikr until it passes."
  },
  Mercury: {
    meaning: "This is an hour of Divine Communication (al-ʿAlīm): the mind sharpens, connections form, and information flows. Good for learning, writing, and articulating ideas.",
    quality: 'kamāl',
    qualityArabic: 'كمال',
    opensOrTests: "Opens: understanding, communication, learning. Tests: overthinking, deception.",
    adab: "Speak truth with wisdom. Let knowledge serve understanding, not mere cleverness.",
    dhikr: {
      name: "al-ʿAlīm",
      nameArabic: "العليم",
      meaning: "The All-Knowing"
    },
    doAction: "Write, study, have important conversations, organize information.",
    avoidAction: "Gossip, spreading unverified information, mental restlessness.",
    practice: "Journal for 5 minutes on a question you're seeking to understand.",
    innerStateExpansion: "Your mind is clear. Communicate and connect with confidence.",
    innerStateContraction: "Listen and learn rather than speak. Let understanding come to you."
  },
  Jupiter: {
    meaning: "This is an hour of Divine Expansion (al-Wāsiʿ): blessings flow, wisdom deepens, and generosity opens doors. Good for teaching, learning sacred knowledge, and acts of charity.",
    quality: 'jamāl',
    qualityArabic: 'جمال',
    opensOrTests: "Opens: wisdom, abundance, spiritual growth. Tests: excess, over-confidence.",
    adab: "Receive blessings with gratitude. Let abundance flow through you to others.",
    dhikr: {
      name: "al-Wāsiʿ",
      nameArabic: "الواسع",
      meaning: "The All-Embracing, The Vast"
    },
    doAction: "Study sacred texts, teach others, give charity, plan for growth.",
    avoidAction: "Overindulgence, promising more than you can deliver, spiritual pride.",
    practice: "Give something away—knowledge, a kind word, or material charity.",
    innerStateExpansion: "Blessings are flowing. Receive and share generously.",
    innerStateContraction: "Reflect on gratitude. Count blessings rather than seeking more."
  },
  Venus: {
    meaning: "This is an hour of Divine Beauty (al-Jamīl): love awakens, beauty is seen, and hearts soften. Good for relationships, art, and cultivating harmony.",
    quality: 'jamāl',
    qualityArabic: 'جمال',
    opensOrTests: "Opens: love, beauty, harmony, pleasure. Tests: attachment, superficiality.",
    adab: "Appreciate beauty as a sign of the Divine. Let love purify, not possess.",
    dhikr: {
      name: "al-Wadūd",
      nameArabic: "الودود",
      meaning: "The Loving"
    },
    doAction: "Express love, create or appreciate art, beautify your space, reconcile.",
    avoidAction: "Indulgence without purpose, superficial attachments, avoiding difficult truths.",
    practice: "Look at something beautiful (nature, art, a loved one) and say 'SubhanAllah.'",
    innerStateExpansion: "Your heart is open to love and beauty. Share it freely.",
    innerStateContraction: "Seek inner beauty through stillness. Let love work within."
  },
  Saturn: {
    meaning: "This is an hour of Divine Patience (al-Ṣabūr): limits are tested, time weighs heavy, and what is essential is separated from what is not. Good for serious work and letting go.",
    quality: 'jalāl',
    qualityArabic: 'جلال',
    opensOrTests: "Opens: discipline, patience, wisdom through difficulty. Tests: fear, rigidity, despair.",
    adab: "Accept limitation as mercy. What falls away was not meant to stay.",
    dhikr: {
      name: "al-Ṣabūr",
      nameArabic: "الصبور",
      meaning: "The Patient"
    },
    doAction: "Complete delayed tasks, set boundaries, accept what cannot be changed.",
    avoidAction: "Starting new ventures, expecting quick results, being overly harsh.",
    practice: "Sit with discomfort for 5 minutes, reciting al-Ṣabūr, accepting what is.",
    innerStateExpansion: "You have the strength to endure. Proceed with patience and discipline.",
    innerStateContraction: "This is a time for stillness and acceptance. Do not force."
  }
};

export const MANSION_GUIDANCE: Record<number, MansionGuidance> = {
  1: {
    theme: "The First Spark - This mansion carries the energy of pure beginning, like a seed planted in fertile ground. Intentions set now have powerful potential.",
    themeArabic: "الشرط الأول - بداية جديدة",
    energy: 'beginning',
    cycleRole: 'Seed',
    cycleRoleArabic: 'البذرة',
    goodFor: ["Setting intentions", "Starting new projects", "Making decisions", "Planting seeds (literal or metaphorical)", "New beginnings of any kind"],
    notIdealFor: ["Completing tasks", "Harvesting results", "Endings or closures", "Looking backward"],
    dhikr: { name: "al-Mubdiʾ", nameArabic: "المبدئ", meaning: "The Originator" },
    practice: "Write down one clear intention for this lunar cycle. Speak it aloud.",
    practiceArabic: "اكتب نية واضحة لهذه الدورة القمرية"
  },
  2: {
    theme: "Building Foundation - Energy for gathering resources and establishing what was begun. Focus on practical steps.",
    themeArabic: "بناء الأساس",
    energy: 'beginning',
    cycleRole: 'Seed',
    cycleRoleArabic: 'البذرة',
    goodFor: ["Gathering resources", "Making practical plans", "Building foundations", "Acquiring what's needed", "Organizing"],
    notIdealFor: ["Taking major risks", "Rushing ahead", "Ignoring practical needs"],
    dhikr: { name: "al-Razzāq", nameArabic: "الرزاق", meaning: "The Provider" },
    practice: "Take one practical step toward your intention. Gather what you need.",
    practiceArabic: "خذ خطوة عملية نحو نيتك"
  },
  3: {
    theme: "Joy and Abundance - A mansion of increase and good fortune. Energy supports growth and positive outcomes.",
    themeArabic: "الفرح والوفرة",
    energy: 'beginning',
    cycleRole: 'Seed',
    cycleRoleArabic: 'البذرة',
    goodFor: ["Celebrations", "Business ventures", "Asking for increase", "Positive social gatherings", "Expressing gratitude"],
    notIdealFor: ["Dwelling on problems", "Pessimistic planning", "Isolation"],
    dhikr: { name: "al-Wahhāb", nameArabic: "الوهاب", meaning: "The Bestower" },
    practice: "Express gratitude for three blessings. Share something with another.",
    practiceArabic: "اشكر على ثلاث نعم وشارك شيئاً مع غيرك"
  },
  4: {
    theme: "Struggle and Cutting - Energy for clearing obstacles and cutting what doesn't serve. Useful for endings that enable beginnings.",
    themeArabic: "الكفاح والقطع",
    energy: 'beginning',
    cycleRole: 'Seed',
    cycleRoleArabic: 'البذرة',
    goodFor: ["Removing obstacles", "Cutting unhealthy ties", "Breaking bad habits", "Surgery or medical procedures", "Clearing space"],
    notIdealFor: ["Reconciliation", "Starting gentle projects", "Romantic beginnings"],
    dhikr: { name: "al-Qāhir", nameArabic: "القاهر", meaning: "The Subduer" },
    practice: "Identify one thing that must be cut or released. Take action on it.",
    practiceArabic: "حدد شيئاً يجب قطعه واتخذ إجراءً"
  },
  5: {
    theme: "Health and Vitality - A mansion supporting physical well-being and recovery. Good for health matters.",
    themeArabic: "الصحة والحيوية",
    energy: 'stabilizing',
    cycleRole: 'Build',
    cycleRoleArabic: 'البناء',
    goodFor: ["Health treatments", "Starting exercise routines", "Recovery work", "Medical consultations", "Physical self-care"],
    notIdealFor: ["Ignoring body signals", "Overexertion", "Neglecting health"],
    dhikr: { name: "al-Shāfī", nameArabic: "الشافي", meaning: "The Healer" },
    practice: "Do something for your body: stretch, walk, rest, or eat consciously.",
    practiceArabic: "افعل شيئاً لجسدك: تمدد أو امشِ أو ارتح"
  },
  6: {
    theme: "Love and Friendship - A mansion of connection and affection. Energy supports bonding and harmony.",
    themeArabic: "الحب والصداقة",
    energy: 'stabilizing',
    cycleRole: 'Build',
    cycleRoleArabic: 'البناء',
    goodFor: ["Romantic relationships", "Deepening friendships", "Reconciliation", "Expressing affection", "Social gatherings"],
    notIdealFor: ["Solitary work", "Confrontation", "Endings"],
    dhikr: { name: "al-Wadūd", nameArabic: "الودود", meaning: "The Loving" },
    practice: "Reach out to someone you love. Express appreciation genuinely.",
    practiceArabic: "تواصل مع من تحب وعبّر عن تقديرك"
  },
  7: {
    theme: "Wealth and Prosperity - Energy for material increase and financial matters. Good for business.",
    themeArabic: "الثروة والازدهار",
    energy: 'stabilizing',
    cycleRole: 'Build',
    cycleRoleArabic: 'البناء',
    goodFor: ["Business negotiations", "Investments", "Asking for raise", "Financial planning", "Prosperity work"],
    notIdealFor: ["Charity without means", "Risky speculation", "Financial recklessness"],
    dhikr: { name: "al-Ghanī", nameArabic: "الغني", meaning: "The Self-Sufficient" },
    practice: "Review your finances with gratitude. Make one wise money decision.",
    practiceArabic: "راجع أموالك بامتنان واتخذ قراراً مالياً حكيماً"
  },
  8: {
    theme: "Victory and Success - A powerful mansion for overcoming and achieving. Energy supports triumph.",
    themeArabic: "النصر والنجاح",
    energy: 'stabilizing',
    cycleRole: 'Build',
    cycleRoleArabic: 'البناء',
    goodFor: ["Competitions", "Overcoming obstacles", "Asking for success", "Completing challenges", "Claiming victory"],
    notIdealFor: ["Retreating unnecessarily", "Giving up", "Self-doubt"],
    dhikr: { name: "al-Fattāḥ", nameArabic: "الفتاح", meaning: "The Opener" },
    practice: "Identify a challenge and take one bold step toward overcoming it.",
    practiceArabic: "حدد تحدياً واتخذ خطوة جريئة للتغلب عليه"
  },
  9: {
    theme: "Partnerships and Contracts - Energy for formal agreements and binding relationships.",
    themeArabic: "الشراكات والعقود",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Signing contracts", "Marriage", "Business partnerships", "Formal agreements", "Commitments"],
    notIdealFor: ["Breaking commitments", "Avoiding responsibility", "Casual arrangements"],
    dhikr: { name: "al-Wakīl", nameArabic: "الوكيل", meaning: "The Trustee" },
    practice: "Honor a commitment. If you must make a promise, make it solemnly.",
    practiceArabic: "أوفِ بالتزام أو قطع وعداً بجدية"
  },
  10: {
    theme: "Love's Tests - A mansion that reveals truth in relationships. What is real will strengthen; what is false may fall.",
    themeArabic: "اختبارات الحب",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Testing relationship strength", "Honest conversations", "Deepening intimacy", "Revealing truth"],
    notIdealFor: ["Ignoring relationship issues", "Superficial connection", "Avoiding hard truths"],
    dhikr: { name: "al-Ḥaqq", nameArabic: "الحق", meaning: "The Truth" },
    practice: "Have one honest conversation you've been avoiding.",
    practiceArabic: "أجرِ محادثة صادقة كنت تتجنبها"
  },
  11: {
    theme: "Rewards and Benefits - A mansion of receiving what has been earned. Good for reaping results.",
    themeArabic: "المكافآت والفوائد",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Receiving payment", "Harvesting efforts", "Accepting rewards", "Gratitude practices", "Enjoying fruits of labor"],
    notIdealFor: ["Starting new things", "Planting new seeds", "Future planning"],
    dhikr: { name: "al-Shakūr", nameArabic: "الشكور", meaning: "The Appreciative" },
    practice: "Receive something gracefully. Accept a compliment or help without deflecting.",
    practiceArabic: "تقبّل شيئاً بلطف دون رفض"
  },
  12: {
    theme: "Separations - A mansion for necessary endings and partings. Energy supports letting go.",
    themeArabic: "الانفصالات",
    energy: 'ending',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Ending relationships", "Divorce proceedings", "Leaving jobs", "Moving away", "Cutting ties"],
    notIdealFor: ["Starting relationships", "New commitments", "Reconciliation"],
    dhikr: { name: "al-Ḥafīẓ", nameArabic: "الحفيظ", meaning: "The Preserver" },
    practice: "Let go of something with blessing rather than bitterness.",
    practiceArabic: "دع شيئاً يذهب بالبركة لا بالمرارة"
  },
  13: {
    theme: "Goodness and Blessings - A benefic mansion of general goodness. Most things prosper here.",
    themeArabic: "الخير والبركات",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Almost everything positive", "Marriage", "Journeys", "Business", "Healing", "Friendships"],
    notIdealFor: ["Negative magic", "Harmful intentions", "Destructive acts"],
    dhikr: { name: "al-Barr", nameArabic: "البر", meaning: "The Source of Goodness" },
    practice: "Do an act of pure goodness with no expectation of return.",
    practiceArabic: "افعل خيراً دون توقع المقابل"
  },
  14: {
    theme: "Difficult Passage - A challenging mansion requiring caution and patience. Energy is restricted.",
    themeArabic: "الممر الصعب",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Patience practices", "Endurance", "Inner work", "Quiet reflection", "Delayed action"],
    notIdealFor: ["Major decisions", "New ventures", "Important meetings", "Travel"],
    dhikr: { name: "al-Ṣabūr", nameArabic: "الصبور", meaning: "The Patient" },
    practice: "Practice patience. Delay one decision that can wait.",
    practiceArabic: "تحلَّ بالصبر وأجِّل قراراً يمكن انتظاره"
  },
  15: {
    theme: "Hidden Knowledge - A mansion revealing what is concealed. Good for research and uncovering secrets.",
    themeArabic: "المعرفة المخفية",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Research", "Investigation", "Learning secrets", "Spiritual insight", "Dreams"],
    notIdealFor: ["Public announcements", "Revealing yourself", "Extroversion"],
    dhikr: { name: "al-Bāṭin", nameArabic: "الباطن", meaning: "The Hidden" },
    practice: "Seek knowledge of something hidden. Pay attention to dreams tonight.",
    practiceArabic: "ابحث عن معرفة مخفية وانتبه لأحلامك"
  },
  16: {
    theme: "Fair Dealings - A mansion of justice and balanced exchange. Good for negotiations.",
    themeArabic: "التعاملات العادلة",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Negotiations", "Fair trades", "Legal matters", "Balancing accounts", "Justice work"],
    notIdealFor: ["Deception", "Unfair advantage", "Exploitation"],
    dhikr: { name: "al-ʿAdl", nameArabic: "العدل", meaning: "The Just" },
    practice: "Right a wrong or balance an account—material or relational.",
    practiceArabic: "صحح خطأً أو وازن حساباً مادياً أو علاقاتياً"
  },
  17: {
    theme: "Protection and Defense - Energy for safeguarding what matters. Good for security.",
    themeArabic: "الحماية والدفاع",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Protection practices", "Security measures", "Defending boundaries", "Safeguarding loved ones"],
    notIdealFor: ["Unnecessary aggression", "Paranoia", "Attacking others"],
    dhikr: { name: "al-Muhaymin", nameArabic: "المهيمن", meaning: "The Guardian" },
    practice: "Strengthen one boundary. Protect something or someone you value.",
    practiceArabic: "قوِّ حدوداً واحمِ ما تقدّره"
  },
  18: {
    theme: "Friendship and Alliance - A mansion for building alliances and strengthening bonds.",
    themeArabic: "الصداقة والتحالف",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Building alliances", "Strengthening friendships", "Group work", "Community building", "Asking for help"],
    notIdealFor: ["Going it alone", "Rejecting help", "Isolation"],
    dhikr: { name: "al-Walī", nameArabic: "الولي", meaning: "The Protecting Friend" },
    practice: "Strengthen a friendship or alliance. Ask for or offer help.",
    practiceArabic: "قوِّ صداقة أو اطلب أو قدِّم مساعدة"
  },
  19: {
    theme: "Rest and Recovery - A mansion for pause and restoration. Energy supports healing.",
    themeArabic: "الراحة والتعافي",
    energy: 'ending',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Rest", "Recovery", "Convalescence", "Retreating", "Self-care", "Healing"],
    notIdealFor: ["Starting new things", "High-energy activities", "Major decisions"],
    dhikr: { name: "al-Salām", nameArabic: "السلام", meaning: "The Source of Peace" },
    practice: "Rest more than usual. Do less. Let healing happen.",
    practiceArabic: "استرح أكثر وافعل أقل ودع الشفاء يحدث"
  },
  20: {
    theme: "Taming and Domesticating - Energy for bringing order and control. Good for training.",
    themeArabic: "الترويض والتهذيب",
    energy: 'ending',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Training", "Discipline practices", "Taming habits", "Bringing order", "Animal work"],
    notIdealFor: ["Wild spontaneity", "Breaking routines", "Chaos"],
    dhikr: { name: "al-Mudabbir", nameArabic: "المدبر", meaning: "The Arranger" },
    practice: "Bring one wild aspect of your life into better order.",
    practiceArabic: "نظِّم جانباً فوضوياً من حياتك"
  },
  21: {
    theme: "Destruction of the Old - A powerful mansion for ending what must end. Transformation through release.",
    themeArabic: "هدم القديم",
    energy: 'ending',
    cycleRole: 'Release',
    cycleRoleArabic: 'الإطلاق',
    goodFor: ["Ending bad situations", "Destroying obstacles", "Breaking patterns", "Demolition", "Transformation"],
    notIdealFor: ["Preservation", "Building", "Starting new things", "Gentleness"],
    dhikr: { name: "al-Mumīt", nameArabic: "المميت", meaning: "The Bringer of Death" },
    practice: "Consciously end something that no longer serves you.",
    practiceArabic: "أنهِ شيئاً لم يعد يخدمك"
  },
  22: {
    theme: "Healing and Restoration - A mansion of deep healing and making whole what was broken.",
    themeArabic: "الشفاء والترميم",
    energy: 'ending',
    cycleRole: 'Release',
    cycleRoleArabic: 'الإطلاق',
    goodFor: ["Deep healing", "Recovery", "Mending relationships", "Restoration", "Medical treatment"],
    notIdealFor: ["Creating new wounds", "Aggression", "Conflict"],
    dhikr: { name: "al-Jabbār", nameArabic: "الجبار", meaning: "The Restorer" },
    practice: "Mend something broken—a relationship, an object, or your own heart.",
    practiceArabic: "أصلح شيئاً مكسوراً - علاقة أو قلبك"
  },
  23: {
    theme: "Completion and Finishing - Energy for completing what was started. Good for conclusions.",
    themeArabic: "الإتمام والإنهاء",
    energy: 'ending',
    cycleRole: 'Release',
    cycleRoleArabic: 'الإطلاق',
    goodFor: ["Completing projects", "Finishing tasks", "Tying up loose ends", "Final touches", "Closure"],
    notIdealFor: ["Starting new things", "Opening new chapters", "Beginning"],
    dhikr: { name: "al-Muqsit", nameArabic: "المقسط", meaning: "The Equitable" },
    practice: "Complete one unfinished task that has been waiting.",
    practiceArabic: "أكمل مهمة واحدة غير منتهية"
  },
  24: {
    theme: "Liberation and Freedom - A mansion for breaking free and releasing bondage.",
    themeArabic: "التحرير والحرية",
    energy: 'ending',
    cycleRole: 'Release',
    cycleRoleArabic: 'الإطلاق',
    goodFor: ["Breaking free", "Liberation", "Releasing bondage", "Escaping situations", "Freedom work"],
    notIdealFor: ["Committing", "Binding", "Creating obligations"],
    dhikr: { name: "al-Muʿīd", nameArabic: "المعيد", meaning: "The Restorer to Life" },
    practice: "Release yourself from one thing that binds you unnecessarily.",
    practiceArabic: "حرر نفسك من شيء يقيدك دون ضرورة"
  },
  25: {
    theme: "Insight and Vision - A mansion of prophetic vision and deep seeing. Good for divination.",
    themeArabic: "البصيرة والرؤية",
    energy: 'ending',
    cycleRole: 'Release',
    cycleRoleArabic: 'الإطلاق',
    goodFor: ["Vision work", "Dreaming", "Divination", "Insight practices", "Understanding the future"],
    notIdealFor: ["Ignoring intuition", "Purely rational work", "Dismissing dreams"],
    dhikr: { name: "al-Baṣīr", nameArabic: "البصير", meaning: "The All-Seeing" },
    practice: "Before sleep, ask for a clarifying dream. Write it upon waking.",
    practiceArabic: "قبل النوم اطلب رؤيا واكتبها عند الاستيقاظ"
  },
  26: {
    theme: "Service and Humility - Energy for serving others and practicing humility.",
    themeArabic: "الخدمة والتواضع",
    energy: 'ending',
    cycleRole: 'Release',
    cycleRoleArabic: 'الإطلاق',
    goodFor: ["Service", "Helping others", "Humble work", "Charity", "Selfless acts"],
    notIdealFor: ["Self-promotion", "Pride", "Seeking recognition"],
    dhikr: { name: "al-Khāfiḍ", nameArabic: "الخافض", meaning: "The Abaser" },
    practice: "Do one act of service without anyone knowing it was you.",
    practiceArabic: "قم بعمل خدمة دون أن يعرف أحد أنك أنت"
  },
  27: {
    theme: "Spiritual Ascent - The station before return. Energy for highest spiritual work.",
    themeArabic: "الصعود الروحي",
    energy: 'ending',
    cycleRole: 'Release',
    cycleRoleArabic: 'الإطلاق',
    goodFor: ["Deep meditation", "Spiritual practices", "Prayer", "Retreat", "Mystical work"],
    notIdealFor: ["Worldly affairs", "Material pursuits", "Business"],
    dhikr: { name: "al-Rāfiʿ", nameArabic: "الرافع", meaning: "The Exalter" },
    practice: "Increase spiritual practice. Add extra prayers or meditation.",
    practiceArabic: "زد من العبادة - صلاة إضافية أو تأمل"
  },
  28: {
    theme: "The Return - Final mansion before renewal. Energy of completion and preparing for new cycle.",
    themeArabic: "العودة",
    energy: 'ending',
    cycleRole: 'Release',
    cycleRoleArabic: 'الإطلاق',
    goodFor: ["Closure", "Reflection on the month", "Preparing for new cycle", "Gratitude", "Surrender"],
    notIdealFor: ["New beginnings", "Starting projects", "Making plans"],
    dhikr: { name: "al-Muʾakhkhir", nameArabic: "المؤخر", meaning: "The Delayer" },
    practice: "Reflect on what this lunar cycle taught you. Prepare heart for renewal.",
    practiceArabic: "تأمل ما علمتك هذه الدورة القمرية"
  }
};

export const CYCLE_ROLE_COLORS = {
  Seed: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/30' },
  Build: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/30' },
  Relate: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/30' },
  Release: { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/30' }
};

export const QUALITY_COLORS = {
  jalāl: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/30', label: 'Majestic' },
  jamāl: { bg: 'bg-pink-500/10', text: 'text-pink-500', border: 'border-pink-500/30', label: 'Beautiful' },
  kamāl: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/30', label: 'Perfect' }
};
