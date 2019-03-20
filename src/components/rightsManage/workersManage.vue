<template>
  <div class="workers-manage">
    <div class="workers-left">
      <el-input v-model="value" placeholder="通过关键词过滤"></el-input>
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" @node-contextmenu="rightClick" :highlight-current="true"></el-tree>
      <!--鼠标右键菜单栏-->
      <div v-show="menuVisible">
        <ul id="menu" class="menu">
          <li class="menu__item" @click="editorRole">编辑</li>
          <li class="menu__item" @click="resetPassword">重置密码</li>
          <li class="menu__item" @click="deleteRole">删除</li>
        </ul>
      </div>
    </div>
    <div class="workers-right">
      <el-button type="primary" class="addWorkers" @click="addRole">添加成员</el-button>
      <el-table :data="tableData" style="width: 99%" border>
        <el-table-column prop="date" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="name" label="手机号" align="center">
        </el-table-column>
        <el-table-column prop="name" label="邮箱" align="center">
        </el-table-column>
        <el-table-column prop="name" label="角色" align="center">
        </el-table-column>
        <el-table-column prop="name" label="部门" align="center">
        </el-table-column>
        <el-table-column prop="name" label="职位" align="center">
        </el-table-column>
        <el-table-column prop="address" label="操作" width="180" align="center">
           <template slot-scope="scope">
           	  <el-button type="text" @click="editorRole">编辑</el-button>
           	   <el-button type="text" @click="resetPassword">重置密码</el-button>
           	    <el-button type="text" @click="deleteRole">删除</el-button>
           </template>
        </el-table-column>
      </el-table>
    </div>
    <!--弹框表单-->
    <el-dialog title="添加成员" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px">
        <el-form-item label="姓名:">
          <el-input placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码:" v-show="editShow">
          <el-input placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" v-show="editShow">
          <el-input placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="角色:">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门:">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位:">
          <el-input placeholder="请输入职位"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "workersManage",
    data() {
      return {
        data: [{
          label: '中国移动集团总部',
          children: [{
            label: '中国移动企业客户',
            children: [{
              label: '产品部门'
            }]
          }]
        }, {
          label: '中国移动集团总部',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: ' 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: ' 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: ' 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: ' 1516 弄'
        }],
        menuVisible: false,
        dialogFormVisible: false,
        editShow:true,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value:''
      }
    },
    methods: {
    	// 树右键点击
      rightClick(MouseEvent, object, Node, element) { // 鼠标右击触发事件
        this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
        this.menuVisible = true  // 显示模态窗口，跳出自定义菜单栏
        let menu = document.querySelector('#menu') 
        menu.style.left = MouseEvent.clientX - 220 + 'px'
        document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
        menu.style.top = MouseEvent.clientY - 150 + 'px'
        console.log(object)
      },
     
     foo() { // 取消鼠标监听事件 菜单栏
        this.menuVisible = false
        document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
      },
      //重置密码
      resetPassword(){
      	this.$confirm('确定要重置密码吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消删除'
          });          
        });
      },
      //树点击
      handleNodeClick(val) {
          console.log(val)
      },
      //删除
      deleteRole(){
      	this.$confirm('确定要删除该部门吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
         
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消删除'
          });          
        });
      },
      //编辑
      editorRole(){
      	this.editShow = false
      	this.dialogFormVisible = true
      },
      //添加成员
      addRole(){
      	this.dialogFormVisible = true
      }
    }
  }
</script>

<style lang="less">
  .workers-manage {
    width: 100%;
    min-height: 80vh;
    margin-top: 20px;
    border: #F2F2F2 solid 1px;
    display: flex;
    .workers-left {
      width: 200px;
      border-right: #F2F2F2 solid 1px;
    .el-tree-node__content{
      height: 40px;
    }
    .el-tree-node.is-current>.el-tree-node__content{
    	   background-color: #409EFF;
      color: white;
    }
    .el-tree-node__content:hover {
      background-color: #409EFF;
      color: white;
    }
      .el-input {
        padding: 30px 15px 30px 15px;
      }
    }
    .workers-right {
      flex: 1;
      padding: 30px 0 0 20px;
      .addWorkers {
        margin-bottom: 30px;
      }
    }
    .menu__item {
      display: block;
      line-height: 20px;
      text-align: center;
      margin-top: 10px;
    }
    .menu {
      height: 100px;
      width: 100px;
      position: absolute;
      border-radius: 10px;
      z-index: 999;
      border: 1px solid #999999;
      background-color: #f4f4f4;
      cursor: pointer;
    }
    li:hover {
      background-color: #1790ff;
      color: white;
    }
  }
</style>