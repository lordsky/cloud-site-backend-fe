<template>
  <div class="webPage">
    <div v-html="webPageList.header" id="headerHtml">{{webPageList.header}}</div>
    <div v-html="webPageList.content" class="content">{{webPageList.content}}</div>
    <div v-html="webPageList.footer" class="footer">{{webPageList.footer}}</div>
  </div>
</template>

<script>
  import '@/assets/js/jquery';
    export default {
      name: "webPage",
      data() {
        return {
        header:''
        }
      },
      props:['webPageList'],
    }
</script>

<style lang="scss" scoped>
  .webPage{
    width: 100%;
    /*height: 100vh;*/
    position: relative;
    .content{
      height: auto;
      margin-top: 10px;
      display: inline;
    }
    .footer{
      /*margin-top: 10px;*/
    }
  }
</style>
