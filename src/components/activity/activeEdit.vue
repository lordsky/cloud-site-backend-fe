<template>
  <div>
    <el-form ref="active" :model="active" :rules="rules" label-width="100px" class="activeEdit">
      <el-form-item label="活动名称:" prop="name">
        <el-input v-model="active.name" placeholder="请输入活动名称，不超过12个字符" class="el-input-active"></el-input>
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-radio-group v-model="active.status">
          <el-radio :label="1">上线</el-radio>
          <el-radio :label="-1">下线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动时间:" prop="actTime">
        <el-date-picker
          v-model="active.actTime"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions1"
          :default-time="['12:00:00', '08:00:00']">
        </el-date-picker>
        <span class="clearDate" @click="clearDate">重置</span>
      </el-form-item>
      <el-form-item label="活动描述" prop="description">
        <!-- 图片上传组件辅助-->
        <el-upload
          class="avatar-uploader"
          :action="host.hostUrl+'/common/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
        </el-upload>
        <quill-editor ref="myTextEditor" v-model="active.description" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
      </el-form-item>
      <el-form-item>
        <div style="text-align: center">
          <el-button @click="back">返回</el-button>
          <el-button type="primary" @click="onSubmit()" :loading="addLoading">保存</el-button>
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
    name: "activeEdit",
    data() {
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
        },
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
        actTime1:'',
        actTime2:'',
        activeLink: 1,
        activeState:-1,
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
        active: {},
        classification:[],
        rules:{
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { max: 12, message: '不超过12个字符', trigger: 'blur' }
          ],
          actTime: [
            { required: true, message: '请选择活动时间', trigger: 'change' }
          ],
          description: [
            { required: true, message: '请输入活动描述', trigger: 'blur' }
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
        this.active.content = html
      },
      clearDate(){
        this.active.actTime = ''
      },
      //选择模版
      btnType(i){
        this.activeShow = i
      },
      handleRemove(file, fileList) {
        this.$refs.upload.clearFiles()
        this.active.imageUrl = ''
        setTimeout(() => {
          let oV1 =  document.getElementsByClassName('el-upload__input')
          oV1[0].disabled=false
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
      //点击下一步保存套件信息并进入下一步
      onSubmit() {
        this.$refs.active.validate((valid) => {
          if (valid) {
            this.addLoading = true;
            // this.$refs.upload.submit();
            this.$api.apiAddActive({
              id:this.active.id,
              name: this.active.name,
              description:this.active.description,
              status:this.active.status,
              startTime:this.active.actTime[0] == this.actTime1 ? this.active.actTime[0] : this.$http.getLocalTimeDate(this.active.actTime[0]),
              endTime:this.active.actTime[1] == this.actTime2 ? this.active.actTime[1] : this.$http.getLocalTimeDate(this.active.actTime[1]),
            }).then(res => {
              console.log(res)
              if(res.code === 200) {
                this.addLoading = false;
                this.$router.push({
                  path:'/activeConfiguration',
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
    mounted () {
      this.addQuillTitle()
      this.active = this.$route.query.data
      let actTimeStr = this.active.actTime
      let actTime = []
      actTime.push(actTimeStr.split("~")[0])
      actTime.push(actTimeStr.split("~")[1])
      this.actTime1 = actTimeStr.split("~")[0]
      this.actTime2 = actTimeStr.split("~")[1]
      this.active.actTime = []
      this.active.actTime = actTime
      console.log(this.active.actTime)
    },
  }
</script>

<style lang="scss" scoped>
  .activeEdit{
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
    .clearDate{
      cursor: pointer;
      margin-left: 10px;
      &:hover{
        color: #409eff;
      }
    }
  }
</style>
<style lang="scss">
  .activeEdit{
    .ql-editor{
      min-height: 500px;
    }
    .avatar-uploader .el-upload {
      display: none;
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
    .el-input-active{
      width: 55%;
    }
    .el-select-active{
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
