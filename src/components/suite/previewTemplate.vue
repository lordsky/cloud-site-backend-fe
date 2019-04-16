<template>
  <div class="preview">
  	<!--<div class="header">
      <div class="wrap">
        &lt;!&ndash;<div class="btn" @click="back"><i class="el-icon-circle-close"></i> 退出预览模式</div>&ndash;&gt;
      </div>
    </div>-->
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
      methods:{
      	//退出预览
      	back(){
      		window.history.back(-1)
      		
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
    }
</script>
<style lang="less" src="../../assets/css/style.less"></style>   
<style lang="less" scoped>
  
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
