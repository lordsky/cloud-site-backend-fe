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
          <el-button type="primary" size="small" v-on:click="getSuiteList">查询</el-button>
          <el-button type="primary" size="small" @click="batchRemove" :disabled="this.sels.length===0" >批量删除</el-button>
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
          <el-table-column prop="addTime" label="添加时间" align="center">
          </el-table-column>
          <el-table-column label="状态"  align="center">
            <template slot-scope="scope">
              {{scope.row.onlineStatus == 1 ? '上线':'下线'}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="previewSuite(scope.$index, scope.row)">预览</el-button>
              <el-button type="text" v-if="scope.row.onlineStatus == -1" @click="popSuite(scope.$index, scope.row)">上线</el-button>
              <el-button type="text" v-if="scope.row.onlineStatus == 1" @click="offlineSuite(scope.$index, scope.row)">下线</el-button>
              <el-button type="text" @click="editSuite(scope.$index, scope.row)">编辑</el-button>
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

<script scoped>
  export default {
    name: 'suiteManagement',
    data() {
      return {
        suite: {
          name: '',
          classification: '',
          imageUrl: '',
          introduce: ''
        },
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
        btnShow: '',
        componTitle: '',
        classBtn: 1,
        value: '',
        suiteByType:[],
        templateList: []
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
          query:{text:'新增套件',pageId:2
            ,catType:{
              catName:this.$store.state.suiteData.data.catName,
              id:this.$store.state.suiteData.data.id,
              index:this.$store.state.suiteData.catIndex
            }}
        })
      },
      //预览套件页面
      previewSuite(index,row){
        this.$router.push({
          path:'/preview',
          query:{
            id:row.id,
            title:row.name
          }
        })
      },
      //编辑
      editSuite(index, row) {
        this.$router.push({
          path:'/suiteEditor',
          query:{
            text:'编辑套件',
            suite:row,
          }
        })
      },
      //上线
      popSuite(index, row) {
        this.$confirm('确认上线该套件吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.apiOnlineOperate({
            catType: 3,
            id:row.id,
            operateType:1
          }).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.getSuiteList(this.$store.state.sutieId);
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      //下线
      offlineSuite(index, row) {
        this.$confirm('确认下线该套件吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.apiOnlineOperate({
            catType: 3,
            id:row.id,
            operateType:-1
          }).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.getSuiteList(this.$store.state.sutieId);
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      //删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该套件吗?', '提示', {
					type: 'warning'
				}).then(() => {
          this.$api.apiDelTemplate(row.id).then(res=>{
            if(res.code === 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getSuiteList(this.$store.state.sutieId);
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
				console.log(ids)
        for (let id of ids) {
          this.$api.apiDelTemplate(id).then(res=>{
            if(res.code === 200){
              this.getSuiteList(this.$store.state.sutieId);
            }
          })
        }
				// this.$confirm('确认删除选中记录吗？', '提示', {
				// 	type: 'warning'
				// }).then(() => {
        //   this.listLoading = true;
				// 	//NProgress.start();
        //   let para = { ids: ids };
        //   setTimeout(() => {
        //   this.listLoading = false;
        //   }, 500);
				// }).catch(() => {
        //
				// });
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
				this.getSuiteList();
			},
			//当前条数
			handleSizeChange(val) {
				this.pageSize = val;
				this.getSuiteList();
			},
      //获取套件列表
      getSuiteList() {
        let para = {
          pageNum: this.page,
          pageSize: this.pageSize,
          catId:this.$store.state.sutieId,
          key: this.filters.name,
          startDate:this.timeData == null ? '' : this.timeData[0] != undefined ? this.$http.getLocalTime(this.timeData[0]) : '',
          endDate:this.timeData == null ? '' : this.timeData[1] != undefined ? this.$http.getLocalTime(this.timeData[1]) : ''
        };
        this.$api.apiTemplateList(para).then(res => {
          if(res.msg === "success") {
            this.templateList = res.data.content
            this.pageAll = res.data.totalElements
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
      if(this.$store.state.sutieId == null || this.$store.state.sutieId == ''){
        this.$router.push({
          path: '/suiteManagement'
        })
        return
      }
      //获取套件分类列表
      this.$api.apiByCatType(3).then(res => {
        if(res.msg === "success") {
          this.suiteByType = res.data
          this.getSuiteList();
        } else {
          this.$message.error(res.msg)
        }
      })
			// this.getSuiteList(this.$route.query.data.id);
		}
  }
</script>

<style lang="scss" scoped>
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
