<template>
<el-card>
      <el-carousel class="lun_imgs" ref="carousel" @click.native="linkTo" height="540px">
            <el-carousel-item class="lun_img" v-for="(item,index) in imgs" v-bind:key="index">
                  <img :src="item.url" />
            </el-carousel-item>
      </el-carousel>
</el-card>
</template>

<script>
export default {
      data: function () {
            return {
                  platform: 'pc',
                  imgs: [
                        { url: require('../../assets/images/lb_1.jpg'), link: '/datashow' },
                        { url: require('../../assets/images/lb_2.jpg'), link: '/datashow' },
                        { url: require('../../assets/images/lb_3.jpg'), link: '/datashow' },
                        { url: require('../../assets/images/lb_4.jpg'), link: '/datashow' },
                        { url: require('../../assets/images/lb_1.jpg'), link: '/datashow' }
                  ]
            }
      },
      methods: {
            linkTo() {
                  let activeIndex = this.$refs.carousel.activeIndex
                  this.$router.push(this.imgs[activeIndex].link)
            }
      }

}
</script>

<style>

</style>
