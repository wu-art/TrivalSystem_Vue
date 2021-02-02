<template>
<el-container class="container">
    <el-header class="header">
        <el-row>
            <el-col :span="4">
                <img src="../../assets/pictures/login.jpg" alt="图片无法显示" class="login-img">
            </el-col>
            <el-col :span="18" class="login-middle">
                <h3>基于web的旅游景点网站的设计与实现</h3>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <a href="#" class="loginout">退出</a>
                </div>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside class="aside" width="200px">
            <!-- 侧边导航栏 -->
            <!-- true首字母为大写无用 -->
            <el-menu
            :unique-opened="true"
            >
                <el-submenu index="1">
                    <!-- index的值不能一样 -->
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <!-- <template slot="title">分组一</template> -->
                        <i class="el-icon-menu"></i>
                        <span>选项一</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 2 -->
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                        <span>选项一</span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                        <span>选项二</span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                        <span>选项三</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 3 -->
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <!-- <template slot="title">分组一</template> -->
                        <i class="el-icon-location"></i>
                        <span>23</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 4 -->
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                    </template>
                    <el-menu-item index="1-1">
                        <!-- <template slot="title">分组一</template> -->
                        <i class="el-icon-location"></i>
                        <span>选项一</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 5 -->
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                    </template>
                    <el-menu-item index="1-1">
                        <!-- <template slot="title">分组一</template> -->
                        <i class="el-icon-location"></i>
                        <span>选项一</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main class="main">Main</el-main>
    </el-container>
</el-container>
</template>

<script>
export default {

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
    background-color: #E9EEF3;
}

/* 头部样式 */
.login-img {
    height: 60px;
    width: 160px;
}

.login-middle {
    /* line-height: 50px; */
    text-align: center;
}

.loginout {
    text-decoration: none;
    line-height: 60px;
}
</style>
