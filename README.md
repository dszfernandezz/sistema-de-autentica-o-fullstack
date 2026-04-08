# Sistema de Autenticação FullStack

![Status](https://img.shields.io/badge/status-em%40desenvolvimento-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Sobre o Projeto

Sistema completo de autenticação de usuários desenvolvido para oferecer portifólio.
A aplicação possui desde a interface até a infraestrutura, com validações em tempo real e autenticação baseada em tokens JWT.

## Como foi Desenvolvido

- **Frontend** construído com **React + TypeScript** e **Vite**, utilizando **Tailwind CSS** para uma interface responsiva.  
- **Gerenciamento de formulários** com **Zod** e **hooks customizados**, permitindo validação instantânea e consultas assíncronas ao backend.  
- **Backend** em **Node.js + Express**, com lógica de autenticação segura e comunicação com banco de dados **PostgreSQL**.  
- **Infraestrutura** feita via **Docker** e **Docker Compose**, garantindo consistência entre ambientes e facilidade de implantação.

## Principais Funcionalidades

- **Cadastro de usuários** com validação em tempo real de CPF, e-mail, telefone e senha.  
- **Verificação assíncrona** de disponibilidade de e-mail e telefone antes do envio do formulário.  
- **Login com pré‑autenticação** – o campo de senha só é exibido após a confirmação de que o usuário existe.  
- **Geração de token JWT** para sessões seguras e protegidas.  
- **Armazenamento seguro de senhas** com hash **bcrypt**.  
- **Configuração de CORS** e uso de variáveis de ambiente para maior segurança no backend.

## Tecnologias Empregadas

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Zod
- Hooks customizados

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL
- jsonwebtoken (JWT)
- bcrypt
- dotenv
- CORS

### Infraestrutura
- Docker
- Docker Compose
- node-postgres (pg)