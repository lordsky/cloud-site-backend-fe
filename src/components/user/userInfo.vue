<template>
  <div class="userInfo">
    <div class="userInfo-head">
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" @click="goBack">返回</el-button>
    </div>
    <div class="userInfo-box">
      <p class="userInfo-title">基本信息</p>
      <div class="resetassword">
        <el-button type="text" ></el-button>
      </div>
      <div class="userInfo-table">
        <table border="1" cellspacing="0" cellpadding="0">
          <tr>
            <td class="gray">头像</td>
            <td><img :src="userInfo.avatar" alt="" class="grayIco"/></td>
            <td class="gray">手机号</td>
            <td>{{userInfo.account}}</td>
          </tr>
          <tr>
            <td class="gray">用户昵称</td>
            <td>{{userInfo.nickname}}</td>
            <td class="gray">注册时间</td>
            <td>{{userInfo.starTime}}</td>
          </tr>
          <tr>
            <td class="gray">用户名称</td>
            <td>{{userInfo.username}}</td>
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
            <td>{{userInfo.name}}</td>
            <td class="gray">联系电话</td>
            <td>{{userInfo.companyAccount}}</td>
          </tr>
          <tr>
            <td class="gray">所在行业</td>
            <td>{{userInfo.industry}}</td>
            <td class="gray">邮箱</td>
            <td>{{userInfo.email}}</td>
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
        	  <div style="clear: both;"></div>
          <div class="site-item" v-for="item in siteList">
            <div class="site-item-title">
              <div class="site-item-title-text">
                <p>{{item.siteName}}</p>
                <p>状态：{{item.status==0?'未发布':item.status==1?'已发布':'已禁用'}}</p>
                <p>{{item.siteDomain}}</p>
              </div>
            </div>
            <div class="site-item-btn">
              <div class="site-item-btns">
                 <div class="site_button" @click="lookSite(item.siteDomain)">
                 	<img src="../../assets/img/ic_cms_view.png" alt="" class="site_ico"/>
                 	<p>查看</p>
                 </div>
              </div>
              <div class="site-item-btns">
                <div class="site_button" @click="disableSite(item)">
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
    <el-button type="primary" @click="resetPassword" size="small">确 定</el-button>
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
         userInfo:{},
         siteList:[],
         list:{}
      }
    },
    methods: {
    	//返回上一页
      goBack() {
        this.$router.push({path:'/userData'})
      },
      
      //重置密码
      resetPass(){
      	this.diaShow = true
      	this.dialogText = '确定要重置密码吗？'
      },
      //重置密码请求
      resetPassword(){
      	
      },
      //禁用站点
      disableSite(val){
      	this.$confirm('是否禁用站点?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	   this.$http.post(this.$API.siteDetails+'?userTemplateId='+val.id,{
	      	},response=>{
	      		response.data.code==200?(this.getUserList(),this.$message({type:'success',message:'禁用成功'})):''
	      	})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      	
      },
      //查看站点
      lookSite(val){
      	val?window.open("http://"+val):''
      },
      //获取站点信息
      getSite(){
      },
      //获取用户信息
      getUserList(){
      	this.$http.post(this.$API.userDetails+'?userId='+this.list.id,{
      	},(response)=>{
      		if(response.data.code==200){
      			this.userInfo = response.data.data
      		    this.siteList = response.data.data.userDomianDOS
      		}
      	})
      }
    },
    created(){
    	    this.list = this.$route.params.data
    	    this.getUserList()
    	    this.getSite()
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
        .site-item {
          width: 32%;
          height: auto;
          float: left;
          margin-right: 10px;
          margin-top: 30px;
          border:#f2f2f2 solid 1px;
          box-shadow: 0 0 8px #cbe0f9;
          .site-item-title {
            .site-item-title-text {
              margin: 20px 20px 0 20px;
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