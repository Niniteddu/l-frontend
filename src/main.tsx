import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { IntroSplash } from './components/IntroSplash';
import App from './App';
import { getPreferredLanguage } from './constants/site';
import { apiUrl } from './lib/api';
import { hasSeenIntroInSession, markIntroSeenInSession } from './utils';
import type { Lang } from './types';
import './index.css';

/**
 * Request backend wakeup call (for sleeping servers)
 */
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

/**
 * Root component - manages intro splash display
 */
function Root() {
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntroInSession());
  const [splashLang] = useState<Lang>(getPreferredLanguage);

  useEffect(() => {
    if (!showIntro) {
      return;
    }

    // Hide intro after 7 seconds
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
