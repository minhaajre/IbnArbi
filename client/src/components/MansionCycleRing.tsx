import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IBN_ARABI_MANSIONS } from "@/lib/constants";

interface MansionCycleRingProps {
  mansionNumber: number;
  onMansionSelect?: (mansionNumber: number) => void;
  selectedMansion?: number | null;
}

export function MansionCycleRing({ mansionNumber, onMansionSelect, selectedMansion: controlledSelectedMansion }: MansionCycleRingProps) {
  const isControlled = controlledSelectedMansion !== undefined;
  const [selectedMansion, setSelectedMansion] = useState<number | null>(null);
  const selected = isControlled ? controlledSelectedMansion : selectedMansion;
  const containerRef = useRef<HTMLDivElement>(null);
  const positions = Array.from({ length: 28 }, (_, i) => i + 1);

  const getMansionData = (position: number) => {
    return IBN_ARABI_MANSIONS[position - 1];
  };

  const getCategory = (position: number) => {
    if (position >= 1 && position <= 11) return "Gathering";
    if (position >= 12 && position <= 16) return "Differentiating";
    return "Separating";
  };

  const getMansionColor = (position: number) => {
    const category = getCategory(position);
    const categoryColorMap: Record<string, { bg: string; border: string; text: string; light: string }> = {
      "Gathering": {
        bg: "bg-emerald-500",
        border: "border-emerald-500",
        text: "text-emerald-400",
        light: "text-emerald-100 dark:text-emerald-900",
      },
      "Differentiating": {
        bg: "bg-cyan-500",
        border: "border-cyan-500",
        text: "text-cyan-400",
        light: "text-cyan-100 dark:text-cyan-900",
      },
      "Separating": {
        bg: "bg-amber-500",
        border: "border-amber-500",
        text: "text-amber-400",
        light: "text-amber-100 dark:text-amber-900",
      },
    };
    const colors = categoryColorMap[category];
    return {
      bg: colors.bg,
      border: colors.border,
      text: colors.text,
      highlight: colors.text,
      statusText: category,
      light: colors.light,
    };
  };

  const handleTreeClick = (position: number) => {
    if (!isControlled) {
      setSelectedMansion(position);
    }
    if (onMansionSelect) {
      onMansionSelect(position);
    }
  };

  // Close card when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (!isControlled) {
          setSelectedMansion(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isControlled]);

  const displayedMansion = selected ? getMansionData(selected) : getMansionData(mansionNumber);
  const displayNumber = selected || mansionNumber;
  const displayColor = getMansionColor(displayNumber);

  // Inline tree SVG that can be colored
  const TreeIcon = ({ color, size = 32 }: { color: string; size?: number }) => (
    <svg
      viewBox="0 0 200 240"
      width={size}
      height={size}
      fill={color}
      opacity="0.9"
      className="drop-shadow"
    >
      {/* Trunk */}
      <path d="M 85 160 Q 85 180 95 200 Q 100 210 105 200 Q 115 180 115 160 Z" fill={color} />
      {/* Main foliage crown */}
      <ellipse cx="100" cy="80" rx="55" ry="65" fill={color} />
      {/* Left branch foliage */}
      <ellipse cx="55" cy="100" rx="35" ry="45" fill={color} opacity="0.9" />
      {/* Right branch foliage */}
      <ellipse cx="145" cy="100" rx="35" ry="45" fill={color} opacity="0.9" />
      {/* Upper left */}
      <ellipse cx="35" cy="60" rx="25" ry="35" fill={color} opacity="0.85" />
      {/* Upper right */}
      <ellipse cx="165" cy="60" rx="25" ry="35" fill={color} opacity="0.85" />
    </svg>
  );

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4">
      <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
        All 28 Lunar Mansions
      </div>

      {/* Grid of tree icons */}
      <div className="grid grid-cols-7 gap-3">
        {positions.map((position) => {
          const colors = getMansionColor(position);
          const isSelected = selected === position;

          return (
            <motion.button
              key={position}
              onClick={() => handleTreeClick(position)}
              animate={{
                scale: isSelected ? 1.2 : 1,
              }}
              transition={{ duration: 0.15 }}
              className={`relative flex flex-col items-center justify-center cursor-pointer group transition-all ${
                isSelected ? "drop-shadow-lg" : ""
              }`}
              data-testid={`mansion-tree-${position}`}
            >
              {/* Tree icon colored by status */}
              <div>
                <TreeIcon color={colors.text === "text-emerald-400" ? "#10b981" : colors.text === "text-cyan-400" ? "#06b6d4" : "#f59e0b"} size={32} />
              </div>

              {/* Mansion number on click */}
              {isSelected && (
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

      {/* Info card - only shows when clicked */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={displayNumber}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`w-full p-4 rounded-lg border-2 ${displayColor.border} ${displayColor.light} bg-foreground/5`}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className={`flex-shrink-0`}>
                <TreeIcon
                  color={displayColor.text === "text-emerald-400" ? "#10b981" : displayColor.text === "text-cyan-400" ? "#06b6d4" : "#f59e0b"}
                  size={36}
                />
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
        )}
      </AnimatePresence>
    </div>
  );
}
