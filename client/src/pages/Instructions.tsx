import { Link } from "wouter";
import { ArrowLeft, Moon, Sun, Clock, Orbit, Star, Scroll, MapPin, Calendar, ChevronDown, Sparkles, Check, X, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    category: "Initiating",
    bestFor: "Starting ideas, planning, setting intentions",
    avoid: "Major commitments",
    waxing: "Excellent for setting intentions",
    waning: "Good for reviewing purpose",
    divineName: "al-Nūr (The Light)",
    ritual: "Write intentions, journaling",
    nature: "blessed"
  },
  {
    number: 2,
    name: "Al-Butayn",
    arabic: "البطين",
    theme: "Emotional imprint, inner truth",
    category: "Initiating",
    bestFor: "Healing, emotional clarity, introspection",
    avoid: "Confrontation, major new ventures",
    waxing: "Plant seeds of emotional healing",
    waning: "Release old emotional patterns",
    divineName: "al-Baṣīr (The All-Seeing)",
    ritual: "Journaling, dua for guidance",
    nature: "challenging"
  },
  {
    number: 3,
    name: "Al-Thurayyā",
    arabic: "الثريا",
    theme: "Creativity, insight, inspiration",
    category: "Initiating",
    bestFor: "Communication, study, art, seeking hidden knowledge",
    avoid: "Mundane tasks that waste creative energy",
    waxing: "Start creative projects",
    waning: "Complete artistic works",
    divineName: "al-Fattāḥ (The Opener)",
    ritual: "Creative expression, spiritual retreats",
    nature: "blessed"
  },
  {
    number: 4,
    name: "Al-Dabarān",
    arabic: "الدبران",
    theme: "Foundation, raw material, patience",
    category: "Initiating",
    bestFor: "Setting long-term plans, following through on commitments",
    avoid: "Sudden decisions, impatience",
    waxing: "Build foundations",
    waning: "Consolidate what you have",
    divineName: "al-Qadīr (The Powerful)",
    ritual: "Organizing, structuring, patient work",
    nature: "blessed"
  },
  {
    number: 5,
    name: "Al-Ḥaqʿa",
    arabic: "الهقعة",
    theme: "Embodiment, grounding, manifestation",
    category: "Stabilizing",
    bestFor: "Health routines, stability, quiet contemplation",
    avoid: "Overexertion, outward action",
    waxing: "Establish healthy habits",
    waning: "Release unhealthy patterns",
    divineName: "al-Muqīt (The Sustainer)",
    ritual: "Body-focused practices, grounding",
    nature: "challenging"
  },
  {
    number: 6,
    name: "Al-Hanʿa",
    arabic: "الهنعة",
    theme: "Form-taking, wisdom, divine patterns",
    category: "Stabilizing",
    bestFor: "Contracts, marriage talks, seeking wisdom, teaching",
    avoid: "Hasty agreements",
    waxing: "Formalize agreements",
    waning: "Review existing commitments",
    divineName: "al-Muṣawwir (The Fashioner)",
    ritual: "Study sacred texts, teaching others",
    nature: "blessed"
  },
  {
    number: 7,
    name: "Al-Dhiraʿ",
    arabic: "الذراع",
    theme: "Authority, sovereignty, expansiveness",
    category: "Stabilizing",
    bestFor: "Leadership decisions, charitable works, embracing divine vastness",
    avoid: "Ego-driven actions",
    waxing: "Expand influence positively",
    waning: "Reflect on responsibilities",
    divineName: "al-Malik (The King)",
    ritual: "Expansive thinking, charity",
    nature: "blessed"
  },
  {
    number: 8,
    name: "Al-Nathra",
    arabic: "النثرة",
    theme: "Boundaries, gratitude, divine governance",
    category: "Stabilizing",
    bestFor: "Closing deals, setting limits, expressing gratitude",
    avoid: "Demanding or entitled behavior",
    waxing: "Establish healthy boundaries",
    waning: "Release resentments with gratitude",
    divineName: "al-Ḥafīẓ (The Preserver)",
    ritual: "Practice gratitude, boundary-setting",
    nature: "challenging"
  },
  {
    number: 9,
    name: "Al-Ṭarf",
    arabic: "الطرف",
    theme: "Independence, self-sufficiency, the boundary of creation",
    category: "Relational",
    bestFor: "Solitary spiritual practice, cultivating contentment",
    avoid: "Dependency on others",
    waxing: "Build inner resources",
    waning: "Release attachments to outcomes",
    divineName: "al-Ghanī (The Self-Sufficient)",
    ritual: "Solitary practice, contentment meditation",
    nature: "challenging"
  },
  {
    number: 10,
    name: "Al-Jabhah",
    arabic: "الجبهة",
    theme: "Discipline, truth, power (Saturn's realm)",
    category: "Relational",
    bestFor: "Difficult conversations, building strength, leadership",
    avoid: "Emotional impulsivity",
    waxing: "Take decisive action",
    waning: "Release power struggles",
    divineName: "al-Ḥakīm (The Wise)",
    ritual: "Truth-telling, difficult but necessary conversations",
    nature: "blessed"
  },
  {
    number: 11,
    name: "Al-Zubrah",
    arabic: "الزبرة",
    theme: "Devotion, surrender, tradition (Saturn's heaven)",
    category: "Relational",
    bestFor: "Devotional practices, honoring traditions, surrender to the Divine",
    avoid: "Rebellion against sacred order",
    waxing: "Deepen spiritual commitments",
    waning: "Release outdated traditions",
    divineName: "al-Rabb (The Lord)",
    ritual: "Devotional practices, honoring ancestors",
    nature: "blessed"
  },
  {
    number: 12,
    name: "Al-Ṣarfah",
    arabic: "الصرفة",
    theme: "Transition, change, seeking knowledge (Jupiter's realm)",
    category: "Relational",
    bestFor: "Being open to necessary changes, seeking knowledge",
    avoid: "Resisting inevitable transitions",
    waxing: "Embrace positive change",
    waning: "Let go of what must change",
    divineName: "al-ʿAlīm (The All-Knowing)",
    ritual: "Study, openness to change",
    nature: "challenging"
  },
  {
    number: 13,
    name: "Al-ʿAwwā",
    arabic: "العواء",
    theme: "Victory, overcoming obstacles (Mars' realm)",
    category: "Relational",
    bestFor: "Overcoming obstacles, spiritual warfare, standing firm",
    avoid: "Unnecessary conflict",
    waxing: "Advance toward goals",
    waning: "Release battles not worth fighting",
    divineName: "al-Qāhir (The Victorious)",
    ritual: "Courage practices, standing in truth",
    nature: "blessed"
  },
  {
    number: 14,
    name: "Al-Simāk",
    arabic: "السماك",
    theme: "Illumination, humility (Sun's realm - Idris' abode)",
    category: "Relational",
    bestFor: "Study, seeking illumination through humility",
    avoid: "Confrontation, arrogance",
    waxing: "Seek light through learning",
    waning: "Release pride and ego",
    divineName: "al-Nūr (The Light)",
    ritual: "Humble study, sacred sciences",
    nature: "challenging"
  },
  {
    number: 15,
    name: "Al-Ghafr",
    arabic: "الغفر",
    theme: "Beauty, forgiveness, covering faults (Venus' realm)",
    category: "Relational",
    bestFor: "Creative work, beauty, seeking forgiveness, covering others' faults",
    avoid: "Exposing others' weaknesses",
    waxing: "Create beauty, strengthen bonds",
    waning: "Forgive and release grudges",
    divineName: "al-Ghafūr (The Forgiving)",
    ritual: "Creative work, forgiveness practices",
    nature: "blessed"
  },
  {
    number: 16,
    name: "Al-Zubānā",
    arabic: "الزبانى",
    theme: "Accounting, communication, healing (Mercury's realm)",
    category: "Relational",
    bestFor: "Accounting, organizing, communication, healing work",
    avoid: "Deception, miscommunication",
    waxing: "Organize and communicate clearly",
    waning: "Clear miscommunications",
    divineName: "al-Muḥṣī (The Reckoner)",
    ritual: "Accounting, clear communication",
    nature: "blessed"
  },
  {
    number: 17,
    name: "Al-Iklīl",
    arabic: "الإكليل",
    theme: "Memory, dreams, emotional clarity (Moon's realm)",
    category: "Relational",
    bestFor: "Clarity, making things manifest, honoring humanity",
    avoid: "Confusion, unclear intentions",
    waxing: "Manifest intentions clearly",
    waning: "Clear emotional confusion",
    divineName: "al-Mubīn (The Evident)",
    ritual: "Dreamwork, emotional healing",
    nature: "blessed"
  },
  {
    number: 18,
    name: "Al-Qalb",
    arabic: "القلب",
    theme: "Heart purification, release (Ethereal realm)",
    category: "Relational",
    bestFor: "Heart purification, releasing attachments",
    avoid: "Clinging to what must go",
    waxing: "Strengthen heart's resolve",
    waning: "Release heart attachments",
    divineName: "al-Qābiḍ (The Restrainer)",
    ritual: "Heart purification, letting go",
    nature: "challenging"
  },
  {
    number: 19,
    name: "Al-Shawlah",
    arabic: "الشولة",
    theme: "Vital life force, breath (Air realm)",
    category: "Relational",
    bestFor: "Breathwork, cultivating vital life force",
    avoid: "Reckless actions",
    waxing: "Build vital energy",
    waning: "Release stagnant energy",
    divineName: "al-Ḥayy (The Ever-Living)",
    ritual: "Breathwork, vitality practices",
    nature: "challenging"
  },
  {
    number: 20,
    name: "Al-Naʿāʾim",
    arabic: "النعائم",
    theme: "Nurturing, life-giving (Water realm)",
    category: "Relational",
    bestFor: "Nurturing what is valuable, healing, purification",
    avoid: "Neglecting what needs care",
    waxing: "Nurture growth",
    waning: "Purify and cleanse",
    divineName: "al-Muḥyī (The Life-Giver)",
    ritual: "Healing rituals, water purification",
    nature: "challenging"
  },
  {
    number: 21,
    name: "Al-Baldah",
    arabic: "البلدة",
    theme: "Endings, letting go, transformation (Earth realm)",
    category: "Threshold",
    bestFor: "Endings, letting go, transformation, preparing for rebirth",
    avoid: "Clinging to the old",
    waxing: "Transform consciously",
    waning: "Complete endings gracefully",
    divineName: "al-Mumīt (The Bringer of Death)",
    ritual: "Closure rituals, letting go",
    nature: "blessed"
  },
  {
    number: 22,
    name: "Saʿd al-Dhābiḥ",
    arabic: "سعد الذابح",
    theme: "Sacrifice, cutting away the old (Mineral realm)",
    category: "Threshold",
    bestFor: "Ending habits, releasing debts, practicing generosity",
    avoid: "Holding onto what no longer serves",
    waxing: "Sacrifice for growth",
    waning: "Cut away the unnecessary",
    divineName: "al-Qahhār (The Subduer)",
    ritual: "Sacrifice, generosity, release",
    nature: "challenging"
  },
  {
    number: 23,
    name: "Saʿd Bulaʿ",
    arabic: "سعد بلع",
    theme: "Purification, nourishment (Plant realm)",
    category: "Threshold",
    bestFor: "Fasting, detox, forgiveness, planting seeds",
    avoid: "Overindulgence",
    waxing: "Plant new seeds of intention",
    waning: "Fast and purify",
    divineName: "al-Tawwāb (The Acceptor of Repentance)",
    ritual: "Fasting, purification, planting",
    nature: "blessed"
  },
  {
    number: 24,
    name: "Saʿd al-Suʿūd",
    arabic: "سعد السعود",
    theme: "Renewal, humility (Animal realm)",
    category: "Threshold",
    bestFor: "Rebirth after endings, practicing humility, caring for creatures",
    avoid: "Pride and arrogance",
    waxing: "Embrace new beginnings humbly",
    waning: "Release pride completely",
    divineName: "al-Mudhill (The Humbler)",
    ritual: "Humility practices, animal care",
    nature: "challenging"
  },
  {
    number: 25,
    name: "Saʿd al-Akhbiyah",
    arabic: "سعد الأخبية",
    theme: "Hidden forces, angelic realm",
    category: "Threshold",
    bestFor: "Seclusion, prayer, angelic invocations, spiritual protection",
    avoid: "Worldly distractions",
    waxing: "Seek angelic assistance",
    waning: "Release to angelic care",
    divineName: "al-Jabbār (The Compeller)",
    ritual: "Seclusion, deep prayer, angelic work",
    nature: "blessed"
  },
  {
    number: 26,
    name: "Al-Fargh al-Muqaddam",
    arabic: "الفرغ المقدم",
    theme: "Subtle awareness, jinn realm",
    category: "Threshold",
    bestFor: "Spiritual vigilance, subtle awareness, protection practices",
    avoid: "Naivety about unseen influences",
    waxing: "Strengthen spiritual protection",
    waning: "Clear subtle disturbances",
    divineName: "al-Laṭīf (The Subtle)",
    ritual: "Protection practices, subtle awareness",
    nature: "challenging"
  },
  {
    number: 27,
    name: "Al-Fargh al-Muʾakhkhar",
    arabic: "الفرغ المؤخر",
    theme: "Unity, human dignity, collective destiny",
    category: "Threshold",
    bestFor: "Community, bringing people together, honoring human dignity",
    avoid: "Division, isolation",
    waxing: "Build community bonds",
    waning: "Release divisive patterns",
    divineName: "al-Jāmiʿ (The Gatherer)",
    ritual: "Community work, unity practices",
    nature: "blessed"
  },
  {
    number: 28,
    name: "Baṭn al-Ḥūt",
    arabic: "بطن الحوت",
    theme: "Completion, elevation, surrender",
    category: "Threshold",
    bestFor: "Ending cycles, surrender, deep reflection on spiritual rank",
    avoid: "Starting new worldly ventures",
    waxing: "Prepare for completion",
    waning: "Complete surrender, close the cycle",
    divineName: "Rafīʿ al-Darajāt (The Elevator of Degrees)",
    ritual: "Deep reflection, surrender, cycle completion",
    nature: "challenging"
  }
];

