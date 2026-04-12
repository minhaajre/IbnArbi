import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  WORK_CATEGORIES, 
  getOptimalDatesForCategory, 
  MANSION_BUNI_DATA, 
  isCategoryBlocked, 
  isInScorpio 
} from "@/data/buni";
import { IBN_ARABI_MANSIONS } from "@/lib/constants";
import { 
  Calendar, Heart, Crown, Shield, Coins, Stethoscope, 
  BookOpen, Sword, ChevronDown, ChevronUp, Lock, 
  Check, X, AlertTriangle, Clock, Info, Snowflake 
} from "lucide-react";
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

  // Safety: Ensure index is within bounds
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
                    <span className="text-sm font-medium text-foreground">{currentMansion?.name}</span>
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
                      <p><strong>1. Ibn Arabi (The Essence):</strong> Explains the spiritual nature of the hour.</p>
                      <p><strong>2. Al-Buni (The Tool):</strong> Provides specific Abjad counts and materials.</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Warnings */}
              {inScorpio && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-foreground">Moon in Scorpio (Mansions 16-21)</div>
                    <div className="text-[10px] text-muted-foreground">Love & Health activities are blocked.</div>
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
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {CATEGORY_ICONS[cat.category]}
                        <span className="text-xs font-medium truncate">{cat.category.split(' & ')[0]}</span>
                      </div>
                      <div className="text-[9px] font-arabic text-muted-foreground truncate">{cat.categoryArabic}</div>
                      
                      {blockStatus.blocked ? (
                        <div className="mt-1 flex items-center gap-1 text-[9px] text-destructive font-medium">
                          <X className="w-3 h-3" /> Blocked
                        </div>
                      ) : isCurrentOptimal ? (
                        <div className="mt-1 flex items-center gap-1 text-[9px] text-primary font-medium">
                          <Check className="w-3 h-3" /> Now optimal
                        </div>
                      ) : isCurrentAvoid ? (
                        <div className="mt-1 flex items-center gap-1 text-
