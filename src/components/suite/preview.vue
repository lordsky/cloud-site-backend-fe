<template>
  <div class="preview2">
    <div class="title-wrap">
      {{curTitle}}
    </div>
    <div class="manage-wrap" @click="dialogVisible=true">
      <i class="el-icon-document"></i>页面管理<i class="el-icon-arrow-down el-icon--right"></i>
      <!--<el-dropdown @command="changePage" v-if="pageList.length > 0">-->
        <!--<span class="el-dropdown-link">-->
          <!--<i class="el-icon-document"></i>页面管理<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
        <!--</span>-->
        <!--<el-dropdown-menu slot="dropdown">-->
          <!--<el-dropdown-item v-for="(item,index) of pageList" :key="index" :command="index">{{item.pageName}}</el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
    </div>
    <div class="header-wrap">
      <div class="handle-wrap">
        <div class="btn" @click="exitPreview"><i class="el-icon-circle-close"></i> 退出预览模式</div>
      </div>
    </div>
    <div class="content-wrap">
      <div class="content"  v-html="curPage"></div>
    </div>
    <!--页面管理弹框-->
    <div class="dialog" style="width: 240px;margin-top: 10vh;z-index: 600" v-if="dialogVisible==true">
      <div class="el-dialog__header">
        <span class="el-dialog__title">页面管理</span>
        <button type="button" class="el-dialog__headerbtn" @click="dialogVisible=false">
          <i class="el-dialog__close el-icon el-icon-close"></i></button>
      </div>
      <div class="el-dialog__body">
        <el-tree
          :data="data1"
          :props="defaultProps"
          @node-click="handleNodeClick"
          node-key="id"
          default-expand-all
          accordion
          :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span v-show="data.children && data.children.length >= 1">
                  <span>{{node.label}}</span>
                </span>
                <span v-show="!data.children || data.children.length == 0">
                  <span>{{node.label}}</span>
                </span>
              <span>
              </span>
            </span>
        </el-tree>
      </div>
    </div>
    <!--页面管理弹框-->
  </div>
</template>

