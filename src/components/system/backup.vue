<template>
    <div class="backup">
      <div class="btn-back"><el-button type="primary" >数据备份</el-button></div>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="备份记录" name="duplicateRecord">
          <el-table :data="templateTypeLsit"  style="width: 100%" tooltip-effect="dark"
                    v-loading="listLoading" @selection-change="selsChange" :show-header="false">
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column prop="operatingTime" label="操作时间"  align="center">
            </el-table-column>
            <el-table-column prop="operationType" label="操作类型" align="center">
            </el-table-column>
            <el-table-column prop="operationContent" label="操作内容"  align="center">
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button type="text">恢复</el-button>
                <el-button type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-button type="primary" >全选</el-button>
            <el-button type="primary" :disabled="this.sels.length===0">批量删除</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="恢复记录" name="restoreRecords">
          <el-table :data="templateTypeLsit"  style="width: 100%" tooltip-effect="dark"
                    v-loading="listLoading" @selection-change="selsChange" :show-header="false">
            <!--<el-table-column type="selection" width="55" align="center">-->
            <!--</el-table-column>-->
            <el-table-column prop="operatingTime" label="操作时间"  align="center">
            </el-table-column>
            <el-table-column prop="operationType" label="操作类型" align="center">
            </el-table-column>
            <el-table-column prop="operationContent" label="操作内容"  align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
    export default {
      name: "backup",
      data() {
        return {
          sels:[],
          listLoading:false,
          activeName: 'duplicateRecord',
          templateTypeLsit: [
            {
              operatingTime:'2019-01-01 16:39:01',
              operationType:'登录',
              operationContent:'登录成功',
              IPAddress:'119.120.31.207'
            },
            {
              operatingTime:'2019-01-01 16:39:01',
              operationType:'修改密码',
              operationContent:'修改密码为：123456成功',
              IPAddress:'119.120.31.207'
            },
            {
              operatingTime:'2019-01-01 16:39:01',
              operationType:'新增组件',
              operationContent:'新增组件成功',
              IPAddress:'119.120.31.207'
            },
            {
              operatingTime:'2019-01-01 16:39:01',
              operationType:'登录',
              operationContent:'登录成功',
              IPAddress:'119.120.31.207'
            }
          ],
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        },
        selsChange: function (sels) {
          this.sels = sels;
        },
      }
    }
</script>

<style lang="scss">
  .backup{
    .btn-back{
      margin: 20px 0;
    }
    .el-tabs__item {
      padding: 0 20px;
      height: 40px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      line-height: 40px;
      display: inline-block;
      list-style: none;
      font-size: 18px;
      font-weight: 500;
      color: #303133;
      position: relative;
    }
  }
</style>
