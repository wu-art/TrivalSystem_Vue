<template>
  <el-card class="card-login">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>景点数据展示</el-breadcrumb-item>
      <el-breadcrumb-item>旅游数据可视化</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="pieCharts">
      <div id="pieMain"></div>
      <div class="barCharts" id="main"></div>
    </div>
  </el-card>
</template>

<script>
// import echarts from "echarts";
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  data() {
    return {};
  },
  mounted() {
    this.pieTu();
    this.barTu();
  },
  methods: {
    pieTu() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("pieMain"));
      myChart.setOption({
        //标题设置，link对标题设置链接
        title: {
          text: "全国各省5A级旅游景点数据",
          link:
            "http://www.360doc.com/content/19/0711/11/43304741_848033602.shtml",
          subtext: "2019各省旅游数据",
          left: "center",
        },
        //
        tooltip: {
          trigger: "item",
        },
        visualMap:[{
            type: "piecewise",
            show: true,
            pieces:[
                  {min: 20,color:'#1111EE'}, // 不指定 max，表示 max 为无限大（Infinity）。
                  {min: 16, max: 19,color:'#3CC457'},
                  {min: 11, max: 15,color:'#D52BB3'},
                  {min: 7, max: 10,color:'#FF0000'},
                  {min: 4, max: 6,color:'#D5D52B'},
                  {min: 1, max: 3,color:'#7B8877'},
            ],
            imRange: {
                  symbol: "rect", //矩形
                  color: ["#2222DD","#DD2222"]
            }
        }],
        //图例
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        // },
        series: [
          {
            name: "数量",
            radius: "50%",
            type: "pie",
            data: [
              { value: 23, name: "江苏省" },{ value: 17, name: "浙江省" },{ value: 13, name: "河南省" },
              { value: 12, name: "新疆" },{ value: 12, name: "四川" },{ value: 13, name: "广东" },
              { value: 11, name: "山东省" },{ value: 11, name: "安徽省" },{ value: 11, name: "湖北省" },
              { value: 11, name: "江西省" },{ value: 9, name: "福建" },{ value: 9, name: "陕西省" },
              { value: 8, name: "云南" },{ value: 8, name: "重庆" },{ value: 8, name: "湖南" },
              { value: 9, name: "河北" },{ value: 7, name: "北京" },{ value: 8, name: "山西" },
              { value: 6, name: "海南" },{ value: 6, name: "吉林" },{ value: 6, name: "广西" },
              { value: 6, name: "贵州" },{ value: 5, name: "黑龙江" },{ value: 5, name: "辽宁" },
              { value: 4, name: "宁夏" },{ value: 4, name: "西藏" },{ value: 4, name: "甘肃" },
              { value: 3, name: "上海" },{ value: 5, name: "内蒙古" },{ value: 3, name: "青海" },
              { value: 2, name: "天津" },
            ],
            //鼠标移入高亮显示
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    //条形图
    barTu() {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          text: "全国5A级景点",
          subtext: "数据来自网络",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["2020年", "2019年"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          data: ["苏", "浙", "豫、新、川、粤、鲁、皖", "京、晋、冀、湘、渝、滇、陕、闽、赣",
                 "琼、桂、吉、黔、黑、辽、宁、甘、藏", "沪、内蒙古、青、津"],
        },
        series: [
          {
            name: "2020年",
            type: "bar",
            data: [23, 16, 11, 8, 4, 3],
          },
          {
            name: "2019年",
            type: "bar",
            data: [23, 17, 13, 10, 6, 3],
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.card-login {
  height: 100%;
}
.pieCharts {
  margin-top: 50px;
}
#pieMain {
  width: 700px;
  height: 500px;
  float: left;
}
.barCharts {
  /* float: right; */
  width: 500px;
  height: 500px;
  margin-left: 600px;
}
</style>
