'use client';
import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

type Lang = 'en' | 'ja';

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  jp: boolean;
  transitioning: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  jp: false,
  transitioning: false,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Persist to localStorage
  useEffect(() => {
    const stored = localStorage.getItem('amusy-lang') as Lang | null;
    if (stored === 'en' || stored === 'ja') setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTransitioning(true);
    timerRef.current = setTimeout(() => {
      setLangState(l);
      localStorage.setItem('amusy-lang', l);
      setTransitioning(false);
    }, 180);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, jp: lang === 'ja', transitioning }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
