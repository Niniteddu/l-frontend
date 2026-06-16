import type { ContactLink } from '../types/content';

type ContactLinksProps = {
  title: string;
  links: ContactLink[];
};

export function ContactLinks({ title, links }: ContactLinksProps) {
  return (
    <>
      <h2 className="font-display text-3xl text-brand-deep">{title}</h2>
      <p className="mt-3 text-slate-700">Qui trovi i link utili disponibili per questa lingua.</p>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {links.map((link) => (
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
    </>
  );
}