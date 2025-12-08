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
    meaning: "This hour carries a quality of Divine Light (al-Nūr). Clarity may become more accessible, and the heart's intention tends to be illuminated. The Sun hour is traditionally associated with revelation of what is true.",
    quality: 'kamāl',
    qualityArabic: 'كمال',
    opensOrTests: "This hour may support: vision, clarity, noble intention. It may also test: pride, self-importance.",
    adab: "Stand in your truth with humility, allowing your presence to serve rather than overshadow.",
    dhikr: {
      name: "al-Nūr",
      nameArabic: "النور",
      meaning: "The Light"
    },
    doAction: "This hour may support seeking clarity, making considered decisions, or expressing authentic intention.",
    avoidAction: "This hour may not harmonize with seeking attention for its own sake or overshadowing others.",
    practice: "You may find benefit in facing toward light and reciting al-Nūr softly, inviting clarity.",
    innerStateExpansion: "The heart may be open to receive guidance. You might proceed with quiet confidence.",
    innerStateContraction: "Remain still. Allow the light to work within before moving outwardly."
  },
  Moon: {
    meaning: "This hour carries a quality of Divine Gentleness (al-Laṭīf). Feelings may flow more freely, and intuition tends to speak more clearly. The Moon hour is traditionally a time for receiving rather than striving.",
    quality: 'jamāl',
    qualityArabic: 'جمال',
    opensOrTests: "This hour may support: intuition, nurturing, emotional depth. It may also test: moodiness, over-sensitivity.",
    adab: "Be gentle with yourself and others. Listening may serve better than speaking.",
    dhikr: {
      name: "al-Laṭīf",
      nameArabic: "اللطيف",
      meaning: "The Subtle, The Gentle"
    },
    doAction: "This hour may support reflection, nurturing relationships, or attending to home and family.",
    avoidAction: "This hour may not harmonize with forcing outcomes or making harsh demands.",
    practice: "You may find benefit in sitting in stillness and asking: 'What is my heart truly feeling?'",
    innerStateExpansion: "Your intuition may be clear. You might trust the subtle guidance you receive.",
    innerStateContraction: "Rest and receive. The Moon purifies through gentleness, not effort."
  },
  Mars: {
    meaning: "This hour carries a quality of Divine Majesty (jalāl). Energy may rise more readily, and clarity may cut through confusion. It is traditionally known to support courageous action when approached with composure.",
    quality: 'jalāl',
    qualityArabic: 'جلال',
    opensOrTests: "This hour may support: courage, decisive action, protection. It may also test: anger, rashness, conflict.",
    adab: "Channel intensity into purposeful action. Allow strength to serve rather than consume.",
    dhikr: {
      name: "al-Qawī",
      nameArabic: "القوي",
      meaning: "The Strong"
    },
    doAction: "This hour may support clearing distractions, standing for what is true, or addressing matters requiring energy.",
    avoidAction: "This hour may not harmonize with acting from anger or making impulsive choices.",
    practice: "You may find benefit in movement—walking briskly while reciting al-Qawī to channel intensity.",
    innerStateExpansion: "Your strength may be ready. You might act decisively on what matters most.",
    innerStateContraction: "Hold your fire. Channel intensity into silent dhikr until it settles."
  },
  Mercury: {
    meaning: "This hour carries a quality of Divine Knowledge (al-ʿAlīm). The mind may sharpen, connections may form more readily, and understanding tends to flow. It is traditionally known to support learning and articulation.",
    quality: 'kamāl',
    qualityArabic: 'كمال',
    opensOrTests: "This hour may support: understanding, communication, learning. It may also test: overthinking, restlessness.",
    adab: "Speak truth with wisdom. Let knowledge serve understanding rather than mere cleverness.",
    dhikr: {
      name: "al-ʿAlīm",
      nameArabic: "العليم",
      meaning: "The All-Knowing"
    },
    doAction: "This hour may support writing, study, meaningful conversations, or organizing thoughts.",
    avoidAction: "This hour may not harmonize with gossip or spreading unverified information.",
    practice: "You may find benefit in journaling briefly on a question you are seeking to understand.",
    innerStateExpansion: "Your mind may be clear. You might communicate and connect with quiet confidence.",
    innerStateContraction: "Listen and learn rather than speak. Allow understanding to come to you."
  },
  Jupiter: {
    meaning: "This hour carries a quality of Divine Expansion (al-Wāsiʿ). Blessings may flow more readily, wisdom may deepen, and generosity tends to open doors. It is traditionally known to support teaching and charitable acts.",
    quality: 'jamāl',
    qualityArabic: 'جمال',
    opensOrTests: "This hour may support: wisdom, abundance, spiritual growth. It may also test: excess, over-confidence.",
    adab: "Receive blessings with gratitude. Allow abundance to flow through you to others.",
    dhikr: {
      name: "al-Wāsiʿ",
      nameArabic: "الواسع",
      meaning: "The All-Embracing, The Vast"
    },
    doAction: "This hour may support studying sacred texts, sharing knowledge, giving charity, or planning for growth.",
    avoidAction: "This hour may not harmonize with overindulgence or promising more than can be delivered.",
    practice: "You may find benefit in giving something away—knowledge, a kind word, or material charity.",
    innerStateExpansion: "Blessings may be flowing. You might receive and share generously.",
    innerStateContraction: "Reflect on gratitude. Count blessings rather than seeking more."
  },
  Venus: {
    meaning: "This hour carries a quality of Divine Beauty (al-Jamīl). Hearts may soften, beauty may become more visible, and harmony tends to be accessible. It is traditionally known to support relationships and creative expression.",
    quality: 'jamāl',
    qualityArabic: 'جمال',
    opensOrTests: "This hour may support: love, beauty, harmony, appreciation. It may also test: attachment, superficiality.",
    adab: "Appreciate beauty as a sign of the Divine. Let love purify rather than possess.",
    dhikr: {
      name: "al-Wadūd",
      nameArabic: "الودود",
      meaning: "The Loving"
    },
    doAction: "This hour may support expressing appreciation, creating or appreciating beauty, or cultivating harmony.",
    avoidAction: "This hour may not harmonize with indulgence without purpose or avoiding difficult truths.",
    practice: "You may find benefit in contemplating something beautiful and saying 'SubhanAllah' in appreciation.",
    innerStateExpansion: "Your heart may be open to love and beauty. You might share it freely.",
    innerStateContraction: "Seek inner beauty through stillness. Allow love to work within."
  },
  Saturn: {
    meaning: "This hour carries a quality of Divine Patience (al-Ṣabūr). Limits may be felt, time may weigh more heavily, and what is essential tends to separate from what is not. It is traditionally known to support serious work and acceptance.",
    quality: 'jalāl',
    qualityArabic: 'جلال',
    opensOrTests: "This hour may support: discipline, patience, wisdom through steadiness. It may also test: fear, rigidity.",
    adab: "Accept limitation as mercy. What falls away may not have been meant to remain.",
    dhikr: {
      name: "al-Ṣabūr",
      nameArabic: "الصبور",
      meaning: "The Patient"
    },
    doAction: "This hour may support completing delayed tasks, setting boundaries, or accepting what cannot be changed.",
    avoidAction: "This hour may not harmonize with starting new ventures or expecting quick results.",
    practice: "You may find benefit in sitting with discomfort briefly, reciting al-Ṣabūr, accepting what is.",
    innerStateExpansion: "You may have the steadiness to endure. Proceed with patience and discipline.",
    innerStateContraction: "This is a time for stillness and acceptance. Do not force what resists."
  }
};

