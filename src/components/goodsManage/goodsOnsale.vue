<template>
  <!--在售商品-->
       <div class="proListBox">
            <div class="proNo" v-if="finishLoading && onSaleList.length == 0">没有任何商品哦~</div>
            <div v-show="finishLoading && onSaleList.length>0" v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading" infinite-scroll-distance="30">
       		<div class="proListCon" v-for="(pro,i) in onSaleList" :key="i">
            	<div class="proImgBox">
                	<div class="proImgBoxCon"><a :href="'//m.hc360.com/supplyself/'+ pro.bcid +'.html'"><img :src="pro.picpath ? pro.picpath: 'https://style.org.hc360.com/images/microMall/pro/img1.png'"><em class="pcIco" :class="{iphoneIco :pro.pubtype == 10}"></em></a></div>
                </div>
                <div class="proImgBoxRig">
                    <div class="proName">
                        <p><a :href="'//m.hc360.com/supplyself/'+ pro.bcid +'.html'">{{pro.title}}</a></p>
                        <span>{{new Date(parseInt(pro.pubdate)).toLocaleString().replace(/:\d{1,2}$/,'').split(/\s/g)[0]}}</span>
                    </div>
                    <div class="proBotCon">
                        <p><b>¥</b>{{pro.pricerange1 == 0 ? '面议' : pro.pricerange1}}</p>
                        <div class="proBotConRig">
                            <a href="#" class="programIco"></a>
                            <a href="javascript:void(0)" class="moreBtn" @click="showMore"></a>
                        </div>
                    </div>
                </div>

                <div class="moreCon">
                    <ul>
                        <li><a href="#"><em class="proIco1"></em><p>导入小程序</p></a></li>
                        <li><a href="#"><em class="proIco2"></em><p>重发</p></a></li>
                        <li><a href="#"><em class="proIco3"></em><p>编辑</p></a></li>
                        <li><a href="#"><em class="proIco4"></em><p>删除</p></a></li>
                        <li><a href="#"><em class="proIco5"></em><p>下架</p></a></li>
                        <li><a href="#"><em class="proIco6"></em><p>推广</p></a></li>
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
             * 在售列表对象
             */
            onSaleList:[],

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
            _this.searchCondition.pageNo++ ;

            _this.$http('get','//wsproduct.hc360.com/mBusinChance/obtainBusinPage',{
                params:{
                    type:'onsale',
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
                    _this.onSaleList = _this.onSaleList.concat(res.lstResult || []);
                }
                
            })
        },

        /**显示更多 */
        showMore(){

        }
    },

    mounted(){
        let _this = this;
        _this.$nextTick(() =>{
            
        })
    }
  
}
</script>

<style scoped>
@import 'https://style.org.hc360.com/css/microMall/proManage.css';
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

