const express = require('express')
const router = express.Router();
const imageip = require('./image/imageip')
const marked = require('marked');//将markdown语法转成html
// const jwt = require('jsonwebtoken')//设置token
var vertoken = require('./token/token')//引入token

//使用multiparty接收文件
var multiparty = require('multiparty');

var fs = require('fs');//用于接收文件，读写文件

var uuid = require('node-uuid');//生成唯一id



//连接mysql
const connection = require('./db/connection').con
/* var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'blog',

});
connection.connect();
 */



//SQL语句
//时间顺序查找所有文章
var searchAllArticlesSql = 'SELECT * FROM article ORDER BY date DESC'
//id顺序查找所有文章
var searchAllArticlesSqlById = 'SELECT * FROM article ORDER BY id'
//根据id查找文章
var searchArticleById = 'SELECT * FROM article WHERE id=?'
//插入文章
var insertArticleSql = 'INSERT INTO article(id,title,content,classify,describes,date) VALUES(?,?,?,?,?,?)'
//删除文章
var deleteArticleSql = 'DELETE FROM article WHERE id=?'
//获取文章数量
var numSql = 'SELECT count(*) FROM article'
//查看用户密码
var searchUserSql = 'SELECT password FROM users WHERE username=?'
//获取所有分类类型数组
var categoryListSql = 'SELECT count(*) as sum,classify FROM article  GROUP BY classify'
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
//添加标签
var insertTagSql = 'INSERT INTO tag(tagname) VALUES(?)'
//查找所有标签
var searchAllTagsSql = 'SELECT tagname FROM tag '
//插入文章关联标签表
var insertTagRelateSql = 'INSERT INTO tagrelate(articleid,tagname) VALUES(?,?)'
//根据ID查询问文章的标签
var searchArticleTagsSql = 'SELECT tagname FROM tagrelate WHERE articleid=? '
//根据标签查找分页文章
var searchArticlesByTagSql = 'SELECT * FROM article WHERE id in(SELECT articleid from tagrelate WHERE tagname=?) ORDER BY date DESC LIMIT ?, ?'
//查询标签对应数量文章
var searchArticleNumByTagSql = 'SELECT count(*) FROM tagrelate  WHERE tagname=? GROUP BY tagname'


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
      ele.year = ele.date.toLocaleString('zh').slice(0, 4);//标准时间的年月日，没有具体时间
      console.log(ele.year)
      if (!set.has(ele.year)) {
        if (newYear) {            //有新的年份再把原先的年份push进total里
          total.push(newYear);
        }
        set.add(ele.year);      //设置新的年份
        newYear = { title: ele.year, articleList: [] }//设置新的年份信息
      }
      newYear.articleList.push(JSON.parse(JSON.stringify({ title: ele.title, id: ele.id, date: ele.date.toLocaleString('zh').slice(5, 9) })));//深拷贝一个对象
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

//后台查询全部文章
router.get('/article/getAllArticles', (req, res) => {
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
      ele.date = ele.date.toLocaleString();//标准时间的年月日，没有具体时间
    })
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


