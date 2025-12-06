import { motion } from "framer-motion";
import { PlanetStatus } from "@/lib/astronomy";
import { cn } from "@/lib/utils";

interface PlanetaryTableProps {
  planets: PlanetStatus[];
}

export function PlanetaryTable({ planets }: PlanetaryTableProps) {
  return (
    <div className="bg-card/50 border border-white/5 rounded-xl p-6 backdrop-blur-md">
      <h3 className="text-xl font-serif text-gold mb-4">Planetary Dignities</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-white/5">
              <th className="pb-3 font-normal">Planet</th>
              <th className="pb-3 font-normal">Sign</th>
              <th className="pb-3 font-normal">Degree</th>
              <th className="pb-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {planets.map((p) => (
              <tr key={p.name} className="border-b border-white/5 last:border-0 group">
                <td className="py-3 font-medium">{p.name}</td>
                <td className="py-3 text-muted-foreground group-hover:text-foreground transition-colors">
                  {p.sign}
                </td>
                <td className="py-3 font-mono text-xs text-muted-foreground">
                  {Math.floor(p.degree)}° {Math.round((p.degree % 1) * 60)}'
                </td>
                <td className="py-3">
                  <span
                    className={cn(
                      "px-2 py-1 rounded text-xs font-medium border",
                      p.status === "Exalted"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : p.status === "Debilitated"
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : p.status === "Own Sign"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-white/5 text-muted-foreground border-transparent"
                    )}
                  >
                    {p.status} {p.exact && "★"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
