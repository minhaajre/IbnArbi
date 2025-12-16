import { Link } from "wouter";
import { ArrowLeft, Moon, Sun, Clock, Orbit, Star, Scroll, MapPin, Calendar, ChevronDown, Sparkles, Heart, BookOpen, Eye, EyeOff, Compass, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableOfContents, TOCSection } from "@/components/TableOfContents";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const INSTRUCTIONS_SECTIONS: TOCSection[] = [
  { id: "about-app", title: "About This App" },
  { id: "signs-not-causes", title: "Signs, Not Causes" },
  { id: "lunar-mansions", title: "Lunar Mansions" },
  { id: "planetary-hours", title: "Planetary Hours" },
  { id: "celestial-dignities", title: "Celestial Dignities" },
  { id: "elemental-balance", title: "Elemental Balance" },
  { id: "how-to-use", title: "How to Use Daily" },
  { id: "reading-planetary-hours", title: "Reading Planetary Hours" },
  { id: "reading-lunar-mansion", title: "Reading Lunar Mansion" },
  { id: "combining-hour-mansion", title: "Combining Hour & Mansion" },
  { id: "ibn-arabi-background", title: "Ibn ʿArabī Background" },
  { id: "cosmology-simple", title: "Cosmology Made Simple" },
  { id: "key-further-readings", title: "Key Further Readings" },
];
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MANSION_DETAILS = [
  {
    number: 1,
    name: "Al-Sharṭayn",
    arabic: "الشراطان",
    theme: "Pure intention, vision, clarity",
    category: "Gathering",
    maySupport: "Starting ideas, planning, setting intentions",
    useCautionWith: "Major commitments before clarity settles",
    waxing: "May support setting intentions",
    waning: "May support reviewing purpose",
    divineName: "al-Nūr (The Light)",
    ritual: "Writing intentions, journaling",
    nature: "blessed"
  },
  {
    number: 2,
    name: "Al-Butayn",
    arabic: "البطين",
    theme: "Emotional imprint, inner truth",
    category: "Gathering",
    maySupport: "Healing, emotional clarity, introspection",
    useCautionWith: "Confrontation, major new ventures",
    waxing: "May support planting seeds of emotional healing",
    waning: "May support releasing old emotional patterns",
    divineName: "al-Baṣīr (The All-Seeing)",
    ritual: "Journaling, dua for guidance",
    nature: "challenging"
  },
  {
    number: 3,
    name: "Al-Thurayyā",
    arabic: "الثريا",
    theme: "Creativity, insight, inspiration",
    category: "Gathering",
    maySupport: "Communication, study, art, seeking hidden knowledge",
    useCautionWith: "Mundane tasks that may dissipate creative energy",
    waxing: "May support beginning creative projects",
    waning: "May support completing artistic works",
    divineName: "al-Fattāḥ (The Opener)",
    ritual: "Creative expression, spiritual retreats",
    nature: "blessed"
  },
  {
    number: 4,
    name: "Al-Dabarān",
    arabic: "الدبران",
    theme: "Foundation, raw material, patience",
    category: "Gathering",
    maySupport: "Setting long-term plans, following through on commitments",
    useCautionWith: "Sudden decisions, impatience",
    waxing: "May support building foundations",
    waning: "May support consolidating what you have",
    divineName: "al-Qadīr (The Powerful)",
    ritual: "Organizing, structuring, patient work",
    nature: "blessed"
  },
  {
    number: 5,
    name: "Al-Ḥaqʿa",
    arabic: "الهقعة",
    theme: "Embodiment, grounding, manifestation",
    category: "Gathering",
    maySupport: "Health routines, stability, quiet contemplation",
    useCautionWith: "Overexertion, excessive outward action",
    waxing: "May support establishing healthy habits",
    waning: "May support releasing unhealthy patterns",
    divineName: "al-Muqīt (The Sustainer)",
    ritual: "Body-focused practices, grounding",
    nature: "challenging"
  },
  {
    number: 6,
    name: "Al-Hanʿa",
    arabic: "الهنعة",
    theme: "Form-taking, wisdom, divine patterns",
    category: "Gathering",
    maySupport: "Contracts, marriage talks, seeking wisdom, teaching",
    useCautionWith: "Hasty agreements without reflection",
    waxing: "May support formalizing agreements",
    waning: "May support reviewing existing commitments",
    divineName: "al-Muṣawwir (The Fashioner)",
    ritual: "Study sacred texts, teaching others",
    nature: "blessed"
  },
  {
    number: 7,
    name: "Al-Dhiraʿ",
    arabic: "الذراع",
    theme: "Authority, sovereignty, expansiveness",
    category: "Gathering",
    maySupport: "Leadership decisions, charitable works, embracing divine vastness",
    useCautionWith: "Ego-driven actions",
    waxing: "May support expanding influence positively",
    waning: "May support reflecting on responsibilities",
    divineName: "al-Malik (The King)",
    ritual: "Expansive thinking, charity",
    nature: "blessed"
  },
  {
    number: 8,
    name: "Al-Nathra",
    arabic: "النثرة",
    theme: "Boundaries, gratitude, divine governance",
    category: "Gathering",
    maySupport: "Closing deals, setting limits, expressing gratitude",
    useCautionWith: "Demanding or entitled behavior",
    waxing: "May support establishing healthy boundaries",
    waning: "May support releasing resentments with gratitude",
    divineName: "al-Ḥafīẓ (The Preserver)",
    ritual: "Gratitude practice, boundary-setting",
    nature: "challenging"
  },
  {
    number: 9,
    name: "Al-Ṭarf",
    arabic: "الطرف",
    theme: "Independence, self-sufficiency, the boundary of creation",
    category: "Gathering",
    maySupport: "Solitary spiritual practice, cultivating contentment",
    useCautionWith: "Excessive dependency on others",
    waxing: "May support building inner resources",
    waning: "May support releasing attachments to outcomes",
    divineName: "al-Ghanī (The Self-Sufficient)",
    ritual: "Solitary practice, contentment meditation",
    nature: "challenging"
  },
  {
    number: 10,
    name: "Al-Jabhah",
    arabic: "الجبهة",
    theme: "Discipline, truth, power (Saturn's realm)",
    category: "Gathering",
    maySupport: "Difficult conversations, building strength, leadership",
    useCautionWith: "Emotional impulsivity",
    waxing: "May support taking considered action",
    waning: "May support releasing power struggles",
    divineName: "al-Ḥakīm (The Wise)",
    ritual: "Truth-telling, difficult but necessary conversations",
    nature: "blessed"
  },
  {
    number: 11,
    name: "Al-Zubrah",
    arabic: "الزبرة",
    theme: "Devotion, surrender, tradition (Saturn's heaven)",
    category: "Gathering",
    maySupport: "Devotional practices, honoring traditions, surrender to the Divine",
    useCautionWith: "Rebellion against sacred order",
    waxing: "May support deepening spiritual commitments",
    waning: "May support releasing outdated traditions",
    divineName: "al-Rabb (The Lord)",
    ritual: "Devotional practices, honoring ancestors",
    nature: "blessed"
  },
  {
    number: 12,
    name: "Al-Ṣarfah",
    arabic: "الصرفة",
    theme: "Transition, change, seeking knowledge (Jupiter's realm)",
    category: "Differentiating",
    maySupport: "Being open to necessary changes, seeking knowledge",
    useCautionWith: "Resisting inevitable transitions",
    waxing: "May support embracing positive change",
    waning: "May support letting go of what must change",
    divineName: "al-ʿAlīm (The All-Knowing)",
    ritual: "Study, openness to change",
    nature: "challenging"
  },
  {
    number: 13,
    name: "Al-ʿAwwā",
    arabic: "العواء",
    theme: "Victory, overcoming obstacles (Mars' realm)",
    category: "Differentiating",
    maySupport: "Overcoming obstacles, spiritual resolve, standing firm",
    useCautionWith: "Unnecessary conflict",
    waxing: "May support advancing toward goals",
    waning: "May support releasing battles not worth fighting",
    divineName: "al-Qāhir (The Victorious)",
    ritual: "Courage practices, standing in truth",
    nature: "blessed"
  },
  {
    number: 14,
    name: "Al-Simāk",
    arabic: "السماك",
    theme: "Illumination, humility (Sun's realm - Idris' abode)",
    category: "Differentiating",
    maySupport: "Study, seeking illumination through humility",
    useCautionWith: "Confrontation, arrogance",
    waxing: "May support seeking light through learning",
    waning: "May support releasing pride and ego",
    divineName: "al-Nūr (The Light)",
    ritual: "Humble study, sacred sciences",
    nature: "challenging"
  },
  {
    number: 15,
    name: "Al-Ghafr",
    arabic: "الغفر",
    theme: "Beauty, forgiveness, covering faults (Venus' realm)",
    category: "Differentiating",
    maySupport: "Creative work, beauty, seeking forgiveness, covering others' faults",
    useCautionWith: "Exposing others' weaknesses",
    waxing: "May support creating beauty, strengthening bonds",
    waning: "May support forgiveness and releasing grudges",
    divineName: "al-Ghafūr (The Forgiving)",
    ritual: "Creative work, forgiveness practices",
    nature: "blessed"
  },
  {
    number: 16,
    name: "Al-Zubānā",
    arabic: "الزبانى",
    theme: "Accounting, communication, healing (Mercury's realm)",
    category: "Differentiating",
    maySupport: "Accounting, organizing, communication, healing work",
    useCautionWith: "Deception, miscommunication",
    waxing: "May support organizing and communicating clearly",
    waning: "May support clearing miscommunications",
    divineName: "al-Muḥṣī (The Reckoner)",
    ritual: "Accounting, clear communication",
    nature: "blessed"
  },
  {
    number: 17,
    name: "Al-Iklīl",
    arabic: "الإكليل",
    theme: "Memory, dreams, emotional clarity (Moon's realm)",
    category: "Separating",
    maySupport: "Clarity, making things manifest, honoring humanity",
    useCautionWith: "Confusion, unclear intentions",
    waxing: "May support manifesting intentions clearly",
    waning: "May support clearing emotional confusion",
    divineName: "al-Mubīn (The Evident)",
    ritual: "Dreamwork, emotional healing",
    nature: "blessed"
  },
  {
    number: 18,
    name: "Al-Qalb",
    arabic: "القلب",
    theme: "Heart purification, release (Ethereal realm)",
    category: "Separating",
    maySupport: "Heart purification, releasing attachments",
    useCautionWith: "Clinging to what must go",
    waxing: "May support strengthening heart's resolve",
    waning: "May support releasing heart attachments",
    divineName: "al-Qābiḍ (The Restrainer)",
    ritual: "Heart purification, letting go",
    nature: "challenging"
  },
  {
    number: 19,
    name: "Al-Shawlah",
    arabic: "الشولة",
    theme: "Vital life force, breath (Air realm)",
    category: "Separating",
    maySupport: "Breathwork, cultivating vital life force",
    useCautionWith: "Reckless actions",
    waxing: "May support building vital energy",
    waning: "May support releasing stagnant energy",
    divineName: "al-Ḥayy (The Ever-Living)",
    ritual: "Breathwork, vitality practices",
    nature: "challenging"
  },
  {
    number: 20,
    name: "Al-Naʿāʾim",
    arabic: "النعائم",
    theme: "Nurturing, life-giving (Water realm)",
    category: "Separating",
    maySupport: "Nurturing what is valuable, healing, purification",
    useCautionWith: "Neglecting what needs care",
    waxing: "May support nurturing growth",
    waning: "May support purification and cleansing",
    divineName: "al-Muḥyī (The Life-Giver)",
    ritual: "Healing rituals, water purification",
    nature: "challenging"
  },
  {
    number: 21,
    name: "Al-Baldah",
    arabic: "البلدة",
    theme: "Endings, letting go, transformation (Earth realm)",
    category: "Separating",
    maySupport: "Endings, letting go, transformation, preparing for rebirth",
    useCautionWith: "Clinging to the old",
    waxing: "May support conscious transformation",
    waning: "May support completing endings gracefully",
    divineName: "al-Mumīt (The Bringer of Death)",
    ritual: "Closure rituals, letting go",
    nature: "blessed"
  },
  {
    number: 22,
    name: "Saʿd al-Dhābiḥ",
    arabic: "سعد الذابح",
    theme: "Sacrifice, cutting away the old (Mineral realm)",
    category: "Separating",
    maySupport: "Ending habits, releasing debts, practicing generosity",
    useCautionWith: "Holding onto what no longer serves",
    waxing: "May support sacrificing for growth",
    waning: "May support cutting away the unnecessary",
    divineName: "al-Qahhār (The Subduer)",
    ritual: "Sacrifice, generosity, release",
    nature: "challenging"
  },
  {
    number: 23,
    name: "Saʿd Bulaʿ",
    arabic: "سعد بلع",
    theme: "Purification, nourishment (Plant realm)",
    category: "Separating",
    maySupport: "Fasting, detox, forgiveness, planting seeds",
    useCautionWith: "Overindulgence",
    waxing: "May support planting new seeds of intention",
    waning: "May support fasting and purification",
    divineName: "al-Tawwāb (The Acceptor of Repentance)",
    ritual: "Fasting, purification, planting",
    nature: "blessed"
  },
  {
    number: 24,
    name: "Saʿd al-Suʿūd",
    arabic: "سعد السعود",
    theme: "Renewal, humility (Animal realm)",
    category: "Separating",
    maySupport: "Rebirth after endings, practicing humility, caring for creatures",
    useCautionWith: "Pride and arrogance",
    waxing: "May support embracing new beginnings humbly",
    waning: "May support releasing pride",
    divineName: "al-Mudhill (The Humbler)",
    ritual: "Humility practices, animal care",
    nature: "challenging"
  },
  {
    number: 25,
    name: "Saʿd al-Akhbiyah",
    arabic: "سعد الأخبية",
    theme: "Hidden forces, angelic realm",
    category: "Separating",
    maySupport: "Seclusion, prayer, angelic invocations, spiritual protection",
    useCautionWith: "Worldly distractions",
    waxing: "May support seeking angelic assistance",
    waning: "May support releasing to angelic care",
    divineName: "al-Jabbār (The Compeller)",
    ritual: "Seclusion, deep prayer, angelic work",
    nature: "blessed"
  },
  {
    number: 26,
    name: "Al-Fargh al-Muqaddam",
    arabic: "الفرغ المقدم",
    theme: "Subtle awareness, jinn realm",
    category: "Separating",
    maySupport: "Spiritual vigilance, subtle awareness, protection practices",
    useCautionWith: "Naivety about unseen influences",
    waxing: "May support strengthening spiritual protection",
    waning: "May support clearing subtle disturbances",
    divineName: "al-Laṭīf (The Subtle)",
    ritual: "Protection practices, subtle awareness",
    nature: "challenging"
  },
  {
    number: 27,
    name: "Al-Fargh al-Muʾakhkhar",
    arabic: "الفرغ المؤخر",
    theme: "Unity, human dignity, collective destiny",
    category: "Separating",
    maySupport: "Community, bringing people together, honoring human dignity",
    useCautionWith: "Division, isolation",
    waxing: "May support building community bonds",
    waning: "May support releasing divisive patterns",
    divineName: "al-Jāmiʿ (The Gatherer)",
    ritual: "Community work, unity practices",
    nature: "blessed"
  },
  {
    number: 28,
    name: "Baṭn al-Ḥūt",
    arabic: "بطن الحوت",
    theme: "Completion, elevation, surrender",
    category: "Separating",
    maySupport: "Ending cycles, surrender, deep reflection on spiritual station",
    useCautionWith: "Starting new worldly ventures prematurely",
    waxing: "May support preparing for completion",
    waning: "May support complete surrender, closing the cycle",
    divineName: "Rafīʿ al-Darajāt (The Elevator of Degrees)",
    ritual: "Deep reflection, surrender, cycle completion",
    nature: "challenging"
  }
];

