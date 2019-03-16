<template>
  <div class="information">
    <el-row>
      <el-col :span="5">
        <div class="information-left">
          <div v-for="(item,index) in informationList" :key="index" @click="btnType(index)" :class="{'information-left-show':activeShow==index}">
            {{item}}
          </div>
        </div>
      </el-col>
      <el-col :span="19">
        <div>
          <div class="information-box">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="导航" name="navigation">
                <el-table :data="tableData"  style="width: 100%" tooltip-effect="dark" row-key="id"
                          v-loading="listLoading" @selection-change="selsChange" :show-header="false" class="table">
                  <el-table-column label="Drag" align="center" width="50">
                    <template slot-scope="{}">
                      <i class="el-icon-rank drag"></i>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="名称" width="100" align="center">
                  </el-table-column>
                  <el-table-column label="url" >
                    <template slot-scope="scope">
                      <span>({{scope.row.url}})</span>
                      <i class="el-icon-edit icon-edit" @click="editName(scope.row)"></i>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="200" align="right">
                    <template slot-scope="scope">
                      <el-radio-group v-model="scope.row.isShow" size="small">
                        <el-radio-button label="显示"></el-radio-button>
                        <el-radio-button label="隐藏"></el-radio-button>
                      </el-radio-group>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagination">
                  <el-pagination layout="prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pageSize" >
                  </el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="LOGO" name="LOGO">
                <div style="overflow: hidden;display: flex">
                  <label style="font-size: 20px">logo:</label>
                  <div style="margin-left: 20px">
                  <el-upload
                    ref='upload'
                    class="avatar-uploader"
                    :action="host.hostUrl+'/common/upload'"
                    :show-file-list="false"
                    :on-change="handleChange"
                    :before-upload="beforeUpLoad"
                    :auto-upload="false">
                    <div class="footerside-right-list" @mousemove="showDel = true" @mouseleave="showDel=false">
                      <!--<img v-if="suite.imageUrl" :src="suite.imageUrl" class="avatar">-->
                      <div v-if="imageUrl" :class="{'delItem':showDel}">
                        <i class="el-icon-view compon-edit-ico" :class="{'icoShow':showDel}" @click="dialogVisible3=true"></i>
                        <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showDel}" @click="handleRemove"></i>
                      </div>
                    </div>
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div class="el-upload__tip" slot="tip">请选择jpg或者png图片，单个文件请不要超过10M，建议尺寸比例：(750 x 400)</div>
                  </el-upload>
                    <el-button style="position: absolute;left: 350px;bottom: 30px" size="small" type="primary">重新上传</el-button>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="底部(友情链接)" name="footerUrl">
                <el-table :data="tableData2"  style="width: 100%" tooltip-effect="dark" row-key="id"
                          v-loading="listLoading" @selection-change="selsChange" :show-header="false" class="table2">
                  <el-table-column label="Drag" align="center" width="50">
                    <template slot-scope="{}">
                      <i class="el-icon-rank drag"></i>
                    </template>
                  </el-table-column>
                  <el-table-column type="selection" width="30" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="名称" width="150" align="center">
                  </el-table-column>
                  <el-table-column label="url" prop="url">
                  </el-table-column>
                  <el-table-column label="操作" width="200" align="right">
                      <template slot-scope="scope">
                        <el-button type="text" @click="dialogUrl('edit',scope.row)">编辑</el-button>
                        <el-button type="text" @click="handleDel(scope.row)">删除</el-button>
                      </template>
                  </el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                  <el-button type="primary" >全选</el-button>
                  <el-button type="primary" :disabled="this.sels.length===0">批量删除</el-button>
                  <el-button type="primary" @click="dialogUrl('add')" :disabled="tableData2.length>=6">新增链接</el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--修改页面名称弹框-->
    <el-dialog title="重命名" :visible.sync="dialogVisible2" width="400px" center>
      <el-form :inline="true" :model="formCompon" class="demo-form-inline" ref="formCompon">
        <el-form-item label="菜单名称:" prop="name" :rules="[{required: true, message: '菜单名称不能为空'},{ max: 6, message: '不能超过6字符', trigger: 'blur' }]">
          <el-input v-model="formCompon.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2=false">取消</el-button>
        <el-button type="primary" @click="dialogVisible2=true">确定</el-button>
      </span>
    </el-dialog>
    <!--修改页面名称弹框-->
    <!--新增/编辑底部链接弹框-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" center :show-close="false" :close-on-click-modal="false">
      <el-form :inline="true" :model="formCompon2" class="demo-form-inline" ref="formCompon2">
        <el-form-item label="友链名称:" prop="name" :rules="[{required: true, message: '友链名称不能为空'},{ max: 6, message: '不能超过6字符', trigger: 'blur' }]">
        <el-input v-model="formCompon2.name" placeholder="请输入友链名称"></el-input>
      </el-form-item>
        <el-form-item label="友链链接:" prop="url" :rules="[{required: true, message: '友链链接不能为空'}]">
          <el-input v-model="formCompon2.url" placeholder="请输入友链链接"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="dialog-footer" style="width: 100%;margin-left: 50%">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="dialogVisible=false">确定</el-button>
      </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--修改页面名称弹框-->
  </div>
</template>

