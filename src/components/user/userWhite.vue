<template>
  <div class="userWhite">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" ref="filters" :model="filters">
        <div>
          <!--<el-form-item label="IP地址:" prop="name">-->
            <!--<el-input v-model="filters.name" placeholder="请输入IP地址" clearable></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="操作时间:" prop="timeData">-->
            <!--<el-date-picker v-model="filters.timeData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <el-form-item>
            <!--<el-button type="primary" size="small" @click="resetForm">清空</el-button>-->
            <!--<el-button type="primary" size="small" >查询</el-button>-->
            <el-button type="primary" size="small" @click="addUserWhite">新增白名单</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-col>
    <div class="userWhite-box">
      <el-table :data="tableData"  border style="width: 100%" tooltip-effect="dark"
                v-loading="listLoading" @selection-change="selsChange">
        <!--<el-table-column prop="operatingTime" label="操作时间"  align="center">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="userWhiteType" label="操作类型" align="center">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="userWhiteContent" label="操作内容"  align="center">-->
        <!--</el-table-column>-->
        <el-table-column label="IP地址"  align="center">
          <template slot-scope="scope">
            {{scope.row}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--<div class="pagination">-->
      <!--<el-pagination-->
        <!--background-->
        <!--@current-change="handleCurrentChange"-->
        <!--@size-change="handleSizeChange"-->
        <!--:page-size="pageSize"-->
        <!--layout="prev, pager, next, jumper"-->
        <!--:total="pageAll">-->
      <!--</el-pagination>-->
    <!--</div>-->
    <!--创建分类弹框-->
    <el-dialog title="新增白名单" :visible.sync="dialogVisible" width="400px" center>
      <el-form :inline="true" :model="user" :rules="rules" class="demo-form-inline" ref="user">
        <el-form-item label="白名单IP地址:" prop="ipAddress">
          <el-input v-model="user.ipAddress"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="handleAdd">确定</el-button>
          </span>
    </el-dialog>
    <!--创建分类弹框-->
  </div>
</template>

<script>
  export default {
    name: "userWhite",
    data() {
      const URL_REG = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      let validateUrl = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入IP地址"));
        } else if (!URL_REG.test(value)) {
          callback(new Error("请输入正确的IP地址!"));
        } else {
          callback();
        }
      }
      return {
        user:{
          ipAddress:''
        },
        userList:[],
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
        rules:{
          ipAddress:[
            {
              required: true,
              validator: validateUrl,
              trigger: "blur"
            },
          ]
        },
        addCatRequest: {
          id: '',
          catExt: '',
          catName: '',
          catType:2
        },
        tableData: [],
        date:[]
      }
    },
    methods:{
      //清空查询
      resetForm(){
        this.$refs['user'].resetFields();
        this.dialogVisible = false
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
      addUserWhite(){
        this.dialogVisible = true
      },
      //删除
      handleDel(index,data){
        this.$confirm('确认删除该ip吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.apiWhiteDel(this.tableData[index]).then(res=>{
            if(res.code ===200){
              this.$message.success("删除成功！")
              this.getList()
            }else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      handleAdd(){
        this.$refs.user.validate((valid) => {
            if (valid) {
              this.$api.apiWhiteAdd(this.user.ipAddress).then(res=>{
                if(res.msg === "success") {
                  this.dialogVisible = false
                  this.$message.success("新增成功！")
                  this.getList()
                } else {
                  this.$message.error(res.msg)
                }
              })
            }
        });
      },
      getList(){
        this.$api.apiWhiteList().then(res=>{
          if(res.msg === "success") {
            this.tableData = res.data
            this.pageAll = res.data.totalElements
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style lang="scss">
  .userWhite {
    margin-top: 10px;
    .userWhite-head-class {
      align-items: center;
      display: flex;
      .el-input {
        width: 300px;
        margin: 0 10px 0 10px;
      }
    }
    .userWhite-head-type {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .userWhite-head-btn {
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

    .userWhite-box {
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
