const express = require("express");
const validadorUsuarioLogado = require("./intermediarios/autenticacao");
const { cadastrarUsuario, login, detalharUsuario, atualizarUsuario } = require("./controladores/usuarios");
const { listarCategorias } = require("./controladores/categorias");
const { cadastrarTransacao, listarTransacoes, exibirExtrato, detalharTransacao, atualizarTransacao, excluirTransacao } = require("./controladores/transacoes");

const rotas = express();

rotas.post("/usuarios", cadastrarUsuario);
rotas.post("/login", login);

rotas.use(validadorUsuarioLogado);

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", atualizarUsuario);
rotas.get("/categoria", listarCategorias);
rotas.post("/transacao", cadastrarTransacao);
rotas.get("/transacao", listarTransacoes);
rotas.get("/transacao/extrato", exibirExtrato);
rotas.get("/transacao/:id", detalharTransacao);
rotas.put("/transacao/:id", atualizarTransacao);
rotas.delete("/transacao/:id", excluirTransacao);

module.exports = rotas;
