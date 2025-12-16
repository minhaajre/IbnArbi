import { useState } from "react";
import { Link } from "wouter";
import { PLANET_PROFILES, PLANET_ARABIC, ADVANCED_AZKAAR } from "@/lib/constants";
import { PLANETARY_HOUR_GUIDANCE, QUALITY_COLORS } from "@/lib/spiritualGuidance";
import { Palette, Sparkles, Apple, Ban, Zap, Heart, Compass, ChevronDown, ChevronUp, BookOpen, CheckCircle, XCircle, Activity, Scroll, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PlanetaryProtocolProps {
  activePlanet: string;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

export function PlanetaryProtocol({ activePlanet, isExpanded: controlledIsExpanded, onToggleExpanded }: PlanetaryProtocolProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = controlledIsExpanded ?? internalExpanded;
  
  const handleToggle = () => {
    if (onToggleExpanded) {
      onToggleExpanded();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };
  const profile = PLANET_PROFILES[activePlanet];
  const guidance = PLANETARY_HOUR_GUIDANCE[activePlanet];
  
  if (!profile) return null;

  const planetArabic = PLANET_ARABIC[activePlanet];
  const qualityStyle = guidance ? QUALITY_COLORS[guidance.quality] : null;

  return (
    <div className="space-y-3" data-testid="planetary-protocol">
      {/* Header with planet name and keywords */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Color swatches */}
          <div className="flex -space-x-1">
            {profile.colorHex.slice(0, 3).map((color, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border-2 border-background shadow-sm"
                style={{ backgroundColor: color }}
                title={profile.colors[i]}
              />
            ))}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{activePlanet}</span>
              <span className="font-arabic text-sm text-muted-foreground" dir="rtl">
                {planetArabic?.arabic}
              </span>
              {guidance && qualityStyle && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${qualityStyle.bg} ${qualityStyle.text} border ${qualityStyle.border}`}>
                  {qualityStyle.label} ({guidance.quality})
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {profile.keywords.slice(0, 3).map((kw, i) => (
                <span 
                  key={i} 
                  className="text-[10px] px-1.5 py-0.5 rounded-full bg-foreground/5 text-muted-foreground border border-border"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-foreground/5"
          data-testid="toggle-protocol-details"
        >
          {isExpanded ? "Collapse" : "Expand"}
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* NEW: Spiritual Guidance Cards - Only show when expanded */}
      <AnimatePresence>
        {isExpanded && guidance && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden space-y-3"
          >
            {/* Quality of This Hour Card */}
            <div className="p-3 rounded-lg bg-card/50 border border-border" data-testid="hour-meaning-card">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground uppercase tracking-wide">Quality of This Hour</span>
                <span className="text-xs font-arabic text-muted-foreground">طبيعة هذه الساعة</span>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed mb-2">
                {guidance.meaning}
              </p>
              <p className="text-xs text-muted-foreground italic">
                {guidance.opensOrTests}
              </p>
              <p className="text-xs text-foreground/70 mt-1.5 font-medium">
                Adab: <span className="font-normal">{guidance.adab}</span>
              </p>
            </div>

            {/* Suggested Practice Card */}
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20" data-testid="hour-practice-card">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground uppercase tracking-wide">Suggested Practice</span>
                <span className="text-xs font-arabic text-muted-foreground">ممارسة مقترحة</span>
              </div>
              
              <div className="space-y-2 text-sm">
                {/* Dhikr */}
                <div className="flex items-start gap-2">
                  <span className="text-primary font-medium shrink-0">Dhikr:</span>
                  <span className="text-foreground">
                    <span className="font-semibold">{guidance.dhikr.name}</span>
                    <span className="font-arabic text-primary mx-1.5">{guidance.dhikr.nameArabic}</span>
                    <span className="text-muted-foreground text-xs">({guidance.dhikr.meaning})</span>
                  </span>
                </div>
                
                {/* May support */}
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{guidance.doAction}</span>
                </div>
                
                {/* Use caution */}
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <span className="text-foreground/70">{guidance.avoidAction}</span>
                </div>
                
                {/* Practice */}
                <div className="pt-1.5 border-t border-primary/10">
                  <p className="text-xs text-foreground/80">{guidance.practice}</p>
                </div>
              </div>
            </div>

            {/* Inner State Check Strip */}
            <div className="p-2.5 rounded-lg bg-gradient-to-r from-gold/10 via-transparent to-stone-600/10 border border-border/50" data-testid="inner-state-check">
              <div className="flex items-center gap-2 mb-1.5">
                <Activity className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Inner State Check</span>
                <span className="text-[10px] font-arabic text-muted-foreground/70">فحص الحالة الداخلية</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-start gap-1.5">
                  <span className="text-gold shrink-0">↑</span>
                  <span className="text-foreground/80">{guidance.innerStateExpansion}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-stone-500 shrink-0">↓</span>
                  <span className="text-foreground/70">{guidance.innerStateContraction}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Behavior Focus - Always visible */}
      <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gradient-to-r from-primary/10 to-transparent border border-primary/20">
        <Compass className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <p className="text-sm text-foreground/90 italic leading-relaxed">
          "{profile.behaviorFocus}"
        </p>
      </div>

      {/* Expandable Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-3">
              {/* Wear - Only colors section */}
              <div className="flex items-start gap-2">
                <Palette className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-foreground/80 mb-0.5 text-xs">Wear</div>
                  <p className="text-muted-foreground leading-relaxed text-xs">
                    {profile.colors.join(", ")}
                  </p>
                </div>
              </div>

              {/* Optional Advanced Devotional Suggestions */}
              {ADVANCED_AZKAAR[activePlanet] && (
                <div className="flex items-start gap-2 pt-2 border-t border-border/50">
                  <Scroll className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground/80 mb-1 text-xs">Optional Advanced Devotional Suggestions</div>
                    <p className="text-muted-foreground leading-relaxed text-xs italic mb-2">
                      {ADVANCED_AZKAAR[activePlanet].phrasing}
                    </p>
                    <Link href="/azkaar">
                      <button className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium">
                        Learn more about these litanies
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
