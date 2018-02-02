<template>
  <div>
      <header class="mHeaderBox"><a href="javascript:history.go(-1)" class="arrowLeft"></a><h3>小程序管理</h3></header>

      <section>
    	<div class="telBox">
            <dl>
                <dt>客服电话</dt>
                <dd>400-600-800</dd>
            </dl>
            <a href="#">拨打</a>
        </div>
        <div class="helpBox">
        	<dl>
            	<dt>常见问题</dt>
                <dd><a href="#">如何设置小程序主页、商品页？</a></dd>
                <dd><a href="#">如何设置小程序主页、商品页？</a></dd>
                <dd><a href="#">如何设置小程序主页、商品页？</a></dd>
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
@import "https://style.org.hc360.com/css/microMall/wxProgram.css";
</style>

