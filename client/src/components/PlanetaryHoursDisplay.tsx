import { motion } from "framer-motion";
import { PlanetaryHour } from "@/lib/astronomy";
import { format } from "date-fns";
import { Clock, Sparkles } from "lucide-react";
import { PLANET_PROPHETS, PLANET_ARABIC } from "@/lib/constants";

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
}

export function PlanetaryHoursDisplay({ currentHour, nextHours, dayRuler, selectedPlanet, onPlanetSelect }: PlanetaryHoursDisplayProps) {
  if (!currentHour) return null;

  const now = new Date();
  const total = currentHour.end.getTime() - currentHour.start.getTime();
  const elapsed = Math.max(0, Math.min(total, now.getTime() - currentHour.start.getTime()));
  const progress = (elapsed / total) * 100;

  return (
    <div className="space-y-6">
      {/* Main Display */}
      <div className="relative flex flex-col items-center justify-center py-4">
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
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6 font-light tracking-wide bg-foreground/5 px-3 py-1 rounded-full w-fit mx-auto border border-border">
            <Clock className="w-3 h-3" />
            {format(currentHour.start, "h:mm a")} — {format(currentHour.end, "h:mm a")}
          </div>

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
