<template>
  <div class="navHead">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-if="list.length==0">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(x,i) in list" v-else :key="i">{{x}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
	import {setNav} from '../config/sideConfig'
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
	  	this.list = setNav(to,msg)
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