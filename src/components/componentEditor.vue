<template>
  <div class="componentEditor">
    <div class="compon-edit-head">
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" @click="backCompon">返回</el-button>
    </div>
    <div class="compon-edit-box">
      <p>组件个数 ：7</p>
      <div class="compon-edit-add">
        <div class="compon-edit-add-btn" @click="addCompon">
          <i class="el-icon-circle-plus-outline"></i><span>新增组件</span>
        </div>
      </div>
      <div class="compon-edit-list">
        <ul>
          <li v-for="(x,i) in 10" :class="{'delItem':delShow==i}" @mousemove="delShow = i" @mouseleave="delShow=null">
            <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':delShow==i}" @click="delComponent"></i></li>
        </ul>
      </div>
    </div>
    <el-dialog :visible.sync="dialogAdd" width="500px">
      <div class="el-dialog-componAdd">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="选择组件分类：">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="el-dialog-componAdd-update">
            <span class="el-componAdd-update-title">上传文件：</span>
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" list-type="text">
              <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
          </div>
        </el-form>
      </div>
      <div class="el-dialog-componAdd-btn">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="dialogAdd = false">保存</el-button>
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
        value: '',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      }
    },
    methods: {
      //删除组件
      delComponent() {
        this.$confirm('是否删除该组件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
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
          height: 65px;
          border: 1px #cccccc solid;
          list-style: none;
          margin: 10px 0 10px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          .compon-edit-ico {
            display: none;
            font-size: 30px;
          }
          .icoShow {
            display: block;
          }
        }
      }
    }
    .delItem {
      background: rgba(0, 0, 0, 0.3);
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
  }
</style>