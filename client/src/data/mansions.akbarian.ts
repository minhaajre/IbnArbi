// data/mansions.akbarian.ts
// Framework-safe mansion copy aligned with Ibn ʿArabī principles:
// - Time as a mirror (not a cause)
// - Adab with the moment (right response)
// - Heart-centered perception
// - Movement phases: Gathering / Differentiating / Separating
//
// Each mansion has unique descriptions based on its cosmological meaning.

export type MansionMovement = "Gathering" | "Differentiating" | "Separating";

export type SourceStatus =
  | "Framework-based (Ibn ʿArabī-aligned)"
  | "Text-attested (requires excerpt)";

export interface AkbarianMansion {
  id: number; // 1–28
  name_ar: string;
  name_translit: string;
  movement: MansionMovement;

  // One-sentence, posture-based theme
  akbarian_theme_en: string;

  // Optional Arabic theme if you already have it; keep blank rather than inventing.
  akbarian_theme_ar?: string;

  // Left column: what this time may support in inner posture / adab
  inner_adab_en: string[];

  // Right column: cautions (inner pitfalls; avoid prediction language)
  cautions_en: string[];

  // Prompts for journaling and self-observation
  reflection_prompts: string[];

  // Neutral practice suggestions (avoid claiming "Ibn ʿArabī assigns X Name")
  suggested_practice_en: string[];

  // Integrity flag for UI
  source_status: SourceStatus;
}

function reflectionPromptsForPhase(kind: "gather" | "differentiate" | "separate"): string[] {
  if (kind === "gather") {
    return [
      "What is being gathered in my attention right now?",
      "Where am I scattering energy unnecessarily?",
      "What small, consistent act would reflect good adab today?",
    ];
  }
  if (kind === "differentiate") {
    return [
      "What needs clearer boundaries or better measure right now?",
      "What am I confusing—fact, interpretation, and feeling?",
      "What would an honest, measured response look like?",
    ];
  }
  return [
    "What is naturally completing or loosening its hold right now?",
    "Am I in qabḍ (constriction) or basṭ (expansion)—and can I accept it?",
    "What would release look like without resentment or haste?",
  ];
}

