<template>
<div id="con">
      <div id="container"></div>
      <div id='r-result'></div>
</div>
</template>

<script>
export default {
      data() {
            return {

            }
      },
      mounted() {
            this.initMap()
      },
      methods: {
            initMap() {
                  var map = new BMapGL.Map("container"); // 创建Map实例
                  // point(x,y)本溪市经纬度
                  map.centerAndZoom(new BMapGL.Point(123.696429, 41.487745), 12);

                  var busline = new BMapGL.BusLineSearch(map, {
                        renderOptions: { map: map, panel: "r-result" },
                        onGetBusListComplete: function (result) {
                              if (result) {
                                    var fstLine = result.getBusListItem(0); //获取第一个公交列表显示到map上
                                    busline.getBusLine(fstLine);
                                    //console.log(fstLine)
                                    // name: "107路(龙之梦亚太城-东方御景)", _uid: "fef90542100f17f0611809ff", _cityCode: 227, _index: 0, _keyword: 107, 
                              }
                        }
                  });
                  //各个站点信息
                  //console.log(busline)

                  function busSearch() {
                        var busName = 107;//多少路公交
                        busline.getBusList(busName);
                  }
                  setTimeout(function () {
                        busSearch();
                  }, 1500);
            }
      }
}
</script>

<style>
#con {
      width: 100%;
      height: 100%;
      margin: 0;
      font-family: "微软雅黑";
}

#container {
      height: 100%;
      width: 100%;
}

#r-result {
      position: fixed;
      top: 60px;
      right: 10px;
      z-index: 99;
      width: 250px;
      height: 450px;
      overflow-y: auto;
      background: #fff;
      box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
      border-radius: 7px;
}
</style>
