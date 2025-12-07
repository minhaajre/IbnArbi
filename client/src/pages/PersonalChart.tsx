import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Lock, ChevronLeft, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { getPlanetaryHours, getPlanetaryPositions, getLunarMansion, getMoonPhase } from "@/lib/astronomy";
import { PLANET_ARABIC } from "@/lib/constants";

const CORRECT_PASSWORD = "SiderealPath42";

type NatalChart = {
  ascendant: string;
  descendant: string;
  mc: string;
  ic: string;
  sunSign: string;
  moonSign: string;
  risingSign: string;
  fireCount: number;
  earthCount: number;
  airCount: number;
  waterCount: number;
};

export default function PersonalChart() {
  const [, navigate] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const [chartInput, setChartInput] = useState("");
  const [natalChart, setNatalChart] = useState<NatalChart | null>(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordSubmit = () => {
    if (passwordInput === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password");
      setPasswordInput("");
    }
  };

  const parseNatalChart = (input: string): NatalChart | null => {
    try {
      const lines = input.toLowerCase().split("\n").filter(l => l.trim());
      const chart: any = {};
      
      for (const line of lines) {
        if (line.includes("asc") || line.includes("ascendant")) chart.ascendant = line.split(/[:,]/)[1]?.trim() || "";
        if (line.includes("desc") || line.includes("descendant")) chart.descendant = line.split(/[:,]/)[1]?.trim() || "";
        if (line.includes("mc")) chart.mc = line.split(/[:,]/)[1]?.trim() || "";
        if (line.includes("ic")) chart.ic = line.split(/[:,]/)[1]?.trim() || "";
        if (line.includes("sun")) chart.sunSign = line.split(/[:,]/)[1]?.trim() || "";
        if (line.includes("moon")) chart.moonSign = line.split(/[:,]/)[1]?.trim() || "";
        if (line.includes("rising") || line.includes("ascendant")) chart.risingSign = line.split(/[:,]/)[1]?.trim() || "";
      }

      return {
        ascendant: chart.ascendant || "unknown",
        descendant: chart.descendant || "unknown",
        mc: chart.mc || "unknown",
        ic: chart.ic || "unknown",
        sunSign: chart.sunSign || "unknown",
        moonSign: chart.moonSign || "unknown",
        risingSign: chart.risingSign || chart.ascendant || "unknown",
        fireCount: 0,
        earthCount: 0,
        airCount: 0,
        waterCount: 0,
      };
    } catch {
      return null;
    }
  };

  const generatePersonalizedAnalysis = async () => {
    setLoading(true);
    
    const parsed = parseNatalChart(chartInput);
    if (!parsed) {
      setAnalysis("Please enter your chart placements (e.g., Asc: Taurus, MC: Leo, Sun: Gemini)");
      setLoading(false);
      return;
    }

    setNatalChart(parsed);

    // Get current celestial data
    const now = new Date();
    const location = { lat: 40, lng: -74, name: "Current Location" };
    const currentHour = getPlanetaryHours(now, location, true);
    const currentPlanets = getPlanetaryPositions(now, true);
    const mansion = getLunarMansion(now, true);
    const moonPhase = getMoonPhase(now);

    // Generate personalized guidance based on user's chart + current transits
    const guidance = generateGuidance(parsed, currentHour, currentPlanets, mansion, moonPhase);
    setAnalysis(guidance);
    setLoading(false);
  };

  const generateGuidance = (chart: NatalChart, hour: any, planets: any[], mansion: any, moonPhase: any): string => {
    let guidance = `
╔════════════════════════════════════════════════════════════════╗
║         YOUR PERSONALIZED CELESTIAL GUIDANCE                  ║
║         Based on Your Natal Chart & Current Transits          ║
╚════════════════════════════════════════════════════════════════╝

🌟 YOUR NATAL AXIS (Foundation of Your Being):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✦ Ascendant (How You Show Up): ${chart.ascendant?.toUpperCase()}
   This is your "mask" - your natural way of engaging with the world
   
✦ Descendant (Your Shadow/Relationships): ${chart.descendant?.toUpperCase()}
   What you seek in others; your relational patterns

✦ Midheaven/MC (Your Purpose): ${chart.mc?.toUpperCase()}
   Your highest calling and public role in the world

✦ Nadir/IC (Your Root): ${chart.ic?.toUpperCase()}
   Your foundation, family, and inner sanctuary

🌙 YOUR LUMINARIES (Your Core):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☉ Sun: ${chart.sunSign?.toUpperCase()} (Your essence, will, and creative fire)
☽ Moon: ${chart.moonSign?.toUpperCase()} (Your emotional nature and inner world)

⏰ CURRENT PLANETARY HOUR:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ruling Planet: ${hour?.currentHour?.planet || "Unknown"}
Type: ${hour?.currentHour?.type || "Unknown"}
Spiritual Quality: This is a time ruled by ${hour?.currentHour?.planet}'s energy.

🌙 CURRENT LUNAR MANSION (Station #${mansion?.number}):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${mansion?.name || "Unknown"} - ${mansion?.theme || ""}
Nature: ${mansion?.nature === 'blessed' ? '✓ BLESSED - Favorable for action' : '⚠ CHALLENGING - Requires patience and reflection'}

📊 PERSONALIZED INTERPRETATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Based on your natal chart with ${chart.ascendant} rising, you naturally approach life
through the lens of ${chart.ascendant} qualities. Your deepest self (Sun in ${chart.sunSign})
drives you toward expressing that fire and intention.

With the current planetary hour ruled by ${hour?.currentHour?.planet}, this is an opportune
moment for action aligned with ${hour?.currentHour?.planet}'s domain:
${getPlanetaryMeaning(hour?.currentHour?.planet)}

The current Lunar Mansion in ${mansion?.name} suggests:
${getMansionMeaning(mansion?.number)}

🎯 RECOMMENDED ACTION TODAY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Given your chart and current transits:

1. ALIGN YOUR INTENTION: With ${hour?.currentHour?.planet} ruling this hour and your
   natural ${chart.ascendant} approach, focus on activities that blend both energies.

2. NAVIGATE YOUR RELATIONSHIPS: Your Descendant in ${chart.descendant} shows what you
   seek in others. Use this hour to connect authentically.

3. MANIFEST YOUR PURPOSE: Your MC in ${chart.mc} is your north star. Even small actions
   today can align you with your highest calling.

4. HONOR YOUR ROOTS: Your IC in ${chart.ic} reminds you to ground these actions in
   something stable and real.

🌙 MOON PHASE WISDOM (${Math.round(moonPhase?.illumination * 100)}% illuminated):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${moonPhase?.waxing ? '🌒 WAXING PHASE - Time for manifesting, building, and beginning' : '🌘 WANING PHASE - Time for reflection, releasing, and completion'}

✨ INNER STATE CHECK:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Before you act, check in with yourself:
• How does your ${chart.moonSign} Moon feel about this moment?
• What does your ${chart.ascendant} Ascendant want to express right now?
• What small act would honor your ${chart.mc} MC today?

═════════════════════════════════════════════════════════════════
May this guidance help you align with the celestial spheres! ✨
    `;

    return guidance;
  };

  const getPlanetaryMeaning = (planet: string): string => {
    const meanings: Record<string, string> = {
      Sun: "Strength, leadership, heart-centered action, creative expression",
      Moon: "Emotional connection, intuition, care-taking, inner work",
      Mercury: "Communication, learning, travel, negotiations, clarity",
      Venus: "Harmony, love, beauty, art, diplomacy, values",
      Mars: "Courage, action, assertiveness, passion, conflict resolution",
      Jupiter: "Expansion, generosity, learning, opportunity, abundance",
      Saturn: "Structure, discipline, patience, boundaries, long-term work",
    };
    return meanings[planet] || "Planetary energy aligned with cosmic intention";
  };

  const getMansionMeaning = (number: number | undefined): string => {
    if (!number) return "A mystical station where divine energy shapes your day.";
    if (number <= 7) return "Early mansion cycle: Foundation and seeding energy. Begin projects now.";
    if (number <= 14) return "Building phase: Momentum and growth. Push forward with plans.";
    if (number <= 21) return "Relating phase: Harmony and connection. Focus on relationships.";
    return "Release phase: Completion and reflection. Let go and prepare for renewal.";
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 border border-border shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-2xl font-serif text-foreground">Personal Chart</h1>
          </div>
          
          <p className="text-muted-foreground text-sm mb-6 text-center">
            Enter the access password to view your personalized celestial analysis
          </p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError("");
                }}
                onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                className="mt-1"
                data-testid="password-input"
              />
              {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
            </div>
            
            <Button
              onClick={handlePasswordSubmit}
              className="w-full"
              data-testid="password-submit"
            >
              Access Chart
            </Button>
          </div>

          <Button
            variant="ghost"
            className="w-full mt-4 text-muted-foreground"
            onClick={() => navigate("/")}
            data-testid="back-button"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4 text-muted-foreground"
          data-testid="back-from-chart"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="p-6 border border-border shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-serif text-foreground">Your Natal Chart</h1>
          </div>

          <p className="text-muted-foreground mb-6">
            Share your birth chart placements below. Include your Ascendant, Descendant, MC (Midheaven), IC, Sun sign, and Moon sign. Format example: "Asc: Taurus, Desc: Scorpio, MC: Leo, IC: Aquarius, Sun: Gemini, Moon: Libra"
          </p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="chart-input" className="text-sm">Your Sidereal Placements</Label>
              <textarea
                id="chart-input"
                placeholder="Asc: Taurus&#10;Desc: Scorpio&#10;MC: Leo&#10;IC: Aquarius&#10;Sun: Gemini&#10;Moon: Libra"
                value={chartInput}
                onChange={(e) => setChartInput(e.target.value)}
                className="w-full h-32 mt-1 p-3 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="chart-textarea"
              />
            </div>

            <Button
              onClick={generatePersonalizedAnalysis}
              disabled={loading || !chartInput.trim()}
              className="w-full"
              data-testid="generate-analysis"
            >
              {loading ? "Analyzing Your Chart..." : "Generate Personalized Analysis"}
            </Button>
          </div>
        </Card>

        {analysis && (
          <Card className="p-6 border border-border shadow-lg bg-card/50 backdrop-blur">
            <div className="whitespace-pre-wrap text-sm font-mono text-foreground leading-relaxed">
              {analysis}
            </div>
            <div className="text-xs text-muted-foreground mt-6 text-center">
              Analysis generated on {format(new Date(), "MMMM d, yyyy 'at' h:mm a")}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
