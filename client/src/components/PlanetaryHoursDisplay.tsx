import { motion } from "framer-motion";
import { PlanetaryHour } from "@/lib/astronomy";
import { format } from "date-fns";
import { Clock, Sparkles, Flame, Crown } from "lucide-react";
import { PLANET_PROPHETS, PLANET_ARABIC } from "@/lib/constants";
import { PLANETARY_SPIRITS } from "@/data/buni";

const PLANET_SYMBOLS: Record<string, string> = {
  Sun: "☉", Moon: "☾", Mars: "♂", Mercury: "☿",
  Jupiter: "♃", Venus: "♀", Saturn: "♄"
};

const PLANET_COLORS: Record<string, string> = {
  Sun: "text-amber-500 dark:text-yellow-400",
  Moon: "text-slate-600 dark:text-slate-200",
  Mars: "text-red-600 dark:text-red-400",
  Mercury: "text-emerald-600 dark:text-emerald-300",
  Jupiter: "text-orange-600 dark:text-orange-300",
  Venus: "text-pink-600 dark:text-pink-300",
  Saturn: "text-indigo-600 dark:text-indigo-300"
};

interface PlanetaryHoursDisplayProps {
  currentHour: PlanetaryHour | null;
  nextHours: PlanetaryHour[];
  dayRuler: string;
  selectedPlanet: string | null;
  onPlanetSelect: (planet: string | null) => void;
  lunarDay?: number;
  isWaxing?: boolean;
}

export function PlanetaryHoursDisplay({ currentHour, nextHours, dayRuler, selectedPlanet, onPlanetSelect, lunarDay, isWaxing }: PlanetaryHoursDisplayProps) {
  if (!currentHour) return null;

  const now = new Date();
  const total = currentHour.end.getTime() - currentHour.start.getTime();
  const elapsed = Math.max(0, Math.min(total, now.getTime() - currentHour.start.getTime()));
  const progress = (elapsed / total) * 100;

  const getLunarDaySuffix = (day: number) => {
    if (day === 1) return 'st';
    if (day === 2) return 'nd';
    if (day === 3) return 'rd';
    return 'th';
  };

  return (
    <div className="space-y-3">
      {/* Lunar Date Display */}
      {lunarDay && (
        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-muted-foreground bg-foreground/5 px-3 py-1.5 rounded-full w-fit mx-auto border border-border">
          {isWaxing ? <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" /> : <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          <span className="font-medium">{lunarDay}{getLunarDaySuffix(lunarDay)} of lunar month</span>
          {isWaxing ? <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" /> : <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </div>
      )}
      
      {/* Main Display */}
      <div className="relative flex flex-col items-center justify-center py-2">
        <motion.div 
          className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-7xl mb-4 font-serif ${PLANET_COLORS[currentHour.planet] || "text-primary"}`}
          >
            {PLANET_SYMBOLS[currentHour.planet]}
          </motion.div>
          
          <h2 className="text-3xl font-serif text-foreground mb-0.5 flex items-center justify-center gap-3">
            Hour of {currentHour.planet}
          </h2>
          <div className="text-lg font-arabic text-foreground/70 mb-1">
            ساعة {PLANET_ARABIC[currentHour.planet]?.arabic}
          </div>
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4 font-light tracking-wide bg-foreground/5 px-3 py-1 rounded-full w-fit mx-auto border border-border">
            <Clock className="w-3 h-3" />
            {format(currentHour.start, "h:mm a")} — {format(currentHour.end, "h:mm a")}
          </div>

          {/* Buni Planetary Spirits Info */}
          {PLANETARY_SPIRITS[currentHour.planet] && (
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4 text-xs">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
                <span className="text-sky-400">✦</span>
                <span className="text-sky-300">Angel:</span>
                <span className="text-foreground/80">{PLANETARY_SPIRITS[currentHour.planet].angel}</span>
                <span className="font-arabic text-[10px] text-sky-400/70">{PLANETARY_SPIRITS[currentHour.planet].angelArabic}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                <Flame className="w-3 h-3 text-amber-400" />
                <span className="text-amber-300">Incense:</span>
                <span className="text-foreground/80">{PLANETARY_SPIRITS[currentHour.planet].incense}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                <Crown className="w-3 h-3 text-purple-400" />
                <span className="text-purple-300">Jinn King:</span>
                <span className="text-foreground/80">{PLANETARY_SPIRITS[currentHour.planet].jinnKing}</span>
                <span className="font-arabic text-[10px] text-purple-400/70">{PLANETARY_SPIRITS[currentHour.planet].jinnKingArabic}</span>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-foreground/10 rounded-full overflow-hidden mx-auto mb-4 relative">
            <motion.div 
              className="absolute top-0 bottom-0 bg-primary shadow-[0_0_10px_rgba(250,204,21,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest opacity-50">
            {Math.round(progress)}% Elapsed
          </p>
        </div>
      </div>

      {/* Upcoming Hours */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {nextHours.slice(0, 6).map((h) => {
          const isSelected = selectedPlanet === h.planet;
          return (
            <button 
              key={h.hour + h.planet}
              onClick={() => onPlanetSelect(isSelected ? null : h.planet)}
              data-testid={`hour-card-${h.planet}`}
              className={`bg-foreground/5 border rounded-lg p-3 text-center backdrop-blur-sm hover:bg-foreground/10 transition-all flex flex-col items-center justify-between h-full group cursor-pointer ${
                isSelected ? 'border-primary ring-2 ring-primary/30 bg-primary/10' : 'border-border'
              }`}
            >
              <div className={`text-xl mb-1 ${PLANET_COLORS[h.planet]} group-hover:scale-110 transition-transform`}>
                {PLANET_SYMBOLS[h.planet]}
              </div>
              <div className="text-[10px] font-medium text-foreground/70 uppercase tracking-wider">
                {h.planet}
              </div>
              <div className="text-[10px] font-arabic text-foreground/50 mb-1">
                {PLANET_ARABIC[h.planet]?.arabic}
              </div>
              <div className="text-[9px] text-muted-foreground bg-black/20 px-1.5 py-0.5 rounded">
                {format(h.start, "h:mm")}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
