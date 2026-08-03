# Ficha Interativa — Tormenta 20

Aplicação web de ficha interativa para o sistema de RPG de mesa **Tormenta 20**, desenvolvida como projeto de treino de desenvolvimento web fullstack com TypeScript.

A plataforma é inspirada no [CRIS](https://crisordemparanormal.com), sistema de fichas online desenvolvido para Ordem Paranormal RPG.

---

## Objetivo

Construir uma plataforma web onde jogadores de Tormenta 20 possam criar, gerenciar e utilizar fichas de personagem de forma digital e interativa durante as sessões de jogo, praticando desenvolvimento web moderno com TypeScript ao longo do processo.

---

## Funcionalidades planejadas

- **Ficha de personagem interativa** — criação e edição completa de fichas T20
- **Rolagem de dados integrada** — clicar em atributos e perícias rola os dados automaticamente
- **Sincronização em tempo real** — HP, pontos de mana, status e recursos atualizados ao vivo durante a sessão
- **Gestão de campanhas** — mestres criam campanhas, convidam jogadores e acompanham fichas em tempo real
- **Compêndio de regras** — banco de dados de poderes, itens, magias e raças do Tormenta 20
- **Login social** — autenticação via Google e Discord

---

## Stack

| Camada | Tecnologia | Motivo |
|---|---|---|
| Framework principal | **Next.js 15** (App Router) | Fullstack TypeScript, SSR/SSG, ótimo ecossistema |
| Linguagem | **TypeScript** | Type safety ponta a ponta |
| UI | **Tailwind CSS + shadcn/ui** | Desenvolvimento visual rápido, componentes acessíveis |
| Real-time | **Socket.io** | WebSockets com rooms por campanha, amplamente documentado |
| Banco de dados | **PostgreSQL** | Relacional, ideal para fichas com múltiplas entidades |
| ORM | **Prisma** | Melhor DX para TypeScript, migrations automáticas |
| Autenticação | **Auth.js (NextAuth v5)** | OAuth Google e Discord com configuração mínima |
| Validação | **Zod** | Schemas com tipos TypeScript inferidos |
| Hospedagem | **Railway** | Suporte a containers + WebSockets + Postgres incluso |

---

## Arquitetura

```
Next.js App
├── /app          → páginas (ficha, campanha, compêndio)
├── /api          → Auth.js + endpoints REST
└── server.ts     → custom server com Socket.io acoplado

PostgreSQL (Railway)
└── Prisma ORM

Socket.io Rooms
└── uma room por campanha → sync de HP, status e dados ao vivo
```

---

## Como rodar localmente

> Instruções serão adicionadas conforme o projeto for estruturado.

---

## Referências

- [Tormenta 20 — Jambô Editora](https://jamboeditora.com.br)
- [CRIS — Ordem Paranormal RPG](https://crisordemparanormal.com) (inspiração)
