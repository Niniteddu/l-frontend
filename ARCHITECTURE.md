# Frontend Architecture - Refactoring

## Reorganized Structure

```
src/
├── components/          # Presentational components (pure UI)
│   ├── ContactLinks.tsx      # Display contact links
│   └── ContentFeedback.tsx   # Loading/error state feedback
│
├── constants/           # Constants and configurations
│   └── site.ts              # SEO, translations, UI labels
│
├── hooks/               # Custom React Hooks
│   └── useSiteContent.ts    # Site content state management
│
├── lib/                 # Utilities and libraries
│   ├── api.ts               # (DEPRECATED - use /services)
│   └── routing.ts           # Routing and URL management
│
├── services/            # Business logic and API
│   ├── api/
│   │   ├── client.ts        # HTTP client base with error handling
│   │   └── endpoints.ts     # API endpoint definitions
│   ├── contentService.ts    # Home content service
│   ├── contactService.ts    # Contacts service
│   └── index.ts             # Barrel export for clean imports
│
├── types/               # TypeScript type definitions
│   ├── content.ts           # Data types
│   └── index.ts             # Barrel export
│
├── utils/               # Utility functions
│   ├── htmlTransformers.ts  # HTML transformations
│   └── index.ts             # Barrel export
│
├── App.tsx              # Root component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Organization Principles

### 1. **Components** - Presentation only
- Receive data via props
- No business logic
- No direct API calls
- Easy to test and reuse

### 2. **Services** - Business logic
- Encapsulate API calls
- Handle errors and retries
- Can have dependencies on other services
- Easy to mock in tests

### 3. **Hooks** - State management
- Orchestrate services
- Manage React state
- Provide data to components
- Reusable across components

### 4. **Utils** - Pure functions
- No React dependencies
- Pure and testable logic
- Reusable everywhere

### 5. **Constants** - Configurations
- Hardcoded constants
- Translations
- Static configurations

## Usage Patterns

### Add a new API Service

```typescript
// services/myService.ts
import { httpGet, ApiError } from './api/client';
import { getMyEndpoint } from './api/endpoints';
import type { MyResponse, Lang } from '../types';

export async function fetchMyData(lang: Lang): Promise<MyResponse> {
  return httpGet<MyResponse>(getMyEndpoint(lang));
}
```

### Use a Service in a Hook

```typescript
// hooks/useMyData.ts
import { useEffect, useState } from 'react';
import { fetchMyData } from '../services';
import type { MyResponse, Lang } from '../types';

export function useMyData(lang: Lang): MyResponse | null {
  const [data, setData] = useState<MyResponse | null>(null);

  useEffect(() => {
    fetchMyData(lang).then(setData);
  }, [lang]);

  return data;
}
```

### Use a Hook in a Component

```typescript
// components/MyComponent.tsx
import { useMyData } from '../hooks/useMyData';
import type { Lang } from '../types';

type MyComponentProps = {
  lang: Lang;
};

export function MyComponent({ lang }: MyComponentProps) {
  const data = useMyData(lang);

  return <div>{data?.name}</div>;
}
```

## Barrel Exports for Simplicity

Thanks to `index.ts` files in each folder, imports are clean:

```typescript
// ✅ Good
import { fetchContact } from '../services';
import type { Lang } from '../types';
import { inlineVerseReferences } from '../utils';

// ❌ Avoid
import { fetchContact } from '../services/contactService';
import type { Lang } from '../types/content';
import { inlineVerseReferences } from '../utils/htmlTransformers';
```

## Error Handling

All API errors pass through `ApiError`:

```typescript
// services/api/client.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) { ... }
}
```

Hooks catch and handle errors:

```typescript
try {
  const data = await fetchMyData(lang);
} catch (err) {
  if (err instanceof ApiError) {
    // Handle API error
  }
}
```

## Next Steps (Optional)

1. **Add global state** (Context API or Zustand) if needed
2. **Add logging** for debugging
3. **Add unit tests** for services and utils
4. **Add E2E tests** for main workflows
