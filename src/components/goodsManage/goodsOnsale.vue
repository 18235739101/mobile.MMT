<template>
  <!--在售商品-->
  <div>
    <div>
       <div class="proListBox">
            <div class="proNo" v-if="finishLoading && onSaleList.length == 0">没有任何商品哦~</div>
            <div v-else v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading" infinite-scroll-distance="10">
       		<div class="proListCon" v-for="(pro,i) in onSaleList" :key="i">
            	<div class="proImgBox">
                	<div class="proImgBoxCon"><a :href="'//m.hc360.com/supplyself/'+ pro.bcid +'.html'"><img :src="pro.picpath ? pro.picpath: 'https://style.org.hc360.com/images/microMall/pro/img1.png'"><em class="pcIco" :class="{iphoneIco :pro.pubtype == 10}"></em></a></div>
                </div>
                <div class="proImgBoxRig">
                    <div class="proName">
                        <p><a :href="'//m.hc360.com/supplyself/'+ pro.bcid +'.html'">{{pro.title}}</a></p>
                        <!-- <span>{{new Date(parseInt(pro.pubdate)).toLocaleString().split(/\s/g)[0]}}</span> -->
                        <span>{{ getTime(pro.pubdate) }}</span>
                    </div>
                    <div class="proBotCon">
                        <p><b>¥</b>{{pro.pricerange1 == 0 ? '面议' : pro.pricerange1}}</p>
                        <div class="proBotConRig">
                            <a href="javascript:void(0)" :class="{programIco:pro.weChat}"></a>
                            <a v-if="pro.checked && pro.checked == '0'" href="javascript:void(0)">已修改审核中...</a>
                            <a v-else href="javascript:void(0)" class="moreBtn" @click="showMore(i)"></a>
                            
                        </div>
                    </div>
                </div>

                <div class="moreCon" v-show="pro.isShowMore==true">
                    <ul>
                        <li v-show="!pro.weChat" @click='importXCX(pro)' ><a href="javascript:void(0)"><em class="proIco1"></em><p>导入小程序</p></a></li>
                        <li v-show="pro.weChat" @click='exportXCX(pro.bcid)'><a href="javascript:void(0)"><em class="proIco1"></em><p>撤出小程序</p></a></li>
                        <li v-if="pro.pubtype == 10"><a :href="'#/addgoods?bcid='+pro.bcid"><em class="proIco3"></em><p>编辑</p></a></li>
                        <li v-if="pro.pubtype == 10" @click='deletePro(pro.bcid)'><a href="javascript:void(0)"><em class="proIco4"></em><p>删除</p></a></li>
                        <li v-if="pro.pubtype == 10" @click='unShelvePro(pro.bcid)'><a href="javascript:void(0)"><em class="proIco5"></em><p>下架</p></a></li>
                        <li v-show="isPopularize" @click="popularizePro(pro)"><a href="javascript:void(0)"><em class="proIco6"></em><p>推广</p></a></li>
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


        <!--导入小程序弹框-->
        <div class="wxSetUp" style="display:block" v-if="isShowImportXCXAlert">
            <div class="wxSetUpCon">
                <h5>小程序商品设置</h5>
                <a class="closeBtn" @click="importXCX()">×</a>
                <ul>
                    <li>
                        <span class="wxSetUpLeft">是否支持在线交易</span>
                        <div class="wxSetUpRig">
                            <div class="redioBox"><input type="radio" id="radio-1-1" ref="supportTradeOnline" name="radio-1-set" class="regular-radio" checked=""><label for="radio-1-1"></label><span>是</span></div>
                            <div class="redioBox"><input type="radio" id="radio-1-2" ref="unsupportTradeOnline" name="radio-1-set" class="regular-radio"><label for="radio-1-2"></label><span>否</span></div>
                        </div>
                    </li>
                    <li>
                        <span class="wxSetUpLeft">一口价</span>
                        <div class="wxSetUpRig"><input type="text" v-model.trim="priceValue" @blur="priceOnlineBlur" @keyup="priceValue=priceValue.replace(/[^\d{1,9}\.]*/,'')" ref="priceOnline" class="priceInput" placeholder="请设置一口价"></div>
                    </li>
                </ul>
                <p>注意：小程序商品暂不支持起批量、区间价、规格、运费、优惠券，买家下单无需卖家确认即可付款</p>
                <div class="wxSetUpBtn">
                    <button type="submit" class="leftRedBtn" @click="confirmImportXCX()">确定</button>
                    <button type="button" @click="importXCX()">取消</button>
                </div>
            </div>
        </div>

        <!--撤出小程序弹框-->
        <div class="proAlertBox" style="display:block" v-if="isShowExportXCXAlert">
            <div class="proAlertBoxCon">
                <a class="closeBtn" @click="exportXCX()">×</a>
                <dl>
                    <dt>您确定将商品<br>从小程序商铺撤出吗？</dt>
                    <dd><button type="button" class="leftRedBtn" @click="confirmExportXCX()">确定</button><button type="button" @click="exportXCX()">取消</button></dd>
                </dl>
            </div>
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

        <!-- 下架商机弹框 -->
        <div class="proAlertBox" style="display:block" v-if="isShowUnshelveProAlert">
            <div class="proAlertBoxCon">
                <a class="closeBtn" @click="unShelvePro()">×</a>
                <dl>
                    <dt>确定要下架这个商品吗？</dt>
                    <dd><button type="button" class="leftRedBtn" @click="confirmUnShelvePro()">确定</button><button type="button" @click="unShelvePro()">取消</button></dd>
                </dl>
            </div>
        </div>
        
        <!--一键重发-->
        <a href="javascript:void(0)" class="resendBtn" @click="OneKeyResend()">一键重发</a>

        <mt-popup :modal=false v-model="popupVisible"  position="bottom">
           <div class="shareBox"><a class="closeBtn2" @click="closeShare">×</a></div>
           <div id="nativeShare"></div>  
        </mt-popup>       
    </div>
     <!--返回顶部-->
    <gotoTop></gotoTop>
    </div>
