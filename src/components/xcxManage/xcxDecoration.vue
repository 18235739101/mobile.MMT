<template>
  <div>

      <header class="mHeaderBox"><a href="javascript:history.go(-1)" class="arrowLeft"></a><h3>店铺模板</h3></header>
      <section>
          <div class="modelBox">

            <div class="modelCon" v-for="(item,i) in templates" :key='i'>
              <div class="modelImgCon"><a :href="'#/xcxManage/preview?currentTplId='+currentTplId+'&tplId='+(i+1)"><img class="modelImg" :src="item.tplUrl"></a></div>
              <p class="name">推荐模板{{i+1}}</p>
              <div class="mdetailCur" v-if="(i+1)==currentTplId" :hj="currentTplId"><label class="curIcon"></label>正在使用</div>
              <div class="mdetail" v-else><a :href="'#/xcxManage/preview?currentTplId='+currentTplId+'&tplId='+(i+1)">点击查看</a></div>
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
export default {

  data(){
    return {
      templates:[
        {
          tplUrl:'https://style.org.hc360.com/images/microMall/program/modex_1.jpg'
        },
        {
          tplUrl:'https://style.org.hc360.com/images/microMall/program/modex_2.jpg'
        },
        {
          tplUrl:'https://style.org.hc360.com/images/microMall/program/modex_3.jpg'
        },
        {
          tplUrl:'https://style.org.hc360.com/images/microMall/program/modex_4.jpg'
        }
      ],

      /**当前启用的模板id */
      currentTplId:0
    }
  },

  methods:{

    getConfigInfo(){
      let _this = this;
      _this.$http('get','//madata.hc360.com/mobileapp/wx/getAppConfigInfo?callback=',{
        params:{
          imid:JSON.parse(localStorage.getItem('companyInfo')).username
        }
      }).then(res =>{

        _this.currentTplId = (res.appConfig || {}).templateid || 0

      })
    }
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

