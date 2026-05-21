'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Lang = 'en' | 'ja';

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  jp: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  jp: false,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  // Persist to localStorage
  useEffect(() => {
    const stored = localStorage.getItem('amusy-lang') as Lang | null;
    if (stored === 'en' || stored === 'ja') setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('amusy-lang', l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, jp: lang === 'ja' }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
