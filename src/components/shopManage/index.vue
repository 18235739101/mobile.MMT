<template>
    <div>
    <shopHeader titleName="店铺管理"></shopHeader>
    <section>
        <div class="personalInfo">
            <div class="headPortrait"><a :href='"//m.hc360.com/b2b/"+companyInfo.username'><img :src="companyInfo.logoUrl ? companyInfo.logoUrl : 'https://style.org.hc360.com/images/microMall/manage/hImg.png'"></a></div>
            <div class="comName">
                <a :href='"//m.hc360.com/b2b/"+companyInfo.username' target="_blank">{{companyInfo.name}}</a>
            </div>
        </div>
        <div class="storeProgramList">
        	<ul>
            	<li>
                	<dl>
                    	<dd class="storeData"><a href="#/shopManage/info">店铺资料</a></dd>
                    </dl>
                </li>
            	<li>
                	<dl>
                    	<dd class="qyCertification"><a href="javascript:void(0)">企业认证<span>{{companyInfo.authenorg}}</span></a></dd>
                    </dl>
                </li>
            </ul>
        </div>
        <logoTip></logoTip>
    </section>

    
    <shopFooter></shopFooter>
    </div>
  
</template>

<script>
import shopHeader from './shopHeader'
import shopFooter from './shopFooter'
import logoTip from 'components/v-logoTip'
export default {
  data(){
      return {
          companyInfo:{

          }
      }
  },

  components:{
      shopFooter,
      shopHeader,
      logoTip
  },

  methods:{
      getShopInfos(){
            let _this = this;

            _this.$http('get','//wsdetail.b2b.hc360.com/mobile/company?callback=',{

            }).then((res) =>{
                res = JSON.parse(res.replace(/\(|\)/g,'')) || {};
                _this.companyInfo = res;
                localStorage.setItem('companyInfo',JSON.stringify(_this.companyInfo))
            })
      }
  },

  mounted(){
      let _this = this;
      _this.$nextTick(() =>{
          _this.getShopInfos();
      })
  }
}
</script>

<style scoped>
@import "https://style.org.hc360.com/css/microMall/storeStyle.css";
</style>


