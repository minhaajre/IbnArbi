import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlanetaryHour } from "@/lib/astronomy";
import { format } from "date-fns";
import { Sun, Moon, Star, Cloud } from "lucide-react"; // We'll use generic icons and map them

const PLANET_ICONS: Record<string, string> = {
  Sun: "☉",
  Moon: "☾",
  Mars: "♂",
  Mercury: "☿",
  Jupiter: "♃",
  Venus: "♀",
  Saturn: "♄"
};

const PLANET_COLORS: Record<string, string> = {
  Sun: "text-yellow-400",
  Moon: "text-slate-200",
  Mars: "text-red-400",
  Mercury: "text-emerald-300",
  Jupiter: "text-orange-300",
  Venus: "text-pink-300",
  Saturn: "text-indigo-300"
};

interface PlanetaryHoursDisplayProps {
  currentHour: PlanetaryHour | null;
  nextHours: PlanetaryHour[];
  dayRuler: string;
}

export function PlanetaryHoursDisplay({ currentHour, nextHours, dayRuler }: PlanetaryHoursDisplayProps) {
  if (!currentHour) return null;

  const now = new Date();
  const total = currentHour.duration;
  const elapsed = now.getTime() - currentHour.start.getTime();
  const progress = Math.min(100, Math.max(0, (elapsed / total) * 100));

  return (
    <div className="space-y-8">
      {/* Main Display */}
      <div className="relative flex flex-col items-center justify-center py-12">
        <motion.div 
          className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-8xl mb-4 font-serif ${PLANET_COLORS[currentHour.planet] || "text-primary"}`}
          >
            {PLANET_ICONS[currentHour.planet] || "★"}
          </motion.div>
          
          <h2 className="text-3xl font-serif text-foreground mb-1">
            Hour of {currentHour.planet}
          </h2>
          <p className="text-muted-foreground mb-6 font-light tracking-wide">
            {format(currentHour.start, "h:mm a")} — {format(currentHour.end, "h:mm a")}
          </p>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto mb-4">
            <motion.div 
              className="h-full bg-primary shadow-[0_0_10px_rgba(250,204,21,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            {currentHour.type === 'day' ? 'Daytime' : 'Nighttime'} Hour
          </p>
        </div>
      </div>

      {/* Upcoming Hours */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {nextHours.slice(0, 6).map((h, i) => (
          <div 
            key={h.hour + h.planet}
            className="bg-white/5 border border-white/5 rounded-lg p-3 text-center backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            <div className={`text-xl mb-1 ${PLANET_COLORS[h.planet]}`}>
              {PLANET_ICONS[h.planet]}
            </div>
            <div className="text-xs font-medium text-foreground/80 mb-1 truncate">
              {h.planet}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {format(h.start, "h:mm")}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          Day Ruler: <span className="text-gold font-serif text-lg ml-1">{dayRuler}</span>
        </p>
      </div>
    </div>
  );
}
