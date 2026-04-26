import { Link } from "wouter";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// ── SectionCard ─────────────────────────────────────────────────────────────
// Glass-card chrome shared by every section on the home page.
// Renders the section element + two absolute decorative lines; children are
// responsible for their own `relative z-10` where needed.

interface SectionCardProps {
  id: string;
  /** Extra classes to append (e.g. "mb-4 sm:mb-6") */
  className?: string;
  children: React.ReactNode;
}

export function SectionCard({ id, className = "", children }: SectionCardProps) {
  return (
    <section
      id={id}
      className={`glass-card rounded-xl sm:rounded-2xl p-3 sm:p-5 relative overflow-hidden${className ? ` ${className}` : ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      {children}
    </section>
  );
}

// ── SectionHeader ────────────────────────────────────────────────────────────
// Standard section header: bilingual title on the left, info Popover on the
// right. Used by sections whose header row contains only the title + info button.
// Sections with additional controls (e.g. planetary-hours, sky-map) write their
// own header and just use SectionCard for the outer chrome.

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  /** When true (default) the subtitle gets font-arabic */
  subtitleIsArabic?: boolean;
  /** data-testid for the info icon */
  infoTestId?: string;
  popoverAlign?: "start" | "end";
  popoverTitle: string;
  popoverDescription: string;
  /** If provided, renders a "Learn more →" link at the bottom of the popover */
  learnMoreHref?: string;
}

export function SectionHeader({
  title,
  subtitle,
  subtitleIsArabic = true,
  infoTestId,
  popoverAlign = "end",
  popoverTitle,
  popoverDescription,
  learnMoreHref,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-2 sm:mb-3 relative z-10">
      <h2 className="text-base sm:text-lg font-serif text-foreground/80">
        {title}
        {subtitle && (
          <span
            className={`${subtitleIsArabic ? "font-arabic " : ""}text-sm sm:text-base text-foreground/60 ml-1 sm:ml-2`}
          >
            {subtitle}
          </span>
        )}
      </h2>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
            <Info
              className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors"
              data-testid={infoTestId}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align={popoverAlign}>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">{popoverTitle}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{popoverDescription}</p>
            {learnMoreHref && (
              <Link href={learnMoreHref} className="text-xs text-primary hover:underline block pt-1">
                Learn more →
              </Link>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
