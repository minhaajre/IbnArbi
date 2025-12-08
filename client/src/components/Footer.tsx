import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border mt-16 pt-12 pb-8 px-4">
      {/* Disclaimer - Full Width */}
      <div className="glass-card rounded-xl p-6 border border-border bg-gold/5 w-full text-left mb-6 space-y-3">
        <p className="text-sm leading-relaxed text-foreground/80">This application offers a way to reflect on time through traditional cosmology. It does not make guarantees about outcomes, and the creator is not liable for how the information is used or understood.</p>
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
