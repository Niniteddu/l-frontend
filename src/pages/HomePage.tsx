import { useMemo } from 'react';
import { ContentFeedback } from '../components/ContentFeedback';
import { API_WAITING_MESSAGE, SEO, UI_COPY } from '../constants/site';
import { useSiteContent } from '../hooks/useSiteContent';
import type { Lang } from '../types';
import { PageLayout } from './PageLayout';

type HomePageProps = {
  lang: Lang;
  onLanguageChange: (lang: Lang) => void;
  brandName: string;
};

/**
 * Home page - displays main content
 */
export function HomePage({ lang, onLanguageChange, brandName }: HomePageProps) {
  const { heading, homeHtml, loading, waitingForApi, error } = useSiteContent(lang);
  const seo = useMemo(() => SEO[lang], [lang]);
  const waitingMessage = useMemo(() => API_WAITING_MESSAGE[lang], [lang]);

  return (
    <PageLayout
      lang={lang}
      onLanguageChange={onLanguageChange}
      isContactPage={false}
      pageTitle={seo.title}
      pageDescription={seo.description}
      brandName={brandName}
      heading={heading}
    >
      <section className="mx-auto w-full max-w-5xl rounded-none border border-brand-deep/10 bg-white p-6 shadow-soft sm:rounded-2xl lg:p-8 xl:p-10">
        <ContentFeedback
          loading={loading}
          waitingForApi={waitingForApi}
          waitingMessage={waitingMessage}
          error={error}
        />

        {!loading && !error && (
          <article
            className="readable-content mt-4"
            dangerouslySetInnerHTML={{ __html: homeHtml }}
          />
        )}
      </section>
    </PageLayout>
  );
}
