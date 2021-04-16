var express = require('express');
var router = express.Router();
var loginDao = require('../dao/loginDao')

//登录接口
router.post('/login', function (req, res) {
  loginDao.login(req, res)
})


module.exports = router