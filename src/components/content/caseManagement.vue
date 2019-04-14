<template>
  <div class="case">
    <el-row>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form ref="filters" :inline="true" :model="filters">
          <div>
            <el-form-item label="案例标题:" prop="name">
              <el-input v-model="filters.name" placeholder="请输入关键字" clearable></el-input>
            </el-form-item>
            <el-form-item label="案例类型" prop="caseType">
              <el-select v-model="filters.caseIndex" placeholder="全部" class="el-select-banner">
                <el-option :label="x.catName" :value="i" v-for="(x,i) in setTree" :key="i"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="state">
              <el-select v-model="filters.state" placeholder="全部" class="el-select-banner">
                <el-option :label="x.name" :value="x.id" v-for="(x,i) in stateList" :key="i"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间:" prop="timeData">
              <el-date-picker v-model="filters.timeData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" size="small" @click="getCaseList">查询</el-button>
            <el-button type="primary" size="small" @click="resetForm">清空</el-button>
            <el-button type="primary" size="small" @click="batchRemove" :disabled="this.sels.length===0" >批量删除</el-button>
            <el-button type="primary" size="small" @click="caseAdd">新增案例</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <div class="case-left">
          <div style="text-align: center"><el-button type="primary" @click="dialogVisible2 = true">创建一级目录</el-button></div>
          <el-tree
            :data="setTree"
            :props="defaultProps"
            node-key="id"
            ref="treeBox"
            @node-click="handleNodeClick"
            :filter-node-method="filterNode"
            @node-contextmenu='rihgtClick'
            accordion
            :highlight-current="true"
          >
            <span class="slot-t-node" slot-scope="{ node, data }">
              <span v-show="!node.isEdit">
                <span v-show="!data.children || data.children.length == 0">
                  <i class='' style='margin-right:10px'></i>
                  <span :class="[data.id >= maxexpandId ? 'slot-t-node--label' : '']">{{node.label}}</span>
                </span>
              </span>
              <!-- 编辑输入框 -->
              <span v-show="node.isEdit">
                <el-input class="slot-t-input" size="mini" autofocus
                          v-model="data.catName"
                          :ref="'slotTreeInput'+data.id"
                          @blur.stop="NodeBlur(node, data)"
                          @keyup.enter.native="NodeBlur2(node, data)"></el-input>
              </span>
            </span>
          </el-tree>
          <!--鼠标右键点击出现页面-->
          <div v-show="menuVisible">
            <ul id="rightClickMenu" class="menu">
              <li class="menu__item" @click="NodeEdit">重命名</li>
              <li class="menu__item" @click="NodeDel">删除分类</li>
            </ul>
          </div>
          <!--<div v-show="menuVisible">-->
            <!--<el-menu-->
              <!--id = "rightClickMenu"-->
              <!--class="el-menu-vertical"-->
              <!--@select="handleRightSelect"-->
              <!--background-color="#545c64"-->
              <!--active-text-color="#fff"-->
              <!--text-color="#fff">-->
              <!--<el-menu-item index="2" class="menuItem">-->
                <!--<span slot="title">重命名</span>-->
              <!--</el-menu-item>-->
              <!--<el-menu-item index="3" class="menuItem">-->
                <!--<span slot="title">删除分类</span>-->
              <!--</el-menu-item>-->
            <!--</el-menu>-->
          <!--</div>-->
        </div>
      </el-col>
      <el-col :span="20">
        <div>
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
              <el-table-column prop="name" label="案例标题" align="center">
              </el-table-column>
              <el-table-column prop="caseCatsId" label="案例类型" align="center">
              </el-table-column>
              <el-table-column prop="link" label="链接" align="center" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="createTime" label="发布时间" align="center">
              </el-table-column>
              <el-table-column label="是否首页" align="center">
                <template slot-scope="scope">
                  {{scope.row.isIndex == -1 ? '否' : '是'}}
                </template>
              </el-table-column>
              <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                  {{scope.row.onlineStatus == -1 ? '下线' : '上线'}}
                </template>
              </el-table-column>
              <el-table-column label="操作"  align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="manageCase(scope.$index, scope.row)">查看</el-button>
                  <el-button type="text" @click="editcase(scope.$index, scope.row)">编辑</el-button>
                  <el-button type="text" v-if="scope.row.isIndex == -1" @click="editIsIndex(scope.$index, scope.row)">设置首页</el-button>
                  <el-button type="text" v-if="scope.row.isIndex == 1" @click="editIsIndex2(scope.$index, scope.row)">取消首页</el-button>
                  <el-button type="text" v-if="scope.row.onlineStatus == -1" @click="popCase(scope.$index, scope.row)">上线</el-button>
                  <el-button type="text" v-if="scope.row.onlineStatus == 1" @click="offlineCase(scope.$index, scope.row)">下线</el-button>
                  <el-button type="text" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
    <!--创建分类弹框-->
    <el-dialog title="创建分类" :visible.sync="dialogVisible2" width="400px" center>
      <el-form :inline="true" :model="formCompon" class="demo-form-inline" ref="formCompon">
        <el-form-item label="分类名称:" prop="name" :rules="[{required: true, message: '分类名称不能为空'},{ max: 6, message: '不能超过6字符', trigger: 'blur' }]">
          <el-input v-model="formCompon.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm2">取消</el-button>
        <el-button type="primary" @click="handleAddTop">确定</el-button>
          </span>
    </el-dialog>
    <!--创建分类弹框-->
  </div>
