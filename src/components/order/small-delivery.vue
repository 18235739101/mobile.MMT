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
        /**
         * 保存物流信息
         */
        saveLogistics(){
           let _this=this; 
           return new Promise(function(resovle,reject){
               _this.$http('get','http://madata.hc360.com/mobileapp/order/saveAppPost',{
                    params:{
                        orderCode:_this.orderCode,
                        post_code:encodeURIComponent(_this.courierNum),
                        post_company:encodeURIComponent(_this.logisticsCom),
                        post_remark:encodeURIComponent(_this.note),
                    }
               }).then((res)=>{
                   if(res.errcode==0){
                       resovle(res);
                   }
               })
           })
        },
        /**
         * 修改订单状态
         */
        changeOrder(){
            let _this=this;
            return new Promise((resolve,reject)=>{
                _this.$http('get','http://madata.hc360.com/mobileapp/order/orderSendOrRec',{
                       params:{
                          orderCode:_this.orderCode,
                          //确认发货 
                          status:2
                       }
                }).then((res)=>{
                    if(res.errcode==0){
                        resolve(res);
                    }
                })
            })
        },
        /**
         * 发送模板消息
         */
        sendTemplateMess(){
             let _this=this;
             return new Promise((resovle,reject)=>{
               _this.$http('get','http://madata.hc360.com/mobileapp/appManager/sendTemplateMessage',{
                    params:{
                       //0-支付成功模板  1-确认收货模板 2-发货模板                                   
                        sign:2
                    }
                }).then((res)=>{})
             })
        },
        /**
         * 提交物流信息
         */
        submit(){
            let _this=this;

            _this.saveLogistics().then((data)=>{
                return _this.changeOrder();
            }).then(res=>{
                if(res.errcode==0){
                   _this.$router.go('-1');
                   return _this.sendTemplateMess(); 
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
