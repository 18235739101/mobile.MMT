<template>
  <section>
        <header class="mHeaderBox"><a href="javascript:history.go(-1)" class="arrowLeft"></a><h3>商铺数据</h3></header>
        <section class="exposureBox">
            <article class="botBoxNew">
                <div class="botBoxCon5 boxCon6">
                    <dl>
                        <dt>我的所属行业：<span v-show="isShowArea">{{shopDatas.areaName}}行业</span></dt>
                    </dl>
                    <div class="titleCon">店铺商品数量</div>
                    <ul>
                        <li>
                            <em class="ico4"></em>
                            <span>我的上架<br>商品数<b>{{shopDatas.myBusinCnt}}</b>个</span>
                        </li>
                        <li>
                            <em class="ico10"></em>
                            <span>同行店铺平均<br>商品数<b>{{shopDatas.areAaverageBusinCnt}}</b>个</span>
                        </li>
                        <li>
                            <em class="ico5"></em>
                            <span>同行优质店铺<br>商品数<b>{{shopDatas.areaGoodShopBusinCnt}}</b>个</span>
                        </li>
                    </ul>
                </div>
                <div class="botBoxCon5">
                    <div class="titleCon">我的商品质量</div>
                    <ul>
                        <li>
                            <em class="ico6"></em>
                            <span>五星商品数量<b>{{shopDatas.my5StarBusinCnt}}</b>个</span>
                        </li>
                        <li>
                            <em class="ico9"></em>
                            <span>五星以下商品数量<b>{{shopDatas.myNot5StarBusinCnt}}</b>个</span>
                        </li>
                    </ul>
                </div>
                <div class="promptCon2" v-show=" buyAbleOnline">根据您的商品数据，建议您进行以下操作：</div>
                <div class="botBoxCon2" v-show=" buyAbleOnline">
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
        return {
            /**商铺数据对象 */
            shopDatas:{},

            /**是否显示所属行业 */
            isShowArea:true,

            /**是否支持在线购买988 */
            buyAbleOnline:false
        }
    },

    methods:{
        getShopIntegrityDatas(){
            let _this = this;

            _this.$http('get','//home.hc360.com/homes/outerInf/shopOperating/getPhysicalData?callback=',{

            }).then((res) =>{
                res = res.data;
                if(res.areaName == '无'){
                    _this.isShowArea = false;
                }else{
                    _this.isShowArea = true;
                }
                _this.shopDatas = res || {};
            })

        },
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
        }
    },

    mounted(){
        let _this = this;
        _this.$nextTick(() => {
            _this.getShopIntegrityDatas();
            if(_this.$route.query.level && _this.$route.query.level<4){
                _this.getPermissionByUserLevel();
            }else{
                _this.buyAbleOnline = false;
            }
        })
    }
  
}
</script>

<style>
@import "https://style.org.hc360.com/css/microMall/analysisStyle.css";
</style>


