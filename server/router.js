const express = require('express')
const router = express.Router();
const ip = 'http://localhost:3000';
const marked = require('marked');//将markdown语法转成html
const jwt = require('jsonwebtoken')//设置token
//使用multiparty接收文件
var multiparty = require('multiparty');

var fs = require('fs');//用于接收文件，读写文件

var mysql = require('mysql');//mysql

var uuid = require('node-uuid');//生成唯一id


//连接mysql
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'blog',

});
connection.connect();

//SQL语句
//查找所有文章
var searchAllArticlesSql = 'SELECT * FROM article ORDER BY date DESC';
//根据id查找文章
var searchArticleById = 'SELECT * FROM article WHERE id=?'
//插入文章
var insertArticleSql = 'INSERT INTO article(id,title,content,classify,describes,date) VALUES(?,?,?,?,?,?)';
//获取文章数量
var numSql = 'SELECT count(*) FROM article';
//查看用户密码
var searchUserSql = 'SELECT password FROM users WHERE username=?'
//获取所有分类类型数组
var categoryListSql = 'SELECT classify FROM article  GROUP BY classify'
//根据分类类型获取文章列表
var searchArticlesByClassifySql = 'SELECT * FROM article  WHERE classify=? ORDER BY date DESC LIMIT ?, ?'
//查询分类中文章数量
var searchArticleNumByClassifySql = 'SELECT count(*) FROM article  WHERE classify=?'
//截取分页查询
var searchArticlesBySlice = 'SELECT * FROM article ORDER BY date DESC LIMIT ?, ?'
//根据时间分类查询
var searchArticlesByDate = 'SELECT date FROM article GROUP BY date)'
//查询评论
var searchMessage = 'SELECT * FROM discussion ORDER BY date DESC'
//添加评论
var insertMessageSql = 'INSERT INTO discussion(id,name,message,date) VALUES(?,?,?,?)'

//查询归档
router.get('/article/getArticlesByTimeLine', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query(searchAllArticlesSql, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR]:', err.message);
        reject(err)
      }
      //数据库查询结果返回到result中
      resolve(result)
    })
  }).then((result) => {
    let total = [];
    let set = new Set();
    var newYear;
    result.forEach((ele, index) => {
      //ele.date = ele.date.toLocaleString();//将所有时间装化为标准时间
      ele.year = ele.date.toLocaleString().slice(0, 4);//标准时间的年月日，没有具体时间
      if (!set.has(ele.year)) {
        if (newYear) {            //有新的年份再把原先的年份push进total里
          total.push(newYear);
        }
        set.add(ele.year);      //设置新的年份
        newYear = { title: ele.year, articleList: [] }//设置新的年份信息
      }
      newYear.articleList.push(JSON.parse(JSON.stringify({ title: ele.title, id: ele.id, date: ele.date.toLocaleString().slice(5, 9) })));//深拷贝一个对象
    })
    total.push(newYear)
    // console.log(result);
    console.log(total);
    // 调用 res.send() 方法，向客户端响应处理的结果
    res.send({
      status: 0, // 0 表示处理成功。 1 表示处理失败
      msg: 'GET 请求成功！', // 状态的描述
      data: total, // 需要响应给客户端的数据
    });
  }).catch(err => {
    console.log(err)
    res.status(500).send({
      status: 1, // 0 表示处理成功。 1 表示处理失败
      msg: 'GET 请求失败！', // 状态的描述
      data: err, // 需要响应给客户端的数据
    });
  })
})

