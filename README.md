# l-frontend

Frontend React + TypeScript + Tailwind CSS per il progetto A New Life.

## Requisiti

- Node.js 20+
- npm 10+

## Avvio locale

1. Installa le dipendenze:
   npm install
2. Avvia il dev server:
   npm run dev
3. Apri:
   http://localhost:5173

La configurazione Vite include un proxy verso il backend API su `http://localhost:8080` per le rotte `/api`.

## SEO

Sono inclusi:

- title e description dinamici per lingua con `react-helmet-async`
- Open Graph e Twitter card
- `robots.txt`
- `sitemap.xml`
- markup semantico (`header`, `main`, `section`, `article`, `nav`)

Aggiorna i domini placeholder `https://anewlife.example/` in:

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`

## Build

- Produzione: `npm run build`
- Preview build: `npm run preview`

## Test con Docker sul PC

### Prerequisiti

- Docker Desktop avviato
- Backend API attivo su `http://localhost:8080`

### Avvio

1. Build e start container frontend in modalita sviluppo:
   `docker compose up --build`
2. Apri il browser su:
   `http://localhost:5173`

Il container esegue Vite dev server con hot reload su `0.0.0.0:5173`.

Le chiamate API devono puntare al backend `http://localhost:8080` (ad esempio via `VITE_API_BASE_URL`).

### Stop

- `docker compose down`
