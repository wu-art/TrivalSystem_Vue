<template>
<el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>景点用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 搜索框 -->
      <el-row class="searchRow">
            <el-col>
                  <el-input v-model="search" name="" class="inputSearch" @clear="loadUser()" clearable placeholder="请输入内容">
                        <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                  <el-button @click="showAddUserDia()" type="success">添加用户</el-button>
            </el-col>
      </el-row>

      <!-- 添加用户对话框 // 点击添加用户按钮，弹出对话框 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
            <el-form :model="form" ref="form" :rules="rules">
                  <el-form-item label="用户名" prop="name" label-width="100px">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="电话" prop="phone" label-width="100px">
                        <el-input v-model="form.phone" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email" label-width="100px">
                        <el-input v-model="form.email" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="日期" prop="create_date" label-width="100px">
                        <el-input v-model="form.create_date" autocomplete="off"></el-input>
                  </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                  <el-button type="primary" @click="addUser('form')">确 定</el-button>
                  <el-button @click="resetForm('form')">重置</el-button>
            </div>
      </el-dialog>

      <!-- 表格 -->
      <!-- data为userlist，此处获取不到数据用tableData -->
      <el-table :data="userlist" style="width: 100%">
            <!-- label表示表头名称 -->
            <!-- index检索列，从1开始 // prop="data"数据传递 -->
            <!-- <el-table-column type="index" label="#" width="60">
        </el-table-column> -->
            <el-table-column prop="id" label="#" width="60">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="80">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="create_date" label="创建日期">
                  <!-- 自动获取当前日期 -->
                  <!-- <template slot-scope="scope">
                        {{scope.row.create_time | fmtdate}}
                  </template> -->
            </el-table-column>
            <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                        <!-- size:尺寸 // plain:是否朴素按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" plain circle @click="showEditUserDia(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" plain circle @click="showDeleteUserMsgBox(scope.row)"></el-button>
                        <el-button type="success" icon="el-icon-check" size="mini" plain circle></el-button>
                  </template>
            </el-table-column>
      </el-table>

      <!-- 编辑用户对话框 -->
      <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
            <el-form :model="editform" ref="editform">
                  <el-form-item label="编号" label-width="100px">
                        <!-- readOnly为只读模式，无法修改 / 与disabled作用相同，展示样式不同 -->
                        <el-input disabled v-model="editform.id" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="用户名" label-width="100px">
                        <el-input disabled v-model="editform.name" autocomplete="on"></el-input>
                  </el-form-item>
                  <el-form-item label="电话" label-width="100px">
                        <el-input v-model="editform.phone" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" label-width="100px">
                        <el-input v-model="editform.email" autocomplete="off"></el-input>
                  </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                  <el-button type="primary" @click="editUser('editform')">确 定</el-button>
            </div>
      </el-dialog>

      <!-- 分页 -->
      <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="queryInfo.pagenum" :page-size="queryInfo.pagesize" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>

</el-card>
</template>

