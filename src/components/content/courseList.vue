<template>
  <div class="courseList">
    <div class="main">
      <div class="main-content">
      	<div class="main-content-left">
      		<CourseSeek :titleList="titleList"></CourseSeek>
      		<div class="main-content-left-list" v-if="listShow">
      			<div class="main-content-left-item" v-for="x in 2">
      				<img src="@/assets/img/5.jpg" alt="" />
      				<div class="main-content-left-item-text">
      				   <div class="main-content-left-item-text-title">
      				   	<p>我已经有一个域名了，如何绑定到云建站？（视频教程）</p>
      				   	<span>发布日期：2018.12.13</span><span>分类：云建站素材 邮箱和域名</span>
      				   </div>
      				   <p class="main-content-left-item-text__detail">那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮，那你需要登录云建站后台，登录成功后会在后台也汇总看到修改域名的按钮。</p>
      				   <span class="main-content-left-item-text__btn" @click="jumpDetail">阅读正文&gt;</span>
      				</div>
      			</div>
      		</div>
      		<CourseItem v-else/>
      	</div>
      	<div class="main-content-right">
      	 <div class="main-right-tutorial">
      	   <div class="main-content-right-head">
      	   	 <i class="el-icon-menu"></i><span>教程分类</span>
      	   </div>
      	   <div class="main-content-right-class">
      	   	  <ul class="main-content-list" v-for="(x,i) in 10" :key="i">
      	   	  	<li @click="isItemShow = i" >基础组件(视频教程) 
      	   	  		<i :class="isItemShow==i?'el-icon-arrow-down':'el-icon-arrow-right'"></i>
      	   	  	</li>
      	   	  	<ul class="main-content-item" :class="{'show':isItemShow==i}">
      	   	  			<li>网站管理</li>
      	   	  			<li>网站备案</li>
      	   	  			<li>邮箱和域名</li>
      	   	  			<li>SEO搜索引擎优化</li>
      	   	   </ul>
      	   	  </ul>
      	   </div>
      	   </div>
      	   <div class="main-right-hot">
      	   <div class="main-content-right-head">
      	   	 <i class="el-icon-menu"></i><span>热门分类</span>
      	   </div>
      	   <div class="main-content-right-class">
      	   	  <ul class="main-content-list" v-for="(x,i) in 3" :key="i">
      	   	  	<li @click="isItemShow = i" >基础组件(视频教程)
      	   	  		<i :class="isItemShow==i?'el-icon-arrow-down':'el-icon-arrow-right'"></i>
      	   	  	</li>
      	   	  	<ul class="main-content-item" :class="{'show':isItemShow==i}">
      	   	  			<li>网站管理</li>
      	   	  			<li>网站备案</li>
      	   	  			<li>邮箱和域名</li>
      	   	  			<li>SEO搜索引擎优化</li>
      	   	   </ul>
      	   	  </ul>
      	   </div>
      	   </div>
      	</div>
      	
      </div>
    </div>
  </div>
</template>

<script>
  import CourseSeek from './courseHeader'
  import CourseItem from './courseItems'
  export default {
    name: "CourseList",
    data() {
      return {
        textList: ['教程中心', '教程列表'],
        titleList:{title:'建站列表'},
        listShow:true,
        isItemShow:0,
        classText:''
      }
    },
    methods:{
    	//详情页面
    	 jumpDetail(){
    	 	this.listShow = false
    	 	this.textList =['教程中心', '教程列表','视频教程']
    	 	this.titleList.title = '我已经有一个域名了，如何绑定到云建站？（视频教程）'
    	 	this.titleList.list = '11'
    	 }
    },
    components: {
      CourseSeek,
      CourseItem
    },
    
  }
</script>

