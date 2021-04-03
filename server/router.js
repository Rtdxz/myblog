const express = require('express')
const router = express.Router();
const ip = 'http://localhost:3000';
const marked = require('marked');//将markdown语法转成html
//使用multiparty接收文件
var multiparty = require('multiparty');

var fs = require('fs');//用于接收文件，读写文件

var mysql = require('mysql');//mysql
//连接mysql
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'blog'
});
connection.connect();

//SQL语句
var searchAllArticleSql = 'SELECT * FROM article';
var searchArticleById = 'SELECT * FROM article WHERE id=?'
var insertSql = 'INSERT INTO article(id,title,content,classify,describes) VALUES(?,?,?,?,?)';
var numSql = 'SELECT count(*) FROM article';




// 搜索所有文章
router.get('/article/all', (req, res) => {




  connection.query(searchAllArticleSql, function (err, result) {
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

  let filename = req.body.title;
  let mdcontent = req.body.content;
  let htmlcontent = marked(mdcontent);//将markdown转化为html

  console.log(filename)
  let filepath = './public/md/' + filename + '.md';

  fs.writeFile(filepath, mdcontent, function (err) {
    if (!err) {
      console.log('写入成功~~~');
    }
    else {
      console.log('写入失败');
    }
  })


  let reqpath = ip + filepath.replace('./public', '');//localhost:3000/public/.md网络地址

  let sum = 0;

  //异步调用mysql使用Promise,需要获得数量将ID传入
  let queryId = new Promise((resolve, reject) => {
    connection.query(numSql, function (err, result) {
      if (err) {
        console.log('[SEARCH SUM ERROR] - ', err.message);

        reject(err);
      }
      //正则取出当前数量
      sum = JSON.stringify(result).replace(/[^0-9]/ig, "");
      let id = sum * 1 + 1;//转化为数字number
      console.log(id)
      resolve(id);

    });

  }).then((id) => {

    let insertSqlParams = [id, req.body['title'], filepath, req.body['classify'], req.body['describe']]//传入insert的值
    connection.query(insertSql, insertSqlParams, function (err, result) {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message);

        throw err;
      }


      // 调用 res.send() 方法，向客户端响应结果
      res.send({
        status: 0,
        msg: 'POST 请求成功！',
        data: result,
      });
    });

  }).catch((err) => {
    console.log(err)
  })



});

//接收图片接口
router.post('/article/add/images', function (req, res) {
  // don't forget to delete all req.files when done 
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({ uploadDir: './public/img' });

  //上传完成后处理
  form.parse(req, function (err, fields, files) {
    var obj = {};

    var filesTmp = JSON.stringify(files, null, 2);

    console.log(filesTmp);
    if (err) {
      console.log('parse error: ' + err);
    }
    else {

      console.log('parse files: ' + filesTmp);
      var image = files.image[0];//获取图片对象
      var uploadedPath = image.path;//获取图片路径
      var dstPath = './public/img/' + image.originalFilename;//获取原始名字

      //重命名为真实文件名
      fs.rename(uploadedPath, dstPath, function (err) {
        if (err) {
          console.log('rename error: ' + err);
          res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
          res.end("{'status':200, 'message': '上传失败！'}");
        } else {
          console.log('rename ok');
          res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });

          res.end(ip + dstPath.replace('./public', ''));
          //res.end("{'status':400, 'message': '上传成功！'}");
        }
      });
    }
  });
});
// connection.end();



router.get('/article/getArticleById', function (req, res) {
  const query = req.query;
  let id = query.id;
  console.log(query.id)
  connection.query(searchArticleById, [query.id], function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]:', err.message);
    }
    //数据库查询结果返回到result中

    let article = result[0];//由于只有一条结果，所以第0位即要查询的article

    fs.readFile(article.content, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data.toString());
        console.log(data.length + ' bytes');

        let html = marked(data.toString());
        article.content = html;
        res.send({
          status: 0, // 0 表示处理成功。 1 表示处理失败
          msg: 'GET 请求成功！', // 状态的描述
          data: article, // 需要响应给客户端的数据
        });
      }
    });

    // 通过 req.query 获取客户端通过查询字符串，发送到服务器的数据

    // 调用 res.send() 方法，向客户端响应处理的结果

  });
})



/* router.post('/article/add/images', (req, res) => {
  // console.log(req.body);
  console.log(req.files['1']);
  // console.log(req.fields);

  console.log(JSON.stringify(req.body));
  let insertSqlParams = [req.body['title'], req.body['content']]



  // 调用 res.send() 方法，向客户端响应结果
  res.send({
    status: 0,
    msg: 'POST 请求成功！',
    data: req.files['1'],
  });


}); */

module.exports = router;
