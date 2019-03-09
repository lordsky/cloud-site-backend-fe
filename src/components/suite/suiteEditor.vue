<template>
  <div>
  <el-form ref="suite" :model="suite" :rules="rules" label-width="90px" class="suiteEditor">
    <el-form-item label="套件标题:" prop="name">
      <el-input v-model="suite.name" placeholder="请输入套件标题，不超过12个字符" class="el-input-suite"></el-input>
    </el-form-item>
    <el-form-item label="套件分类:" prop="catId">
      <el-select v-model="suite.catId" placeholder="请选择模版分类" class="el-select-suite" disabled>
        <el-option :label="x.catName" :value="x.id" v-for="(x,i) in classification" :key="i"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="套件介绍:" prop="description">
      <el-input type="textarea" v-model="suite.description" :rows="5" placeholder="请输入套件介绍，不超过40个字符"></el-input>
    </el-form-item>
    <el-form-item label="上传背景图:">
      <el-upload
        ref='upload'
        class="avatar-uploader"
        :action="host.hostUrl+'/common/upload'"
        :show-file-list="false"
        :on-change="handleChange"
        :before-upload="beforeUpLoad">
        <div class="footerside-right-list" @mousemove="showDel = true" @mouseleave="showDel=false">
          <!--<img v-if="suite.imageUrl" :src="suite.imageUrl" class="avatar">-->
          <div v-if="suite.thumb" :class="{'delItem':showDel}">
            <i class="el-icon-view compon-edit-ico" :class="{'icoShow':showDel}" @click="dialogVisible=true"></i>
            <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showDel}" @click="handleRemove"></i>
          </div>
        </div>
        <img v-if="suite.thumb" :src="suite.thumb" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div class="el-upload__tip" slot="tip">请选择jpg或者png图片，单个文件请不要超过10M，建议尺寸比例：(750 x 400)</div>
      </el-upload>
      <!--<el-upload-->
        <!--ref='upload'-->
        <!--action="https://jsonplaceholder.typicode.com/posts/"-->
        <!--list-type="picture-card"-->
        <!--:before-upload="beforeAvatarUpload"-->
        <!--:on-preview="handlePictureCardPreview"-->
        <!--:on-change="handleChange"-->
        <!--:on-remove="handleRemove"-->
        <!--:auto-upload="false">-->
        <!--<i class="el-icon-plus"></i>-->
        <!--<div class="el-upload__tip" slot="tip">请选择jpg或者png图片，单个文件请不要超过10M，建议尺寸比例：(750 x 400)</div>-->
      <!--</el-upload>-->
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="suite.thumb" alt="">
      </el-dialog>
    </el-form-item>
    <el-form-item>
      <el-button @click="back">返回</el-button>
      <el-button type="primary" @click="onSubmit" :loading="addLoading">下一步</el-button>
      <el-button type="primary" @click="suiteSave" :loading="editorLoading">保存</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script scoped>
  import host from '../config/host'
  import fileUtil from '../config/fileUtil'
  import '@/assets/js/jquery';
  export default {
    name: "suiteEditor",
    data() {
      return {
        aaa:'',
        host:host,
        suite: {},
        classification:[],
        rules:{
          name: [
            { required: true, message: '请输入套件标题', trigger: 'blur' },
            { max: 12, message: '不超过12个字符', trigger: 'blur' }
          ],
          catId: [
            { required: true, message: '请选择套件分类', trigger: 'change' }
          ],
          description: [
            { max: 40,message: '不超过40个字符', trigger: 'change' }
          ],
        },
        addLoading:false,
        editorLoading:false,
        dialogVisible:false,
        showDel:false,
      }
    },
    methods: {
      handleRemove(file, fileList) {
        this.$refs.upload.clearFiles()
        this.suite.thumb = ''
        setTimeout(() => {
          let oV1 =  document.getElementsByClassName('el-upload__input')
          oV1[0].disabled=false
        }, 100);
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
          this.suite.thumb = file.response;
        }else {
          this.suite.thumb = URL.createObjectURL(file.raw);
        }
        let oV1 =  document.getElementsByClassName('el-upload__input')
        oV1[0].disabled=true
      },
      onSubmit : async function() {
        this.$refs.suite.validate((valid) => {
          if(this.suite.thumb == ''){
            this.$message({
              type: 'warning',
              message: '请选择上传背景图片!'
            });
            return
          }
          if (valid) {
            const index = this.classification.findIndex(d => d.catName === this.suite.catId);
            let id = this.classification[index].id
            console.log(id)
            this.$api.apiUpdateTemplate({
              name: this.suite.name,
              catId: id,
              id:this.suite.id,
              description:this.suite.description,
              thumb:this.suite.thumb
            }).then(res => {
              console.log(res)
              if(res.code === 200) {
                this.editorLoading = false;
                this.$router.push({
                  path: '/websiteUpdate',
                  query:{text:'网站编辑器'
                    ,data:{
                      templateId:this.suite.id,//带参新增套件id
                    },pageId:2}
                })
              } else {
                this.$message.error(res.msg)
                this.editorLoading = false;
              }
            })
          }
        });
      },
      suiteSave(){
        this.$refs.suite.validate((valid) => {
          if(this.suite.thumb == ''){
            this.$message({
              type: 'warning',
              message: '请选择上传背景图片!'
            });
            return
          }
          if (valid) {
            const index = this.classification.findIndex(d => d.catName === this.suite.catId);
            let id = this.classification[index].id
            console.log(id)
            console.log(this.suite.id)
            this.editorLoading = true;
            // this.$refs.upload.submit();
            this.$api.apiUpdateTemplate({
              name: this.suite.name,
              catId: id,
              id:this.suite.id,
              description:this.suite.description,
              thumb:this.suite.thumb
            }).then(res => {
              console.log(res)
              if(res.code === 200) {
                this.editorLoading = false;
                this.$router.go(-1)
              } else {
                this.$message.error(res.msg)
                this.editorLoading = false;
              }

            })
          }
        });
      },
      back() {
        this.$router.go(-1)
      }
    },
    mounted() {
      this.$api.apiByCatType(3).then(res => {
        if(res.msg === "success") {
          this.classification = res.data.content
        } else {
          this.$message.error(res.msg)
        }
      })
      let oV1 =  document.getElementsByClassName('el-upload__input')
      this.suite = this.$route.query.suite
      if(this.$route.query.suite.thumb != ''|| this.$route.query.suite.thumb != null){
        oV1[0].disabled = true
      }
    }
  }
</script>

<style lang="scss">
  .suiteEditor{
    margin: 20px;
    width: 90%;
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
  }
</style>
