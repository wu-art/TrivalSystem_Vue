// 插件模块

import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
    //设置基址
    // axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
    axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/';
    
    // 添加实例方法
    Vue.prototype.$http = axios
  }

  export default MyHttpServer

