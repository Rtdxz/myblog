
var sqls = require('./sqlMappings')
var { pool } = require('../db/connection')//引入连接池
var multiparty = require('multiparty');//使用multiparty接收文件
var fs = require('fs');//用于接收文件，读写文件
var uuid = require('node-uuid');//生成唯一id
const imageip = require('../image/imageip')
const marked = require('marked');//将markdown语法转成html
//通用返回方法
var resSend = function (res) {

}

//查询所有文章
var getAllArticles = function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) console.log(err)
    new Promise((resolve, reject) => {
      connection.query(sqls.searchAllArticlesSql, function (err, result) {
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
    connection.release()
  })
}
//归档查询文章
var getArticlesByTimeLine = function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) console.log(err)
    new Promise((resolve, reject) => {
      connection.query(sqls.searchAllArticlesSql, function (err, result) {
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
    connection.release();
  })
}
//分页查询文章
var getArticlesByPage = function (req, res) {
  const pageNum = parseInt(req.query.page);
  const pageSize = req.query.pageSize || 10;
  let start = pageSize * (pageNum - 1);
  let end = start + pageSize;
  pool.getConnection(function (err, connection) {
    if (err) console.log(err)
    new Promise((resolve, reject) => {
      connection.query(sqls.searchArticlesBySlice, [start, end], function (err, result) {
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
            connection.query(sqls.searchArticleTagsSql, ele.id, function (err, re) {
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
    connection.release();
  })
}

//添加文章
var insertArticle = function (req, res) {
  //用上对象池
  let mdcontent = req.body.content;
  /*  let filename = req.body.title;
    // let reqpath = ip + filepath.replace('./public', '');//localhost:3000/public/.md网络地址
   let htmlcontent = marked(mdcontent); *///将markdown转化为html
  let tags = req.body.tags;
  console.log(tags)
  let sum = 0;
  pool.getConnection(function (err, connection) {
    if (err) console.log(err)
    //异步调用mysql使用Promise,需要获得数量将ID传入
    new Promise((resolve, reject) => {



      connection.query(sqls.numSql, function (err, result) {
        if (err) {
          console.log('[SEARCH SUM ERROR] - ', err.message);

          reject(err);
        }
        //正则取出当前数量
        sum = JSON.stringify(result).replace(/[^0-9]/ig, "");
        let id = sum * 1 + 1;//转化为数字number

        id = uuid.v1();
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
      connection.query(sqls.insertArticleSql, insertSqlParams, function (err, result) {
        if (err) {
          console.log('[INSERT ERROR] - ', err.message);
          throw err;
        }

        tags.forEach((tagname) => {
          connection.query(sqls.insertTagRelateSql, [id, tagname], function (err, result) {
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
    connection.release();


  })

}
//查询文章数量
var getArticleCount = function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) console.log(err)
    new Promise((resolve, reject) => {
      connection.query(sqls.numSql, function (err, result) {
        if (err) {
          console.log('[SELECT ERROR]:', err.message);
          reject(err)
        }
        //数据库查询结果返回到result中
        resolve(result)
      })
    }).then((result) => {
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
    connection.release()
  })
}

//查询某一类型中某一种类文章数量
var getArticleCountByType = function (req, res) {
  const type = req.query.type;
  let param, sql;
  console.log(type)
  if (type == 'tag') {
    const tag = req.query.tagname
    param = tag;
    sql = sqls.searchArticleNumByTagSql;
  }
  else if (type == 'category') {
    const category = req.query.category;
    param = category;
    sql = sqls.searchArticleNumByClassifySql;
  }
  else if (type == 'key') {
    const key = req.query.key;
    param = key;
    sql = sqls.searchArticlesNumByKeySql;

  }
  else {
    throw new Error('error type')
  }
  pool.getConnection(function (err, connection) {
    if (err) console.log(err)
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
//获取某一类型中分页截取多个文章
var getArticlesByType = function (req, res) {
  const type = req.query.type;
  let param, sql;
  if (type == 'tag') {
    const tag = req.query.tagname
    param = tag;
    sql = sqls.searchArticlesByTagSql;
  }
  else if (type == 'category') {
    const category = req.query.category;
    param = category;
    sql = sqls.searchArticlesByClassifySql;
  }
  else if (type == 'key') {
    const key = req.query.key;
    param = key;
    sql = sqls.searchArticlesByKeySql;
  }
  else {
    throw new Error('error type')
  }
  pool.getConnection(function (err, connection) {
    if (err) console.log(err)

    new Promise((resolve, reject) => {
      const pageNum = parseInt(req.query.page);
      const pageSize = req.query.pageSize || 10;
      let start = pageSize * (pageNum - 1);
      let end = start + pageSize;
      console.log(start, end)
      connection.query(sql, [param, start, 10], function (err, result) {
        if (err) {

          console.log('[SELECT ERROR]:', err.message);
          reject(err)
        }
        console.log(result)
        resolve(result);
      })
    }).then(result => {
      let list = [];
      return new Promise(resolve => {
        result.forEach(ele => {
          list.push(new Promise(resolve => {
            connection.query(sqls.searchArticleTagsSql, ele.id, function (err, re) {
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
    connection.release()
  })
}
//接收图片
var addImage = function (req, res) {
  // don't forget to delete all req.files when done 
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({ uploadDir: './public/img' });
  //上传完成后处理
  form.parse(req, function (err, fields, files) {
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
}
//根据ID请求一篇文章内容
var getArticleById = function (req, res) {
  const id = req.query.id;
  pool.getConnection(function (err, connection) {
    if (err) console.log(err)
    new Promise((resolve, reject) => {
      connection.query(sqls.searchArticleById, id, function (err, result) {
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
          return res.status(500).send({
            status: 1, // 0 表示处理成功。 1 表示处理失败
            msg: 'GET 请求失败！', // 状态的描述
            data: err, // 需要响应给客户端的数据
          });


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
        msg: 'GET 请求失败！', // 状态的描述
        data: err, // 需要响应给客户端的数据
      });
    });
    connection.release()
  })
}
//根据id删除一篇文章
var deleteArticle = function (req, res) {
  let id = req.query.id;
  pool.getConnection(function (err, connection) {
    if (err) console.log(err)
    new Promise((resolve, reject) => {
      connection.query(sqls.deleteArticleSql, id, function (err, result) {
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
    connection.release()
  })

}
//获得分类列表
var getCategoryListc = function (req, res) {

  pool.getConnection(function (err, connection) {
    if (err) console.log(err)
    new Promise((resolve, reject) => {
      connection.query(sqls.categoryListSql, function (err, result) {
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
    connection.release()
  })
  //数据库查询结果返回到result中
}
//获得所有标签
var getAllTags = function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) console.log(err)
    new Promise((resolve, reject) => {
      connection.query(sqls.searchAllTagsSql, function (err, result) {
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
    connection.release()
  })
}
//添加标签
var addTag = function (req, res) {
  const tagname = req.body.tagname;
  console.log(tagname);
  pool.getConnection(function (err, connection) {
    if (err) console.log(err)
    new Promise((resolve, reject) => {
      connection.query(sqls.insertTagSql, tagname, function (err, result) {
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
  getAllArticles,
  insertArticle,
  getArticlesByPage,
  getArticlesByTimeLine,
  getArticleCount,
  getArticleCountByType,
  getArticlesByType,
  addImage,
  getArticleById,
  deleteArticle,
  getCategoryListc,
  getAllTags,
  addTag
}

