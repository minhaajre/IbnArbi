import { useEffect, useState } from "react";
import { Link } from "wouter";
import { 
  getPlanetaryHours, 
  getPlanetaryPositions, 
  getLunarMansion, 
  getHijriDate,
  getMoonPhase,
  getLunarMansionProgress,
  getWhiteDaysInfo,
  getPlanetIngresses,
  getMoonTimes,
  PlanetaryHour,
  PlanetStatus,
  MoonPhaseInfo,
  MansionProgress,
  WhiteDaysInfo,
  PlanetIngress,
  MoonTimes
} from "@/lib/astronomy";
import { AYANAMSHA_J2000, PLANET_PROPHETS, PLANET_ARABIC } from "@/lib/constants";
import { PlanetaryHoursDisplay } from "@/components/PlanetaryHoursDisplay";
import { PlanetaryTable } from "@/components/PlanetaryTable";
import { MansionCard } from "@/components/MansionCard";
import { ZodiacWheel } from "@/components/ZodiacWheel";
import { ElementalBalance } from "@/components/ElementalBalance";
import { PlanetaryProtocol } from "@/components/PlanetaryProtocol";
import { MapPin, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, RotateCcw, Moon, Sun, AlertTriangle, Search, Flame, Mountain, Wind, Droplets, Flower2, Leaf, Snowflake, Triangle, CircleDot, Mars, Sparkles, Crown, BookOpen, Info } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";

