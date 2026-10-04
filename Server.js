  import express from "express";
  const app = express();

  app.use(express.json())

  const usuarios = []
  let id = 1

  //Lista todos os usuários
  app.get('/usuarios',(req,res)=> {

    return res.json(usuarios)

  })
  // pega um usuário pelo ID
  app.get('/usuarios/:id',(req,res)=> {

    let id = parseInt (req.params.id)

    const acharIdUsuario = usuarios.find
    (idUsuario => idUsuario.id === id)

    const status = acharIdUsuario ? 200 : 400

    return res.status(status).json(acharIdUsuario)

  })

  //cria um novo usuário
  app.post('/usuarios',(req,res)=> {

    const {nome_usuario, dataNasc, cidade} = req.body

    const usuario = {
      nome_usuario: nome_usuario,

      dataNasc: dataNasc,

      cidade: cidade,
      
      id: id++
    }

     if (!usuario){
      return res.status(400)
    }

    usuarios.push(usuario)
    return res.status(201).json(usuario)
   
  })
  // deleta um usuário pelo id
  app.delete('/usuarios/:id',(req,res)=> {
    const id = parseInt (req.params.id)

    const deletarUsuario = usuarios.findIndex(usuarioId => usuarioId.id === id )

    const [index] = usuarios.splice(deletarUsuario,1)

    return res.status(204).json({mensagem: "usuario deletado"})

  })

  // atualiza o usuario pelo id

  app.put ('/usuarios/:id',(req,res)=> {
  const id = parseInt (req.params.id)

  const {nome_usuario, dataNasc, cidade} = req.body

  const indexUser = usuarios.findIndex(idUser => idUser.id === id)

  const status = indexUser >=0 ? 200 : 404

  if (indexUser >=0){
    usuarios[indexUser] = {id: parseInt(id),nome_usuario, dataNasc, cidade}
  }
  return res.status(status).json(usuarios[indexUser])
})
  

  app.listen(3000, () => {
    console.log("server rodando na porta 3000, visite http://localhost:3000");
  });
