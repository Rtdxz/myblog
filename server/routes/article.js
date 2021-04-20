var express = require('express');
var router = express.Router();
var articleDao = require('../dao/articleDao')


//添加文章
router.post('/article/add', (req, res) => {
  articleDao.insertArticle(req, res);
});
//查询所有文章
router.get('/article/getAllArticles', (req, res) => {
  articleDao.getAllArticles(req, res);
});
//分页查询
router.get('/article/getArticlesByPage', (req, res) => {
  articleDao.getArticlesByPage(req, res);
});
//归档
router.get('/article/getArticlesByTimeLine', (req, res) => {
  articleDao.getArticlesByTimeLine(req, res);
})
//查询全部文章数量
router.get('/article/getArticleCount', (req, res) => {
  articleDao.getArticleCount(req, res)
})

//查询某一类型中某一种类文章数量
router.get('/article/getArticleCountByType', (req, res) => {
  articleDao.getArticleCountByType(req, res)
})
//获取某一类型中分页截取多个文章
router.get('/article/getArticlesByType', (req, res) => {
  articleDao.getArticlesByType(req, res)
})
//接收图片接口
router.post('/article/addImage', function (req, res) {
  articleDao.addImage(req, res)
});
//查找指定id文章接口
router.get('/article/getArticleById', function (req, res) {
  articleDao.getArticleById(req, res)
})
//根据id删除某篇文章
router.get('/article/articleDeleteById', (req, res) => {
  articleDao.deleteArticle(req, res)
})
//获得所有分类列表名
router.get('/article/getCategoryList', (req, res) => {
  articleDao.getCategoryListc(req, res)
});
//查找所有标签
router.get('/article/getAllTags', (req, res) => {
  articleDao.getAllTags(req, res)
})
//添加标签
router.post('/article/addTag', (req, res) => {
  articleDao.addTag(req, res)
})

module.exports = router