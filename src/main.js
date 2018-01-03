// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueWechatTitle from 'vue-wechat-title'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css';
import store from './vuex/store'
import VueResource from 'vue-resource'
import S from './assets/js/function'
import * as filters from './assets/js/filter.js'
import * as directives from './assets/js/directive.js'

Vue.use(VueWechatTitle)
Vue.use(Mint)
Vue.use(VueResource)
Vue.use(S)
Vue.config.productionTip = false
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};

//过滤器载入
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//装载自定义指令
Object.keys(directives).forEach(key => {
  Vue.directive(key,directives[key]);
})

//VueResource请求预处理
// Vue.http.interceptors.push((resquest,newx) => {
//   resquest.emulateJSON = true;
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data:{
    name:'seven'
  },
  template: '<App/>',
  components: { App }
})
