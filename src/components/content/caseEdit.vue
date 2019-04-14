<template>
  <div>
    <el-form ref="case2" :model="case2" :rules="rules" label-width="100px" class="case2Add">
      <el-form-item label="案例标题:" prop="name">
        <el-input v-model="case2.name" placeholder="请输入案例标题" class="el-input-case2"></el-input>
      </el-form-item>
      <el-form-item label="案例分类:" prop="caseCatsId">
        <el-select v-model="case2.caseCatsId" placeholder="请选择案例分类" class="el-select-case2">
          <el-option :label="x.catName" :value="x.id" v-for="(x,i) in classification" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="案例简介:" prop="description">
        <el-input type="textarea" v-model="case2.description" :rows="5" placeholder="请输入教程介绍，不超过40个字符"></el-input>
      </el-form-item>
      <el-form-item label="链接地址:" prop="link">
        <el-input v-model="case2.link" placeholder="请输入案例链接地址" class="el-input-case2"></el-input>
      </el-form-item>
      <el-form-item label="教程封面:">
        <el-upload
          ref='upload'
          class="avatar-uploader"
          :action="host.imgurl"
          :show-file-list="false"
          :on-change="handleChange"
          :before-upload="beforeUpLoad">
          <div class="footerside-right-list" @mousemove="showDel = true" @mouseleave="showDel=false">
            <!--<img v-if="suite.imageUrl" :src="suite.imageUrl" class="avatar">-->
            <div v-if="case2.thumb" :class="{'delItem':showDel}">
              <i class="el-icon-view compon-edit-ico" :class="{'icoShow':showDel}" @click="dialogVisible=true"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showDel}" @click="handleRemove"></i>
            </div>
          </div>
          <img v-if="case2.thumb" :src="case2.thumb" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">请选择jpg或者png图片，单个文件请不要超过10M，建议尺寸比例：(750 x 400)</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="case2.thumb" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <div style="text-align: center">
          <el-button @click="back">返回</el-button>
          <el-button type="primary" @click="onSubmit" :loading="addLoading" :disabled="disabled1">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script scoped>
  import host from '../config/host'
  import fileUtil from '../config/fileUtil'
  import '@/assets/js/jquery';
  export default {
    name: "case2Add",
    data() {
      return {
        disabled1:false,
        content: '',
        editorOption: {
          placeholder: 'Hello World',
        },
        case2Link: 1,
        case2State:1,
        host:host,
        topDate:'',
        footerDate:'',
        showTop:false,
        showFooter:false,
        dialogTemplate:false,
        componTitle:'',
        case2Show:0,
        componentList:[],
        classifyList:[],
        type:'',//操作区域
        case2: {},
        classification:[],
        rules:{
          name: [
            { required: true, message: '请输入套件标题', trigger: 'blur' },
            { max: 12, message: '不超过12个字符', trigger: 'blur' }
          ],
          caseCatsId: [
            { required: true, message: '请选择套件分类', trigger: 'change' }
          ],
          description: [
            { required: true, message: '请输入案例简介标题', trigger: 'blur' },
            { max: 40,message: '不超过40个字符', trigger: 'change' }
          ],
          link:[
            { required: true, message: '请输入案例链接地址', trigger: 'blur' },
          ]
        },
        addLoading:false,
        dialogVisible:false,//用于图片展示
        showDel:false,
      }
    },
    methods: {
      handleRemove(file, fileList) {
        this.$refs.upload.clearFiles()
        this.case2.thumb = ''
        setTimeout(() => {
          let oV1 =  document.getElementsByClassName('el-upload__input')
          oV1[0].disabled=false
        }, 100);
      },
      handleAvatarSuccess(res, file) {
        this.case2.thumb = URL.createObjectURL(file.raw);
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
          this.case2.thumb = file.response;
          this.disabled1 = false
        }else {
          this.case2.thumb = URL.createObjectURL(file.raw);
          this.disabled1 = true
        }
        let oV1 =  document.getElementsByClassName('el-upload__input')
        oV1[0].disabled=true
      },
      //点击下一步保存套件信息并进入下一步
      onSubmit() {
        this.$refs.case2.validate((valid) => {
          if(this.case2.thumb == ''){
            this.$message({
              type: 'warning',
              message: '请选择上传教程封面!'
            });
            return
          }
          if (valid) {
            this.addLoading = true;
            // this.$refs.upload.submit();
            let pram = this.case2
            this.$api.apiAddCase(pram).then(res => {
              console.log(res)
              if(res.code === 200) {
                this.addLoading = false;
                this.$router.push({
                  path:'/caseManagement'
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
      //通过id获取案例详情
      getCaseCatInFo(val){
        this.$api.apiSelectCaseCatById(val).then(res=>{
          if(res.msg === "success") {
            this.case2 = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      //获取案例分类
      getCaseCat(val){
        this.$api.apiSelectCaseCat(val).then(res=>{
          if(res.msg === "success") {
            this.classification = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      },
    },
    mounted() {
      this.getCaseCat('')
      this.getCaseCatInFo(this.$route.query.id)
      let oV1 =  document.getElementsByClassName('el-upload__input')
      if(this.case2.thumb != null || this.case2.thumb != ''){
        oV1[0].disabled = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .case2Add{
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
  .case2Add{
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
    .el-input-case2{
      width: 55%;
    }
    .el-select-case2{
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
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-case2{
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
