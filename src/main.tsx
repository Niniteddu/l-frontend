import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { getPreferredLanguage } from './constants/site';
import { apiUrl } from './lib/api';
import type { Lang } from './types/content';
import './index.css';

const INTRO_SEEN_SESSION_KEY = 'introSplashSeen';

function hasSeenIntroInSession(): boolean {
  try {
    return window.sessionStorage.getItem(INTRO_SEEN_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function markIntroSeenInSession() {
  try {
    window.sessionStorage.setItem(INTRO_SEEN_SESSION_KEY, '1');
  } catch {
    // Ignore storage errors and keep default behavior.
  }
}

const SPLASH_WELCOME: Record<Lang, string> = {
  it: 'Benvenuto',
  en: 'Welcome',
  fr: 'Bienvenue',
};

let wakeupRequested = false;

function requestWakeup() {
  if (wakeupRequested) {
    return;
  }

  wakeupRequested = true;
  fetch(apiUrl('/wakeup'), {
    method: 'GET',
    cache: 'no-store',
  }).catch(() => undefined);
}

requestWakeup();

function IntroSplash({ lang }: { lang: Lang }) {
  return (
    <section className="intro-splash" aria-label="Welcome intro">
      <div className="intro-light" aria-hidden="true" />
      <figure className="intro-butterfly-wrap">
        <img className="intro-butterfly-image" src="/farfalla.png" alt="Blue butterfly" />
      </figure>

      <p className="intro-welcome">{SPLASH_WELCOME[lang]}</p>
      <div className="intro-progress" aria-hidden="true">
        <span className="intro-progress-bar" />
      </div>
    </section>
  );
}

function Root() {
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntroInSession());
  const [splashLang] = useState<Lang>(getPreferredLanguage);

  useEffect(() => {
    if (!showIntro) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowIntro(false);
      markIntroSeenInSession();
    }, 7000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [showIntro]);

  return <HelmetProvider>{showIntro ? <IntroSplash lang={splashLang} /> : <App />}</HelmetProvider>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
