<template>
  <div class="navHead">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-if="list.length==0">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(x,i) in list" v-else :key="i">{{x}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'navHead',
    data() {
      return {
         list:[]
      }
    },
    props:[],
    watch:{
	  $route(to,from){
	  	this.list = []
	  	var msg = this.$route.query.text
	  	switch(to.name)
			{
			case 'userData':
			  this.list.push('用户管理','个人资料')
			  break;
			case 'manageComponent':
			  this.list.push('模板管理','组件管理')
			  break;
			case 'siteManage':
			  this.list.push('站点管理')
			  break;
			}
		if(msg=='userInfo'){
			this.list.push('查看用户详细信息')
		}else if(msg == 'componEdit'){
			this.list.push('导航')
		}
	  },
	},
	created(){
		this.list = ['用户管理','个人资料']
	}
  }
</script>

<style lang="less">
 .navHead{
 	width: 100%;
 	padding-bottom: 10px;
 	border-bottom: 1px solid #cccccc;
 }
</style>