import { useEffect, useState } from 'react';
import { ContactPage, HomePage } from './pages';
import { getPreferredLanguage } from './constants/site';
import { getCurrentPathname } from './lib/routing';
import type { Lang } from './types';

/**
 * Main application component
 * Handles routing between pages and language selection
 */
function App() {
  const [lang, setLang] = useState<Lang>(getPreferredLanguage);
  const [currentPath, setCurrentPath] = useState(getCurrentPathname());

  const isContactPage = currentPath.startsWith('/contact');
  const brandName = 'A New Life';

  // Handle navigation changes
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPathname());
    };

    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  // Render appropriate page based on current path
  if (isContactPage) {
    return <ContactPage lang={lang} onLanguageChange={setLang} />;
  }

  return <HomePage lang={lang} onLanguageChange={setLang} brandName={brandName} />;
}

export default App;
