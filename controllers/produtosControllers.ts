import pool from "../database/db.js";
import type { Request, Response } from "express";
import type { produtos } from "../types/produtos.js";

export async function buscarProdutos(req: Request, res: Response){
try {
    
    const resultado = await pool.query("SELECT * FROM produtos");

    return res.status(200).json(resultado.rows);

    } catch (error) {
    console.error("erro ao buscar produtos  ", error);

    res.status(500).json({mensagem: "houve um erro interno no servidor"})

    }
}

export async function buscarProdutosPorId(req: Request, res: Response){

try{

    const {id} = req.params;

    const resultado = await pool.query(
    `SELECT * FROM produtos WHERE id_produto = $1`,
    [id],)

  if(resultado.rows.length === 0)
    {return res.status(404).json({mensagem: "o produto nao existe ou não foi encontrado"})};

    return res.status(200).json(resultado.rows[0]);

} catch(error){
  console.error("um erro foi encontrado ao tentar buscar o produto",error)
  return res.status(400).json({mensagem: "parece que você não colocou um número"})}
}

export async function criarProduto(req: Request, res: Response){
    try{
      const { nome_produto, estoque, valor }: produtos = req.body;
      
      const resultado = await pool.query(
        `INSERT INTO produtos (nome_produto, estoque, valor)
        VALUES ($1,$2,$3)
        RETURNING *`,[nome_produto, estoque, valor],
      );

      return res.status(201).json(resultado.rows[0]);

    }catch(error){
        console.error("erro ao criar produto",error)
        return res.json(500).json({mensagem: "erro interno no servidor"})
    }
}