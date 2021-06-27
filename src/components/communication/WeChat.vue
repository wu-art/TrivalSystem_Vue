<template>
  <div class="main">
    <!-- 头部 -->
    <div class="header">
      <div class="header-left" id="time"></div>
      <div class="header-cen">
        <h1>基于web旅游后台管理系统</h1>
      </div>
      <div class="header-right">
        <el-button type="primary" @click="login()">登录</el-button>
      </div>
    </div>

    <!-- 左边内容 -->
    <div class="content-left">
      <!--左上-->
      <div class="left-top">
        <div class="title">
          <span>基本信息</span>
        </div>
        <div class="list">
          <p>
            当日暮西山夜色渐晚，万物隐没在金色的夕阳中，你是晚霞撕裂出的剪影，
            你是飞鸟勾勒出的水墨，你是夜晚柔软的梦。当北风呼啸，山川盛着银装时，
            冬天来了。辛劳的冬姑娘为麦苗盖上厚厚的棉被，为大地铺上银色的厚地毯，
            小伙伴们在银色的世界里打雪仗堆雪人，无忧无虑的跑着笑着，尽情地游戏着。
          </p>
          <ul>
            <li>平均旅游人数：1168万/年</li>
            <li>旅游火爆省份：云南</li>
            <li>平均旅游产值：44989亿/年</li>
            <li>较去年增长率：1.2%</li>
            <li>旅游时间阶段：5~9月/年</li>
            <li>旅游景点数量：5000+/个</li>
          </ul>
        </div>
      </div>

      <!-- 左下 -->
      <div class="left-center">
        <div class="title">
          <span>景点类别</span>
        </div>
        <div class="allnav" id="ceshi"></div>
      </div>
    </div>

    <!-- 中部 -->
    <div class="center-top">
      <div class="top-title">
        <ul>
          <li>
            <p>景点数据</p>
            <span>3</span>
            <span>6</span>
            <span>5</span>
            <b>个</b>
          </li>
          <li>
            <p>已接入</p>
            <span>8</span>
            <span>3</span>
            <b>%</b>
          </li>
        </ul>
      </div>
      <div class="top-bottom">
        <!-- 地图 -->
        <div class="allnav" id="ceshi1"></div>
      </div>
      <p class="p1">
        不寒不暖花时，妆点西湖似西施。潮平两岸阔，风正一帆悬。&copy;景点视图展示|author：MisWu
      </p>
    </div>

    <!-- 右上 -->
    <div class="content-right fr">
      <!--右上-->
      <div class="right-top">
        <!--选项卡内容-->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="火热景点" name="first">
            <ul>
              <h3>本溪市景点</h3>
              <li>本溪水洞</li>
              <li>关门山国家公园</li>
              <li>五女山</li>
              <li>望天洞</li>
              <li>本溪水洞</li>
              <li>本溪摩天岭</li>
              <li>本溪水洞</li>
              <li>本溪天龙洞</li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="平均信息" name="second">
            <ul>
              <h3>基本信息</h3>
              <li><span>5A级：<strong>1</strong>个</span></li>
              <li><span>4A-3A级：<strong>3</strong>个</span></li>
              <li><span>均价：<strong>50~100</strong>元</span></li>
              <li><span>旺季时间：<strong>5~6</strong>月/年</span></li>
              <li><span>淡季门票：<strong>30~50</strong>元</span></li>
              <li><span>景点类型：<strong>湖泊，山脉</strong></span></li>
              <li><span>特色景点：<strong>本溪水洞</strong></span></li>
              <li><span>旅游量：<strong>2625</strong>万人次</span></li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="产值信息" name="third">
            <ul>
              <h3>基本信息</h3>
              <li><span>景点数：<strong>1000~</strong>个</span></li>
              <li><span>总面积：<strong>8411</strong>km2</span></li>
              <li><span>总人口：<strong>155.97</strong>万人</span></li>
              <li><span>穷游：<strong><120</strong>元/天</span></li>
              <li><span>小资：<strong>120~500</strong>元/天</span></li>
              <li><span>土豪：<strong>>500</strong>元/天</span></li>
              <li><span>均总收入：<strong>33.29</strong>亿元</span></li>
              <li><span>同比增长：<strong>9.6</strong>%</span></li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="其他信息" name="fourth">
            <ul>
              <h3>其他信息</h3><br>
                <span style="font-size:13px;color:#029698;margin-top:10px;">
                本溪位于辽宁省，是一个旅游资源非常丰富的地方，去辽宁旅游的必去之地，
                本溪景点有将近1000多个，这里的本溪水洞是亚洲较大的天然溶洞，景观是非
                常壮观的，让你不禁感叹大家的鬼斧神工，这是一个四季都非常适合旅游的城市。
              </span>             
              <!-- <li><span>大棚：<strong>560</strong>个</span></li>-->
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 右下 -->
    <div class="right-center">
      <div class="title">
        <span style="margin-top:10px;">销量排行</span>
      </div>

      <div class="echart wenzi">
        <div class="gun">
          <span>名称</span>
          <span>信息</span>
          <span>均价</span>
        </div>
        <div id="FontScroll" class="myscroll">
          <vue-seamless-scroll :data="tableData" class="seamless-warp" :class-option="optionSetting">
            <ul>
              <li v-for="item in tableData" :key="item.sjbh">
                <div class="fontInner clearfix">
                  <span>
                    <b v-text="item.sjmc"></b>
                  </span>
                  <span v-text="item.fssjStr"></span>
                  <span v-text="item.zrdwname"></span>
                </div>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
