<template>
  <div>
      <header class="mHeaderBox"><a href="javascript:history.go(-1)" class="arrowLeft"></a><h3>小程序码</h3></header>
        <section>
            <div class="sProgramCode">
                <h5>{{companyInfo.name}}</h5>
                <div class="codeImg"><img :src="xcxImgUrl ? xcxImgUrl : 'https://style.org.hc360.com/images/microMall/program/codeImg.png'"></div>
                <p>长按或扫描二维码</p>
                <p>关注我的店铺</p>
            </div>
            <div class="codeImgBot">发送二维码给好友，吸引更多客流</div>
        </section>

        <footerContent></footerContent>
  </div>
</template>

<script>
import footerContent from 'components/footer.vue'
export default {

    data(){
        return {
            companyInfo:JSON.parse(localStorage.getItem('companyInfo')),
            xcxImgUrl : ''
        }
    },

    created(){
        
    },

    methods:{

        getCodeUrl(){
            let _this = this;
            _this.$http('get','//madata.hc360.com/mobileapp/appManager/getAppCode?callback=',{
                params:{
                    imid:_this.companyInfo.username,
                    sign:1
                }
            }).then(res =>{
                if(res && res.url){
                    _this.xcxImgUrl = res.url
                }
            })
        }
    },

    mounted(){
        let _this = this;
        _this.$nextTick(() =>{
           _this.getCodeUrl();
        })
    },
    components:{
        footerContent
    }
}
</script>

<style>
@import "https://style.org.hc360.com/css/microMall/wxProgram.css";
</style>

