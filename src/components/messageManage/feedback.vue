<template>
  <div class="feedback-message">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="反馈类型：">
        <el-select v-model="formInline.type" placeholder="全部">
          <el-option :label="item.label" :value="item.id" v-for="(item,index) in typeList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布时间：">
        <el-date-picker v-model="formInline.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-col :span="24" class="feedback_btn">
      <el-button type="primary" size="small" @click="queryList()">查询</el-button>
      <el-button type="primary" size="small" @click="clear">清空</el-button>
      <el-button type="primary" size="small" @click="exportMessage" :disabled="delList.length==0">导出Excel</el-button>
    </el-col>
    <el-col :span="24">
      <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="type" label="反馈类型" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.type==1?'功能建议':scope.row.type==2?'服务投诉':scope.row.type==3?'申诉情况':'举报问题'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="反馈内容" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="电话" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="反馈时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="lookDetail(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24" style="margin-top: 20px;">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" background :page-size="pageSize" layout="prev, pager, next, jumper" :total="totalPage">
      </el-pagination>
    </el-col>

  </div>
</template>

<script>
  export default {
    name: "feedbackMessage",
    data() {
      return {
        formInline: {},
        currentPage: 0,
        pageSize: 10,
        totalPage: 0,
        pageNum: 1,
        value6: '',
        tableData: [],
        typeList: [{
          label: '功能建议',
          id: 1
        }, {
          label: '服务投诉',
          id: 2
        }, {
          label: '申诉情况',
          id: 3
        }, {
          label: '举报问题',
          id: 4
        }],
        delList:[]
      }
    },
    methods: {
      //全选
      handleSelectionChange(val) {
           this.delList = val
      },
      //分页
      handleCurrentChange(val) {
        this.queryList(val)
      },
      //信息导出
      exportMessage(){
      	let arr = []
      	this.delList.map(item=>{
      		arr.push(item.id)
      	})
      	this.$http.post(this.$API.exportMessage,{
      		idList:arr
      	},response=>{
      		console.log(response)
      		const blob = new Blob( [response.data],{type: 'application/vnd.ms-excel'})
			     const url = window.URL || window.webkitURL || window.moxURL
				const downloadHref = url.createObjectURL(blob)
				let downloadLink = document.createElement('a')
				downloadLink.href = downloadHref
				downloadLink.download = "反馈消息.xls"
				downloadLink.click()
				this.$message({
		            type: 'success',
		            message: '导出成功!'
		          });
      	})
      },
      //查询
      queryList(val) {
        let data = {}
        this.formInline.type ? data.type = this.formInline.type : ''
        this.formInline.time ? (data.startDate = this.$http.getLocalTime(this.formInline.time[0]), data.endDate = this.$http.getLocalTime(this.formInline.time[1])) : ''
        val ? data.pageNum = val : this.currentPage = 1
        this.getList(data)
      },
      //清除
      clear() {
        this.formInline = {}
      },
      //查看
      lookDetail(val) {
        let data = JSON.stringify(val)
        this.$router.push({
          path: '/feedbackItem',
          query: {
            msg: data
          }
        })
      },
      //获取列表
      getList(val) {
        this.$http.get(this.$API.getFeedback, response => {
          this.tableData = response.data.data.content
          this.totalPage = response.data.data.totalElements
        }, {
          params: val
        })
      }
    },
    created() {
      this.getList()
    }
  }
</script>

<style lang="less">
  .feedback-message {
    margin-top: 20px;
    .feedback_btn {
      margin: 0 0 20px 0;
    }
  }
</style>