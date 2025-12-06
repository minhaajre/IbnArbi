import { motion } from "framer-motion";
import { PlanetStatus, ELEMENT_RULES, ELEMENT_ACTIVITIES } from "@/lib/astronomy";
import { Flame, Droplets, Wind, Mountain } from "lucide-react";

interface ElementalBalanceProps {
  planets: PlanetStatus[];
}

const ELEMENT_CONFIG = {
  Fire: { 
    Icon: Flame, 
    color: "text-orange-400", 
    bg: "bg-orange-500/10", 
    border: "border-orange-500/30",
    glow: "shadow-orange-500/20"
  },
  Earth: { 
    Icon: Mountain, 
    color: "text-emerald-400", 
    bg: "bg-emerald-500/10", 
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/20"
  },
  Air: { 
    Icon: Wind, 
    color: "text-sky-400", 
    bg: "bg-sky-500/10", 
    border: "border-sky-500/30",
    glow: "shadow-sky-500/20"
  },
  Water: { 
    Icon: Droplets, 
    color: "text-blue-400", 
    bg: "bg-blue-500/10", 
    border: "border-blue-500/30",
    glow: "shadow-blue-500/20"
  }
};

export function ElementalBalance({ planets }: ElementalBalanceProps) {
  const counts = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  
  planets.forEach(p => {
    if (ELEMENT_RULES.Fire.includes(p.sign)) counts.Fire++;
    else if (ELEMENT_RULES.Earth.includes(p.sign)) counts.Earth++;
    else if (ELEMENT_RULES.Air.includes(p.sign)) counts.Air++;
    else if (ELEMENT_RULES.Water.includes(p.sign)) counts.Water++;
  });

  let dominant = "Fire";
  let maxCount = -1;
  Object.entries(counts).forEach(([element, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominant = element;
    }
  });

  const DominantConfig = ELEMENT_CONFIG[dominant as keyof typeof ELEMENT_CONFIG];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {(Object.entries(counts) as [keyof typeof ELEMENT_CONFIG, number][]).map(([element, count]) => {
          const config = ELEMENT_CONFIG[element];
          const isDominant = element === dominant;
          
          return (
            <motion.div
              key={element}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`
                rounded-xl p-3 border text-center transition-all
                ${config.bg} ${config.border}
                ${isDominant ? `ring-1 ring-offset-1 ring-offset-background ${config.border.replace('border-', 'ring-')}` : ''}
              `}
            >
              <config.Icon className={`w-6 h-6 mx-auto mb-1.5 ${config.color}`} />
              <div className={`text-2xl font-semibold ${config.color}`}>{count}</div>
              <div className="text-xs text-muted-foreground">{element}</div>
            </motion.div>
          );
        })}
      </div>

      <div className={`rounded-lg px-4 py-3 border ${DominantConfig.bg} ${DominantConfig.border}`}>
        <div className="flex items-center gap-2 mb-1">
          <DominantConfig.Icon className={`w-4 h-4 ${DominantConfig.color}`} />
          <span className={`text-sm font-medium ${DominantConfig.color}`}>{dominant} Dominant</span>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {ELEMENT_ACTIVITIES[dominant as keyof typeof ELEMENT_ACTIVITIES]}
        </p>
      </div>
    </div>
  );
}
