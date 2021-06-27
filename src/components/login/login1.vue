<template>
<el-container class="login-img">
      <el-main>
            <el-carousel :interval="4000" type="card" height="400px" ref="carousel" @click.native="linkTo">
                  <el-carousel-item v-for="(item,index) in imgs" :key="index">
                        <!-- <h3 class="medium">{{ item }}</h3> -->
                        <img :src="item.url" alt="login">
                  </el-carousel-item>
            </el-carousel>
      </el-main>
      <el-aside width="600px">
            <div class="login-wrap">
                  <el-form class="login-form" :rules="rules" label-position="top" label-width="80px" :model="loginForm">
                        <h1 style="text-align:center">基于web旅游景点管理系统</h1>
                        <h3>管理员登录</h3>
                        <el-form-item label="用户名" prop="username">
                              <el-input v-model="loginForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                              <!-- type="password"输入类型为密码  或者用   show-password属性 -->
                              <el-input v-model="loginForm.password" show-password></el-input>
                        </el-form-item>

                        <el-form-item prop="code">
                              <big class="code">验证码:</big>
                              <el-input size="normal" type="text" v-model="loginForm.code" auto-complete="off" style="width: 150px;height:30px;"></el-input>
                              &nbsp;&nbsp;&nbsp;
                              <img :src="src" @click="changegetImage" alt="" :key="key" class="ImageCode">
                        </el-form-item>

                        <el-button @click="handleLogin()" class="login-btn" type="primary">登录</el-button>
                  </el-form>
            </div>
      </el-aside>
</el-container>
</template>

<script>
import Qs from 'qs'
export default {
      data() {
            return {
                  loginForm: {
                        username: '',
                        password: '',
                        code: ''
                  },
                  code: " ",
                  src: "",
                  key: "",
                  imgs: [
                        { url: require('../../assets/images/lb_1.jpg'), link: "/con" },
                        { url: require('../../assets/images/lb_2.jpg'), link: "/con" },
                        { url: require('../../assets/images/lb_3.jpg'), link: "/con" },
                        { url: require('../../assets/images/lb_4.jpg'), link: "/con" },
                        { url: require('../../assets/images/lb_1.jpg'), link: "/con" }
                        // { url: require('../../assets/images/lb_1.jpg'), link: window.open('https://www.jd.com', "_blank") }
                  ],
                  rules: {
                        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
                        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
                        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
                  }
            }
      },
      methods: {
            linkTo() {
                  let activeIndex = this.$refs.carousel.activeIndex
                  this.$router.push(this.imgs[activeIndex].link)
            },

            handleLogin() {
                  let _this = this;
                  // console.log(this.loginForm)
                  axios.post('http://localhost:8081/api/manager/login', this.loginForm).then(function (res) {
                        // console.log(res)
                        if (res.data.code == 1) {
                              _this.$message.success(res.data.msg)
                              _this.$router.push('/')
                        } else {
                              _this.$message.error(res.data.msg)
                        }
                  })
            },
            // 登录请求
            //简化登录请求代码
            //让异步代码看起来像同步代码(一步一步执行)
            //找到异步操作有结果的代码，前面加await，同时接口异步操作的结果res
            //找到距离异步操作有结果的代码最近的方法，前面加async

            getImage() {
                  const _this = this
                  axios.get('http://localhost:8081/api/manager/getImage').then((res) => {
                        // console.log(res)
                        _this.src = "data:image/png;base64," + res.data.image;
                        // console.log(_this.src)
                        _this.key = res.data.key;
                        // console.log(_this.key)
                  });
            },
            changegetImage() {
                  this.getImage();
            }
      },
      created() {
            this.getImage(); //获取验证码
      }
}
</script>

<style>
.el-container {
      height: 100%;
}

.login-img {
      background: url("../../assets/images/login.jpg") no-repeat;
      background-position: center;
      height: 100%;
      width: 100%;
      background-size: cover;
      position: fixed;
}

.el-main {
      /* background-color: #2a066d; */
      /* color: rgb(13, 131, 13); */
      /* text-align: center; */
      /* line-height: 200px; */
      padding-top: 100px;
}

.el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
}

.el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
}

.login-wrap {
      height: 100%;
      /* background-color: #324152; */
      /* 弹性盒布局 */
      display: flex;
      justify-content: center;
      align-items: center;
}

.login-wrap .login-form {
      width: 350px;
      background-color: rgb(13, 78, 104);
      border-radius: 5px;
      padding: 20px;
      margin-bottom: 100px;
}

.login-wrap .login-btn {
      /* width: 400px; */
      width: 100%;
}

.el-form-item label {
      -webkit-text-stroke-width: medium;
}

.code {
      -webkit-text-stroke-width: medium;
}

.ImageCode {
      margin-bottom: -15px;
      height: 40px;
      width: 120px;
      border-radius: 5px;
}
</style>
