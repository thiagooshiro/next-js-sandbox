# Marcos do Projeto

Este documento descreve as etapas planejadas de desenvolvimento do Guia de Aprendizado Next.js. Os marcos são flexíveis e podem evoluir com base em feedback e uso real.

---

## Marco 1: Fundamentos e Exercícios Principais

**Objetivo:** Estabelecer uma base sólida com exercícios fundamentais e desafios básicos.

### Objetivos

* **15-20 exercícios fundamentais**
  * Conceitos principais do React (componentes, JSX, props, state, renderização condicional, etc.)
  * Dificuldade progressiva
  * Bem testados e polidos

* **10-15 desafios**
  * Aplicações práticas dos fundamentos
  * Padrões do mundo real (formulários, listas, filtros, etc.)
  * Exercícios focados em lógica

* **Estabilidade da plataforma**
  * Sandbox funcionando de forma confiável
  * Tratamento de erros robusto
  * Navegação suave

* **Melhorias de UI/UX**
  * Melhor design visual
  * Organização de layout mais clara
  * Usabilidade aprimorada
  * Melhor separação entre instruções, editor e preview

### Critérios de Sucesso

* Todos os exercícios fundamentais funcionam sem quebrar
* Os desafios fornecem experiências de aprendizado significativas
* A plataforma é estável e amigável
* Pronta para testes mais amplos

---

## Marco 2: Apresentação e Projetos Frontend

**Objetivo:** Adicionar página de apresentação do projeto e introduzir exercícios de projetos frontend.

### Objetivos

* **Página de apresentação do projeto**
  * Visão geral da plataforma de aprendizado
  * Catálogo de exercícios
  * Visualização do caminho de aprendizado

* **Exercícios de projetos frontend**
  * Aplicações frontend completas
  * Múltiplos componentes trabalhando juntos
  * Padrões de gerenciamento de estado
  * Roteamento e navegação

* **Biblioteca de exercícios expandida**
  * Mais exercícios fundamentais (conforme necessário)
  * Mais desafios (conforme necessário)
  * Ver até onde conseguimos chegar

### Critérios de Sucesso

* Usuários podem ver o caminho de aprendizado completo
* Projetos frontend são envolventes e educativos
* A biblioteca de exercícios é abrangente

---

## Marco 3: Conceitos Avançados e Projetos Full-Stack

**Objetivo:** Introduzir conceitos avançados do React e completar exercícios de projetos full-stack.

### Objetivos

* **Conceitos avançados**
  * Prop drilling
  * Context API
  * Redux
  * Outros padrões de gerenciamento de estado

* **Monorepo com workspaces (repositório auxiliar)**
  * **Estrutura:** Um repositório "nave-mãe" contendo múltiplas mini-apps isoladas
  * Cada mini-app demonstra um conceito específico (Context API, Redux, Zustand, etc.)
  * Usa workspaces npm/yarn/pnpm para compartilhar dependências mantendo apps isoladas
  * Backend: Backend Django gerencia todas as mini-apps de uma localização central
  * **Nota:** Esta é uma **estrutura didática**, não um padrão de arquitetura de produção - foi projetada para tornar os exercícios concisos e fáceis de explorar
  
  * **Abordagem dos exercícios:**
    * Exercícios contextuais mostrando **quando** usar cada ferramenta
    * Mesmo problema resolvido com abordagens diferentes (ex: carrinho de compras com Context vs Redux)
    * Exemplos funcionais que os estudantes podem explorar e comparar
    * Cada mini-app é autocontida mas compartilha as mesmas dependências do `package.json`
  
  * **Benefícios:**
    * Fácil de clonar e executar (repositório único)
    * Comparação direta entre diferentes soluções de gerenciamento de estado
    * Apps isoladas previnem confusão
    * Backend centralizado simplifica a configuração

* **Projetos full-stack**
  * Repositórios de projetos separados
    * Cada projeto é seu próprio repositório
    * Esta aplicação linka para repositórios externos
    * Cada projeto tem sua própria nomenclatura e estrutura
  * Integração com backend
    * Backends já construídos e prontos
    * Múltiplas opções de backend:
      * Node.js com Express
      * Django
      * FastAPI
    * Estudantes veem que tudo funciona de forma similar independente do backend
  * Estrutura do projeto
    * Backend é o "esqueleto" - já feito
    * Estudantes constroem o **frontend completo**
    * Experiência de aplicação full-stack
    * Estrutura de projeto do mundo real

### Critérios de Sucesso

* Conceitos avançados são bem explicados e praticados
* Funcionalidades complexas são demonstradas claramente
* Estudantes podem trabalhar em projetos full-stack reais
* Múltiplas tecnologias de backend são suportadas
* Projetos parecem aplicações do mundo real

---

## Marco 4: Plataforma Online (Exploratório)

**Objetivo:** Explorar e potencialmente implementar uma versão online da plataforma.

### Status

⚠️ **Este marco é exploratório** - ainda estamos descobrindo como isso será feito, se for feito.

### Considerações

* **Preocupações de segurança**
  * A implementação atual do editor executa código do usuário no navegador
  * Precisa avaliar cuidadosamente as implicações de segurança
  * Pode exigir mudanças arquiteturais significativas

* **Funcionalidades potenciais (se viável)**
  * Fazer deploy da plataforma online
  * Rastreamento de progresso do usuário
  * Execução de código baseada em nuvem
  * Contas de usuário e autenticação

* **Questões em aberto**
  * O rastreamento de progresso é viável com o modelo de segurança atual?
  * Podemos fazer deploy com segurança da execução de código gerado pelo usuário online?
  * Qual é a melhor abordagem para armazenamento de dados do usuário?
  * Devemos usar serviços especializados (CodeSandbox, StackBlitz) ou construir o nosso próprio?
  * Qual nível de sandboxing é necessário?

### Abordagem

* Isso será avaliado após os Marcos 1-3 estarem completos
* O foco está na **versão local** primeiro
* Deploy online é um "nice to have" que precisa de planejamento cuidadoso
* Pode exigir arquitetura diferente ou camadas adicionais de segurança

### Critérios de Sucesso

* Decisão tomada sobre viabilidade e abordagem
* Se viável, versão online básica implantada
* Preocupações de segurança abordadas
* Caminho claro a seguir (ou decisão de mantê-lo apenas local)

---

## Notas

* Os marcos são **flexíveis** e podem mudar com base em:
  * Feedback dos usuários
  * Testes do mundo real
  * Descobertas técnicas
  * Contribuições da comunidade

* **Foco:** O foco principal está na **versão local** da aplicação. O Marco 4 (plataforma online) é exploratório e pode ou não ser implementado.

* O projeto evolui organicamente - aprendemos enquanto construímos.

---

**Status Atual:** Trabalhando em direção ao Marco 1

