<template>
    <header class="mHeaderBox">
        <a href="javascript:history.go(-1)" class="arrowLeft"></a>
        <h3>{{titleName}}</h3>
    </header>
</template>

<script>
export default {

    props:{
        titleName:{
            type:String
        },
    }
  
}
</script>

<style>

</style>


