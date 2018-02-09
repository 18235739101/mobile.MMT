<template>
  <!--审核未通过-->
       <div class="proListBox">
            <div class="proNo" v-if="finishLoading && refuseList.length == 0">没有任何商品哦~</div>
            <div v-show="finishLoading && refuseList.length>0" v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading" infinite-scroll-distance="30">
                <div class="proListCon" v-for="(pro,i) in refuseList" :key="i">
                    <div class="proImgBox">
                        <div class="proImgBoxCon"><a href="#"><img src="https://style.org.hc360.com/images/microMall/pro/img1.png"><em class="pcIco"></em></a></div>
                    </div>
                    <div class="proImgBoxRig">
                        <div class="proName">
                            <p><a href="#">韩版新品秋季宽松套头毛衣女装秋装薄款高领新款</a></p>
                            <span>2017/11/12</span>
                        </div>
                        <div class="proBotCon">
                            <p><b>¥</b>338.<b>00</b></p>
                            <div class="proBotConRig">
                                <a href="#" class="programIco"></a>
                                <a href="#" class="moreBtn"></a>
                            </div>
                        </div>
                    </div>
                    <div class="moreCon" style="display:block;">
                        <ul>
                            <li><a href="#"><em class="proIco1"></em><p>撤出小程序</p></a></li><li><a href="#"><em class="proIco3"></em><p>编辑</p></a></li><li><a href="#"><em class="proIco4"></em><p>删除</p></a></li><li><a href="#"><em class="proIco7"></em><p>查看</p></a></li>
                        </ul>
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
         * 审核未通过列表对象
         */
        refuseList:[],

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
                    type:'refused',
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
                    _this.refuseList = _this.refuseList.concat(res.lstResult || []);
                }
                
            })
        }
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

