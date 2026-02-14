# Onboarding rápido da base MEI2ME

## Visão geral
- Monorepo com dois apps:
  - `client/`: frontend React + Vite + TypeScript.
  - `server/`: backend NestJS + Prisma + PostgreSQL.
- O objetivo funcional principal é coletar dados do MEI, avaliar regras de desenquadramento/migração e apresentar diagnóstico.

## Estrutura principal

### Frontend (`client/`)
- Entrada: `src/main.tsx` (React + BrowserRouter + inicialização do Clarity).
- Rotas principais em `src/routes/routes.tsx`:
  - `/` Home
  - `/diagnostico`
  - `/mensagens`
  - `/app` (hub com módulos internos por hash)
- O `AppHub` usa hash (`#painel`, `#jornada`, etc.) e sidebar para trocar módulos sem nova rota.
- UI com componentes em `src/components/ui` (estilo shadcn/radix).
- Exemplo de feature integrada com API: `features/message/MessageForm.tsx` e `MessageList.tsx`.

### Backend (`server/`)
- Entrada em `src/main.ts`:
  - Prefixo global `/api`
  - Swagger em `/api/document`
  - ValidationPipe global
  - CORS controlado por variáveis de ambiente
- Módulos registrados em `src/app.module.ts`:
  - `MessageModule`
  - `DiagnosticoInicialModule`
  - `AnaliseMigracaoModule`
  - `PrismaModule`
- `DiagnosticoInicialService`:
  - consulta ReceitaWS por CNPJ,
  - normaliza dados,
  - persiste/atualiza em `Mei`,
  - chama análise de migração,
  - salva resultado em `Diagnostico`.
- `AnaliseMigracaoService`:
  - busca MEI no banco,
  - executa regras em `modules/analise-migracao/rules/`,
  - monta resposta final com motivos, riscos e referências legais.

## Dados e persistência
- Schema Prisma em `server/prisma/schema.prisma`.
- Modelos principais:
  - `Mei`: dados cadastrais + indicadores para regras.
  - `Diagnostico`: resultado e motivos.
  - `Mensagem`: exemplo simples de CRUD/listagem.
  - `Usuario` e `Cnae` como apoio.

## Fluxos para entender primeiro
1. **Fluxo de diagnóstico (core)**
   - Front envia dados -> endpoint de diagnóstico inicial -> integração ReceitaWS -> persistência -> execução de regras -> retorno da análise.
2. **Fluxo de mensagens (mais simples)**
   - Bom para começar: menor complexidade e cobre front+back+DB.

## Como rodar localmente
- Frontend: em `client/`
  - `npm install`
  - `npm run dev`
- Backend: em `server/`
  - `npm install`
  - configurar `.env` com `DATABASE_URL`, `FRONTEND_URL`, `FRONTEND_LOCAL_URL`
  - `npm run prisma:generate`
  - `npm run start:dev`

## Dicas para aprender mais rápido
- Comece pelo caminho feliz da feature `mensagens` para entender convenções.
- Depois siga o caminho completo do diagnóstico inicial para entender integrações e regras de negócio.
- Ao alterar regras, sempre valide testes de `analise-migracao` e `diagnostico-inicial`.
- Evite codificar regra nova direto no service: adicione em `rules/` e exporte no `index.ts`.
