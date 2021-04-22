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
var insertMessageSql = 'INSERT INTO discussion(id,name,message,email,date) VALUES(?,?,?,?,?)'
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
//模糊搜索相关文章
var searchArticlesByKeySql = 'SELECT * FROM article  WHERE title LIKE "%"?"%" ORDER BY date DESC LIMIT ?, ?'
//模糊搜索相关文章的数量
var searchArticlesNumByKeySql = 'SELECT count(*) FROM article WHERE title LIKE "%"?"%"'

module.exports = {

  searchAllArticlesSql,

  searchAllArticlesSqlById,

  searchArticleById,

  insertArticleSql,

  deleteArticleSql,

  numSql,

  searchUserSql,

  categoryListSql,

  searchArticlesByClassifySql,

  searchArticleNumByClassifySql,

  searchArticlesBySlice,

  searchArticlesByDate,

  searchMessage,

  insertMessageSql,

  insertTagSql,

  searchAllTagsSql
  ,
  insertTagRelateSql
  ,
  searchArticleTagsSql
  ,
  searchArticlesByTagSql
  ,
  searchArticleNumByTagSql
  ,
  searchArticlesByKeySql
  ,
  searchArticlesNumByKeySql
}