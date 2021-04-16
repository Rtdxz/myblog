const mysql = require("mysql");
var { sqlconnect: dbConfig, poolsqlconnect: poolConfig } = require('./db.config');

function handleError(err) {
  if (err) {
    // 如果是连接断开，自动重新连接
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      con.connect();
    } else {
      console.error(err.stack || err);
    }
  }
}

const pool = mysql.createPool(
  poolConfig)


const con = mysql.createConnection(dbConfig);
con.connect(handleError);
con.on('error', handleError);
let connection = sql => {
  return new Promise((response, reject) => {
    con.query(sql, (err, data) => {
      if (err) {
        return reject(err);
      }
      return response(data);
    });
  });
};
// con.end()
module.exports = { con, pool }

