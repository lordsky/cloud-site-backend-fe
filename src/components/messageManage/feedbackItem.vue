<template>
 <div class="feedback-item">
    <el-row>
    	  <el-col>
    	  	<p class="feedback_title">反馈类型：功能建议</p>
    	  </el-col>
    	  <el-col>
    	  	<p class="feedback_title">反馈人：</p>
    	  	<ul class="feedback_info">
    	  		<li>姓名：</li>
    	  		<li>电话：</li>
    	  		<li>邮箱：</li>
    	  	</ul>
    	  	<p class="feedback_title">反馈内容：</p>
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
				
			}
		},
		methods:{
			goBack(){
				this.$router.push({path:'/feedbackMessage'})
			}
		}
	}
</script>

<style lang="less">
  .feedback-item{
  	.feedback_info{
  		list-style: none;
  	}
  	.feedback_btn{
  		display: flex;
  		justify-content: center;
  		margin-top: 20px;
  	}
  	.feedback_title{
  		font-size: 20px;
  		font-weight: 400;
  		margin: 20px 0 20px 0;
  	}
  }
</style>