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
            <!--<div class="navigation_info"><i class="el-icon-menu el-icon&#45;&#45;left"></i>网站风格<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></div>-->
            <!--<div class="navigation_info"><i class="el-icon-setting el-icon&#45;&#45;left"></i>网站设置<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></div>-->
            </div>
          </el-col>
          <el-col :span="10">
            <div class="header-right" id="aa">
              <span @click="saveWeb">保存</span>
              <span @click="preview">预览</span>
              <span @click="dialogVisible4=true">退出</span>
            </div>
          </el-col>
        </el-col>
        <el-col :span="24" class="main">
          <div class="main-info" v-if="webPageList.content == ''">
            <div class="add-btn">
              <div>请先添加一个页面</div>
              <div class="margin-top"><el-button type="primary" @click="dialogVisible3=true">+添加页面</el-button></div>
            </div>
          </div>
          <web-page v-show="webPageList.content != ''" :webPageList="webPageList"></web-page>
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
            <el-button type="primary" @click="dialogVisible3=true" style="z-index: 1">+添加新页面</el-button>
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
                  <li class="classify-item" @click="btnType(item,index)" :class="{'active':activeShow==index}" v-for="(item,index) of classifyList" :key="index">
                    {{item.catName}}
                    <el-icon class="el-icon-arrow-right fr"></el-icon>
                  </li>
                </ul>
              </div>
            </div>
            <div class="template-edit-list">
              <ul>
                <li v-for="(item,i) in pagetList" @mousemove="delShow = i" @mouseleave="delShow=null">
                  <!--<img :src="item.url">-->
                  <div v-html="item.pageCode">{{item.pageCode}}</div>
                  <div :class="{'delItem':delShow == i}">
                    <span class="template-edit-ico" :class="{'icoShow':delShow==i}" @click="selectPage(item)">选择</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-dialog>
        <!--添加页面弹框-->
        <!--退出弹框-->
        <el-dialog :visible.sync="dialogVisible4" width="340px" center>
          <div>是否保存您对套件的修改？</div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="notSave">不保存</el-button>
            <el-button type="primary" @click="saveWeb2">保存</el-button>
          </span>
        </el-dialog>
        <!--退出弹框-->
      </el-row>
    </div>
</template>

