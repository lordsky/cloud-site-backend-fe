<template>
  <div class="preview">
    <div v-html="preview.header">{{preview.header}}</div>
    <div v-html="preview.content" class="content2">{{preview.content}}</div>
    <div v-html="preview.footer" class="footer">{{preview.footer}}</div>
    <div>{{ceshi}}</div>
  </div>
</template>

<script>
    export default {
      name: "preview",
      data() {
        return {
          preview:{
            header:this.$route.query.segment.header,
            content:this.$route.query.segment.content,
            footer:this.$route.query.segment.footer
          },
          ceshi:''
        }
      },
      mounted(){
        this.ceshi = this.$route.query.segment
        console.log(this.ceshi)
      }
    }
</script>

<style lang="scss" scoped>
  .preview{
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
