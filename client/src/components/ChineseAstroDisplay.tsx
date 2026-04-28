import { motion } from "framer-motion";
import { ChineseTimeEnergy, XiuCountdown, getXiuCountdown, generateDailyEnergySummary } from "@/lib/chinese-astro";
import { GROUP_COLORS, ELEMENT_ICONS, OFFICER_STYLES, FIVE_ELEMENTS } from "@/data/chinese-astro";
import { ChevronDown, ChevronUp, Check, X, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChineseAstroDisplayProps {
  timeEnergy: ChineseTimeEnergy;
}

const GROUP_TOOLTIPS: Record<string, { headline: string; body: string }> = {
  "Azure Dragon":   { headline: "Azure Dragon — 東方青龍", body: "Eastern guardian of spring and rising yang. Governs wood energy: growth, vitality, new beginnings, and the upward movement of life force." },
  "Black Tortoise": { headline: "Black Tortoise — 北方玄武", body: "Northern guardian of winter and deep yin. Governs water energy: stillness, hidden wisdom, strategic depth, and the power of concealment." },
  "White Tiger":    { headline: "White Tiger — 西方白虎", body: "Western guardian of autumn and falling yin. Governs metal energy: decisiveness, harvest, the courage to cut away what is no longer needed." },
  "Vermilion Bird": { headline: "Vermilion Bird — 南方朱雀", body: "Southern guardian of summer and full yang. Governs fire energy: creativity, fame, outward expression, and transformative warmth." },
};

export function ChineseAstroDisplay({ timeEnergy }: ChineseAstroDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<XiuCountdown>(getXiuCountdown());

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getXiuCountdown()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dailySummary = generateDailyEnergySummary(timeEnergy);

  const { lunarMansion, heavenlyStem, earthlyBranch, sexagenaryDay, sexagenaryChinese, dayOfficer, solarTerm, dayElement, dayPolarity } = timeEnergy;
  const groupStyle = GROUP_COLORS[lunarMansion.group] || GROUP_COLORS["Azure Dragon"];
  const officerStyle = OFFICER_STYLES[dayOfficer.nature] || OFFICER_STYLES.neutral;
  const elementIcon = ELEMENT_ICONS[dayElement] || "⚡";
  const elementData = FIVE_ELEMENTS[dayElement];
  const groupTooltip = GROUP_TOOLTIPS[lunarMansion.group] || GROUP_TOOLTIPS["Azure Dragon"];

  const pad = (n: number) => String(n).padStart(2, "0");

  // Xiu runs midnight-to-midnight
  const xiuStart = new Date();
  xiuStart.setHours(0, 0, 0, 0);
  const xiuEnd = new Date(xiuStart.getTime() + 24 * 60 * 60 * 1000);

  const toggleSection = (key: string) =>
    setOpenSection(prev => (prev === key ? null : key));

  return (
    <div className="space-y-3" data-testid="chinese-astro-display">

      {/* Daily Energy Summary */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-center"
        data-testid="daily-energy-summary"
      >
        <div className="text-[9px] uppercase tracking-widest text-primary/60 mb-1 font-medium">
          Daily Energy · 日能量總覽
        </div>
        <p className="text-xs text-foreground/80 leading-relaxed italic">
          {dailySummary}
        </p>
      </motion.div>

      {/* Countdown + start/end */}
      <div className="rounded-lg border border-border bg-foreground/5 px-3 py-2" data-testid="xiu-countdown">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Next Xiu in</span>
          </div>
          <span className="text-xs font-mono font-medium text-primary tabular-nums">
            {pad(countdown.hours)}:{pad(countdown.minutes)}:{pad(countdown.seconds)}
          </span>
        </div>
        <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary/70 rounded-full"
            animate={{ width: `${countdown.progressPercent}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        {/* Start / end timestamps */}
        <div className="flex items-center justify-between mt-1.5 text-[10px] text-muted-foreground/70">
          <div className="flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            <span>Started {format(xiuStart, "MMM d, h:mm a")}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Ends {format(xiuEnd, "MMM d, h:mm a")}</span>
            <Clock className="w-2.5 h-2.5" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-0.5 text-[9px] text-muted-foreground/50">
          <span>子時 · Midnight</span>
          <span>{Math.round(countdown.progressPercent)}% of day elapsed</span>
          <span>Midnight · 子時</span>
        </div>
      </div>

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

          {/* Group badge with tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${groupStyle.bg} ${groupStyle.border} border mb-3 cursor-help`}>
                  <span className={`text-xs font-medium ${groupStyle.text}`}>
                    {lunarMansion.group}
                  </span>
                  <span className="text-[10px] text-foreground/50">•</span>
                  <span className="text-xs text-foreground/60">{lunarMansion.groupChinese}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs bg-white text-foreground border border-border p-3 rounded-lg shadow-lg">
                <div className="space-y-1.5">
                  <div className="text-sm font-semibold text-foreground">{groupTooltip.headline}</div>
                  <div className="text-xs leading-relaxed text-muted-foreground">{groupTooltip.body}</div>
                  <div className="text-[10px] text-muted-foreground/70">Read as a lens for timing, not a prediction.</div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Meta chips */}
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

          {/* 4-pillar grid */}
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

          {/* Solar term + season */}
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

          {/* Always-visible Quick Guidance */}
          <div className="mb-3 max-w-sm mx-auto space-y-2">
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 text-left">
              <div className="text-[10px] uppercase tracking-wider text-emerald-500 mb-1.5 font-medium flex items-center gap-1">
                <Check className="w-3 h-3" /> May Support
              </div>
              <div className="flex flex-wrap gap-1">
                {timeEnergy.recommended.map((item, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 text-left">
              <div className="text-[10px] uppercase tracking-wider text-red-500 mb-1.5 font-medium flex items-center gap-1">
                <X className="w-3 h-3" /> Use Caution With
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

          {/* Show Details toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 mx-auto text-xs text-primary hover:text-primary/80 transition-colors mb-1"
            data-testid="chinese-astro-expand-toggle"
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
              {/* Section: Heavenly Stem */}
              <div className="rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => toggleSection("stem")}
                  className="w-full flex items-center justify-between px-3 py-2 text-left bg-foreground/5 hover:bg-foreground/8 transition-colors"
                >
                  <span className="text-xs font-medium text-foreground/80">Heavenly Stem Themes</span>
                  {openSection === "stem" ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                </button>
                {openSection === "stem" && (
                  <div className="px-3 py-2.5 border-t border-border">
                    <div className="flex flex-wrap gap-1">
                      {heavenlyStem.themes.map((t, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/70 border border-border capitalize">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Section: Day Officer */}
              <div className="rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => toggleSection("officer")}
                  className="w-full flex items-center justify-between px-3 py-2 text-left bg-foreground/5 hover:bg-foreground/8 transition-colors"
                >
                  <span className="text-xs font-medium text-foreground/80">Day Officer Guidance</span>
                  {openSection === "officer" ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                </button>
                {openSection === "officer" && (
                  <div className="px-3 py-2.5 border-t border-border">
                    <div className="flex flex-wrap gap-1">
                      {dayOfficer.recommended.map((r, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">{r}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Section: Solar Season */}
              <div className="rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => toggleSection("solar")}
                  className="w-full flex items-center justify-between px-3 py-2 text-left bg-foreground/5 hover:bg-foreground/8 transition-colors"
                >
                  <span className="text-xs font-medium text-foreground/80">Solar Season</span>
                  {openSection === "solar" ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                </button>
                {openSection === "solar" && (
                  <div className="px-3 py-2.5 border-t border-border">
                    <div className="flex flex-wrap gap-1">
                      {solarTerm.themes.map((t, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 capitalize">{t}</span>
                      ))}
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
