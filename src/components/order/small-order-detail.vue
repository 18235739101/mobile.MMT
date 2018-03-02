<template>
  <div>
       <section>
        <headerTop :head-name="headName"></headerTop>
        <div class="orderListBox" >
            <div v-if="orderDetail.order">
                <div class="orderNum">
                    <p>{{orderDetail.order.orderCode}}</p>
                    <span>{{statusList[orderDetail.order.orderStatus]}}</span>
                </div>
                <div class="wxAddressBox">
                    <div class="addressLeft">
                        <h5>{{orderDetail.order.rec_name}}<span>{{orderDetail.order.telephone}}</span></h5>
                        <p>{{orderDetail.order.rec_addr}}</p>
                    </div>
                </div>
            </div>
            <div class="orderContent">
                <div class="orderListCon">
                    <div class="orderConTit" v-if="orderDetail.order">
                        <h2><a href="javascript:;" class="wxImgIco"><img :src="orderDetail.order.headImg"></a><a href="javascript:;" class="cName">{{orderDetail.order.nickname}}</a></h2>
                    </div> 
                    <dl>
                        <dd v-show="orderDetail.prodList" v-for="(item,i) in orderDetail.prodList" :key="i">
                            <div class="orderImg">
                                <a href="javascript:;"><img :src="item.bcPic"></a>
                            </div> 
                            <div class="orderImgRig">
                                <a href="javascript:;">
                                    <div class="orderName"><p class="oName">{{item.bcName}}</p> </div> 
                                    <div class="oListPrice"><p>&yen;{{item.bcUnitPrice}}</p><p>X{{item.bcNumber}}</p></div>
                                </a>
                                <!-- 订单状态 1代发货 2待收货  3 已完成 -->
                               <span v-if="orderDetail.order&&orderDetail.order.orderStatus==1" >
                                   <a :href="'#/smallOrder/delivery?orderid='+orderDetail.order.orderCode" class="fhBtn">发货</a>
                               </span>
                            </div>
                        </dd>
                        <dt v-if="orderDetail.order">
                        	<div class="orderDetail">
                            	<p><span>下单时间</span><b>{{orderDetail.order.orderCreateTime}}</b></p>
                            </div>
                        	<div class="orderDetail2">
                            	<p><span>商品总额</span><b>&yen;{{orderDetail.order.orderTotalAmout}}</b></p>
                            	<p><span>运费</span><b>&yen;{{orderDetail.order.orderFareAmount}}</b></p>
                            </div>
                        </dt>
                    </dl>
                    <div class="orderDetailBot2">应付总额：<span>&yen;1.00</span></div>
                </div>
            </div>
            <div class="courierBox" v-if="orderDetail.post">
            	<ul>
                	<li v-show="orderDetail.post.post_company">
                        <span class="courierLeft">物流公司：</span><span class="courierRig">{{orderDetail.post.post_company}}</span>
                     </li>
                	<li v-show="orderDetail.post.post_code">
                        <span class="courierLeft">物流单号：</span><span class="courierRig">{{orderDetail.post.post_code}}</span>
                    </li>
                	<li v-show="orderDetail.post.post_remark">
                        <span class="courierLeft">备注：</span><span class="courierRig">{{orderDetail.post.post_remark}}</span>
                    </li>
                </ul>
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
    data(){
       return {
          headName:'订单详情',
          orderDetail:{},
          /**
             * 订单状态
             */
            statusList:{
                1:'待发货',
                2:'待收货',
                3:'已完成'
            }          
       }
    },
    components: {
        footerContent,
        headerTop
    },
    created(){
       let _this=this;              
       /**获取订单详情 */
        _this.$http('get','http://madata.hc360.com/mobileapp/order/getAppOrderDetail',{
             params:{
                     orderCode:_this.$route.query.orderid
                 }
        }).then(res=>{
           res=(res.data || {}).orderDetail;
           if(res){
              _this.orderDetail= res;
           }
        })    
    }
};
</script>
