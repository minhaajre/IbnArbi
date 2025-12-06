import { useEffect, useState } from "react";
import { 
  getPlanetaryHours, 
  getPlanetaryPositions, 
  getLunarMansion, 
  getHijriDate,
  getMoonPhase,
  PlanetaryHour,
  PlanetStatus,
  MoonPhaseInfo
} from "@/lib/astronomy";
import { AYANAMSHA_J2000 } from "@/lib/constants";
import { PlanetaryHoursDisplay } from "@/components/PlanetaryHoursDisplay";
import { PlanetaryTable } from "@/components/PlanetaryTable";
import { MansionCard } from "@/components/MansionCard";
import { ZodiacWheel } from "@/components/ZodiacWheel";
import { ElementalBalance } from "@/components/ElementalBalance";
import { MapPin, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, RotateCcw, Moon, Sun, AlertTriangle } from "lucide-react";
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
  
  // Manual Location State
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");

  // Astronomical Data
  const [hoursData, setHoursData] = useState<ReturnType<typeof getPlanetaryHours> | null>(null);
  const [planets, setPlanets] = useState<PlanetStatus[]>([]);
  const [mansion, setMansion] = useState<any>(null);
  const [hijriDate, setHijriDate] = useState<string>("");
  const [moonPhase, setMoonPhase] = useState<MoonPhaseInfo | null>(null);

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

  // Initialize Location
  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: "Detected Location"
          });
        },
        (err) => {
          console.error("Geolocation error:", err);
          setLocation({ lat: 21.3891, lng: 39.8579, name: "Mecca (Default)" });
        }
      );
    } else {
      setLocation({ lat: 21.3891, lng: 39.8579, name: "Mecca (Default)" });
    }
  };

  const handleManualLocation = () => {
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);
    if (!isNaN(lat) && !isNaN(lng)) {
      setLocation({ lat, lng, name: "Manual Location" });
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

      setHoursData(hours);
      setPlanets(planetPos);
      setMansion(moonMansion);
      setHijriDate(hijri);
      setMoonPhase(phase);
      setLoading(false);
    } catch (e) {
      console.error("Calculation error:", e);
      setError("Failed to calculate astronomical data.");
    }
  }, [now, location, useSidereal]);

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

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 max-w-7xl mx-auto transition-colors duration-500">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-gold mb-2">Al-Falak</h1>
          <p className="text-muted-foreground font-light tracking-wide flex items-center gap-2">
            {useSidereal ? "Sidereal" : "Tropical"} Planetary Calendar
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-xs border border-white/10">
              v2.0
            </span>
          </p>
        </div>

        <div className="flex flex-col items-end gap-4">
          
          <div className="flex flex-wrap items-center justify-end gap-3">
            
            {/* Sidereal Toggle */}
            <div className="flex items-center gap-2 bg-card/50 rounded-lg px-3 py-2 border border-white/10">
              <span className={`text-xs ${!useSidereal ? 'text-primary' : 'text-muted-foreground'}`}>Tropical</span>
              <Switch checked={useSidereal} onCheckedChange={setUseSidereal} />
              <span className={`text-xs ${useSidereal ? 'text-primary' : 'text-muted-foreground'}`}>Sidereal</span>
            </div>

            {/* Location Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="bg-card/50 border-white/10 h-9">
                  <MapPin className="w-3 h-3 mr-2" />
                  {location?.name}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Location Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid gap-2">
                    <Label>Latitude</Label>
                    <Input 
                      placeholder="e.g. 40.7128" 
                      value={manualLat} 
                      onChange={(e) => setManualLat(e.target.value)} 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Longitude</Label>
                    <Input 
                      placeholder="e.g. -74.0060" 
                      value={manualLng} 
                      onChange={(e) => setManualLng(e.target.value)} 
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleManualLocation} className="flex-1">Set Manual</Button>
                    <Button variant="secondary" onClick={detectLocation} className="flex-1">Auto Detect</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Date Picker */}
            <div className="flex items-center gap-2 bg-card/50 rounded-lg p-1 border border-white/10">
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
                    // Add year navigation
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
          </div>
        </div>
      </header>

      {/* Void of Course Warning */}
      {moonPhase?.isVoidOfCourse && (
        <div className="mb-8 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-center gap-4 text-yellow-200">
          <AlertTriangle className="w-6 h-6 shrink-0 animate-pulse" />
          <div>
            <h3 className="font-medium">Moon Void of Course</h3>
            <p className="text-sm opacity-80">The Moon makes no further aspects in its current sign. Avoid starting new major ventures; focus on reflection and routine.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Wheel & Table */}
        <div className="lg:col-span-5 space-y-8">
           {/* Zodiac Wheel Visualization */}
          <section className="bg-card/20 border border-white/5 rounded-2xl p-8 flex flex-col items-center">
            <h2 className="text-2xl font-serif mb-6 text-center text-foreground/80">
              {useSidereal ? "Sidereal Wheel" : "Tropical Wheel"}
            </h2>
            <ZodiacWheel planets={planets} />
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-6 text-foreground/80">Celestial Dignities</h2>
            <PlanetaryTable planets={planets} />
          </section>
        </div>

        {/* Right Column: Status, Mansion, Elements */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Combined Status Card: Hour + Moon + Phase */}
          <section className="bg-card/30 border border-white/5 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
             
             {/* Moon Phase Indicator */}
             {moonPhase && (
               <div className="absolute top-4 right-4 flex flex-col items-end">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                   {moonPhase.isWaxing ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                   <span>{moonPhase.label}</span>
                   <span className="text-xs px-1.5 py-0.5 rounded bg-white/10 font-mono">
                     {Math.round(moonPhase.illumination)}%
                   </span>
                 </div>
                 <div className="text-xs uppercase tracking-widest opacity-50">
                   {moonPhase.isWaxing ? "Waxing" : "Waning"}
                 </div>
               </div>
             )}

             <PlanetaryHoursDisplay 
               currentHour={hoursData.currentHour}
               nextHours={nextHours}
               dayRuler={hoursData.dayRuler}
             />

             {/* Integrated Mansion Info in Hour Section */}
             <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="opacity-50">Current Mansion:</span>
                  <span className="text-foreground font-serif">{mansion.name}</span>
                </div>
                <div className="font-arabic text-gold/60">{mansion.arabic}</div>
             </div>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Lunar Mansion Details */}
            <section>
              <h2 className="text-2xl font-serif mb-6 text-foreground/80">Mansion Details</h2>
              <MansionCard mansion={mansion} />
            </section>

            {/* Elemental Balance */}
            <section>
              <h2 className="text-2xl font-serif mb-6 text-foreground/80">Elemental State</h2>
              <ElementalBalance planets={planets} />
            </section>
          </div>

        </div>

      </div>
    </div>
  );
}
