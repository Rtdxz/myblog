
const sqlconnect = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'blog',
}
const poolsqlconnect = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'blog',
  multipleStatements: true,
  insecureAuth: true
}
module.exports = { sqlconnect, poolsqlconnect };