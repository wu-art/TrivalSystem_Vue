<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理景点信息</el-breadcrumb-item>
      <el-breadcrumb-item>景点列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 获取数据表格 -->
    <!-- <el-table :data="travelData" style="width: 100%">                                  -->
      <!-- <el-table-column prop="title" label="城市" width="120">
      </el-table-column> --> 
      <!-- <el-table-column prop="district" label="市区" width="120">
      </el-table-column>
      <el-table-column prop="business" label="景点名" width="120">
      </el-table-column> -->
      <!-- </el-table> -->
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      travelData: [
        // {
        // title:'',
        // // district:'',
        // // business:''
        // }
      ],
    };
  },
  mounted(){
    this.getT();
  },
  methods: {
    getT(){
      let arr=[];
      arr=localStorage.getItem("arrT");
      // this.travelData[0].district=localStorage.getItem("District");
      // this.travelData[0].business=localStorage.getItem("Business");
      // console.log(arr);
    }
  }
};
</script>

<style>

</style>
