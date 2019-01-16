<template>
  <div class="compent">
    <div v-if="componShow">
      <div class="compent-head">
        <div class="compent-head-type">
          <span>组件类型:</span>
          <div class="compent-head-btn" :class="{'active':btnShow==i}" @click="btnType(i)" v-for="(x,i) in btnList" :key="i">{{x}}</div>
        </div>
        <div class="compent-head-class">
          <span>组件分类:</span>
          <el-input></el-input>
          <el-button type="primary" size="small">查询</el-button>
          <el-button type="primary" size="small">批量删除</el-button>
          <el-button type="primary" size="small" @click="addComponClass">新增组件分类</el-button>
          <el-button type="primary" size="small" @click="addComponent">新增组件</el-button>
        </div>
      </div>
      <div class="compent-box">
        <el-table :data="tableData3" height="250" border style="width: 100%" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="name" label="组件分类" width="180" align="center">
          </el-table-column>
          <el-table-column prop="address" label="组件类型" align="center">
          </el-table-column>
          <el-table-column prop="date" label="组件个数" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="manageCompon">管理</el-button>
              <el-button type="text" @click="editCompon">编辑</el-button>
              <el-button type="text" @click="delCompon">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <componentEditor v-else @back="back"></componentEditor>
    <el-dialog :title="componTitle" :visible.sync="dialogVisible" width="500px">
      <div class="el-componClass" v-show="editShow">
        <el-form :inline="true" :model="formCompon" class="demo-form-inline" ref="formCompon">
          <el-form-item label="组件分类名称:" prop="name" :rules="[{required: true, message: '分类名称不能为空'}]">
            <el-input v-model="formCompon.name" :placeholder="dialogText"></el-input>
          </el-form-item>
          <div class="el-componClass-item">
            <span class="warFater">组件类型：<i class="war-ico">*</i></span>
            <span :class="{'activeClass':classBtn==1}" @click="classBtn=1">基础组件</span>
            <span :class="{'activeClass':classBtn==2}" @click="classBtn=2">其他组件</span>
          </div>
        </el-form>
      </div>

      <div class="el-componAdd" v-show="addShow">
        <el-form :inline="true" class="demo-form-inline" ref="formAdd" :model="formAdd">
          <el-form-item label="选择组件分类:" prop="selectText" :rules="[{required: true,message: '组件分类不能为空'}]">
            <el-select v-model="formAdd.selectText" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="addCom">
            <span class="addCom-title warFater">组件类型：<i class="war-ico">*</i></span>
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" list-type="text">
              <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
          </div>
        </el-form>
      </div>
      <div class="el-componClassBtn">
        <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="saveCompon" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import componentEditor from './componentEditor'
  export default {
    name: 'manageComponent',
    data() {
      return {
        formAdd: {
          selectText: ''
        },
        btnShow: '',
        componTitle: '',
        componShow: true,
        classBtn: 1,
        dialogVisible: false,
        dialogStu: '',
        dialogText: '',
        editShow: true,
        addShow: false,
        value: '',
        fileList: '',
        formCompon: {
          name: ''
        },
        btnList: ['全部', '常用组件', '基础组件', '其他组件'],
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
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
    watch:{
    	  dialogVisible:function(val){
    	  	 if(!val){
    	  	 	this.resetForm()
    	  	 }
    	  }
    },
    components: {
      componentEditor
    },
    methods: {
    	//重置验证
    	  resetForm() {
        this.$refs['formCompon'].resetFields();
        this.$refs['formAdd'].resetFields();
      },
      //组件类型
      btnType(i) {
        this.btnShow = i
      },
      //清除
      clear(){
      	this.formCompon.name = ''
      	this.formAdd.selectText = ''
      },
      //编辑
      editCompon() {
      	this.clear()
        this.dialogVisible = true
        this.editShow = true
        this.addShow = false
        this.componTitle = '编辑组件分类'
        this.dialogStu = 'edit'
        this.dialogText = '导航'
      },
      //删除
      delCompon() {
        this.dialogVisible = true
        this.componTitle = '删除组件分类后将不可恢复，确定删除吗？'
        this.dialogStu = 'del'
        this.editShow = false
        this.addShow = false
      },
      //管理
      manageCompon() {
        this.componShow = false
        this.$router.push({
          path: '/manageComponent',
          query: {
            text: 'componEdit'
          }
        })
      },
      //后退
      back() {
        this.componShow = true
      },
      //check 选择
      handleSelectionChange(res) {
        console.log(res)
      },
      //新增组件分类
      addComponClass() {
      	this.clear()
        this.dialogVisible = true
        this.editShow = true
        this.addShow = false
        this.componTitle = '新增组件分类'
        this.dialogStu = 'addClass'
        this.dialogText = '不超过4个字符'
      },
      //新增组件
      addComponent() {
      	this.clear()
        this.dialogVisible = true
        this.editShow = false
        this.addShow = true
        this.componTitle = '新增组件'
        this.dialogStu = 'addCom'
      },
      //保存
      saveCompon() {
        switch(this.dialogStu) {
          case 'addClass':
            console.log('新增分类')
            break;
          case 'addCom':
            console.log('新增组件')
            console.log(this.formAdd.selectText)
            break;
          case 'edit':
            console.log('编辑')
            break;
          case 'del':
            console.log('删除')
            break;
        }
      }
    }
  }
</script>

<style lang="less">
  .compent-head {
    margin-top: 10px;
    .compent-head-class {
      align-items: center;
      display: flex;
      .el-input {
        width: 300px;
        margin: 0 10px 0 10px;
      }
    }
    .compent-head-type {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .compent-head-btn {
        padding: 5px 12px 5px 12px;
        font-size: 14px;
        margin-left: 10px;
        cursor: pointer;
      }
      .active {
        border-radius: 4px;
        color: white;
        background: #409eff;
      }
    }
  }
  .addCom {
    display: flex;
    height: 60px;
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
  
  .el-componClass-item {
    height: 60px;
    span {
      display: inline-block;
      width: 80px;
      padding: 5px 0 5px 0;
      text-align: center;
      cursor: pointer;
    }
    .activeClass {
      border-radius: 4px;
      color: white;
      background: #409eff;
    }
  }
  
  
  .el-componClassBtn {
    display: flex;
    justify-content: center;
  }
  
  .compent-box {
    margin-top: 10px;
    margin-bottom: 10px;
    .el-table {
      height: auto !important;
    }
    th {
      background: #add4ff;
      color: white;
    }
  }
  .warFater {
    position: relative;
    width: 110px !important;
    text-align: end !important;
    cursor: default !important;
    .war-ico {
      color: red;
      position: absolute;
      top: 0;
      left: 25px;
    }
  }
</style>