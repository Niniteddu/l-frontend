import { useMemo } from 'react';
import { ContactLinks } from '../components/ContactLinks';
import { ContentFeedback } from '../components/ContentFeedback';
import { API_WAITING_MESSAGE, UI_COPY } from '../constants/site';
import { useContactContent } from '../hooks/useContactContent';
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
  const { contact, loading, waitingForApi, error } = useContactContent(lang);
  const uiCopy = useMemo(() => UI_COPY[lang], [lang]);
  const contactDescription = useMemo(() => API_WAITING_MESSAGE[lang], [lang]);

  const contactTitle = contact?.title ?? uiCopy.contactFallbackTitle;
  const brandName = 'A New Life';

  return (
    <PageLayout
      lang={lang}
      onLanguageChange={onLanguageChange}
      isContactPage={true}
      pageTitle={`${brandName} | ${contactTitle}`}
      pageDescription={uiCopy.contactDescription}
      brandName={brandName}
      heading={heading}
    >
      <section className="mx-auto w-full max-w-5xl rounded-none border border-brand-deep/10 bg-white p-6 shadow-soft sm:rounded-2xl lg:p-8 xl:p-10">
        <ContentFeedback
          lang={lang}
          loading={loading}
          waitingForApi={waitingForApi}
          waitingMessage={contactDescription}
          error={error}
        />

        {!loading && !error && (
          <ContactLinks title={contactTitle} links={contact?.links ?? []} lang={lang} />
        )}
      </section>
    </PageLayout>
  );
}
