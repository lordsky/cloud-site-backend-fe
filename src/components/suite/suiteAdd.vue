<template>
  <div>
  <el-form ref="suite" :model="suite" :rules="rules" label-width="90px" class="suiteAdd">
    <el-form-item label="套件标题:" prop="name">
      <el-input v-model="suite.name" placeholder="请输入套件标题，不超过12个字符" class="el-input-suite"></el-input>
    </el-form-item>
    <el-form-item label="套件分类:" prop="classification" v-if="pageId == 1">
      <el-select v-model="suite.classification" placeholder="请选择套件分类" class="el-select-suite">
        <el-option :label="x.catName" :value="i" v-for="(x,i) in classification" :key="i"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="套件分类:" v-if="pageId == 2">
    <el-select v-model="catType.catName" placeholder="请选择模版分类" class="el-select-suite" disabled>
      <el-option  :key="catType.id" :label="catType.catName" :value="catType.catName">
      </el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="套件介绍:" prop="introduce">
      <el-input type="textarea" v-model="suite.introduce" :rows="5" placeholder="请输入套件介绍，不超过40个字符"></el-input>
    </el-form-item>
    <el-form-item label="上传背景图:">
      <el-upload
        ref='upload'
        class="avatar-uploader"
        :action="host.hostUrl+'/common/upload'"
        :show-file-list="false"
        :on-change="handleChange">
        <div class="footerside-right-list" @mousemove="showDel = true" @mouseleave="showDel=false">
          <!--<img v-if="suite.imageUrl" :src="suite.imageUrl" class="avatar">-->
          <div v-if="suite.imageUrl" :class="{'delItem':showDel}">
            <i class="el-icon-view compon-edit-ico" :class="{'icoShow':showDel}" @click="dialogVisible=true"></i>
            <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showDel}" @click="handleRemove"></i>
          </div>
        </div>
        <img v-if="suite.imageUrl" :src="suite.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div class="el-upload__tip" slot="tip">请选择jpg或者png图片，单个文件请不要超过10M，建议尺寸比例：(750 x 400)</div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="suite.imageUrl" alt="">
      </el-dialog>
    </el-form-item>
    <div class="topside">
      <label>顶部区</label>
      <div class="topside-right" :class="{'side-right-border':topDate == ''}">
        <div class="topside-right-list" :class="{'height_auto':topDate != ''}"  @mousemove="showTop = true" @mouseleave="showTop=false">
          <el-button type="primary" v-if="topDate == ''" @click="addComponent('top')">+添加组件</el-button>
          <div v-if="topDate != ''" v-html="topDate" style="width: 100%" id="topDate">
            {{topDate}}
          </div>
          <div v-if="topDate != ''" :class="{'delItem':showTop}">
            <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showTop}" @click="addComponent('top')"></i>
            <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showTop}" @click="delComponent('top')"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="footerside">
      <label>页脚区</label>
      <div class="footerside-right" :class="{'side-right-border':footerDate == ''}">
        <div class="footerside-right-list" :class="{'height_auto':footerDate != ''}"  @mousemove="showFooter = true" @mouseleave="showFooter=false">
          <el-button type="primary" v-if="footerDate == ''" @click="addComponent('footer')">+添加组件</el-button>
          <div v-if="footerDate != ''" v-html="footerDate" style="width: 100%">
            {{footerDate}}
          </div>
          <div v-if="footerDate != ''" :class="{'delItem':showFooter}">
            <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFooter}" @click="addComponent('footer')"></i>
            <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFooter}" @click="delComponent('footer')"></i>
          </div>
        </div>
      </div>
    </div>
    <!--组件模版弹框-->
    <el-dialog :title="componTitle" :visible.sync="dialogTemplate" width="80%" class="manage-dialog">
      <div class="compon-edit-list">
        <ul>
          <li v-for="(item,i) in componentList" @click="btnType(i)" :class="{'active':activeShow==i}" :key="i" v-html="item.segmentCode">
            {{item.segmentCode}}
          </li>
        </ul>
      </div>
      <div class="dialog-footer">
        <div @click="dialogTemplate = false,componentList = ''">取消</div>
        <div @click="completeDialog(type,activeShow)">完成</div>
      </div>
    </el-dialog>
    <!--组件模版弹框-->
    <el-form-item>
      <el-button @click="back">返回</el-button>
      <el-button type="primary" @click="onSubmit(suite.classification)" :loading="addLoading">下一步</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script scoped>
  import host from '../config/host'
  import '@/assets/js/jquery';
    export default {
      name: "suiteAdd",
      data() {
        return {
          catType:this.$route.query.catType,
          pageId:this.$route.query.pageId,
          host:host,
          topDate:'',
          footerDate:'',
          showTop:false,
          showFooter:false,
          dialogTemplate:false,
          componTitle:'',
          activeShow:0,
          componentList:[],
          classifyList:[],
          type:'',//操作区域
          suite: {
            name: '',
            classification: '',
            imageUrl: '',
            introduce: ''
          },
          classification:[
            // {name:'企业官网'},
            // {name:'在线商城'},
            // {name:'外贸站'},
            // {name:'工作室'},
          ],
          rules:{
            name: [
              { required: true, message: '请输入套件标题', trigger: 'blur' },
              { max: 12, message: '不超过12个字符', trigger: 'blur' }
            ],
            classification: [
              { required: true, message: '请选择套件分类', trigger: 'change' }
            ],
            introduce: [
              { max: 40,message: '不超过40个字符', trigger: 'change' }
            ],
          },
          addLoading:false,
          dialogVisible:false,//用于图片展示
          showDel:false,
        }
      },
      methods: {
        //选择模版
        btnType(i){
          this.activeShow = i
        },
        handleRemove(file, fileList) {
          this.$refs.upload.clearFiles()
          this.suite.imageUrl = ''
          setTimeout(() => {
            let oV1 =  document.getElementsByClassName('el-upload__input')
            oV1[0].disabled=false
          }, 100);
        },
        handleAvatarSuccess(res, file) {
          this.suite.imageUrl = URL.createObjectURL(file.raw);
        },
        handleChange(file){
          const isType = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
          const isLt10M = file.size / 1024 / 1024 < 10;

          if (!isType) {
            this.$message.error('上传背景图片只能是 JPG、PNG 格式!');
          }
          if (!isLt10M) {
            this.$message.error('上传背景图片大小不能超过 10MB!');
          }
          let upload = isType && isLt10M
          if(upload != true){
            return
          }
          if(file.response != undefined){
            this.suite.imageUrl = file.response;
          }else {
            this.suite.imageUrl = URL.createObjectURL(file.raw);
          }
          let oV1 =  document.getElementsByClassName('el-upload__input')
          oV1[0].disabled=true
        },
        //获取组件列表
        getComponentList(val){
          this.$api.apiComponentByName(val).then(res => {
            if(res.msg === "success") {
              this.componentList = res.data
            } else {
              this.$message.error(res.msg)
            }
          })
        },
        //添加组件
        addComponent(type){
          this.type = type
          switch(type) {
            case 'top':
              this.getComponentList("页头")
              this.dialogTemplate = true
              break;
            case 'footer':
              this.getComponentList("页脚")
              this.dialogTemplate = true
              break;
          }
        },
        //完成选择模版
        completeDialog(type,index){
          switch(type) {
            case 'top':
              this.topDate = this.componentList[index].segmentCode
              console.log('顶部区')
              break;
            case 'footer':
              this.footerDate = this.componentList[index].segmentCode
              console.log('页脚区')
              break;
          }
          this.componentList = ''
          this.dialogTemplate = false
          this.activeShow = 0
        },
        //删除组件
        delComponent(type) {
          switch(type) {
            case 'top':
              this.topDate = ''
              break;
            case 'footer':
              this.footerDate = ''
              break;
          }
        },
        //点击下一步保存套件信息并进入下一步
        onSubmit(index) {
          if(this.pageId == 2){
            index = this.catType.index
          }
          this.$refs.suite.validate((valid) => {
            if(this.topDate == '' || this.footerDate == ''){
              this.$message({
                type: 'warning',
                message: '请选择页头和页脚!'
              });
              return
            }
            if (valid) {
              this.addLoading = true;
              // this.$refs.upload.submit();
              this.$api.apiAddTemplate({
                name: this.suite.name,
                catId: this.classification[index].id,
                description:this.suite.introduce,
                thumb:this.suite.imageUrl
              }).then(res => {
                console.log(res)
                if(res.code === 200) {
                  this.addLoading = false;
                  $("#silder").find("li").remove();
                  this.topDate = $('#topDate').html()
                  window.localStorage.setItem('suiteHeater',this.topDate)
                  window.localStorage.setItem('suiteFooter',this.footerDate)
                  this.$router.push({
                    path:'/websiteEditor',
                    query:{text:'网站编辑器'
                      ,data:{
                        templateId:res.data,//带参新增套件id
                      }}
                  })
                } else {
                  this.$message.error(res.msg)
                  this.addLoading = false;
                }

              })
            }
          });
        },
        //返回
        back() {
          this.$router.go(-1)
        },
        //获取模板分类
        getSuiteTypeList(val){
          this.$api.apiCatType(val).then(res => {
            if(res.msg === "success") {
              this.classification = res.data
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      },
      created() {
        this.getSuiteTypeList(3)
      }
    }
</script>

<style lang="scss" scoped>
  .suiteAdd{
    margin: 20px;
    /*width: 90%;*/
    .footerside-right-list{
      position: absolute;
      width: 275px;
      height: 148px;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;
      .compon-edit-ico {
        display: none;
        font-size: 30px;
        color: #ffffff;
      }
      .icoShow {
        display: block;
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
        justify-content:space-evenly;
      }
    }
    .topside{
      display: flex;
      margin-top: 20px;
      font-size: 18px;
      font-weight: 600;
      align-items: center;
      label{
        white-space: nowrap;
        width: 80px;
      }
      .topside-right{
        width: 100%;
        .topside-right-list{
          width: 100%;
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
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: 600;
      align-items: center;
      label{
        white-space: nowrap;
        width: 80px;
      }
      .footerside-right{
        width: 100%;
        .footerside-right-list{
          width: 100%;
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
    .manage-dialog{
      .compon-edit-list {
        margin: 10px 0 10px 0;
        height: 400px;
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
            &:hover{
              border: 1px #4d78ff solid;
            }
          }
          .active{
            border: 1px #4d78ff solid;
          }
        }
      }
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
  .suiteAdd{
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 275px;
      height: 148px;
      line-height: 148px;
      text-align: center;
    }
    .avatar {
      width: 275px;
      height: 148px;
      display: block;
    }
    .el-input-suite{
      width: 55%;
    }
    .el-select-suite{
      width: 55%;
    }
    .el-upload--picture-card{
      width: 275px;
    }
    .el-upload-list--picture-card .el-upload-list__item{
      width: 275px;
    }

    .el-dialog__header{
      padding: 20px;

      el-dialog__headerbtn{
        position: absolute;
        top: 0;
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
