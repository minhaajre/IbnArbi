import { motion, AnimatePresence } from "framer-motion";
import { PlanetStatus } from "@/lib/astronomy";
import { SIGNS, SIGN_DATA, getCriticalDegree, PLANET_ARABIC, DIGNITY_ARABIC, UI_LABELS_ARABIC } from "@/lib/constants";
import { useState, useMemo, useEffect } from "react";
import { Flame, Mountain, Wind, Droplets, Sun as SunIcon, Moon as MoonIcon, Leaf, Snowflake, Flower2, CircleDot, Triangle, Mars } from "lucide-react";

interface ZodiacWheelProps {
  planets: PlanetStatus[];
  variant?: "compact" | "expanded";
  gregorianDate?: string;
  hijriDate?: string;
  currentTime?: string;
  moonPhaseLabel?: string;
  isWaxing?: boolean;
}

const ELEMENT_COLORS = {
  Fire: { fill: "rgba(239, 68, 68, 0.15)", stroke: "rgb(239, 68, 68)", glow: "rgba(239, 68, 68, 0.4)" },
  Earth: { fill: "rgba(34, 197, 94, 0.15)", stroke: "rgb(34, 197, 94)", glow: "rgba(34, 197, 94, 0.4)" },
  Air: { fill: "rgba(251, 191, 36, 0.15)", stroke: "rgb(251, 191, 36)", glow: "rgba(251, 191, 36, 0.4)" },
  Water: { fill: "rgba(59, 130, 246, 0.15)", stroke: "rgb(59, 130, 246)", glow: "rgba(59, 130, 246, 0.4)" }
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

const CRITICAL_DEGREE_COLORS = {
  first: "#22c55e",
  anaretic: "#ef4444",
  cardinal_critical: "#f59e0b",
  fixed_critical: "#8b5cf6",
  mutable_critical: "#06b6d4"
};

function ElementIcon({ element, size = 12 }: { element: string; size?: number }) {
  const props = { className: "inline-block", style: { width: size, height: size } };
  switch (element) {
    case "Fire": return <Flame {...props} style={{ ...props.style, color: ELEMENT_COLORS.Fire.stroke }} />;
    case "Earth": return <Mountain {...props} style={{ ...props.style, color: ELEMENT_COLORS.Earth.stroke }} />;
    case "Air": return <Wind {...props} style={{ ...props.style, color: ELEMENT_COLORS.Air.stroke }} />;
    case "Water": return <Droplets {...props} style={{ ...props.style, color: ELEMENT_COLORS.Water.stroke }} />;
    default: return null;
  }
}

function SeasonIcon({ season, size = 12 }: { season: string; size?: number }) {
  const props = { className: "inline-block text-muted-foreground", style: { width: size, height: size } };
  switch (season) {
    case "Spring": return <Flower2 {...props} style={{ ...props.style, color: "#22c55e" }} />;
    case "Summer": return <SunIcon {...props} style={{ ...props.style, color: "#f59e0b" }} />;
    case "Autumn": return <Leaf {...props} style={{ ...props.style, color: "#f97316" }} />;
    case "Winter": return <Snowflake {...props} style={{ ...props.style, color: "#60a5fa" }} />;
    default: return null;
  }
}

function PolarityIcon({ polarity, size = 12 }: { polarity: string; size?: number }) {
  const props = { className: "inline-block", style: { width: size, height: size } };
  if (polarity === "Masculine") {
    return <Mars {...props} style={{ ...props.style, color: "#f59e0b" }} />;
  }
  return <CircleDot {...props} style={{ ...props.style, color: "#a78bfa" }} />;
}

function ModalityIcon({ modality, size = 12 }: { modality: string; size?: number }) {
  const props = { className: "inline-block text-muted-foreground", style: { width: size, height: size } };
  switch (modality) {
    case "Cardinal": return <Triangle {...props} style={{ ...props.style, color: "#ef4444" }} />;
    case "Fixed": return <div style={{ width: size, height: size, backgroundColor: "#22c55e", borderRadius: 2 }} />;
    case "Mutable": return <Wind {...props} style={{ ...props.style, color: "#3b82f6" }} />;
    default: return null;
  }
}

export function ZodiacWheel({ 
  planets, 
  variant = "compact",
  gregorianDate,
  hijriDate,
  currentTime,
  moonPhaseLabel,
  isWaxing
}: ZodiacWheelProps) {
  const [hoveredSign, setHoveredSign] = useState<string | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  
  // Animate rotation based on time
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.02) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const size = variant === "expanded" ? 580 : 400;
  const center = size / 2;
  const outerRadius = size / 2 - 10;
  const signRingWidth = variant === "expanded" ? 50 : 40;
  const innerRadius = outerRadius - signRingWidth;

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

  const planetPositions = useMemo(() => {
    const minDistance = variant === "expanded" ? 38 : 32;
    const orbits = variant === "expanded" 
      ? [innerRadius - 28, innerRadius - 68, innerRadius - 108]
      : [innerRadius - 22, innerRadius - 58, innerRadius - 94];
    
    const sorted = [...planets].sort((a, b) => a.longitude - b.longitude);
    
    const positions = sorted.map((planet) => {
      const normalizedLong = ((planet.longitude % 360) + 360) % 360;
      const criticalDegree = getCriticalDegree(planet.degree, planet.sign);
      return {
        planet,
        angle: normalizedLong,
        radius: orbits[0],
        orbitIndex: 0,
        criticalDegree
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
  }, [planets, innerRadius, variant]);

  const hoveredSignData = hoveredSign ? SIGN_DATA[hoveredSign] : null;
  const hoveredPlanetData = hoveredPlanet ? planets.find(p => p.name === hoveredPlanet) : null;
  const hoveredPlanetCritical = hoveredPlanetData ? getCriticalDegree(hoveredPlanetData.degree, hoveredPlanetData.sign) : null;
  
  // Calculate tooltip position for hovered planet
  const hoveredPlanetPos = useMemo(() => {
    if (!hoveredPlanet) return null;
    const planetInfo = planetPositions.find(p => p.planet.name === hoveredPlanet);
    if (!planetInfo) return null;
    const pos = getCoords(planetInfo.angle, planetInfo.radius);
    // Convert SVG coordinates to percentage
    return {
      x: (pos.x / size) * 100,
      y: (pos.y / size) * 100
    };
  }, [hoveredPlanet, planetPositions, size]);
  
  // Calculate tooltip position for hovered sign (at the middle of the sign arc)
  const hoveredSignPos = useMemo(() => {
    if (!hoveredSign) return null;
    const signIndex = SIGNS.indexOf(hoveredSign);
    if (signIndex === -1) return null;
    const midAngle = signIndex * 30 + 15;
    const pos = getCoords(midAngle, outerRadius - signRingWidth / 2);
    return {
      x: (pos.x / size) * 100,
      y: (pos.y / size) * 100
    };
  }, [hoveredSign, size, outerRadius, signRingWidth]);

  return (
    <div className="relative w-full max-w-2xl mx-auto" data-testid="zodiac-wheel">
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
          <filter id="criticalGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
        <circle cx={center} cy={center} r={innerRadius - 20} fill="none" stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx={center} cy={center} r={innerRadius - 56} fill="none" stroke="currentColor" strokeOpacity="0.04" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx={center} cy={center} r={innerRadius - 92} fill="none" stroke="currentColor" strokeOpacity="0.03" strokeWidth="1" strokeDasharray="2 4" />

        {Array.from({ length: 12 }).map((_, i) => {
          const angle = i * 30;
          const outerPoint = getCoords(angle, outerRadius);
          return (
            <line
              key={`house-line-${i}`}
              x1={center}
              y1={center}
              x2={outerPoint.x}
              y2={outerPoint.y}
              stroke="currentColor"
              strokeOpacity="0.15"
              strokeWidth="1"
            />
          );
        })}

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
                fontSize={variant === "expanded" ? "18" : "16"}
                fill={isHovered ? elementColor.stroke : "currentColor"}
                opacity={isHovered ? 1 : 0.6}
                className="select-none font-serif transition-all duration-200"
              >
                {signInfo.symbol}
              </text>
            </g>
          );
        })}

        {planetPositions.map(({ planet, angle, radius, criticalDegree }) => {
          const pos = getCoords(angle, radius);
          const isHovered = hoveredPlanet === planet.name;
          const planetColor = PLANET_COLORS[planet.name] || "#888";
          const isSun = planet.name === "Sun";
          const circleSize = isSun ? (variant === "expanded" ? 18 : 15) : (variant === "expanded" ? 14 : 12);
          const hasCritical = criticalDegree !== null;
          const criticalColor = hasCritical ? CRITICAL_DEGREE_COLORS[criticalDegree.type!] : null;
          
          return (
            <g
              key={planet.name}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPlanet(planet.name)}
              onMouseLeave={() => setHoveredPlanet(null)}
              filter={hasCritical ? "url(#criticalGlow)" : (isHovered ? "url(#glow)" : "url(#planetShadow)")}
            >
              <motion.circle 
                cx={pos.x} 
                cy={pos.y} 
                r="18" 
                fill="transparent"
                animate={{ cx: pos.x, cy: pos.y }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
              />
              
              {hasCritical && (
                <motion.circle
                  animate={{ cx: pos.x, cy: pos.y, rotate: 360 }}
                  initial={{ cx: pos.x, cy: pos.y }}
                  transition={{ 
                    cx: { type: "spring", stiffness: 60, damping: 15 },
                    cy: { type: "spring", stiffness: 60, damping: 15 },
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                  }}
                  r={circleSize + 4}
                  fill="none"
                  stroke={criticalColor!}
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                />
              )}
              
              <motion.circle
                animate={{ cx: pos.x, cy: pos.y }}
                initial={{ cx: pos.x, cy: pos.y, opacity: 0, scale: 0 }}
                transition={{ 
                  cx: { type: "spring", stiffness: 60, damping: 15 },
                  cy: { type: "spring", stiffness: 60, damping: 15 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.4, type: "spring" }
                }}
                r={circleSize}
                fill="var(--color-card)"
                stroke={hasCritical ? criticalColor! : (isHovered ? planetColor : "var(--color-border)")}
                strokeWidth={hasCritical ? 2.5 : (isHovered ? 2 : 1)}
                className="transition-colors duration-200"
              />
              
              <motion.text
                animate={{ x: pos.x, y: pos.y + 1 }}
                initial={{ x: pos.x, y: pos.y + 1 }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={isSun ? (variant === "expanded" ? 16 : 14) : (variant === "expanded" ? 14 : 12)}
                fill={planetColor}
                className="font-serif select-none pointer-events-none"
              >
                {PLANET_SYMBOLS[planet.name]}
              </motion.text>
              
              {planet.isRetrograde && (
                <motion.text
                  animate={{ x: pos.x + circleSize + 1, y: pos.y - circleSize + 1 }}
                  initial={{ x: pos.x + circleSize + 1, y: pos.y - circleSize + 1 }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                  fontSize="7"
                  fill="#ef4444"
                  className="font-bold pointer-events-none"
                >
                  R
                </motion.text>
              )}
              
              {/* Permanent status label below planet */}
              <motion.text
                animate={{ x: pos.x, y: pos.y + circleSize + 10 }}
                initial={{ x: pos.x, y: pos.y + circleSize + 10 }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={variant === "expanded" ? "8" : "7"}
                fill="currentColor"
                fillOpacity="0.6"
                className="font-mono pointer-events-none select-none"
              >
                {Math.floor(planet.degree)}°
              </motion.text>
              
              {/* Dignity indicator */}
              {planet.status !== 'Neutral' && (
                <motion.text
                  animate={{ x: pos.x, y: pos.y + circleSize + (variant === "expanded" ? 19 : 17) }}
                  initial={{ x: pos.x, y: pos.y + circleSize + (variant === "expanded" ? 19 : 17) }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={variant === "expanded" ? "7" : "6"}
                  fill={planet.status === 'Exalted' || planet.status === 'Rulership' ? '#22c55e' : '#f59e0b'}
                  className="font-medium pointer-events-none select-none"
                >
                  {planet.status === 'Exalted' ? '↑' : planet.status === 'Rulership' ? '♔' : planet.status === 'Fall' ? '↓' : '✕'}
                </motion.text>
              )}
            </g>
          );
        })}

        <circle cx={center} cy={center} r="6" fill="currentColor" fillOpacity="0.6" />
        <circle cx={center} cy={center} r="2" fill="var(--color-background)" />
      </svg>


      <AnimatePresence>
        {hoveredSignData && hoveredSign && !hoveredPlanet && hoveredSignPos && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute -translate-x-1/2 -translate-y-full bg-card/95 backdrop-blur-md border border-border px-4 py-3 rounded-lg shadow-lg text-center min-w-[180px] z-20 pointer-events-none"
            style={{
              left: `${hoveredSignPos.x}%`,
              top: `${hoveredSignPos.y}%`,
              marginTop: '-20px'
            }}
          >
            <div className="font-serif text-lg text-primary mb-0.5">
              {SIGN_DATA[hoveredSign].symbol} {hoveredSign}
            </div>
            <div className="text-base font-arabic text-primary/80 mb-1">
              {hoveredSignData.arabic}
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              {hoveredSignData.dates}
            </div>
            <div className="flex items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-1" title={hoveredSignData.element}>
                <ElementIcon element={hoveredSignData.element} size={14} />
              </div>
              <div className="flex items-center gap-1" title={hoveredSignData.modality}>
                <ModalityIcon modality={hoveredSignData.modality} size={14} />
              </div>
              <div className="flex items-center gap-1" title={hoveredSignData.polarity}>
                <PolarityIcon polarity={hoveredSignData.polarity} size={14} />
              </div>
              <div className="flex items-center gap-1" title={hoveredSignData.season}>
                <SeasonIcon season={hoveredSignData.season} size={14} />
              </div>
            </div>
            <div className="text-xs mt-1.5 text-muted-foreground">
              Ruled by <span className="text-primary font-medium">{hoveredSignData.ruler}</span>
              <span className="font-arabic ml-1 text-primary/70">({PLANET_ARABIC[hoveredSignData.ruler]?.arabic})</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hoveredPlanetData && hoveredPlanetPos && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute -translate-x-1/2 -translate-y-full bg-card/95 backdrop-blur-md border border-border px-4 py-2 rounded-lg shadow-lg text-center min-w-[160px] z-20 pointer-events-none"
            style={{
              left: `${hoveredPlanetPos.x}%`,
              top: `${hoveredPlanetPos.y}%`,
              marginTop: '-20px'
            }}
          >
            <div className="font-serif text-base flex items-center justify-center gap-2" style={{ color: PLANET_COLORS[hoveredPlanetData.name] }}>
              {PLANET_SYMBOLS[hoveredPlanetData.name]} {hoveredPlanetData.name}
            </div>
            <div className="text-sm font-arabic" style={{ color: PLANET_COLORS[hoveredPlanetData.name] }}>
              {PLANET_ARABIC[hoveredPlanetData.name]?.arabic}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {hoveredPlanetData.sign} {Math.floor(hoveredPlanetData.degree)}°{Math.round((hoveredPlanetData.degree % 1) * 60)}'
              <span className="font-arabic ml-1 text-muted-foreground/70">({SIGN_DATA[hoveredPlanetData.sign]?.arabic})</span>
            </div>
            {hoveredPlanetData.isRetrograde && (
              <div className="text-xs text-red-500 font-medium mt-0.5">
                Retrograde <span className="font-arabic">{UI_LABELS_ARABIC["Retrograde"]}</span>
              </div>
            )}
            <div className={`text-xs font-medium mt-0.5 ${hoveredPlanetData.status === 'Exalted' || hoveredPlanetData.status === 'Rulership' ? 'text-green-500' : hoveredPlanetData.status === 'Neutral' ? 'text-muted-foreground' : 'text-amber-500'}`}>
              {hoveredPlanetData.status} <span className="font-arabic">{DIGNITY_ARABIC[hoveredPlanetData.status]?.arabic || ''}</span>
            </div>
            {hoveredPlanetCritical && (
              <div 
                className="text-xs font-medium mt-1 px-2 py-0.5 rounded-full" 
                style={{ 
                  backgroundColor: `${CRITICAL_DEGREE_COLORS[hoveredPlanetCritical.type!]}20`,
                  color: CRITICAL_DEGREE_COLORS[hoveredPlanetCritical.type!]
                }}
              >
                {hoveredPlanetCritical.label}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
