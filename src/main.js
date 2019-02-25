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

import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

import service from './components/config/service'
Vue.prototype.$API = service
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$api = API

router.beforeEach((to, from, next) => {
  NProgress.start();//开启Progress
  // if (to.path == '/login') {
  //   sessionStorage.removeItem('user');
  // }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    //next({ path: '/login' })
    next()
    NProgress.done(); // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
  } else {
    next()
  }
})

router.afterEach(transition => {
  NProgress.done();
});

let USERINFO = (function(){
	if(localStorage.getItem('cloudUser')){
		let user = localStorage.getItem('cloudUser')
		return JSON.parse(user)
	}else{
		return ''
	}
})()
Vue.prototype.$userInfo = USERINFO
/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
