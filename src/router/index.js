import Vue from 'vue'
import VueRouter from 'vue-router'

//使用vuerouter里的install
Vue.use(VueRouter);



import Home from '@/views/home/Home'

import Markdown from '@/admin/markdowneditor/MarkdownEditor'
import AdminIndex from '@/admin/adminindex/AdminIndex'
import ArticleManage from '@/admin/articlemanage/ArticleManage'


const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/markdown',
    component: Markdown,
  },
  {
    path: '/admin',
    component: AdminIndex,
    children: [
      {
        path: 'articlewrite',
        component: Markdown
      },
      {
        path: 'articleManage',
        component: ArticleManage
      }
    ]
  }


]
const router = new VueRouter({
  mode: 'history',
  routes,


})

export default router