<template>
  <div class="preview">
    <div v-html="preview.content">{{preview.content}}</div>
  </div>
</template>

<script>
    export default {
      name: "preview",
      data() {
        return {
          preview:{
            content:window.localStorage.getItem('saveTemplateCode')
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .preview{
    width: 100%;
    height: 100vh;
    position: relative;
    .content{
      margin-top: 10px;
    }
    .footer{
      margin-top: 10px;
    }
  }
</style>
