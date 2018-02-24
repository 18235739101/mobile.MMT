<template>
  <section>
       <div class="proTitBox">
       		<ul>
                   <li v-for="(tab,i) in tabs" :key="i" :class="{titCur:activeTabIndex==i}" @click="tabToggle($event,i,tab.view)"><a href="javascript:void(0)">{{tab.name}}</a></li>
            </ul>
       </div>

        <transition name="component-fade" mode="out-in">
            <component :is="currentView" keep-alive></component>
        </transition>

       <div class="proBotAdd">
       		<a href="#/addgoods">添加商品</a>
       </div> 
       
    </section>
</template>

<script>
import goodsOnsale from 'components/goodsManage/goodsOnsale';
import goodsForCheck from 'components/goodsManage/goodsForCheck';
import goodsRefuse from 'components/goodsManage/goodsRefuse';
import goodsOff from 'components/goodsManage/goodsOff';

export default {
  
  data(){
      return {
          tabs: [
          {
            name:'在售商品',
            view: 'goodsOnsale'
          },
          {
            name:'待审核商品',
            view: 'goodsForCheck'
          },
          {
            name:'审核未通过',
            view: 'goodsRefuse'
          },
          {
            name:'已下架商品',
            view: 'goodsOff'
          }
        ],

        /**
         * 当前选中tab组件名称
         */
        currentView:'goodsOnsale',

        /**
         * 当前tab索引值
         */
        activeTabIndex:0

      }
  },

  components:{
      goodsOnsale,
      goodsForCheck,
      goodsRefuse,
      goodsOff
  },

  methods:{

      /**
       * 切换tab
       */
      tabToggle(e,i,view){
          let _this = this;

        _this.currentView = view;

        _this.activeTabIndex = i;

      }
      
  },

  mounted(){

  }
}
</script>

<style>
@import 'https://style.org.hc360.com/css/microMall/proManage.css';

.component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ;
}
.component-fade-enter, .component-fade-leave-to{
    opacity: 0;
}
</style>

