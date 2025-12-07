import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IBN_ARABI_MANSIONS, SIGN_DATA } from "@/lib/constants";

interface MansionCycleRingProps {
  mansionNumber: number;
  onSelectMansion?: (number: number | null) => void;
}

export function MansionCycleRing({ mansionNumber, onSelectMansion }: MansionCycleRingProps) {
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

  const getZodiacSymbol = (position: number) => {
    const sign = getZodiacSign(position);
    if (sign && sign in SIGN_DATA) {
      return SIGN_DATA[sign as keyof typeof SIGN_DATA].symbol;
    }
    return "";
  };

  const getMansionColor = (position: number) => {
    const mansion = getMansionData(position);
    const isBlessed = mansion.nature === "blessed";
    return {
      bg: isBlessed ? "bg-green-500/20" : "bg-amber-500/20",
      border: isBlessed ? "border-green-500/50" : "border-amber-500/50",
      text: isBlessed ? "text-green-500" : "text-amber-500",
      highlight: isBlessed ? "text-green-500" : "text-amber-500",
      statusText: isBlessed ? "Blessed" : "Challenging",
    };
  };

  const handleMansionHover = (position: number) => {
    setHoveredMansion(position);
    onSelectMansion?.(position);
  };

  const hoveredData = hoveredMansion ? getMansionData(hoveredMansion) : null;
  const hoveredZodiac = hoveredMansion ? getZodiacSign(hoveredMansion) : null;
  const hoveredSymbol = hoveredMansion ? getZodiacSymbol(hoveredMansion) : null;
  const hoveredColor = hoveredMansion ? getMansionColor(hoveredMansion) : null;

  const currentMansion = getMansionData(mansionNumber);
  const currentSymbol = getZodiacSymbol(mansionNumber);
  const currentColor = getMansionColor(mansionNumber);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
        All 28 Lunar Mansions
      </div>

      {/* Grid of mansion numbers */}
      <div className="grid grid-cols-7 gap-2">
        {positions.map((position) => {
          const colors = getMansionColor(position);
          const isActive = position === mansionNumber;
          const isHovered = hoveredMansion === position;

          return (
            <motion.button
              key={position}
              onMouseEnter={() => handleMansionHover(position)}
              onMouseLeave={() => setHoveredMansion(null)}
              onMouseMove={(e) => {
                // Store position for info card placement
                const rect = (e.target as HTMLElement).getBoundingClientRect();
              }}
              animate={{
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.15 }}
              className={`relative w-10 h-10 rounded-lg font-semibold text-sm flex items-center justify-center transition-all ${colors.bg} ${colors.border} border-2 ${colors.text} hover:shadow-lg cursor-pointer`}
              data-testid={`mansion-number-${position}`}
            >
              {position}
            </motion.button>
          );
        })}
      </div>

      {/* Floating info card on hover */}
      <AnimatePresence>
        {hoveredMansion && hoveredData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute mt-2 p-3 rounded-lg border-2 max-w-xs z-50 shadow-xl ${hoveredColor?.bg} ${hoveredColor?.border}`}
          >
            <div className="flex items-start gap-2">
              <div className="text-xl font-bold">{hoveredSymbol}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-bold ${hoveredColor?.highlight}`}>
                    Mansion {hoveredMansion}
                  </span>
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${hoveredColor?.bg} ${hoveredColor?.border} border`}>
                    {hoveredColor?.statusText}
                  </span>
                </div>
                <div className="text-sm font-serif text-gold mb-0.5">{hoveredData.name}</div>
                <div className="text-xs font-arabic text-muted-foreground mb-1">{hoveredData.arabic}</div>
                <div className="text-[10px] text-foreground/70 leading-relaxed">
                  {hoveredData.description}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current mansion display card below grid */}
      <div className={`text-center p-2.5 rounded-lg border-2 ${currentColor.border} ${currentColor.bg} mt-2`}>
        <div className="text-2xl font-bold mb-0.5">{currentSymbol}</div>
        <div className={`text-base font-bold ${currentColor.highlight}`}>{mansionNumber}</div>
        <div className={`text-[10px] ${currentColor.highlight} opacity-70`}>Current</div>
        <div className={`text-[9px] ${currentColor.text} mt-0.5`}>
          {currentMansion.nature === "blessed" ? "✓ Blessed" : "⚠ Challenge"}
        </div>
      </div>
    </div>
  );
}
