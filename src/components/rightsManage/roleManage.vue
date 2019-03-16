<template>
  <div class="role-manage">
    <div class="role-conetent">
      <div class="role-left">

      </div>
      <div class="role-right">
      	<div class="role-right-table">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border >
          <el-table-column type="selection" width="50px" >
          </el-table-column>
          <el-table-column label="一级菜单权限" align="center" prop="title">
            <template slot-scope="scope">
            	  <span>{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="二级菜单权限" align="center">
          	<template slot-scope="scope">
          	<span v-for="(x,i) in scope.row.list" :key="i" class="role-table-item">{{x.name}}</span>
          </template>
          </el-table-column>
        </el-table>
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
         tableData:[]
      }
    },
    methods:{
	    	handleSelectionChange(){
	    		
	    	}
    },
    created(){
    	   console.log(sideText)
    	   this.tableData = sideText
    }
  }
</script>

<style lang="less">
 .role-manage{
 	.role-conetent{
 		margin-top: 20px;
 		display:flex;
 		.role-left{
 			width: 20%;
 			border: #F2F2F2 1px solid;
 		}
 		.role-right{
 			width: 70%;
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
 		}
 	}
 }
</style>