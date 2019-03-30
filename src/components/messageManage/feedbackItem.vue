<template>
 <div class="feedback-item">
    <el-row>
    	  <el-col>
    	  	<p class="feedback_title">反馈类型：{{content.type==1?'功能建议':content.type==2?'服务投诉':content.type==1?'申诉情况':'举报问题'}}</p>
    	  </el-col>
    	  <el-col>
    	  	<p class="feedback_title">反馈人：{{content.name}}</p>
    	  	<ul class="feedback_info">
    	  		<li>姓名：{{content.name}}</li>
    	  		<li>电话：{{content.phone}}</li>
    	  		<li>邮箱：{{content.email}}</li>
    	  	</ul>
    	  	<p class="feedback_title">反馈内容：{{content.content}}</p>
    	  	<p></p>
    	  </el-col>
    	  <el-col>
    	  	<p class="feedback_title">附件：</p>
    	  </el-col>
    </el-row>
    <div class="feedback_btn">
    	<el-button type="primary" @click="goBack">返回</el-button>
    </div>
 </div>
</template>

<script>
	export default{
		name:"feedbackItem",
		data(){
			return{
				content:{}
			}
		},
		methods:{
			goBack(){
				this.$router.push({path:'/feedbackMessage'})
			}
		},
		created(){
			let content = this.$route.query.msg
			console.log(JSON.parse(content))
			this.content = JSON.parse(content)
		}
	}
</script>

<style lang="less">
  .feedback-item{
  	 padding: 0 20px 0 20px;
  	 font-size: 15px;
  	.feedback_info{
  		list-style: none;
  	}
  	.feedback_btn{
  		display: flex;
  		justify-content: center;
  		margin-top: 50px;
  		.el-button{
  			width: 150px;
  		}
  	}
  	.feedback_title{
  		font-size: 18px;
  		font-weight: 400;
  		margin: 20px 0 20px 0;
  	}
  }
</style>