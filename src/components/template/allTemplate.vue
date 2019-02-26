<template>
  <div class="compent">
   <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
        <!--<div>-->
				<!--<el-form-item label="模版分类:">-->
					<!--<el-input v-model="filters.name" placeholder="请输入模版分类名称" clearable></el-input>-->
				<!--</el-form-item>-->
        <!--<el-form-item label="添加时间:">-->
            <!--<el-date-picker v-model="timeData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <!--</div>-->
				<el-form-item>
					<!--<el-button type="primary" size="small" v-on:click="getComponList">查询</el-button>-->
          <!--<el-button type="primary" size="small" @click="batchRemove" :disabled="this.sels.length===0" >删除</el-button>-->
          <el-button type="primary" size="small" @click="addTemplate">新增模版</el-button>
          <el-button type="primary" size="small" @click="addComponClass">新增模版分类</el-button>
				</el-form-item>
			</el-form>
		</el-col>
      <div class="compent-box">
        <el-table :data="templateTypeLsit"  border style="width: 100%" tooltip-effect="dark"
        v-loading="listLoading" @selection-change="selsChange">
          <!--<el-table-column type="selection" width="55" align="center">-->
          <!--</el-table-column>-->
          <el-table-column prop="catName" label="模版分类"  align="center">
          </el-table-column>
          <!--<el-table-column prop="addTime" label="添加时间" align="center">-->
          <!--</el-table-column>-->
          <el-table-column prop="catNum" label="模版个数"  align="center">
          </el-table-column>
          <!--<el-table-column prop="state" label="状态"  align="center">-->
          <!--</el-table-column>-->
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="manageCompon(scope.$index, scope.row)">管理</el-button>
              <!--<el-button type="text" @click="editCompon(scope.$index, scope.row)">编辑</el-button>-->
              <!--<el-button type="text" v-if="scope.row.state == '下线'" @click="popCompon(scope.$index, scope.row)">上线</el-button>-->
              <!--<el-button type="text" v-if="scope.row.state == '上线'" @click="offlineCompon(scope.$index, scope.row)">下线</el-button>-->
              <el-button type="text" v-if="scope.row.catNum == 0" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--<div class="pagination">-->
          <!--<el-pagination layout="prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pageSize" >-->
          <!--</el-pagination>-->
		  <!--</div>-->
   
    <el-dialog :title="componTitle" :visible.sync="dialogVisible" width="500px">
      <div class="el-componClass" v-show="editShow">
        <el-form :inline="true" :model="addCatRequest" :rules="rules2" class="demo-form-inline" label-width="120px" ref="addCatRequest">
          <el-form-item label="模版分类名称:" prop="catName">
            <el-input v-model="addCatRequest.catName" :placeholder="dialogText"></el-input>
          </el-form-item>
          <el-form-item label="网页别名:" prop="catExt">
            <el-input v-model="addCatRequest.catExt" placeholder="请输入网页别名">
              <template slot="append">.html</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="el-componClassBtn">
        <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="saveCompon" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import API from '../config/server';
  export default {
    name: 'allTemplate',
    data() {
      const re=/^[a-zA-Z]+$/;
      let validateEnglish = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("网页别名不能为空"));
        } else if (!re.test(value)) {
          callback(new Error("不能输入英文以外的字符!"));
        } else {
          callback();
        }
      }
      return {
        rules2: {
          catName: [
            {required: true, message: '分类名称不能为空'},
            { max: 6, message: '不能超过6字符', trigger: 'blur' }
          ],
          catExt: [
            { validator: validateEnglish, trigger: 'blur' },
            { max: 20, message: '不能超过20字符', trigger: 'blur' }
          ]
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
        dialogVisible: false,
        dialogStu: '',
        dialogText: '',
        editShow: true,
        addShow: false,
        value: '',
        addCatRequest: {
          catExt: '',
          catName: '',
          catType:2
        },
        templateTypeLsit: []
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
      //清除
      clear() {
        this.addCatRequest.catName = ''
      },
      //新增组件
      addTemplate() {
        let param = {
          index:''
        }
        this.$store.commit('saveTemplateData', param)
        this.$router.push({
          path:'/addTemplate',
          query:{text:'新增模版',pageId:1}
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
        this.addCatRequest.catName = row.name;
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
      //上线
      popCompon(index, row) {
        this.$confirm('上线后该分类将出现在模版选择器,确认上线该模块吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let id = row.id;
          setTimeout(() => {
            this.listLoading = false;
            this.templateTypeLsit[index].state = '上线'
          }, 500);
        }).catch(() => {

        });
      },
      //下线
      offlineCompon(index, row) {
        this.$confirm('下线后该分类将消失在模版选择器,确认下线该模块吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let id = row.id;
          setTimeout(() => {
            this.listLoading = false;
            this.templateTypeLsit[index].state = '下线'
          }, 500);
        }).catch(() => {

        });
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
              this.getComponList();
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
      manageCompon(index, row) {
        this.$store.commit('saveTemplateData', row)
        this.$router.push({
          path: '/templateEditor',
          query:{text:'新增模版',pageId:1,catIndex:index}
        })
      },
      //保存
      saveCompon() {
        switch(this.dialogStu) {
          case 'addClass':
            //新增模板分类
            this.$refs.addCatRequest.validate((valid) => {
              if (valid) {
                API.apiAddCat({
                  catExt: this.addCatRequest.catExt,
                  catName: this.addCatRequest.catName,
                  catType: this.addCatRequest.catType
                }).then(res => {
                  console.log(res)
                  if (res.code === 200) {
                    this.dialogVisible = false
                    this.getComponList()
                  } else {
                    this.$message.error(res.msg)
                  }

                })
              }
            });
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
      //获取模版分类列表
			getComponList() {
				console.log('获取列表')
        let para = {
          page: this.page,
          pageSize: this.pageSize,
          name: this.filters.name,
          startTime:this.timeData[0],
          endTime:this.timeData[1]
        };
        API.apiCatType(2).then(res => {
          if(res.msg === "success") {
            this.templateTypeLsit = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      //当前页码
			handleCurrentChange(val) {
				this.page = val;
				this.getComponList();
			},
			//当前条数
			handleSizeChange(val) {
				this.pageSize = val;
				this.getComponList();
			},
    },
		mounted() {
			this.getComponList();
		}
  }
</script>

<style lang="scss" scoped>
    .compent-head {
    margin-top: 10px;
    .compent-head-class {
      align-items: center;
      display: flex;
      .el-input {
        width: 300px;
        margin: 0 10px 0 10px;
      }
    }
    .compent-head-type {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .compent-head-btn {
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
  
  .compent-box {
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
  

</style>
