<template>
   <div class="tabBoxList">
       		<ul class="tabBoxListCon1">
            	<li v-for="(item,i) in chartData" :key="i">
                	<a :href="'#/message/chatInfo?from='+username+'&to='+ getToUser(item)" >
                        <div class="messImg"><em v-show="item.readstate==0"></em><div class="messImgCon"><img src="https://style.org.hc360.com/images/microMall/message/topImg.png"></div></div>
                        <dl>
                            <dt><h5></h5><span>{{timestampToTime(item.createtime)}}</span></dt>
                            <dd><p>{{item.content}}</p></dd>
                        </dl>
                    </a>
                </li>
            	
            </ul>
        </div>
</template>
<script>
export default {
  data(){
      return {
        chartData:[],
        username:''
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
             }
         })
     },

     /**
      * 时间戳转换为时间
      */
     timestampToTime(timestamp) {
        let _this=this; 
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear(),
            M = _this.formateDate(date.getMonth()+1),
            D = _this.formateDate(date.getDate()) ,
            h = _this.formateDate(date.getHours()),
            m = _this.formateDate(date.getMinutes()),
            s =_this.formateDate(date.getSeconds());
        return Y+'-'+M+'-'+D+' '+h+':'+m+':'+s;
     },
  
     /**@augments
      * 格式化时间日期，如果小于两位数补0
      */
     formateDate(d){
         if(d<10){
            return '0'+d
         }else{
            return d
         }
     },
     
     /**
      *  获取消息接收者,不为登录用户名的就是消息接收者
      */
     getToUser(item){
          if(item.fromuserid==this.username){
              return item.touserid
          }else{
              return item.fromuserid
          }
    }
  },
  created(){
     let companInfo=JSON.parse(localStorage.getItem('companyInfo')||'{}');
         this.username=companInfo.username;
     /*
      * 获取及时沟通列表
      */      
     this.getChatData();
  }
}
</script>
