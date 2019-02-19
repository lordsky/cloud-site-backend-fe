<template>
  <div class="suiteClass">
    <div class="suite-edit-head">
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" @click="backSuite">返回</el-button>
    </div>
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="filters">
        <div>
        <el-form-item label="关键字搜索:">
          <el-input v-model="filters.name" placeholder="请输入套件名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="添加时间:">
            <el-date-picker v-model="timeData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          </div>
        <el-form-item>
          <el-button type="primary" size="small" v-on:click="getUsers">查询</el-button>
          <el-button type="primary" size="small" @click="addSuite">新增套件</el-button>
        </el-form-item>
      </el-form>
    </el-col>
      <div class="suite-box">
        <el-table :data="templateList" border style="width: 100%" tooltip-effect="dark"
        v-loading="listLoading" @selection-change="selsChange">
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column prop="name" label="套件名称"  align="center">
          </el-table-column>
          <el-table-column prop="catId" label="套件分类"  align="center">
          </el-table-column>
          <!--<el-table-column prop="addTime" label="添加时间" align="center">-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="state" label="状态"  align="center">-->
          <!--</el-table-column>-->
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <!--<el-button type="text">预览</el-button>-->
              <!--<el-button type="text" v-if="scope.row.state == '下线'" @click="popSuite(scope.$index, scope.row)">上线</el-button>-->
              <!--<el-button type="text" v-if="scope.row.state == '上线'" @click="offlineSuite(scope.$index, scope.row)">下线</el-button>-->
              <el-button type="text" @click="editSuite(scope.$index, scope.row)">编辑</el-button>
              <!--<el-button type="text" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
          <el-pagination layout="prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pageSize" >
          </el-pagination>
		  </div>
  </div>
</template>

<script scoped>
  export default {
    name: 'suiteManagement',
    data() {
      return {
        suite: {
          name: '套件名称1',
          classification: '企业官网',
          imageUrl: require('../../assets/logo.jpeg'),
          introduce: '这是一个企业官网的套件'
        },
        filters: {
					name: ''
        },
        total: 0,
				page: 1,
				pageSize:10,
				listLoading: false,
				sels: [],//列表选中列
        timeData: [new Date(), new Date().setFullYear(new Date().getFullYear()+1)],
        btnShow: '',
        componTitle: '',
        classBtn: 1,
        value: '',
        suiteByType:[],
        templateList: [
        //   {
        //   id:1,
        //   addTime: '2016-05-03',
        //   cname:'套件名称1',
        //   name: '企业官网',
        //   num: '0',
        //   state:'下线'
        // }, {
        //   id:2,
        //   addTime: '2016-05-02',
        //   cname:'套件名称2',
        //   name: '在线商城',
        //   num: '5',
        //   state:'上线'
        // }, {
        //   id:3,
        //   addTime: '2016-05-04',
        //   cname:'套件名称3',
        //   name: '外贸站',
        //   num: '3',
        //   state:'上线'
        // }, {
        //   id:4,
        //   addTime: '2016-05-01',
        //   cname:'套件名称4',
        //   name: '工作室',
        //   num: '6',
        //   state:'下线'
        // }, {
        //   id:5,
        //   addTime: '2016-05-08',
        //   cname:'套件名称5',
        //   name: '协会组织',
        //   num: '6',
        //   state:'下线'
        // }, {
        //   id:6,
        //   addTime: '2016-05-06',
        //   cname:'套件名称6',
        //   name: '个人网站',
        //   num: '2',
        //   state:'下线'
        // }, {
        //   id:7,
        //   addTime: '2016-05-07',
        //   cname:'套件名称7',
        //   name: '学校官网',
        //   num: '3',
        //   state:'下线'
        // }
        ]
      }
    },
    watch: {
    },
    components: {
      
    },
    methods: {
      //组件类型
      btnType(i) {
        this.btnShow = i
      },
      //新增套件
      addSuite() {
        this.$router.push({
          path:'/suiteAdd',
          query:{text:'新增套件'}
        })
      },
      //编辑
      editSuite(index, row) {
        this.$router.push({
          path:'/suiteEditor',
          query:{
            text:'编辑套件',
            suite:this.suite,
          }
        })
      },
      //上线
      popSuite(index, row) {
        this.$confirm('确认上线该套件吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let id = row.id;
          this.tableData3[index].state = '上线'
          setTimeout(() => {
            this.listLoading = false;
          }, 500);
        }).catch(() => {

        });
      },
      //下线
      offlineSuite(index, row) {
        this.$confirm('确认下线该套件吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let id = row.id;
          this.tableData3[index].state = '下线'
          setTimeout(() => {
            this.listLoading = false;
          }, 500);
        }).catch(() => {

        });
      },
      //删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该套件吗?', '提示', {
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
      backSuite(){
        this.$router.push({
          path: '/suiteManagement'
        })
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
      //获取套件列表
      getSuiteList(val) {
        let para = {
          page: this.page,
          pageSize: this.pageSize,
          name: this.filters.name,
          startTime:this.timeData[0],
          endTime:this.timeData[1]
        };
        this.$api.apiTemplateList(val).then(res => {
          if(res.msg === "success") {
            this.templateList = res.data
            let x = null
            for(let j = 0;j<this.suiteByType.length;j++){
              const index = this.templateList.findIndex(d => d.catId === this.suiteByType[j].id);
              if(index != -1){
                x = j
              }
              // this.templateList[i].catId = this.suiteByType[index].catName
            }
            for(let i = 0;i<this.templateList.length;i++){
                this.templateList[i].catId = this.suiteByType[x].catName
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      },
    },
		mounted() {
      //获取套件分类列表
      this.$api.apiCatType(3).then(res => {
        if(res.msg === "success") {
          this.suiteByType = res.data
          this.getSuiteList(this.$store.state.sutieId);
        } else {
          this.$message.error(res.msg)
        }
      })
			// this.getSuiteList(this.$route.query.data.id);
		}
  }
</script>

<style lang="scss">
    .suiteClass{
      .toolbar{
        padding-bottom: 0px;
      }
      .suite-edit-head {
        button {
          font-size: 16px;
        }
      }
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
