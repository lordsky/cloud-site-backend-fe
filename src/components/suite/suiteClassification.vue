<template>
  <div class="suite">
   <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
        <div>
				<el-form-item label="套件分类:">
					<el-input v-model="filters.name" placeholder="请输入套件分类名称" clearable></el-input>
				</el-form-item>
        <el-form-item label="添加时间:">
            <el-date-picker v-model="timeData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          </div>
				<el-form-item>
					<el-button type="primary" size="small" v-on:click="getUsers">查询</el-button>
          <el-button type="primary" size="small" @click="batchRemove" :disabled="this.sels.length===0" >删除</el-button>
          <el-button type="primary" size="small" @click="addTemplate">新增套件</el-button>
          <el-button type="primary" size="small" @click="addComponClass">新增套件分类</el-button>
				</el-form-item>
			</el-form>
		</el-col>
      <div class="suite-box">
        <el-table :data="tableData3" height="250" border style="width: 100%" tooltip-effect="dark"
        v-loading="listLoading" @selection-change="selsChange">
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column prop="name" label="套件分类"  align="center">
          </el-table-column>
          <el-table-column prop="addTime" label="添加时间" align="center">
          </el-table-column>
          <el-table-column prop="num" label="套件个数"  align="center">
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="manageCompon(scope.$index, scope.row)">管理</el-button>
              <el-button type="text" @click="editCompon(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" v-if="scope.row.num == 0" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pagination">
          <el-pagination layout="prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pageSize" >
          </el-pagination>
		  </div>
   
    <el-dialog :title="componTitle" :visible.sync="dialogVisible" width="500px">
      <div class="el-suiteClass" v-show="editShow">
        <el-form :inline="true" :model="formCompon" class="demo-form-inline" ref="formCompon">
          <el-form-item label="套件分类名称:" prop="name" :rules="[{required: true, message: '分类名称不能为空'},{ max: 6, message: '不能超过6字符', trigger: 'blur' }]">
            <el-input v-model="formCompon.name" :placeholder="dialogText"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="el-suiteClassBtn">
        <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="saveCompon" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'suiteManagement',
    data() {
      return {
        filters: {
					name: ''
        },
        total: 0,
				page: 1,
				pageSize:10,
				listLoading: false,
				sels: [],//列表选中列
        timeData: [new Date(), new Date().setFullYear(new Date().getFullYear()+1)],
        formAdd: {
          selectText: ''
        },
        btnShow: '',
        componTitle: '',
        classBtn: 1,
        dialogVisible: false,
        dialogStu: '',
        dialogText: '',
        editShow: true,
        addShow: false,
        value: '',
        formCompon: {
          name: ''
        },
        tableData3: [{
          id:1,
          addTime: '2016-05-03',
          name: '企业官网',
          num: '0',
          state:'下线'
        }, {
          id:2,
          addTime: '2016-05-02',
          name: '在线商城',
          num: '5',
          state:'下线'
        }, {
          id:3,
          addTime: '2016-05-04',
          name: '外贸站',
          num: '3',
          state:'下线'
        }, {
          id:4,
          addTime: '2016-05-01',
          name: '工作室',
          num: '6',
          state:'下线'
        }, {
          id:5,
          addTime: '2016-05-08',
          name: '协会组织',
          num: '6',
          state:'下线'
        }, {
          id:6,
          addTime: '2016-05-06',
          name: '个人网站',
          num: '2',
          state:'下线'
        }, {
          id:7,
          addTime: '2016-05-07',
          name: '学校官网',
          num: '3',
          state:'下线'
        }]
      }
    },
    watch: {
      dialogVisible: function(val) {
        if(!val) {
          this.resetForm()
        }
      }
    },
    components: {
      
    },
    methods: {
      //重置验证
      resetForm() {
        this.$refs['formCompon'].resetFields();
        this.$refs['formAdd'].resetFields();
      },
      //组件类型
      btnType(i) {
        this.btnShow = i
      },
      //清除
      clear() {
        this.formCompon.name = ''
        this.formAdd.selectText = ''
      },
      //新增组件
      addTemplate() {
        this.$router.push({
          path:'/addTemplate',
          query:{text:'新增模版'}
        })
      },
      //  新模版件分类
      addComponClass() {
        this.clear()
        this.dialogVisible = true
        this.editShow = true
        this.componTitle = '新增模版分类'
        this.dialogStu = 'addClass'
        this.dialogText = '不超过6个字符'
      },
      //编辑
      editCompon(index, row) {
        // this.clear()
        this.dialogVisible = true
        this.editShow = true
        this.formCompon = Object.assign({}, row);
        this.componTitle = '编辑组件分类'
        this.dialogStu = 'edit'
        //this.dialogText = '导航'
      },
      //删除
      delCompon() {
        this.dialogVisible = true
        this.componTitle = '删除组件分类后将不可恢复，确定删除吗？'
        this.dialogStu = 'del'
        this.editShow = false
      },
      //删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该模块吗?', '提示', {
					type: 'warning'
				}).then(() => {
          this.listLoading = true;
					//NProgress.start();
          let id = row.id;
          setTimeout(() => {
          this.listLoading = false;
          }, 500);
					// removeUser(para).then((res) => {
					// 	this.listLoading = false;
					// 	//NProgress.done();
					// 	this.$message({
					// 		message: '删除成功',
					// 		type: 'success'
					// 	});
					// 	this.getUsers();
					// });
				}).catch(() => {

				});
			},
      selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
          this.listLoading = true;
					//NProgress.start();
          let para = { ids: ids };
          setTimeout(() => {
          this.listLoading = false;
          }, 500);
					//NProgress.start();
					// batchRemoveUser(para).then((res) => {
					// 	this.listLoading = false;
					// 	//NProgress.done();
					// 	this.$message({
					// 		message: '删除成功',
					// 		type: 'success'
					// 	});
					// 	this.getUsers();
					// });
				}).catch(() => {

				});
			},
      //管理
      manageCompon(index, row) {
        this.$router.push({
          path: '/templateEditor',
          query:{text:row.name}
        })
      },
      //保存
      saveCompon() {
        switch(this.dialogStu) {
          case 'addClass':
            console.log('新增分类')
            break;
          case 'edit':
            console.log('编辑')
            break;
          case 'del':
            console.log('删除')
            break;
          case 'pop':
          console.log('上线')
          break;
        }
      },
      //获取用户列表
			getUsers() {
				console.log('获取列表')
      },
      //当前页码
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//当前条数
			handleSizeChange(val) {
				this.pageSize = val;
				this.getUsers();
			},
    },
		mounted() {
			this.getUsers();
		}
  }
</script>

<style lang="scss" scoped>
    .suite{
      .suite-head {
        margin-top: 10px;
      }

      .el-suiteClassBtn {
        display: flex;
        justify-content: center;
      }
      .pagination{
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
      }

      .suite-box {
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
