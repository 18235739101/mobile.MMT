<template>
  <div>
        <XCXHead :head-name="headName" />
        <section>
            <div class="sProgramCode">
                <h5>{{companyInfo.name}}</h5>
                <div class="codeImg"><img :src="xcxImgUrl"></div>

            </div>
            <div class="codeImgBot">您可长按图片保存小程序码，<br>也可以分享给好友，吸引更多客流</div>
        </section>

        <footerContent></footerContent>
  </div>
</template>

<script>
import footerContent from 'components/footer.vue'
import XCXHead from '../header.vue'
export default {

    data(){
        return {
            companyInfo:JSON.parse(localStorage.getItem('companyInfo')),
            xcxImgUrl : 'https://style.org.hc360.com/images/microMall/program/codeImg.png'
        }
    },
    computed: {
        headName: function (){
          return this.$route.query.copy == '1' ? '小程序码': '浏览小程序';
        }
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
                    // alert(res.url);
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
        footerContent,
        XCXHead
    }
}
</script>

<style>
@import "https://style.org.hc360.com/css/microMall/wxProgram.css";
</style>
