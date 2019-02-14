<template>
  <div class="webPage">
    <div v-html="webPageList.header">{{webPageList.header}}</div>
    <div v-html="webPageList.content" class="content2">{{webPageList.content}}</div>
    <div v-html="webPageList.footer" class="footer">{{webPageList.footer}}</div>
  </div>
</template>

<script>
    export default {
      name: "webPage",
      data() {
        return {

        }
      },
      props:['webPageList'],
    }
</script>

<style lang="scss" scoped>
  .webPage{
    width: 100%;
    height: 100vh;
    position: relative;
    .content2{
      margin-top: 10px;
    }
    .footer{
      margin-top: 10px;
    }
  }
</style>
