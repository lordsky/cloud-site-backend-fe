<template>
  <div>
    <el-form ref="course" :model="course" :rules="rules" label-width="100px" class="courseAdd">
      <el-form-item label="教程标题:" prop="name">
        <el-input v-model="course.name" placeholder="请输入教程标题" class="el-input-course"></el-input>
      </el-form-item>
      <el-form-item label="教程介绍:" prop="introduce">
        <el-input type="textarea" v-model="course.introduce" :rows="5" placeholder="请输入教程介绍，不超过40个字符"></el-input>
      </el-form-item>
      <el-form-item label="教程封面:">
        <div class="footerside-right-list" @mousemove="showDel = true" @mouseleave="showDel=false">
          <!--<img v-if="banner.imageUrl" :src="banner.imageUrl" class="avatar">-->
          <div v-if="course.imageUrl" :class="{'delItem':showDel}">
            <i class="el-icon-view compon-edit-ico" :class="{'icoShow':showDel}" @click="dialogVisible=true"></i>
            <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showDel}" @click="handleRemove"></i>
          </div>
        </div>
        <img v-if="course.imageUrl" :src="course.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div class="el-upload__tip">请选择jpg或者png图片，单个文件请不要超过10M，建议尺寸比例：(750 x 400)</div>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="course.imageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="教程目录:" prop="classification" v-if="pageId != 2">
        <el-select v-model="course.classification" placeholder="请选择套件分类" class="el-select-course">
          <el-option :label="x.name" :value="i" v-for="(x,i) in classification" :key="i"></el-option>
        </el-select>
        <el-select v-model="course.classification" placeholder="请选择套件分类" class="el-select-course">
          <el-option :label="x.name" :value="i" v-for="(x,i) in classification" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教程类型:" prop="courseState">
        <el-radio-group v-model="courseState">
          <el-radio :label="1">常见教程</el-radio>
          <el-radio :label="2">视频教程</el-radio>
          <el-radio :label="3">图文教程</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="教程内容" prop="courseDescribe" v-if="courseState==1">
        <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
      </el-form-item>
      <el-form-item label="视频介绍" prop="courseDescribe" v-if="courseState==2">
        <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
      </el-form-item>
      <el-form-item label="视频上传" prop="courseDescribe" v-if="courseState==2">
        <el-upload
          ref='upload'
          class="avatar-uploader"
          :action="host.hostUrl+'/common/upload'"
          :show-file-list="false"
          :on-change="handleChange"
          :before-upload="beforeUpLoad">
          <div class="footerside-right-list" @mousemove="showDel = true" @mouseleave="showDel=false">
            <!--<img v-if="suite.imageUrl" :src="suite.imageUrl" class="avatar">-->
            <div v-if="course.imageUrl" :class="{'delItem':showDel}">
              <i class="el-icon-view compon-edit-ico" :class="{'icoShow':showDel}" @click="dialogVisible=true"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showDel}" @click="handleRemove"></i>
            </div>
          </div>
          <!--<img v-if="course.imageUrl" :src="course.imageUrl" class="avatar">-->
          <video v-if="course.imageUrl" :src="course.imageUrl" controls="controls" class="avatar">您的浏览器不支持 video 标签。
          </video>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">上传视频支持MP4,wma等格式，不超过10M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="教程内容" prop="courseDescribe" v-if="courseState==3">
        <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
      </el-form-item>
      <el-form-item>
        <div style="text-align: center">
          <el-button @click="back">返回</el-button>
          <el-button type="primary" @click="onSubmit(course.classification)" :loading="addLoading">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script scoped>
  import host from '../config/host'
  import fileUtil from '../config/fileUtil'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  import '@/assets/js/jquery';
  export default {
    name: "courseAdd",
    data() {
      return {
        content: '',
        editorOption: {
          placeholder: 'Hello World',
          // modules:{
          //   toolbar:[
          //     ['bold', 'italic', 'underline', 'strike','blockquote','code-block','image','video','clean'],        // toggled buttons
          //     ['blockquote', 'code-block']
          //   ]
          // }
        },
        courseLink: 1,
        courseState:1,
        catType:this.$route.query.catType,
        pageId:this.$route.query.pageId,
        host:host,
        topDate:'',
        footerDate:'',
        showTop:false,
        showFooter:false,
        dialogTemplate:false,
        componTitle:'',
        courseShow:0,
        componentList:[],
        classifyList:[],
        type:'',//操作区域
        course: {
          name: '',
          classification: '',
          imageUrl: '',
          introduce: '',
          onlineDate:'',
          offlineStartDate:'',
          offlineEndDate:'',
          video:''

        },
        classification:[
          {name:'企业官网'},
          {name:'在线商城'},
          {name:'外贸站'},
          {name:'工作室'},
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
          ]
        },
        addLoading:false,
        dialogVisible:false,//用于图片展示
        showDel:false,
      }
    },
    components: {
      quillEditor
    },
    methods: {
      onEditorChange({ editor, html, text }) {//富文本编辑器  文本改变时 设置字段值
        this.content = html
      },
      clearDate(){
        this.course.onlineDate = ''
        this.course.offlineStartDate = ''
      },
      //选择模版
      btnType(i){
        this.courseShow = i
      },
      handleRemove(file, fileList) {
        this.$refs.upload.clearFiles()
        this.course.imageUrl = ''
        setTimeout(() => {
          let oV1 =  document.getElementsByClassName('el-upload__input')
          oV1[0].disabled=false
        }, 100);
      },
      handleAvatarSuccess(res, file) {
        this.course.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeUpLoad(file) {
        return new Promise((resolve) => {
          fileUtil.getOrientation(file).then((orient) => {
            if (orient && orient === 6) {
              let reader = new FileReader()
              let img = new Image()
              reader.onload = (e) => {
                img.src = e.target.result
                img.onload = function () {
                  const data = fileUtil.rotateImage(img, img.width, img.height)
                  const newFile = fileUtil.dataURLtoFile(data, file.name)
                  resolve(newFile)
                }
              }
              reader.readAsDataURL(file)
            } else {
              resolve(file)
            }
          })
        })
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
          this.course.imageUrl = file.response;
        }else {
          this.course.imageUrl = URL.createObjectURL(file.raw);
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
        this.courseShow = 0
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
        this.$refs.course.validate((valid) => {
          if(this.course.imageUrl == ''){
            this.$message({
              type: 'warning',
              message: '请选择上传背景图片!'
            });
            return
          }
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
              name: this.course.name,
              catId: this.classification[index].id,
              description:this.course.introduce,
              thumb:this.course.imageUrl
            }).then(res => {
              console.log(res)
              if(res.code === 200) {
                this.addLoading = false;
                $("#silder").find("li").remove();
                this.topDate = $('#topDate').html()
                window.localStorage.setItem('courseHeater',this.topDate)
                window.localStorage.setItem('courseFooter',this.footerDate)
                this.$store.commit('saveSuiteId', this.classification[index].id)
                this.$router.push({
                  path:'/websiteEditor',
                  query:{text:'网站编辑器'
                    ,data:{
                      templateId:res.data,//带参新增套件id
                    },pageId:2
                    ,catType:{
                      catName:this.$route.query.catName,
                      id:this.$route.query.id,
                      index:this.$route.query.catIndex
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
      // this.getSuiteTypeList(3)
    }
  }
</script>

<style lang="scss" scoped>
  .courseAdd{
    margin: 20px;
    .ql-editor{
      min-height: 500px;
    }
    /*width: 90%;*/
    .footerside-right-list{
      position: absolute;
      width: 275px;
      height: 148px;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px dashed;
      border-radius: 10px;
      cursor: pointer;
      &:hover{
        border: 1px dashed #409eff;
      }
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
  }
</style>
<style lang="scss">
  .courseAdd{
    .ql-editor{
      min-height: 500px;
    }
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
    .el-input-course{
      width: 55%;
    }
    .el-select-course{
      width: 40%;
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
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-course{
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
