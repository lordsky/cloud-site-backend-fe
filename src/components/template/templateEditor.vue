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
            <!--<i class="el-icon-edit-outline template-edit-ico" :class="{'icoShow':delShow==i}"></i>-->
            <i class="el-icon-view template-edit-ico" :class="{'icoShow':delShow==i}" @click="preview(item)"></i>
            <!--<i class="el-icon-delete template-edit-ico" :class="{'icoShow':delShow==i}" @click="delComponent(i)"></i>-->
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
        templateList:[
          // {pageCode:'<div style="width:100%;background:rgba(255,255,255,1);box-shadow:0px 2px 4px 0px rgba(0,0,0,0.05);padding: 5.1875vw 0;">\n' +
          //     '\t\t\t<div style="width:85%;font-size:54px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);margin: 0 auto;text-align: center;margin-top: 5.1875vw;;">产品特色</div>\n' +
          //     '\t\t\t<div style="width:34.6875vw;font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(157,175,189,1);margin: 0 auto;text-align: center;margin-top: 5px;">对“大体验”设计相关需求，小到一个ico、banner设计，大到一套VI、UI视觉系统，改进我们的产品体验而努力…</div>\n' +
          //     '\t\t\t<div style="width: 100%;display: flex;align-items: center;justify-content: center;margin-top: 5.625vw;">\n' +
          //     '\t\t\t\t<div style="width:22.5625vw;height:18.75vw;background:rgba(238,242,244,1);border-radius:5px;margin-right: 1.875vw;text-align: center;">\n' +
          //     '\t\t\t\t\t<div style="width:14.5vw;font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(2,111,194,1);text-align: center;margin-top: 1.875vw;margin: 6.75vw auto 0 auto;">设计需求管理</div>\n' +
          //     '\t\t\t\t\t<div style="width:14.5vw;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(157,175,189,1);text-align: center;margin-top: .5vw;overflow:hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;margin: .5vw auto 0 auto;">对“大体验”设计相关需求，包括视觉设计、体验设计、工业设计，改进我们的产品体验而努力</div>\n' +
          //     '\t\t\t\t</div>\n' +
          //     '\t\t\t\t<div style="width:22.5625vw;height:18.75vw;background:rgba(209,219,227,1);border-radius:5px;margin-right: 1.875vw;"></div>\n' +
          //     '\t\t\t\t<div style="width:22.5625vw;height:18.75vw;background:rgba(209,219,227,1);border-radius:5px;"></div>\n' +
          //     '\t\t\t</div>\n' +
          //     '\t\t</div>'},
          // {url: require('../../assets/img/template3.png')},
          // {url: require('../../assets/img/template.png')},
          // {url: require('../../assets/img/template3.png')},
          // {url: require('../../assets/img/template3.png')}
        ]
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
          this.selectVal.splice(index,1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
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
      //新增组件
      addTemplate() {
        this.$router.push({
          path:'/addTemplate',
          query:{text:'新增模版',pageId:2
            ,catType:{
              catName:this.$store.state.templateData.catName,
              id:this.$store.state.templateData.id,
              index:this.$route.query.catIndex
            }}
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
            z-index: 9999;
          }
          .template-edit-ico {
            display: none;
            font-size: 30px;
            color: #ffffff;
            cursor: pointer;
          }
          .icoShow {
            display: block;
          }
        }
      }
    }
  }
</style>
