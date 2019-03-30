<template>
  <div class="courseEdit">
    <el-form ref="course" :model="course" :rules="rules" label-width="100px">
      <el-form-item label="教程标题:" prop="title">
        <el-input v-model="course.title" placeholder="请输入教程标题" class="el-input-course"></el-input>
      </el-form-item>
      <el-form-item label="教程介绍:" prop="description">
        <el-input type="textarea" v-model="course.description" :rows="5" placeholder="请输入教程介绍，不超过40个字符"></el-input>
      </el-form-item>
      <el-form-item label="教程封面:">
        <div class="footerside-right-list" @mousemove="showDel = true" @mouseleave="showDel=false" @click="getPicture">
          <div v-if="course.coverUrl" :class="{'delItem':showDel}">
            <i class="el-icon-view compon-edit-ico" :class="{'icoShow':showDel}" @click="dialogVisible=true"></i>
            <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showDel}" @click="handleRemove"></i>
          </div>
        </div>
        <img v-if="course.coverUrl" :src="course.coverUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div class="el-upload__tip">请选择jpg或者png图片，单个文件请不要超过10M，建议尺寸比例：(750 x 400)</div>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="course.coverUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="教程目录:" prop="directory1">
        <el-select v-model="course.directory1" placeholder="请选择一级目录" class="el-select-course" @change="levelChange">
          <el-option :label="x.catName" :value="x.id" v-for="(x,i) in courseTypeList" :key="i"></el-option>
        </el-select>
        <el-select v-model="directory2" placeholder="请选择二级目录" class="el-select-course" :disabled="isDisabled">
          <el-option :label="x.catName" :value="x.id" v-for="(x,i) in courseTypeList2" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教程类型:" prop="type">
        <el-radio-group v-model="course.type">
          <el-radio :label="1">常见教程</el-radio>
          <el-radio :label="2">视频教程</el-radio>
          <el-radio :label="3">图文教程</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="courseTitle" prop="content">
        <!-- 图片上传组件辅助-->
        <el-upload
          class="avatar-uploader"
          :action="host.hostUrl+'/common/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          style="display: none">
        </el-upload>
        <quill-editor ref="myTextEditor" v-model="course.content" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
      </el-form-item>
      <el-form-item label="视频上传" prop="courseDescribe" v-if="course.type==2">
        <el-upload
          ref='video'
          class="avatar-uploader"
          :action="host.hostUrl+'/common/upload'"
          :show-file-list="false"
          :on-success="videoSuccess"
          :before-upload="videoUpload">
          <video v-if="course.videoUrl" :src="course.videoUrl" controls="controls" class="avatar">您的浏览器不支持 video 标签。
          </video>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">上传视频支持MP4,wma等格式，不超过10M</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <div style="text-align: center">
          <el-button @click="back">返回</el-button>
          <el-button type="primary" @click="onSubmit(course.classification)" :loading="addLoading">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
    <!--组件模版弹框-->
    <el-dialog title="素材库" :visible.sync="dialogVisibleManage" width="80%" class="manage-dialog">
      <div class="compon-edit-list">
        <ul>
          <li v-for="(item,i) in materialsList" @click="btnType(i)" :class="{'active':activeShow==i}" :key="i">
            <img width="100%" :src="item.filePath" alt="">
          </li>
        </ul>
      </div>
      <div class="dialog-footer">
        <div @click="dialogVisibleManage = false">取消</div>
        <div @click="completeDialog(activeShow)">完成</div>
      </div>
    </el-dialog>
    <!--组件模版弹框-->
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
  // 工具栏配置
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}],
    [{'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image'],//, 'video'
    ['clean']                                         // remove formatting button
  ];
  // 标题
  const titleConfig = {
    'ql-bold':'加粗',
    'ql-color':'颜色',
    'ql-font':'字体',
    'ql-code':'插入代码',
    'ql-italic':'斜体',
    'ql-link':'添加链接',
    'ql-background':'背景颜色',
    'ql-size':'字体大小',
    'ql-strike':'删除线',
    'ql-script':'上标/下标',
    'ql-underline':'下划线',
    'ql-blockquote':'引用',
    'ql-header':'标题',
    'ql-indent':'缩进',
    'ql-list':'列表',
    'ql-align':'文本对齐',
    'ql-direction':'文本方向',
    'ql-code-block':'代码块',
    'ql-formula':'公式',
    'ql-image':'图片',
    'ql-video':'视频',
    'ql-clean':'清除字体样式',
    'ql-upload':'文件'
  };
  export default {
    name: "courseEdit",
    data() {
      return {
        content: '',
        editorOption: {
          placeholder: '请输入活动描述',
          modules: {
            toolbar: {
              container: toolbarOptions,  // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    // 触发input框选择图片文件
                    document.querySelector('.avatar-uploader input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        },
        courseTitle:'教程内容',
        activeShow:0,
        dialogVisibleManage:false,
        isDisabled:true,
        courseLink: 1,
        courseState:1,
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
        materialsList:[],
        type:'',//操作区域
        course: {
          directory1:'',
          directory2:'',
        },
        directory1:'',
        directory2:'',
        courseTypeList:[],
        courseTypeList2:[],
        rules:{
          title: [
            { required: true, message: '请输入教程标题', trigger: 'blur' },
            { max: 12, message: '不超过24个字符', trigger: 'blur' }
          ],
          // directory1: [
          //   { required: true, message: '请选择目录', trigger: 'change' }
          // ],
          description: [
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
        this.course.content = html
      },
      clearDate(){
        this.course.onlineDate = ''
        this.course.offlineStartDate = ''
      },
      //选择模版
      btnType(i){
        this.activeShow = i
      },
      completeDialog(index){
        this.course.coverUrl = this.materialsList[index].filePath
        this.dialogVisibleManage = false
      },
      handleRemove(file, fileList) {
        setTimeout(() => {
          this.course.coverUrl = ''
        }, 100);
      },
      handleAvatarSuccess(res, file) {
        // 获取富文本组件实例
        let quill = this.$refs.myTextEditor.quill
        // 如果上传成功
        if (res) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片，res为服务器返回的图片链接地址
          quill.insertEmbed(length, 'image', res)
          // 调整光标到最后
          quill.setSelection(length + 1)
        } else {
          // 提示信息，需引入Message
          Message.error('图片插入失败')
        }
      },
      beforeAvatarUpload(file) {
        const isType = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt10M = file.size / 1024 / 1024 < 10;

        if (!isType) {
          this.$message.error('上传背景图片只能是 JPG、PNG 格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传背景图片大小不能超过 10MB!');
        }
        return isType && isLt10M;
      },
      videoSuccess(file,fileList){
        // if(!this.videoUpload(fileList))return
        this.course.videoUrl = file;
      },
      //视频上传
      videoUpload(file) {
        console.log(file.type)
        const videoType = file.type === 'video/mp4'||file.type === 'video/wma';
        const isLt = file.size / 1024 / 1024 < 10;
        if (!videoType) {
          this.$message.error('上传头像图片只能是 MP4,WMA 格式!');
          return false
        }
        if (!isLt) {
          this.$message.error('上传图片大小不能超过 10MB!');
          return false
        }
        return true

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
          this.course.coverUrl = file.response;
        }else {
          this.course.coverUrl = URL.createObjectURL(file.raw);
        }
        let oV1 =  document.getElementsByClassName('el-upload__input')
        oV1[0].disabled=true
      },
      //选完一级目录再选二级目录
      levelChange(val){
        this.isDisabled = false
        this.directory2 = ''
        const index =  this.courseTypeList.findIndex(d => d.id === val);
        this.courseTypeList2 = this.courseTypeList[index].children
      },
      //点击下一步保存套件信息并进入下一步
      onSubmit(index) {
        if(this.pageId == 2){
          index = this.catType.index
        }
        this.$refs.course.validate((valid) => {
          if(this.course.coverUrl == ''){
            this.$message({
              type: 'warning',
              message: '请选择上传教程封面!'
            });
            return
          }
          if (valid) {
            this.addLoading = true;
            // this.$refs.upload.submit();
            this.course.level = this.course.directory1 + ',' + this.directory2
            this.$api.apiAddCourse({
              id:this.course.id,
              title: this.course.title,
              content: this.course.content,
              description:this.course.description,
              coverUrl:this.course.coverUrl,
              videoUrl:this.course.type == 2 ? this.course.videoUrl : '',
              level:this.course.level,
              type:this.course.type
            }).then(res => {
              console.log(res)
              if(res.code === 200) {
                this.addLoading = false;
                this.$router.push({
                  path:'/courseManagement',
                })
              } else {
                this.$message.error(res.msg)
                this.addLoading = false;
              }

            })
          }
        });
      },
      getPicture(){
        if(this.course.coverUrl == ''){
          this.dialogVisibleManage = true
          this.$api.apiMaterials(1).then(res=>{
            if(res.code === 200){
              this.materialsList = res.data
            }
          })
        }
      },
      //返回
      back() {
        this.$router.go(-1)
      },
      getCatList(){
        this.$api.apiCatList().then(res=>{
          if(res.msg === "success") {
            this.courseTypeList = res.data
            this.isDisabled = false
            this.course.directory1 = Number(this.course.level.split(",")[0])
            const index =  this.courseTypeList.findIndex(d => d.id === this.course.directory1);
            this.courseTypeList2 = this.courseTypeList[index].children
            if(this.course.level.split(",")[1] != ''){
              this.directory2 = Number(this.course.level.split(",")[1])
            }else{
              this.directory2 = ''
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      addQuillTitle () {
        const oToolBar = document.querySelector('.ql-toolbar'),
          aButton = oToolBar.querySelectorAll('button'),
          aSelect =  oToolBar.querySelectorAll('select');
        aButton.forEach(function(item){
          if(item.className === 'ql-script'){
            item.value === 'sub' ? item.title = '下标': item.title = '上标';
          }else if(item.className === 'ql-indent'){
            item.value === '+1' ? item.title ='向右缩进': item.title ='向左缩进';
          }else{
            item.title = titleConfig[item.classList[0]];
          }
        });
        aSelect.forEach(function(item){
          item.parentNode.title = titleConfig[item.classList[0]];
        });
      },
    },
    mounted() {
      this.course = this.$route.query.data
      this.addQuillTitle()
      this.getCatList()
    },
    watch:{
      'course.type' : function(val) {
        if(val == 1){
          this.courseTitle = '教程内容'
        }else if(val == 2){
          this.courseTitle = '视频介绍'
        }else {
          this.courseTitle = '教程内容'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .courseEdit{
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
    .compon-edit-list {
      margin: 10px 0 10px 0;
      height: 35vw;
      overflow-y: auto;
      padding-bottom: 45px;
      ul {
        width: 95%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        li {
          margin: 10px;
          width: 30%;
          height: 15vw;
          border: 1px #cccccc solid;
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
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
  .courseEdit{
    .manage-dialog{
      .el-dialog__header{
        padding: 20px;
        border-bottom: 1px solid #c3c3c3;
      }
      .el-dialog__body{
        padding: 0 10px 10px 10px;
      }
    }
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
