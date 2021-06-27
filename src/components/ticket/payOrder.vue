<template>
  <el-card class="box-card"
    v-loading="loading"
    element-loading-text="拼命支付中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
        <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>景点门票管理</el-breadcrumb-item>
      <el-breadcrumb-item>门票支付</el-breadcrumb-item>
    </el-breadcrumb>
     
    <div class="qian">共需支付--{{money}}--元(人名币)...</div>
    <img src="../../assets/images/money.gif" alt="" class="imgMoney">
    <img src="../../assets/images/pay.png" alt="" class="payImg">
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      money:'',
      loading:true,
      timer: ''  // 定时器名称  
      
      }
  },
  methods:{
        find(){
            var money = localStorage.getItem("pay");
            this.money=money;
        },
  },
  created(){
        this.find();
  },
  mounted(){ 
    var _this=this  
    this.timer = setTimeout(function(){_this.loading=false,_this.$message.success('支付成功!')}, 5000)
  },
  //销毁计时器
  beforeDestroy() {
      clearInterval(this.timer);
  }
};
</script>

<style>
.qian{
      margin-left: 350px;
      margin-top: 50px;
      font-size: 30px;
      color: blue;
}
.imgMoney{
      margin-top: 100px;
      width: 300px;
      height: 300px;
}
.payImg{
  width: 300px;
  height: 300px;
  margin-left: 300px;
}
</style>