export const MANSIONS_AKBARIAN: AkbarianMansion[] = [
  // 1–11 Gathering Phase
  {
    id: 1,
    name_ar: "الشراطان",
    name_translit: "Al-Sharṭayn",
    movement: "Gathering",
    akbarian_theme_en:
      "A beginning of gathering: collect intention, steady attention, and start with adab rather than haste.",
    inner_adab_en: [
      "Recognize the primordial impulse within you—the first Intellect stirring.",
      "Set intention with clarity and patience; seeds need steady attention to take root.",
      "Return again and again to your center; consistency is the foundation.",
      "Begin what you truly mean, not what external pressure demands.",
    ],
    cautions_en: [
      "Avoid false starts driven by urgency or restlessness.",
      "Avoid assuming the first impulse is the true one; sit with it first.",
      "Avoid scattering yourself across too many beginnings at once.",
      "Avoid beginning without inner agreement; force will not sustain.",
    ],
    reflection_prompts: reflectionPromptsForPhase("gather"),
    suggested_practice_en: [
      "Quiet morning sit: arrive before the day begins.",
      "Write your one true intention—not ten, just one.",
      "Walk slowly; feel your feet on the ground.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 2,
    name_ar: "البطين",
    name_translit: "Al-Butayn",
    movement: "Gathering",
    akbarian_theme_en:
      "Gathering deepens: strengthen inner readiness and stabilize the basics before expanding outward.",
    inner_adab_en: [
      "Attend to what is preserved within you—your innermost decrees.",
      "Ground yourself in rhythm: prayer, nourishment, sleep, return.",
      "Build the inner 'Tablet'—write what matters, record your lessons.",
      "Move slowly; let the Sacred preserve what you have begun.",
    ],
    cautions_en: [
      "Avoid exposing unripe intentions to external scrutiny.",
      "Avoid overexposure; protect what is still forming.",
      "Avoid rushing the preserving work; this mansion asks for patience.",
      "Avoid broadcasting plans before they have stabilized within you.",
    ],
    reflection_prompts: reflectionPromptsForPhase("gather"),
    suggested_practice_en: [
      "Journal: what are your unshakeable values?",
      "Tend to one small discipline daily without interruption.",
      "Hold what is precious in quiet; don't explain.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 3,
    name_ar: "الثريا",
    name_translit: "Al-Thurayyā",
    movement: "Gathering",
    akbarian_theme_en:
      "Gathering becomes more visible: refine attention and let your purpose become coherent without forcing outcomes.",
    inner_adab_en: [
      "Allow multiplicity to find unity—many aspects of self, one true aim.",
      "Seek inward knowledge; the Pleiades hide their light in brilliance.",
      "Let what is hidden within you become luminous—not through striving, but through clarity.",
      "Gather the scattered rays of attention into focus.",
    ],
    cautions_en: [
      "Avoid confusing busyness with clarity; multiplicity without unity clouds the way.",
      "Avoid hidden knowledge that doesn't illuminate your own life.",
      "Avoid the trap of knowing much while understanding little.",
      "Avoid fragmenting your attention across shiny distractions.",
    ],
    reflection_prompts: reflectionPromptsForPhase("gather"),
    suggested_practice_en: [
      "Meditate on clarity: sit with eyes softly open until one thing shines.",
      "Ask: what is my true north among all these concerns?",
      "Study something sacred; let it organize your scattered knowing.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 4,
    name_ar: "الدبران",
    name_translit: "Al-Dabarān",
    movement: "Gathering",
    akbarian_theme_en:
      "Gathering meets momentum: hold steadiness as energy rises, and keep the heart's aim clean.",
    inner_adab_en: [
      "Follow the true path with patience; substance (matter) takes time to manifest.",
      "Remember: you are following, not forcing—let divine order lead.",
      "Build from the ground up; material life requires steady foundations.",
      "Keep your inner eye on the last point of your intention—hold it steady.",
    ],
    cautions_en: [
      "Avoid running ahead of readiness; patience honors what manifests.",
      "Avoid the fantasy that action alone brings results without preparation.",
      "Avoid following false leaders or false impulses within yourself.",
      "Avoid impatience with the material world's proper pace.",
    ],
    reflection_prompts: reflectionPromptsForPhase("gather"),
    suggested_practice_en: [
      "Follow one teaching deeply; don't jump from teacher to teacher.",
      "Do one simple task completely and well today.",
      "In stillness, feel the substance of your own being.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 5,
    name_ar: "الهقعة",
    name_translit: "Al-Ḥaqʿa",
    movement: "Gathering",
    akbarian_theme_en:
      "Gathering invites interior order: gather your thoughts, simplify your plan, and strengthen the inner container.",
    inner_adab_en: [
      "Notice the white spot of clarity within confusion—it exists, even if faint.",
      "Manifest what is true, not what appears impressive.",
      "Organize the inner space: clear out what obscures the light.",
      "Make the invisible visible through patient arrangement.",
    ],
    cautions_en: [
      "Avoid bright surface appearance masking inner disorder.",
      "Avoid manifesting without first clarifying what is truly yours to express.",
      "Avoid mistaking visibility for virtue.",
      "Avoid outer organization that neglects the inner mess.",
    ],
    reflection_prompts: reflectionPromptsForPhase("gather"),
    suggested_practice_en: [
      "Organize one physical space with care and intention.",
      "Write: what is the clear, white-spot truth beneath my confusion?",
      "Clean; let physical clearing mirror inner simplification.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 6,
    name_ar: "الهنعة",
    name_translit: "Al-Hanʿa",
    movement: "Gathering",
    akbarian_theme_en:
      "Gathering matures: allow meanings to ripen through patience, not by forcing certainty.",
    inner_adab_en: [
      "Let time print the mark of wisdom upon your heart.",
      "Trust the slow work of divine wisdom shaping your understanding.",
      "Read the signs within you, not as predictions, but as patterns of becoming.",
      "Let the mark of maturity replace the mark of haste.",
    ],
    cautions_en: [
      "Avoid rushing wisdom; it cannot be forced into being.",
      "Avoid mistaking intellectual knowledge for inner ripeness.",
      "Avoid trying to skip the patient work of understanding.",
      "Avoid looking for signs that bypass the learning.",
    ],
    reflection_prompts: reflectionPromptsForPhase("gather"),
    suggested_practice_en: [
      "Study one teaching slowly; reread it several times.",
      "Walk in nature; observe how things ripen without forcing.",
      "Practice one spiritual exercise daily until it becomes natural.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 7,
    name_ar: "الذراع",
    name_translit: "Al-Dhirāʿ",
    movement: "Gathering",
    akbarian_theme_en:
      "Gathering learns action: choose one measured effort and protect attention from distraction.",
    inner_adab_en: [
      "Extend your capacity through measured action, not scattered doing.",
      "Support what you have begun; the Divine Throne encompasses all.",
      "Act with the wholeness of the Throne's embrace, not fragmented effort.",
      "Use your power (your arm) to hold fast what is essential.",
    ],
    cautions_en: [
      "Avoid overextending yourself; the forearm has limits.",
      "Avoid wild action divorced from intention and presence.",
      "Avoid using force when presence would suffice.",
      "Avoid trying to support too many things at once.",
    ],
    reflection_prompts: reflectionPromptsForPhase("gather"),
    suggested_practice_en: [
      "Choose one action today that is both strong and measured.",
      "Feel your arms and hands in service; not pushing, but offering.",
      "Ask: am I acting from presence or from panic?",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 8,
    name_ar: "النثرة",
    name_translit: "Al-Nathrah",
    movement: "Gathering",
    akbarian_theme_en:
      "Gathering clarifies intent through the heart: collect what matters and let the rest fall away.",
    inner_adab_en: [
      "Know where true nourishment comes from; distinguish real from false food.",
      "Create space—the gap where breath can flow, where silence holds meaning.",
      "Gather gratitude; it is the nutrient of the soul.",
      "Let the heart be the manger where your genuine life is fed.",
    ],
    cautions_en: [
      "Avoid consuming what does not nourish; mindlessly ingesting information, relationships, or habits.",
      "Avoid the false feeding of comparison and approval-seeking.",
      "Avoid filling every gap with noise; emptiness can be nourishing.",
      "Avoid ingesting without tasting.",
    ],
    reflection_prompts: reflectionPromptsForPhase("gather"),
    suggested_practice_en: [
      "Eat one meal slowly, with full attention to taste and nourishment.",
      "List what truly feeds your spirit—then prioritize it.",
      "Create one small empty space in your day; let it be still.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 9,
    name_ar: "الطرف",
    name_translit: "Al-Ṭarf",
    movement: "Gathering",
    akbarian_theme_en:
      "Gathering invites watchfulness: observe how the moment turns, and respond with restraint and presence.",
    inner_adab_en: [
      "The glance of presence sees what haste misses.",
      "Wealth is contentment; richness is noticing what is here.",
      "Stand at the boundary between worlds and see both; this is self-sufficiency.",
      "In solitude, discover the company of your own true nature.",
    ],
    cautions_en: [
      "Avoid the greedy glance that wants to grab and hoard.",
      "Avoid loneliness disguised as spirituality; real solitude nourishes.",
      "Avoid mistaking independence for disconnection.",
      "Avoid the outermost sphere without returning to center.",
    ],
    reflection_prompts: reflectionPromptsForPhase("gather"),
    suggested_practice_en: [
      "Sit quietly and observe—what is present without your effort?",
      "Practice one hour without checking external validation.",
      "Ask: what do I truly need? Strip away the rest.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 10,
    name_ar: "الجبهة",
    name_translit: "Al-Jabhah",
    movement: "Gathering",
    akbarian_theme_en:
      "Gathering consolidates direction: unify priorities and strengthen the inner agreement to stay consistent.",
    inner_adab_en: [
      "Face the truth with the forehead of courage; this is inner strength.",
      "Constellate your scattered efforts around your true north.",
      "The sphere of fixed stars does not waver; let your center be firm.",
      "Meet life face-on, not sideways or with averted gaze.",
    ],
    cautions_en: [
      "Avoid false strength that is rigidity rather than steadiness.",
      "Avoid the fixed stars without compassion; hardness breaks.",
      "Avoid facing challenges with only your will, without heart.",
      "Avoid the roof of hell: hardening into judgment.",
    ],
    reflection_prompts: reflectionPromptsForPhase("gather"),
    suggested_practice_en: [
      "Stand firm in one truth; state it aloud with courage.",
      "Feel the center of your forehead—this is your witness point.",
      "Face one difficulty directly; name it, don't avoid it.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 11,
    name_ar: "الزبرة",
    name_translit: "Al-Zubrah",
    movement: "Gathering",
    akbarian_theme_en:
      "The final gathering: complete what you started collecting, and prepare for clarity and measure to arrive.",
    inner_adab_en: [
      "The mane of strength crowns the gathering—your effort has weight and presence.",
      "You are now rooted in the First Heaven; you have risen in understanding.",
      "Prepare for the descent into clarity; the gathering is nearly complete.",
      "Surrender what you have gathered to what is greater; become an opening.",
    ],
    cautions_en: [
      "Avoid clinging to the gathering; completion asks for release.",
      "Avoid assuming you now know; knowledge is just beginning.",
      "Avoid pride in what has been gathered; it is all gift.",
      "Avoid stopping here; the cycle continues beyond.",
    ],
    reflection_prompts: reflectionPromptsForPhase("gather"),
    suggested_practice_en: [
      "Review what you have gathered; bless it and let it go.",
      "Prepare your heart for the next phase; clear the vessel.",
      "Stand in your own strength; know you are ready.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },

  // 12–16 Differentiating Phase
  {
    id: 12,
    name_ar: "الصرفة",
    name_translit: "Al-Ṣarfah",
    movement: "Differentiating",
    akbarian_theme_en:
      "Differentiating begins: what was gathered seeks clear measure—name things precisely and reduce ambiguity.",
    inner_adab_en: [
      "The Changer turns you now to measure what has grown.",
      "Divine Knowing examines what was gathered; call things by their true names.",
      "Change is opportunity to become precise, not to flee.",
      "This mansion asks for clarity of speech, thought, and intention.",
    ],
    cautions_en: [
      "Avoid harsh judgment disguised as clarity.",
      "Avoid over-analyzing what needs to breathe.",
      "Avoid the fantasy that naming things controls them.",
      "Avoid confusing change with chaos; measure brings order.",
    ],
    reflection_prompts: reflectionPromptsForPhase("differentiate"),
    suggested_practice_en: [
      "Name one thing you've been unclear about; be precise.",
      "Write: what is true, what is interpretation, what is fear?",
      "Speak with measured words today; listen before you answer.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 13,
    name_ar: "العواء",
    name_translit: "Al-ʿAwwā",
    movement: "Differentiating",
    akbarian_theme_en:
      "Differentiating continues: discern what belongs together and what does not, without harshness.",
    inner_adab_en: [
      "The Victorious Mars asks you to stand firm in truth without cruelty.",
      "Differentiate your true strength from defensive reaction.",
      "Call what you know clearly, but not as a weapon against another.",
      "Victory here is clarity with compassion.",
    ],
    cautions_en: [
      "Avoid using clarity as a sword to wound.",
      "Avoid meeting challenges with force alone—discernment matters more.",
      "Avoid the third heaven's intensity without grounding it in your heart.",
      "Avoid making others wrong to prove yourself right.",
    ],
    reflection_prompts: reflectionPromptsForPhase("differentiate"),
    suggested_practice_en: [
      "Meet one challenge with both firmness and kindness.",
      "Ask: can I be clear without being harsh?",
      "Stand in your truth without needing others to agree.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 14,
    name_ar: "السماك",
    name_translit: "Al-Simāk",
    movement: "Differentiating",
    akbarian_theme_en:
      "Differentiating invites balance: keep a just measure—neither excess nor deficiency—especially in speech and action.",
    inner_adab_en: [
      "The Unarmed asks you to meet life undefended—with presence, not armor.",
      "Illumination comes through simplicity, not through accumulation of knowledge.",
      "Humility opens the gates of understanding.",
      "Balance is not weakness; it is the widest strength.",
    ],
    cautions_en: [
      "Avoid intellectual pride that masquerades as spiritual knowledge.",
      "Avoid defending your position so fiercely you cannot hear.",
      "Avoid the sun's intensity without remembering night will come.",
      "Avoid simplicity that skips the real work of thinking.",
    ],
    reflection_prompts: reflectionPromptsForPhase("differentiate"),
    suggested_practice_en: [
      "Study humbly; listen more than you speak.",
      "Simplify one belief; see if it becomes truer.",
      "Approach one person without defense; just listen.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 15,
    name_ar: "الغفر",
    name_translit: "Al-Ghafr",
    movement: "Differentiating",
    akbarian_theme_en:
      "Differentiating refines discernment: notice subtle misalignment and correct gently, without self-attack.",
    inner_adab_en: [
      "Cover faults—your own and others'—with mercy, not with denial.",
      "The Form-Giver asks you to perceive divine beauty in all forms.",
      "Correct misalignment with gentleness; you too are still being formed.",
      "Grace covers what judgment would expose.",
    ],
    cautions_en: [
      "Avoid suppressing truth under the guise of kindness.",
      "Avoid creating false beauty that hides real dysfunction.",
      "Avoid harsh self-correction that crushes your own becoming.",
      "Avoid expecting perfection in an imperfect process.",
    ],
    reflection_prompts: reflectionPromptsForPhase("differentiate"),
    suggested_practice_en: [
      "Notice one misalignment gently; correct with compassion.",
      "Cover one fault in yourself with mercy instead of self-judgment.",
      "See beauty in what is imperfect; divine artistry continues.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 16,
    name_ar: "الزبانى",
    name_translit: "Al-Zubānā",
    movement: "Differentiating",
    akbarian_theme_en:
      "The final differentiating: boundaries become clear—choose right limits and let clarity settle before final release.",
    inner_adab_en: [
      "The Numberer, through Mercury, asks precise count of what is true and what must end.",
      "Healing comes through clear boundaries, not walls.",
      "Communication heals when it is honest and measured.",
      "The claws that grasp are also the hands that hold.",
    ],
    cautions_en: [
      "Avoid boundaries that are really rejection.",
      "Avoid perfectionism that masquerades as healing.",
      "Avoid using precision as control.",
      "Avoid withholding truth in the name of kindness.",
    ],
    reflection_prompts: reflectionPromptsForPhase("differentiate"),
    suggested_practice_en: [
      "Set one clear boundary with compassion.",
      "Heal one relationship through honest, measured speech.",
      "Count what is truly yours to do; say no to the rest.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },

  // 17–28 Separating Phase
  {
    id: 17,
    name_ar: "الإكليل",
    name_translit: "Al-Iklīl",
    movement: "Separating",
    akbarian_theme_en:
      "Separating begins: reduce what is unnecessary and allow the cycle to loosen from its earlier form.",
    inner_adab_en: [
      "The Crown of the Forehead shines brightest when burdens are released.",
      "Adam's clarity came through accepting his humanity, not transcending it.",
      "What was crowned with gathered intention is now crowned with understanding.",
      "Manifest your inner clarity without the weight of unnecessary forms.",
    ],
    cautions_en: [
      "Avoid stripping away what is essential under the guise of simplification.",
      "Avoid mistaking letting go for giving up.",
      "Avoid the seventh heaven without remaining human-hearted.",
      "Avoid shedding skin before the new one is ready.",
    ],
    reflection_prompts: reflectionPromptsForPhase("separate"),
    suggested_practice_en: [
      "Identify what you are ready to release; let it go with blessing.",
      "Simplify; remove one unnecessary layer from your life.",
      "Remember your humanity; this is your crown, not a flaw.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 18,
    name_ar: "القلب",
    name_translit: "Al-Qalb",
    movement: "Separating",
    akbarian_theme_en:
      "The turning of the heart: inward sensitivity increases, revealing what truly aligns and what no longer does.",
    inner_adab_en: [
      "The Heart speaks with intensity now—listen to what it seizes and what it releases.",
      "The Seizer of hearts teaches letting go; what you cling to, clings to you.",
      "Fire and ether now burn away what is not aligned with your truth.",
      "The intensity is not punishment; it is clarification.",
    ],
    cautions_en: [
      "Avoid mistaking heart-turning for heartbreak; the heart is wise.",
      "Avoid clinging to what the heart is releasing.",
      "Avoid the scorpion's sting without the scorpion's discernment.",
      "Avoid intense emotion as an excuse for unkindness.",
    ],
    reflection_prompts: reflectionPromptsForPhase("separate"),
    suggested_practice_en: [
      "Listen to your heart's turning; what is it saying must go?",
      "Release one attachment you've been holding; feel the relief.",
      "Sit with intensity without acting on it immediately.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 19,
    name_ar: "الشولة",
    name_translit: "Al-Shawlah",
    movement: "Separating",
    akbarian_theme_en:
      "Separating sharpens awareness: keep restraint in intensity, and choose clarity without aggression.",
    inner_adab_en: [
      "The Sting teaches vigilance without paranoia—clear awareness with an open heart.",
      "Life-breath (chi) now becomes clarified; use it for presence, not reaction.",
      "Sharpness can cut toward truth or toward harm; choose your cut.",
      "Air clears confusion when you breathe with awareness.",
    ],
    cautions_en: [
      "Avoid sharp words that sever instead of clarify.",
      "Avoid using vigilance as justification for control.",
      "Avoid the sting without the wisdom of the scorpion.",
      "Avoid breathing shallowly from fear; breathe fully and still.",
    ],
    reflection_prompts: reflectionPromptsForPhase("separate"),
    suggested_practice_en: [
      "Breathwork: let your breath become clear and steadying.",
      "Speak one truth sharply but kindly today.",
      "Notice what triggers a sting in you; what is it protecting?",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 20,
    name_ar: "النعائم",
    name_translit: "Al-Naʿāʾim",
    movement: "Separating",
    akbarian_theme_en:
      "Separating invites acceptance: let what is departing depart, and support the heart with gentleness.",
    inner_adab_en: [
      "Water gives life by yielding; yielding is the ostriches' wisdom—moving together.",
      "What is alive continues; what has its season is honored and released.",
      "Nourish what remains with the water of compassion and presence.",
      "Life-giving comes through acceptance, not through resistance.",
    ],
    cautions_en: [
      "Avoid trying to keep alive what has finished its cycle.",
      "Avoid drowning yourself in others' departures.",
      "Avoid the water element without fire—you need both.",
      "Avoid passivity mistaken for acceptance.",
    ],
    reflection_prompts: reflectionPromptsForPhase("separate"),
    suggested_practice_en: [
      "Bless what is leaving; let it go with gratitude.",
      "Care for what remains; tend it with gentle presence.",
      "Feel water's wisdom—yield without disappearing.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 21,
    name_ar: "البلدة",
    name_translit: "Al-Baldah",
    movement: "Separating",
    akbarian_theme_en:
      "A pause within release: simplify plans, rest the mind, and allow silence to restore proportion.",
    inner_adab_en: [
      "The earth element brings you to rest; in stillness, you are grounded.",
      "The City is a shelter for completion—a place to rest before the next cycle.",
      "Endings are not failures; they are the earth's patient work of composting.",
      "In silence and simplicity, death and renewal are one.",
    ],
    cautions_en: [
      "Avoid seeing rest as laziness; the earth knows when to lie fallow.",
      "Avoid endless explaining of what is ending; let it be.",
      "Avoid the fear of endings; the earth always renews.",
      "Avoid remaining in the city; you must leave eventually.",
    ],
    reflection_prompts: reflectionPromptsForPhase("separate"),
    suggested_practice_en: [
      "Rest completely, without guilt, for one day.",
      "Sit in silence; let the city of your mind grow still.",
      "Release one plan; accept that it will not happen.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 22,
    name_ar: "سعد الذابح",
    name_translit: "Saʿd al-Dhābiḥ",
    movement: "Separating",
    akbarian_theme_en:
      "Release through right sacrifice: let go of what drains integrity, and choose inward truth over appearance.",
    inner_adab_en: [
      "Minerals and metals are forged through pressure; sacrifice refines you.",
      "The Slayers fortune comes through releasing what is not precious.",
      "What you sacrifice is not lost; it is transmuted into strength.",
      "Generosity of spirit opens doors; stinginess closes them.",
    ],
    cautions_en: [
      "Avoid sacrificing what is truly yours to keep.",
      "Avoid martyrdom; sacrifice should come freely, not from compulsion.",
      "Avoid the metals becoming hard and cold; heat them with love.",
      "Avoid 'fortune' that costs your integrity.",
    ],
    reflection_prompts: reflectionPromptsForPhase("separate"),
    suggested_practice_en: [
      "Release one thing that drains your integrity; name it and let it go.",
      "Give generously from what you truly have.",
      "Feel the gift in what you release; bless the space it opens.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 23,
    name_ar: "سعد بلع",
    name_translit: "Saʿd Bulaʿ",
    movement: "Separating",
    akbarian_theme_en:
      "Digest what has occurred: allow experience to be assimilated before you seek a new chapter.",
    inner_adab_en: [
      "The plant kingdom teaches integration—what is taken in becomes part of you.",
      "Fortune comes through nourishing yourself with your own experience.",
      "Growth happens through patient assimilation, not through rushing onward.",
      "What you swallow becomes your strength; chew it thoroughly.",
    ],
    cautions_en: [
      "Avoid racing to the next chapter before digesting this one.",
      "Avoid indigestion of experience—it will return.",
      "Avoid forcing growth; some things must be slowly absorbed.",
      "Avoid refusing the nourishment your own experience offers.",
    ],
    reflection_prompts: reflectionPromptsForPhase("separate"),
    suggested_practice_en: [
      "Reflect: what has this cycle taught you? Let it integrate.",
      "Write: what will you take with you from what is ending?",
      "Sit with your experience; don't flee into the next thing.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 24,
    name_ar: "سعد السعود",
    name_translit: "Saʿd al-Suʿūd",
    movement: "Separating",
    akbarian_theme_en:
      "A quiet ease within completion: protect calm, reduce burdens, and let gratitude soften the ending.",
    inner_adab_en: [
      "The animal realm teaches instinctive rightness; trust your deepened knowing.",
      "Fortune is ease, not struggle—when you've done the work.",
      "Humility is not self-diminishment; it is honest self-knowing.",
      "The creatures trust their nature; so trust yours.",
    ],
    cautions_en: [
      "Avoid forcing ease; sometimes completion has one more push.",
      "Avoid pride disguised as humility.",
      "Avoid the animal nature without conscience; that's not instinct, that's unconsciousness.",
      "Avoid ease that becomes complacency.",
    ],
    reflection_prompts: reflectionPromptsForPhase("separate"),
    suggested_practice_en: [
      "Feel your ease; you have done the work. Rest in it.",
      "Observe animals; they know how to complete a cycle.",
      "Let gratitude for the cycle complete it more gently.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 25,
    name_ar: "سعد الأخبية",
    name_translit: "Saʿd al-Akhbiyah",
    movement: "Separating",
    akbarian_theme_en:
      "Withdrawal for preservation: keep what is essential, shelter the heart, and release what is excess.",
    inner_adab_en: [
      "The angelic realm protects by knowing what to shelter and what to expose.",
      "Hidden fortune is the greatest fortune—what no one can take from you.",
      "Strength is in discernment, not in showing all your cards.",
      "Withdrawing is not weakness; it is strategic preservation.",
    ],
    cautions_en: [
      "Avoid isolation mistaken for protection.",
      "Avoid hiding what needs to be seen.",
      "Avoid the angels without remaining human and present.",
      "Avoid secrecy that becomes dishonesty.",
    ],
    reflection_prompts: reflectionPromptsForPhase("separate"),
    suggested_practice_en: [
      "Withdraw one thing from exposure; protect what is precious.",
      "Know what is yours to keep and what is theirs to know.",
      "Guard your inner work; let it ripen in silence.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 26,
    name_ar: "الفرغ المقدم",
    name_translit: "Al-Fargh al-Muqaddam",
    movement: "Separating",
    akbarian_theme_en:
      "Completion approaches: clear unfinished threads and let simplification prepare you for renewal.",
    inner_adab_en: [
      "The jinn realm teaches subtle awareness—notice what remains undone.",
      "The First Spout pours out what no longer serves; be the vessel that pours.",
      "Between-ness is a gift; hold both worlds lightly as you depart.",
      "Completion is not perfection; it is ready enough.",
    ],
    cautions_en: [
      "Avoid getting lost in the between-worlds without returning to earth.",
      "Avoid obsessing over loose threads; some can remain loose.",
      "Avoid the jinn's trickiness—be straight with yourself.",
      "Avoid waiting for perfection before you let go.",
    ],
    reflection_prompts: reflectionPromptsForPhase("separate"),
    suggested_practice_en: [
      "Clear one true loose thread; let the rest go.",
      "Notice the subtlety in what remains; attend to it.",
      "Prepare yourself for what comes next; ready the vessel.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 27,
    name_ar: "الفرغ المؤخر",
    name_translit: "Al-Fargh al-Muʾakhkhar",
    movement: "Separating",
    akbarian_theme_en:
      "Near-final release: allow closure, forgive where possible, and avoid reopening what is already ending.",
    inner_adab_en: [
      "Humanity's wisdom is knowing when to let go—of grudges, of plans, of outcomes.",
      "The Second Spout pours final closure; let what has gathered now scatter to wind.",
      "Community ends; you remain. Individuals part; the essence continues.",
      "Forgiveness is the final thread to cut.",
    ],
    cautions_en: [
      "Avoid using forgiveness as a way to avoid genuine harm.",
      "Avoid trying to keep community together beyond its time.",
      "Avoid the human trap of endless unfinished business.",
      "Avoid closure that masks avoidance.",
    ],
    reflection_prompts: reflectionPromptsForPhase("separate"),
    suggested_practice_en: [
      "Forgive one person—truly, not just in words.",
      "Let one relationship complete without trying to reopen it.",
      "Close one chapter cleanly; mark the end.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
  {
    id: 28,
    name_ar: "بطن الحوت",
    name_translit: "Baṭn al-Ḥūt",
    movement: "Separating",
    akbarian_theme_en:
      "The end of the cycle: surrender what you cannot control, rest in presence, and prepare for a new beginning.",
    inner_adab_en: [
      "The belly of the fish is darkness and safety—the womb before rebirth.",
      "The hidden order that sustains all existence will sustain you.",
      "Surrender is not defeat; it is alignment with what cannot be forced.",
      "Rest here; the cycle is complete, and a new one is ready.",
    ],
    cautions_en: [
      "Avoid despair in the darkness; the whale is not drowning you.",
      "Avoid trying to know the whole order; trust the parts you cannot see.",
      "Avoid premature birth; rest in the darkness until you are ready.",
      "Avoid clinging to the cycle that is ending; the new is coming.",
    ],
    reflection_prompts: reflectionPromptsForPhase("separate"),
    suggested_practice_en: [
      "Rest in darkness; this is the womb, not a tomb.",
      "Release control; let what sustains you hold you.",
      "Surrender one thing completely; feel the relief.",
      "Read as a mirror for awareness, not a prediction.",
    ],
    source_status: "Framework-based (Ibn ʿArabī-aligned)",
  },
];
