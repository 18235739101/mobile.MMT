<template>
  <a href="javascript:void(0)" class="fTopBtn" @click="gotoTop">返回顶部</a>
</template>

<script>
export default { 
    data(){
        return {

        }
    },
    methods:{
        gotoTop(){
             document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    }
}
</script>

