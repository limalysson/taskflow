# Registro e Especificações do Projeto: To-Do List PWA Mobile

Este documento serve como fonte única da verdade para requisitos, arquitetura e acompanhamento de tarefas deste projeto de To-Do List Mobile PWA.

---

## 📱 Visão Geral do Projeto
Aplicação web progressiva (PWA) de gerenciamento de tarefas (*To-Do List*), desenvolvida sob o paradigma *Mobile-First*, permitindo aos usuários criar, organizar, filtrar e gerenciar afazeres tanto no navegador quanto instalado nativamente na tela inicial de smartphones (Android/iOS) com suporte a funcionamento offline.

---

## 🛠️ Stack Tecnológica e Ferramentas
- **Bundler & Dev Server**: Vite
- **Linguagens**: HTML5 Semântico, CSS3 Moderno (Custom Properties, Flexbox, Grid, Glassmorphism, Safe Areas), JavaScript ES6+ Vanilla
- **Armazenamento**: Web Storage API (`localStorage`) para persistência offline
- **Capacidades PWA**:
  - `manifest.webmanifest` (Ícones adaptativos, tema, display standalone, orientação retrato prioritária)
  - `sw.js` (Service Worker para cache de assets e modo offline resiliente)
  - Instalação facilitada via captura de `beforeinstallprompt`
- **Design & Tipografia**: Dark mode elegante com contrastes refinados, tipografia Inter (Google Fonts) e micro-interações.

---

## 🗂️ Estrutura de Diretórios
```
To-do/
├── GEMINI.md               # Diretrizes gerais de trabalho do agente
├── registro_projeto.md     # Especificação, checklist e documentação do projeto
├── package.json            # Configurações do projeto e scripts npm
├── vite.config.js          # Configuração do Vite
├── index.html              # Ponto de entrada com meta tags mobile/PWA
├── public/
│   ├── manifest.webmanifest# Manifesto PWA com metadados para instalação
│   ├── sw.js               # Service Worker para suporte offline
│   ├── icon-192.png        # Ícone do PWA 192x192
│   ├── icon-512.png        # Ícone do PWA 512x512
│   └── favicon.svg         # Ícone vetorial para navegador
└── src/
    ├── style.css           # Design system, layout mobile-first e temas
    └── main.js             # Lógica do app, gerenciamento de estado e registro do PWA
```

---

## ✅ Checklist de Implementação

### Etapa 1: Inicialização e Documentação
- [x] Criação do arquivo de registro `registro_projeto.md`
- [x] Configuração do `package.json` e instalação das dependências (Vite)
- [x] Configuração do `vite.config.js`

### Etapa 2: Infraestrutura PWA & Assets
- [x] Criação do `public/manifest.webmanifest` com configurações completas para mobile
- [x] Geração/criação dos ícones do PWA (`icon-192.png`, `icon-512.png`, `favicon.svg`)
- [x] Criação do Service Worker `public/sw.js` com estratégia de cache offline
- [x] Configuração de meta tags mobile (viewport, theme-color, apple-touch-icon) no `index.html`

### Etapa 3: Interface Mobile-First & CSS
- [x] Desenvolvimento do Design System em `src/style.css` (paleta dark sofisticada, tokens, tipografia)
- [x] Layout mobile-first com container centralizado para desktop e safe-areas para celular
- [x] Componentes de UI: Header com status de progresso, barra de filtros rápidos, lista de tarefas vazia/preenchida, barra/modal de criação de tarefas

### Etapa 4: Lógica do To-Do & PWA Script
- [x] Implementação de CRUD de tarefas (Adicionar, Alternar Concluído, Excluir, Filtrar) em `src/main.js`
- [x] Persistência dos dados no `localStorage`
- [x] Lógica de registro do Service Worker e captura do prompt de instalação (`beforeinstallprompt`)
- [x] Feedback visual para ações e contador dinâmico de tarefas

### Etapa 5: Validação e Testes
- [x] Validação do build de produção (`npm run build`) sem erros
- [x] Orientações detalhadas para teste manual no navegador e no celular via rede local

### Etapa 6: Redesign Visual (Estilo Things 3 / iOS Premium)
- [x] Eliminação de gradientes genéricos roxo/ciano e neons de IA
- [x] Aplicação de paleta grafite fosco, ardósia neutra e acento azul safira sóbrio
- [x] Implementação de checkboxes circulares Things 3
- [x] Atualização de ícones SVG e PNG do PWA
- [x] Revalidação de build (`npm run build`)

### Etapa 7: Sincronização com o Repositório GitHub
- [x] Criação do `.gitignore`
- [x] Inicialização do repositório Git local e primeiro commit
- [x] Vinculação do repositório remoto (`https://github.com/limalysson/taskflow.git`)
- [x] Push para branch `main`
