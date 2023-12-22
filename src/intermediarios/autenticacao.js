const { pool } = require("../conexao");
const config = require("../config");
const jwt = require("jsonwebtoken");

const validadorUsuarioLogado = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }

  try {
    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, config.jwt.senhaJwt);

    const usuarioId = await pool.query(
      "select * from usuarios where id = $1",
      [id]
    );

    req.usuario = usuarioId.rows[0];

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }
};

module.exports = validadorUsuarioLogado;
