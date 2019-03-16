<template>
  <div class="operation">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" ref="filters" :model="filters">
        <div>
          <el-form-item label="模版分类:" prop="name">
            <el-input v-model="filters.name" placeholder="请输入模版分类名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="添加时间:" prop="timeData">
            <el-date-picker v-model="filters.timeData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="resetForm">清空</el-button>
            <el-button type="primary" size="small" >查询</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-col>
    <div class="operation-box">
      <el-table :data="templateTypeLsit"  border style="width: 100%" tooltip-effect="dark"
                v-loading="listLoading" @selection-change="selsChange">
        <!--<el-table-column type="selection" width="55" align="center">-->
        <!--</el-table-column>-->
        <el-table-column prop="operatingTime" label="操作时间"  align="center">
        </el-table-column>
        <el-table-column prop="operationType" label="操作类型" align="center">
        </el-table-column>
        <el-table-column prop="operationContent" label="操作内容"  align="center">
        </el-table-column>
        <el-table-column prop="IPAddress" label="IP地址"  align="center">
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="pageAll">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "operationLog",
    data() {
      return {
        filters: {
          name: '',
          timeData:[]
        },
        pageAll:0,
        total: 0,
        page: 1,
        pageSize:10,
        listLoading: false,
        sels: [],//列表选中列
        btnShow: '',
        componTitle: '',
        classBtn: 1,
        dialogVisible: false,
        dialogStu: '',
        dialogText: '',
        editShow: true,
        addShow: false,
        value: '',
        addCatRequest: {
          id: '',
          catExt: '',
          catName: '',
          catType:2
        },
        templateTypeLsit: [
          {
            operatingTime:'2019-01-01 16:39:01',
            operationType:'登录',
            operationContent:'登录成功',
            IPAddress:'119.120.31.207'
          },
          {
            operatingTime:'2019-01-01 16:39:01',
            operationType:'修改密码',
            operationContent:'修改密码为：123456成功',
            IPAddress:'119.120.31.207'
          },
          {
            operatingTime:'2019-01-01 16:39:01',
            operationType:'新增组件',
            operationContent:'新增组件成功',
            IPAddress:'119.120.31.207'
          },
          {
            operatingTime:'2019-01-01 16:39:01',
            operationType:'登录',
            operationContent:'登录成功',
            IPAddress:'119.120.31.207'
          }
        ],
        date:[]
      }
    },
    methods:{
      //清空查询
      resetForm(){
        this.$refs['filters'].resetFields();
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //当前页码
      handleCurrentChange(val) {
        this.page = val;
      },
      //当前条数
      handleSizeChange(val) {
        this.pageSize = val;
      },
    },
    mounted() {

    }
  }
</script>

<style lang="scss">
  .operation {
    margin-top: 10px;
    .operation-head-class {
      align-items: center;
      display: flex;
      .el-input {
        width: 300px;
        margin: 0 10px 0 10px;
      }
    }
    .operation-head-type {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .operation-head-btn {
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
    .el-componClassBtn {
      display: flex;
      justify-content: center;
    }
    .pagination{
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }

    .operation-box {
      margin-top: 10px;
      margin-bottom: 10px;
      .el-table {
        height: auto !important;
      }
      th {
        background: #add4ff;
        color: white;
      }
    }
  }

</style>
