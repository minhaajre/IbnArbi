import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { IBN_ARABI_MANSIONS, UI_LABELS_ARABIC, MANSION_AZKAAR_SUGGESTIONS } from "@/lib/constants";
import { MANSION_GUIDANCE, CYCLE_ROLE_COLORS } from "@/lib/spiritualGuidance";
import { MansionProgress, MoonPhaseInfo } from "@/lib/astronomy";
import { Moon, Sparkles, Scroll, Clock, ArrowRight, Orbit, Star, Check, X, Lightbulb, BookOpen, CheckCircle, XCircle, Compass, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { MansionCycleRing } from "@/components/MansionCycleRing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MansionCardProps {
  mansion: typeof IBN_ARABI_MANSIONS[0];
  progress?: MansionProgress;
  moonPhase?: MoonPhaseInfo;
}

export function MansionCard({ mansion, progress }: MansionCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const isBlessed = mansion.nature === "blessed";
  const guidance = MANSION_GUIDANCE[mansion.number];
  const cycleColors = guidance ? CYCLE_ROLE_COLORS[guidance.cycleRole] : null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-full flex flex-col"
    >
      <div className="absolute top-0 right-0 opacity-[0.03] text-8xl font-arabic select-none pointer-events-none leading-none">
        {mansion.arabic}
      </div>
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-mono text-primary/80 uppercase tracking-widest flex items-center gap-2">
            <Moon className="w-3 h-3" />
            Mansion {mansion.number} <span className="font-arabic">المنزلة {mansion.number}</span>
          </span>
          <div className="h-px bg-border flex-1" />
        </div>

        <h2 className="text-2xl font-serif text-gold mb-1 leading-tight">
          {mansion.name}
        </h2>
        <h3 className="text-lg font-arabic mb-2 text-muted-foreground">
          {mansion.arabic}
        </h3>
        
        {/* Blessed/Challenging + Cycle Role Indicators */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-foreground/10 text-foreground border border-foreground/20" data-testid="mansion-nature-indicator">
            {isBlessed ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
            <span>{isBlessed ? 'Blessed' : 'Challenging'}</span>
          </div>
          
          {/* NEW: Cycle Role Tag */}
          {guidance && cycleColors && (
            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-foreground/10 text-foreground border border-foreground/20" data-testid="mansion-cycle-role">
              <span>{guidance.cycleRole}</span>
              <span className="font-arabic text-[9px]">{guidance.cycleRoleArabic}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {progress && (
          <div className="mb-4 p-3 rounded-lg bg-foreground/5 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Progress <span className="font-arabic">{UI_LABELS_ARABIC["Progress"]}</span></span>
              <span className="text-xs font-mono text-primary">{Math.round(progress.progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden mb-2">
              <motion.div 
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress.progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{UI_LABELS_ARABIC["Next"]} <span className="text-foreground font-medium">{progress.timeUntilNext}</span></span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <ArrowRight className="w-3 h-3" />
                <span className="text-foreground/70">{progress.nextMansion.name}</span>
              </div>
            </div>
            <div className="text-[10px] text-muted-foreground/60 mt-1 text-right">
              {format(progress.nextMansionDate, "MMM d, h:mm a")}
            </div>
          </div>
        )}

        {/* Quick Start Guide */}
        <div className="mb-2 p-2 rounded-lg bg-primary/5 border border-primary/20">
          <div className="text-[9px] font-medium text-primary uppercase tracking-wide mb-1">Working with celestial rhythms</div>
          <div className="space-y-0.5 text-[11px] text-foreground/80">
            <div className="flex gap-1.5">
              <span className="text-primary font-semibold shrink-0">①</span>
              <span><strong>Hour</strong> – What quality is present?</span>
            </div>
            <div className="flex gap-1.5">
              <span className="text-primary font-semibold shrink-0">②</span>
              <span><strong>Mansion</strong> – What lunar phase?</span>
            </div>
            <div className="flex gap-1.5">
              <span className="text-primary font-semibold shrink-0">③</span>
              <span><strong>Reflect</strong> – Consider both.</span>
            </div>
          </div>
        </div>

        {/* Mansion Cycle Ring */}
        <div className="mb-3 flex justify-center">
          <MansionCycleRing 
            mansionNumber={mansion.number}
          />
        </div>

        {/* NEW: Mansion Theme Card with Collapse/Expand */}
        {guidance && (
          <div>
            <div className="mb-3 p-3 rounded-lg bg-card/50 border border-border" data-testid="mansion-theme-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-foreground uppercase tracking-wide">Mansion Theme</span>
                  <span className="text-xs font-arabic text-muted-foreground">{guidance.themeArabic}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-foreground/5"
                  data-testid="toggle-mansion-details"
                >
                  {isExpanded ? "Collapse" : "Expand"}
                  {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {guidance.theme}
              </p>
              <p className="text-xs text-muted-foreground mt-1.5 italic">
                Energy: {guidance.energy === 'beginning' ? 'Beginning / Initiating' : guidance.energy === 'stabilizing' ? 'Stabilizing / Building' : 'Ending / Releasing'}
              </p>
            </div>
          </div>
        )}

        {/* Collapsible Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden space-y-3"
            >
              {/* NEW: May Support / Use Caution With Card */}
              {guidance && (
                <div className="mb-3 p-3 rounded-lg bg-foreground/5 border border-border" data-testid="mansion-guidance-card">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <CheckCircle className="w-3.5 h-3.5 text-foreground/60" />
                        <span className="text-[10px] font-medium text-foreground uppercase tracking-wide">May Support</span>
                      </div>
                      <ul className="space-y-1">
                        {guidance.goodFor.slice(0, 4).map((item, i) => (
                          <li key={i} className="text-xs text-foreground/80 flex items-start gap-1.5">
                            <span className="text-foreground/60 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <XCircle className="w-3.5 h-3.5 text-foreground/60" />
                        <span className="text-[10px] font-medium text-foreground uppercase tracking-wide">Use Caution With</span>
                      </div>
                      <ul className="space-y-1">
                        {guidance.notIdealFor.slice(0, 4).map((item, i) => (
                          <li key={i} className="text-xs text-foreground/60 flex items-start gap-1.5">
                            <span className="text-foreground/60 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* NEW: Suggested Dhikr & Practice Card */}
              {guidance && (
                <div className="mb-3 p-3 rounded-lg bg-primary/5 border border-primary/20" data-testid="mansion-dhikr-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-foreground uppercase tracking-wide">Suggested Dhikr & Practice</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-foreground">{guidance.dhikr.name}</span>
                    <span className="font-arabic text-primary">{guidance.dhikr.nameArabic}</span>
                    <span className="text-xs text-muted-foreground">({guidance.dhikr.meaning})</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Compass className="w-3.5 h-3.5 text-primary/70 mt-0.5 shrink-0" />
                    <p className="text-xs text-foreground/80 leading-relaxed">{guidance.practice}</p>
                  </div>
                  <p className="text-xs font-arabic text-muted-foreground/70 mt-1.5 text-right" dir="rtl">
                    {guidance.practiceArabic}
                  </p>
                </div>
              )}

              {/* Optional Advanced Devotional Suggestions */}
              {MANSION_AZKAAR_SUGGESTIONS[mansion.number] && (
                <div className="mb-3 p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Scroll className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-medium text-foreground uppercase tracking-wide">Optional Advanced Aẓkār</span>
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed italic mb-2">
                    {MANSION_AZKAAR_SUGGESTIONS[mansion.number]}
                  </p>
                  <Link href="/azkaar">
                    <button className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium">
                      Learn more about these litanies
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </Link>
                </div>
              )}

              <div className="space-y-3 text-sm text-muted-foreground/90 font-light leading-relaxed flex-1">
                {/* Suggested Activities - Prominent */}
                {'activities' in mansion && mansion.activities && (
                  <div className="flex gap-3 p-2.5 rounded-lg border bg-foreground/5 border-foreground/20">
                    <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-foreground/60" />
                    <div>
                      <strong className="text-foreground block mb-0.5 font-medium text-xs uppercase tracking-wide opacity-70">
                        Suggested Activities <span className="font-arabic">الأنشطة المقترحة</span>
                      </strong>
                      <span className="text-foreground/80 text-sm">{mansion.activities}</span>
                    </div>
                  </div>
                )}

                <Accordion type="single" collapsible className="space-y-2">
                  {/* Sphere/Realm - Collapsible */}
                  {('sphere' in mansion && mansion.sphere) && (
                    <AccordionItem value="sphere" className="border border-primary/10 rounded-lg bg-primary/5">
                      <AccordionTrigger className="px-3 py-2 hover:no-underline text-xs font-medium text-foreground uppercase tracking-wide opacity-70">
                        <div className="flex items-center gap-2">
                          <Orbit className="w-3.5 h-3.5 text-gold" />
                          <span>Celestial Sphere <span className="font-arabic text-xs">الفلك السماوي</span></span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-2 pt-0 text-sm">
                        <span className="text-gold/90">{mansion.sphere}</span>
                        {'sphereArabic' in mansion && mansion.sphereArabic && (
                          <span className="block font-arabic text-xs text-muted-foreground mt-1.5">{mansion.sphereArabic}</span>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {/* Meaning / Divine Attribute / Arabic Letter - Collapsible */}
                  <AccordionItem value="details" className="border border-border rounded-lg bg-foreground/5">
                    <AccordionTrigger className="px-3 py-2 hover:no-underline text-xs font-medium text-foreground uppercase tracking-wide opacity-70">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-primary/70" />
                        <span>Meaning & Divine Attributes</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-3 pt-1 space-y-2">
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong className="text-foreground text-xs uppercase tracking-wide opacity-70 block mb-0.5">
                            Meaning <span className="font-arabic text-xs">{UI_LABELS_ARABIC["Station Meaning"]}</span>
                          </strong>
                          <span className="text-foreground/90">{mansion.meaning}</span>
                        </div>
                        
                        <div>
                          <strong className="text-foreground text-xs uppercase tracking-wide opacity-70 block mb-0.5">
                            Divine Attribute <span className="font-arabic text-xs">الصفة الإلهية</span>
                          </strong>
                          <span className="text-foreground/90">{mansion.attribute}</span>
                          {'attributeArabic' in mansion && mansion.attributeArabic && (
                            <span className="font-arabic text-xs text-muted-foreground ml-2">{mansion.attributeArabic}</span>
                          )}
                        </div>

                        <div>
                          <strong className="text-foreground text-xs uppercase tracking-wide opacity-70 block mb-0.5">
                            Arabic Letter <span className="font-arabic text-xs">الحرف العربي</span>
                          </strong>
                          <div className="flex items-center gap-2">
                            <span>{mansion.letter} • {mansion.degrees}</span>
                            {'letterArabic' in mansion && mansion.letterArabic && (
                              <span className="font-arabic text-lg text-primary">{mansion.letterArabic}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Ibn Arabi's Cosmology Placement - Collapsible */}
                  <AccordionItem value="quote" className="border border-border rounded-lg bg-foreground/5">
                    <AccordionTrigger className="px-3 py-2 hover:no-underline text-xs font-medium text-foreground uppercase tracking-wide opacity-70">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-primary/70" />
                        <span>Ibn Arabi's Cosmology Placement</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-2 pt-1">
                      <p className="italic opacity-70 text-xs leading-relaxed">"{mansion.description}"</p>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Mansion Wheel Image - Collapsible */}
                  <Accordion type="single" collapsible className="border-0">
                    <AccordionItem value="wheel" className="border-0">
                      <AccordionTrigger className="px-0 py-1 hover:no-underline text-[10px] text-muted-foreground">
                        <span>🔍 Ibn Arabi's 28 Lunar Mansions Wheel <span className="font-arabic">عجلة المنازل</span> (tap to expand)</span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <img 
                          src="/mansionwheel.jpg" 
                          alt="Ibn Arabi's 28 Lunar Mansions Wheel" 
                          className="w-full rounded-lg border border-border opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                          data-testid="mansion-wheel-image"
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Accordion>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
