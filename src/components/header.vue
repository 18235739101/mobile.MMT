<template>
   <header class="mHeaderBox">
        <a href="javascript:;" class="arrowLeft" @click="gotoback()"></a>
         <h3>{{headName}}</h3>
   </header>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    gotoback() {
      this.$router.go(-1);
    }
  },
  props: {
    headName: {
      type: String
    }
  }
};
</script>

