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
	import {navHead,sideText} from '../config/sideConfig'
  export default {
    name: 'navHead',
    data() {
      return {
         list:[],
         msg:''
      }
    },
    props:[],
    watch:{
	  $route(to,from){
	  	this.list = []
	  	this.msg = this.$route.query.text
	  	this.list = setNav(to,this.msg)
	  },
	},
	created(){
       let site = window.location.hash
       let url = site.split("/")[1]
       let arr = url.split("?")[0];
       this.getIndex(arr)
	},
	methods:{
		 getIndex(val){
      	 for(var i =0;i<navHead.length;i++){
	  	 	if(val==navHead[i].path){
	  	 		this.list = navHead[i].text
	  	 	}
	  	 }
      },
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
