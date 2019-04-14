<template>
  <div class="sidebar">
    <div class="sidebar-head"><div class="sidebar-logo" :class="{'logoOff':switchLeft}"></div></div>
    <el-menu   class="el-menu-vertical-demo" 
    	:collapse="switchLeft" 
    :default-active="showItem"
    	@select="jump"
    	:unique-opened="one"
    	background-color="#001529" 
    	text-color="#a5acb3" 
    	active-text-color="#ecf1f5">
      <el-submenu :index="item.index" v-for="(item,i) in sideText" :key="i" v-if="item.list.length>0&& !item.state" >
        <template slot="title">
          <i :class="item.ico"></i>
          <span slot="title">{{item.title}}</span>
        </template>
        <el-menu-item-group v-for="(x,i) in item.list" :key="i" v-show="!x.state">
          <el-menu-item :index="x.index">{{x.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-menu-item :index="item.index" v-for="(item,i) in sideText" v-if="item.list.length==0&& !item.state" :key="i">
	    <i :class="item.ico"></i>
	    <span slot="title">{{item.title}}</span>
	  </el-menu-item>
    </el-menu>
  </div>
  
</template>

<script>
  import {navHead,sideText} from '../config/sideConfig'
  export default {
    name: 'sidebar',
    data() {
      return {
         showItem:'1-1',
         one:true,
         sideText:[]
      }
    },
    watch:{
    	   $route(to,from){
	  	 this.getIndex(to.name)
	  },
    },
    created(){
    	  let data = localStorage.getItem('sidebarJson')
    	   let site = window.location.hash
    	   let url = site.split("/")[1]
       let arr = url.split("?")[0]
    	   this.sideText = JSON.parse(data)
    	    setTimeout(()=>{
    	    	  this.getIndex(arr)
    	    },100)
    	  },
    
    props:['switchLeft'],
    methods: {
    	//点击
      jump(key,index){
         this.page(sideText,key)
      },
      getIndex(val){
      	 for(var i =0;i<navHead.length;i++){
	  	 	if(val==navHead[i].path){
	  	 		this.showItem = navHead[i].index
          return
	  	 	}
	  	 }
      },
      //搜索路由
      page(val,key){
      	 for(let i=0;i<val.length;i++){
        	    if(key==val[i].index){
        	    	  this.$router.push({path:val[i].path})
        	    	  return
        	    }else{
        	    	  if(val[i].list){
        	    	  	 this.page(val[i].list,key)
        	    	  }
        	    }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
 .sidebar{
 	float: left;
 	height: 100vh;
 	background: #001529;
 	.sidebar-head{
 		width: 100%;
 		height: 60px;
 	}

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 230px;
    height: auto;
    border-right: 0;
  }
  .el-menu{
  	border-right: 0;
  	.el-submenu__title{
  	   &:hover{
       color:#ecf1f5 !important;
      }
       &:hover>i{
         color: #ecf1f5;
       }
   }
   .el-menu-item-group__title {
   	display: none;
   }
  .el-menu-item{
   	 &:hover{
       color:#ecf1f5 !important;
      }
      &:hover>i{
   		color:#ecf1f5 !important;
   	 }
   } 
 }
  .sidebar-logo{
  	background: url(../../assets/logo.png) no-repeat;
  	background-size: 100% 100%;
    width: 100%;
    height: 100%;
    display: block;
    animation: aa 1s ease;
    background-color: white;
  }
  @keyframes aa{
  	from{opacity: 0;}
  	to{opacity: 1;}
  }
  .logoOff{
  	display: none;
  }
   }
</style>
