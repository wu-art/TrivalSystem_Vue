<template>
<div id="con">
      <div id="l-map-s"></div>
      <div id="r-result-s">请输入:
        <input type="text" id="suggestId" size="20" value="百度" style="width:150px;" />
      </div>
      <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
</div>
</template>

<script>
export default {
      data() {
            return {
                  
            }
      },
      mounted() {
            this.searchMap()
      },

      methods: {
            searchMap(){
                  // 百度地图API功能
            function G(id) {
                  return document.getElementById(id);
            }

            var map = new BMapGL.Map("l-map-s");
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
                  // console.log(str)
                  // console.log(value)
                  // console.log(_value.city);
                  // console.log(_value.district);
                  // console.log(_value.business);
                  localStorage.setItem('City',_value.city);
                  localStorage.setItem('District',_value.district);
                  localStorage.setItem('Business',_value.business);
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
      },
}
</script>

<style>
#con {
      width: 100%;
      height: 100%;
      margin: 0;
      font-family: "微软雅黑";
      font-size: 14px;
}

#l-map-s {
      height: 300px;
      width: 100%;
}

#r-result-s {
      width: 100%;
}
</style>
