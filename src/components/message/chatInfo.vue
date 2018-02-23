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
                            <div class="chatLeftImgRigCon" v-show="item.type==0">
                                <p>{{item.content}}</p>
                            </div>
                            <div class="chatLeftPro" v-show="item.type==1">
                                <a href="#">
                                    <div class="chatLeftProImg"><img :src="item.content.imgurl"></div>
                                    <div class="chatLeftProRig">
                                        <div class="chatProName">{{ item.content.title }}</div>
                                        <p><b>¥</b>{{ item.content.price }}.<b>00</b></p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                 <!-- 商品详情 -->
                 <div class="chatLeftPro" v-if="proDetail.title">
                        <a href="#">
                                <div class="chatLeftProImg"><img :src="proDetail.imgurl"></div>
                                <div class="chatLeftProRig">
                                        <div class="chatProName">{{ proDetail.title }}</div>
                                        <p><b>¥</b>{{ proDetail.price }}.<b>00</b></p>
                                </div>
                        </a>
                        <button @click="sendShop()">发送商品</button>
                 </div>
       </div>
       <div class="chatBoxBot">
       		<input type="text" v-model="message" @keyup.enter="sendMessage">
            <button type="submit" @click="sendMessage">发送</button>
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
        messageUser:{ },
        // 留言列表
        messageList:[],        
        // 留言消息
        message:'',
        // 即时通信的对象
        socket:null,
        socketIsOpen:false,
        // 图文消息详情
        proDetail:{}
      }
  },
  methods:{
     /**
      * @method  获取消息列表
      */  
     getMessageList(){
         let _this=this,
             getMessageUrl='http://ydmmt.hc360.com/mobilechat/getchat/'+_this.messageUser.from+'/'+_this.messageUser.to,
             messageStateUrl='http://ydmmt.hc360.com/mobilechat/updatereadstate/'+_this.messageUser.from+'/'+_this.messageUser.to+'/';
         _this.$http('get',getMessageUrl).then((res)=>{
            if(res.length>0){
                res.forEach((val,i,arr)=>{
                    if(val.type==1){
                        val.content=JSON.parse(val.content);
                    }
                })
                console.log(res);
                _this.messageList=_this.messageList.concat(res);
                // 将消息修改为已读状态
                _this.$http('get',messageStateUrl).then((res)=>{
                   if(res==false){
                       console.log('修改消息状态失败！')
                   }
                })
            }
         })
     },
     /**
      * @method 发送商品
      */
     sendShop(){
        let _this=this,
            saveMessageUrl='http://ydmmt.hc360.com/mobilechat/savechat/'+_this.messageUser.from+'/'+_this.messageUser.to+'/',            
            mesInfo={
              content:_this.proDetail,
              type:1
            };  
        if(!_this.socketIsOpen){
            return;
        }
         // 发送消息
         _this.socket.send(JSON.stringify(mesInfo));
         //保存消息   
         _this.$http('get',saveMessageUrl,{
             params:mesInfo
         }).then((res)=>{
           if(res==true){
               _this.messageList.push({
                   fromuserid:_this.messageUser.from,
                   type:1,
                   content:_this.proDetail
               });  
           }
         })
     },
     /**
      * @method 发送消息
      */
     sendMessage(){
         let _this=this,
             _wrap=document.getElementsByClassName('chatBox')[0],
             saveMessageUrl='http://ydmmt.hc360.com/mobilechat/savechat/'+_this.messageUser.from+'/'+_this.messageUser.to+'/',
             mesInfo={
              content:_this.message,
              type:0
             };  
          if(_this.message.length==0||_this.socketIsOpen==false){
              return;
          } 
         // 发送消息
         _this.socket.send(JSON.stringify(mesInfo));
         //保存消息   
         _this.$http('get',saveMessageUrl,{
             params:mesInfo
         }).then((res)=>{
           if(res==true){
                _this.messageList.push({
                    content:_this.message,
                    type:0,
                    fromuserid:_this.messageUser.from
                });  
                _this.message='';
                _wrap.scrollTop=_wrap.offsetHeight;
           }
         })
     },
     /**
      * @method 创建socket
      */
     createdSocket(){
         let _this=this,
             host='ws://ydmmt.hc360.com/chatpoint/'+_this.messageUser.from+'/'+_this.messageUser.to+'/';
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
            let data=JSON.parse(event.data);
            if(data.content){
               _this.messageList.push({
                    fromuserid:_this.messageUser.to,
                    ...data
                }); 
            }
              
         };
        //连接成功后的回调函数
        _this.socket.onopen=function(){
            _this.socketIsOpen=true;
            // 如果是从终极页进入的买家界面弹出商品详情的浮层
            if(_this.messageUser.type=='buy'){
               _this.proDetail={
                     imgurl:'https://style.org.hc360.com/images/microMall/pro/img1.png',
                     title:'韩版新款春季宽松套头针织衫半高领毛韩版新款春季宽松套头针织衫半高领毛',
                     price:38  
              }
            }
        }
        //连接关闭后的回调函数
        _this.socket.onclose=function(){

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

