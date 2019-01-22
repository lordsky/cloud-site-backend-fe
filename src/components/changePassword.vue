<template>
  <div class="changePass">
    <div class="changePass-title">
      <p>修改密码</p>
    </div>
    <div class="changePass-box">
      <el-form :model="formInline" class="demo-form-inline" label-position="right" label-width="100px">
        <el-form-item label="旧密码：">
          <el-input v-model="formInline.user" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input v-model="formInline.user" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：">
          <el-input v-model="formInline.user" placeholder=""></el-input>
        </el-form-item>
        <div class="changePass-btn">
        	  <el-button type="primary">保存密码</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'changePass',
    data() {
      return {
         formInline: {
          user: '',
          region: ''
        }
      }
    }
  }
</script>

<style>
	.changePass-title{
		height: 60px;
		display: flex;
		align-items: center;
		border-bottom: 1px #e5e5e5 solid;
	}
   .changePass-box{
   	width: 500px;
   	margin-top: 50px;
   }
   .changePass-btn{
   	margin-left: 100px;
   }
   .changePass-btn>button{
   	width: 100%;
   }
</style>