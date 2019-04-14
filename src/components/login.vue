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
            <el-input v-model="data.phone" placeholder="请输入管理员账号" @keyup.enter.native="login"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input type="password" v-model="data.pwd" placeholder="请输入密码" @keyup.enter.native="login"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input type="text" v-model="data.code" placeholder="请输入验证码" @keyup.enter.native="login"></el-input>
            <div class="login_validation" v-show="identifyCode" @click="getCode">
            	 <Validation :identifyCode="identifyCode"></Validation>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import Validation from './common/identify'
  export default {
    name: 'login',
    data() {
      const PHONE_REG = /^1[34578]\d{9}$/
      let validatePhone = (rule, value, callback) => {
        if(value === "") {
          callback(new Error("请输入手机号"));
        } else if(!PHONE_REG.test(value)) {
          callback(new Error("请输入正确的手机号!"));
        } else {
          callback();
        }
      }
      return {
        data: {
          phone: '',
          pwd: '',
        },
        identifyCode:'',
        rules2: {
          phone: [{
            validator: validatePhone,
            trigger: "blur"
          }, ],
          pwd: [{
            required: true,
            message: '密码不能为空'
          }, ],
          code:[
            {required: true,message: '验证码不能为空'}
          ]
        }
      }
    },
    computed: {
       
    },
    components:{
    	  Validation
    },
    created(){
    	  this.getCode()
    },
    methods: {
      //登录
      login() {
        this.$refs['ruleForm2'].validate((valid) => {
          if(valid) {
            if(this.data.phone && this.data.pwd) {
              this.$http.post(this.$API.login, this.data, (res) => {
                if(res.data.code == 200) {
                  localStorage.setItem('cloudUser', JSON.stringify(res.data.data))
                  this.getJson(res.data.data)
                }else{
                	  this.getCode()
                }
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      getCode(){
      	 this.$http.post(this.$API.code,{},(response)=>{
      	    if(response.data.code==200){
      	    	   this.identifyCode = response.data.data
      	    }
      	 })
      },
      getJson(val){
//    	console.log(val)
      	this.$http.get(this.$API.getJsonList+'?roleId='+val.roleId
      	,response=>{
      		if(response.data.code==200){
      			localStorage.setItem('sidebarJson',response.data.data)
      			
      			 this.$router.push({
                    path: '/userData'
                  })
      		}
      	})
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
      background: url(../assets/logo.png) no-repeat;
      background-size: cover;
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
    .el-form-item__content{
    	   display: flex;
    	   align-items: center;
    	   .login_validation{
    	   	 height: 40px;
    	   	 cursor: pointer;
    	   }
    }
  }
</style>