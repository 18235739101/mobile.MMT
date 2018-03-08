<template>
  <div>
       <goodhead :head-name="headname"></goodhead>
       <section>
        <div class="addProBox">
            <div class="addList4Top"><p>分类至</p><span>{{ classInfo }}</span></div>
         
            <div class="addList4Box" v-for="(item,i) in lstSeriesVO" :key="i" @click="showChildren(i,$event)">
                <div class="addList4" ><a href="javascript:;" @click="selectSort(item,'1')">{{ item.seriesName}}</a><em v-show="item.children.length>0"></em></div>
                <div class="addList4List" v-show="item.children.length>0">
                	<ul v-for="(pro,j) in item.children" :key="j">
                    	<li><a href="javascript:;" @click="selectSort(pro,'2')">{{ pro.seriesName }}</a></li>
                    </ul>
                </div>
            </div>
           
        </div>
    </section>
  </div>    
  
</template>
<script>
import goodhead from "../header.vue";
export default {
  data(){
      return {
          headname:'店铺分类',
          // 炫铺分类
          lstSeriesVO:[],
          //选择的分类
          classInfo:'全部',
          // 炫铺分类对象:
          storeObject:{
            name:'全部',
            bsid:'',
            child:{
               name:'',
               seriesid:''
            }
          }
      }
  },
  components:{
       goodhead
  },
  methods:{
    /**
     * 获取炫铺分类
     */
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
     
     /**
      * 点击显示二级分类
      */
     showChildren(i,e){
         let wrap=document.getElementsByClassName('addList4Box'),
             _classlist=wrap[i].className.split(' '),
             index=_classlist.indexOf('addList4Show');
        if(this.lstSeriesVO[i].children.length>0){
            if(index>0){
                _classlist.splice(index,1);
            }else{
                _classlist.push('addList4Show');
            }
             wrap[i].setAttribute('class',_classlist.join(' ')); 
        }        
    },
    /**
     * 点击对应的分类
     */
    selectSort(store,level){
       if(level==1){
          Object.assign(this.storeObject,{
              name:store.seriesName,
              bsid:store.seriesid
          })
       }else{
           Object.assign(this.storeObject,{
               child:{
                   name:store.seriesName,
                   seriesid:store.seriesid
               }
           }) 
       } 
       this.$store.commit('saveSort',this.storeObject);
       this.classInfo=store.seriesName;
       /**
        * 延迟跳转路由
        */
       setTimeout(()=>{
           this.$router.push({
               path:'/addgoods/setPrice'
           })
       },1200)
    }
  },
  created(){
     this.getStoreClassData();
  }
}
</script>

<style>
@import "https://style.org.hc360.com/css/microMall/releasedStyle.css";
</style>
