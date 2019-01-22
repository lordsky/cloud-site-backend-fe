<template>
  <div class="user-info">
    <div class="user-info-title" v-show="pageShow">
      <p>用户资料</p>
    </div>
    <div class="uer-info-box" v-show="pageShow">
      <p class="user-info-box-text">个人资料</p>
      
      <div class="user-info-box-content" v-if="userShow">
        <el-form  :model="userInfo" class="demo-form-inline" label-position="right" label-width="100px">
        	  <el-form-item label='头像：'>
        	  	<div class="user-info-box-ico"></div>
        	  </el-form-item>
          <el-form-item label="昵称：">
           <p>罗大胖</p>
          </el-form-item>
          <el-form-item label="姓名：">
            <p>张三</p>
          </el-form-item>
          <el-form-item label="手机号：">
             <p>111112334</p>
          </el-form-item>
          <div class="user-info-box-editBtn">
          	 <el-button type="primary" @click="userShow = false">修改个人资料</el-button>
          </div>
        </el-form>
      </div>
      
      <div class="user-info-box-content" v-else>
        <el-form  :model="userInfo" class="demo-form-inline" label-position="right" label-width="100px">
        	  <el-form-item label='头像：'>
        	  	<div class="user-info-box-ico"></div>
        	  	<el-button type="text">修改头像</el-button>
        	  </el-form-item>
          <el-form-item label="昵称：">
            <el-input v-model="userInfo.name" placeholder="请输入您的昵称"></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="userInfo.name" placeholder="请输入您的姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="userInfo.name" placeholder="请输入您的手机号"></el-input>
          </el-form-item>
          
          <div class="user-info-box-btn">
          	 <el-button type="primary" @click="userShow = true">保存信息</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <setPass v-show="pageShow"></setPass>
    <aaa	></aaa>
  </div>
</template>

<script>
	import setPass from './changePassword'
	import aaa from './cmsSiteManage'
  export default {
    name: 'cmsUser',
    data() {
      return {
		userInfo:{
			name:''
		},
		userShow:true,
		pageShow:false
      }
    },
    components:{
    	  setPass,
    	  aaa
    }
  }
</script>

<style>
  .user-info-title {
  	width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px #e5e5e5 solid;
    margin-left: 20px;
  }
  .user-info-box-text{
  	margin: 30px 0 30px 20px;
  }
  .user-info-title>p {
    font-size: 18px;
  }
  .user-info-box-ico{
  	width: 80px;
  	height: 80px;
  	border-radius: 50%;
  	border: 1px black solid;
  	margin-right: 10px;
  }
  .user-info-box-content{
  	width: 500px;
  }
  .user-info-box-content .el-form-item__content{
  	display: flex;
  }
  
  .user-info-box-btn{
  	margin-left: 100px;
  }
  .user-info-box-btn>button{
  	width: 100%;
  }
  .user-info-ico{
  	width: 50px;
  	height: 50px;
  	border-radius: 50%;
  	border: 1px black solid;
  	margin-left: 20px;
  }
  .user-info-box-editBtn{
  	width: 100%;
  	display: flex;
  	justify-content: center;
  }
</style>