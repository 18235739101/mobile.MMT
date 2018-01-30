<template>
  <section class="botFixed">
    	<ul>
        	<li><a href="#"><em class="ico1"></em>工作台</a></li>
          <li><router-link to="/order" active-class="botCur"><em class="ico2"></em>订单管理</router-link></li>
        	<!-- <li><a href="#" class="botCur"><em class="ico2"></em>订单管理</a></li> -->
        	<li><a href="#"><em class="ico3"></em>消息管理</a></li>
        	<li><a href="#"><em class="ico4"></em>更多</a></li>
        </ul>
    </section>
</template>
<script>
export default {
  data(){
      return {
          
      }
  }
}
</script>

