<template>
  <div class="addTemplate">
    <p>新增模版</p>
    <div class="select-template">
      <p>①选择模版分类</p>
      <el-form :inline="true" class="demo-form-inline" ref="template" :model="template" v-if="pageId == 1">
        <el-form-item prop="templateId" :rules="[{required: true,message: '组件分类不能为空'}]">
          <el-select v-model="template.templateId" placeholder="请选择模版分类" class="el-select">
            <el-option v-for="(item,index) in templateTypeList" :key="item.id" :label="item.catName" :value="index">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-select v-model="catType.catName" placeholder="请选择模版分类" class="el-select" v-if="pageId == 2" disabled>
        <el-option  :key="catType.id" :label="catType.catName" :value="catType.catName">
        </el-option>
      </el-select>
    </div>
    <div class="select-template">
      <p>②选择排版</p>
      <div class="template-list">
        <ul>
          <li  @click="btnType(i)" v-for="(x,i) in templateList" :key="i">
            <div :class="{'active':btnShow==i}"><img :src="x.imgs"></div>
            <p>{{x.name}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="template-btn">
      <el-button @click="back">返回</el-button>
      <el-button type="primary" @click="toAddTemplate(template.templateId)" :loading="loading">下一步</el-button>
    </div>
  </div>
</template>

<script scoped>
  export default {
    name: 'addTemplate',
    data() {
      return {
        catType:this.$store.state.catType,
        pageId:this.$route.query.pageId,
        btnShow:'',
        delShow: null,
        dialogAdd: false,
        loading:false,
        template:{
          templateId: '',
        },
        typographyId:0,
        // options: [{
        //   value: '1',
        //   label: '关于我们'
        // }, {
        //   value: '2',
        //   label: '联系我们'
        // }, {
        //   value: '3',
        //   label: '蚵仔煎'
        // }, {
        //   value: '4',
        //   label: '龙须面'
        // }, {
        //   value: '5',
        //   label: '北京烤鸭'
        // }],
        templateTypeList:[],
        templateList:[
          {
            name:'版式1',
            imgs: require('../../assets/img/template2.png')
          },
          {
            name:'版式2',
            imgs: require('../../assets/img/template2.png')
          },
          {
            name:'版式3',
            imgs: require('../../assets/img/template2.png')
          },
          {
            name:'版式4',
            imgs: require('../../assets/img/template1.png')
          },
          {
            name:'版式5',
            imgs: require('../../assets/img/template2.png')
          }
        ],
      }
    },
    mounted() {

    },
    methods: {
      //选择排版
      btnType(i){
        this.btnShow = i
        this.typographyId = i;
      },
      //返回
      back() {
        this.$router.go(-1)
      },
      //点击下一步进行模板页面设计
      toAddTemplate(index) {
        if(this.pageId == 2){
          index = this.catType.index
        }
        this.loading = true;
        if(index === '' || index === null){
          this.$message({
            showClose: true,
            message: '请选择模板分类',
            type: 'warning'
          });
          this.loading = false;
          return
        }
        let param = {
          id : this.templateTypeList[index].id,
          typographyId : this.typographyId,
          catName:this.templateTypeList[index].catName,
          catNum:this.templateTypeList[index].catNum,
          catExt:this.templateTypeList[index].catExt,
          index:index,
          btnShow:this.btnShow
        }
        this.$store.commit('saveTemplateData', param)
        setTimeout(() => {
          this.$router.push({
            path: '/designTemplate',
            query:{
              text:'新增模版（设计模版)',
              templateId:this.template.templateId,
            }
          })
        }, 500);
      },
      //获取模板分类
      getTemplateTypeList(val){
        this.$api.apiByCatType(val).then(res => {
          if(res.msg === "success") {
            this.templateTypeList = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    mounted() {
      if(this.$route.query.pageId == 1 && this.$store.state.templateData != null){
        this.template.templateId = this.$store.state.templateData.index
      }
      if(this.$route.query.pageId == 2 && this.$store.state.templateData.btnShow == '' && this.$store.state.templateData.btnShow == undefined){
        this.btnShow = ''
        this.typographyId = 0
      }else if(this.$route.query.pageId == 2 && this.$store.state.templateData.btnShow != '' && this.$store.state.templateData.btnShow != undefined){
          this.btnShow = this.$store.state.templateData.btnShow
          this.typographyId = this.$store.state.templateData.btnShow
      }
      this.getTemplateTypeList(2)
    }
  }
</script>

<style lang="scss" scoped>
    .addTemplate{
      p {
        margin: 10px 0 10px 0;
        font-weight: 600;
        font-size: 20px;
        span{
          margin-right: 20px;
        }
      }
      .select-template{
        margin-top: 40px;
        p{
          font-size: 18px;
          font-weight: 600;
        }
        .el-select{
          width: 300px;
        }
        .template-list{
          margin: 10px 0 10px 0;
          ul {
            width: 95%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            //justify-content: space-between;
            li {
              width: 200px;
              list-style: none;
              align-items: center;
              justify-content: space-evenly;
              //box-shadow: 0 0 10px rgb(90, 88, 88);
              margin: 10px 30px 10px 0px;
              cursor: pointer;
              div{
                border: 2px #e6e7e7 solid;
                box-shadow: 0 0px 5px #000000;
                img{
                  width: 100%;
                }
              }
              p{
                text-align: center;
                font-size: 16px;
                font-weight: normal;
              }
              .active {
                border-radius: 4px;
                border: 3px #4451ff solid;
              }
            }
          }
        }
      }
      .template-btn{
        display: flex;
        margin: 20px auto;
        justify-content: center;
        .el-button{
          width: 100px;
          margin: 0 30px;
        }
      }
    }
</style>
