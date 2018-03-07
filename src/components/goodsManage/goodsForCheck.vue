<template>
  <div class="proListBox">
        <div class="proNo" v-if="finishLoading && checkList.length==0">没有任何商品哦~</div>
        <div  v-else v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="30">
       		<div class="proListCon" v-for="(pro,i) in checkList" :key="i">
            	<div class="proImgBox">
                	<div class="proImgBoxCon"><a href="javascript:;"><img :src="pro.picpath ? pro.picpath: 'https://style.org.hc360.com/images/microMall/pro/img1.png'"><em class="pcIco" :class="{iphoneIco :pro.pubtype == 10}"></em></a></div>
                </div>
                <div class="proImgBoxRig">
                    <div class="proName">
                        <p><a href="javascript:;">{{pro.title}}</a></p>
                        <span>{{ getTime(pro.pubdate) }}</span>
                        <!-- <span>{{new Date(parseInt(pro.pubdate)).toLocaleString().replace(/:\d{1,2}$/,'').split(/\s/g)[0]}}</span> -->
                    </div>
                    <div class="proBotCon">
                        <p><b>￥</b>{{pro.pricerange1 == 0 ? '面议' : pro.pricerange1}}</p>
                    </div>
                </div>
            </div>
            <!-- 下拉加载数据 -->
            <p v-show="loading" class="page-infinite-loading">
                <mt-spinner type="snake"></mt-spinner>
                加载中...
            </p>  
        </div>
  </div>
</template>

<script>
export default {
  data(){
      return {
            /**
             * 待审核列表对象
             */
            checkList:[],

            /**
             * 分页属性
             */
            searchCondition: {
                pageNo: 0,
                pageSize:8
            },

            /**
             * 是否显示加载中按钮
             */
            loading: false,

            /**
             * 是否完成加载
             */
            finishLoading:false,
      }
  },
  methods:{
       /**
         * 获取商机时间
         */
        getTime(time){
            let date=new Date(time),
                year=date.getFullYear(),
                month=(date.getMonth()+1)< 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1,
                _data=date.getDate()<10 ? '0'+date.getDate() : date.getDate() ;
            return year+'/'+month+'/'+_data; 
        },

        /**加载更多 */
        loadMore(){
            let _this = this;
            if(_this.finishLoading){
                return false;
            }

            _this.loading = true;
            _this.searchCondition.pageNo++ ;

            _this.$http('get','//wsproduct.hc360.com/mBusinChance/obtainBusinPage',{
                params:{
                    type:'verifing',
                    page:_this.searchCondition.pageNo,
                    pageSize:_this.searchCondition.pageSize
                }
            }).then(res =>{
                if(!res || !res.lstResult || res.lstResult.length == 0){
                    _this.finishLoading = true
                    return false;
                }else{
                    //判断是否还有下一页
                    if(_this.searchCondition.pageNo == res.pageBean.pages || _this.searchCondition.pageNo > res.pageBean.pages){
                        _this.finishLoading = true;
                    }
                    //延迟加载数据
                    setTimeout(() =>{
                        _this.checkList = _this.checkList.concat(res.lstResult || []);
                        _this.loading = false;
                    },100)
                }
                
            })
        },
  }
}
</script>

<style>
@import 'https://style.org.hc360.com/css/microMall/proManage.css';
.page-infinite-loading {
  margin-top:20px;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.page-infinite-loading span {
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
</style>

