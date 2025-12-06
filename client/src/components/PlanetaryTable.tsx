import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlanetStatus } from "@/lib/astronomy";
import { Switch } from "@/components/ui/switch";
import { 
  Sun, Moon, Crown, Anchor, Activity, Shield, 
  ArrowUpCircle, ArrowDownCircle, Repeat,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanetaryTableProps {
  planets: PlanetStatus[];
  useSidereal?: boolean;
  onToggleSystem?: (val: boolean) => void;
}

const PLANET_SYMBOLS: Record<string, string> = {
  Sun: "☉", Moon: "☾", Mars: "♂", Mercury: "☿",
  Jupiter: "♃", Venus: "♀", Saturn: "♄"
};

export function PlanetaryTable({ planets, useSidereal, onToggleSystem }: PlanetaryTableProps) {
  return (
    <div className="bg-card/50 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div>
           <h3 className="text-xl font-serif text-gold">Sidereal Dignities</h3>
           <span className="text-xs text-muted-foreground">
             {useSidereal ? "Lahiri Ayanamsha" : "Tropical Zodiac"}
           </span>
        </div>
        {onToggleSystem !== undefined && (
           <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
              <span className={`text-xs ${!useSidereal ? 'text-primary' : 'text-muted-foreground'}`}>Tropical</span>
              <Switch checked={useSidereal} onCheckedChange={onToggleSystem} />
              <span className={`text-xs ${useSidereal ? 'text-primary' : 'text-muted-foreground'}`}>Sidereal</span>
           </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="hover:bg-transparent border-white/5">
              <TableHead className="w-[100px] text-gold font-serif">Planet</TableHead>
              <TableHead className="text-gold font-serif">Position</TableHead>
              <TableHead className="text-gold font-serif text-right">Dignity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {planets.map((planet) => (
              <TableRow key={planet.name} className="hover:bg-white/5 border-white/5 transition-colors">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-muted-foreground font-serif">{PLANET_SYMBOLS[planet.name]}</span>
                    {planet.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-foreground flex items-center gap-1.5">
                      {planet.sign} {Math.floor(planet.degree)}°{Math.round((planet.degree % 1) * 60)}'
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                       {planet.isRetrograde && (
                        <span className="text-[10px] text-red-400 font-bold px-1 py-0.5 bg-red-400/10 rounded flex items-center gap-1">
                          <Repeat className="w-2.5 h-2.5" /> Rx
                        </span>
                      )}
                      {planet.speed < 0 && <span className="text-[10px] text-muted-foreground opacity-50">Retrograde Motion</span>}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {planet.status === 'Neutral' ? (
                    <span className="text-muted-foreground opacity-30">-</span>
                  ) : (
                    <span className={cn(
                        "px-2 py-1 rounded text-xs font-medium border inline-flex items-center gap-1",
                        planet.status === "Exalted"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : planet.status === "Debilitated"
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : planet.status === "Own Sign"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-white/5 text-muted-foreground border-transparent"
                      )}>
                      {planet.status === "Exalted" && <ArrowUpCircle className="w-3 h-3" />}
                      {planet.status === "Debilitated" && <ArrowDownCircle className="w-3 h-3" />}
                      {planet.status === "Own Sign" && <Crown className="w-3 h-3" />}
                      {planet.status}
                      {planet.exact && <span className="ml-1 opacity-70">*</span>}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
