import { motion } from "framer-motion";
import { IBN_ARABI_MANSIONS, UI_LABELS_ARABIC } from "@/lib/constants";
import { MansionProgress, MoonPhaseInfo } from "@/lib/astronomy";
import { Moon, Sparkles, Scroll, Clock, ArrowRight, Orbit, Star, Check, X, Lightbulb } from "lucide-react";
import { format } from "date-fns";

interface MansionCardProps {
  mansion: typeof IBN_ARABI_MANSIONS[0];
  progress?: MansionProgress;
  moonPhase?: MoonPhaseInfo;
}

export function MansionCard({ mansion, progress }: MansionCardProps) {
  const isBlessed = mansion.nature === "blessed";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col"
    >
      {/* Header with number and name */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="meta-text uppercase tracking-wider">Mansion {mansion.number}</span>
            <span className={`pill text-xs ${
              isBlessed 
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
            }`} data-testid="mansion-nature-indicator">
              {isBlessed ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
              {isBlessed ? 'Blessed' : 'Challenging'}
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-primary mb-1">{mansion.name}</h2>
          <p className="font-arabic text-xl text-muted-foreground">{mansion.arabic}</p>
        </div>
      </div>

      {/* Progress Bar */}
      {progress && (
        <div className="mb-6 p-4 rounded-xl bg-secondary/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-mono text-primary">{Math.round(progress.progressPercent)}%</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-3">
            <motion.div 
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress.progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Next: <span className="text-foreground font-medium">{progress.timeUntilNext}</span></span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ArrowRight className="w-4 h-4" />
              <span>{progress.nextMansion.name}</span>
            </div>
          </div>
        </div>
      )}

      {/* Info Grid */}
      <div className="space-y-4">
        {/* Recommended Actions */}
        {'activities' in mansion && mansion.activities && (
          <div className={`p-4 rounded-xl ${
            isBlessed ? 'bg-emerald-500/5 border border-emerald-500/10' : 'bg-amber-500/5 border border-amber-500/10'
          }`}>
            <div className="flex gap-3">
              <Lightbulb className={`w-5 h-5 shrink-0 ${isBlessed ? 'text-emerald-500' : 'text-amber-500'}`} />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Recommended Actions</p>
                <p className="text-sm">{mansion.activities}</p>
              </div>
            </div>
          </div>
        )}

        {/* Celestial Sphere */}
        {'sphere' in mansion && mansion.sphere && (
          <div className="flex gap-3 p-4 rounded-xl bg-primary/5">
            <Orbit className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Celestial Sphere</p>
              <p className="text-sm text-primary">{mansion.sphere}</p>
            </div>
          </div>
        )}

        {/* Meaning */}
        <div className="flex gap-3">
          <Sparkles className="w-5 h-5 text-muted-foreground/50 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Meaning</p>
            <p className="text-sm">{mansion.meaning}</p>
          </div>
        </div>

        {/* Divine Attribute */}
        <div className="flex gap-3">
          <Star className="w-5 h-5 text-muted-foreground/50 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Divine Attribute</p>
            <p className="text-sm">{mansion.attribute}</p>
          </div>
        </div>

        {/* Arabic Letter */}
        <div className="flex gap-3">
          <Scroll className="w-5 h-5 text-muted-foreground/50 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Arabic Letter</p>
            <p className="text-sm">{mansion.letter} • {mansion.degrees}</p>
          </div>
        </div>

        {/* Description Quote */}
        <div className="pt-4 border-t border-border/50">
          <p className="text-sm italic text-muted-foreground">"{mansion.description}"</p>
        </div>
      </div>

      {/* Mansion Wheel Image */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <p className="meta-text text-center mb-3">
          Ibn Arabi's 28 Lunar Mansions Wheel
        </p>
        <img 
          src="/mansionwheel.jpg" 
          alt="Ibn Arabi's 28 Lunar Mansions Wheel" 
          className="w-full rounded-xl border border-border/50 opacity-90 hover:opacity-100 transition-opacity"
          data-testid="mansion-wheel-image"
        />
      </div>
    </motion.div>
  );
}
