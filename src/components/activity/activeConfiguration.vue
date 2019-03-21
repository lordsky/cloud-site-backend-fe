<template>
  <div class="active">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" ref="filters">
        <div>
          <el-form-item label="活动名称:" prop="name">
            <el-input v-model="filters.name" placeholder="请输入关键字" clearable></el-input>
          </el-form-item>
          <el-form-item label="发布时间:" prop="actTime">
            <el-date-picker v-model="filters.actTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态" prop="activeState">
            <el-select v-model="filters.activeState" placeholder="全部" class="el-select-banner">
              <el-option :label="x.name" :value="x.id" v-for="(x,i) in stateList" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" size="small" v-on:click="getActiveList">查询</el-button>
          <el-button type="primary" size="small" @click="resetForm">清空</el-button>
          <el-button type="primary" size="small" @click="batchRemove" :disabled="this.sels.length===0" >批量删除</el-button>
          <el-button type="primary" size="small" @click="activeAdd">新增活动</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <div class="active-box">
      <el-table :data="activeList"  border style="width: 100%" tooltip-effect="dark"
                v-loading="listLoading" @selection-change="selsChange">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="name" label="活动名称"  align="center">
        </el-table-column>
        <el-table-column prop="actTime" label="活动时间" align="center">
        </el-table-column>
        <el-table-column label="状态"  align="center">
          <template slot-scope="scope">
            {{scope.row.status == -1 ? '下线' : '上线'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.status == '-1'" @click="popCompon(scope.$index, scope.row)">上线</el-button>
            <el-button type="text" v-if="scope.row.status == '1'" @click="offlineCompon(scope.$index, scope.row)">下线</el-button>
            <el-button type="text" v-if="scope.row.status == '1'" @click="manageCompon(scope.$index, scope.row)">查看</el-button>
            <el-button type="text" @click="editCompon(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
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
    name: 'activeConfiguration',
    data() {
      return {
        filters: {
          name: '',
          actTime:[],
          activeState:''
        },
        stateList:[//状态选择
          {
            id:-1,
            name:'下线'
          },
          {
            id:1,
            name:'在线'
          }
        ],
        activeState:'',//状态
        pageAll: 0,
        page: 1,
        pageSize:10,
        listLoading: false,
        sels: [],//列表选中列
        timeData: [],
        classBtn: 1,
        dialogVisible: false,
        value: '',
        activeList: [],
        date:[]
      }
    },
    watch: {
      dialogVisible: function(val) {
        if(!val) {
          this.resetForm()
        }
      },
      timeData:function (val) {
        //console.log(http.getLocalTime(this.timeData[0]))
      }
    },
    components: {

    },
    methods: {
      //重置验证
      resetForm() {
        this.$refs['addCatRequest'].resetFields();
      },
      //组件类型
      btnType(i) {
        this.btnShow = i
      },
      //清空查询
      resetForm(){
        this.$refs['filters'].resetFields();
        this.getActiveList()
      },
      //新增活动
      activeAdd(){
        this.$router.push({
          path:'/activeAdd',
          query:{text:'活动新增',pageId:1}
        })
      },
      //编辑
      editCompon(index, row) {
        this.$router.push({
          path:'/activeEdit',
          query:{data:row}
        })
      },
      //上线
      popCompon(index, row) {
        this.$confirm('确认上线该活动吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.apiActiveOnlineOperate(row.id).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.getActiveList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      //下线
      offlineCompon(index, row) {
        this.$confirm('确认下线该活动吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.apiActiveOnlineOperate(row.id).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.getActiveList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      //删除
      handleDel(index,data){
        this.$confirm('确认删除该活动吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let a = []
          a.push(data.id)
          this.$api.apiDelActive({
            idList:a
          }).then(res=>{
            if(res.code ===200){
              this.getActiveList()
            }else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemove: function () {
        let ids = this.sels.map(item => item.id);
        this.$confirm('确认删除选中活动吗？', '提示', {
          type: 'warning'
        }).then(() => {
          console.log(ids)
          let a = []
          a.push(ids)
          this.$api.apiDelActive({
            idList:ids
          }).then(res=>{
            if(res.code ===200){
              this.getActiveList()
            }else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      //查看
      manageCompon(index, row) {
        this.$router.push({
          path: '/activeItems',
          query:{data:row}
        })
      },
      //获取模版分类列表
      getActiveList() {
        let para = {
          pageNum: this.page,
          pageSize: this.pageSize,
          name: this.filters.name,
          status:this.filters.activeState,
          startDate:this.filters.actTime == null ? '' : this.filters.actTime[0] != undefined ? this.$http.getLocalTime(this.filters.actTime[0]) : '',
          endDate:this.filters.actTime == null ? '' : this.filters.actTime[1] != undefined ? this.$http.getLocalTime(this.filters.actTime[1]) : ''
        };
        this.$api.apiActiveList(para).then(res=>{
          if(res.code === 200){
            this.activeList = res.data.content
            this.pageAll = res.data.totalElements
          }else {
            this.$message.error(res.msg)
          }
        })
      },
      //当前页码
      handleCurrentChange(val) {
        this.page = val;
        this.getActiveList();
      },
      //当前条数
      handleSizeChange(val) {
        this.pageSize = val;
        this.getActiveList();
      },
    },
    mounted() {
      this.getActiveList();
    }
  }
</script>

<style lang="scss">
  .active {
    margin-top: 10px;
    .active-head-class {
      align-items: center;
      display: flex;
      .el-input {
        width: 300px;
        margin: 0 10px 0 10px;
      }
    }
    .active-head-type {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .active-head-btn {
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

    .active-box {
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
