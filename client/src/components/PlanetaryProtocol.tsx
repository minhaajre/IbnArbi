import { useState } from "react";
import { PLANET_PROFILES, PLANET_ARABIC } from "@/lib/constants";
import { PLANETARY_HOUR_GUIDANCE, QUALITY_COLORS } from "@/lib/spiritualGuidance";
import { Palette, Sparkles, Apple, Ban, Zap, Heart, Compass, ChevronDown, ChevronUp, BookOpen, CheckCircle, XCircle, Activity } from "lucide-react";
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
          {isExpanded ? "Less" : "Protocol"}
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* NEW: Meaning of This Hour Card */}
      {guidance && (
        <div className="p-3 rounded-lg bg-card/50 border border-border" data-testid="hour-meaning-card">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-foreground uppercase tracking-wide">Meaning of This Hour</span>
            <span className="text-xs font-arabic text-muted-foreground">معنى هذه الساعة</span>
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
      )}

      {/* NEW: Recommended Practice Card */}
      {guidance && (
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20" data-testid="hour-practice-card">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-foreground uppercase tracking-wide">Recommended Practice</span>
            <span className="text-xs font-arabic text-muted-foreground">الممارسة الموصى بها</span>
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
            
            {/* Do */}
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <span className="text-foreground/90">{guidance.doAction}</span>
            </div>
            
            {/* Avoid */}
            <div className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="text-foreground/70">{guidance.avoidAction}</span>
            </div>
            
            {/* Practice */}
            <div className="pt-1.5 border-t border-primary/10">
              <p className="text-xs text-foreground/80">{guidance.practice}</p>
            </div>
          </div>
        </div>
      )}

      {/* NEW: Inner State Check Strip */}
      {guidance && (
        <div className="p-2.5 rounded-lg bg-gradient-to-r from-green-500/10 via-transparent to-amber-500/10 border border-border/50" data-testid="inner-state-check">
          <div className="flex items-center gap-2 mb-1.5">
            <Activity className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Inner State Check</span>
            <span className="text-[10px] font-arabic text-muted-foreground/70">فحص الحالة الداخلية</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-start gap-1.5">
              <span className="text-green-500 shrink-0">↑</span>
              <span className="text-foreground/80">{guidance.innerStateExpansion}</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="text-amber-500 shrink-0">↓</span>
              <span className="text-foreground/70">{guidance.innerStateContraction}</span>
            </div>
          </div>
        </div>
      )}

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
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Scents */}
              <div className="p-2.5 rounded-lg bg-card/50 border border-border">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs font-medium text-foreground/80">Scents</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {profile.scents.slice(0, 3).join(", ")}
                </p>
              </div>

              {/* Colors */}
              <div className="p-2.5 rounded-lg bg-card/50 border border-border">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Palette className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-xs font-medium text-foreground/80">Wear</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {profile.colors.join(", ")}
                </p>
              </div>

              {/* Supportive Foods */}
              <div className="p-2.5 rounded-lg bg-card/50 border border-border">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Apple className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs font-medium text-foreground/80">Eat</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {profile.supportiveFoods.slice(0, 2).join(", ")}
                </p>
              </div>

              {/* Avoid */}
              <div className="p-2.5 rounded-lg bg-card/50 border border-border">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Ban className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-xs font-medium text-foreground/80">Avoid</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {profile.avoidFoods.slice(0, 2).join(", ")}
                </p>
              </div>

              {/* Fasting Instruction - Full width */}
              <div className="col-span-2 p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs font-medium text-foreground/80">Fast From</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {profile.fastingInstruction}
                </p>
              </div>

              {/* Service Instruction - Full width */}
              <div className="col-span-2 p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/20">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Heart className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs font-medium text-foreground/80">Serve</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {profile.serviceInstruction}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
