<template>
      <div>
       <section>
        <header class="mHeaderBox"><a class="arrowLeft" @click="backPrePage()"></a><h3>订单详情</h3></header>
       <div class="orderListBox">
			<div class="orderNum">
            	<p>订单号：{{(orderDetail.orderDetail || {}).orderSn}}</p>
                <span>{{(orderDetail.orderDetail || {}).orderStateInfo}}</span>
            </div>
            <div class="addressBox">
            	<div class="addressLeft">
                	<span>{{(orderDetail || {}).address}}</span>
                </div>
                <a :href="'tel:'+orderDetail.telephone">联系买家</a>
            </div>
            <div class="orderContent">
                <div class="orderListCon">
                    <div class="orderConTit">
                        <h2><a :href="'//m.hc360.com/b2b/'+ (orderDetail.userInfoEntity||{}).userName +'/'" class="cName">{{(orderDetail.userInfoEntity || {}).companyNameAll}}</a></h2>
                    </div> 
                    <dl v-if="( orderDetail.products || {}).prodList">
                         <dd  v-for="(pro,i) in orderDetail.products.prodList" :key="i">
                            <div class="orderImg">
                                <a :href="'//m.hc360.com/supplyself/'+ pro.bcId+'.html'">
                                <img :src="pro.bcPic">
                                </a>
                            </div> 
                            <div class="orderImgRig">
                                <a :href="'//m.hc360.com/supplyself/'+ pro.bcId+'.html'">
                                    <div class="orderName"><p class="oName">{{pro.bcName}}</p> </div> 
                                    <div class="oListPrice"><p>&yen;{{pro.bcUnitPrice}}</p><p>X{{pro.bcNumber}}</p></div>
                                </a>
                            </div>
                        </dd>
                        <dt>
                        	<div class="orderDetail">
                            	<p><span>支付方式</span><b>{{(orderDetail.orderDetail || {}).orderFlowType}}</b></p>
                            	<p><span>下单时间</span><b>{{(orderDetail.orderIntroEntity || {}).confirmOrderTime}}</b></p>
                            </div>
                        	<div class="orderDetail2">
                            	<p><span>商品总额</span><b>&yen;{{(orderDetail.products || {}).orderTotalAmout-(orderDetail.products || {}).orderFareAmount}}</b></p>
                            	<p><span>运费</span><b>&yen;{{(orderDetail.products || {}).orderFareAmount}}</b></p>
                            </div>
                        </dt>
                        
                    </dl>
                    <div class="orderDetailBot2">应付总额：<span>&yen;{{(orderDetail.products||{}).orderTotalAmout}}</span></div>
                </div>
            </div>
        </div>
	  </section>
       <footerContent/>
    </div>
</template>
<script>
import footerContent from '../footer.vue';
export default {
    data(){
       return {
          orderDetail:{} 
       }
    },
    methods:{
       /**返回上一页 */
       backPrePage(){
         this.$router.go(-1);
       }
    },
    components: {
        footerContent
    },
    created(){
       let _this=this;
        /**获取订单详情 */
        _this.$http('get','//mlogin.hc360.com/manager/order/seller/getorderdetail.do',{
             params:{
                     mtOrderId:_this.$route.query.orderid
                 }
        }).then(res=>{
             if(res.errno!=0){
                 return;
             }
             res=res.data || {};
           if(res.orderDetail){
                if(res.orderDetail.orderFlowType == "0"){
                  res.orderDetail.orderFlowType =  '慧付宝支付'
                }else if(res.orderDetail.orderFlowType == "1"){
                  res.orderDetail.orderFlowType = '线下支付'
                }
            }
             _this.orderDetail= res ;
        }) 
    }
};
</script>
