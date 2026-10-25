import pool from "../database/db.js";
import type { Request, Response } from "express";
import type { Usuario } from "../types/usuarios.js";

export async function buscarUsuarios(req: Request, res: Response){
     const getUsers = await pool.query(`SELECT * FROM clientes`)
    return res.json(getUsers.rows)
}
export async function buscarUsuariosPorId(req: Request, res: Response){
     try{
  const id = req.params.id
  const getUsersbyId = await pool.query(`SELECT * FROM clientes WHERE id = $1`, [id])
  if (getUsersbyId.rows.length === 0){
    return res.status(404).json({mensagem: "cliente não encontrado"})
  }
  return res.json(getUsersbyId.rows[0])
  }catch(error){
    console.error("um erro foi encontrado: ",error)
    return res.status(400).json({mensagem: "parece que você não colou números no id, tente novamente"})
  }
}

export async function criarUsuarios(req: Request, res: Response){
    const {nome, saldo}: Usuario = req.body
    const postUsers = await pool.query(
        `INSERT INTO clientes (nome,saldo) VALUES($1,$2) RETURNING *`,
        [nome,saldo]
      )
      return res.json(postUsers.rows[0])
}