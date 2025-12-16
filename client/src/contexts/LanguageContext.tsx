import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    "How to Use Daily": "How to Use Daily",
    "Cosmology Made Simple": "Cosmology Made Simple",
    "About This App": "About This App",
    "Ibn ʿArabī's View of Time": "Ibn ʿArabī's View of Time",
    "Lunar Mansions": "Lunar Mansions",
    "Planetary Hours": "Planetary Hours",
    "Celestial Dignities": "Celestial Dignities",
    "Elemental Balance": "Elemental Balance",
    "Reading Planetary Hours": "Reading Planetary Hours",
    "Reading Lunar Mansion": "Reading Lunar Mansion",
    "Combining Hour & Mansion": "Combining Hour & Mansion",
    "Key Further Readings": "Key Further Readings",
  },
  ar: {
    "How to Use Daily": "كيفية الاستخدام اليومي",
    "Cosmology Made Simple": "علم الكون بكل بساطة",
    "About This App": "حول هذا التطبيق",
    "Ibn ʿArabī's View of Time": "رؤية ابن عربي للزمن",
    "Lunar Mansions": "منازل القمر",
    "Planetary Hours": "الساعات الكوكبية",
    "Celestial Dignities": "الكرامات السماوية",
    "Elemental Balance": "توازن العناصر",
    "Reading Planetary Hours": "قراءة الساعات الكوكبية",
    "Reading Lunar Mansion": "قراءة منزلة القمر",
    "Combining Hour & Mansion": "دمج الساعة والمنزلة",
    "Key Further Readings": "مراجع أساسية إضافية",
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app-language');
    return (saved as Language) || 'en';
  });

  const setLanguageWithStorage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app-language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
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
