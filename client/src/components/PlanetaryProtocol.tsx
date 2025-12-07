import { useState } from "react";
import { PLANET_PROFILES, PLANET_ARABIC } from "@/lib/constants";
import { Palette, Sparkles, Apple, Ban, Zap, Heart, Compass, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PlanetaryProtocolProps {
  activePlanet: string;
}

export function PlanetaryProtocol({ activePlanet }: PlanetaryProtocolProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const profile = PLANET_PROFILES[activePlanet];
  
  if (!profile) return null;

  const planetArabic = PLANET_ARABIC[activePlanet];

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
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-foreground/5"
          data-testid="toggle-protocol-details"
        >
          {isExpanded ? "Less" : "Protocol"}
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

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
