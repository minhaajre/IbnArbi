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
import { PLANET_ARABIC, DIGNITY_ARABIC, SIGN_DATA, UI_LABELS_ARABIC } from "@/lib/constants";

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
    <div className="bg-card/50 border border-border rounded-xl overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
           <h3 className="text-xl font-serif text-gold">Sidereal Dignities</h3>
           <span className="text-xs text-muted-foreground">
             {useSidereal ? "Lahiri Ayanamsha" : "Tropical Zodiac"}
           </span>
        </div>
        {onToggleSystem !== undefined && (
           <div className="flex items-center gap-2 bg-foreground/10 px-3 py-1.5 rounded-lg border border-foreground/10">
              <span className={`text-xs ${!useSidereal ? 'text-primary' : 'text-muted-foreground'}`}>Tropical</span>
              <Switch checked={useSidereal} onCheckedChange={onToggleSystem} />
              <span className={`text-xs ${useSidereal ? 'text-primary' : 'text-muted-foreground'}`}>Sidereal</span>
           </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-foreground/5">
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="w-[100px] text-gold font-serif">Planet <span className="font-arabic text-sm">{UI_LABELS_ARABIC["Planet"]}</span></TableHead>
              <TableHead className="text-gold font-serif">Position <span className="font-arabic text-sm">{UI_LABELS_ARABIC["Sign"]}</span></TableHead>
              <TableHead className="text-gold font-serif text-right">Dignity <span className="font-arabic text-sm">{UI_LABELS_ARABIC["Status"]}</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {planets.map((planet) => (
              <TableRow key={planet.name} className="hover:bg-foreground/5 border-border transition-colors">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-muted-foreground font-serif">{PLANET_SYMBOLS[planet.name]}</span>
                    <div className="flex flex-col">
                      <span>{planet.name}</span>
                      <span className="font-arabic text-xs text-muted-foreground">{PLANET_ARABIC[planet.name]?.arabic}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-foreground flex items-center gap-1.5">
                      {planet.sign} {Math.floor(planet.degree)}°{Math.round((planet.degree % 1) * 60)}'
                    </span>
                    <span className="font-arabic text-xs text-muted-foreground">{SIGN_DATA[planet.sign]?.arabic}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                       {planet.isRetrograde && (
                        <span className="text-[10px] text-foreground font-bold px-1 py-0.5 bg-foreground/10 rounded flex items-center gap-1">
                          <Repeat className="w-2.5 h-2.5" /> {UI_LABELS_ARABIC["Retrograde"]}
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span className="px-2 py-1 rounded text-xs font-medium border inline-flex items-center gap-1 bg-foreground/5 text-foreground border-foreground/20">
                    {planet.status === "Exalted" && <ArrowUpCircle className="w-3 h-3" />}
                    {planet.status === "Fall" && <ArrowDownCircle className="w-3 h-3" />}
                    {planet.status === "Rulership" && <Crown className="w-3 h-3" />}
                    {planet.status === "Detriment" && <Shield className="w-3 h-3" />}
                    <span className="flex flex-col items-end">
                      <span>{planet.status}</span>
                      <span className="font-arabic text-[10px] opacity-80">{DIGNITY_ARABIC[planet.status]?.arabic}</span>
                    </span>
                    {planet.exact && <span className="ml-1 opacity-70">*</span>}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
