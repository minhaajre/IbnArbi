import { useState } from "react";
import { motion } from "framer-motion";
import { IBN_ARABI_MANSIONS, SIGN_DATA } from "@/lib/constants";

interface MansionCycleRingProps {
  mansionNumber: number;
  onSelectMansion?: (number: number | null) => void;
}

export function MansionCycleRing({ mansionNumber, onSelectMansion }: MansionCycleRingProps) {
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null);
  const positions = Array.from({ length: 28 }, (_, i) => i + 1);
  const radius = 70; // Larger radius for bigger circle

  const getMansionData = (position: number) => {
    return IBN_ARABI_MANSIONS[position - 1];
  };

  const getZodiacSign = (position: number) => {
    const mansion = getMansionData(position);
    // Extract zodiac sign from degrees string like "0° Aries" or "12°51' Aries"
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
    };
  };

  const getNumberPosition = (position: number) => {
    const angle = ((position - 1) / 28) * 360 - 90;
    const radian = (angle * Math.PI) / 180;
    const numberRadius = 90; // Inner radius for numbers - increased to prevent overlap
    const x = Math.cos(radian) * numberRadius;
    const y = Math.sin(radian) * numberRadius;
    return { x, y };
  };

  const getSymbolPosition = (position: number) => {
    const angle = ((position - 1) / 28) * 360 - 90;
    const radian = (angle * Math.PI) / 180;
    const symbolRadius = 115; // Outer radius for zodiac symbols
    const x = Math.cos(radian) * symbolRadius;
    const y = Math.sin(radian) * symbolRadius;
    return { x, y };
  };

  const isCurrentMansion = (position: number) => position === mansionNumber;

  const currentMansion = getMansionData(mansionNumber);
  const currentZodiac = getZodiacSign(mansionNumber);
  const currentSymbol = getZodiacSymbol(mansionNumber);
  const currentColor = getMansionColor(mansionNumber);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
        Lunar Position in Cycle
      </div>

      {/* Large SVG Circle */}
      <svg width="280" height="280" viewBox="0 0 280 280" className="drop-shadow-lg">
        {/* Outer decorative ring */}
        <circle
          cx="140"
          cy="140"
          r="130"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-border opacity-25"
        />

        {/* Middle guide ring */}
        <circle
          cx="140"
          cy="140"
          r="95"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary opacity-15"
        />

        {/* Inner circle */}
        <circle
          cx="140"
          cy="140"
          r="50"
          fill="currentColor"
          className="text-primary opacity-8"
        />

        {/* Current mansion highlight background arc */}
        {(() => {
          const startAngle = ((mansionNumber - 1.5) / 28) * 360 - 90;
          const endAngle = ((mansionNumber - 0.5) / 28) * 360 - 90;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;

          const x1 = 140 + 128 * Math.cos(startRad);
          const y1 = 140 + 128 * Math.sin(startRad);
          const x2 = 140 + 128 * Math.cos(endRad);
          const y2 = 140 + 128 * Math.sin(endRad);

          return (
            <path
              d={`M ${x1} ${y1} A 128 128 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              className={currentColor.highlight + " opacity-40"}
            />
          );
        })()}

        {/* Radial lines for each mansion */}
        {positions.map((position) => {
          const angle = ((position - 1) / 28) * 360 - 90;
          const radian = (angle * Math.PI) / 180;
          const x1 = 140 + 50 * Math.cos(radian);
          const y1 = 140 + 50 * Math.sin(radian);
          const x2 = 140 + 128 * Math.cos(radian);
          const y2 = 140 + 128 * Math.sin(radian);
          const isActive = isCurrentMansion(position);
          const isHovered = hoveredNumber === position;

          return (
            <line
              key={`line-${position}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth={isActive || isHovered ? 2.5 : 1.5}
              className={
                isActive
                  ? getMansionColor(position).highlight
                  : isHovered
                    ? getMansionColor(position).text + " opacity-60"
                    : "text-border opacity-20"
              }
              opacity={isActive || isHovered ? 1 : 0.4}
            />
          );
        })}

        {/* Mansion numbers */}
        {positions.map((position) => {
          const { x, y } = getNumberPosition(position);
          const isActive = isCurrentMansion(position);
          const isHovered = hoveredNumber === position;
          const colors = getMansionColor(position);

          return (
            <g key={`number-${position}`}>
              {/* Invisible larger hitbox for hover and click */}
              <circle
                cx={140 + x}
                cy={140 + y}
                r="14"
                fill="transparent"
                onMouseEnter={() => {
                  setHoveredNumber(position);
                  onSelectMansion?.(position);
                }}
                onMouseLeave={() => setHoveredNumber(null)}
                onClick={() => {
                  setHoveredNumber(position);
                  onSelectMansion?.(position);
                }}
                style={{ cursor: "pointer" }}
              />

              {/* Background circle for number */}
              <motion.g
                animate={{
                  scale: isActive ? 1.5 : isHovered ? 1.3 : 1,
                  opacity: isActive || isHovered ? 1 : 0.75,
                }}
                transition={{ duration: 0.2 }}
              >
                <circle
                  cx={140 + x}
                  cy={140 + y}
                  r="12"
                  fill="currentColor"
                  className={`${colors.bg} ${colors.border}`}
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

                {/* Number */}
                <text
                  x={140 + x}
                  y={140 + y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`font-bold select-none pointer-events-none ${colors.text}`}
                  fontSize={isActive ? "11" : isHovered ? "10" : "9"}
                  fill="currentColor"
                >
                  {position}
                </text>
              </motion.g>
            </g>
          );
        })}

        {/* Zodiac symbols at outer rim */}
        {positions.map((position) => {
          const { x, y } = getSymbolPosition(position);
          const symbol = getZodiacSymbol(position);
          const isActive = isCurrentMansion(position);
          const isHovered = hoveredNumber === position;

          return (
            <motion.g
              key={`symbol-${position}`}
              animate={{
                scale: isActive ? 1.3 : isHovered ? 1.15 : 1,
                opacity: isActive || isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setHoveredNumber(position)}
              onMouseLeave={() => setHoveredNumber(null)}
              style={{ cursor: "pointer" }}
            >
              <text
                x={140 + x}
                y={140 + y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="select-none pointer-events-none text-muted-foreground"
                fontSize="14"
                fontWeight="600"
                fill="currentColor"
              >
                {symbol}
              </text>
            </motion.g>
          );
        })}

        {/* Center dot */}
        <circle cx="140" cy="140" r="5" fill="currentColor" className="text-primary" />
      </svg>

      {/* Center Display Card */}
      <div className={`text-center p-3 rounded-lg border-2 ${currentColor.border} ${currentColor.bg}`}>
        <div className="text-3xl font-bold mb-1">{currentSymbol}</div>
        <div className={`text-lg font-bold ${currentColor.highlight}`}>{mansionNumber}</div>
        <div className={`text-xs ${currentColor.highlight} opacity-70`}>of 28 Mansions</div>
        <div className={`text-[10px] ${currentColor.text} mt-1`}>
          {currentMansion.nature === "blessed" ? "✓ Blessed" : "⚠ Challenging"}
        </div>
      </div>
    </div>
  );
}
