<template>
  <div>
      <goodhead :head-name="headname" :router-path="routerPath" ></goodhead>
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
                <div class="inventoryRig"><input type="text" placeholder="请输入商品价格" v-model.trim="priceNum" @keyup="priceNum=priceNum.replace(/[^\d\.]*/,'')"  @blur="checkPrice"></div>
            </div>

            <div class="inventoryCon" >
            	<span class="inventoryLeft">库存</span>
                <div class="inventoryRig"><input type="text" placeholder="请输入商品库存" v-model.trim="proInventory" @keyup="proInventory=proInventory.replace(/^\D*/,'')" @blur="checkInventory"></div>
            </div>
            <div class="addList3" @click="gotoRelease">
            	<span class="proAddLeft" >店铺分类</span>
                <div class="proAddLeftRig">
                    <a href="javascript:;">{{storeName}}</a>
                </div>
            </div>       
        </div>
        <button type="submit"  :class="[ buttonHtml=='发布' ? 'releasedBtn' : 'releasedBtnGray' ]" @click="submitShop">{{ buttonHtml }}</button>
  </div>    
</template>
<script>
import goodhead from "../header.vue";
export default {
   data(){
       return {
            // 头部标题
            headname:'添加商品',

            // 返回按钮跳转链接
            routerPath:'/addgoods',

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
            },

            buttonHtml:'发布'
       }
   },
   components:{
      goodhead
   },
   methods:{
       /**
        * 店铺分类
        */
       gotoRelease(){
           let _this=this;
           this.$router.push({
               path:'/addgoods/storeClass'
           })
       },
       
       /**
        * 发布商机
        */
       submitShop(){
           let _this=this;
           // 判断价格类型为一口价，验证价格字段
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

           if(_this.buttonHtml=='发布中...'){
               _this.$toast('商机发布中，请勿再次发布！');
               return;
           }
      
           // 修改发布按钮显示状态
           _this.buttonHtml='发布中...'
         
           // 发布商机
           _this.$http('get','//wsproduct.hc360.com/mBusinChance/pubbusin',{
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
       /**
        * 获取发布商机的字段
        */
       getProductParam(){
           var obj= {
                    title:this.productObj.title,
                    bcid:this.productObj.bcid,
                    sessionid:this.productObj.sessionid,
                    introduce:this.productObj.desc,
                    supcatid:this.productObj.cate.sid,
                    priceType:'0',
                    pricerange1:this.priceObj.ptype=="onePrice" ? this.priceObj.price: 0,
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
       /**
        * 校验价格
        */
       checkPrice(){
         let  reg=/^\d{1,10}(.*\d{0,2})$/ig; 
         if(this.priceNum==''){
            return;
         }
         this.priceNum=(this.priceNum-0).toFixed(2);
         if(this.priceNum=='0.00'){
                this.price={
                     isCheck:true,
                     mes:'价格不能为0'
                }
         }else if(!reg.test(this.priceNum)){
                this.price={
                     isCheck:true,
                     mes:'请输入合法的价格'
                }
         }else{
             this.price={
                     isCheck:false,
                     mes:''
             }
             this.commitPrice();
         }

         this.price.isCheck ? this.$toast(this.price.mes) : '';
       },
       /**
        * 校验库存量
        */
       checkInventory(){
           let reg=/^[1-9]{1}\d{0,4}$/ig;
           if(!this.proInventory){
               return;
           }
           if(!reg.test(this.proInventory)){
                this.inventory={
                     isCheck:true,
                     mes:'请输入合法的库存量'
                }
           }else{
               this.inventory={
                     isCheck:false,
                     mes:''
                }
                this.commitPrice();
           }
           this.inventory.isCheck ? this.$toast(this.inventory.mes) : '';
       },
       /**
        * 保存价格设置
        */
       commitPrice(){
           let _this=this;    
           _this.$store.commit('savePrice',{
                // 价格类型
                ptype:_this.priceType,
                //商品价格
                price:_this.priceNum,
                // 库存量
                inventory:_this.proInventory,
           })
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
               return storeClass.child.name
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
   },
}
</script>
<style>
@import "https://style.org.hc360.com/css/microMall/releasedStyle.css";
</style>
