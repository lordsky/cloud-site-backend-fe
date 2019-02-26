<template>
  <div class="addTemplate">
    <p>新增模版</p>
    <div class="design-template">
      <p>③设计模版</p>
    </div>
    <!--<div class="topside">-->
      <!--<label>顶部区</label>-->
      <!--<div class="topside-right" :class="{'side-right-border':topDate == ''}">-->
        <!--<div class="topside-right-list" :class="{'height_auto':topDate != ''}"  @mousemove="showTop = true" @mouseleave="showTop=false">-->
          <!--<el-button type="primary" v-if="topDate == ''" @click="addComponent('top')">+添加组件</el-button>-->
          <!--<div v-if="topDate != ''" v-html="topDate" style="width: 100%">-->
            <!--{{topDate}}-->
          <!--</div>-->
          <!--<div v-if="topDate != ''" :class="{'delItem':showTop}">-->
            <!--<i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showTop}" @click="addComponent('top')"></i>-->
            <!--<i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showTop}" @click="delComponent('top')"></i>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <Banner @addComponent="addComponent('banner')" @delComponent="delComponent('banner')"  :typographyId="typographyId" :bannnerDate="bannnerDate"></Banner>
    <Format @addComponent="addComponent" @delComponent="delComponent" :typographyId="typographyId" :formatDate="formatDate" :formatDate2="formatDate2" :formatDate3="formatDate3"></Format>
    <!--<div class="footerside">-->
      <!--<label>页脚区</label>-->
      <!--<div class="footerside-right" :class="{'side-right-border':footerDate == ''}">-->
        <!--<div class="footerside-right-list" :class="{'height_auto':footerDate != ''}"  @mousemove="showFooter = true" @mouseleave="showFooter=false">-->
          <!--<el-button type="primary" v-if="footerDate == ''" @click="addComponent('footer')">+添加组件</el-button>-->
          <!--<div v-if="footerDate != ''" v-html="footerDate" style="width: 100%">-->
            <!--{{footerDate}}-->
          <!--</div>-->
          <!--<div v-if="footerDate != ''" :class="{'delItem':showFooter}">-->
            <!--<i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFooter}"></i>-->
            <!--<i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFooter}"></i>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="template-btn">
      <label></label>
      <el-button @click="back">上一步</el-button>
      <el-button type="primary" @click="saveTemplate" :loading="loading">保存</el-button>
    </div>
    <!--添加组件弹框-->
    <el-dialog :title="componTitle" :visible.sync="dialogVisible" width="340px">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="常用组件" name="used" class="com-tab-pane"><ul>
        </ul></el-tab-pane>
        <el-tab-pane label="基础组件" name="basis" class="com-tab-pane">
          <ul>
            <li v-for="(x,i) in basisList" :key="i" @click="openManage(x,i)" v-if="x.catName != '页头' && x.catName != '页脚'">
              <div>
              <div><i class="compon-edit-ico el-icon-news"></i></div>
              <div>{{x.catName}}</div>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="其他组件" name="other" class="com-tab-pane"><ul>
        </ul></el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!--添加组件弹框-->
    <!--组件模版弹框-->
    <el-dialog :title="manageComponTitle" :visible.sync="dialogVisibleManage" width="80%" class="manage-dialog">
      <div class="compon-edit-list">
        <ul>
          <li v-for="(item,i) in componentList" @click="btnType(i)" :class="{'active':activeShow==i}" :key="i" v-html="item.segmentCode">
          {{item.segmentCode}}
          </li>
        </ul>
      </div>
      <div class="dialog-footer">
        <div @click="cancelDialog">取消</div>
        <div @click="completeDialog(type,activeShow)">完成</div>
      </div>
    </el-dialog>
    <!--组件模版弹框-->
  </div>
</template>

