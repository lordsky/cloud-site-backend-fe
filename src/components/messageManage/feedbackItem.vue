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
    	  	<p class="feedback_title">反馈内容：</p>
    	  	<p>{{content.content}}</p>
    	  </el-col>
    	  <el-col>
    	  	<!--<p class="feedback_title">附件：</p>-->
    	  	<p class="feedback_title">附件：{{content.fileName?content.fileName:'无附件'}}
    	  	 <div class="seeFeedback">
            <a v-if="name == '.doc' || name == '.xls'" :href="'https://view.officeapps.live.com/op/view.aspx?src='+content.fileUrl" target="_blank" download="">查看</a>
            <a v-if="name != '.doc' && name != '.xls'" :href="content.fileUrl" target="_blank" download="">查看</a>
            <a :href="content.fileUrl" :download="content.fileName" style="margin-left: 10px">下载</a>
            </div></p>
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
				content:{},
                name:''
			}
		},
		methods:{
			//返回
			goBack(){
				this.$router.push({path:'/feedbackMessage'})
			},
			//下载
			download(){
				
			}
		},
		created(){
			let content = this.$route.query.msg
			console.log(JSON.parse(content))
			this.content = JSON.parse(content)
            let path = this.content.fileName
            path?this.name = path.substr(path.lastIndexOf(".")):this.name =''
            
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
  	.seeFeedback{
  	  
  	}
  }
</style>
