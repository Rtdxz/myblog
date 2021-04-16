var express = require('express');
var router = express.Router();
var messageDao = require('../dao/messageDao')

//查询所有评论
router.get('/discussion/allmessage', (req, res) => {
  messageDao.getAllmessage(req, res)
})

//添加评论
router.post('/discussion/addMessage', (req, res) => {
  messageDao.addMessage(req, res)
})


module.exports = router

