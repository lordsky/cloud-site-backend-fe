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
        <el-col :span="24" class="main1">
          <div class="main-info" v-if="webPageList.content == ''">
            <div class="add-btn">
              <div>请先添加一个页面</div>
              <div class="margin-top"><el-button type="primary" @click="dialogVisible3=true,level=1">+添加页面</el-button></div>
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
                <i class="el-icon-circle-plus-outline ico-size" v-if="data.children" @click="() => append(node, data)"></i>
                <i class="el-icon-edit-outline ico-size" @click="() => editor(node, data)"></i>
                <i class="el-icon-delete ico-size" @click="() => remove(node, data)" v-if="data1.length>1 && data.children.length<1"></i>
              </span>
            </span>
            </el-tree>
          </div>
          <span class="dialog-footer">
            <el-button type="primary" @click="dialogVisible3=true,level=1" style="z-index: 1">+添加新页面</el-button>
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
                    <span v-if="level == 1" class="template-edit-ico" :class="{'icoShow':delShow==i}" @click="selectPage(item)">选择</span>
                    <span v-if="level == 2" class="template-edit-ico" :class="{'icoShow':delShow==i}" @click="selectPageTwo(item,NODE,DATA)">选择</span>
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
                      <span v-if="level == 1" class="template-edit-ico" :class="{'icoShow':delShow==i}" @click="selectPage(item)">选择</span>
                      <span v-if="level == 2" class="template-edit-ico" :class="{'icoShow':delShow==i}" @click="selectPageTwo(item,NODE,DATA)">选择</span>
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
  let headerId = 0
  let pageIndex = 1
  let catExt = ''
  let hIndex =null
  let hIndex2 =null
    export default {
      name: "websiteEditor",
      data(){
        return{
          level:'',
          DATA: null,
          NODE: null,
          templateId:'',
          webPageAll:[],
          webPageList:{
            header: window.localStorage.getItem('suiteHeater'),
            footer: window.localStorage.getItem('suiteFooter'),
            content: '',
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
          const children =  parent.data;
          const children2 = parent.data.children;
          if(parent.data.children == undefined){
            const index = children.findIndex(d => d.id === data.id);
            if(index != -1){
                this.webPageList.content = this.webPageAll[index].pageCode
            }
          }else{
            const index1 = this.webPageAll.findIndex(d => d.pageAlias === children.pageAlias);
            const index2 = children2.findIndex(d => d.id === data.id);
            if(index1 != -1){
                this.webPageList.content = this.webPageAll[index1].children[index2].pageCode
            }
          }
        },
        exit(){
          this.$router.push({
            path:'/suiteClassification'
          })
        },
        //新增二级页面
        selectPageTwo(data,n,d){
          this.webPageList.content = data.pageCode
          const parent = n.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(x => x.id === d.id);
          //防止网名重复
          for(let i=0;i<this.webPageAll.length;i++){
            if(this.webPageAll[i].pageAlias == data.catExt){
              catExt = data.catExt + '-' + pageIndex
              pageIndex++
            }
            for(let j=0;j<this.webPageAll[i].children.length;j++){
              if(this.webPageAll[j].children.pageAlias == data.catExt){
                catExt = data.catExt + '-' + pageIndex
                pageIndex++
              }
            }
          }
          let parm = {
            pageName: data.name,
            templateId: this.templateId,
            pageCode:data.pageCode,
            pageAlias:catExt,
            pageParent:d.id,
          }
          this.$api.apiAddTemplatePage(parm).then(res=>{
            if(res.msg === 'success'){
              this.$message.success("添加成功！")
              this.webPageAll[index].children.push({
                id:res.data.id,
                pageName:data.name,
                templateId:this.templateId,
                pageCode:data.pageCode,
                pageAlias:catExt,
                pageParent:d.id,
                children: []
              })
              d.children.push({
                id: res.data.id,
                label: res.data.pageName,
                pageParent: res.data.pageParent,
                pageAlias:catExt,
                isEdit: false,
                children: []
              })
              const newChild = {
                id: res.data.id,
                label: res.data.pageName,
                pageParent: res.data.pageParent,
                pageAlias:catExt,
                isEdit: false
              };
              if($("#"+d.id).children(".drop-down-content").length == 0){
                $("#silder .drop-down").eq(index).append('<ul class="drop-down-content">' +
                  '<li id="'+newChild.id+'"><a href="'+catExt+'.html">'+data.name+'</a></li>' +
                  '</ul>')
              }else{
                $("#silder .drop-down").eq(index).children(".drop-down-content").append('<li id="'+newChild.id+'"><a href="'+catExt+'.html">'+data.name+'</a></li>')
              }
              // console.log($("#"+d.id).children(".drop-down-content").length)

              // $('#silder').append('<ul class="drop-down-content">' +
              //   '<li><a href="#">二级菜单</a></li>' +
              //   '</ul>')
              if(pageNum == 1){
                //上次页头代码
                this.saveHeaderPage()
              }else {
                this.updateHeaderPage()
              }
              this.dialogVisible3 = false
              //同时展开节点
              // if(!n.expanded){
              //   n.expanded = true
              // }
            }else{
              this.$message.error(res.msg)
            }
          })
        },
        append(n,d) {
          this.NODE = n
          this.DATA = d
          this.dialogVisible3 = true
          this.level = 2
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
              // const children = parent.data.children || parent.data;
              const children =  parent.data;
              const children2 = parent.data.children;
              let index = ''
              let index1 = ''
              let index2 = ''
              if(parent.data.children == undefined){
                index = children.findIndex(d => d.id === this.data2.id);
              }else{
                index1 = this.webPageAll.findIndex(d => d.pageAlias === children.pageAlias);
                index2 = children2.findIndex(d => d.id === this.data2.id);
              }
              this.$api.apiUpdateTemplatePage({
                pageName: this.formCompon.name,
                id: this.data2.id,
              }).then(res => {
                console.log(res)
                if(res.code === 200) {
                  this.dialogVisible2=false
                  if(parent.data.children == undefined){
                    children[index].label = this.formCompon.name
                    this.webPageAll[index].pageName = this.formCompon.name
                    $("#"+this.data2.id).children("a").html(this.formCompon.name);
                  }else{
                    children2[index2].label = this.formCompon.name
                    this.webPageAll[index1].children[index2].pageName = this.formCompon.name
                    $("#"+this.data2.id).children("a").html(this.formCompon.name)
                  }
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
          // const index = children.findIndex(d => d.id === data.id);
          const children =  parent.data;
          const children2 = parent.data.children;
          let index = ''
          let index1 = ''
          let index2 = ''
          if(parent.data.children == undefined){
             index = children.findIndex(d => d.id === data.id);
          }else{
             index1 = this.webPageAll.findIndex(d => d.pageAlias === children.pageAlias);
             index2 = children2.findIndex(d => d.id === data.id);
          }
          this.$api.apiDelTemplatePage(data.id).then(res => {
            if(res.msg === "success") {
              if(parent.data.children == undefined){
                children.splice(index, 1);
                this.webPageAll.splice(index,1)
              }else{
                children2.splice(index2, 1);
                this.webPageAll[index1].children.splice(index2,1)
              }
              this.webPageList.content = this.webPageAll[0].pageCode
              if(index2 == 0){
                $("#"+data.id).parent().remove()
              }else{
                $("#"+data.id).remove()
              }
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
        //选择页面(新增一级页面)
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
          this.$api.apiAddTemplatePage({
            pageName: data.name,
            templateId: this.templateId,
            pageCode:data.pageCode,
            pageAlias:data.catExt,
            pageParent:0,
          }).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.webPageAll.push({
                id:res.data.id,
                pageName:data.name,
                templateId:this.templateId,
                pageCode:this.webPageList.content,
                pageAlias:data.catExt,
                pageParent:0,
                children: []})
              const newChild = { id: res.data.id, label: data.name,pageAlias:data.catExt, children: [] };
              this.data1.push(newChild);
              $('#silder').append('<li class="drop-down" id="'+newChild.id+'" style="padding: 0 2vw;"><a class="padding_a" href="'+data.catExt+'.html" style="min-width: 4.2vw;text-decoration: none;color: inherit;" onmouseover="this.style.borderBottom = \'0.2vw solid #409EFF\'" onmouseout="this.style.borderBottom = \'0.2vw solid transparent\'">'+data.name+'</a></li>')
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
              this.webPageList.content = ''
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
        setTimeout(()=>{
          $('.header-hsw') .css('position','absolute')
        },1000)
        setTimeout(function () {
          $("#silder").on("click",".drop-down",function(e){      //点击顶部导航切换页面
            // e.stopPropagation();
            headerIndex = $(this).index();
            headerId = $(this).attr("id")
            app.$store.commit('saveHeaderIndex',headerIndex)
            var evt = evt || window.event; //获取event对象
            if (evt.preventDefault) {
              evt.preventDefault(); //非IE浏览器
            } else {
              evt.returnValue = false; //在早期的IE版本中
            }
            event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true); //阻止事件冒泡
          });
          $(".drop-down-content").on("click","li",function(e){      //点击顶部导航切换页面
            headerIndex = $(this).index();
            headerId = $(this).attr("id")
            app.$store.commit('saveHeaderIndex',headerIndex)
            var evt = evt || window.event; //获取event对象
            if (evt.preventDefault) {
              evt.preventDefault(); //非IE浏览器
            } else {
              evt.returnValue = false; //在早期的IE版本中
            }
            event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true); //阻止事件冒泡
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
      },
      watch: {
        '$store.state.headerIndex': function(val) {
          if(val != null){
            hIndex = this.webPageAll.findIndex(d => d.id === parseInt(headerId));
            for(let i=0;i<this.webPageAll.length;i++){
              let a = this.webPageAll[i].children.findIndex(d => d.id === parseInt(headerId));
              if(a != -1){
                hIndex2 = a
                hIndex = i
              }
            }
            if(hIndex2 == null){
              this.webPageList.content = this.webPageAll[hIndex].pageCode
            }else{
              this.webPageList.content = this.webPageAll[hIndex].children[hIndex2].pageCode
              hIndex2 = null
            }
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
    .main1 {
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
