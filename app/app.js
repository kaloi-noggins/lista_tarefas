require("dotenv").config();
const path = require("path");
const express = require("express");
const mysql = require("mysql");
const ws = require("ws");
const http = require("http");

// configuração da conexão com o banco
con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

con.connect((err) => {
  if (err) throw err;
  console.log("conectado na base com sucesso");
});

// configuração do app
const app = express();
app.use(express.json());

// configuração websockets
const server = http.createServer(app);
const wss = new ws.WebSocketServer({ server: server });

// imprime uma mensagem no console avisando toda vez
// que um novo cliente conectar
wss.on("connection", function connection() {
  console.log(
    `Novo cliente conectado.\nNúmero de clientes conectados: ${wss.clients.size}`
  );
});

// notifica clientes que houve mudanças e
// e os faz requisitar a página mais recente
const notifica_clientes = () => {
  wss.clients.forEach((client) => {
    client.send("update");
  });
};

// recursos da página
app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./lista_tarefas.html"));
});

app.get("/lista_tarefas.css", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./lista_tarefas.css"));
});

app.get("/lista_tarefas.js", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./lista_tarefas.js"));
});

// create
app.post("/", (req, res) => {
  const { uuid, tarefa } = req.body;

  sql = "INSERT INTO tarefas VALUES (?,?)";
  con.query(sql, [uuid, tarefa], (err, output) => {
    if (err) throw err;
    res.status(200).send("Tarefa registrada");
  });
  notifica_clientes();
});

// read
app.get("/getTarefas", (req, res) => {
  sql = "SELECT * FROM tarefas";
  con.query(sql, (err, output) => {
    if (err) throw err;
    res.status(200).send(output);
  });
});

// update
app.put("/:id", (req, res) => {
  const uuid = req.params.id;
  const { tarefa } = req.body;

  sql = " UPDATE tarefas SET descricao = ? WHERE id = ?";
  con.query(sql, [tarefa, uuid], (err, ouwstput) => {
    if (err) throw err;
    res.status(200).send("Tarefa atualizada");
  });
  notifica_clientes();
});

// delete
app.delete("/", (req, res) => {
  const { uuid } = req.body;

  sql = "DELETE FROM tarefas WHERE id = ?";
  con.query(sql, uuid, (err, output) => {
    if (err) throw err;
    res.status(200).send("Tarefa removida");
  });
  notifica_clientes();
});


// instaciamento do servidor para escutar na porta definida na variável de ambiente
server.listen(process.env.NODE_LOCAL_PORT, () => {
  console.log(`server listening on port ${process.env.NODE_LOCAL_PORT}`);
});

module.exports = server