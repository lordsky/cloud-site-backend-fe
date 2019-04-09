<template>
  <div class="userData">
    <div class="user-head">
      <div class="user-head-left">
        <el-form :inline="true">
          <el-form-item label="手机号:">
            <el-input v-model="fromUser.account" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称/姓名:">
            <el-input v-model="fromUser.name" placeholder="请输入用户昵称或姓名"></el-input>
          </el-form-item>
          <el-form-item label="企业名称:">
            <el-input v-model="fromUser.companyName" placeholder="请输入企业名称"></el-input>
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
          <el-button type="primary" size="medium" @click="queryUser" :disabled="queryState">查询</el-button>
          <el-button size="medium" @click="clear">清空</el-button>
        </div>
      </div>
    </div>
    <div class="user-table">
      <el-table :data="tableData" border style="width: 100%;height: auto;">
        <el-table-column prop="account" label="用户手机号" width="180" align="center">
        </el-table-column>
        <el-table-column prop="nickname" label="用户昵称" align="center">
        </el-table-column>
        <el-table-column prop="username" label="用户姓名" align="center">
        </el-table-column>
        <el-table-column prop="companyName" label="企业名称" align="center">
        </el-table-column>
        <el-table-column prop="starTime" label="注册时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status==1?'正常':'禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="lookUser(scope.row)" v-show="scope.row.status==1">查看</el-button>
            <el-button type="text" size="small" @click="disableUser(scope.row)" v-if="scope.row.status==1">禁用</el-button>
             <el-button type="text" size="small" @click="starUser(scope.row)" v-else>启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="user-paging">
      <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100]"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="totalPage">
    </el-pagination>
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
          timeData: ''
        },
        tableData: [],
        totalPage:0,
        currentPage:0,
        pageSize:10,
        pageNum:1,
        listState: [{
            value: '1',
            label: '启用'
          },
          {
            value: '-1',
            label: '禁用'
          }
        ],
        queryState:false
      }
    },
    watch:{
    	  fromUser:function(val){
    	  	val.name&&val.companyName?(this.queryState = true,this.$message({type:'warning',message:'企业和用户只能选一个查询'})):this.queryState = false
    	  }
    },
    methods: {
      clear() {
        this.fromUser = {}
      },
      //分页
      handleCurrentChange(val){
      	this.pageNum = val
      	this.getUserList()
      },
      queryUser() {
      	this.currentPage = 1
        this.getUserList(true)
      },
      //用户信息
      lookUser(res) {
        this.$router.push({
          name: 'userInfo',
          params: {
            data: res
          }
        })
      },
      //设置用户状态
      setUserState(id){
      	this.$http.post(this.$API.userDisable+'?userId='+id, {
          }, res => {
            console.log(res)
            this.getUserList()
          })
      },
      //启用
      starUser(val){
      	 this.$confirm('是否启用该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	   this.setUserState(val.id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消禁用'
          });
        });
      },
      //禁用
      disableUser(val) {
        this.$confirm('是否禁用该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.setUserState(val.id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消禁用'
          });
        });
      },
      getUserList(state) {
        let obj = {
        	   pageNum:this.pageNum,
        	   pageSize:this.pageSize
        }
        let timeStatr = ''
        let timeEnd = ''
        let status = this.fromUser.state
        let account = this.fromUser.account
        let name = this.fromUser.name
        let url = this.$API.userList
//      console.log(this.fromUser)
        if(this.fromUser.timeData) {
          timeStatr = this.$http.getLocalTime(this.fromUser.timeData[0])
          timeEnd = this.$http.getLocalTime(this.fromUser.timeData[1])
          obj.timeStatr = timeStatr
          obj.timeEnd = timeEnd
        }
        status ? obj.status = status : ''
        account ? obj.account = account : ''
        name ? obj.name = name : ''
        this.$http.get(url, (res) => {
//        console.log(res)
          if(res.data.code === 200) {
          	this.totalPage = res.data.data.content.totalElements
            this.tableData = res.data.data.content.content
          }
        },{
        	   params:obj
        })
      }
    },
    created() {
      this.getUserList()
    },
    components: {}
  }
</script>

<style lang="less">
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
      .user-head-right-btn {
        float: right;
        margin-right: 10px;
      }
    }
  }
</style>