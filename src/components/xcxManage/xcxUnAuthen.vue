<template>
<div>
    <header class="whiteHeader"><h3>小程序管理</h3></header>
    <section>
    	<div class="hBuyPrompt">您已购买小程序服务！</div>
        <div class="wxProgramCon">
        	<p>一键生成微信小程序，商家只需在后台简单配置，就可以拥有自己的小程序，帮助企业降低开发成本。</p>
        	<dl>
            	<dt>您还需要做一下几步，或咨询客服人员400-6360-888</dt>
                <dd><a href="https://sxy.hc360.com/article-258374.html">在微信公众平台注册小程序账户，并完成信息审核和认证</a></dd>
                <dd><a href="https://sxy.hc360.com/article-258379.html">在慧聪会员中心-小程序管理一键授权微信小程序</a></dd>
                <dd><a href="https://sxy.hc360.com/article-258412.html">经过审核后，即可在会员中心进行“小程序管理”</a></dd>
            </dl>    
        </div>
    </section>
    <footerContent></footerContent>
</div>
  
</template>

<script>
import footerContent from 'components/footer.vue'
export default {
  components:{
      footerContent
  }
}
</script>

<style>

@import "https://style.org.hc360.com/css/microMall/wxProgram.css"

</style>

