<template>
<div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
        <h1>用户登录</h1>
        <el-form-item label="用户名">
            <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <!-- type="password"输入类型为密码  或者用   show-password属性 -->
            <el-input v-model="formdata.password" show-password></el-input>
        </el-form-item>
        <el-button @click.prevent="handleLogin()" class="login-btn" type="primary">登录</el-button>
    </el-form>
</div>
</template>

<script>
export default {
    data() {
        return {
            formdata: {
                username:'' ,
                password: ''
            }
        }
    },
    methods: {
        // 登录请求
        //简化登录请求代码
        //让异步代码看起来像同步代码(一步一步执行)
        //找到异步操作有结果的代码，前面加await，同时接口异步操作的结果res
        //找到距离异步操作有结果的代码最近的方法，前面加async
         async handleLogin() {
            const res = await this.$http.post('login', this.formdata).then(res => {
                console.log(res)
                const {
                    data,
                    meta: { msg, status }
                } = res.data

                if (status == 200) {
                    // 登录成功
                    //1.保存token
                    //用户没登录，通过url直接到home，登录成功时,保存正确的token;
                    localStorage.setItem('token',data.token)
                    // 跳转home
                    // js编程式导航
                    this.$router.push({ name: 'home' })

                    // 提示成功
                    this.$message.success(msg);
                } else {
                    // 不成功
                    // 提示消息
                    this.$message.warning(msg)
                }
            })
        }

        //     this.$http.post('login', this.formdata).then(res => {
        //         // console.log(res)
        //         const {
        //             data,meta:{msg,status}
        //         } = res.data

        //         if (status == 200){
        //         // 登录成功
        //         // 跳转home
        //         // js编程式导航
        //             this.$router.push({name:'home'})

        //             // 提示成功
        //             this.$message.success(msg);
        //         }
        //         else{
        //         // 不成功
        //         // 提示消息
        //             this.$message.warning(msg)  
        //         }
        //     })
        // }
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
