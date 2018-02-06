<template>
  <div>
       <goodhead :head-name="headname"></goodhead>
       <section>
        <div class="addProBox">
            <div class="addList4Top"><p>分类至</p><span>{{ classInfo }}</span></div>
         
            <div class="addList4Box" :class="{'addList4No':item.children.length==0}" v-for="(item,i) in lstSeriesVO" :key="i" @click="showChildren(i,$event)">
                <div class="addList4" ><a href="javascript:;" @click="selectSort(item.seriesName)">{{ item.seriesName}}</a></div>
                <div class="addList4List" v-show="item.children.length>0">
                	<ul v-for="(pro,j) in item.children" :key="j">
                    	<li><a href="javascript:;" @click="selectSort(pro.seriesName)">{{ pro.seriesName }}</a></li>
                    </ul>
                </div>
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
          headname:'店铺分类',
          // 炫铺分类
          lstSeriesVO:[],
          //选择的分类
          classInfo:'（按分类展示商品，方便买家筛选）'
      }
  },
  components:{
       goodhead
  },
  methods:{
    // 获取炫铺分类
     getStoreClassData(){
         let _this=this;
         _this.$http('get','https://wsdetail.b2b.hc360.com/mobile/shopseries?callback').then((res)=>{
             res=res.slice(1,res.length-1);
             let classList=JSON.parse(res||"{}").lstSeriesVO;
             if(classList.length>0){
                  _this.lstSeriesVO=classList.sort((classObj,nextClassObj)=>{
                      return classObj.sortvalue-nextClassObj.sortvalue
                  });
             }
         })
     },
     // 点击显示二级分类
     showChildren(i,e){
         let wrap=document.getElementsByClassName('addList4Box'),
             data=this.lstSeriesVO[i];
        if(data.children.length>0){
          let _className=wrap[i].className+' addList4Show';
          wrap[i].setAttribute('class',_className);
        }
    },
    // 点击对应的分类
    selectSort(seriesName){
       this.$store.commit('selectSort',seriesName);
       this.$router.go(-1);
    }
  },
  computed:{
    storeClassList(){
        return this.$store.state.storeClassList      
    }
  },
  created(){
     this.getStoreClassData();
  }
}
</script>
