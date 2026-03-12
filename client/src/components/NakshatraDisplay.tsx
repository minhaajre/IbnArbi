import { motion } from "framer-motion";
import { NakshatraInfo } from "@/lib/astronomy";
import { NAKSHATRAS, NAKSHATRA_CATEGORIES, Nakshatra } from "@/data/nakshatras";
import { format } from "date-fns";
import { Clock, ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { useState } from "react";

interface NakshatraDisplayProps {
  nakshatraInfo: NakshatraInfo;
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

export function NakshatraDisplay({ nakshatraInfo }: NakshatraDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const nakshatra = NAKSHATRAS[nakshatraInfo.nakshatraIndex];
  const category = NAKSHATRA_CATEGORIES[nakshatra.category];
  const style = CATEGORY_STYLES[nakshatra.category] || CATEGORY_STYLES.Ordinary;

  const nextIndex = (nakshatraInfo.nakshatraIndex + 1) % 27;
  const nextNakshatra = NAKSHATRAS[nextIndex];

  const hours = Math.floor(nakshatraInfo.hoursUntilNext);
  const minutes = Math.round((nakshatraInfo.hoursUntilNext - hours) * 60);

  const upcomingNakshatras = Array.from({ length: 6 }, (_, i) => {
    const idx = (nakshatraInfo.nakshatraIndex + 1 + i) % 27;
    return NAKSHATRAS[idx];
  });

  return (
    <div className="space-y-3" data-testid="nakshatra-display">
      <div className="relative flex flex-col items-center justify-center py-2">
        <motion.div
          className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="relative z-10 text-center">
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
          <div className="text-sm font-arabic text-foreground/60 mb-1">
            {nakshatra.sanskrit}
          </div>

          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${style.bg} ${style.border} border mb-3`}>
            <span className={`text-xs font-medium ${style.text}`}>
              {category.name}
            </span>
            <span className="text-[10px] text-foreground/50">•</span>
            <span className="text-xs text-foreground/60">{category.sanskrit}</span>
            <span className="text-[10px] text-foreground/50">•</span>
            <span className="text-xs font-arabic text-foreground/60">{category.arabic}</span>
          </div>

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

          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-3 font-light tracking-wide bg-foreground/5 px-3 py-1 rounded-full w-fit mx-auto border border-border text-xs">
            <Clock className="w-3 h-3" />
            <span>Next: {nextNakshatra.name} in {hours}h {minutes}m</span>
            <span className="text-[10px] text-foreground/40">({format(nakshatraInfo.nextTransitDate, "MMM d, h:mm a")})</span>
          </div>

          <div className="w-64 h-1 bg-foreground/10 rounded-full overflow-hidden mx-auto mb-3 relative">
            <motion.div
              className="absolute top-0 bottom-0 bg-primary shadow-[0_0_10px_rgba(250,204,21,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${nakshatraInfo.progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest opacity-50 mb-3">
            {Math.round(nakshatraInfo.progressPercent)}% through {nakshatra.name}
          </p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 mx-auto text-xs text-primary hover:text-primary/80 transition-colors"
            data-testid="nakshatra-expand-toggle"
          >
            <span>{isExpanded ? "Hide" : "Show"} Activities</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 text-left max-w-sm mx-auto"
            >
              <div className="space-y-2">
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-emerald-500 mb-1.5 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> Recommended
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
                <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-red-500 mb-1.5 font-medium flex items-center gap-1">
                    <X className="w-3 h-3" /> Avoid
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
            </motion.div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3" data-testid="upcoming-nakshatras">
        {upcomingNakshatras.map((n) => {
          const cat = NAKSHATRA_CATEGORIES[n.category];
          const s = CATEGORY_STYLES[n.category] || CATEGORY_STYLES.Ordinary;
          return (
            <div
              key={n.number}
              className="bg-foreground/5 border border-border rounded-lg p-3 text-center backdrop-blur-sm flex flex-col items-center justify-between h-full"
              data-testid={`nakshatra-card-${n.number}`}
            >
              <div className="text-xl mb-1">{cat.icon}</div>
              <div className="text-[10px] font-medium text-foreground/70 uppercase tracking-wider">
                {n.name}
              </div>
              <div className={`text-[9px] px-1.5 py-0.5 rounded-full mt-1 ${s.bg} ${s.border} border ${s.text}`}>
                {cat.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
