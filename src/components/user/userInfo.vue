<template>
  <div class="userInfo">
    <div class="userInfo-head">
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" @click="goBack">返回</el-button>
    </div>
    <div class="userInfo-box">
      <p class="userInfo-title">基本信息</p>
      <div class="resetassword">
        <el-button type="text" @click="resetPass">重置密码(默认为123456)</el-button>
      </div>
      <div class="userInfo-table">
        <table border="1" cellspacing="0" cellpadding="0">
          <tr>
            <td class="gray">头像</td>
            <td><img src="" alt="" class="grayIco"/></td>
            <td class="gray">手机号</td>
            <td>{{list.account}}</td>
          </tr>
          <tr>
            <td class="gray">用户昵称</td>
            <td>{{list.name}}</td>
            <td class="gray">注册时间</td>
            <td>{{list.starTime}}</td>
          </tr>
          <tr>
            <td class="gray">用户名称</td>
            <td></td>
            <td class="gray"></td>
            <td></td>
          </tr>
        </table>
      </div>
      <p class="userInfo-title company">企业信息</p>
      <div class="userInfo-table">
        <table border="1" cellspacing="0" cellpadding="0">
          <tr>
            <td class="gray">公司名称</td>
            <td>1111</td>
            <td class="gray">联系电话</td>
            <td>{{list.account}}</td>
          </tr>
          <tr>
            <td class="gray">所在行业</td>
            <td>{{list.name}}</td>
            <td class="gray">邮箱</td>
            <td>{{list.starTime}}</td>
          </tr>
          <tr>
            <td class="gray">网站负责人</td>
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
                 <div class="site_button">
                 	<img src="../../assets/img/ic_cms_view.png" alt="" class="site_ico"/>
                 	<p>查看</p>
                 </div>
              </div>
              <div class="site-item-btns">
                <div class="site_button">
                 	<img src="../../assets/img/ic_cms_design.png" alt="" class="site_ico"/>
                 	<p>禁用</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="diaShow" width="30%">
      <span>{{dialogText}}</span>
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
         dialogText:'',
         list:{}
      }
    },
    methods: {
    	//返回上一页
      goBack() {
        this.$router.push({path:'/userData'})
      },
      //禁用
      disable(){
      	this.diaShow = true
      	this.dialogText = '是否确定禁用该站点？'
      },
      //重置密码
      resetPass(){
      	this.diaShow = true
      	this.dialogText = '确定要重置密码吗？'
      },
      jump(){
      	
      }
    },
    created(){
    	    this.list = this.$route.params.data
    	   console.log(this.$route.params.data)
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
    .company{
    	  padding: 30px 0 20px 0;
    }
    .resetassword {
      display: flex;
      justify-content: flex-end;
    }
    .userInfo-table {
      table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #999;
      }
      td {
        width: 100px;
        height: 60px;
        text-align: center;
      }
      .gray {
        background: #add4ff;
        color: white;
      }
      .grayIco{
      	width: 50px;
      	height: 50px;
      	border-radius: 50%;
      	border: 1px solid black;
      	margin: 0 auto;
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
          height: auto;
          border:#f2f2f2 solid 1px;
          box-shadow: 0 0 8px #cbe0f9;
          .site-item-title {
            .site-item-title-text {
              margin: 20px 0 0 30px;
              p {
                margin-bottom: 5px;
                font-size: 13px;
                &:nth-child(1) {
                  font-size: 18px;
                  font-weight: 400;
                }
              }
            }
          }
          .site-item-btn {
            width: 100%;
            margin-top: 80px;
            display: flex;
            .site-item-btns {
            	  padding: 30px 0 30px 0;
              height: 100%;
              width: 50%;
              transition: .5s ease all;
              display: flex;
              justify-content: center;
              align-items: center;
              &:hover{
              	transform: translateY(-3px);
              	box-shadow: 0 0 8px #cbe0f9;
              }
            }
            .site_button{
            	  display: flex;
            	  flex-direction: column;
            	  align-items: center;
            	  cursor: pointer;
            	  font-size: 14px;
            	  .site_ico{
            	  	width: 52px;
            	  	height: 52px;
            	  	padding-bottom: 5px;
            	  }
            }
          }
        }
      }
    }
  }
</style>