import { request } from './request'

//分页获得文章列表
export function getArticlesByPage(params) {
  return request({
    method: "get",
    url: "/api/article/getArticlesByPage",
    params: params
  })
}

//获得文章数量
export function getArticleCount() {
  return request({
    method: "get",
    url: "/api/article/getArticleCount",
  })
}
//通过类型获取文章列表
export function getArticlesByType(params) {
  return request({
    method: "get",
    url: "/api/article/getArticlesByType",
    params: params
  })
}

export function getArticleCountByType(params) {
  return request({
    method: "get",
    url: "/api/article/getArticleCountByType",
    params: params
  })

}
export function getArticleById(params) {
  return request({
    url: "/api/article/getArticleById",
    methods: "get",
    params: params
  })
}

export function getAllMessage() {
  return request({
    methods: "get",
    url: "/api/discussion/allmessage",
  })
}

export function addMessage(data) {
  return request({
    method: "post",
    url: "/api/discussion/addMessage",
    data: data,
  })
}

export function getArticlesByTimeLine() {
  return request({
    url: "/api/article/getArticlesByTimeLine",
    methods: "get",
  })
}


export function getAllTags() {
  return request({
    url: "/api/article/getAllTags",
    methods: "get",
  })
}
export function getCategoryList() {
  return request({
    url: "/api/article/getCategoryList",
    methods: "get",
  })
}

export function getAllArticles() {
  return request({
    url: "/api/article/getAllTags",
    methods: "get",
  })
}
export function addTag(data) {
  return request({
    url: "/api/article/addTag",
    method: "post",
    data: data
  })
}

export function addImage(data) {
  return request({
    url: "/api/article/addImage",
    method: "post",
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  })
}

export function addArticle(data) {
  return request({
    method: "post",
    url: "/api/article/add",
    data: data,
  })
}