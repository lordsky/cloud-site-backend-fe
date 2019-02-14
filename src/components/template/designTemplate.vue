<template>
  <div class="addTemplate">
    <p>新增模版</p>
    <div class="design-template">
      <p>③设计模版</p>
    </div>
    <div class="topside">
      <label>顶部区</label>
      <div class="topside-right" :class="{'side-right-border':topDate.length == 0}">
        <div class="topside-right-list" :class="{'height_auto':topDate.length != 0}"  @mousemove="showTop = true" @mouseleave="showTop=false">
          <el-button type="primary" v-if="topDate.length == 0" @click="addComponent('top')">+添加组件</el-button>
          <div v-if="topDate.length != 0" v-html="topDate" style="width: 100%">
            {{topDate}}
          </div>
          <div v-if="topDate.length != 0" :class="{'delItem':showTop}">
            <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showTop}" @click="addComponent(row,'top')"></i>
            <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showTop}" @click="delComponent('top')"></i>
          </div>
        </div>
      </div>
    </div>
    <Banner @addComponent="addComponent('banner')" :typographyId="typographyId"></Banner>
    <Format @addComponent="addComponent('format')" :typographyId="typographyId"></Format>
    <div class="footerside">
      <label>页脚区</label>
      <div class="footerside-right" :class="{'side-right-border':footerDate.length == 0}">
        <div class="footerside-right-list" :class="{'height_auto':footerDate.length != 0}"  @mousemove="showFooter = true" @mouseleave="showFooter=false">
          <el-button type="primary" v-if="footerDate.length == 0" @click="addComponent('footer')">+添加组件</el-button>
          <div v-if="footerDate.length != 0" v-html="footerDate" style="width: 100%">
            {{footerDate}}
          </div>
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
        </ul></el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!--添加组件弹框-->
    <!--组件模版弹框-->
    <el-dialog :title="manageComponTitle" :visible.sync="dialogVisibleManage" width="80%" class="manage-dialog">
      <div class="compon-edit-list">
        <ul>
          <li v-for="(item,i) in componentList" @click="btnType(i)" :class="{'active':activeShow==i}" :key="i" v-html="item.componentCode">
          {{item.componentCode}}
          </li>
        </ul>
      </div>
      <div class="dialog-footer">
        <div @click="cancelDialog">取消</div>
        <div @click="completeDialog(type)">完成</div>
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
            html1:'',
            html2:'',
            row:{
              name:'导航'
            },
            type:'',//操作区域
            topDate:'',
            template:{},
            loading:false,
            activeShow:'',
            delShow:null,
            bannnerDate:[],
            formatDate:[],
            footerDate:'',
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
        completeDialog(type){
          switch(type) {
            case 'top':
              this.topDate = this.componentList[this.activeShow].componentCode
              this.dialogVisibleManage = false
              this.dialogVisible = false
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
        //添加组件
        addComponent(type){
          this.type = type
          switch(type) {
            case 'top':
              this.openTopFooter('导航')
              console.log('顶部区')
              break;
            case 'banner':
              this.dialogVisible = true
              this.activeName = 'basis'
              this.componTitle = '添加组件'
              console.log('横幅区')
              this.html1 = Banner.data().html1
              break;
            case 'format':
              this.dialogVisible = true
              this.activeName = 'basis'
              this.componTitle = '添加组件'
              this.html2 = ''
              console.log('版式区')
              break;
            case 'footer':
              this.openTopFooter('页脚')
              console.log('页脚区')
              break;
          }
        },
        //直接打开页头页脚组件选择
        openTopFooter(row){
          this.getComponentList()
          this.dialogVisibleManage = true
          this.manageComponTitle = row
        },
        openManage(row,i){
            this.getComponentList()
            this.dialogVisibleManage = true
            this.manageComponTitle = row.name
        },
        handleClick(tab, event) {
          console.log(tab, event);
        },
        back(){
          this.$router.go(-1)
        },
        //获取组件列表
        getComponentList(val){
          this.$api.apiTemplateComponentList(val).then(res => {
            if(res.msg === "success") {
              this.componentList = res.data
            } else {
              this.$message.error(res.msg)
            }
          })
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
