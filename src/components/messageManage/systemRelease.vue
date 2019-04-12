<template>
  <div class="system-release">
    <el-form label-width="120px" :model="formMessage">
      <el-form-item label="消息标题：">
        <el-input v-model="formMessage.name" placeholder="请输入消息标题"></el-input>
      </el-form-item>
      <el-form-item label="消息类型：">
        <el-select v-model="formMessage.id" placeholder="请选择">
          <el-option v-for="(item,index) in messageType" :key="index" :label="item.catName" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息内容：">
      	 <!-- 图片上传组件辅助-->
        <el-upload
          class="avatar-uploader"
          :action="host.hostUrl+'/common/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          style="display: none">
        </el-upload>
        <quill-editor ref="myTextEditor" v-model="formMessage.content" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button @click="back">返回</el-button>
        <el-button type='primary' @click="submitText">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  import '@/assets/js/jquery';
  import host from '../config/host'
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
    name: "systemRelease",
    data() {
      return {
        formMessage: {},
        value: '',
        host:host,
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
      }
    },
    methods:{
    	 onEditorChange({ editor, html, text }) {//富文本编辑器  文本改变时 设置字段值
        this.formMessage.content = html
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
      submitText(){
      	this.$http.post(this.$API.releaseMessage,{
      		  catId: this.formMessage.id,
			  content: this.formMessage.content,
			  title: this.formMessage.name
      	},response=>{
      	  if(response.data.code === 200){
            this.$message.success('发布成功!');
            this.$router.push({path:'/courseManagement'})
          }
      		console.log(response)
      	})
      }
    },
    props:['back','messageType'],
    components: {
      quillEditor
    },
  }
</script>

<style lang="less">
  .system-release {
    width: 100%;
    .ql-editor{
      min-height: 500px;
    }
  }
</style>
