<template>
  <!--已下架商品-->
       <div class="proListBox">
            <div class="proNo" v-if="finishLoading && offList.length == 0">没有任何商品哦~</div>
            <div v-else v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <div class="proListCon" v-for="(pro,i) in offList" :key="i"> 
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
                                <a href="#" :class="{programIco:pro.weChat}"></a>
                                <a href="javascript:void(0)" class="moreBtn" @click="showMore(pro)"></a>
                            </div>
                        </div>
                    </div>
                    <div class="moreCon" v-show="pro.isShowMore">
                        <ul>
                            <li><a :href="'#/addgoods?bcid='+pro.bcid"><em class="proIco3"></em><p>编辑</p></a></li>
                            <li @click="deletePro(pro.bcid)"><a href="javascript:void(0)"><em class="proIco4"></em><p>删除</p></a></li>
                            <li @click="shelvePro(pro.bcid)"><a href="javascript:void(0)"><em class="proIco8"></em><p>上架</p></a></li>
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
         * 下架列表对象
         */
        offList:[],

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
                    type:'soldout',
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

                        //默认不展示每一商品更多选项
                        (res.lstResult || []).forEach((item) =>{
                            item.isShowMore = false;
                        })

                        _this.offList = _this.offList.concat(res.lstResult || []);
                        _this.loading = false;
                    },100)
                }
                
            })
        },
        
        /**删除商机事件 */
        deletePro(bcid){
            let _this = this;
            _this.$http('get','//wsproduct.hc360.com/mBusinChance/removebusin',{
                params:{
                    bcid:bcid
                }
            }).then(res =>{

            })
        },

        /**
         * 上架商机 
         */
        shelvePro(bcid){
            let _this = this;
            _this.$http('get','http://wsproduct.hc360.com/mBusinChance/shelves',{
                params:{
                    bcid:bcid
                }
            }).then(res =>{
                if(res && res.success){
                    for(var i=0;i<_this.offList.length;i++){
                        if(_this.offList[i].bcid == bcid){
                            _this.offList.splice(i,1);
                            _this.$toast('商机上架成功！');
                            break;
                        }
                    }
                }else{
                    _this.$toast('商机上架失败！');
                }
            })
        },

        /**显示更多 */
        showMore(proItem){
            proItem.isShowMore = !proItem.isShowMore
        }
  },

  mounted(){
      let _this = this;
      _this.$nextTick(() =>{
      })
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

