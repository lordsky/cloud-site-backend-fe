<template>
  <div class="system-message">
  	<div v-if="releaseShow">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="消息标题：">
        <el-input v-model="formInline.title" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="消息类型：">
        <el-select v-model="formInline.type" placeholder="全部">
          <el-option :label="item.catName" :value="item.id" v-for="(item,index) in messageType" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布人员：">
        <el-select v-model="formInline.operatorName" placeholder="全部">
          <el-option :label="item.operatorName" :value="item.id" v-for="(item,index) in tableData" :key="index"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="发布时间：">
        <el-date-picker v-model="formInline.timeData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="queryMessage()">查询</el-button>
        <el-button type="primary" size="small" @click="clear">清空</el-button>
        <el-button type="primary" size="small" @click="deleteAll" :disabled="deleteState">批量删除</el-button>
        <el-button type="primary" size="small" @click="messageManage">管理消息类型</el-button>
        <el-button type="primary" size="small" @click="releaseShow = false">发布消息</el-button>
      </el-form-item>
    </el-form>
    <el-col :span="24">
      <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center">
        </el-table-column>
        <el-table-column prop="catName" label="类型" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="发布时间" align="center">
        </el-table-column>
        <el-table-column prop="operatorName" label="发布人员" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="lookMessage(scope.row)">查看</el-button>
            <el-button type="text" @click="deleteMessage(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    </div>
    <SystemRelease :back="goBack" :messageType="messageType" v-else></SystemRelease>
    <el-col :span="24" v-show="releaseShow" style="margin-top: 20px;">
    	<el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      background
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="totalPage">
    </el-pagination>
    </el-col>
    <el-dialog title="消息类型" :visible.sync="dialogVisible" width="450px">
      <div class="up-box">
        <el-input type="text" placeholder="请输入消息类别" v-model="typeCatName"></el-input>
        <el-button type="primary" class="up-box_btn" @click="addListType">添加</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
  	<table border="1" cellspacing="0" cellpadding="0" class="up_table">
  		<tr>
  			<th>消息类别</th>
  			<th>操作</th>
  		</tr>
  		<tr v-for="(item,index) in messageType" :key="index">
  			<td>{{item.catName}}</td>
  			<td @click="delType(item)" class="del_btn">删除</td>
  		</tr>
  	</table>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import SystemRelease from './systemRelease'
  export default {
    name: "systemMessage",
    data() {
      return {
        formInline: {},
        messageType:[],
        typeCatName:'',
        releaseShow:true,
        dialogVisible: false,
        tableData: [],
        pageNum:1,
        pageSize:10,
        totalPage:0,
        currentPage:0,
        operatorName:[],
        deleteArr:[],
        deleteState:true,
      }
    },
    components: {
      SystemRelease
    },
    methods: {
      handleSelectionChange(val) {
         this.deleteArr = val
         this.deleteArr.length>0?this.deleteState = false:this.deleteState = true
      },
      //查看
      lookMessage(val){
      	this.$router.push({path:'/systemItem',query:{id:val.id}})
      },
      //批量删除
      deleteAll(){
      	let arr = []
      	arr = this.deleteArr.map(item=>{
      		return item.id
      	})
        this.deleteMessage(arr)
      },
      //删除
      deleteMessage(val){
      	let arr = []
      	val.constructor==Array?arr = val:arr.push(val.id)
      	this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$http.post(this.$API.delMessage,{idList:arr},response=>{
          	  response.data.code==200?(this.$message({type:'success',message:'删除成功'}),this.queryMessage(this.pageNum)):''
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //返回
      goBack(){
      	this.releaseShow = true
      },
      //分页
      handleCurrentChange(val){
      	this.pageNum = val
      	this.queryMessage(val)
      },
      //查询
      queryMessage(val){
      	let data = {pageNum:1}
      	let formData = this.formInline
      	formData.title?data.title = formData.title:''
      	formData.type?data.catId = formData.type:''
      	formData.operatorName?data.operator = formData.operatorName:''
      	formData.timeData?(data.startDate = formData.timeData[0],data.endDate = formData.timeData[1]):''
      	val?data.pageNum = val:this.currentPage = 1
      	this.getList(data)
      },
      //清空数据
      clear(){
      	this.formInline = {}
      },
      //管理消息类型
      messageManage() {
        this.dialogVisible = true
      },
      //获取消息列表
      getList(val){
    	    	  this.$http.get(this.$API.getMessage,response=>{
    	    	  	 response.data.code===200?this.tableData = response.data.data.content:''
    	    	  	 this.totalPage = response.data.data.totalElements
    	    	  },{
    	  		params:val
    	  	})
    	    },
    	   //获取消息类型
    	  getListType(){
    	  	this.$http.get(this.$API.getMessageType,response=>{
    	  		console.log(response)
    	  	    response.data.data?this.messageType = response.data.data:''
    	  	})
    	  },
    	  //添加消息类型
    	  addListType(){
    	  	this.$http.post(this.$API.addMessageType+'?catName='+this.typeCatName,{
    	  	},response=>{
    	  		response.data.code===200?(this.$message({message:'添加成功',type:'success'}),this.getListType()):''
    	  	})
    	  },
    	  //删除消息类型
    	  delType(val){
        	this.$http.post(this.$API.delMessageType+'?id='+val.id,{
    	  	},response=>{
    	  		response.data.code===200?(this.$message({message:'删除成功',type:'success'}),this.getListType()):''
    	  	})
    	  }
    },
    created(){
    	   this.getList()
    	   this.getListType()
    }
  }
</script>

<style lang="less">
  .system-message {
    margin-top: 20px;
    .up-box {
      display: flex;
      .up-box_btn {
        border-radius: 0 !important;
      }
    }
    .up_table {
      width: 99%;
      border-collapse: collapse;
      border: 1px solid #999;
      text-align: center;
      font-size: 15px;
      font-weight: 400;
      th {
        background: #add4ff;
        color: white;
      }
      .del_btn{
      	cursor: pointer;
      }
    }
  }
</style>