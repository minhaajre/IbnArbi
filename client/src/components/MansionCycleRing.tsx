import { useState } from "react";
import { motion } from "framer-motion";
import { IBN_ARABI_MANSIONS, SIGN_DATA } from "@/lib/constants";

interface MansionCycleRingProps {
  mansionNumber: number;
  onSelectMansion?: (number: number | null) => void;
}

export function MansionCycleRing({ mansionNumber, onSelectMansion }: MansionCycleRingProps) {
  const [hoveredSign, setHoveredSign] = useState<string | null>(null);

  // Get unique zodiac signs in order
  const zodiacSigns = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
                       "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

  const getMansionData = (position: number) => {
    return IBN_ARABI_MANSIONS[position - 1];
  };

  const getZodiacSign = (position: number) => {
    const mansion = getMansionData(position);
    const signMatch = mansion.degrees.match(/([A-Za-z]+)$/);
    return signMatch ? signMatch[1] : null;
  };

  const getZodiacSymbol = (sign: string) => {
    if (sign in SIGN_DATA) {
      return SIGN_DATA[sign as keyof typeof SIGN_DATA].symbol;
    }
    return "";
  };

  // Get first mansion in a zodiac sign
  const getFirstMansionInSign = (sign: string) => {
    for (let i = 1; i <= 28; i++) {
      if (getZodiacSign(i) === sign) {
        return i;
      }
    }
    return 1;
  };

  const getMansionColor = (position: number) => {
    const mansion = getMansionData(position);
    const isBlessed = mansion.nature === "blessed";
    return {
      bg: isBlessed ? "bg-green-500/20" : "bg-amber-500/20",
      border: isBlessed ? "border-green-500/50" : "border-amber-500/50",
      text: isBlessed ? "text-green-500" : "text-amber-500",
      highlight: isBlessed ? "text-green-500" : "text-amber-500",
    };
  };

  const getSymbolPosition = (index: number) => {
    const angle = (index / 12) * 360 - 90;
    const radian = (angle * Math.PI) / 180;
    const symbolRadius = 130; // Zodiac symbols at this radius
    const x = Math.cos(radian) * symbolRadius;
    const y = Math.sin(radian) * symbolRadius;
    return { x, y };
  };

  const currentMansion = getMansionData(mansionNumber);
  const currentZodiac = getZodiacSign(mansionNumber);
  const currentSymbol = getZodiacSymbol(currentZodiac || "");
  const currentColor = getMansionColor(mansionNumber);

  const handleZodiacClick = (sign: string) => {
    const mansion = getFirstMansionInSign(sign);
    onSelectMansion?.(mansion);
    setHoveredSign(sign);
  };

  const handleZodiacHover = (sign: string) => {
    const mansion = getFirstMansionInSign(sign);
    onSelectMansion?.(mansion);
    setHoveredSign(sign);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
        Lunar Position in Cycle
      </div>

      {/* Large SVG Circle */}
      <svg width="340" height="340" viewBox="0 0 340 340" className="drop-shadow-lg">
        {/* Outer decorative ring */}
        <circle
          cx="170"
          cy="170"
          r="150"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-border opacity-25"
        />

        {/* Middle guide ring */}
        <circle
          cx="170"
          cy="170"
          r="110"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary opacity-15"
        />

        {/* Inner circle */}
        <circle
          cx="170"
          cy="170"
          r="55"
          fill="currentColor"
          className="text-primary opacity-8"
        />

        {/* Current mansion highlight background arc */}
        {(() => {
          const signIndex = zodiacSigns.indexOf(currentZodiac || "");
          if (signIndex === -1) return null;
          
          const startAngle = ((signIndex - 0.5) / 12) * 360 - 90;
          const endAngle = ((signIndex + 0.5) / 12) * 360 - 90;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;

          const x1 = 170 + 148 * Math.cos(startRad);
          const y1 = 170 + 148 * Math.sin(startRad);
          const x2 = 170 + 148 * Math.cos(endRad);
          const y2 = 170 + 148 * Math.sin(endRad);

          return (
            <path
              d={`M ${x1} ${y1} A 148 148 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              className={currentColor.highlight + " opacity-40"}
            />
          );
        })()}

        {/* Radial lines for each zodiac */}
        {zodiacSigns.map((sign, index) => {
          const angle = (index / 12) * 360 - 90;
          const radian = (angle * Math.PI) / 180;
          const x1 = 170 + 55 * Math.cos(radian);
          const y1 = 170 + 55 * Math.sin(radian);
          const x2 = 170 + 148 * Math.cos(radian);
          const y2 = 170 + 148 * Math.sin(radian);
          const isActive = sign === currentZodiac;
          const isHovered = hoveredSign === sign;

          return (
            <line
              key={`line-${sign}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth={isActive || isHovered ? "1.5" : "1"}
              className={isActive || isHovered ? "text-primary" : "text-border opacity-20"}
              opacity={isActive || isHovered ? 1 : 0.3}
            />
          );
        })}

        {/* Zodiac symbols - large and interactive */}
        {zodiacSigns.map((sign, index) => {
          const { x, y } = getSymbolPosition(index);
          const isActive = sign === currentZodiac;
          const isHovered = hoveredSign === sign;
          const symbol = getZodiacSymbol(sign);

          return (
            <g key={`zodiac-${sign}`}>
              {/* Invisible hit box for interaction */}
              <circle
                cx={170 + x}
                cy={170 + y}
                r="22"
                fill="transparent"
                onMouseEnter={() => handleZodiacHover(sign)}
                onMouseLeave={() => setHoveredSign(null)}
                onClick={() => handleZodiacClick(sign)}
                style={{ cursor: "pointer" }}
              />

              {/* Background circle for zodiac */}
              <motion.g
                animate={{
                  scale: isActive ? 1.6 : isHovered ? 1.4 : 1,
                  opacity: isActive || isHovered ? 1 : 0.7,
                }}
                transition={{ duration: 0.2 }}
              >
                <circle
                  cx={170 + x}
                  cy={170 + y}
                  r="18"
                  fill="currentColor"
                  className={isActive ? "text-primary bg-primary/20" : "text-muted-foreground bg-muted/10"}
                  stroke="currentColor"
                  strokeWidth="2"
                />

                {/* Symbol */}
                <text
                  x={170 + x}
                  y={170 + y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-bold select-none pointer-events-none"
                  fontSize={isActive ? "20" : isHovered ? "18" : "16"}
                  fill="currentColor"
                >
                  {symbol}
                </text>
              </motion.g>
            </g>
          );
        })}

        {/* Center dot */}
        <circle cx="170" cy="170" r="6" fill="currentColor" className="text-primary" />
      </svg>

      {/* Center Display Card */}
      <div className={`text-center p-2.5 rounded-lg border-2 ${currentColor.border} ${currentColor.bg}`}>
        <div className="text-2xl font-bold mb-0.5">{currentSymbol}</div>
        <div className={`text-base font-bold ${currentColor.highlight}`}>{mansionNumber}</div>
        <div className={`text-[10px] ${currentColor.highlight} opacity-70`}>of 28</div>
        <div className={`text-[9px] ${currentColor.text} mt-0.5`}>
          {currentMansion.nature === "blessed" ? "✓ Blessed" : "⚠ Challenge"}
        </div>
      </div>
    </div>
  );
}
