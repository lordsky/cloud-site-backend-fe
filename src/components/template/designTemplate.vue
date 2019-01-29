<template>
  <div class="addTemplate">
    <p>新增模版</p>
    <div class="design-template">
      <p>③设计模版</p>
    </div>
    <div class="topside">
      <label>顶部区</label>
      <div class="topside-right" :class="{'side-right-border':topDate.length == 0}">
        <div class="topside-right-list"  @mousemove="showTop = true" @mouseleave="showTop=false">
          <el-button type="primary" v-if="topDate.length == 0">+添加组件</el-button>
          <img v-if="topDate.length != 0" src="@/assets/img/topside.png">
          <div v-if="topDate.length != 0" :class="{'delItem':showTop}">
            <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showTop}" @click="openManage(row,0)"></i>
            <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showTop}" @click="delComponent('top')"></i>
          </div>
        </div>
      </div>
    </div>
    <Banner @addComponent="addComponent" :typographyId="typographyId"></Banner>
    <Format @addComponent="addComponent" :typographyId="typographyId"></Format>
    <div class="footerside">
      <label>页脚区</label>
      <div class="footerside-right" :class="{'side-right-border':footerDate.length == 0}">
        <div class="footerside-right-list"  @mousemove="showFooter = true" @mouseleave="showFooter=false">
          <el-button type="primary" v-if="footerDate.length == 0" @click="addComponent">+添加组件</el-button>
          <img v-if="footerDate.length != 0" src="@/assets/img/topside.png">
          <div v-if="footerDate.length != 0" :class="{'delItem':showFooter}">
            <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFooter}"></i>
            <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFooter}"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="template-btn">
      <label></label>
      <el-button @click="back">上一步</el-button>
      <el-button type="primary" @click="saveTemplate" :loading="loading">保存</el-button>
    </div>
    <!--添加组件弹框-->
    <el-dialog :title="componTitle" :visible.sync="dialogVisible" width="340px">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="常用组件" name="used" class="com-tab-pane"><ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul></el-tab-pane>
        <el-tab-pane label="基础组件" name="basis" class="com-tab-pane">
          <ul>
            <li v-for="(x,i) in basisList" :key="i" @click="openManage(x,i)">
              <div>
              <div><i class="compon-edit-ico" :class="x.icon"></i></div>
              <div>{{x.name}}</div>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="其他组件" name="other" class="com-tab-pane"><ul>
          <li></li>
          <li></li>
        </ul></el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!--添加组件弹框-->
    <!--组件模版弹框-->
    <el-dialog :title="manageComponTitle" :visible.sync="dialogVisibleManage" width="80%" class="manage-dialog">
      <div class="compon-edit-list">
        <ul>
          <li v-for="(x,i) in 5" @click="btnType(i)" :class="{'active':activeShow==i}" :key="i">
          </li>
        </ul>
      </div>
      <div class="dialog-footer">
        <div @click="cancelDialog">取消</div>
        <div @click="completeDialog">完成</div>
      </div>
    </el-dialog>
    <!--组件模版弹框-->
  </div>
</template>

