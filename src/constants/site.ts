import type { Lang } from '../types/content';

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