import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { apiUrl } from './lib/api';
import './index.css';

type SplashLang = 'it' | 'en' | 'fr';

function getPreferredSplashLanguage(): SplashLang {
  const locale = window.navigator.language.toLowerCase();
  if (locale.startsWith('fr')) {
    return 'fr';
  }
  if (locale.startsWith('en')) {
    return 'en';
  }
  return 'it';
}

const SPLASH_WELCOME: Record<SplashLang, string> = {
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

function IntroSplash({ lang }: { lang: SplashLang }) {
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
  const [showIntro, setShowIntro] = useState(true);
  const [splashLang] = useState<SplashLang>(getPreferredSplashLanguage);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowIntro(false);
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return <HelmetProvider>{showIntro ? <IntroSplash lang={splashLang} /> : <App />}</HelmetProvider>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
