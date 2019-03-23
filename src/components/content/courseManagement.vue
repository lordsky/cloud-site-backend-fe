<template>
  <div class="course">
    <el-row>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form ref="filters" :inline="true" :model="filters">
          <div>
            <el-form-item label="教程标题:" prop="name">
              <el-input v-model="filters.name" placeholder="请输入关键字" clearable></el-input>
            </el-form-item>
            <el-form-item label="教程类型" prop="courseType">
              <el-select v-model="filters.courseType" placeholder="全部" class="el-select-banner">
                <el-option :label="x.name" :value="x.id" v-for="(x,i) in courseTypeList" :key="i"></el-option>
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
            <el-button type="primary" size="small" @click="getCourseList">查询</el-button>
            <el-button type="primary" size="small" @click="resetForm">清空</el-button>
            <el-button type="primary" size="small" @click="batchRemove" :disabled="this.sels.length===0" >批量删除</el-button>
            <el-button type="primary" size="small" @click="courseAdd">新增教程</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="5">
        <div class="course-left">
          <div style="text-align: center"><el-button type="primary" @click="dialogVisible2 =true,isCourse = 1,catTitle='创建一级目录'">创建一级目录</el-button></div>
          <el-tree
            :data="setTree"
            :props="defaultProps"
            node-key="id"
            ref="SlotMenuList"
            @node-click="handleNodeClick"
            :filter-node-method="filterNode"
            @node-contextmenu='rihgtClick'
            accordion
            :highlight-current="true"
          >
            <span class="slot-t-node" slot-scope="{ node, data }">
              <span v-show="!node.isEdit">
                <span v-show="data.children && data.children.length >= 1">
                  <i :class="{ 'fa fa-plus-square': !node.expanded, 'fa fa-minus-square':node.expanded}" />
                  <span :class="[data.id >= maxexpandId ? 'slot-t-node--label' : '']">{{node.label}}</span>
                </span>
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
                          @keyup.enter.native="NodeBlur(node, data)"></el-input>
              </span>
            </span>
          </el-tree>
          <!--鼠标右键点击出现页面-->
          <div v-show="menuVisible">
            <el-menu
              id = "rightClickMenu"
              class="el-menu-vertical"
              @select="handleRightSelect"
              background-color="#545c64"
              active-text-color="#fff"
              text-color="#fff">
              <el-menu-item index="1" class="menuItem" v-if="showAdd == true">
                <span slot="title">添加子目录</span>
              </el-menu-item>
              <el-menu-item index="2" class="menuItem">
                <span slot="title">重命名</span>
              </el-menu-item>
              <el-menu-item index="3" class="menuItem">
                <span slot="title">删除分类</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-col>
      <el-col :span="19">
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
              <el-table-column prop="title" label="教程标题" align="center">
              </el-table-column>
              <el-table-column prop="firstCat" label="一级目录" align="center">
              </el-table-column>
              <el-table-column prop="secondCat" label="二级目录" align="center">
                <template slot-scope="scope">
                  {{scope.row.secondCat != null ? scope.row.secondCat : '/'}}
                </template>
              </el-table-column>
              <el-table-column label="教程类型" align="center">
                <template slot-scope="scope">
                  {{scope.row.type == 1 ? '常见教程' : scope.row.type == 2 ? '视频教程' : '图文教程'}}
                </template>
              </el-table-column>
              <el-table-column prop="creatTime" label="发布时间" align="center">
              </el-table-column>
              <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                  {{scope.row.onlineStatus == -1 ? '下线' : '上线'}}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="managecourse(scope.$index, scope.row)">查看</el-button>
                  <el-button type="text" @click="editcourse(scope.$index, scope.row)">编辑</el-button>
                  <el-button type="text" v-if="scope.row.onlineStatus == -1" @click="popCompon(scope.$index, scope.row)">上线</el-button>
                  <el-button type="text" v-if="scope.row.onlineStatus == 1" @click="offlineCompon(scope.$index, scope.row)">下线</el-button>
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
    <el-dialog :title="catTitle" :visible.sync="dialogVisible2" width="400px" center>
      <el-form :inline="true" :model="formCompon" class="demo-form-inline" ref="formCompon">
        <el-form-item label="目录名称:" prop="name" :rules="[{required: true, message: '目录名称不能为空'},{ max: 6, message: '不能超过6字符', trigger: 'blur' }]">
          <el-input v-model="formCompon.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm2">取消</el-button>
        <el-button v-if="isCourse == 1" type="primary" @click="handleAddTop">确定</el-button>
        <el-button v-if="isCourse == 2" type="primary" @click="NodeAdd(NODE,DATA)">确定</el-button>
          </span>
    </el-dialog>
    <!--创建分类弹框-->
  </div>
