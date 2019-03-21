<template>
  <div class="banner">
    <el-row>
      <el-col :span="5">
        <div class="banner-left">
        <div v-for="(item,index) in bannerList" :key="index" @click="btnType(index)" :class="{'banner-left-show':activeShow==index}">
          {{item}}
        </div>
      </div>
      </el-col>
      <el-col :span="19">
        <div>
          <el-col :span="24" class="toolbar">
            <el-button type="primary" size="small">批量删除</el-button>
            <el-button type="primary" size="small" @click="bannerAdd">新增banner</el-button>
          </el-col>
          <div class="bannner-box">
            <el-table
              :data="tableData"
              border
              row-key="id"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column type="selection" width="55" align="center">
              </el-table-column>
              <el-table-column prop="name" label="banner名称" align="center">
              </el-table-column>
              <el-table-column prop="url" width="250" label="链接/活动名称" align="center">
              </el-table-column>
              <el-table-column prop="createTime" label="上传时间" align="center">
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
              </el-table-column>
              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="manageBanner(scope.$index, scope.row)">管理</el-button>
                  <el-button type="text" @click="editBanner(scope.$index, scope.row)">编辑</el-button>
                  <el-button type="text" v-if="scope.row.state == '下线'" @click="popCompon(scope.$index, scope.row)">上线</el-button>
                  <el-button type="text" v-if="scope.row.state == '上线'" @click="offlineCompon(scope.$index, scope.row)">下线</el-button>
                  <el-button type="text" v-if="scope.row.catNum == 0" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
  </div>
</template>

<script>
  import Sortable from 'sortablejs'
    export default {
        name: "banner",
      data() {
        return {
          pageAll:0,
          page:1,
          pageSize:10,
          activeShow:0,
          filters: {
            name: ''
          },
          bannerList:['首页','模板','教程中心','案例','关于我们'],
          tableData: []
        }
      },
      mounted() {
        this.rowDrop()
      },
      methods: {
        //切换目录
        btnType(i){
          this.activeShow = i
        },
        bannerAdd(){
          this.$router.push({
            path:'/bannerAdd',
            query:{text:'新增banner',pageId:1}
          })
        },
        //管理banner
        manageBanner(index,row){

        },
        //编辑banner
        editBanner(index,row){

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
      }
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
