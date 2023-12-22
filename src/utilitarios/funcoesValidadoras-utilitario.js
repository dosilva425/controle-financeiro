const { pool } = require("../conexao");
const { idUsuarioLogado } = require("../utilitarios/funcoesAuxiliares-utilitario");

const validadorCamposPreenchidosRegistroUsuario = (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha || nome.trim() === "" || email.trim() === "" || senha.trim() === "") {
        return false;
    }

    return true;
};

const validadorCamposPreenchidosRegistroTransacao = (req, res) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body;

    if (!tipo || !descricao || !valor || !data || !categoria_id ||
        tipo.trim() === "" || descricao.trim() === "" || data.trim() === "") {
        return false;
    }

    return true;
};

const validadorCategoria = async (req, res) => {
    const { categoria_id } = req.body;

    const verificarCategoria = await pool.query(
        "select * from categorias where id = $1",
        [categoria_id]
    );
    if (verificarCategoria.rowCount < 1) {
        return false;
    }

    return true;
};

const validadorTipo = (req, res) => {
    const { tipo } = req.body;

    if (tipo !== "entrada" && tipo !== "saida") {
        return false;
    }

    return true;
};

const validadorTransacaoDoUsuarioLogado = async (req, res) => {
    const { id } = req.params;

    const transacao = await pool.query(
        "select * from transacoes where usuario_id = $1 and id = $2",
        [idUsuarioLogado(req, res), id]
    );
    if (transacao.rowCount < 1) {
        return false;
    }

    return true;
};

module.exports = {
    validadorCamposPreenchidosRegistroUsuario,
    validadorCamposPreenchidosRegistroTransacao,
    validadorCategoria,
    validadorTipo,
    validadorTransacaoDoUsuarioLogado
};