import { useEffect, useState } from "react";
import { 
  getPlanetaryHours, 
  getPlanetaryPositions, 
  getLunarMansion, 
  getHijriDate,
  getMoonPhase,
  getLunarMansionProgress,
  getWhiteDaysInfo,
  PlanetaryHour,
  PlanetStatus,
  MoonPhaseInfo,
  MansionProgress,
  WhiteDaysInfo
} from "@/lib/astronomy";
import { AYANAMSHA_J2000 } from "@/lib/constants";
import { PlanetaryHoursDisplay } from "@/components/PlanetaryHoursDisplay";
import { PlanetaryTable } from "@/components/PlanetaryTable";
import { MansionCard } from "@/components/MansionCard";
import { ZodiacWheel } from "@/components/ZodiacWheel";
import { ElementalBalance } from "@/components/ElementalBalance";
import { PlanetaryProtocol } from "@/components/PlanetaryProtocol";
import { MapPin, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, RotateCcw, Moon, Sun, AlertTriangle, Search, Flame, Mountain, Wind, Droplets, Flower2, Leaf, Snowflake, ArrowRight, Circle, Repeat, Mars, Venus } from "lucide-react";
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

      setHoursData(hours);
      setPlanets(planetPos);
      setMansion(moonMansion);
      setHijriDate(hijri);
      setMoonPhase(phase);
      setMansionProgress(progress);
      setWhiteDaysInfo(whiteInfo);
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
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 max-w-7xl mx-auto transition-colors duration-500">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-border pb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-serif text-gold mb-2">Ibn Arabi's Cosmology</h1>
            <p className="text-muted-foreground font-light tracking-wide flex items-center gap-2">
              Guide to the Celestial Spheres
              <span className="px-2 py-0.5 rounded-full bg-foreground/5 text-xs border border-border">
                {useSidereal ? "Sidereal" : "Tropical"}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
             {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full w-9 h-9 border border-border"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Sidereal Toggle */}
            <div className="flex items-center gap-2 bg-card/50 rounded-lg px-3 py-2 border border-border">
              <span className={`text-xs ${!useSidereal ? 'text-primary' : 'text-muted-foreground'}`}>Tropical</span>
              <Switch checked={useSidereal} onCheckedChange={setUseSidereal} />
              <span className={`text-xs ${useSidereal ? 'text-primary' : 'text-muted-foreground'}`}>Sidereal</span>
            </div>

            {/* Location Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="bg-card/50 border-border h-9 max-w-[200px] truncate">
                  <MapPin className="w-3 h-3 mr-2 shrink-0" />
                  {location?.name}
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

            {/* Date Picker */}
            <div className="flex items-center gap-2 bg-card/50 rounded-lg p-1 border border-border">
               <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"ghost"}
                    size="sm"
                    className={`w-[180px] justify-start text-left font-normal ${!selectedDate && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    initialFocus
                    captionLayout="dropdown"
                    fromYear={2000}
                    toYear={2050}
                  />
                </PopoverContent>
              </Popover>
              
              {!isAutoTime && (
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={resetToNow} title="Reset to Now">
                  <RotateCcw className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Time Display */}
          <div className="text-right">
            <div className="text-3xl font-mono font-light mb-1 tabular-nums tracking-tighter">
              {format(now, "h:mm a")}
            </div>
            <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-1">
              <span className="text-xs opacity-50">Last Update: {format(new Date(), "h:mm:ss a")}</span>
            </div>
            <div className="text-gold/80 font-arabic text-xl">
              {hijriDate}
            </div>
            {whiteDaysInfo && whiteDaysInfo.isWhiteDay && (
              <div className="mt-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30 inline-flex items-center gap-1" data-testid="white-days-indicator">
                <Moon className="w-3 h-3" />
                <span>White Day - Blessed Fast</span>
              </div>
            )}
            {whiteDaysInfo && !whiteDaysInfo.isWhiteDay && whiteDaysInfo.daysUntilNext <= 3 && (
              <div className="mt-1 text-xs text-muted-foreground" data-testid="white-days-upcoming">
                White days in {whiteDaysInfo.daysUntilNext} day{whiteDaysInfo.daysUntilNext !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Row 1: Station + Planetary Hour (side by side, equal height) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Current Station Card - Glass Effect */}
        <section className="glass-card rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <h2 className="text-lg font-serif mb-3 text-foreground/80 relative z-10">
            Current Station <span className="font-arabic text-base text-foreground/60 ml-2">المنزلة الحالية</span>
          </h2>
          <div className="relative z-10">
            <MansionCard mansion={mansion} progress={mansionProgress} />
          </div>
        </section>

        {/* Planetary Hour Card - Glass Effect */}
        <section className="glass-card rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          {/* Header with date picker */}
          <div className="flex items-center justify-between mb-3 relative z-10">
            <h2 className="text-lg font-serif text-foreground/80">
              Planetary Hours <span className="font-arabic text-base text-foreground/60 ml-2">الساعات الكوكبية</span>
            </h2>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 text-xs" data-testid="hours-date-picker">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {hoursSelectedDate ? format(hoursSelectedDate, "MMM d") : "Pick date"}
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
                className="h-7 text-xs px-2 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                data-testid="hours-time-picker"
              />
              {!hoursTimeAuto && (
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={resetHoursToNow} title="Reset to Now" data-testid="hours-reset-button">
                  <RotateCcw className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Moon Sign + Moon Phase Row */}
          <div className="flex items-start justify-between mb-3 relative z-10">
            {/* Moon Sign - Left */}
            {moonPlanet && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-sm font-medium text-foreground/80">
                  <Moon className="w-4 h-4 text-muted-foreground" />
                  <span>{moonPlanet.sign}</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {Math.floor(moonPlanet.degree)}°{Math.round((moonPlanet.degree % 1) * 60)}'
                </span>
                {moonPhase?.isVoidOfCourse && (
                  <span className="text-xs text-yellow-500 font-bold flex items-center gap-1 bg-yellow-500/10 px-2 py-0.5 rounded-full">
                    <AlertTriangle className="w-3 h-3" /> VOC
                  </span>
                )}
              </div>
            )}
            
            {/* Moon Phase - Right */}
            {moonPhase && (
              <div className="flex items-center gap-3 text-right">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {moonPhase.isWaxing ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span>{moonPhase.label}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-foreground/10 font-mono border border-border">
                  {Math.round(moonPhase.illumination)}%
                </span>
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
          </div>
          
          {/* Planetary Protocol */}
          {(hoursSectionData || hoursData).currentHour && (
            <div className="relative z-10 mt-4 pt-4 border-t border-border">
              <h3 className="text-sm font-medium text-foreground/70 mb-3 flex items-center gap-2">
                {selectedPlanet ? `${selectedPlanet} Protocol` : "Current Hour Protocol"} 
                <span className="font-arabic text-xs text-foreground/50">البروتوكول</span>
                {selectedPlanet && (
                  <button 
                    onClick={() => setSelectedPlanet(null)}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors"
                    data-testid="reset-protocol-planet"
                  >
                    Reset
                  </button>
                )}
              </h3>
              <PlanetaryProtocol activePlanet={selectedPlanet || (hoursSectionData || hoursData).currentHour.planet} />
            </div>
          )}
        </section>
      </div>

      {/* Row 2: Dignities + Elemental Balance (side by side) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Celestial Dignities - Glass Effect */}
        <section className="glass-card rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <h2 className="text-lg font-serif mb-3 text-foreground/80 relative z-10">
            Celestial Dignities <span className="font-arabic text-base text-foreground/60 ml-2">الكرامات السماوية</span>
          </h2>
          <div className="relative z-10">
            <PlanetaryTable 
              planets={planets} 
              useSidereal={useSidereal}
              onToggleSystem={setUseSidereal}
            />
          </div>
        </section>

        {/* Elemental Balance - Glass Effect */}
        <section className="glass-card rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <h2 className="text-lg font-serif mb-3 text-foreground/80 relative z-10">
            Elemental Balance <span className="font-arabic text-base text-foreground/60 ml-2">توازن العناصر</span>
          </h2>
          <div className="relative z-10">
            <ElementalBalance planets={planets} />
          </div>
        </section>
      </div>

      {/* Row 3: Celestial Zodiac Wheel (full width) */}
      <section className="glass-card rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="flex items-start justify-between mb-3 relative z-10">
          <div className="bg-card/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
            <div className="text-xs text-muted-foreground mb-1.5 font-medium">Legend <span className="font-arabic">دليل</span></div>
            <div className="grid grid-cols-3 gap-x-3 gap-y-1 text-xs">
              {/* Elements */}
              <div className="flex items-center gap-1.5">
                <Flame className="w-3 h-3 text-orange-400" />
                <span className="text-muted-foreground">Fire</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mountain className="w-3 h-3 text-emerald-400" />
                <span className="text-muted-foreground">Earth</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wind className="w-3 h-3 text-sky-400" />
                <span className="text-muted-foreground">Air</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Droplets className="w-3 h-3 text-blue-400" />
                <span className="text-muted-foreground">Water</span>
              </div>
              {/* Seasons */}
              <div className="flex items-center gap-1.5">
                <Flower2 className="w-3 h-3 text-green-500" />
                <span className="text-muted-foreground">Spring</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sun className="w-3 h-3 text-amber-500" />
                <span className="text-muted-foreground">Summer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Leaf className="w-3 h-3 text-orange-500" />
                <span className="text-muted-foreground">Autumn</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Snowflake className="w-3 h-3 text-blue-300" />
                <span className="text-muted-foreground">Winter</span>
              </div>
              {/* Modality */}
              <div className="flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-red-400" />
                <span className="text-muted-foreground">Cardinal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Circle className="w-3 h-3 text-purple-400" />
                <span className="text-muted-foreground">Fixed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Repeat className="w-3 h-3 text-teal-400" />
                <span className="text-muted-foreground">Mutable</span>
              </div>
              {/* Gender/Polarity */}
              <div className="flex items-center gap-1.5">
                <Mars className="w-3 h-3 text-red-500" />
                <span className="text-muted-foreground">Masculine</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Venus className="w-3 h-3 text-pink-400" />
                <span className="text-muted-foreground">Feminine</span>
              </div>
              <div></div>
            </div>
          </div>

          <h2 className="text-lg font-serif text-center flex-1">
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              Current Sky Map
            </span>
            <span className="font-arabic text-base text-foreground/60 ml-2">خريطة السماء الحالية</span>
            <span className="text-muted-foreground ml-2 text-sm font-light">
              {useSidereal ? "(Sidereal)" : "(Tropical)"}
            </span>
          </h2>

          <div className="bg-card/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-border text-right">
            <div className="text-lg font-mono font-light tabular-nums">{format(now, "h:mm a")}</div>
            <div className="text-xs text-muted-foreground">{format(now, "EEEE, MMMM d, yyyy")}</div>
            <div className="text-sm text-gold/80 font-arabic">{hijriDate}</div>
          </div>
        </div>

        <div className="relative z-10">
          <ZodiacWheel 
            planets={planets} 
            variant="expanded"
          />
        </div>
      </section>
    </div>
  );
}
