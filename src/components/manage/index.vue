<template>

    <section>
    	<div class="headPrompt">
        	<span>店铺处于免费试用期（还剩 * 天）</span>
            <a href="javascript:;" target="_blank">购买</a>
        </div>
        <header class="mHeaderBox"><h3>慧聪微店管理后台</h3></header>
        <div class="manageCon">
        	<div class="manageBg"><img src="https://style.org.hc360.com/images/microMall/manage/manageBg.png"></div>
            <div class="personalInfo">
            	<div class="headPortrait"><a :href='"//m.hc360.com/b2b/"+companyInfo.name'><img :src="companyInfo.logoUrl ? companyInfo.logoUrl : 'https://style.org.hc360.com/images/microMall/manage/hImg.png'"></a></div>
                <div class="comName">
                	<a :href='"//m.hc360.com/b2b/"+companyInfo.name' target="_blank">{{companyInfo.name}}</a>
                </div>
            </div>
            <div class="manageContent">
            	<div class="manageNavBox">
                	<ul>
                    	<li v-for="(app,i) in sysApps" :key="i"><a :href="app.linkUrl"><em :class="app.className"></em>{{app.name}}</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <logo-tip></logo-tip>
        
        
    </section>
  
</template>

<script>
import logoTip from 'components/v-logoTip'
export default {

    data(){
        return {
            sysApps:[{
                name:'店铺管理',
                className:'ico1',
                linkUrl:''
            },{
                name:'商铺管理',
                className:'ico2',
                linkUrl:''
            },{
                name:'订单管理',
                className:'ico3',
                linkUrl:''
            },{
                name:'经营分析',
                className:'ico4',
                linkUrl:'/#/operationDaily?level='+ this.$route.query.level
            },{
                name:'聚精彩',
                className:'ico5',
                linkUrl:''
            },{
                name:'小程序管理',
                className:'ico6',
                linkUrl:''
            }],

            /**公司信息 */
            companyInfo:{}
        }
    },
    
    components:{
        'logo-tip':logoTip
    },

    methods:{
        getShopInfos(){
            let _this = this;

            _this.$http('get','//wsdetail.b2b.hc360.com/mobile/company?callback=',{

            }).then((res) =>{
                res = JSON.parse(res.replace(/\(|\)/g,'')) || {};
                _this.companyInfo = res;
            })
        }

    },

    mounted(){
        let _this = this;
        _this.$nextTick(() =>{
            _this.getShopInfos()
        })
    }

    
    
}
</script>

<style>

@import "../../css/microMall/manageStyle.css";

</style>



