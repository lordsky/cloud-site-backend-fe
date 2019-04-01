<template>
  <div class="headTop">
    <div class="head-left" :class="{'offIco':icoShow}" @click="onLeft"></div>
    <div class="head-right">
      <!--<span class="head-user-ico"></span>-->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
        	<span class="head-right-user">{{user.phone}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
         <el-button type="text" style="padding: 5px 30px 5px 30px;" @click="dialogVisible = true">退出登录</el-button>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="退出" :visible.sync="dialogVisible">
      <span>确定要退出登录吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="exitUser">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'headTop',
    data() {
      return {
        icoShow: false,
        dialogVisible:false,
        user:{}
      }
    },
    methods: {
    	
    	//伸缩按钮
      onLeft() {
        this.icoShow = !this.icoShow
        this.$emit('onLeft', 'on')
      },
      //退出
      exitUser(){
      	this.$router.push({path:'/'})
    	 	localStorage.removeItem('cloudUser');
//  	 	console.log(localStorage.cloudUser)
      }
    },
    created(){
    	   let user = JSON.parse(localStorage.getItem('cloudUser'))
    	   this.user = user
    }
  }
</script>

<style lang="less">
  .headTop {
    height: 60px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .head-left {
      width: 25px;
      height: 25px;
      background: url(../../assets/img/side.png);
      background-size: 100% 100%;
      margin-left: 10px;
    }
    .offIco {
      background: url(../../assets/img/noside.png);
      background-size: 100% 100%;
    }
    .head-right {
      margin-right: 2.5vw;
      display: flex;
      align-items: center;
      
      .el-dropdown {
        cursor: pointer;
      }
    }
    .el-dialog{
    	 width: 350px;
    }
  }
</style>