import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border mt-12 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 text-xs">
          <div className="space-y-2">
            <h3 className="font-serif text-gold text-sm">Application</h3>
            <Link href="/">
              <Button variant="link" className="p-0 h-auto text-foreground/70 hover:text-primary text-xs">
                Home
              </Button>
            </Link>
            <br />
            <Link href="/instructions">
              <Button variant="link" className="p-0 h-auto text-foreground/70 hover:text-primary text-xs">
                Guidance
              </Button>
            </Link>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-gold text-sm">Legal</h3>
            <Link href="/legal">
              <Button variant="link" className="p-0 h-auto text-foreground/70 hover:text-primary text-xs">
                Disclaimer
              </Button>
            </Link>
            <br />
            <Link href="/terms">
              <Button variant="link" className="p-0 h-auto text-foreground/70 hover:text-primary text-xs">
                Terms of Use
              </Button>
            </Link>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-gold text-sm">Privacy</h3>
            <Link href="/privacy">
              <Button variant="link" className="p-0 h-auto text-foreground/70 hover:text-primary text-xs">
                Privacy Policy
              </Button>
            </Link>
          </div>
        </div>

        <div className="border-t border-border/50 pt-4 text-center text-[10px] text-foreground/50">
          <p>Ibn Arabi's Cosmology • Educational & Spiritual Study Tool</p>
          <p className="mt-1">All astronomical calculations provided for educational purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
