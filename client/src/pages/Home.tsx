import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useAstronomyData } from "@/hooks/useAstronomyData";
import { useTimeControl } from "@/hooks/useTimeControl";
import { useLocationSearch } from "@/hooks/useLocationSearch";
import { useDynamicFavicon } from "@/hooks/useDynamicFavicon";
import { usePlanetaryNotifications } from "@/hooks/usePlanetaryNotifications";
import { PLANET_PROPHETS, PLANET_ARABIC } from "@/lib/constants";
import { PlanetaryHoursDisplay } from "@/components/PlanetaryHoursDisplay";
import { PlanetaryTable } from "@/components/PlanetaryTable";
import { MansionCard } from "@/components/MansionCard";
import { OptimalDates } from "@/components/OptimalDates";
import { ZodiacWheel } from "@/components/ZodiacWheel";
import { ElementalBalance } from "@/components/ElementalBalance";
import { PlanetaryProtocol } from "@/components/PlanetaryProtocol";
import { NakshatraDisplay } from "@/components/NakshatraDisplay";
import { ChineseAstroDisplay } from "@/components/ChineseAstroDisplay";
import { Footer } from "@/components/Footer";
import { TableOfContents, TOCSection } from "@/components/TableOfContents";
import { CrescentStarIcon, LanternIcon, EightPointedStarIcon, IslamicPatternIcon, ZodiacWheelIcon } from "@/components/icons/IslamicIcons";
import { MapPin, Calendar as CalendarIcon, Clock, RotateCcw, Moon, Sun, AlertTriangle, Flame, Mountain, Wind, Droplets, Flower2, Leaf, Snowflake, Triangle, CircleDot, Mars, Sparkles, Crown, BookOpen, Info, Bell, BellOff, Zap } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

const DIVINE_NAMES_WATERMARK = "الله الرحمن الرحيم الملك القدوس السلام المؤمن المهيمن العزيز الجبار المتكبر الخالق البارئ المصور الغفار القهار الوهاب الرزاق الفتاح العليم";

const HOME_SECTIONS: TOCSection[] = [
  { id: "lunar-mansion", title: "Current Lunar Mansion", icon: <CrescentStarIcon className="w-4 h-4" /> },
  { id: "planetary-hours", title: "Planetary Hours", icon: <LanternIcon className="w-4 h-4" /> },
  { id: "celestial-dignities", title: "Celestial Dignities", icon: <EightPointedStarIcon className="w-4 h-4" /> },
  { id: "elemental-balance", title: "Elemental Balance", icon: <IslamicPatternIcon className="w-4 h-4" /> },
  { id: "nakshatra", title: "Nakshatra", icon: <EightPointedStarIcon className="w-4 h-4" /> },
  { id: "chinese-astro", title: "Feng Shui Time", icon: <IslamicPatternIcon className="w-4 h-4" /> },
  { id: "sky-map", title: "Current Sky Map", icon: <ZodiacWheelIcon className="w-4 h-4" /> },
];

