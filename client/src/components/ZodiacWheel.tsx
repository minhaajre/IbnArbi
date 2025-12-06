import { motion, AnimatePresence } from "framer-motion";
import { PlanetStatus } from "@/lib/astronomy";
import { SIGNS, SIGN_DATA } from "@/lib/constants";
import { useState } from "react";

interface ZodiacWheelProps {
  planets: PlanetStatus[];
}

const ELEMENT_COLORS = {
  Fire: { fill: "rgba(239, 68, 68, 0.15)", stroke: "rgb(239, 68, 68)" },
  Earth: { fill: "rgba(34, 197, 94, 0.15)", stroke: "rgb(34, 197, 94)" },
  Air: { fill: "rgba(251, 191, 36, 0.15)", stroke: "rgb(251, 191, 36)" },
  Water: { fill: "rgba(59, 130, 246, 0.15)", stroke: "rgb(59, 130, 246)" }
};

const PLANET_SYMBOLS: Record<string, string> = {
  Sun: "☉", Moon: "☽", Mars: "♂", Mercury: "☿",
  Jupiter: "♃", Venus: "♀", Saturn: "♄"
};

const PLANET_COLORS: Record<string, string> = {
  Sun: "#f59e0b",
  Moon: "#94a3b8",
  Mercury: "#a78bfa",
  Venus: "#f472b6",
  Mars: "#ef4444",
  Jupiter: "#3b82f6",
  Saturn: "#6b7280"
};

