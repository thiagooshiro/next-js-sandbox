# Detalhes da Arquitetura

Este documento fornece explicações técnicas detalhadas de como as diferentes partes do projeto funcionam juntas.

---

## Índice

1. [Sistema de Internacionalização](#sistema-de-internacionalização)
2. [Componente Sandbox](#componente-sandbox)
3. [Sistema de Exercícios](#sistema-de-exercícios)
4. [Roteamento](#roteamento)
5. [Estrutura Futura](#estrutura-futura)

---

## Sistema de Internacionalização

### Visão Geral

O projeto usa `next-intl` para internacionalização, suportando inglês (`en`) e português (`pt`).

### Como Funciona

1. **Middleware** (`middleware.ts`):
   - Intercepta todas as requisições
   - Redireciona para o locale apropriado baseado na URL ou preferências do navegador
   - Locale padrão: `en`
   - Exclui rotas de API e arquivos estáticos

2. **Roteamento por Locale**:
   - URLs são prefixadas com locale: `/en/exercises/hello-world`
   - Locale é extraído dos parâmetros da URL na pasta `[locale]`
   - Locales inválidos resultam em 404

3. **Arquivos de Tradução** (`messages/en.json`, `messages/pt.json`):
   - Contém apenas texto de UI (botões, labels, mensagens de erro)
   - Organizado por namespaces (ex: `common`, `errors`)
   - **Snippets de código NÃO estão em arquivos de tradução**

4. **Layout** (`app/[locale]/layout.tsx`):
   - Envolve todas as páginas com `NextIntlClientProvider`
   - Carrega mensagens para o locale atual
   - Fornece traduções para todos os componentes filhos

5. **Usando Traduções**:
   ```tsx
   import { useTranslations } from 'next-intl';
   
   const t = useTranslations('common');
   <button>{t('tryCode')}</button>
   ```

### Por Que Código Não É Traduzido

1. **Técnico**: Sintaxe JSX (`<div>`, `{/* */}`) conflita com o parser de formato de mensagem do `next-intl`
2. **Prático**: Código é universal - React/JSX é o mesmo em todos os idiomas
3. **Padrão**: Padrão da indústria é manter código em inglês

**Solução**: Templates e exemplos de código são hardcoded em componentes/arquivos de dados (sempre em inglês).

---

## Componente Sandbox

### Visão Geral

O sandbox permite que usuários escrevam e executem código React em tempo real. É a funcionalidade principal de aprendizado.

### Arquitetura

**Arquivo**: `app/components/Sandbox.tsx`

### Componentes

1. **Monaco Editor** (lado esquerdo):
   - Editor de código com syntax highlighting
   - Pré-preenchido com template do exercício
   - Usuário edita código aqui
   - Importado dinamicamente para evitar problemas de SSR

2. **react-live** (lado direito):
   - `LiveEditor`: Recebe código do Monaco
   - `LivePreview`: Renderiza código compilado
   - `LiveError`: Exibe erros de compilação
   - Compila e executa código inteiramente no navegador

3. **Tratamento de Erros**:
   - `ErrorBoundary`: Captura erros de renderização do React
   - `LiveError`: Captura erros de compilação
   - Mensagens de erro amigáveis com dicas

### Fluxo de Execução de Código

```
Usuário digita no Monaco Editor
    ↓
Estado do código atualiza
    ↓
Código passado para LiveEditor do react-live
    ↓
react-live compila código (client-side, sem servidor)
    ↓
Código compilado renderiza em LivePreview
    ↓
Erros capturados por ErrorBoundary ou LiveError
    ↓
Erro exibido ao usuário
```

### Processamento de Templates

- Templates vêm de `exercise.template`
- Pré-processados para remover imports/exports (não necessários no react-live)
- CSS pode ser injetado condicionalmente para exercícios específicos
- Template padrão usado se template do exercício for inválido

### Por Que react-live?

- **Segurança**: Código roda no navegador, não no servidor
- **Performance**: Sem carga no servidor, compilação instantânea
- **Simplicidade**: Sem necessidade de rotas de API
- **Limitação**: Não pode usar imports (aceitável para exercícios de aprendizado)

---

## Sistema de Exercícios

### Estrutura de Dados

Exercícios são armazenados em arquivos TypeScript:

- **Fundamentos**: `app/data/exercises.ts`
- **Desafios Simples** (futuro): `app/data/challenges.ts`

### Interface de Exercício

```typescript
export interface Exercise {
  id: string;                    // Identificador único (kebab-case)
  title: string;                 // Título do exercício (Inglês)
  description: string;           // Descrição curta (Inglês)
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'fundamentals' | 'challenges' | 'projects';
  template: string;               // Template de código inicial (Inglês)
  explanation?: {                // Explicação detalhada opcional
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

### Acessando Exercícios

**Funções Auxiliares** (em `exercises.ts`):

```typescript
// Obter exercício por ID
export function getExerciseById(id: string): Exercise | undefined

// Obter exercícios por categoria
export function getExercisesByCategory(category: Exercise['category']): Exercise[]
```

### Categorias de Exercícios

1. **Fundamentos**:
   - Conceitos básicos do React
   - Funcionam perfeitamente com sandbox
   - Foco em componente único
   - Armazenados no repositório principal

2. **Desafios** (Simples):
   - Lógica mais complexa
   - Ainda funcionam com sandbox
   - Componente único ou poucos componentes
   - Armazenados em `challenges.ts` (Marco 1-2)

3. **Desafios** (Complexos) / **Projetos**:
   - Conceitos avançados
   - Múltiplos componentes
   - Aplicações completas
   - Repositórios separados (Marco 3+)

---

## Roteamento

### Estrutura de Rotas

```
/                              → Redireciona para /en/exercises/hello-world
/[locale]                      → Página inicial (redireciona para primeiro exercício)
/[locale]/exercises/[id]       → Página de exercício
```

### Rotas Dinâmicas

- `[locale]`: Prefixo de idioma (`en` ou `pt`)
  - Validado em `app/[locale]/layout.tsx`
  - Locales inválidos resultam em 404

- `[exerciseId]`: Identificador do exercício
  - Exemplos: `hello-world`, `jsx-basics`, `using-props`
  - Usado para buscar dados do exercício

### Fluxo da Página de Exercício

**Arquivo**: `app/[locale]/exercises/[exerciseId]/page.tsx`

1. Extrair `exerciseId` dos parâmetros da URL
2. Buscar exercício usando `getExerciseById(exerciseId)`
3. Se não encontrado, mostrar 404
4. Renderizar:
   - `ExerciseNavigator` (barra superior com Anterior/Próximo)
   - `LanguageSwitcher` (canto superior direito)
   - `ExerciseExplanation` (barra lateral esquerda com instruções)
   - `Sandbox` (lado direito, área principal)

### Troca de Idioma

**Arquivo**: `app/components/LanguageSwitcher.tsx`

- Lê locale atual da URL
- Substitui locale no pathname
- Navega para nova URL
- Atualiza router para atualizar traduções

---

## Estrutura Futura

### Marco 1-2: Estrutura Atual

```
app/data/
├── exercises.ts          # Exercícios fundamentais
└── challenges.ts        # Desafios simples (a ser criado)
```

**Desafios simples** seguem a mesma interface `Exercise` e funcionam com o sandbox.

### Marco 3+: Repositórios Auxiliares

#### Monorepo com Workspaces

Para conceitos avançados (Context API, Redux, etc.):

```
nextjs-advanced-examples/          # Repositório separado
├── package.json                   # Configuração de workspaces
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
├── backend/                       # Backend Django
│   └── manage.py
└── README.md
```

**Como conecta**:
- App principal (`nextjs-guide`) linka para este repositório
- Cada exercício avançado aponta para uma mini-app específica
- Estudantes clonam o repositório auxiliar separadamente
- Backend Django gerencia todas as mini-apps de um local

**Benefícios**:
- Fácil de clonar e executar (repositório único)
- Comparação direta entre diferentes soluções
- Apps isoladas previnem confusão
- Backend centralizado simplifica configuração

#### Projetos Full-Stack

Para projetos completos:

```
project-todo-app/                  # Repositório separado
├── backend/                       # Django/Express/FastAPI (pronto)
│   ├── api/
│   └── README.md
└── frontend/                      # Estudantes constroem isso
    └── README.md
```

**Como conecta**:
- App principal linka para repositórios de projetos
- Backend já está construído ("esqueleto")
- Estudantes constroem o frontend completo
- Cada projeto é independente
- Múltiplas opções de backend (Node/Express, Django, FastAPI)

---

## Decisões de Design Principais

### 1. Por que compilação client-side (react-live)?

- **Segurança**: Sem execução de código no servidor
- **Performance**: Sem carga no servidor
- **Simplicidade**: Sem necessidade de rotas de API
- **Custo**: Sem custos de servidor para compilação
- **Limitação**: Não pode usar imports (aceitável para aprendizado)

### 2. Por que hardcode código em componentes?

- Parser do `next-intl` conflita com sintaxe JSX
- Código é universal (mesmo em todos os idiomas)
- Mantém arquivos de tradução limpos
- Padrão da indústria: código em inglês

### 3. Por que arquivos de dados separados para desafios?

- Organização: Separação clara de responsabilidades
- Manutenibilidade: Mais fácil encontrar e atualizar
- Escalabilidade: Desafios simples no repositório principal, complexos em repositórios separados

### 4. Por que repositórios auxiliares para conceitos avançados?

- **Isolamento**: Cada conceito tem sua própria app
- **Comparação**: Mesmo problema, soluções diferentes lado a lado
- **Mundo real**: Mais próximo da estrutura real de projetos
- **Escalabilidade**: Não incha o repositório principal
- **Aprendizado**: Estudantes veem organização real de projetos

---

## Comunicação entre Componentes

### Fluxo de Dados

```
Página de Exercício
    ↓
Busca dados do exercício (getExerciseById)
    ↓
Passa para ExerciseExplanation (instruções)
    ↓
Passa para Sandbox (template)
    ↓
Sandbox renderiza Monaco Editor + react-live
    ↓
Usuário edita código
    ↓
Código compila e renderiza no preview
```

### Fluxo de Props

```
Página de Exercício
├── ExerciseExplanation (exercise.explanation)
├── ExerciseNavigator (exerciseId, category)
├── LanguageSwitcher (sem props, lê da URL)
└── Sandbox (exercise.template)
```

---

## Tratamento de Erros

### Erros de Compilação

- Capturados pelo componente `LiveError` do `react-live`
- Exibidos na área de preview
- Mensagens amigáveis com dicas

### Erros de Runtime

- Capturados pelo componente `ErrorBoundary`
- Envolve `SandboxPreview`
- Exibe mensagem de erro com opção de recuperação

### Erros de Não Encontrado

- Exercício não encontrado: Página 404 em `[exerciseId]/page.tsx`
- Locale inválido: 404 via `notFound()` do Next.js

---

**Última Atualização**: Baseado no estado atual do projeto (Marco 1 em progresso)

