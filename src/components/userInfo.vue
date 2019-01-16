<template>
  <div class="userInfo">
    <div class="userInfo-head">
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" @click="goBack">返回</el-button>
    </div>
    <div class="userInfo-box">
      <p class="userInfo-title">基本信息</p>
      <div class="resetassword">
        <el-button type="text" @click="diaShow=true">重置密码(默认为123456)</el-button>
      </div>
      <div class="userInfo-table">
        <table border="1" cellspacing="0" cellpadding="0">
          <tr>
            <td class="gray">头像</td>
            <td></td>
            <td class="gray">手机号</td>
            <td>188888</td>
          </tr>
          <tr>
            <td class="gray">用户昵称</td>
            <td></td>
            <td class="gray">注册时间</td>
            <td></td>
          </tr>
          <tr>
            <td class="gray">用户名称</td>
            <td></td>
            <td class="gray"></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="site-info">
        <p class="userInfo-title">站点信息</p>
        <div class="site-list">
          <div class="site-item" v-for="x in 3">
            <div class="site-item-title">
              <div class="site-item-title-text">
                <p>xxx的网站</p>
                <p>状态：未发布</p>
                <p>http://www.baidu.com</p>
              </div>
            </div>
            <div class="site-item-btn">
              <div class="site-item-btns">
                <div>
                  <span></span>
                  <span>查看</span>
                </div>
              </div>
              <div class="site-item-btns">
                <div>
                  <span></span>
                  <span>禁用</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="diaShow" width="30%">
      <span>您确定要重置密码吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="diaShow = false" size="small">取 消</el-button>
    <el-button type="primary" @click="diaShow = false" size="small">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'userInfo',
    data() {
      return {
         diaShow:false,
      }
    },
    methods: {
    	//返回上一页
      goBack() {
      	this.$emit('back',true)
        this.$router.push({path:'/userData'})
      },
    }
  }
</script>

<style lang="less">
  .userInfo-head {
    .el-button--text {
      font-size: 16px;
    }
  }
  .userInfo{
  	margin-bottom: 30px;
  	.el-dialog{
  		width: 300px !important; 
  	}
  }
  .userInfo-box {
    margin-top: 10px;
    .userInfo-title {
      font-size: 20px;
      font-weight: 600;
    }
    .resetassword {
      display: flex;
      justify-content: flex-end;
    }
    .userInfo-table {
      table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid black;
      }
      td {
        width: 100px;
        height: 60px;
        text-align: center;
      }
      .gray {
        background: #cccccc;
      }
    }
    .site-info {
      margin-top: 20px;
      .site-list {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .site-item {
          width: 30%;
          height: 300px;
          .site-item-title {
            height: 60%;
            border: 1px solid black;
            .site-item-title-text {
              margin: 20px 0 0 30px;
              p {
                margin-bottom: 5px;
                font-size: 15px;
                &:nth-child(1) {
                  font-size: 18px;
                  font-weight: 600;
                }
              }
            }
          }
          .site-item-btn {
            width: 100%;
            height: 40%;
            display: flex;
            .site-item-btns {
              height: 100%;
              width: 50%;
              border: 1px solid black;
              border-top: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              &:nth-child(1) {
                border-right: 0;
              }
            }
          }
        }
      }
    }
  }
</style>