</template>

<script>
import "../../common/nativeShare/nativeShare.css"
import nativeShare from '../../common/nativeShare/nativeShare'

import {Popup} from 'mint-ui'
import gotoTop from '../gotoTop.vue'
export default {

    data(){
        return {

            /**
             * 在售列表对象
             */
            onSaleList:[],

            /**
             * 一口价的value值
             */
            priceValue:'',

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
             * 是否显示导入小程序弹框
             */
            isShowImportXCXAlert:false,

            /**
             * 是否显示撤出小程序弹框
             */
            isShowExportXCXAlert:false,

            /**
             * 是否显示删除商机弹框
             */
            isShowDeleteProAlert:false,

            /**
             * 是否显示下架商机弹框
             */
            isShowUnshelveProAlert:false,
            
            /**
             * 导入小程序接口参数
             */
            setXCXparams:{
                bcid:'',
                price:'',
                type:''      //1导入  2撤出
            },

            /**
             * 正在操作的商机bcid
             */
            currentBcid:'',

            /**
             * 是否显示推广
             */
            isPopularize:true,

            //popup是否显示
            popupVisible:false,

            /**
             * 分享的配置参数值 
             */
            shareConfig : {
                url:'',
                title:'',
                img:''
                //desc:'王俊锋的个人博客',
                // img_title:'王俊锋的个人博客',
                // from:'王俊锋的博客'
            },

            /**
             * 一口价的错误提示信息
             */
            pirceError:null

        }
    },

    components:{
        "mt-popup":Popup,
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
                    type:'onsale',
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
                        //拼接数据
                        _this.onSaleList = _this.onSaleList.concat(res.lstResult || []);

                        _this.loading = false;
                    },100)
                }
                
            })
        },

        /**
         * 导入小程序 
         */
        importXCX(proItem){
            let _this = this;
            _this.isShowImportXCXAlert = !_this.isShowImportXCXAlert;
             //隐藏推广弹层
            _this.popupVisible = false;
            //清空一口价
            _this.priceValue='';
            if(proItem){
                _this.setXCXparams.bcid = proItem.bcid;
                _this.setXCXparams.type = 1;
            }
        },

        /**
         * 一口价失去焦点
         */
        priceOnlineBlur(){
            let  reg=/^[1-9]\d{0,8}\.\d{1,2}$/,
                 max='9999999999.99';
            if(this.$refs.supportTradeOnline.checked){
               if(this.priceValue==''){
                    this.pirceError='请填写价格！';
                    this.$toast(this.pirceError);
                    return false;
                }
                this.priceValue=(this.priceValue-0).toFixed(2);
                if(this.priceValue=='0.00'){
                        this.pirceError='价格不能为0！';
                }else if(this.priceValue-0>=max){
                        this.pirceError='商品单价不能大于：9999999999.99';
                }else if(!reg.test(this.priceValue)){
                        this.pirceError='请输入合法价格';
                }else{
                    this.pirceError=null;
                }
                this.pirceError ?  this.$toast(this.pirceError) : this.setXCXparams.price=this.priceValue;                
            }
        },

        /**
         * 确定导入小程序 
         */
        confirmImportXCX(){
            let _this = this;
            if(_this.$refs.supportTradeOnline.checked){//支持在线交易
                if(this.pirceError){
                    _this.$toast(this.pirceError);
                    return false;
                }
            }else{
                _this.setXCXparams.price = '0.00'   //后台要求0.00
            }
           

            _this.$http('get','//wsproduct.hc360.com/mBusinChance/setAppletsBusin',{
                params:_this.setXCXparams
            }).then(res =>{
                if(res && res.success){
                    for(var i=0;i<_this.onSaleList.length;i++){
                        if(_this.onSaleList[i].bcid == _this.setXCXparams.bcid){
                            //导入小程序将wechat值改为true
                            _this.onSaleList[i].weChat = true;
                            // 修改一口价的默认值
                            _this.priceValue='';
                            _this.$toast('导入小程序成功！');
                            break;
                        }
                    }
                    _this.isShowImportXCXAlert = !_this.isShowImportXCXAlert;
                }else{
                    // 修改一口价的默认值
                     _this.priceValue='';
                    _this.$toast(res.returnMsg || '导入小程序失败！');
                }
            })
        },

        /**
         * 撤出小程序
         */
        exportXCX(bcid){
            let _this = this;
            _this.isShowExportXCXAlert = !_this.isShowExportXCXAlert;
            if(bcid){
                _this.setXCXparams.bcid = bcid;
                _this.setXCXparams.type = 2;
                _this.setXCXparams.price = '0.00';  //后台要求
            }
        },

        /**
         * 确定撤出小程序
         */
        confirmExportXCX(){
            let _this = this;
            _this.$http('get','//wsproduct.hc360.com/mBusinChance/setAppletsBusin',{
                params:_this.setXCXparams
            }).then(res =>{
                if(res && res.success){
                    for(var i=0;i<_this.onSaleList.length;i++){
                        if(_this.onSaleList[i].bcid == _this.setXCXparams.bcid){
                            //撤出小程序将wechat值改为false
                            _this.onSaleList[i].weChat = false;
                            _this.$toast('撤出小程序成功！');
                            break;
                        }
                    }
                    _this.isShowExportXCXAlert = !_this.isShowExportXCXAlert;
                }else{
                    _this.$toast(res.returnMsg || '撤出小程序失败！');
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
                    for(var i=0;i<_this.onSaleList.length;i++){
                        if(_this.onSaleList[i].bcid == _this.currentBcid){
                            _this.onSaleList.splice(i,1);
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
         * 下架商机 
         */
        unShelvePro(bcid){
            let _this = this;
            _this.isShowUnshelveProAlert = !_this.isShowUnshelveProAlert

            if(bcid){
                _this.currentBcid = bcid;
            }
        },

        /**
         * 确定下架商机
         */
        confirmUnShelvePro(){
            let _this = this;
            _this.$http('get','//wsproduct.hc360.com/mBusinChance/underTheShelf',{
                params:{
                    bcid : _this.currentBcid
                }
            }).then(res =>{
                if(res && res.success){
                    for(var i=0;i<_this.onSaleList.length;i++){
                        if(_this.onSaleList[i].bcid == _this.currentBcid){
                            _this.onSaleList.splice(i,1);
                            _this.$toast('商机下架成功！');
                            break;
                        }
                    }
                    _this.isShowUnshelveProAlert = !_this.isShowUnshelveProAlert
                }else{
                    _this.$toast(res.returnMsg || '商机下架失败！');
                }
            })
        },
        
        /**
         * 浏览器识别（只有手机QQ浏览器和UC浏览器才支持店铺分享）
         */
        browserIdenty(){
            var bLevel = {
                qq: {forbid: 0, lower: 1, higher: 2},
                uc: {forbid: 0, allow: 1}
            };
            let UA = navigator.appVersion;
            let isqqBrowser = (UA.split("MQQBrowser/").length > 1) ? bLevel.qq.higher : bLevel.qq.forbid;
            let isucBrowser = (UA.split("UCBrowser/").length > 1) ? bLevel.uc.allow : bLevel.uc.forbid;

            if((isqqBrowser && isqqBrowser>0) || (isucBrowser && isucBrowser>0)){
                this.isPopularize = true;
            }
        },

        /**
         * 推广商机
         */
        popularizePro(pro){
            let _this = this;
            _this.popupVisible = !_this.popupVisible;

            if(pro){
                _this.shareConfig.url = '//m.hc360.com/supplyself/'+ pro.bcid +'.html';
                _this.shareConfig.title = pro.title;
                _this.shareConfig.img = pro.picpath
                new nativeShare('nativeShare',_this.shareConfig);
            }

        },

        /**
         * 关闭推广弹窗和遮罩
         */
        closeShare(){
           this.popupVisible=false;
        },

        /**
         * 一键重发
         */
        OneKeyResend(){
            let _this = this;
            _this.$http('get','//wsproduct.hc360.com/mBusinChance/oneKeyRepeated',{
            params:{
                sort:'A'
            }
            }).then(res =>{
            if(res && res.success){
                _this.$toast("您成功重发了"+ res.returnMsg +"条");
            }else{
                _this.$toast(res.returnMsg || "一键重发失败！");
            }
            })
        },

        /**
         * 显示更多 
         */
        showMore(i){
            // 隐藏其他的更多操作
            this.onSaleList.forEach((item,index)=>{
                if(index==i){
                    item.isShowMore=!item.isShowMore;
                    
                }else{
                   item.isShowMore=false;
                }
            })
        }
    },

    mounted(){
        let _this = this;
        _this.$nextTick(() =>{
            _this.browserIdenty()
            
        })
    }
  
}
</script>

<style scoped>
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
.mint-popup-bottom{
  bottom:100px;
  width:100%;
  height:200px;
}
</style>

