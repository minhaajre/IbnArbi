import { motion } from "framer-motion";
import { NakshatraInfo, PlanetNakshatra } from "@/lib/astronomy";
import { NAKSHATRAS, NAKSHATRA_CATEGORIES, Nakshatra } from "@/data/nakshatras";
import { format } from "date-fns";
import { Clock, ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { useState } from "react";
import { PLANET_SYMBOLS, PLANET_TAILWIND_COLORS } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NakshatraDisplayProps {
  nakshatraInfo: NakshatraInfo;
  planetNakshatras?: PlanetNakshatra[];
}

const CATEGORY_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  Fixed: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-500" },
  Movable: { bg: "bg-sky-500/10", border: "border-sky-500/30", text: "text-sky-500" },
  Cruel: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-500" },
  Ordinary: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-500" },
  Short: { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-500" },
  Gentle: { bg: "bg-pink-500/10", border: "border-pink-500/30", text: "text-pink-500" },
  Ferocious: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-500" },
};

const CATEGORY_TOOLTIP: Record<string, { headline: string; body: string }> = {
  Fixed:     { headline: "Fixed (Dhruva / Sthira)", body: "Stable, enduring energy. Favours long-term undertakings, foundations, vows, and anything that should last." },
  Movable:   { headline: "Movable (Chara)", body: "Dynamic, changeable energy. Favours travel, transitions, trade, and activities that benefit from flexibility." },
  Cruel:     { headline: "Cruel (Ugra / Krura)", body: "Forceful, aggressive energy. Favours cutting, competitive acts, surgery, and overcoming obstacles — not ceremonies or beginnings." },
  Ordinary:  { headline: "Ordinary (Mishra)", body: "Mixed, neutral energy. Neither especially auspicious nor inauspicious; suitable for everyday tasks and activities requiring balance." },
  Short:     { headline: "Short / Swift (Kshipra / Laghu)", body: "Quick, light energy. Favours swift actions, short tasks, beginning new endeavours, learning, and trade." },
  Gentle:    { headline: "Gentle (Mridu)", body: "Soft, pleasant energy. Favours creative arts, friendship, marriage, education, and matters requiring a gentle touch." },
  Ferocious: { headline: "Ferocious (Tikshna / Daruna)", body: "Intense, penetrating energy. Favours deep research, psychological work, tantra, and destruction of what must end — not gentle beginnings." },
};

export function NakshatraDisplay({ nakshatraInfo, planetNakshatras = [] }: NakshatraDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const nakshatra = NAKSHATRAS[nakshatraInfo.nakshatraIndex];
  const category = NAKSHATRA_CATEGORIES[nakshatra.category];
  const style = CATEGORY_STYLES[nakshatra.category] || CATEGORY_STYLES.Ordinary;
  const categoryTooltip = CATEGORY_TOOLTIP[nakshatra.category] || CATEGORY_TOOLTIP.Ordinary;

  const nextIndex = (nakshatraInfo.nakshatraIndex + 1) % 27;
  const nextNakshatra = NAKSHATRAS[nextIndex];

  const hours = Math.floor(nakshatraInfo.hoursUntilNext);
  const minutes = Math.round((nakshatraInfo.hoursUntilNext - hours) * 60);

  const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const nakshatraSize = 360 / 27;
  const avgMoonSpeedPerHour = 13.0 / 24;

  const upcomingNakshatras = Array.from({ length: 6 }, (_, i) => {
    const idx = (nakshatraInfo.nakshatraIndex + 1 + i) % 27;
    const n = NAKSHATRAS[idx];
    const hoursFromNow = (nakshatraInfo.degreesRemaining + i * nakshatraSize) / avgMoonSpeedPerHour;
    const entryDate = new Date(Date.now() + hoursFromNow * 60 * 60 * 1000);
    const dayName = DAY_NAMES[entryDate.getDay()];
    return { ...n, entryDate, dayName };
  });

  const toggleSection = (key: string) =>
    setOpenSection(prev => (prev === key ? null : key));

  return (
    <div className="space-y-3" data-testid="nakshatra-display">
      <div className="relative flex flex-col items-center justify-center py-2">
        <motion.div
          className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="relative z-10 text-center w-full">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl sm:text-6xl mb-3"
          >
            {category.icon}
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-serif text-foreground mb-0.5" data-testid="nakshatra-name">
            {nakshatra.name}
          </h2>
          <div className="text-sm font-arabic text-foreground/60 mb-0.5">
            {nakshatra.sanskrit}
          </div>
          <div className="text-xs text-foreground/40 italic mb-2">
            {nakshatra.meaning}
          </div>

          {/* Category badge with tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${style.bg} ${style.border} border mb-3 cursor-help`}>
                  <span className={`text-xs font-medium ${style.text}`}>
                    {category.name}
                  </span>
                  <span className="text-[10px] text-foreground/50">•</span>
                  <span className="text-xs text-foreground/60">{category.sanskrit}</span>
                  <span className="text-[10px] text-foreground/50">•</span>
                  <span className="text-xs font-arabic text-foreground/60">{category.arabic}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs bg-white text-foreground border border-border p-3 rounded-lg shadow-lg">
                <div className="space-y-1.5">
                  <div className="text-sm font-semibold text-foreground">{categoryTooltip.headline}</div>
                  <div className="text-xs leading-relaxed text-muted-foreground">{categoryTooltip.body}</div>
                  <div className="text-[10px] text-muted-foreground/70">Read as a lens for timing, not a prediction.</div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Meta chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3 text-xs">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-foreground/5 border border-border">
              <span className="text-muted-foreground">Ruler:</span>
              <span className="text-foreground/80 font-medium">{nakshatra.rulingPlanet}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-foreground/5 border border-border">
              <span className="text-muted-foreground">Deity:</span>
              <span className="text-foreground/80 font-medium">{nakshatra.deity}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-foreground/5 border border-border">
              <span className="text-muted-foreground">Symbol:</span>
              <span className="text-foreground/80 font-medium">{nakshatra.symbol}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-foreground/5 border border-border">
              <span className="text-muted-foreground">Element:</span>
              <span className="text-foreground/80 font-medium">{nakshatra.element}</span>
            </div>
          </div>

          {/* Progress bar + timing */}
          <div className="mb-3 p-3 rounded-lg bg-foreground/5 border border-border max-w-sm mx-auto text-left">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">Progress through {nakshatra.name}</span>
              <span className="text-xs font-mono text-primary">{Math.round(nakshatraInfo.progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full bg-primary shadow-[0_0_10px_rgba(250,204,21,0.5)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${nakshatraInfo.progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            {/* Start / end strip */}
            <div className="flex items-center justify-between text-[10px] text-muted-foreground/70 mb-1.5">
              <div className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                <span>Entered {format(nakshatraInfo.entryDate, "MMM d, h:mm a")}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Exits {format(nakshatraInfo.nextTransitDate, "MMM d, h:mm a")}</span>
                <Clock className="w-2.5 h-2.5" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Next: <span className="text-foreground font-medium">{nextNakshatra.name}</span> in {hours}h {minutes}m</span>
              </div>
            </div>
          </div>

          {/* Always-visible Quick Guidance */}
          <div className="mb-3 max-w-sm mx-auto space-y-2">
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 text-left">
              <div className="text-[10px] uppercase tracking-wider text-emerald-500 mb-1.5 font-medium flex items-center gap-1">
                <Check className="w-3 h-3" /> May Support
              </div>
              <div className="space-y-1">
                {nakshatra.bestFor.map((item, i) => (
                  <div key={i} className="text-xs text-foreground/70 flex items-start gap-1.5">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 text-left">
              <div className="text-[10px] uppercase tracking-wider text-red-500 mb-1.5 font-medium flex items-center gap-1">
                <X className="w-3 h-3" /> Use Caution With
              </div>
              <div className="space-y-1">
                {nakshatra.avoid.map((item, i) => (
                  <div key={i} className="text-xs text-foreground/70 flex items-start gap-1.5">
                    <span className="text-red-500 mt-0.5 shrink-0">✗</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Show Details toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 mx-auto text-xs text-primary hover:text-primary/80 transition-colors mb-1"
            data-testid="nakshatra-expand-toggle"
          >
            <span>{isExpanded ? "Hide" : "Show"} Details</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 text-left max-w-sm mx-auto space-y-1.5"
            >
              {/* Section: Deity & Symbol */}
              <div className="rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => toggleSection("deity")}
                  className="w-full flex items-center justify-between px-3 py-2 text-left bg-foreground/5 hover:bg-foreground/8 transition-colors"
                >
                  <span className="text-xs font-medium text-foreground/80">Deity &amp; Symbol</span>
                  {openSection === "deity" ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                </button>
                {openSection === "deity" && (
                  <div className="px-3 py-2.5 space-y-2.5 text-xs border-t border-border">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Presiding Deity</div>
                      <div className="font-medium text-foreground/90 mb-1">{nakshatra.deity}</div>
                      <div className="text-foreground/60 leading-relaxed">{nakshatra.deityContext}</div>
                      <div className="text-[9px] text-muted-foreground/50 mt-1">Source: Brihat Parashara Hora Shastra, Ch. 3–4</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Symbol</div>
                      <div className="text-foreground/70">{nakshatra.symbol}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Sanskrit Name</div>
                      <div className="font-arabic text-foreground/80 text-sm mb-0.5">{nakshatra.sanskrit}</div>
                      <div className="text-foreground/60 italic">{nakshatra.meaning}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Section: Planets in Nakshatras */}
              {planetNakshatras.length > 0 && (
                <div className="rounded-lg border border-border overflow-hidden">
                  <button
                    onClick={() => toggleSection("planets")}
                    className="w-full flex items-center justify-between px-3 py-2 text-left bg-foreground/5 hover:bg-foreground/8 transition-colors"
                  >
                    <span className="text-xs font-medium text-foreground/80">Planets in Nakshatras</span>
                    {openSection === "planets" ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                  </button>
                  {openSection === "planets" && (
                    <div className="px-3 py-2.5 border-t border-border">
                      <div className="grid grid-cols-3 gap-1.5">
                        {planetNakshatras.filter(p => p.planet !== "Moon").map((pn) => {
                          const pNak = NAKSHATRAS[pn.nakshatraIndex];
                          const pCat = NAKSHATRA_CATEGORIES[pNak.category];
                          const pStyle = CATEGORY_STYLES[pNak.category] || CATEGORY_STYLES.Ordinary;
                          return (
                            <div
                              key={pn.planet}
                              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-foreground/5 border border-border text-left"
                              data-testid={`planet-nakshatra-${pn.planet}`}
                            >
                              <span className={`text-sm ${PLANET_TAILWIND_COLORS[pn.planet] || "text-foreground"}`}>
                                {PLANET_SYMBOLS[pn.planet] || pn.planet[0]}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="text-[10px] font-medium text-foreground/70 truncate">{pn.planet}</div>
                                <div className={`text-[9px] truncate ${pStyle.text}`}>{pNak.name}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Section: Upcoming Cycle */}
              <div className="rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => toggleSection("upcoming")}
                  className="w-full flex items-center justify-between px-3 py-2 text-left bg-foreground/5 hover:bg-foreground/8 transition-colors"
                >
                  <span className="text-xs font-medium text-foreground/80">Upcoming Nakshatras</span>
                  {openSection === "upcoming" ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                </button>
                {openSection === "upcoming" && (
                  <div className="px-3 py-2.5 border-t border-border">
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2" data-testid="upcoming-nakshatras">
                      {upcomingNakshatras.map((n) => {
                        const cat = NAKSHATRA_CATEGORIES[n.category];
                        const s = CATEGORY_STYLES[n.category] || CATEGORY_STYLES.Ordinary;
                        return (
                          <div
                            key={n.number}
                            className="bg-foreground/5 border border-border rounded-lg p-2 text-center flex flex-col items-center justify-between gap-1"
                            data-testid={`nakshatra-card-${n.number}`}
                          >
                            <div className="text-base mb-0.5">{cat.icon}</div>
                            <div className="text-[10px] font-medium text-foreground/70 uppercase tracking-wider leading-tight">
                              {n.name}
                            </div>
                            <div className={`text-[9px] px-1.5 py-0.5 rounded-full ${s.bg} ${s.border} border ${s.text}`}>
                              {cat.name}
                            </div>
                            <div className="text-[9px] text-muted-foreground">
                              {n.dayName} · {n.rulingPlanet}
                            </div>
                            <div className="text-[9px] text-foreground/50">
                              {format(n.entryDate, "h:mm a")}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