const SECTION_INFO = {
  lunarMansion: {
    title: "Lunar Mansions",
    description: "The Moon travels through each of the 28 mansions approximately every day. Each mansion represents one of three movements: Gathering (1-11), Differentiating (12-16), or Separating (17-28). Understanding which movement you are in helps align your activities and inner state with the lunar rhythm.",
  },
  planetaryHours: {
    title: "Planetary Hours",
    description: "Each day is divided into 24 planetary hours, with each hour ruled by one of the seven classical planets. The day ruler sets the spiritual tone for the entire day. The VOC (Void of Course) indicator means the Moon makes no major aspects before leaving its sign.",
  },
  dignities: {
    title: "Celestial Dignities",
    description: "Shows current positions of the seven classical planets and their dignities. Rulership (R) means strongest expression, Exaltation (E) means elevated influence, Detriment (d) means weakened, and Fall (f) means most challenged.",
  },
  elements: {
    title: "Elemental Balance",
    description: "The four elements (Fire, Earth, Air, Water) represent fundamental qualities of existence. This shows which elements are emphasized based on current planetary positions, helping you understand the day's overall energy.",
  },
  nakshatra: {
    title: "Nakshatra",
    description: "The Moon travels through 27 Nakshatras (lunar stations in Vedic astronomy), each spanning 13°20'. These are grouped into 7 categories based on their energetic nature: Fixed, Movable, Cruel, Ordinary, Short/Swift, Gentle, and Ferocious. Each category indicates which activities are supported or should be avoided.",
  },
  chineseAstro: {
    title: "Feng Shui Time Energy",
    description: "Chinese metaphysical calendar combining the 28 Xiu (lunar mansions), Heavenly Stems, Earthly Branches, Sexagenary Cycle, Day Officers, Five Elements, and 24 Solar Terms. These systems together classify the quality of time for activity planning — research, business, travel, construction, spiritual work, and more.",
  },
};

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [useSidereal, setUseSidereal] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [isProtocolExpanded, setIsProtocolExpanded] = useState(false);

  const {
    location,
    manualCity,
    isLocating,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    detectLocation,
    handleCityInput,
    selectLocation,
  } = useLocationSearch();

  const {
    now,
    hoursTime,
    hoursTimeAuto,
    hoursSelectedDate,
    handleHoursDateSelect,
    handleHoursTimeChange,
    resetHoursToNow,
  } = useTimeControl();

  const {
    hoursData,
    planets,
    mansion,
    hijriDate,
    moonPhase,
    mansionProgress,
    whiteDaysInfo,
    ingresses,
    moonTimes,
    nakshatraInfo,
    planetNakshatras,
    chineseTimeEnergy,
    hoursSectionData,
    loading,
  } = useAstronomyData(now, hoursTime, location, useSidereal);

  // Initialize location on mount
  useEffect(() => {
    detectLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restore scroll position once data is ready
  useEffect(() => {
    if (!loading) {
      const savedScrollPos = sessionStorage.getItem("homeScrollPos");
      if (savedScrollPos) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPos));
        }, 100);
      }
    }
  }, [loading]);

  // Dynamic favicon + planetary hour notifications
  const currentPlanet = hoursData?.currentHour?.planet || null;
  useDynamicFavicon(currentPlanet);
  const { notificationsEnabled, toggleNotifications } = usePlanetaryNotifications(hoursData?.currentHour || null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="animate-pulse text-gold font-serif text-2xl">Calculating Spheres...</div>
      </div>
    );
  }

  if (!hoursData || !mansion) return null;

  const nextHoursIndex = hoursData.hours.findIndex(h => h === hoursData.currentHour);
  const nextHours = hoursData.hours.slice(nextHoursIndex + 1).concat(hoursData.hours.slice(0, nextHoursIndex + 1));
  const moonPlanet = planets.find(p => p.name === "Moon");
  const activeHoursData = hoursSectionData || hoursData;

  return (
    <div className="min-h-screen bg-background text-foreground p-3 sm:p-6 md:p-12 max-w-7xl mx-auto transition-colors duration-500 relative overflow-hidden">
      {/* Andalusian Divine Names Watermark Background */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden opacity-[0.03] z-0">
        <div className="absolute inset-0 font-arabic text-6xl sm:text-8xl leading-loose text-foreground whitespace-pre-wrap break-words p-8 transform rotate-[-5deg] scale-110">
          {DIVINE_NAMES_WATERMARK} {DIVINE_NAMES_WATERMARK} {DIVINE_NAMES_WATERMARK} {DIVINE_NAMES_WATERMARK} {DIVINE_NAMES_WATERMARK} {DIVINE_NAMES_WATERMARK} {DIVINE_NAMES_WATERMARK} {DIVINE_NAMES_WATERMARK}
        </div>
      </div>

      <div className="relative z-10">
        {/* ── Header ── */}
        <header className="flex flex-col gap-4 sm:gap-6 border-b border-border pb-4 sm:pb-8 mb-6 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif text-gold mb-1 sm:mb-2">Ibn Arabi's Cosmology</h1>
              <p className="text-muted-foreground font-light tracking-wide text-sm sm:text-base">Guide to the Prayer Timings & Planetary Alignment</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full w-8 h-8 sm:w-9 sm:h-9 border border-border"
              >
                <Sun className="h-3 w-3 sm:h-4 sm:w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-3 w-3 sm:h-4 sm:w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Guidance Button */}
              <Link href="/instructions">
                <Button
                  variant="outline"
                  className="bg-card/50 border-border h-8 sm:h-9 px-2 sm:px-3 gap-1.5"
                  data-testid="link-instructions"
                  title="Guidance"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs hidden sm:inline">Guidance</span>
                </Button>
              </Link>

              {/* NS Modulation Button */}
              <Link href="/advanced-tips" className="flex-1">
                <Button
                  variant="outline"
                  className="bg-card/50 border-border h-8 sm:h-9 px-2 sm:px-3 gap-1.5 w-full justify-center"
                  data-testid="link-advanced-tips"
                  title="Advanced Tips"
                >
                  <Zap className="w-4 h-4" />
                  <span className="text-xs hidden sm:inline">NS Modulation</span>
                </Button>
              </Link>

              {/* Sidereal Toggle */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-card/50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 border border-border">
                <span className={`text-[10px] sm:text-xs ${!useSidereal ? "text-primary" : "text-muted-foreground"}`}>Tropical</span>
                <Switch checked={useSidereal} onCheckedChange={setUseSidereal} className="scale-90 sm:scale-100" />
                <span className={`text-[10px] sm:text-xs ${useSidereal ? "text-primary" : "text-muted-foreground"}`}>Sidereal</span>
              </div>

              {/* Location Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-card/50 border-border h-8 sm:h-9 px-2 sm:px-3 gap-1.5" title={location?.name}>
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="text-xs hidden sm:inline max-w-[100px] truncate">{location?.name?.split(",")[0] || "Location"}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Location Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="relative">
                      <Input
                        placeholder="Enter city name..."
                        value={manualCity}
                        onChange={(e) => handleCityInput(e.target.value)}
                        onFocus={() => manualCity.length >= 2 && setShowSuggestions(true)}
                      />
                      {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                          {suggestions.map((place, idx) => (
                            <button
                              key={idx}
                              onClick={() => selectLocation(place)}
                              className="w-full text-left px-3 py-2.5 hover:bg-foreground/10 border-b border-border last:border-b-0 transition-colors text-sm"
                            >
                              <div className="font-medium text-foreground">{place.name}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {place.country} • {place.latitude.toFixed(4)}°, {place.longitude.toFixed(4)}°
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground text-center">- OR -</div>
                    <Button variant="secondary" onClick={detectLocation} className="w-full" disabled={isLocating}>
                      {isLocating ? "Detecting..." : "Auto-Detect Location"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Time Display */}
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 pt-2 sm:pt-0">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="text-xl sm:text-3xl font-mono font-light tabular-nums tracking-tighter">
                  {format(now, "h:mm a")}
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="text-muted-foreground text-xs">{format(now, "MMM d, yyyy")}</div>
                  <div className="text-gold/80 font-arabic text-sm sm:text-base">{hijriDate}</div>
                </div>
              </div>
              <div className="text-[9px] text-muted-foreground/50 italic pl-0">* Islamic date begins at sunset, not midnight. Islamic calendar is lunar based. Use Sidereal for best results.</div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {whiteDaysInfo?.isWhiteDay && (
                <div className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30 inline-flex items-center gap-1" data-testid="white-days-indicator">
                  <Moon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span className="hidden sm:inline">White Day - Blessed Fast</span>
                  <span className="sm:hidden">White Day</span>
                </div>
              )}
              {whiteDaysInfo && !whiteDaysInfo.isWhiteDay && whiteDaysInfo.daysUntilNext <= 3 && (
                <div className="text-[10px] sm:text-xs text-muted-foreground" data-testid="white-days-upcoming">
                  White days in {whiteDaysInfo.daysUntilNext}d
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Row 1: Lunar Mansion + Planetary Hours ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">

          {/* Current Station Card */}
          <section id="lunar-mansion" className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="flex items-center justify-between mb-2 sm:mb-3 relative z-10">
              <h2 className="text-base sm:text-lg font-serif text-foreground/80">
                Current Lunar Mansion <span className="font-arabic text-sm sm:text-base text-foreground/60 ml-1 sm:ml-2">المنزلة القمرية الحالية</span>
              </h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                    <Info className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" data-testid="info-lunar-mansion" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">{SECTION_INFO.lunarMansion.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{SECTION_INFO.lunarMansion.description}</p>
                    <Link href="/instructions#lunar-mansions" className="text-xs text-primary hover:underline block pt-1">Learn more →</Link>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="relative z-10">
              <MansionCard mansion={mansion} progress={mansionProgress ?? undefined} moonPhase={moonPhase ?? undefined} />
            </div>
            <div className="mt-4 relative z-10">
              <OptimalDates currentMansionNumber={mansion.number} isWaning={moonPhase ? !moonPhase.isWaxing : false} />
            </div>
          </section>

          {/* Planetary Hour Card */}
          <section id="planetary-hours" className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {/* Header with date/time picker */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3 relative z-10">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-serif text-foreground/80">
                  Planetary Hours <span className="font-arabic text-sm sm:text-base text-foreground/60 ml-1 sm:ml-2">الساعات الكوكبية</span>
                </h2>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                      <Info className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" data-testid="info-planetary-hours" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="start">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">{SECTION_INFO.planetaryHours.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{SECTION_INFO.planetaryHours.description}</p>
                      <Link href="/instructions#planetary-hours" className="text-xs text-primary hover:underline block pt-1">Learn more →</Link>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-6 w-6 sm:h-7 sm:w-7 ${notificationsEnabled ? "text-gold" : "text-muted-foreground"}`}
                  onClick={toggleNotifications}
                  title={notificationsEnabled ? "Disable hour notifications" : "Enable hour notifications"}
                  data-testid="notification-toggle"
                >
                  {notificationsEnabled ? <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <BellOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 sm:h-7 text-[10px] sm:text-xs px-2" data-testid="hours-date-picker">
                      <CalendarIcon className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      {hoursSelectedDate ? format(hoursSelectedDate, "MMM d") : "Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar mode="single" selected={hoursSelectedDate} onSelect={handleHoursDateSelect} initialFocus />
                  </PopoverContent>
                </Popover>
                <input
                  type="time"
                  value={format(hoursTime, "HH:mm")}
                  onChange={handleHoursTimeChange}
                  className="h-6 sm:h-7 text-[10px] sm:text-xs px-1.5 sm:px-2 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-16 sm:w-auto"
                  data-testid="hours-time-picker"
                />
                {!hoursTimeAuto && (
                  <Button size="icon" variant="ghost" className="h-5 w-5 sm:h-6 sm:w-6" onClick={resetHoursToNow} title="Reset to Now" data-testid="hours-reset-button">
                    <RotateCcw className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* Moon Sign + Phase Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 sm:mb-3 relative z-10">
              {moonPlanet && (
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium text-foreground/80">
                    <Moon className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                    <span>{moonPlanet.sign}</span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">
                    {Math.floor(moonPlanet.degree)}°{Math.round((moonPlanet.degree % 1) * 60)}'
                  </span>
                  {moonPhase?.isVoidOfCourse && (
                    <span className="text-[10px] sm:text-xs text-yellow-500 font-bold flex items-center gap-0.5 sm:gap-1 bg-yellow-500/10 px-1.5 sm:px-2 py-0.5 rounded-full">
                      <AlertTriangle className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> VOC
                    </span>
                  )}
                </div>
              )}
              {moonPhase && (
                <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap">
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                    {moonPhase.isWaxing ? <Sun className="w-3 h-3 sm:w-4 sm:h-4" /> : <Moon className="w-3 h-3 sm:w-4 sm:h-4" />}
                    <span className="hidden xs:inline">{moonPhase.label}</span>
                  </div>
                  <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-foreground/10 font-mono border border-border">
                    {Math.round(moonPhase.illumination)}%
                  </span>
                  <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium border ${moonPhase.isWaxing ? "bg-amber-500/10 text-amber-400 border-amber-500/30" : "bg-slate-500/10 text-slate-400 border-slate-500/30"}`}>
                    {moonPhase.isWaxing ? "☽ Waxing" : "☾ Waning"}
                  </span>
                  {moonTimes && (
                    <div className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-2">
                      {moonTimes.moonrise && <span>☽↑ {format(moonTimes.moonrise, "h:mm a")}</span>}
                      {moonTimes.moonset && <span>☽↓ {format(moonTimes.moonset, "h:mm a")}</span>}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="relative z-10">
              {(() => {
                const nextIdx = activeHoursData.hours.findIndex(h => h === activeHoursData.currentHour);
                const nextHoursForSection = activeHoursData.hours.slice(nextIdx + 1).concat(activeHoursData.hours.slice(0, nextIdx + 1));
                return (
                  <PlanetaryHoursDisplay
                    currentHour={activeHoursData.currentHour}
                    nextHours={nextHoursForSection}
                    dayRuler={activeHoursData.dayRuler}
                    selectedPlanet={selectedPlanet}
                    onPlanetSelect={setSelectedPlanet}
                    lunarDay={mansionProgress?.lunarDay}
                    isWaxing={moonPhase?.isWaxing}
                  />
                );
              })()}
              <div className="text-[10px] sm:text-xs text-muted-foreground/50 mt-2 text-right">
                Last Updated: {format(new Date(), "h:mm a")}
              </div>
            </div>

            {/* Day Ruler & Planetary Protocol */}
            {activeHoursData.currentHour && (
              <div className="relative z-10 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
                    <span className="text-xs sm:text-sm font-medium text-foreground/70">Day Ruler</span>
                    <span className="font-arabic text-[10px] sm:text-xs text-foreground/50">حاكم اليوم</span>
                  </div>
                  <div className="h-4 w-px bg-border hidden sm:block" />
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-base sm:text-lg" style={{ color: activeHoursData.dayRuler === "Sun" ? "#f59e0b" : activeHoursData.dayRuler === "Moon" ? "#94a3b8" : "#888" }}>
                      {activeHoursData.dayRuler === "Sun" ? "☉" : activeHoursData.dayRuler === "Moon" ? "☽" : activeHoursData.dayRuler === "Mars" ? "♂" : activeHoursData.dayRuler === "Mercury" ? "☿" : activeHoursData.dayRuler === "Jupiter" ? "♃" : activeHoursData.dayRuler === "Venus" ? "♀" : "♄"}
                    </span>
                    <span className="font-serif text-sm sm:text-base text-foreground">{activeHoursData.dayRuler}</span>
                    <span className="font-arabic text-xs sm:text-sm text-foreground/60">{PLANET_ARABIC[activeHoursData.dayRuler]?.arabic}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5 bg-foreground/5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg border border-border">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold" />
                    <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline">Prophet:</span>
                    <span className="text-[10px] sm:text-xs text-gold font-medium">{PLANET_PROPHETS[activeHoursData.dayRuler]?.name}</span>
                    <span className="text-xs sm:text-sm font-arabic text-primary/80">{PLANET_PROPHETS[activeHoursData.dayRuler]?.arabic}</span>
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-medium text-foreground/70 flex items-center gap-1.5 sm:gap-2">
                      {selectedPlanet ? `${selectedPlanet} Protocol` : "Hour Protocol"}
                      <span className="font-arabic text-[10px] sm:text-xs text-foreground/50">البروتوكول</span>
                    </h3>
                    {selectedPlanet && (
                      <button
                        onClick={() => setSelectedPlanet(null)}
                        className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors"
                        data-testid="reset-protocol-planet"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <PlanetaryProtocol
                    activePlanet={selectedPlanet || activeHoursData.currentHour?.planet || activeHoursData.dayRuler}
                    isExpanded={isProtocolExpanded}
                    onToggleExpanded={() => setIsProtocolExpanded(!isProtocolExpanded)}
                  />
                </div>
              </div>
            )}
          </section>
        </div>

        {/* ── Row 2: Celestial Dignities + Elemental Balance ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">

          <section id="celestial-dignities" className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="flex items-center justify-between mb-2 sm:mb-3 relative z-10">
              <h2 className="text-base sm:text-lg font-serif text-foreground/80">
                Celestial Dignities <span className="font-arabic text-sm sm:text-base text-foreground/60 ml-1 sm:ml-2">الكرامات السماوية</span>
              </h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                    <Info className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" data-testid="info-dignities" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">{SECTION_INFO.dignities.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{SECTION_INFO.dignities.description}</p>
                    <Link href="/instructions#celestial-dignities" className="text-xs text-primary hover:underline block pt-1">Learn more →</Link>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="relative z-10 overflow-x-auto">
              <PlanetaryTable planets={planets} useSidereal={useSidereal} onToggleSystem={setUseSidereal} />
            </div>
          </section>

          <section id="elemental-balance" className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="flex items-center justify-between mb-2 sm:mb-3 relative z-10">
              <h2 className="text-base sm:text-lg font-serif text-foreground/80">
                Elemental Balance <span className="font-arabic text-sm sm:text-base text-foreground/60 ml-1 sm:ml-2">توازن العناصر</span>
              </h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                    <Info className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" data-testid="info-elements" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">{SECTION_INFO.elements.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{SECTION_INFO.elements.description}</p>
                    <Link href="/instructions#elemental-balance" className="text-xs text-primary hover:underline block pt-1">Learn more →</Link>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="relative z-10">
              <ElementalBalance planets={planets} />
            </div>
          </section>
        </div>

        {/* ── Row 3: Nakshatra ── */}
        {nakshatraInfo && (
          <section id="nakshatra" className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-5 relative overflow-hidden mb-4 sm:mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="flex items-center justify-between mb-2 sm:mb-3 relative z-10">
              <h2 className="text-base sm:text-lg font-serif text-foreground/80">
                Nakshatra <span className="font-arabic text-sm sm:text-base text-foreground/60 ml-1 sm:ml-2">النكشترا</span>
              </h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                    <Info className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" data-testid="info-nakshatra" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">{SECTION_INFO.nakshatra.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{SECTION_INFO.nakshatra.description}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="relative z-10">
              <NakshatraDisplay nakshatraInfo={nakshatraInfo} planetNakshatras={planetNakshatras} />
            </div>
          </section>
        )}

        {/* ── Row 4: Feng Shui Time Energy ── */}
        {chineseTimeEnergy && (
          <section id="chinese-astro" className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-5 relative overflow-hidden mb-4 sm:mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="flex items-center justify-between mb-2 sm:mb-3 relative z-10">
              <h2 className="text-base sm:text-lg font-serif text-foreground/80">
                Feng Shui Time Energy <span className="text-sm sm:text-base text-foreground/60 ml-1 sm:ml-2">風水時能</span>
              </h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                    <Info className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" data-testid="info-chinese-astro" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">{SECTION_INFO.chineseAstro.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{SECTION_INFO.chineseAstro.description}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="relative z-10">
              <ChineseAstroDisplay timeEnergy={chineseTimeEnergy} />
            </div>
          </section>
        )}

        {/* ── Row 5: Celestial Zodiac Wheel ── */}
        <section id="sky-map" className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 order-first sm:order-2 flex-1">
              <h2 className="text-base sm:text-lg font-serif text-center sm:text-left text-foreground/80">
                Current Sky Map <span className="font-arabic text-sm sm:text-base text-foreground/60 ml-1 sm:ml-2">خريطة السماء الحالية</span>
              </h2>
              <div className="flex items-center gap-1.5 bg-card/60 rounded-lg px-2 py-1 border border-border mx-auto sm:mx-0">
                <span className={`text-[10px] ${!useSidereal ? "text-primary font-medium" : "text-muted-foreground"}`}>Tropical</span>
                <Switch checked={useSidereal} onCheckedChange={setUseSidereal} className="scale-75" data-testid="skymap-zodiac-toggle" />
                <span className={`text-[10px] ${useSidereal ? "text-primary font-medium" : "text-muted-foreground"}`}>Sidereal</span>
              </div>
            </div>

            <div className="hidden sm:block bg-card/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-border text-right order-3">
              <div className="text-lg font-mono font-light tabular-nums">{format(now, "h:mm a")}</div>
              <div className="text-xs text-muted-foreground">{format(now, "EEEE, MMMM d, yyyy")}</div>
              <div className="text-sm text-gold/80 font-arabic">{hijriDate}</div>
            </div>

            <div className="hidden md:block bg-card/60 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-2 border border-border order-1">
              <div className="text-[10px] sm:text-xs text-muted-foreground mb-1.5 sm:mb-2 font-medium">Legend <span className="font-arabic">دليل</span></div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[10px] sm:text-xs">
                <div>
                  <div className="text-[8px] sm:text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-0.5">Element</div>
                  <div className="flex flex-wrap gap-1.5">
                    <div className="flex items-center gap-0.5"><Flame className="w-2.5 h-2.5" style={{ color: "rgb(239, 68, 68)" }} /><span className="text-muted-foreground">Fire</span></div>
                    <div className="flex items-center gap-0.5"><Mountain className="w-2.5 h-2.5" style={{ color: "rgb(34, 197, 94)" }} /><span className="text-muted-foreground">Earth</span></div>
                    <div className="flex items-center gap-0.5"><Wind className="w-2.5 h-2.5" style={{ color: "rgb(251, 191, 36)" }} /><span className="text-muted-foreground">Air</span></div>
                    <div className="flex items-center gap-0.5"><Droplets className="w-2.5 h-2.5" style={{ color: "rgb(59, 130, 246)" }} /><span className="text-muted-foreground">Water</span></div>
                  </div>
                </div>
                <div>
                  <div className="text-[8px] sm:text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-0.5">Season</div>
                  <div className="flex flex-wrap gap-1.5">
                    <div className="flex items-center gap-0.5"><Flower2 className="w-2.5 h-2.5" style={{ color: "#22c55e" }} /><span className="text-muted-foreground">Spr</span></div>
                    <div className="flex items-center gap-0.5"><Sun className="w-2.5 h-2.5" style={{ color: "#f59e0b" }} /><span className="text-muted-foreground">Sum</span></div>
                    <div className="flex items-center gap-0.5"><Leaf className="w-2.5 h-2.5" style={{ color: "#f97316" }} /><span className="text-muted-foreground">Aut</span></div>
                    <div className="flex items-center gap-0.5"><Snowflake className="w-2.5 h-2.5" style={{ color: "#60a5fa" }} /><span className="text-muted-foreground">Win</span></div>
                  </div>
                </div>
                <div>
                  <div className="text-[8px] sm:text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-0.5">Modality</div>
                  <div className="flex flex-wrap gap-1.5">
                    <div className="flex items-center gap-0.5"><Triangle className="w-2.5 h-2.5" style={{ color: "#ef4444" }} /><span className="text-muted-foreground">Card</span></div>
                    <div className="flex items-center gap-0.5"><div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "#22c55e" }} /><span className="text-muted-foreground">Fix</span></div>
                    <div className="flex items-center gap-0.5"><Wind className="w-2.5 h-2.5" style={{ color: "#3b82f6" }} /><span className="text-muted-foreground">Mut</span></div>
                  </div>
                </div>
                <div>
                  <div className="text-[8px] sm:text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-0.5">Polarity</div>
                  <div className="flex flex-wrap gap-1.5">
                    <div className="flex items-center gap-0.5"><Mars className="w-2.5 h-2.5" style={{ color: "#f59e0b" }} /><span className="text-muted-foreground">Masc</span></div>
                    <div className="flex items-center gap-0.5"><CircleDot className="w-2.5 h-2.5" style={{ color: "#a78bfa" }} /><span className="text-muted-foreground">Fem</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <ZodiacWheel planets={planets} variant="expanded" ingresses={ingresses} />
          </div>
        </section>

        {/* Footer */}
        <Footer />
        <TableOfContents sections={HOME_SECTIONS} title="Page Sections" />
      </div>
    </div>
  );
}
