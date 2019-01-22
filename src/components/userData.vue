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
              <el-date-picker v-model="timeData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="user-head-right">
          <div class="user-head-stu">
            <el-form :inline="true">
              <el-form-item label="状态:">
                <el-select v-model="value" placeholder="请选择">
                  <el-option v-for="item in tableData3" :key="item.data" :label="item.data" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="user-head-right-btn">
            <el-button type="primary" size="medium">查询</el-button>
            <el-button size="medium">清空</el-button>
          </div>
        </div>
      </div>
      <div class="user-table">
        <el-table :data="tableData3" height="50" border style="width: 100%">
          <el-table-column prop="date" label="用户ID" width="180" align="center">
          </el-table-column>
          <el-table-column prop="name" label="用户账号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="address" label="用户昵称" align="center">
          </el-table-column>
          <el-table-column prop="address" label="注册时间" align="center">
          </el-table-column>
          <el-table-column prop="address" label="备注" align="center">
          </el-table-column>
          <el-table-column prop="address" label="操作" align="center" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lookUser">查看</el-button>
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
        timeData: '',
        stu: 1,
        value:'',
        fromUser: {
          account: '',
          name: '',
          state: ''
        },
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
        }]
      }
    },
    methods: {
      //用户信息
      lookUser() {
        this.$router.push({
          name: 'userInfo',
          params:{
          id:'123'
        }
        })
      },
      disableUser(){
      	this.$confirm('是否禁用该用户?', '提示', {
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
      }
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