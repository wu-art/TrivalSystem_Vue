<template>
  <el-card class="card">
      <div class="map">
        <div ref="myCharts" class="myMap"></div>
      </div>
      <el-table :data="tableData">
            <el-table-column prop="currentTotal" label="病例总数"></el-table-column>
            <el-table-column prop="deahTotal" label="死亡人数"></el-table-column>
            <el-table-column prop="addTotal" label="新增病例"></el-table-column>
            <el-table-column prop="gTotal" label="全球病例"></el-table-column>
            <el-table-column prop="gDeath" label="全球死亡病例"></el-table-column>
      </el-table>
  </el-card>
</template>

<script>
import echarts from 'echarts'
import jsonp from 'jsonp'
import 'echarts/map/js/china'
const option = {
      title:{
            text: "我国实时疫情可视化地图",
            link: "https://www.baidu.com",
            subtext: "疫情地图",
            sublink: "https://www.baidu.com"
      },
      series:[{
            name:"确诊人数",
            type:"map",
            map:"china",
            label:{
                  show: true,
                  color: "#333",
                  fontSize: 10
            },
            roam: true,
            zoom: 1.2,
            data: [], //数据 {name:'',value:''}
            itemStyle:{//地图区域的多边形的样式
                  areaColor: "#eee",
                  borderColor: "green"
            },
            //高亮展示
            emphasis: {
                  color: "#fff",
                  fontSize: 12
            },
            itemStyle: {
                  areaColor: "#83b5e7"
            }
      }],
      tooltip: {
            trigger: "item"
      },
      visualMap:[{
            type: "piecewise",
            show: true,
            pieces:[
                  {min: 10000}, // 不指定 max，表示 max 为无限大（Infinity）。
                  {min: 1000, max: 9999},
                  {min: 100, max: 999},
                  {min: 10, max: 99},
                  {min: 1, max: 9},
                 // {value: 123, label: '123（自定义特殊颜色）', color: 'grey'}, // 表示 value 等于 123 的情况。
                  //{max: 5}     // 不指定 min，表示 min 为无限大（-Infinity）。
            ],
            imRange: {
                  symbol: "rect", //矩形
                  color: ["#ffc0b1","#9c0505"]
            }
      }]
}
export default {
      data(){
            return{
                  tableData:[{
                        currentTotal: "",
                        deahTotal: "",
                        addTotal: "",
                        gTotal: "",
                        gDeath: ""
                  }]
            }
      },
      mounted(){ //template挂载到页面时调用
            this.getData()
            this.mycharts = echarts.init(this.$refs.myCharts)
            this.mycharts.setOption(option)
      },
      methods:{
            getData(){
                  jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json?=1580892522427',{},(err,data)=>{
                        if(!err){
                              // console.log(data)
                              this.tableData[0].currentTotal=data.data.curetotal;
                              this.tableData[0].deahTotal=data.data.deathtotal;
                              this.tableData[0].addTotal=data.data.add_daily.wjw_addsus_new;
                              this.tableData[0].gTotal=data.data.othertotal.certain;
                              this.tableData[0].gDeath=data.data.othertotal.die;
                        }
                        var list = data.data.list.map(item =>{
                              return {
                                    name:item.name,value:item.value
                              }
                        })
                        option.series[0].data=list
                        
                        this.mycharts.setOption(option)
                  })
            }
      }

}
</script>

<style>
.card{
      height: 100%;
      background: linear-gradient(#1d4978, #081630);
}
.map{
      margin-left: 200px;
}
.myMap{
      width: 800px;
      height: 500px;  
}
/* .el-table{
      margin-bottom: 50px;
} */
</style>