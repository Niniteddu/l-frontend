import type { Lang } from '../types';

type ContentFeedbackProps = {
  lang: Lang;
  loading: boolean;
  waitingForApi: boolean;
  waitingMessage: string;
  error: string;
};

const LOADING_MESSAGE: Record<Lang, string> = {
  it: 'Caricamento...',
  en: 'Loading...',
  fr: 'Chargement...',
};

const CONTENT_UNAVAILABLE_MESSAGE: Record<Lang, string> = {
  it: 'Contenuto non disponibile al momento',
  en: 'Content not available at the moment',
  fr: 'Contenu non disponible pour le moment',
};

export function ContentFeedback({ lang, loading, waitingForApi, waitingMessage, error }: ContentFeedbackProps) {
  if (loading) {
    return <p className="mt-4">{LOADING_MESSAGE[lang]}</p>;
  }

  if (waitingForApi) {
    return (
      <div className="api-waiting-banner mt-4" role="status" aria-live="polite">
        <span className="api-waiting-spinner" aria-hidden="true" />
        <p className="api-waiting-text">{waitingMessage}</p>
      </div>
    );
  }

  if (error) {
    return <p className="mt-4 text-red-700">{CONTENT_UNAVAILABLE_MESSAGE[lang]}</p>;
  }

  return null;
}