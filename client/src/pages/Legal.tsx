import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

export default function Legal() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-4xl font-serif text-gold">Disclaimer</h1>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
          <section className="space-y-4">
            <p className="leading-relaxed">
              This application is an art and educational project designed to explore ancient astronomical traditions. All content, including astrological interpretations and timing guidance, is provided for <span className="text-gold font-semibold">entertainment and informational purposes only</span>.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-xl font-serif text-gold">Professional Advice</h2>
            <p className="leading-relaxed text-sm">
              This tool should not be used as a substitute for professional advice in matters of:
            </p>
            <ul className="space-y-2 ml-6 list-disc list-inside text-sm">
              <li>Health and medical concerns</li>
              <li>Financial and investment decisions</li>
              <li>Legal matters and contracts</li>
              <li>Major life decisions</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-xl font-serif text-gold">Accuracy of Information</h2>
            <p className="leading-relaxed text-sm">
              The astronomical calculations are precise, but the mystical interpretations reflect historical traditions and modern creative expression. They are not deterministic and should not be used to predict or guarantee outcomes.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-xl font-serif text-gold">User Responsibility</h2>
            <p className="leading-relaxed text-sm">
              By using this application, you acknowledge that all decisions and actions based on its content are your own responsibility. The creator assumes no liability for how you use this information.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-xl font-serif text-gold">Technology</h2>
            <p className="leading-relaxed text-sm">
              Built with modern web technologies and powered by precise astronomical calculations. All lunar data is computed in real-time using the astronomy-engine library.
            </p>
          </section>
        </div>

        {/* Links */}
        <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 text-sm justify-center">
          <Link href="/terms">
            <Button variant="link" className="text-primary">Terms of Use →</Button>
          </Link>
          <Link href="/privacy">
            <Button variant="link" className="text-primary">Privacy Policy →</Button>
          </Link>
          <a href="mailto:contact@psyda.org">
            <Button variant="link" className="text-primary">Contact & Support →</Button>
          </a>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
