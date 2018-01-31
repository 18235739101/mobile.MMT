<template>
  <section>
        <header class="mHeaderBox"><a href="javascript:history.go(-1)" class="arrowLeft"></a><h3>经营分析</h3></header>
        <article class="indexBox">
            <ul>
                <li>
                    <div class="box1Left">
                        <h3>昨日曝光量<b>{{operationDatas.yesterdayExposure || 0}}</b> 次</h3>
                        <p>了解同行数据，提升商品曝光</p>
                        <a :href='"#/operationDaily/exposure?level="+$route.query.level'>点击查看详情</a>
                    </div>
                    <div class="box1Rig"><img src="https://style.org.hc360.com/images/microMall/index/dataImg.png"></div>
                </li>
                <li>
                    <div class="box1Left">
                        <h3>在售商品<b>{{operationDatas. onlineBusins || 0}}</b> 个</h3>
                        <p>商品个数越多，您得到的询盘越高</p>
                        <a :href='"#/operationDaily/onsale?level="+$route.query.level'>点击查看详情</a>
                    </div>
                    <div class="box1Rig"><img src="https://style.org.hc360.com/images/microMall/index/dataImg2.png"></div>
                </li>
                <li>
                    <div class="box1Left">
                        <h3>30天内询盘<b>{{operationDatas.inquiryIn30Days || 0}}</b> 次</h3>
                        <p>实时买家沟通，获得成单机会</p>
                        <a :href='"#/operationDaily/inqueryFor30?level="+$route.query.level'>点击查看详情</a>
                    </div>
                    <div class="box1Rig"><img src="https://style.org.hc360.com/images/microMall/index/dataImg3.png"></div>
                </li>
            </ul>
        </article>
 </section>
</template>

<script>
export default {
  data(){
      return {
          /**经营分析总览数据对象 */
          operationDatas:{}
      }
  },

  methods:{

      /**
       * 获取经营分析总览数据接口
       */
      getOperationDatas(){
          let _this = this;

          _this.$http('get','//home.hc360.com/homes/outerInf/shopOperating/shopOperatingNav?callback=',{

          }).then((res) =>{
              _this.operationDatas = res.data || {};
          })
      }
  },

  mounted(){
      let _this = this;
      _this.$nextTick(() =>{
          _this.getOperationDatas();
      })
  }
}
</script>

<style>

@import "https://style.org.hc360.com/css/microMall/analysisStyle.css";

</style>
