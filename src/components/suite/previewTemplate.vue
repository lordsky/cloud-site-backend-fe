<template>
  <div class="preview">
  	<div class="header">
      <div class="wrap">
        <div class="btn" @click="back"><i class="el-icon-circle-close"></i> 退出预览模式</div>
      </div>
    </div>
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
      		// window.history.back(-1)
          window.close()
      	},
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
        $("#navToggler").click(function () {
          $("#navLink").toggle();
        });
        setTimeout(()=>{
          $('.header-hsw') .css('position','absolute')
        },1000)
        $(document).scroll(function() {
          var scroH = $(document).scrollTop();  //滚动高度
          var viewH = $(window).height();  //可见高度
          headerScroll(scroH);
          showText("#service",scroH,viewH);
          showText("#wifi",scroH,viewH);
          showText("#hotel",scroH,viewH);
          showText("#video",scroH,viewH);
          showText("#room",scroH,viewH);
          showText("#tour",scroH,viewH);
        });
      },
    }
  function showText(id, scroH, viewH){
    if($(id).length > 0){
      if($(id).offset().top - scroH < viewH * 0.5){
        $(id + " .text").addClass("show-text");
      }else if($(id).offset().top - scroH > viewH){
        $(id + " .text").removeClass("show-text");
      }
    }
  }
  function showImg(id, index){
    let url = ''
    var time = new Date().getTime()
    if(index==2){
      url = 'https://fastdfs-dev-test.uworks.cc/group1/M00/00/13/wKgB7Fy1cDaAJ7OFAAMwwjfmuGc692.gif?'
    }else if(index==3){
      url = 'https://fastdfs-dev-test.uworks.cc/group1/M00/00/13/wKgB7Fy1cD6AfCCIAARkdxn27zE048.gif?'
    }else{
      url = 'https://fastdfs-dev-test.uworks.cc/group1/M00/00/13/wKgB7Fy1cC2AeZnJAAD-qCJNxAY475.gif?'
    }
    // console.log($(id).length)
    if($(id).length>0){
      $("#box-"+index).css("background-image",`url(${url}+${time})`);
    }
  }
  function headerScroll(scroH){
    if(scroH >50){  //距离顶部大于50px时
      $("#header").addClass("white");
      $("#header img").attr('src','https://fastdfs-dev-test.uworks.cc/group1/M00/00/13/wKgB7Fy1b4KAJE5dAAAJTp8Jyh8278.png');
    }else{
      $("#header").removeClass("white");
      $("#header img").attr('src','https://fastdfs-dev-test.uworks.cc/group1/M00/00/15/wKgB7Fy2xZuALSJTAAAINAO5Mwg530.png');
    }
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
