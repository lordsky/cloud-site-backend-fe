<template>
  <div class="bannerAdd">
    <el-form ref="banner" :model="banner" :rules="rules" label-width="100px">
      <el-form-item label="banner名称:" prop="name">
        <el-input v-model="banner.name" placeholder="请输入banner名称，不超过12个字符" class="el-input-banner"></el-input>
      </el-form-item>
      <el-form-item label="banner位置:" prop="positionId">
        <el-select v-model="banner.positionId" placeholder="请选择banner位置" class="el-select-banner">
          <el-option :label="x.name" :value="x.id" v-for="(x,i) in bannerList" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="banner链接:" prop="url">
        <el-radio-group v-model="banner.urlType">
          <el-radio :label="1">活动链接</el-radio>
          <el-radio :label="2">外部链接</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
        <div v-if="banner.urlType == 1">
          <el-select v-model="banner.actId" placeholder="请选择活动链接" class="el-select-banner">
            <el-option :label="x.name" :value="x.id" v-for="(x,i) in activeList" :key="i"></el-option>
          </el-select>
          <div>注：选择活动链接，点击banner时将跳转到活动详情页</div>
        </div>
        <div v-if="banner.urlType == 2">
          <el-input v-model="banner.url" placeholder="请输入外部链接地址" class="el-input-banner"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="banner图片:">
        <div class="footerside-right-list" @mousemove="showDel = true" @mouseleave="showDel=false" @click="getPicture">
          <!--<img v-if="banner.imageUrl" :src="banner.imageUrl" class="avatar">-->
          <div v-if="banner.imageUrl" :class="{'delItem':showDel}">
            <i class="el-icon-view compon-edit-ico" :class="{'icoShow':showDel}" @click="dialogVisible=true"></i>
            <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showDel}" @click="handleRemove"></i>
          </div>
        </div>
        <img v-if="banner.imageUrl" :src="banner.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div class="el-upload__tip">请选择jpg或者png图片，单个文件请不要超过10M，建议尺寸比例：(750 x 400)</div>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="banner.imageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-radio-group v-model="banner.status">
          <el-radio :label="1">上线</el-radio>
          <el-radio :label="-1">下线</el-radio>
        </el-radio-group>
        <div v-show="banner.status == 1">
          <el-date-picker
            v-model="banner.onlineDate"
            type="datetime"
            placeholder="请选择下线日期"
            default-time="12:00:00">
          </el-date-picker>
          <span class="clearDate" @click="clearDate">重置</span>
        </div>
        <div v-show="banner.status == -1">
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
        <el-button type="primary" @click="onSubmit()" :loading="addLoading">保存</el-button>
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
        <div class="pagination">
        <el-pagination
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="pageAll">
        </el-pagination>
        </div>
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
  import '@/assets/js/jquery';
  export default {
    name: "bannerAdd",
    data() {
      // const URL_REG = '(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'
      // const re=new RegExp(URL_REG);
      // let validateUrl = (rule, value, callback) => {
      //   if (value === "") {
      //     callback(new Error("请输入案例链接地址"));
      //   } else if (!re.test(value)) {
      //     callback(new Error("请输入正确的案例链接地址!"));
      //   } else {
      //     callback();
      //   }
      // }
      return {
        pageAll:0,
        page:1,
        pageSize:6,
        bannerLink: 1,
        bannerState:1,
        host:host,
        topDate:'',
        footerDate:'',
        dialogVisibleManage:false,
        showTop:false,
        showFooter:false,
        dialogTemplate:false,
        componTitle:'',
        activeShow:0,
        imageUrl:'',
        materialsList:[],
        activeList:[],
        bannerList:[{
          id:1,
          name:'首页'
        },{
          id:2,
          name:'模板'
        },{
          id:3,
          name:'教程中心'
        },{
          id:4,
          name:'案例'
        },{
          id:5,
          name:'关于我们'
        }],
        type:'',//操作区域
        banner: {
          name: '',
          positionId: '',
          imageUrl: '',
          onlineDate:'',
          offlineStartDate:[],
          offlineEndDate:'',
          actId:'',
          url:'',
          urlType:0,
          status:1
        },
        classification:[],
        rules:{
          name: [
            { required: true, message: '请输入banner名称', trigger: 'blur' },
            { max: 12, message: '不超过12个字符', trigger: 'blur' }
          ],
          positionId: [
            { required: true, message: '请选择banner位置', trigger: 'change' }
          ],
          // url: [
          //   {
          //     validator: validateUrl,
          //     trigger: "blur"
          //   },
          // ]
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
      //选择图片
      btnType(i){
        this.activeShow = i
      },
      completeDialog(index){
        this.banner.imageUrl = this.materialsList[index].filePath
        this.dialogVisibleManage = false
      },
      handleRemove() {
        setTimeout(() => {
          this.banner.imageUrl = ''
        }, 100);
      },
      //点击下一步保存套件信息并进入下一步
      onSubmit(index) {
        console.log(this.banner.offlineStartDate[0])
        console.log(this.banner.onlineDate)
        this.$refs.banner.validate((valid) => {
          if(this.banner.imageUrl == ''){
            this.$message({
              type: 'warning',
              message: '请选择上传banner图片!'
            });
            return
          }
          if(this.banner.urlType == 1 && this.banner.actId == ''){
            this.$message({
              type: 'warning',
              message: '请选择活动链接'
            });
            return
          }
         if(this.banner.urlType == 2){
           let url = this.banner.url
            const URL_REG = '(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'
            const re=new RegExp(URL_REG);
              if (url === "") {
                this.$message({
                  type: 'warning',
                  message: '请输入案例外部链接地址'
                });
                return
              } else if (!re.test(url)) {
                this.$message({
                  type: 'warning',
                  message: '请输入正确的案例外部链接地址，含http://前缀'
                });
                return
              }
          }
          if (valid) {
            this.addLoading = true;
            this.$api.apiAddBanner({
              id:'',
              name: this.banner.name,
              positionId: this.banner.positionId,
              urlType:this.banner.urlType,
              actId:this.banner.urlType != 1 ? '' : this.banner.actId,
              url:this.banner.urlType != 2 ? '' : this.banner.url,
              status:this.banner.status,
              imageUrl:this.banner.imageUrl,
              onlineTime:this.banner.offlineStartDate[0] == undefined ? '' : this.$http.getLocalTimeDate(this.banner.offlineStartDate[0]),
              offlineTime: this.banner.status == 1 ? (this.banner.onlineDate == '' ? '' : this.$http.getLocalTimeDate(this.banner.onlineDate)) : this.$http.getLocalTimeDate(this.banner.offlineStartDate[1])
            }).then(res => {
              console.log(res)
              if(res.code === 200) {
                this.addLoading = false;
                this.$router.push({
                  path:'/banner',
                })
              } else {
                this.$message.error(res.msg)
                this.addLoading = false;
              }

            })
          }
        });
      },
      //当前页码
      handleCurrentChange(val) {
        this.page = val;
        this.getPicture();
      },
      //当前条数
      handleSizeChange(val) {
        this.pageSize = val;
        this.getPicture();
      },
      getPicture(){
        if(this.banner.imageUrl == ''){
          this.dialogVisibleManage = true
          let parm = {
            materialsType : 1,
            pageNum : this.page,
            pageSize : this.pageSize
          }
          this.$api.apiMaterials(parm).then(res=>{
            if(res.code === 200){
              this.materialsList = res.data.content
              this.pageAll = res.data.totalElements
            }
          })
        }
      },
      //返回
      back() {
        this.$router.go(-1)
      },
      //获取活动列表
      getActiveList(){
        this.$api.apiActivityListNoPage().then(res => {
          if(res.msg === "success") {
            this.activeList = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    mounted() {
      this.getActiveList()
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
    .pagination{
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
  }
</style>
<style lang="scss">
  .bannerAdd{
    .manage-dialog{
      .el-dialog__header{
        padding: 20px;
        border-bottom: 1px solid #c3c3c3;
      }
      .el-dialog__body{
        padding: 0 10px 10px 10px;
      }
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
