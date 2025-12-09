import { useState, useEffect, useCallback } from "react";
import { ArrowUp, List, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface TOCSection {
  id: string;
  title: string;
  icon?: React.ReactNode;
}

interface TableOfContentsProps {
  sections: TOCSection[];
  title?: string;
}

export function TableOfContents({ sections, title = "Table of Contents" }: TableOfContentsProps) {
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
    setIsVisible(scrollY > 200);

    let foundSection: string | null = null;
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150) {
          foundSection = section.id;
          break;
        }
      }
    }
    setCurrentSection(foundSection);
  }, [sections]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      setIsModalOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsModalOpen(false);
  };

  const currentSectionTitle = sections.find(s => s.id === currentSection)?.title;

  return (
    <>
      {isVisible && (
        <div 
          className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm transition-all duration-300"
        >
          <div className="h-0.5 bg-gold/20">
            <div 
              className="h-full bg-gold transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {currentSectionTitle && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground truncate">
                  <ChevronRight className="w-3 h-3 text-gold shrink-0" />
                  <span className="truncate">
                    <span className="text-foreground/60 text-xs mr-1">Reading:</span>
                    <span className="text-gold font-medium">{currentSectionTitle}</span>
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden sm:flex items-center gap-1 overflow-x-auto max-w-md">
                {sections.slice(0, 5).map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`px-2 py-1 text-xs rounded-md transition-colors whitespace-nowrap ${
                      currentSection === section.id
                        ? 'bg-gold/20 text-gold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                    }`}
                    data-testid={`toc-quick-${section.id}`}
                  >
                    {section.title.length > 15 ? section.title.slice(0, 15) + '...' : section.title}
                  </button>
                ))}
                {sections.length > 5 && (
                  <span className="text-xs text-muted-foreground">+{sections.length - 5}</span>
                )}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1.5 text-muted-foreground hover:text-gold"
                onClick={() => setIsModalOpen(true)}
                data-testid="toc-open-modal"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline text-xs">All</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-gold font-serif">{title}</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[60vh] pr-2 -mr-2">
            <div className="space-y-1 py-2">
              <button
                onClick={scrollToTop}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg text-left transition-colors hover:bg-foreground/5 text-muted-foreground"
                data-testid="toc-scroll-top"
              >
                <ArrowUp className="w-4 h-4 shrink-0" />
                <span>Back to Top</span>
              </button>
              <div className="h-px bg-border my-2" />
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg text-left transition-colors ${
                    currentSection === section.id
                      ? 'bg-gold/10 text-gold'
                      : 'hover:bg-foreground/5 text-foreground/80'
                  }`}
                  data-testid={`toc-item-${section.id}`}
                >
                  <span className="w-5 h-5 flex items-center justify-center text-xs text-muted-foreground shrink-0">
                    {section.icon || (index + 1)}
                  </span>
                  <span className="truncate">{section.title}</span>
                  {currentSection === section.id && (
                    <ChevronRight className="w-3 h-3 ml-auto text-gold shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-gold/20 border border-gold/50 text-gold hover:bg-gold/30 transition-colors z-50"
        aria-label="Open table of contents"
        data-testid="button-open-toc"
      >
        <List className="w-5 h-5" />
      </button>
    </>
  );
}

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-gold/20 border border-gold/50 text-gold hover:bg-gold/30 transition-colors z-50"
      aria-label="Scroll to top"
      data-testid="button-scroll-to-top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
