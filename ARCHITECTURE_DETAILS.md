# Architecture Details

This document provides detailed technical explanations of how different parts of the project work together.

---

## Table of Contents

1. [Internationalization System](#internationalization-system)
2. [Sandbox Component](#sandbox-component)
3. [Exercise System](#exercise-system)
4. [Routing](#routing)
5. [Future Structure](#future-structure)

---

## Internationalization System

### Overview

The project uses `next-intl` for internationalization, supporting English (`en`) and Portuguese (`pt`).

### How It Works

1. **Middleware** (`middleware.ts`):
   - Intercepts all requests
   - Redirects to appropriate locale based on URL or browser preferences
   - Default locale: `en`
   - Excludes API routes and static files

2. **Locale Routing**:
   - URLs are prefixed with locale: `/en/exercises/hello-world`
   - Locale is extracted from URL params in `[locale]` folder
   - Invalid locales result in 404

3. **Translation Files** (`messages/en.json`, `messages/pt.json`):
   - Contains only UI text (buttons, labels, error messages)
   - Organized by namespaces (e.g., `common`, `errors`)
   - **Code snippets are NOT in translation files**

4. **Layout** (`app/[locale]/layout.tsx`):
   - Wraps all pages with `NextIntlClientProvider`
   - Loads messages for the current locale
   - Provides translations to all child components

5. **Using Translations**:
   ```tsx
   import { useTranslations } from 'next-intl';
   
   const t = useTranslations('common');
   <button>{t('tryCode')}</button>
   ```

### Why Code Isn't Translated

1. **Technical**: JSX syntax (`<div>`, `{/* */}`) conflicts with `next-intl`'s message format parser
2. **Practical**: Code is universal - React/JSX is the same in all languages
3. **Standard**: Industry standard is to keep code in English

**Solution**: Code templates and examples are hardcoded in components/data files (always in English).

---

## Sandbox Component

### Overview

The sandbox allows users to write and execute React code in real-time. It's the core learning feature.

### Architecture

**File**: `app/components/Sandbox.tsx`

### Components

1. **Monaco Editor** (left side):
   - Code editor with syntax highlighting
   - Pre-filled with exercise template
   - User edits code here
   - Dynamically imported to avoid SSR issues

2. **react-live** (right side):
   - `LiveEditor`: Receives code from Monaco
   - `LivePreview`: Renders compiled code
   - `LiveError`: Displays compilation errors
   - Compiles and executes code entirely in the browser

3. **Error Handling**:
   - `ErrorBoundary`: Catches React rendering errors
   - `LiveError`: Catches compilation errors
   - User-friendly error messages with hints

### Code Execution Flow

```
User types in Monaco Editor
    ↓
Code state updates
    ↓
Code passed to react-live's LiveEditor
    ↓
react-live compiles code (client-side, no server)
    ↓
Compiled code renders in LivePreview
    ↓
Errors caught by ErrorBoundary or LiveError
    ↓
Error displayed to user
```

### Template Processing

- Templates come from `exercise.template`
- Pre-processed to remove imports/exports (not needed in react-live)
- CSS can be conditionally injected for specific exercises
- Default template used if exercise template is invalid

### Why react-live?

- **Security**: Code runs in browser, not on server
- **Performance**: No server load, instant compilation
- **Simplicity**: No API routes needed
- **Limitation**: Can't use imports (acceptable for learning exercises)

---

## Exercise System

### Data Structure

Exercises are stored in TypeScript files:

- **Fundamentals**: `app/data/exercises.ts`
- **Simple Challenges** (future): `app/data/challenges.ts`

### Exercise Interface

```typescript
export interface Exercise {
  id: string;                    // Unique identifier (kebab-case)
  title: string;                  // Exercise title (English)
  description: string;             // Short description (English)
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'fundamentals' | 'challenges' | 'projects';
  template: string;               // Initial code template (English)
  explanation?: {                 // Optional detailed explanation
    title: string;
    intro: string;
    exampleTitle: string;
    exampleDescription: string;
    steps: {
      step1: { title: string; description: string };
      step2: { title: string; description: string };
      step3: { title: string; description: string };
    };
    yourTask: string;
    hint: string;
  };
}
```

### Accessing Exercises

**Helper Functions** (in `exercises.ts`):

```typescript
// Get exercise by ID
export function getExerciseById(id: string): Exercise | undefined

// Get exercises by category
export function getExercisesByCategory(category: Exercise['category']): Exercise[]
```

### Exercise Categories

1. **Fundamentals**:
   - Basic React concepts
   - Work perfectly with sandbox
   - Single component focus
   - Stored in main repo

2. **Challenges** (Simple):
   - More complex logic
   - Still work with sandbox
   - Single or few components
   - Stored in `challenges.ts` (Milestone 1-2)

3. **Challenges** (Complex) / **Projects**:
   - Advanced concepts
   - Multiple components
   - Full applications
   - Separate repositories (Milestone 3+)

---

## Routing

### Route Structure

```
/                              → Redirects to /en/exercises/hello-world
/[locale]                      → Home page (redirects to first exercise)
/[locale]/exercises/[id]       → Exercise page
```

### Dynamic Routes

- `[locale]`: Language prefix (`en` or `pt`)
  - Validated in `app/[locale]/layout.tsx`
  - Invalid locales result in 404

- `[exerciseId]`: Exercise identifier
  - Examples: `hello-world`, `jsx-basics`, `using-props`
  - Used to fetch exercise data

### Exercise Page Flow

**File**: `app/[locale]/exercises/[exerciseId]/page.tsx`

1. Extract `exerciseId` from URL params
2. Fetch exercise using `getExerciseById(exerciseId)`
3. If not found, show 404
4. Render:
   - `ExerciseNavigator` (top bar with Previous/Next)
   - `LanguageSwitcher` (top right)
   - `ExerciseExplanation` (left sidebar with instructions)
   - `Sandbox` (right side, main area)

### Language Switching

**File**: `app/components/LanguageSwitcher.tsx`

- Reads current locale from URL
- Replaces locale in pathname
- Navigates to new URL
- Refreshes router to update translations

---

## Future Structure

### Milestone 1-2: Current Structure

```
app/data/
├── exercises.ts          # Fundamentals exercises
└── challenges.ts         # Simple challenges (to be created)
```

**Simple challenges** follow the same `Exercise` interface and work with the sandbox.

### Milestone 3+: Auxiliary Repositories

#### Monorepo with Workspaces

For advanced concepts (Context API, Redux, etc.):

```
nextjs-advanced-examples/          # Separate repository
├── package.json                   # Workspaces configuration
│   "workspaces": [
│     "apps/*"
│   ]
├── apps/
│   ├── context-shopping-cart/    # Mini-app 1
│   │   ├── package.json
│   │   └── src/
│   ├── redux-shopping-cart/       # Mini-app 2
│   │   ├── package.json
│   │   └── src/
│   └── zustand-shopping-cart/     # Mini-app 3
│       ├── package.json
│       └── src/
├── backend/                       # Django backend
│   └── manage.py
└── README.md
```

**How it connects**:
- Main app (`nextjs-guide`) links to this repository
- Each advanced exercise points to a specific mini-app
- Students clone the auxiliary repo separately
- Backend Django manages all mini-apps from one location

**Benefits**:
- Easy to clone and run (single repository)
- Direct comparison between different solutions
- Isolated apps prevent confusion
- Centralized backend simplifies setup

#### Full-Stack Projects

For complete projects:

```
project-todo-app/                  # Separate repository
├── backend/                       # Django/Express/FastAPI (ready)
│   ├── api/
│   └── README.md
└── frontend/                      # Students build this
    └── README.md
```

**How it connects**:
- Main app links to project repositories
- Backend is already built ("skeleton")
- Students build the complete frontend
- Each project is independent
- Multiple backend options (Node/Express, Django, FastAPI)

---

## Key Design Decisions

### 1. Why client-side compilation (react-live)?

- **Security**: No server-side code execution
- **Performance**: No server load
- **Simplicity**: No API routes needed
- **Cost**: No server costs for compilation
- **Limitation**: Can't use imports (acceptable for learning)

### 2. Why hardcode code in components?

- `next-intl` parser conflicts with JSX syntax
- Code is universal (same in all languages)
- Keeps translation files clean
- Industry standard: code in English

### 3. Why separate data files for challenges?

- Organization: Clear separation of concerns
- Maintainability: Easier to find and update
- Scalability: Simple challenges in main repo, complex ones in separate repos

### 4. Why auxiliary repositories for advanced concepts?

- **Isolation**: Each concept gets its own app
- **Comparison**: Same problem, different solutions side-by-side
- **Real-world**: Closer to actual project structure
- **Scalability**: Doesn't bloat main repository
- **Learning**: Students see real project organization

---

## Component Communication

### Data Flow

```
Exercise Page
    ↓
Fetches exercise data (getExerciseById)
    ↓
Passes to ExerciseExplanation (instructions)
    ↓
Passes to Sandbox (template)
    ↓
Sandbox renders Monaco Editor + react-live
    ↓
User edits code
    ↓
Code compiles and renders in preview
```

### Props Flow

```
Exercise Page
├── ExerciseExplanation (exercise.explanation)
├── ExerciseNavigator (exerciseId, category)
├── LanguageSwitcher (no props, reads from URL)
└── Sandbox (exercise.template)
```

---

## Error Handling

### Compilation Errors

- Caught by `react-live`'s `LiveError` component
- Displayed in preview area
- User-friendly messages with hints

### Runtime Errors

- Caught by `ErrorBoundary` component
- Wraps `SandboxPreview`
- Displays error message with recovery option

### Not Found Errors

- Exercise not found: 404 page in `[exerciseId]/page.tsx`
- Invalid locale: 404 via Next.js `notFound()`

---

**Last Updated**: Based on current project state (Milestone 1 in progress)