<script scoped>
  import '@/assets/js/jquery';
  import WebPage from './webPage'
  let id = 1;
  let pageNum = 1
    export default {
      name: "websiteEditor",
      data(){
        return{
          templateId:'',
          webPageAll:[],
          webPageList:{
            header: window.localStorage.getItem('suiteHeater'),
            footer: window.localStorage.getItem('suiteFooter'),
            content: '',
            // header:'<div style="width:100%;height:6.25vw;background:rgba(255,255,255,1);box-shadow:0px 2px 4px 0px rgba(0,0,0,0.05);display: flex;box-sizing: border-box;">\n' +
            //   '\t\t\t<div style="display: flex;width: 100%;">\n' +
            //   '\t\t\t<ul id="silder" style="display: flex;list-style: none;white-space: nowrap;padding: 0;;justify-content: center;align-items: center;width: 100%;margin: 0;">\n' +
            //   '\t\t\t</ul>\n' +
            //   '\t\t\t</div>\n' +
            //   '\t\t</div>',
            // footer:'<div style="width:100%;min-height: 15em;background:rgba(255,255,255,1);box-shadow:2px 0px 4px 2px rgba(0,0,0,0.05);display: flex;">\n' +
            //   '\t\t\t<div style="display: flex;width: 100%;">\n' +
            //   '\t\t\t\t<div style="margin-top: 5.8125vw;margin-left: 9.375vw;">\n' +
            //   '\t\t\t\t\t<div style="font-size:18px;font-family:AppleSystemUIFont;color:rgba(74,144,226,1);cursor: pointer">MUC</div>\n' +
            //   '\t\t\t\t\t<div style="margin-top: 3vw;font-size:14px;font-family:AppleSystemUIFont;color:rgba(157,175,189,1);white-space: nowrap;">\n' +
            //   '\t\t\t\t\t\t<div>Copyright &#169 CMCC</div>\n' +
            //   '\t\t\t\t\t\t<div>All rights reserved</div>\n' +
            //   '\t\t\t\t\t</div>\n' +
            //   '\t\t\t\t\t<div style="display: flex;margin-top: 1.5vw;">\n' +
            //   '\t\t\t\t\t\t<div style="width: 1.25em;height: 1.25em;border-radius: 50%;background-color: #9DAFBD;margin-right: 1vw;"></div>\n' +
            //   '\t\t\t\t\t\t<div style="width: 1.25em;height: 1.25em;border-radius: 50%;background-color: #9DAFBD;margin-right: 1vw;"></div>\n' +
            //   '\t\t\t\t\t\t<div style="width: 1.25em;height: 1.25em;border-radius: 50%;background-color: #9DAFBD;margin-right: 1vw;"></div>\n' +
            //   '\t\t\t\t\t\t<div style="width: 1.25em;height: 1.25em;border-radius: 50%;background-color: #9DAFBD;margin-right: 1vw;"></div>\n' +
            //   '\t\t\t\t\t\t<div style="width: 1.25em;height: 1.25em;border-radius: 50%;background-color: #9DAFBD;margin-right: 1vw;"></div>\n' +
            //   '\t\t\t\t\t</div>\n' +
            //   '\t\t\t\t</div>\n' +
            //   '\t\t\t\t<div style="margin: 5vw 0 5vw 10vw;">\n' +
            //   '\t\t\t\t\t<div style="font-size:14px;font-family:PingFangSC-Semibold;font-weight:600;color:rgba(157,175,189,1);">热门产品</div>\n' +
            //   '\t\t\t\t\t<ul style="list-style: none;margin: 0;padding: 0;margin-top: 1.8vw;white-space: nowrap;">\n' +
            //   '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">特色产品</li>\n' +
            //   '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">2B 产品</li>\n' +
            //   '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">2C 产品</li>\n' +
            //   '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">解决方案</li>\n' +
            //   '\t\t\t\t\t</ul>\n' +
            //   '\t\t\t\t</div>\n' +
            //   '\t\t\t\t<div style="margin: 5vw 0 5vw 14vw;">\n' +
            //   '\t\t\t\t\t<div style="font-size:14px;font-family:PingFangSC-Semibold;font-weight:600;color:rgba(157,175,189,1);">公司概况</div>\n' +
            //   '\t\t\t\t\t<ul style="list-style: none;margin: 0;padding: 0;margin-top: 1.8vw;white-space: nowrap;">\n' +
            //   '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">关于我们</li>\n' +
            //   '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">人员招聘</li>\n' +
            //   '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">行业观点</li>\n' +
            //   '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">联系我们</li>\n' +
            //   '\t\t\t\t\t</ul>\n' +
            //   '\t\t\t\t</div>\n' +
            //   '\t\t\t\t<div style="margin: 5vw 0 5vw 14vw;">\n' +
            //   '\t\t\t\t\t<div style="font-size:14px;font-family:PingFangSC-Semibold;font-weight:600;color:rgba(157,175,189,1);">服务支持</div>\n' +
            //   '\t\t\t\t\t<ul style="list-style: none;margin: 0;padding: 0;margin-top: 1.8vw;white-space: nowrap;">\n' +
            //   '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">客服中心</li>\n' +
            //   '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">在线帮助</li>\n' +
            //   '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">FAQ</li>\n' +
            //   '\t\t\t\t\t</ul>\n' +
            //   '\t\t\t\t</div>\n' +
            //   '\t\t\t</div>\n' +
            //   '\t\t</div>',
            // content:'<div style="width:100%;background:rgba(255,255,255,1);box-shadow:0px 2px 4px 0px rgba(0,0,0,0.05);padding: 5.1875vw 0;">\n' +
            //   '\t\t\t<div style="width:85%;font-size:54px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin: 0 auto;text-align: center;">产品特色</div>\n' +
            //   '\t\t\t<div style="width:34.6875vw;font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(157,175,189,1);margin: 0 auto;text-align: center;margin-top: .3vw;">对“大体验”设计相关需求，小到一个ico、banner设计，大到一套VI、UI视觉系统，改进我们的产品体验而努力…</div>\n' +
            //   '\t\t\t<div style="width: 100%;display: flex;align-items: center;justify-content: space-around;margin-top: 5.625vw;">\n' +
            //   '\t\t\t\t<div>\n' +
            //   '\t\t\t\t\t<div style="width:4.25vw;height:4.25vw;background:rgba(249,251,252,1);border-radius:4.25vw;border:1px solid rgba(157,175,189,1);text-align: center;margin: 0 auto;"></div>\n' +
            //   '\t\t\t\t\t<div style="width:14.5vw;font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);text-align: center;margin-top: 1.875vw;">设计需求管理</div>\n' +
            //   '\t\t\t\t\t<div style="width:14.5vw;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(157,175,189,1);text-align: center;margin-top: .5vw;overflow:hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;">归口到 MUC|移动用户体验中心 统一管理，统一协调设计资源展开设计、咨询、评审等工作</div>\n' +
            //   '\t\t\t\t</div>\n' +
            //   '\t\t\t\t<div>\n' +
            //   '\t\t\t\t\t<div style="width:4.25vw;height:4.25vw;background:rgba(249,251,252,1);border-radius:4.25vw;border:1px solid rgba(157,175,189,1);text-align: center;margin: 0 auto;"></div>\n' +
            //   '\t\t\t\t\t<div style="width:14.5vw;font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);text-align: center;margin-top: 1.875vw;">设计立项管理</div>\n' +
            //   '\t\t\t\t\t<div style="width:14.5vw;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(157,175,189,1);text-align: center;margin-top: .5vw;overflow:hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;">全部产品设计相关需求立项工作：由统筹整体资源，统一立项并进行设计项目管理</div>\n' +
            //   '\t\t\t\t</div>\n' +
            //   '\t\t\t\t<div>\n' +
            //   '\t\t\t\t\t<div style="width:4.25vw;height:4.25vw;background:rgba(249,251,252,1);border-radius:4.25vw;border:1px solid rgba(157,175,189,1);text-align: center;margin: 0 auto;"></div>\n' +
            //   '\t\t\t\t\t<div style="width:14.5vw;font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);text-align: center;margin-top: 1.875vw;">设计质量把控</div>\n' +
            //   '\t\t\t\t\t<div style="width:14.5vw;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(157,175,189,1);text-align: center;margin-top: .5vw;overflow:hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;">全部产品的“宣传材料”、“UI/UE界面”相关的环节必须由MUC|移动用户体验中心统一质量把控、设计评审</div>\n' +
            //   '\t\t\t\t</div>\n' +
            //   '\t\t\t\t<div>\n' +
            //   '\t\t\t\t\t<div style="width:4.25vw;height:4.25vw;background:rgba(249,251,252,1);border-radius:4.25vw;border:1px solid rgba(157,175,189,1);text-align: center;margin: 0 auto;"></div>\n' +
            //   '\t\t\t\t\t<div style="width:14.5vw;font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);text-align: center;margin-top: 1.875vw;">设计跟进监督</div>\n' +
            //   '\t\t\t\t\t<div style="width:14.5vw;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(157,175,189,1);text-align: center;margin-top: .5vw;overflow:hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;">发布《产品体验设计指数报告》等形式对各产品线设计质量监管，更好改进“大体验”设计来提升品牌价值</div>\n' +
            //   '\t\t\t\t</div>\n' +
            //   '\t\t\t</div>\n' +
            //   '\t\t</div>' +
            //   '<div style="width:100%;background:rgba(255,255,255,1);box-shadow:0px 2px 4px 0px rgba(0,0,0,0.05);padding: 5.1875vw 0;margin-top: 10px;">\n' +
            //   '\t\t\t<div style="width:85%;font-size:54px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin: 0 auto;text-align: center;margin-top: 5.1875vw;;">产品特色</div>\n' +
            //   '\t\t\t<div style="width:34.6875vw;font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(157,175,189,1);margin: 0 auto;text-align: center;margin-top: 5px;">对“大体验”设计相关需求，小到一个ico、banner设计，大到一套VI、UI视觉系统，改进我们的产品体验而努力…</div>\n' +
            //   '\t\t\t<div style="width: 100%;display: flex;align-items: center;justify-content: center;margin-top: 5.625vw;">\n' +
            //   '\t\t\t\t<div style="width:22.5625vw;height:18.75vw;background:rgba(238,242,244,1);border-radius:5px;margin-right: 1.875vw;text-align: center;">\n' +
            //   '\t\t\t\t\t<div style="width:14.5vw;font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);text-align: center;margin-top: 1.875vw;margin: 6.75vw auto 0 auto;">设计需求管理</div>\n' +
            //   '\t\t\t\t\t<div style="width:14.5vw;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(157,175,189,1);text-align: center;margin-top: .5vw;overflow:hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;margin: .5vw auto 0 auto;">对“大体验”设计相关需求，包括视觉设计、体验设计、工业设计，改进我们的产品体验而努力</div>\n' +
            //   '\t\t\t\t</div>\n' +
            //   '\t\t\t\t<div style="width:22.5625vw;height:18.75vw;background:rgba(209,219,227,1);border-radius:5px;margin-right: 1.875vw;"></div>\n' +
            //   '\t\t\t\t<div style="width:22.5625vw;height:18.75vw;background:rgba(209,219,227,1);border-radius:5px;"></div>\n' +
            //   '\t\t\t</div>\n' +
            //   '\t\t</div>',
          },
          formCompon: {
            name: ''
          },
          pageName:'',//存放初始页面名
          delShow: null,
          activeShow:'',
          dialogVisible:false,//页面管理弹框
          dialogVisible2:false,//修改导航标题弹框
          dialogVisible3:false,//添加新页面弹框
          dialogVisible4:false,//退出弹框
          savePage:false,//是否已经保存
          data1: [
            // {
            //   id: 1,
            //   label: '一级 1',
            // }
            ],
          classifyList: [],
          pagetList:[
            // {url: require('../../assets/img/template3.png')},
            // {url: require('../../assets/img/template.png')},
            // {url: require('../../assets/img/template3.png')},
            // {url: require('../../assets/img/template3.png')}
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
        //保存页头
        saveHeaderPage : async function(){
          this.$api.apiAddTemplateComponent({
            componentCat: 1,
            componentCode: this.webPageList.header,
            templateId:this.templateId,
          }).then(res => {
            console.log(res)
            if(res.code === 200) {
            } else {
              this.$message.error(res.msg)
            }
          })
        },
        //保存页脚
        saveFooterPage : async function(){
          this.$api.apiAddTemplateComponent({
            componentCat: 2,
            componentCode: this.webPageList.footer,
            templateId:this.templateId,
          }).then(res => {
            console.log(res)
            if(res.code === 200) {
            } else {
              this.$message.error(res.msg)
            }
          })
        },
        //保存页面
        saveWeb(){
          let headerHtml = $('#headerHtml').html()
          this.webPageList.header = headerHtml
          if(this.webPageAll.length == 0){
            this.$message({
              message: '请先添加页面',
              type: 'warning'
            });
            return false
          }
          //上次页头代码
          this.saveHeaderPage()
          //上传页脚代码
          this.saveFooterPage()
          //上传内容代码
          for(let i=0;i<this.webPageAll.length;i++){
            this.$api.apiAddTemplatePage({
              pageName: this.webPageAll[i].pageName,
              templateId: this.templateId,
              pageCode:this.webPageList.header + this.webPageAll[i].pageCode + this.webPageList.footer,
              pageAlias:''
            }).then(res => {
              console.log(res)
              if(res.code === 200) {
                if(i<this.webPageAll.length){
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                  this.savePage = true //已保存
                }
              } else {
                this.$message.error(res.msg)
              }

            })
          }
          return true
        },
        //切换不同分类页面列表
        btnType(data,index){
          this.activeShow = index;
          this.pageName = data.catName
          this.getPageList(data.id)
        },
        //点击切换页面
        handleNodeClick(data,node) {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          if(index != -1){
            this.webPageList.content = this.webPageAll[index].pageCode
          }
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
        //重命名导航名
        editorTitle(){
          this.dialogVisible2=false
          const parent = this.node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === this.data2.id);
          children[index].label = this.formCompon.name
          $("#silder li").eq(index).html(this.formCompon.name);
        },
        //删除导航和页面
        remove(node, data) {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
          this.webPageAll.splice(index,1)
          this.webPageList.content = this.webPageAll[0].pageCode
          $("#"+data.id).remove()
        },
        addPage(){
          this.dialogVisible3=false
        },
        notSave(){
          this.$router.push({
            path:'/suiteClassification'
          })
        },
        saveWeb2(){
          if(this.savePage == false){
            this.saveWeb()
            if(this.saveWeb() != false){
              pageNum = 1
              this.$router.push({
                path:'/suiteClassification'
              })
            }
          }else{
            pageNum = 1
            this.$router.push({
              path:'/suiteClassification'
            })
          }
        },
        //预览
        preview(){
          let headerHtml = $('#headerHtml').html()
          this.webPageList.header = headerHtml
          let segment = {
            header:this.webPageList.header,
            content:this.webPageList.content,
            footer:this.webPageList.footer
          }
          //window.open('/#/preview','_blank')
          window.localStorage.setItem('saveHeader',this.webPageList.header)
          window.localStorage.setItem('saveContent',this.webPageList.content)
          window.localStorage.setItem('saveFooter',this.webPageList.footer)
          let routeData = this.$router.resolve({
            path:'/preview'
          })
          window.open(routeData.href, '_blank');
        },
        //选择页面
        selectPage(data){
          // if(pageNum == 1){
          //   this.webPageList.header = '<div style="width:100%;height:6.25vw;background:rgba(255,255,255,1);box-shadow:0px 2px 4px 0px rgba(0,0,0,0.05);display: flex;box-sizing: border-box;">\n' +
          //     '\t\t\t<div style="display: flex;width: 100%;">\n' +
          //     '\t\t\t<ul id="silder" style="display: flex;list-style: none;white-space: nowrap;padding: 0;;justify-content: center;align-items: center;width: 100%;margin: 0;">\n' +
          //     '\t\t\t</ul>\n' +
          //     '\t\t\t</div>\n' +
          //     '\t\t</div>';
          //   this.webPageList.footer = '<div style="width:100%;min-height: 15em;background:rgba(255,255,255,1);box-shadow:2px 0px 4px 2px rgba(0,0,0,0.05);display: flex;">\n' +
          //     '\t\t\t<div style="display: flex;width: 100%;">\n' +
          //     '\t\t\t\t<div style="margin-top: 5.8125vw;margin-left: 9.375vw;">\n' +
          //     '\t\t\t\t\t<div style="font-size:18px;font-family:AppleSystemUIFont;color:rgba(74,144,226,1);cursor: pointer">MUC</div>\n' +
          //     '\t\t\t\t\t<div style="margin-top: 3vw;font-size:14px;font-family:AppleSystemUIFont;color:rgba(157,175,189,1);white-space: nowrap;">\n' +
          //     '\t\t\t\t\t\t<div>Copyright &#169 CMCC</div>\n' +
          //     '\t\t\t\t\t\t<div>All rights reserved</div>\n' +
          //     '\t\t\t\t\t</div>\n' +
          //     '\t\t\t\t\t<div style="display: flex;margin-top: 1.5vw;">\n' +
          //     '\t\t\t\t\t\t<div style="width: 1.25em;height: 1.25em;border-radius: 50%;background-color: #9DAFBD;margin-right: 1vw;"></div>\n' +
          //     '\t\t\t\t\t\t<div style="width: 1.25em;height: 1.25em;border-radius: 50%;background-color: #9DAFBD;margin-right: 1vw;"></div>\n' +
          //     '\t\t\t\t\t\t<div style="width: 1.25em;height: 1.25em;border-radius: 50%;background-color: #9DAFBD;margin-right: 1vw;"></div>\n' +
          //     '\t\t\t\t\t\t<div style="width: 1.25em;height: 1.25em;border-radius: 50%;background-color: #9DAFBD;margin-right: 1vw;"></div>\n' +
          //     '\t\t\t\t\t\t<div style="width: 1.25em;height: 1.25em;border-radius: 50%;background-color: #9DAFBD;margin-right: 1vw;"></div>\n' +
          //     '\t\t\t\t\t</div>\n' +
          //     '\t\t\t\t</div>\n' +
          //     '\t\t\t\t<div style="margin: 5vw 0 5vw 10vw;">\n' +
          //     '\t\t\t\t\t<div style="font-size:14px;font-family:PingFangSC-Semibold;font-weight:600;color:rgba(157,175,189,1);">热门产品</div>\n' +
          //     '\t\t\t\t\t<ul style="list-style: none;margin: 0;padding: 0;margin-top: 1.8vw;white-space: nowrap;">\n' +
          //     '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">特色产品</li>\n' +
          //     '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">2B 产品</li>\n' +
          //     '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">2C 产品</li>\n' +
          //     '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">解决方案</li>\n' +
          //     '\t\t\t\t\t</ul>\n' +
          //     '\t\t\t\t</div>\n' +
          //     '\t\t\t\t<div style="margin: 5vw 0 5vw 14vw;">\n' +
          //     '\t\t\t\t\t<div style="font-size:14px;font-family:PingFangSC-Semibold;font-weight:600;color:rgba(157,175,189,1);">公司概况</div>\n' +
          //     '\t\t\t\t\t<ul style="list-style: none;margin: 0;padding: 0;margin-top: 1.8vw;white-space: nowrap;">\n' +
          //     '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">关于我们</li>\n' +
          //     '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">人员招聘</li>\n' +
          //     '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">行业观点</li>\n' +
          //     '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">联系我们</li>\n' +
          //     '\t\t\t\t\t</ul>\n' +
          //     '\t\t\t\t</div>\n' +
          //     '\t\t\t\t<div style="margin: 5vw 0 5vw 14vw;">\n' +
          //     '\t\t\t\t\t<div style="font-size:14px;font-family:PingFangSC-Semibold;font-weight:600;color:rgba(157,175,189,1);">服务支持</div>\n' +
          //     '\t\t\t\t\t<ul style="list-style: none;margin: 0;padding: 0;margin-top: 1.8vw;white-space: nowrap;">\n' +
          //     '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">客服中心</li>\n' +
          //     '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">在线帮助</li>\n' +
          //     '\t\t\t\t\t\t<li style="font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin-top: .7vw;">FAQ</li>\n' +
          //     '\t\t\t\t\t</ul>\n' +
          //     '\t\t\t\t</div>\n' +
          //     '\t\t\t</div>\n' +
          //     '\t\t</div>';
          //   pageNum++
          // }
          this.dialogVisible3=false
          this.webPageList.content = data.pageCode
          // this.webPageList.content = '<div style="width:100%;background:rgba(255,255,255,1);box-shadow:0px 2px 4px 0px rgba(0,0,0,0.05);padding: 5.1875vw 0;">\n' +
          //   '\t\t\t<div style="width:85%;font-size:54px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin: 0 auto;text-align: center;margin-top: 5.1875vw;;">产品特色</div>\n' +
          //   '\t\t\t<div style="width:34.6875vw;font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(157,175,189,1);margin: 0 auto;text-align: center;margin-top: 5px;">对“大体验”设计相关需求，小到一个ico、banner设计，大到一套VI、UI视觉系统，改进我们的产品体验而努力…</div>\n' +
          //   '\t\t\t<div style="width: 100%;display: flex;align-items: center;justify-content: center;margin-top: 5.625vw;">\n' +
          //   '\t\t\t\t<div style="width:22.5625vw;height:18.75vw;background:rgba(238,242,244,1);border-radius:5px;margin-right: 1.875vw;text-align: center;">\n' +
          //   '\t\t\t\t\t<div style="width:14.5vw;font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);text-align: center;margin-top: 1.875vw;margin: 6.75vw auto 0 auto;">设计需求管理</div>\n' +
          //   '\t\t\t\t\t<div style="width:14.5vw;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(157,175,189,1);text-align: center;margin-top: .5vw;overflow:hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;margin: .5vw auto 0 auto;">对“大体验”设计相关需求，包括视觉设计、体验设计、工业设计，改进我们的产品体验而努力</div>\n' +
          //   '\t\t\t\t</div>\n' +
          //   '\t\t\t\t<div style="width:22.5625vw;height:18.75vw;background:rgba(209,219,227,1);border-radius:5px;margin-right: 1.875vw;"></div>\n' +
          //   '\t\t\t\t<div style="width:22.5625vw;height:18.75vw;background:rgba(209,219,227,1);border-radius:5px;"></div>\n' +
          //   '\t\t\t</div>\n' +
          //   '\t\t</div>'
          const newChild = { id: id++, label: this.pageName, children: [] };
          // if (!this.data1.children) {
          //   this.$set(this.data1, '关于我们', []);
          // }
          this.data1.push(newChild);
          $('#silder').append('<li id="'+newChild.id+'" style="padding: 0 2vw;font-size:14px;font-weight:400;color:rgba(2,111,194,1);cursor: pointer">'+this.pageName+'</li>')
          //this.webPageAll.push(this.webPageList.content)
          this.webPageAll.push({
            pageName:this.pageName,
            templateId:this.templateId,
            pageCode:this.webPageList.content,
            pageAlias:''})
          console.log(this.webPageAll)
        },
        //获取模版分类列表
        getComponList() {
          console.log('获取列表')
          this.$api.apiCatType(2).then(res => {
            if(res.msg === "success") {
              this.classifyList = res.data
            } else {
              this.$message.error(res.msg)
            }
          })
        },
        //获取模板页面列表
        getPageList(val){
          this.$api.apiPageList(val).then(res => {
            if(res.msg === "success") {
              this.pagetList = res.data
            } else {
              this.$message.error(res.msg)
            }
          })
        },
      },
      mounted() {
        this.templateId = this.$route.query.data.templateId
        this.$api.apiCatType(2).then(res => {
          if(res.msg === "success") {
            this.classifyList = res.data
            this.pageName = this.classifyList[0].catName
            this.getPageList(this.classifyList[0].id)
          } else {
            this.$message.error(res.msg)
          }
        })
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
        white-space: nowrap;
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
          width: 25vw;;
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
          width: 100%;
          margin: 10px 0 10px 0;
          max-height: 550px;
          overflow-y: auto;
          ul {
            width: 95%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            /*justify-content: space-around;*/
            li {
              position: relative;
              width: 47%;
              height: 250px;
              border: 1px #cccccc solid;
              list-style: none;
              margin: 15px;
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
                z-index: 100;
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
