<template>
     <div>
         <section>
            <header class="mHeaderBox"><a href="javascript:;" class="arrowLeft" @click="backPrePage()"></a><h3>订单发货</h3></header>
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
export default {
    data(){
      return {
         logisticsCom:'',
         courierNum:'',
         note:'',
         orderCode:''

      }   
    },
    methods:{
        submit(){
            let _this=this;
            _this.$http('get','http://madata.hc360.com/mobileapp/order/saveAppPost',{
                params:{
                    orderCode:_this.orderCode,
                    post_code:_this.courierNum,
                    post_company:_this.logisticsCom,
                    post_remark:_this.note,
                }
            }).then((res)=>{
               if(res.errcode==0){
                   _this.$http('get','http://madata.hc360.com/mobileapp/order/orderSendOrRec',{
                       params:{
                          orderCode:_this.orderCode,
                          //确认发货 
                          status:2
                       }
                   }).then((res)=>{
                       if(res.errcode==0){
                           console.log('发货成功')
                       }
                   })
               }
            })
           console.log(this.logisticsCom,this.courierNum,this.note)
        },
        backPrePage(){
            this.$router.go(-1);
        }
    },
    components: {
        footerContent
    },
    created(){
        this.orderCode=this.$route.query.orderid;
    }
}
</script>
