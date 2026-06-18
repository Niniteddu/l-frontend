import type { Lang } from '../types';

export const DEFAULT_LANG: Lang = 'en';

export const SUPPORTED_LANGS: readonly Lang[] = ['it', 'en', 'fr'];

export const OG_LOCALE: Record<Lang, string> = {
  it: 'it_IT',
  en: 'en_US',
  fr: 'fr_FR',
};

export const UI_COPY: Record<
  Lang,
  {
    homeLabel: string;
    contactLabel: string;
    contactDescription: string;
    contactFallbackTitle: string;
    contactVisitLabel: string;
  }
> = {
  it: {
    homeLabel: 'Home',
    contactLabel: 'Contatti',
    contactDescription: 'Pagina contatti e link utili del progetto A New Life.',
    contactFallbackTitle: 'Contatti',
    contactVisitLabel: 'Visita',
  },
  en: {
    homeLabel: 'Home',
    contactLabel: 'Contact',
    contactDescription: 'Contact page and useful links for the A New Life project.',
    contactFallbackTitle: 'Contact',
    contactVisitLabel: 'Visit',
  },
  fr: {
    homeLabel: 'Accueil',
    contactLabel: 'Contact',
    contactDescription: 'Page de contact et liens utiles du projet A New Life.',
    contactFallbackTitle: 'Contact',
    contactVisitLabel: 'Visiter',
  },
};

export function getPreferredLanguage(locale = window.navigator.language): Lang {
  const normalizedLocale = locale.toLowerCase();

  return SUPPORTED_LANGS.find((lang) => normalizedLocale.startsWith(lang)) ?? DEFAULT_LANG;
}

export const SEO = {
  it: {
    title: 'A New Life | Una Vita Nuova',
    description:
      'Contenuti multilingua e risorse utili sulla fede cristiana in italiano, inglese e francese.',
  },
  en: {
    title: 'A New Life | A New Life',
    description:
      'Multilingual Christian content and practical resources in Italian, English, and French.',
  },
  fr: {
    title: 'A New Life | Une Vie Nouvelle',
    description:
      'Contenu chretien multilingue et ressources utiles en italien, anglais et francais.',
  },
} as const;

export const LANG_LABEL: Record<Lang, string> = {
  it: 'Italiano',
  en: 'English',
  fr: 'Francais',
};

export const API_WAITING_MESSAGE: Record<Lang, string> = {
  it: 'API non disponibile, sto facendo il caricamento. Aspetta qualche secondo...',
  en: 'API is unavailable, loading in progress. Please wait a few seconds...',
  fr: 'API indisponible, chargement en cours. Veuillez patienter quelques secondes...',
};