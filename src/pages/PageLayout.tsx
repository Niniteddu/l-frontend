import { Helmet } from 'react-helmet-async';
import { LANG_LABEL, OG_LOCALE, UI_COPY } from '../constants/site';
import { withBase } from '../lib/routing';
import type { Lang } from '../types';

type PageLayoutProps = {
  children: React.ReactNode;
  lang: Lang;
  onLanguageChange: (lang: Lang) => void;
  isContactPage: boolean;
  pageTitle: string;
  pageDescription: string;
  brandName: string;
  heading: string;
};

/**
 * Common page layout with header and navigation
 */
export function PageLayout({
  children,
  lang,
  onLanguageChange,
  isContactPage,
  pageTitle,
  pageDescription,
  brandName,
  heading,
}: PageLayoutProps) {
  const uiCopy = UI_COPY[lang];

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:locale" content={OG_LOCALE[lang]} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>

      <div className="mx-auto w-full max-w-screen-2xl sm:px-6 sm:py-8 lg:px-10 xl:px-14">
        <header className="mx-auto w-full max-w-5xl rounded-none bg-gradient-to-br from-brand-deep/95 to-brand-sky/95 p-4 text-white shadow-soft backdrop-blur sm:rounded-2xl sm:p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-brand-accent">{brandName}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{heading}</h1>

          <nav className="mt-4 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3" aria-label="Language selector">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {(Object.keys(LANG_LABEL) as Lang[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onLanguageChange(item)}
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
                    lang === item
                      ? 'border-white bg-white text-brand-deep'
                      : 'border-white/70 bg-transparent text-white hover:bg-white/10'
                  }`}
                >
                  {LANG_LABEL[item]}
                </button>
              ))}
              <a
                href={isContactPage ? withBase('/') : withBase('/contact')}
                className="rounded-full border border-white/70 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-white/10 sm:px-4 sm:py-2 sm:text-sm"
              >
                {isContactPage ? uiCopy.homeLabel : uiCopy.contactLabel}
              </a>
            </div>
          </nav>
        </header>

        <main className="mx-auto mt-8 w-full max-w-5xl space-y-6">{children}</main>
      </div>
    </>
  );
}
