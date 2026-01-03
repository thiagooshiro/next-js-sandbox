# Padrões de Código e Arquitetura

Este documento descreve os padrões de código e a estrutura do projeto para orientar contribuições.

---

## Idioma do Código

**Todo o código é em inglês** - este é o padrão do projeto.

- Nomes de variáveis: `exerciseId`, `userName`, `isVisible`
- Nomes de funções: `getExerciseById`, `handleSubmit`
- Nomes de arquivos: `ExerciseExplanation.tsx`, `Sandbox.tsx`
- Comentários: Inglês
- Templates de código: Inglês

**Documentação** está disponível em inglês e português, mas o **código em si é sempre em inglês**.

---

## Convenções de Nomenclatura

### Arquivos e Componentes

- **Componentes**: PascalCase
  - `ExerciseExplanation.tsx`
  - `Sandbox.tsx`
  - `LanguageSwitcher.tsx`

- **Utilitários/Helpers**: camelCase
  - `exercises.ts`
  - `getExerciseById.ts`

- **Páginas**: `page.tsx` (convenção do Next.js)
  - `app/[locale]/exercises/[exerciseId]/page.tsx`

### Variáveis e Funções

- **Variáveis**: camelCase
  ```typescript
  const exerciseId = 'hello-world';
  const isVisible = true;
  const exerciseData = getExerciseById(id);
  ```

- **Funções**: camelCase
  ```typescript
  function getExerciseById(id: string) { }
  function handleClick() { }
  ```

- **Constantes**: UPPER_SNAKE_CASE (apenas para constantes verdadeiras)
  ```typescript
  const MAX_RETRIES = 3;
  const API_BASE_URL = 'https://api.example.com';
  ```

- **Tipos/Interfaces**: PascalCase
  ```typescript
  interface Exercise { }
  type ExerciseCategory = 'fundamentals' | 'challenges';
  ```

---

## Estrutura do Projeto

```
app/
├── [locale]/              # Rotas localizadas (en, pt)
│   ├── exercises/
│   │   └── [exerciseId]/
│   │       └── page.tsx
│   └── layout.tsx
├── components/            # Componentes React
│   ├── Sandbox.tsx
│   ├── ExerciseExplanation.tsx
│   └── ...
├── data/                  # Dados dos exercícios
│   ├── exercises.ts      # Fundamentos
│   └── challenges.ts     # Desafios simples (Marco 1-2)
└── globals.css

messages/                  # Traduções (apenas texto de UI)
├── en.json
└── pt.json
```

---

## Onde Adicionar Código

### Exercícios

- **Fundamentos**: `app/data/exercises.ts`
- **Desafios Simples** (Marco 1-2): `app/data/challenges.ts`
- **Desafios/Projetos Complexos** (Marco 3+): Repositórios auxiliares

### Componentes

- Todos os componentes React: `app/components/`
- Seguir padrões dos componentes existentes
- Usar interfaces TypeScript para props

### Traduções

- **Apenas texto de UI**: `messages/en.json` e `messages/pt.json`
- **Templates/exemplos de código**: Hardcode em componentes (inglês)
- **Nunca** colocar JSX em arquivos de tradução

---

## Padrões de Código

### TypeScript

- Usar TypeScript para todo código novo
- Definir interfaces para props e estruturas de dados
- Evitar `any` - usar tipos apropriados

```typescript
interface Exercise {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
```

### Componentes React

- Usar componentes funcionais
- Usar interfaces TypeScript para props
- Preferir exports nomeados para componentes

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

- Usar imports absolutos com alias `@/`
- Agrupar imports: externos → internos → tipos

```typescript
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Sandbox } from '@/app/components/Sandbox';
import { getExerciseById } from '@/app/data/exercises';

import type { Exercise } from '@/app/data/exercises';
```

---

## Internacionalização (i18n)

### Como Funciona

- URLs são prefixadas com locale: `/en/exercises/hello-world`
- Texto de UI vem de `messages/en.json` e `messages/pt.json`
- Código (templates, exemplos) é **sempre em inglês** e hardcoded

### Adicionando Traduções

1. Adicionar chave em ambos `messages/en.json` e `messages/pt.json`
2. Usar em componentes:
   ```typescript
   const t = useTranslations('common');
   <p>{t('welcomeMessage')}</p>
   ```
3. **Nunca** traduzir snippets de código - eles permanecem em inglês

---

## Estrutura de Dados de Exercícios

```typescript
export interface Exercise {
  id: string;                    // kebab-case: 'hello-world'
  title: string;                 // Inglês
  description: string;           // Inglês
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'fundamentals' | 'challenges' | 'projects';
  template: string;              // Template de código (Inglês)
  explanation?: {                // Explicação detalhada opcional
    title: string;
    intro: string;
    // ...
  };
}
```

---

## Estrutura Futura

### Marco 1-2 (Atual)

- Fundamentos: `app/data/exercises.ts`
- Desafios simples: `app/data/challenges.ts` (mesma estrutura)

### Marco 3+

- Conceitos avançados: Monorepo separado com workspaces
- Projetos full-stack: Repositórios separados por projeto

Veja `MILESTONES_PT.md` para detalhes.

---

## Referência Rápida

| O quê | Onde | Idioma |
|------|------|--------|
| Código de componentes | `app/components/` | Inglês |
| Dados de exercícios | `app/data/` | Inglês |
| Texto de UI | `messages/*.json` | en/pt |
| Templates de código | Hardcoded em componentes | Inglês |
| Nomes de variáveis | Em todo lugar | Inglês |
| Comentários | Em todo lugar | Inglês |

---

**Lembre-se**: Código é sempre em inglês. Documentação pode estar em ambos os idiomas, mas ao escrever código, use nomes, comentários e templates em inglês.

