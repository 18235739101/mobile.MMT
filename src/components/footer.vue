<template>
  <section class="botFixed">
    	<ul>
        	<li><router-link to="/manage" active-class="botCur"><em class="ico1"></em>工作台</router-link></li>
          <li><router-link to="/message" active-class="botCur"><b v-show="isNews"></b><em class="ico3"></em>消息管理</router-link></li>
          <li><router-link to="/order" active-class="botCur"><em class="ico2"></em>小程序管理</router-link></li>
        	<!-- <li><a href="#" class="botCur"><em class="ico2"></em>订单管理</a></li> -->
        	<li><a href="#/manage/more"><em class="ico4"></em>更多</a></li>
        </ul>
    </section>
</template>
<script>
export default {
  data(){
      return {
         username:'',
         socket:null,
         isNews:false
      }
  },
  methods:{
    createsocket(){
        let _this=this,
            host='ws://ydmmt.hc360.com/chatpoint/greeting/hcgztmonitor/'+_this.username+'/';
         if ('WebSocket' in window) {
              _this.socket = new WebSocket(host);
            } else if ('MozWebSocket' in window) {
              _this.socket = new MozWebSocket(host);
            } else {
               console.log('Error: WebSocket is not supported by this browser.');
              return;
            }  
             //接收到消息的回调函数
         _this.socket.onmessage = function(event) {
            let data=event.data;
            if(data){
               _this.isNews=true;
            }
         };  
    }
  },
  created(){
    let _this=this,
        companyInfo=JSON.parse(localStorage.getItem('companyInfo')||'{}');

      /**
       * @description 
       * 获取用户名
       * */  
      _this.username=companyInfo.username;

      /**@description
       *  查询是否有新消息 
       */   
      _this.$http('get','http://ydmmt.hc360.com/mobilechat/getisnew/'+_this.username+'/').then((res)=>{
          if(res){
             _this.isNews=true;
          }
      })
      
      /**
       * @description 
       * 建立长连接
       * */
      _this.createsocket();
  }
}
</script>

