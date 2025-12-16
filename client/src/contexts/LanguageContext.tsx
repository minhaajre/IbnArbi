import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // App Title & Header
    "app.title": "Ibn Arabi's Cosmology",
    "app.subtitle": "Guide to the Prayer Timings & Planetary Alignment",
    "app.calculating": "Calculating Spheres...",
    
    // Navigation & Buttons
    "nav.guidance": "Guidance",
    "nav.home": "Return to Home",
    "nav.location": "Location",
    "nav.tropical": "Tropical",
    "nav.sidereal": "Sidereal",
    "nav.autoDetect": "Auto-Detect Location",
    "nav.detecting": "Detecting...",
    "nav.enterCity": "Enter city name...",
    "nav.or": "- OR -",
    
    // Location Settings
    "location.settings": "Location Settings",
    
    // Sections - Home
    "section.lunarMansion": "Current Lunar Mansion",
    "section.planetaryHours": "Planetary Hours",
    "section.celestialDignities": "Celestial Dignities",
    "section.elementalBalance": "Elemental Balance",
    "section.skyMap": "Current Sky Map",
    
    // Sections - Instructions
    "section.aboutApp": "About This App",
    "section.ibnArabiTime": "Ibn ʿArabī's View of Time",
    "section.lunarMansions": "Lunar Mansions",
    "section.howToUse": "How to Use Daily",
    "section.readingPlanetaryHours": "Reading Planetary Hours",
    "section.readingLunarMansion": "Reading Lunar Mansion",
    "section.combiningHourMansion": "Combining Hour & Mansion",
    "section.cosmologySimple": "Cosmology Made Simple",
    "section.keyReadings": "Key Further Readings",
    
    // Instructions Page
    "instructions.title": "Instructions",
    "instructions.subtitle": "A guide to using Ibn Arabi's Cosmology App based on his spiritual teachings",
    
    // Planetary Hours
    "hours.dayRuler": "Day Ruler",
    "hours.currentHour": "Current Hour",
    "hours.nextHour": "Next Hour",
    "hours.remaining": "remaining",
    "hours.day": "Day",
    "hours.night": "Night",
    "hours.allHours": "All 24 Planetary Hours",
    
    // Lunar Mansion
    "mansion.current": "Current Mansion",
    "mansion.movement": "Movement",
    "mansion.gathering": "Gathering",
    "mansion.differentiating": "Differentiating",
    "mansion.separating": "Separating",
    "mansion.maySupport": "May Support",
    "mansion.useCaution": "Use Caution With",
    "mansion.divineName": "Divine Name",
    "mansion.ritual": "Ritual",
    "mansion.moonPhase": "Moon Phase",
    "mansion.waxing": "Waxing",
    "mansion.waning": "Waning",
    "mansion.progress": "Progress",
    "mansion.nextMansion": "Next Mansion",
    
    // Celestial Dignities
    "dignities.planet": "Planet",
    "dignities.sign": "Sign",
    "dignities.degree": "Degree",
    "dignities.status": "Status",
    "dignities.rulership": "Rulership",
    "dignities.exaltation": "Exaltation",
    "dignities.detriment": "Detriment",
    "dignities.fall": "Fall",
    "dignities.neutral": "Neutral",
    
    // Elements
    "element.fire": "Fire",
    "element.earth": "Earth",
    "element.air": "Air",
    "element.water": "Water",
    
    // Planets
    "planet.sun": "Sun",
    "planet.moon": "Moon",
    "planet.mercury": "Mercury",
    "planet.venus": "Venus",
    "planet.mars": "Mars",
    "planet.jupiter": "Jupiter",
    "planet.saturn": "Saturn",
    
    // White Days
    "whiteDays.title": "White Days",
    "whiteDays.today": "Today is a White Day",
    "whiteDays.blessedFast": "Blessed Fast",
    
    // Moon
    "moon.voidOfCourse": "Void of Course",
    "moon.fullMoon": "Full Moon",
    "moon.newMoon": "New Moon",
    
    // Footer
    "footer.madeWith": "Made with reverence for the teachings of",
    "footer.ibnArabi": "Muhyiddin Ibn Arabi",
    
    // Azkaar
    "azkaar.title": "Advanced Sufi Aẓkār",
    "azkaar.subtitle": "Traditional litanies and devotional practices",
  },
  ar: {
    // App Title & Header
    "app.title": "علم الكون لابن عربي",
    "app.subtitle": "دليل أوقات الصلاة والمواقع الفلكية",
    "app.calculating": "جاري حساب الأفلاك...",
    
    // Navigation & Buttons
    "nav.guidance": "الإرشادات",
    "nav.home": "العودة للرئيسية",
    "nav.location": "الموقع",
    "nav.tropical": "مداري",
    "nav.sidereal": "فلكي",
    "nav.autoDetect": "تحديد الموقع تلقائياً",
    "nav.detecting": "جاري التحديد...",
    "nav.enterCity": "أدخل اسم المدينة...",
    "nav.or": "- أو -",
    
    // Location Settings
    "location.settings": "إعدادات الموقع",
    
    // Sections - Home
    "section.lunarMansion": "المنزلة القمرية الحالية",
    "section.planetaryHours": "الساعات الكوكبية",
    "section.celestialDignities": "الكرامات السماوية",
    "section.elementalBalance": "توازن العناصر",
    "section.skyMap": "خريطة السماء الحالية",
    
    // Sections - Instructions
    "section.aboutApp": "حول هذا التطبيق",
    "section.ibnArabiTime": "رؤية ابن عربي للزمن",
    "section.lunarMansions": "منازل القمر",
    "section.howToUse": "كيفية الاستخدام اليومي",
    "section.readingPlanetaryHours": "قراءة الساعات الكوكبية",
    "section.readingLunarMansion": "قراءة منزلة القمر",
    "section.combiningHourMansion": "دمج الساعة والمنزلة",
    "section.cosmologySimple": "علم الكون بكل بساطة",
    "section.keyReadings": "مراجع أساسية إضافية",
    
    // Instructions Page
    "instructions.title": "تعليمات",
    "instructions.subtitle": "دليل استخدام تطبيق علم الكون لابن عربي بناءً على تعاليمه الروحية",
    
    // Planetary Hours
    "hours.dayRuler": "كوكب اليوم",
    "hours.currentHour": "الساعة الحالية",
    "hours.nextHour": "الساعة التالية",
    "hours.remaining": "متبقي",
    "hours.day": "نهار",
    "hours.night": "ليل",
    "hours.allHours": "جميع الساعات الـ٢٤ الكوكبية",
    
    // Lunar Mansion
    "mansion.current": "المنزلة الحالية",
    "mansion.movement": "الحركة",
    "mansion.gathering": "الجمع",
    "mansion.differentiating": "التفريق",
    "mansion.separating": "الفصل",
    "mansion.maySupport": "قد يُساعد في",
    "mansion.useCaution": "توخَّ الحذر مع",
    "mansion.divineName": "الاسم الإلهي",
    "mansion.ritual": "الطقوس",
    "mansion.moonPhase": "طور القمر",
    "mansion.waxing": "هلال متزايد",
    "mansion.waning": "هلال متناقص",
    "mansion.progress": "التقدم",
    "mansion.nextMansion": "المنزلة التالية",
    
    // Celestial Dignities
    "dignities.planet": "الكوكب",
    "dignities.sign": "البرج",
    "dignities.degree": "الدرجة",
    "dignities.status": "الحالة",
    "dignities.rulership": "السيادة",
    "dignities.exaltation": "الشرف",
    "dignities.detriment": "الوبال",
    "dignities.fall": "الهبوط",
    "dignities.neutral": "محايد",
    
    // Elements
    "element.fire": "النار",
    "element.earth": "الأرض",
    "element.air": "الهواء",
    "element.water": "الماء",
    
    // Planets
    "planet.sun": "الشمس",
    "planet.moon": "القمر",
    "planet.mercury": "عطارد",
    "planet.venus": "الزهرة",
    "planet.mars": "المريخ",
    "planet.jupiter": "المشتري",
    "planet.saturn": "زحل",
    
    // White Days
    "whiteDays.title": "الأيام البيض",
    "whiteDays.today": "اليوم يوم أبيض",
    "whiteDays.blessedFast": "صوم مبارك",
    
    // Moon
    "moon.voidOfCourse": "القمر خالي المسار",
    "moon.fullMoon": "بدر",
    "moon.newMoon": "محاق",
    
    // Footer
    "footer.madeWith": "صُنع بتقدير لتعاليم",
    "footer.ibnArabi": "محيي الدين ابن عربي",
    
    // Azkaar
    "azkaar.title": "الأذكار الصوفية المتقدمة",
    "azkaar.subtitle": "الأوراد والممارسات التعبدية التقليدية",
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app-language');
      return (saved as Language) || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguageWithStorage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageWithStorage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
