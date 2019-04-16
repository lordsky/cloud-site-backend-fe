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
    <el-form-item label="上传缩略图:">
      <el-upload
        ref='upload'
        class="avatar-uploader"
        :action="host.imgurl"
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
    <div class="topside" v-if="isPage == false ">
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
    <div class="footerside" v-if="isPage == false ">
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
      <el-button type="primary" @click="onSubmit" :loading="addLoading" :disabled="disabled1">下一步</el-button>
      <el-button type="primary" @click="suiteSave" :loading="editorLoading" :disabled="disabled1">保存</el-button>
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
        disabled1:false,
        aaa:'',
        host:host,
        suite: {},
        classification:[],
        topDate:'',
        footerDate:'',
        showTop:false,
        showFooter:false,
        dialogTemplate:false,
        componTitle:'',
        activeShow:0,
        componentList:[],
        isPage:false,
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
      //选择模版
      btnType(i){
        this.activeShow = i
      },
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
          this.$message.error('上传缩略图片只能是 JPG、PNG 格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传缩略图片大小不能超过 10MB!');
        }
        let upload = isType && isLt10M
        if(upload != true){
          return
        }
        if(file.response != undefined){
          this.suite.thumb = file.response;
          this.disabled1 = false
        }else {
          this.suite.thumb = URL.createObjectURL(file.raw);
          this.disabled1 = true
        }
        let oV1 =  document.getElementsByClassName('el-upload__input')
        oV1[0].disabled=true
      },
      //获取组件列表
      getComponentList(val){
        this.$api.apiComponentByName(val).then(res => {
          if(res.msg === "success") {
            this.componentList = res.data
            setTimeout(()=>{
              $('.header-hsw').css('position','static')
            },10)
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
      onSubmit : async function() {
        this.$refs.suite.validate((valid) => {
          if(this.suite.thumb == ''){
            this.$message({
              type: 'warning',
              message: '请选择上传缩略图片!'
            });
            return
          }
          if(this.isPage == false){
            if(this.topDate == '' || this.footerDate == ''){
              this.$message({
                type: 'warning',
                message: '请选择页头和页脚!'
              });
              return
            }
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
                $("#silder").find("li").remove();
                this.topDate = $('#topDate').html()
                window.localStorage.setItem('suiteHeater',this.topDate)
                window.localStorage.setItem('suiteFooter',this.footerDate)
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
              message: '请选择上传缩略图片!'
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
      setTimeout(()=>{
        $('.header-hsw').css('position','static')
      },1000)
      this.$api.apiByCatType(3).then(res => {
        if(res.msg === "success") {
          this.classification = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      let oV1 =  document.getElementsByClassName('el-upload__input')
      this.suite = this.$route.query.suite
      this.$api.apiTemplateComponentList(this.suite.id).then(res=>{
        if(res.msg === 'success'){
          if(res.data.length > 0){
            this.isPage = true
          }else{
            this.isPage = false
          }
        }
      })
      if(this.$route.query.suite.thumb != ''|| this.$route.query.suite.thumb != null){
        oV1[0].disabled = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .suiteEditor{
    margin: 20px;
    width: 90%;
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
      overflow: hidden;
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
            overflow: hidden;
            /*&:hover{*/
            /*border: 1px #4d78ff solid;*/
            /*}*/
          }
          .active{
            border: 3px #4d78ff solid;
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
  .suiteEditor{
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
  }
</style>