const CATEGORY_COLORS: Record<string, string> = {
  "Initiating": "bg-blue-500/20 text-blue-400 border-blue-500/40",
  "Stabilizing": "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
  "Relational": "bg-purple-500/20 text-purple-400 border-purple-500/40",
  "Threshold": "bg-amber-500/20 text-amber-400 border-amber-500/40"
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
          <section className="glass-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
              <Scroll className="w-5 h-5" />
              About This App
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-base">
              This application is based on the cosmological teachings of Muhyiddin Ibn Arabi (1165-1240 CE), 
              the great Sufi master known as "Sheikh al-Akbar" (The Greatest Master). His work describes 
              the hierarchical structure of existence from the Divine Essence down through the celestial 
              spheres to the material world.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              The 28 Lunar Mansions (Manazil al-Qamar) represent stages of spiritual ascent and are 
              connected to the Arabic letters, Divine Names, and prophetic stations as outlined in 
              Ibn Arabi's Fusus al-Hikam and other works.
            </p>
          </section>

          <section id="lunar-mansions" className="glass-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
              <Moon className="w-5 h-5" />
              Lunar Mansions <span className="font-arabic text-lg">المنازل القمرية</span>
            </h2>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p className="leading-relaxed text-base">
                The Moon travels through each of the 28 mansions approximately every day. Each mansion is not just a region 
                of space but a <strong className="text-foreground">place where a specific divine quality enters time</strong>, 
                shaping events, moods, and spiritual openings.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2 text-base">
                <li><strong className="text-foreground">Check the Current Mansion:</strong> See which lunar mansion the Moon currently occupies.</li>
                <li><strong className="text-foreground">Blessed vs Challenging:</strong> Green indicates a blessed time; amber indicates caution.</li>
                <li><strong className="text-foreground">Recommended Actions:</strong> Activities spiritually aligned with the mansion's nature.</li>
                <li><strong className="text-foreground">Divine Attributes:</strong> Meditate on the Divine Name associated with the mansion.</li>
              </ul>
            </div>

            {/* Four Categories */}
            <div className="mb-6 p-5 rounded-lg bg-foreground/5 border border-border">
              <h3 className="text-base font-medium text-foreground mb-4">The Four Categories of Mansions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 font-medium text-sm">1-4</span>
                  <div>
                    <strong className="text-foreground text-base">Initiating</strong>
                    <p className="text-muted-foreground text-sm mt-1">Seed energy, vision, raw potential. Good for beginnings.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-medium text-sm">5-8</span>
                  <div>
                    <strong className="text-foreground text-base">Stabilizing</strong>
                    <p className="text-muted-foreground text-sm mt-1">Form, structure, commitment. Good for building.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/40 font-medium text-sm">9-20</span>
                  <div>
                    <strong className="text-foreground text-base">Relational</strong>
                    <p className="text-muted-foreground text-sm mt-1">Communication, travel, learning, emotion, creativity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 font-medium text-sm">21-28</span>
                  <div>
                    <strong className="text-foreground text-base">Threshold</strong>
                    <p className="text-muted-foreground text-sm mt-1">Endings, karma, transitions. Good for closure.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Waxing vs Waning */}
            <div className="mb-6 p-5 rounded-lg bg-foreground/5 border border-border">
              <h3 className="text-base font-medium text-foreground mb-4">Waxing vs Waning Moon</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex items-start gap-3">
                  <Sun className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground text-base">Waxing (New → Full)</strong>
                    <p className="text-muted-foreground text-sm mt-1">Best for starting things. Supports growth, attraction, gathering. Opens doors outwardly.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Moon className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground text-base">Waning (Full → New)</strong>
                    <p className="text-muted-foreground text-sm mt-1">Best for ending things. Supports release, healing, forgiveness. Closes unnecessary loops.</p>
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
                        {mansion.nature === "blessed" ? (
                          <Check className="w-5 h-5 text-green-500 shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-amber-500 shrink-0" />
                        )}
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
                        
                        {/* Best For / Avoid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                            <strong className="text-green-400 text-sm uppercase tracking-wide block mb-2">Best For</strong>
                            <p className="text-foreground/80 text-base">{mansion.bestFor}</p>
                          </div>
                          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                            <strong className="text-red-400 text-sm uppercase tracking-wide block mb-2">Avoid</strong>
                            <p className="text-foreground/80 text-base">{mansion.avoid}</p>
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

          <section className="glass-card rounded-xl p-6 border border-border">
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
                  location but a doorway through which divine qualities descend. When the Moon enters a mansion, that mansion's 
                  spiritual quality becomes accessible on Earth—influencing moods, events, and spiritual openings.
                </p>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">The Four Mansion Phases</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                    <strong className="text-green-400 text-sm">Seed (1-4)</strong>
                    <p className="text-foreground/80 text-sm mt-1">Pure potential, vision, intention. Plant new seeds.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <strong className="text-amber-400 text-sm">Build (5-8)</strong>
                    <p className="text-foreground/80 text-sm mt-1">Structure, commitment, stabilization. Build foundations.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                    <strong className="text-blue-400 text-sm">Relate (9-20)</strong>
                    <p className="text-foreground/80 text-sm mt-1">Connection, communication, relationships. Engage with others.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <strong className="text-purple-400 text-sm">Release (21-28)</strong>
                    <p className="text-foreground/80 text-sm mt-1">Endings, purification, surrender. Complete and let go.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-medium text-foreground mb-2">How to Use the Mansion Cards</h3>
                <ul className="list-disc list-inside space-y-2 ml-2 text-base">
                  <li><strong className="text-foreground">Look at "Mansion Theme":</strong> Understand the core energy of this station.</li>
                  <li><strong className="text-foreground">Check "Good For / Not Ideal For":</strong> Align your activities accordingly.</li>
                  <li><strong className="text-foreground">Use "Suggested Dhikr & Practice":</strong> The Divine Name and practice for this mansion.</li>
                  <li><strong className="text-foreground">Note the Cycle Role tag:</strong> See where you are in the 28-day cycle (Seed/Build/Relate/Release).</li>
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
              
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-foreground/5 border border-border">
                  <h4 className="text-sm font-medium text-foreground mb-2">Example: Mars Hour + Release Mansion</h4>
                  <p className="text-sm text-foreground/80">
                    A Mars hour brings cutting energy. Combined with a Release-phase mansion (21-28), this is excellent 
                    for cutting unhealthy patterns, ending procrastination, or severing attachments that no longer serve you. 
                    The courage of Mars meets the letting-go energy of the mansion phase.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-foreground/5 border border-border">
                  <h4 className="text-sm font-medium text-foreground mb-2">Example: Venus Hour + Build Mansion</h4>
                  <p className="text-sm text-foreground/80">
                    A Venus hour brings beauty and love. Combined with a Build-phase mansion (5-8), this is excellent 
                    for stabilizing relationships, creating beauty in your environment, or formalizing commitments 
                    with gentleness. The harmony of Venus meets the structuring energy of the mansion phase.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-foreground/5 border border-border">
                  <h4 className="text-sm font-medium text-foreground mb-2">Example: Jupiter Hour + Seed Mansion</h4>
                  <p className="text-sm text-foreground/80">
                    A Jupiter hour brings expansion and wisdom. Combined with a Seed-phase mansion (1-4), this is excellent 
                    for setting expansive intentions, beginning studies, or planning charitable endeavors. 
                    The abundance of Jupiter meets the initiating energy of the mansion phase.
                  </p>
                </div>
              </div>
              
              <p className="text-sm italic text-muted-foreground/80 pt-2">
                Trust your inner state (expansion or contraction) to know whether to act outwardly or reflect inwardly.
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
                renewed by God—a new creation (khalq jadīd) that carries its own unique divine signature. 
                The past is gone, the future is not yet, and only the present moment is real. This is why 
                awareness of the spiritual quality of "now" matters.
              </p>
              
              <p className="leading-relaxed text-base">
                Every hour has an angelic spirit attending it and a ruling Divine Name that governs its quality. 
                When you align your actions with the hour's nature, you act in harmony with the cosmos—this is 
                the meaning of acting with <strong className="text-foreground">adab</strong> (right conduct). When you resist the hour's nature, 
                you may find obstacles and friction.
              </p>
              
              <p className="leading-relaxed text-base">
                The Moon serves as the primary mirror for divine decrees descending into the material world. 
                As it travels through the 28 mansions, it reflects different aspects of the divine qualities 
                into earthly life. Each mansion marks a stage of that reflection—from the first spark of intention 
                (Mansion 1) to the final surrender and completion (Mansion 28).
              </p>
              
              <p className="leading-relaxed text-base">
                This app uses this cosmological logic to help you act with <strong className="text-foreground">adab</strong> (أدب)—right conduct in 
                each moment. By reading the hour and mansion, you can know what kind of action is supported, 
                what kind of inner state to cultivate, and which Divine Name to invoke.
              </p>

              <div className="pt-4 border-t border-border mt-4">
                <h3 className="text-base font-medium text-foreground mb-3">Key Sources for Further Reading</h3>
                <ul className="list-disc list-inside space-y-2 ml-2 text-sm text-foreground/80">
                  <li>Ibn ʿArabi – <em>Mawāqiʿ al-Nujūm</em> (The Setting of the Stars)</li>
                  <li>Ibn ʿArabi – <em>al-Futūḥāt al-Makkiyya</em> (The Meccan Openings), especially chapters on time, imagination, hours, and planets</li>
                  <li>Titus Burckhardt – <em>Mystical Astrology According to Ibn ʿArabi</em></li>
                  <li>William Chittick – <em>The Sufi Path of Knowledge</em></li>
                </ul>
              </div>
            </div>
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

        <footer className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>Based on the teachings of Muhyiddin Ibn Arabi (1165-1240 CE)</p>
          <p className="font-arabic mt-1 text-base">مبني على تعاليم محيي الدين ابن عربي</p>
        </footer>
      </div>
    </div>
  );
}
