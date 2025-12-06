import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlanetaryHour, PlanetStatus } from "@/lib/astronomy";
import { format } from "date-fns";
import { Sun, Moon, Star, Clock, Sparkles, AlertTriangle } from "lucide-react";
import { PLANET_PROPHETS } from "@/lib/constants";

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
  moonStatus?: {
    sign: string;
    degree: number;
    isVoidOfCourse: boolean;
  };
}

export function PlanetaryHoursDisplay({ currentHour, nextHours, dayRuler, moonStatus }: PlanetaryHoursDisplayProps) {
  if (!currentHour) return null;

  const now = new Date();
  const total = currentHour.end.getTime() - currentHour.start.getTime();
  const elapsed = Math.max(0, Math.min(total, now.getTime() - currentHour.start.getTime()));
  const progress = (elapsed / total) * 100;

  return (
    <div className="space-y-8 relative">
      {/* Moon Status - Top Left */}
      {moonStatus && (
        <div className="absolute top-0 left-0 flex flex-col items-start">
          <div className="flex items-center gap-1.5 text-sm font-medium text-foreground/80">
            <Moon className="w-3.5 h-3.5" />
            <span>{moonStatus.sign}</span>
          </div>
          <div className="text-xs text-muted-foreground pl-5">
            {Math.floor(moonStatus.degree)}°{Math.round((moonStatus.degree % 1) * 60)}'
          </div>
          {moonStatus.isVoidOfCourse && (
             <div className="mt-1 pl-1 text-xs text-yellow-500 font-bold flex items-center gap-1 bg-yellow-500/10 px-2 py-0.5 rounded-full animate-pulse">
               <AlertTriangle className="w-3 h-3" /> VOC
             </div>
           )}
        </div>
      )}

      {/* Main Display */}
      <div className="relative flex flex-col items-center justify-center py-8 mt-6">
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
          
          <h2 className="text-3xl font-serif text-foreground mb-1 flex items-center justify-center gap-3">
            Hour of {currentHour.planet}
          </h2>
          
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
        {nextHours.slice(0, 6).map((h) => (
          <div 
            key={h.hour + h.planet}
            className="bg-foreground/5 border border-border rounded-lg p-3 text-center backdrop-blur-sm hover:bg-foreground/10 transition-colors flex flex-col items-center justify-between h-full group"
          >
            <div className={`text-xl mb-1 ${PLANET_COLORS[h.planet]} group-hover:scale-110 transition-transform`}>
              {PLANET_SYMBOLS[h.planet]}
            </div>
            <div className="text-[10px] font-medium text-foreground/70 uppercase tracking-wider mb-1">
              {h.planet}
            </div>
            <div className="text-[9px] text-muted-foreground bg-black/20 px-1.5 py-0.5 rounded">
              {format(h.start, "h:mm")}
            </div>
          </div>
        ))}
      </div>
      
      {/* Info Footer */}
      <div className="pt-4 border-t border-border mt-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 opacity-50">Day Ruler</p>
          <div className="flex items-center justify-center gap-3">
            <span className={`text-2xl ${PLANET_COLORS[dayRuler]}`}>{PLANET_SYMBOLS[dayRuler]}</span>
            <div className="text-left">
              <div className="text-foreground font-serif text-lg leading-none">{dayRuler}</div>
              <div className="text-xs text-muted-foreground">{format(now, "EEEE")}</div>
            </div>
          </div>
          
          <div className="mt-3 inline-flex items-center justify-center gap-2 bg-foreground/5 px-4 py-2 rounded-lg border border-border">
            <Sparkles className="w-3 h-3 text-gold" />
            <div className="text-sm">
              <span className="text-muted-foreground mr-1">Prophet:</span>
              <span className="text-gold font-medium">{PLANET_PROPHETS[dayRuler]?.name}</span>
            </div>
            <div className="text-lg font-arabic text-primary/80 ml-1">
              {PLANET_PROPHETS[dayRuler]?.arabic}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
