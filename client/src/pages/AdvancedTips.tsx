import { Link } from "wouter";
import { useEffect } from "react";
import { ArrowLeft, Brain, Heart, Lightbulb, RefreshCw, Eye, Users, Droplets, Home, MessageCircle, Waves, Clock, Zap, Moon, Wind, Flame, AlertCircle, CheckCircle, Compass, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableOfContents, TOCSection } from "@/components/TableOfContents";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ADVANCED_TIPS_SECTIONS: TOCSection[] = [
  { id: "intro", title: "Introduction" },
  { id: "psychological-observation", title: "Psychological Self-Observation" },
  { id: "somatic-awareness", title: "Somatic & Emotional Awareness" },
  { id: "cycles-rhythms", title: "Cycles & Personal Rhythms" },
  { id: "regulation-restoration", title: "Regulation & Restoration" },
  { id: "cognitive-clarity", title: "Cognitive & Environmental Clarity" },
  { id: "neurodiverse-support", title: "Support for Neurodiverse Users" },
  { id: "recovery-support", title: "Recovery During Stress" },
  { id: "closing", title: "A Gentle Reminder" },
];

export default function AdvancedTips() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="w-full px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <button
                className="p-2 rounded-lg hover:bg-foreground/5 transition-colors"
                data-testid="button-back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            </Link>
            <h1 className="text-lg font-serif text-gold">Advanced Tips</h1>
          </div>
          <Link href="/">
            <button
              className="p-2 rounded-lg hover:bg-foreground/5 transition-colors"
              data-testid="button-home"
            >
              <Home className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
      <TableOfContents sections={ADVANCED_TIPS_SECTIONS} />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Introduction */}
        <section id="intro" className="scroll-mt-20 mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-serif text-gold mb-3">Advanced Tips</h2>
            <p className="text-muted-foreground text-sm">Psychological & Somatic Alignment for Nervous System</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="p-4 rounded-lg bg-card/50 border border-border space-y-3">
              <p className="text-foreground/90 leading-relaxed">
                Beyond tracking time and lunar cycles, alignment arises from internal awareness. This section explores how to observe, regulate, and reflect on your inner states using modern psychological tools—while remaining grounded in Ibn ʿArabī's principles of <span className="italic">adab</span> (spiritual etiquette) and presence.
              </p>
              <p className="text-sm text-muted-foreground italic">These tools are optional for nervous system regulation. Use them gently. If they increase anxiety or self-monitoring, step back. Alignment comes from presence, not control.</p>
            </div>
          </div>
        </section>

        {/* Section 1: Psychological Self-Observation */}
        <section id="psychological-observation" className="scroll-mt-20 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-serif text-gold">Psychological Self-Observation</h3>
          </div>

          <div className="space-y-4">
            {/* Core Principle Card */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                Core Principle
              </h4>
              <p className="text-sm text-foreground/90 leading-relaxed">
                Ibn ʿArabī emphasizes awareness before action. Modern psychology confirms this: <strong>noticing thoughts, emotions, and bodily signals reduces reactivity and increases clarity.</strong>
              </p>
            </div>

            {/* Guidance */}
            <div className="p-4 rounded-lg bg-card/50 border border-border space-y-3">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <Eye className="w-4 h-4 text-secondary" />
                What to Observe
              </h4>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">•</span>
                  <span><strong>Mood shifts</strong> across the day—without judgment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">•</span>
                  <span><strong>Recurring triggers</strong> (fatigue, conflict, overstimulation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">•</span>
                  <span><strong>Thoughts without attachment</strong>—are they facts, or interpretations?</span>
                </li>
              </ul>
            </div>

            {/* Journaling Prompts */}
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="prompts" className="border border-border rounded-lg px-4">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-secondary" />
                    Journaling Prompts
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-3">
                  <div className="grid gap-3">
                    <div className="p-3 rounded bg-foreground/5 border border-border/50">
                      <p className="text-xs font-medium text-primary mb-1">1. Present Moment</p>
                      <p className="text-sm text-foreground/80">What am I feeling right now?</p>
                    </div>
                    <div className="p-3 rounded bg-foreground/5 border border-border/50">
                      <p className="text-xs font-medium text-primary mb-1">2. Thought Connection</p>
                      <p className="text-sm text-foreground/80">What thought is accompanying this feeling?</p>
                    </div>
                    <div className="p-3 rounded bg-foreground/5 border border-border/50">
                      <p className="text-xs font-medium text-primary mb-1">3. Reality Check</p>
                      <p className="text-sm text-foreground/80">Is this thought a fact, or an interpretation?</p>
                    </div>
                    <div className="p-3 rounded bg-foreground/5 border border-border/50">
                      <p className="text-xs font-medium text-primary mb-1">4. Adab Response</p>
                      <p className="text-sm text-foreground/80">What response would reflect <span className="italic">adab</span> (spiritual etiquette) in this moment?</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Connection to CBT */}
            <div className="p-3 rounded-lg bg-background/50 border border-dashed border-border text-xs text-muted-foreground italic">
              <p>This mirrors cognitive-behavioral practice: <strong>awareness → interpretation → response.</strong> By noticing our thought patterns, we create space to choose how we respond.</p>
            </div>
          </div>
        </section>

        {/* Section 2: Somatic & Emotional Awareness */}
        <section id="somatic-awareness" className="scroll-mt-20 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Waves className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-serif text-gold">Somatic & Emotional Awareness</h3>
          </div>

          <div className="space-y-4">
            {/* Core Principle */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                Core Principle
              </h4>
              <p className="text-sm text-foreground/90 leading-relaxed">
                The body registers meaning before the intellect. <strong>Awareness of bodily signals helps regulate emotional states</strong> and connects you to what's truly happening, not just what you think is happening.
              </p>
            </div>

            {/* Body Awareness Practice */}
            <div className="p-4 rounded-lg bg-card/50 border border-border space-y-3">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                Body Scanning Practice
              </h4>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Invite yourself to notice:
              </p>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">•</span>
                  <span><strong>Physical sensations</strong>—tightness, heaviness, restlessness, calm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">•</span>
                  <span><strong>Emotion location</strong>—where do you feel this in your body?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">•</span>
                  <span><strong>Energy levels</strong>—rather than forcing productivity</span>
                </li>
              </ul>
            </div>

            {/* Somatic Prompts */}
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="somatic-prompts" className="border border-border rounded-lg px-4">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-secondary" />
                    Somatic Check-In Prompts
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-3">
                  <div className="grid gap-3">
                    <div className="p-3 rounded bg-foreground/5 border border-border/50">
                      <p className="text-xs font-medium text-primary mb-1">Body Location</p>
                      <p className="text-sm text-foreground/80">Where do I feel this emotion in my body?</p>
                    </div>
                    <div className="p-3 rounded bg-foreground/5 border border-border/50">
                      <p className="text-xs font-medium text-primary mb-1">Body Signal</p>
                      <p className="text-sm text-foreground/80">Is my body signaling rest, movement, or stillness?</p>
                    </div>
                    <div className="p-3 rounded bg-foreground/5 border border-border/50">
                      <p className="text-xs font-medium text-primary mb-1">Breath Awareness</p>
                      <p className="text-sm text-foreground/80">What happens if I slow my breathing for one minute?</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Quick Techniques */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-background/50 border border-border text-center">
                <Wind className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <p className="text-xs font-medium text-foreground">Slow Breathing</p>
                <p className="text-[10px] text-muted-foreground">Calms nervous system</p>
              </div>
              <div className="p-3 rounded-lg bg-background/50 border border-border text-center">
                <Droplets className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                <p className="text-xs font-medium text-foreground">Cold Water</p>
                <p className="text-[10px] text-muted-foreground">Grounds & resets</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Cycles & Personal Rhythms */}
        <section id="cycles-rhythms" className="scroll-mt-20 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-serif text-gold">Cycles & Personal Rhythms</h3>
          </div>

          <div className="space-y-4">
            {/* Core Principle */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                Core Principle
              </h4>
              <p className="text-sm text-foreground/90 leading-relaxed">
                Time is lived differently by each person. <strong>Patterns become visible only through review and reflection.</strong> Understanding your rhythms fosters self-compassion and clearer planning.
              </p>
            </div>

            {/* Tracking Rhythms */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <Moon className="w-4 h-4 text-secondary" />
                Rhythms to Notice
              </h4>
              <div className="grid gap-3">
                <div className="p-3 rounded-lg bg-card/50 border border-border">
                  <p className="text-xs font-medium text-primary mb-1">Daily Rhythms</p>
                  <p className="text-sm text-foreground/80">When are you most clear? Most tired? Most creative?</p>
                </div>
                <div className="p-3 rounded-lg bg-card/50 border border-border">
                  <p className="text-xs font-medium text-primary mb-1">Monthly Cycles</p>
                  <p className="text-sm text-foreground/80">Some people experience monthly physiological rhythms that affect mood and energy. Tracking these increases self-knowledge and planning clarity.</p>
                </div>
                <div className="p-3 rounded-lg bg-card/50 border border-border">
                  <p className="text-xs font-medium text-primary mb-1">Seasonal Patterns</p>
                  <p className="text-sm text-foreground/80">How does your mood, energy, or clarity shift with seasons?</p>
                </div>
                <div className="p-3 rounded-lg bg-card/50 border border-border">
                  <p className="text-xs font-medium text-primary mb-1">Life Events</p>
                  <p className="text-sm text-foreground/80">How do major events (stress, change, loss) shape your patterns?</p>
                </div>
              </div>
            </div>

            {/* Reflection Prompts */}
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="rhythm-prompts" className="border border-border rounded-lg px-4">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-secondary" />
                    Pattern Recognition Prompts
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-3">
                  <div className="grid gap-3">
                    <div className="p-3 rounded bg-foreground/5 border border-border/50">
                      <p className="text-sm text-foreground/80">What patterns repeat each month?</p>
                    </div>
                    <div className="p-3 rounded bg-foreground/5 border border-border/50">
                      <p className="text-sm text-foreground/80">Which times support clarity? Which require gentleness?</p>
                    </div>
                    <div className="p-3 rounded bg-foreground/5 border border-border/50">
                      <p className="text-sm text-foreground/80">How does my body respond to stress over time?</p>
                    </div>
                    <div className="p-3 rounded bg-foreground/5 border border-border/50">
                      <p className="text-sm text-foreground/80">When do I feel most aligned with my values?</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Section 4: Regulation & Restoration */}
        <section id="regulation-restoration" className="scroll-mt-20 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <RefreshCw className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-serif text-gold">Regulation & Restoration</h3>
          </div>

          <div className="space-y-4">
            {/* Core Principle */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                Core Principle
              </h4>
              <p className="text-sm text-foreground/90 leading-relaxed">
                <strong>Alignment with time requires a regulated nervous system.</strong> A calm nervous system perceives time more clearly and makes choices from presence rather than reactivity.
              </p>
            </div>

            {/* Practice Categories */}
            <div className="grid gap-4">
              {/* Nervous System Calming */}
              <div className="rounded-lg border border-border bg-card/50 p-4">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Wind className="w-4 h-4 text-blue-400" />
                  Nervous System Calming
                </h4>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">•</span>
                    <span>Slow breathing (extend exhale longer than inhale)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">•</span>
                    <span>Quiet, gentle walking in nature</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">•</span>
                    <span>Gentle stretching or grounding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">•</span>
                    <span>Body-based grounding (feet on earth, hands in water)</span>
                  </li>
                </ul>
              </div>

              {/* Water & Heat */}
              <div className="rounded-lg border border-border bg-card/50 p-4">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  Water & Heat Therapies
                </h4>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">•</span>
                    <span>Warm baths or showers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">•</span>
                    <span>Water immersion or soaking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">•</span>
                    <span>Gentle contrast exposure (if comfortable)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">•</span>
                    <span>Hydration as a grounding ritual</span>
                  </li>
                </ul>
              </div>

              {/* Manual & Passive */}
              <div className="rounded-lg border border-border bg-card/50 p-4">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-400" />
                  Manual & Passive Relaxation
                </h4>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">•</span>
                    <span>Gentle self-massage or lymphatic drainage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">•</span>
                    <span>Professional massage (Thai, gentle)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">•</span>
                    <span>Resting in low-light, quiet environments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">•</span>
                    <span>Sound baths or ambient soundscapes</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Language Note */}
            <div className="p-3 rounded-lg bg-background/50 border border-dashed border-border text-xs text-muted-foreground italic">
              <p><strong>Language matters:</strong> We use "support", "allow", and "restore"—not "fix", "optimize", or "hack". These practices support your natural wisdom, not override it.</p>
            </div>
          </div>
        </section>

        {/* Section 5: Cognitive & Environmental Clarity */}
        <section id="cognitive-clarity" className="scroll-mt-20 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-serif text-gold">Cognitive & Environmental Clarity</h3>
          </div>

          <div className="space-y-4">
            {/* Core Principle */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                Core Principle
              </h4>
              <p className="text-sm text-foreground/90 leading-relaxed">
                <strong>Excess stimulation disrupts perception of time and meaning.</strong> Reducing information overload allows clarity to emerge naturally.
              </p>
            </div>

            {/* Reduce Overload */}
            <div className="p-4 rounded-lg bg-card/50 border border-border space-y-3">
              <h4 className="font-medium text-foreground">Reduce Information Overload</h4>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Digital quiet hours</strong>—scheduled breaks from screens</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Reduce notifications</strong>—silence what doesn't serve you</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Single-task focus</strong>—one thing at a time</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Simplified environments</strong>—less visual clutter</span>
                </li>
              </ul>
            </div>

            {/* Environment Optimization */}
            <div className="p-4 rounded-lg bg-card/50 border border-border space-y-3">
              <h4 className="font-medium text-foreground">Optimize Your Environment</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded bg-foreground/5 border border-border/50">
                  <p className="text-xs font-medium text-primary mb-1">Workspace</p>
                  <p className="text-xs text-foreground/80">Minimal, organized, calm</p>
                </div>
                <div className="p-3 rounded bg-foreground/5 border border-border/50">
                  <p className="text-xs font-medium text-primary mb-1">Lighting</p>
                  <p className="text-xs text-foreground/80">Soft, warm, adjustable</p>
                </div>
                <div className="p-3 rounded bg-foreground/5 border border-border/50">
                  <p className="text-xs font-medium text-primary mb-1">Sound</p>
                  <p className="text-xs text-foreground/80">Quiet or gentle ambient</p>
                </div>
                <div className="p-3 rounded bg-foreground/5 border border-border/50">
                  <p className="text-xs font-medium text-primary mb-1">Tools</p>
                  <p className="text-xs text-foreground/80">Task lists, not urgency</p>
                </div>
              </div>
            </div>

            {/* Purpose Note */}
            <div className="p-3 rounded-lg bg-background/50 border border-dashed border-border text-xs text-muted-foreground italic">
              <p><strong>Purpose:</strong> To reduce cognitive load and create mental space—not to increase productivity pressure or perfectionism.</p>
            </div>
          </div>
        </section>

        {/* Section 6: Neurodiverse Support */}
        <section id="neurodiverse-support" className="scroll-mt-20 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-serif text-gold">Support for Neurodiverse Users</h3>
          </div>

          <div className="space-y-4">
            {/* Core Principle */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                Core Principle
              </h4>
              <p className="text-sm text-foreground/90 leading-relaxed">
                Some users are more sensitive to light, sound, visual clutter, information density, and social intensity. <strong>This isn't a limitation—it's part of how you perceive and process the world.</strong>
              </p>
            </div>

            {/* Sensitivities */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Common Sensitivities</h4>
              <div className="grid gap-3">
                <div className="p-3 rounded-lg bg-card/50 border border-border">
                  <p className="text-xs font-medium text-primary mb-1 flex items-center gap-1.5">
                    <Flame className="w-3 h-3" />
                    Visual Sensitivity
                  </p>
                  <p className="text-sm text-foreground/80">Bright lights, high contrast, busy patterns, rapid animations</p>
                </div>
                <div className="p-3 rounded-lg bg-card/50 border border-border">
                  <p className="text-xs font-medium text-primary mb-1 flex items-center gap-1.5">
                    <Wind className="w-3 h-3" />
                    Auditory Sensitivity
                  </p>
                  <p className="text-sm text-foreground/80">Loud sounds, unpredictable noise, constant notifications</p>
                </div>
                <div className="p-3 rounded-lg bg-card/50 border border-border">
                  <p className="text-xs font-medium text-primary mb-1 flex items-center gap-1.5">
                    <Brain className="w-3 h-3" />
                    Information Density
                  </p>
                  <p className="text-sm text-foreground/80">Too much text, too many choices, rapid-fire information</p>
                </div>
                <div className="p-3 rounded-lg bg-card/50 border border-border">
                  <p className="text-xs font-medium text-primary mb-1 flex items-center gap-1.5">
                    <Heart className="w-3 h-3" />
                    Social Intensity
                  </p>
                  <p className="text-sm text-foreground/80">Crowded spaces, multiple simultaneous interactions</p>
                </div>
              </div>
            </div>

            {/* Practical Suggestions */}
            <div className="p-4 rounded-lg bg-card/50 border border-border space-y-3">
              <h4 className="font-medium text-foreground">Supportive Practices</h4>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Low-stimulus environments</strong>—quiet, calm, predictable</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Soft lighting</strong>—reduce harsh brightness</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Noise reduction</strong>—ear protection, quiet times</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Predictable routines</strong>—reduces anxiety</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Deeper, fewer interactions</strong>—quality over volume</span>
                </li>
              </ul>
            </div>

            {/* Note about this app */}
            <div className="p-3 rounded-lg bg-background/50 border border-dashed border-border text-xs text-muted-foreground italic">
              <p><strong>This app:</strong> Uses soft, dark-friendly theming by default. You can customize brightness, animation, and information density to suit your needs. Pause any section that feels overwhelming.</p>
            </div>
          </div>
        </section>

        {/* Section 7: Recovery Support */}
        <section id="recovery-support" className="scroll-mt-20 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Droplets className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-serif text-gold">Recovery Support During Stress</h3>
          </div>

          <div className="space-y-4">
            {/* Core Principle */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                During Demanding Periods
              </h4>
              <p className="text-sm text-foreground/90 leading-relaxed">
                Some people find support in basic practices during stress. <strong>This is not medical advice—consult a healthcare provider if needed.</strong>
              </p>
            </div>

            {/* Recovery Practices */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Supportive Practices</h4>
              <div className="grid gap-3">
                <div className="p-3 rounded-lg bg-card/50 border border-border flex items-start gap-3">
                  <Droplets className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Hydration</p>
                    <p className="text-xs text-foreground/80">Regular water intake supports brain function and mood</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-card/50 border border-border flex items-start gap-3">
                  <Zap className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Regular Meals</p>
                    <p className="text-xs text-foreground/80">Consistent eating patterns stabilize energy and clarity</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-card/50 border border-border flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Minerals & Recovery</p>
                    <p className="text-xs text-foreground/80">Magnesium, calcium, and electrolytes may support relaxation (speak with a healthcare provider)</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-card/50 border border-border flex items-start gap-3">
                  <Moon className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Sleep Hygiene</p>
                    <p className="text-xs text-foreground/80">Darkness, quiet, cool temperature, consistent schedule</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900/80"><strong>Not medical advice:</strong> This section offers general supportive practices. For specific health concerns, consult a healthcare provider.</p>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section id="closing" className="scroll-mt-20 mb-12">
          <div className="mb-6">
            <h3 className="text-2xl font-serif text-gold">A Gentle Reminder</h3>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/20 space-y-4">
              <div className="space-y-3">
                <p className="text-foreground/90 leading-relaxed">
                  This section is optional. Use these tools gently, at your own pace.
                </p>
                <p className="text-foreground/90 leading-relaxed">
                  If any practice increases anxiety, self-judgment, or overwhelm, <strong>step back.</strong> Alignment does not come from force or perfectionism. It emerges from <strong>presence, gentleness, and adab.</strong>
                </p>
                <p className="text-foreground/90 leading-relaxed italic">
                  "The goal is not to optimize yourself—it is to know yourself, and to meet each moment with awareness and grace."
                </p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-primary/20">
                <Compass className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/80">
                  Return to these tools when they serve you. Skip them when they don't. Trust your own wisdom about what you need.
                </p>
              </div>
            </div>

            {/* Resources Link */}
            <div className="p-4 rounded-lg bg-card/50 border border-border flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-primary shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">Further Exploration</p>
                <p className="text-xs text-foreground/80 mb-2">For deeper dives into these topics, visit the Key Further Readings section in the Instructions page.</p>
                <Link href="/instructions#key-further-readings">
                  <button className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1">
                    Explore Resources
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
