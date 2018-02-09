<template>
  <div>
    <componentHead :head-name="headName"/>  
    <section>
       <div class="tabTit">
       		<ul>
             <li @click="checkComponent(nav.componentName)" :class="{'tabCur':nav.componentName==messageValue}" v-for="(nav,i) in navList" :key="i">
               <a>{{nav.name}}</a>
             </li>
          </ul>
       </div> 
   </section>
     <keep-alive>
            <component :is="messageValue"></component>
     </keep-alive>  
  </div>    
      
</template>
<script>
import messageList from "./messageList.vue";
import chatList from './chatList.vue';
import componentHead from '../header.vue';
export default {
  data(){
    return {
      headName:'即时沟通',
       navList: [
        {
          name: "即时沟通",
          componentName: "chatList"
        },
        {
          name: "询价留言",
          componentName: "messageList"
        }
      ]
    }
  },
  components:{
      componentHead,
      messageList,
      chatList
  },
  methods: {
    /***
     * 提交mutation
     */
    checkComponent(name) {
      this.$store.commit('changeMessage',name);
    }
  },
  computed:{
    messageValue(){
      return this.$store.state.messageValue
    }
  }
}
</script>

<style>
@import url('https://style.org.hc360.com/css/microMall/messageStyle.css');
</style>


