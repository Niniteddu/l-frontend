import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';

type Lang = 'it' | 'en' | 'fr';

type HomeResponse = {
  language: string;
  brand: string;
  heading: string;
  content: string;
};

type ContactLink = {
  name: string;
  description: string;
  url: string;
};

type ContactResponse = {
  title: string;
  links: ContactLink[];
};

const SEO = {
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

const LANG_LABEL: Record<Lang, string> = {
  it: 'Italiano',
  en: 'English',
  fr: 'Francais',
};

const API_WAITING_MESSAGE: Record<Lang, string> = {
  it: 'API non disponibile, sto facendo il caricamento. Aspetta qualche secondo...',
  en: 'API is unavailable, loading in progress. Please wait a few seconds...',
  fr: "API indisponible, chargement en cours. Veuillez patienter quelques secondes...",
};

function inlineVerseReferences(html: string): string {
  const pattern = /<p class="ver">([\s\S]*?)<\/p>\s*<p class="ver-rif">([\s\S]*?)<\/p>/g;
  return html.replace(pattern, '<p class="ver">$1<span class="ver-ref">$2</span></p>');
}

function App() {
  const [lang, setLang] = useState<Lang>('it');
  const [brand, setBrand] = useState('A New Life');
  const [heading, setHeading] = useState('Una Vita Nuova');
  const [isScrolled, setIsScrolled] = useState(false);
  const [waitingForApi, setWaitingForApi] = useState(false);
  const [homeHtml, setHomeHtml] = useState('');
  const [contact, setContact] = useState<ContactResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const seo = useMemo(() => SEO[lang], [lang]);
  const waitingMessage = useMemo(() => API_WAITING_MESSAGE[lang], [lang]);
  const isContactPage = window.location.pathname.startsWith('/contact');
  const pageTitle = isContactPage ? `${brand} | ${contact?.title ?? 'Contact'}` : seo.title;
  const pageDescription = isContactPage
    ? 'Pagina contatti e link utili del progetto A New Life.'
    : seo.description;

  useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const load = async () => {
      try {
        setLoading(true);
        setError('');

        const [homeRes, contactRes] = await Promise.all([
          fetch(`/api/content/home?lang=${lang}`),
          fetch(`/api/contact?lang=${lang}`),
        ]);

        if (!homeRes.ok || !contactRes.ok) {
          throw new Error('API_UNAVAILABLE');
        }

        const homeData = (await homeRes.json()) as HomeResponse;
        const contactData = (await contactRes.json()) as ContactResponse;

        if (cancelled) {
          return;
        }

        setBrand(homeData.brand);
        setHeading(homeData.heading);
        setHomeHtml(inlineVerseReferences(homeData.content));
        setContact(contactData);
        setWaitingForApi(false);
        setLoading(false);
      } catch (err) {
        if (cancelled) {
          return;
        }

        if ((err as Error).message === 'API_UNAVAILABLE') {
          setWaitingForApi(true);
          setError('');
          retryTimer = setTimeout(load, 2500);
          return;
        }

        setError((err as Error).message);
        setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
    };
  }, [lang]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:locale" content={lang === 'it' ? 'it_IT' : lang === 'en' ? 'en_US' : 'fr_FR'} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>

      <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-10 xl:px-14">
        <header
          className={`header-shell fade-up z-50 bg-gradient-to-br from-brand-deep/95 to-brand-sky/95 text-white shadow-soft backdrop-blur transition-all duration-300 ${
            isScrolled
              ? 'header-enter-fixed fixed inset-x-0 top-0 rounded-none p-6 sm:p-7'
              : 'header-enter-top sticky top-3 rounded-2xl p-8'
          }`}
        >
          <p className="text-sm uppercase tracking-[0.25em] text-brand-accent">{brand}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{heading}</h1>

          <nav className="mt-6 flex flex-wrap items-center justify-between gap-3" aria-label="Selettore lingua">
            <div className="flex flex-wrap gap-3">
              {(Object.keys(LANG_LABEL) as Lang[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLang(item)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    lang === item
                      ? 'border-white bg-white text-brand-deep'
                      : 'border-white/70 bg-transparent text-white hover:bg-white/10'
                  }`}
                >
                  {LANG_LABEL[item]}
                </button>
              ))}
            </div>

            <a
              href={isContactPage ? '/' : '/contact'}
              className="ml-auto rounded-full border border-white/70 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {isContactPage ? 'Home' : 'Contact'}
            </a>
          </nav>
        </header>

        <main className={`mt-8 space-y-6 ${isScrolled ? 'pt-44 sm:pt-48' : ''}`}>
          {!isContactPage && (
            <section className="fade-up rounded-2xl border border-brand-deep/10 bg-white p-6 shadow-soft lg:p-8">

              {loading && <p className="mt-4">Caricamento...</p>}
              {waitingForApi && (
                <div className="api-waiting-banner mt-4" role="status" aria-live="polite">
                  <span className="api-waiting-spinner" aria-hidden="true" />
                  <p className="api-waiting-text">{waitingMessage}</p>
                </div>
              )}
              {error && <p className="mt-4 text-red-700">{error}</p>}

              {!loading && !error && (
                <article
                  className="readable-content mt-4"
                  dangerouslySetInnerHTML={{ __html: homeHtml }}
                />
              )}
            </section>
          )}

          {isContactPage && (
            <section className="fade-up rounded-2xl border border-brand-deep/10 bg-white p-6 shadow-soft lg:p-8">
              <h2 className="font-display text-3xl text-brand-deep">{contact?.title ?? 'Contact'}</h2>
              <p className="mt-3 text-slate-700">Qui trovi i link utili disponibili per questa lingua.</p>

              {loading && <p className="mt-4">Caricamento...</p>}
              {waitingForApi && (
                <div className="api-waiting-banner mt-4" role="status" aria-live="polite">
                  <span className="api-waiting-spinner" aria-hidden="true" />
                  <p className="api-waiting-text">{waitingMessage}</p>
                </div>
              )}
              {error && <p className="mt-4 text-red-700">{error}</p>}

              {!loading && !error && (
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {(contact?.links ?? []).map((link) => (
                    <li key={link.url} className="rounded-xl border border-brand-deep/10 p-4">
                      <h3 className="font-display text-xl text-brand-deep">{link.name}</h3>
                      <p className="mt-2 text-sm text-slate-700">{link.description}</p>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block rounded-full bg-brand-deep px-4 py-2 text-sm font-semibold text-white hover:bg-brand-sky"
                      >
                        Visita
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

        </main>
      </div>
    </>
  );
}

export default App;