<script scoped>
  import Banner from './banner';//横幅区
  import Format from './format';//版式区
    export default {
        name: "designTemplate",
      data() {
          return {
            html1:'',
            html2:'',
            type:'',//操作区域
            template:{},
            loading:false,
            activeShow:0,
            delShow:null,
            topDate:'',//页头代码
            bannnerDate:'',//横幅代码
            formatDate:'',//版式代码
            formatDate2:'',//版式代码
            formatDate3:'',//版式代码
            footerDate:'',//页脚代码
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
            componentList:[],//组件数组
            templateId:0,//模板分类id
            catExt:'',//模板姓名
            pageName:'',//模板姓名
            pageCode:'',//页面代码拼接
            basisList:[],//组件分类
            // basisList:[{
            //   id:1,
            //   name: '导航',
            //   icon: 'el-icon-news',
            // },{
            //   id:2,
            //   name: '内容',
            //   icon: 'el-icon-tickets',
            // },{
            //   id:3,
            //   name: '轮播条',
            //   icon: 'el-icon-picture',
            // },{
            //   id:4,
            //   name: '作品案例',
            //   icon: 'el-icon-document',
            // }],
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
        completeDialog(type,index){
          switch(type) {
            case 'top':
              this.topDate = this.componentList[index].segmentCode
              console.log('顶部区')
              break;
            case 'banner':
              console.log('横幅区')
              this.bannnerDate = this.componentList[index].segmentCode
              break;
            case 'formatDate':
              this.formatDate = this.componentList[index].segmentCode
              break;
            case 'formatDate2':
              this.formatDate2 = this.componentList[index].segmentCode
              break;
            case 'formatDate3':
              this.formatDate3 = this.componentList[index].segmentCode
              break;
            case 'footer':
              this.footerDate = this.componentList[index].segmentCode
              console.log('页脚区')
              break;
          }
          this.dialogVisibleManage = false
          this.dialogVisible = false
          this.activeShow = 0
        },
        saveTemplate(){
          this.loading = true;
          this.pageCode = this.bannnerDate + this.formatDate + this.formatDate2 + this.formatDate3
          // this.pageCode = '<div style="width:100%;background:rgba(255,255,255,1);box-shadow:0px 2px 4px 0px rgba(0,0,0,0.05);padding: 5.1875vw 0;">\n' +
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
          if(this.pageCode == ''){
            this.$message({
              type: 'warning',
              message: '请选择组件!'
            });
            this.loading = false;
            return
          }
          this.$api.apiAddPage({
            catExt: this.catExt,
            catId: this.templateId,
            pageCode:this.pageCode,
          }).then(res => {
            console.log(res)
            if(res.code === 200) {
              let param = {
                id : this.$store.state.templateData.id,
                catName:this.$store.state.templateData.catName,
                catNum:this.$store.state.templateData.catNum,
                index:this.$store.state.templateData.index,
              }
              this.$store.commit('saveTemplateData', param)
              this.$router.push({
                path:'/templateEditor',
                query:{text:'新增模版',catIndex:this.$store.state.templateData.index}
              })
            } else {
              this.$message.error(res.msg)
            }

          })
        },
        //删除组件
        delComponent(type) {
          switch(type) {
            case 'top':
              this.topDate = ''
              break;
            case 'banner':
              this.bannnerDate = ''
              break;
            case 'format':
              break;
            case 'formatDate':
              this.formatDate = ''
              break;
            case 'formatDate2':
              this.formatDate2 = ''
              break;
            case 'formatDate3':
              this.formatDate3 = ''
              break;
            case 'footer':
              this.footerDate = ''
              break;
          }
        },
        //添加组件
        addComponent(type){
          this.type = type
          switch(type) {
            case 'top':
              this.dialogVisible = true
              this.activeName = 'basis'
              this.componTitle = '添加组件'
              break;
            case 'banner':
              this.dialogVisible = true
              this.activeName = 'basis'
              this.componTitle = '添加组件'
              break;
            case 'format':
              this.dialogVisible = true
              this.activeName = 'basis'
              this.componTitle = '添加组件'
              break;
            case 'footer':
              this.dialogVisible = true
              this.activeName = 'basis'
              this.componTitle = '添加组件'
              break;
            default:
              this.dialogVisible = true
              this.activeName = 'basis'
              this.componTitle = '添加组件'
              break;
          }
        },
        //直接打开页头页脚组件选择
        openTopFooter(row,index){
          this.getComponentList(index)
          this.dialogVisibleManage = true
          this.manageComponTitle = row
        },
        openManage(row,i){
            this.getComponentList(row.id)
            this.dialogVisibleManage = true
            this.manageComponTitle = row.catName
        },
        handleClick(tab, event) {
          console.log(tab, event);
        },
        back(){
          this.$router.go(-1)
        },
        //获取组件列表
        getComponentList(val){
          this.$api.apiComponentList(val).then(res => {
            if(res.msg === "success") {
              this.componentList = res.data
            } else {
              this.$message.error(res.msg)
            }
          })
        },
        //获取组件分类
        getBasisList() {
          this.$api.apiCatType(1).then(res => {
            if(res.msg === "success") {
              this.basisList = res.data
            } else {
              this.$message.error(res.msg)
            }
          })
        },
      },
      mounted() {
        this.getBasisList()
        this.typographyId = this.$store.state.templateData.typographyId
        this.pageName = this.$store.state.templateData.catName
        this.catExt = this.$store.state.templateData.catExt
        this.templateId = this.$store.state.templateData.id
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
        .height_auto{
          height: auto;
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
        .height_auto{
          height: auto;
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
          margin: .46vw;
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
      height: 35vw;
      overflow-y: auto;
      padding-bottom: 45px;
      ul {
        width: 95%;
        margin: 0 auto;
        li {
          height: auto;
          border: 1px #cccccc solid;
          list-style: none;
          margin: 10px 0 10px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          /*&:hover{*/
            /*border: 3px #4d78ff solid;*/
          /*}*/
        }
        .active{
          border: 3px #4d78ff solid;
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