</template>

<script>
  import api from '../config/api'
  let id = 1000;
  export default {
    name: "case",
    data() {
      return {
        caseIndex:'',
        formCompon:{
          name : '',
        },
        showAdd:true,
        DATA: null,
        NODE: null,
        dialogVisible2:false,
        dialogFormVisible: false,
        dialogClassifyVisible: false,
        maxexpandId: api.maxexpandId,//新增节点开始id
        non_maxexpandId: api.maxexpandId,//新增节点开始id(不更改)
        isLoadingTree: true,//是否加载节点树
        setTree: [
          {
            id:'',
            catName:'全部案例'
          }
        ],//节点树数据
        defaultProps: {
          children: 'children',
          label: 'catName'
        },
        stateList:[//状态选择
          {
            id:-1,
            name:'下线'
          },
          {
            id:1,
            name:'在线'
          }
        ],
        sels:'',
        caseCatsId:'',
        state:'',
        caseType:'',
        filterText: '',
        input: "",
        currentPage4: 4,
        editObj: {},
        menuVisible: false,
        objectID: null,
        pageAll:0,
        page:1,
        pageSize:10,
        activeShow:0,
        oldName:'',
        activeState:'',//状态
        filters: {//存放查询数据
          name: '',
          timeData:[],
          caseType:'',
          state:'',
          caseIndex:0
        },
        caseList:['首页','模板','教程中心','案例','关于我们'],
        tableData: []//案例表单列表
      }
    },
    methods: {
      //新增一级目录
      handleAddTop() {
        this.$refs.formCompon.validate((valid) => {
          if (valid) {
            let parm = {
              id:"",
              catName:this.formCompon.name
            }
            this.$api.apiAddCaseType(parm).then(res=>{
              if(res.msg === 'success'){
                this.$message.success("添加成功！")
                // this.setTree.push({
                //   id: res.data,
                //   name: this.formCompon.name,
                //   pid: '',
                //   isEdit: false,
                //   children: []
                // })
                this.dialogVisible2 = false
                this.getCaseCat('')
              }else{
                this.$message.error(res.msg)
              }
            })
          }
        });
      },
      filterNode(value, data) {
        console.log('value:',value)
        console.log('data:',data)
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      //右键事件
      handleRightSelect(key) {
        console.log(key);
        if (key == 1) {
          this.NodeAdd(this.NODE, this.DATA);
          this.menuVisible = false;
        } else if (key == 2) {
          this.NodeEdit(this.NODE, this.DATA);
          this.menuVisible = false;
        } else if (key == 3) {
          this.NodeDel(this.NODE, this.DATA);
          this.menuVisible = false;
        }
      },
      //重命名时触发
      NodeBlur(n, d){//输入框失焦
        n = this.NODE
        d = this.DATA
        if(n.isEdit){
          this.$set(n, 'isEdit', false)
        }
        if(d.catName.length > 6){
          this.$message.error("目录不得超过6个字符")
          d.catName = this.oldName
          return
        }
        let parm = {
          id:d.id,
          catName: d.catName
        }
        this.$nextTick(() => {
          this.$api.apiAddCaseType(parm).then(res=>{
            if(res.msg === 'success'){
              this.$message.success("修改成功！")
              this.getCaseList()
            }else{
              this.$message.error(res.msg)
            }
          })
          this.$refs['slotTreeInput'+d.id].$refs.input.focus()
        })
      },
      NodeBlur2(n, d){
        n = this.NODE
        d = this.DATA
        this.$refs['slotTreeInput'+d.id].$refs.input.blur()
      },
      NodeEdit(n, d){//编辑节点
        n = this.NODE
        d = this.DATA
        if(!n.isEdit){//检测isEdit是否存在or是否为false
          this.$set(n, 'isEdit', true)
        }
        let _this = this
        setTimeout(function () {
          _this.$refs['slotTreeInput' + d.id].$refs.input.focus()
        }, 1)
      },
      NodeDel(n, d){//删除节点
        n = this.NODE
        d = this.DATA
        let that = this;
        if(d.caseNum != null){
          this.$message.error("此节点有子级，不可删除！")
          return false;
        }else{
          this.$confirm('是否删除此目录？', '提示', {
            type: 'warning'
          }).then(() => {
            this.$api.apiDelCaseType(d.id).then(res=>{
              if(res.msg === 'success'){
                this.$message.success("删除成功！")
                this.getCaseCat('')
              }else{
                this.$message.error(res.msg)
              }
            })
          }).catch(() => {

          });
        }
      },
      //新增二级目录
      NodeAdd(n, d){//新增节点
        console.log(n, d)
        //判断层级
        if(n.level >= 2){
          this.$message.error("最多只支持二级！")
          return false;
        }
        //新增数据
        d.children.push({
          id: ++this.maxexpandId,
          name: '新增目录',
          pid: d.id,
          children: []
        })
        //同时展开节点
        if(!n.expanded){
          n.expanded = true
        }
      },
      rihgtClick(event, object, value, element) {
        this.showAdd = object.pid == '' ? true : false
        if(object.id == ''){
          this.menuVisible = false
          return
        }
        this.objectID = object.id;
        this.menuVisible = true;
        this.DATA = object;
        this.NODE = value;
        this.oldName = this.DATA.catName
        // if (this.objectID !== object.id) {
        //
        // } else {
        //   this.menuVisible = !this.menuVisible;
        // }
        document.addEventListener('click',(e)=>{
          this.menuVisible = false;
        })
        let menu = document.querySelector("#rightClickMenu");
        /* 菜单定位基于鼠标点击位置 */
        menu.style.left = event.clientX - 280 + 'px'
        document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
        menu.style.top = event.clientY - 150 + 'px'
        // if(event.clientX>300){
        //   menu.style.left = event.clientX / 16 - 15 + "vw";
        // }else{
        //   menu.style.left = event.clientX/16 - 5 + "vw";
        // }
        // if(event.clientX>400){
        //   menu.style.left = event.clientX /16 - 20 + "vw";
        // }
        // if(event.clientX>500){
        //   menu.style.left = event.clientX /16 - 25 + "vw";
        // }
        // menu.style.top = event.clientY / 16 - 6 + "vh";
        // menu.style.position = "absolute"; // 为新创建的DIV指定绝对定位
        // menu.style.width = 100 + "px";
        // // menu.style.backgroundColor = '#646464';
        // menu.style.zIndex = '1000'
      },
      foo() { // 取消鼠标监听事件 菜单栏
        this.menuVisible = false
        document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
      },
      handleNodeClick(d, n, s) { // 点击节点
        this.filters.caseType = d.id
        const index = this.setTree.findIndex(d => d.id === this.filters.caseType);
        this.filters.caseIndex = index
        this.getCaseList()
        d.isEdit = false// 放弃编辑状态
      },
      editIsIndex(index, row){
        this.$confirm('确认将该案例设置为首页吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.apiCaseIsIndex(row.id).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.getCaseList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      editIsIndex2(index, row){
        this.$confirm('确认取消该案例首页吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.apiCaseIsIndex(row.id).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.getCaseList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      //上线
      popCase(index, row) {
        this.$confirm('确认上线该案例吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.apiCaseOnlineOperate(row.id).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.getCaseList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      //下线
      offlineCase(index, row) {
        this.$confirm('确认下线该案例吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.apiCaseOnlineOperate(row.id).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.getCaseList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      //清空查询
      resetForm(){
        this.$refs['filters'].resetFields();
        this.getCaseList()
      },
      //清空分类
      resetForm2(){
        this.dialogVisible2 = false
        this.$refs['formCompon'].resetFields();
      },
      //切换目录
      btnType(i){
        this.activeShow = i
      },
      caseAdd(){
        this.$router.push({
          path:'/caseAdd'
        })
      },
      //管理case
      manageCase(index,row){
        window.open(row.link);
      },
      //编辑case
      editcase(index,row){
        this.$router.push({
          path:'/caseEdit',
          query:{id:row.id}
        })
      },
      //删除
      handleDel(index,data){
        this.$confirm('确认删除该案例吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let a = []
          a.push(data.id)
          this.$api.apiDelCase({
            idList:a
          }).then(res=>{
            if(res.code ===200){
              this.$message.success("删除成功！")
              this.page = 1
              this.getCaseList()
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
        this.$confirm('确认删除选中案例吗？', '提示', {
          type: 'warning'
        }).then(() => {
          console.log(ids)
          let a = []
          a.push(ids)
          this.$api.apiDelCase({
            idList:ids
          }).then(res=>{
            if(res.code ===200){
              this.$message.success("删除成功！")
              this.page = 1
              this.getCaseList()
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
        this.getCaseList();
      },
      //当前条数
      handleSizeChange(val) {
        this.pageSize = val;
        this.getCaseList();
      },
      getCaseCat(val){
        this.$api.apiSelectCaseCat(val).then(res=>{
          if(res.msg === "success") {
            this.setTree = [{
              id:'',
              catName:'全部案例'
            }]
            this.setTree = this.setTree.concat(res.data)
            this.$nextTick(function(){
              this.$refs.treeBox.setCurrentKey(this.setTree[0].id);
            })
            this.getCaseList()
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      getCaseList(){
        let para = {
          caseCatsId:this.setTree[this.filters.caseIndex].id,
          pageNum: this.page,
          pageSize: this.pageSize,
          name: this.filters.name,
          state:this.filters.state,
          startDate:this.filters.timeData == null ? '' : this.filters.timeData[0] != undefined ? this.$http.getLocalTime(this.filters.timeData[0]) : '',
          endDate:this.filters.timeData == null ? '' : this.filters.timeData[1] != undefined ? this.$http.getLocalTime(this.filters.timeData[1]) : ''
        };
        this.$api.apiCaseList(para).then(res=>{
          if(res.msg === "success") {
            this.tableData = res.data.content
            this.pageAll = res.data.totalElements
            for(let i = 0;i<this.tableData.length;i++){
              const index =  this.setTree.findIndex(d => d.id === this.tableData[i].caseCatsId);
              this.tableData[i].caseCatsId = this.setTree[index].catName
            }
            this.$nextTick(function(){
              this.$refs.treeBox.setCurrentKey(this.setTree[this.filters.caseIndex].id);
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    mounted() {
      this.getCaseCat('')
    },
  }
</script>

<style lang="scss">
  .case {
    margin-top: 10px;
    /*display: flex;*/
    .case-left{
      width: 12vw;
      height: calc(100vh - 160px);
      box-shadow: 0 0 10px #cccccc;
      margin-right: 20px;
      white-space: nowrap;
      div{
        cursor: pointer;
        padding: 15px 10px;
      }
      .case-left-show{
        background-color: #3c7bff;
        color: white;
      }
    }
    .toolbar{
      margin-bottom: 10px;
    }
    .pagination{
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
    .menu__item {
      display: block;
      line-height: 20px;
      text-align: center;
      margin-top: 10px;
    }
    .menu {
      height: 100px;
      width: 100px;
      position: absolute;
      border-radius: 10px;
      z-index: 999;
      border: 1px solid #999999;
      background-color: #f4f4f4;
      cursor: pointer;
      li:hover {
        background-color: #1790ff;
        color: white;
      }
    }
  }
  .drag{
    font-size: 24px;
    cursor: pointer;
  }
  /*顶部按钮*/
  .slot-tree .slot-t-top{
    margin-bottom: 15px;
  }
  .slot-tree .slot-t-node span{
    display: inline-block;
  }
  /*节点*/
  .slot-tree .slot-t-node--label{
    font-weight: 600;
  }
  /*输入框*/
  .slot-tree .slot-t-input .el-input__inner{
    // height: 26px;
    // line-height: 26px;
  }
  /*按钮列表*/
  .slot-tree .slot-t-node .slot-t-icons{
    display: none;
    margin-left: 10px;
  }
  .slot-tree .slot-t-icons .el-button+.el-button{
    margin-left: 6px;
  }
  .slot-tree .el-tree-node__content:hover .slot-t-icons{
    display: inline-block;
  }
</style>
<style lang="scss">
  .case{
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
    .el-tree-node__content{
      height: 40px;
    }
    .el-tree-node:focus>.el-tree-node__content {
      background-color: #409EFF;
      color: white;
    }
    .el-tree-node__content:hover {
      background-color: #409EFF;
      color: white;
    }
    .el-dialog--center .el-dialog__body {
      text-align: initial;
      padding: 0 20px;
    }
    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
      background-color: #409EFF;
      color: white;
    }
  }
</style>
