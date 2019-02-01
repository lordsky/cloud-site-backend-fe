<template>
    <div class="websiteEditor">
      <el-row>
        <el-col :span="24" class="header">
          <el-col :span="6">
            <div class="logo">LOGO</div>
          </el-col>
          <el-col :span="8">
            <div class="navigation">
            <div class="navigation_info" @click="dialogVisible=true"><i class="el-icon-document el-icon--left"></i>页面管理<i class="el-icon-arrow-down el-icon--right"></i></div>
            <div class="navigation_info"><i class="el-icon-menu el-icon--left"></i>网站风格<i class="el-icon-arrow-down el-icon--right"></i></div>
            <div class="navigation_info"><i class="el-icon-setting el-icon--left"></i>网站设置<i class="el-icon-arrow-down el-icon--right"></i></div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="header-right">
              <span>保存</span>
              <span>预览</span>
              <span>退出</span>
            </div>
          </el-col>
        </el-col>
        <el-col :span="24" class="main">
          <div class="main-info" v-if="webPageList.header == ''">
            <div class="add-btn">
              <div>请先添加一个页面</div>
              <div class="margin-top"><el-button type="primary" @click="dialogVisible3=true">+添加页面</el-button></div>
            </div>
          </div>
          <web-page :webPageList="webPageList"></web-page>
        </el-col>
        <!--页面管理弹框-->
        <div class="dialog" style="width: 340px;margin-top: 10vh;" v-if="dialogVisible==true">
          <div class="el-dialog__header">
            <span class="el-dialog__title">页面管理</span>
            <button type="button" class="el-dialog__headerbtn" @click="dialogVisible=false">
              <i class="el-dialog__close el-icon el-icon-close"></i></button>
          </div>
          <div class="el-dialog__body">
            <el-tree
              :data="data1"
              :props="defaultProps"
              @node-click="handleNodeClick"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <i class="el-icon-edit-outline ico-size" @click="() => editor(node, data)"></i>
                <i class="el-icon-delete ico-size" @click="() => remove(node, data)" v-if="data1.length>1"></i>
              </span>
            </span>
            </el-tree>
          </div>
          <span class="dialog-footer">
            <el-button type="primary" @click="dialogVisible3=true">+添加新页面</el-button>
          </span>
        </div>
        <!--页面管理弹框-->
        <!--修改标题弹框-->
        <el-dialog title="修改标题" :visible.sync="dialogVisible2" width="340px" center>
          <el-form :inline="true" :model="formCompon" class="demo-form-inline" ref="formCompon">
            <el-form-item label="导航标题:" prop="name" :rules="[{required: true, message: '导航标题不能为空'},{ max: 6, message: '不能超过6字符', trigger: 'blur' }]">
              <el-input v-model="formCompon.name"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editorTitle">确定</el-button>
          </span>
        </el-dialog>
        <!--修改标题弹框-->
        <!--添加页面弹框-->
        <el-dialog title="添加新页面" :visible.sync="dialogVisible3" width="95%" class="new-dialog">
          <div class="content-dialog">
            <div class="classify">
              <div class="classify-warp">
                <h3 class="classify-title">页面分类</h3>
                <ul class="classify-list">
                  <li class="classify-item" @click="btnType(index)" :class="{'active':activeShow==index}" v-for="(item,index) of classifyList" :key="index">
                    {{item.name}}
                    <el-icon class="el-icon-arrow-right fr"></el-icon>
                  </li>
                </ul>
              </div>
            </div>
            <div class="template-edit-list">
              <ul>
                <li v-for="(x,i) in selectVal" @mousemove="delShow = i" @mouseleave="delShow=null">
                  <img :src="x.url">
                  <div :class="{'delItem':delShow == i}">
                    <span class="template-edit-ico" :class="{'icoShow':delShow==i}" @click="dialogVisible3=false">选择</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-dialog>
        <!--添加页面弹框-->
      </el-row>
    </div>
</template>

