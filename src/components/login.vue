<template>
	<div class="login">
	    <div class="login-content">
	       <div class="login-ico"></div>
	       <div class="login-title"><p>云建站后台管理系统</p></div>
	       <div class="login-input">
	       	<el-input v-model="account" placeholder="请输入管理员账号"></el-input>
            	<el-input v-model="password" placeholder="请输入密码"></el-input>
            	<el-button type="primary" @click="login">立即登陆</el-button>
	       </div>
	    </div>
	</div>
</template>

<script>
	export default{
		name:'login',
		data(){
			return{
				account:'',
				password:'',
			}
		},
		methods:{
			//登录
			login(){
				this.$router.push({path:'/Management'})
			}
		}
	}
</script>

<style lang="less">
.login{
	width: 100%;
	height: 100vh;
	.login-content{
		width: 600px;
		height: 600px;
		background:white;
		position: absolute;
		top: 150px;
		left: calc(50% - 300px);
	}
	.login-ico{
		width: 150px;
		height: 150px;
		margin: 20px auto;
		border: 1px black solid;
	}
	.login-title{
		width: 280px;
		margin: 0 auto;
		font-size: 30px;
		font-weight: 600;
	}
	.login-input{
		width: 65%;
		margin: 0 auto;
		margin-top: 30px;
	    input{
	    	  margin-bottom: 30px;
	    }
	    button{
	    	 width: 100%;
	    }
	}
}
</style>