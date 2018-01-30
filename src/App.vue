<template>
  <div>    
    <router-view/>
    <!-- <footerContent/> -->
  </div>
</template>

<script>

import footerContent from './component/footer';
export default {
  name: 'App',
  components:{
    footerContent
  }
}
</script>

<style>

</style>
