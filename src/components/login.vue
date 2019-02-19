<template>
  <div class="login">
    <div class="login-content">
      <div class="login-ico"></div>
      <div class="login-title">
        <p>云建站后台管理系统</p>
      </div>
      <div class="login-input">
        <el-form :model="data" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
          <el-form-item prop="phone">
            <el-input v-model="data.phone" placeholder="请输入管理员账号"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input type="password" v-model="data.pwd" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">立即登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        data: {
          phone: '',
          pwd: '',
        },
        rules2: {
          phone: [{
            required: true,
            message: '账号不能为空'
          }, ],
          pwd: [{
            required: true,
            message: '密码不能为空'
          }, ],
        }
      }
    },
    methods: {
      //登录
      login() { 
        if(this.data.phone && this.data.pwd) { 
        	  this.$http.post(this.$API.login,this.data,(res)=>{
        	  	        if(res.data.code==200){
        	  	        	    localStorage.setItem('cloudUser',JSON.stringify(res.data.data))
        	  	        	    this.$router.push({
				          path: '/manageComponent'
				        })
        	  	        }
        	  })
        }
      }
    }
  }
</script>

<style lang="less">
  .login {
    width: 100%;
    height: 100vh;
    .login-content {
      width: 600px;
      height: 600px;
      background: white;
      position: absolute;
      top: 150px;
      left: calc(50% - 300px);
    }
    .login-ico {
      width: 100%;
      height: 150px;
      margin: 20px auto;
      background: url(../../static/logo.8b56fd6.jpeg) no-repeat center center;
    }
    .login-title {
      width: 280px;
      margin: 0 auto;
      font-size: 30px;
      font-weight: 600;
    }
    .login-input {
      width: 65%;
      margin: 0 auto;
      margin-top: 30px;
      button {
        width: 100%;
      }
    }
  }
</style>