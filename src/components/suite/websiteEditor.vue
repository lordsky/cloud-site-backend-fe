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
              <!--<span @click="saveWeb(1)">保存</span>-->
              <!--<span @click="preview">预览</span>-->
              <span @click="exit">退出</span>
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
        <div class="dialog" style="width: 340px;margin-top: 10vh;z-index: 600" v-if="dialogVisible==true">
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
              accordion
              :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span v-show="data.children && data.children.length >= 1">
                  <span>{{node.label}}</span>
                </span>
                <span v-show="!data.children || data.children.length == 0">
                  <span>{{node.label}}</span>
                </span>
              <!--<span>{{ node.label }}</span>-->
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
              <div class="template-edit-list-div">
              <ul>
                <li v-if="i%2 == 0" v-for="(item,i) in pagetList" @mousemove="delShow = i" @mouseleave="delShow=null" :key="i">
                  <div v-if="item.thumb == ''" v-html="item.pageCode" style="height: 350px;">{{item.pageCode}}</div>
                  <img v-if="item.thumb != ''" :src="item.thumb">
                  <div class="delItem3">{{item.name}}</div>
                  <div :class="{'delItem':delShow == i}">
                    <span class="template-edit-ico" :class="{'icoShow':delShow==i}" @click="selectPage(item)">选择</span>
                  </div>
                </li>
              </ul>
              </div>
              <div class="template-edit-list-div">
                <ul>
                  <li v-if="i%2 != 0" v-for="(item,i) in pagetList" @mousemove="delShow = i" @mouseleave="delShow=null" :key="i">
                    <div v-if="item.thumb == ''" v-html="item.pageCode" style="height: 350px;">{{item.pageCode}}</div>
                    <img v-if="item.thumb != ''" :src="item.thumb">
                    <div class="delItem3">{{item.name}}</div>
                    <div :class="{'delItem':delShow == i}">
                      <span class="template-edit-ico" :class="{'icoShow':delShow==i}" @click="selectPage(item)">选择</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-dialog>
        <!--添加页面弹框-->
        <!--退出弹框-->
        <el-dialog :visible.sync="dialogVisible4" width="340px" center>
          <div>是否保存您对套件的修改？</div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="notSave">不保存</el-button>
            <el-button type="primary" @click="saveWeb2(2)">保存</el-button>
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
  let headerIndex = 0
  let pageIndex = 1
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
          // headerIndex:'',//导航下角标
          headerId:'',//新增页头返回id
          data1: [
            // {
            //   id: 1,
            //   label: '一级 1',
            // }
            ],
          classifyList: [],
          pagetList:[],
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
            componentCode: $('#headerHtml').html(),
            templateId:this.templateId,
            componentParent:0
          }).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.headerId = res.data
              //上传页脚代码
              this.saveFooterPage()
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
            componentParent:0
          }).then(res => {
            console.log(res)
            if(res.code === 200) {
              pageNum++
              this.$message({
                message: '添加成功',
                type: 'success'
              });
            } else {
              this.$message.error(res.msg)
            }
          })
        },
        updateHeaderPage : async function(){
          this.$api.apiUpdateTemplateComponent({
            componentCode: $('#headerHtml').html(),
            id: this.headerId,
          }).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            } else {
              this.$message.error(res.msg)
            }
          })
        },
        //保存页面
        saveWeb(index){
          // let headerHtml = $('#headerHtml').html()
          // this.webPageList.header = headerHtml
          if(this.webPageAll.length == 0){
            this.$message({
              message: '请先添加页面',
              type: 'warning'
            });
            return false
          }else{
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.savePage = true //已保存
          }
          // //上次页头代码
          // this.saveHeaderPage()
          // //上传页脚代码
          // this.saveFooterPage()
          //上传内容代码
          // for(let i=0;i<this.webPageAll.length;i++){
          //   this.$api.apiAddTemplatePage({
          //     pageName: this.webPageAll[i].pageName,
          //     templateId: this.templateId,
          //     pageCode:this.webPageList.header + this.webPageAll[i].pageCode + this.webPageList.footer,
          //     pageAlias:''
          //   }).then(res => {
          //     console.log(res)
          //     if(res.code === 200) {
          //       if(i<this.webPageAll.length){
          //         this.$message({
          //           message: '保存成功',
          //           type: 'success'
          //         });
          //         this.savePage = true //已保存
          //         if(index == 2){
          //           this.$router.push({
          //             path:'/suiteClassification'
          //           })
          //         }
          //       }
          //     } else {
          //       this.$message.error(res.msg)
          //     }
          //
          //   })
          // }
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
            this.headerIndex = index
            this.webPageList.content = this.webPageAll[index].pageCode
          }
        },
        exit(){
          this.$router.push({
            path:'/suiteClassification'
          })
          // if(this.savePage  == true){
          //   this.$router.push({
          //     path:'/suiteClassification'
          //   })
          // }else {
          //   this.dialogVisible4 = true
          // }
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
          this.$refs.formCompon.validate((valid) => {
            if (valid) {
              const parent = this.node.parent;
              const children = parent.data.children || parent.data;
              const index = children.findIndex(d => d.id === this.data2.id);
              this.$api.apiUpdateTemplatePage({
                pageName: this.formCompon.name,
                id: this.data2.id,
              }).then(res => {
                console.log(res)
                if(res.code === 200) {
                  this.dialogVisible2=false
                  children[index].label = this.formCompon.name
                  this.webPageAll[index].pageName = this.formCompon.name
                  $("#silder li").eq(index).html(this.formCompon.name);
                  // let headerHtml = $('#headerHtml').html()
                  // this.webPageList.header = $('#headerHtml').html()
                  this.$api.apiUpdateTemplateComponent({
                    componentCode: $('#headerHtml').html(),
                    id: this.headerId,
                  }).then(res => {
                    console.log(res)
                    if(res.code === 200) {
                      this.$message({
                        message: '修改成功',
                        type: 'success'
                      });
                    } else {
                      this.$message.error(res.msg)
                    }
                  })
                } else {
                  this.$message.error(res.msg)
                }
              })
            }
          });
        },
        //删除导航和页面
        remove(node, data) {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          this.$api.apiDelTemplatePage(data.id).then(res => {
            if(res.msg === "success") {
              children.splice(index, 1);
              this.webPageAll.splice(index,1)
              this.webPageList.content = this.webPageAll[0].pageCode
              $("#"+data.id).remove()
              this.$api.apiUpdateTemplateComponent({
                componentCode: $('#headerHtml').html(),
                id: this.headerId,
              }).then(res => {
                console.log(res)
                if(res.code === 200) {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                } else {
                  this.$message.error(res.msg)
                }
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        },
        addPage(){
          this.dialogVisible3=false
        },
        notSave(){
          this.$router.push({
            path:'/suiteClassification'
          })
        },
        saveWeb2(index){
          this.saveWeb(index)
        },
        //预览
        // preview(){
        //   let headerHtml = $('#headerHtml').html()
        //   this.webPageList.header = headerHtml
        //   let segment = {
        //     header:this.webPageList.header,
        //     content:this.webPageList.content,
        //     footer:this.webPageList.footer
        //   }
        //   window.localStorage.setItem('saveHeader',this.webPageList.header)
        //   window.localStorage.setItem('saveContent',this.webPageList.content)
        //   window.localStorage.setItem('saveFooter',this.webPageList.footer)
        //   window.open('/#/preview','_blank')
        //   let routeData = this.$router.resolve({
        //     path:'/preview'
        //   })
        //   // window.open(routeData.href, '_blank');
        // },
        //选择页面
        selectPage(data){
          this.dialogVisible3=false
          this.webPageList.content = data.pageCode
          //this.webPageAll.push(this.webPageList.content)
          for(let i=0;i<this.webPageAll.length;i++){
            if(this.webPageAll[i].pageAlias == data.catExt){
              data.catExt = data.catExt + '-' + pageIndex
              pageIndex++
            }
          }
          this.webPageAll.push({
            pageName:data.name,
            templateId:this.templateId,
            pageCode:this.webPageList.content,
            pageAlias:data.catExt,
            pageParent:0,})
          this.$api.apiAddTemplatePage({
            pageName: data.name,
            templateId: this.templateId,
            pageCode:data.pageCode,
            pageAlias:data.catExt,
            pageParent:0,
          }).then(res => {
            console.log(res)
            if(res.code === 200) {
              const newChild = { id: res.data.id, label: data.name, children: [] };
              // if (!this.data1.children) {
              //   this.$set(this.data1, '关于我们', []);
              // }
              this.data1.push(newChild);
              $('#silder').append('<li id="'+newChild.id+'" style="padding: 0 2vw;"><a href="'+data.catExt+'.html" style="padding: 1.4vw 0;text-decoration: none;" onmouseover="this.style.borderBottom = \'0.2vw solid #409EFF\'" onmouseout="this.style.borderBottom = \'0.2vw solid transparent\'">'+data.name+'</a></li>')
              // let headerHtml = $('#headerHtml').html()
              // this.webPageList.header = headerHtml
              if(pageNum == 1){
                //上次页头代码
                this.saveHeaderPage()
              }else {
                this.updateHeaderPage()
              }
            } else {
              this.$message.error(res.msg)
            }
          })
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
          let parm = {
            catId:val,
            name:'',
            selectType:1
          }
          this.$api.apiPageList(parm).then(res => {
            if(res.msg === "success") {
              this.pagetList = res.data
            } else {
              this.$message.error(res.msg)
            }
          })
        },
      },
      mounted() {
        if(this.$store.state.sutieId == null || this.$store.state.sutieId == ''){
          this.$router.push({
            path: '/suiteManagement'
          })
          return
        }
        setTimeout(function () {
          $("ul").on("click","li",function(){      //点击顶部导航切换页面
            headerIndex = $(this).index();
            app.$store.commit('saveHeaderIndex',headerIndex)
          });
        },0)
        pageNum = 1
        this.templateId = this.$route.query.data.templateId
        this.$api.apiByCatType(2).then(res => {
          if(res.msg === "success") {
            this.classifyList = res.data
            this.pageName = this.classifyList[0].catName
            this.getPageList(this.classifyList[0].id)
          } else {
            this.$message.error(res.msg)
          }
        })
        var evt = evt || window.event; //获取event对象
        if (evt.preventDefault) {
          evt.preventDefault(); //非IE浏览器
        } else {
          evt.returnValue = false; //在早期的IE版本中
        }
        event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true); //阻止事件冒泡
      },
      watch: {
        '$store.state.headerIndex': function(val) {
          if(val != null){
            this.webPageList.content = this.webPageAll[val].pageCode;
            var evt = evt || window.event; //获取event对象
            if (evt.preventDefault) {
              evt.preventDefault(); //非IE浏览器
            } else {
              evt.returnValue = false; //在早期的IE版本中
            }
            event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true); //阻止事件冒泡
          }
          this.$store.commit('saveHeaderIndex',null)
        }
      },
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
          min-height: 500px;
          max-height: 550px;
          overflow-y: auto;
          display: flex;
          .template-edit-list-div{
            width: 50%;
            float: left;
            padding-left: 20px;
            ul {
              width: 100%;
              margin: 0 auto;
              /*display: flex;*/
              /*flex-wrap: wrap;*/
              /*justify-content: space-around;*/
              li {
                position: relative;
                /*width: 47%;*/
                /*height: 300px;*/
                border: 1px #cccccc solid;
                list-style: none;
                margin: .8vw;
                /*display: flex;*/
                /*align-items: center;*/
                /*justify-content: space-evenly;*/
                box-shadow: 0 0 10px rgb(90, 88, 88);
                overflow: hidden;
                img{
                  width: 100%;
                  height: 100%;
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
                .delItem3 {
                  position: absolute;
                  width: 100%;
                  height: 80px;
                  bottom: 0;
                  left: 0;
                  background: rgba(0, 0, 0, 0.5);
                  display: flex;
                  align-items: center;
                  justify-content: space-evenly;
                  z-index: 9999;
                  box-sizing: border-box;
                  color: white;
                  font-size: 20px;
                }
                .template-edit-ico {
                  display: none;
                  font-size: 30px;
                  color: #ffffff;
                  cursor: pointer;
                  margin: 0 auto;
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
  }

</style>
