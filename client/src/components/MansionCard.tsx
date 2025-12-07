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
      className="relative h-full flex flex-col"
    >
      <div className="absolute top-0 right-0 opacity-[0.03] text-8xl font-arabic select-none pointer-events-none leading-none">
        {mansion.arabic}
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-mono text-primary/80 uppercase tracking-widest flex items-center gap-2">
            <Moon className="w-3 h-3" />
            Mansion {mansion.number} <span className="font-arabic">المنزلة {mansion.number}</span>
          </span>
          <div className="h-px bg-border flex-1" />
        </div>

        <h2 className="text-2xl font-serif text-gold mb-1 leading-tight">
          {mansion.name}
        </h2>
        <h3 className="text-lg font-arabic mb-2 text-muted-foreground">
          {mansion.arabic}
        </h3>
        
        {/* Blessed/Challenging Indicator - Below names */}
        <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium mb-4 ${
          isBlessed 
            ? 'bg-green-500/10 text-green-500 border border-green-500/30' 
            : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
        }`} data-testid="mansion-nature-indicator">
          {isBlessed ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
          <span>{isBlessed ? 'Blessed' : 'Challenging'}</span>
        </div>

        {/* Progress Bar */}
        {progress && (
          <div className="mb-4 p-3 rounded-lg bg-foreground/5 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Progress <span className="font-arabic">{UI_LABELS_ARABIC["Progress"]}</span></span>
              <span className="text-xs font-mono text-primary">{Math.round(progress.progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden mb-2">
              <motion.div 
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress.progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{UI_LABELS_ARABIC["Next"]} <span className="text-foreground font-medium">{progress.timeUntilNext}</span></span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <ArrowRight className="w-3 h-3" />
                <span className="text-foreground/70">{progress.nextMansion.name}</span>
              </div>
            </div>
            <div className="text-[10px] text-muted-foreground/60 mt-1 text-right">
              {format(progress.nextMansionDate, "MMM d, h:mm a")}
            </div>
          </div>
        )}

        <div className="space-y-3 text-sm text-muted-foreground/90 font-light leading-relaxed flex-1">
          {/* Recommended Actions - Prominent */}
          {'activities' in mansion && mansion.activities && (
            <div className={`flex gap-3 p-2.5 rounded-lg border ${
              isBlessed 
                ? 'bg-green-500/5 border-green-500/20' 
                : 'bg-amber-500/5 border-amber-500/20'
            }`}>
              <Lightbulb className={`w-4 h-4 mt-0.5 shrink-0 ${isBlessed ? 'text-green-500' : 'text-amber-500'}`} />
              <div>
                <strong className="text-foreground block mb-0.5 font-medium text-xs uppercase tracking-wide opacity-70">
                  Recommended Actions <span className="font-arabic">الأعمال المستحبة</span>
                </strong>
                <span className="text-foreground/80 text-sm">{mansion.activities}</span>
              </div>
            </div>
          )}

          {/* Sphere/Realm */}
          {'sphere' in mansion && mansion.sphere && (
            <div className="flex gap-3 p-2 rounded-lg bg-primary/5 border border-primary/10">
              <Orbit className="w-4 h-4 mt-0.5 text-gold shrink-0" />
              <div>
                <strong className="text-foreground block mb-0.5 font-medium text-xs uppercase tracking-wide opacity-70">
                  Celestial Sphere <span className="font-arabic">الفلك السماوي</span>
                </strong>
                <span className="text-gold/90 text-sm">{mansion.sphere}</span>
                {'sphereArabic' in mansion && mansion.sphereArabic && (
                  <span className="block font-arabic text-xs text-muted-foreground mt-0.5">{mansion.sphereArabic}</span>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Sparkles className="w-4 h-4 mt-0.5 text-primary/50 shrink-0" />
            <div>
              <strong className="text-foreground block mb-0.5 font-medium text-xs uppercase tracking-wide opacity-70">
                Meaning <span className="font-arabic">{UI_LABELS_ARABIC["Station Meaning"]}</span>
              </strong>
              {mansion.meaning}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Star className="w-4 h-4 mt-0.5 text-primary/50 shrink-0" />
            <div>
              <strong className="text-foreground block mb-0.5 font-medium text-xs uppercase tracking-wide opacity-70">
                Divine Attribute <span className="font-arabic">الصفة الإلهية</span>
              </strong>
              {mansion.attribute}
              {'attributeArabic' in mansion && mansion.attributeArabic && (
                <span className="font-arabic text-xs text-muted-foreground ml-2">{mansion.attributeArabic}</span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Scroll className="w-4 h-4 mt-0.5 text-primary/50 shrink-0" />
            <div>
              <strong className="text-foreground block mb-0.5 font-medium text-xs uppercase tracking-wide opacity-70">
                Arabic Letter <span className="font-arabic">الحرف العربي</span>
              </strong>
              {mansion.letter} • {mansion.degrees}
              {'letterArabic' in mansion && mansion.letterArabic && (
                <span className="font-arabic text-lg text-primary ml-2">{mansion.letterArabic}</span>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-border/50 mt-auto">
            <p className="italic opacity-70 text-xs leading-relaxed">"{mansion.description}"</p>
          </div>
        </div>

        {/* Mansion Wheel Image */}
        <div className="mt-4 pt-3 border-t border-border/50">
          <p className="text-[10px] text-muted-foreground mb-2 text-center">
            Ibn Arabi's 28 Lunar Mansions Wheel <span className="font-arabic">عجلة المنازل القمرية الثمانية والعشرين</span>
          </p>
          <img 
            src="/mansionwheel.jpg" 
            alt="Ibn Arabi's 28 Lunar Mansions Wheel" 
            className="w-full rounded-lg border border-border opacity-80 hover:opacity-100 transition-opacity"
            data-testid="mansion-wheel-image"
          />
        </div>
      </div>
    </motion.div>
  );
}
