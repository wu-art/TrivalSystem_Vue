<template>
  <div class="main">
    <el-container>
      <el-header>
        <ul class="u1">
          <li @click="toLoginUser()" style="cursor: pointer;">后台登录</li>
          <li>下载app</li>
          <li>旅游社区</li>
          <li>当前用户: {{formLabelAlign.name}}</li>
        </ul>
        <ul class="u2">
          <li @click="dialogVisible = true">登录</li>
          <li>注册</li>
          <li>消息通知</li>
        </ul>
      </el-header>
      <el-dialog
        title="登录"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="formLabelAlign"
          ref="resetForm"
        >
          <el-form-item label="用户名">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="formLabelAlign.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formLabelAlign.email"></el-input>
          </el-form-item>
          <el-form-item label="创建日期">
            <el-input v-model="formLabelAlign.create_date"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="userLogin()">登录</el-button
          >
        </span>
      </el-dialog>
      <el-container>
        <el-aside width="200px">
          <ul>
            <!-- <li v-on:mouseenter="visible" @mouseleave="display"> 
                  <p v-show="seen"><img src="../../assets/images/z1.jpg" alt="" class="zImg"></p>
                  全国景点预览<i class="el-icon-arrow-right"></i>
            </li> -->

            <li @click="drawer = true">
              全国景点预览<i class="el-icon-arrow-right"></i>
            </li>
            <el-drawer
              :size="size"
              title="我是标题"
              :visible.sync="drawer"
              :with-header="false"
            >
              <span>
                <img src="../../assets/images/z1.jpg" alt="" style="width:600px;height:320px"/>
                <p style="margin-top:-5px">介绍:关门山国家森林公园位于本溪市东南七十公里处，森林公园占地3517公顷，森林覆盖率95%，
                  园内植被保存完好，古树名木众多，风景秀丽。
                </p>
              </span>
            </el-drawer>
            <li @click="drawer = true">
              辽宁景点预览<i class="el-icon-arrow-right"></i>
            </li>
            <li @click="drawer = true">
              本溪景点预览<i class="el-icon-arrow-right"></i>
            </li>
            <li @click="drawer = true">
              沈阳景点预览<i class="el-icon-arrow-right"></i>
            </li>
            <li @click="drawer = true">
              预览景点信息<i class="el-icon-arrow-right"></i>
            </li>
            <li @click="drawer = true">
              景点收入产值<i class="el-icon-arrow-right"></i>
            </li>
            <li @click="drawer = true">
              景点同比增长<i class="el-icon-arrow-right"></i>
            </li>
            <li @click="drawer = true">
              景点全国分布<i class="el-icon-arrow-right"></i>
            </li>
            <li @click="drawer = true">
              5A&emsp;景点分布<i class="el-icon-arrow-right"></i>
            </li>
            <li @click="drawer = true">
              其他景点信息<i class="el-icon-arrow-right"></i>
            </li>
          </ul>
        </el-aside>
        <el-container>
          <el-main>
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item
                v-for="(item, index) in imgForm"
                v-bind:key="index"
              >
                <img :src="item.url" style="width:100%;" />
              </el-carousel-item>
            </el-carousel>
          </el-main>
        </el-container>
      </el-container>
      <div class="div-img">
        <img src="../../assets/images/ben.jpeg" alt="" class="imgF" />
        <img src="../../assets/images/z4.jpeg" alt="" class="imgF" />
        <img src="../../assets/images/z1.jpg" alt="" class="imgF" />
        <img src="../../assets/images/z1.jpg" alt="" class="imgF" />
        <span>
          本溪水洞景区（本溪市本溪满族自治县谢家崴子村）<br />
          票价:160元;<br />
          人次:100+<br>
          位置:本溪市东南70公里处<br>
          介绍:1994年被中华人民共和国国务院批准为国家重点风景名胜区；
              2002年3月，被国家旅游局评为AAAA级名胜风景区，并通过了ISO9002质量体系认证。
        </span>
        <span style="padding-left:10px">
          本溪水洞景区（本溪市本溪满族自治县谢家崴子村），是一个独特的地质
          自然景区，感觉别有洞天，洞里头的灯特别好看，五颜六色的，一场游船
          下来，感觉像参加了一场灯会，水洞里的水特别的清澈，感叹大自然的鬼
          斧天工，在自然面前感觉人类真是很渺小，应该保护这些美丽。
        </span>
        <span>
          本溪关门山景区（本溪市本溪满族自治县谢家崴子村）<br />
          票价:160元;<br />
          人次:100+<br>
          位置:本溪市东南70公里处<br>
          介绍:1994年被中华人民共和国国务院批准为国家重点风景名胜区；
              2002年3月，被国家旅游局评为AAAA级名胜风景区，并通过了ISO9002质量体系认证。
        </span>
        <span style="padding-left:10px">
          本溪水洞景区（本溪市本溪满族自治县谢家崴子村），是一个独特的地质
          自然景区，感觉别有洞天，洞里头的灯特别好看，五颜六色的，一场游船
          下来，感觉像参加了一场灯会，水洞里的水特别的清澈，感叹大自然的鬼
          斧天工，在自然面前感觉人类真是很渺小，应该保护这些美丽。
        </span>
      </div>
      <div class="div-img">
        <img src="../../assets/images/lb_1.jpg" alt="" class="imgF" />
        <img src="../../assets/images/lb_2.jpg" alt="" class="imgF" />
        <img src="../../assets/images/lb_3.jpg" alt="" class="imgF" />
        <img src="../../assets/images/lb_4.jpg" alt="" class="imgF" />
        <span>
          本溪水洞景区（本溪市本溪满族自治县谢家崴子村），是一个独特的地质
          自然景区，感觉别有洞天，洞里头的灯特别好看，五颜六色的，一场游船
          下来，感觉像参加了一场灯会，水洞里的水特别的清澈，感叹大自然的鬼
          斧天工，在自然面前感觉人类真是很渺小，应该保护这些美丽。
        </span>
        <span style="padding-left:10px">
          本溪水洞景区（本溪市本溪满族自治县谢家崴子村），是一个独特的地质
          自然景区，感觉别有洞天，洞里头的灯特别好看，五颜六色的，一场游船
          下来，感觉像参加了一场灯会，水洞里的水特别的清澈，感叹大自然的鬼
          斧天工，在自然面前感觉人类真是很渺小，应该保护这些美丽。
        </span>
        <span>
          本溪水洞景区（本溪市本溪满族自治县谢家崴子村），是一个独特的地质
          自然景区，感觉别有洞天，洞里头的灯特别好看，五颜六色的，一场游船
          下来，感觉像参加了一场灯会，水洞里的水特别的清澈，感叹大自然的鬼
          斧天工，在自然面前感觉人类真是很渺小，应该保护这些美丽。
        </span>
        <span style="padding-left:10px">
          本溪水洞景区（本溪市本溪满族自治县谢家崴子村），是一个独特的地质
          自然景区，感觉别有洞天，洞里头的灯特别好看，五颜六色的，一场游船
          下来，感觉像参加了一场灯会，水洞里的水特别的清澈，感叹大自然的鬼
          斧天工，在自然面前感觉人类真是很渺小，应该保护这些美丽。
        </span>
      </div>
      <div class="div-img">
        <img src="../../assets/images/ben.jpeg" alt="" class="imgF" />
        <img src="../../assets/images/ben.jpeg" alt="" class="imgF" />
        <img src="../../assets/images/ben.jpeg" alt="" class="imgF" />
        <img src="../../assets/images/ben.jpeg" alt="" class="imgF" />
        <span>
          本溪水洞景区（本溪市本溪满族自治县谢家崴子村），是一个独特的地质
          自然景区，感觉别有洞天，洞里头的灯特别好看，五颜六色的，一场游船
          下来，感觉像参加了一场灯会，水洞里的水特别的清澈，感叹大自然的鬼
          斧天工，在自然面前感觉人类真是很渺小，应该保护这些美丽。
        </span>
        <span style="padding-left:10px">
          本溪水洞景区（本溪市本溪满族自治县谢家崴子村），是一个独特的地质
          自然景区，感觉别有洞天，洞里头的灯特别好看，五颜六色的，一场游船
          下来，感觉像参加了一场灯会，水洞里的水特别的清澈，感叹大自然的鬼
          斧天工，在自然面前感觉人类真是很渺小，应该保护这些美丽。
        </span>
        <span>
          本溪水洞景区（本溪市本溪满族自治县谢家崴子村），是一个独特的地质
          自然景区，感觉别有洞天，洞里头的灯特别好看，五颜六色的，一场游船
          下来，感觉像参加了一场灯会，水洞里的水特别的清澈，感叹大自然的鬼
          斧天工，在自然面前感觉人类真是很渺小，应该保护这些美丽。
        </span>
        <span style="padding-left:10px">
          本溪水洞景区（本溪市本溪满族自治县谢家崴子村），是一个独特的地质
          自然景区，感觉别有洞天，洞里头的灯特别好看，五颜六色的，一场游船
          下来，感觉像参加了一场灯会，水洞里的水特别的清澈，感叹大自然的鬼
          斧天工，在自然面前感觉人类真是很渺小，应该保护这些美丽。
        </span>
      </div>
      <div style="width:100%">
        <div id="l-map"></div>
        <div id="r-result-s">请输入:
          <input type="text" id="suggestId" size="20" value="百度" style="width:150px;" />
        </div>
        <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
      </div>
  
      
      <el-footer>
        &copy;辽科曙光院;&nbsp;BG曙光172班出版&nbsp;版权所有:MisWu
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgForm: [
        { url: require("../../assets/images/z1.jpg") },
        { url: require("../../assets/images/z2.jpg") },
        { url: require("../../assets/images/z3.jpg") },
        { url: require("../../assets/images/z4.jpeg") }
      ],
      drawer: false,
      size: "600px",
      dialogVisible: false,
      labelPosition: 'right',
      formLabelAlign:{
        name:'',
        phone:'',
        email:'',
        create_date:''
      },
      currentName:""
    };
  },
   mounted() {
            this.searchMap()
      },
  methods: {
    toLoginUser() {
      this.$router.push("/login");
    },
    userLogin(){
      axios.post('http://localhost:8081/api/users/save',this.formLabelAlign).then((res)=>{
        // console.log(res);
        if(res.status){
          this.dialogVisible=false;
          this.$message.success("登录成功!");
          this.$refs.resetForm.resetFields();
          // this.currentName=res.data.config[2];
          // console.log(this.currentName)
        }else{
          this.$message.success("登录失败!");
        }
      })
    },
    searchMap(){
                  // 百度地图API功能
            function G(id) {
                  return document.getElementById(id);
            }

            var map = new BMapGL.Map("l-map");
            map.centerAndZoom("本溪", 12); // 初始化地图,设置城市和地图级别。

            var ac = new BMapGL.Autocomplete( //建立一个自动完成的对象
                  {
                        "input": "suggestId",
                        "location": map
                  });

            ac.addEventListener("onhighlight", function (e) { //鼠标放在下拉列表上的事件
                  var str = "";
                  var _value = e.fromitem.value;
                  var value = "";
                  if (e.fromitem.index > -1) {
                        value = _value.province + _value.city + _value.district + _value.street + _value.business;
                  }
                  str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

                  value = "";
                  if (e.toitem.index > -1) {
                        _value = e.toitem.value;
                        value = _value.province + _value.city + _value.district + _value.street + _value.business;
                  }
                  str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
                  G("searchResultPanel").innerHTML = str;
                  // 鼠标指向搜索结果即返回
                  // console.log(_value) //返回关键字的数组
            });

            var myValue;
            ac.addEventListener("onconfirm", function (e) { //鼠标点击下拉列表后的事件
                  var _value = e.item.value;
                  myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
                  G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

                  setPlace();
                  //console.log(myValue)  //返回点击的景点名称
            });

            function setPlace() {
                  map.clearOverlays(); //清除地图上所有覆盖物
                  function myFun() {
                        var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
                        map.centerAndZoom(pp, 18);
                        map.addOverlay(new BMapGL.Marker(pp)); //添加标注
                  }
                  var local = new BMapGL.LocalSearch(map, { //智能搜索
                        onSearchComplete: myFun
                  });
                  local.search(myValue);
                  //console.log(myValue) //搜索的关键字
            }
          }
  }
};
</script>

<style>
@import "../../assets/css/qian.css";
#l-map {
      height: 300px;
      width: 100%;
}
#r-result-s {
      width: 100%;
}
.el-header {
  background-color: black;
  color: whitesmoke;
  width: 100%;
}
.el-footer {
  background-color: gray;
  font-family: "楷体";
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: rgb(157, 157, 163);
  color: #333;
  float: left;
}

.el-main {
  background-color: #e9eef3;
  color: red;
  float: left;
  position: relative;
  z-index: -10;
}

body > .el-container {
  margin-bottom: 40px;
}

/* .el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
} */

/* .el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
</style>