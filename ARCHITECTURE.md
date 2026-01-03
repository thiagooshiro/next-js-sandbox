# Code Standards & Architecture

This document outlines code standards and project structure to guide contributions.

---

## Code Language

**All code is in English** - this is the project standard.

- Variable names: `exerciseId`, `userName`, `isVisible`
- Function names: `getExerciseById`, `handleSubmit`
- File names: `ExerciseExplanation.tsx`, `Sandbox.tsx`
- Comments: English
- Code templates: English

**Documentation** is available in both English and Portuguese, but **code itself is always English**.

---

## Naming Conventions

### Files & Components

- **Components**: PascalCase
  - `ExerciseExplanation.tsx`
  - `Sandbox.tsx`
  - `LanguageSwitcher.tsx`

- **Utilities/Helpers**: camelCase
  - `exercises.ts`
  - `getExerciseById.ts`

- **Pages**: `page.tsx` (Next.js convention)
  - `app/[locale]/exercises/[exerciseId]/page.tsx`

### Variables & Functions

- **Variables**: camelCase
  ```typescript
  const exerciseId = 'hello-world';
  const isVisible = true;
  const exerciseData = getExerciseById(id);
  ```

- **Functions**: camelCase
  ```typescript
  function getExerciseById(id: string) { }
  function handleClick() { }
  ```

- **Constants**: UPPER_SNAKE_CASE (only for true constants)
  ```typescript
  const MAX_RETRIES = 3;
  const API_BASE_URL = 'https://api.example.com';
  ```

- **Types/Interfaces**: PascalCase
  ```typescript
  interface Exercise { }
  type ExerciseCategory = 'fundamentals' | 'challenges';
  ```

---

## Project Structure

```
app/
├── [locale]/              # Localized routes (en, pt)
│   ├── exercises/
│   │   └── [exerciseId]/
│   │       └── page.tsx
│   └── layout.tsx
├── components/            # React components
│   ├── Sandbox.tsx
│   ├── ExerciseExplanation.tsx
│   └── ...
├── data/                  # Exercise data
│   ├── exercises.ts      # Fundamentals
│   └── challenges.ts     # Simple challenges (Milestone 1-2)
└── globals.css

messages/                  # Translations (UI text only)
├── en.json
└── pt.json
```

---

## Where to Add Code

### Exercises

- **Fundamentals**: `app/data/exercises.ts`
- **Simple Challenges** (Milestone 1-2): `app/data/challenges.ts`
- **Complex Challenges/Projects** (Milestone 3+): Auxiliary repositories

### Components

- All React components: `app/components/`
- Follow existing component patterns
- Use TypeScript interfaces for props

### Translations

- **UI text only**: `messages/en.json` and `messages/pt.json`
- **Code templates/examples**: Hardcode in components (English)
- **Never** put JSX in translation files

---

## Code Standards

### TypeScript

- Use TypeScript for all new code
- Define interfaces for props and data structures
- Avoid `any` - use proper types

```typescript
interface Exercise {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
```

### React Components

- Use functional components
- Use TypeScript interfaces for props
- Prefer named exports for components

```typescript
interface SandboxProps {
  exercise?: Exercise;
  initialCode?: string;
}

export function Sandbox({ exercise, initialCode }: SandboxProps) {
  // ...
}
```

### Imports

- Use absolute imports with `@/` alias
- Group imports: external → internal → types

```typescript
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Sandbox } from '@/app/components/Sandbox';
import { getExerciseById } from '@/app/data/exercises';

import type { Exercise } from '@/app/data/exercises';
```

---

## Internationalization (i18n)

### How It Works

- URLs are prefixed with locale: `/en/exercises/hello-world`
- UI text comes from `messages/en.json` and `messages/pt.json`
- Code (templates, examples) is **always in English** and hardcoded

### Adding Translations

1. Add key to both `messages/en.json` and `messages/pt.json`
2. Use in components:
   ```typescript
   const t = useTranslations('common');
   <p>{t('welcomeMessage')}</p>
   ```
3. **Never** translate code snippets - they stay in English

---

## Exercise Data Structure

```typescript
export interface Exercise {
  id: string;                    // kebab-case: 'hello-world'
  title: string;                 // English
  description: string;           // English
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'fundamentals' | 'challenges' | 'projects';
  template: string;              // Code template (English)
  explanation?: {                // Optional detailed explanation
    title: string;
    intro: string;
    // ...
  };
}
```

---

## Future Structure

### Milestone 1-2 (Current)

- Fundamentals: `app/data/exercises.ts`
- Simple challenges: `app/data/challenges.ts` (same structure)

### Milestone 3+

- Advanced concepts: Separate monorepo with workspaces
- Full-stack projects: Separate repositories per project

See `MILESTONES.md` for details.

---

## Quick Reference

| What | Where | Language |
|------|-------|----------|
| Component code | `app/components/` | English |
| Exercise data | `app/data/` | English |
| UI text | `messages/*.json` | en/pt |
| Code templates | Hardcoded in components | English |
| Variable names | Everywhere | English |
| Comments | Everywhere | English |

---

**Remember**: Code is always in English. Documentation can be in both languages, but when writing code, use English names, comments, and templates.
