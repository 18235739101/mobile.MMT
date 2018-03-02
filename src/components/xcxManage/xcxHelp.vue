<template>
  <div>
      <XCXHead :head-name="headName" />
      <section>
    	<div class="telBox">
            <dl>
                <dt>客服电话</dt>
                <dd>400-6360-888</dd>
            </dl>
            <a href="tel:400-6360-888">拨打</a>
        </div>
        <div class="helpBox">
        	<dl>
            	<dt>常见问题</dt>
                <dd v-for="(item,i) in questions" :key="i"><a :href="item.url">{{item.title}}</a></dd>
            </dl>
        </div>
    </section>
    <footerContent></footerContent>
  </div>
</template>

<script>
import footerContent from 'components/footer.vue'
import XCXHead from '../header.vue'
export default {
    data(){
        return {
            headName:'小程序管理',
            /**常见问题对象 */
            questions:{}
        }
    },
  components:{
      footerContent,
      XCXHead
  },

  methods:{
      getQuestions(){
          let _this = this;
          _this.$http('get','http://madata.hc360.com/mobileapp/index/docx',{

          }).then(res =>{
              _this.questions = res;
          })
      }
  },

  mounted(){
      let _this = this;
      _this.$nextTick(() =>{
          _this.getQuestions();
      })
  }
}
</script>

<style>
@import "https://style.org.hc360.com/css/microMall/wxProgram.css";
</style>

