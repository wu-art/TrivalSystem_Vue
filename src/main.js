// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import MyHttpServer from '@/plugins/http.js'
// axios插件使用:
// import axios from 'axios'
// Vue.prototype.$http = axios

// import vueRsource from 'vue-resource'
// post请求处理

import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import '@/assets/css/reset.css'

// 使用vue插件
Vue.use(ElementUI)
Vue.use(MyHttpServer)
// Vue.use(vueRsource);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render:(h)=>h(App) -->等同于下面两行
  components: { App },
  template: '<App/>'
})
