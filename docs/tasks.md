# Roadmap de desenvolvimento — Ficha Interativa Tormenta 20

Passos ordenados por prioridade e dependência. Cada fase deve ser concluída antes de avançar para a próxima.

---

## Fase 1 — Fundação do projeto

- [x] Inicializar o projeto com `create-next-app` (TypeScript, App Router, ESLint, Tailwind CSS)
- [x] Configurar `tsconfig.json` com `strict: true`
- [x] Instalar e configurar Prettier com regras básicas
- [x] Criar estrutura de pastas do projeto (`/app`, `/components`, `/lib`, `/server`, `/prisma`)
- [x] Inicializar repositório Git e fazer primeiro commit da estrutura base

## Fase 2 — Interface base

- [x] Instalar e configurar shadcn/ui
- [x] Criar layout raiz (`/app/layout.tsx`) com fonte e tema do projeto
- [x] Criar página inicial (`/app/page.tsx`) com apresentação da plataforma
- [x] Criar componentes de navegação (header, sidebar)
- [x] Definir paleta de cores e tipografia inspirada no visual de Tormenta 20

## Fase 3 — Banco de dados

- [x] Criar instância PostgreSQL no Neon (plano gratuito, substituiu Docker local)
- [x] Instalar e inicializar Prisma (`prisma init`)
- [x] Modelar o schema inicial no `schema.prisma`:
  - [x] Model `User` (id, nome, email, avatar)
  - [x] Model `Character` (atributos, HP, mana, raça, multiclasse com class1/class2)
  - [x] Model `Campaign` (nome, código de convite, mestre)
  - [x] Model `CharacterCampaign` (relação N:N entre personagens e campanhas)
- [x] Rodar a primeira migration com `prisma migrate dev`
- [x] Criar arquivo `lib/prisma.ts` com o singleton do Prisma Client

## Fase 4 — Autenticação

- [x] Instalar Auth.js (`next-auth@beta`) e `@auth/prisma-adapter`
- [x] Configurar provider do Google OAuth (Google Cloud Console)
- [x] Configurar provider do Discord OAuth (Discord Developer Portal)
- [x] Criar arquivo `lib/auth.ts` com a configuração do Auth.js
- [x] Criar API route `app/api/auth/[...nextauth]/route.ts`
- [x] Conectar Auth.js ao Prisma (Prisma Adapter) — adicionado `emailVerified` ao model `User`
- [x] Criar página de login (`app/login/page.tsx`) com Server Actions
- [x] Proteger rotas autenticadas com `proxy.ts` (Next.js 16)

## Fase 5 — Ficha de personagem (CRUD)

- [x] Instalar Zod para validação
- [x] Criar schema Zod em `lib/validator/character.ts`
- [x] Criar API route GET e POST em `app/(app)/api/characters/route.ts`
- [x] Criar API route GET, PUT e DELETE em `app/(app)/api/characters/[id]/route.ts`
- [x] Criar listagem de personagens (`app/(app)/characters/page.tsx`)
- [x] Schema atualizado para multiclasse ilimitada (`CharacterClass` model separado)
- [ ] Criar página de criação de personagem (`app/(app)/character/new/page.tsx`)
- [ ] Criar formulário com campos da ficha T20 (atributos, raça, classes)
- [ ] Criar página de visualização da ficha (`app/(app)/character/[id]/page.tsx`)
- [ ] Criar página de edição da ficha (`app/(app)/character/[id]/edit/page.tsx`)
- [ ] Implementar deleção de personagem com confirmação

## Fase 6 — Rolagem de dados

- [ ] Criar função utilitária `lib/dice.ts` (rolar d4, d6, d8, d10, d12, d20, d100)
- [ ] Adicionar botão de rolagem em cada atributo e perícia da ficha
- [ ] Criar componente de resultado de rolagem (toast ou modal animado)
- [ ] Exibir histórico de rolagens da sessão (últimas 10 rolagens)

## Fase 7 — Tempo real com Socket.io

- [ ] Instalar Socket.io (`socket.io` e `socket.io-client`)
- [ ] Criar `server.ts` na raiz para o custom server do Next.js com Socket.io integrado
- [ ] Atualizar `package.json` para rodar o custom server em vez do `next start` padrão
- [ ] Criar sistema de rooms (uma room por campanha)
- [ ] Emitir eventos ao atualizar HP, pontos de mana e status na ficha
- [ ] Receber eventos e atualizar UI em tempo real para todos os jogadores da campanha
- [ ] Criar hook `useSocket.ts` para gerenciar a conexão no cliente

## Fase 8 — Gestão de campanhas

- [ ] Criar página de criação de campanha (`/app/campanha/nova/page.tsx`)
- [ ] Gerar código de convite único por campanha
- [ ] Criar fluxo de entrada na campanha via código de convite
- [ ] Criar painel do mestre com fichas de todos os jogadores em tempo real
- [ ] Implementar controle de permissões (mestre vs. jogador)
- [ ] Listar campanhas do usuário (como mestre e como jogador)

## Fase 9 — Compêndio

- [ ] Modelar no Prisma as entidades do compêndio: `Race`, `Class`, `Power`, `Spell`, `Item`
- [ ] Popular o banco com dados do Tormenta 20 (raças, classes, poderes iniciais)
- [ ] Criar página do compêndio com busca e filtros (`/app/compendio/page.tsx`)
- [ ] Vincular o compêndio à criação de personagem (autopreenchimento ao escolher raça/classe)

## Fase 10 — Deploy

- [ ] Criar conta no Fly.io e instalar CLI (`flyctl`)
- [ ] Criar `Dockerfile` para a aplicação Next.js com custom server
- [ ] Rodar `fly launch` para configurar o projeto
- [ ] Configurar variáveis de ambiente no Fly.io (secrets do OAuth, `AUTH_SECRET`, `DATABASE_URL`, etc.)
- [ ] Rodar migrations em produção (`prisma migrate deploy`)
- [ ] Fazer o deploy com `fly deploy`
- [ ] Validar fluxo completo em produção: login → criar personagem → entrar em campanha → sync ao vivo

---

## Bônus (pós-MVP)

- [ ] Modo escuro / claro
- [ ] Exportar ficha como PDF
- [ ] Histórico de sessões por campanha
- [ ] Notificações em tempo real (ex: mestre pede rolagem)
- [ ] Suporte a múltiplas classes (multiclasse T20)
