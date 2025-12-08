import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Terms() {
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
          <h1 className="text-4xl font-serif text-gold">Terms of Use</h1>
        </div>

        {/* Content */}
        <div className="space-y-6 text-foreground/80">
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-gold">Educational Purpose</h2>
            <p className="text-sm leading-relaxed">
              This tool is intended solely for learning, spiritual contemplation, and personal reflection. It is not meant to replace professional advice or guidance.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-xl font-serif text-gold">No Warranty</h2>
            <p className="text-sm leading-relaxed">
              All information is provided <span className="italic">"as is"</span> without any warranties of:
            </p>
            <ul className="space-y-1 ml-4 list-disc list-inside text-sm">
              <li>Accuracy</li>
              <li>Completeness</li>
              <li>Fitness for a particular purpose</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-xl font-serif text-gold">Personal Responsibility</h2>
            <p className="text-sm leading-relaxed">
              You are solely responsible for how you interpret or apply any content from this application. The creators assume no liability for your decisions based on this tool.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-xl font-serif text-gold">Non-Deterministic Framework</h2>
            <p className="text-sm leading-relaxed">
              Celestial cycles presented in this tool are <span className="font-semibold">symbolic and do not determine or predict events</span>. They serve as frameworks for reflection and personal guidance.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-xl font-serif text-gold">Intellectual Property</h2>
            <p className="text-sm leading-relaxed">
              Content from this application may not be copied, modified, or redistributed without permission from the creator.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-xl font-serif text-gold">Right to Modify</h2>
            <p className="text-sm leading-relaxed">
              The creator reserves the right to update, modify, or discontinue the application at any time without notice.
            </p>
          </section>
        </div>

        {/* Links */}
        <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 text-sm">
          <Link href="/legal">
            <Button variant="link" className="text-primary">Legal Disclaimer →</Button>
          </Link>
          <Link href="/privacy">
            <Button variant="link" className="text-primary">Privacy Policy →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
