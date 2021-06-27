<template>
	<el-container class="login-img">
      <p class="login">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="登录" name="first">
                        
				<el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
					
                              <el-form-item label="用户名" prop="username">
                                    <el-input v-model="loginForm.username"></el-input>
                              </el-form-item>
                              <!-- <i class="el-icon-user-solid"></i> -->
                              <!-- <i class="el-icon-lock"></i>    -->
					<el-form-item label="密码" prop="password">
                                    <label slot="label">密&emsp;码</label>
                                    <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
                              </el-form-item>
                              <el-form-item label="验证码" prop="code">
                                    <el-input size="normal" type="text" v-model="loginForm.code" auto-complete="off" style="width: 120px;height:30px;"></el-input>
                                    <img :src="src" @click="changegetImage" alt="" :key="key" class="ImageCode">
                              </el-form-item>
					<el-form-item>
						<el-button @click="handleLogin()" class="login-btn" type="primary">登录</el-button>
 
						<el-button @click="resetForm('loginForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
 
			<el-tab-pane label="注册" name="second" :key="'second'">
				<register></register>                       
			</el-tab-pane>
                  <el-tab-pane label="可视化" name="third" :key="'third'">
				<!-- <register></register> -->
                       <el-button @click="toShow()" class="" type="primary">点击查看大屏</el-button>                      
			</el-tab-pane>
		</el-tabs>
	</p>
     </el-container>
</template>
 
<script>
import WeChart from '@/components/communication/WeChat.vue';
import Register from '@/components/login/register.vue';
export default {
      components: {
		WeChart,
            Register
	},
	data() { 
		return {
			activeName: 'first',
			loginForm: {
                        username: '',
                        password: '',
                        code: ''
                  },
                  code: " ",
                  src: "",
                  key: "",
			rules: {
				username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                        code:[{required: true, message: '请输入验证码', trigger: 'blur'}]
			}
		};
	},
 
	methods: {
		//选项卡切换
		handleClick(tab, event) {},
            toShow(){
                  this.$router.push("/wechart");
            },
		//重置表单
		resetForm(loginForm) {
			this.$refs[loginForm].resetFields();
		},
		//提交表单
		handleLogin() {
                  let _this = this;
                  if(_this.loginForm.code==""){
                        _this.$message.error("请输入验证码!")
                  }
                  axios.post('http://localhost:8081/api/manager/login', this.loginForm).then(function (res) {
                        // console.log(res)
                        if(_this.code==_this.loginForm.code){
                              if (res.data.code == 1) {
                                    _this.$message.success(res.data.msg)
                                    _this.$router.push('/home')
                              } else {
                                    _this.$message.error(res.data.msg)
                              }
                        }else{
                              _this.$message.error("验证码错误!")
                        }
                        
                  })
            },
            getImage() {
                  const _this = this
                  axios.get('http://localhost:8081/api/manager/getImage').then((res) => {
                        //console.log(res)
                        this.src = "data:image/png;base64," + res.data.image;
                        // console.log(_this.src)
                        this.key = res.data.key;
                        // console.log(_this.key)
                        this.code=res.data.code;
                  });
            },
            changegetImage() {
                  this.getImage();
            }
	},
      created() {
            this.getImage(); //获取验证码
      },
};
</script>
 
<style>
.login-img {
      background: url("../../assets/images/Starry.jpg") no-repeat;
      height: 100%;
      width: 100%;
      /* background-size: cover; */
      /* position: fixed; */
}
.demo-ruleForm {
      width: 350px;
      background-color: rgb(13, 78, 104);
      border-radius: 5px;
      padding: 30px;
      margin-bottom: 80px;
}
.el-tabs__item{
      font-size: 20px;
}
.el-form-item__label{
      font-size: 18px;
      color:#020e1a;
}
.login {
	margin: 0 auto;
      margin-top: 130px;
}
 
.el-tabsitem {
	text-align: center;
	width: 60px;
}
.ImageCode {
      position: absolute;
      margin-bottom: 20px;
      height: 40px;
      width: 100px;
      border-radius: 5px;
      padding-left: 28px;
}
</style>