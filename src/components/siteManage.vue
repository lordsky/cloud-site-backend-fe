<template>
  <div class="siteManage">
    <div class="site-head">
      <div class="site-head-left">
        <el-form :inline="true">
          <el-form-item label="域名:">
            <el-input v-model="fromUser.account"></el-input>
          </el-form-item>
          <el-form-item label="发布用户:">
            <el-input v-model="fromUser.name"></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true" class="user-time">
          <el-form-item label="添加时间:">
            <el-date-picker v-model="timeData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="site-head-right">
        <div class="site-head-right-btn">
          <el-button type="primary" size="medium">查询</el-button>
          <el-button size="medium">禁用</el-button>
        </div>
      </div>
    </div>
    <div class="site-table">
      <el-table :data="tableData3" height="50" border style="width: 100%" tooltip-effect="dark" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="date" label="站点域名" align="center">
        </el-table-column>
        <el-table-column prop="name" label="发布用户" align="center">
        </el-table-column>
        <el-table-column prop="address" label="发布时间" align="center">
        </el-table-column>
        <el-table-column prop="address" label="状态" width="180" align="center">
        </el-table-column>
        <el-table-column prop="date" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button type="text">查看</el-button>
            <el-button type="text" @click="open">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'siteManage',
    data() {
      return {
        timeData: '',
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
      //全选按钮
      handleSelectionChange() {

      },
      open() {
        this.$confirm('是否要禁用该站点?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
        }).catch(() => {
         
        });
      }
    }
  }
</script>

<style lang="less">
  .siteManage {
    margin-top: 10px;
  }
  
  .site-table {
    margin-top: 30px;
    margin-bottom: 30px;
    height: auto;
    .el-table {
      height: auto !important;
    }
    th {
      background: #add4ff;
      color: white;
    }
  }
  
  .site-paging {
    margin: 20px 0 10px 0;
    width: 100%;
  }
  
  .site-head {
    width: 100%;
    display: flex;
    input {
      height: 35px;
    }
    .site-head-left {
      .user-time {
        .el-input__inner {
          width: 415px !important;
        }
      }
    }
    .site-head-right {
      margin-left: 50px;
      margin-bottom: 22px;
      display: flex;
      align-items: flex-end;
      button {
        width: 100px;
      }
    }
  }
</style>