const pg = require("pg");
const config = require("./config");

const pool = new pg.Pool(config.pool);

module.exports = { pool };
