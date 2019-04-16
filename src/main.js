// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
import {http} from './components/config/http.js'
import API from "./components/config/server";
import store from './store'
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式

import 'jquery'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/swiper.min.css'
import './assets/js/swiper.min.js'
import './assets/icon/iconfont.css'
import './assets/swiper.css'
import service from './components/config/service'
Vue.prototype.$API = service
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$api = API

router.beforeEach((to, from, next) => {
//	console.log(to)
  // NProgress.start();//开启Progress
  if (to.path == '/') {
    localStorage.removeItem('cloudUser');
  }
  let user = JSON.parse(localStorage.getItem('cloudUser'));
  if (!user && to.path != '/') {
    next({ path: '/' })
    // next()
    // NProgress.done(); // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
  } else {
    next()
  }
})

router.afterEach(transition => {
  NProgress.done();
  
});

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
