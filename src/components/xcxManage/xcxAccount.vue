<template>
  <div>
      <header class="whiteHeader"><a href="javascript:history.go(-1)" class="arrowLeft"></a><h3>小程序授权托管</h3></header>
      <section>
        <div class="hostingBox">
            <div class="hostingBoxImg"><img :src="xcxInfo.headimg? xcxInfo.headimg:'https://style.org.hc360.com/images/microMall/program/wxProgramLogo.png'"/></div>
        	<dl>
                <dd><span>小程序：</span>{{xcxInfo.nickname}}</dd>
                <dd><span>线上版本：</span>{{xcxInfo.version}}</dd>
                <dd><span>主体名称：</span>{{xcxInfo.principalname}}</dd>
                <dd v-if="xcxInfo.publishtime"><span>更新时间：</span>{{xcxInfo.publishtime}}</dd>
                <dd><span>更新状态：</span>{{states[xcxInfo.publishstate]}}</dd>
                <dd><span>商户号：</span>{{xcxInfo.mchid}}</dd>
            </dl>    
        </div>
    </section>

    <logoTip></logoTip>
  </div>
</template>

<script>

import logoTip from 'components/v-logoTip.vue'
export default {

    data(){
        return{
            /**小程序信息 */
            xcxInfo:{},
            /**更新状态值 */
            states:["未发布","审核中","审核失败","发布成功","发布失败"]
        }
    },

    components:{
        logoTip
    },
    methods:{
        getXcxInfo(){
            let _this = this;
            _this.$http('get','http://madata.hc360.com/mobileapp/wx/getAppConfigInfo?callback=',{
                params:{
                    imid:JSON.parse(localStorage.getItem('companyInfo')).username
                }
            }).then(res =>{
                if(res && res.appConfig){
                   _this.xcxInfo =  res.appConfig
                }
            })
        }
    },

    mounted(){
        let _this = this;
        _this.$nextTick(() =>{
            _this.getXcxInfo();
        })
    }
  
}
</script>

<style>
@import url("https://style.org.hc360.com/css/microMall/wxProgram.css");
</style>

