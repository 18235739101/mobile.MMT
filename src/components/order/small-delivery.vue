<template>
     <div>
         <section>
            <headerTop :head-name="headName"></headerTop>
            <div class="courierContent">
                <ul>
                    <li>
                        <em class="ico1"></em>
                        <input type="text" placeholder="请输入物流公司" v-model="logisticsCom">
                    </li>
                    <li>
                        <em class="ico2"></em>
                        <input  type="text" placeholder="请输入单号" v-model="courierNum">
                    </li>
                    <li>
                        <em class="ico3"></em>
                        <input type="text" placeholder="备注" v-model="note">
                    </li>
                </ul>
                <button type="submit" @click="submit">确定</button>
                <p>若您选择了其他物流公司，请填写物流联系方式，便于买家查询商品，以免给您带来不必要的损失</p>
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
         headName:'订单发货',
         logisticsCom:'',
         courierNum:'',
         note:'',
         orderCode:''
      }   
    },
    methods:{
        submit(){
            let _this=this;
            // 保存物流信息
            _this.$http('get','http://madata.hc360.com/mobileapp/order/saveAppPost',{
                params:{
                    orderCode:_this.orderCode,
                    post_code:encodeURIComponent(_this.courierNum),
                    post_company:encodeURIComponent(_this.logisticsCom),
                    post_remark:encodeURIComponent(_this.note),
                }
            }).then((res)=>{
               if(res.errcode==0){
                   //修改订单状态
                   _this.$http('get','http://madata.hc360.com/mobileapp/order/orderSendOrRec',{
                       params:{
                          orderCode:_this.orderCode,
                          //确认发货 
                          status:2
                       }
                   }).then((res)=>{
                       if(res.errcode==0){
                           _this.$router.go('-1'); 
                           // 发送小程序模板消息
                           _this.$http('get','http://madata.hc360.com/mobileapp/appManager/sendTemplateMessage',{
                               params:{
                                   //0-支付成功模板  1-确认收货模板 2-发货模板
                                   sign:2
                               }
                           }).then((res)=>{

                           })
                       }
                   })
               }
            })
        }
    },
    components: {
        footerContent,
        headerTop
    },
    created(){
        this.orderCode=this.$route.query.orderid;
    }
}
</script>
