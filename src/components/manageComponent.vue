<template>
  <div class="compent">
   
      <div class="compent-head">
        <div class="compent-head-type">
       <span>组件类型:</span>
          <div class="compent-head-btn" :class="{'active':btnShow==i}" @click="btnType(i)" v-for="(x,i) in btnList" :key="i">{{x}}</div>
        </div>
        <div class="compent-head-class">
          <span>组件分类:</span>
          <el-input placeholder="请输入组件分类名称" v-model="queryText"></el-input>
          <el-button type="primary" size="small" @click="queryList">查询</el-button>
          <el-button type="primary" size="small" @click="deleteAll">批量删除</el-button>
          <el-button type="primary" size="small" @click="addComponClass">新增组件分类</el-button>
          <el-button type="primary" size="small" @click="addComponent">新增组件</el-button>
        </div>
      </div>
      <div class="compent-box">
        <el-table :data="tableData3" border style="width: 100%;height: auto;" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column prop="catName" label="组件分类"  align="center">
          </el-table-column>
          <el-table-column prop="catExt" label="组件类型" align="center">
          	 <template slot-scope="scope">
          	 	<span>{{scope.row.catExt==1?'基础组件':'其他组件'}}</span>
          	 </template>
          </el-table-column>
          <el-table-column prop="catNum" label="组件个数"  align="center">
          </el-table-column>
          <el-table-column prop="date" label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="manageCompon(scope.row)">管理</el-button>
              <el-button type="text" @click="editCompon(scope.row)">编辑</el-button>
              <el-button type="text" @click="delCompon(scope.row)" v-show="scope.row.catNum==0">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
   <div class="paging">
   	<el-pagination
   	  background
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="pageAll">
    </el-pagination>
   </div>
    <el-dialog :title="componTitle" :visible.sync="dialogVisible" width="500px">
      <div class="el-componClass" v-show="editShow">
        <el-form :inline="true" :model="formCompon" class="demo-form-inline" ref="formCompon">
          <el-form-item label="组件分类名称:" prop="name" :rules="[{required: true, message: '分类名称不能为空'}]">
            <el-input v-model="formCompon.name" :placeholder="dialogText" maxlength="4" ></el-input>
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
          <el-form-item label="选择组件分类:" prop="selectId" :rules="[{required: true,message: '组件分类不能为空'}]">
            <el-select v-model="formAdd.selectId" placeholder="请选择">
              <el-option v-for="item in tableData3" :key="item.catName" :label="item.catName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="addCom">
            <span class="addCom-title warFater">组件类型：<i class="war-ico">*</i></span>
            	 <a href="javascript:void(0);" class="upload-text">选择文件
           	 <input name="file" type="file" ref="file" @change="uploadText"></a>
             <span class="upload-prompt">{{this.textData.name?this.textData.name:'未选择文件(.txt格式文件)'}}</span>
            <!--<span>(.txt格式文件)</span>-->
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
  import host from './config/host'
  import { Message } from 'element-ui';

  export default {
    name: 'manageComponent',
    data() {
      return {
        formAdd: {
          selectId: ''
        },
        btnShow: '',
        componTitle: '',
        classBtn: 1,//组件类型
        componentType:0,
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
        validationText:'',
        btnList: ['全部','基础组件','其他组件'],
        tableData3: [],
        list:{},
        host:host,
        textData:{},
        queryText:'',
        copyTable:{},
        delList:[],
        pageNum:1,
        pageSize:8,
        pageAll:0,
      }
    },
    watch: {
      dialogVisible: function(val) {
        if(!val) {
          this.resetForm()
        }
      }
    },
    created(){
    	   this.refreshTable()
    },
    components: {
      
    },
    methods: {
    	//分页
    handleCurrentChange(val) {
        this.pageNum = val
        this.queryList()
      },
    	//批量删除
    	 deleteAll(){
    	 	if(this.delList){
    	 		this.$http.post(this.$API.componentDel,{
    	 			   catIds:this.delList
			        },(res)=>{
			        	   if(res.data.data){
			        	   	  this.refreshTable('删除成功')
			        	   }
			        })
    	 	}
    	 },
    	  uploadText(e){
    	  	var file = e.target.files[0] 
    	  	this.textData = file
    	  	
    	  },
      //重置验证
      resetForm() {
        this.$refs['formCompon'].resetFields();
        this.$refs['formAdd'].resetFields();
        this.textData = ''
        // this.textData.name='未选择文件(.txt格式文件)'
      },
      //组件类型
      btnType(i) {
        this.btnShow = i
        this.componentType = i
      },
      //清除
      clear() {
        this.formCompon.name = ''
        this.formAdd.selectText = ''
      },
      //编辑
      editCompon(res) {
        this.clear()
        this.dialogVisible = true
        this.editShow = true
        this.addShow = false
        this.componTitle = '编辑组件分类'
        this.validationText = 'formCompon'
        this.dialogStu = 'edit'
        this.dialogText = res.catName
        this.list = res
      },
      //删除
      delCompon(res) {
        this.dialogVisible = true
        this.componTitle = '删除组件分类后将不可恢复，确定删除吗？'
        this.dialogStu = 'del'
        this.editShow = false
        this.addShow = false
        this.list = res
      },
      //管理
      manageCompon(res) {
      	this.$router.push({
		          path: '/componentEditor',
		          query:{text:res.catName,msg:res}
		        })
      },
      //check 选择
      handleSelectionChange(res) {
      	let arr = []
      	for(let i =0;i<res.length;i++){
      		arr.push(res[i].id)
      	}
      	this.delList = arr
      },
      //新增组件分类
      addComponClass() {
        this.clear()
        this.dialogVisible = true
        this.editShow = true
        this.addShow = false
        this.componTitle = '新增组件分类'
        this.dialogStu = 'addClass'
        this.validationText = 'formCompon'
        this.dialogText = '不超过4个字符'
        
      },
      //新增组件
      addComponent() {
        this.clear()
        this.dialogVisible = true
        this.editShow = false
        this.addShow = true
        this.validationText = 'formAdd'
        this.componTitle = '新增组件'
        this.dialogStu = 'addCom'
      },
      //查询
      queryList(){
      	var type = ''
      	if(this.componentType!==0){
      		type = this.componentType
      	}
      	this.$http.get(this.$API.queryCompon+'?catType=1&catName='+this.queryText+'&catExt='+type+'&pageNum='+this.pageNum+'&pageSize='+this.pageSize,res=>{
      		if(res.data.data.content.length>0){
      			this.tableData3=res.data.data.content
      			this.pageAll = res.data.data.totalElements
      		}else{
      			this.$message({
		          message: '抱歉，没有查询到该组件分类',
		          type: 'warning'
		        });
      		}
      	})
      },
      //刷新
      refreshTable: async function(){
      	var a = []
      	var b = []
         a = await this.getQueryCompon()
         this.tableData3 = a
         this.copyTable = a
      },
      getQueryCompon : function () {
      	return new Promise (resolve =>{
      		this.$http.get(this.$API.queryCompon+'?catType=1&pageNum='+this.pageNum+'&pageSize='+this.pageSize,(res)=>{
      			console.log(res)
	    	   	  if(res.data.code === 200){
	    	   	  	resolve(res.data.data.content)
	    	   	  	this.pageAll = res.data.data.totalElements
	    	   	  }
    	  		})
      	})
      },
      //保存
      saveCompon() {
      	 let a = []
      	 a.push(this.list.id)
      	 if(this.dialogStu=='del'){
        	   this.$http.post(this.$API.componentDel,{
        	   		    catIds:a
			        },(res)=>{
			        	   if(res.data.data){
			        	   	  this.refreshList('删除成功')
			        	   }
			        })
        	   return
           }
      	this.$refs[this.validationText].validate((valid) => {
          if (valid) {
	        switch(this.dialogStu) {
	          case 'addClass':
	            console.log('新增分类')
	            this.$http.post(this.$API.componentAddClass,{
	            	 catExt:this.classBtn,
	            	 catName:this.formCompon.name,
	            	 catType:1,
	            },(res)=>{
	            	   console.log(res)
	            	   if(res.data.data){
	            	   	  this.refreshList('添加成功')
	            	   }
	            })
	            break;
	          case 'addCom':
	            console.log('新增组件')
	            console.log(this.textData)
	            if(this.textData.type!=='text/plain'){return this.$message.error('文件类型不对，请上传.txt文件格式')}
	            let formData = new FormData();
    	            formData.append('file',this.textData);
    	            formData.append('catExt','1');
    	            formData.append('catId',this.formAdd.selectId);
	            this.$http.post(this.$API.componentAdd,formData,(res)=>{
	            	    console.log(res)
	            	    if(res.data.data){
	            	    	   this.dialogVisible = false
	            	    	   this.$message({
				          showClose: true,
				          message: '添加成功',
				          type: 'success'
				        });
	            	    }
	            },{"Content-Type":"multipart/form-data"})
	            break;
	          case 'edit':
	            console.log('编辑')
	            this.$http.post(this.$API.setComponent,{
	            	  "catExt": this.classBtn,
				  "catName": this.formCompon.name,
				  "catType": 1,
				  "id": this.list.id
	            },(res)=>{
	            	   this.refreshList('修改成功')
	            })
	            
	            break;
	        }
         } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      refreshList(res){
      	   this.dialogVisible = false
	    	   this.refreshTable()
	    	   this.$message({
	          showClose: true,
	          message: res,
	          type: 'success'
	        });
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
  .compent{
  	.el-upload-list{
  	width: 100px;
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
    th {
      background: #add4ff !important;
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
.upload-text{
    	   text-decoration: none;
    	   display: inline-block;
    	   width: 100px;
    	   height: 30px;
    	   position: relative;
    	   text-align: center;
    	   line-height: 30px;
    	   background: #00b3ee;
    	   color: white;
    	   border-radius: 4px;
    	   z-index: 100;
    	   margin-right: 10px;
    	   &:hover{
    	   	 text-decoration: none;
    	   	 color: white;
    	   }
    	   input{
    	     position: absolute;
    	   	 left: 0;
    	   	 color: black;
    	   	 width: 100px;
    	   	 height: 30px;
    	   	 opacity: 0;
    	   }
    }
 .upload-prompt{
 	font-size: 13px;
 	font-weight: 300;
 	line-height: 30px;
 	/*width: 100px;*/
 	overflow: hidden;
 	text-overflow : ellipsis; 
 }
 .paging{
 	margin: 20px 0 50px 0;
 }
</style>
