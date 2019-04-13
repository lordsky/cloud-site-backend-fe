<template>
  <div class="role-manage">
    <div class="role-conetent">
      <div class="role-left">
      	<el-button type="primary" class="left_addBtn" @click="addRole">添加角色</el-button>
      	<el-input class="left_input" placeholder="通过关键词过滤" @keyup.enter.native="searchRole" v-model="roleText"></el-input>
      	<ul class="role-left-list">
      		<li v-for="(item,index) in menuList" :key="index" @click="getRoleList(item)">
      			<el-tooltip class="item" effect="dark" :content="item.roleName" placement="top">
			     <span>{{item.roleName}}</span>
			    </el-tooltip>
      		<div class="role-left-list-ico"><i class="el-icon-edit-outline" @click="setName(item)"></i><i class="el-icon-delete"
      			@click="delRole(item)"></i></div>
      		</li>
      	</ul>
      </div>
      <div class="role-right">
      	<div class="role-right-table">
        <el-table ref="multipleTable" :data="roleJson" tooltip-effect="dark" style="width: 100%"  border>
          <el-table-column label="一级菜单权限" align="center" prop="title">
            <template slot-scope="scope">
            	<el-checkbox v-model="scope.row.state" @change="handAll(scope.row)" :indeterminate="scope.row.deter" >{{scope.row.title}}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="二级菜单权限" align="center">
          <template slot-scope="scope">
		     <el-checkbox v-for="(item,index) in scope.row.list" :label="item.name" :key="index"
		     	@change="handItem(scope.row,item)" v-model="item.state">{{item.name}}</el-checkbox>
          </template>
          </el-table-column>
        </el-table>
        <div class="role-save_btn">
        	 <el-button type="primary" @click="saveRole" :disabled="roleJson.length==0">保存</el-button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {sideText} from '../config/sideConfig'
  export default {
    name: "roleManage",
    data() {
      return {
         menuList:[],
         roleJson:[],
         roleInfo:[],
         userInfo:{},
         roleText:''
      }
    },
    methods:{
    	    //全选
	    	handAll(val){
	    		val.list.forEach((item,index)=>{
	    			item.state = val.state
	    		})
	    		val.state?val.checkList = JSON.parse(JSON.stringify(val.checkAll)):val.checkList = []
	    		val.deter = false
	    	},
	    	//获取权限列表
	    	getRoleList(val){
	    		this.roleInfo = val
	    		this.roleJson = JSON.parse(JSON.stringify(this.setJson(JSON.parse(val.menuJs))))
	    	},
	    	//单选
	    	handItem(val,item){
	    		item.state?val.checkList.push(item.name):val.checkList.splice(val.checkList.indexOf(item.name),1)
	    		val.checkList.length===0?(val.state = false,val.deter = false):val.checkList.length==val.checkAll.length?(val.state=true,val.deter=false):(val.deter=true,val.state=false)
	    		console.log(this.roleJson)
	    	},
	    	//编辑角色
	    	setName(val){
	    	   this.roleInfo = val
	       this.setRole('编辑名称','角色名称 ：','设置成功','set',val)
	    	},
	    	//添加角色
	    	addRole(){
	    	   this.setRole('角色名称','添加角色 ：','添加成功','add')
	    	},
	    	//保存角色
	    	saveRole(){
	    		console.log(this.roleInfo)
	    		let data = this.roleJson
	    		console.log(data)
//	    		return
	    		this.$http.post(this.$API.setRoleJson,{
	    			id:this.roleInfo.roleMenuid,
	    			menuJs:JSON.stringify(data),
                updaterId:this.userInfo.id
	    		},response=>{
	    			if(response.data.data){
	    				this.getList()
	    			    this.$message({type:'success',message:'保存成功'})
	    			    this.roleJson = []
	    			}
	    		})
	    	},
	    	//删除角色
	    	delRole(val){
	    	  console.log(val)
	    	this.$confirm('是否要删除该角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	  this.$http.post(this.$API.delRole+'?roleId='+val.roleId,{},response=>{
        	  	console.log(response)
        	  	response.data.code==200?(this.$message({type: 'success', message: '删除成功!'}),this.getList(),this.roleJson=[]):''
        	  })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
	    	},
	    	//弹框
	    	setRole(title,content,msg,state,listInfo){
	    		let user =  this.userInfo
	        this.$prompt(content, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
        	  if(state=='add'){
        	  	this.$http.post(this.$API.addRole+'?name='+value+'&userId='+user.id,{},response=>{
        	  		response.data.data?(this.$message({type:'success',message:'添加成功'}),this.getList()):''
        	  	})
        	  }else{
        	  	 this.$http.post(this.$API.editRole,{
        	  	 	id:listInfo.roleMenuid,
        	  	 	userId:user.id,
        	  	 	name:value
        	  	 },response=>{
        	  	 	response.data.data?(this.$message({type:'success',message:'编辑成功'}),this.getList()):''
        	  	 })
        	  }
        }).catch(() => {
           
        });
	    	},
	    	//获取角色列表
	    	getList(val){
	    		let url
	    		val?url = this.$API.showMenu+'?roleName='+val:url = this.$API.showMenu
	    		this.$http.get(url,response=>{
	    			this.menuList = response.data.data
	    		})
	    	},
	    	//搜索角色
	    	searchRole(){
	    		this.getList(this.roleText)
	    	},
	    	//设置角色Json
	    	setJson(val){
		    val.map(item=>{
	    	   	  let arr = []
	    	   	   item.list.forEach((data,index)=>{
	    	   	  	  if(data.state){
	    	   	  	  	arr.push(data.name)
	    	   	  	  	item.deter = true
	    	   	  	  }
	    	   	  	  item.checkList = arr
	    	   	  })
	    	   	  item.checkAll = item.list.map(data=>{
	    	   	  	  	return data.name
	    	   	  })
	    	      })
		    return val
	    	}
    },
    created(){
    	   let user = JSON.parse(localStorage.getItem('cloudUser'))
    	   this.userInfo = user
    	   this.getList()
    }
  }
</script>

<style lang="less">
 .role-manage{
 	.role-conetent{
 		min-height: 80vh;
 		margin-top: 20px;
 		display:flex;
 		.role-left{
 			width: 20%;
 			border: #F2F2F2 1px solid;
 			.left_addBtn{
 				display: block;
 				margin: auto;
 				margin-top: 30px;
 				margin-bottom: 30px;
 			}
 			.left_input{
 				padding: 0 15px 0 15px;
 			}
 			.role-left-list{
 				margin-top: 20px;
 				list-style: none;
 				font-size: 15px;
 				font-weight: 400;
 				li{
 					padding: 10px 10px 10px 10px ;
 					display: flex;
 					justify-content: space-between;
 					align-items: center;
 					cursor: pointer;
 					&:hover{
 					background: #add4ff;
 					color: white;
 				 }
 				 span{
 				 	width: 50%;
 				 	overflow: hidden;
 				 }
 				 .role-left-list-ico{
 				 	i{padding-right: 8px;}
 				 }
 				}
 			}
 		}
 		.role-right{
 			width: 80%;
 			border: #F2F2F2 1px solid;
 			.role-right-table{
 				margin: 20px 20px 20px 20px;
 				th{
 					background: #add4ff !important;
 					color: white;
 				}
 				.role-table-item{
 					padding: 0 10px 0 10px;
 				}
 			}
 			.role-save_btn{
 				margin-top: 20px;
 				display: flex;
 				justify-content: center;
 				.el-button{
 					padding:10px 50px 10px 50px;
 				}
 			}
 		}
 	}
 }
</style>