<script>
export default {
      data() {
            return {
                  search: '',
                  userlist: [{}],
                  //分组相关数据
                  queryInfo: {
                        pagenum: 1, //当前页数
                        pagesize: 8,//当前页有多少条数据
                  },
                  total: null,
                  // 添加对话框属性
                  dialogFormVisibleAdd: false,
                  dialogFormVisibleEdit: false,
                  // 添加用户的表单数据
                  form: {
                        name: '',
                        phone: '',
                        email: '',
                        create_date: ''
                  },
                  editform: {
                        id: '',
                        name: '',
                        phone: '',
                        email: '',
                  },
                  rules: {
                        name: [
                              { required: true, message: '请输入用户名', trigger: 'blur' },
                              { min: 0, max: 100, message: '', trigger: 'blur' }
                        ],
                        phone: [
                              { required: true, message: '请输入电话', trigger: 'blur' },
                              { min: 5, max: 11, message: '', trigger: 'blur' }
                        ],
                        email: [
                              { required: true, message: '请输入邮箱', trigger: 'blur' },
                              { min: 0, max: 100, message: '', trigger: 'blur' }
                        ],
                        create_date: [
                              { required: true, message: '请输入创建日期', trigger: 'blur' },
                              { min: 0, max: 100, message: '', trigger: 'blur' }
                        ]
                  }
            }
      },

      created() {
            const _this = this
            // axios.get('http://localhost:8081/users/findAll/1/'+this.queryInfo.pagesize).then(function (resp) {
            axios.get('http://localhost:8081/api/users/findAll/1/7').then(function (resp) {
                  _this.userlist = resp.data.content
                  _this.total = resp.data.totalElements
                    console.log(resp)
            });
            // alert(_this.$route.query.id)
            // 将用户信息绑定到编辑用户框中
            // var that = this
            // const _this = this
            // 定义editform,否则浏览器报错(TypeError: Cannot set property 'editform' of undefined)
            axios.get('http://localhost:8081/api/users/findById/' + this.$route.query.id).then(function (resp) {
                  _this.editform = resp.data
            });

            // _this.searchUser()
            _this.getuserlist();
            // _this.getUserList()
      },
      mounted() {
            const _this = this
            _this.searchUser()
      },
      methods: {
            // getUserList() {
            //       const _this = this
            //       axios.get('http://localhost:8081/api/users/findAll/' + _this.queryInfo.pagenum + '/' + _this.queryInfo.pagesize).then(function (res) {
            //             // _this.userlist = res.data
            //             // console.log(res)
            //             if (res.status !== 200) {
            //                   return _this.$message.error("获取用户信息失败")
            //             }
            //             _this.userlist = res.data.content
            //             _this.products = res.data
            //       })
            // },
            //获取用户列表请求
            async getuserlist() {
                  const _this = this
                  const AUTH_TOKEN = localStorage.getItem('token')
                  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
                  const res = await axios.get('http://localhost:8081/api/users/findAll/' 
                                    + _this.queryInfo.pagenum + '/' + _this.queryInfo.pagesize)
                                    .then(function (res) {
                        // console.log(res)
                        if (res.status !== 200) {
                              return _this.$message.error("获取用户信息失败")
                        }
                        _this.userlist = res.data.content
                  })

                  // 查询
                  axios.get('http://localhost:8081/api/users/findAll/').then(function (res) {
                        // console.log(res.data)
                        _this.products = res.data
                        // console.log(_this.products)
                  })
                  var search = _this.search
                  if (search) {
                        _this.userlist = _this.products.filter(function (product) {
                              // console.log(product)
                              return Object.keys(product).some(function (key) {
                                    // console.log(key)
                                    return String(product[key]).toLowerCase().indexOf(search) > -1
                              })
                        })
                  }
            },

            // 清空搜索框,更新列表
            loadUser() {
                  const _this = this
                  _this.getuserlist()
                  // _this.getUserList()
                  // 重新读取当前页面
                  // window.location.reload()
                  // 此处应为重新读取数据列表(待修改)
                  // const _this = this
                  // _this.getuserlist()

            },

            //查询用户          
            searchUser() {
                  const _this = this
                  _this.getuserlist()
                  // _this.getUserList()
                  // axios.get('http://localhost:8081/users/findAll/').then(function (res) {
                  //       // console.log(res)
                  //       // console.log(res.data)
                  //       _this.products = res.data
                  //       // console.log(_this.products)
                  // })
                  // var search = _this.search
                  // if (search) {
                  //       _this.userlist = _this.products.filter(function (product) {
                  //             // console.log(product)
                  //             return Object.keys(product).some(function (key) {
                  //                   // console.log(key)
                  //                   return String(product[key]).toLowerCase().indexOf(search) > -1
                  //             })
                  //       })
                  // }
            },

            // 编辑用户
            editUser(editform) {
                  // 1.关闭编辑用户对话框
                  this.dialogFormVisibleEdit = false
                  const _this = this
                  this.$refs[editform].validate((valid) => {
                        if (valid) {
                              axios.put('http://localhost:8081/api/users/update', this.editform).then(function (resp) {
                                    // console.log(resp)
                                    if (resp.data == 'success') {
                                          _this.$alert('用户:<' + _this.editform.name + '>修改成功!', '用户', {
                                                confirmButtonText: '确定',
                                                callback: action => {
                                                      _this.$message({
                                                            message: '修改成功',
                                                            type: 'success'
                                                      });
                                                      // 添加后跳转到某一页,在添加景点处使用
                                                      // _this.router.push("/users")
                                                }
                                          })
                                    }
                              })
                        } else {
                              console.log('error submit!!');
                              return false;
                        }
                  });
            },
            //编辑用户 - 显示对话框
            showEditUserDia(row) {
                  //此处路由跳转与当前路由重复,控制台会出错，解决办法:
                  // 1、在index.js中添加代码(解决路由冗余)
                  // 2、删除此路由跳转,使query参数独立存在
                  this.$router.push({
                        path: '/users',
                        query: {
                              id: row.id
                        }
                  })
                  // 获取用户数据
                  this.editform = row
                  this.dialogFormVisibleEdit = true
            },

            //删除用户 -打开消息盒子
            showDeleteUserMsgBox(row) {
                  this.$confirm('删除用户?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                  }).then(async () => {
                        //发送删除请求
                        const _this = this
                        axios.delete('http://localhost:8081/api/users/deleteById/' + row.id).then(function (resp) {
                              _this.$alert('用户:<' + row.name + '>删除成功!', '删除用户', {
                                    callback: action => {
                                          _this.$message({
                                                message: '删除成功',
                                                type: 'success'
                                          });
                                          // 重新加载当前页
                                          window.location.reload()
                                          // 添加后跳转到某一页,在添加景点处使用
                                          // _this.router.push("/users")
                                    }
                              })
                        })
                  }).catch(() => {
                        this.$message({
                              type: 'info',
                              message: '已取消删除'
                        });
                  })
            },

            //添加用户 对话框
            addUser(form) {
                  //2.关闭对话框
                  this.dialogFormVisibleAdd = false
                  const _this = this
                  this.$refs[form].validate((valid) => {
                        if (valid) {
                              axios.post('http://localhost:8081/api/users/save', this.form).then(function (resp) {
                                    // console.log(resp)
                                    if (resp.data == 'success') {
                                          _this.$alert('用户:<' + _this.form.name + '>添加成功!', '用户', {
                                                confirmButtonText: '确定',
                                                callback: action => {
                                                      _this.$message({
                                                            message: '添加成功',
                                                            type: 'success'
                                                      });
                                                      // 添加后跳转到某一页,在添加景点处使用
                                                      // _this.router.push("/users")
                                                }
                                          })
                                    }
                              })
                        } else {
                              console.log('error submit!!');
                              return false;
                        }
                  });
            },
            // 重置按钮
            resetForm(form) {
                  this.$refs[form].resetFields();
            },

            //添加用户-显示对话框
            showAddUserDia() {
                  this.form = {}
                  this.dialogFormVisibleAdd = true
            },

            // 分页方法
            handleCurrentChange(val) {
                  const _this = this
                  axios.get('http://localhost:8081/api/users/findAll/' + val + '/7').then(function (resp) {
                        // console.log(resp)
                        _this.userlist = resp.data.content
                        _this.total = resp.data.totalElements
                  })
                  console.log(`当前页: ${val}`);
                  console.log(`每页 ${_this.queryInfo.pagesize} 条`)
                  // this.pagenum = val
                  //重新发送数据请求
                  _this.queryInfo.pagenum = val
                  _this.getuserlist()
                  // _this.getUserList()
            },

            //监听pagesize改变的事件
            handleSizeChange(newSize) {
                  //console.log(newSize);
                  const _this = this
                  axios.get('http://localhost:8081/api/users/findAll/' + val + newSize).then(function (resp) {
                        // console.log(resp)
                        _this.userlist = resp.data.content
                        _this.total = resp.data.totalElements
                  })
                  this.queryInfo.pagesize = newSize
                  //重新发送数据请求
                  _this.getuserlist()
                  // _this.getUserList()
            },
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
