<template>
  <div class="sidebar">
    <div class="sidebar-head"></div>
    <el-menu   class="el-menu-vertical-demo" 
    	:collapse="switchLeft" 
    	:default-active="showItem"
    	@select="jump"
    	background-color="#001529" 
    	text-color="#a5acb3" 
    	active-text-color="white">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">个人资料</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">模板管理</span>
        </template>
         <el-menu-item-group>
          <el-menu-item index="2-1">组件管理</el-menu-item>
          <el-menu-item index="2-2">全部模板</el-menu-item>
          <el-menu-item index="2-3">套件管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-menu-item index="3">
	    <i class="el-icon-setting"></i>
	    <span slot="title">站点管理</span>
	  </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    data() {
      return {
         showItem:'1-1'
      }
    },
    watch:{
    	   $route(to,from){
	  	var msg = this.$route.query.text
	  	switch(to.name)
			{
			case 'userData':
			  this.showItem = '1-1'
			  break;
			case 'manageComponent':
			  this.showItem = '2-1'
			  break;
			case 'siteManage':
			  this.showItem = '3'
			  break;
			}
	  },
    },
    created(){
    	  this.$router.push({path:'/userData'})
    },
    props:['switchLeft'],
    methods: {
      jump(key,index){
      	switch(key){
      		case '1-1':
      		this.$router.push({path:'/userData'})
      		break;
      		case '2-1':
      		this.$router.push({path:'/manageComponent'})
      		break;
      		case '3':
      		this.$router.push({path:'/siteManage'})
      		break;
      	}
      	
      }
    }
  }
</script>

<style lang="less">
 .sidebar{
 	float: left;
 	height: 100vh;
 	background: #001529;
 	.sidebar-head{
 		width: 100%;
 		height: 60px;
 		background: #00284d;
 		justify-content: center;
 		align-items: center;
 		display:flex;
 		p{
 			font-size: 20px;
 			color: white;
 		}
 	}
 }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 230px;
    height: auto;
    border-right: 0;
  }
  .el-menu{
  	border-right: 0;
  }
</style>