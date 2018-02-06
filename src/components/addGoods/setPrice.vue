<template>
  <div>
      <goodhead :head-name="headname"></goodhead>
      <div class="addProBox">
        	<div class="priceCon">
            	<span class="proAddLeft">价格设置</span>
                <div class="priceRig">
                    <div class="redioBox"><input type="radio" id="radio-1-1" name="radio-1-set" class="regular-radio"  value="negotiable" v-model="priceObj.ptype" ><label for="radio-1-1"></label><span>面议</span></div>
                    <div class="redioBox"><input type="radio" id="radio-1-2" name="radio-1-set" class="regular-radio" value="onePrice" v-model="priceObj.ptype" ><label for="radio-1-2"></label><span>一口价</span></div>
                </div>
            </div>
            <div class="inventoryCon" v-show="priceObj.ptype=='onePrice'">
            	<span class="inventoryLeft">价格</span>
                <div class="inventoryRig"><input type="text" placeholder="请输入商品价格" v-model.trim="priceObj.price" @keyup="priceObj.price=priceObj.price.replace(/(\D|\.)/g,'');" @blur="checkPrice"></div>
            </div>

            <div class="inventoryCon" >
            	<span class="inventoryLeft">库存</span>
                <div class="inventoryRig"><input type="text" placeholder="请输入商品库存" v-model.trim="priceObj.inventory" @keyup="priceObj.inventory=priceObj.inventory.replace(/\D+/ig,'');" @blur="checkInventory"></div>
            </div>
            <div class="addList3" @click="gotoRelease">
            	<span class="proAddLeft" >店铺分类</span>
                <div class="proAddLeftRig">
                    <a href="javascript:;">{{storeClassList}}</a>
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
            priceObj:{
                // 价格类型
                ptype:'negotiable',
                //商品价格
                price:'',
                // 库存量
                inventory:'',
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
           _this.$store.commit('changePrice',_this.priceObj)
           this.$router.push({
               path:'/addgoods/storeClass'
           })
       },
       /**@method
        * 发布商机
        */
       submitShop(){
           let data=this.priceObj;
           if(data.ptype=='onePrice'&&data.price.length==0){
               this.$toast('请填写商品单价！');
               return;
           }
           if(data.inventory.length==0){
              this.$toast('请填写库存量！');
               return;
           }
           this.$router.push({
               path:'/addgoods/releaseSuccess'
           })
       },
       /**@method
        * 校验价格
        */
       checkPrice(){
        if(this.priceObj.price==''){
               return;
           }
         this.priceObj.price=(this.priceObj.price-0).toFixed(2);
         let reg=/^[1-9]+(.*[0-9]{0,2})$/ig,
              maxPrice=9999999999.99,
              price=this.priceObj.price;     
           if(Number(price)==0){
                 this.$toast('商品单价必须大于0');
            }else if(price>maxPrice){
                 this.$toast('单价不能超过999999999.99');
            }else if(!reg.test(price)){
                 this.$toast('请输入合法的价格');
            }
       },
       /**@method
        * 校验库存量
        */
       checkInventory(){
           let reg=/^[1-9]{1}[0-9]{0,4}$/ig,
               inventory=this.priceObj.inventory;
           if(inventory.length==0){
                this.$toast('请输入库存量');
           }else if(!reg.test(inventory)){
              this.$toast('请输入合法的库存量');
           }
       }
   },
   computed:{
       // 价格类型，一口价，面议
       priceSite(){
           return this.$store.state.priceSite;
       },
       // 炫铺分类
       storeClassList(){
           return this.$store.state.storeClassList;
       }
   },
   beforeMount(){
       this.priceObj=Object.assign(this.priceObj,this.priceSite);
   }
}
</script>
