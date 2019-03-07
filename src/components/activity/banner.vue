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
              <el-table-column prop="address" width="250" label="链接/活动名称" align="center">
              </el-table-column>
              <el-table-column prop="date" label="上传时间" align="center">
              </el-table-column>
              <el-table-column prop="stats" label="状态" align="center">
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
      </el-col>
    </el-row>
    <!--<pre style="text-align: left">-->
      <!--{{col}}-->
    <!--</pre>-->
    <!--<hr>-->
    <!--<pre style="text-align: left">-->
      <!--{{tableData}}-->
    <!--</pre>-->
  </div>
</template>

<script>
  import Sortable from 'sortablejs'
  import TemplateEditor from "../template/templateEditor";
    export default {
        name: "banner",
      components: {TemplateEditor},
      data() {
        return {
          activeShow:0,
          filters: {
            name: ''
          },
          bannerList:['首页','模板','教程中心','案例','关于我们'],
          tableData: [
            {
              id: '1',
              date: '2016-05-02',
              name: 'banner1',
              address: 'www.xxx.com',
              stats:'在线'
            },
            {
              id: '2',
              date: '2016-05-04',
              name: 'banner1',
              address: 'www.xxx.com',
              stats:'在线'
            },
            {
              id: '3',
              date: '2016-05-01',
              name: 'banner1',
              address: 'www.xxx.com',
              stats:'在线'
            },
            {
              id: '4',
              date: '2016-05-03',
              name: 'banner1',
              address: 'www.xxx.com',
              stats:'在线'
            }
          ]
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

<style lang="scss" scoped>
  .banner {
    margin-top: 10px;
    /*display: flex;*/
    .banner-left{
      width: 15vw;
      height: calc(100vh - 160px);
      box-shadow: 0 0 10px #cccccc;
      margin-right: 20px;
      white-space: nowrap;
      div{
        cursor: pointer;
        padding: 15px 30px;
        &:hover{
          background-color: #4149ff;
          color: #fdfff8;
        }
      }
      .banner-left-show{
        background-color: #3c7bff;
        color: white;
      }
    }
    .toolbar{
      margin-bottom: 10px;
      text-align: right;
    }
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
</style>
