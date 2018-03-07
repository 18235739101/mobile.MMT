<template>
  <div>
       <header class="mHeaderBox">
        <a href="javascript:;" class="arrowLeft" @click="gotoback()"></a>
        <h3>{{headName}}</h3>
      </header>
       <section>
           <div class="chatBox">
                    <!-- 历史留言消息 -->
                    <div :class="{'chatRig':item.fromuserid==messageUser.from,'chatLeft':item.fromuserid!=messageUser.from}" v-for="(item,i) in messageList" :key="i">
                       <div class="timeCon" v-show="i==messageList.length-1"><span>{{getPrevTime(item.createtime)}}</span></div>

                        <div class="chatLeftCon">
                            <div class="chatLeftImg"><img :src="getLogo(item)"></div>
                            
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

                   <!-- 当前时间 -->
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
export default {
  data(){
      return {
        headName:'即时沟通',
        
        /**
         * 聊天对象
         * from 发送者
         * to  接受者
         */
        messageUser:{ },

        /**
         * 历史留言列表
         */
        messageList:[],  

        /**
         *当前留言列表 
         */
        newMessageList:[],   

        /**
         * 留言消息
         */  
        message:'',

        /**
         * 即时通信的对象
         */
        socket:null,

        
        /**
         * 图文消息详情
         */
        proDetail:{}
      }
  },
  computed:{
    /**
     * 获取当前时间
     */   
    time(){
        let d=new Date(),
            hours=d.getHours()<10 ? '0'+d.getHours() : d.getHours(),
            minutes=d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes();
        return hours+':'+minutes
    }
  },
  methods:{
     /*
      * 获取默认头像
      */ 
     getLogo(item){
         let hclogo='https://style.org.hc360.com/images/microMall/manage/hImg.png',
             defaultlogo='https://style.org.hc360.com/images/microMall/message/topImg.png';
         if(item.fromuserid==this.messageUser.from) {
             return defaultlogo;
         } 
         return hclogo;
     },
     /*
      * 获取上一次聊天记录
      */ 
     getPrevTime(dataTime){
         let date=new Date(parseInt(dataTime)),
             mounth=date.getMonth()+1,
             data=date.getDate(),
             hours=date.getHours()<10 ? '0'+date.getHours() : date.getHours(),
             minutes=date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
        return mounth+'月'+data+'日'+'  '+hours+':'+minutes    
     },
     /**
      * 获取消息列表
      */  
     getMessageList(){
         let _this=this,
             getMessageUrl='http://ydmmt.hc360.com/mobilechat/getchat/'+_this.messageUser.from+'/'+_this.messageUser.to;
             
         _this.$http('get',getMessageUrl).then((res)=>{
            if(res.length>0){
                res.forEach((val,i,arr)=>{
                    if(val.type==1){
                        val.content=JSON.parse(val.content);
                    }
                })
                _this.messageList=_this.messageList.concat(res);
                _this.changeMessageState();
                _this.$nextTick(()=>{
                    document.getElementsByClassName('chatBox')[0].scrollTop='1000000';
                })
            }
         })
     },
    
    /**
     *  将消息修改为已读状态
     */
    changeMessageState(){
        let _this=this,
            messageStateUrl='http://ydmmt.hc360.com/mobilechat/updatereadstate/'+_this.messageUser.to+'/'+_this.messageUser.from+'/';
        return new Promise((resolve,reject)=>{
              _this.$http('get',messageStateUrl).then((res)=>{
                   if(res==false){
                       console.log('修改消息状态失败！')
                   }
             })
        })
    },

     /**
      *  发送商品图文详情
      */
     sendShop(){
        let _this=this,
            saveMessageUrl='http://ydmmt.hc360.com/mobilechat/savechat/'+_this.messageUser.from+'/'+_this.messageUser.to+'/',            
            mesInfo={
              content:_this.proDetail,
              type:1,
              // 如果是买家添加此字段
              readstate:_this.messageUser.type ? "" : 1,
            }; 

         _this.initialize();
         /**
          * 发送消息
          */
         _this.socket.send(JSON.stringify(mesInfo));
         
         /**
          * 保存消息
          */
         _this.$http('get',saveMessageUrl,{
             params:mesInfo
         }).then((res)=>{
           if(res==true){
               _this.newMessageList.push({
                   fromuserid:_this.messageUser.from,
                   type:1,
                   content:_this.proDetail
               });  
               /**
                * 发送完消息，将滚动条滚动到页面底部
                */
               _this.$nextTick(()=>{
                    document.getElementsByClassName('chatBox')[0].scrollTop='1000000';
                })
            }
         })
     },
     /**
      * 发送文本消息
      */
     sendMessage(){
         let _this=this,
             saveMessageUrl='http://ydmmt.hc360.com/mobilechat/savechat/'+_this.messageUser.from+'/'+_this.messageUser.to+'/',
             mesInfo={
              content:_this.message,
              type:0,
              readstate:_this.messageUser.type ? "" : 1,
             };  
          if(_this.message.length==0){
              _this.$toast('发送的消息不能为空！')
              return;
          }
          _this.initialize();
         /**
          * 发送消息 
          */ 
         _this.socket.send(JSON.stringify(mesInfo));

         /**
          *保存消息 
          */   
         _this.$http('get',saveMessageUrl,{
             params:mesInfo,
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
      * 创建socket
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
         
         /**
          * 接收到消息的回调函数
          */
         _this.socket.onmessage = function(event) {
            let data=JSON.parse(event.data);
            if(data.content){
               _this.changeMessageState(); 
               _this.newMessageList.push({
                    fromuserid:_this.messageUser.to,
                    ...data
                }); 
                _this.$nextTick(()=>{
                    document.getElementsByClassName('chatBox')[0].scrollTop='1000000';
                })
            }
              
         };
        
        /**
         * 连接成功后的回调函数
         */
        _this.socket.onopen=function(){
            console.log('socket open!')
            // 如果是从终极页进入的买家界面弹出商品详情的浮层
            if(_this.messageUser.type=='buy'){
                if(!_this.messageUser.bcid){
                   _this.$toast('缺少bicd');
                   return;
                }
                _this.$http('get','https://wsdetail.b2b.hc360.com/xcx/supply/'+_this.messageUser.bcid).then((res)=>{
                     if(res.errmsg){
                         return;
                     }  
                     _this.proDetail={
                        imgurl:res.picUrls&&res.picUrls[0].picUrl,
                        title:res.title,
                        price:res.price||'面议' 
                    }
                })
              
            }
        }

        /**
         * 连接关闭后的回调函数
         */
        _this.socket.onclose=function(){
           console.log('连接已经关闭！')
           _this.initialize();
        }

       /**
         * 连接失败后的回调函数
         */
        _this.socket.onerror=function(){
            console.log('连接error！')
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
         //没连接上会一直重连，设置延迟避免请求过多
         setTimeout(function(){
           _this.createdSocket();
         },2000)  
     },
     gotoback(){
         let _this=this;
         /**
          * 返回到消息列表页面之前，关闭socket
          */
         _this.socket.close();
         _this.$router.go(-1);
     }
  },
  created(){
      this.messageUser=this.$route.query;
      //买家查看显示为卖家公司名称
      if(this.messageUser.type=='buy'&&this.messageUser.shop){
        this.headName=decodeURIComponent(this.messageUser.shop);
      }
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

