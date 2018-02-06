<template>
    <div>
      <section>
          <header class="mHeaderBox"><a href="javascript:;" class="arrowLeft" @click="backPrePage()"></a><h3>订单管理</h3></header>
          <div class="orderTab">
            <dl>
                <dd @click="checkComponent(nav.componentName)" :class="{'tabCur':nav.componentName==currentView}" v-for="(nav,i) in navList" :key="i"><a>{{nav.name}}</a></dd>
            </dl>
          </div>
          <keep-alive>
            <component :is="currentView"></component>
          </keep-alive>  
    </section>
     <footerContent/>
  </div> 
</template>
<script>
import ShopOrder from "./shop-order";
import SmallOrder from "./small-order";
import footerContent from '../footer.vue';
export default {
  data: () => {
    return {
      navList: [
        {
          name: "店铺订单",
          componentName: "ShopOrder"
        },
        {
          name: "小程序订单",
          componentName: "SmallOrder"
        }
      ]
    };
  },
  components: {
    ShopOrder,
    SmallOrder,
    footerContent
  },
  methods: {
    /***
     * 提交mutation
     */
    checkComponent(name) {
      this.$store.commit('changeComponent',name);
    },
    backPrePage(){
      this.$router.go(-1);
    }
  },
  computed:{
    currentView(){
      return this.$store.state.componentname
    }
  }
};
</script>
<style>

.page-infinite-loading {
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.page-infinite-loading div {
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
</style>  