<script scoped>
  export default {
    data() {
      var self = this
      var NavSwitch = function(){
        var navBtn = document.querySelectorAll('#silder .drop-down')
        for(let i = 0;i<navBtn.length;i++){
          navBtn[i].onclick = ()=>{
            var evt = evt || window.event; //获取event对象
            if (evt.preventDefault) {
              evt.preventDefault(); //非IE浏览器
            } else {
              evt.returnValue = false; //在早期的IE版本中
            }
            event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true); //阻止事件冒泡
            self.curPage = self.curPageTop + self.pageList[i].pageCode + self.curPageBottom
            setTimeout(()=>{
              setTimeout(()=>{
                $('.header-hsw') .css('position','absolute')
              },10)
              NavSwitch()
               setTimeout(()=>{
		     	 $('.header-hsw') .css('position','absolute')
		     },10)
            },100)
          }
        }
        var navBtn2 = document.querySelectorAll('.drop-down-content li')
        for(let i = 0;i<navBtn2.length;i++){
          navBtn2[i].onclick = ()=>{
            var evt = evt || window.event; //获取event对象
            let ejId = $("#"+parseInt(window.event.currentTarget.id)).parent().parent().attr("id")
            let hIndex = self.pageList.findIndex(d => d.id === parseInt(ejId));
            let hIndex2 = self.pageList[hIndex].children.findIndex(d => d.id === parseInt(window.event.currentTarget.id));
            if (evt.preventDefault) {
              evt.preventDefault(); //非IE浏览器
            } else {
              evt.returnValue = false; //在早期的IE版本中
            }
            event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true); //阻止事件冒泡
            self.curPage = self.curPageTop + self.pageList[hIndex].children[hIndex2].pageCode + self.curPageBottom
            setTimeout(()=>{
              setTimeout(()=>{
                $('.header-hsw') .css('position','absolute')
              },10)
              NavSwitch()
              setTimeout(()=>{
                $('.header-hsw') .css('position','absolute')
              },10)
            },100)
          }
        }
      }
      return {
        data1:[],
        curId: "",
        curTitle: "",
        pageList: [],
        curPage:'',
        curPageTop: '',
        curPageConetent: "<div style='height: 300px;'></div>",
        curPageBottom:'',
        useShow:true,
        dialogVisible:false,
        NavSwitch:NavSwitch,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      exitPreview() {
      	window.close()
      },
      changePage(command) {
        this.curPageConetent = this.pageList[command].pageCode
        this.curPage = this.curPageTop + this.curPageConetent + this.curPageBottom
        setTimeout(()=>{
          this.NavSwitch()
        },10)
      },
      //点击切换页面
      handleNodeClick(data,node) {
        const parent = node.parent;
        const children =  parent.data;
        const children2 = parent.data.children;
        if(parent.data.children == undefined){
          const index = children.findIndex(d => d.id === data.id);
          if(index != -1){
            this.curPageConetent = this.pageList[index].pageCode
            this.curPage = this.curPageTop + this.curPageConetent + this.curPageBottom
            // this.webPageList.content = this.pageList[index].pageCode
          }
        }else{
          const index1 = this.pageList.findIndex(d => d.pageAlias === children.pageAlias);
          const index2 = children2.findIndex(d => d.id === data.id);
          if(index1 != -1){
            this.curPageConetent = this.pageList[index1].children[index2].pageCode
            this.curPage = this.curPageTop + this.curPageConetent + this.curPageBottom
            // this.webPageList.content = this.pageList[index1].children[index2].pageCode
          }
        }
        setTimeout(()=>{
          this.NavSwitch()
          setTimeout(()=>{
            $('.header-hsw') .css('position','absolute')
          },10)
        },10)
      },
      // get template page code
      getTemplatePage : async function(statu) {
        var  getPage
        var  getList
        let key = this.$route.query.id
        getPage = this.$api.apiTemplatePageList
        getList = this.$api.apiTemplateComponentList

        let getContent = getPage(key).then(res => {
          console.log(res)
          this.pageList = res.data;
          if(res.data.length > 0) {
            this.curPageConetent = res.data[0].pageCode
          }
          for (let i = 0;i<res.data.length;i++){
            const newChild = { id: res.data[i].id,pageAlias: res.data[i].pageAlias,label: res.data[i].pageName, children: [] };
            this.data1.push(newChild);
            for(let j = 0;j<res.data[i].children.length;j++){
              const newChild2 = {
                id: res.data[i].children[j].id,
                label: res.data[i].children[j].pageName,
                pageParent: res.data[i].children[j].pageParent,
                pageAlias:res.data[i].children[j].pageAlias,
                isEdit: false,
                children: []
              }
              this.data1[i].children.push(newChild2);
            }
          }
        });

        let getHeaderFooter = getList(key).then(res => {
          if(res.data.length > 0) {
            this.curPageTop = res.data[0].componentCode
            this.curPageBottom = res.data[1].componentCode
            
          }
        });
        await Promise.all([getContent, getHeaderFooter]).then(res => {
          this.curPage = this.curPageTop + this.curPageConetent + this.curPageBottom
        })
        await this.NavSwitch()
      }
    },
    mounted(){
      this.curId = this.$route.query.id;
      this.curTitle = this.$route.query.title;
     setTimeout(()=>{
     	 $('.header-hsw') .css('position','absolute')
     },1000)
//    setTimeout(()=>{
//    $(".question dt").click(function() {
//      $(this).parent().toggleClass("active");
//    });
//    },1000)
      this.getTemplatePage()
//    setTimeout(function () {
      	 
//      $(".question").on("click",".question1",function(){
//        $(this.children[0]).fadeToggle()
//        $(this.children[1]).fadeToggle()
//        $(this.children[2]).fadeToggle()
//      })
//    },0)
//    $(".content").scroll(function() {
//      var scroH = $(".content").scrollTop();  //滚动高度
//      var viewH = $(window).height();  //可见高度
//      headerScroll(scroH);
//      showText("#intro",scroH,viewH);
//      showText("#why",scroH,viewH);
//      showText("#company",scroH,viewH);
//      showText("#case",scroH,viewH);
//      showText("#service",scroH,viewH);
//      showText("#wifi",scroH,viewH);
//      showText("#hotel",scroH,viewH);
//      showText("#video",scroH,viewH);
//      showText("#room",scroH,viewH);
//      showText("#tour",scroH,viewH);
//
//    });
//    function showText(id, scroH, viewH){
//      if($(id).length > 0){
//        if($(id).offset().top - scroH < viewH * 0.5){
//          $(id + " .text").addClass("show-text");
//        }else if($(id).offset().top - scroH > viewH){
//          $(id + " .text").removeClass("show-text");
//        }
//      }
//    }
      function headerScroll(scroH){
        if(scroH >50){  //距离顶部大于50px时
          $("#header").addClass("white");
          $("#header img").attr('src','https://fastdfs-dev-test.uworks.cc/group1/M00/00/13/wKgB7Fy1b4KAJE5dAAAJTp8Jyh8278.png');
        }else{
          $("#header").removeClass("white");
          $("#header img").attr('src','https://fastdfs-dev-test.uworks.cc/group1/M00/00/15/wKgB7Fy2xZuALSJTAAAINAO5Mwg530.png');
        }
      }
      setTimeout(()=>{
        $('.header-hsw') .css('position','absolute')
        // $('.header-hsw') .css('top','0')
      },1000)
    }
  };
  function showImg(id, index){
    let url = ''
    var time = new Date().getTime()
    if(index==2){
      url = 'https://fastdfs-dev-test.uworks.cc/group1/M00/00/13/wKgB7Fy1cDaAJ7OFAAMwwjfmuGc692.gif?'
    }else if(index==3){
      url = 'https://fastdfs-dev-test.uworks.cc/group1/M00/00/13/wKgB7Fy1cD6AfCCIAARkdxn27zE048.gif?'
    }else{
      url = 'https://fastdfs-dev-test.uworks.cc/group1/M00/00/13/wKgB7Fy1cC2AeZnJAAD-qCJNxAY475.gif?'
    }
    // console.log($(id).length)
    if($(id).length>0){
      $("#box-"+index).css("background-image",`url(${url}+${time})`);
    }
  }
