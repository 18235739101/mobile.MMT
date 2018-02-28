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
            if(_this.routerPath){
               _this.$router.push({
                   path:_this.routerPath
               }) 
               return;  
            }   
            _this.$router.go(-1);
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

