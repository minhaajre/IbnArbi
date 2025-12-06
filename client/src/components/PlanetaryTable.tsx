import { motion } from "framer-motion";
import { PlanetStatus } from "@/lib/astronomy";
import { cn } from "@/lib/utils";
import { 
  Sun, Moon, Crown, Anchor, Activity, Shield, 
  ArrowUpCircle, ArrowDownCircle, Repeat, AlertCircle,
  Star
} from "lucide-react";

// Custom planet icons (using Lucide as base or custom SVG)
const PLANET_ICONS: Record<string, any> = {
  Sun: Sun,
  Moon: Moon,
  // For others we use generic for now, or specific mappings if we had a full icon set
  Mars: Shield,
  Mercury: Activity,
  Jupiter: Crown,
  Venus: Star,
  Saturn: Anchor
};

const PLANET_SYMBOLS: Record<string, string> = {
  Sun: "☉",
  Moon: "☾",
  Mars: "♂",
  Mercury: "☿",
  Jupiter: "♃",
  Venus: "♀",
  Saturn: "♄"
};

interface PlanetaryTableProps {
  planets: PlanetStatus[];
}

export function PlanetaryTable({ planets }: PlanetaryTableProps) {
  return (
    <div className="bg-card/50 border border-white/5 rounded-xl p-6 backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-serif text-gold">Sidereal Dignities</h3>
        <span className="text-xs text-muted-foreground border border-white/10 px-2 py-1 rounded bg-black/20">
          Lahiri Ayanamsha
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-white/5">
              <th className="pb-3 font-normal pl-2">Planet</th>
              <th className="pb-3 font-normal">Sign</th>
              <th className="pb-3 font-normal">Degree</th>
              <th className="pb-3 font-normal">Motion</th>
              <th className="pb-3 font-normal text-right pr-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {planets.map((p) => {
              const Icon = PLANET_ICONS[p.name] || Star;
              return (
                <tr key={p.name} className="border-b border-white/5 last:border-0 group hover:bg-white/5 transition-colors">
                  <td className="py-3 font-medium pl-2">
                    <div className="flex items-center gap-3">
                      <span className="text-lg opacity-70 font-serif w-4">{PLANET_SYMBOLS[p.name]}</span>
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground group-hover:text-foreground transition-colors">
                    {p.sign}
                  </td>
                  <td className="py-3 font-mono text-xs text-muted-foreground">
                    {Math.floor(p.degree)}° {Math.round((p.degree % 1) * 60)}'
                  </td>
                  <td className="py-3">
                    {p.isRetrograde ? (
                      <span className="flex items-center gap-1 text-red-400 text-xs bg-red-500/10 px-2 py-0.5 rounded w-fit">
                        <Repeat className="w-3 h-3" />
                        Rx
                      </span>
                    ) : (
                      <span className="text-muted-foreground/50 text-xs">Direct</span>
                    )}
                  </td>
                  <td className="py-3 text-right pr-2">
                    <span
                      className={cn(
                        "px-2 py-1 rounded text-xs font-medium border inline-flex items-center gap-1",
                        p.status === "Exalted"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : p.status === "Debilitated"
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : p.status === "Own Sign"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-white/5 text-muted-foreground border-transparent"
                      )}
                    >
                      {p.status === "Exalted" && <ArrowUpCircle className="w-3 h-3" />}
                      {p.status === "Debilitated" && <ArrowDownCircle className="w-3 h-3" />}
                      {p.status === "Own Sign" && <Crown className="w-3 h-3" />}
                      {p.status} {p.exact && "★"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
