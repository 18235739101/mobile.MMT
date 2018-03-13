<template>
  <section>
        <header class="mHeaderBox"><a href="javascript:history.go(-1)" class="arrowLeft"></a><h3>曝光数据</h3></header>
        <section class="exposureBox">
            <article class="botBoxNew">
                <div class="botBoxCon5 boxCon6">
                    <div class="titleCon">我的曝光数据</div>
                    <ul>
                        <li><em class="ico1"></em><span>昨天曝光量<br><b>{{myExposureData.yesterday}}</b>次</span></li>
                        <li><em class="ico2"></em><span>最近7天曝光量<br><b>{{myExposureData.in7Days}}</b>次</span></li>
                        <li><em class="ico3"></em><span>最近30天曝光量<br><b>{{myExposureData.in30Days}}</b>次</span></li>
                    </ul>
                </div>
                <div class="botBoxCon2">
                    <div class="titleCon">30日曝光数据</div>
                    <div class="dataBox2" ref="lineChartsBox" style="width:100%;height:320px;margin:0 auto;"></div>
                    <!-- <div class="dataBox2" ref="lineChartsBox" ></div> -->
                </div>

                <div class="promptCon2" v-show="buyAbleOnline">根据您的曝光数据，建议您进行以下操作：</div>
                <div class="botBoxCon2" v-show="buyAbleOnline">
                    <div class="titleCon redStar">快速提升曝光</div>
                    <div class="dataBox3">
                        <p>购买互通宝，可享受超高性价比来推广自己的商机！</p>
                        <a href="//mlogin.hc360.com/manager/zymmtbuy.html?source=1">立即购买</a>
                    </div>
                </div>

                <logoTip></logoTip>
            </article>
        </section>
    </section>
</template>

<script>
import logoTip from 'components/v-logoTip'
export default {

    data(){
        return {
            /**我的曝光数据对象 */
            myExposureData: {},

            /**30日曝光数据折线图表对象 */
            lineEchartsEntity: "",
            exposureIn30Category:["我的店铺","同行优秀"],

            /**是否支持在线购买988 */
            buyAbleOnline:false
        }
    },

    components:{
        logoTip
    },

    methods:{

        /**
         * 获取我的曝光数据接口
         */
        getMyExposureDatas(){
            let _this = this;

            _this.$http('get','//home.hc360.com/homes/outerInf/shopOperating/getMyExposureCardData?callback=',{

            }).then((res) =>{
                _this.myExposureData = res.data || {};
            })
        },

        /**
         * 获取30日曝光数据接口
         */
        getExposureIn30Days(){
            let _this = this;

            _this.$http('get','//home.hc360.com/homes/outerInf/shopOperating/getCompExposureDataIn30Days?callback=',{

            }).then((res) =>{
                res = res.data || {};

                let xData = [],
                seriesData = [],
                legendData = [];

                /**
                 * 处理后台数据
                 */
                (res.detailInfos || []).forEach(function(item) {
                var sData = {
                    name: _this.exposureIn30Category[item.identity],
                    type: "line",
                    smooth: true,
                    showSymbol: false,
                    data: item.selfCnt
                };
                seriesData.push(sData);
                legendData.push(_this.exposureIn30Category[item.identity]);
                });

                (res.time || []).forEach(function(item) {
                let tt = new Date(parseInt(item)).toLocaleString().replace(/:\d{1,2}$/,' ').split(/\s/g)[0].substring(5);
                xData.push({value:tt,fontSize:8});
                });
                let options = {
                grid: {
                    top: "15%",
                    left: "5%",
                    right: "2%",
                    bottom: "2%",
                    containLabel: true
                },
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: legendData,
                    textStyle:{
                        fontSize:14
                    }
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    axisLine: {
                    show:false,
                    },
                    axisLabel : {
                        textStyle : {
                            fontSize : 14
                        }
                    },
                    axisTick:{
                    show:false
                    },
                    data: xData
                },
                yAxis: {
                    axisLine:{
                    show:false,
                    onZero:false,
                    inside:true
                    },
                    axisTick:{
                    show:false
                    },
                    type: "value",
                    axisLabel: {
                    formatter: "{value}",
                    fontSize:14
                    }
                },
                series: seriesData
                };

                _this.lineEchartsEntity.setOption(options);
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
        _this.$nextTick(() =>{
            _this.getMyExposureDatas();
           // _this.$refs.lineChartsBox.style.width=window.screen.width;
            _this.lineEchartsEntity = _this.$echarts.init(_this.$refs.lineChartsBox);
            _this.getExposureIn30Days();

            window.onresize=function(){
              _this.lineEchartsEntity.resize();
            }

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
