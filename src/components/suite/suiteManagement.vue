<template>
  <div class="suite">
   <el-col :span="24" class="toolbar">
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
					<el-button type="primary" size="small" v-on:click="getSuiteList">查询</el-button>
          <!--<el-button type="primary" size="small" @click="batchRemove" :disabled="this.sels.length===0" >删除</el-button>-->
          <el-button type="primary" size="small" @click="addSuite">新增套件</el-button>
          <el-button type="primary" size="small" @click="addComponClass">新增套件分类</el-button>
				</el-form-item>
			</el-form>
		</el-col>
      <div class="suite-box">
        <el-table :data="suiteByType" border style="width: 100%" tooltip-effect="dark"
        v-loading="listLoading" @selection-change="selsChange">
          <!--<el-table-column type="selection" width="55" align="center">-->
          <!--</el-table-column>-->
          <el-table-column prop="catName" label="套件分类"  align="center">
          </el-table-column>
          <el-table-column prop="addTime" label="添加时间" align="center">
          </el-table-column>
          <el-table-column prop="catNum" label="套件个数"  align="center">
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="manageSuite(scope.$index, scope.row)">管理</el-button>
              <el-button type="text" @click="editCompon(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" v-if="scope.row.catNum == 0" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
   
    <el-dialog :title="componTitle" :visible.sync="dialogVisible" width="500px">
      <div class="el-suiteClass" v-show="editShow">
        <el-form :inline="true" :model="addCatRequest" class="demo-form-inline" ref="addCatRequest">
          <el-form-item label="套件分类名称:" prop="catName" :rules="[{required: true, message: '分类名称不能为空'},{ max: 6, message: '不能超过6字符', trigger: 'blur' }]">
            <el-input v-model="addCatRequest.catName" :placeholder="dialogText"></el-input>
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

<script scoped>
  export default {
    name: 'suiteManagement',
    data() {
      return {
        filters: {
					name: ''
        },
        pageAll:0,
        total: 0,
				page: 1,
				pageSize:10,
				listLoading: false,
				sels: [],//列表选中列
        timeData: [],
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
        addCatRequest: {
          id:'',
          catExt: '',
          catName: '',
          catType:3
        },
        suiteByType: []
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
        this.$refs['addCatRequest'].resetFields();
      },
      //组件类型
      btnType(i) {
        this.btnShow = i
      },
      //清除
      clear() {
        this.addCatRequest.catName = ''
        this.formAdd.selectText = ''
      },
      //新增组件
      addSuite() {
        this.$router.push({
          path:'/suiteAdd'
        })
      },
      //  新模版件分类
      addComponClass() {
        this.clear()
        this.dialogVisible = true
        this.editShow = true
        this.componTitle = '新增套件分类'
        this.dialogStu = 'addClass'
        this.dialogText = '不超过6个字符'
      },
      //编辑
      editCompon(index, row) {
        // this.clear()
        this.dialogVisible = true
        this.editShow = true
        this.addCatRequest.id = row.id
        this.addCatRequest.catName = row.catName;
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
          this.$http.delete(this.$API.componentDel+row.id,{
          },(res)=>{
            if(res.data.data){
              this.getSuiteList();
              this.listLoading = false;
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
      manageSuite(index, row) {
        let suiteData = {
          data:row,
          catIndex:index
        }
        this.$store.commit('saveSuiteId', row.id)
        this.$store.commit('saveSuiteData', suiteData)
        this.$router.push({
          path: '/suiteClassification',
          query:{text:row.catName}
        })
      },
      //保存
      saveCompon() {
        switch(this.dialogStu) {
          case 'addClass':
            //新增套件分类
            this.$refs.addCatRequest.validate((valid) => {
              if (valid) {
                this.$api.apiAddCat({
                  catExt: this.addCatRequest.catName,
                  catName: this.addCatRequest.catName,
                  catType:this.addCatRequest.catType
                }).then(res => {
                  console.log(res)
                  if(res.code === 200) {
                    this.dialogVisible = false
                    this.getSuiteList()
                  } else {
                    this.$message.error(res.msg)
                  }

                })
              }
            });
            console.log('新增分类')
            break;
          case 'edit':
            //编辑模板分类
            this.$refs.addCatRequest.validate((valid) => {
              if (valid) {
                this.$api.apiUpdateCat({
                  id:this.addCatRequest.id,
                  catName: this.addCatRequest.catName,
                  catType: this.addCatRequest.catType
                }).then(res => {
                  console.log(res)
                  if (res.code === 200) {
                    this.dialogVisible = false
                    this.getSuiteList()
                  } else {
                    this.$message.error(res.msg)
                  }

                })
              }
            });
            break;
          case 'del':
            console.log('删除')
            break;
          case 'pop':
          console.log('上线')
          break;
        }
      },
      //获取套件分类列表
      getSuiteList() {
        console.log('获取列表')
        let para = {
          catType:3,
          pageNum: this.page,
          pageSize: this.pageSize,
          catName: this.filters.name,
          startDate:this.timeData == null ? '' : this.timeData[0] != undefined ? this.$http.getLocalTime(this.timeData[0]) : '',
          endDate:this.timeData == null ? '' : this.timeData[1] != undefined ? this.$http.getLocalTime(this.timeData[1]) : ''
        };
        this.$api.apiCatType(para).then(res => {
          if(res.msg === "success") {
            this.suiteByType = res.data.content
            this.pageAll = res.data.totalElements
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      //当前页码
			handleCurrentChange(val) {
				this.page = val;
				this.getSuiteList();
			},
			//当前条数
			handleSizeChange(val) {
				this.pageSize = val;
				this.getSuiteList();
			},
    },
		mounted() {
			this.getSuiteList();
		}
  }
</script>

<style lang="scss">
    .suite{
      .toolbar{
        padding-bottom: 0;
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
