import { motion } from "framer-motion";
import { ChineseTimeEnergy } from "@/lib/chinese-astro";
import { GROUP_COLORS, ELEMENT_ICONS, OFFICER_STYLES, FIVE_ELEMENTS } from "@/data/chinese-astro";
import { ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { useState } from "react";

interface ChineseAstroDisplayProps {
  timeEnergy: ChineseTimeEnergy;
}

export function ChineseAstroDisplay({ timeEnergy }: ChineseAstroDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { lunarMansion, heavenlyStem, earthlyBranch, sexagenaryDay, sexagenaryChinese, dayOfficer, solarTerm, dayElement, dayPolarity } = timeEnergy;
  const groupStyle = GROUP_COLORS[lunarMansion.group] || GROUP_COLORS["Azure Dragon"];
  const officerStyle = OFFICER_STYLES[dayOfficer.nature] || OFFICER_STYLES.neutral;
  const elementIcon = ELEMENT_ICONS[dayElement] || "⚡";
  const elementData = FIVE_ELEMENTS[dayElement];

  return (
    <div className="space-y-3" data-testid="chinese-astro-display">
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
            className="text-5xl sm:text-6xl mb-2"
          >
            {groupStyle.icon}
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-serif text-foreground mb-0.5" data-testid="xiu-name">
            {lunarMansion.name}
          </h2>
          <div className="text-lg text-foreground/60 mb-1">
            {lunarMansion.chinese} · Xiu #{lunarMansion.number}
          </div>

          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${groupStyle.bg} ${groupStyle.border} border mb-3`}>
            <span className={`text-xs font-medium ${groupStyle.text}`}>
              {lunarMansion.group}
            </span>
            <span className="text-[10px] text-foreground/50">•</span>
            <span className="text-xs text-foreground/60">{lunarMansion.groupChinese}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-3 text-xs">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-foreground/5 border border-border">
              <span>{elementIcon}</span>
              <span className="text-muted-foreground">Element:</span>
              <span className="text-foreground/80 font-medium">{lunarMansion.element}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-foreground/5 border border-border">
              <span className="text-muted-foreground">Themes:</span>
              <span className="text-foreground/80 font-medium">{lunarMansion.themes.join(", ")}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-lg mx-auto mb-3">
            <div className="bg-foreground/5 border border-border rounded-lg p-2 text-center">
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground mb-0.5">Sexagenary Day</div>
              <div className="text-sm font-medium text-foreground">{sexagenaryChinese}</div>
              <div className="text-[10px] text-foreground/60">{sexagenaryDay}</div>
            </div>
            <div className="bg-foreground/5 border border-border rounded-lg p-2 text-center">
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground mb-0.5">Stem · Branch</div>
              <div className="text-sm font-medium text-foreground">{heavenlyStem.chinese} {earthlyBranch.chinese}</div>
              <div className="text-[10px] text-foreground/60">{heavenlyStem.name} · {earthlyBranch.animal}</div>
            </div>
            <div className="bg-foreground/5 border border-border rounded-lg p-2 text-center">
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground mb-0.5">Day Energy</div>
              <div className="text-sm font-medium text-foreground">{ELEMENT_ICONS[dayElement]} {dayElement}</div>
              <div className="text-[10px] text-foreground/60">{dayPolarity}</div>
            </div>
            <div className={`border rounded-lg p-2 text-center ${officerStyle.bg} ${officerStyle.border}`}>
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground mb-0.5">Day Officer</div>
              <div className={`text-sm font-medium ${officerStyle.text}`}>{dayOfficer.chinese} {dayOfficer.name}</div>
              <div className="text-[10px] text-foreground/60 capitalize">{dayOfficer.nature}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs mb-3">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-foreground/5 border border-border">
              <span className="text-muted-foreground">Solar Term:</span>
              <span className="text-foreground/80 font-medium">{solarTerm.chinese} {solarTerm.name}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-foreground/5 border border-border">
              <span className="text-muted-foreground">Season:</span>
              <span className="text-foreground/80 font-medium">{solarTerm.season}</span>
            </div>
          </div>

          {elementData && (
            <div className="flex flex-wrap items-center justify-center gap-1 mb-3">
              {elementData.keywords.map((kw, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {kw}
                </span>
              ))}
            </div>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 mx-auto text-xs text-primary hover:text-primary/80 transition-colors"
            data-testid="chinese-astro-expand-toggle"
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
                  <div className="flex flex-wrap gap-1">
                    {timeEnergy.recommended.map((item, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-red-500 mb-1.5 font-medium flex items-center gap-1">
                    <X className="w-3 h-3" /> Avoid
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {timeEnergy.avoid.map((item, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 capitalize">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-lg mx-auto" data-testid="stem-themes">
        <div className="bg-foreground/5 border border-border rounded-lg p-2.5 text-center">
          <div className="text-[9px] uppercase tracking-wider text-muted-foreground mb-1">Heavenly Stem Themes</div>
          <div className="flex flex-wrap justify-center gap-1">
            {heavenlyStem.themes.map((t, i) => (
              <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-foreground/5 text-foreground/70 border border-border capitalize">{t}</span>
            ))}
          </div>
        </div>
        <div className="bg-foreground/5 border border-border rounded-lg p-2.5 text-center">
          <div className="text-[9px] uppercase tracking-wider text-muted-foreground mb-1">Day Officer Guidance</div>
          <div className="flex flex-wrap justify-center gap-1">
            {dayOfficer.recommended.slice(0, 3).map((r, i) => (
              <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">{r}</span>
            ))}
          </div>
        </div>
        <div className="bg-foreground/5 border border-border rounded-lg p-2.5 text-center col-span-2 sm:col-span-1">
          <div className="text-[9px] uppercase tracking-wider text-muted-foreground mb-1">Solar Season</div>
          <div className="flex flex-wrap justify-center gap-1">
            {solarTerm.themes.map((t, i) => (
              <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 capitalize">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
