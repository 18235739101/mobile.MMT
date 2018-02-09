<template>
  <div class="proListBox">
        <div class="proNo" v-if="finishLoading && checkList.length==0">没有任何商品哦~</div>
        <div  v-show="checkList.length>0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="30">
       		<div class="proListCon" v-for="(pro,i) in checkList" :key="i">
            	<div class="proImgBox">
                	<div class="proImgBoxCon"><a :href="'//m.hc360.com/supplyself/'+ pro.bcid +'.html'"><img :src="pro.picpath ? pro.picpath: 'https://style.org.hc360.com/images/microMall/pro/img1.png'"><em class="pcIco" :class="{iphoneIco :pro.pubtype == 10}"></em></a></div>
                </div>
                <div class="proImgBoxRig">
                    <div class="proName">
                        <p><a :href="'//m.hc360.com/supplyself/'+ pro.bcid +'.html'">{{pro.title}}</a></p>
                        <span>{{new Date(parseInt(pro.pubdate)).toLocaleString().replace(/:\d{1,2}$/,'').split(/\s/g)[0]}}</span>
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
  props:['isSwitch'],
  methods:{

      /**加载更多 */
        loadMore(){
            let _this = this;
            if(_this.finishLoading){
                return false;
            }
            _this.loading = true;
            if(_this.isSwitch){
                _this.searchCondition.pageNo = 0;
            }
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
                    if(_this.searchCondition.pageNo == res.pageBean.pages || _this.searchCondition.pageNo > res.pageBean.pages){
                        _this.finishLoading = true
                    }
                     _this.loading = false;
                    _this.checkList = _this.checkList.concat(res.lstResult || []);
                }
                
            })
        },
  }
}
</script>

<style>
.page-infinite-loading {
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.page-infinite-loading div {
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
</style>

