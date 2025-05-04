<h1 align="center">Data Furia</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/EliasNote/chatFuria/main/chat-front/src/assets/logo.svg" alt="Data Furia Logo" width="120"/>
</p>

**Data Furia** é uma plataforma completa para coletar, validar e analisar dados de fãs de e-sports, projetada para oferecer experiências personalizadas a partir de insights profundos dos usuários.

## 📖 Visão Geral

Este repositório contém dois módulos principais:

- **API Backend**: Desenvolvida em NestJS com TypeORM, Puppeteer + Cheerio para extração de conteúdo e AI para validação de documentos e links.
- **Frontend**: Aplicação React + TypeScript (Vite) com Formik para coleta de dados e integração de redes sociais.

## 🚀 Tecnologias

### Backend

- Node.js, NestJS
- TypeORM
- Puppeteer (StealthPlugin) + Cheerio
- Swagger (para documentação de endpoints)

### Frontend

- React
- TypeScript
- Vite
- Formik
- CSS3

## 💻 Instalação e Uso

```bash
# Clone o repositório
git clone https://github.com/elias/dataFuria.git
cd dataFuria
```

### API (Backend)

```bash
cd data-furia-api
npm install
npm run start:dev    # inicia a API em modo de desenvolvimento
```

### Frontend

```bash
cd data-furia-front
npm install
npm run dev          # inicia o frontend em modo de desenvolvimento
```

## ⚙️ Configuração de Variáveis de Ambiente

### Backend (`data-furia-api/.env`)

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=data_furia
```

### Frontend (`data-furia-front/.env`)

```
VITE_BASE_URL=http://localhost:3000
```

## ▶️ Execução

- Acesse a API em `http://localhost:3000`
- Frontend disponível em `http://localhost:5173` (ou porta indicada pelo Vite)

## 📦 Deploy

- 🌐 Confira a versão pública em: **[Data Furia](https://eliasnote.github.io/dataFuria/)** 🚀

## 🎯 Desafio do Projeto

**Challenge #2: Know Your Fan [HARD]**

**Objetivo:**  
Desenvolver um app ou solução (ex: notebook Python) que colete o máximo de informações sobre você mesmo como um fã de e-sports. _Know Your Fan_ é uma estratégia bem utilizada por clubes para conhecer mais do fã e assim oferecer experiências e serviços exclusivos.

**Proposta:**

- Coletar dados básicos (nome, endereço, CPF) e histórico de interesses, atividades, eventos e compras do último ano.
- Realizar upload de documentos e validar a identificação da pessoa utilizando AI.
- Vincular redes sociais ao perfil (Google, Facebook), lendo interações e atividades relacionadas a organizações de e-sports (ex: FURIA).
- Compartilhar links de perfis em sites de e-sports e validar, via AI, se o conteúdo é relevante ao perfil do usuário.