<script>
  import Banner from './banner';//横幅区
  import Format from './format';//版式区
    export default {
        name: "designTemplate",
      data() {
          return {
            html1:'<div class="headTop"><div class="head-left"></div> <div class="head-right"><span class="head-user-ico"></span> <div class="el-dropdown"><span class="el-dropdown-link el-dropdown-selfdefine" aria-haspopup="list" aria-controls="dropdown-menu-1584" role="button" tabindex="0"><span class="head-right-user">用户名称</span> <i class="el-icon-arrow-down el-icon--right"></i></span> <ul class="el-dropdown-menu el-popper" id="dropdown-menu-1584" style="display: none;"><button type="button" class="el-button el-button--text" style="padding: 5px 30px;"><!----><!----><span>退出登录</span></button></ul></div></div> <div class="el-dialog__wrapper" style="display: none;"><div role="dialog" aria-modal="true" aria-label="退出" class="el-dialog" style="margin-top: 15vh;"><div class="el-dialog__header"><span class="el-dialog__title">退出</span><button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button></div><!----><div class="el-dialog__footer"><span class="dialog-footer"><button type="button" class="el-button el-button--default"><!----><!----><span>取 消</span></button> <button type="button" class="el-button el-button--primary"><!----><!----><span>确 定</span></button></span></div></div></div></div>',
            html2:'<div class="headTop"><div class="head-left"></div> <div class="head-right"><span class="head-user-ico"></span> <div class="el-dropdown"><span class="el-dropdown-link el-dropdown-selfdefine" aria-haspopup="list" aria-controls="dropdown-menu-1584" role="button" tabindex="0"><span class="head-right-user">用户名称</span> <i class="el-icon-arrow-down el-icon--right"></i></span> <ul class="el-dropdown-menu el-popper" id="dropdown-menu-1584" style="display: none;"><button type="button" class="el-button el-button--text" style="padding: 5px 30px;"><!----><!----><span>退出登录</span></button></ul></div></div> <div class="el-dialog__wrapper" style="display: none;"><div role="dialog" aria-modal="true" aria-label="退出" class="el-dialog" style="margin-top: 15vh;"><div class="el-dialog__header"><span class="el-dialog__title">退出</span><button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button></div><!----><div class="el-dialog__footer"><span class="dialog-footer"><button type="button" class="el-button el-button--default"><!----><!----><span>取 消</span></button> <button type="button" class="el-button el-button--primary"><!----><!----><span>确 定</span></button></span></div></div></div></div>',
            row:{
              name:'导航'
            },
            topDate:[{
              url:'111'
            }],
            template:{},
            loading:false,
            activeShow:'',
            delShow:null,
            bannnerDate:[],
            formatDate:[],
            footerDate:[],
            showTop:false,
            showBanner:false,
            showFormat:false,
            showFooter:false,
            dialogVisible: false,
            dialogVisibleManage:false,
            componTitle: '',
            manageComponTitle:'',
            activeName:'basis',
            typographyId:null,
            basisList:[{
              id:1,
              name: '导航',
              icon: 'el-icon-news',
            },{
              id:2,
              name: '内容',
              icon: 'el-icon-tickets',
            },{
              id:3,
              name: '轮播条',
              icon: 'el-icon-picture',
            },{
              id:4,
              name: '作品案例',
              icon: 'el-icon-document',
            }],
            form: {
              top: '',
              banner: '',
              format: '',
              footer: ''
            }
          }
      },
      components: {
        Banner,
        Format
      },
      methods:{
        //选择模版
        btnType(i){
          this.activeShow = i
        },
        //关闭选择模版弹框
        cancelDialog(){
          this.dialogVisibleManage = false
        },
        //完成选择模版
        completeDialog(){
          this.dialogVisibleManage = false
          this.dialogVisible = false
        },
        saveTemplate(){
          this.loading = true;
          setTimeout(() => {
            this.$router.push({
              path:'/templateEditor'
            })
          }, 500);
        },
        //删除组件
        delComponent(type) {
          switch(type) {
            case 'top':
              console.log('顶部区')
              break;
            case 'banner':
              console.log('横幅区')
               this.html1 = Banner.data().html1
              break;
            case 'format':
              this.html2 = ''
              console.log('版式区')
              break;
            case 'footer':
              console.log('页脚区')
              break;
          }
        },
        addComponent(){
          this.dialogVisible = true
          this.activeName = 'basis'
          this.componTitle = '添加组件'
        },
        openManage(row,i){
          if(i==0){
            this.dialogVisibleManage = true
            this.manageComponTitle = row.name
          }
        },
        handleClick(tab, event) {
          console.log(tab, event);
        },
        back(){
          this.$router.go(-1)
        }
      },
      mounted() {
          this.typographyId = this.$route.query.template.typographyId
      }
    }
