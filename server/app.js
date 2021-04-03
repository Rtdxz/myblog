//app.js
var express = require('express'); //require进来我们的Express
var path = require('path');
var app = express(); //实例化
const router = require('./router');

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

//接收formdata
const formidableMiddleware = require('express-formidable');


app.use(formidableMiddleware());




const port = 3000

// 一定要在路由之前，配置 cors 这个中间件，从而解决接口跨域的问题。
const cors = require('cors');
app.use(cors());

//匹配任意路由，都返回下面这句：first test success
app.get('/', function (req, res) {
  res.send('first test success!');
});

//接着配置server
var server = app.listen(port, function () {
  console.log(`绑定到了端口${port}`)
  console.log(`http://localhost:${port}`)
});


app.use('/api', router);//使用路由




