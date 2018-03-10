<template>
  <div>
      <goodhead :head-name="headname"></goodhead>
      <section>
        <div class="addProBox">
            <div class="addList1Top" v-show="cate.sid"><p>{{cate.name}}</p><a href="javascript:;" class="closeBtn" @click="clearCate">×</a></div>
            <div :class="[cate.hasNext=='0' ? 'arrowNo':'','addList1']" v-for="(cate,i) in supcateArray" :key='i' ><a href="javascript:;"  @click="checkCate(cate)" >{{cate.name}}</a></div>
        </div>
    </section>
  </div>    
</template>
<script>
import goodhead from "../header.vue";
export default {
  data() {
    return {
      headname: "商品类目",

      /*类目列表 */
      supcateArray: []
    };
  },
  methods: {
    /**
      * 切换类目
      * cate 当前类目对象
      */
    checkCate(cate) {
      let _this = this,
          _cate= JSON.parse(JSON.stringify(cate));
      /**修改state中选择的类目 */
       _this.$store.commit('saveShopSet',{
         cate:_cate
       });
          
      //判断是否有下一级分类
      if(_this.cate.hasNext==1){
         _this.getCateData();
      }else{
        _this.$router.go(-1);
      }
    },
    /**
      * 获取类目集合
      */
    getCateData(){
      var _this = this;
      _this.$http("get", "//wsproduct.hc360.com/supercat/getSuperCatChild", {
          params: {
            supcatid: _this.cate.sid || ''
          }
        }).then(res => {
            res = res.data;
            if (res && res.length > 0) {
              _this.supcateArray = [...res];
            }
          }
        );
    },
     /**
       * 清除当前类目重新选择
      */
    clearCate(){
       this.$store.commit('saveShopSet',{
        cate:{}
       });
       this.getCateData();
    }
  },
  components: {
    goodhead
  },
  created() {    
    /**
     * 修改商机,清空类目,重新选择类目
     */
    this.clearCate();
  },
  computed:{
    cate(){
      return this.$store.state.productObj.cate
    }
  }
};
</script>

<style>
@import "https://style.org.hc360.com/css/microMall/releasedStyle.css";
</style>

