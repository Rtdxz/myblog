
var sqls = require('./sqlMappings')
var { pool } = require('../db/connection')//引入连接池
var vertoken = require('../token/token')//引入token

//登录
var login = function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  pool.getConnection(function (err, connection) {
    if (err) console.log(err)
    new Promise((resolve, reject) => {
      connection.query(sqls.searchUserSql, username, function (err, result) {
        if (err) { reject(err); }
        else {
          resolve(result);
        }
      })
    }).then(result => {
      console.log(result)
      if (result.length == 0) {
        console.log('yes')
        res.send({
          status: 1, // 0 表示处理成功。 1 表示处理失败
          msg: '没有找到该用户', // 状态的描述
          data: '11'
        })
        return false;
      }
      else {
        /* let content = { username: req.body.username }; // 要生成token的主题信息
        let secretOrPrivateKey = "jwt";// 这是加密的key（密钥）
        //设置token
        let token = jwt.sign(content, secretOrPrivateKey, {
          expiresIn: 60 * 60   // 1小时过期
        }); */
        if (password != result[0].password) {
          res.send({
            status: 1,
            msg: '密码错误',
            data: '22'
          })
          return false;
        }
        let username = req.body.username;
        vertoken.setToken(username).then((token) => {
          res.send({
            status: '0',
            msg: '密码正确',
            token: token
          })
          return true;
        })
      }
    })
    connection.release()
  })
}

module.exports = {
  login
}