const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // permite acessar index.html

const dataPath = path.join(__dirname, "dados.json");

app.post("/salvar-pedido", (req, res) => {
  try {
    const novoPedido = req.body;
    const dados = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    dados.orders.push(novoPedido);
    fs.writeFileSync(dataPath, JSON.stringify(dados, null, 4), "utf8");
    res.status(200).json({ message: "Pedido salvo com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao salvar pedido." });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
