<template>
  <div class="banner">
    <el-row>
      <el-col :span="5">
        <div class="banner-left">
        <div v-for="(item,index) in bannerList" :key="index" @click="btnType(item.id,index)" :class="{'banner-left-show':activeShow==index}">
          {{item.name}}
        </div>
      </div>
      </el-col>
      <el-col :span="19">
        <div>
          <el-col :span="24" class="toolbar">
            <el-button type="primary" size="small" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-button type="primary" size="small" @click="bannerAdd">新增banner</el-button>
          </el-col>
          <div class="bannner-box">
            <el-table
              :data="tableData"
              border
              row-key="id"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="selsChange">
              <el-table-column type="selection" width="55" align="center">
              </el-table-column>
              <el-table-column prop="name" label="banner名称" align="center">
              </el-table-column>
              <el-table-column width="250" label="链接/活动名称" align="center">
                <template slot-scope="scope">
                  {{scope.row.url == '' ? '暂无设置' : scope.row.url}}
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="上传时间" align="center">
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  {{scope.row.status == 1 ? '在线' : '下线'}}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <el-button type="text" v-if="scope.row.status == -1" @click="popCompon(scope.$index, scope.row)">上线</el-button>
                  <el-button type="text" v-if="scope.row.status == 1" @click="offlineCompon(scope.$index, scope.row)">下线</el-button>
                  <el-button type="text" @click="manageBanner(scope.$index, scope.row)">查看</el-button>
                  <el-button type="text" @click="editBanner(scope.$index, scope.row)">编辑</el-button>
                  <el-button type="text" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column label="Drag" align="center">
                <template slot-scope="{}">
                  <i class="el-icon-rank drag"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import Sortable from 'sortablejs'
    export default {
        name: "banner",
      data() {
        return {
          imageUrl:'',
          dialogVisible:false,
          positionId:1,
          pageAll:0,
          page:1,
          pageSize:10,
          activeShow:0,
          sels:'',
          filters: {
            name: ''
          },
          bannerList:[{
            id:1,
            name:'首页'
          },{
            id:2,
            name:'模板'
          },{
            id:3,
            name:'教程中心'
          },{
            id:4,
            name:'案例'
          },{
            id:5,
            name:'关于我们'
          }],
          tableData: []
        }
      },
      methods: {
        //切换目录
        btnType(id,i){
          this.positionId = id
          this.getBannerList()
          this.activeShow = i
        },
        bannerAdd(){
          this.$router.push({
            path:'/bannerAdd'
          })
        },
        //管理banner
        manageBanner(index,row){
          // this.dialogVisible = true
          this.imageUrl = row.imageUrl
          window.open(this.imageUrl)
        },
        //编辑banner
        editBanner(index,row){
          this.$router.push({
            path:'/bannerEdit',
            query:{data:row}
          })
        },
        //删除
        handleDel(index,data){
          this.$confirm('确认删除该banner吗?', '提示', {
            type: 'warning'
          }).then(() => {
            let a = []
            a.push(data.id)
            this.$api.apiDelBanner({
              idList:a
            }).then(res=>{
              if(res.code ===200){
                this.getBannerList()
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
          this.$confirm('确认删除选中banner吗？', '提示', {
            type: 'warning'
          }).then(() => {
            console.log(ids)
            let a = []
            a.push(ids)
            this.$api.apiDelBanner({
              idList:ids
            }).then(res=>{
              if(res.code ===200){
                this.getBannerList()
              }else {
                this.$message.error(res.msg)
              }
            })
          }).catch(() => {

          });
        },
        //当前页码
        handleCurrentChange(val) {
          this.page = val;
          this.getBannerList();
        },
        //当前条数
        handleSizeChange(val) {
          this.pageSize = val;
          this.getBannerList();
        },
        getBannerList(){
          let parm = {
            positionId:this.positionId,
            pageNum: this.page,
            pageSize: this.pageSize
          };
          this.$api.apiBannerList(parm).then(res=>{
            if(res.msg === "success") {
              this.tableData = res.data.content
              this.pageAll = res.data.totalElements
            } else {
              this.$message.error(res.msg)
            }
          })
        },
        //行拖拽
        rowDrop() {
          const tbody = document.querySelector('.el-table__body-wrapper tbody')
          const _this = this
          Sortable.create(tbody, {
            onEnd({ newIndex, oldIndex }) {
              const currRow = _this.tableData.splice(oldIndex, 1)[0]
              _this.tableData.splice(newIndex, 0, currRow)
            }
          })
        },
      },
      mounted() {
        this.rowDrop()
        this.getBannerList()
      },
    }
</script>

<style lang="scss">
  .banner {
    margin-top: 10px;
    /*display: flex;*/
    .banner-left{
      width: 15vw;
      height: calc(100vh - 160px);
      box-shadow: 0 0 10px #cccccc;
      margin-right: 20px;
      white-space: nowrap;
      padding: 30px;
      div{
        cursor: pointer;
        padding: 12px 30px;
        cursor: pointer;
        &:hover{
          background-color: #409EFF;
          color: white;
        }
      }
      .banner-left-show{
        background-color: #409EFF;
        color: white;
      }
    }
    .toolbar{
      margin-bottom: 10px;
      text-align: right;
    }
    .pagination{
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
    .bannner-box {
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
    .drag{
      font-size: 24px;
      cursor: pointer;
    }
  }
</style>
