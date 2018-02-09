<template>
  <div>
      <componentHead :head-name="headName" />  
       <section>
       <div class="chatBox">
			<div class="timeCon"><span>今天 10：52</span></div>
                <div :class="{'chatRig':item.fromuserid==messageUser.from,'chatLeft':item.fromuserid!=messageUser.from}" v-for="(item,i) in messageList" :key="i">
                    <div class="chatLeftCon">
                        <div class="chatLeftImg"><img src="https://style.org.hc360.com/images/microMall/message/topImg.png"></div>
                        <div class="chatLeftImgRig">
                            <em></em>
                            <div class="chatLeftImgRigCon">
                                <p>{{item.content}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            <!-- <div class="chatLeft">
            	<div class="chatLeftCon">
					<div class="chatLeftImg"><img src="https://style.org.hc360.com/images/microMall/message/topImg.png"></div>
                    <div class="chatLeftImgRig">
                    	<em></em>
                        <div class="chatLeftPro">
                        	<a href="#">
                            	<div class="chatLeftProImg"><img src="https://style.org.hc360.com/images/microMall/pro/img1.png"></div>
                                <div class="chatLeftProRig">
                                	<div class="chatProName">韩版新款春季宽松套头针织衫半高领毛韩版新款春季宽松套头针织衫半高领毛</div>
                                    <p><b>&yen;</b>388.<b>00</b></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div> -->
           
       </div>
       <div class="chatBoxBot">
       		<input type="text" v-model="message">
            <button type="submit" @click="saveMessage">发送</button>
       </div>
    </section>
  </div>      
</template>
<script>
import componentHead from '../header.vue';
export default {
  data(){
      return {
        headName:'询价留言',
        //留言用户信息
        messageUser:{

        },
        // 留言列表
        messageList:[],
        //即时通信的对象
        socket:null,
        // 留言消息
        message:''
      }
  },
  methods:{
     // 获取消息列表 
     getMessageList(){
         let _this=this,
             _url='http://ydmmt.hc360.com/mobilechat/getchat/'+_this.messageUser.from+'/'+_this.messageUser.to;
         _this.$http('get',_url).then((res)=>{
            if(res.length>0){
                _this.messageList=_this.messageList.concat(res);
               // _this.changeMessageState();
            }
         })
     },
     // 将消息修改为已读状态
     changeMessageState(){
          let _this=this,
             _url='http://ydmmt.hc360.com/mobilechat/updatereadstate/'+_this.messageUser.from+'/'+_this.messageUser.to;
         _this.$http('get',_url).then((res)=>{
            console.log(res);
         })
     },
     // 保存聊天记录
     saveMessage(){
         let _this=this,
             _url='http://ydmmt.hc360.com//mobilechat/savechat/'+_this.messageUser.from+'/'+_this.messageUser.to;
          // 非空验证   
          if(_this.message.length==0){
              return;
          }   
         // 发送消息
         _this.socket.send(_this.message);
         //保存消息   
         _this.$http('get',_url).then((res)=>{
            console.log(res);
         })
     },
     // 创建socket
     createdSocket(){
         let _this=this,
             host='ws://ydmmt.hc360.com/chatpoint/cgl/jyy/';
         if ('WebSocket' in window) {
              _this.socket = new WebSocket(host);
            } else if ('MozWebSocket' in window) {
              _this.socket = new MozWebSocket(host);
            } else {
               console.log('Error: WebSocket is not supported by this browser.');
              return;
            }
        // 接收到消息
         _this.socket.onmessage = function(message) {
            console.log(message.data);
         };
        //打开
        _this.socket.onopen=function(){

        }
     },
  },
  components:{
      componentHead
  },
  created(){
      this.messageUser=this.$route.query;
       // 获取消息列表 
      this.getMessageList();
      // 创建socket
      this.createdSocket();
  }
}
</script>

<style>
@import url('https://style.org.hc360.com/css/microMall/messageStyle.css');
</style>

