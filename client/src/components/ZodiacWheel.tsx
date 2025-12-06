import { motion } from "framer-motion";
import { PlanetStatus } from "@/lib/astronomy";
import { SIGNS } from "@/lib/constants";

interface ZodiacWheelProps {
  planets: PlanetStatus[];
}

export function ZodiacWheel({ planets }: ZodiacWheelProps) {
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
    <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center">
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
            <g key={sign}>
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
              >
                {sign.substring(0, 3).toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Planets */}
        {planets.map((p) => {
          const pos = getCoords(p.longitude, innerRadius - 20);
          // Add some random offset if multiple planets are close? 
          // For simple visualization, we just place them.
          
          return (
            <motion.g 
              key={p.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <line 
                x1={center} 
                y1={center} 
                x2={pos.x} 
                y2={pos.y} 
                stroke="currentColor" 
                strokeOpacity="0.1" 
                strokeDasharray="2 2"
              />
              <circle cx={pos.x} cy={pos.y} r="12" fill="var(--color-card)" stroke="var(--color-border)" />
              <text 
                x={pos.x} 
                y={pos.y + 1} 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fontSize="14"
                fill={p.status === 'Exalted' ? 'var(--color-primary)' : p.status === 'Debilitated' ? 'var(--color-destructive)' : 'currentColor'}
                className="font-serif"
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
