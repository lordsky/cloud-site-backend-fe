<template>
  <div class="login">
    <div class="login-content">
      <div class="login-ico"></div>
      <div class="login-title">
        <p>云建站后台管理系统</p>
      </div>
      <div class="login-input">
        <el-form :model="data" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
          <el-form-item prop="account">
            <el-input v-model="data.account" placeholder="请输入管理员账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="data.password" placeholder="请输入密码"></el-input>
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
          account: '',
          password: '',
        },
        rules2: {
          account: [{
            required: true,
            message: '账号不能为空'
          }, ],
          password: [{
            required: true,
            message: '密码不能为空'
          }, ],
        }
      }
    },
    methods: {
      //登录
      login() { 
        if(this.data.account && this.data.password) { 
        	  this.$http.get('http://rap2api.taobao.org/app/mock/94406/example/1539570567895',(res)=>{
        	  	        console.log(res)
        	  })
          this.$router.push({
            path: '/userData'
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
      background: url(../assets/logo.jpeg) no-repeat center center;
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