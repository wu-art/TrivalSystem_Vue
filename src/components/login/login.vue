<template>
<div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
        <h1>用户登录</h1>
        <el-form-item label="用户名">
            <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-button @click.prevent="handleLogin()" class="login-btn" type="primary">登录</el-button>
    </el-form>
</div>
</template>

<script>
export default {
    data () {
        return {
            formdata: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        // 登录请求
        handleLogin() {
            this.$http.post('login', this.formdata).then(res => {
                // console.log(res)
                const {
                    data,meta:{msg,status}
                } = res.data
              
                if (status == 200){
                // 登录成功
                // 跳转home
                    // this.$router.push({name:'home'})
                    // 提示成功
                    this.$message.success(msg);
                }
                else{
                // 不成功
                // 提示消息
                   this.$message.warning(msg)  
                }
            })
        }
    }
}
</script>

<style>
.login-wrap {
    height: 100%;
    background-color: #324152;
    /* 弹性盒布局 */
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-wrap .login-form {
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px;
}

.login-wrap .login-btn {
    /* width: 400px; */
    width: 100%;
}
</style>
