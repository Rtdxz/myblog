import { request } from './request'
export function getArticlesByPage(params) {
  return request({
    method: "get",
    url: "/api/article/getArticlesByPage",
    params: params
  })
}
export function getArticleCount() {
  return request({
    method: "get",
    url: "/api/article/getArticleCount",
  })
}
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