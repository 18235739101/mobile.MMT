<template>
<div>
    <shopHeader titleName="店铺资料"></shopHeader>
    <section>
		<div class="dataBox">
        	<dl class="dataList">
            	<dt><h3>基本信息</h3></dt>
                <dd>
                	<span class="storeLogoFont">店铺LOGO</span>
                    <div class="storeLogo"><img :src="companyInfo.logoUrl ? companyInfo.logoUrl : 'https://style.org.hc360.com/images/microMall/manage/hImg.png'"></div>
                </dd>
                <dd>
                	<span>店铺名称</span>
                    <p>{{companyInfo.name}}</p>
                </dd>
                <dd>
                	<span>主营行业</span>
                    <p>{{companyInfo.areaName}}</p>
                </dd>
                <dd>
                	<span>经营地址</span>
                    <p>{{companyInfo.address}}</p>
                </dd>
                <dd>
                	<span>联系电话</span>
                    <p>{{companyInfo.telephone}}</p>
                </dd>
            </dl>
        	<dl class="certificationList">
            	<dt><h3>认证信息</h3></dt>
                <dd><span>企业信息</span><p>{{companyInfo.authenorg}}</p></dd>
            </dl>
        </div>
        <logoTip></logoTip>
    </section>


</div>
</template>

<script>
import logoTip from 'components/v-logoTip'
import shopHeader from './shopHeader'
export default {
  data(){
      return {
          companyInfo:JSON.parse(localStorage.getItem('companyInfo'))
      }
  },
  components:{
      shopHeader,
      logoTip
  }
}
</script>

<style scoped>
@import "https://style.org.hc360.com/css/microMall/storeStyle.css";
</style>

