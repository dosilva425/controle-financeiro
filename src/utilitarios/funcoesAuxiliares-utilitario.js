const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const senhaCriptografada = async (req, res) => {
    const { senha } = req.body;

    const criptografia = await bcrypt.hash(senha, 10);

    return criptografia;
};

const idUsuarioLogado = (req, res) => {
    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];
    const id = jwt.decode(token).id;

    return id;
};

module.exports = {
    senhaCriptografada,
    idUsuarioLogado
};