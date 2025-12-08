import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border mt-16 pt-12 pb-8 px-4">
      {/* Disclaimer - Full Width */}
      <div className="glass-card rounded-xl p-6 border border-border bg-gold/5 w-full text-left mb-6 space-y-4">
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
      {/* Rest of content - Centered */}
      <div className="max-w-4xl mx-auto space-y-6 text-center">
        {/* Divider */}
        <div className="h-px bg-border/50" />

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
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
      </div>
    </footer>
  );
}
