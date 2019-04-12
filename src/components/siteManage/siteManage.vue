<template>
  <div class="siteManage">
    <div class="site-head">
      <div class="site-head-left">
        <el-form :inline="true">
          <el-form-item label="域名:">
            <el-input v-model="fromUser.domain" placeholder="请输入域名"></el-input>
          </el-form-item>
          <el-form-item label="发布用户:">
            <el-input v-model="fromUser.userName" placeholder="请输入发布用户"></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true" class="user-time">
          <el-form-item label="添加时间:">
            <el-date-picker v-model="fromUser.timeData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="site-head-right">
        <div class="site-head-right-btn">
          <el-button type="primary" size="medium" @click="query()">查询</el-button>
          <el-button size="medium" @click="disableAll('',false)">禁用</el-button>
        </div>
      </div>
    </div>
    <div class="site-table">
      <el-table :data="tableData"  border style="width: 100%" tooltip-effect="dark" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="domain" label="站点域名" align="center">
        </el-table-column>
        <el-table-column prop="username" label="发布用户" align="center">
        	 	<template slot-scope="scope">
        		<span>{{scope.row.username?scope.row.username:'----'}}</span>
        	 </template>
        </el-table-column>
        <el-table-column prop="createTime" label="发布时间" align="center">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="180" align="center">
        	<template slot-scope="scope">
        		<span>{{scope.row.status==0?'未启用':scope.row.status.status==1?'启用':'已禁用'}}</span>
        	 </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="openPage(scope.row)" v-show="scope.row.status==0">查看</el-button>
            <el-button type="text" @click="disableSite(scope.row,false)" v-if="scope.row.status==0">禁用</el-button>
             <el-button type="text" @click="disableSite(scope.row,true)" v-else>启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging">
    	 <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      background
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="totalPage">
    </el-pagination>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'siteManage',
    data() {
      return {
        fromUser: {},
        tableData: [],
        title:[],
        totalPage:0,
        pageSize:10,
        currentPage:0,
        pageNum:1,
        delList:[]
      }
    },
    methods: {
    	//打开站点
    	  openPage(res){
    	  	window.open("http://"+res.domain)
    	  },
      //全选按钮
      handleSelectionChange(val) {
      	let arr = []
      	val.map(item=>{
      		arr.push(item.userTemplateId)
      	})
      	this.delList = arr
        console.log(val)
      },
      //分页
      handleCurrentChange(val){
      	this.query(val)
      },
      //打开禁用站点
      disableSite(val,state) {
      	console.log(val)
        this.$confirm('是否要禁用该站点?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.disableAll(val.userTemplateId,state)
        }).catch(() => {
           
        });
      },
      //禁用
      disableAll(val,state){
      	 let arr = []
      	 val?arr.push(val):arr = this.delList 
      	 this.$http.post(this.$API.disableSite,{
      	 	status: state,
      	 	userTemplateIds:arr
           },response=>{
           	  console.log(response)
           	  response.data.data?(this.$message({type:'success',message:'设置成功'}),this.query()):''
           })
      },
      //查询
      query(val){
      	let data = {pageSize:this.pageSize,pageNum:1}
      	let domain = this.fromUser.domain?this.fromUser.domain:''
      	let end = this.fromUser.timeData?this.fromUser.timeData[1]:''
      	let start = this.fromUser.timeData?this.fromUser.timeData[0]:''
      	let userName = this.fromUser.userName?this.fromUser.userName:''
        val?data.pageNum = val:this.currentPage = 1
      	domain?data.domain = domain:''
      	userName?data.userName = userName:''
      	start?data.start = start:''
      	end?data.end = end:''
      	this.getList(data)
      },
      //获取列表
      getList(data){
      	console.log(data)
      	this.$http.post(this.$API.getSiteList,data,response=>{
      	    response.data.data.pageinfo.content.map(item=>{
      	    	   let time = item.createTime
			   let d = new Date(time);
			let times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + 			d.getSeconds();
			item.createTime = times
      	    })
      	    this.tableData = response.data.data.pageinfo.content
      	    this.totalPage = response.data.data.pageinfo.totalElements
      	})
      }
    },
    created(){
    	  let data = {
    	  	 pageNum:1,
    	  	 pageSize:this.pageSize
    	  }
    	  this.getList(data)
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
      background: #add4ff !important;
      color: white;
    }
  }
  
  .paging {
    margin: 20px 0 20px 0;
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