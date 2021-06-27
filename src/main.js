// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import './plugins/axios'
// axios插件使用:
// import axios from 'axios'
// Vue.prototype.$http = axios
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import '@/assets/css/reset.css'
import echarts from 'echarts' 
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

Vue.use(ElementUI)
// Vue.use(axios)

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts //挂载在原型，组件内使用直接this.$echarts调用
import '../static/china.js'

// 全局过滤器-处理日期
Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render:(h)=>h(App) -->等同于下面两行
  components: { App },
  template: '<App/>'
})
