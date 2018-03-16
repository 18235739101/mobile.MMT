<template>

    <section>
        <header class="mHeaderBox"><h3>掌营通管理后台</h3></header>
        <div class="manageCon">
        	<div class="manageBg"><img src="https://style.org.hc360.com/images/microMall/manage/manageBg.png"></div>
            <div class="personalInfo">
            	<div class="headPortrait"><a :href='"//m.hc360.com/b2b/"+companyInfo.username'><img :src="companyInfo.logoUrl ? companyInfo.logoUrl : 'https://style.org.hc360.com/images/microMall/manage/hImg.png'"></a></div>
                <div class="comName">
                	<a :href='"//m.hc360.com/b2b/"+companyInfo.username' target="_blank">
                     <span>{{companyInfo.name}}</span>
                    </a>
                </div>
            </div>
            <div class="manageContent">
            	<div class="manageNavBox">
                	<ul>
                    	<li v-for="(app,i) in sysApps" :key="i">
                            <a :href="app.linkUrl"><em :class="app.className"></em>{{app.name}}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <logo-tip></logo-tip>

        <footerContent></footerContent>

    </section>

</template>

<script>
import logoTip from 'components/v-logoTip'
import footerContent from 'components/footer.vue'
export default {

    data(){
        return {
            sysApps:[{
                name:'店铺管理',
                className:'ico1',
                linkUrl:'#/shopManage'
            },{
                name:'商品管理',
                className:'ico2',
                linkUrl:'#/goodsManage'
            },{
                name:'经营分析',
                className:'ico4',
                linkUrl:'#/operationDaily?level='+ this.$route.query.level
            },{
                name:'聚精彩',
                className:'ico5',
                linkUrl:'https://mlogin.hc360.com/mjjc/index.html#/buyerList'
            },{
                name:'小程序管理',
                className:'ico6',
                linkUrl:'#/xcxManage'
            }],

            /**公司信息 */
            companyInfo:{}
        }
    },

    components:{
        'logo-tip':logoTip,
        footerContent
    },

    methods:{
        getShopInfos(){
            let _this = this;

            _this.$http('get','//wsdetail.b2b.hc360.com/mobile/company?callback=',{

            }).then((res) =>{
                res = JSON.parse(res.replace(/\(|\)/g,'')) || {};
                _this.companyInfo = res;
                localStorage.setItem('companyInfo',JSON.stringify(_this.companyInfo))
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

<style scoped>
@import "https://style.org.hc360.com/css/microMall/manageStyle.css";
</style>
