<template>
  <div class="templateEditor">
    <div class="template-edit-head">
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" @click="backCompon">返回</el-button>
    </div>
    <div class="template-edit-box">
      <p>
        <span>模版分类 ：{{text}}</span>
        <span>模版个数 ：{{num}}</span>
        </p>
      <div class="template-edit-add">
        <div class="template-edit-add-btn" @click="addTemplate">
          <i class="el-icon-circle-plus-outline"></i><span>新增模版</span>
        </div>
      </div>
      <div class="template-edit-list">
        <ul>
          <li v-for="(item,i) in templateList" @mousemove="delShow = i" @mouseleave="delShow=null">
            <div v-html="item.pageCode">{{item.pageCode}}</div>
            <div :class="{'delItem':delShow == i}">
            <div v-if="item.onlineStatus == 0 && delShow!=i" :class="{'delItem2': delShow!=i}" style="text-align: center;color: white;font-size: 24px">已下线</div>
            <!--<i class="el-icon-edit-outline template-edit-ico" :class="{'icoShow':delShow==i}"></i>-->
            <i class="el-icon-view template-edit-ico" :class="{'icoShow':delShow==i}" @click="preview(item)"></i>
            <i v-if="item.onlineStatus == 1" class="el-icon-download template-edit-ico" :class="{'icoShow':delShow==i}" @click="offlineSuite(item.id)"></i>
            <i v-if="item.onlineStatus == 0" class="el-icon-upload2 template-edit-ico" :class="{'icoShow':delShow==i}" @click="popSuite(item.id)"></i>
            <i class="el-icon-delete template-edit-ico" :class="{'icoShow':delShow==i}" @click="delComponent(item.id)"></i>
            </div>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script scoped>
  export default {
    name: 'templateEditor',
    data() {
      return {
        delShow: null,
        dialogAdd: false,
        value: '',
        text:'',//模板分类名称
        num:0,//模板个数
        templateList:[]
      }
    },
    methods: {
      //删除组件
      delComponent(index) {
        this.$confirm('是否删除该组件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.apiDelPage(index).then(res=>{
            if(res.code === 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getPageList(this.$store.state.templateData.id)
            }
          })
        }).catch(() => {
        });
      },
      //预览页面
      preview(data){
        window.localStorage.setItem('saveTemplateCode',data.pageCode)
        let routeData = this.$router.resolve({
          path:'/previewTemplate'
        })
        window.open(routeData.href, '_blank');
      },
      //上线
      popSuite(id) {
        this.$confirm('确认上线该套件吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.apiOnlineOperate({
            catType: 2,
            id:id,
            operateType:1
          }).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.getPageList(this.$store.state.templateData.id)
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      //下线
      offlineSuite(id) {
        this.$confirm('确认下线该套件吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.apiOnlineOperate({
            catType: 2,
            id:id,
            operateType:0
          }).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.getPageList(this.$store.state.templateData.id)
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      //新增组件
      addTemplate() {
        let row = {
            catName:this.$store.state.templateData.catName,
            id:this.$store.state.templateData.id,
            index:this.$route.query.catIndex
        }
        let param = {
          btnShow:0
        }
        // this.$store.commit('saveTemplateData', param)
        this.$store.commit('saveCatType', row)
        this.$router.push({
          path:'/addTemplate',
          query:{text:'新增模版',pageId:2}
          })
      },
      //返回
      backCompon() {
        this.$router.push({
          path:'/allTemplate'
        })
      },
      getPageList(val){
        this.$api.apiPageList(val).then(res => {
          if(res.msg === "success") {
            this.templateList = res.data
            this.num = this.templateList.length
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    mounted() {
      if(this.$store.state.templateData == null || this.$store.state.templateData == ''){
        this.$router.push({
          path:'/allTemplate'
        })
        return
      }
      this.text = this.$store.state.templateData.catName
      this.num = this.$store.state.templateData.catNum
      this.getPageList(this.$store.state.templateData.id)
    }
  }
</script>

<style lang="scss" scoped>
  .templateEditor {
    .template-edit-head {
      button {
        font-size: 16px;
      }
    }
    .template-edit-box {
      p {
        margin: 10px 0 10px 0;
        font-weight: 600;
        font-size: 20px;
        span{
          margin-right: 20px;
        }
      }
    }
    .template-edit-add {
      width: 100%;
      background: #f2f2f2;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      .template-edit-add-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      i {
        padding-right: 10px;
        font-size: 30px;
      }
    }
    .template-edit-list {
      margin: 10px 0 10px 0;
      ul {
        width: 95%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          position: relative;
          width: 49%;
          height: 350px;
          border: 1px #cccccc solid;
          list-style: none;
          margin: 10px 0 10px 0;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          box-shadow: 0 0 10px rgb(90, 88, 88);
          overflow: hidden;
          img{
            width: 100%;
            border: 1px solid #cccccc;
          }
          .delItem {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            z-index: 200;
            box-sizing: border-box;
          }
          .delItem2 {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            z-index: 100;
            box-sizing: border-box;
          }
          .template-edit-ico {
            display: none;
            font-size: 30px;
            color: #ffffff;
            cursor: pointer;
            margin: 0 auto;
          }
          .icoShow {
            display: block;
          }
        }
      }
    }
  }
</style>
