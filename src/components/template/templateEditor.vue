<template>
  <div class="templateEditor">
    <div class="template-edit-head">
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" @click="backCompon">返回</el-button>
    </div>
    <div class="template-edit-box">
      <p>
        <span>模版分类 ：{{text}}</span>
        <span>模版个数 ：{{num}}</span>
        </p>
      <div style="display: flex;align-items: center;margin-bottom: 20px;margin-top: 20px">
        <div style="display: flex;align-items: center;margin-right: 30px"><label style="white-space: nowrap;margin-right: 20px">模板名称:</label><el-input v-model="name" placeholder="请输入模板名称" clearable></el-input></div>
        <el-button type="primary" size="small" v-on:click="getPageList">查询</el-button>
      </div>
      <div class="template-edit-add">
        <div class="template-edit-add-btn" @click="addTemplate">
          <i class="el-icon-circle-plus-outline"></i><span>新增模版</span>
        </div>
      </div>
      <div class="template-edit-list">
        <div class="template-edit-list-div">
          <ul>
            <li v-if="i%2 == 0" v-for="(item,i) in templateList" @mousemove="delShow = i" @mouseleave="delShow=null" :key="i">
              <div v-if="item.thumb == ''" v-html="item.pageCode" style="height: 350px;">{{item.pageCode}}</div>
              <img v-if="item.thumb != ''" :src="item.thumb">
              <div class="delItem3">{{item.name}}</div>
              <div :class="{'delItem':delShow == i}">
                <div v-if="item.onlineStatus == -1 && delShow!=i" :class="{'delItem2': delShow!=i}" style="text-align: center;color: white;font-size: 24px">已下线</div>
                <!--<i class="el-icon-edit-outline template-edit-ico" :class="{'icoShow':delShow==i}"></i>-->
                <i class="el-icon-view template-edit-ico" :class="{'icoShow':delShow==i}" @click="preview(item)"></i>
                <i class="el-icon-edit-outline template-edit-ico" :class="{'icoShow':delShow==i}" @click="editComponent2(item)"></i>
                <i class="el-icon-setting template-edit-ico" :class="{'icoShow':delShow==i}" @click="editComponent(item)"></i>
                <span v-if="item.onlineStatus == 1" class="iconfont icon-arrow-bottom template-edit-ico" :class="{'icoShow':delShow==i}" @click="offlineSuite(item.id)"></span>
                <span v-if="item.onlineStatus == 0" class="iconfont icon-arrow-top template-edit-ico" :class="{'icoShow':delShow==i}" @click="popSuite(item.id)"></span>
                <i class="el-icon-delete template-edit-ico" :class="{'icoShow':delShow==i}" @click="delComponent(item.id)"></i>
              </div>
            </li>
          </ul>
        </div>
        <div class="template-edit-list-div">
          <ul>
            <li v-if="i%2 != 0" v-for="(item,i) in templateList" @mousemove="delShow = i" @mouseleave="delShow=null" :key="i">
              <div v-if="item.thumb == ''" v-html="item.pageCode" style="height: 350px;">{{item.pageCode}}</div>
              <img v-if="item.thumb != ''" :src="item.thumb">
              <div class="delItem3">{{item.name}}</div>
              <div :class="{'delItem':delShow == i}">
                <div v-if="item.onlineStatus == -1 && delShow!=i" :class="{'delItem2': delShow!=i}" style="text-align: center;color: white;font-size: 24px">已下线</div>
                <!--<i class="el-icon-edit-outline template-edit-ico" :class="{'icoShow':delShow==i}"></i>-->
                <i class="el-icon-view template-edit-ico" :class="{'icoShow':delShow==i}" @click="preview(item)"></i>
                <i class="el-icon-edit-outline template-edit-ico" :class="{'icoShow':delShow==i}" @click="editComponent2(item)"></i>
                <i class="el-icon-setting template-edit-ico" :class="{'icoShow':delShow==i}" @click="editComponent(item)"></i>
                <span v-if="item.onlineStatus == 1" class="iconfont icon-arrow-bottom template-edit-ico" :class="{'icoShow':delShow==i}" @click="offlineSuite(item.id)"></span>
                <span v-if="item.onlineStatus == 0" class="iconfont icon-arrow-top template-edit-ico" :class="{'icoShow':delShow==i}" @click="popSuite(item.id)"></span>
                <i class="el-icon-delete template-edit-ico" :class="{'icoShow':delShow==i}" @click="delComponent(item.id)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <el-dialog :visible.sync="dialogAdd" width="500px" @close='closeDialog' :close-on-click-modal="false">
        <div class="el-dialog-componAdd">
          <el-form :inline="true" ref="template" :model="template" :rules="rules" class="demo-form-inline">
            <el-form-item label="模板名称:" prop="templateName">
              <el-input v-model="template.templateName" placeholder="请输入模板名称"></el-input>
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
                  <div v-if="template.imageUrl" :class="{'delItem':showDel}">
                    <i class="el-icon-view compon-edit-ico" :class="{'icoShow':showDel}" @click="dialogVisible3=true"></i>
                    <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showDel}" @click="handleRemove"></i>
                  </div>
                </div>
                <img v-if="template.imageUrl" :src="template.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div class="el-upload__tip" slot="tip">请选择jpg或者png图片，单个文件请不要超过10M，建议尺寸比例：(750 x 400)</div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible3" :modal="false">
                <img width="100%" :src="template.imageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-form>
        </div>
        <div class="el-dialog-componAdd-btn">
          <el-button @click="dialogAdd = false">取 消</el-button>
          <el-button type="primary" @click="saveTemplate">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script scoped>
  import host from '../config/host'
  import fileUtil from '../config/fileUtil'
  import '@/assets/js/jquery';
  export default {
    name: 'templateEditor',
    data() {
      return {
        dialogVisible3:false,
        host:host,
        imageUrl:'',
        showDel:false,
        name:'',
        delShow: null,
        dialogAdd: false,
        value: '',
        text:'',//模板分类名称
        num:0,//模板个数
        templateList:[],
        templateName:'',
        templateData:{},
        template:{
          templateName:'',
          imageUrl:''
        },
        rules:{
          templateName: [
            { required: true, message: '请输入模板名称', trigger: 'blur' },
            { max: 6, message: '不超过6个字符', trigger: 'blur' }
          ]
        },
      }
    },
    methods: {
      handleRemove(file, fileList) {
        this.$refs.upload.clearFiles()
        this.template.imageUrl = ''
        setTimeout(() => {
          let oV1 =  document.getElementsByClassName('el-upload__input')
          oV1[0].disabled=false
        }, 100);
      },
      //删除组件
      delComponent(index) {
        this.$confirm('是否删除该模板?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.apiDelPage(index).then(res=>{
            if(res.code === 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getPageList()
            }
          })
        }).catch(() => {
        });
      },
      //预览页面
      preview(data){
        window.localStorage.setItem('saveTemplateCode',data.pageCode)
        let routeData = this.$router.resolve({
          path:'/previewTemplate'
        })
        window.open(routeData.href, '_blank');
      },
      //上线
      popSuite(id) {
        this.$confirm('确认上线该模板吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.apiOnlineOperate({
            catType: 2,
            id:id,
            operateType:1
          }).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.getPageList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      //下线
      offlineSuite(id) {
        this.$confirm('确认下线该模板吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.apiOnlineOperate({
            catType: 2,
            id:id,
            operateType:0
          }).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.getPageList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      editComponent2(item){
        window.location.href = host.editorUrl+'?catId='+item.id+'&name='+item.name+'&type=templateEditor'
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
          this.template.imageUrl = file.response;
        }else {
          this.template.imageUrl = URL.createObjectURL(file.raw);
        }
        let oV1 =  document.getElementsByClassName('el-upload__input')
        oV1[0].disabled=true
      },
      editComponent(item){
        setTimeout(() => {
          let oV1 =  document.getElementsByClassName('el-upload__input')
          if(item.thumb != ''&& item.thumb != null){
            oV1[0].disabled = true
          }
        }, 100);
        this.dialogAdd = true
        this.template.templateName = item.name
        this.template.imageUrl = item.thumb
        this.templateData = item
      },
      closeDialog(){
        this.$refs.upload.clearFiles()
        this.template.imageUrl = ''
        setTimeout(() => {
          let oV1 =  document.getElementsByClassName('el-upload__input')
          oV1[0].disabled=false
        }, 100);
      },
      saveTemplate(){
        this.$refs.template.validate((valid) => {
          if (valid) {
            let parm = {
              name: this.template.templateName,
              catExt: this.templateData.catExt,
              catId: this.templateData.catId,
              pageCode: this.templateData.pageCode,
              thumb: this.template.imageUrl,
              id: this.templateData.id,
            }
            this.$api.apiUpdatePage(parm).then(res => {
              console.log(res)
              if (res.code === 200) {
                this.dialogAdd = false
                this.$message.success('修改成功')
                this.getPageList()
              } else {
                this.$message.error(res.msg)
              }

            })
          }
        });
      },
      //新增组件
      addTemplate() {
        let row = {
            catName:this.$store.state.templateData.catName,
            id:this.$store.state.templateData.id,
            index:this.$route.query.catIndex
        }
        let param = {
          btnShow:0
        }
        // this.$store.commit('saveTemplateData', param)
        this.$store.commit('saveCatType', row)
        this.$router.push({
          path:'/addTemplate',
          query:{text:'新增模版',pageId:2}
          })
      },
      //返回
      backCompon() {
        this.$router.push({
          path:'/allTemplate'
        })
      },
      getPageList(){
        let parm = {
          catId:this.$store.state.templateData.id,
          name:this.name,
          selectType:0
        }
        this.$api.apiPageList(parm).then(res => {
          if(res.msg === "success") {
            this.templateList = res.data
            this.num = this.templateList.length
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    mounted() {
      if(this.$store.state.templateData == null || this.$store.state.templateData == ''){
        this.$router.push({
          path:'/allTemplate'
        })
        return
      }
      this.text = this.$store.state.templateData.catName
      this.num = this.$store.state.templateData.catNum
      this.getPageList()
    }
  }
</script>

<style lang="scss" scoped>
  .templateEditor {
    .template-edit-head {
      button {
        font-size: 16px;
      }
    }
    .template-edit-box {
      p {
        margin: 10px 0 10px 0;
        font-weight: 600;
        font-size: 20px;
        span{
          margin-right: 20px;
        }
      }
    }
    .template-edit-add {
      width: 100%;
      background: #f2f2f2;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      .template-edit-add-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      i {
        padding-right: 10px;
        font-size: 30px;
      }
    }
    .template-edit-list {
      margin: 10px 0 10px 0;
      display: flex;
      .template-edit-list-div{
        width: 50%;
        float: left;
        padding-left: 20px;
        ul {
          width: 100%;
          margin: 0 auto;
          /*display: flex;*/
          /*flex-wrap: wrap;*/
          /*justify-content: space-between;*/
          li {
            position: relative;
            /*width: 49%;*/
            /*height: 350px;*/
            border: 1px #cccccc solid;
            list-style: none;
            margin: 10px 0 10px 0;
            /*display: flex;*/
            /*align-items: center;*/
            /*justify-content: space-evenly;*/
            box-shadow: 0 0 10px rgb(90, 88, 88);
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
              border: 1px solid #cccccc;
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
              justify-content: space-evenly;
              z-index: 200;
              box-sizing: border-box;
            }
            .delItem2 {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background: rgba(0, 0, 0, 0.5);
              display: flex;
              align-items: center;
              justify-content: space-evenly;
              z-index: 100;
              box-sizing: border-box;
            }
            .delItem3 {
              position: absolute;
              width: 100%;
              height: 80px;
              bottom: 0;
              left: 0;
              background: rgba(0, 0, 0, 0.5);
              display: flex;
              align-items: center;
              justify-content: space-evenly;
              z-index: 100;
              box-sizing: border-box;
              color: white;
              font-size: 20px;
            }
            .template-edit-ico {
              display: none;
              font-size: 30px;
              color: #ffffff;
              cursor: pointer;
              margin: 0 auto;
            }
            .icoShow {
              display: block;
            }
          }
        }
      }
    }
    .el-dialog-componAdd-btn {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
    .el-dialog-componAdd-update {
      display: flex;
      align-items: center;
      height: 55px;
      .addCom_input {
        width: 171px;
      }
      .upload-demo {
        display: flex;
        ul {
          margin-left: 10px;
          li {
            margin: 0;
          }
        }
      }
    }
    .el-componAdd-update-title {
      display: inline-block;
      width: 100px;
      text-align: end;
      margin-right: 10px;
    }
    .el-dialog-componDel {
      height: 60px;
      font-size: 18px;
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
      border-radius: 10px;
    }
    .avatar {
      width: 275px;
      height: 148px;
      display: block;
      border-radius: 10px;
    }
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
