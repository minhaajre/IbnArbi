import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Scroll, BookOpen, Heart } from "lucide-react";
import { TableOfContents, TOCSection } from "@/components/TableOfContents";
import { PrayerBeadsIcon, QuranIcon, DuaHandsIcon, CalligraphyIcon, MihrabIcon } from "@/components/icons/IslamicIcons";

const AZKAAR_SECTIONS: TOCSection[] = [
  { id: "about-azkaar", title: "About These Aẓkār", icon: <DuaHandsIcon className="w-4 h-4" /> },
  { id: "hizb-al-bahr", title: "Hizb al-Baḥr", icon: <CalligraphyIcon className="w-4 h-4" /> },
  { id: "qasidat-al-burda", title: "Qasīdat al-Burda", icon: <CalligraphyIcon className="w-4 h-4" /> },
  { id: "hizb-al-wafi", title: "Hizb al-Wāfī", icon: <CalligraphyIcon className="w-4 h-4" /> },
  { id: "hizb-al-nasr", title: "Ḥizb al-Naṣr", icon: <CalligraphyIcon className="w-4 h-4" /> },
  { id: "wird-al-latif", title: "Wird al-Laṭīf", icon: <PrayerBeadsIcon className="w-4 h-4" /> },
  { id: "dalail-al-khairat", title: "Dalā'il al-Khairāt", icon: <CalligraphyIcon className="w-4 h-4" /> },
  { id: "hizb-al-kabir", title: "Hizb al-Kabīr", icon: <CalligraphyIcon className="w-4 h-4" /> },
  { id: "hizb-al-dawr", title: "Hizb al-Dawr al-Aʿlā", icon: <MihrabIcon className="w-4 h-4" /> },
  { id: "quranic-surahs", title: "Qur'anic Surahs", icon: <QuranIcon className="w-4 h-4" /> },
  { id: "istighfar", title: "Istighfār", icon: <DuaHandsIcon className="w-4 h-4" /> },
  { id: "how-to-use", title: "How to Use", icon: <PrayerBeadsIcon className="w-4 h-4" /> },
];

