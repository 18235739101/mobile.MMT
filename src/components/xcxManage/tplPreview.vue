<template>
  <div>
      <header class="mHeaderBox"><a href="javascript:history.go(-1)" class="arrowLeft"></a><h3>店铺模板</h3></header>
      <section>
        <div class="container">
          <div class="modelCon2">
            <div class="modelImg"><img :src="tmps[$route.query.tplId-1]"></div>
            <div class="modelBtn2" v-if="$route.query.tplId == $route.query.currentTplId">正在使用</div>

            <div class="modelBtn1" v-else-if="!enableSuccess"  @click="enableModule">启用该模板</div>

            <div class="modelBtn2" v-else-if="enableSuccess"  @click="enableModule">审核中...</div>
          </div>
        </div>
    </section>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {

  data(){
    return {
      //模板对应预览的大图数据集合
      tmps:[
        'https://style.org.hc360.com/images/microMall/program/modex_b.jpg',
        'https://style.org.hc360.com/images/microMall/program/modex_b.jpg',
        'https://style.org.hc360.com/images/microMall/program/modex_b.jpg',
        'https://style.org.hc360.com/images/microMall/program/modex_b.jpg'
      ],

      enableSuccess:false
    }
  },

  methods:{

    /**
     * 启用模板事件
     */
    enableModule(){

      let _this = this;

      MessageBox({
        title: '提示',
        message: '确认启用该模板吗?',
        showCancelButton: "确定"
      }).then(action =>{
        if("confirm" == action){
          _this.$http('get','//madata.hc360.com/mobileapp/appManager/commit?callback=',{
            params:{
              imid:JSON.parse(localStorage.getItem('companyInfo')).username,
              templateid:_this.$route.query.tplId
            }
          }).then(res =>{
              if(res && res.errcode == 0){
                  _this.enableSuccess = !_this.enableSuccess
              }else{
                  Toast({
                    message: '启用模板失败，请稍后重试！',
                    position: 'middle',
                    duration: 5000
                  });
              }
          })
        }
      })
      
    }
  }
  
  
}
</script>

<style>
@import "https://style.org.hc360.com/css/microMall/wxProgram.css";

</style>

