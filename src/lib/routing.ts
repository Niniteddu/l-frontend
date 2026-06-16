const BASE_URL = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

function isGithubPagesHost(): boolean {
  return /github\.io$/i.test(window.location.hostname);
}

export function withBase(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (isGithubPagesHost()) {
    return `${BASE_URL ? `${BASE_URL}/` : '/'}#${normalizedPath}`;
  }

  if (!BASE_URL) {
    return normalizedPath;
  }

  return normalizedPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${normalizedPath}`;
}

export function getCurrentPathname(): string {
  const hash = window.location.hash;
  if (hash.startsWith('#/')) {
    return hash.slice(1);
  }

  const current = window.location.pathname;
  if (BASE_URL && current.startsWith(BASE_URL)) {
    const relative = current.slice(BASE_URL.length);
    return relative || '/';
  }

  return current || '/';
}