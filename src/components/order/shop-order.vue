<template>
    <div class="orderListBox">
        	<div  class="orderTit">
                <ul>
                    <swiper :options="swiperOption">
                       <swiper-slide v-for="(item,index) in statusList" :key="index"><li :class="{orderCur:item.name==orderStatus.name}" @click="clickTabs(item)">{{item.name}}</li></swiper-slide>                        
                  </swiper>
                </ul>
            </div>
            <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }" class="orderContent"  >
            	<div class="orderNo" v-show="finisheLoaded&&orderContent.length==0"><p>暂无订单</p></div>                
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="30">
                  <div class="orderListCon" v-show="orderContent.length>0" v-for="(ol,i) in orderContent" :key="i">
                    <div class="orderConTit">
                        <h2><a :href="'tel:'+ol.telephone" class="orderTelIco"></a><a :href="'//m.hc360.com/b2b/'+ol.order.userName+'/'" class="cName">{{ol.order.fullCompanyName}}</a></h2>
                        <a :href="'#/shopOrder/detail?orderid='+ol.order.mtOrderId" class="orderDetailBtn">订单详情</a>
                    </div> 
                    <dl>
                        <dd v-for="(pro,j) in ol.products.prodList" :key="j">
                            <div class="orderImg">
                                <a :href="'//m.hc360.com/supplyself/'+pro.bcId+'.html'">
                                <img :src="pro.bcPic">
                                </a>
                            </div> 
                            <div class="orderImgRig">
                                <a :href="'//m.hc360.com/supplyself/'+pro.bcId+'.html'">
                                    <div class="orderName"><p class="oName">{{pro.bcName}}</p> </div> 
                                    <div class="oListPrice"><p>&yen; {{pro.bcUnitPrice}}</p><p>X{{pro.bcNumber}}</p></div>
                                </a>
                            </div>
                        </dd>
                    </dl>
                    <div class="orderBot">
                        <div class="BotLeft">	
                            <p>订单号：{{ol.order.orderSn}}</p>
                            <span>下单时间：{{ol.order.orderCreateTime}}</span>
                        </div>
                        <div class="BotRight" v-show="ol.orderStatus!='交易成功'">
                            <p>{{ol.orderStatus}}</p>
                        </div>
                         <em class="completeIco" v-show="ol.orderStatus=='交易成功'"></em>
                    </div>
                    <div class="orderBot2"><p>共{{ol.products.prodList.length}}件商品 合计：<span v-if="ol.products.orderTotalAmout">&yen;{{ol.products.orderTotalAmout}}</span>（含运费￥{{ol.products.orderFareAmount}}）</p></div>
                </div>
                 </div>
                <!-- 下拉加载数据 -->
                <p v-show="loading" class="page-infinite-loading">
                    <mt-spinner type="snake"></mt-spinner>
                    加载中...
                </p>           
            </div>
        </div> 
</template>
<script>
/** 引入swiper组件库和样式 */
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data: () => {
    return {
      /**
        * [swiper配置项]
        */
      swiperOption: {
        slidesPerView: "4", //设置slider容器能够同时显示的slides数量
        spaceBetween: 0,
        freeMode: true // 默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动且不会贴合。
      },
      /**
        * 订单状态集合
        */
      statusList: [
        {
          state:'',
          name: "全部"
        },
        {
          state:100,
          name: "待确认"
        },
        {
          state:200,
          name: "买家待付款"
        },
        {
          state:300,
          name: "待发货"
        },
        {
          state:400,
          name: "买家待收货"
        },
        {
          state:800,
          name: "已完成"
        },
        {
          state:900,
          name: "已关闭"
        }
      ],
      /*
      *分页属性 
      */
      searchCondition: {
        pageNo: 0,
        pageSize:6
      },
      /** 订单状态对象 */
      orderStatus: {
        name: "全部",
        state: ''
      },
      /**订单列表集合 */
      orderContent: [],
      /**是否显示加载中按钮 */
      loading: false,
      /**滚动区域的高度 */
      wrapperHeight: 0,
      /**订单数据是否加载完毕 */
      finisheLoaded:false
    };
  },
  components: {
    swiper,
    swiperSlide
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
            path: "/order"
          },
          {
            name: "小程序订单",
            path: "/smallOrder"
          }
        ];

      routerList.forEach(function(val) {
        if (val.name == navContent) {
          that.$router.push(val.path);
        }
      });
    },
     
     /**
     * @method 滚动事件分页加载订单列表
     */
    loadMore() {
      let _this = this;
      if(_this.finisheLoaded){
        return false;
      }
       _this.loading = true;
      //当前页数加1
      _this.searchCondition.pageNo++;
      /***调用订单接口 */
      _this.$http('get','//mlogin.hc360.com/manager/order/seller/getorderlist.do',{params:{
              stateDesc:_this.orderStatus.state,
              page: _this.searchCondition.pageNo
      }}).then((res)=>{
             if(parseInt(res.errno)!=0){
               return;
             }
             res=res.data;
             if(!res){
                _this.finisheLoaded=true;
                return;
             }else{
                let data =(res|| {}).orderlist;
                 /**服务器返回数据小于请求的条数大小， 数据加载完毕*/
                if(data.length<_this.searchCondition.pageSize){
                  _this.finisheLoaded=true;
                }
                 _this.loading = false;
                _this.orderContent = _this.orderContent.concat(data);
             }
      })  
     
    },
    /**
     * @method 订单状态切换
     * @param item 点击的订单状态 
     */
    clickTabs(item){
        // 修改订单状态对象
        this.orderStatus=item;
        //清空订单列表
        this.orderContent=[];
        // 修改当前页码
        this.searchCondition.pageNo=0;
        // 修改是否已经加载完所有订单的状态
        this.finisheLoaded=false;

        this.loadMore();
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


