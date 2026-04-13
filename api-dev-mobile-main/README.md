# API Camadas (NestJS + TypeORM) - Guia de Execucao

## Pre-requisitos
- Node.js 18+
- PostgreSQL 13+

## Configuracao
1. Instale as dependencias:
```
npm install
```
2. Crie o arquivo `.env` com base em `.env.example` e ajuste os valores.

## Banco de Dados
1. Crie o banco:
```
CREATE DATABASE api_camadas;
```
2. Execute as migrations:
```
npm run migrate
```

## Executar a aplicacao
- Modo desenvolvimento:
```
npm run dev
```
- Build e producao:
```
npm run build
npm start
```

## Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (protegido com JWT)
