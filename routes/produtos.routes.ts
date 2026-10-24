import { Router } from "express";
import pool from "../database/db.js";
import { type produtos } from "../types/produtos.js";
const rotaProdutos = Router();

rotaProdutos.get("/", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM produtos");
    return res.json(resultado.rows);
  } catch (error) {
      console.error("um erro foi encontrado", error);
      res.status(500).json({mensagem: "houve um erro interno no servidor! nossa equipe está trabalhando para retomar as atividades o mais rápido possível, por favor aguarde"})
  }
});

rotaProdutos.get("/:id", async (req, res) => {
  try{
  const id = req.params.id;
  const resultado = await pool.query(
    `SELECT * FROM produtos WHERE id_produto = $1`,
    [id],
  )
  if(resultado.rows.length === 0){
    return res.status(404).json({mensagem: "o produto nao existe"})
  }
  return res.json(resultado.rows[0]);
}catch(error){
  console.error("um erro foi encontrado",error)
  return res.status(400).json({mensagem: "parece que você não colocou um número"})
}
  
});

rotaProdutos.post("/", async (req, res) => {
  const { nome_produto, estoque, valor }: produtos = req.body;
  const criarProduto = await pool.query(
    `INSERT INTO produtos (nome_produto, estoque, valor)
    VALUES ($1,$2,$3)RETURNING *`,
    [nome_produto, estoque, valor],
  );
  return res.status(201).json(criarProduto.rows[0]);
});

export default rotaProdutos;
