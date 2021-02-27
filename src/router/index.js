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
import Deletetravel from '@/components/travel/deletetravel.vue'
import Changetravel from '@/components/travel/changetravel.vue'
import Checktravel from '@/components/travel/checktravel.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // path: '/',
    {name:'login',path: '/login',component:Login},
    // path:'/home',
    { name:'home',
      path: '/',
      component:Home,
      redirect:'/welcome',
      // redirect 请求重定向，必须要放在组件后面即component后
      children:[
        {name:'welcome',path: '/welcome',component: Welcome},
        {name:'users',path:'/users',component:Users},
        {name:'addtravel',path:'/addtravel',component:Addtravel},
        {name:'deletetravel',path:'/deletetravel',component:Deletetravel},
        {name:'changetravel',path:'/changetravel',component:Changetravel},
        {name:'checktravel',path:'/checktravel',component:Checktravel},
        {name:'noticecheck',path:'/noticecheck',component:Notice},
        {name:'datashow',path:'/datashow',component:Datashow},
        {name:'foodcheck',path:'/foodcheck',component:Foodcheck},
        {name:'checkothers',path:'/checkothers',component:Checkothers},
        {name:'developed',path:'/developed',component:Developed},
        {name:'routecheck',path:'/routecheck',component:Routecheck},
        {name:'ticketsale',path:'/ticketsale',component:Ticketsale},
        {name:'ticketreturn',path:'/ticketreturn',component:Ticketreturn},
        {name:'travellist',path:'/travellist',component:Travellist},
      ]
    }
  ]
})
