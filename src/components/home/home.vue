<template>
<el-container class="container">
    <el-header class="header">
        <el-row>
            <el-col :span="4">
                <img src="../../assets/pictures/login.png" alt="图片无法显示" class="login-img">
            </el-col>
            <el-col :span="18" class="login-middle">
                <h3>基于web旅游景点管理系统的设计与实现</h3>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <a href="#" class="loginout" @click.prevent="handleSignout()">退出系统</a>
                </div>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside class="aside" width="200px">
            <!-- 侧边导航栏 -->
            <!-- true首字母为大写无用 / 开启路由模式-->
            <el-menu :unique-opened="true" :router="true">
                <el-submenu index="0">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>景点用户管理</span>
                    </template>
                    <el-menu-item index="users">
                        <i class="el-icon-location"></i>
                        <span>用户列表</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="1">
                    <!-- index的值不能一样 -->
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>管理景点信息</span>
                    </template>
                    <el-menu-item index="addtravel">
                        <!-- <template slot="title">分组一</template> -->
                        <i class="el-icon-menu"></i>
                        <span>添加景点信息</span>
                    </el-menu-item>
                    <el-menu-item index="travellist">
                        <!-- <template slot="title">分组一</template> -->
                        <i class="el-icon-menu"></i>
                        <span>获取景点列表</span>
                    </el-menu-item>
                    <el-menu-item index="deletetravel">
                        <!-- <template slot="title">分组一</template> -->
                        <i class="el-icon-menu"></i>
                        <span>删除景点信息</span>
                    </el-menu-item>
                    <el-menu-item index="changetravel">
                        <!-- <template slot="title">分组一</template> -->
                        <i class="el-icon-menu"></i>
                        <span>修改景点信息</span>
                    </el-menu-item>
                    <el-menu-item index="checktravel">
                        <!-- <template slot="title">分组一</template> -->
                        <i class="el-icon-menu"></i>
                        <span>查询景点信息</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 2 -->
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>周边食宿查询</span>
                    </template>
                    <el-menu-item index="foodcheck">
                        <i class="el-icon-location"></i>
                        <span>周边住宿查询</span>
                    </el-menu-item>
                    <el-menu-item index="checkothers">
                        <i class="el-icon-location"></i>
                        <span>查看其他景点</span>
                    </el-menu-item>
                    <el-menu-item index="developed">
                        <i class="el-icon-location"></i>
                        <span>待开发</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 3 -->
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>景点线路查询</span>
                    </template>
                    <el-menu-item index="routecheck">
                        <i class="el-icon-location"></i>
                        <span>路线</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 4 -->
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>景点门票销售</span>
                    </template>
                    <el-menu-item index="ticketsale">
                        <i class="el-icon-location"></i>
                        <span>门票预订</span>
                    </el-menu-item>
                    <el-menu-item index="ticketreturn">
                        <i class="el-icon-location"></i>
                        <span>门票退订</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 5 -->
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>景点公告管理</span>
                    </template>
                    <el-menu-item index="noticecheck">
                        <i class="el-icon-location"></i>
                        <span>公告说明</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 6 -->
                <el-submenu index="6">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>景点数据展示</span>
                    </template>
                    <el-menu-item index="datashow">
                        <i class="el-icon-location"></i>
                        <span>可视化</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main class="main">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    // newVue之前自动触发(若没有登录过，就无法进入home组件)
    beforeCreate(){
        // 获取token
        const token = localStorage.getItem('token')
        if (!token){
            // 没有token，跳转到登录页面
            this.$router.push({name:'login'})
        }
        // if token 有 -> 继续渲染组件
    },
    methods:{
        handleSignout(){
            // 清楚token
            localStorage.clear()
            // 提示退出成功
            this.$message.success('退出成功')
            // 回到login组件
            this.$router.push({name:'login'})
        }
    }

}
</script>

<style>
.container {
    height: 100%;
}

.header {
    background-color: #B3C0D1;
}

.aside {
    background-color: #D3DCE6;
}

.main {
    /* background-color: #2853e0; */
    background-color: #fff;
}

/* 头部样式 */
.login-img {
    height: 60px;
    width: 80px;
    margin-left: 30px;
}

.login-middle {
    /* line-height: 50px; */
    text-align: center;
}

.loginout {
    text-decoration: none;
    line-height: 60px;
    /* color:darkblue; */
    color: cornsilk;
}
</style>