</script>

<style lang="scss" scoped>
  .addTemplate{
    p {
      margin: 10px 0 10px 0;
      font-weight: 600;
      font-size: 20px;
    }
    .design-template{
      margin-top: 40px;
      p{
        font-size: 18px;
        font-weight: 600;
        border-bottom: 1px solid #000000;
        padding-bottom: 10px;
      }
    }
    .topside{
      display: flex;
      margin-top: 20px;
      font-size: 18px;
      font-weight: 600;
      align-items: center;
      label{
        width: 80px;
      }
      .topside-right{
        width: 90%;
        .topside-right-list{
          position: relative;
          height: 60px;
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        img{
          width: 100%;
          border: 1px solid #cccccc;
        }
        .compon-edit-ico {
          display: none;
          font-size: 30px;
          color: #ffffff;
          margin-right: 30px;
          cursor: pointer;
        }
        .icoShow {
          display: block;
        }
      }
    }
    .footerside{
      display: flex;
      margin-top: 20px;
      font-size: 18px;
      font-weight: 600;
      align-items: center;
      label{
        width: 80px;
      }
      .footerside-right{
        width: 90%;
        .footerside-right-list{
          position: relative;
          height: 82px;
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        img{
          width: 100%;
          border: 1px solid #cccccc;
        }
        .compon-edit-ico {
          display: none;
          font-size: 30px;
          color: #ffffff;
          margin-right: 30px;
          cursor: pointer;
        }
        .icoShow {
          display: block;
        }
      }
    }
    .side-right-border{
      border: 2px #4d78ff dashed;
    }
    .delItem {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .template-btn{
      display: flex;
      margin: 20px auto;
      justify-content: center;
      label{
        width: 80px;
      }
      .el-button{
        width: 100px;
        margin: 0 30px;
      }
    }
    .com-tab-pane{
      width: 100%;
      display: flex;
      ul{
        width: 95%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        li{
          width: 70px;
          height: 70px;
          border: 1px #cccccc solid;
          list-style: none;
          margin: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          &:hover{
            border: 1px #4d78ff solid;
          }
          div{
            text-align: center;
          }
          .compon-edit-ico{
            font-size: 30px;
          }
        }
      }
    }
    .compon-edit-list {
      margin: 10px 0 10px 0;
      height: 400px;
      overflow-y: auto;
      padding-bottom: 45px;
      ul {
        width: 95%;
        margin: 0 auto;
        li {
          height: 65px;
          border: 1px #cccccc solid;
          list-style: none;
          margin: 10px 0 10px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          &:hover{
            border: 1px #4d78ff solid;
          }
        }
        .active{
          border: 1px #4d78ff solid;
        }
      }
    }
    .manage-dialog{
      .dialog-footer{
        width: 100%;
        height: 45px;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        background-color: #e6e7e7;
        box-shadow: 0 -2px 3px #676767;
        div{
          height: 45px;
          line-height: 45px;
          flex: 1;
          text-align: center;
          border-right: 1px solid #ffffff;
          cursor: pointer;
        }
      }
    }
  }
</style>
<style lang="scss">
  .addTemplate{
    .manage-dialog{
      .el-dialog__header{
        padding: 20px;
        border-bottom: 1px solid #c3c3c3;
      }
      .el-dialog__body{
        padding: 0 10px 10px 10px;
      }
    }
    .el-dialog__body{
      padding: 10px;
    }
    .el-tabs--border-card>.el-tabs__header{
      display: flex;
      justify-content: center;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
      background-color: transparent;
      border-right-color: transparent;
      border-left-color: transparent;
      border-bottom-color: #409EFF;
    }
    .el-tabs--border-card>.el-tabs__content{
      height: 280px;
      overflow-y: auto;
    }
  }
</style>
