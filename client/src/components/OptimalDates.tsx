import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WORK_CATEGORIES, getOptimalDatesForCategory, MANSION_BUNI_DATA, isCategoryBlocked, isInScorpio } from "@/data/buni";
import { IBN_ARABI_MANSIONS } from "@/lib/constants";
import { Calendar, Heart, Crown, Shield, Coins, Stethoscope, BookOpen, Sword, ChevronDown, ChevronUp, Lock, Check, X, AlertTriangle, Clock, Info, Snowflake } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Love & Relationships": <Heart className="w-4 h-4" />,
  "Authority & Leadership": <Crown className="w-4 h-4" />,
  "Protection & Safety": <Shield className="w-4 h-4" />,
  "Wealth & Business": <Coins className="w-4 h-4" />,
  "Health & Healing": <Stethoscope className="w-4 h-4" />,
  "Knowledge & Learning": <BookOpen className="w-4 h-4" />,
  "Conflict & Victory": <Sword className="w-4 h-4" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  "Love & Relationships": "text-foreground bg-card border-primary/30 hover:border-primary/50",
  "Authority & Leadership": "text-foreground bg-card border-primary/30 hover:border-primary/50",
  "Protection & Safety": "text-foreground bg-card border-primary/30 hover:border-primary/50",
  "Wealth & Business": "text-foreground bg-card border-primary/30 hover:border-primary/50",
  "Health & Healing": "text-foreground bg-card border-primary/30 hover:border-primary/50",
  "Knowledge & Learning": "text-foreground bg-card border-primary/30 hover:border-primary/50",
  "Conflict & Victory": "text-foreground bg-card border-primary/30 hover:border-primary/50",
};

interface OptimalDatesProps {
  currentMansionNumber: number;
  isWaning?: boolean;
}

