'use client';
import { useEffect } from 'react';
import { useLang } from '../context/LangContext';

export default function LangBlurOverlay() {
  const { transitioning } = useLang();

  useEffect(() => {
    if (transitioning) {
      document.body.classList.add('lang-switching');
    } else {
      document.body.classList.remove('lang-switching');
    }
  }, [transitioning]);

  // Renders nothing — effect is pure CSS on body class
  return null;
}