export function ZodiacWheel({ planets }: ZodiacWheelProps) {
  const [hoveredSign, setHoveredSign] = useState<string | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  const size = 400;
  const center = size / 2;
  const outerRadius = size / 2 - 10;
  const signRingWidth = 40;
  const innerRadius = outerRadius - signRingWidth;
  const baseRadius = innerRadius - 25;

  const getCoords = (deg: number, r: number) => {
    const normalizedDeg = ((deg % 360) + 360) % 360;
    const rad = (normalizedDeg - 90) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad)
    };
  };

  const createArcPath = (startAngle: number, endAngle: number, outerR: number, innerR: number) => {
    const start1 = getCoords(startAngle, outerR);
    const end1 = getCoords(endAngle, outerR);
    const start2 = getCoords(endAngle, innerR);
    const end2 = getCoords(startAngle, innerR);
    
    return `M ${start1.x} ${start1.y} 
            A ${outerR} ${outerR} 0 0 1 ${end1.x} ${end1.y} 
            L ${start2.x} ${start2.y} 
            A ${innerR} ${innerR} 0 0 0 ${end2.x} ${end2.y} Z`;
  };

  const resolvePlanetPositions = () => {
    const minDistance = 32;
    const orbits = [innerRadius - 22, innerRadius - 58, innerRadius - 94];
    
    const sorted = [...planets].sort((a, b) => a.longitude - b.longitude);
    
    const positions = sorted.map((planet) => {
      const normalizedLong = ((planet.longitude % 360) + 360) % 360;
      return {
        planet,
        angle: normalizedLong,
        radius: orbits[0],
        orbitIndex: 0
      };
    });

    const getDistance = (p1: {angle: number, radius: number}, p2: {angle: number, radius: number}) => {
      const pos1 = getCoords(p1.angle, p1.radius);
      const pos2 = getCoords(p2.angle, p2.radius);
      return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    };

    for (let pass = 0; pass < 10; pass++) {
      let anyCollision = false;
      
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dist = getDistance(positions[i], positions[j]);
          
          if (dist < minDistance) {
            anyCollision = true;
            if (positions[j].orbitIndex < orbits.length - 1) {
              positions[j].orbitIndex++;
              positions[j].radius = orbits[positions[j].orbitIndex];
            } else {
              const offset = (minDistance - dist) / positions[j].radius * (180 / Math.PI) + 2;
              positions[j].angle = ((positions[j].angle + offset) % 360 + 360) % 360;
            }
          }
        }
      }
      
      if (!anyCollision) break;
    }

    return positions;
  };

  const planetPositions = resolvePlanetPositions();
  const hoveredSignData = hoveredSign ? SIGN_DATA[hoveredSign] : null;
  const hoveredPlanetData = hoveredPlanet ? planets.find(p => p.name === hoveredPlanet) : null;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="planetShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.3"/>
          </filter>
        </defs>

        <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
        <circle cx={center} cy={center} r={innerRadius - 20} fill="none" stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx={center} cy={center} r={innerRadius - 56} fill="none" stroke="currentColor" strokeOpacity="0.04" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx={center} cy={center} r={innerRadius - 92} fill="none" stroke="currentColor" strokeOpacity="0.03" strokeWidth="1" strokeDasharray="2 4" />

        {SIGNS.map((sign, i) => {
          const startAngle = i * 30;
          const endAngle = (i + 1) * 30;
          const midAngle = startAngle + 15;
          const signInfo = SIGN_DATA[sign];
          const elementColor = ELEMENT_COLORS[signInfo.element];
          const isHovered = hoveredSign === sign;
          const labelPos = getCoords(midAngle, outerRadius - signRingWidth / 2);
          
          return (
            <g key={sign} className="cursor-pointer" 
               onMouseEnter={() => setHoveredSign(sign)} 
               onMouseLeave={() => setHoveredSign(null)}>
              <path
                d={createArcPath(startAngle, endAngle, outerRadius, innerRadius)}
                fill={isHovered ? elementColor.fill : "transparent"}
                stroke={isHovered ? elementColor.stroke : "currentColor"}
                strokeOpacity={isHovered ? 0.8 : 0.1}
                strokeWidth={isHovered ? 1.5 : 0.5}
                className="transition-all duration-200"
              />
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fill={isHovered ? elementColor.stroke : "currentColor"}
                opacity={isHovered ? 1 : 0.6}
                className="select-none font-serif transition-all duration-200"
              >
                {signInfo.symbol}
              </text>
            </g>
          );
        })}

        {planetPositions.map(({ planet, angle, radius }) => {
          const pos = getCoords(angle, radius);
          const isHovered = hoveredPlanet === planet.name;
          const planetColor = PLANET_COLORS[planet.name] || "#888";
          const isSun = planet.name === "Sun";
          const circleSize = isSun ? 15 : 12;
          
          return (
            <motion.g
              key={planet.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPlanet(planet.name)}
              onMouseLeave={() => setHoveredPlanet(null)}
              filter={isHovered ? "url(#glow)" : "url(#planetShadow)"}
            >
              <circle cx={pos.x} cy={pos.y} r="16" fill="transparent" />
              
              <circle
                cx={pos.x}
                cy={pos.y}
                r={circleSize}
                fill="var(--color-card)"
                stroke={isHovered ? planetColor : "var(--color-border)"}
                strokeWidth={isHovered ? 2 : 1}
                className="transition-all duration-200"
              />
              
              <text
                x={pos.x}
                y={pos.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={isSun ? 14 : 12}
                fill={planetColor}
                className="font-serif select-none pointer-events-none"
              >
                {PLANET_SYMBOLS[planet.name]}
              </text>
              
              {planet.isRetrograde && (
                <text
                  x={pos.x + circleSize + 1}
                  y={pos.y - circleSize + 1}
                  fontSize="7"
                  fill="#ef4444"
                  className="font-bold pointer-events-none"
                >
                  R
                </text>
              )}
            </motion.g>
          );
        })}

        <circle cx={center} cy={center} r="4" fill="currentColor" fillOpacity="0.6" />
        <circle cx={center} cy={center} r="1.5" fill="var(--color-background)" />
      </svg>

      <AnimatePresence>
        {hoveredSignData && hoveredSign && !hoveredPlanet && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-2 bg-card/95 backdrop-blur-md border border-border px-4 py-2 rounded-lg shadow-lg text-center min-w-[180px] z-20"
          >
            <div className="font-serif text-lg text-primary mb-1">
              {SIGN_DATA[hoveredSign].symbol} {hoveredSign}
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <div><span className="opacity-60">Element:</span> <span className="text-foreground">{hoveredSignData.element}</span></div>
              <div><span className="opacity-60">Modality:</span> <span className="text-foreground">{hoveredSignData.modality}</span></div>
              <div><span className="opacity-60">Polarity:</span> <span className="text-foreground">{hoveredSignData.polarity}</span></div>
              <div><span className="opacity-60">Season:</span> <span className="text-foreground">{hoveredSignData.season}</span></div>
            </div>
            <div className="text-xs mt-1 text-muted-foreground">
              Ruled by <span className="text-primary font-medium">{hoveredSignData.ruler}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hoveredPlanetData && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute left-1/2 -translate-x-1/2 -top-2 bg-card/95 backdrop-blur-md border border-border px-4 py-2 rounded-lg shadow-lg text-center min-w-[140px] z-20"
          >
            <div className="font-serif text-base flex items-center justify-center gap-2" style={{ color: PLANET_COLORS[hoveredPlanetData.name] }}>
              {PLANET_SYMBOLS[hoveredPlanetData.name]} {hoveredPlanetData.name}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {hoveredPlanetData.sign} {Math.floor(hoveredPlanetData.degree)}°{Math.round((hoveredPlanetData.degree % 1) * 60)}'
            </div>
            {hoveredPlanetData.isRetrograde && (
              <div className="text-xs text-red-500 font-medium mt-0.5">Retrograde</div>
            )}
            {hoveredPlanetData.status !== 'Neutral' && (
              <div className="text-xs text-primary font-medium mt-0.5">{hoveredPlanetData.status}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
