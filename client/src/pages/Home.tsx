import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
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
import { MapPin, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, RotateCcw, Moon, Sun, AlertTriangle, Search, Flame, Mountain, Wind, Droplets, Flower2, Leaf, Snowflake, Triangle, CircleDot, Mars, Sparkles, Crown, BookOpen, Info, Mail, Loader2, User } from "lucide-react";
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
  const [, navigate] = useLocation();
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
  const [isProtocolExpanded, setIsProtocolExpanded] = useState(false);
  
  // Moment capture state
  const [captureEmail, setCaptureEmail] = useState("");
  const [isCaptureSending, setIsCaptureSending] = useState(false);
  const [captureMessage, setCaptureMessage] = useState("");
  
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

  // Send moment capture email
  const handleSendMomentCapture = async () => {
    if (!captureEmail) {
      setCaptureMessage("Please enter your email");
      return;
    }

    setIsCaptureSending(true);
    setCaptureMessage("");

    try {
      const momentData = {
        currentTime: now,
        currentMansion: mansion,
        planetaryHour: (hoursSectionData || hoursData)?.currentHour,
        dayRuler: (hoursSectionData || hoursData)?.dayRuler,
        location,
        moonPhase,
        planets: planets.slice(0, 7),
        hijriDate,
        dominant_element: planets.length > 0 ? planets[0].sign : null,
      };

      const response = await fetch("/api/send-moment-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: captureEmail, momentData }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setCaptureMessage("✓ Moment capture sent to your email!");
      setCaptureEmail("");
      setTimeout(() => setCaptureMessage(""), 3000);
    } catch (error) {
      setCaptureMessage("Failed to send. Please try again.");
    } finally {
      setIsCaptureSending(false);
    }
  };

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
    <div className="min-h-screen bg-background text-foreground p-3 sm:p-6 md:p-12 max-w-7xl mx-auto transition-colors duration-500">
      
      {/* Header */}
      <header className="flex flex-col gap-4 sm:gap-6 border-b border-border pb-4 sm:pb-8 mb-6 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif text-gold mb-1 sm:mb-2">Ibn Arabi's Cosmology</h1>
            <p className="text-muted-foreground font-light tracking-wide text-sm sm:text-base">
              Guide to the Celestial Spheres
            </p>
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
                size="icon" 
                className="bg-card/50 border-border h-8 w-8 sm:h-9 sm:w-9"
                data-testid="link-instructions"
                title="Guidance"
              >
                <BookOpen className="w-4 h-4" />
              </Button>
            </Link>

            {/* Sidereal Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-card/50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 border border-border">
              <span className={`text-[10px] sm:text-xs ${!useSidereal ? 'text-primary' : 'text-muted-foreground'}`}>Tropical</span>
              <Switch checked={useSidereal} onCheckedChange={setUseSidereal} className="scale-90 sm:scale-100" />
              <span className={`text-[10px] sm:text-xs ${useSidereal ? 'text-primary' : 'text-muted-foreground'}`}>Sidereal</span>
            </div>

            {/* Capture Moment Dialog - Dev only */}
            {import.meta.env.DEV && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" className="bg-card/50 border-border h-8 w-8 sm:h-9 sm:w-9" data-testid="capture-moment" title="Capture Moment">
                    <Mail className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Email Moment Capture</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="capture-email" className="text-xs sm:text-sm">Your Email</Label>
                      <Input
                        id="capture-email"
                        type="email"
                        placeholder="your@email.com"
                        value={captureEmail}
                        onChange={(e) => setCaptureEmail(e.target.value)}
                        disabled={isCaptureSending}
                        className="text-xs sm:text-sm"
                        data-testid="capture-email-input"
                      />
                    </div>
                    <Button
                      onClick={handleSendMomentCapture}
                      disabled={isCaptureSending}
                      className="w-full text-xs sm:text-sm"
                      data-testid="send-capture-button"
                    >
                      {isCaptureSending ? (
                        <>
                          <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          Send to Email
                        </>
                      )}
                    </Button>
                    {captureMessage && (
                      <p className={`text-xs sm:text-sm text-center ${captureMessage.includes('✓') ? 'text-green-500' : 'text-red-500'}`}>
                        {captureMessage}
                      </p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {/* Location Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="bg-card/50 border-border h-8 w-8 sm:h-9 sm:w-9" title={location?.name}>
                  <MapPin className="w-4 h-4 shrink-0" />
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

            {/* Personal Chart Button - Dev only */}
            {import.meta.env.DEV && (
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => navigate("/chart")}
                className="bg-card/50 border-border h-8 w-8 sm:h-9 sm:w-9"
                data-testid="chart-button"
                title="Personal Chart"
              >
                <User className="w-4 h-4" />
              </Button>
            )}

          </div>
        </div>

        {/* Time Display - Mobile friendly row */}
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 pt-2 sm:pt-0">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-xl sm:text-3xl font-mono font-light tabular-nums tracking-tighter">
                {format(now, "h:mm a")}
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-muted-foreground text-xs">
                  {format(now, "MMM d, yyyy")}
                </div>
                <div className="text-gold/80 font-arabic text-sm sm:text-base">
                  {hijriDate}
                </div>
              </div>
            </div>
            <div className="text-[9px] text-muted-foreground/50 italic pl-0">
              * Islamic date begins at sunset, not midnight
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {whiteDaysInfo && whiteDaysInfo.isWhiteDay && (
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

      {/* Row 1: Station + Planetary Hour (side by side) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        
        {/* Current Station Card - Glass Effect */}
        <section className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-5 relative overflow-hidden">
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
                  <Link href="/instructions#lunar-mansions" className="text-xs text-primary hover:underline block pt-1">
                    Learn more →
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="relative z-10">
            <MansionCard mansion={mansion} progress={mansionProgress ?? undefined} />
          </div>
        </section>

        {/* Planetary Hour Card - Glass Effect */}
        <section className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          {/* Header with date picker */}
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
                    <Link href="/instructions#planetary-hours" className="text-xs text-primary hover:underline block pt-1">
                      Learn more →
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 sm:h-7 text-[10px] sm:text-xs px-2" data-testid="hours-date-picker">
                    <CalendarIcon className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    {hoursSelectedDate ? format(hoursSelectedDate, "MMM d") : "Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={hoursSelectedDate}
                    onSelect={handleHoursDateSelect}
                    initialFocus
                  />
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

          {/* Moon Sign + Moon Phase Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 sm:mb-3 relative z-10">
            {/* Moon Sign - Left */}
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
            
            {/* Moon Phase - Right */}
            {moonPhase && (
              <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap">
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                  {moonPhase.isWaxing ? <Sun className="w-3 h-3 sm:w-4 sm:h-4" /> : <Moon className="w-3 h-3 sm:w-4 sm:h-4" />}
                  <span className="hidden xs:inline">{moonPhase.label}</span>
                </div>
                <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-foreground/10 font-mono border border-border">
                  {Math.round(moonPhase.illumination)}%
                </span>
                {moonTimes && (
                  <div className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-2">
                    {moonTimes.moonrise && (
                      <span>☽↑ {format(moonTimes.moonrise, "h:mm a")}</span>
                    )}
                    {moonTimes.moonset && (
                      <span>☽↓ {format(moonTimes.moonset, "h:mm a")}</span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
           
          <div className="relative z-10">
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
            {/* Last Updated */}
            <div className="text-[10px] sm:text-xs text-muted-foreground/50 mt-2 text-right">
              Last Updated: {format(new Date(), "h:mm a")}
            </div>
          </div>
          
          {/* Day Ruler & Planetary Protocol - Merged Section */}
          {(hoursSectionData || hoursData).currentHour && (
            <div className="relative z-10 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border space-y-3 sm:space-y-4">
              {/* Day Ruler Row */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
                  <span className="text-xs sm:text-sm font-medium text-foreground/70">Day Ruler</span>
                  <span className="font-arabic text-[10px] sm:text-xs text-foreground/50">حاكم اليوم</span>
                </div>
                <div className="h-4 w-px bg-border hidden sm:block" />
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-base sm:text-lg" style={{ color: (hoursSectionData || hoursData).dayRuler === 'Sun' ? '#f59e0b' : (hoursSectionData || hoursData).dayRuler === 'Moon' ? '#94a3b8' : '#888' }}>
                    {(hoursSectionData || hoursData).dayRuler === 'Sun' ? '☉' : (hoursSectionData || hoursData).dayRuler === 'Moon' ? '☽' : (hoursSectionData || hoursData).dayRuler === 'Mars' ? '♂' : (hoursSectionData || hoursData).dayRuler === 'Mercury' ? '☿' : (hoursSectionData || hoursData).dayRuler === 'Jupiter' ? '♃' : (hoursSectionData || hoursData).dayRuler === 'Venus' ? '♀' : '♄'}
                  </span>
                  <span className="font-serif text-sm sm:text-base text-foreground">{(hoursSectionData || hoursData).dayRuler}</span>
                  <span className="font-arabic text-xs sm:text-sm text-foreground/60">{PLANET_ARABIC[(hoursSectionData || hoursData).dayRuler]?.arabic}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 bg-foreground/5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg border border-border">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold" />
                  <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline">Prophet:</span>
                  <span className="text-[10px] sm:text-xs text-gold font-medium">{PLANET_PROPHETS[(hoursSectionData || hoursData).dayRuler]?.name}</span>
                  <span className="text-xs sm:text-sm font-arabic text-primary/80">{PLANET_PROPHETS[(hoursSectionData || hoursData).dayRuler]?.arabic}</span>
                </div>
              </div>
              
              {/* Protocol Row */}
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
                  activePlanet={selectedPlanet || (hoursSectionData || hoursData).currentHour?.planet || (hoursSectionData || hoursData).dayRuler}
                  isExpanded={isProtocolExpanded}
                  onToggleExpanded={() => setIsProtocolExpanded(!isProtocolExpanded)}
                />
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Row 2: Dignities + Elemental Balance (side by side) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        
        {/* Celestial Dignities - Glass Effect */}
        <section className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-5 relative overflow-hidden">
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
                  <Link href="/instructions#celestial-dignities" className="text-xs text-primary hover:underline block pt-1">
                    Learn more →
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="relative z-10 overflow-x-auto">
            <PlanetaryTable 
              planets={planets} 
              useSidereal={useSidereal}
              onToggleSystem={setUseSidereal}
            />
          </div>
        </section>

        {/* Elemental Balance - Glass Effect */}
        <section className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-5 relative overflow-hidden">
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
                  <Link href="/instructions#elemental-balance" className="text-xs text-primary hover:underline block pt-1">
                    Learn more →
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="relative z-10">
            <ElementalBalance planets={planets} />
          </div>
        </section>
      </div>

      {/* Row 3: Celestial Zodiac Wheel (full width) */}
      <section className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        {/* Sky Map Header - Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3 relative z-10">
          {/* Title - Centered on mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 order-first sm:order-2 flex-1">
            <h2 className="text-base sm:text-lg font-serif text-center sm:text-left">
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                Current Sky Map
              </span>
              <span className="font-arabic text-sm sm:text-base text-foreground/60 ml-1 sm:ml-2">خريطة السماء الحالية</span>
            </h2>
            <div className="flex items-center gap-1.5 bg-card/60 rounded-lg px-2 py-1 border border-border mx-auto sm:mx-0">
              <span className={`text-[10px] ${!useSidereal ? 'text-primary font-medium' : 'text-muted-foreground'}`}>Tropical</span>
              <Switch checked={useSidereal} onCheckedChange={setUseSidereal} className="scale-75" data-testid="skymap-zodiac-toggle" />
              <span className={`text-[10px] ${useSidereal ? 'text-primary font-medium' : 'text-muted-foreground'}`}>Sidereal</span>
            </div>
          </div>

          {/* Time info - Right on desktop, hidden on mobile (already shown in header) */}
          <div className="hidden sm:block bg-card/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-border text-right order-3">
            <div className="text-lg font-mono font-light tabular-nums">{format(now, "h:mm a")}</div>
            <div className="text-xs text-muted-foreground">{format(now, "EEEE, MMMM d, yyyy")}</div>
            <div className="text-sm text-gold/80 font-arabic">{hijriDate}</div>
          </div>

          {/* Legend - Collapsible on mobile */}
          <div className="hidden md:block bg-card/60 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-2 border border-border order-1">
            <div className="text-[10px] sm:text-xs text-muted-foreground mb-1.5 sm:mb-2 font-medium">Legend <span className="font-arabic">دليل</span></div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[10px] sm:text-xs">
              {/* Elements - matches ZodiacWheel ELEMENT_COLORS */}
              <div>
                <div className="text-[8px] sm:text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-0.5">Element</div>
                <div className="flex flex-wrap gap-1.5">
                  <div className="flex items-center gap-0.5"><Flame className="w-2.5 h-2.5" style={{ color: 'rgb(239, 68, 68)' }} /><span className="text-muted-foreground">Fire</span></div>
                  <div className="flex items-center gap-0.5"><Mountain className="w-2.5 h-2.5" style={{ color: 'rgb(34, 197, 94)' }} /><span className="text-muted-foreground">Earth</span></div>
                  <div className="flex items-center gap-0.5"><Wind className="w-2.5 h-2.5" style={{ color: 'rgb(251, 191, 36)' }} /><span className="text-muted-foreground">Air</span></div>
                  <div className="flex items-center gap-0.5"><Droplets className="w-2.5 h-2.5" style={{ color: 'rgb(59, 130, 246)' }} /><span className="text-muted-foreground">Water</span></div>
                </div>
              </div>
              {/* Season - matches ZodiacWheel SeasonIcon */}
              <div>
                <div className="text-[8px] sm:text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-0.5">Season</div>
                <div className="flex flex-wrap gap-1.5">
                  <div className="flex items-center gap-0.5"><Flower2 className="w-2.5 h-2.5" style={{ color: '#22c55e' }} /><span className="text-muted-foreground">Spr</span></div>
                  <div className="flex items-center gap-0.5"><Sun className="w-2.5 h-2.5" style={{ color: '#f59e0b' }} /><span className="text-muted-foreground">Sum</span></div>
                  <div className="flex items-center gap-0.5"><Leaf className="w-2.5 h-2.5" style={{ color: '#f97316' }} /><span className="text-muted-foreground">Aut</span></div>
                  <div className="flex items-center gap-0.5"><Snowflake className="w-2.5 h-2.5" style={{ color: '#60a5fa' }} /><span className="text-muted-foreground">Win</span></div>
                </div>
              </div>
              {/* Modality - matches ZodiacWheel ModalityIcon */}
              <div>
                <div className="text-[8px] sm:text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-0.5">Modality</div>
                <div className="flex flex-wrap gap-1.5">
                  <div className="flex items-center gap-0.5"><Triangle className="w-2.5 h-2.5" style={{ color: '#ef4444' }} /><span className="text-muted-foreground">Card</span></div>
                  <div className="flex items-center gap-0.5"><div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#22c55e' }} /><span className="text-muted-foreground">Fix</span></div>
                  <div className="flex items-center gap-0.5"><Wind className="w-2.5 h-2.5" style={{ color: '#3b82f6' }} /><span className="text-muted-foreground">Mut</span></div>
                </div>
              </div>
              {/* Polarity - matches ZodiacWheel PolarityIcon */}
              <div>
                <div className="text-[8px] sm:text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-0.5">Polarity</div>
                <div className="flex flex-wrap gap-1.5">
                  <div className="flex items-center gap-0.5"><Mars className="w-2.5 h-2.5" style={{ color: '#f59e0b' }} /><span className="text-muted-foreground">Masc</span></div>
                  <div className="flex items-center gap-0.5"><CircleDot className="w-2.5 h-2.5" style={{ color: '#a78bfa' }} /><span className="text-muted-foreground">Fem</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <ZodiacWheel 
            planets={planets} 
            variant="expanded"
            ingresses={ingresses}
          />
        </div>
      </section>
    </div>
  );
}
