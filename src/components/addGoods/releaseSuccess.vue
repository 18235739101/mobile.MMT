<template>
   <div>
    <goodhead :head-name="headname"></goodhead>
    <section>
        <div class="succBox">
            <em></em>
            <p>恭喜您商品发布成功</p>
            <div class="succBoxBtn">
                <a href="javascript:;" class="succLeftBtn" @click="continueRelease('addgoods')">继续发布</a>
                <a href="javascript:;" @click="continueRelease('goodsManage')" >管理商品</a>
            </div>
        </div>
    </section>
    </div>
</template>
<script>
import goodhead from './good-head.vue';
export default {
  data(){
      return {
          headname:'发布成功'
      }
  },
  methods:{
     // 跳转到商机发布页  
     continueRelease(path){
         this.$store.commit('clearProduct');
         this.$router.push('/'+path)
     }
  },
  components:{
       goodhead
  }
}
</script>
