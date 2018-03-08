<template>
    <div>
    <section>
      <headerTop :head-name="headName"></headerTop>
      <div class="orderListBox">
            <div class="wxOrderTit">
                <ul>
                    <li :class="{orderCur:orderVal.name==orderStatus.name}" v-for="(orderVal,i) in statusList" :key="i" @click="clickTabs(orderVal)">{{orderVal.name}}</li>                            
                  </ul>
              </div>
              <div ref="wrapper"  class="orderContent">
                <div class="orderNo" v-show="finisheLoaded&&orderContent.length==0"><p>暂无订单</p></div>
                  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="30">
                      <div class="orderListCon" v-show="orderContent.length>0" v-for="(ol,i) in orderContent" :key="i" >
                          <div class="orderConTit">
                              <h2>
                                  <a href="javascript:;" class="wxImgIco"><img :src="ol.order.headImg"></a>
                                  <a href="javascript:;" class="cName">{{ol.order.nickname}}</a>
                              </h2>
                              <em class="orderState">{{ deliveryStatus[parseInt(ol.order.orderStatus)] }}</em>
                          </div> 
                          <dl>
                              <dd v-for="(order,i) in ol.prodList" :key="i">
                                  <div class="orderImg">
                                      <a :href="'#/smallOrder/detail?orderid='+ol.order.orderCode"><img :src="order.bcPic"></a>
                                  </div> 
                                  <div class="orderImgRig">
                                      <a :href="'#/smallOrder/detail?orderid='+ol.order.orderCode">
                                          <div class="orderName"><p class="oName">{{ order.bcName }}</p> </div> 
                                          <div class="oListPrice"><p>&yen;{{ order.bcUnitPrice }}</p><p>X{{ order.bcNumber }}</p></div>
                                      </a>
                                  </div>
                              </dd>
                          </dl>
                          <div class="orderBot">
                              <div class="wxOrderBot"><p>共{{ ol.prodList.length }}件商品 合计：<span>&yen;{{ol.order.orderTotalAmout}}</span>（含运费￥{{ol.order.orderFareAmount}}）</p></div>
                              <div class="logisticsBtn" v-show="ol.order.orderStatus==1"><a :href="'#/smallOrder/delivery?orderid='+ol.order.orderCode">发货</a></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    </section> 
    <footerContent/>
   </div>
</template>

<script>
import footerContent from '../footer.vue';
import headerTop from '../header.vue';
export default {
  data() {
    return {
      /**
       * 导航名称
       */
      headName:'订单管理', 

      /**
       * 登录用户名
       */
      username:'',

      /**
       * 订单状态
       */
      statusList: [
        {
          state: "",
          name: "全部"
        },
        {
          state: 1,
          name: "待发货"
        },
        {
          state: 2,
          name: "待收货"
        },
        {
          state: 3,
          name: "已完成"
        }
      ],

      /**
       * 分页属性
       */
      searchCondition: {
        pageNo: 0,
        pageSize: 5
      },


      /**
       * 订单列表集合
       */
      orderContent: [],

      /**
       * 是否显示加载
       */
      loading: false,
     
      /**
       * 订单数据是否加载完毕
       */
      finisheLoaded: false,

      /**
       * 发货状态码
       */
      deliveryStatus:{
         1:"待发货",
         2:"待收货",
         3:"已完成"
      }
    };
  },
  components: {
    headerTop,
    footerContent
  },
  computed:{
    orderStatus(){
      return this.$store.state.orderStatus
    }
  },
  methods: {
    
       
    /**
     *  滚动事件分页加载订单列表
     */
    loadMore() {
      let _this = this;
      if(_this.finisheLoaded){
         return;
      }
      _this.loading = true;
      _this.searchCondition.pageNo++;
      _this.$http('get','http://madata.hc360.com/mobileapp/order/getAppOrderList',{
         params: {
              //用户名
              identity:_this.username,
              //订单状态
              status: _this.orderStatus.state,
              //当前第几页
              pageNo: _this.searchCondition.pageNo,
              //代表买家卖家 1买家  2卖家
              sign:2
         }
      }).then(res=>{
         /**
          * 没有订单数据
          */ 
         if(res.errcode==1){
             _this.finisheLoaded = true;
             _this.loading = false;
             return;
          }
          let data = (res.data||{}).orderlist;
          if (data && data.length > 0) {
            /**服务器返回数据小于请求的条数大小， 数据加载完毕*/
            if (data.length < _this.searchCondition.pageSize) {
              _this.finisheLoaded = true;
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
    clickTabs(item) {

      /**
       * 修改订单状态对象
       */
      this.$store.commit('saveOrderState',item);

      /**
       * 清空订单列表
       */
      this.orderContent = [];

      /**
       * 修改当前页码
       */
      this.searchCondition.pageNo = 0;

      /**
       * 修改是否已经加载完所有订单的状态
       */ 
      this.finisheLoaded = false;

      this.loadMore();
    }
  },
  created(){
    /**
     * 获取本地存储的用户状态
     */
    let companInfo=JSON.parse(localStorage.getItem('companyInfo')||'{}');
    this.username=companInfo.username;
  }
};
</script>

