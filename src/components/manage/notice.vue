<template>
    <div class="scrollCon">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(items,i) in imglist" :key="i">
           <img :src="items">
        </swiper-slide>
        <div class="swiper-pagination"></div>
      </swiper>
      <div class="scrollConBot">
          <p>您还不是移动版买卖通会员</p>
          <a href="tel:400-6360-888">电话咨询</a>
      </div>
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data(){
    return {
       imglist:[
          'https://style.org.hc360.com/images/microMall/intro/m/img1.jpg',
          'https://style.org.hc360.com/images/microMall/intro/m/img2.jpg',
          'https://style.org.hc360.com/images/microMall/intro/m/img3.jpg',
          'https://style.org.hc360.com/images/microMall/intro/m/img4.jpg',
          'https://style.org.hc360.com/images/microMall/intro/m/img5.jpg'
       ],
       swiperOption:{
          autoplay: true,
          speed:400,
          autoplayDisableOnInteraction:false
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style>
@import url('https://style.org.hc360.com/css/microMall/mIntroStyle.css');
</style>

