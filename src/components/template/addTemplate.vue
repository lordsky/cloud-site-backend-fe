<template>
  <div class="addTemplate">
    <p>新增模版</p>
    <div class="select-template">
      <p>①选择模版分类</p>
      <el-select v-model="templateId" placeholder="请选择模版分类" class="el-select">
        <el-option v-for="(item,index) in templateTypeList" :key="item.id" :label="item.catName" :value="index">
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
      <el-button type="primary" @click="toAddTemplate(templateId)" :loading="loading">下一步</el-button>
    </div>
  </div>
</template>

<script scoped>
  export default {
    name: 'addTemplate',
    data() {
      return {
        btnShow:'',
        delShow: null,
        dialogAdd: false,
        loading:false,
        templateId: '',
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
            name:'模版1',
            imgs: require('../../assets/img/template1.png')
          },
          {
            name:'模版2',
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
        this.loading = true;
        let param = {
          //templateId : this.templateTypeList[index].catType,
          typographyId : this.typographyId,
          //pageName:this.templateTypeList[index].catName
        }
        setTimeout(() => {
          this.$router.push({
            path: '/designTemplate',
            query:{
              text:'新增模版（设计模版)',
              template:param,
            }
          })
        }, 500);
      },
      //获取模板分类
      getTemplateTypeList(val){
        this.$api.apiCatType(val).then(res => {
          if(res.msg === "success") {
            this.templateTypeList = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    created() {
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
                border: 2px #181818 solid;
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
                border: 2px #4451ff solid;
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
