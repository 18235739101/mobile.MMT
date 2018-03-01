<template>
  <div>
      <componentHead :head-name="headName" />  
       <section>
       <div class="chatBox">
                <!-- 历史留言消息 -->
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
                <div class="timeCon"><span>今天 {{time}}</span></div>
                 <!-- 商品详情 -->
                   <div class="chatProCon" v-if="proDetail.title">
                    <a href="#">
                        <div class="chatLeftProImg"><img :src="proDetail.imgurl"></div>
                        <div class="chatLeftProRig">
                            <div class="chatProName">{{ proDetail.title }}</div>
                            <p><b>&yen;</b>{{ proDetail.price }}<b>00</b></p>
                        </div>
                    </a>
                    <button type="button" @click="sendShop()">发送商品</button>
                </div>
                <!-- 当前留言列表 -->
                <div :class="{'chatRig':item.fromuserid==messageUser.from,'chatLeft':item.fromuserid!=messageUser.from}" v-for="(item,j) in newMessageList" :key="item.id">
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
        headName:'即时沟通',
        //留言用户信息
        messageUser:{ },
        // 历史留言列表
        messageList:[],  
        // 当前留言列表
        newMessageList:[],      
        // 留言消息
        message:'',
        // 即时通信的对象
        socket:null,
        // socket是否打开
        socketIsOpen:false,
        // 图文消息详情
        proDetail:{}
      }
  },
  computed:{
    time(){
            let d=new Date(),
                hours=d.getHours()<10 ? '0'+d.getHours() : d.getHours(),
                minutes=d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes();
            return hours+':'+minutes
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
                _this.messageList=_this.messageList.concat(res);
                // 将消息修改为已读状态
                _this.$http('get',messageStateUrl).then((res)=>{
                   if(res==false){
                       console.log('修改消息状态失败！')
                   }
                })
                _this.$nextTick(()=>{
                    document.getElementsByClassName('chatBox')[0].scrollTop='1000000';
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
               _this.newMessageList.push({
                   fromuserid:_this.messageUser.from,
                   type:1,
                   // 卖家保存消息添加此状态
                   readstate:_this.messageUser.type ? 1 : "",
                   content:_this.proDetail
               });  
               _this.$nextTick(()=>{
                    document.getElementsByClassName('chatBox')[0].scrollTop='1000000';
                })
            }
         })
     },
     /**
      * @method 发送消息
      */
     sendMessage(){
         let _this=this,
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
                _this.newMessageList.push({
                    content:_this.message,
                    type:0,
                    fromuserid:_this.messageUser.from
                });  
                _this.message='';
                _this.$nextTick(()=>{
                    document.getElementsByClassName('chatBox')[0].scrollTop='1000000';
                })
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
               _this.newMessageList.push({
                    fromuserid:_this.messageUser.to,
                    ...data
                }); 
                _this.$nextTick(()=>{
                    document.getElementsByClassName('chatBox')[0].scrollTop='1000000';
                })
            }
              
         };
        //连接成功后的回调函数
        _this.socket.onopen=function(){
            console.log('socket open!')
            _this.socketIsOpen=true;
            // 如果是从终极页进入的买家界面弹出商品详情的浮层
            if(_this.messageUser.type=='buy'){
                if(!_this.messageUser.bcid){
                   _this.$toast('缺少bicd');
                   return;
                }
                _this.$http('get','https://wsdetail.b2b.hc360.com/xcx/supply/'+_this.messageUser.bcid).then((res)=>{
                     _this.proDetail={
                        imgurl:res.picUrls[0].picUrl,
                        title:res.title,
                        price:res.price||'面议' 
                    }
                })
              
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

