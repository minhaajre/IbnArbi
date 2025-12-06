import { motion, AnimatePresence } from "framer-motion";
import { PlanetStatus } from "@/lib/astronomy";
import { SIGNS } from "@/lib/constants";
import { useState } from "react";

interface ZodiacWheelProps {
  planets: PlanetStatus[];
}

export function ZodiacWheel({ planets }: ZodiacWheelProps) {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [hoveredPos, setHoveredPos] = useState<{x: number, y: number} | null>(null);

  // SVG Constants
  const size = 400;
  const center = size / 2;
  const radius = size / 2 - 20;
  const innerRadius = radius - 60;
  
  // Helper to get coordinates
  const getCoords = (deg: number, r: number) => {
    const rad = (deg - 90) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad)
    };
  };

  const PLANET_SYMBOLS: Record<string, string> = {
    Sun: "☉", Moon: "☾", Mars: "♂", Mercury: "☿",
    Jupiter: "♃", Venus: "♀", Saturn: "♄"
  };

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center group">
      {/* Central Info */}
      <AnimatePresence>
        {hoveredPlanet && hoveredPos && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute z-10 bg-background/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl pointer-events-none"
            style={{ 
              left: hoveredPos.x > center ? 'auto' : hoveredPos.x + 20, 
              right: hoveredPos.x > center ? size - hoveredPos.x + 20 : 'auto',
              top: hoveredPos.y - 40
            }}
          >
            {planets.filter(p => p.name === hoveredPlanet).map(p => (
              <div key={p.name}>
                <div className="font-serif text-gold text-lg flex items-center gap-2">
                  {PLANET_SYMBOLS[p.name]} {p.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {p.sign} {Math.floor(p.degree)}°{Math.round((p.degree % 1) * 60)}'
                </div>
                {p.isRetrograde && <div className="text-xs text-red-400 mt-1">Retrograde</div>}
                {p.status !== 'Neutral' && <div className="text-xs text-primary mt-1">{p.status}</div>}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        
        {/* Zodiac Ring Background */}
        <circle cx={center} cy={center} r={radius} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="40" />
        <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />

        {/* Signs */}
        {SIGNS.map((sign: string, i: number) => {
          const startAngle = i * 30;
          const endAngle = (i + 1) * 30;
          const midAngle = startAngle + 15;
          
          // Separator lines
          const p1 = getCoords(startAngle, radius + 20);
          const p2 = getCoords(startAngle, innerRadius);
          
          // Label position
          const labelPos = getCoords(midAngle, radius);

          return (
            <g key={sign} className="group/sign">
              <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="currentColor" strokeOpacity="0.1" />
              <text 
                x={labelPos.x} 
                y={labelPos.y} 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fontSize="10"
                fill="currentColor"
                opacity="0.7"
                transform={`rotate(${midAngle}, ${labelPos.x}, ${labelPos.y})`}
                className="select-none group-hover/sign:opacity-100 group-hover/sign:fill-gold transition-colors"
              >
                {sign.substring(0, 3).toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Planets */}
        {planets.map((p) => {
          const pos = getCoords(p.longitude, innerRadius - 25);
          
          return (
            <motion.g 
              key={p.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="cursor-pointer"
              onMouseEnter={() => {
                setHoveredPlanet(p.name);
                setHoveredPos(pos);
              }}
              onMouseLeave={() => {
                setHoveredPlanet(null);
                setHoveredPos(null);
              }}
            >
              <line 
                x1={center} 
                y1={center} 
                x2={pos.x} 
                y2={pos.y} 
                stroke="currentColor" 
                strokeOpacity="0.05" 
                strokeDasharray="2 2"
              />
              
              {/* Interactive Hit Area */}
              <circle cx={pos.x} cy={pos.y} r="15" fill="transparent" />
              
              <circle 
                cx={pos.x} 
                cy={pos.y} 
                r="12" 
                fill="var(--color-card)" 
                stroke={hoveredPlanet === p.name ? "var(--color-primary)" : "var(--color-border)"}
                strokeWidth={hoveredPlanet === p.name ? 2 : 1}
                className="transition-colors duration-300"
              />
              <text 
                x={pos.x} 
                y={pos.y + 1} 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fontSize="14"
                fill={p.status === 'Exalted' ? 'var(--color-primary)' : p.status === 'Debilitated' ? 'var(--color-destructive)' : 'currentColor'}
                className="font-serif select-none pointer-events-none"
              >
                {PLANET_SYMBOLS[p.name]}
              </text>
            </motion.g>
          );
        })}
        
        {/* Center decoration */}
        <circle cx={center} cy={center} r="10" fill="currentColor" fillOpacity="0.05" />
        <circle cx={center} cy={center} r="2" fill="currentColor" fillOpacity="0.5" />
      </svg>
    </div>
  );
}
