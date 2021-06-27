<template>
<el-card class="box-card">
      <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>景点省份管理</el-breadcrumb-item>
            <el-breadcrumb-item>省份列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 搜索框 -->
      <el-row class="searchRow">
            <el-col>
                  <!-- 清空搜索框,自动刷新列表，用@clear=""定义函数 -->
                  <el-input @clear="loadProviceList()" clearable placeholder="请输入内容" v-model="query" class="inputSearch">
                        <el-button @click="searchProvince()" slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                  <el-button @click="showAddProvinceDia()" type="success">添加省份</el-button>
            </el-col>
      </el-row>

      <!-- 点击添加省份弹出信息框 -->
      <!-- 重置按钮:ref->$refs / prop=""获取重置字段 / 重置函数中传参-->
      <el-dialog title="添加省份" :visible.sync="dialogFormVisibleAdd">
            <el-form :model="addProvinceList" ref="addProvinceList" :rules="rules">
                  <el-form-item label="省名称" prop="name" label-width="100px">
                        <el-input v-model="addProvinceList.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="标志物" prop="tags" label-width="100px">
                        <el-input v-model="addProvinceList.tags" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="景点数" prop="placecounts" label-width="100px">
                        <el-input v-model="addProvinceList.placecounts" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="管理员" prop="administrators" label-width="100px">
                        <el-input placeholder="默认都是admin" v-model="addProvinceList.administrators" autocomplete="off"></el-input>
                  </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                  <el-button type="primary" @click="addProvince('addProvinceList')">添 加</el-button>
                  <el-button @click="resetForm('addProvinceList')">重 置</el-button>
            </div>
      </el-dialog>

      <!-- 获取数据 -->
      <el-table :data="province" style="width: 100%">
            <el-table-column prop="id" label="#" width="80">
            </el-table-column>
            <el-table-column prop="name" label="省份" width="120">
            </el-table-column>
            <el-table-column prop="tags" label="标志性景点" width="340">
            </el-table-column>
            <el-table-column prop="placecounts" label="景点数" width="180">
            </el-table-column>
            <el-table-column prop="administrators" label="管理员" width="180">
            </el-table-column>
            <el-table-column prop="operation" label="操作">
                  <template slot-scope="scope">
                        <!-- size:尺寸 // plain:是否朴素按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" plain circle @click="ShowEditProvinceDio(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" plain circle @click="deleteProvince(scope.row)"></el-button>
                        <el-tooltip class="item" effect="dark" content="分享" placement="top">
                              <el-button type="primary" icon="el-icon-share" size="mini" plain circle @click="showShareProvinceMsgBox()"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="查看景点" placement="top">
                              <!-- <el-button>上边</el-button> -->
                              <el-button type="warning" icon="el-icon-star-off" size="mini" plain circle @click="toTravelsList(scope.row.id)"></el-button>
                        </el-tooltip>
                        
                  </template>
            </el-table-column>
      </el-table>

      <!-- 编辑用户对话框 -->
      <el-dialog title="修改省份信息" :visible.sync="dialogFormVisibleEdit">
            <el-form :model="editProvinceList" ref="editProvinceList">
                  <el-form-item label="省份ID" label-width="100px">
                        <el-input v-model="editProvinceList.id" disabled autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="省份名" label-width="100px">
                        <el-input v-model="editProvinceList.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="标志物" label-width="100px">
                        <el-input v-model="editProvinceList.tags" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="景点数" label-width="100px">
                        <el-input v-model="editProvinceList.placecounts" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="管理员" label-width="100px">
                        <el-input v-model="editProvinceList.administrators" disabled autocomplete="off"></el-input>
                  </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                  <el-button type="primary" @click="editProvince('editProvinceList')">确 定</el-button>
            </div>
      </el-dialog>

      <!-- 分页 -->
      <!-- <el-pagination class="fenye" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="rows" layout="total, prev, pager, next, jumper" :total="totals">
      </el-pagination> -->
      <div id="pages">
            共{{totals}}条
            <a href="javascript:;" @click="findAll(page-1)" v-if="page>1" class="page">&lt;上一页</a>
            <a href="javascript:;" v-if="page==1" disabled>&lt;上一页</a>
            <a class="page" href="javascript:;" v-for="indexpage in totalPage" @click="findAll(indexpage)" v-text="indexpage"></a>
            <a href="javascript:;" v-if="page==totalPage" class="page">下一页&gt;</a>
            <a href="javascript:;" v-if="page<totalPage" @click="findAll(page+1)" class="page">下一页&gt;</a>
      </div>
</el-card>
</template>