const SECTION_INFO = {
  lunarMansion: {
    title: "Lunar Mansions",
    description: "The Moon travels through each of the 28 mansions approximately every day. Each mansion is a place where a specific divine quality enters time, shaping events and spiritual openings. Check whether the mansion is Blessed or Challenging to know how to align your activities.",
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
};

export default function Home() {
  // State
  const [now, setNow] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAutoTime, setIsAutoTime] = useState(true);
  const [location, setLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [useSidereal, setUseSidereal] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  
  // Manual Location State
  const [manualCity, setManualCity] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  // Astronomical Data
  const [hoursData, setHoursData] = useState<ReturnType<typeof getPlanetaryHours> | null>(null);
  const [planets, setPlanets] = useState<PlanetStatus[]>([]);
  const [mansion, setMansion] = useState<any>(null);
  const [hijriDate, setHijriDate] = useState<string>("");
  const [moonPhase, setMoonPhase] = useState<MoonPhaseInfo | null>(null);
  const [mansionProgress, setMansionProgress] = useState<MansionProgress | null>(null);
  const [whiteDaysInfo, setWhiteDaysInfo] = useState<WhiteDaysInfo | null>(null);
  const [ingresses, setIngresses] = useState<PlanetIngress[]>([]);
  const [moonTimes, setMoonTimes] = useState<MoonTimes | null>(null);
  
  // Selected planet for protocol display
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  
  // Separate time for planetary hours section
  const [hoursTime, setHoursTime] = useState<Date>(new Date());
  const [hoursTimeAuto, setHoursTimeAuto] = useState(true);
  const [hoursSelectedDate, setHoursSelectedDate] = useState<Date | undefined>(new Date());
  const [hoursSectionData, setHoursSectionData] = useState<ReturnType<typeof getPlanetaryHours> | null>(null);

  // Timer
  useEffect(() => {
    if (!isAutoTime) return;
    const timer = setInterval(() => {
      const d = new Date();
      setNow(d);
      setSelectedDate(d);
    }, 60000);
    return () => clearInterval(timer);
  }, [isAutoTime]);

  // Timer for hours section (independent)
  useEffect(() => {
    if (!hoursTimeAuto) return;
    const timer = setInterval(() => {
      const d = new Date();
      setHoursTime(d);
      setHoursSelectedDate(d);
    }, 60000);
    return () => clearInterval(timer);
  }, [hoursTimeAuto]);

  // Handle Date Selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setIsAutoTime(false);
      setSelectedDate(date);
      
      const newDate = new Date(date);
      const currentTime = new Date(); // preserve current time
      newDate.setHours(currentTime.getHours(), currentTime.getMinutes());
      setNow(newDate);
    }
  };

  const resetToNow = () => {
    const d = new Date();
    setIsAutoTime(true);
    setSelectedDate(d);
    setNow(d);
  };

  // Hours section date selection (independent)
  const handleHoursDateSelect = (date: Date | undefined) => {
    if (date) {
      setHoursTimeAuto(false);
      setHoursSelectedDate(date);
      const newDate = new Date(date);
      newDate.setHours(hoursTime.getHours(), hoursTime.getMinutes());
      setHoursTime(newDate);
    }
  };

  const handleHoursTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      setHoursTimeAuto(false);
      const newDate = new Date(hoursTime);
      newDate.setHours(hours, minutes, 0, 0);
      setHoursTime(newDate);
    }
  };

  const resetHoursToNow = () => {
    const d = new Date();
    setHoursTimeAuto(true);
    setHoursSelectedDate(d);
    setHoursTime(d);
  };

  // Initialize Location
  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Attempt to find city name via reverse geocoding (OpenMeteo/BigDataCloud/etc - using client-side free API for demo)
          // Simple fallback if no API available is just "Detected Location"
          let cityName = "Detected Location";
          try {
             const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`);
             const data = await res.json();
             if (data.city || data.locality) {
               cityName = `${data.city || data.locality}, ${data.countryName}`;
             }
          } catch (e) {
            console.warn("Reverse geocoding failed", e);
          }

          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: cityName
          });
          setIsLocating(false);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setLocation({ lat: 21.3891, lng: 39.8579, name: "Mecca (Default)" });
          setError("Location access denied. Using default.");
          setIsLocating(false);
        }
      );
    } else {
      setLocation({ lat: 21.3891, lng: 39.8579, name: "Mecca (Default)" });
      setIsLocating(false);
    }
  };

  const handleManualLocationSearch = async () => {
    if (!manualCity) return;
    setIsLocating(true);
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(manualCity)}&count=1&language=en&format=json`);
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        const place = data.results[0];
        setLocation({
          lat: place.latitude,
          lng: place.longitude,
          name: `${place.name}, ${place.country}`
        });
      } else {
        // Fallback or error
        console.warn("City not found");
      }
    } catch (e) {
      console.error("Geocoding error", e);
    } finally {
      setIsLocating(false);
    }
  };

  // Calculations
  useEffect(() => {
    if (!location) return;

    try {
      const hours = getPlanetaryHours(now, location.lat, location.lng);
      const planetPos = getPlanetaryPositions(now, useSidereal);
      const moonMansion = getLunarMansion(now, useSidereal);
      const hijri = getHijriDate(now);
      const phase = getMoonPhase(now, useSidereal);

      const progress = getLunarMansionProgress(now, useSidereal);
      const whiteInfo = getWhiteDaysInfo(now);
      const planetIngresses = getPlanetIngresses(now, useSidereal);
      const moonRiseSet = getMoonTimes(now, location.lat, location.lng);

      setHoursData(hours);
      setPlanets(planetPos);
      setMansion(moonMansion);
      setHijriDate(hijri);
      setMoonPhase(phase);
      setMansionProgress(progress);
      setWhiteDaysInfo(whiteInfo);
      setIngresses(planetIngresses);
      setMoonTimes(moonRiseSet);
      setLoading(false);
    } catch (e) {
      console.error("Calculation error:", e);
      setError("Failed to calculate astronomical data.");
    }
  }, [now, location, useSidereal]);

  // Separate calculation for hours section (uses hoursTime)
  useEffect(() => {
    if (!location) return;
    try {
      const hours = getPlanetaryHours(hoursTime, location.lat, location.lng);
      setHoursSectionData(hours);
    } catch (e) {
      console.error("Hours calculation error:", e);
    }
  }, [hoursTime, location]);

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

  // Find Moon info for display
  const moonPlanet = planets.find(p => p.name === "Moon");

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* Hero Section */}
      <header className="container-premium py-8 md:py-12">
        {/* Top Row: Title + Controls */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-primary mb-2">Ibn Arabi's Cosmology</h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Guide to the Celestial Spheres
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Sidereal/Tropical Pills */}
            <div className="flex items-center gap-1 p-1 bg-secondary rounded-full">
              <button 
                onClick={() => setUseSidereal(false)}
                className={`pill ${!useSidereal ? 'pill-active' : 'pill-inactive border-0'}`}
              >
                Tropical
              </button>
              <button 
                onClick={() => setUseSidereal(true)}
                className={`pill ${useSidereal ? 'pill-active' : 'pill-inactive border-0'}`}
              >
                Sidereal
              </button>
            </div>

            {/* Location */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full h-10 px-4 border-border">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="truncate max-w-[120px]">{location?.name}</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Location Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter city name..." 
                      value={manualCity} 
                      onChange={(e) => setManualCity(e.target.value)} 
                      onKeyDown={(e) => e.key === 'Enter' && handleManualLocationSearch()}
                    />
                    <Button onClick={handleManualLocationSearch} disabled={isLocating}>
                      {isLocating ? <span className="animate-spin">⟳</span> : <Search className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground text-center">- OR -</div>
                  <Button variant="secondary" onClick={detectLocation} className="w-full" disabled={isLocating}>
                    {isLocating ? "Detecting..." : "Auto-Detect Location"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Theme Toggle */}
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full w-10 h-10 border-border"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Instructions */}
            <Link href="/instructions">
              <Button variant="outline" size="sm" className="rounded-full h-10 px-4 border-border" data-testid="link-instructions">
                <BookOpen className="w-4 h-4 mr-2" />
                Instructions
              </Button>
            </Link>
          </div>
        </div>

        {/* Date & Time Row */}
        <div className="flex flex-wrap items-end justify-between gap-4 pb-8 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl md:text-5xl font-light tabular-nums tracking-tight">
                {format(now, "h:mm")}
              </span>
              <span className="text-xl text-muted-foreground">{format(now, "a")}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">{format(now, "EEEE, MMMM d, yyyy")}</span>
              <span className="text-primary/70">•</span>
              <span className="font-arabic text-primary">{hijriDate}</span>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-1">
              * Islamic date begins at sunset
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {whiteDaysInfo && whiteDaysInfo.isWhiteDay && (
              <div className="pill bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20" data-testid="white-days-indicator">
                <Moon className="w-4 h-4 mr-2" />
                White Day - Blessed Fast
              </div>
            )}
            {whiteDaysInfo && !whiteDaysInfo.isWhiteDay && whiteDaysInfo.daysUntilNext <= 3 && (
              <span className="meta-text" data-testid="white-days-upcoming">
                White days in {whiteDaysInfo.daysUntilNext} days
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-premium py-12 space-y-12">
        
        {/* Row 1: Lunar Mansion + Planetary Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Lunar Mansion Card */}
          <section className="premium-card hover-lift">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="section-label">Current Lunar Mansion</p>
                <p className="font-arabic text-muted-foreground/70 text-sm text-right">المنزلة القمرية الحالية</p>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Info className="w-4 h-4 text-muted-foreground hover:text-primary" data-testid="info-lunar-mansion" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">{SECTION_INFO.lunarMansion.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{SECTION_INFO.lunarMansion.description}</p>
                    <Link href="/instructions#lunar-mansions" className="text-sm text-primary hover:underline block pt-1 font-medium">
                      Learn more →
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <MansionCard mansion={mansion} progress={mansionProgress ?? undefined} />
          </section>

          {/* Planetary Hours Card */}
          <section className="premium-card hover-lift">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="section-label">Planetary Hours</p>
                <p className="font-arabic text-muted-foreground/70 text-sm text-right">الساعات الكوكبية</p>
              </div>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 rounded-full" data-testid="hours-date-picker">
                      <CalendarIcon className="mr-2 h-4 w-4" />
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
                  className="h-9 text-sm px-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                  data-testid="hours-time-picker"
                />
                {!hoursTimeAuto && (
                  <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full" onClick={resetHoursToNow} data-testid="hours-reset-button">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                )}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Info className="w-4 h-4 text-muted-foreground hover:text-primary" data-testid="info-planetary-hours" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">{SECTION_INFO.planetaryHours.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{SECTION_INFO.planetaryHours.description}</p>
                      <Link href="/instructions#planetary-hours" className="text-sm text-primary hover:underline block pt-1 font-medium">
                        Learn more →
                      </Link>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Moon Info Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-border/50">
              {moonPlanet && (
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{moonPlanet.sign}</span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {Math.floor(moonPlanet.degree)}°{Math.round((moonPlanet.degree % 1) * 60)}'
                  </span>
                  {moonPhase?.isVoidOfCourse && (
                    <span className="text-xs font-semibold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> VOC
                    </span>
                  )}
                </div>
              )}
              {moonPhase && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{moonPhase.label}</span>
                  <span className="text-sm px-2 py-1 rounded-full bg-secondary font-mono">
                    {Math.round(moonPhase.illumination)}%
                  </span>
                  {moonTimes && (
                    <div className="text-sm text-muted-foreground flex items-center gap-3">
                      {moonTimes.moonrise && <span>↑ {format(moonTimes.moonrise, "h:mm a")}</span>}
                      {moonTimes.moonset && <span>↓ {format(moonTimes.moonset, "h:mm a")}</span>}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Hours Display */}
            {(() => {
              const hoursToUse = hoursSectionData || hoursData;
              const nextHoursIndexForSection = hoursToUse.hours.findIndex(h => h === hoursToUse.currentHour);
              const nextHoursForSection = hoursToUse.hours.slice(nextHoursIndexForSection + 1).concat(hoursToUse.hours.slice(0, nextHoursIndexForSection + 1));
              return (
                <PlanetaryHoursDisplay 
                  currentHour={hoursToUse.currentHour}
                  nextHours={nextHoursForSection}
                  dayRuler={hoursToUse.dayRuler}
                  selectedPlanet={selectedPlanet}
                  onPlanetSelect={setSelectedPlanet}
                />
              );
            })()}
            
            <p className="meta-text text-right mt-4">Last Updated: {format(new Date(), "h:mm a")}</p>

            {/* Day Ruler & Protocol */}
            {(hoursSectionData || hoursData).currentHour && (
              <div className="mt-6 pt-6 border-t border-border/50 space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-primary" />
                    <span className="font-medium">Day Ruler:</span>
                    <span className="text-lg">{(hoursSectionData || hoursData).dayRuler}</span>
                    <span className="font-arabic text-muted-foreground">{PLANET_ARABIC[(hoursSectionData || hoursData).dayRuler]?.arabic}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm">{PLANET_PROPHETS[(hoursSectionData || hoursData).dayRuler]?.name}</span>
                    <span className="font-arabic text-sm text-primary">{PLANET_PROPHETS[(hoursSectionData || hoursData).dayRuler]?.arabic}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-muted-foreground">
                      {selectedPlanet ? `${selectedPlanet} Protocol` : "Hour Protocol"}
                      <span className="font-arabic text-sm ml-2">البروتوكول</span>
                    </h4>
                    {selectedPlanet && (
                      <button onClick={() => setSelectedPlanet(null)} className="text-xs px-2 py-1 rounded bg-secondary hover:bg-secondary/80" data-testid="reset-protocol-planet">
                        Reset
                      </button>
                    )}
                  </div>
                  <PlanetaryProtocol activePlanet={selectedPlanet || (hoursSectionData || hoursData).currentHour?.planet || (hoursSectionData || hoursData).dayRuler} />
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Row 2: Dignities + Elements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Celestial Dignities */}
          <section className="premium-card hover-lift">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="section-label">Celestial Dignities</p>
                <p className="font-arabic text-muted-foreground/70 text-sm text-right">الكرامات السماوية</p>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Info className="w-4 h-4 text-muted-foreground hover:text-primary" data-testid="info-dignities" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">{SECTION_INFO.dignities.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{SECTION_INFO.dignities.description}</p>
                    <Link href="/instructions#celestial-dignities" className="text-sm text-primary hover:underline block pt-1 font-medium">
                      Learn more →
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="overflow-x-auto">
              <PlanetaryTable planets={planets} useSidereal={useSidereal} onToggleSystem={setUseSidereal} />
            </div>
          </section>

          {/* Elemental Balance */}
          <section className="premium-card hover-lift">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="section-label">Elemental Balance</p>
                <p className="font-arabic text-muted-foreground/70 text-sm text-right">توازن العناصر</p>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Info className="w-4 h-4 text-muted-foreground hover:text-primary" data-testid="info-elements" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">{SECTION_INFO.elements.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{SECTION_INFO.elements.description}</p>
                    <Link href="/instructions#elemental-balance" className="text-sm text-primary hover:underline block pt-1 font-medium">
                      Learn more →
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <ElementalBalance planets={planets} />
          </section>
        </div>

        {/* Row 3: Sky Map */}
        <section className="premium-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <p className="section-label">Current Sky Map</p>
              <p className="font-arabic text-muted-foreground/70 text-sm">خريطة السماء الحالية</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              {/* Zodiac Toggle */}
              <div className="flex items-center gap-1 p-1 bg-secondary rounded-full">
                <button 
                  onClick={() => setUseSidereal(false)}
                  className={`pill text-xs ${!useSidereal ? 'pill-active' : 'pill-inactive border-0'}`}
                  data-testid="skymap-zodiac-toggle"
                >
                  Tropical
                </button>
                <button 
                  onClick={() => setUseSidereal(true)}
                  className={`pill text-xs ${useSidereal ? 'pill-active' : 'pill-inactive border-0'}`}
                >
                  Sidereal
                </button>
              </div>
              
              {/* Time Display */}
              <div className="text-right">
                <div className="text-lg font-light tabular-nums">{format(now, "h:mm a")}</div>
                <div className="text-sm text-muted-foreground">{format(now, "MMM d, yyyy")}</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-secondary/50 rounded-xl">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Elements</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="flex items-center gap-1"><Flame className="w-3 h-3" style={{ color: 'rgb(239, 68, 68)' }} />Fire</span>
                <span className="flex items-center gap-1"><Mountain className="w-3 h-3" style={{ color: 'rgb(34, 197, 94)' }} />Earth</span>
                <span className="flex items-center gap-1"><Wind className="w-3 h-3" style={{ color: 'rgb(251, 191, 36)' }} />Air</span>
                <span className="flex items-center gap-1"><Droplets className="w-3 h-3" style={{ color: 'rgb(59, 130, 246)' }} />Water</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Season</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="flex items-center gap-1"><Flower2 className="w-3 h-3" style={{ color: '#22c55e' }} />Spring</span>
                <span className="flex items-center gap-1"><Sun className="w-3 h-3" style={{ color: '#f59e0b' }} />Summer</span>
                <span className="flex items-center gap-1"><Leaf className="w-3 h-3" style={{ color: '#f97316' }} />Autumn</span>
                <span className="flex items-center gap-1"><Snowflake className="w-3 h-3" style={{ color: '#60a5fa' }} />Winter</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Modality</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="flex items-center gap-1"><Triangle className="w-3 h-3" style={{ color: '#ef4444' }} />Cardinal</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#22c55e' }} />Fixed</span>
                <span className="flex items-center gap-1"><Wind className="w-3 h-3" style={{ color: '#3b82f6' }} />Mutable</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Polarity</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="flex items-center gap-1"><Mars className="w-3 h-3" style={{ color: '#f59e0b' }} />Masculine</span>
                <span className="flex items-center gap-1"><CircleDot className="w-3 h-3" style={{ color: '#a78bfa' }} />Feminine</span>
              </div>
            </div>
          </div>

          <ZodiacWheel planets={planets} variant="expanded" ingresses={ingresses} />
        </section>
      </main>
    </div>
  );
}