<script>
  import Sortable from 'sortablejs'
  import host from '../config/host'
  import fileUtil from '../config/fileUtil'
  export default {
    name: "information",
    data() {
      return {
        host:host,
        imageUrl:'',
        showDel:false,
        dialogTitle:'',
        radio:'显示',
        formCompon:{
          name : '',
        },
        formCompon2:{
          name : '',
          url:''
        },
        dialogVisible:false,
        dialogVisible2:false,
        dialogVisible3:false,
        page:1,
        pageSize:10,
        activeShow:0,
        filters: {
          name: ''
        },
        sels:[],
        listLoading:false,
        activeName: 'navigation',
        informationList:['首页','模板','教程中心','案例','关于我们'],
        tableData: [
          {
            id: '1',
            name:'首页',
            url:'www.xxxx.com',
            isShow:'显示'
          },
          {
            id: '2',
            name:'模板',
            url:'www.yyyy.com',
            isShow:'显示'
          },
          {
            id: '3',
            name:'教程中心',
            url:'www.zzzz.com',
            isShow:'隐藏'
          },
          {
            id: '4',
            name:'案例',
            url:'www.bbbb.com',
            isShow:'显示'
          },
          {
            id: '5',
            name:'关于我们',
            url:'www.ssss.com',
            isShow:'显示'
          }
        ],
        tableData2: [
          {
            id: '1',
            name:'中国移动网',
            url:'www.xxxx.com',
            isShow:'显示'
          },
          {
            id: '2',
            name:'中国移动网',
            url:'www.yyyy.com',
            isShow:'显示'
          },
          {
            id: '3',
            name:'中国移动网',
            url:'www.zzzz.com',
            isShow:'隐藏'
          },
          {
            id: '4',
            name:'中国移动网',
            url:'www.bbbb.com',
            isShow:'显示'
          },
          {
            id: '5',
            name:'中国移动网',
            url:'www.ssss.com',
            isShow:'显示'
          }
        ],
      }
    },
    mounted() {
      this.rowDrop()
      this.rowDrop2()
    },
    methods: {
      //清空查询
      resetForm(){
        this.dialogVisible = false
        this.$refs['formCompon2'].resetFields();
      },
      editName(data){
        this.dialogVisible2 = true
        this.formCompon.name = data.name
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //切换目录
      btnType(i){
        this.activeShow = i
      },
      informationAdd(){
        this.$router.push({
          path:'/informationAdd',
          query:{text:'新增information',pageId:1}
        })
      },
      dialogUrl(val,data){
        switch (val){
          case 'add':
            this.formCompon2.name = ''
            this.formCompon2.url = ''
            this.dialogVisible = true
            this.dialogTitle = '新增友情链接'
            break
          case 'edit':
            this.dialogVisible = true
            this.dialogTitle = '编辑友情链接'
            this.formCompon2.name = data.name
            this.formCompon2.url = data.url
            break
        }

      },
      //编辑底部
      editBanner(data){

      },
      //删除底部链接
      handleDel(data){

      },
      //管理information
      manageinformation(index,row){

      },
      //编辑information
      editinformation(index,row){

      },
      //当前页码
      handleCurrentChange(val) {
        this.page = val;
        this.getComponList();
      },
      //当前条数
      handleSizeChange(val) {
        this.pageSize = val;
        this.getComponList();
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
          this.suite.imageUrl = file.response;
        }else {
          this.suite.imageUrl = URL.createObjectURL(file.raw);
        }
        let oV1 =  document.getElementsByClassName('el-upload__input')
        oV1[0].disabled=true
      },
      //行拖拽
      rowDrop() {
        const tbody = document.querySelector('.table .el-table__body-wrapper tbody')
        const _this = this
        Sortable.create(tbody, {
          onEnd({ newIndex, oldIndex }) {
            const currRow = _this.tableData.splice(oldIndex, 1)[0]
            _this.tableData.splice(newIndex, 0, currRow)
          }
        })
      },
      //行拖拽
      rowDrop2() {
        const tbody = document.querySelector('.table2 .el-table__body-wrapper tbody')
        const _this = this
        Sortable.create(tbody, {
          onEnd({ newIndex, oldIndex }) {
            const currRow = _this.tableData2.splice(oldIndex, 1)[0]
            _this.tableData2.splice(newIndex, 0, currRow)
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .information {
    margin-top: 10px;
    /*display: flex;*/
    .information-left{
      width: 15vw;
      height: calc(100vh - 160px);
      box-shadow: 0 0 10px #cccccc;
      margin-right: 20px;
      white-space: nowrap;
      padding: 30px;
      div{
        cursor: pointer;
        padding: 12px 30px;
        cursor: pointer;
        &:hover{
          background-color: #409EFF;
          color: white;
        }
      }
      .information-left-show{
        background-color: #409EFF;
        color: white;
      }
    }
    .toolbar{
      margin-bottom: 10px;
      text-align: right;
    }
    .pagination{
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
  .information-box {
    margin-top: 10px;
    margin-bottom: 10px;
    .el-table {
      height: auto !important;
    }
    th {
      background: #add4ff;
      color: white;
    }
    .icon-edit{
      font-size: 18px;
      cursor: pointer;
    }
  }
  .drag{
    font-size: 24px;
    cursor: pointer;
  }
</style>
<style lang="scss">
  .information{
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
    .el-dialog--center .el-dialog__body {
      text-align: initial;
      padding: 0 20px;
    }
    .el-tabs__item {
      padding: 0 20px;
      height: 40px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      line-height: 40px;
      display: inline-block;
      list-style: none;
      font-size: 18px;
      font-weight: 500;
      color: #303133;
      position: relative;
    }
    .el-form--inline .el-form-item {
      display: inline-block;
      margin-right: 10px;
      vertical-align: top;
      width: 100%;
    }
    .el-form--inline .el-form-item__content {
      display: inline-block;
      vertical-align: top;
      width: 60%;
    }
  }
</style>
