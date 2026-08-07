# Contexto do Projeto — Ficha Interativa Tormenta 20

Este arquivo contém o contexto completo do projeto para retomada de conversa com o Claude Code em qualquer dispositivo.

---

## O que é este projeto

Aplicação web de **ficha interativa para Tormenta 20** (sistema de RPG de mesa brasileiro da Jambô Editora), desenvolvida como **projeto de treino de desenvolvimento web fullstack** com TypeScript.

Inspirada no [CRIS](https://crisordemparanormal.com), plataforma de fichas online do Ordem Paranormal RPG.

**Desenvolvedor:** Rodrigo Marques  
**Nível de experiência:** Iniciante/Intermediário em desenvolvimento web

---

## Stack definida

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript |
| UI | Tailwind CSS + shadcn/ui |
| Real-time | Socket.io |
| Banco de dados | PostgreSQL (Neon) + Prisma ORM |
| Autenticação | Auth.js (NextAuth v5) — Google + Discord OAuth |
| Validação | Zod |
| Hospedagem | Fly.io (gratuito, suporta WebSockets + custom server) |

---

## Decisões de arquitetura tomadas

- **Real-time é essencial**: HP, status e recursos dos personagens devem sincronizar ao vivo durante as sessões. Socket.io com rooms por campanha é a solução escolhida.
- **Next.js com custom server**: Para rodar Socket.io junto ao Next.js num único container, será usado um `server.ts` customizado.
- **Auth social obrigatório**: Somente Google e Discord OAuth, sem sistema de senhas próprio.
- **Fly.io como host**: Escolhido por suportar WebSockets persistentes e ser 100% gratuito para MVP. Vercel descartado por não suportar WebSockets persistentes. Railway descartado por não ser garantidamente gratuito ($5 crédito/mês).

---

## Funcionalidades planejadas

1. Ficha de personagem completa (atributos, perícias, poderes, inventário, etc.)
2. Rolagem de dados integrada (clicar no atributo já rola)
3. Sincronização em tempo real (Socket.io rooms por campanha)
4. Gestão de campanhas (mestre cria, convida jogadores, vê fichas ao vivo)
5. Compêndio de regras (poderes, itens, magias, raças do T20)

---

## Estado atual do projeto

### Fase 1 — Fundação (concluída)
- [x] Next.js 15 inicializado (TypeScript, App Router, Tailwind CSS, ESLint)
- [x] `tsconfig.json` com `strict: true`
- [x] Prettier instalado e integrado ao ESLint (`eslint-config-prettier`)
- [x] Estrutura de pastas criada (`/app`, `/components`, `/lib`, `/server`, `/prisma`)
- [x] Primeiro commit e push para o GitHub

### Fase 2 — Interface base (concluída)
- [x] shadcn/ui instalado e configurado
- [x] Layout raiz (`/app/layout.tsx`) com fonte e tema do projeto
- [x] Página inicial (`/app/page.tsx`) com apresentação da plataforma
- [x] Componentes de navegação (header, sidebar)
- [x] Paleta de cores e tipografia inspirada no visual de Tormenta 20

### Fase 3 — Banco de dados (concluída)
- [x] PostgreSQL provisionado no Neon (plano gratuito permanente)
- [x] Prisma instalado e configurado com `prisma.config.ts`
- [x] Schema modelado: `User`, `Character` (com multiclasse), `Campaign`, `CharacterCampaign`
- [x] ERD generator configurado — diagrama gerado em `prisma/ERD.svg`
- [x] `lib/prisma.ts` com singleton do Prisma Client
- [x] Primeira migration aplicada no banco

### Fase 4 — Autenticação (concluída)
- [x] Auth.js (next-auth@beta) instalado com @auth/prisma-adapter
- [x] Google OAuth e Discord OAuth configurados
- [x] `lib/auth.ts` com configuração dos providers
- [x] API route `app/api/auth/[...nextauth]/route.ts`
- [x] Models de auth adicionados ao schema (`Account`, `Session`, `VerificationToken`, `emailVerified` no `User`)
- [x] Página de login com Server Actions (`app/login/page.tsx`)
- [x] Rotas protegidas via `proxy.ts` (Next.js 16)

### Fase 5 — Ficha de personagem (em andamento)
- [x] Zod instalado e schema de validação criado (`lib/validator/character.ts`)
- [x] Schema Prisma refatorado — multiclasse ilimitada via model `CharacterClass`
- [x] API routes criadas: GET/POST `/api/characters` e GET/PUT/DELETE `/api/characters/[id]`
- [x] Listagem de personagens (`app/(app)/characters/page.tsx`)
- [ ] Página de criação (`character/new/page.tsx`) + formulário completo
- [ ] Página de visualização (`character/[id]/page.tsx`)
- [ ] Página de edição (`character/[id]/edit/page.tsx`)
- [ ] Deleção com confirmação

### Próximas fases
- [ ] Fase 6 — Rolagem de dados
- [ ] Fase 7 — Tempo real (Socket.io)
- [ ] Fase 8 — Gestão de campanhas
- [ ] Fase 9 — Compêndio
- [ ] Fase 10 — Deploy no Fly.io

---

## Como o Claude deve atuar neste projeto

**Modo professor:** O objetivo do projeto é aprendizado. O Claude não deve executar comandos, criar arquivos ou escrever código pelo usuário. Deve explicar o que fazer, por quê, e aguardar o usuário executar. Só intervém diretamente se o usuário pedir explicitamente.

**Atualização automática de progresso:**
- A cada passo concluído dentro de uma fase: atualizar `docs/tasks.md` marcando o item como `[x]`
- Ao concluir uma fase inteira: atualizar `CLAUDE.md` movendo a fase para "concluída" com seus itens detalhados

---

## Convenções a seguir

- TypeScript strict em todo o projeto
- Zod para validação em todas as entradas (formulários, API routes)
- Prisma como única interface com o banco — sem queries SQL diretas
- Componentes de UI via shadcn/ui — evitar CSS customizado quando possível
- Sem comentários desnecessários no código — nomes descritivos substituem comentários
