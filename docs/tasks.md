# Roadmap de desenvolvimento — Ficha Interativa Tormenta 20

Passos ordenados por prioridade e dependência. Cada fase deve ser concluída antes de avançar para a próxima.

---

## Fase 1 — Fundação do projeto

- [x] Inicializar o projeto com `create-next-app` (TypeScript, App Router, ESLint, Tailwind CSS)
- [x] Configurar `tsconfig.json` com `strict: true`
- [x] Instalar e configurar Prettier com regras básicas
- [x] Criar estrutura de pastas do projeto (`/app`, `/components`, `/lib`, `/server`, `/prisma`)
- [ ] Inicializar repositório Git e fazer primeiro commit da estrutura base

## Fase 2 — Interface base

- [ ] Instalar e configurar shadcn/ui
- [ ] Criar layout raiz (`/app/layout.tsx`) com fonte e tema do projeto
- [ ] Criar página inicial (`/app/page.tsx`) com apresentação da plataforma
- [ ] Criar componentes de navegação (header, sidebar)
- [ ] Definir paleta de cores e tipografia inspirada no visual de Tormenta 20

## Fase 3 — Banco de dados

- [ ] Criar instância PostgreSQL local para desenvolvimento (via Docker ou Railway dev environment)
- [ ] Instalar e inicializar Prisma (`prisma init`)
- [ ] Modelar o schema inicial no `schema.prisma`:
  - [ ] Model `User` (id, nome, email, avatar)
  - [ ] Model `Character` (atributos, perícias, HP, mana, nível, raça, classe)
  - [ ] Model `Campaign` (nome, código de convite, mestre, jogadores)
  - [ ] Model `CharacterCampaign` (relação N:N entre personagens e campanhas)
- [ ] Rodar a primeira migration com `prisma migrate dev`
- [ ] Criar arquivo `lib/prisma.ts` com o singleton do Prisma Client

## Fase 4 — Autenticação

- [ ] Instalar Auth.js (`next-auth`) e dependências
- [ ] Configurar provider do Google OAuth (criar app no Google Cloud Console)
- [ ] Configurar provider do Discord OAuth (criar app no Discord Developer Portal)
- [ ] Criar arquivo `auth.ts` na raiz com a configuração do Auth.js
- [ ] Criar API route `/api/auth/[...nextauth]/route.ts`
- [ ] Conectar Auth.js ao Prisma (Prisma Adapter)
- [ ] Criar páginas de login e logout
- [ ] Proteger rotas autenticadas com middleware do Next.js (`middleware.ts`)

## Fase 5 — Ficha de personagem (CRUD)

- [ ] Criar página de criação de personagem (`/app/personagem/novo/page.tsx`)
- [ ] Criar formulário com todos os campos da ficha T20 (atributos, perícias, raça, classe)
- [ ] Criar API routes para salvar e buscar personagens (`/api/personagens`)
- [ ] Validar dados do formulário com Zod antes de enviar para a API
- [ ] Criar página de visualização da ficha (`/app/personagem/[id]/page.tsx`)
- [ ] Criar página de edição da ficha (`/app/personagem/[id]/editar/page.tsx`)
- [ ] Criar listagem de personagens do usuário (`/app/personagens/page.tsx`)
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

- [ ] Criar conta no Railway e iniciar novo projeto
- [ ] Adicionar serviço PostgreSQL no Railway e obter a `DATABASE_URL`
- [ ] Configurar variáveis de ambiente no Railway (secrets do OAuth, `NEXTAUTH_SECRET`, etc.)
- [ ] Conectar o repositório GitHub ao Railway para deploy automático
- [ ] Configurar o `Dockerfile` ou deixar Railway detectar o projeto Next.js
- [ ] Rodar migrations em produção via Railway (`prisma migrate deploy`)
- [ ] Validar fluxo completo em produção: login → criar personagem → entrar em campanha → sync ao vivo

---

## Bônus (pós-MVP)

- [ ] Modo escuro / claro
- [ ] Exportar ficha como PDF
- [ ] Histórico de sessões por campanha
- [ ] Notificações em tempo real (ex: mestre pede rolagem)
- [ ] Suporte a múltiplas classes (multiclasse T20)
