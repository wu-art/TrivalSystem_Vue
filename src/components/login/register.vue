<template>
  <div class="main">
    <el-form
      :model="registerForm"
      :rules="rules"
      ref="registerReset"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <label slot="label">密&emsp;码</label>
        <el-input
          type="password"
          v-model="registerForm.password"
          auto-complete="off"
        ></el-input>
      </el-form-item>   
      <el-form-item label="电话" prop="phone">
        <label slot="label">电&emsp;话</label>
        <el-input
          type="text"
          v-model="registerForm.phone"
          auto-complete="off"
        ></el-input>
      </el-form-item>  
      <el-form-item>
        <el-button @click="handleRegister()" class="login-btn" type="primary">注册</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      registerForm:{},
      rules: {
				username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        phone:[{required: true, message: '请输入电话', trigger: 'blur'}]
			}
    }
  },
  methods:{
    handleRegister(){
      axios.post('http://localhost:8081/api/manager/register',this.registerForm).then((res)=>{
        // console.log(res);
        if(res.status){
          this.$message.success(res.data.msg);
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    resetForm(){
      this.$refs.registerReset.resetFields();
    }
  }
};
</script>

<style>
</style>