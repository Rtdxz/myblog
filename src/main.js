import Vue from 'vue'
import App from './App.vue'

import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import ElementUI from 'element-ui';

import router from '@/router'


import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'





import 'mavon-editor/dist/css/index.css'

import "./assets/js/mock.js"; //此部分引入的是我们所编写的mockjs文档

Vue.use(VueAxios, axios)
Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.config.productionTip = false

Vue.prototype.$axios = axios



router.afterEach((to, from, next) => {

  window.scrollTo(0, 0);

  // 或

  // window.scroll(0, 0);

});//页面跳转时跳到顶部


new Vue({
  render: h => h(App),
  router,

}).$mount('#app')

import { request } from "@/network/request";