<script>
  import WebPage from './webPage'
  let id = 1000;
    export default {
      name: "websiteEditor",
      data(){
        return{
          webPageList:{
            header:'<div class="headTop"><div class="head-left"></div> <div class="head-right"><span class="head-user-ico"></span> <div class="el-dropdown"><span class="el-dropdown-link el-dropdown-selfdefine" aria-haspopup="list" aria-controls="dropdown-menu-1584" role="button" tabindex="0"><span class="head-right-user">用户名称</span> <i class="el-icon-arrow-down el-icon--right"></i></span> <ul class="el-dropdown-menu el-popper" id="dropdown-menu-1584" style="display: none;"><button type="button" class="el-button el-button--text" style="padding: 5px 30px;"><!----><!----><span>退出登录</span></button></ul></div></div> <div class="el-dialog__wrapper" style="display: none;"><div role="dialog" aria-modal="true" aria-label="退出" class="el-dialog" style="margin-top: 15vh;"><div class="el-dialog__header"><span class="el-dialog__title">退出</span><button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button></div><!----><div class="el-dialog__footer"><span class="dialog-footer"><button type="button" class="el-button el-button--default"><!----><!----><span>取 消</span></button> <button type="button" class="el-button el-button--primary"><!----><!----><span>确 定</span></button></span></div></div></div></div>',
            footer:'<div></div>',
            content:'<div></div>',
          },
          formCompon: {
            name: ''
          },
          delShow: null,
          activeShow:'',
          dialogVisible:false,//页面管理弹框
          dialogVisible2:false,//修改导航标题弹框
          dialogVisible3:false,//添加新页面弹框
          data1: [{
            id: 1,
            label: '一级 1',
          }, {
            id: 2,
            label: '一级 2',
          }, {
            id: 3,
            label: '一级 3',
          }],
          classifyList: [
            {
              name: "关于我们"
            },
            {
              name: "联系我们"
            },
            {
              name: "专题活动"
            },
            {
              name: "新闻咨询"
            },
            {
              name: "产品展示"
            },
            {
              name: "摄影作品"
            },
            {
              name: "招聘信息"
            }
          ],
          selectVal:[
            {url: require('../../assets/img/template3.png')},
            {url: require('../../assets/img/template.png')},
            {url: require('../../assets/img/template3.png')},
            {url: require('../../assets/img/template3.png')}
          ],
          data2:[],
          node:[],
          defaultProps: {
            children: 'children',
            label: 'label'
          }
        }
      },
      components:{
        WebPage
      },
      methods:{
        btnType(index){
          this.activeShow = index;
        },
        handleNodeClick(data) {
          console.log(data);
        },
        append(data) {
          const newChild = { id: id++, label: '关于我们', children: [] };
          if (!data.children) {
            this.$set(data, 'children', []);
          }
          data.children.push(newChild);
        },
        editor(node, data) {
          this.data2 = data
          this.node = node
          console.log(data)
          this.dialogVisible2=true
          this.formCompon.name = node.label
        },
        editorTitle(){
          this.dialogVisible2=false
          const parent = this.node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === this.data2.id);
          children[index].label = this.formCompon.name
        },
        remove(node, data) {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
        },
        addPage(){
          this.dialogVisible3=false
        }
      }
    }
</script>

<style lang="scss">
  .websiteEditor{
    position: absolute;
    top: 40px;
    bottom: 0px;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      background: linear-gradient(to right, #406cf1 , #3b92f9);
      color: #fff;
      .logo{
        padding-left: 50px;
      }
      .navigation{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        .navigation_info{
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .el-icon--left{
          font-size: 20px;
        }
      }
      .header-right{
        text-align: right;
        span{
          padding-right: 20px;
          cursor: pointer;
          &:last-child{
            margin-left: 30px;
          }
        }
      }
    }
    .main {
      .main-info{
        display: flex;
        position: relative;
        top: 0px;
        bottom: 0px;
        align-items: center;
        justify-content: center;
        height: 100vh;
        .add-btn{
          text-align: center;
          .margin-top{
            margin-top: 20px;
          }
        }
      }
    }
    .dialog{
      position: absolute;
      margin: 0 auto 50px;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0,0,0,.3);
      box-sizing: border-box;
      width: 50%;
      background-color: #fff;
      .el-dialog__body{
        padding: 0 20px;
        .custom-tree-node {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          padding-right: 8px;
        }
        .ico-size{
          font-size: 20px;
        }
      }
      .dialog-footer{
        padding: 20px;
        display: flex;
        justify-content: center;
      }
    }
    .new-dialog{
      .el-dialog__header{
        border-bottom: 1px solid #000;
      }
      .content-dialog {
        display: flex;
        width: 100%;
        .classify {
          width: 60%;
          margin-right: 20px;
          .classify-warp {
            margin-top: 30px;
            margin-left: 8px;
            margin-right: 8px;
            .classify-title {
              font-size: 20px;
              color: #1e1e1e;
            }
            .classify-list {
              font-size: 14px;
              list-style: none;
              .classify-item {
                margin-top: 20px;
                color: #1e1e1e;
                cursor: pointer;
                &:hover {
                  color: #3d89f8;
                }
              }
              .active{
                color: #3d89f8;
              }
              .fr {
                float: right;
              }
            }
          }
        }
        .template-edit-list {
          margin: 10px 0 10px 0;
          max-height: 550px;
          overflow-y: auto;
          ul {
            width: 95%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li {
              position: relative;
              width: 49%;
              height: 250px;
              border: 1px #cccccc solid;
              list-style: none;
              margin: 10px 0 10px 0;
              display: flex;
              align-items: center;
              justify-content: space-evenly;
              box-shadow: 0 0 10px rgb(90, 88, 88);
              overflow: hidden;
              img{
                width: 100%;
                border: 1px solid #cccccc;
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
                justify-content: space-evenly;
              }
              .template-edit-ico {
                display: none;
                font-size: 30px;
                color: #ffffff;
                cursor: pointer;
              }
              .icoShow {
                display: block;
              }
            }
          }
        }
      }
    }
  }

</style>
