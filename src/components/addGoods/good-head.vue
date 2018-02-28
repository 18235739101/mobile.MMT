<template>
   <header class="mHeaderBox">
       <a href="javascript:;" class="arrowLeft" @click="gotoback()"></a>
       <h3>{{headName}}</h3>
    </header>
</template>
<script>
   export default{
       data(){
         return {

         }
       },
       methods:{
           gotoback(){
            let _this=this;   
            if(this.routerPath){
               this.$router.push({
                   path:_this.routerPath
               }) 
               return;  
            }   
            this.$router.go(-1);
           }
       },
       props:{
           headName:{
               type:String
           },
           routerPath:{
               type:String
           }
       }
   }
</script>

<style>
 @import 'https://style.org.hc360.com/css/microMall/releasedStyle.css';
</style>
