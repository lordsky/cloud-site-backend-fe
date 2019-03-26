<template>
  <div class="passwordChange">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码:" prop="oldpass">
        <el-input type="password" v-model="ruleForm2.oldpass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码:" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')" class="password-submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'passwordChange',

    data() {
      var validatePass = (rule, value, callback) => {
        if(value === '') {
          callback(new Error('请输入密码'));
        } else {
          if(this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if(value === '') {
          callback(new Error('请再次输入密码'));
        } else if(value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
        	  oldpass:'',
          pass: '',
          checkPass: '',
        },
        rules2: {
        	  oldpass:[
        	  	 { required: true, message: '请输入旧密码', trigger: 'blur' }
        	  ],
          pass: [{
            validator: validatePass,
            trigger: 'blur'
          },
           { required: true, message: '请输入旧密码', trigger: 'blur' }],
          checkPass: [{
            validator: validatePass2,
            trigger: 'blur'
          }, { required: true, message: '请输入旧密码', trigger: 'blur' }],
        }
      }
    },
    methods: {
      submitForm() {
         
      }
    }
  }
</script>

<style lang="less">
  .passwordChange {
    width: 500px;
    margin-top: 30px;
    .password-submit {
      width: 200px;
    }
  }
</style>