export const MANSION_GUIDANCE: Record<number, MansionGuidance> = {
  1: {
    theme: "The First Spark - This mansion carries the quality of pure beginning, like a seed placed in fertile ground. Intentions set now may carry particular potency.",
    themeArabic: "الشرط الأول - بداية جديدة",
    energy: 'beginning',
    cycleRole: 'Seed',
    cycleRoleArabic: 'البذرة',
    goodFor: ["Setting intentions", "Initiating projects", "Making considered decisions", "Planting seeds (literal or metaphorical)"],
    notIdealFor: ["Completing tasks", "Harvesting results", "Endings or closures"],
    dhikr: { name: "al-Mubdiʾ", nameArabic: "المبدئ", meaning: "The Originator" },
    practice: "You may find benefit in writing one clear intention for this lunar cycle.",
    practiceArabic: "اكتب نية واضحة لهذه الدورة القمرية"
  },
  2: {
    theme: "Building Foundation - This mansion supports gathering resources and establishing what was begun. Practical steps may settle well here.",
    themeArabic: "بناء الأساس",
    energy: 'beginning',
    cycleRole: 'Seed',
    cycleRoleArabic: 'البذرة',
    goodFor: ["Gathering resources", "Making practical plans", "Building foundations", "Organizing"],
    notIdealFor: ["Taking major risks", "Rushing ahead", "Ignoring practical considerations"],
    dhikr: { name: "al-Razzāq", nameArabic: "الرزاق", meaning: "The Provider" },
    practice: "You may find benefit in taking one practical step toward your intention.",
    practiceArabic: "خذ خطوة عملية نحو نيتك"
  },
  3: {
    theme: "Expansion and Gratitude - This mansion is traditionally associated with increase and favorable outcomes. The quality supports growth and positive connection.",
    themeArabic: "الفرح والوفرة",
    energy: 'beginning',
    cycleRole: 'Seed',
    cycleRoleArabic: 'البذرة',
    goodFor: ["Celebrations", "Business matters", "Expressing gratitude", "Positive gatherings"],
    notIdealFor: ["Dwelling on difficulties", "Pessimistic approaches", "Isolation"],
    dhikr: { name: "al-Wahhāb", nameArabic: "الوهاب", meaning: "The Bestower" },
    practice: "You may find benefit in expressing gratitude for three blessings and sharing something with another.",
    practiceArabic: "اشكر على ثلاث نعم وشارك شيئاً مع غيرك"
  },
  4: {
    theme: "Clearing and Release - This mansion carries energy for clearing what no longer serves. It may support endings that enable new space.",
    themeArabic: "الكفاح والقطع",
    energy: 'beginning',
    cycleRole: 'Seed',
    cycleRoleArabic: 'البذرة',
    goodFor: ["Removing obstacles gently", "Releasing unhealthy attachments", "Clearing space", "Necessary endings"],
    notIdealFor: ["Reconciliation", "Beginning gentle projects", "Romantic beginnings"],
    dhikr: { name: "al-Qāhir", nameArabic: "القاهر", meaning: "The Subduer" },
    practice: "You may find benefit in identifying one thing that may be released and taking a small step.",
    practiceArabic: "حدد شيئاً يجب قطعه واتخذ إجراءً"
  },
  5: {
    theme: "Vitality and Care - This mansion is traditionally associated with physical well-being. Matters of health may settle well here.",
    themeArabic: "الصحة والحيوية",
    energy: 'stabilizing',
    cycleRole: 'Build',
    cycleRoleArabic: 'البناء',
    goodFor: ["Health matters", "Beginning care routines", "Recovery work", "Physical self-care"],
    notIdealFor: ["Ignoring body signals", "Overexertion", "Neglecting physical needs"],
    dhikr: { name: "al-Shāfī", nameArabic: "الشافي", meaning: "The Healer" },
    practice: "You may find benefit in doing something kind for your body: stretch, walk, rest, or eat mindfully.",
    practiceArabic: "افعل شيئاً لجسدك: تمدد أو امشِ أو ارتح"
  },
  6: {
    theme: "Connection and Affection - This mansion supports bonding and harmony. Relationships may deepen more readily here.",
    themeArabic: "الحب والصداقة",
    energy: 'stabilizing',
    cycleRole: 'Build',
    cycleRoleArabic: 'البناء',
    goodFor: ["Deepening relationships", "Strengthening friendships", "Expressing affection", "Social connection"],
    notIdealFor: ["Solitary striving", "Confrontation", "Endings"],
    dhikr: { name: "al-Wadūd", nameArabic: "الودود", meaning: "The Loving" },
    practice: "You may find benefit in reaching out to someone you appreciate and expressing it genuinely.",
    practiceArabic: "تواصل مع من تحب وعبّر عن تقديرك"
  },
  7: {
    theme: "Provision and Stewardship - This mansion is traditionally associated with material sustenance. Financial matters may settle well here.",
    themeArabic: "الثروة والازدهار",
    energy: 'stabilizing',
    cycleRole: 'Build',
    cycleRoleArabic: 'البناء',
    goodFor: ["Business considerations", "Financial planning", "Stewardship of resources", "Gratitude for provision"],
    notIdealFor: ["Charity beyond means", "Risky speculation", "Carelessness with resources"],
    dhikr: { name: "al-Ghanī", nameArabic: "الغني", meaning: "The Self-Sufficient" },
    practice: "You may find benefit in reviewing your resources with gratitude and making one wise decision.",
    practiceArabic: "راجع أموالك بامتنان واتخذ قراراً مالياً حكيماً"
  },
  8: {
    theme: "Openings and Establishment - This mansion is traditionally associated with favorable outcomes. Matters requiring clarity may settle well here.",
    themeArabic: "النصر والنجاح",
    energy: 'stabilizing',
    cycleRole: 'Build',
    cycleRoleArabic: 'البناء',
    goodFor: ["Seeking openings", "Meeting challenges with steadiness", "Requesting clarity", "Completing efforts"],
    notIdealFor: ["Retreating unnecessarily", "Abandoning efforts prematurely", "Self-doubt"],
    dhikr: { name: "al-Fattāḥ", nameArabic: "الفتاح", meaning: "The Opener" },
    practice: "You may find benefit in identifying a challenge and taking one sincere step toward meeting it.",
    practiceArabic: "حدد تحدياً واتخذ خطوة جريئة للتغلب عليه"
  },
  9: {
    theme: "Agreements and Trust - This mansion supports formal commitments and binding relationships. Agreements may settle well here.",
    themeArabic: "الشراكات والعقود",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Signing agreements", "Marriage", "Partnerships", "Making commitments"],
    notIdealFor: ["Breaking commitments", "Avoiding responsibility", "Casual arrangements"],
    dhikr: { name: "al-Wakīl", nameArabic: "الوكيل", meaning: "The Trustee" },
    practice: "You may find benefit in honoring a commitment or making a promise with sincerity.",
    practiceArabic: "أوفِ بالتزام أو قطع وعداً بجدية"
  },
  10: {
    theme: "Truth in Relationship - This mansion may reveal what is true in relationships. What is real may strengthen; what is not may become visible.",
    themeArabic: "اختبارات الحب",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Honest conversations", "Deepening authentic connection", "Allowing truth to emerge"],
    notIdealFor: ["Ignoring relationship matters", "Superficial connection", "Avoiding honest reflection"],
    dhikr: { name: "al-Ḥaqq", nameArabic: "الحق", meaning: "The Truth" },
    practice: "You may find benefit in having one honest conversation you have been postponing.",
    practiceArabic: "أجرِ محادثة صادقة كنت تتجنبها"
  },
  11: {
    theme: "Receiving and Gratitude - This mansion is traditionally associated with receiving what has been cultivated. Harvesting efforts may settle well here.",
    themeArabic: "المكافآت والفوائد",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Receiving gracefully", "Harvesting efforts", "Accepting appreciation", "Gratitude practices"],
    notIdealFor: ["Starting new endeavors", "Planting new seeds", "Future planning"],
    dhikr: { name: "al-Shakūr", nameArabic: "الشكور", meaning: "The Appreciative" },
    practice: "You may find benefit in receiving something gracefully without deflecting or diminishing.",
    practiceArabic: "تقبّل شيئاً بلطف دون رفض"
  },
  12: {
    theme: "Partings and Release - This mansion supports necessary endings and partings. Letting go may settle more gently here.",
    themeArabic: "الانفصالات",
    energy: 'ending',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Necessary endings", "Letting go gracefully", "Moving on", "Releasing attachments"],
    notIdealFor: ["Starting relationships", "New commitments", "Reconciliation"],
    dhikr: { name: "al-Ḥafīẓ", nameArabic: "الحفيظ", meaning: "The Preserver" },
    practice: "You may find benefit in letting go of something with blessing rather than bitterness.",
    practiceArabic: "دع شيئاً يذهب بالبركة لا بالمرارة"
  },
  13: {
    theme: "General Goodness - This mansion is traditionally considered benefic. Most matters tend to settle favorably here.",
    themeArabic: "الخير والبركات",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Most positive endeavors", "Marriage", "Journeys", "Business", "Healing", "Friendships"],
    notIdealFor: ["Harmful intentions", "Actions against conscience"],
    dhikr: { name: "al-Barr", nameArabic: "البر", meaning: "The Source of Goodness" },
    practice: "You may find benefit in doing an act of pure goodness with no expectation of return.",
    practiceArabic: "افعل خيراً دون توقع المقابل"
  },
  14: {
    theme: "Patience and Stillness - This mansion traditionally requires caution and patience. Stillness may serve better than action here.",
    themeArabic: "الممر الصعب",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Patience practices", "Endurance", "Inner work", "Quiet reflection", "Delayed action"],
    notIdealFor: ["Major decisions", "New ventures", "Important meetings", "Travel"],
    dhikr: { name: "al-Ṣabūr", nameArabic: "الصبور", meaning: "The Patient" },
    practice: "You may find benefit in practicing patience and delaying one decision that can wait.",
    practiceArabic: "تحلَّ بالصبر وأجِّل قراراً يمكن انتظاره"
  },
  15: {
    theme: "Hidden Knowledge - This mansion is traditionally associated with revealing what is concealed. Research and insight may settle well here.",
    themeArabic: "المعرفة المخفية",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Research", "Investigation", "Seeking understanding", "Spiritual insight", "Dream attention"],
    notIdealFor: ["Public announcements", "Self-promotion", "Extroversion"],
    dhikr: { name: "al-Bāṭin", nameArabic: "الباطن", meaning: "The Hidden" },
    practice: "You may find benefit in seeking knowledge of something not yet understood. Attend to dreams.",
    practiceArabic: "ابحث عن معرفة مخفية وانتبه لأحلامك"
  },
  16: {
    theme: "Balance and Justice - This mansion is traditionally associated with fair exchange. Negotiations and balancing may settle well here.",
    themeArabic: "التعاملات العادلة",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Negotiations", "Fair exchanges", "Legal matters", "Balancing accounts", "Seeking justice"],
    notIdealFor: ["Deception", "Unfair advantage", "Exploitation"],
    dhikr: { name: "al-ʿAdl", nameArabic: "العدل", meaning: "The Just" },
    practice: "You may find benefit in righting a wrong or balancing an account—material or relational.",
    practiceArabic: "صحح خطأً أو وازن حساباً مادياً أو علاقاتياً"
  },
  17: {
    theme: "Protection and Boundaries - This mansion supports safeguarding what matters. Security and boundaries may settle well here.",
    themeArabic: "الحماية والدفاع",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Protection practices", "Security measures", "Maintaining boundaries", "Safeguarding loved ones"],
    notIdealFor: ["Unnecessary aggression", "Excessive fear", "Harmful defensiveness"],
    dhikr: { name: "al-Muhaymin", nameArabic: "المهيمن", meaning: "The Guardian" },
    practice: "You may find benefit in strengthening one boundary or protecting something you value.",
    practiceArabic: "قوِّ حدوداً واحمِ ما تقدّره"
  },
  18: {
    theme: "Alliance and Mutual Support - This mansion supports building alliances and strengthening bonds. Cooperation may settle well here.",
    themeArabic: "الصداقة والتحالف",
    energy: 'stabilizing',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Building alliances", "Strengthening friendships", "Group endeavors", "Community building", "Asking for or offering help"],
    notIdealFor: ["Going it alone unnecessarily", "Rejecting help", "Isolation"],
    dhikr: { name: "al-Walī", nameArabic: "الولي", meaning: "The Protecting Friend" },
    practice: "You may find benefit in strengthening a friendship or offering help.",
    practiceArabic: "قوِّ صداقة أو اطلب أو قدِّم مساعدة"
  },
  19: {
    theme: "Rest and Restoration - This mansion is traditionally associated with pause and healing. Rest may be more restorative here.",
    themeArabic: "الراحة والتعافي",
    energy: 'ending',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Rest", "Recovery", "Retreating", "Self-care", "Healing", "Stillness"],
    notIdealFor: ["Starting new endeavors", "High-energy activities", "Major decisions"],
    dhikr: { name: "al-Salām", nameArabic: "السلام", meaning: "The Source of Peace" },
    practice: "You may find benefit in resting more than usual. Do less. Allow healing to unfold.",
    practiceArabic: "استرح أكثر وافعل أقل ودع الشفاء يحدث"
  },
  20: {
    theme: "Order and Discipline - This mansion supports bringing order and structure. Training and organizing may settle well here.",
    themeArabic: "الترويض والتهذيب",
    energy: 'ending',
    cycleRole: 'Relate',
    cycleRoleArabic: 'العلاقة',
    goodFor: ["Training", "Discipline practices", "Bringing order", "Establishing routines", "Organizing"],
    notIdealFor: ["Wild spontaneity", "Breaking helpful routines", "Chaos"],
    dhikr: { name: "al-Mudabbir", nameArabic: "المدبر", meaning: "The Arranger" },
    practice: "You may find benefit in bringing one aspect of your life into better order.",
    practiceArabic: "نظِّم جانباً فوضوياً من حياتك"
  },
  21: {
    theme: "Transformation and Release - This mansion supports ending what must end. Transformation through conscious release may settle well here.",
    themeArabic: "هدم القديم",
    energy: 'ending',
    cycleRole: 'Release',
    cycleRoleArabic: 'الإطلاق',
    goodFor: ["Ending what no longer serves", "Breaking patterns", "Transformation", "Conscious release"],
    notIdealFor: ["Preservation of the old", "Building", "Starting new things", "Gentleness"],
    dhikr: { name: "al-Mumīt", nameArabic: "المميت", meaning: "The Bringer of Death" },
    practice: "You may find benefit in consciously ending something that no longer serves you.",
    practiceArabic: "أنهِ شيئاً لم يعد يخدمك"
  },
  22: {
    theme: "Mending and Making Whole - This mansion is traditionally associated with deep healing. Restoration of what was broken may settle well here.",
    themeArabic: "الشفاء والترميم",
    energy: 'ending',
    cycleRole: 'Release',
    cycleRoleArabic: 'الإطلاق',
    goodFor: ["Deep healing", "Recovery", "Mending relationships", "Restoration", "Medical attention"],
    notIdealFor: ["Creating new wounds", "Aggression", "Conflict"],
    dhikr: { name: "al-Jabbār", nameArabic: "الجبار", meaning: "The Restorer" },
    practice: "You may find benefit in mending something broken—a relationship, an object, or your own heart.",
    practiceArabic: "أصلح شيئاً مكسوراً - علاقة أو قلبك"
  },
  23: {
    theme: "Completion and Finishing - This mansion supports completing what was started. Conclusions may settle well here.",
    themeArabic: "الإتمام والإنهاء",
    energy: 'ending',
    cycleRole: 'Release',
    cycleRoleArabic: 'الإطلاق',
    goodFor: ["Completing projects", "Finishing tasks", "Tying up loose ends", "Final touches", "Closure"],
    notIdealFor: ["Starting new things", "Opening new chapters", "Beginning"],
    dhikr: { name: "al-Muqsit", nameArabic: "المقسط", meaning: "The Equitable" },
    practice: "You may find benefit in completing one unfinished task that has been waiting.",
    practiceArabic: "أكمل مهمة واحدة غير منتهية"
  },
  24: {
    theme: "Freedom and Liberation - This mansion supports releasing bondage and finding liberation. Breaking free may settle well here.",
    themeArabic: "التحرير والحرية",
    energy: 'ending',
    cycleRole: 'Release',
    cycleRoleArabic: 'الإطلاق',
    goodFor: ["Breaking free from limitations", "Releasing bondage", "Seeking freedom", "Liberation practices"],
    notIdealFor: ["Creating new bindings", "Restriction", "Confinement"],
    dhikr: { name: "al-Muʿizz", nameArabic: "المعز", meaning: "The Bestower of Honor" },
    practice: "You may find benefit in releasing one thing that has felt like bondage.",
    practiceArabic: "حرر نفسك من قيد واحد"
  },
  25: {
    theme: "Protection in Hiddenness - This mansion is traditionally associated with hidden protection. Quiet spiritual work may settle well here.",
    themeArabic: "حظ المخفي",
    energy: 'ending',
    cycleRole: 'Release',
    cycleRoleArabic: 'الإطلاق',
    goodFor: ["Seeking angelic protection", "Hidden spiritual work", "Discretion", "Quiet devotion"],
    notIdealFor: ["Public display", "Seeking attention", "Exposure"],
    dhikr: { name: "al-Qawī", nameArabic: "القوي", meaning: "The Strong" },
    practice: "You may find benefit in quiet spiritual practice, seeking protection through hiddenness.",
    practiceArabic: "مارس الروحانية بهدوء واطلب الحماية"
  },
  26: {
    theme: "Subtlety and Awareness - This mansion requires vigilance. Subtle awareness and protection practices may settle well here.",
    themeArabic: "الفرغ المقدم",
    energy: 'ending',
    cycleRole: 'Release',
    cycleRoleArabic: 'الإطلاق',
    goodFor: ["Spiritual vigilance", "Subtle awareness", "Protection practices", "Discernment"],
    notIdealFor: ["Carelessness", "Ignoring subtle signals", "Spiritual neglect"],
    dhikr: { name: "al-Laṭīf", nameArabic: "اللطيف", meaning: "The Subtle" },
    practice: "You may find benefit in exercising spiritual vigilance and subtle awareness.",
    practiceArabic: "تحلَّ باليقظة الروحية والوعي الدقيق"
  },
  27: {
    theme: "Unity and Gathering - This mansion supports bringing together what belongs together. Community and human connection may settle well here.",
    themeArabic: "الفرغ المؤخر",
    energy: 'ending',
    cycleRole: 'Release',
    cycleRoleArabic: 'الإطلاق',
    goodFor: ["Community gathering", "Bringing people together", "Honoring human dignity", "Unity"],
    notIdealFor: ["Division", "Separation without purpose", "Isolation"],
    dhikr: { name: "al-Jāmiʿ", nameArabic: "الجامع", meaning: "The Uniter" },
    practice: "You may find benefit in gathering with others or honoring human connection.",
    practiceArabic: "اجتمع مع الآخرين وأكرم الكرامة الإنسانية"
  },
  28: {
    theme: "Completion and Surrender - This mansion marks the cycle's completion. Deep reflection and surrender may settle well here.",
    themeArabic: "بطن الحوت - الإتمام",
    energy: 'ending',
    cycleRole: 'Release',
    cycleRoleArabic: 'الإطلاق',
    goodFor: ["Deep reflection on spiritual station", "Surrender", "Cycle completion", "Preparing for renewal"],
    notIdealFor: ["Starting new worldly ventures", "Pushing forward", "Forcing beginnings"],
    dhikr: { name: "Rafīʿ al-Darajāt", nameArabic: "رافع الدرجات", meaning: "The Elevator of Degrees" },
    practice: "You may find benefit in deep reflection, surrender, and allowing the cycle to complete.",
    practiceArabic: "تأمل عميقاً واستسلم ودع الدورة تكتمل"
  }
};

export const QUALITY_COLORS = {
  'jalāl': {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/30',
    label: 'Majestic'
  },
  'jamāl': {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    label: 'Beautiful'
  },
  'kamāl': {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    label: 'Perfect'
  }
};

export const CYCLE_ROLE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Seed': {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/30'
  },
  'Build': {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/30'
  },
  'Relate': {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/30'
  },
  'Release': {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30'
  }
};
