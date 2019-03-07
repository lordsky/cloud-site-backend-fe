<template>
  <div>
    <el-form ref="banner" :model="banner" :rules="rules" label-width="100px" class="bannerAdd">
      <el-form-item label="banner名称:" prop="name">
        <el-input v-model="banner.name" placeholder="请输入套件标题，不超过12个字符" class="el-input-banner"></el-input>
      </el-form-item>
      <el-form-item label="banner位置:" prop="classification" v-if="pageId != 2">
        <el-select v-model="banner.classification" placeholder="请选择套件分类" class="el-select-banner">
          <el-option :label="x.catName" :value="i" v-for="(x,i) in classification" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="banner位置:" v-if="pageId == 2">
        <el-select v-model="catType.catName" placeholder="请选择模版分类" class="el-select-banner" disabled>
          <el-option  :key="catType.id" :label="catType.catName" :value="catType.catName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="banner链接:" prop="bannerLink">
        <el-radio-group v-model="bannerLink">
          <el-radio :label="1">活动链接</el-radio>
          <el-radio :label="2">外部链接</el-radio>
          <el-radio :label="3">无</el-radio>
        </el-radio-group>
        <div v-if="bannerLink == 1">
          <el-select v-model="banner.classification" placeholder="请选择套件分类" class="el-select-banner">
            <el-option :label="x.catName" :value="i" v-for="(x,i) in classification" :key="i"></el-option>
          </el-select>
          <div>注：选择活动链接，点击banner时将跳转到活动详情页</div>
        </div>
        <div v-if="bannerLink == 2">
          <el-input v-model="banner.name" placeholder="请输入外部链接地址" class="el-input-banner"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="banner图片:">
        <div class="footerside-right-list" @mousemove="showDel = true" @mouseleave="showDel=false">
          <!--<img v-if="banner.imageUrl" :src="banner.imageUrl" class="avatar">-->
          <div v-if="banner.imageUrl" :class="{'delItem':showDel}">
            <i class="el-icon-view compon-edit-ico" :class="{'icoShow':showDel}" @click="dialogVisible=true"></i>
            <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showDel}" @click="handleRemove"></i>
          </div>
        </div>
        <img v-if="banner.imageUrl" :src="banner.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div class="el-upload__tip" slot="tip">请选择jpg或者png图片，单个文件请不要超过10M，建议尺寸比例：(750 x 400)</div>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="banner.imageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态:" prop="bannerLink">
        <el-radio-group v-model="bannerState">
          <el-radio :label="1">上线</el-radio>
          <el-radio :label="2">下线</el-radio>
        </el-radio-group>
        <div v-show="bannerState == 1">
          <el-date-picker
            v-model="banner.onlineDate"
            type="datetime"
            placeholder="请选择下线日期"
            default-time="12:00:00">
          </el-date-picker>
          <span class="clearDate" @click="clearDate">重置</span>
        </div>
        <div v-show="bannerState == 2">
          <el-date-picker
            v-model="banner.offlineStartDate"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']">
          </el-date-picker>
          <span class="clearDate" @click="clearDate">重置</span>
        </div>
      </el-form-item>
      <el-form-item>
        <div style="text-align: center">
        <el-button @click="back">返回</el-button>
        <el-button type="primary" @click="onSubmit(banner.classification)" :loading="addLoading">保存</el-button>
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
    name: "bannerAdd",
    data() {
      return {
        bannerLink: 1,
        bannerState:1,
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
        banner: {
          name: '',
          classification: '',
          imageUrl: '',
          introduce: '',
          onlineDate:'',
          offlineStartDate:'',
          offlineEndDate:'',

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
          ]
        },
        addLoading:false,
        dialogVisible:false,//用于图片展示
        showDel:false,
      }
    },
    methods: {
      clearDate(){
        this.banner.onlineDate = ''
        this.banner.offlineStartDate = ''
      },
      //选择模版
      btnType(i){
        this.activeShow = i
      },
      handleRemove(file, fileList) {
        this.$refs.upload.clearFiles()
        this.banner.imageUrl = ''
        setTimeout(() => {
          let oV1 =  document.getElementsByClassName('el-upload__input')
          oV1[0].disabled=false
        }, 100);
      },
      handleAvatarSuccess(res, file) {
        this.banner.imageUrl = URL.createObjectURL(file.raw);
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
          this.banner.imageUrl = file.response;
        }else {
          this.banner.imageUrl = URL.createObjectURL(file.raw);
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
        this.$refs.banner.validate((valid) => {
          if(this.banner.imageUrl == ''){
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
              name: this.banner.name,
              catId: this.classification[index].id,
              description:this.banner.introduce,
              thumb:this.banner.imageUrl
            }).then(res => {
              console.log(res)
              if(res.code === 200) {
                this.addLoading = false;
                $("#silder").find("li").remove();
                this.topDate = $('#topDate').html()
                window.localStorage.setItem('bannerHeater',this.topDate)
                window.localStorage.setItem('bannerFooter',this.footerDate)
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
      this.getSuiteTypeList(3)
    }
  }
</script>

<style lang="scss" scoped>
  .bannerAdd{
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
  .bannerAdd{
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
    .el-input-banner{
      width: 55%;
    }
    .el-select-banner{
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