<script>
export default {
      data() {
            return {
                  query: '',
                  dialogFormVisibleAdd: false,
                  dialogFormVisibleEdit: false,
                  province: [],
                  //分组相关数据
                  page: 1,
                  rows: 7,
                  totalPage: 0,
                  totals: 0,
                  addProvinceList: [],
                  editProvinceList: [],
                  name: [],
                  // 表单验证规则
                  rules: {
                        name: [{ required: true, message: '请输入省份名称', trigger: 'blur' }],
                        tags: [{ required: true, message: '请输入景点标志', trigger: 'blur' }],
                        // placecounts: [{ required: true, message: '请输入景点数量', trigger: 'blur' }],
                        administrators: [{ required: true, message: '请输入管理员,必须为admin', trigger: 'blur' }]
                  },
                  id:"",
                  // ShareQQ: require('../asstes/images/qq.jpg'),
            }
      },
      computed: {
            //搜索功能函数
            warnList: function () { //数据源定义一个函数
                  var search = this.search; //定义search保存input输入的数据
                  if (search) { //判断search里面的数据
                        return this.nList.filter(function (product) { //这里返回的nlist是通过get获取的数据
                              return Object.keys(product).some(function (key) {
                                    return String(product[key]).toLowerCase().indexOf(search) > -1
                              })
                        })
                  }
                  return this.nList; //返回nlist数据
            }
      },

      methods: {
            // 搜索功能
            loadProviceList() {
                  this.findAll()
            },
            searchProvince() {                
                  // axios.get("http://localhost:8081/api/province/findOne").then((res) => {
                  //       console.log(res.data);
                  //       _this.province = res.data;
                  // });
                  var search = this.query;
                  if (search) {
                        this.province = this.province.filter(function (province) { // filter - 过滤
                              // console.log(province,'过滤信息')
                              return Object.keys(province).some(function (key) {
                                    // console.log(key,'字段')
                                    return String(province[key]).toLowerCase().indexOf(search) > -1
                              })
                        })
                  }
            },

            //查询所有
            findAll(indexpage) {
                  if (indexpage) {
                        this.page = indexpage;
                  }
                  const _this = this;
                  axios.get("http://localhost:8081/api/province/findByPage?page=" + this.page).then((res) => {
                        _this.province = res.data.province;
                        _this.page = res.data.page;
                        _this.totalPage = res.data.totalPage;
                        _this.totals = res.data.totals;
                  });
            },
            // 添加省份
            addProvince(addProvinceForm) {
                  this.dialogFormVisibleAdd = false
                  const _this = this
                  this.$refs[addProvinceForm].validate((valid) => {
                        if (valid) {
                              axios.post("http://localhost:8081/api/province/save", this.addProvinceList).then((res) => {
                                    // console.log(res)
                                    if (res.data.state) {
                                          _this.$message.success("添加成功")
                                          this.findAll()
                                    } else {
                                          _this.$message.error(res.data.msg);
                                    }
                              });
                        } else {
                              // console.log('error submit!!');
                              return false;
                        }
                  });
            },
            // 点击添加省份按钮显示弹出框
            showAddProvinceDia() {
                  this.addProvinceList = {}
                  this.dialogFormVisibleAdd = true
            },
            // 重置省份信息
            resetForm(addProvinceForm) {
                  this.$refs[addProvinceForm].resetFields();
            },
            //编辑省份 - 显示对话框
            ShowEditProvinceDio(row) {
                  localStorage.setItem("pid",row.id);
                  this.editProvinceList = row
                  this.dialogFormVisibleEdit = true
            },
            editProvince(editProvinceList) {
                  // 1.关闭编辑用户对话框
                  this.dialogFormVisibleEdit = false
                  const _this = this
                  this.$refs[editProvinceList].validate((valid) => {
                        if (valid) {
                              axios.post('http://localhost:8081/api/province/update', this.editProvinceList).then(function (resp) {
                                    // console.log(resp)
                                    if (resp.data.msg) {
                                          _this.$alert('<' + _this.editProvinceList.name + '>修改成功!', '省份', {
                                                confirmButtonText: '确定',
                                                callback: action => {
                                                      _this.$message({
                                                            message: '修改成功',
                                                            type: 'success'
                                                      });
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

            // 删除省份 根据id删除
            deleteProvince(row) {
                  this.$confirm('删除省份?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                  }).then(async () => {
                        //发送删除请求
                        const _this = this
                        axios.get('http://localhost:8081/api/province/delete?id=' + row.id).then(function (resp) {
                              _this.$alert('<' + row.name + '>删除成功!', '删除用户', {
                                    callback: action => {
                                          _this.$message({
                                                message: '删除成功',
                                                type: 'success'
                                          });
                                          // 重新加载当前列表
                                          _this.findAll();
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
            showShareProvinceMsgBox(){
                this.$confirm('分享到:'+ this.ShareQQ ,'提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
            },
            toTravelsList(pid){
                  localStorage.setItem("pid",pid)
                  this.$router.push("/travellist")
            }
      },
      created() {
            // this.id=localStorage.getItem("pid");
            this.findAll(this.id);
            // this.searchProvince(this.name);
      },
      mounted() {
            const _this = this
            _this.province = this.province
            _this.searchProvince()
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

.fenye {
      /* margin-top: 20px; */
      padding-top: 20px;
}

#pages {
      text-align: center;

      padding-top: 15px;
}

.page {
      min-width: 50px;
      display: inline-block;
      /* color: black; */
}
</style>
