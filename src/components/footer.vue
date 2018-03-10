<template>
  <section class="botFixed">
    	<ul>
        	<li><router-link to="/manage" active-class="botCur"><em class="ico1"></em>工作台</router-link></li>
          <li><router-link to="/message" active-class="botCur"><b v-show="hasNewMes"></b><em class="ico3"></em>消息管理</router-link></li>
          <li><router-link to="/xcxManage" active-class="botCur"><em class="ico2"></em>小程序管理</router-link></li>
        	<!-- <li><a href="#" class="botCur"><em class="ico2"></em>订单管理</a></li> -->
          <li><router-link to="/more" active-class="botCur"><em class="ico4"></em>更多</router-link></li>
        </ul>
    </section>
</template>
<script>
import chartList from '../components/message/chatList';
export default {
  data(){
      return {
         username:'',
         socket:null,
         lockReconnect:false,
         chartData:[],
         hasNewMes:false
      }
  },
  computed:{
    messageList(){
       return this.$store.state.messageList
    }
  },
  methods:{
    /*
      * 获取及时沟通列表
      */  
     getChatData(){
         let _this=this;
         _this.$http('get','http://ydmmt.hc360.com/mobilechat/getchatlist/'+_this.username+'/',{
             params:{
                 to:_this.username
             }
         }).then((res)=>{
             if(res.length>0){
                res.map((item)=>{
                    if(item.type==1){
                        item.content=decodeURIComponent(JSON.parse(item.content||"{}").title); 
                    }
                })
                _this.chartData = _this.chartData.concat(res);
                _this.$store.commit('saveMessage',_this.chartData)
             }
         })
     },
    createsocket(){
        let _this=this,
            host='ws://ydmmt.hc360.com/chatpoint/hcgztmonitor/'+_this.username+'/';
         if ('WebSocket' in window) {
              _this.socket = new WebSocket(host);
            } else if ('MozWebSocket' in window) {
              _this.socket = new MozWebSocket(host);
            } else {
               console.log('Error: WebSocket is not supported by this browser.');
              return;
            }  

        //建立连接后的回调函数
         _this.socket.onopen=function(){
            console.log('foot socket open!')
        }    
        
        //接收到消息的回调函数
        _this.socket.onmessage = function(event) {
            let data=event.data;
            console.log('hasmessage:'+data);
            if(data){
              _this.hasNewMes=true;
              _this.getChatData();
            }
         };  

         _this.socket.onclose=function(){
           console.log('foot socket close!')
           _this.initialize();
         }

         _this.socket.onerror=function(){
            _this.initialize();
         }
    },
    /**
      * 断开后重新连接
      */
    initialize(){
         let _this=this;
         /**
         * 0 - 表示连接尚未建立。1 - 表示连接已建立，可以进行通信。2 - 表示连接正在进行关闭。3 - 表示连接已经关闭或者连接不能打开。 
         */ 
         if(_this.socket.readyState==1){
             return;
         }
         if(_this.lockReconnect){
             return;
         }
         _this.lockReconnect=true;
         //没连接上会一直重连，设置延迟避免请求过多
         setTimeout(function(){
           _this.createsocket();
           _this.lockReconnect=false;
         },2000)  
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
             _this.hasNewMes=true;
             _this.getChatData();
          }     
          
      })
      
      /**
       * @description 
       * 建立长连接
       * */
      _this.createsocket();

      _this.getChatData();
  }
}
</script>