</script>


<style type="text/css" scoped>
  @import "../../assets/swiper.css";
</style>
<style lang="scss" scoped>
  .preview2 {
    width: 100%;
    min-height: 100vh;
    height:auto;
    background-color: #f2f2f2;
    padding: 0 28px;
    position: relative;
    .dialog{
      position: absolute;
      margin: 0 auto 50px;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0,0,0,.3);
      box-sizing: border-box;
      width: 50%;
      background-color: #fff;
      top: -3%;
      .el-dialog__body{
        padding: 0 20px 10px;
        .custom-tree-node {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          padding-right: 8px;
        }
        .ico-size{
          font-size: 20px;
        }
      }
      .dialog-footer{
        padding: 20px;
        display: flex;
        justify-content: center;
      }
    }
    .title-wrap {
      float: left;
      line-height: 62px;
      font-size: 18px;
    }
    .manage-wrap {
      float: left;
      line-height: 62px;
      font-size: 16px;
      margin-left: 30px;
    }
    .header-wrap {
      width: 100%;
      height: 62px;
      line-height: 62px;
      font-weight: 200;
      .handle-wrap {
        float: right;
        font-size: 12px;
        .btn {
          display: inline-block;
          height: 28px;
          padding: 0 20px;
          margin-left: 20px;
          line-height: 28px;
          text-align: center;
          background-color: #4a6def;
          border-color: #4a6def;
          border-radius: 2px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .content-wrap {
      position: relative;
      width: 100%;
      height: 90vh;
      padding: 0 0 20px;
      /*overflow: auto;*/
      .content {
        width: 100%;
        height: 100%;
        overflow: scroll;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 5px;
        background-color: #fff;
      }
      .selected-wrap {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 200px;
        height: 200px;
        background-color: #fff;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 5px;
        .page-list {
          list-style: none;
          padding: 20px;
          .page-item {
            line-height: 30px;
            color: #999;
            cursor: pointer;
          }
        }
      }
    }
  }
  .banner{
    margin-top: 0 !important;
  }
  .case {
    margin-top: 0 !important;
  }
</style>
