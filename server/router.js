const express = require('express')
const router = express.Router();

var fs = require('fs');//用于接收文件，读写文件

var mysql = require('mysql');//mysql
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'blog'
});
connection.connect();
var searchSql = 'SELECT * FROM article';
var insertSql = 'INSERT INTO article(title,content) VALUES(?,?)';

//增






// 这里挂载对应的路由
router.get('/article/all', (req, res) => {


  connection.query(searchSql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]:', err.message);
    }
    console.log(result);  //数据库查询结果返回到result中




    // 通过 req.query 获取客户端通过查询字符串，发送到服务器的数据
    const query = req.query;
    console.log(query)
    // 调用 res.send() 方法，向客户端响应处理的结果
    res.send({
      status: 0, // 0 表示处理成功。 1 表示处理失败
      msg: 'GET 请求成功！', // 状态的描述
      data: result, // 需要响应给客户端的数据
    });
  });
});

// 定义 post 接口,用于添加文章
router.post('/article/add', (req, res) => {
  console.log(req);

  console.log(JSON.stringify(req.body));
  let insertSqlParams = [req.body['title'], req.body['content']]
  connection.query(insertSql, insertSqlParams, function (err, result) {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);

      return;
    }


    // 调用 res.send() 方法，向客户端响应结果
    res.send({
      status: 0,
      msg: 'POST 请求成功！',
      data: result,
    });
  });

});

router.post('/article/add/images', (req, res) => {
  console.log(req.body);
  console.log(req.files);
  console.log(req.fields);

  console.log(JSON.stringify(req.body));
  let insertSqlParams = [req.body['title'], req.body['content']]



  // 调用 res.send() 方法，向客户端响应结果
  res.send({
    status: 0,
    msg: 'POST 请求成功！',
    data: req.body,
  });


});
// connection.end();

module.exports = router;
