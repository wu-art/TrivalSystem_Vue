<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>景点订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>门票预售</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 数据展示 -->
    <el-table
      ref="orderData"
      :data="orderData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <!-- <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column> -->
      <!-- <el-table-column type="index" label="#" width="40"> </el-table-column> -->
      <el-table-column prop="id" label="#" width="40"> </el-table-column>
      <el-table-column prop="travelName" label="景点名" width="70">
      </el-table-column>
      <el-table-column prop="travelTime" label="旅游时间" width="100">
      </el-table-column>
      <el-table-column prop="ticket" label="门票" width="50"></el-table-column>
      <el-table-column
        prop="username"
        label="订票人"
        width="70"
      ></el-table-column>
      <el-table-column
        prop="tel"
        label="联系方式"
        width="115"
      ></el-table-column>
      <el-table-column
        prop="orderType"
        label="类型"
        width="60"
      ></el-table-column>
      <!-- show-overflow-tooltip   文字过多时在一行显示，鼠标指向时显示 -->
      <el-table-column
        prop="descript"
        label="景点描述"
        width="130"
      ></el-table-column>
      <el-table-column label="订单状态" width="80">
        <template slot-scope="scope">
          <el-switch @change="changeSwitch($event,scope.row)" v-model="scope.row.payState" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="medium" @click="editOrderDia(scope.row)"></el-button>
        <el-button type="primary" icon="el-icon-delete" size="medium"
          @click="deleteOrder(scope.row)"></el-button>
        <el-button class="btn1" type="primary" size="medium" @click="toPay()">去支付</el-button>
        <el-button class="btn2" type="primary" size="medium" @click="toTravelList()" >景点列表</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- //编辑订单信息 -->
    <el-dialog title="编辑订单信息" :visible.sync="dialogFormVisibleEdit">
            <el-form :model="editOrderData" ref="editOrderData">
                  <el-form-item label="景点名称" label-width="100px">
                        <el-input v-model="editOrderData.travelName" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="景点门票" label-width="100px">
                        <el-input v-model="editOrderData.ticket" autocomplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="联系方式" label-width="100px">
                        <el-input v-model="editOrderData.tel" autocomplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="旅游类型" label-width="100px">
                    <el-select v-model="editOrderData.orderType" placeholder="请选择" class="ordertype">
                      <el-option label="单人" value="单人"></el-option>
                      <el-option label="团购" value="团购"></el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item label="景点描述" label-width="100px">
                        <el-input v-model="editOrderData.descript" autocomplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="订单状态" label-width="100px">
                        <el-input v-model="editOrderData.id" autocomplete="off"></el-input>
                  </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                  <el-button type="primary" @click="editOrder('editOrderData')">确 定</el-button>
            </div>
      </el-dialog>
    <div style="margin-top: 20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[4, 5, 6, 7]"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totals">
      </el-pagination>
      <el-button class="quXiao" @click="toggleSelection(orderData)">批量删除</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisibleEdit:false,
      //分页
      totals: 0, //总条数
      pageSize: 6, //每页的条数
      currentPage: 1, //当前页
      orderData: [],
      editOrderData:[],
      multipleSelection: [],
    }
  },
  methods: {
    changeSwitch (bool,data) {
      // console.log(bool)
      // console.log(data)
      this.editOrderData=data;
      // console.log(this.editOrderData);
      const that=this;
      axios.post("http://localhost:8081/api/order/update",this.editOrderData).then((res)=>{
        // console.log(res)
        if(res.data.state){
          that.$message.success("修改状态成功");
        }else{
          console.log('error!')
          return false;
        }
      })
    },
    toPay(){
      this.$router.push("/payOrder")
    },
    //批量删除按钮
    toggleSelection(row) {
      // console.log(row.id)
    },
    //表格多选框按钮
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },
    //接收后台数据
    findAllOrder() {
      axios
        .get("http://localhost:8081/api/order/findOrder?page="+this.currentPage+"&rows="+this.pageSize,this.orderData).then((res) => {
          // console.log(res);
          this.orderData = res.data.order;
          this.totals = res.data.totals;
          this.currentPage = res.data.page;
          this.pageSize = res.data.rows;
        });
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.findAllOrder();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.findAllOrder();
      console.log(`当前页: ${val}`);
    },
    //删除
    deleteOrder(row) {
      this.$confirm("确定删除订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const _this = this;
        axios
          .get("http://localhost:8081/api/order/delete?id=" + row.id)
          .then((res) => {
            _this.$alert(row.id + "号订单删除成功!", "删除订单", {
              callback: (action) => {
                _this.$message({
                  message: res.data.msg,
                  type: "success",
                });
                // 重新加载当前列表
                _this.findAllOrder();
              },
            });
          });
      }).catch(()=>{
        this.$message({
          type:'info',
          message:"已取消删除"
        });
      })
    },
    toTravelList() {
      this.$router.push("/travelList");
    },
    editOrderDia(row){
      this.editOrderData = row
      this.dialogFormVisibleEdit = true
    },
    //编辑订单
    editOrder(editOrderData){
      this.dialogFormVisibleEdit = false
      const _this = this
      this.$refs[editOrderData].validate((valid) => {
        if(valid){
          axios.post("http://localhost:8081/api/order/update",this.editOrderData).then((res)=>{
            if(res.data.state){
              _this.$alert(this.editOrderData.travelName + '修改成功!', '订单', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$message({
                      message: res.data.msg,
                      type: 'success'
                    });
                  }
              })
            }
          })
        }else{
          console.log("error!")
          return false;
        }
      })
    }
  },
  created() {
    this.findAllOrder();
  },
};
</script>

<style>
.box-card {
  height: 100%;
}
.el-table {
  margin-top: 20px;
}
.quXiao {
  width: 90px;
  position: absolute;
  margin-top: -40px;
  padding: 12px;
}
.el-pagination {
  margin-left: 100px;
}
.btn1 {
  padding: 10px;
  width: 70px;
}
.btn2 {
  padding-left: 6px;
  width: 70px;
}
</style>