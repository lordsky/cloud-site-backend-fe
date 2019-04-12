<template>
  <div class="course-header">
    <div class="main_title">
     <span>{{titleList.title}}</span>
     </p>
    </div>
    <div class="main__input">
      <el-input placeholder="请输入您的问题,例如：绑定域名" v-model="seekText"></el-input><i class="el-icon-search seek" @click="searchList(seekText)"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "courseHeader",
    data() {
      return {
         seekText:''
      }
    },
    watch:{
    	  seekText(val){
    	  	  this.$emit('getSeek',this.seekText)
    	  },
    	  // $route(val){
    	  //    val.path=='/courseList'?this.titleList.time = false:''
    	  // }
    },
    methods:{
    	  
    },
    created(){
    	  
    },
    props:['titleList','searchList']
  }
</script>

<style lang="less">
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
      cursor: pointer;
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
</style>
