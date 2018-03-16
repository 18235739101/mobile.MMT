<template>
  <!--审核未通过-->
       <div class="proListBox">
            <div class="proNo" v-if="finishLoading && refuseList.length == 0">没有任何商品哦~</div>
            <div v-else v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading" infinite-scroll-distance="30">
                <div class="proListCon" v-for="(pro,i) in refuseList" :key="i">
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
                            <p><b>¥</b>{{pro.pricerange1 == 0 ? '面议' : pro.pricerange1}}</p>
                            <div class="proBotConRig">
                                <a href="javascript:void(0)" :class="{programIco:pro.weChat}"></a>
                                <a href="javascript:void(0)" class="moreBtn" @click="showMore(i)"></a>
                            </div>
                        </div>
                    </div>
                    <div class="moreCon" v-show="pro.isShowMore">
                        <ul>
                            <li v-if="pro.pubtype == 10"><a :href="'#/addgoods?bcid='+pro.bcid"><em class="proIco3"></em><p>编辑</p></a></li>
                            <li v-if="pro.pubtype == 10" @click="deletePro(pro.bcid)"><a href="javascript:void(0)"><em class="proIco4"></em><p>删除</p></a></li>
                            <li @click="toFindReason(pro.bcid)"><a href="javascript:void(0)"><em class="proIco7"></em><p>查看</p></a></li>
                        </ul>
                    </div>
                </div>
                <!-- 下拉加载数据 -->
                <p v-show="loading" class="page-infinite-loading">
                    <mt-spinner type="snake"></mt-spinner>
                    加载中...
                </p>
            </div>

            <!--删除商机弹框-->
            <div class="proAlertBox" style="display:block" v-if="isShowDeleteProAlert">
                <div class="proAlertBoxCon">
                    <a class="closeBtn" @click='deletePro()'>×</a>
                    <dl>
                        <dt>确定要删除这个商品吗？</dt>
                        <dd><button type="button" class="leftRedBtn" @click='confirmDeletePro()'>确定</button><button type="button" @click='deletePro()'>取消</button></dd>
                    </dl>
                </div>
            </div>

            <!-- 查看拒申原因弹框 -->
            <div class="proAlertBox" style="display:block" v-if="isShowReasonAlert">
                <div class="proAlertBoxCon">
                    <a class="closeBtn" @click="toFindReason()">×</a>
                    <dl>
                        <dd><h5>拒审理由</h5><p v-html="refuseReason"></p></dd>
                    </dl>
                    <button type="button" class="closeBot" @click="toFindReason()">关闭</button>
                </div>
            </div>

            <!-- 返回顶部 -->
            <gotoTop></gotoTop>
       </div>
</template>

<script>
import gotoTop from '../gotoTop.vue';
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

        /**
         * 当前操作商机的bcid
         */
        currentBcid:'',

        /**
         * 是否显示删除商机弹框
         */
        isShowDeleteProAlert:false,

        /**
         * 是否显示拒申原因弹框
         */
        isShowReasonAlert:false,

        /**
         * 拒申原因
         */
        refuseReason:''
      }
  },
  components:{
    gotoTop
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
        /**
         * 加载更多
         */
        loadMore(){
            let _this = this;
            if(_this.finishLoading){
                return false;
            }

            _this.loading = true;
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

                        _this.refuseList = _this.refuseList.concat(res.lstResult || []);
                        _this.loading = false;
                    },100)
                }

            })
        },

        /**
         * 显示更多
         */
        showMore(i){
            // 隐藏其他的更多操作
            this.refuseList.forEach((item,index)=>{
                if(index==i){
                    item.isShowMore=!item.isShowMore;

                }else{
                   item.isShowMore=false;
                }
            })
        },

        /**
         * 删除商机
         */
        deletePro(bcid){
            let _this = this;
            _this.isShowDeleteProAlert = !_this.isShowDeleteProAlert;

            if(bcid){
                _this.currentBcid = bcid;
            }
        },

        /**
         * 确定删除商机
         */
        confirmDeletePro(){
            let _this = this;
            _this.$http('get','//wsproduct.hc360.com/mBusinChance/removebusin',{
                params:{
                    bcid:_this.currentBcid
                }
            }).then(res =>{
                if(res && res.success){
                    for(var i=0;i<_this.refuseList.length;i++){
                        if(_this.refuseList[i].bcid == _this.currentBcid){
                            _this.refuseList.splice(i,1);
                            _this.$toast('删除商机成功！');
                            break;
                        }
                    }
                    _this.isShowDeleteProAlert = !_this.isShowDeleteProAlert;
                }else{
                    _this.$toast('删除商机失败！');
                }
            })
        },

        /**
         * 查看拒申原因
         */
        toFindReason(bcid){
            let _this = this;
            _this.isShowReasonAlert = !_this.isShowReasonAlert;

            if(bcid){
                _this.$http('get','//wsproduct.hc360.com/mBusinChance/obtainBusinRefuse',{
                    params:{
                        bcid:bcid
                    }
                }).then(res =>{
                    if(res && res.length>0){
                        (res||[]).forEach((item,i) =>{
                            if(i>0){
                                _this.refuseReason += "<br>"+(i+1)+"、"+ item.fieldname + "中" + item.refusecase
                            }else{
                                _this.refuseReason = (i+1) + "、" +item.fieldname + "中" + item.refusecase;
                            }
                        })
                    }
                })
            }
        }

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