let echarts = require("echarts/lib/echarts");
//顶部时间
function getTime() {
  var myDate = new Date();
  var myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
  var myMonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
  var myToday = myDate.getDate(); //获取当前日(1-31)
  var myDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
  var myHour = myDate.getHours(); //获取当前小时数(0-23)
  var myMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
  var mySecond = myDate.getSeconds(); //获取当前秒数(0-59)
  var week = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  var nowTime;
  nowTime =myYear +"-" +fillZero(myMonth) +"-" +myToday +"&nbsp;&nbsp;" +
          fillZero(myHour) +":" +fillZero(myMinute) +":" +fillZero(mySecond) +"&nbsp;&nbsp;" +
          week[myDay] +"&nbsp;&nbsp;";
  document.getElementById('time').innerHTML=nowTime;
  // console.log(nowTime)
}
function fillZero(str) {
  var realNum;
  if (str < 10) {
    realNum = "0" + str;
  } else {
    realNum = str;
  }
  return realNum;
}
setInterval(getTime, 1000);

export default {
  data() {
    return {
      //选项卡数据
      activeName: "first",
      tableData: [
        {sjmc:"本溪水洞",fssjStr:"5A级",zrdwname:"140"},
        {sjmc:"本溪关门山",fssjStr:"4A森林公园",zrdwname:"90"},
        {sjmc:"老边沟",fssjStr:"枫叶景区",zrdwname:"60"},
        {sjmc:"花溪沐温泉",fssjStr:"美肤泉",zrdwname:"130"},
        {sjmc:"龙溪谷景区",fssjStr:"登山、休闲",zrdwname:"60"},
        {sjmc:"万乐岛",fssjStr:"湖中岛",zrdwname:"30"},
        {sjmc:"桓龙湖",fssjStr:"森林、山脉",zrdwname:"30"},
        {sjmc:"五女山",fssjStr:"名胜游览",zrdwname:"70"},
        {sjmc:"平顶山动物园",fssjStr:"动物园",zrdwname:"26"},
        {sjmc:"本溪铁刹山",fssjStr:"海拔912.9m",zrdwname:"70"},
        {sjmc:"本溪望天洞",fssjStr:"3A",zrdwname:"30"},
      ],
      loadingAdd :false,
    };
  },
  computed: {
    optionSetting() {
      return {
        step: 0.15, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  mounted() {
    this.getPar();
    this.getMap();
  },
  methods: {
    getPar() {
      var chartDom = document.getElementById("ceshi");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "国内景区分布",
          link: "http://www.baidu.com",
          subtext: "景点等级",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "horizontal",
          left: "right",
          top: 260
        },
        grid: {},
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: [
              { value: 100, name: "国家级" },
              { value: 150, name: "5A级" },
              { value: 200, name: "4A级" },
              { value: 300, name: "3A级" },
              { value: 400, name: "地方景点" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      option && myChart.setOption(option);
    },
    getMap() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("ceshi1"));

      var chinaGeoCoordMap = {
        黑龙江: [127.9688, 45.368],
        内蒙古: [110.3467, 41.4899],
        吉林: [125.8154, 44.2584],
        北京市: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        西藏: [91.11, 29.97],
        四川: [103.9526, 30.7617],
        重庆: [108.384366, 30.439702],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        江苏: [118.8062, 31.9208],
        安徽: [117.29, 32.0581],
        湖北: [114.3896, 30.6628],
        浙江: [119.5313, 29.8773],
        福建: [119.4543, 25.9222],
        江西: [116.0046, 28.6633],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        上海: [121.4648, 31.2891]
      };
      var chinaDatas = [
        [
          {
            name: "黑龙江",
            value: 1
          }
        ],
        [
          {
            name: "内蒙古",
            value: 0
          }
        ],
        [
          {
            name: "吉林",
            value: 0
          }
        ],
        [
          {
            name: "辽宁",
            value: 0
          }
        ],
        [
          {
            name: "河北",
            value: 0
          }
        ],
        [
          {
            name: "天津",
            value: 0
          }
        ],
        [
          {
            name: "山西",
            value: 0
          }
        ],
        [
          {
            name: "陕西",
            value: 0
          }
        ],
        [
          {
            name: "甘肃",
            value: 0
          }
        ],
        [
          {
            name: "宁夏",
            value: 0
          }
        ],
        [
          {
            name: "青海",
            value: 0
          }
        ],
        [
          {
            name: "新疆",
            value: 0
          }
        ],
        [
          {
            name: "西藏",
            value: 1
          }
        ],
        [
          {
            name: "四川",
            value: 0
          }
        ],
        [
          {
            name: "重庆",
            value: 0
          }
        ],
        [
          {
            name: "山东",
            value: 0
          }
        ],
        [
          {
            name: "河南",
            value: 0
          }
        ],
        [
          {
            name: "江苏",
            value: 0
          }
        ],
        [
          {
            name: "安徽",
            value: 0
          }
        ],
        [
          {
            name: "湖北",
            value: 0
          }
        ],
        [
          {
            name: "浙江",
            value: 0
          }
        ],
        [
          {
            name: "福建",
            value: 0
          }
        ],
        [
          {
            name: "江西",
            value: 0
          }
        ],
        [
          {
            name: "湖南",
            value: 0
          }
        ],
        [
          {
            name: "贵州",
            value: 0
          }
        ],
        [
          {
            name: "广西",
            value: 0
          }
        ],
        [
          {
            name: "海南",
            value: 2
          }
        ],
        [
          {
            name: "上海",
            value: 1
          }
        ]
      ];

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = chinaGeoCoordMap[dataItem[0].name];
          var toCoord = [116.4551, 40.2539];
          if (fromCoord && toCoord) {
            res.push([
              {
                coord: fromCoord,
                value: dataItem[0].value
              },
              {
                coord: toCoord
              }
            ]);
          }
        }
        return res;
      };
      var series = [];
      [["北京市", chinaDatas]].forEach(function(item, i) {
        // console.log(item);
        series.push(
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 5 //图标大小
            },
            lineStyle: {
              normal: {
                width: 1, //尾迹线条宽度
                opacity: 1, //尾迹线条透明度
                curveness: 0.3 //尾迹线条曲直度
              }
            },
            data: convertData(item[1])
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              //涟漪特效
              period: 4, //动画时间，值越小速度越快
              brushType: "stroke", //波纹绘制方式 stroke, fill
              scale: 4 //波纹圆环最大限制，值越大波纹越大
            },
            label: {
              normal: {
                show: true,
                position: "right", //显示位置
                offset: [5, 0], //偏移设置
                formatter: function(params) {
                  //圆环显示文字
                  return params.data.name;
                },
                fontSize: 13
              },
              emphasis: {
                show: true
              }
            },
            symbol: "circle",
            symbolSize: function(val) {
              return 5 + val[2] * 5; //圆环大小
            },
            itemStyle: {
              normal: {
                show: false,
                color: "#f00"
              }
            },
            data: item[1].map(function(dataItem) {
              return {
                name: dataItem[0].name,
                value: chinaGeoCoordMap[dataItem[0].name].concat([
                  dataItem[0].value
                ])
              };
            })
          },
          //被攻击点
          {
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              period: 4,
              brushType: "stroke",
              scale: 4
            },
            label: {
              normal: {
                show: true,
                position: "right",
                //offset:[5, 0],
                color: "#0f0",
                formatter: "{b}",
                textStyle: {
                  color: "#0f0"
                }
              },
              emphasis: {
                show: true,
                color: "#f60"
              }
            },
            symbol: "pin",
            symbolSize: 50,
            data: [
              {
                name: item[0],
                value: chinaGeoCoordMap[item[0]].concat([10])
              }
            ]
          }
        );
      });
      var option = {
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(166, 200, 76, 0.82)",
          borderColor: "#FFFFCC",
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: "z-index:100",
          formatter: function(params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            var res = "";
            var name = params.name;
            var value = params.value[params.seriesIndex + 1];
            res =
              "<span style='color:#fff;'>" +
              name +
              "</span><br/>数据：" +
              value;
            return res;
          }
        },
        /*backgroundColor:"#013954",*/
        visualMap: {
          //图例值控制
          min: 0,
          max: 1,
          calculable: true,
          show: false,
          color: ["#f44336", "#fc9700", "#ffde00", "#ffde00", "#00eaff"],
          textStyle: {
            color: "#fff"
          }
        },
        geo: {
          map: "china",
          zoom: 1.2,
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true, //是否允许缩放
          itemStyle: {
            normal: {
              color: "rgba(51, 69, 89, .5)", //地图背景色
              borderColor: "#516a89", //省市边界线00fcff 516a89
              borderWidth: 1
            },
            emphasis: {
              color: "rgba(37, 43, 61, .5)" //悬浮背景
            }
          }
        },
        series: series
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    login(){
      this.$router.push('/');
    },
    //动态选项卡
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>

<style>
@import "../../assets/css/index.css";
</style>