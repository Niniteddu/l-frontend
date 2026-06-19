import { useMemo } from 'react';
import { ContentFeedback } from '../components/ContentFeedback';
import { UI_COPY } from '../constants/site';
import { useSiteContent } from '../hooks/useSiteContent';
import type { Lang } from '../types';
import { PageLayout } from './PageLayout';

type ContactPageProps = {
  lang: Lang;
  onLanguageChange: (lang: Lang) => void;
};

/**
 * Contact page - displays contact links
 */
export function ContactPage({ lang, onLanguageChange }: ContactPageProps) {
  const { heading } = useSiteContent(lang);
  const uiCopy = useMemo(() => UI_COPY[lang], [lang]);
  const contactTitle = uiCopy.contactFallbackTitle;
  const brandName = 'A New Life';

  return (
    <PageLayout
      lang={lang}
      onLanguageChange={onLanguageChange}
      pageTitle={`${brandName} | ${contactTitle}`}
      pageDescription={uiCopy.contactDescription}
      brandName={brandName}
      heading={heading}
    >
      <section className="mx-auto w-full max-w-5xl rounded-none border border-brand-deep/10 bg-white p-6 shadow-soft sm:rounded-2xl lg:p-8 xl:p-10">
        <ContentFeedback
          lang={lang}
          loading={false}
          waitingForApi={false}
          waitingMessage=""
          error="unavailable"
        />
      </section>
    </PageLayout>
  );
}
