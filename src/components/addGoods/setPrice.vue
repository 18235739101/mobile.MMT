<template>
  <div>
      <goodhead :head-name="headname"></goodhead>
      <div class="addProBox">
        	<div class="priceCon">
            	<span class="proAddLeft">价格设置</span>
                <div class="priceRig">
                    <div class="redioBox"><input type="radio" id="radio-1-1" name="radio-1-set" class="regular-radio"  value="negotiable" v-model="priceType" ><label for="radio-1-1"></label><span>面议</span></div>
                    <div class="redioBox"><input type="radio" id="radio-1-2" name="radio-1-set" class="regular-radio" value="onePrice" v-model="priceType" ><label for="radio-1-2"></label><span>一口价</span></div>
                </div>
            </div>
            <div class="inventoryCon" v-show="priceType=='onePrice'">
            	<span class="inventoryLeft">价格</span>
                <div class="inventoryRig"><input type="text" placeholder="请输入商品价格" v-model.trim="priceNum" @keyup="priceNum=priceNum.replace(/(\D|\.)/g,'');" @blur="checkPrice"></div>
            </div>

            <div class="inventoryCon" >
            	<span class="inventoryLeft">库存</span>
                <div class="inventoryRig"><input type="text" placeholder="请输入商品库存" v-model.trim="proInventory" @keyup="proInventory=proInventory.replace(/\D+/ig,'');" @blur="checkInventory"></div>
            </div>
            <div class="addList3" @click="gotoRelease">
            	<span class="proAddLeft" >店铺分类</span>
                <div class="proAddLeftRig">
                    <a href="javascript:;">{{storeName}}</a>
                </div>
            </div>       
        </div>
        <button type="submit" class="releasedBtn" @click="submitShop">发布</button>
  </div>    
</template>
<script>
import goodhead from './good-head.vue';
export default {
   data(){
       return {
            headname:'添加商品',
             // 价格类型
            priceType:'negotiable',
             //商品价格
            priceNum:'',
             // 库存量
            proInventory:'',
            //商品价格的校验
            price:{
                isCheck:false,
                mes:''
            },
            //商品库存的校验对象
            inventory:{
                isCheck:false,
                mes:'' 
            }
       }
   },
   components:{
      goodhead
   },
   methods:{
       /**@method
        * 店铺分类
        */
       gotoRelease(){
           let _this=this;
           //保存价格类型，价格，库存量       
           _this.$store.commit('savePrice',{
                // 价格类型
                ptype:_this.priceType,
                //商品价格
                price:_this.priceNum,
                // 库存量
                inventory:_this.proInventory,
           })
           this.$router.push({
               path:'/addgoods/storeClass'
           })
       },
       /**@method
        * 发布商机
        */
       submitShop(){
           let _this=this;
           // 如果价格类型为一口价，包含价格字段，则校验价格字段
           if(_this.priceType=='onePrice'){
              if(_this.priceNum.length==0){
                this.$toast('请填写商品单价！');
                return;
               }else if(this.price.isCheck){
                  this.$toast(this.price.mes);
                  return;
               }
           }
           // 验证库存量
           if(!_this.proInventory){
              _this.$toast('请填写库存量！');
              return;
           }else if(_this.inventory.isCheck){
              _this.$toast(_this.inventory.mes);
              return;
           }

           // 发布商机
           _this.$http('get','http://192.168.3.52:92/mBusinChance/pubbusin',{
               params:_this.getProductParam()
           }).then((res)=>{
               if(res.success){
                  _this.$router.push({
                     path:'/addgoods/releaseSuccess'
                  })
               }else{
                   _this.$toast(res.returnMsg);
               }
           })
       },
       // 获取字段
        getProductParam(){
           var obj= {
                    //商机标题
                    title:this.productObj.title,
                    // 图片上传标识
                    sessionid:this.productObj.sessionid,
                    // 商机描述
                    introduce:this.productObj.desc,
                    // 商机分类
                    supcatid:this.productObj.cate.sid,
                    // 报价方式
                    priceType:'0',
                    // 区间单价
                    pricerange1:this.priceObj.ptype=="onePrice" ?this.priceObj.price: 0,
                    // 供货总量
                    num:this.priceObj.inventory
               }
               if(this.storeObj.name!='全部'){
                    // 店铺分类 一级
                   obj.bsid=this.storeObj.bsid;
                   if(this.storeObj.child.seriesid){
                    // 店铺分类 二级
                      obj.secondSeries=this.storeObj.child.seriesid; 
                   }
               }
               return obj;
        },
       /**@method
        * 校验价格
        */
       checkPrice(){
         let  reg=/^[1-9]+(.*[0-9]{0,2})$/ig,
              maxPrice=9999999999.99;    
         //非空校验  
         if(this.priceNum==''){
            return;
         }
         this.priceNum=(this.priceNum-0).toFixed(2);
         if(Number(this.priceNum)==0){
                this.price={
                     isCheck:true,
                     mes:'商品单价必须大于0'
                }
            }else if(this.priceNum>maxPrice){
                this.price={
                     isCheck:true,
                     mes:'单价不能超过999999999.99'
                }
            }else if(!reg.test(this.priceNum)){
                this.price={
                     isCheck:true,
                     mes:'请输入合法的价格'
                }
            }
            this.price.isCheck ? this.$toast(this.price.mes) : '';
       },
       /**@method
        * 校验库存量
        */
       checkInventory(){
           let reg=/^[1-9]{1}[0-9]{0,4}$/ig;
           if(!this.proInventory){
               return;
           }
           // 验证库存量是否正确
           if(!reg.test(this.proInventory)){
                this.price={
                     isCheck:true,
                     mes:'请输入合法的库存量'
                }
           }
           this.inventory.isCheck ? this.$toast(this.inventory.mes) : '';
       }
   },
   computed:{
       // 图片上传
       productObj(){
           return this.$store.state.productObj;
       },
       // 价格类型，库存，价格
       priceObj(){
           return this.$store.state.priceObj;
       },
       // 炫铺对象
       storeObj(){
           return this.$store.state.storeObj;
       },
       // 炫铺名称
       storeName(){
           let storeClass=this.storeObj;
           if(storeClass.child.seriesid){
               return  storeClass.child.name
           }else{
               return storeClass.name;
           }           
       }
   },
   beforeMount(){
       // 保存价格类型
       this.priceType=this.priceObj.ptype;
       // 保存价格
       this.priceNum=this.priceObj.price;
       // 保存库存量
       this.proInventory=this.priceObj.inventory;
   }
}
</script>
