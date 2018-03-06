<template>
  <section class="botFixedNew">
    	<ul>
        	<li><a :href="'https://m.hc360.com/b2b/'+username"><em class="ico1"></em>预览店铺</a></li>
        	<li><a href="#/shopManage/code"><em class="ico2"></em>店铺二维码</a></li>
        	<li v-if="isShare"><a href="javascritp:void(0)" @click="shopShare"><em class="ico3"></em>分享店铺</a>
			</li>
      </ul>

      <mt-popup :modal=false v-model="popupVisible"  position="bottom">
           <div id="nativeShare"></div>  
      </mt-popup>
  </section>
</template>

<script>
import "../../common/nativeShare/nativeShare.css"
import nativeShare from '../../common/nativeShare/nativeShare'

import {Popup} from 'mint-ui'

export default {
  data(){
	 return {
     //popup是否显示
     popupVisible:false,

     //店铺用户名
     username:JSON.parse(localStorage.getItem('companyInfo')).username,

     //是否显示店铺分享
     isShare:false,

     /**分享的配置参数值 */
     config : {
        url:"https://m.hc360.com/b2b/"+JSON.parse(localStorage.getItem('companyInfo')).username,
        title:JSON.parse(localStorage.getItem('companyInfo')).name
        //desc:'王俊锋的个人博客',
        // img:'http://www.wangjunfeng.com/img/face.jpg',
        // img_title:'王俊锋的个人博客',
        // from:'王俊锋的博客'
     }
	 }
  },
  components:{
    "mt-popup":Popup
  },

  methods:{

    /**
     * 浏览器识别（只有手机QQ浏览器和UC浏览器才支持店铺分享）
     */
    browserIdenty(){
      var bLevel = {
        qq: {forbid: 0, lower: 1, higher: 2},
        uc: {forbid: 0, allow: 1}
      };
      let UA = navigator.appVersion;
      let isqqBrowser = (UA.split("MQQBrowser/").length > 1) ? bLevel.qq.higher : bLevel.qq.forbid;
      let isucBrowser = (UA.split("UCBrowser/").length > 1) ? bLevel.uc.allow : bLevel.uc.forbid;

      if((isqqBrowser && isqqBrowser>0) || (isucBrowser && isucBrowser>0)){
        this.isShare = true;
      }
    },

    //店铺分享点击事件
	  shopShare(){
      let _this = this;
      _this.popupVisible = !_this.popupVisible;
    }

  },

  mounted(){
    let _this = this;
    
	  _this.$nextTick(() =>{
      _this.browserIdenty()
      new nativeShare('nativeShare',_this.config);
	  })
  }
}
</script>

<style scoped>

.mint-popup-bottom{
  bottom:100px;
  width:100%;
  height:200px;
}


</style>


