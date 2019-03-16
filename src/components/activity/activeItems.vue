<template>
  <div class="activeItems">
    <div class="template-edit-head">
      <i class="el-icon-arrow-left icon-size"></i>
      <el-button type="text" @click="backCompon">返回</el-button>
    </div>
  <div class="course-header">
    <div class="main_title">
      <span>我已经有一个域名了，如何绑定到云建站？（视频教程</span>
      <p><span>发布日期：2019.1.1</span><span>浏览次数：123123</span></p>
    </div>
  </div>
  <div class="course-item">
     <p class="title">这是一段视频教程，请观看视频</p>
     <h3 class="detail">视频简介</h3>
     <p class="text">那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮。
那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮。
那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮。
那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮。
那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮。
</p>
  <video width="100%" height="">
  	当前浏览器不支持 video直接播放，点击这里下载视频： <a href="myvideo.webm">下载视频</a>
  </video>
  <div class="foot-nav">
  	<span>
  		&lt;  如何使用商城系统
  	</span>
  	<span>
  		如何修改网站的名称  &gt;
  	</span>
  </div>
  </div>
  </div>
</template>

<script>
	export default{
		name:"ActiveItems",
		data(){
			return{
				
			}
		},
    methods:{
      backCompon(){
        this.$router.go(-1)
      }
    }
	}
</script>

<style lang="less">
  .activeItems{
    /*background: #f7fcfd;*/
    .template-edit-head {
      .icon-size{
        margin-left: 20px;
        font-size: 20px;
      }
      button {
        font-size: 20px;
      }
    }
    .course-header {
      height: 90px;
      align-items: center;
      justify-content: space-between;
      display: flex;
      border-bottom: 1px solid #F2DEDE;
      .main_title{
        margin-left: 30px;
        &:nth-child(1){
          font-size: 20px;
        }
        color: #6B6B6B;
        p{
          font-size: 13px;
          padding-top: 5px;
          span{
            padding-right: 20px;
          }
        }
      }
      .main__input {
        display: flex;
        width: 400px;
        margin-right: 20px;
        .el-input__inner {
          border-radius: 0px !important;
          height: 44px;
        }
        .seek {
          width: 70px;
          background: #1088f3;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 20px;
        }
      }
    }
    .course-item{
        padding: 0 32px 0 32px;
        .title{
           padding: 30px 0 28px 0;
           font-size: 18px;
           color: #959595;
        }
        .detail{
          font-size: 18px;
          color: #6B6B6B;
          padding-bottom: 26px;
          font-weight: 400;
        }
        .text{
          font-size: 14px;
          color: #959595;
          line-height: 28px;
        }
        .foot-nav{
          position: absolute;
          bottom: 20px;
          width: 100%;
          font-size: 13px;
          color: #6B6B6B;
          span{
            cursor: pointer;
            &:hover{
              color: #6389f8;
            }
          }
          span:nth-child(2){
            float: right;
            padding-right: 60px;
          }
        }
      }
  }
</style>
