<template>
    <div class="orderListBox">
        	<div class="wxOrderTit">
            	<ul>
                	<li :class="{orderCur:orderVal.name==orderStatus.name}" v-for="(orderVal,i) in statusList" :key="i" >{{orderVal.name}}</li>                            
                </ul>
            </div>
            <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }" class="orderContent">
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
                            <div class="logisticsBtn" v-show="getOrderStatus(ol.order.orderStatus)"><a :href="'#/smallOrder/delivery?orderid='+ol.order.orderCode">发货</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
/** 引入当前组件的样式 */
import "../../css/manageStyle.css";
export default {
  data() {
    return {
      /**
        * 订单状态集合
        */
      statusList: [
        {
          state: "",
          name: "全部"
        },
        {
          state: 300,
          name: "待发货"
        },
        {
          state: 400,
          name: "待收货"
        },
        {
          state: 800,
          name: "已完成"
        }
      ],
      /*
      *分页属性 
      */
      searchCondition: {
        pageNo: 0,
        pageSize: 5
      },
      /** 订单状态对象 */
      orderStatus: {
        name: "全部",
        state: ""
      },
      /**订单列表集合 */
      orderContent: [],
      /**是否显示加载中按钮 */
      loading: false,
      /**滚动区域的高度 */
      wrapperHeight: 0,
      /**订单数据是否加载完毕 */
      finisheLoaded: false,
       /**发货状态码 */
      deliveryStatus:{
         0:"代发货",
         1:"待收货",
         2:"已完成"
      }
    };
  },
  methods: {
     getOrderStatus(status){
      /**发货状态码 */
      const deliveryStatus={
         0:"代发货",
         1:"待收货",
         2:"已完成"
      },
      orderContext=deliveryStatus[parseInt(status)];
      return orderContext=="代发货"
     },
     /**
     * @method 获取订单列表
     */
    getOrderData(status) {
      let _this = this;
      return new Promise(function(resolve, reject) {
        if (_this.finisheLoaded) {
          reject("数据加载完毕");
          return;
        }
        _this.axios
          .get("/manager/order/seller/orderlist", {
            params: {
              stateDesc: _this.orderStatus.state,
              page: _this.searchCondition.pageNo
            }
          })
          .then(
            response => {
              response = response.data || {};
              /**
                * 验证数据状态
                */
              if (parseInt(response.errCode) !== 0) {
                console.log("State code is error!");
                reject(response);
                return;
              }
              resolve(response.data || {});
            },
            err => {
              console.log("Failed to get Data,Please try again later!");
              reject(err);
            }
          );
      });
    },
    /**
     * @method 滚动事件分页加载订单列表
     */
    loadMore() {
      let _this = this;
      if (!_this.finisheLoaded) {
        _this.loading = true;
        //当前页数加1
        _this.searchCondition.pageNo++;
        /***数据返回成功 */
        _this.getOrderData().then(res => {
          let data = res.orderlist;
          if (data && data.length > 0) {
            /**服务器返回数据小于请求的条数大小， 数据加载完毕*/
            if (data.length < _this.searchCondition.pageSize) {
              _this.finisheLoaded = true;
            }
            _this.loading = false;
            _this.orderContent = _this.orderContent.concat(data);
            console.log( _this.orderContent)
          }
        },err=>{
            console.log(err);
        });
      }
    },
    /**
     * @method 订单状态切换
     * @param item 点击的订单状态 
     */
    clickTabs(item) {
      // 修改订单状态对象
      this.orderStatus = item;
      //清空订单列表
      this.orderContent = [];
      // 修改当前页码
      this.searchCondition.pageNo = 0;
      // 修改是否已经加载完所有订单的状态
      this.finisheLoaded = false;

      this.loadMore();
    }
  }
};
</script>

