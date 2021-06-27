<template>
<div id="con">
      <div id="l-map-other"></div>
      <div id="r-result-other"></div>
</div>
</template>

<script>
export default {
      data() {
            return {

            }
      },
      mounted() {
            this.otherMap()
      },

      methods: {
            otherMap() {
                  // 百度地图API功能
                  var map = new BMapGL.Map("l-map-other");
                  // 本溪市经纬度
                  map.centerAndZoom(new BMapGL.Point(123.81695, 41.30877), 11);

                  var options = {
                        onSearchComplete: function (results) {
                              // 判断状态是否正确
                              if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                                    var s = [];
                                    for (var i = 0; i < results.getCurrentNumPois(); i++) {
                                          s.push(results.getPoi(i).title + ", " + results.getPoi(i).address);
                                    }
                                    document.getElementById("r-result-other").innerHTML = s.join("<br/>");
                              }
                        }
                  };
                  var local = new BMapGL.LocalSearch(map, options);
                  local.search("公园");
                  //根据公园关键字搜索的结果[arrPois]
                  // console.log(local)
                  console.log(local._arrPois)
                  // console.log(local._arrPois[0].title)
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
}

#l-map-other {
      height: 500px;
      width: 100%;
}

#r-result-other {
      width: 100%;
      font-size: 14px;
      line-height: 20px;
}
</style>
