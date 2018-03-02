<template>
  <div>
      <headerTop :head-name="headName"></headerTop>  
      <section>
          <div class="modelBox">

            <div class="modelCon" v-for="(item,i) in templates" :key='i'>
              <div class="modelImgCon"><a :href="'#/xcxManage/preview?currentTplId='+currentTplId+'&tplId='+item.tempId+'&enabled='+enabled"><img class="modelImg" :src="item.tplUrl"></a></div>
              <p class="name">{{item.name}}</p>
              <div class="mdetailCur" v-if="item.stateDes!='点击查看'"><label class="curIcon"></label>正在使用</div>
              <div class="mdetail" v-else><a :href="'#/xcxManage/preview?currentTplId='+currentTplId+'&tplId='+item.tempId+'&enabled='+enabled">点击查看</a></div>
            </div>

          </div>
        
        <!-- 弹窗 -->
        <div class="popupBg" style="display:none;">
          <div class="popupCon">
            <div class="popupClose">×</div>
            <div class="popupTxtCon">
              <text class="popupTxt">您有修改未提交</text>
              <text class="popupTxt">如返回当前修改将不保存？</text>
            </div>
            <div class="popupBtn">
              <div class="poputbtn1">留在本页</div>
              <div class="poputbtn2">放弃修改</div>
            </div>
          </div>
      </div>
    </section>

  </div>
</template>

<script>
import headerTop from '../header.vue'
export default {

  data(){
    return {
      headName:'店铺模板',
      templates:[
        {
          tempId:1,
          tplUrl:'https://style.org.hc360.com/images/microMall/program/modex_1.jpg',
          name:'推荐模板1',
          stateDes:'点击查看'
        },
        {
          tempId:2,
          tplUrl:'https://style.org.hc360.com/images/microMall/program/modex_2.jpg',
          name:'推荐模板2',
          stateDes:'点击查看'
        },
        {
          tempId:3,
          tplUrl:'https://style.org.hc360.com/images/microMall/program/modex_3.jpg',
          name:'推荐模板3',
          stateDes:'点击查看'
        },
        {
          tempId:4,
          tplUrl:'https://style.org.hc360.com/images/microMall/program/modex_4.jpg',
          name:'推荐模板4',
          stateDes:'点击查看'
        }
      ],

      /**
       * 当前启用的模板id
       */
      currentTplId:null,

      /**
       * 审核中的模板id
       */
      reviewId:null,
      
      /** 
       * 小程序审核状态码
       */
      telInfo:{
        0:'未发布',
        1:'审核中',
        2:'审核失败',
        3:'发布成功',
        4:'发布失败'
      },

      /**
       * 是否可以更改模板
       */
      enabled:1
    }
  },

  methods:{
    /**
     * 获取当前小程序启用的模板
     */
    getConfigInfo(){
      let _this = this;
      _this.$http('get','//madata.hc360.com/mobileapp/wx/getAppConfigInfo?callback=',{
        params:{
          imid:JSON.parse(localStorage.getItem('companyInfo')).username
        }
      }).then(res =>{
         let appConfig= (res.appConfig || {}),
             state=appConfig.publishstate,
             desc='正在使用',
             _stateInfo=_this.telInfo[state];
         /**
          *  publishstate发布状态
          *  0-未发布  1-审核中  2-审核失败 3-发布成功  4-发布失败
          */
         if(state==3){
           _this.currentTplId =appConfig.templateid;
         }else{
           /**
            * 审核中的状态，不能修改模板
            */
           if(state==1){
             _this.enabled=0;
           }
           /**
            * 如果存在上一次的模板id
            */
           if(appConfig.pretemplateid){
              _this.currentTplId =appConfig.pretemplateid;
              _this.reviewId =appConfig.templateid;
           }else{
              _this.currentTplId=appConfig.templateid;
              desc+='('+_stateInfo+')';
           }
        }
        /***
         *  如果有在审核的id
         */
        if(_this.reviewId){
           _this.templates[_this.reviewId-1].stateDes=_stateInfo; 
        }
        if(_this.currentTplId){
          _this.templates[_this.currentTplId-1].stateDes=desc;
        }
        
        
      })
    }
  },
  components:{
    headerTop
  },
  mounted(){
    let _this = this;
    _this.$nextTick(() =>{
      _this.getConfigInfo();
    })
  }
  
}
</script>

<style>
@import "https://style.org.hc360.com/css/microMall/wxProgram.css";
</style>

