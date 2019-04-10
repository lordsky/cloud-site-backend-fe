<template>
  <div class="course-item">
    <div v-html="courseInfo.content">{{courseInfo.content}}</div>
  <video v-if="courseInfo.videoUrl !=''" controls="controls" :src="courseInfo.videoUrl" style="width: 100%;height: 30vw;margin-top: 20px">
  	当前浏览器不支持 video直接播放，点击这里下载视频： <a href="myvideo.webm">下载视频</a>
  </video>
    <div class="foot-nav">
        <span v-if="courseInfo.afterId != null" @click="getCatInfo(courseInfo.afterId)">
          &lt;  {{courseInfo.afterName}}
        </span>
      <span v-if="courseInfo.afterId == null">
          &lt;  暂无上一个
        </span>
      <span v-if="courseInfo.beforeId != null" @click="getCatInfo(courseInfo.beforeId)">
          {{courseInfo.beforeName}}  &gt;
        </span>
      <span v-if="courseInfo.beforeId == null">
         暂无下一个 &gt;
        </span>
    </div>
  </div>
</template>

<script>
	export default{
		name:"CourseItems",
		data(){
			return{
				
			}
		},
    props:['courseInfo'],
    methods:{
      getCatInfo(id) {
        this.$emit('getCatInfo', id)
      },
    }
	}
</script>

<style lang="less">
  .course-item{
  	  padding: 24px 32px 35px 32px;
      height: 75vh;
      overflow: hidden;
      overflow-y: auto;
      img{
        width: 100%;
      }
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
</style>
