import { useState } from "react";
import { motion } from "framer-motion";
import { IBN_ARABI_MANSIONS } from "@/lib/constants";

interface MansionCycleRingProps {
  mansionNumber: number;
}

// Simple SVG tree icon
function TreeIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="currentColor" opacity="0.8">
      {/* Trunk */}
      <rect x="40" y="60" width="20" height="30" fill="currentColor" opacity="0.6" />
      {/* Foliage layers */}
      <circle cx="50" cy="50" r="20" fill="currentColor" opacity="0.9" />
      <circle cx="35" cy="55" r="16" fill="currentColor" opacity="0.85" />
      <circle cx="65" cy="55" r="16" fill="currentColor" opacity="0.85" />
      <circle cx="30" cy="35" r="14" fill="currentColor" opacity="0.8" />
      <circle cx="70" cy="35" r="14" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export function MansionCycleRing({ mansionNumber }: MansionCycleRingProps) {
  const [hoveredMansion, setHoveredMansion] = useState<number | null>(null);
  const positions = Array.from({ length: 28 }, (_, i) => i + 1);

  const getMansionData = (position: number) => {
    return IBN_ARABI_MANSIONS[position - 1];
  };

  const getZodiacSign = (position: number) => {
    const mansion = getMansionData(position);
    const signMatch = mansion.degrees.match(/([A-Za-z]+)$/);
    return signMatch ? signMatch[1] : null;
  };

  const getMansionColor = (position: number) => {
    const mansion = getMansionData(position);
    const isBlessed = mansion.nature === "blessed";
    return {
      bg: isBlessed ? "bg-green-500" : "bg-amber-500",
      border: isBlessed ? "border-green-500" : "border-amber-500",
      text: isBlessed ? "text-green-500" : "text-amber-500",
      highlight: isBlessed ? "text-green-500" : "text-amber-500",
      statusText: isBlessed ? "Blessed" : "Challenging",
      light: isBlessed ? "text-green-100 dark:text-green-900" : "text-amber-100 dark:text-amber-900",
    };
  };

  const displayedMansion = hoveredMansion ? getMansionData(hoveredMansion) : getMansionData(mansionNumber);
  const displayNumber = hoveredMansion || mansionNumber;
  const displayColor = getMansionColor(displayNumber);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
        All 28 Lunar Mansions
      </div>

      {/* Grid of tree icons */}
      <div className="grid grid-cols-7 gap-3">
        {positions.map((position) => {
          const colors = getMansionColor(position);
          const isActive = position === mansionNumber;
          const isHovered = hoveredMansion === position;

          return (
            <motion.button
              key={position}
              onMouseEnter={() => setHoveredMansion(position)}
              onMouseLeave={() => setHoveredMansion(null)}
              animate={{
                scale: isHovered ? 1.15 : 1,
              }}
              transition={{ duration: 0.15 }}
              className={`relative flex flex-col items-center justify-center cursor-pointer group`}
              data-testid={`mansion-tree-${position}`}
            >
              {/* Tree icon */}
              <div className={`${colors.text} transition-all ${isHovered ? "drop-shadow-lg" : ""}`}>
                <TreeIcon size={28} />
              </div>

              {/* Status dot */}
              <div
                className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${colors.bg} border border-background ring-1 ring-${colors.border}`}
              />

              {/* Mansion number on hover */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`text-[10px] font-bold ${colors.text} mt-1`}
                >
                  {position}
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Info card - stays stable, updates on hover */}
      <motion.div
        key={displayNumber}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`w-full p-4 rounded-lg border-2 ${displayColor.border} ${displayColor.light} bg-foreground/5`}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`text-3xl ${displayColor.text} flex-shrink-0 drop-shadow`}>
            <TreeIcon size={32} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-sm font-bold ${displayColor.text}`}>
                Mansion {displayNumber}
              </span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-foreground/10 ${displayColor.text}`}>
                {displayColor.statusText}
              </span>
            </div>

            <h3 className="text-sm font-serif text-gold mb-0.5 line-clamp-1">
              {displayedMansion.name}
            </h3>
            <div className="text-xs font-arabic text-foreground/60 mb-1.5">
              {displayedMansion.arabic}
            </div>

            <p className="text-xs text-foreground/70 leading-relaxed line-clamp-2">
              {displayedMansion.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
