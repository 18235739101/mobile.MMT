<template>
  <section>
        <header class="mHeaderBox"><a href="javascript:history.go(-1)" class="arrowLeft"></a><h3>询盘数据</h3></header>
        <section class="exposureBox">
            <article class="botBoxNew">
                <div class="botBoxCon3">
                    <div class="titleCon">我的询盘数据</div> 
                    <ul>
                        <li><em class="ico7"></em><span>最近30天询盘量<b>{{myInqueryDatas.inquiryCntIn30Days || 0}}</b>次</span></li> 
                        <li><em class="ico8"></em><span>最近30天交易量<b>{{myInqueryDatas.tradeCntIn30Days || 0}}</b>笔</span></li>
                    </ul>
                </div> 
                <div class="botBoxCon3">
                    <div class="titleCon">同行询盘数据</div> 
                    <ul>
                        <li><em class="ico9"></em><span>同行近30天询盘量<br><b>{{areaCountIn30}}</b>次</span></li> 
                        <li><em class="ico10"></em><span>同行近7天询盘量<br><b>{{areaCountIn7}}</b>笔</span></li>
                    </ul>
                </div> 
                <div class="botBoxCon4">
                    <div class="titleCon">我的留言信息（{{msgCount}}）<a href="//mlogin.hc360.com/sellerorder/index.html#/msglist">查看详情</a></div>
                </div> 
                <div class="promptCon2" v-show="buyAbleOnline">根据您的商品数据，建议您进行以下操作：</div>
                <div class="botBoxCon2" v-show="buyAbleOnline">
                    <div class="titleCon redStar">自营买卖通广告</div>
                    <div class="dataBox3">
                        <p>由于您的商品上架数过少，导致店铺询盘量极低，请立即提高商品数</p>
                        <a href="//mlogin.hc360.com/manager/zymmtbuy.html?source=1">立即购买</a>
                    </div>
                </div>
                <div class="slogenBox">
                    <dl>
                        <dt><h5>慧聪微商城</h5></dt>
                        <dd>打造指尖上的移动电商</dd>
                    </dl>
                </div>
            </article>
        </section>
    </section>
</template>

<script>
export default {
    data(){
        return{
            /**我的询盘数据对象 */
            myInqueryDatas:{},
            /**同行业询盘数据对象 */
            areaInqueryDatas:{},
            /**留言消息数 */
            msgCount:0,
            /**同行业近30天询盘量 */
            areaCountIn30:0,
            /**同行业近7天询盘量 */
            areaCountIn7:0,
            /**是否支持在线购买988 */
            buyAbleOnline:false,
        }
    },

    methods:{
        /**
         * 我的询盘数据
         */
        getInqueryDatas(){
            let _this = this;

            _this.$http('get','//home.hc360.com/homes/outerInf/shopOperating/getMyInquiryCardData?callback=',{

            }).then((res) =>{
                _this.myInqueryDatas = res.data || {}
            })
        },

        /**
         * 同行业询盘数据
         */
        getAreaDatas(){
            let _this = this;

            _this.$http('get','//home.hc360.com/homes/outerInf/shopOperating/getMyInquiryColumnData?callback=',{

            }).then((res) =>{
                _this.areaCountIn30 = res.count[0] || 0;
                _this.areaCountIn7 = res.count[1] || 0;
            })
        },

        /**
         * 获取用户是否是会员
         */
        getPermissionByUserLevel(){
            let _this = this;

            _this.$http('get','//my.b2b.hc360.com/my/turbine/action/trade.corcenter.TradeMainAction/eventsubmit_doMmtzyrepetition/doMmtzyrepetition',{

            }).then((res) =>{
                if(res == "yes"){
                    _this.buyAbleOnline = false;
                }else{
                    _this.buyAbleOnline = true;
                }
            })
        },

        /**
         * 留言信息
         */
        getMsgCount(){
            let _this = this;

            _this.$http('get','//my.b2b.hc360.com/my/turbine/action/outerinf.MsiteBusnoteAction/eventsubmit_doGetnotreadnum/doGetnotreadnum?jsoncallback=',{

            }).then((res) =>{
                res = JSON.parse(res.replace(/\(|\)/g,'')) ;
                _this.msgCount = res.cnt
            })

        }

    },

    mounted(){
        let _this = this;
        _this.getInqueryDatas();
        _this.getAreaDatas();
        if(_this.$route.query.level && _this.$route.query.level<4){
            _this.getPermissionByUserLevel();
        }else{
            _this.buyAbleOnline = false;
        }
        _this.getMsgCount();
    }
  
}
</script>

<style>
@import "../../css/microMall/analysisStyle.css";
</style>


