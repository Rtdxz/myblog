import Vue from 'vue'
import VueRouter from 'vue-router'

//使用vuerouter里的install
Vue.use(VueRouter);



import Home from '@/views/home/Home'
import Message from '@/views/message/Message'
import About from '@/views/about/About'
import Archive from '@/views/archive/Archive'
import Category from '@/views/category/Category'
import Tag from '@/views/tag/Tag'

import Admin from '@/admin/adminindex/Admin'
import Markdown from '@/admin/markdowneditor/MarkdownEditor'
import AdminIndex from '@/admin/adminindex/AdminIndex'
import ArticleManage from '@/admin/articlemanage/ArticleManage'

import ArticleDetail from '@/views/article/ArticleDetail'

import Login from '@/views/login/Login'

import ErrorPage from '@/views/404'

const routes = [
  {
    path: '*',
    component: ErrorPage
  },
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/message',
    component: Message,
  },
  {
    path: '/archive',
    component: Archive
  },
  {
    path: '/about',
    component: About
  },

  {
    path: '/admin',
    component: Admin,
    children: [{
      path: '',
      component: AdminIndex
    },
    {
      path: 'articleWrite',
      component: Markdown
    },
    {
      path: 'articleManage',
      component: ArticleManage
    }
    ]
  },
  {
    path: '/article/:articleId',
    component: ArticleDetail
  },
  {
    path: '/categories/:category',
    component: Category
  },
  {
    path: '/tag/:tagname',
    component: Tag
  },
  {
    path: '/login',
    component: Login
  }


]
const router = new VueRouter({
  mode: 'history',
  routes,


})

router.beforeEach((to, from, next) => {
  var userInfo = window.localStorage.getItem('token');//获取浏览器缓存的用户信息
  if (userInfo) { //如果有就直接到首页咯
    next();
  } else {
    if (to.path == '/login') { //如果是登录页面路径，就直接next()
      next();
    } else if (to.path == '/admin') { //不然就跳转到登录；
      alert('您尚未登录，先登录！！')
      next('/login');
    }
    else {
      next()
    }

  }

});
export default router