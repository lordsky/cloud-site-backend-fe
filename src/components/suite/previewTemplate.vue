<template>
  <div class="preview">
    <div v-html="preview.content">{{preview.content}}</div>
  </div>
</template>

<script>
  import Swiper from "swiper"
    export default {
      name: "preview",
      data() {
        return {
          preview:{
            content:window.localStorage.getItem('saveTemplateCode')
          }
        }
      },
      mounted() {
        const mySwiper = new Swiper('.swiper-container', {
          loop: true,
          observer:true,
          // 如果需要分页器
          pagination: '.swiper-pagination',
          // 如果需要前进后退按钮
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          // 如果需要滚动条
          scrollbar: '.swiper-scrollbar',
        })
      },
      methods:{
        aa(){
          const mySwiper = new Swiper ('.swiper-container', {
            loop: true,
            observeParents:true,
            observer:true,
            autoplay:true,
            // 如果需要分页器
            pagination: '.swiper-pagination',
            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
          })
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
<style>
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
