
var sqls = require('./sqlMappings')
var { pool } = require('../db/connection')//引入连接池
var multiparty = require('multiparty');//使用multiparty接收文件
var fs = require('fs');//用于接收文件，读写文件
var uuid = require('node-uuid');//生成唯一id


//查询所有评论
var getAllmessage = function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) console.log(err)
    new Promise((resolve, reject) => {
      connection.query(sqls.searchMessage, function (err, result) {
        if (err) {
          console.log('[SELECT ERROR]:', err.message);
          reject(err)
        }
        //数据库查询结果返回到result中
        resolve(result)
      })
    }).then((result) => {
      result.forEach((ele, index) => {
        //ele.date = ele.date.toLocaleString();//将所有时间装化为标准时间
        ele.date = ele.date.toLocaleString('zh')
      })
      res.send({
        status: 0, // 0 表示处理成功。 1 表示处理失败
        msg: 'GET 请求成功！', // 状态的描述
        data: result, // 需要响应给客户端的数据

      });
    }).catch(err => {
      res.status(500).send({
        status: 1, // 0 表示处理成功。 1 表示处理失败
        msg: 'GET 请求失败！', // 状态的描述
        data: err, // 需要响应给客户端的数据

      });
    })
    connection.release()
  })
}

//插入评论
var addMessage = function (req, res) {
  const name = req.body.name;
  const id = uuid.v1();//根据时间戳生成随机id、
  const message = req.body.message;
  const date = req.body.date
  console.log(name, message, date)

  pool.getConnection(function (err, connection) {
    if (err) console.log(err)
    new Promise((resolve, reject) => {
      connection.query(sqls.insertMessageSql, [id, name, message, date], function (err, result) {
        if (err) {
          console.log('[INSERT ERROR]:', err.message);
          reject(err)
        }
        //数据库查询结果返回到result中
        resolve(result)
      })
    }).then((result) => {
      // 调用 res.send() 方法，向客户端响应处理的结果
      res.send({
        status: 0, // 0 表示处理成功。 1 表示处理失败
        msg: 'POST 请求成功！', // 状态的描述
        data: result, // 需要响应给客户端的数据

      });
    }).catch(err => {
      res.status(500).send({
        status: 1, // 0 表示处理成功。 1 表示处理失败
        msg: 'GET 请求失败！', // 状态的描述
        data: err, // 需要响应给客户端的数据
      });
    })
    connection.release()
  })
}

module.exports = {
  getAllmessage,
  addMessage
}
