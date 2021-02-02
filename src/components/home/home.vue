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
        <el-aside class="aside" width="200px">Aside</el-aside>
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
.login-img{
    height: 60px;
    width: 180px;
}
.login-middle{
    /* line-height: 50px; */
    text-align: center;
}
.loginout{
    text-decoration: none;
    line-height: 60px;
}
</style>