//查询评论
router.get('/discussion/allmessage', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query(searchMessage, function (err, result) {
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
      ele.date = ele.date.toLocaleString()
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
})



//添加评论
router.post('/discussion/addMessage', (req, res) => {
  const name = req.body.name;
  const id = uuid.v1();//根据时间戳生成随机id、
  const message = req.body.message;
  const date = req.body.date
  console.log(name, message, date)
  new Promise((resolve, reject) => {
    connection.query(insertMessageSql, [id, name, message, date], function (err, result) {
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
})


//查询分类中文章数量
router.get('/article/getArticleCountByCategory', (req, res) => {
  const category = req.query.category;
  new Promise((resolve, reject) => {
    connection.query(searchArticleNumByClassifySql, category, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR]:', err.message);
        reject(err)
      }
      //数据库查询结果返回到result中
      resolve(result)
    })
  }).then((result) => {
    // 调用 res.send() 方法，向客户端响应处理的结果
    console.log(result)
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
})

//查询全部文章数量
router.get('/article/getArticleCount', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query(numSql, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR]:', err.message);
        reject(err)
      }
      //数据库查询结果返回到result中
      resolve(result)
    })
  }).then((result) => {
    // 调用 res.send() 方法，向客户端响应处理的结果
    console.log(result)
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
})
// 截取分页查询
router.get('/article/getArticlesByPage', (req, res) => {
  const pageNum = parseInt(req.query.page);
  const pageSize = 10;
  let start = pageSize * (pageNum - 1);
  let end = start + pageSize;
  new Promise((resolve, reject) => {
    connection.query(searchArticlesBySlice, [start, end], function (err, result) {
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
      ele.date = ele.date.toLocaleString().slice(0, 9);//标准时间的年月日，没有具体时间
    })
    // 调用 res.send() 方法，向客户端响应处理的结果
    console.log(result)
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

});


// 搜索所有文章
router.get('/article/all', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query(searchAllArticlesSql, function (err, result) {
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
      ele.date = ele.date.toLocaleString().slice(0, 9);//标准时间的年月日，没有具体时间
    })

    // 通过 req.query 获取客户端通过查询字符串，发送到服务器的数据
    const query = req.query;
    console.log(query)
    // 调用 res.send() 方法，向客户端响应处理的结果
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

});

//根据分类类型获取文章列表接口
router.get('/article/getArticleByCategory', (req, res) => {







  let category = req.query.category;
  console.log(category);
  new Promise((resolve, reject) => {
    const pageNum = parseInt(req.query.page);
    const pageSize = 10;
    let start = pageSize * (pageNum - 1);
    let end = start + pageSize;
    connection.query(searchArticlesByClassifySql, [category, start, end], function (err, result) {
      if (err) {
        console.log('[SELECT ERROR]:', err.message);
        reject(err)
      }
      resolve(result);
    })
  }).then(result => {
    result.forEach((ele, index) => {
      //ele.date = ele.date.toLocaleString();//将所有时间装化为标准时间
      ele.date = ele.date.toLocaleString().slice(0, 9);//标准时间的年月日，没有具体时间
    })
    res.status(200).send({
      status: 0, // 0 表示处理成功。 1 表示处理失败
      msg: 'GET 请求成功！', // 状态的描述
      data: result, // 需要响应给客户端的数据
    })
  }).catch(err => {
    res.status(500).send({
      status: 1, // 0 表示处理成功。 1 表示处理失败
      msg: 'GET 请求失败！', // 状态的描述
      data: err, // 需要响应给客户端的数据
    })

  })
})


// 用于添加文章
router.post('/article/add', (req, res) => {

  let filename = req.body.title;
  let mdcontent = req.body.content;
  let htmlcontent = marked(mdcontent);//将markdown转化为html


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

    let insertSqlParams = [id, req.body['title'], filepath, req.body['classify'], req.body['describe'], req.body['date']]//传入insert的值
    connection.query(insertArticleSql, insertSqlParams, function (err, result) {
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


//查找指定id文章接口
router.get('/article/getArticleById', function (req, res) {
  const query = req.query;
  let id = query.id;
  console.log(query.id)
  new Promise((resolve, reject) => {
    connection.query(searchArticleById, [query.id], function (err, result) {
      if (err) {
        console.log('[SELECT ERROR]:', err.message);
        reject('[SELECT ERROR]:', err.message);
      }
      resolve(result)

    })
    //数据库查询结果返回到result中
  }).then((result) => {
    let article = result[0];//由于只有一条结果，所以第0位即要查询的article
    article.date = article.date.toLocaleString().slice(0, 9);//标准时间的年月日，没有具体时间
    fs.readFile(article.content, function (err, data) {
      if (err) {
        console.log(err);
        reject(err);
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

  }).catch(err => {
    res.status(500).send({
      status: 0, // 0 表示处理成功。 1 表示处理失败
      msg: 'GET 请求成功！', // 状态的描述
      data: err, // 需要响应给客户端的数据
    });
  });

  // 通过 req.query 获取客户端通过查询字符串，发送到服务器的数据

  // 调用 res.send() 方法，向客户端响应处理的结果


})


router.get('/article/getCategoryList', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query(categoryListSql, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR]:', err.message);
        reject('[SELECT ERROR]:', err.message);
      }
      resolve(result);
    })
  }).then((result) => {
    /* result.forEach((ele, index) => {
      //ele.date = ele.date.toLocaleString();//将所有时间装化为标准时间
      ele.date = ele.date.toLocaleString().slice(0, 10);//标准时间的年月日，没有具体时间
    }) */
    // 通过 req.query 获取客户端通过查询字符串，发送到服务器的数据
    const query = req.query;
    console.log(query);
    // 调用 res.send() 方法，向客户端响应处理的结果
    res.send({
      status: 0, // 0 表示处理成功。 1 表示处理失败
      msg: 'GET 请求成功！', // 状态的描述
      data: result, // 需要响应给客户端的数据
    });
  }).catch(err => {
    console.log(err)
    res.status(500).send({
      status: 1, // 0 表示处理成功。 1 表示处理失败
      msg: 'GET 请求失败！', // 状态的描述
      data: err, // 需要响应给客户端的数据

    });
  })
  //数据库查询结果返回到result中
});












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


//登录接口
router.post('/login', function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  // console.log(username, password)
  new Promise((resolve, reject) => {
    connection.query(searchUserSql, username, function (err, result) {
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
      let content = { username: req.body.username }; // 要生成token的主题信息
      let secretOrPrivateKey = "jwt";// 这是加密的key（密钥）
      //设置token
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60   // 1小时过期
      });
      if (password != result[0].password) {
        res.send({
          status: 1,
          msg: '密码错误',
          data: '22'
        })
        return false;
      }
      res.send({
        status: '0',
        msg: '密码正确',
        token: token
      })
      return true;
    }

  })
})

module.exports = router;
