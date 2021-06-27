<template>
<el-card class="box-card">
      <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>管理景点信息</el-breadcrumb-item>
            <el-breadcrumb-item>景点列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 搜索框 -->
      <el-row class="searchRow">
            <el-col>
                  <el-input @clear="loadTravelList()" clearable placeholder="请输入内容" v-model="query" class="inputSearch">
                        <el-button @click="searchTravel()" slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                  <el-button @click="showAddTravelDia()" type="success">添加景点</el-button>
                  <el-button @click="routeSearch()" type="primary" class="route">线路查询</el-button>
                  <el-button @click="eatAearch()" type="primary">食宿查询</el-button>
            </el-col>
      </el-row>

      <!-- 点击添加景点弹出信息框 -->
      <!-- <el-dialog title="添加景点" :visible.sync="dialogFormVisibleAdd">
            <el-form :model="editTravelList" ref="editTravelList" :rules="addTravelsRules">
                  <el-form-item label="景点序号" label-width="100px" prop="id">
                        <el-input v-model="editTravelList.id" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="景点名称" label-width="100px" prop="name">
                        <el-input v-model="editTravelList.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="景点图片" label-width="100px" prop="picpath">
                        <el-input v-model="editTravelList.picpath" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="旺季时间" label-width="100px" prop="hottime">
                        <el-input v-model="editTravelList.hottime" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="旺季门票" label-width="100px" prop="hotticket">
                        <el-input v-model="editTravelList.hotticket" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="淡季门票" label-width="100px" prop="dimticket">
                        <el-input v-model="editTravelList.dimticket" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="景点描述" label-width="100px" prop="descript">
                        <el-input v-model="editTravelList.descript" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="省份编号" label-width="100px" prop="provinceid">
                        <el-input v-model="editTravelList.provinceid" autocomplete="off"></el-input>
                  </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                  <el-button @click="resetForm('editTravelList')">重 置</el-button>
                  <el-button type="primary" @click="addTravel('editTravelList')">确 定</el-button>
            </div>
      </el-dialog> -->

      <!-- 获取数据表格 -->
      <el-table :data="travelData" style="width: 100%">
            <!-- prop="id" -->
            <el-table-column type="index" label="#" width="60">
            </el-table-column>
            <el-table-column prop="name" label="景点名称" width="100">
            </el-table-column>
            <!-- prop="picpath"                                     -->
            <el-table-column prop="picture" label="景点图片" width="150">
                  <template slot-scope="scope">
                        <img :src="'data:image/jpg;base64,'+scope.row.picpath" width="100" height="100" />
                  </template>
            </el-table-column>
            <el-table-column prop="hottime" label="旺季时间" width="100">
            </el-table-column>
            <el-table-column prop="hotticket" label="旺季门票" width="100">
            </el-table-column>
            <el-table-column prop="dimticket" label="淡季门票" width="100">
            </el-table-column>
            <el-table-column prop="descript" label="景点描述" width="200">
            </el-table-column>
            <el-table-column prop="provinceid" label="省份编号" width="50">
            </el-table-column>
            <el-table-column prop="operation" label="操作">
                  <template slot-scope="scope">
                        <!-- size:尺寸 // plain:是否朴素按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" plain circle @click="showEditTravelDia(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" plain circle @click="showDeleteTravelMsgBox(scope.row)"></el-button>
                        <el-button type="primary" icon="el-icon-share" size="mini" plain circle @click="showShareTravelMsgBox()"></el-button>
                        <el-tooltip class="item" effect="dark" content="返回省份列表" placement="top">
                              <el-button type="warning" icon="el-icon-star-off" size="mini" plain circle @click="toProvinceList()"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="去下单" placement="top">
                              <el-button type="success" icon="el-icon-check"  size="mini" plain circle @click="toOrder(scope.row)"></el-button>
                        </el-tooltip>
                  </template>
            </el-table-column>
      </el-table>

      <!-- 编辑景点信息对话框 -->
      <el-dialog title="编辑景点" :visible.sync="dialogFormVisibleEdit">
            <el-form :model="editTravelList" ref="editTravelList">
                  <el-form-item label="景点序号" label-width="100px">
                        <el-input  v-model="editTravelList.id" autocomplete="off" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="景点名称" label-width="100px">
                        <el-input v-model="editTravelList.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="景点图片" label-width="100px"> -->
                        <!-- <el-input v-model="'data:image/jpg;base64,'+editTravelList.picpath" autocomplete="off">
                        </el-input> -->
                  <el-form-item label="景点图片" label-width="100px">
                        <label class="el-label">
                        <div style="text-align: center; padding-left: 8%">
                              <!-- id="upload-tip" -->
                              <div id="upload-tip">+</div>
                              <img :src="img" v-show="img" id="img-show" style="display: none">
                              <el-input v-model="'data:image/jpg;base64,'+editTravelList.picpath" type="file" ref="myfile" style="display:none;" @change="imgfileChange"/>
                        </div>
                        </label>
                  </el-form-item>
                        
                  <!-- </el-form-item> -->
                  <el-form-item label="旺季时间" label-width="100px">
                        <el-input v-model="editTravelList.hottime" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="旺季门票" label-width="100px">
                        <el-input v-model="editTravelList.hotticket" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="淡季门票" label-width="100px">
                        <el-input v-model="editTravelList.dimticket" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="景点描述" label-width="100px">
                        <el-input v-model="editTravelList.descript" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="省份编号" label-width="100px">
                        <el-input v-model="editTravelList.provinceid" autocomplete="off" disabled></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="管理员" label-width="100px">
                        <el-input disabled v-model="travelData.administrators" autocomplete="off"></el-input>
                  </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                  <el-button type="primary" @click="editTravel('editTravelList')">确 定</el-button>
            </div>
      </el-dialog>

      <!-- 分页 -->
      <!-- :total="travelData.length" -->
      <el-pagination class="fenye" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-size="pagesize" layout="total,prev, pager, next, jumper" :total="totals">
      </el-pagination>
      <!-- <div id="pages">
            共{{totals}}条
            <a href="javascript:;" @click="findAllTravels(page-1)" v-if="page>1" class="page">&lt;上一页</a>
            <a href="javascript:;" v-if="page==1" disabled>&lt;上一页</a>
            <a class="page" href="javascript:;" v-for="indexpage in totalPage" @click="findAllTravels(indexpage)" v-text="indexpage"></a>
            <a href="javascript:;" v-if="page==totalPage" class="page">下一页&gt;</a>
            <a href="javascript:;" v-if="page<totalPage" @click="findAllTravels(page+1)" class="page">下一页&gt;</a>
      </div> -->
