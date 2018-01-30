<template>
    <section>
        <header class="mHeaderBox"><a href="#" class="arrowLeft"></a><h3>订单管理</h3></header>
        <div class="orderTab">
        	<dl>
            	<dd @click="checkComponent(nav.componentName)" :class="{'tabCur':nav.componentName==currentView}" v-for="(nav,i) in navList" :key="i"><a>{{nav.name}}</a></dd>
          </dl>
        </div>
        <keep-alive>
          <component :is="currentView"></component>
        </keep-alive>  
	</section>
</template>
<script>
/** 引入当前组件的样式 */
import "../../css/manageStyle.css";
import ShopOrder from "./shop-order";
import SmallOrder from "./small-order";
export default {
  data: () => {
    return {
      currentView: "ShopOrder",
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
    SmallOrder
  },
  methods: {
    /**
     * @method 切换店铺订单和小程序订单路由
     */
    swichRouter(e) {
      var that = this;

      const navContent = e.target.innerText,
        routerList = [
          {
            name: "店铺订单",
            path: "/order",
            componentName: "ShopOrder"
          },
          {
            name: "小程序订单",
            path: "/smallOrder",
            componentName: "SmallOrder"
          }
        ];

      routerList.forEach(function(val) {
        if (val.name == navContent) {
          that.$router.push(val.path);
        }
      });
    },
    checkComponent(name) {
      this.currentView = name;
    }
  },
  created() {}
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


