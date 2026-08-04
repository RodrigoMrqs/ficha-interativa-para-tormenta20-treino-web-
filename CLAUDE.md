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
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript |
| UI | Tailwind CSS + shadcn/ui |
| Real-time | Socket.io |
| Banco de dados | PostgreSQL + Prisma ORM |
| Autenticação | Auth.js (NextAuth v5) — Google + Discord OAuth |
| Validação | Zod |
| Hospedagem | Railway (container + Postgres) |

---

## Decisões de arquitetura tomadas

- **Real-time é essencial**: HP, status e recursos dos personagens devem sincronizar ao vivo durante as sessões. Socket.io com rooms por campanha é a solução escolhida.
- **Next.js com custom server**: Para rodar Socket.io junto ao Next.js num único container no Railway, será usado um `server.ts` customizado.
- **Auth social obrigatório**: Somente Google e Discord OAuth, sem sistema de senhas próprio.
- **Railway como host**: Escolhido por suportar WebSockets persistentes e Postgres incluso, diferente de Vercel que limita WebSockets.

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
- [x] Stack definida
- [x] Next.js 15 inicializado (TypeScript, App Router, Tailwind CSS, ESLint)
- [x] `tsconfig.json` com `strict: true`
- [x] Prettier instalado e integrado ao ESLint (`eslint-config-prettier`)
- [x] Estrutura de pastas criada (`/app`, `/components`, `/lib`, `/server`)
- [x] Primeiro commit e push para o GitHub

### Próximas fases
- [ ] Fase 2 — Interface base (shadcn/ui, layout, tema)
- [ ] Fase 3 — Banco de dados (PostgreSQL + Prisma)
- [ ] Fase 4 — Autenticação (Auth.js, Google + Discord)
- [ ] Fase 5 — Ficha de personagem (CRUD)
- [ ] Fase 6 — Rolagem de dados
- [ ] Fase 7 — Tempo real (Socket.io)
- [ ] Fase 8 — Gestão de campanhas
- [ ] Fase 9 — Compêndio
- [ ] Fase 10 — Deploy no Railway

---

## Convenções a seguir

- TypeScript strict em todo o projeto
- Zod para validação em todas as entradas (formulários, API routes)
- Prisma como única interface com o banco — sem queries SQL diretas
- Componentes de UI via shadcn/ui — evitar CSS customizado quando possível
- Sem comentários desnecessários no código — nomes descritivos substituem comentários
