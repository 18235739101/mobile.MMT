<template>
<div>
  <header class="mHeaderBox"><a href="javascript:history.go(-1)" class="arrowLeft"></a><h3>账户信息</h3></header>
  <section>
        <div class="accountList">
        	<ul>
            	<li><span>账号</span><p>{{username}}</p></li>
            </ul>
            <a href="//mlogin.hc360.com/h5quit.html" class="exitBtn">退出登录</a>
        </div>
        <div class="slogenBox">
        	<dl>
            	<dt><h5>慧聪微商城</h5></dt>
                <dd>打造指尖上的移动电商</dd>
            </dl>
        </div>
</section>
<footer-content></footer-content>
</div>
</template>

<script>
import footerContent from 'components/footer.vue'
export default {
  data(){
      return{
          username:JSON.parse(localStorage.getItem("companyInfo")).username
      }
  },

  components:{
      footerContent
  }
}
</script>

<style>
@import "https://style.org.hc360.com/css/microMall/accountStyle.css";
</style>

