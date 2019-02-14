<template>
  <el-form ref="suite" :model="suite" :rules="rules" label-width="90px" class="suiteAdd">
    <el-form-item label="套件标题:" prop="name">
      <el-input v-model="suite.name" placeholder="请输入套件标题，不超过12个字符" class="el-input-suite"></el-input>
    </el-form-item>
    <el-form-item label="套件分类:" prop="classification">
      <el-select v-model="suite.classification" placeholder="请选择模版分类" class="el-select-suite">
        <el-option :label="x.name" :value="i" v-for="(x,i) in classification" :key="i"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="套件介绍:" prop="introduce">
      <el-input type="textarea" v-model="suite.introduce" :rows="5" placeholder="请输入套件介绍，不超过40个字符"></el-input>
    </el-form-item>
    <el-form-item label="上传背景图:">
      <el-upload
        ref='upload'
        class="avatar-uploader"
        action="http://six-pulse-nerve-gateway-dev.uworks.cc/common/upload"
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
    <el-form-item>
      <el-button @click="back">返回</el-button>
      <el-button type="primary" @click="onSubmit" :loading="addLoading">下一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
      name: "suiteAdd",
      data() {
        return {
          suite: {
            name: '',
            classification: '',
            imageUrl: '',
            introduce: ''
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
            ],
          },
          addLoading:false,
          dialogVisible:false,
          showDel:false,
        }
      },
      methods: {
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
          this.suite.imageUrl = URL.createObjectURL(file.raw);
          let oV1 =  document.getElementsByClassName('el-upload__input')
          oV1[0].disabled=true
        },
        onSubmit() {
          this.$refs.suite.validate((valid) => {
            if (valid) {
              this.addLoading = true;
              this.$api.apiAddTemplate({
                name: this.suite.name,
                catId: this.suite.catId,
                description:this.suite.introduce,
                thumb:this.suite.imageUrl
              }).then(res => {
                console.log(res)
                if(res.code === 200) {
                  this.addLoading = false;
                } else {
                  this.$message.error(res.msg)
                }

              })
            }
          });
        },
        back() {
          this.$router.go(-1)
        }
      }
    }
</script>

<style lang="scss">
  .suiteAdd{
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
