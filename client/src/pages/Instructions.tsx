import { Link } from "wouter";
import { ArrowLeft, Moon, Sun, Clock, Orbit, Star, Scroll, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Instructions() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8 md:p-12 max-w-4xl mx-auto">
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
        <p className="text-muted-foreground">
          A guide to using Ibn Arabi's Cosmology App based on his spiritual teachings
        </p>
      </header>

      <div className="space-y-8">
        <section className="glass-card rounded-xl p-5 border border-border">
          <h2 className="text-xl font-serif text-gold mb-3 flex items-center gap-2">
            <Scroll className="w-5 h-5" />
            About This App
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            This application is based on the cosmological teachings of Muhyiddin Ibn Arabi (1165-1240 CE), 
            the great Sufi master known as "Sheikh al-Akbar" (The Greatest Master). His work describes 
            the hierarchical structure of existence from the Divine Essence down through the celestial 
            spheres to the material world.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The 28 Lunar Mansions (Manazil al-Qamar) represent stages of spiritual ascent and are 
            connected to the Arabic letters, Divine Names, and prophetic stations as outlined in 
            Ibn Arabi's Fusus al-Hikam and other works.
          </p>
        </section>

        <section className="glass-card rounded-xl p-5 border border-border">
          <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5" />
            Lunar Mansions <span className="font-arabic text-base">المنازل القمرية</span>
          </h2>
          <div className="space-y-3 text-muted-foreground">
            <p className="leading-relaxed">
              The Moon travels through each of the 28 mansions approximately every day, spending 
              roughly 24 hours in each station. Use this section to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Check the Current Mansion:</strong> See which lunar mansion the Moon currently occupies and its spiritual significance.</li>
              <li><strong className="text-foreground">Blessed vs Challenging:</strong> Green indicates a blessed time for action; amber indicates a time for caution and inner work.</li>
              <li><strong className="text-foreground">Recommended Actions:</strong> Each mansion has specific activities that are spiritually aligned with its nature.</li>
              <li><strong className="text-foreground">Divine Attributes:</strong> Meditate on the Divine Name associated with the current mansion.</li>
              <li><strong className="text-foreground">Arabic Letters:</strong> The letters connect to practices of dhikr (remembrance) and spiritual recitation.</li>
            </ul>
          </div>
        </section>

        <section className="glass-card rounded-xl p-5 border border-border">
          <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Planetary Hours <span className="font-arabic text-base">الساعات الكوكبية</span>
          </h2>
          <div className="space-y-3 text-muted-foreground">
            <p className="leading-relaxed">
              Each day is divided into 24 planetary hours, with each hour ruled by one of the seven 
              classical planets. The day ruler sets the spiritual tone for the entire day.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Current Hour:</strong> The highlighted hour shows the current planetary influence.</li>
              <li><strong className="text-foreground">Day Ruler:</strong> The planet ruling the day (Sun for Sunday, Moon for Monday, etc.).</li>
              <li><strong className="text-foreground">Prophet Association:</strong> Each planet is linked to a prophet in Ibn Arabi's system, guiding spiritual focus.</li>
              <li><strong className="text-foreground">Protocol:</strong> Suggested spiritual practices for the current planetary hour.</li>
              <li><strong className="text-foreground">Void of Course Moon:</strong> Yellow VOC indicator means the Moon makes no major aspects before leaving its sign—traditionally a time to avoid important decisions.</li>
            </ul>
          </div>
        </section>

        <section className="glass-card rounded-xl p-5 border border-border">
          <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
            <Orbit className="w-5 h-5" />
            Celestial Dignities <span className="font-arabic text-base">الكرامات السماوية</span>
          </h2>
          <div className="space-y-3 text-muted-foreground">
            <p className="leading-relaxed">
              This table shows the current positions of the seven classical planets and their dignities:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Rulership (R):</strong> Planet in its home sign—strongest expression.</li>
              <li><strong className="text-foreground">Exaltation (E):</strong> Planet in its sign of honor—elevated influence.</li>
              <li><strong className="text-foreground">Detriment (d):</strong> Planet in the sign opposite its home—weakened.</li>
              <li><strong className="text-foreground">Fall (f):</strong> Planet in the sign opposite its exaltation—most challenged.</li>
              <li><strong className="text-foreground">Tropical vs Sidereal:</strong> Toggle between Western (tropical) and Vedic/traditional (sidereal) zodiac calculations.</li>
            </ul>
          </div>
        </section>

        <section className="glass-card rounded-xl p-5 border border-border">
          <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5" />
            Elemental Balance <span className="font-arabic text-base">توازن العناصر</span>
          </h2>
          <div className="space-y-3 text-muted-foreground">
            <p className="leading-relaxed">
              The four elements (Fire, Earth, Air, Water) represent fundamental qualities of existence. 
              This section shows which elements are emphasized based on current planetary positions:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground text-red-400">Fire (النار):</strong> Action, will, transformation, spiritual aspiration.</li>
              <li><strong className="text-foreground text-amber-600">Earth (التراب):</strong> Stability, manifestation, practical matters.</li>
              <li><strong className="text-foreground text-sky-400">Air (الهواء):</strong> Intellect, communication, social connection.</li>
              <li><strong className="text-foreground text-blue-400">Water (الماء):</strong> Emotion, intuition, purification, receptivity.</li>
            </ul>
          </div>
        </section>

        <section className="glass-card rounded-xl p-5 border border-border">
          <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Location & Time Settings
          </h2>
          <div className="space-y-3 text-muted-foreground">
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Location:</strong> Click the location button to set your city. Calculations are based on your position for accurate sunrise/sunset times.</li>
              <li><strong className="text-foreground">Hijri Date:</strong> The Islamic lunar calendar date is displayed. Note that the Islamic day begins at sunset, not midnight.</li>
              <li><strong className="text-foreground">White Days:</strong> The 13th, 14th, and 15th of each Islamic month are blessed days for fasting.</li>
              <li><strong className="text-foreground">Theme:</strong> Toggle between light and dark mode using the sun/moon icon.</li>
            </ul>
          </div>
        </section>

        <section className="glass-card rounded-xl p-5 border border-border">
          <h2 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            How to Use Daily
          </h2>
          <div className="space-y-3 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-3 ml-2">
              <li><strong className="text-foreground">Morning Check:</strong> Review the day ruler and current lunar mansion to understand the spiritual climate.</li>
              <li><strong className="text-foreground">Plan Activities:</strong> Align important tasks with favorable planetary hours and mansion indications.</li>
              <li><strong className="text-foreground">Spiritual Practice:</strong> Use the Divine Attributes and Arabic letters for dhikr and meditation.</li>
              <li><strong className="text-foreground">Evening Reflection:</strong> Note how the day's energies manifested in your experience.</li>
              <li><strong className="text-foreground">White Days:</strong> Consider fasting on the 13th, 14th, and 15th of each Islamic month when indicated.</li>
            </ol>
          </div>
        </section>

        <section className="glass-card rounded-xl p-5 border border-border bg-gold/5">
          <p className="text-center text-muted-foreground italic">
            "The cosmos is a book and every creature is a letter in it."
          </p>
          <p className="text-center font-arabic text-lg mt-2 text-gold">
            الكون كتاب وكل مخلوق حرف فيه
          </p>
          <p className="text-center text-xs text-muted-foreground mt-2">— Ibn Arabi</p>
        </section>
      </div>

      <footer className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        <p>Based on the teachings of Muhyiddin Ibn Arabi (1165-1240 CE)</p>
        <p className="font-arabic mt-1">مبني على تعاليم محيي الدين ابن عربي</p>
      </footer>
    </div>
  );
}
