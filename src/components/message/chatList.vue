<template>
   <div class="tabBoxList">
       		<ul class="tabBoxListCon1">
            	<li v-for="(item,i) in chartData" :key="i">
                	<a :href="'#/message/chatInfo?from='+username+'&to='+item.touserid" >
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
        username:'cgl'
      }
  },
  methods:{
     getChatData(){
         let _this=this;
         _this.$http('get','http://ydmmt.hc360.com/mobilechat/getchatlist/cgl/',{
             params:{
                 to:_this.username
             }
         }).then((res)=>{
             if(res.length>0){
                _this.chartData = _this.chartData.concat(res);
             }
         })
     },
     // 时间戳转换为时间
     timestampToTime(timestamp) {
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-',
            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
            D = date.getDate() + ' ',
            h = date.getHours() + ':',
            m = date.getMinutes() + ':',
            s = date.getSeconds();
        return Y+M+D+h+m+s;
     }
  },
  created(){
      this.getChatData();
  }
}
</script>
