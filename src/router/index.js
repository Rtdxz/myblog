import Vue from 'Vue'
import VueRouter from 'vue-router'

//使用vuerouter里的install
Vue.use(VueRouter);



import Home from '@/views/home/Home'


const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },

]
const router = new VueRouter({
  mode: 'history',
  routes,


})

export default router