<style lang="less">
  
  .courseList {
  	/*background: #f7fcfd;*/
    .topColor {
      height: 62px;
      background: linear-gradient(left, #476cf0, #3e96fa);
    }
    img{
		width: 180px;
		height: 180px;
		padding-right: 20px;
	  }
    .main{
    	  /*width: 80%;*/
    	  /*margin: auto;*/
    	  .topTitle{
    	  	padding: 32px 0 32px 0;
    	  }
    	  .main-content{
    	  	display:flex;
    	  	margin-bottom: 20px;
    	  	.main-content-left{
    	  		width: 80%;
    	  		margin-right: 22px;
    	  		box-shadow: -1px 5px 20px #e0e1e0;
    	  		position: relative;
    	  		.main-content-left-list{
    	  			width: 100%;
    	  			.main-content-left-item{
    	  				padding: 0 30px 30px 30px;
    	  				margin-top: 32px;
    	  				border-bottom:1px solid #F2DEDE;
    	  				display:flex;
    	  				.main-content-left-item-text{
    	  					font-size: 14px;
    	  					flex:1;
    	  					.main-content-left-item-text-title{
    	  						p{
    	  							padding-top: 3px;
    	  							padding-bottom: 8px;
    	  							color: #6B6B6B;
    	  							font-size: 20px;
    	  						}
    	  						span{
    	  							color: #DCDCDC;
    	  							padding-right: 10px;
    	  						}
    	  					}
    	  					.main-content-left-item-text__detail{
    	  						padding-top: 15px;
    	  						color: #959595;
    	  						overflow: hidden;
						   text-overflow: ellipsis;
						   display: -webkit-box;
						  -webkit-line-clamp: 2;
						  -webkit-box-orient: vertical;
						   margin-top: 7px;
    	  					}
    	  					.main-content-left-item-text__btn{
    	  						color: #3b89f8;
    	  						font-size: 16px;
    	  						display: block;
    	  						margin-top: 40px;
    	  						cursor: pointer;
    	  					}
    	  				}
    	  			}
    	  		}
    	  	}
    	  	.main-content-right{
    	  		width: 20%;
    	  		.main-right-tutorial{
    	  			box-shadow: -1px 5px 20px #e0e1e0;
    	  			height: 70vh;
    	  			overflow-y: auto;
    	  		}
    	  		.main-right-hot{
    	  			box-shadow: -1px 5px 20px #e0e1e0;
    	  			height: 30vh;
    	  			margin-top: 30px;
    	  			overflow-y: scroll;
    	  		}
    	  		.main-content-right-head{
    	  			height: 90px;
    	  			border-bottom:1px solid #F2DEDE;
    	  			display: flex;
    	  			align-items: center;
    	  			font-size: 20px;
    	  			color: #6B6B6B;
    	  			padding-left: 20px;
    	  			i{
    	  				padding-right: 10px;
    	  				color: #1088f3;
    	  			}
    	  		}
    	  		.main-content-right-class{
    	  			.main-content-list{
    	  				list-style: none;
    	  				width: 80%;
    	  				margin:auto;
    	  				margin-top: 20px;
    	  				overflow:hidden;
    	  				li{
    	  					cursor: pointer;
    	  					display: flex;
    	  					justify-content: space-between;
    	  					align-items: center;
    	  					padding-top: 10px;
    	  				}
    	  				.main-content-item{
    	  						list-style: none;
    	  						transition: all  .5s ease-in-out;
    	  						padding-top:15px;
    	  						overflow: hidden;
    	  						transform: translateY(-100%);
    	  						display: none;
    	  						li{
    	  							padding: 10px 0 10px 0;
    	  							color:#929292 ;
    	  							&:hover{
    	  								color:#6389f8 ;
    	  							}
    	  						}
    	  					}
	    	  			 .show{
	    	  			 	display: block;
	    	  			 	transform: translateY(0);
	    	  			 }
    	  			}
    	  		}
    	  	}
    	  }
    }
    @keyframes itemList{
    	from{transform: translateY(-100%);}
    	to{transform: translate(0);}
    }
  }
</style>
