<template>
  <div class="preview">
  	<div class="header">
      <div class="wrap">
        <div class="btn" @click="exitPreview"><i class="el-icon-circle-close"></i> 退出预览模式</div>
      </div>
    </div>
    <div v-html="preview.content">{{preview.content}}</div>
  </div>
</template>

<script>
  import '@/assets/js/swiper.min.js';
    export default {
      name: "preview",
      data() {
        return {
          preview:{
            content:window.localStorage.getItem('saveTemplateCode')
          }
        }
      },
      methods:{
      	//退出预览
      	exitPreview(){
      		window.history.back(-1)
      	}
      },
      mounted() {
       
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
     .header {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-weight: 200;
      .wrap {
        float: right;
        font-size: 12px;
        .btn {
          display: inline-block;
          height: 28px;
          padding: 0 20px;
          margin-left: 20px;
          margin-right: 20px;
          line-height: 28px;
          text-align: center;
          background-color: #4a6def;
          border-color: #4a6def;
          border-radius: 2px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
</style>
<style scoped>
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
</style>
