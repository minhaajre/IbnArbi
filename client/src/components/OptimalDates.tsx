import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WORK_CATEGORIES, getOptimalDatesForCategory, MANSION_BUNI_DATA } from "@/data/buni";
import { IBN_ARABI_MANSIONS } from "@/lib/constants";
import { useAuth } from "@/hooks/use-auth";
import { Calendar, Heart, Crown, Shield, Coins, Plane, Stethoscope, BookOpen, Sword, ChevronDown, ChevronUp, Lock, Check, X } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Love & Relationships": <Heart className="w-4 h-4" />,
  "Authority & Leadership": <Crown className="w-4 h-4" />,
  "Protection & Safety": <Shield className="w-4 h-4" />,
  "Wealth & Business": <Coins className="w-4 h-4" />,
  "Travel & Journeys": <Plane className="w-4 h-4" />,
  "Health & Healing": <Stethoscope className="w-4 h-4" />,
  "Knowledge & Learning": <BookOpen className="w-4 h-4" />,
  "Conflict & Victory": <Sword className="w-4 h-4" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  "Love & Relationships": "text-pink-400 bg-pink-500/10 border-pink-500/30",
  "Authority & Leadership": "text-amber-400 bg-amber-500/10 border-amber-500/30",
  "Protection & Safety": "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  "Wealth & Business": "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  "Travel & Journeys": "text-sky-400 bg-sky-500/10 border-sky-500/30",
  "Health & Healing": "text-green-400 bg-green-500/10 border-green-500/30",
  "Knowledge & Learning": "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
  "Conflict & Victory": "text-red-400 bg-red-500/10 border-red-500/30",
};

interface OptimalDatesProps {
  currentMansionNumber: number;
}

export function OptimalDates({ currentMansionNumber }: OptimalDatesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user, signIn } = useAuth();
  const isSignedIn = !!user;

  const currentMansion = IBN_ARABI_MANSIONS[currentMansionNumber - 1];
  const currentBuniData = MANSION_BUNI_DATA.find(m => m.id === currentMansionNumber);

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
            {!isSignedIn ? (
              <div className="p-4 text-center border-t border-border">
                <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <h4 className="text-sm font-medium text-foreground mb-1">Sign in to access Optimal Dates</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Discover the best mansion times for love, wealth, protection, and more.
                </p>
                <button
                  onClick={signIn}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Sign in with Google
                </button>
              </div>
            ) : (
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

                {/* Category Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {WORK_CATEGORIES.map((cat) => {
                    const optimalInfo = getOptimalDatesForCategory(cat.category, currentMansionNumber);
                    const isSelected = selectedCategory === cat.category;
                    const colorClass = CATEGORY_COLORS[cat.category] || "text-muted-foreground bg-foreground/5 border-border";
                    const isCurrentOptimal = cat.optimalMansions.includes(currentMansionNumber);
                    const isCurrentAvoid = cat.avoidMansions.includes(currentMansionNumber);

                    return (
                      <button
                        key={cat.category}
                        onClick={() => setSelectedCategory(isSelected ? null : cat.category)}
                        className={`p-3 rounded-lg border text-left transition-all ${colorClass} ${
                          isSelected ? 'ring-2 ring-primary/50' : ''
                        }`}
                        data-testid={`category-${cat.category.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {CATEGORY_ICONS[cat.category]}
                          <span className="text-xs font-medium truncate">{cat.category.split(' & ')[0]}</span>
                        </div>
                        <div className="text-[9px] font-arabic text-muted-foreground truncate">{cat.categoryArabic}</div>
                        {isCurrentOptimal && (
                          <div className="mt-1 flex items-center gap-1 text-[9px] text-emerald-400">
                            <Check className="w-3 h-3" /> Now optimal
                          </div>
                        )}
                        {isCurrentAvoid && (
                          <div className="mt-1 flex items-center gap-1 text-[9px] text-red-400">
                            <X className="w-3 h-3" /> Avoid now
                          </div>
                        )}
                        {!isCurrentOptimal && !isCurrentAvoid && optimalInfo && (
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
                            
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <div className="text-[10px] font-medium text-emerald-400 uppercase mb-1">Optimal Mansions</div>
                                <div className="flex flex-wrap gap-1">
                                  {catData.optimalMansions.map(num => {
                                    const m = IBN_ARABI_MANSIONS[num - 1];
                                    const isCurrent = num === currentMansionNumber;
                                    return (
                                      <span 
                                        key={num} 
                                        className={`text-[9px] px-1.5 py-0.5 rounded border ${
                                          isCurrent 
                                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-bold' 
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
                                <div className="text-[10px] font-medium text-red-400 uppercase mb-1">Avoid Mansions</div>
                                <div className="flex flex-wrap gap-1">
                                  {catData.avoidMansions.map(num => {
                                    const m = IBN_ARABI_MANSIONS[num - 1];
                                    const isCurrent = num === currentMansionNumber;
                                    return (
                                      <span 
                                        key={num} 
                                        className={`text-[9px] px-1.5 py-0.5 rounded border ${
                                          isCurrent 
                                            ? 'bg-red-500/20 text-red-400 border-red-500/30 font-bold' 
                                            : 'bg-foreground/5 text-foreground/70 border-border'
                                        }`}
                                      >
                                        {num}. {m?.name.split(' ')[0]}
                                      </span>
                                    );
                                  })}
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
