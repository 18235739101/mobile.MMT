<template>
  <div>
      <img style="display:none;" :src="companyInfo.logoUrl" alt="">
      <shopHeader titleName="店铺二维码"></shopHeader>
      <section>
    	<div class="codeImgBox">
            <div class="storeCode">
                <div class="storeImg"><img :src="companyInfo.logoUrl ? companyInfo.logoUrl : 'https://style.org.hc360.com/images/microMall/store/tImg.png'"></div>
                <h5>{{companyInfo.name}}</h5>
                <div class="codeImg">
                    <!-- <canvas id="canvas"></canvas> -->
                    <img id="imgWrap" src="https://style.org.hc360.com/images/microMall/store/codeImg.png">
                </div>
                <p>请长按图片保存店铺二维码</p>
            </div>
            <div class="codeImgBot">发送二维码给好友，吸引更多客流</div>
        </div>

     </section>
    <logoTip></logoTip>
  </div>
</template>

<script>
import logoTip from 'components/v-logoTip'
import shopHeader from './shopHeader'
import QRCode from 'qrcode'
export default {
  data(){
      return {
          companyInfo:JSON.parse(localStorage.getItem('companyInfo')),
      }
  },
  components:{
      shopHeader,
      QRCode,
      logoTip
  },
  methods:{

      drawQrcode(){
        let opts = {
                type: 'image/jpeg',
                rendererOpts: {
                    quality: 0.3
                }
            }
       QRCode.toDataURL("https://m.hc360.com/b2b/"+JSON.parse(localStorage.getItem('companyInfo')).username+"/?id=1", opts, function (err, url) {
            if (err) throw err
            document.getElementById('imgWrap').src = url
       })
      }
  },
  mounted(){
      let _this = this;
      _this.$nextTick(() =>{
          document.title = _this.companyInfo.name;
          _this.drawQrcode();
      })
  }
}
</script>

<style scoped>
@import "https://style.org.hc360.com/css/microMall/storeStyle.css";
#canvas{
    width:2.8rem!important;
    height:2.8rem!important;
}
</style>
