import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login/login.vue'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Addtravel from '@/components/travel/addtravel.vue'
import Notice from '@/components/notice/noticecheck.vue'
import Datashow from '@/components/datashow/datashow.vue'
import Welcome from '@/components/welcome/welcome.vue'
import Foodcheck from '@/components/food/foodcheck.vue'
import Checkothers from '@/components/food/checkothers.vue'
import Developed from '@/components/food/developed.vue'
import Routecheck from '@/components/route/routecheck.vue'
import Ticketsale from '@/components/ticket/ticketsale.vue'
import Ticketreturn from '@/components/ticket/ticketreturn.vue'
import Travellist from '@/components/travel/travellist.vue'
import TravelsAll from '@/components/travel/travelsAll.vue'
import SearchTravel from '@/components/travel/searchTravel.vue'
import OtherTravel from '@/components/travel/otherTravel.vue'
import ProvinceList from '@/components/province/ProvinceList.vue'
import Register from '@/components/login/register.vue'
import OrderList from '@/components/ticket/orderList.vue'
import PayOrder from '@/components/ticket/PayOrder.vue'
import YiQingData from '@/components/datashow/yiqingdata.vue'
import WeChart from '@/components/communication/WeChat.vue'

import Index from '@/components/index/index.vue'


Vue.use(Router)

// 解决路由冗余问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location){
  return originalPush.call(this,location).catch(err => err)
}

export default new Router({
  routes: [
    // path: '/login',
    // {name:'index',path:'/index',component:Index},
    {name:'index',path:'/',component:Index},
    {name:'login',path: '/login',component:Login},
    {name:'register',path:'/register',component:Register},
    {name:'wechart',path:'/wechart',component:WeChart},
    // path:'/home',
    { name:'home',
      path: '/home',
      component:Home,
      redirect:'/welcome',
      // redirect 请求重定向，必须要放在组件后面即component后
      children:[
        {name:'welcome',path: '/welcome',component: Welcome},
        {name:'users',path:'/users',component:Users},
        {name:'addtravel',path:'/addTravel',component:Addtravel},
        {name:'searchTravel',path:'/searchTravel',component:SearchTravel},
        {name:'provincelist',path:'/province',component:ProvinceList},
        {name:'noticecheck',path:'/noticeCheck',component:Notice},
        {name:'datashow',path:'/datashow',component:Datashow},
        {name:'yiqingdata',path:'/yiQingData',component:YiQingData},
        {name:'foodcheck',path:'/foodCheck',component:Foodcheck},
        {name:'checkothers',path:'/checkOthers',component:Checkothers},
        {name:'developed',path:'/developed',component:Developed},
        {name:'routecheck',path:'/routeCheck',component:Routecheck},
        {name:'ticketsale',path:'/ticketSale',component:Ticketsale},
        {name:'ticketreturn',path:'/ticketReturn',component:Ticketreturn},
        {name:'travellist',path:'/travelList',component:Travellist},
        {name:'travelsAll',path:'/travelsAll',component:TravelsAll},
        {name:'otherTravel',path:'/otherTravel',component:OtherTravel},
        {name:'orderList',path:'/orderList',component:OrderList},
        {name:'payOrder',path:'/payOrder',component:PayOrder}
      ]
    }
  ]
})
