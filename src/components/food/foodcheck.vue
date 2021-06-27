<template>
<div id="con">
      <div id="l-map-food"></div>
      <div id="r-result-food"></div>
</div>
</template>

<script>
export default {
      data() {
            return {

            }
      },
      mounted() {
            this.foodMap()
      },

      methods: {
            foodMap() {
                  // 百度地图API功能
                  var map = new BMapGL.Map("l-map-food"); // 创建Map实例
                  map.centerAndZoom(new BMapGL.Point(123.81695, 41.30877), 11);
                  //搜索关键字
                  var myKeys = ["酒店", "加油站"];
                  var local = new BMapGL.LocalSearch(map, {
                        renderOptions: { map: map, panel: "r-result-food" },
                        pageCapacity: 5
                  });
                  local.searchInBounds(myKeys, map.getBounds());
                  //根据关键字搜索结果[arrPois]
                  // console.log(local);
                  // console.log(local._arrPois);
                  // localStorage.setItem("arrT",local._arrPois);
                  let arr=[]
                  arr.push(local._arrPois);
                  // console.log(arr[0])
                  arr1.push(arr[0])

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

#l-map-food {
      height: 300px;
      width: 100%;
}

#r-result-food {
      width: 100%;
}
</style>
