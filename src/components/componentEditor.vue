<template>
  <div class="componentEditor">
    <div class="compon-edit-head">
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" @click="backCompon">返回</el-button>
    </div>
    <div class="compon-edit-box">
      <p>组件个数 ：{{comItem.length}}</p>
      <div class="compon-edit-add">
        <div class="compon-edit-add-btn" @click="addCompon">
          <i class="el-icon-circle-plus-outline"></i><span>新增组件</span>
        </div>
      </div>
      <div class="compon-edit-list">
        <ul>
          <li v-for="(x,i) in comItem"  :key="i" >
          	<div :class="{'delItem':delShow==i}" class="mask-compon"><i class="el-icon-delete compon-edit-ico" :class="{'icoShow':delShow==i}" @click="delComponent(x)"></i></div>
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
            <span class="el-componAdd-update-title">上传文件：</span>
            <a href="javascript:void(0);" class="upload-text">选择文件<input name="file" type="file" ref="file" @change="uploadText"></a>
            <span class="upload-prompt">{{this.textData.name?this.textData.name:'未选择文件'}}</span>
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
  export default {
    name: 'componentEditor',
    data() {
      return {
        delShow: null,
        dialogAdd: false,
        
        options: {},
        comItem: [],
        comList: {},
        textData: ''
      }
    },
    created() {
      this.options = this.$route.query.msg 
      this.update()
    },
    methods: {
    	  update(){
    	  	this.$http.get(this.$API.componentList+'?catId='+this.$route.query.msg.id,(res)=>{
      		console.log(res)
      		if(res.data.code==200){
      			this.comItem = res.data.data
      		}
      	})
    	  },
      saveCompon() {
        if(this.value === '' || this.textData === '') return
        let formData = new FormData();
        console.log(this.textData)
        formData.append('file', this.textData);
        formData.append('catExt', '11');
        formData.append('catId', this.options.id);
        this.$http.post(this.$API.componentAdd, formData, (res) => {
          console.log(res)
          this.update()
          this.dialogAdd = false
          if(res.data.data){
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
        var file = e.target.files[0]
        this.textData = file
      },
      //删除组件
      delComponent(val) {
        this.$confirm('是否删除该组件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	  console.log(val)
        	  this.$http.delete(this.$API.componentDel+val.id,{},(res)=>{
        	  	 console.log(res)
        	  	 if(res.data.data){
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
      ul {
        width: 95%;
        margin: 0 auto;
        li {
          /*height: 65px;*/
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
    }
    .el-dialog-componAdd-update {
      height: 60px;
      display: flex;
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
    .mask-compon{
    	  position: absolute;
    	  top: 0;
    	  width: 100%;
    	  height: 100%;
    	  background: rgba(0,0,0,0.3);
    	  z-index: 100;
    	  display: none;
    	  justify-content: center;
    	  align-items: center;
    }
    .delItem {
      display: flex;
      
    }
  }
</style>