<template>
  <div class="userData">
      <div class="user-head">
        <div class="user-head-left">
          <el-form :inline="true">
            <el-form-item label="用户账户:">
              <el-input v-model="fromUser.account"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称/姓名:">
              <el-input v-model="fromUser.name"></el-input>
            </el-form-item>
          </el-form>
          <el-form :inline="true" class="user-time">
            <el-form-item label="注册时间:">
              <el-date-picker v-model="fromUser.timeData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="user-head-right">
          <div class="user-head-stu">
            <el-form :inline="true">
              <el-form-item label="状态:">
                <el-select v-model="fromUser.state" placeholder="请选择">
                  <el-option v-for="item in listState" :key="item.label" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="user-head-right-btn">
            <el-button type="primary" size="medium" @click="queryUser">查询</el-button>
            <el-button size="medium" @click="clear">清空</el-button>
          </div>
        </div>
      </div>
      <div class="user-table">
        <el-table :data="tableData3" height="50" border style="width: 100%">
          <el-table-column prop="id" label="用户ID" width="180" align="center">
          </el-table-column>
          <el-table-column prop="account" label="用户账号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="name" label="用户昵称" align="center">
          </el-table-column>
          <el-table-column prop="starTime" label="注册时间" align="center">
          </el-table-column>
          <el-table-column prop="note" label="备注" align="center">
          </el-table-column>
          <el-table-column prop="address" label="操作" align="center" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lookUser(scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="disableUser">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="user-paging">
        <!--<el-pagination
      @size-change="handleSizeChange"
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[20, 50, 100]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100">
    </el-pagination>-->
      </div>
   
  </div>

</template>

<script>
	import {instance} from './config/http'
  export default {
    name: 'userData',
    data() {
      return {
        stu: 1,
        fromUser: {
          account: '',
          name: '',
          state: '',
          timeData:''
        },
        tableData3: [
          {
          	id:'1',
          	account:'1323266881',
          	name:'张三',
          	starTime:'2019-3-12',
          	note:'暂无'
          },
          {
          	id:'2',
          	account:'1873266881',
          	name:'李四',
          	starTime:'2019-3-12',
          	note:'暂无'
          },
          {
          	id:'3',
          	account:'1543266381',
          	name:'小明',
          	starTime:'2019-3-12',
          	note:'暂无'
          },
          {
          	id:'4',
          	account:'1343266881',
          	name:'小红',
          	starTime:'2019-3-12',
          	note:'暂无'
          }
        ],
        listState:[
           {
          value: '1',
          label: '启用'
        },
        {
          value: '2',
          label: '未启用'
        }
        ]
      }
    },
    
    methods: {
    	clear(){
    		this.fromUser = {}
    	},
    	 queryUser(){
    	 	console.log(this.fromUser)
    	 },
      //用户信息
      lookUser(res) {
      	 this.$message({
            type: 'warning',
            message: '该功能开发中!'
          });
//      this.$router.push({
//        name: 'userInfo',
//        params:{
//          data:res
//        }
//      })
      },
      disableUser(){
      	this.$confirm('是否禁用该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '禁用成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消禁用'
          });          
        });
      },
      getUserList(){
//    	this.$http.get(this.$API.userList,(res)=>{
//    		console.log(res)
//    	})
//      instance.get(this.$API.userList,{
//      }).then(res=>{
//      	   console.log(res)
//      })
      }
    },
    created(){
    	  this.getUserList()
    },
    components: {
    }
  }
</script>

<style lang="less">
  .userData {
    margin-top: 10px;
  }
  
  .user-table {
    margin-top: 30px;
    margin-bottom: 30px;
    .el-table {
      height: auto !important;
    }
    th {
      background: #add4ff;
      color: white;
    }
  }
  
  .user-paging {
    margin: 20px 0 10px 0;
    width: 100%;
  }
  
  .user-head {
    width: 100%;
    display: flex;
    input {
      height: 35px;
    }
    .user-head-left {
      .user-time {
        .el-input__inner {
          width: 480px !important;
        }
      }
    }
    .user-head-right {
      margin-left: 50px;
      button {
        width: 100px;
      }
    }
  }
</style>