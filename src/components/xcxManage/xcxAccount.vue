<template>
  <div>
      <header class="whiteHeader"><a href="javascript:history.go(-1)" class="arrowLeft"></a><h3>小程序授权托管</h3></header>
      <section>
        <div class="hostingBox">
            <div class="hostingBoxImg"><img :src="xcxInfo.headimg? xcxInfo.headimg:'https://style.org.hc360.com/images/microMall/program/wxProgramLogo.png'"/></div>
        	<dl>
                <dd><span>小程序：</span>{{xcxInfo.nickname}}</dd>
                <dd><span>主体名称：</span>{{xcxInfo.principalname}}</dd>
                <dd><span>线上版本：</span>{{ version ||'无' }}</dd>
                <dd><span>更新状态：</span>{{ appState ||'无' }}</dd>
                <dd ><span>更新时间：</span>{{xcxInfo.publishtime || '无'}}</dd>
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
            states:["未发布","审核中","审核失败","发布成功","发布失败"],

            version:'',

            appState:'',
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
                   _this.xcxInfo =  res.appConfig;
                   _this.version=_this.getVersion();
                   _this.appState=_this.getAppState();
                }
            })
        },
        getVersion(){
           if(this.xcxInfo.publishstate==3){
               return this.version
           }else{
              if(this.xcxInfo.preversion){
                 return this.xcxInfo.preversion
               }else{
                   return this.version
               }
           } 
       },
       getAppState(){
           if(this.xcxInfo.publishstate!=3){
               if(this.xcxInfo.preversion){
                   return '发布成功'
               }else{
                   return this.states[this.xcxInfo.publishstate]
               }
           }
       }
    },

    created(){
        let _this = this;
        _this.getXcxInfo();
    }
  
}
</script>

<style>
@import url("https://style.org.hc360.com/css/microMall/wxProgram.css");
</style>

