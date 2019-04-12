<template>
  <div class="componentEditor">
    <div class="compon-edit-head">
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" @click="backCompon">返回</el-button>
    </div>
    <div class="compon-edit-box">
      <p>组件个数 ：{{comItem.length}}
      <div class="compon-edit-seek">
        <span>查询组件：</span>
        <el-input type="text" placeholder="输入组件名称" v-model="queryItem" />
        <el-button type="primary" size="small" @click="queryComponent" >查询</el-button>
      </div>
      </p>
      <div class="compon-edit-add">
        <div class="compon-edit-add-btn" @click="addCompon">
          <i class="el-icon-circle-plus-outline"></i><span>新增组件</span>
        </div>
      </div>
      <div class="compon-edit-list">
        <ul class="compon-edit-box">
          <li v-for="(x,i) in comItem" :key="i" @mouseleave="delShow = null" @mousemove="delShow = i" class="compon-edit-item">
            <p class="compon-name">组件名称:{{x.name}}</p>
            <div :class="{'delItem':delShow==i}" class="mask-compon">
              <i class="el-icon-view compon-edit-ico" :class="{'icoShow':delShow==i}" @click="lookComponent(x)"></i>
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':delShow==i}" @click="editComponent(x)"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':delShow==i}" @click="delComponent(x)"></i>
              <i class="el-icon-edit compon-edit-ico" :class="{'icoShow':delShow==i}" @click="SetComponent(x)"></i>
            </div>
            <div v-html="x.segmentCode"></div>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog :visible.sync="dialogAdd" width="500px">
      <div class="el-dialog-componAdd">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="选择组件分类：">
            <input type="text" :value="options.catName" disabled/>
          </el-form-item>
          <div class="el-dialog-componAdd-update">
            <span class="el-componAdd-update-title">组件名称：</span>
            <el-input type="text" class="addCom_input" v-model="componentName" placeholder="请输入组件名称" />
          </div>
          <div class="el-dialog-componAdd-update">
            <span class="el-componAdd-update-title">上传文件：</span>
            <a href="javascript:void(0);" class="upload-text">选择文件<input name="file" type="file" ref="file" @change="uploadText"></a>
            <span class="upload-prompt">{{this.textData.name?this.textData.name:'未选择文件.txt格式文件'}}</span>
          </div>
          <div class="el-dialog-componAdd-update">
            <span class="addCom-title warFater">上传缩略图：</span>
            <el-upload
              class="upload-demo"
              :action="host.hostUrl+'/common/upload'"
              :on-success="handlePreview"
              :on-remove="handleRemove"
            >
              <el-button size="small" type="primary">选择图片</el-button>
            </el-upload>
          </div>
        </el-form>
      </div>
      <div class="el-dialog-componAdd-btn">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="saveCompon">保存</el-button>
      </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import host from '../config/host'
  import Swiper from 'swiper';

  export default {
    name: 'componentEditor',
    data() {
      return {
        delShow: null,
        dialogAdd: false,
        options: {},
        comItem: [],
        comList: {},
        textData: '',
        componentName: '',
        queryItem: '',
        host:host,
        thumb:'',
        childId:''
      }
    },
    created() {
      let id = JSON.parse(this.$route.query.item)
      this.options.id = id
      this.options.catName = this.$route.query.text
      this.update()
    },
    mounted(){
    },
    methods: {
      //上传缩略图
      handlePreview(file) {
        console.log(file);
        this.thumb = file
      },
      //删除图片
      handleRemove(file, fileList) {
        this.thumb = ''

      },
      //修改名字
      SetComponent(val){
        this.dialogAdd = true
        this.childId = val.id
        this.componentName = ''
        this.textData = ''
      },
      //查看组件
      lookComponent(item){
        window.localStorage.setItem('saveTemplateCode',item.segmentCode)
        this.$router.push({path:'/PreviewTemplate'})
      },
      //编辑组件
      editComponent(item){
        window.location.href = host.editorUrl+'?catId='+item.id+'&name='+item.name+'&type=componentEditor'
      },
      //查询组件
      queryComponent() {
        this.$http.get(this.$API.componentList + '?catId=' + this.options.id + '&name=' + this.queryItem, (res) => {
          console.log(res)
          if(res.data.code == 200) {
            if(res.data.data.length == 0) {
              this.$message({
                type: 'warning',
                message: '没有搜索到该组件!'
              });
            }
            this.comItem = res.data.data
          }
        })
      },
      //更新组件列表
      update() {
        this.$http.get(this.$API.componentList + '?catId=' + this.options.id, (res) => {
          console.log(res)
          if(res.data.code == 200) {
            this.comItem = res.data.data
            this.childId = ''
          }
        })
      },
      //保存组件
      saveCompon() {
        if(this.componentName === ''){
          this.$message.error('请填写文件名称')
          return
        }
        if(!this.childId){
          if(this.textData===''){
            this.$message.error('请上传文件')
            return
          }
        }
        let formData = new FormData();
        console.log(this.textData)
        !this.childId?formData.append('file', this.textData):''
        formData.append('catExt', '1');
        formData.append('name', this.componentName);
        formData.append('catId', this.options.id);
        formData.append('thumb', this.thumb);
        this.childId?formData.append('id', this.childId):''
        this.$http.post(this.$API.componentAdd, formData, (res) => {
          console.log(res)
          this.update()
          this.dialogAdd = false
          if(res.data.data) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          }
        }, {
          "Content-Type": "multipart/form-data"
        })
      },
      uploadText(e) {
        let file = e.target.files[0]
        if(file.type !== 'text/plain') {
          return this.$message.error('文件类型不对，请上传.txt文件格式')
        }
        this.textData = file
      },
      //删除组件
      delComponent(val) {
        this.$confirm('是否删除该组件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(this.$API.delItems, {
            params: {
              componentId: val.id
            }
          }, (res) => {
            this.update()
            if(res.data.data) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //新增组件
      addCompon() {
        this.dialogAdd = true
        this.componentName = ''
        this.textData = ''
      },
      //返回
      backCompon() {
        this.$router.push({
          path: '/manageComponent'
        })
      }
    }
  }
</script>

<style lang="less">
  .componentEditor {
    .compon-edit-head {
      button {
        font-size: 16px;
      }
    }
    .demo-form-inline {
      input {
        padding: 10px 0 10px 0;
        font-size: 15px;
      }
    }
    .compon-edit-box {
      p {
        margin: 10px 0 10px 0;
        font-weight: 600;
        font-size: 20px;
      }
    }
    .compon-edit-add {
      width: 100%;
      background: #f2f2f2;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      .compon-edit-add-btn {
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
    .compon-edit-list {
      border: 1px #ccc solid;
      margin: 10px 0 10px 0;
      .compon-edit-box {
        width: 95%;
        margin: 0 auto;
        .compon-edit-item {
          border: 1px #cccccc solid;
          list-style: none;
          margin: 10px 0 10px 0;
          position: relative;
          overflow: hidden;
          .compon-edit-ico {
            display: none;
            font-size: 2vw;
            color: white;
            cursor: pointer;
            padding-left: 20px;
          }
          .icoShow {
            display: block;
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
      .upload-prompt{
        width: 120px;
        height: 30px;
        overflow: hidden;
      }
      .el-button{
        height: 30px;
        width: 100px;
        background:#00b3ee ;
        border-radius: 4px;
      }
      .addCom_input {
        width: 171px;
      }
      .upload-demo {
        display: flex;
        ul {
          margin-left: 10px;
          width: 120px;
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
    .mask-compon {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      display: none;
      justify-content: center;
      align-items: center;
    }
    .delItem {
      display: flex;
      z-index: 999;
    }
    .compon-edit-seek {
      display: flex;
      align-items: center;
      width: 450px;
      span {
        width: 120px;
      }
      button {
        margin-left: 10px;
      }
    }
    .compon-name {
      color: black;
    }
  }
</style>
