<template>
<div>
 <header class="mHeaderBox"><h3>小程序管理</h3></header>
 <section>
        <div class="personalInfoNew">
            <div class="headPortrait"><a :href='"//m.hc360.com/b2b/"+companyInfo.username' target="_blank"><img src="https://style.org.hc360.com/images/microMall/manage/hImg.png"></a></div>
            <div class="comName">
                <a :href='"//m.hc360.com/b2b/"+companyInfo.username' target="_blank">{{companyInfo.name}}</a>
            </div>
            <div class="comCodeCon"><a href="#/xcxManage/code"></a></div>
        </div>
        <div class="wxProgramList">
        	<ul>
            	<li>
                	<dl>
                    	<dd class="programAccount"><a href="#/xcxManage/account">小程序账号</a></dd>
                    </dl>
                </li>
            	<li>
                	<dl>
                    	<dd class="mallDecorate"><a href="#/xcxManage/decorate">小程序店铺装修</a></dd>
                    	<dd class="wxMallAdd"><a href="#/xcxManage/code">浏览小程序店铺</a></dd>
                    </dl>
                </li>
            	<li>
                	<dl>
                    	<dd class="serHelp"><a href="#/xcxManage/help">客服帮助</a></dd>
                    </dl>
                </li>
            </ul>
        </div>
        <logoTip></logoTip>
    </section>
    <footerContent></footerContent>
</div>
</template>

<script>
import logoTip from 'components/v-logoTip.vue'
import footerContent from 'components/footer.vue'
export default {

    data(){
        return {
            companyInfo:''
        }
    },

    components:{
        logoTip,
        footerContent
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

<style>

@import "https://style.org.hc360.com/css/microMall/wxProgram.css";

</style>

