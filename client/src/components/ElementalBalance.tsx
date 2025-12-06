import { motion } from "framer-motion";
import { PlanetStatus, ELEMENT_RULES, ELEMENT_ACTIVITIES } from "@/lib/astronomy";
import { Flame, Droplets, Wind, Mountain, Compass } from "lucide-react";

interface ElementalBalanceProps {
  planets: PlanetStatus[];
}

export function ElementalBalance({ planets }: ElementalBalanceProps) {
  // Calculate elemental distribution
  const counts = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  
  planets.forEach(p => {
    if (ELEMENT_RULES.Fire.includes(p.sign)) counts.Fire++;
    else if (ELEMENT_RULES.Earth.includes(p.sign)) counts.Earth++;
    else if (ELEMENT_RULES.Air.includes(p.sign)) counts.Air++;
    else if (ELEMENT_RULES.Water.includes(p.sign)) counts.Water++;
  });

  // Determine dominant element
  let dominant = "Fire";
  let maxCount = -1;
  
  Object.entries(counts).forEach(([element, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominant = element;
    }
  });

  const total = planets.length;

  // Icon mapping
  const icons: Record<string, any> = {
    Fire: Flame,
    Earth: Mountain,
    Air: Wind,
    Water: Droplets
  };

  const colors: Record<string, string> = {
    Fire: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    Earth: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Air: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    Water: "text-blue-400 bg-blue-500/10 border-blue-500/20"
  };

  const DominantIcon = icons[dominant];

  return (
    <div className="bg-card/30 border border-border rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
       <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-gold" />
          <h3 className="text-xl font-serif text-foreground/90">Elemental Balance</h3>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${colors[dominant]}`}>
          <DominantIcon className="w-3 h-3" />
          {dominant} Dominant
        </div>
      </div>

      {/* Needles / Bars */}
      <div className="space-y-3 mb-6">
        {Object.entries(counts).map(([element, count]) => {
          const Icon = icons[element];
          const pct = (count / total) * 100;
          
          return (
            <div key={element} className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Icon className="w-3 h-3 opacity-70" />
                  {element}
                </span>
                <span>{count}</span>
              </div>
              <div className="h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`h-full rounded-full ${colors[element].split(' ')[0].replace('text-', 'bg-')}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendation */}
      <div className="bg-foreground/5 rounded-xl p-4 border border-border">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Recommended Activity</p>
        <p className="text-sm font-light leading-relaxed text-foreground/90">
          {ELEMENT_ACTIVITIES[dominant as keyof typeof ELEMENT_ACTIVITIES]}
        </p>
      </div>

    </div>
  );
}