export default function AdvancedAzkaar() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-foreground/5">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 mb-3">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Scroll className="w-6 h-6 text-purple-400" />
            <div>
              <h1 className="text-3xl font-serif text-gold">Advanced Sufi Aẓkār</h1>
              <p className="text-sm text-muted-foreground">Curated litanies and devotional recitations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Introduction */}
        <section id="about-azkaar" className="glass-card rounded-xl p-6 border border-border bg-purple-500/5">
          <div className="flex items-start gap-3 mb-4">
            <Heart className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">About These Aẓkār</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                The following litanies and devotional recitations are drawn from established Sufi traditions. They are offered as <strong>voluntary suggestions</strong> for deepening your relationship with the Divine through remembrance. Each may find special resonance during certain celestial windows (planetary hours, lunar mansions, days of the week) according to classical Sufi practice.
              </p>
              <p className="text-sm text-muted-foreground mt-3 italic">
                These are grounded in <strong>adab</strong> (spiritual courtesy), presence, and inward witnessing—not in magical thinking or promises of outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* Litanies List */}
        <section className="space-y-6">
          {/* Hizb al-Baḥr */}
          <div id="hizb-al-bahr" className="glass-card rounded-xl p-6 border border-border">
            <div className="flex items-start gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Hizb al-Baḥr</h3>
                <p className="text-sm font-arabic text-muted-foreground">حزب البحر</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>By:</strong> Abū'l-Ḥasan al-Shādhilī
            </p>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>Nature:</strong> Protection, surrender, reliance, expansion of heart
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              A profound litany emphasizing trust in divine unfolding and dissolving anxiety about outcomes. May resonate especially during Moon hours, Jupiter hours, and mansions associated with journeying or transitions.
            </p>
          </div>

          {/* Qasīdat al-Burda */}
          <div id="qasidat-al-burda" className="glass-card rounded-xl p-6 border border-border">
            <div className="flex items-start gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Qasīdat al-Burda (The Mantle Poem)</h3>
                <p className="text-sm font-arabic text-muted-foreground">قصيدة البردة</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>By:</strong> Imam al-Būṣīrī
            </p>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>Nature:</strong> Praise of the Prophet ﷺ, healing of the heart, softening
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Opens the heart to beauty (jamāl) and mercy (raḥma). May resonate especially during Venus hours, Moon hours, and mansions associated with reconciliation or relationship harmony.
            </p>
          </div>

          {/* Hizb al-Wāfī */}
          <div id="hizb-al-wafi" className="glass-card rounded-xl p-6 border border-border">
            <div className="flex items-start gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Hizb al-Wāfī</h3>
                <p className="text-sm font-arabic text-muted-foreground">حزب الوافي</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>By:</strong> Imam al-Nawawī
            </p>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>Nature:</strong> Spiritual grounding, clarity, protection
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Strengthens inner composure (sukūn al-qalb). May resonate especially during Saturn hours, Mars hours, and mansions related to stabilizing or closing cycles.
            </p>
          </div>

          {/* Ḥizb al-Naṣr */}
          <div id="hizb-al-nasr" className="glass-card rounded-xl p-6 border border-border">
            <div className="flex items-start gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Ḥizb al-Naṣr (Litany of Victory)</h3>
                <p className="text-sm font-arabic text-muted-foreground">حزب النصر</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>By:</strong> Various Shadhili and Jazuli lineages
            </p>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>Nature:</strong> Inner fortitude, endurance, establishing clarity
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Victory here means clarity over confusion and integration of inner fragmentation. May resonate especially during Mars hours, Jupiter hours, and mansions of establishment or firmness.
            </p>
          </div>

          {/* Wird al-Laṭīf */}
          <div id="wird-al-latif" className="glass-card rounded-xl p-6 border border-border">
            <div className="flex items-start gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Wird al-Laṭīf</h3>
                <p className="text-sm font-arabic text-muted-foreground">الورد اللطيف</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>By:</strong> Imam al-Ḥaddād
            </p>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>Nature:</strong> Gentle protection, ease, removal of constriction
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Supports the seeker during periods of contraction (qabḍ). May resonate especially during Mercury hours, Venus hours, and mansions of communication or reconciliation.
            </p>
          </div>

          {/* Dalā'il al-Khairāt */}
          <div id="dalail-al-khairat" className="glass-card rounded-xl p-6 border border-border">
            <div className="flex items-start gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Dalā'il al-Khairāt</h3>
                <p className="text-sm font-arabic text-muted-foreground">دلائل الخيرات</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>By:</strong> Imam al-Jazūlī
            </p>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>Nature:</strong> Praise upon the Prophet ﷺ, opening of inner lights
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Invokes the light of prophethood to illuminate inner darkness. May resonate especially during Sun hours, on Fridays, and mansions associated with inspiration or openings.
            </p>
          </div>

          {/* Hizb al-Kabīr */}
          <div id="hizb-al-kabir" className="glass-card rounded-xl p-6 border border-border">
            <div className="flex items-start gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Hizb al-Kabīr</h3>
                <p className="text-sm font-arabic text-muted-foreground">الحزب الكبير</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>By:</strong> Ibn ʿArabī
            </p>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>Nature:</strong> Deep remembrance, clearing of inner veils
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              One of the authenticated litanies from Sheikh al-Akbar himself. May resonate during hours of expansion and mansions of release or unveiling.
            </p>
          </div>

          {/* Hizb al-Dawr al-Aʿlā */}
          <div id="hizb-al-dawr" className="glass-card rounded-xl p-6 border border-border">
            <div className="flex items-start gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Hizb al-Dawr al-Aʿlā (The Supreme Cycle)</h3>
                <p className="text-sm font-arabic text-muted-foreground">الدور الأعلى</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>Attributed to:</strong> Ibn ʿArabī
            </p>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>Nature:</strong> Invocation of divine Names in cosmological sequence
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              The closest thing in Sufi tradition to a "cosmic alignment prayer," framed as dhikr rather than manipulation. May resonate especially during Sun hours, Jupiter hours, and high-energy mansions.
            </p>
          </div>

          {/* Qur'anic Surahs */}
          <div id="quranic-surahs" className="glass-card rounded-xl p-6 border border-border">
            <div className="flex items-start gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Recommended Qur'anic Surahs</h3>
                <p className="text-sm font-arabic text-muted-foreground">السور القرآنية المقترحة</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-foreground">Surah al-Wāqiʿah</strong>
                <p className="text-foreground/80 mt-1">Associated with provision and sustenance. May resonate especially during Moon, Venus, and Jupiter hours.</p>
              </div>
              <div>
                <strong className="text-foreground">Surah Yā-Sīn</strong>
                <p className="text-foreground/80 mt-1">Associated with ease and inner opening. May resonate during Moon and Venus hours and mansions of softening.</p>
              </div>
              <div>
                <strong className="text-foreground">Surah al-Mulk</strong>
                <p className="text-foreground/80 mt-1">Associated with protection and divine sovereignty. May resonate during Saturn and Mars hours.</p>
              </div>
            </div>
          </div>

          {/* Istighfār */}
          <div id="istighfar" className="glass-card rounded-xl p-6 border border-border">
            <div className="flex items-start gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Istighfār (Seeking Forgiveness)</h3>
                <p className="text-sm font-arabic text-muted-foreground">الاستغفار</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
              <strong>Nature:</strong> Clearing, resetting, lightening the load
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Simple recitation of "Astaghfirullāh" (I seek forgiveness from Allah) removes subtle veils that prevent witnessing. May resonate especially during Mercury or Saturn hours, during the waning moon, and mansions of release.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="glass-card rounded-xl p-6 border border-border bg-amber-500/5 space-y-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Heart className="w-5 h-5 text-amber-500" />
            How to Use These Suggestions
          </h2>
          <ul className="space-y-2 text-sm text-foreground/80 leading-relaxed">
            <li className="flex gap-2">
              <span className="text-amber-500 font-semibold shrink-0">•</span>
              <span>These are <strong>optional</strong> — not prescriptive or required.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 font-semibold shrink-0">•</span>
              <span>Choose what resonates with you during the suggested planetary hours or lunar mansions.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 font-semibold shrink-0">•</span>
              <span>Begin with sincerity and adab (spiritual courtesy), not attachment to outcomes.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 font-semibold shrink-0">•</span>
              <span>Trust your own inner guidance; not every litany will resonate with every seeker.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 font-semibold shrink-0">•</span>
              <span>These are devotional practices, not talismanic or manipulative techniques.</span>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <div className="text-center pt-8 pb-12 space-y-2">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
      <TableOfContents sections={AZKAAR_SECTIONS} title="Litanies & Practices" />
    </div>
  );
}
