//app.js

const port = 3000//端口
var express = require('express'); //require进来我们的Express
var path = require('path');
var app = express(); //实例化
const router = require('./router');

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


var vertoken = require('./token/token')//引入token
var expressJwt = require('express-jwt')



//验证token

// 一定要在路由之前，配置 cors 这个中间件，从而解决接口跨域的问题。
const cors = require('cors');
app.use(cors());




//解析token获取用户信息
router.use(function (req, res, next) {
  var token = req.headers['authorization'];
  if (token == undefined) {
    console.log(token)
    return next();
  } else {
    console.log('这个token被允许了')
    vertoken.getToken(token).then((data) => {
      req.data = data;
      return next();
    }).catch((error) => {
      return next();
    })
  }
});

//验证token是否过期并规定那些路由不需要验证
router.use(expressJwt({
  secret: 'jwt',
  algorithms: ['HS256']
}).unless({
  path: ['/login', '/register']  //不需要验证的接口名称
}))

//token失效返回信息
router.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    // 这个需要根据⾃自⼰己的业务逻辑来处理理
    res.status(401).send({ code: -1, msg: 'token验证失败' });
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});











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