const CATEGORY_COLORS: Record<string, string> = {
  "Gathering": "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
  "Differentiating": "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
  "Separating": "bg-amber-500/20 text-amber-400 border-amber-500/40"
};

const DIVINE_NAMES_WATERMARK = "الله الرحمن الرحيم الملك القدوس السلام المؤمن المهيمن العزيز الجبار المتكبر الخالق البارئ المصور الغفار القهار الوهاب الرزاق الفتاح العليم";

export default function Instructions() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Andalusian Divine Names Watermark Background */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden opacity-[0.03] z-0">
        <div className="absolute inset-0 font-arabic text-6xl sm:text-8xl leading-loose text-foreground whitespace-pre-wrap break-words p-8 transform rotate-[-5deg] scale-110">
          {DIVINE_NAMES_WATERMARK} {DIVINE_NAMES_WATERMARK} {DIVINE_NAMES_WATERMARK} {DIVINE_NAMES_WATERMARK} {DIVINE_NAMES_WATERMARK} {DIVINE_NAMES_WATERMARK} {DIVINE_NAMES_WATERMARK} {DIVINE_NAMES_WATERMARK}
        </div>
      </div>
      <div className="relative z-10 p-4 sm:p-8 md:p-12 max-w-6xl mx-auto">
        <header className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4" data-testid="back-to-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to App
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-serif text-gold mb-2">
            Instructions <span className="font-arabic">تعليمات</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            A guide to using Ibn Arabi's Cosmology App based on his spiritual teachings
          </p>
        </header>

        <div className="space-y-8">
          <section id="about-app" className="glass-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
              <Scroll className="w-5 h-5" />
              About This App
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-base">
              This application draws from the cosmological teachings of Muhyiddin Ibn ʿArabi (1165-1240 CE), 
              the great Sufi master known as "Sheikh al-Akbar" (The Greatest Master). His work describes 
              a vision of existence flowing from the Divine Essence through the celestial spheres 
              into the material world—a cosmos alive with meaning.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              The 28 Lunar Mansions (Manazil al-Qamar) represent stages of spiritual unfolding, 
              connected to the Arabic letters, Divine Names, and prophetic stations as described in 
              Ibn ʿArabi's works. This app offers these traditional frameworks as a mirror for reflection, 
              inviting awareness rather than prescription.
            </p>
          </section>

          {/* A1: How Ibn ʿArabī reads time */}
          <section id="signs-not-causes" className="glass-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5" />
              How Ibn ʿArabī Reads Time: Signs, Not Causes
              <span className="font-arabic text-lg">كيف يقرأ ابن عربي الزمن: علامات لا أسباب</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed text-base">
                In Ibn ʿArabī's view, celestial cycles do not compel outcomes. They are a symbolic language 
                through which meanings become readable in time. The value of this app is not control, but 
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <strong className="text-foreground cursor-help border-b border-dotted border-foreground/50"> adab</strong>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs bg-white text-foreground border border-border p-3 rounded-lg shadow-lg">
                      <div className="text-sm font-medium mb-1">Adab (أدب)</div>
                      <div className="text-xs text-muted-foreground">Spiritual etiquette—meeting each moment with presence, humility, and right conduct.</div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                : meeting the moment with presence, humility, and clear intention.
              </p>
              <div className="p-4 rounded-lg bg-gold/10 border border-gold/30">
                <p className="text-sm italic text-foreground/80 text-center">
                  Read the sky as a mirror, not as a machine.
                </p>
              </div>
            </div>
          </section>

          <section id="lunar-mansions" className="glass-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
              <Moon className="w-5 h-5" />
              Lunar Mansions <span className="font-arabic text-lg">المنازل القمرية</span>
            </h2>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p className="leading-relaxed text-base">
                The Moon travels through each of the 28 mansions approximately every day. Each mansion is traditionally understood as 
                a <strong className="text-foreground">place where a specific divine quality becomes accessible</strong>, 
                carrying its own character, mood, and potential for spiritual openings.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2 text-base">
                <li><strong className="text-foreground">Current Mansion:</strong> See which lunar mansion the Moon currently occupies.</li>
                <li><strong className="text-foreground">Movement Phase:</strong> Each mansion belongs to one of three movements—Gathering (emerald), Differentiating (cyan), or Separating (amber)—indicating the quality of time.</li>
                <li><strong className="text-foreground">Suggested Activities:</strong> Actions that may harmonize with the mansion's quality.</li>
                <li><strong className="text-foreground">Divine Attributes:</strong> The Divine Name traditionally associated with this mansion, offered for contemplation.</li>
              </ul>
            </div>

            {/* Three Movements of the Mansions */}
            <div className="mb-6 p-5 rounded-lg bg-foreground/5 border border-border">
              <h3 className="text-base font-medium text-foreground mb-3">The Three Movements of the Mansions</h3>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                The mansions do not cause events. They describe how meanings move through time: gathering, differentiating, and separating.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-4 rounded-lg bg-card/30 border border-emerald-500/20 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-lg block text-center min-w-16">1–11</span>
                    <div>
                      <strong className="text-foreground text-base block">Gathering</strong>
                      <span className="font-arabic text-emerald-400/80 text-sm">جمع</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">Time of collecting and consolidating meanings. This phase tends to support cohesion, connection, and steady building.</p>
                </div>
                <div className="p-4 rounded-lg bg-card/30 border border-cyan-500/20 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold text-lg block text-center min-w-16">12–16</span>
                    <div>
                      <strong className="text-foreground text-base block">Differentiating</strong>
                      <span className="font-arabic text-cyan-400/80 text-sm">تمييز</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">Time of discernment and measure. What is mixed becomes clearer. This phase supports clarity and limits without forcing endings.</p>
                </div>
                <div className="p-4 rounded-lg bg-card/30 border border-amber-500/20 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold text-lg block text-center min-w-16">17–28</span>
                    <div>
                      <strong className="text-foreground text-base block">Separating</strong>
                      <span className="font-arabic text-amber-400/80 text-sm">تفريق</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">Time of release and completion. Forms loosen and cycles conclude. This phase supports letting go and preparing for renewal.</p>
                </div>
              </div>
              <p className="text-muted-foreground/70 text-xs mt-4 italic text-center">
                Read this as a lens for awareness, not a prediction.
              </p>
            </div>

            {/* Waxing vs Waning */}
            <div className="mb-6 p-5 rounded-lg bg-foreground/5 border border-border">
              <h3 className="text-base font-medium text-foreground mb-4">Waxing vs Waning Moon</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex items-start gap-3">
                  <Sun className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground text-base">Waxing (New → Full)</strong>
                    <p className="text-muted-foreground text-sm mt-1">Traditionally associated with beginnings. May support growth, gathering, and outward movement.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Moon className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground text-base">Waning (Full → New)</strong>
                    <p className="text-muted-foreground text-sm mt-1">Traditionally associated with endings. May support release, healing, and inward reflection.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Collapsible Mansion Guide */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-foreground/5 px-5 py-4 border-b border-border">
                <h3 className="text-base font-medium text-foreground flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gold" />
                  Complete Guide to All 28 Mansions
                  <span className="font-arabic text-sm text-muted-foreground ml-2">دليل المنازل الثمانية والعشرين</span>
                </h3>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {MANSION_DETAILS.map((mansion) => (
                  <AccordionItem key={mansion.number} value={`mansion-${mansion.number}`} className="border-b border-border last:border-0">
                    <AccordionTrigger className="px-5 py-4 hover:bg-foreground/5" data-testid={`mansion-accordion-${mansion.number}`}>
                      <div className="flex items-center gap-4 flex-1 text-left">
                        <span className="text-base font-mono text-gold w-8">{mansion.number}</span>
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-foreground text-base">{mansion.name}</span>
                          <span className="font-arabic text-muted-foreground ml-2 text-base">{mansion.arabic}</span>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs border hidden sm:inline-block ${CATEGORY_COLORS[mansion.category]}`}>
                          {mansion.category}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5 pt-2">
                      <div className="space-y-4">
                        {/* Theme */}
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-foreground text-sm uppercase tracking-wide">Theme</strong>
                            <p className="text-foreground/80 text-base mt-1">{mansion.theme}</p>
                          </div>
                        </div>
                        
                        {/* May Support / Use Caution With */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                            <strong className="text-green-400 text-sm uppercase tracking-wide block mb-2">May Support</strong>
                            <p className="text-foreground/80 text-base">{mansion.maySupport}</p>
                          </div>
                          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                            <strong className="text-amber-400 text-sm uppercase tracking-wide block mb-2">Use Caution With</strong>
                            <p className="text-foreground/80 text-base">{mansion.useCautionWith}</p>
                          </div>
                        </div>

                        {/* Waxing / Waning */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                            <Sun className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                            <div>
                              <strong className="text-amber-400 text-sm uppercase tracking-wide">Waxing Moon</strong>
                              <p className="text-foreground/80 text-sm mt-1">{mansion.waxing}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-500/10 border border-slate-500/30">
                            <Moon className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                            <div>
                              <strong className="text-slate-400 text-sm uppercase tracking-wide">Waning Moon</strong>
                              <p className="text-foreground/80 text-sm mt-1">{mansion.waning}</p>
                            </div>
                          </div>
                        </div>

                        {/* Divine Name & Ritual */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-3 border-t border-border">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-gold" />
                            <span className="text-muted-foreground text-sm">Divine Name:</span>
                            <span className="text-gold font-medium text-base">{mansion.divineName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground text-sm">Ritual:</span>
                            <span className="text-foreground text-base">{mansion.ritual}</span>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          <section id="planetary-hours" className="glass-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Planetary Hours <span className="font-arabic text-lg">الساعات الكوكبية</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed text-base">
                Each day is divided into 24 planetary hours, with each hour ruled by one of the seven 
                classical planets. The day ruler sets the spiritual tone for the entire day.
              </p>
              <ul className="list-disc list-inside space-y-3 ml-2 text-base">
                <li><strong className="text-foreground">Current Hour:</strong> The highlighted hour shows the current planetary influence.</li>
                <li><strong className="text-foreground">Day Ruler:</strong> The planet ruling the day (Sun for Sunday, Moon for Monday, etc.).</li>
                <li><strong className="text-foreground">Prophet Association:</strong> Each planet is linked to a prophet in Ibn Arabi's system.</li>
                <li><strong className="text-foreground">Protocol:</strong> Suggested spiritual practices for the current planetary hour.</li>
                <li><strong className="text-foreground">Void of Course Moon:</strong> Yellow VOC indicator means avoid important decisions.</li>
              </ul>
            </div>

            {/* A2: Inner States - Qabd and Bast */}
            <div className="mt-6 p-5 rounded-lg bg-foreground/5 border border-border">
              <h3 className="text-base font-medium text-foreground mb-3 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-gold" />
                Inner States: Qabḍ and Basṭ
                <span className="font-arabic text-sm text-muted-foreground">الأحوال الداخلية: قبض وبسط</span>
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Ibn ʿArabī describes recurring inner climates that shape how a moment is received:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-slate-500/10 border border-slate-500/30">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <strong className="text-slate-400 text-sm cursor-help border-b border-dotted border-slate-400/50">Qabḍ (قبض) — Contraction</strong>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs bg-white text-foreground border border-border p-3 rounded-lg shadow-lg">
                        <div className="text-sm font-medium mb-1">Qabḍ (قبض) — Contraction</div>
                        <div className="text-xs text-muted-foreground">A state of narrowing that calls for patience, humility, restraint, and simplicity. Not a punishment, but a training in adab.</div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <p className="text-foreground/80 text-sm mt-2">Narrowing, heaviness, restraint, sobriety, quiet</p>
                  <p className="text-xs text-muted-foreground mt-2 italic">In qabḍ: simplify, reduce, avoid forcing decisions, return to essentials</p>
                </div>
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <strong className="text-amber-400 text-sm cursor-help border-b border-dotted border-amber-400/50">Basṭ (بسط) — Expansion</strong>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs bg-white text-foreground border border-border p-3 rounded-lg shadow-lg">
                        <div className="text-sm font-medium mb-1">Basṭ (بسط) — Expansion</div>
                        <div className="text-xs text-muted-foreground">A state of opening that calls for gratitude, balance, responsibility, and generosity. Not a reward to chase, but a trust to carry well.</div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <p className="text-foreground/80 text-sm mt-2">Openness, ease, energy, joy, confidence</p>
                  <p className="text-xs text-muted-foreground mt-2 italic">In basṭ: give thanks, act with balance, avoid excess and self-importance</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These are not good or bad. They are ways the Real educates the heart. The same hour can feel different to different people because states reflect readiness.
              </p>
              <div className="mt-3 p-3 rounded bg-gold/10 border border-gold/30">
                <p className="text-xs italic text-foreground/80 text-center">
                  Do not chase expansion and do not resent contraction.
                </p>
              </div>
            </div>
          </section>

          <section id="celestial-dignities" className="glass-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
              <Orbit className="w-5 h-5" />
              Celestial Dignities <span className="font-arabic text-lg">الكرامات السماوية</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed text-base">
                This table shows the current positions of the seven classical planets and their dignities:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-2 text-base">
                <li><strong className="text-foreground">Rulership (R):</strong> Planet in its home sign—strongest expression.</li>
                <li><strong className="text-foreground">Exaltation (E):</strong> Planet in its sign of honor—elevated influence.</li>
                <li><strong className="text-foreground">Detriment (d):</strong> Planet in the sign opposite its home—weakened.</li>
                <li><strong className="text-foreground">Fall (f):</strong> Planet in the sign opposite its exaltation—most challenged.</li>
                <li><strong className="text-foreground">Tropical vs Sidereal:</strong> Toggle between Western and Vedic zodiac calculations.</li>
              </ul>
            </div>
          </section>

          <section id="elemental-balance" className="glass-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Elemental Balance <span className="font-arabic text-lg">توازن العناصر</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed text-base">
                The four elements represent fundamental qualities of existence:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-2 text-base">
                <li><strong className="text-red-400">Fire (النار):</strong> Action, will, transformation, spiritual aspiration.</li>
                <li><strong className="text-amber-600">Earth (التراب):</strong> Stability, manifestation, practical matters.</li>
                <li><strong className="text-sky-400">Air (الهواء):</strong> Intellect, communication, social connection.</li>
                <li><strong className="text-blue-400">Water (الماء):</strong> Emotion, intuition, purification, receptivity.</li>
              </ul>
            </div>
          </section>

          <section id="how-to-use" className="glass-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              How to Use Daily
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <ol className="list-decimal list-inside space-y-4 ml-2 text-base">
                <li><strong className="text-foreground">Morning Check:</strong> Review the day ruler and current lunar mansion.</li>
                <li><strong className="text-foreground">Plan Activities:</strong> Align tasks with favorable planetary hours.</li>
                <li><strong className="text-foreground">Spiritual Practice:</strong> Use Divine Attributes for dhikr and meditation.</li>
                <li><strong className="text-foreground">Evening Reflection:</strong> Note how the day's energies manifested.</li>
                <li><strong className="text-foreground">White Days:</strong> Fast on the 13th, 14th, and 15th of each Islamic month.</li>
              </ol>
            </div>
          </section>

          {/* NEW EXPERIENTIAL SECTIONS */}
          <section id="reading-planetary-hours" className="glass-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              How to Read Planetary Hours Spiritually
              <span className="font-arabic text-lg">كيفية قراءة الساعات الكوكبية روحياً</span>
            </h2>
            <div className="space-y-5 text-muted-foreground">
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">Time Starts at Sunset</h3>
                <p className="leading-relaxed text-base">
                  In the Islamic tradition, the day begins at Maghrib (sunset), not midnight. This means the planetary day 
                  and its ruling planet begin their influence as the sun sets. When you check the planetary hour, 
                  remember that you are reading the current spiritual "breath" of time.
                </p>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">Each Hour Has a Spiritual "Face"</h3>
                <p className="leading-relaxed text-base">
                  Every planetary hour carries a specific quality—mercy, strength, beauty, wisdom, or awe. Ibn Arabi teaches 
                  that these are not mere influences but actual presences: angelic spirits attend each hour, and a Divine Name 
                  governs it. Your inner state can harmonize with or resist this quality.
                </p>
                <div className="mt-3 p-4 rounded-lg bg-foreground/5 border border-border">
                  <p className="text-sm">
                    <strong className="text-foreground">Jalāl (جلال)</strong> hours (Mars, Saturn, Sun) carry majesty, strength, and awe.<br />
                    <strong className="text-foreground">Jamāl (جمال)</strong> hours (Venus, Moon, Jupiter) carry beauty, gentleness, and expansion.<br />
                    <strong className="text-foreground">Kamāl (كمال)</strong> hours (Mercury, Sun) carry perfection, balance, and integration.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-base font-medium text-foreground mb-2">How to Use the Hour Cards</h3>
                <ul className="list-disc list-inside space-y-2 ml-2 text-base">
                  <li><strong className="text-foreground">Check the planet:</strong> See which planet rules the current hour.</li>
                  <li><strong className="text-foreground">Read "Meaning of this hour":</strong> Understand what this hour opens or tests.</li>
                  <li><strong className="text-foreground">Use "Recommended practice":</strong> Follow the suggested dhikr, action, and avoidance.</li>
                  <li><strong className="text-foreground">Check "Inner state":</strong> If you feel expansion, act. If contraction, observe.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="reading-lunar-mansion" className="glass-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
              <Moon className="w-5 h-5" />
              How to Read the Lunar Mansion
              <span className="font-arabic text-lg">كيفية قراءة المنزلة القمرية</span>
            </h2>
            <div className="space-y-5 text-muted-foreground">
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">What is a Lunar Mansion?</h3>
                <p className="leading-relaxed text-base">
                  The Moon travels through 28 stations (manazil) over its monthly cycle. Each mansion is not just a celestial 
                  location but a doorway through which divine qualities descend. When the Moon enters a mansion, its station 
                  becomes a lens through which meanings may be perceived in time. This can shape moods and spiritual openings. 
                  Do not treat it as a guarantee of events.
                </p>
              </div>

              {/* A3: Veiling and Unveiling */}
              <div className="p-5 rounded-lg bg-foreground/5 border border-border">
                <h3 className="text-base font-medium text-foreground mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gold" />
                  Veiling and Unveiling: Ḥijāb and Kashf
                  <span className="font-arabic text-sm text-muted-foreground">الحجاب والكشف: ستر وظهور</span>
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  Ibn ʿArabī speaks of veiling and unveiling as modes of disclosure:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 rounded-lg bg-slate-500/10 border border-slate-500/30">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <strong className="text-slate-400 text-sm cursor-help border-b border-dotted border-slate-400/50 flex items-center gap-1">
                            <EyeOff className="w-3 h-3" /> Ḥijāb (حجاب) — Veiling
                          </strong>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs bg-white text-foreground border border-border p-3 rounded-lg shadow-lg">
                          <div className="text-sm font-medium mb-1">Ḥijāb (حجاب) — Veiling</div>
                          <div className="text-xs text-muted-foreground">Meaning is present but not yet readable. The fitting response is steadiness and reduced certainty, not forced interpretation.</div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <p className="text-foreground/80 text-sm mt-2">Meaning is present but not yet readable</p>
                    <p className="text-xs text-muted-foreground mt-2 italic">Remain steady, reduce certainty, choose patience</p>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <strong className="text-amber-400 text-sm cursor-help border-b border-dotted border-amber-400/50 flex items-center gap-1">
                            <Eye className="w-3 h-3" /> Kashf (كشف) — Unveiling
                          </strong>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs bg-white text-foreground border border-border p-3 rounded-lg shadow-lg">
                          <div className="text-sm font-medium mb-1">Kashf (كشف) — Unveiling</div>
                          <div className="text-xs text-muted-foreground">Meaning becomes clearer. The fitting response is humility, gratitude, and careful action without pride.</div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <p className="text-foreground/80 text-sm mt-2">Meaning becomes clear</p>
                    <p className="text-xs text-muted-foreground mt-2 italic">Receive clarity as a trust, not a trophy</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Unveiling may arrive gently or sharply. This is usually a matter of 
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-foreground cursor-help border-b border-dotted border-foreground/50"> preparedness (istiʿdād)</span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs bg-white text-foreground border border-border p-3 rounded-lg shadow-lg">
                        <div className="text-sm font-medium mb-1">Istiʿdād (استعداد) — Preparedness</div>
                        <div className="text-xs text-muted-foreground">Disclosure appears according to readiness. The same sign can teach two people differently.</div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  , not a property of the mansion itself. When veiled, do not force interpretation. When unveiled, keep humility.
                </p>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">The Three Movements of the Mansions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <strong className="text-emerald-400 text-sm">Gathering (1-11) <span className="font-arabic">جمع</span></strong>
                    <p className="text-foreground/80 text-sm mt-1">Cohesion, connection, steady building.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                    <strong className="text-cyan-400 text-sm">Differentiating (12-16) <span className="font-arabic">تمييز</span></strong>
                    <p className="text-foreground/80 text-sm mt-1">Discernment, clarity, limits.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <strong className="text-amber-400 text-sm">Separating (17-28) <span className="font-arabic">تفريق</span></strong>
                    <p className="text-foreground/80 text-sm mt-1">Release, completion, renewal.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-medium text-foreground mb-2">How to Use the Mansion Cards</h3>
                <ul className="list-disc list-inside space-y-2 ml-2 text-base">
                  <li><strong className="text-foreground">Look at "Mansion Theme":</strong> Understand the core energy of this station.</li>
                  <li><strong className="text-foreground">Check "Good For / Not Ideal For":</strong> Align your activities accordingly.</li>
                  <li><strong className="text-foreground">Use "Suggested Dhikr & Practice":</strong> The Divine Name and practice for this mansion.</li>
                  <li><strong className="text-foreground">Note the Movement tag:</strong> See where you are in the 28-day cycle (Gathering/Differentiating/Separating).</li>
                  <li><strong className="text-foreground">Combine with Moon phase:</strong> Waxing supports beginning; waning supports ending.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="combining-hour-mansion" className="glass-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Combining Hour and Mansion
              <span className="font-arabic text-lg">الجمع بين الساعة والمنزلة</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed text-base">
                The deepest reading comes from combining the current planetary hour with the current lunar mansion. 
                Together they create a specific "moment-quality" that can guide your actions and inner state.
              </p>
              
              {/* B2: Added paragraph */}
              <p className="leading-relaxed text-base">
                This combination does not predict outcomes. It describes a moment-quality: what kind of attention, 
                restraint, gratitude, or clarity may be most fitting.
              </p>
              
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-foreground/5 border border-border">
                  <h4 className="text-sm font-medium text-foreground mb-2">Example: Mars Hour + Separating Mansion</h4>
                  <p className="text-sm text-foreground/80">
                    A Mars hour carries a quality of clarity and decisiveness. Combined with a Separating mansion (17-28), 
                    this may support releasing what no longer serves, clearing distractions, or letting go of old patterns. 
                    The strength of Mars may harmonize with the releasing quality of the mansion.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-foreground/5 border border-border">
                  <h4 className="text-sm font-medium text-foreground mb-2">Example: Venus Hour + Gathering Mansion</h4>
                  <p className="text-sm text-foreground/80">
                    A Venus hour carries a quality of beauty and harmony. Combined with a Gathering mansion (1-11), 
                    this may support deepening relationships, cultivating beauty, or establishing commitments with gentleness. 
                    The softness of Venus may harmonize with the cohesive quality of the mansion.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-foreground/5 border border-border">
                  <h4 className="text-sm font-medium text-foreground mb-2">Example: Jupiter Hour + Differentiating Mansion</h4>
                  <p className="text-sm text-foreground/80">
                    A Jupiter hour carries a quality of expansion and wisdom. Combined with a Differentiating mansion (12-16), 
                    this may support gaining clarity, making discerning choices, or finding the right measure. 
                    The abundance of Jupiter may harmonize with the clarifying quality of the mansion.
                  </p>
                </div>
              </div>
              
              <p className="text-sm italic text-muted-foreground/80 pt-2">
                Notice your inner state (expansion or contraction) to sense whether to act outwardly or reflect inwardly.
              </p>
            </div>
          </section>

          <section id="ibn-arabi-background" className="glass-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Background: Ibn ʿArabi's View of Time
              <span className="font-arabic text-lg">رؤية ابن عربي للزمن</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed text-base">
                For Ibn ʿArabi, time is not an empty container but a living reality. Each instant (waqt) is 
                renewed by the Divine—a new creation (khalq jadīd) that carries its own unique signature. 
                The past has passed, the future is not yet, and only the present moment is real. This is why 
                awareness of the spiritual quality of "now" holds meaning.
              </p>

              {/* A4: Preparedness and Non-Repetition */}
              <div className="p-5 rounded-lg bg-foreground/5 border border-border">
                <h3 className="text-base font-medium text-foreground mb-3 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-gold" />
                  Preparedness and Non-Repetition
                  <span className="font-arabic text-sm text-muted-foreground">الاستعداد وعدم تكرار التجلي</span>
                </h3>
                <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <strong className="text-foreground cursor-help border-b border-dotted border-foreground/50">Preparedness (istiʿdād)</strong>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs bg-white text-foreground border border-border p-3 rounded-lg shadow-lg">
                        <div className="text-sm font-medium mb-1">Istiʿdād (استعداد) — Preparedness</div>
                        <div className="text-xs text-muted-foreground">Disclosure appears according to readiness. The same sign can teach two people differently.</div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {" "}is central in Ibn ʿArabī. Disclosure appears according to the readiness of the heart. 
                  This is why a single moment can comfort one person and challenge another.
                </p>
                <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                  He also teaches that there is{" "}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <strong className="text-foreground cursor-help border-b border-dotted border-foreground/50">no repetition in divine self-disclosure</strong>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs bg-white text-foreground border border-border p-3 rounded-lg shadow-lg">
                        <div className="text-sm font-medium mb-1">No Repetition in Disclosure <span className="font-arabic">لا تكرار في التجلي</span></div>
                        <div className="text-xs text-muted-foreground">Even when the same hour or mansion returns, the self-disclosure is new. Repetition is for deepening presence, not for expecting identical results.</div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  . Even when the same mansion or hour returns, what is shown is never identical. Each instant is a new creation.
                </p>
                <div className="p-3 rounded bg-gold/10 border border-gold/30">
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    <strong>How to use this in the app:</strong> Use repetition to deepen presence, not to expect identical outcomes. 
                    If the app increases fear, certainty, or obsession, return to simplicity, silence, and remembrance.
                  </p>
                </div>
              </div>
              
              <p className="leading-relaxed text-base">
                Each hour is traditionally understood to have an angelic spirit attending it and a ruling Divine Name 
                that colors its quality. When one aligns with the hour's nature, one may find harmony with the cosmos—this is 
                the meaning of <strong className="text-foreground">adab</strong> (spiritual etiquette). When one resists the hour's nature, 
                one may encounter friction or difficulty.
              </p>
              
              <p className="leading-relaxed text-base">
                The Moon is traditionally viewed as the primary mirror for divine decrees descending into the material world. 
                As it travels through the 28 mansions, it reflects different aspects of the divine qualities 
                into earthly life. Each mansion marks a stage of that reflection—from the first spark of intention 
                (Mansion 1) to the final surrender and completion (Mansion 28).
              </p>
              
              <p className="leading-relaxed text-base">
                This app offers this cosmological framework to support awareness of <strong className="text-foreground">adab</strong> (أدب)—right conduct in 
                each moment. By observing the hour and mansion, you may gain insight into what kind of action tends to harmonize, 
                what inner state might serve, and which Divine Name to contemplate.
              </p>

            </div>
          </section>

          {/* Ibn Arabi's Cosmology Card */}
          <section id="cosmology-simple" className="glass-card rounded-xl p-6 border border-border">
            <h2 className="text-2xl font-serif text-gold mb-2">Ibn ʿArabī's Cosmology Made Simple</h2>
            <p className="text-sm text-muted-foreground mb-6">From the Breath of the Real to the Human Heart — and Back Again</p>

            <div className="space-y-5 text-muted-foreground">
              {/* 1 */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">Everything Begins With the Divine Breath</h3>
                <p className="leading-relaxed text-base">Before anything existed, there was only the Real (al-Ḥaqq). Creation begins not with violence, but with <strong>a breath</strong>, exhaled in mercy. This Breath brings the universe into existence, contains every possibility, sets the rhythm of time, and holds every creature in continuous renewal. <em>Everything you experience is taking place within this Breath.</em></p>
              </div>

              {/* 2 */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">The Cloud: The Womb of Creation</h3>
                <p className="leading-relaxed text-base">The Breath condenses into the "Cloud" (al-ʿAmāʾ), a subtle, luminous field where all realities exist in potential, not yet manifest. This is the womb from which all forms emerge.</p>
              </div>

              {/* 3 */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">The Throne and the Pedestal</h3>
                <p className="leading-relaxed text-base"><strong>The Throne (al-ʿArsh):</strong> The widest created form that encompasses all existence. <strong>The Pedestal (al-Kursī):</strong> Below the Throne lies the Pedestal, where destinies are arranged and measured. If the Throne is the cosmic heart, the Pedestal is the cosmic mind.</p>
              </div>

              {/* 4 */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">The Seven Heavens</h3>
                <p className="leading-relaxed text-base">Below the Pedestal lie seven immense spheres (Moon, Mercury, Venus, Sun, Mars, Jupiter, Saturn). These are not merely astronomical layers—they are <strong>angelic administrations</strong> that shape thought, emotion, action, temperament, cosmic cycles, and the chemistry of events.</p>
              </div>

              {/* 5 */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">The Sphere of Fixed Stars</h3>
                <p className="leading-relaxed text-base">Below the seven heavens lies the starry sphere. Ibn ʿArabī calls the stars <strong>"points of wisdom"</strong> because here, divine meanings take fixed form, like letters placed onto a page. The stars are not causes—they are <strong>symbols of divine inscription</strong>.</p>
              </div>

              {/* 6 */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">The Lunar Mansions</h3>
                <p className="leading-relaxed text-base">Between the stars and the Moon lie <strong>28 stations</strong>, each a sector on the Moon's path. When divine meanings descend, the mansions give them <strong>timing</strong>, shaping the "flavor" of time like tones in a cosmic scale.</p>
              </div>

              {/* 7 */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">The Moon: The Final Mirror</h3>
                <p className="leading-relaxed text-base">The Moon is the <strong>last reflector</strong> of the descending decree. Whatever reaches the Moon will soon appear on Earth, as the Moon governs time, emotion, tides, the unfolding of events, and the rhythms of life.</p>
              </div>

              {/* 8 */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">The World of Time</h3>
                <p className="leading-relaxed text-base">Time is not a line—it is the <strong>surface where meanings appear moment by moment</strong>. Every instant is renewed by the divine command: <strong>"Be — and it is."</strong> You are never living in yesterday's world; the universe is reborn every moment.</p>
              </div>

              {/* 9 */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">The Human Heart: Final Receiver</h3>
                <p className="leading-relaxed text-base">The descent ends in one place: <strong>the human heart</strong>. According to Ibn ʿArabī, the heart is a mirror of all the cosmos, can reflect every divine name, and receives knowledge before the mind. This is why two people can live the same moment but experience entirely different worlds.</p>
              </div>

              {/* 10 */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">The Return Journey</h3>
                <p className="leading-relaxed text-base">Just as meanings descend through Throne → Pedestal → Heavens → Stars → Mansions → Moon → Time → Heart, the seeker ascends by reversing the same ladder through <strong>sincerity, remembrance (dhikr), polishing the heart, tuning into the qualities of time, self-knowledge, presence, and contemplation</strong>. This is the journey from creation back to the Real.</p>
              </div>

              {/* 11 */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">The Purpose of the Universe</h3>
                <p className="leading-relaxed text-base">The universe exists for one reason: <strong>so that the Hidden Treasure can be known.</strong> You exist so that knowledge, love, and meaning can become conscious. Your role is not to control the cosmos—your role is to <strong>witness it, reflect it, and participate in the unfolding of the divine mysteries.</strong></p>
              </div>

              {/* 12 */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">Your Role in All of This</h3>
                <p className="leading-relaxed text-base">You are the meeting point of the highest divine command and the lowest level of manifestation. This makes you the <strong>mirror of God's names, the interpreter of time, the heart of the cosmos, and the witness of existence.</strong> Your awareness, your response, your intention complete the cycle of creation.</p>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <p className="text-sm text-foreground/80 italic leading-relaxed">
                <strong>In one sentence:</strong> The Real breathes the cosmos into being, it descends through the spheres until it reaches your heart, and your heart rises back through these same layers through awareness, sincerity, and remembrance—completing the circle of existence.
              </p>
            </div>
          </section>

          <section id="key-further-readings" className="glass-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Key Sources for Further Reading
              <span className="font-arabic text-lg">مصادر للقراءة الإضافية</span>
            </h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              These works are not manuals for prediction or control. They are aids for <strong>contemplation, self-knowledge, and adab with time</strong>. Approach them slowly, reflectively, with attention to inner states rather than outcomes.
            </p>

            <Accordion type="single" collapsible className="space-y-4">
              {/* Primary Works */}
              <AccordionItem value="primary-works" className="border border-border rounded-lg px-4">
                <AccordionTrigger className="text-base font-medium text-foreground hover:text-gold">
                  Primary Works by Ibn ʿArabī
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">1. al-Futūḥāt al-Makkiyya (The Meccan Openings)</h4>
                    <p className="text-sm text-foreground/80 mb-3">The central and most comprehensive source for Ibn ʿArabī's cosmology, view of time, celestial symbolism, and spiritual psychology.</p>
                    <p className="text-sm text-muted-foreground mb-2"><strong>Recommended thematic chapters:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-sm text-foreground/80">
                      <li><strong>Ch. 1–2:</strong> On knowledge, divine self-disclosure (tajallī), and structure of existence</li>
                      <li><strong>Ch. 73 – The Spirits of the Hours:</strong> Planetary hours, angelic attendance, and spiritual adab</li>
                      <li><strong>Ch. 178 – Imagination (al-Khayāl):</strong> How celestial meanings appear in the world and heart</li>
                      <li><strong>Ch. 195 – The Heavens and Spirits:</strong> Seven heavens, planetary intelligences, and mediation of meaning</li>
                      <li><strong>Ch. 198 – Time, Moon, Lunar Mansions:</strong> Core chapter on waqt, khalq jadīd, mansions as stations of meaning</li>
                      <li><strong>Ch. 390 – The Spirit of Time:</strong> Time as living reality and relation to divine presence</li>
                      <li><strong>Ch. 559 – From Divine Decree to Manifest Event:</strong> Descent of meanings through cosmic levels</li>
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-medium text-foreground mb-2">2. Mawāqiʿ al-Nujūm (The Setting-Points of the Stars)</h4>
                    <p className="text-sm text-foreground/80 mb-2">A concise work on the spiritual journey through changing states. Key themes: movement through light/shadow, alternation of expansion and contraction, spiritual stages, warnings against mistaking signs for guarantees. Strongly informs the app's emphasis on awareness rather than prediction.</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-medium text-foreground mb-2">3. Inshāʾ al-Dawāʾir (The Creation of the Circles)</h4>
                    <p className="text-sm text-foreground/80">A foundational cosmological treatise on concentric reality, the human as microcosm, relationship between knowledge and forms, and the heart as meeting point of heaven and earth. Underlies the app's cosmological diagrams.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Secondary Scholarship */}
              <AccordionItem value="secondary-scholarship" className="border border-border rounded-lg px-4">
                <AccordionTrigger className="text-base font-medium text-foreground hover:text-gold">
                  Authoritative Secondary Scholarship
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">4. Titus Burckhardt – <em>Mystical Astrology According to Ibn ʿArabī</em></h4>
                    <p className="text-sm text-foreground/80">One of the most precise and respectful expositions of Ibn ʿArabī's celestial symbolism. Especially useful for lunar mansions as qualitative time, rejection of causal astrology, and distinction between symbol and mechanism. Closely adheres to Ibn ʿArabī's metaphysical intent.</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-medium text-foreground mb-2">5. William C. Chittick – <em>The Sufi Path of Knowledge</em></h4>
                    <p className="text-sm text-foreground/80 mb-2">The most reliable English-language guide to Ibn ʿArabī's metaphysics.</p>
                    <p className="text-sm text-muted-foreground"><strong>Recommended chapters:</strong> Sections on tajallī (divine self-disclosure), time, imagination, the heart, and non-repetition of disclosure. Essential for conceptual clarity without distortion.</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-medium text-foreground mb-2">6. William C. Chittick – <em>Imaginal Worlds</em></h4>
                    <p className="text-sm text-foreground/80">Highly relevant for understanding imagination as real ontological realm, how celestial meanings appear in perception, and why symbols are neither literal nor arbitrary. Supports the app's treatment of mansions and hours as imaginal lenses.</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-medium text-foreground mb-2">7. Henry Corbin – <em>Creative Imagination in the Sufism of Ibn ʿArabī</em></h4>
                    <p className="text-sm text-foreground/80">A classic study of imaginal perception, unveiling and veiling, and spiritual vision versus fantasy. Helps understand how meaning appears without reducing it to psychology or superstition.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Quranic Foundations */}
              <AccordionItem value="quranic-foundations" className="border border-border rounded-lg px-4">
                <AccordionTrigger className="text-base font-medium text-foreground hover:text-gold">
                  Related Classical Context: Qur'anic Foundations
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-4">
                  <p className="text-sm text-foreground/80">Especially verses frequently cited by Ibn ʿArabī:</p>
                  <ul className="list-disc list-inside space-y-2 ml-2 text-sm text-foreground/80">
                    <li><strong>"Every day He is upon a task"</strong> (Qur'an 55:29) — Underpin concept of renewal</li>
                    <li><strong>"We are closer to him than his jugular vein"</strong> (50:16) — Divine presence and intimacy</li>
                    <li><strong>"God is the Light of the heavens and the earth"</strong> (24:35) — Symbolic disclosure and illumination</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* How to Use */}
              <AccordionItem value="how-to-use-readings" className="border border-border rounded-lg px-4">
                <AccordionTrigger className="text-base font-medium text-foreground hover:text-gold">
                  How to Use These Sources
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-4">
                  <p className="text-sm text-foreground/80">These teachings describe <strong>how meaning becomes readable in time</strong>, not how to secure specific results. They invite attentiveness, humility, and presence rather than certainty.</p>
                  <div className="p-3 rounded bg-gold/10 border border-gold/30 mt-3">
                    <p className="text-xs text-foreground/80 leading-relaxed">
                      <strong>Remember:</strong> If the app increases fear, certainty, or obsession, return to simplicity, silence, and remembrance. These sources are companions for reflection, not blueprints for control.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section className="glass-card rounded-xl p-6 border border-border bg-gold/5">
            <p className="text-center text-muted-foreground italic text-lg">
              "The cosmos is a book and every creature is a letter in it."
            </p>
            <p className="text-center font-arabic text-2xl mt-3 text-gold">
              الكون كتاب وكل مخلوق حرف فيه
            </p>
            <p className="text-center text-sm text-muted-foreground mt-3">— Ibn Arabi</p>
          </section>
        </div>

        {/* Table of Contents with Progress Indicator */}
        <TableOfContents sections={INSTRUCTIONS_SECTIONS} title="Guidance Sections" />

        <footer className="mt-12 pt-8 border-t border-border text-center space-y-6">
          <p className="font-semibold text-base">Based on the teachings of Muhyiddin Ibn Arabi (1165-1240 CE)</p>
          <p className="font-arabic text-lg text-gold">مبني على تعاليم محيي الدين ابن عربي</p>
          
          {/* Disclaimer Section - Card Format */}
          <section className="glass-card rounded-xl p-6 border border-border bg-gold/5 w-full text-left">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                This application offers a way to reflect on time through traditional cosmology. It does not entertain, predict, or promise outcomes. Its purpose is simply to help you <strong className="text-foreground">witness the qualities of the moment</strong> and respond with presence and good adab.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                The movements of the Moon, the stations of the mansions, and the hours of the planets are <strong className="text-foreground">symbolic languages</strong> used for contemplation in many spiritual traditions. They invite the seeker to notice shifts in their own inner state — expansion, contraction, stillness, readiness — and to align their actions with greater awareness.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Nothing here is meant to direct your choices or define your destiny. It is only a companion for reflection, encouraging you to slow down, observe the unfolding of time, and recognize the subtle signs that each moment carries.
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground/70 pt-3 border-t border-border/50 italic">
                This tool is offered purely for educational and contemplative purposes. It is <strong className="text-foreground/70">not</strong> a substitute for professional advice, nor is it designed for divination, entertainment, or prediction. All interpretations remain your own responsibility, and the creator is not liable for how the information is used or understood.
              </p>
            </div>
          </section>

          {/* Divider & Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs pt-4">
            <Link href="/privacy">
              <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto text-xs">
                Privacy Policy
              </Button>
            </Link>
            <span className="text-border">|</span>
            <Link href="/terms">
              <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto text-xs">
                Terms of Use
              </Button>
            </Link>
            <span className="text-border">|</span>
            <a href="mailto:contact@psyda.org">
              <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto text-xs">
                Contact & Support
              </Button>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-[10px] text-foreground/40 pt-2">
            © 2025 Minhaaj Rehman. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
