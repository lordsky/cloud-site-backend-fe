<template>
  <div class="workers-manage">
    <div class="workers-left">
      <el-input placeholder="通过关键词过滤" @keyup.enter.native="searchWorks" v-model="worksText"></el-input>
      <el-tree :data="departmentList" :props="defaultProps" @node-click="handleNodeClick" @node-contextmenu="rightClick" :highlight-current="true"  ref="tree" node-key="id" :default-expanded-keys="treeArr"></el-tree>
      <!--鼠标右键菜单栏-->
      <div v-show="menuVisible">
        <ul id="menu" class="menu">
          <li class="menu__item" @click="renameList">重命名</li>
          <li class="menu__item" @click="addRole">添加成员</li>
          <li class="menu__item" @click="createList">创建子部门</li>
          <li class="menu__item" @click="delList">删除部门</li>
        </ul>
      </div>
    </div>
    <div class="workers-right">
      <el-button type="primary" class="addWorkers" @click="addRole">添加成员</el-button>
      <el-table :data="tableData" style="width: 99%" border>
        <el-table-column prop="username" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center">
        </el-table-column>
        <el-table-column prop="roleName" label="角色" align="center">
        </el-table-column>
        <el-table-column prop="positions" label="部门" align="center">
        </el-table-column>
        <el-table-column prop="positions" label="职位" align="center">
        </el-table-column>
        <el-table-column prop="address" label="操作" width="180" align="center">
           <template slot-scope="scope">
           	  <el-button type="text" @click="editorRole(scope.row)">编辑</el-button>
           	   <!--<el-button type="text" @click="resetPassword">重置密码</el-button>-->
           	    <el-button type="text" @click="deleteRole(scope.row)">删除</el-button>
           </template>
        </el-table-column>
      </el-table>
       <div class="paging">   	 
   <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="totalPage">
    </el-pagination>
    </div>
    </div>
    <!--弹框表单-->
    <el-dialog :title="titleDialog" :visible.sync="dialogFormVisible" width="500px">
      <el-form label-width="100px" :model="formText" :rules="rules" ref="ruleForm">
        <el-form-item label="姓名:" prop="username">
          <el-input placeholder="请输入姓名" v-model="formText.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-input placeholder="请输入手机号" v-model="formText.phone" @blur="checkPhone(formText.phone)"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input placeholder="请输入邮箱" v-model="formText.email"></el-input>
        </el-form-item>
        <el-form-item label="密码:" v-show="editShow" prop="pwd">
          <el-input placeholder="请输入密码" v-model="formText.pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" v-show="editShow" prop="pwdTwo">
          <el-input placeholder="请确认密码" v-model="formText.pwdTwo"></el-input>
        </el-form-item>
        <el-form-item label="角色:">
            <el-select v-model="formText.roleId" placeholder="请选择">
			    <el-option
			      v-for="item in roleList"
			      :key="item.roleMenuid"
			      :label="item.roleName"
			      :value="item.roleMenuid">
			    </el-option>
			  </el-select>
        </el-form-item>
        <el-form-item label="部门:">
          <el-cascader
			  :options="departmentList"
			  v-model="formText.deptId"
			  :props="departmentProps"
			  :show-all-levels="false"
			></el-cascader>
        </el-form-item>
        <el-form-item label="职位:" prop="positions">
          <el-input placeholder="请输入职位" v-model="formText.positions"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="saveWorks">确 定</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
  export default {
    name: "workersManage",
    data() {
    	  const PHONE_REG = /^1[345678]\d{9}$/
      let validatePhone = (rule, value, callback) => {
        if(value === "") {
          callback(new Error("请输入手机号"));
        } else if(!PHONE_REG.test(value)) {
          callback(new Error("请输入正确的手机号!"));
        } else {
          callback();
        }
      }
      return {
        departmentList: [],
        defaultProps: {
          children: 'list',
          label: 'departmentName'
        },
        treeArr:[],
        worksListInfo:{},
        worksInfo:{},
        formText:{},
        pageSize:10,
        titleDialog:'添加成员',
        tableData: [],
        menuVisible: false,
        dialogFormVisible: false,
        editShow:true,
        totalPage:0,
        pageSize:10,
        currentPage:0,
        value:'',
        departmentProps:{
        	   label:'departmentName',
        	   value:'id',
        	   children:'list'
        },
        roleList:[],
        treeInfo:{},
        worksText:'',
       rules:{
      	username: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          phone: [
             {validator: validatePhone, trigger: "blur"},
             { required: true,message: '请输入手机号', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          pwdTwo: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
          ],
          positions: [
            { required: true, message: '请输入职位', trigger: 'blur' },
          ],
      }
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
        this.treeInfo = object
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
      //检查电话
      checkPhone(val){
      	this.$http.post(this.$API.checkPhone+'?account='+val,{
      	},response=>{
      		console.log(response)
      	})
      },
      //取消保存
      cancelForm(){
      	if(this.titleDialog=='添加成员'){
      	    this.formText = {}
      	}
      	this.$refs['ruleForm'].resetFields();
      	this.dialogFormVisible = false
      },
      //重命名
      renameList(){
      	this.$prompt('部门名称：', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
           this.$http.post(this.$API.setWorksTree,{
           	departmentName:value,
           	id:this.treeInfo.id,
           	parentId:this.treeInfo.parentId
           },response=>{
//         	console.log(response)
           	response.data.code==200?(this.$message({type:'success',message:'设置成功'}),this.getWorksList()):''
           })
        }).catch(() => {
              
        });
      },
      //创建部门
      createList(){
      	this.$prompt('部门名称：', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
           this.$http.post(this.$API.addWorksTree,{
           	departmentName:value,
           	id:'',
           	parentId:this.treeInfo.id
           },response=>{
//         	console.log(response)
           	response.data.code==200?(this.$message({type:'success',message:'设置成功'}),this.getWorksList()):''
           })
        }).catch(() => {
               
        });
      },
      //删除部门
      delList(){
      	 console.log(this.treeInfo)
      	 this.$confirm('确定删除该部门吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.post(this.$API.delWorksTree,{
              departmentName:this.treeInfo.departmentName,
              id: this.treeInfo.id,
   			  parentId: this.treeInfo.parentId
           },response=>{
           	console.log(response)
           })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //搜索
      searchWorks(){
      	this.getWorksList(this.worksText)
      },
      //树点击
      handleNodeClick(val) {
          console.log(val)
          this.worksListInfo = val
          this.getWorksTable(val.id)
      },
      //分页
      handleCurrentChange(val){
      	this.getWorksTable(this.worksListInfo.id,val)
      },
      //删除
      deleteRole(val){
      	this.$confirm('确定要删除该部门吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
         
        }).then(() => {
        	  this.$http.post(this.$API.delWorksList,
        	  	val.id
        	  ,response=>{
        	  	 console.log(this.formText.deptId)
        	  	 response.data.code==200?(this.$message({ type: 'success',message: '删除成功!'}),this.getWorksTable(this.worksListInfo.id)):''
        	  })
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消删除'
          });          
        });
      },
      //获取树状列表
      getWorksList(val){
      	let data = {}
      	val?data.searchContext = val:''
      	this.$http.post(this.$API.getWorksList,data,response=>{
      		console.log('123123123123',response)
      		this.departmentList = response.data.data
      		this.treeArr.push(response.data.data[0].list[0].id)
      	})
      },
      //获取员工表格
      getWorksTable(id,num){
      	let pageNum = num?num:1
      	this.$http.post(this.$API.getWorksTable,{
      		deptId:id,
      		pageNum:pageNum,
      		pageSize:this.pageSize
      	},response=>{
      		console.log(response)
      		this.tableData = response.data.data.content
//    		this.totalPage = response.data.data.totalElements
      	})
      },
      //添加成员
      addWorksRequest(){
      	let data = this.formText
      	let index = data.deptId.length - 1
      	let id = data.deptId[index]
      	delete data.pwdTwo
      	delete data.deptId
      	data.deptId = id
      	this.$http.post(this.$API.addWorks,data,response=>{
      		console.log(response)
      	})
      },
      //编辑成员
      setWorksRequest(){
      	let data = this.formText
      	let index = data.deptId.length - 1
      	let id = data.deptId[index]
      	delete data.pwd
      	delete data.pwdTwo
      	delete data.deptId
        data.deptId = id
      	console.log(data)
      	this.$http.post(this.$API.setWorks,data,response=>{
      		console.log(response)
//    		response.data.code==200?(this.$message({type:'success',message:'编辑成功'}),this.dialogFormVisible = false,this.tableData=[]):''
      	})
      },
      //编辑
      editorRole(val){
      	this.worksInfo = val
        delete val.deptId
        this.formText = val
      	this.editShow = false
      	this.titleDialog = '编辑成员'
      	this.dialogFormVisible = true
      	this.formText.pwd = '123'
      	this.formText.pwdTwo = '123'
      },
      //添加成员
      addRole(){
      	this.dialogFormVisible = true
      	this.editShow = true
      	this.titleDialog = '添加成员'
      	this.formText = {}
      },
      //获取角色列表
      	getList(){
	    		this.$http.get(this.$API.showMenu,response=>{
	    			console.log('角色列表',response)
	    			this.roleList = response.data.data
	    		})
	    	},
      //保存成员
      saveWorks(){
      	 if(!this.formText.roleId)return this.$message({type:'warning',message:'请选择角色'})
      	 if(!this.formText.deptId)return this.$message({type:'warning',message:'请选择部门'})
      	 this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if(this.editShow){
      	 		this.addWorksRequest()
	      	 }else{
	      	 	this.setWorksRequest()
	      	 }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created(){
    	   this.getWorksList()
//  	   this.getWorksTable()
    	   this.getList()
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
      width: 250px;
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
      .paging{
      	margin: 20px 0 20px 0;
      }
    }
    .menu__item {
      display: block;
      line-height: 20px;
      text-align: center;
      margin-top: 10px;
    }
    .menu {
      height: 130px;
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