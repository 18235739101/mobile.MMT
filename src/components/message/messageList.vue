<template>
  <div>
       <div class="tabBoxList" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <ul class="tabBoxListCon2">
            	<li v-show="messageList.length>0" v-for="(ol,i) in messageList" :key="i">
                	<dl>
                    	<dd>{{ol.createTime}}</dd>
                        <dt><em v-show="ol.readState==0"></em>{{ol.title}}</dt>
                    </dl>
                    <a :href="'#/message/detail?busnoteId='+ol.busnoteId">查看</a>
                </li>
            	
            </ul>
        </div>
         <!-- 下拉加载数据 -->
         <p v-show="loading" class="page-infinite-loading">
             <mt-spinner type="snake"></mt-spinner>
                    加载中...
         </p>   
        <div class="massageBot" v-show="finisheLoaded" style="display:none">
              <p>没有更多啦</p>
        </div>
  </div>    
</template>
<script>
export default {
  data(){
      return {
      /**
       * 是否显示加载中按钮
       */
      loading: false,
      
      /**
       * 订单数据是否加载完毕
       */
      finisheLoaded:false,
      
      /**
       * 分页属性
       */
      searchCondition: {
        //当前页码  
        pageNo: 0,
        //一页显示多少条
        pageSize:10
      },

      /**
       * 留言列表
       */
      messageList:[]
    }
  },
  components:{

  },
  methods:{
    /**
     * 滚动事件分页加载订单列表
     */
    loadMore() {
      let _this = this,
          _url = '//my.b2b.hc360.com/my/turbine/action/outerinf.MsiteBusnoteAction/eventsubmit_doGetbusnotes/doGetbusnotes?callback';
      if(_this.finisheLoaded){
        return false;
      }
      _this.loading = true;
      _this.searchCondition.pageNo++;

       /**
        * 获取留言接口
        */
      _this.$http('get',_url,{
          params:{
              pageSize:_this.searchCondition.pageSize,
              pageNo: _this.searchCondition.pageNo
              }
     }).then((res)=>{
             res=JSON.parse(res.slice(1,res.length-1)).data;
             if(!res){
                _this.finisheLoaded=true;
                return;
             }else{
                let data =(res|| {}).messagelist;
                 /**服务器返回数据小于请求的条数大小， 数据加载完毕*/
                if(data.length<_this.searchCondition.pageSize){
                  _this.finisheLoaded=true;
                }
                 _this.loading = false;
                _this.messageList = _this.messageList.concat(data);
            }
      })  
     
    }
  }

}
</script>