export function OptimalDates({ currentMansionNumber, isWaning = false }: OptimalDatesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const currentMansion = IBN_ARABI_MANSIONS[currentMansionNumber - 1];
  const currentBuniData = MANSION_BUNI_DATA.find(m => m.id === currentMansionNumber);
  const inScorpio = isInScorpio(currentMansionNumber);

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
                      <span className="text-sm font-medium text-foreground">{currentMansion.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">#{currentMansionNumber}</span>
                    </div>
                    {currentBuniData && (
                      <div className="flex flex-wrap gap-1">
                        {currentBuniData.categories.slice(0, 3).map((cat, i) => (
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
                        <p className="font-medium">This app combines two classical frameworks:</p>
                        <p><strong>1. Ibn Arabi (The Essence):</strong> Explains the spiritual nature of the hour (e.g., Al-Qabid for Constriction).</p>
                        <p><strong>2. Al-Buni (The Tool):</strong> Provides the specific Abjad counts, Metals, and Inks required to manifest or shield that energy.</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Scorpio Warning */}
                {inScorpio && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-medium text-foreground">Moon in Scorpio (Mansions 16-21)</div>
                      <div className="text-[10px] text-muted-foreground">Love & Health activities are blocked during this period.</div>
                    </div>
                  </div>
                )}

                {/* Waning Warning */}
                {isWaning && (
                  <div className="p-3 rounded-lg bg-muted/50 border border-border flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-medium text-foreground">Moon is Waning</div>
                      <div className="text-[10px] text-muted-foreground">Love & Wealth activities are weakened. Wait for waxing phase for best results.</div>
                    </div>
                  </div>
                )}

                {/* Tooth Pain Logic - Mansion 18/19 during Waning */}
                {(currentMansionNumber === 18 || currentMansionNumber === 19) && isWaning && (
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-2">
                    <Snowflake className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-medium text-foreground">Energy of Constriction (Al-Qabid)</div>
                      <div className="text-[10px] text-muted-foreground">Use Cooling materials (Silver/Camphor) to balance the Sting energy.</div>
                    </div>
                  </div>
                )}

                {/* Category Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {WORK_CATEGORIES.map((cat) => {
                    const optimalInfo = getOptimalDatesForCategory(cat.category, currentMansionNumber);
                    const isSelected = selectedCategory === cat.category;
                    const colorClass = CATEGORY_COLORS[cat.category] || "text-muted-foreground bg-foreground/5 border-border";
                    const isCurrentOptimal = cat.optimalMansions.includes(currentMansionNumber);
                    const isCurrentAvoid = cat.avoidMansions.includes(currentMansionNumber);
                    const blockStatus = isCategoryBlocked(cat.category, currentMansionNumber, isWaning);

                    return (
                      <button
                        key={cat.category}
                        onClick={() => setSelectedCategory(isSelected ? null : cat.category)}
                        className={`p-3 rounded-lg border text-left transition-all ${colorClass} ${
                          isSelected ? 'ring-2 ring-primary/50' : ''
                        } ${blockStatus.blocked ? 'opacity-50' : ''}`}
                        data-testid={`category-${cat.category.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {CATEGORY_ICONS[cat.category]}
                          <span className="text-xs font-medium truncate">{cat.category.split(' & ')[0]}</span>
                        </div>
                        <div className="text-[9px] font-arabic text-muted-foreground truncate">{cat.categoryArabic}</div>
                        {blockStatus.blocked && (
                          <div className="mt-1 flex items-center gap-1 text-[9px] text-destructive font-medium">
                            <X className="w-3 h-3" /> Blocked
                          </div>
                        )}
                        {!blockStatus.blocked && isCurrentOptimal && (
                          <div className="mt-1 flex items-center gap-1 text-[9px] text-primary font-medium">
                            <Check className="w-3 h-3" /> Now optimal
                          </div>
                        )}
                        {!blockStatus.blocked && isCurrentAvoid && (
                          <div className="mt-1 flex items-center gap-1 text-[9px] text-destructive font-medium">
                            <X className="w-3 h-3" /> Avoid now
                          </div>
                        )}
                        {!blockStatus.blocked && !isCurrentOptimal && !isCurrentAvoid && optimalInfo && (
                          <div className="mt-1 text-[9px] text-muted-foreground">
                            ~{optimalInfo.daysUntil}d to optimal
                          </div>
                        )}
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
                          <div className="p-3 rounded-lg bg-foreground/5 border border-border space-y-3">
                            <div>
                              <h4 className="text-sm font-medium text-foreground mb-1">{selectedCategory}</h4>
                              <p className="text-xs text-muted-foreground">{catData.description}</p>
                            </div>

                            {/* Divine Names & Abjad */}
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

                            {/* Letter & Planetary Hour */}
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

                            {/* Guideline */}
                            <div className="p-2 rounded bg-muted/30 border border-border">
                              <div className="text-[9px] text-primary uppercase mb-1">Al-Buni Guideline</div>
                              <div className="text-xs text-foreground/80">{catData.guideline}</div>
                            </div>

                            {/* Material Requirements */}
                            <div className="p-2 rounded bg-muted/30 border border-border">
                              <div className="text-[9px] text-primary uppercase mb-2">Material Requirements (Al-Tabayi')</div>
                              <div className="grid grid-cols-3 gap-2">
                                <div>
                                  <div className="text-[9px] text-muted-foreground">The Body (Metal)</div>
                                  <div className="text-xs text-foreground font-medium">{catData.materials.metal}</div>
                                  <div className="text-[9px] font-arabic text-muted-foreground">{catData.materials.metalArabic}</div>
                                </div>
                                <div>
                                  <div className="text-[9px] text-muted-foreground">The Soul (Ink)</div>
                                  <div className="text-xs text-foreground font-medium">{catData.materials.ink}</div>
                                  <div className="text-[9px] font-arabic text-muted-foreground">{catData.materials.inkArabic}</div>
                                </div>
                                <div>
                                  <div className="text-[9px] text-muted-foreground">The Breath (Incense)</div>
                                  <div className="text-xs text-foreground font-medium">{catData.materials.incense}</div>
                                  <div className="text-[9px] font-arabic text-muted-foreground">{catData.materials.incenseArabic}</div>
                                </div>
                              </div>
                              <div className="mt-2 text-[9px] text-muted-foreground italic">
                                {catData.materials.metalInstruction}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <div className="text-[10px] font-medium text-primary uppercase mb-1">Optimal Mansions</div>
                                <div className="flex flex-wrap gap-1">
                                  {catData.optimalMansions.map(num => {
                                    const m = IBN_ARABI_MANSIONS[num - 1];
                                    const isCurrent = num === currentMansionNumber;
                                    return (
                                      <span 
                                        key={num} 
                                        className={`text-[9px] px-1.5 py-0.5 rounded border ${
                                          isCurrent 
                                            ? 'bg-primary/20 text-primary border-primary/30 font-bold' 
                                            : 'bg-foreground/5 text-foreground/70 border-border'
                                        }`}
                                      >
                                        {num}. {m?.name.split(' ')[0]}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                              <div>
                                <div className="text-[10px] font-medium text-destructive uppercase mb-1">Avoid Mansions</div>
                                <div className="flex flex-wrap gap-1">
                                  {catData.avoidMansions.length > 0 ? catData.avoidMansions.map(num => {
                                    const m = IBN_ARABI_MANSIONS[num - 1];
                                    const isCurrent = num === currentMansionNumber;
                                    return (
                                      <span 
                                        key={num} 
                                        className={`text-[9px] px-1.5 py-0.5 rounded border ${
                                          isCurrent 
                                            ? 'bg-destructive/20 text-destructive border-destructive/30 font-bold' 
                                            : 'bg-foreground/5 text-foreground/70 border-border'
                                        }`}
                                      >
                                        {num}. {m?.name.split(' ')[0]}
                                      </span>
                                    );
                                  }) : (
                                    <span className="text-[9px] text-muted-foreground italic">None specified</span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {optimalInfo && optimalInfo.nextOptimal !== currentMansionNumber && (
                              <div className="text-xs text-muted-foreground">
                                Next optimal: <span className="text-primary font-medium">
                                  Mansion {optimalInfo.nextOptimal} ({IBN_ARABI_MANSIONS[optimalInfo.nextOptimal - 1]?.name})
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
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
