<template>
<div class="system-MessageItem">
	<div class="title">
		<p>{{title}}</p>
		<span>发布日期：{{time}}</span><span>类型：{{type}}</span>
	</div>
	<div class="contentText" v-html="content">
	</div>
	<el-row type="flex" justify="center">
		<el-button type="primary" class="btn" @click="goBack">返回</el-button>
	</el-row>
</div>
</template>

<script>
	export default{
		name:"systemItem",
		data(){
			return{
				title:'',
				time:'',
				type:'',
				content:''
			}
		},
		methods:{
			goBack(){
				this.$router.push({path:'/systemMessage'})
			},
			getContent(val){
				this.$http.get(this.$API.lookMessage+'?id='+val,response=>{
					this.title = response.data.data.title
					this.time = response.data.data.createTime
					this.type =response.data.data.catName
					this.content = response.data.data.content
				})
			}
		},
		created(){
			let id  = this.$route.query.id
			console.log(id)
			this.getContent(id)
		}
	}
</script>

<style lang="less">
.system-MessageItem{
	margin-top: 20px;
    .title{
    	   font-size: 13px;
    	   color: #999;
    	   border-bottom:1px solid #F2F2F2;
    	   padding-bottom:10px;
    	   p{
    	   	font-size: 18px;
    	   	font-weight: 400;
    	   	padding-bottom: 10px;
    	   	color: black;
    	   }
    	   span{
    	   	padding-right: 20px;
    	   }
    }
    .btn{
    	   margin: 10px 0 10px 0;
    	   padding: 10px 50px 10px 50px;
    }
}
</style>