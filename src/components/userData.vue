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
              <el-date-picker v-model="fromUser.timeData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" >
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
        <el-table :data="tableData"  border style="width: 100%;height: auto;">
          <el-table-column prop="id" label="用户ID" width="180" align="center">
          </el-table-column>
          <el-table-column prop="account" label="用户账号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="name" label="用户昵称" align="center">
          </el-table-column>
          <el-table-column prop="starTime" label="注册时间" align="center">
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center">
          	<template slot-scope = "scope">
          		<span>{{scope.row.status==1?'启用':'未启用'}}</span>
          	</template>
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
	
  export default {
    name: 'userData',
    data() {
      return {
        fromUser: {
          account: '',
          name: '',
          state: '',
          timeData:''
        },
        tableData: [],
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
    	 	this.getUserList(true)
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
      getUserList(state){
      	let timeStatr = ''
      	let timeEnd = ''
      	let account = this.fromUser.account?this.fromUser.account:''
      	let status = this.fromUser.state?this.fromUser.state:''
      	let url = ''
      	if(this.fromUser.timeData){
      		timeStatr = this.$http.getLocalTime(this.fromUser.timeData[0])
      		timeEnd = this.$http.getLocalTime(this.fromUser.timeData[1])
      	}
      	if(state==true){
      		url = this.$API.userList+'?account='+account+'&status='+status+'&start='+timeStatr+'&end='+timeEnd
      	}else{
      		url = this.$API.userList
      	}
      	this.$http.get(url,(res)=>{
      		console.log(res)
      		if(res.data.code===200){
      			this.tableData = res.data.data
      			
      		}
      	})
      }
    },
    created(){
    	  this.getUserList()
    },
    components: {
    }
  }
</script>

<style lang="less" >
  .userData {
    margin-top: 10px;
  }
  
  .user-table {
    margin-top: 30px;
    margin-bottom: 30px;
    th {
      background: #add4ff !important;
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