import { motion } from "framer-motion";
import { IBN_ARABI_MANSIONS } from "@/lib/constants";

interface MansionCardProps {
  mansion: typeof IBN_ARABI_MANSIONS[0];
}

export function MansionCard({ mansion }: MansionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/50 border border-white/5 rounded-xl p-6 backdrop-blur-md relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-arabic select-none pointer-events-none">
        {mansion.arabic}
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono text-primary/80 uppercase tracking-widest">
            Lunar Mansion {mansion.number}
          </span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <h2 className="text-4xl font-serif text-gold mb-1">
          {mansion.name}
        </h2>
        <h3 className="text-xl font-arabic mb-4 text-muted-foreground">
          {mansion.arabic}
        </h3>

        <div className="space-y-4 text-sm text-muted-foreground/90 font-light leading-relaxed">
          <div>
            <strong className="text-foreground block mb-1 font-medium">Meaning</strong>
            {mansion.meaning}
          </div>
          
          <div>
            <strong className="text-foreground block mb-1 font-medium">Divine Attribute</strong>
            {mansion.attribute}
          </div>

          <div>
            <strong className="text-foreground block mb-1 font-medium">Letter</strong>
            {mansion.letter}
          </div>

          <div className="pt-2 border-t border-white/5 mt-4">
            <p className="italic opacity-80">"{mansion.description}"</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