</template>

<script>
  import api from '../config/api'
  api.treelist = api.treelist.splice(0,10)
  let id = 1000;
  export default {
    name: "course",
    data() {
      return {
        formCompon:{
          name : ''
        },
        sels:'',
        catTitle:'',
        isCourse:1,
        dialogVisible2:false,
        showAdd:true,
        DATA: null,
        NODE: null,
        dialogFormVisible: false,
        dialogClassifyVisible: false,
        maxexpandId: api.maxexpandId,//新增节点开始id
        non_maxexpandId: api.maxexpandId,//新增节点开始id(不更改)
        isLoadingTree: true,//是否加载节点树
        setTree: [],//节点树数据
        defaultProps: {
          children: 'children',
          label: 'catName'
        },
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
        activeState:'',//状态
        filters: {
          id:'',
          name: '',
          timeData:[],
          courseType:'',
          state:''
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
        courseTypeList:[
          {
            id:1,
            name:'常见教程'
          },
          {
            id:2,
            name:'视频教程'
          },
          {
            id:3,
            name:'图文教程'
          },
        ],
        tableData: []
      }
    },
    methods: {
      //新增一级目录
      handleAddTop() {
        this.$refs.formCompon.validate((valid) => {
          if (valid) {
            let parm = {
              id:"",
              catName:this.formCompon.name,
              catLevel:1,
              parentId:0
            }
            this.$api.apiAddCatType(parm).then(res=>{
              if(res.msg === 'success'){
                this.$message.success("添加成功！")
                this.setTree.push({
                  id: res.data,
                  name: this.formCompon.name,
                  parentId: '',
                  isEdit: false,
                  children: []
                })
                this.dialogVisible2 = false
                this.getCatList()
                this.resetForm2()
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
      handleRightSelect(key) {
        console.log(key);
        if (key == 1) {
          this.dialogVisible2 = true
          this.isCourse = 2
          this.catTitle = '创建二级目录'
          // this.NodeAdd(this.NODE, this.DATA);
          this.menuVisible = false;
        } else if (key == 2) {
          this.NodeEdit(this.NODE, this.DATA);
          this.menuVisible = false;
        } else if (key == 3) {
          this.NodeDel(this.NODE, this.DATA);
          this.menuVisible = false;
        } else if(key == 4){
          console.log('4')
          this.menuVisible = false;
        }
      },
      NodeBlur(n, d){//输入框失焦
        console.log(n, d)
        if(n.isEdit){
          this.$set(n, 'isEdit', false)
        }
        let parm = {
          id:d.id,
          catName: d.catName,
          catLevel:d.catLevel,
          parentId:d.parentId
        }
        this.$nextTick(() => {
          this.$api.apiAddCatType(parm).then(res=>{
            if(res.msg === 'success'){
              this.$message.success("修改成功！")
              this.getCatList()
              this.getCourseList()
            }else{
              this.$message.error(res.msg)
              this.getCatList()
            }
          })
          this.$refs['slotTreeInput'+d.id].$refs.input.focus()
        })
      },
      NodeEdit(n, d){//编辑节点
        console.log(n, d)
        if(!n.isEdit){//检测isEdit是否存在or是否为false
          this.$set(n, 'isEdit', true)
        }
      },
      NodeDel(n, d){//删除节点
        console.log(n, d)
        let that = this;
        if(d.children.length != 0){
          this.$message.error("此节点有子级，不可删除！")
          return false;
        }else{
          this.$confirm('是否删除此目录？', '提示', {
            type: 'warning'
          }).then(() => {
            this.$api.apiDelCatType(d.id).then(res=>{
              if(res.msg === 'success'){
                this.$message.success("删除成功！")
                this.getCatList()
              }else{
                this.$message.error(res.msg)
              }
            })
          }).catch(() => {

          });
        }
      },
      NodeAdd : async function(n, d){//新增节点
        this.$refs.formCompon.validate((valid) => {
          if (valid) {
            let parm = {
              id:"",
              catName:this.formCompon.name,
              catLevel:2,
              parentId:d.id
            }
            this.$api.apiAddCatType(parm).then(res=>{
              if(res.msg === 'success'){
                this.$message.success("添加成功！")
                d.children.push({
                  id: res.data,
                  name: this.formCompon.name,
                  parentId: d.id,
                  isEdit: false,
                  children: []
                })
                this.dialogVisible2 = false
                this.resetForm2()
                this.getCatList()
                //同时展开节点
                // if(!n.expanded){
                //   n.expanded = true
                // }
              }else{
                this.$message.error(res.msg)
              }
            })
          }
        });
      },
      rihgtClick(event, object, value, element) {
        this.showAdd = object.parentId == 0 ? true : false
        if (this.objectID !== object.id) {
          this.objectID = object.id;
          this.menuVisible = true;
          this.DATA = object;
          this.NODE = value;
        } else {
          this.menuVisible = !this.menuVisible;
        }
        document.addEventListener('click',(e)=>{
          this.menuVisible = false;
        })
        let menu = document.querySelector("#rightClickMenu");
        /* 菜单定位基于鼠标点击位置 */
        if(event.clientX>300){
          menu.style.left = event.clientX / 16 - 15 + "vw";
        }else{
          menu.style.left = event.clientX/16 - 5 + "vw";
        }
        if(event.clientX>400){
          menu.style.left = event.clientX /16 - 20 + "vw";
        }
        if(event.clientX>500){
          menu.style.left = event.clientX /16 - 25 + "vw";
        }
        menu.style.top = event.clientY / 16 - 6 + "vh";
        menu.style.position = "absolute"; // 为新创建的DIV指定绝对定位
        menu.style.width = 100 + "px";
        // menu.style.backgroundColor = '#646464';
        menu.style.zIndex = '1000'
        // console.log("右键被点击的左侧:",menu.style.left);
        // console.log("右键被点击的顶部:",menu.style.top);
        // console.log("右键被点击的event:",event);
        // console.log("右键被点击的object:", object);
        // console.log("右键被点击的value:", value);
        // console.log("右键被点击的element:", element);
      },
      handleNodeClick(d, n, s) { // 点击节点
        console.log(d,n)
        this.filters.id  = d.id
        this.getCourseList()
        d.isEdit = false// 放弃编辑状态
      },
      //上线
      popCompon(index, row) {
        this.$confirm('确认上线该教程吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.apiCourseOnlineOperate(row.id).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.getCourseList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      //下线
      offlineCompon(index, row) {
        this.$confirm('确认下线该教程吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.apiCourseOnlineOperate(row.id).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.getCourseList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      //删除
      handleDel(index,data){
        this.$confirm('确认删除该教程吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let a = []
          a.push(data.id)
          this.$api.apiDelCourse({
            idList:a
          }).then(res=>{
            if(res.code ===200){
              this.$message.success("删除成功！")
              this.getCourseList()
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
        this.$confirm('确认删除选中教程吗？', '提示', {
          type: 'warning'
        }).then(() => {
          console.log(ids)
          let a = []
          a.push(ids)
          this.$api.apiDelCourse({
            idList:ids
          }).then(res=>{
            if(res.code ===200){
              this.$message.success("删除成功！")
              this.getCourseList()
            }else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      //清空查询
      resetForm(){
        this.$refs['filters'].resetFields();
        this.filters.id = ''
        this.getCourseList()
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
      courseAdd(){
        this.$router.push({
          path:'/courseAdd'
        })
      },
      //管理course
      managecourse(index,row){
        this.$router.push({
          path:'/courseList'
        })
      },
      //编辑course
      editcourse(index,row){
        this.$router.push({
          path:'/courseEdit',
          query:{data:row}
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
      getCatList(){
        this.$api.apiCatList().then(res=>{
          if(res.msg === "success") {
            this.setTree = res.data

          } else {
            this.$message.error(res.msg)
          }
        })
      },
      getCourseList(){
        let para = {
          catId:this.filters.id,
          pageNum: this.page,
          pageSize: this.pageSize,
          title: this.filters.name,
          state:this.filters.state,
          type:this.filters.courseType,
          startDate:this.filters.timeData == null ? '' : this.filters.timeData[0] != undefined ? this.$http.getLocalTime(this.filters.timeData[0]) : '',
          endDate:this.filters.timeData == null ? '' : this.filters.timeData[1] != undefined ? this.$http.getLocalTime(this.filters.timeData[1]) : ''
        };
        this.$api.apiCourseList(para).then(res=>{
          if(res.msg === "success") {
            this.tableData = res.data.content
            this.pageAll = res.data.totalElements
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    mounted() {
      this.getCatList()
      this.getCourseList()
    },
  }
</script>

<style lang="scss" scoped>
  .course {
    margin-top: 10px;
    /*display: flex;*/
    .course-left{
      width: 15vw;
      height: calc(100vh - 160px);
      box-shadow: 0 0 10px #cccccc;
      margin-right: 20px;
      white-space: nowrap;
      div{
        cursor: pointer;
        padding: 15px 30px;
      }
      .course-left-show{
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
    .drag{
      font-size: 24px;
      cursor: pointer;
    }
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
  .course{
    .el-tree-node__content{
      margin: 5px 0;
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
