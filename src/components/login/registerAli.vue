<template>
  <div class="block">
    <iframe
      :width="searchTableWidth"
      :height="searchTableHeight"
      :src="reportUrl"
      style="border:none"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      reportUrl: '',
      searchTableHeight: 0,
      searchTableWidth: 0
    }
  },
  watch: {
    '$route': function() {
      // 监听路由变化
      this.reportUrl = this.$route.meta.pathUrl
    }
  },
  created() {
   this.reportUrl = 'https://datav.aliyuncs.com/share/6a82ad073cd71b92e49c021a171843f5'
  },
  mounted() {
    window.onresize = () => {
      this.widthHeight() // 自适应高宽度
    }
    this.$nextTick(function() {
      this.widthHeight()
    })
  },
  methods: {
    widthHeight() {
      this.searchTableHeight = window.innerHeight + 'px'
      this.searchTableWidth = window.innerWidth + 'px'
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
