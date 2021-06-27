<template>
<el-card>
  <el-button type="primary" @click="toOrderList()">订单列表</el-button>
  <div>
    <p>门票退订请至订单列表页面将订单删除即可...</p>
    <img src="../../assets/images/Resale.jpg" alt="" class="imgSale">
  </div>
</el-card>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods:{
    toOrderList(){
      this.$router.push('/orderList')
    }
  }

}
</script>

<style>
p{
  font-size: 30px;
  margin-left: 510px;
  margin-top: 90px;
  color: skyblue;
}
.el-card{
  height: 100%;
}
.imgSale{
  width: 300px;
  height: 300px;
  margin-left: 300px;
  /* margin-top: 100px; */
}
</style>