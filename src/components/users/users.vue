<template>
<el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>景点用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <el-row class="searchRow">
        <el-col>
            <el-input @click="loadUserList()" clearable placeholder="请输入内容" v-model="query" class="inputSearch">
                <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button @click="showAddUserDia()" type="success">添加用户</el-button>
        </el-col>
    </el-row>

    <!-- 添加用户对话框 // 点击添加用户按钮，弹出对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
            <el-form-item label="用户名" label-width="100px">
                <el-input v-model="form.uesrname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="100px">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="100px">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="100px">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
            <el-button type="primary" @click="addUser()">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 表格 -->
    <!-- data为userlist，此处获取不到数据用tableData -->
    <el-table :data="tableData" style="width: 100%">
        <!-- label表示表头名称 -->
        <!-- index检索列，从1开始 // prop="data"数据传递 -->
        <el-table-column type="index" label="#" width="60">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="80">
        </el-table-column>
        <el-table-column prop="phone" label="电话">
        </el-table-column>
        <el-table-column prop="address" label="邮箱">
        </el-table-column>
        <el-table-column prop="create_time" label="创建日期">
            <template slot-scope="scope">
                <!-- {{create_time | fmtdate}} -->
                {{scope.row.create_time | fmtdate}}
            </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
                <!-- size:尺寸 // plain:是否朴素按钮 -->
                <el-button type="primary" icon="el-icon-edit" size="mini" plain circle @click="showEditUserDia(scope.row)"></el-button>
                <!-- <el-button type="danger" icon="el-icon-delete" size="mini" plain circle @click="showDeleteUserMsgBox(scope.row.userId)"></el-button> -->
                <el-button type="danger" icon="el-icon-delete" size="mini" plain circle @click="showDeleteUserMsgBox()"></el-button>
                <el-button type="success" icon="el-icon-check" size="mini" plain circle></el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="form">
            <el-form-item label="用户名" label-width="100px">
                <el-input disabled v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="100px">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="100px">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="editUser()">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

</el-card>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            userlist: [],
            //分组相关数据
            total: 50,
            pagenum: 1,
            pagesize: 2,
            // 添加对话框属性
            dialogFormVisibleAdd: false,
            dialogFormVisibleEdit:false,
            // 添加用户的表单数据
            form: {
                uesrname: '',
                password: '',
                mobile: '',
                email: ''
            },
            // currUserId: -1,
            // 自定义数据
            tableData: [{
                name: '武小虎',
                phone: '15625164894',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                name: '王小虎',
                phone: '15625164894',
                address: '肃省'
            }, {
                name: '武小',
                phone: '15625164894',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                name: '王虎',
                phone: '15625164894',
                address: '甘肃'
            }, {
                name: '武虎',
                phone: '15625164894',
                address: '上市普陀区金沙江路 1518 弄'
            }, {
                name: '小虎',
                phone: '15625164894',
                address: '肃省'
            }, {
                name: '武小虎',
                phone: '15625164894',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                name: '王小虎',
                phone: '15625164894',
                address: '甘肃省'
            }]
        }
    },
    // 58-66 == 73-101

    created() {
        this.getUserList()
    },
    methods: {
        // 编辑用户- 发送请求
        async editUser(){
            // const res = await this.$http.put('users/:id') 与118一起用
            const res = await this.$http.put('users/${this.form.id}',this.form)
            // console.log(res)
            // 1.关闭对话框
            this.dialogFormVisibleEdit = false
            // 提示
            this.$message.success('编辑成功')
            // 2.更新视图
            this.getUserList()
        },
        //编辑用户 - 显示对话框
        showEditUserDia(user){
            // console.log(user)
            // 获取用户数据
            this.form = user
            this.dialogFormVisibleEdit = true
        },

        //删除用户 -打开消息盒子
        // showDeleteUserMsgBox(userId) {
        showDeleteUserMsgBox() {
            this.$confirm('删除用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    //发送删除请求
                    // const res = await this.$http.delete('users/${userId}')
                    // console.log(res)
                    // if (res.data.meta.status === 200){
                    //     //操作完后回到第一页
                    //     this.pagenum = 1
                    //     //更新视图
                    //     this.getUserList()
                    //     //提示
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                        //     message:res.data.meta.msg
                    })
                    //  }             
                }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    })
                },
                //添加用户
                async addUser() {
                        //2.关闭对话框
                        this.dialogFormVisibleAdd = false
                        const res = await this.$http.post('users', this.form)
                        console.log(res)
                        const {
                            meta: { status, msg },
                            data
                        } = res.data
                        if (status === 201) {
                            //1.提示成功
                            this.$message.success(msg)
                            //3.更新视图
                            this.getUserList()
                            //4.清空文本框
                            this.form = {}
                        } else {
                            this.$message.warning(msg)
                        }
                    },
                    //添加用户-显示对话框
                    showAddUserDia() {
                        this.form = {}
                        this.dialogFormVisibleAdd = true
                    },
                    //清空搜索框，重新获取数据
                    loadUserList() {
                        this.getUserList()
                    },
                    //搜索用户
                    searchUser() {
                        this.getUserList()
                    },
                    // 分页方法
                    handleSizeChange(val) {
                        console.log(`每页 ${val} 条`)
                        this.pagesize = val
                        this.pagenum = 1
                        this.getUserList()
                    },
                    handleCurrentChange(val) {
                        console.log(`当前页: ${val}`);
                        this.pagenum = val
                        this.getUserList()
                    },

                    //获取用户列表请求
                    async getUserList() {
                        // query   查询参数    可以为空
                        // pagenum 当前页码    不能为空
                        // pagesize    每页显示条数    不能为空
                        // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
                        const AUTH_TOKEN = localStorage.getItem('token')
                        // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
                        this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;

                        const res = await this.$http.get('users?query=$(this.query)&pagenum=$(this.pagenum)&pagesize=$(this.pagesize)')
                        console.log(res)
                        const {
                            meta: { status, msg },
                            data: { users, total }
                        } = res.data
                        if (status === 200) {
                            // 给表格数据赋值
                            this.userlist = users
                            // 给total赋值
                            this.total = total
                            //提示
                            // this.$message.success(msg)
                        } else {
                            //提示
                            // this.$message.warning(msg)
                        }
                    }
            }
    }
</script>

<style>
.box-card {
    height: 100%;
}

.searchRow {
    margin-top: 20px;
}

.inputSearch {
    width: 400px;
}
</style>
