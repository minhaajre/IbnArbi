import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          <h1 className="text-4xl font-serif text-gold">Legal Disclaimer</h1>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
          <section className="space-y-4">
            <p className="leading-relaxed">
              This application is provided for <span className="text-gold font-semibold">educational, cultural, and spiritual study purposes only</span>.
            </p>
            <ul className="space-y-2 ml-4 list-disc list-inside text-sm">
              <li>It does not offer medical, psychological, financial, or legal advice.</li>
              <li>No outcomes are guaranteed or implied.</li>
              <li>All interpretations of time, lunar mansions, and cosmological symbolism are traditional frameworks for personal reflection only.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-xl font-serif text-gold">Acknowledgment of Responsibility</h2>
            <p className="leading-relaxed text-sm">
              By using this application, you acknowledge that:
            </p>
            <ul className="space-y-2 ml-4 list-disc list-inside text-sm">
              <li>All decisions and actions you take are your own responsibility</li>
              <li>The creator of this application is not liable for any use or misuse of the information provided</li>
              <li>You understand the symbolic and educational nature of all content</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-xl font-serif text-gold">Professional Consultation</h2>
            <p className="leading-relaxed text-sm">
              If you have concerns regarding <span className="font-semibold">health, mental well-being, financial matters, or legal issues</span>, please consult a qualified professional.
            </p>
          </section>
        </div>

        {/* Links */}
        <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 text-sm">
          <Link href="/terms">
            <Button variant="link" className="text-primary">Terms of Use →</Button>
          </Link>
          <Link href="/privacy">
            <Button variant="link" className="text-primary">Privacy Policy →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
