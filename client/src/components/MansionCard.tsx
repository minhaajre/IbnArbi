import { motion } from "framer-motion";
import { IBN_ARABI_MANSIONS } from "@/lib/constants";
import { Moon, Sparkles, Scroll } from "lucide-react";

interface MansionCardProps {
  mansion: typeof IBN_ARABI_MANSIONS[0];
}

export function MansionCard({ mansion }: MansionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/50 border border-border rounded-xl p-6 backdrop-blur-md relative overflow-hidden h-full flex flex-col"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl font-arabic select-none pointer-events-none">
        {mansion.arabic}
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono text-primary/80 uppercase tracking-widest flex items-center gap-2">
            <Moon className="w-3 h-3" />
            Station {mansion.number}
          </span>
          <div className="h-px bg-border flex-1" />
        </div>

        <h2 className="text-3xl font-serif text-gold mb-1 leading-tight">
          {mansion.name}
        </h2>
        <h3 className="text-xl font-arabic mb-4 text-muted-foreground">
          {mansion.arabic}
        </h3>

        <div className="space-y-4 text-sm text-muted-foreground/90 font-light leading-relaxed flex-1">
          <div className="flex gap-3">
            <Sparkles className="w-4 h-4 mt-0.5 text-primary/50 shrink-0" />
            <div>
              <strong className="text-foreground block mb-0.5 font-medium text-xs uppercase tracking-wide opacity-70">Meaning</strong>
              {mansion.meaning}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Scroll className="w-4 h-4 mt-0.5 text-primary/50 shrink-0" />
            <div>
              <strong className="text-foreground block mb-0.5 font-medium text-xs uppercase tracking-wide opacity-70">Divine Attribute</strong>
              {mansion.attribute}
            </div>
          </div>

          <div className="pt-4 border-t border-border mt-auto">
            <p className="italic opacity-80 text-xs leading-relaxed">"{mansion.description}"</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
