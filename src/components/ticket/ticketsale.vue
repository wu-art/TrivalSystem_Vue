<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>景点订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>门票预售</el-breadcrumb-item>
    </el-breadcrumb>

    <el-tabs type="border-card">
    <el-tab-pane>
        <span slot="label"><i class="el-icon-user"></i> 单人购票</span>
        <el-form :inline="true" :label-position="labelPosition" label-width="80px" :model="formLabelAlign" ref="formLabelAlign" :rules="rules">
            <el-form-item label="景点名称" prop="travelName">
              <el-input v-model="formLabelAlign.travelName"></el-input>
            </el-form-item>
          <!-- prop中的属性值,与input中的v-model值一致，不然就算输入正确的信息，表单验证提示依旧会在 -->
          <el-form-item label="下单时间" prop="travelTime">
            <el-date-picker
              v-model="formLabelAlign.travelTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="预售门票" prop="ticket">
            <el-input v-model="formLabelAlign.ticket"></el-input>
          </el-form-item>
          <el-form-item label="订单类型" prop="orderType">
            <el-select v-model="formLabelAlign.orderType" placeholder="请选择" class="ordertype">
              <el-option label="单人" value="单人"></el-option>
              <el-option label="团购" value="团购"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式" prop="tel">
            <el-input v-model="formLabelAlign.tel"></el-input>
          </el-form-item>
          <el-form-item label="购票人" prop="username">
            <el-input v-model="formLabelAlign.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="景点描述" prop="descript">
            <el-input type="textarea" v-model="formLabelAlign.descript" class="inputarea"></el-input>
          </el-form-item>
          <el-form-item label="订单状态" prop="payState">
            <el-select v-model="formLabelAlign.payState" placeholder="请选择">
              <el-option label="已支付" value="true"></el-option>
              <el-option label="未支付" value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button type="primary" @click="addOrder('formLabelAlign')">加入收藏</el-button>
          <el-button type="primary" @click="toPay()" style="margin:20px">去支付...</el-button>
          <el-button type="primary" @click="toOrderList()" style="margin:20px">订单列表</el-button>
          <el-button type="primary" @click="toTravelList()">景点列表</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane class="nav_two">
        <span slot="label"><i class="el-icon-s-custom"></i> 组团购票</span>
        <!-- 消息列表 -->
        <ol>
          <li v-for="item in teamMsg">{{item.msg}}</li>
        </ol>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-bell"></i> 消息中心</span>
        <el-alert v-for="item in tripMsg" :key="item.type" :title="item.msg" :type="item.type" show-icon></el-alert>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-magic-stick"></i> 购票须知</span>
        <div class="buymsg">
          <el-alert v-for="item in buyMsg" :key="item.index" :title="item.msg" type="info" show-icon></el-alert>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "left",
      teamMsg:[
        {msg:"组团购票时，需要填写团队中每个人的姓名;"},
        {msg:"填写其他信息时，只需要填写一个领导人的信息即可;"},
        {msg:"出票出一张团体票;"},
        {msg:"紧跟团队，不要掉团，安全第一!"},
        {msg:"..."},
      ],
      tripMsg:[
        {msg:"今天门票已经售完!",type:"info"},
        {msg:"有熊出没,请时刻注意安全!",type:"warning"},
        {msg:"有熊出没,请时刻注意安全!",type:"success"},
        {msg:"有熊出没,请时刻注意安全!",type:"error"},
      ],
      buyMsg:[
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
        {msg:"今天门票已经售完!"},
        {msg:"有熊出没,请时刻注意安全!"},
      ],
      formLabelAlign: {
        travelName: "",
        travelTime: "",
        descript: "",
        ticket: "",
        username: "",
        tel:"",
        orderType:"",
        payState:"",
      },
      rules:{
        travelName: [{ required: true, message: '请输入景点名', trigger: 'blur' }],
        travelTime: [{ required: true, message: '请选择出行时间', trigger: 'blur' }],
        descript: [{ required: true, message: '景点描述', trigger: 'blur' }],
        ticket: [{ required: true, message: '景点门票', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入联系方式,最大长度11位', trigger: 'blur' }],
        username: [{ required: true, message: '请输入订单人姓名', trigger: 'blur' }],
        orderType: [{ required: true, message: '请选择订单类型', trigger: 'blur' }],
        payState: [{ required: true, message: '请选择订单状态', trigger: 'blur' }]
      },
    };
  },
  methods:{
    findAll(){
      var travelArr =  JSON.parse(localStorage.getItem('key'));
      // console.log(travelArr)
      this.formLabelAlign.travelName = travelArr[0];
      // this.formLabelAlign.travelTime = travelArr[1];
      this.formLabelAlign.ticket = travelArr[2];
      this.formLabelAlign.descript = travelArr[3];
      // console.log(this.formLabelAlign)
    },
    //添加订单
    addOrder(formLabelAlign){
      const _this=this
      this.$refs[formLabelAlign].validate((valid)=>{
        if(valid){
          axios.post("http://localhost:8081/api/order/save",this.formLabelAlign).then((res)=>{
            if(res.data.state){
              _this.$message.success(res.data.msg);
            }else{
              _this.$message.error(res.data.msg);
            }
          })
        }else{
          return false;
        }
      })
    },
    //支付
    toPay() {
      const _this=this;
      _this.$confirm('共计'+this.formLabelAlign.ticket+'人名币,确定支付?', '支付提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //未调用支付接口,默认进入到这个支付页面就算支付完成
          this.formLabelAlign.payState=true;
          // var payState = this.formLabelAlign.payState;
          // localStorage.setItem("pay",payState);
          axios.post("http://localhost:8081/api/order/save",this.formLabelAlign).then((resp)=>{
            if(resp.data.state){
              // _this.$message.success("支付成功!");//payOrder中设置
            }else{
              _this.$message.error("支付失败!");
            }
          })
          this.$router.push("/payOrder")
          // _this.$message({
            
          //   // type: 'success',
          //   // message: '支付成功!'
          // });
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消支付'
          });          
        });
      var currentTicket = this.formLabelAlign.ticket;
      localStorage.setItem("pay",currentTicket);
    },
    toOrderList(){
      this.$router.push("/orderList");
    },
    toTravelList(){
      this.$router.push("/travelList");
    }  
  },
  created(){
    this.findAll();
  }
};
</script>

<style>
.el-tabs{
  width: 100%;
  margin-top: 20px;
  height: 540px;
}
.box-card {
  height: 100%;
}
.el-form {
  margin-top: 20px;
  margin-left: 200px;
}
/* 时间选择框属性 */
.el-date-editor.el-input{
  width: 206px;
}
.btn {
  margin-left: 275px;
}
.ordertype{
  width: 206px;
}
.inputarea{
  width: 508px;
}
.nav_two ol li{
  font-size: 18px;
  font-family: "楷体";
  background-color: skyblue;
}
.buymsg{
  width: 100%;
  height: 450px;
  padding-left: 0px;
  overflow: auto;
}
</style>