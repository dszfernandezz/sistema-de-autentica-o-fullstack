import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../config/db.js";

// registra usuario
export const registerUser = async (req: Request, res: Response) => {
  const {
    nome,
    cpf,
    data_nascimento,
    telefone,
    email,
    endereco,
    complemento,
    cep,
    senha,
    confirmarSenha,
  } = req.body;

  // valida senha
  if (senha !== confirmarSenha) {
    return res.status(400).json({ error: { message: "As senhas não são iguais" } });
  }

  if (senha.length < 8) {
    return res.status(400).json({ error: { message: "A senha deve ter no mínimo 8 caracteres" } });
  }

  // valida email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: { message: "E-mail inválido" } });
  }

  const cleanCPF = cpf.replace(/\D/g, "");
  if (cleanCPF.length !== 11) {
    return res.status(400).json({ error: { message: "O CPF deve conter 11 números." } });
  }

  const cleanPhone = telefone.replace(/\D/g, "");
  if (cleanPhone.length < 10 || cleanPhone.length > 11) {
    return res.status(400).json({ error: { message: "O telefone deve conter 10 ou 11 números." } });
  }

  try {
    const userExists = await query(
      "SELECT id FROM usuarios where email = $1 OR cpf = $2",
      [email, cleanCPF],
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: { message: "Email ou CPF já cadastrados" } });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const sql = `
            INSERT INTO usuarios 
            (nome, email, senha, cpf, data_nascimento, telefone, endereco, complemento, cep)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)    
        `;

    const values = [nome, email, hashedPassword, cleanCPF, data_nascimento, cleanPhone, endereco, complemento || null, cep];

    await query(sql, values);

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro no cadastro:", err);
    res.status(500).json({ error: { message: "Erro interno ao processar o cadastro." } });
  }
};

// faz login do usuario
export const loginUser = async (req: Request, res: Response) => {
  // AJUSTE: O Frontend envia 'cpf', então pegamos 'cpf' e limpamos aqui
  const { cpf, senha } = req.body;
  
  try {
    const cleanCPF = cpf.replace(/\D/g, "");
    const result = await query("SELECT * FROM usuarios WHERE cpf = $1", [cleanCPF]);

    if (result.rows.length === 0)
      return res.status(401).json({ error: { message: "Usuário não encontrado" } });

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(senha, user.senha);

    if (!validPassword) 
      return res.status(401).json({ error: { message: "Senha inválida" } });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: { message: "Servidor sem configuração de chave secreta" } });
    }

    const token = jwt.sign({ id: user.id, cpf: user.cpf, email: user.email }, secret, { expiresIn: "24h" });

    res.status(200).json({
      token,
      user: {
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
        cpf: user.cpf,
      },
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: { message: "Erro interno ao processar o login." } });
  }
};

// ... as outras funções (checkEmail, checkPhone, preSignin) já estão com a estrutura correta!
export const checkEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await query("SELECT id FROM usuarios WHERE email = $1", [email]);
    res.json({ exists: result.rows.length > 0 });
  } catch (err) {
    res.status(500).json({ error: { message: "Erro ao verificar e-mail" } });
  }
}

export const checkPhone = async (req: Request, res: Response) => {
  try {
    const { telefone } = req.body;

    if (!telefone) {
      return res.status(400).json({ error: { message: "Telefone não fornecido" } });
    }

    // Limpa a máscara (ex: (49) 99999-9999 -> 49999999999)
    const cleanPhone = telefone.replace(/\D/g, "");

    const result = await query("SELECT id FROM usuarios WHERE telefone = $1", [cleanPhone]);
    
    // Retorna true se já existir, false se estiver disponível
    return res.json({ exists: result.rows.length > 0 });
  } catch (err) {
    console.error("Erro ao verificar telefone:", err);
    return res.status(500).json({ error: { message: "Erro ao verificar telefone" } });
  }
}

export const preSignin = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.body;   // <-- agora espera "cpf"

    if (!cpf) {
      return res.status(400).json({ 
        error: { message: "CPF não fornecido" } 
      });
    }

    // Busca usuário pelo CPF
    const result = await query(
      "SELECT nome, cpf FROM usuarios WHERE cpf = $1",
      [cpf]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        error: { message: "Usuário não encontrado" } 
      });
    }

    const user = result.rows[0];

    return res.status(200).json({
      username: user.cpf,    // o frontend espera "username"
      name: user.nome
    });

  } catch (err) {
    console.error("Erro na pré-autenticação:", err);
    return res.status(500).json({ 
      error: { message: "Erro interno no servidor" } 
    });
  }
};


