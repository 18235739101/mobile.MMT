<template>
  <div>
      <componentHead :head-name="headName" />  
      <section>
       <div class="massageDetail">
       		<div class="mDetailCon" v-if="messgeInfo.busnoteDetail">
            	<h5>{{messgeInfo.busnoteDetail.title}}</h5>
                <p>{{messgeInfo.busnoteDetail.createTime}}</p>
                <div class="mDetailConBot" v-html="messgeInfo.busnoteDetail.content">
                </div>
                <div class="mDetailConPrompt">安全提醒： 下单付款成功与否与缴纳保证金无关， 慧聪网不会强制要求会员缴纳保证金 ，谨防假冒发发/电话诈骗。</div>
            </div>
            <div class="contactBox" v-if="messgeInfo.contactInfo">
                <dl>
                    <dt>联系买家</dt>
                    <dd v-show="messgeInfo.contactInfo.corName"><span>公司：</span><p>{{messgeInfo.contactInfo.corName}}</p></dd>
                    <dd v-show="messgeInfo.contactInfo.address"><span>地址：</span><p>{{messgeInfo.contactInfo.address}}</p></dd>
                    <dd v-show="messgeInfo.contactInfo.tel"><span>电话：</span><p>{{messgeInfo.contactInfo.tel}}<a :href="messgeInfo.contactInfo.tel"></a></p></dd>
                </dl>
            </div>
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
        messgeInfo:{}
      }
  },
  components:{
      componentHead
  },
  created(){
    let _this=this,
        busnoteId=(this.$route.query||{}).busnoteId,
        _url='http://my.b2b.hc360.com/my/turbine/action/outerinf.MsiteBusnoteAction/eventsubmit_doGetbusnotedetail/doGetbusnotedetail?callback'
    _this.$http('get',_url,{
        params:{
           busnoteId:busnoteId
        }
    }).then((res)=>{
        res=res.slice(1,res.length-1);
        res=JSON.parse(res||'{}').data;
        if(res.busnoteDetail&&res.contactInfo){
            _this.messgeInfo=res;
        }
    })
  }
}
</script>

<style>
@import url('https://style.org.hc360.com/css/microMall/messageStyle.css');
</style>
