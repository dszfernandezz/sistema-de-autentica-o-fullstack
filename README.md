# Sistema de Autenticação FullStack

Sistema completo de cadastro e login de usuários desenvolvido com React + TypeScript no frontend, Node.js + Express no backend, PostgreSQL como banco de dados e Docker para containerização.

![Badge](https://img.shields.io/badge/status-em%20desenvolvimento-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Funcionalidades

- Cadastro de usuários com validação em tempo real (e-mail, CPF, telefone, senha)
- Verificação assíncrona de disponibilidade de e-mail e telefone
- Login com CPF e senha
- Pré-autenticação (Apenas libera o campo de senha se o usuario existir)
- Geração de token JWT para sessão segura
- Interface responsiva e estilizada com Tailwind CSS

## Tecnologias Utilizadas

### Frontend
- **React** com **TypeScript**
- **Vite** como build tool
- **Tailwind CSS** para estilização
- **React Router DOM** para navegação
- **Zod** para validação de formulários
- **Hooks customizados** para validação assíncrona

### Backend
- **Node.js** com **Express**
- **TypeScript**
- **PostgreSQL** como banco de dados relacional
- **jsonwebtoken** para autenticação
- **bcrypt** para hash de senhas
- **dotenv** para variáveis de ambiente
- **cors** para segurança

### Infraestrutura
- **Docker** e **Docker Compose** para containerização
- **pg** (node-postgres) para conexão com o banco

## Pré-requisitos

Antes de começar, você precisará ter instalado:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (opcional, para rodar com containers)
- [Git](https://git-scm.com/)

