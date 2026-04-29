import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  WORK_CATEGORIES,
  getOptimalDatesForCategory,
  isCategoryBlocked,
  getCategoryScore,
} from "@/data/buni";
import { MANSIONS } from "@/data/mansions";
import {
  Calendar, Heart, Crown, Shield, Coins, Stethoscope,
  BookOpen, Sword, ChevronDown, ChevronUp, Check, X,
  AlertTriangle, Clock, Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FavorabilityGauge } from "@/components/ui/FavorabilityGauge";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Love & Relationships": <Heart className="w-4 h-4" />,
  "Authority & Leadership": <Crown className="w-4 h-4" />,
  "Protection & Safety": <Shield className="w-4 h-4" />,
  "Wealth & Business": <Coins className="w-4 h-4" />,
  "Health & Healing": <Stethoscope className="w-4 h-4" />,
  "Knowledge & Learning": <BookOpen className="w-4 h-4" />,
  "Conflict & Victory": <Sword className="w-4 h-4" />,
};

interface OptimalDatesProps {
  currentMansionNumber: number;
  isWaning?: boolean;
  moonSign?: string | null;
  currentPlanetaryHour?: string | null;
}

export function OptimalDates({
  currentMansionNumber,
  isWaning = false,
  moonSign = null,
  currentPlanetaryHour = null,
}: OptimalDatesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const currentMansion = MANSIONS[currentMansionNumber - 1];
  const moonInScorpio = moonSign === "Scorpio";

  return (
    <div className="rounded-lg border border-border bg-card/50 overflow-hidden" data-testid="optimal-dates-section">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-foreground/5 transition-colors"
        data-testid="optimal-dates-toggle"
      >
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-primary" />
          <div className="text-left">
            <h3 className="text-sm font-medium text-foreground">Optimal Dates Finder</h3>
            <p className="text-xs text-muted-foreground">Find the best times for different activities</p>
          </div>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-border space-y-4">
              {/* Current Mansion Status */}
              <div className="p-3 rounded-lg bg-foreground/5 border border-border">
                <div className="text-xs text-muted-foreground mb-1">Current Mansion</div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-foreground">{currentMansion?.name || "Unknown"}</span>
                    <span className="text-xs text-muted-foreground ml-2">#{currentMansionNumber}</span>
                    {moonSign && (
                      <span className="text-xs text-muted-foreground ml-2">· Moon in {moonSign}</span>
                    )}
                  </div>
                  {currentMansion && (
                    <div className="flex flex-wrap gap-1">
                      {currentMansion.categories.slice(0, 3).map((cat, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Dual-System Explanation */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground cursor-help">
                      <Info className="w-3.5 h-3.5" />
                      <span>Dual-System Guidance</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    <div className="text-xs space-y-1.5">
                      <p className="font-medium">Electional Timing:</p>
                      <p><strong>Ibn Arabi:</strong> Mansion nature and spiritual quality.</p>
                      <p><strong>Abu Mashar:</strong> Sa'd / Nahs classification and optimal activity windows.</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Warnings */}
              {moonInScorpio && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-foreground">Moon in Scorpio</div>
                    <div className="text-[10px] text-muted-foreground">
                      The classical authorities caution extra care for love matters and medical treatments at this time. Other activities proceed normally.
                    </div>
                  </div>
                </div>
              )}

              {isWaning && (
                <div className="p-3 rounded-lg bg-muted/50 border border-border flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-foreground">Moon is Waning</div>
                    <div className="text-[10px] text-muted-foreground">Expansion activities are weakened. Favour endings, release, and inward work.</div>
                  </div>
                </div>
              )}

              {/* Category Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {WORK_CATEGORIES.map((cat) => {
                  const optimalInfo = getOptimalDatesForCategory(cat.category, currentMansionNumber);
                  const isSelected = selectedCategory === cat.category;
                  const isCurrentOptimal = cat.optimalMansions.includes(currentMansionNumber);
                  const isCurrentAvoid = cat.avoidMansions.includes(currentMansionNumber);
                  const blockStatus = isCategoryBlocked(cat.category, currentMansionNumber, isWaning, moonSign);
                  const score = getCategoryScore(cat.category, currentMansionNumber, isWaning, moonSign, currentPlanetaryHour);

                  return (
                    <button
                      key={cat.category}
                      onClick={() => setSelectedCategory(isSelected ? null : cat.category)}
                      className={`p-3 rounded-lg border text-left transition-all text-foreground bg-card border-primary/30 hover:border-primary/50 ${
                        isSelected ? "ring-2 ring-primary/50" : ""
                      } ${blockStatus.blocked ? "opacity-60" : ""}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {CATEGORY_ICONS[cat.category]}
                        <span className="text-xs font-medium truncate">{cat.category.split(" & ")[0]}</span>
                      </div>
                      <div className="text-[9px] font-arabic text-muted-foreground truncate">{cat.categoryArabic}</div>

                      {/* Gauge replaces "~Nd to optimal" */}
                      <div className="mt-2 flex flex-col items-start gap-0.5">
                        <FavorabilityGauge score={score} size="sm" />
                        <div className="text-[9px] text-muted-foreground leading-none">
                          {blockStatus.blocked ? (
                            <span className="text-amber-500 font-medium flex items-center gap-0.5">
                              <AlertTriangle className="w-2.5 h-2.5" /> Caution
                            </span>
                          ) : isCurrentOptimal ? (
                            <span className="text-green-500 font-medium flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5" /> Now optimal
                            </span>
                          ) : isCurrentAvoid ? (
                            <span className="text-destructive font-medium flex items-center gap-0.5">
                              <X className="w-2.5 h-2.5" /> Avoid now
                            </span>
                          ) : optimalInfo ? (
                            <span>Next: M{optimalInfo.nextOptimal} (~{optimalInfo.daysUntil}d)</span>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Category Details */}
              <AnimatePresence>
                {selectedCategory && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {(() => {
                      const catData = WORK_CATEGORIES.find(c => c.category === selectedCategory);
                      if (!catData) return null;
                      const optimalInfo = getOptimalDatesForCategory(selectedCategory, currentMansionNumber);

                      return (
                        <div className="p-3 rounded-lg bg-foreground/5 border border-border space-y-3 mt-2">
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-1">{selectedCategory}</h4>
                            <p className="text-xs text-muted-foreground">{catData.description}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-2 rounded bg-primary/5 border border-primary/20">
                              <div className="text-[9px] text-muted-foreground uppercase mb-1">Primary Divine Name</div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-arabic text-primary">{catData.divineNameArabic}</span>
                                <span className="text-xs text-foreground/80">{catData.divineName}</span>
                              </div>
                              <div className="text-[9px] text-muted-foreground mt-1">Abjad: {catData.divineNameAbjad}</div>
                            </div>
                            <div className="p-2 rounded bg-secondary/5 border border-secondary/20">
                              <div className="text-[9px] text-muted-foreground uppercase mb-1">Secondary Name</div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-arabic text-secondary-foreground">{catData.secondaryNameArabic}</span>
                                <span className="text-xs text-foreground/80">{catData.secondaryName}</span>
                              </div>
                              <div className="text-[9px] text-muted-foreground mt-1">Abjad: {catData.secondaryNameAbjad}</div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 px-2 py-1 rounded bg-foreground/5 border border-border">
                              <span className="text-lg font-arabic text-primary">{catData.letterArabic}</span>
                              <div>
                                <div className="text-[9px] text-muted-foreground uppercase">Letter</div>
                                <div className="text-xs text-foreground">{catData.letter} = {catData.letterValue}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 px-2 py-1 rounded bg-foreground/5 border border-border">
                              <Clock className="w-4 h-4 text-primary" />
                              <div>
                                <div className="text-[9px] text-muted-foreground uppercase">Best Hour</div>
                                <div className="text-xs text-foreground">Hour of {catData.planetaryHour}</div>
                              </div>
                            </div>
                          </div>

                          <div className="p-2 rounded bg-muted/30 border border-border">
                            <div className="text-[9px] text-primary uppercase mb-1">Al-Buni Guideline</div>
                            <div className="text-xs text-foreground/80">{catData.guideline}</div>
                          </div>

                          {optimalInfo && optimalInfo.nextOptimal !== currentMansionNumber && (
                            <div className="text-xs text-muted-foreground pt-1">
                              Next optimal: <span className="text-primary font-medium">
                                Mansion {optimalInfo.nextOptimal} ({MANSIONS[optimalInfo.nextOptimal - 1]?.name})
                              </span> in ~{optimalInfo.daysUntil} days
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
