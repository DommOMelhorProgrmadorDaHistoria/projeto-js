import express from "express";

import usuariosRoutes from "./routes/user.routes.js";

import produtosRoutes from "./routes/produtos.routes.js";

const app = express();

app.use(express.json());

app.get("/dashboard", (req, res) => {
  return res.send(
    "Acesse /usuarios para consultar usuários e /produtos para consultar produtos."
  );
});

app.use("/usuarios", usuariosRoutes);
app.use("/produtos", produtosRoutes);

export default app;
