<template>
  <div>
      <goodhead :head-name="headname"></goodhead>
      <section>
		<div class="addProBox">
        	<div class="describeBox">
            	<textarea name="shopdesc" placeholder="添加商品描述" maxlength="500" value="ddd" v-model="shopdesc">
                </textarea>
                <span>不超过500字</span>
            </div>
        </div>
        <button  class="releasedBtn" @click="submitdesc">完成</button>
    </section>
  </div>    
</template>
<script>
import goodhead from './good-head.vue';
export default {
   data(){
       return {
            headname:'添加商品描述',
            shopdesc:'',
       }
   },
   components:{
       goodhead
   },
   methods:{
     /**@method
      * 提交描述 
      */  
     submitdesc(){
        this.$store.commit('changeDesc',this.shopdesc);
        this.$router.go(-1);
     }
   },
   computed:{
       desc(){
           return this.$store.state.desc
       }
   },
   beforeMount(){
       this.shopdesc=this.desc ? this.desc : '';
   }
}
</script>
