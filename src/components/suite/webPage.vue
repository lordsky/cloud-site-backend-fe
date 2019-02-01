<template>
  <div class="webPage">
    <div v-html="webPageList.header">{{webPageList.header}}</div>
    <div v-html="webPageList.content">{{webPageList.content}}</div>
    <div v-html="webPageList.footer">{{webPageList.footer}}</div>
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

<style lang="scss">
  .webPage{
    width: 100%;
    height: 100vh;
  }
</style>
