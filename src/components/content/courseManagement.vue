<template>
  <div class="course">
    <el-row>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form ref="filters" :inline="true" :model="filters">
          <div>
            <el-form-item label="教程标题:" prop="name">
              <el-input v-model="filters.name" placeholder="请输入关键字" clearable></el-input>
            </el-form-item>
            <el-form-item label="教程类型">
              <el-select v-model="activeState" placeholder="全部" class="el-select-banner">
                <el-option :label="x.name" :value="i" v-for="(x,i) in tableData" :key="i"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="activeState" placeholder="全部" class="el-select-banner">
                <el-option :label="x.name" :value="i" v-for="(x,i) in tableData" :key="i"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间:" prop="timeData">
              <el-date-picker v-model="filters.timeData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" size="small">查询</el-button>
            <el-button type="primary" size="small" @click="resetForm">清空</el-button>
            <el-button type="primary" size="small" disabled >批量删除</el-button>
            <el-button type="primary" size="small" @click="courseAdd">新增教程</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="5">
        <div class="course-left">
          <div style="text-align: center"><el-button type="primary" @click="dialogVisible2 =true,isCourse = 1">创建一级目录</el-button></div>
          <el-tree
            :data="setTree"
            :props="defaultProps"
            node-key="id"
            ref="SlotMenuList"
            :filter-node-method="filterNode"
            @node-contextmenu='rihgtClick'
            accordion
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
                    v-model="data.name"
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
                <span slot="title">添加子分类</span>
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
              style="width: 100%">
              <el-table-column type="selection" width="55" align="center">
              </el-table-column>
              <el-table-column prop="name" label="教程标题" align="center">
              </el-table-column>
              <el-table-column prop="directory1" label="一级目录" align="center">
              </el-table-column>
              <el-table-column prop="directory2" label="二级目录" align="center">
              </el-table-column>
              <el-table-column prop="courseType" label="教程类型" align="center">
              </el-table-column>
              <el-table-column prop="date" label="发布时间" align="center">
              </el-table-column>
              <el-table-column prop="state" label="状态" align="center">
              </el-table-column>
              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="managecourse(scope.$index, scope.row)">查看</el-button>
                  <el-button type="text" @click="editcourse(scope.$index, scope.row)">编辑</el-button>
                  <el-button type="text" v-if="scope.row.state == '下线'" @click="popCompon(scope.$index, scope.row)">上线</el-button>
                  <el-button type="text" v-if="scope.row.state == '在线'" @click="offlineCompon(scope.$index, scope.row)">下线</el-button>
                  <el-button type="text" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="pagination">
          <el-pagination layout="prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pageSize" >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!--创建分类弹框-->
    <el-dialog title="创建目录" :visible.sync="dialogVisible2" width="400px" center>
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
          name : '',
        },
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
        setTree: api.treelist,//节点树数据
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        filterText: '',
        input: "",
        currentPage4: 4,
        editObj: {},
        menuVisible: false,
        objectID: null,
        page:1,
        pageSize:10,
        activeShow:0,
        activeState:'',//状态
        filters: {
          name: '',
          timeData:[],
        },
        courseList:['首页','模板','教程中心','案例','关于我们'],
        tableData: [
          {
            id: '1',
            date: '2016-05-02',
            directory1:'基础组件',
            directory2:'网站管理',
            name: '如何编辑网站？',
            courseType:'常见类型',
            state:'在线'
          },
          {
            id: '2',
            date: '2016-05-02',
            directory1:'基础组件',
            directory2:'网站管理',
            name: '如何编辑网站？',
            courseType:'常见类型',
            state:'在线'
          },
          {
            id: '3',
            date: '2016-05-02',
            directory1:'基础组件',
            directory2:'/',
            name: '如何编辑网站？',
            courseType:'常见类型',
            state:'在线'
          },
          {
            id: '4',
            date: '2016-05-02',
            directory1:'基础组件',
            directory2:'网站管理',
            name: '如何编辑网站？',
            courseType:'常见类型',
            state:'在线'
          }
        ]
      }
    },
    mounted() {
    },
    methods: {
      handleAddTop() {
        this.setTree.push({
          id: ++this.maxexpandId,
          name: this.formCompon.name,
          pid: '',
          isEdit: false,
          children: []
        })
        this.dialogVisible2 = false
        this.resetForm2()
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
        this.$nextTick(() => {
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
        if(d.children && d.children.length !== 0){
          this.$message.error("此节点有子级，不可删除！")
          return false;
        }else{
          //新增节点可直接删除，已存在的节点要二次确认
          //删除操作
          let DelFun = () => {
            let _list = n.parent.data.children || n.parent.data;//节点同级数据
            let _index = _list.map((c) => c.id).indexOf(d.id);
            console.log(_index)
            _list.splice(_index, 1);
            this.$message.success("删除成功！")
          }
          //二次确认
          let ConfirmFun = () => {
            this.$confirm("是否删除此节点？","提示",{
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              DelFun()
            }).catch(() => {})
          }
          //判断是否是新增节点
          d.id > this.non_maxexpandId ? DelFun() : ConfirmFun()
        }
      },
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
          name: this.formCompon.name,
          pid: d.id,
          children: []
        })
        //同时展开节点
        if(!n.expanded){
          n.expanded = true
        }
        this.dialogVisible2 = false
        this.resetForm2()
      },
      rihgtClick(event, object, value, element) {
        this.showAdd = object.pid == '' ? true : false
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
          menu.style.left = (event.clientX - 250)/16 + "vw";
        }else if(event.clientX>500){
          menu.style.left = (event.clientX - 300)/16 + "vw";
        }else{
          menu.style.left = (event.clientX - 100)/16 + "vw";
        }
        menu.style.top = (event.clientY - 200)/16 + "vw";
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
        // console.log(d,n)
        // d.isEdit = false// 放弃编辑状态
      },
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      //清空查询
      resetForm(){
        this.$refs['filters'].resetFields();
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

      },
      //编辑course
      editcourse(index,row){

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
    }
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
      height: 40px;
    }
    .el-dialog--center .el-dialog__body {
      text-align: initial;
      padding: 0 20px;
    }
  }
</style>
