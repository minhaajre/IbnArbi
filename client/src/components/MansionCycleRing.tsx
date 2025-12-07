import { useState } from "react";
import { motion } from "framer-motion";

interface MansionCycleRingProps {
  mansionNumber: number;
}

export function MansionCycleRing({ mansionNumber }: MansionCycleRingProps) {
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null);
  const positions = Array.from({ length: 28 }, (_, i) => i + 1);
  const radius = 55; // Radius for number positioning inside the circle

  const getPosition = (position: number) => {
    const angle = ((position - 1) / 28) * 360 - 90;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { x, y };
  };

  const isCurrentMansion = (position: number) => position === mansionNumber;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
        Lunar Position in Cycle
      </div>
      
      <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-md">
        {/* Outer decorative ring */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-border opacity-30"
        />

        {/* Middle guide ring */}
        <circle
          cx="100"
          cy="100"
          r="65"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary opacity-15"
        />

        {/* Inner circle */}
        <circle
          cx="100"
          cy="100"
          r="40"
          fill="currentColor"
          className="text-primary opacity-5"
        />

        {/* Current mansion highlight background arc */}
        {(() => {
          const startAngle = ((mansionNumber - 1.5) / 28) * 360 - 90;
          const endAngle = ((mansionNumber - 0.5) / 28) * 360 - 90;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;

          const x1 = 100 + 88 * Math.cos(startRad);
          const y1 = 100 + 88 * Math.sin(startRad);
          const x2 = 100 + 88 * Math.cos(endRad);
          const y2 = 100 + 88 * Math.sin(endRad);

          return (
            <path
              d={`M ${x1} ${y1} A 88 88 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-primary opacity-40"
            />
          );
        })()}

        {/* Radial lines for each mansion */}
        {positions.map((position) => {
          const angle = ((position - 1) / 28) * 360 - 90;
          const radian = (angle * Math.PI) / 180;
          const x1 = 100 + 40 * Math.cos(radian);
          const y1 = 100 + 40 * Math.sin(radian);
          const x2 = 100 + 88 * Math.cos(radian);
          const y2 = 100 + 88 * Math.sin(radian);
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
              strokeWidth={isActive || isHovered ? 2.5 : 1}
              className={
                isActive
                  ? "text-primary"
                  : isHovered
                    ? "text-primary/60"
                    : "text-border opacity-20"
              }
              opacity={isActive || isHovered ? 1 : 0.4}
            />
          );
        })}

        {/* Center dot */}
        <circle cx="100" cy="100" r="4" fill="currentColor" className="text-primary" />

        {/* Position numbers as foreign objects for better text rendering */}
        {positions.map((position) => {
          const { x, y } = getPosition(position);
          const isActive = isCurrentMansion(position);
          const isHovered = hoveredNumber === position;

          return (
            <g key={`num-${position}`}>
              {/* Invisible larger hitbox for hover */}
              <circle
                cx={100 + x}
                cy={100 + y}
                r="10"
                fill="transparent"
                onMouseEnter={() => setHoveredNumber(position)}
                onMouseLeave={() => setHoveredNumber(null)}
                style={{ cursor: "pointer" }}
              />

              {/* Number with animation */}
              <motion.g
                animate={{
                  scale: isActive ? 1.4 : isHovered ? 1.25 : 1,
                  opacity: isActive || isHovered ? 1 : 0.7,
                }}
                transition={{ duration: 0.2 }}
              >
                {isActive && (
                  <circle
                    cx={100 + x}
                    cy={100 + y}
                    r="9"
                    fill="currentColor"
                    className="text-primary/20"
                  />
                )}

                <text
                  x={100 + x}
                  y={100 + y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`font-bold select-none pointer-events-none ${
                    isActive ? "text-primary" : isHovered ? "text-primary/70" : "text-muted-foreground"
                  }`}
                  fontSize={isActive ? "12" : isHovered ? "11" : "10"}
                  fill="currentColor"
                >
                  {position}
                </text>
              </motion.g>
            </g>
          );
        })}
      </svg>

      {/* Center label */}
      <div className="text-center -mt-2">
        <div className="text-2xl font-bold text-primary">{mansionNumber}</div>
        <div className="text-[10px] text-muted-foreground">of 28</div>
      </div>
    </div>
  );
}
