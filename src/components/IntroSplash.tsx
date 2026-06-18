/**
 * Intro splash component
 * Animated welcome screen shown on first visit
 */

import type { Lang } from '../types';

const SPLASH_WELCOME: Record<Lang, string> = {
  it: 'Benvenuto',
  en: 'Welcome',
  fr: 'Bienvenue',
};

type IntroSplashProps = {
  lang: Lang;
};

/**
 * Displays animated intro splash with butterfly image and welcome text
 */
export function IntroSplash({ lang }: IntroSplashProps) {
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
