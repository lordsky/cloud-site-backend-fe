<template>
  <div class="system-message">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="消息标题：">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="消息类型：">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布人员：">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="发布时间：">
        <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small">查询</el-button>
        <el-button type="primary" size="small">清空</el-button>
        <el-button type="primary" size="small">批量删除</el-button>
        <el-button type="primary" size="small">管理消息类型</el-button>
        <el-button type="primary" size="small">发布消息</el-button>
      </el-form-item>
    </el-form>
    <el-col :span="24">
      <el-table :data="tableData" style="width: 100%" border  @selection-change="handleSelectionChange">
      	 <el-table-column
      type="selection"
      width="55">
    </el-table-column>
        <el-table-column prop="date" label="标题" align="center">
        </el-table-column>
        <el-table-column prop="name" label="类型" align="center">
        </el-table-column>
        <el-table-column prop="address" label="发布时间" align="center">
        </el-table-column>
        <el-table-column prop="address" label="发布人员" align="center">
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
        	<template slot-scope="scope">
        		<el-button type="text">查看</el-button>
        		<el-button type="text">删除</el-button>
        	</template>
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: "systemMessage",
    data() {
      return {
        formInline: {},
        value6: '',
         tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
      }
    },
    methods:{
	    	handleSelectionChange(){
	    		
	    	}
    }
  }
</script>

<style lang="less">
  .system-message {
    margin-top: 20px;
  }
</style>