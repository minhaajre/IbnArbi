import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-foreground/5 border-t border-border mt-16 pt-12 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Content */}
        <div className="space-y-6 text-center">
          {/* Disclaimer */}
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-foreground">
              <span className="font-semibold">Disclaimer:</span> This application is an art and educational project designed to explore ancient astronomical traditions. All content, including astrological interpretations and timing guidance, is provided for entertainment and informational purposes only.
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              This tool should not be used as a substitute for professional advice in matters of health, finance, legal issues, or major life decisions. The astronomical calculations are precise, but the mystical interpretations reflect historical traditions and modern creative expression.
            </p>
          </div>

          {/* Tech Info */}
          <div className="space-y-1 text-xs text-foreground/60">
            <p>Built with modern web technologies and powered by precise astronomical calculations.</p>
            <p>All lunar data is computed in real-time using the astronomy-engine library.</p>
          </div>

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
      </div>
    </footer>
  );
}