//查询某一类型中某一种类文章数量
router.get('/article/getArticleCountByType', (req, res) => {
  const type = req.query.type;
  let param, sql;
  if (type == 'tag') {
    const tag = req.query.tagname
    param = tag;
    sql = searchArticleNumByTagSql;
  }
  else if (type == 'category') {
    const category = req.query.category;
    param = category;
    sql = searchArticleNumByClassifySql;
  }
  else {
    throw new Error('error type')
  }

  new Promise((resolve, reject) => {
    connection.query(sql, param, function (err, result) {
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
    //解决方案，在then中需要继续多次异步后返回值，先用一个list存储每一个异步操作的Promise,再在后面promise.all中进行回调返回
    let list = [];
    return new Promise(resolve => {
      result.forEach(ele => {
        list.push(new Promise(resolve => {
          connection.query(searchArticleTagsSql, ele.id, function (err, re) {
            if (err) {
              console.log('[SELECT ERROR]:', err.message);
              reject(err)
            }
            ele.date = ele.date.toLocaleString().slice(0, 9);//标准时间的年月日，没有具体时间
            ele.tags = [];//每个元素的tag数组，由于每次查找返回的是对象，要转化成需要获得的字符串再push
            re.forEach(tag => {
              ele.tags.push(tag.tagname)
            });
            resolve();
          })
        }))
      })
      Promise.all(list).then(() => {
        //all用于解决多个异步操作完成时进行回调
        resolve(result)//这里的resolve时外层调用，一旦resolve就会将结果传给下层的then
      })
    })
  }).then(result => {
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

//获取某一类型中分页截取多个文章
router.get('/article/getArticlesByType', (req, res) => {
  const type = req.query.type;
  let param, sql;
  if (type == 'tag') {
    const tag = req.query.tagname
    param = tag;
    sql = searchArticlesBytagSql;
  }
  else if (type == 'category') {
    const category = req.query.category;
    param = category;
    sql = searchArticlesByClassifySql;
  }
  else {
    throw new Error('error type')
  }
  console.log(category);
  new Promise((resolve, reject) => {
    const pageNum = parseInt(req.query.page);
    const pageSize = req.query.pageSize || 10;
    let start = pageSize * (pageNum - 1);
    let end = start + pageSize;
    connection.query(sql, [param, start, end], function (err, result) {
      if (err) {
        console.log('[SELECT ERROR]:', err.message);
        reject(err)
      }
      resolve(result);
    })
  }).then(result => {

    let list = [];
    return new Promise(resolve => {
      result.forEach(ele => {
        list.push(new Promise(resolve => {
          connection.query(searchArticleTagsSql, ele.id, function (err, re) {
            if (err) {
              console.log('[SELECT ERROR]:', err.message);
              reject(err)
            }
            ele.date = ele.date.toLocaleString('zh').slice(0, 9);//标准时间的年月日，没有具体时间
            ele.tags = [];//每个元素的tag数组，由于每次查找返回的是对象，要转化成需要获得的字符串再push
            re.forEach(tag => {
              ele.tags.push(tag.tagname)
            });
            resolve();
          })
        }))
      })
      Promise.all(list).then(() => {
        //all用于解决多个异步操作完成时进行回调
        resolve(result)//这里的resolve时外层调用，一旦resolve就会将结果传给下层的then
      })
    })
  }).then(result => {
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

//根据标签分页查找文章
router.get('/article/getArticleByTag', (req, res) => {
  let tagname = req.query.tagname;

  new Promise((resolve, reject) => {
    const pageNum = parseInt(req.query.page);
    const pageSize = 10;
    let start = pageSize * (pageNum - 1);
    let end = start + pageSize;
    connection.query(searchArticlesByTagSql, [tagname, start, end], function (err, result) {
      if (err) {
        console.log('[SELECT ERROR]:', err.message);
        reject(err)
      }
      resolve(result);
    })
  }).then(result => {
    let list = [];
    return new Promise(resolve => {
      result.forEach(ele => {
        list.push(new Promise(resolve => {
          connection.query(searchArticleTagsSql, ele.id, function (err, re) {
            if (err) {
              console.log('[SELECT ERROR]:', err.message);
              reject(err)
            }
            ele.date = ele.date.toLocaleString().slice(0, 9);//标准时间的年月日，没有具体时间
            ele.tags = [];//每个元素的tag数组，由于每次查找返回的是对象，要转化成需要获得的字符串再push
            re.forEach(tag => {
              ele.tags.push(tag.tagname)
            });
            resolve();
          })
        }))
      })
      Promise.all(list).then(() => {
        //all用于解决多个异步操作完成时进行回调
        resolve(result)//这里的resolve时外层调用，一旦resolve就会将结果传给下层的then
      })
    })
  }).then(result => {
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

//查询标签中文章数量
router.get('/article/getArticleCountByTag', (req, res) => {
  const tagname = req.query.tagname;
  new Promise((resolve, reject) => {
    connection.query(searchArticleNumByTagSql, tagname, function (err, result) {
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

// 用于添加文章
router.post('/article/add', (req, res) => {
  let mdcontent = req.body.content;
  /*  let filename = req.body.title;
    // let reqpath = ip + filepath.replace('./public', '');//localhost:3000/public/.md网络地址
   let htmlcontent = marked(mdcontent); *///将markdown转化为html
  let tags = req.body.tags;
  console.log(tags)
  let sum = 0;
  let id = uuid.v1().slice(-12, -1);
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


      resolve(id);
    });

  }).then((id) => {
    let filepath = './public/md/' + id + '.md';
    console.log(filepath)
    fs.writeFile(filepath, mdcontent, function (err) {
      if (!err) {
        console.log('写入成功~~~');

      }
      else {
        console.log('写入失败');
        Promise.reject(err)
      }
    })
    return [id, filepath];

  }).then(([id, filepath]) => {
    console.log(id, filepath);
    let insertSqlParams = [id, req.body['title'], filepath, req.body['classify'], req.body['describe'], req.body['date']]//传入insert的值
    connection.query(insertArticleSql, insertSqlParams, function (err, result) {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        throw err;
      }

      tags.forEach((tagname) => {
        connection.query(insertTagRelateSql, [id, tagname], function (err, result) {
          if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            throw err;
          }
          // 调用 res.send() 方法，向客户端响应结果

        });
      })


      res.status(200).send({
        status: 0,
        msg: 'POST 请求成功！',
        data: result,
      });
    });
  }).catch((err) => {
    console.log(err)
    res.status(500).send({
      status: 1,
      msg: 'POST 请求失败！',
      data: err,
    });
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

          res.end(imageip + dstPath.replace('./public', ''));
          //res.end("{'status':400, 'message': '上传成功！'}");
        }
      });
    }
  });
});



//查找指定id文章接口
router.get('/article/getArticleById', function (req, res) {
  const query = req.query;

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
        Promise.reject(err);
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
      status: 1, // 0 表示处理成功。 1 表示处理失败
      msg: 'GET 请求成功！', // 状态的描述
      data: err, // 需要响应给客户端的数据
    });
  });

  // 通过 req.query 获取客户端通过查询字符串，发送到服务器的数据

  // 调用 res.send() 方法，向客户端响应处理的结果


})
//根据id删除文章
router.get('/article/articleDeleteById', (req, res) => {
  let id = req.query.id;
  console.log(id)
  new Promise((resolve, reject) => {
    connection.query(deleteArticleSql, id, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR]:', err.message);
        reject('[SELECT ERROR]:', err.message);
      }
      resolve(result);
    })
  }).then((result) => {
    res.send({
      status: 0, // 0 表示处理成功。 1 表示处理失败
      msg: 'GET 请求成功！', // 状态的描述
      data: result, // 需要响应给客户端的数据
    });
  }).catch((err) => {
    res.status(500).send({
      status: 1, // 0 表示处理成功。 1 表示处理失败
      msg: 'GET 请求失败！', // 状态的描述
      data: err, // 需要响应给客户端的数据

    })
  })
})
//获得所有分类列表名
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






//查找所有标签
router.get('/article/getAllTags', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query(searchAllTagsSql, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR]:', err.message);
        reject(err)
      }
      //数据库查询结果返回到result中
      resolve(result)
    })
  }).then((result) => {
    let response = [];
    result.forEach(ele => {
      response.push(ele.tagname);
    })
    console.log(response)
    // 调用 res.send() 方法，向客户端响应处理的结果
    res.send({
      status: 0, // 0 表示处理成功。 1 表示处理失败
      msg: 'GET 请求成功！', // 状态的描述
      data: response, // 需要响应给客户端的数据
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

//添加标签
router.post('/article/addTag', (req, res) => {
  const tagname = req.body.tagname;

  console.log(tagname)
  new Promise((resolve, reject) => {
    connection.query(insertTagSql, tagname, function (err, result) {
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
})

module.exports = router;