</el-card>
</template>

<script>
export default {
      data() {
            return {
                  query: '',
                  img:"",
                  // dialogFormVisibleAdd: false,
                  dialogFormVisibleEdit: false,
                  //分组相关数据
                  page: 1,
                  pagesize: 3,
                  totalPage: 0,
                  totals: 0,
                  travelData: [],
                  editTravelList: [],
                  provinceId:"",
                  travelOrder:[{
                        name:"",
                        hottime:"",
                        descript:"",
                        ticket:""
                  }],
            }
      },
      created() {
            // var pId = location.href.indexOf("=") + 2;
            // let pId = location.href.substring(location.href.indexOf("=")+2);
            // this.provinceId = pId;
            this.provinceId = localStorage.getItem("pid");
            this.findAllTravels()
      },
      methods: {
            imgfileChange(){
                  const file = this.$refs.myfile.files[0]
                  this.img = window.URL.createObjectURL(file)
            },
            // 查询所有景点
            findAllTravels() {
                  const _this = this;
                  // if (index) {
                  //       _this.page = index;
                  // }
                  axios.get('http://localhost:8081/api/travels/findAllTravels?page=' + this.page+"&rows="+this.pagesize+"&provinceId="+this.provinceId).then((res) => {
                        // console.log(res)
                        _this.travelData = res.data.travels
                        _this.page = res.data.page;
                        _this.totalPage = res.data.totalPage;
                        _this.totals = res.data.counts

                  })
            },

            // 线路查询
            routeSearch() {
                  this.$router.push('/routecheck')
            },
            // 食宿查询
            eatAearch() {
                  this.$router.push('/foodcheck')
            },
            // 点击按钮 到省份页面
            toProvinceList() {
                  this.$router.push('/province')
            },

            // 搜索景点
            // 点击 × 重新获取景点列表
            loadTravelList() {
                  this.findAllTravels()
            },
            searchTravel() {
                  var search = this.query;
                  if (search) {
                        this.travelData = this.travelData.filter(function (travelData) { // filter - 过滤
                              // console.log(province,'过滤信息')
                              return Object.keys(travelData).some(function (key) {
                                    // console.log(key,'字段')
                                    return String(travelData[key]).toLowerCase().indexOf(search) > -1
                              })
                        })
                  }
            },
            // searchTravel(){
            //       axios.get('http://localhost:8081/api/travels/findOne?id='+this.editTravelList.id).then((res)=>{
            //             console.log(this.editTravelList.id)
            //             console.log(res)
            //             this.findAllTravels()
            //       })
            // },

            // 添加景点
            showAddTravelDia() {
                  this.$router.push("/addTravel")
                  // this.editTravelList = {}
                  // this.dialogFormVisibleAdd = true
            },
            // 重置信息
            // resetForm(editTravelList) {
            //       this.$refs[editTravelList].resetFields();
            // },
            // addTravel(editTravelList) {
            //       this.dialogFormVisibleAdd = false
            //       const _this = this
            //       this.$refs[editTravelList].validate((valid) => {
            //             if (valid) {
            //                   axios.post("http://localhost:8081/api/travels/save", this.editTravelList).then((res) => {
            //                         console.log(res)
            //                         if (res.data.state) {
            //                               _this.$message.success("添加成功")
            //                               this.findAllTravels()
            //                         } else {
            //                               _this.$message.error(res.data.msg);
            //                         }
            //                   });
            //             } else {
            //                   // console.log('error submit!!');
            //                   return false;
            //             }
            //       });
            // },
            // 分页
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange(val) {
                  // console.log(`每页 ${val} 条`);
                  this.pagesize = val
                  this.findAllTravels()
            },
            // 当当前页改变
            handleCurrentChange(val) {
                  // console.log(`当前页: ${val}`);
                  this.page = val
                  this.findAllTravels()
            },
            // 编辑景点信息
            showEditTravelDia(row) {
                  // localStorage.setItem("placeid",row.id);
                  this.editTravelList = row
                  this.dialogFormVisibleEdit = true
            },
            editTravel(editTravelList) {
                  // 1.关闭编辑用户对话框
                  this.dialogFormVisibleEdit = false
                  const _this = this
                  this.$refs[editTravelList].validate((valid) => {
                        if (valid) {
                              axios.post('http://localhost:8081/api/travels/update', this.editTravelList).then(function (resp) {
                                    // console.log(resp)
                                    if (resp.data.msg) {
                                          _this.$alert('<' + _this.editTravelList.name + '>修改成功!', '省份', {
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
            // 删除景点
            showDeleteTravelMsgBox(row) {
                  this.$confirm('删除景点?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                  }).then(async () => {
                        //发送删除请求
                        const _this = this
                        axios.get('http://localhost:8081/api/travels/delete?id=' + row.id).then(function (resp) {
                              // console.log(resp)
                              _this.$alert('<' + row.name + '>删除成功!', '删除用户', {
                                    callback: action => {
                                          _this.$message({
                                                message: '删除成功',
                                                type: 'success'
                                          });
                                          // 重新加载当前列表
                                          _this.findAllTravels();
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
            //跳转到订单页面
            toOrder(row){
                  this.$router.push("/ticketsale");
                  // this.travelOrder.name= row.name;
                  // this.travelOrder.hottime=row.hottime;
                  // this.travelOrder.ticket=row.hotticket;
                  // this.travelOrder.descript=row.descript;
                  // console.log(this.travelOrder);
                  var arr = [];
                  arr[0] = row.name;
                  arr[1] = row.hottime;
                  arr[2] = row.hotticket;
                  arr[3] = row.descript;
                  //将所要提交的景点订单信息保存到本地tookie中,在ticketsale中再拿出使用;
                  localStorage.setItem("key",JSON.stringify(arr));
            }
      },
}
</script>

<style>
.box-card {
      height: 100%;
}

.searchRow {
      margin-top: 20px;
}

/* .route{
     margin-left: 50px;
} */
.inputSearch {
      width: 400px;
}

/* .fenye {
      padding-top: 20px;
} */
#pages {
      text-align: center;

      padding-top: 15px;
}

.page {
      min-width: 50px;
      display: inline-block;
      /* color: black; */
}
#upload-tip {
  border: 1px dashed #d9d9d9;
  width: 135px;
  height: 135px;
  line-height: 135px;
  cursor: pointer;
  font-size: 36px;
  color: #d9d9d9;
}

#img-show {
  width: 135px;
  height: 135px;
  display: block;
  margin: -136px auto;
  object-fit: cover;
}
</style>
