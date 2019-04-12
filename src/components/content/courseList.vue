<template>
  <div class="courseList">
    <div class="template-edit-head">
      <i class="el-icon-arrow-left icon-size"></i>
      <el-button type="text" @click="backCompon">返回</el-button>
    </div>
    <div class="main">
      <div class="main-content">
      	<div class="main-content-left" v-if="courseId == ''">
          <div class="course-header">
            <div class="main_title">
              <span>{{courseInfo.title}}</span>
              <p><span>发布日期：{{courseInfo.createTime}}</span></p>
            </div>
            <!--<div class="main__input">-->
              <!--<el-input placeholder="请输入您的问题,例如：绑定域名"></el-input><i class="el-icon-search seek"></i>-->
            <!--</div>-->
          </div>
      		<CourseItem @getCatInfo="getCatInfo" :courseInfo="courseInfo"/>
      	</div>
        <div class="main-content-left" v-if="courseId != ''">
          <!--<CourseSeek :titleList="titleList" :searchList="searchList"  @getSeek="getSeek"></CourseSeek>-->
          <div class="main-content-left-list">
            <div class="main-content-left-item" v-for="(item,index) in contentList" :key="index">
              <img :src="item.coverUrl" alt="" />
              <div class="main-content-left-item-text">
                <div class="main-content-left-item-text-title">
                  <p>{{item.title}}</p>
                  <span>发布日期：{{item.creatTime}}</span><span>分类：{{item.firstCat}} {{item.secondCat}}</span>
                </div>
                <p class="main-content-left-item-text__detail">{{item.description}}</p>
                <span class="main-content-left-item-text__btn" @click="jumpDetail(item)">阅读正文&gt;</span>
              </div>
            </div>
            <div class="contList_paging">
              <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :page-size="pageSize"
                background
                layout="prev, pager, next, jumper"
                :total="totalPage">
              </el-pagination>
            </div>
          </div>
        </div>
      	<div class="main-content-right">
      	 <div class="main-right-tutorial">
      	   <div class="main-content-right-head">
      	   	 <i class="el-icon-menu"></i><span>教程分类</span>
      	   </div>
      	   <div class="main-content-right-class">
      	   	  <ul class="main-content-list" v-for="(x,i) in setTree" :key="i">
      	   	  	<li @click="isItemShow = i" >{{x.catName}}
      	   	  		<i :class="isItemShow==i?'el-icon-arrow-down':'el-icon-arrow-right'"></i>
      	   	  	</li>
      	   	  	<ul class="main-content-item" :class="{'show':isItemShow==i}">
                    <li v-for="(x,index) in setTree[i].children" @click="getCourseList(x.id)">{{x.catName}}</li>
      	   	   </ul>
      	   	  </ul>
      	   </div>
      	   </div>
      	</div>
      	
      </div>
    </div>
  </div>
</template>

<script>
  import CourseItem from './courseItems'
  import CourseSeek from './courseHeader'
  export default {
    name: "CourseList",
    data() {
      return {
        seek:'',
        textList: ['教程中心', '教程列表'],
        titleList:{
          title:''
        },
        listShow:true,
        isItemShow:0,
        classText:'',
        setTree:[],
        courseInfo:{},
        courseId:'',
        contentList:[],
        pageSize:5,
        currentPage:0,
        totalPage:0,
        page:1,
      }
    },
    components: {
      CourseItem,
      CourseSeek
    },
    methods:{
      backCompon(){
        this.$router.go(-1)
      },
    	//详情页面
    	 jumpDetail(){
    	 	this.courseId = ''
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
      getSeek(val){
        this.seek = val
      },
      //搜索
      searchList(text){
        this.getList(text).then(response=>{
          this.listShow = true
          this.titleList.time = false
          this.titleList.title = '建站列表'
          this.$set(this.textList,1,'教程列表')
          this.contentList = response.data.data.content
          this.totalPage = response.data.data.totalElements
          this.$router.push({path:'/courseList'})
        })
      },
      getCatInfo(val){
        this.$api.apiCourseDetails(val).then(res=>{
          if(res.msg === "success") {
            this.courseInfo = res.data

          } else {
            this.$message.error(res.msg)
          }
        })
      },
      jumpDetail(item){
        this.courseId = ''
        this.getCatInfo(item.id)
      },
      //当前页码
      handleCurrentChange(val) {
        this.page = val;
        this.getCourseList(this.courseId);
      },
      //当前条数
      handleSizeChange(val) {
        this.pageSize = val;
        this.getCourseList(this.courseId);
      },
      getCourseList(id){
        this.courseId = id
        let para = {
          catId:id,
          pageNum: this.page,
          pageSize: this.pageSize,
          title: '',
          state:'',
          type:'',
          startDate:'',
          endDate:''
        };
        this.$api.apiCourseList(para).then(res=>{
          if(res.msg === "success") {
            this.contentList = res.data.content
            this.totalPage = res.data.totalElements
            this.titleList.title = this.contentList[0].secondCat
            this.getCatInfo(res.data.content[0].id)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    mounted() {
      this.getCatList()
      this.getCatInfo(this.$route.query.id)
    }

  }
</script>

<style lang="less">
  
  .courseList {
    .template-edit-head {
      .icon-size{
        /*margin-left: 20px;*/
        font-size: 20px;
      }
      button {
        font-size: 20px;
      }
    }
  	/*background: #f7fcfd;*/
    .course-header {
      height: 90px;
      align-items: center;
      justify-content: space-between;
      display: flex;
      border-bottom: 1px solid #F2DEDE;
      .main_title{
        margin-left: 30px;
        &:nth-child(1){
          font-size: 20px;
        }
        color: #6B6B6B;
        p{
          font-size: 13px;
          padding-top: 5px;
          span{
            padding-right: 20px;
          }
        }
      }
      .main__input {
        display: flex;
        width: 400px;
        margin-right: 20px;
        .el-input__inner {
          border-radius: 0px !important;
          height: 44px;
        }
        .seek {
          width: 70px;
          background: #1088f3;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 20px;
        }
      }
    }
    .topColor {
      height: 62px;
      background: linear-gradient(left, #476cf0, #3e96fa);
    }
    img{
		width: 180px;
		height: 180px;
		padding-right: 20px;
	  }
    .main{
    	  /*width: 80%;*/
    	  /*margin: auto;*/
    	  .topTitle{
    	  	padding: 32px 0 32px 0;
    	  }
    	  .main-content{
    	  	display:flex;
    	  	margin-bottom: 20px;
    	  	.main-content-left{
    	  		width: 80%;
    	  		margin-right: 22px;
    	  		box-shadow: -1px 5px 20px #e0e1e0;
    	  		position: relative;
            .main-content-left-list{
              width: 100%;
              min-height: 100vh;
              overflow-y: auto;
              .main-content-left-item{
                padding: 0 30px 30px 30px;
                margin-top: 32px;
                border-bottom:1px solid #F2DEDE;
                display:flex;
                .main-content-left-item-text{
                  font-size: 14px;
                  flex:1;
                  .main-content-left-item-text-title{
                    p{
                      padding-top: 3px;
                      padding-bottom: 8px;
                      color: #6B6B6B;
                      font-size: 20px;
                    }
                    span{
                      color: #DCDCDC;
                      padding-right: 10px;
                    }
                  }
                  .main-content-left-item-text__detail{
                    padding-top: 15px;
                    color: #959595;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    margin-top: 7px;
                  }
                  .main-content-left-item-text__btn{
                    color: #3b89f8;
                    font-size: 16px;
                    display: block;
                    width: 100px;
                    margin-top: 40px;
                    cursor: pointer;
                  }
                }
              }
            }
    	  	}
    	  	.main-content-right{
    	  		width: 20%;
    	  		.main-right-tutorial{
    	  			box-shadow: -1px 5px 20px #e0e1e0;
    	  			height: 83vh;
    	  			overflow-y: auto;
    	  		}
    	  		.main-right-hot{
    	  			box-shadow: -1px 5px 20px #e0e1e0;
    	  			height: 30vh;
    	  			margin-top: 30px;
    	  			overflow-y: scroll;
    	  		}
    	  		.main-content-right-head{
    	  			height: 90px;
    	  			border-bottom:1px solid #F2DEDE;
    	  			display: flex;
    	  			align-items: center;
    	  			font-size: 20px;
    	  			color: #6B6B6B;
    	  			padding-left: 20px;
    	  			i{
    	  				padding-right: 10px;
    	  				color: #1088f3;
    	  			}
    	  		}
    	  		.main-content-right-class{
    	  			.main-content-list{
    	  				list-style: none;
    	  				width: 80%;
    	  				margin:auto;
    	  				margin-top: 20px;
    	  				overflow:hidden;
    	  				li{
    	  					cursor: pointer;
    	  					display: flex;
    	  					justify-content: space-between;
    	  					align-items: center;
    	  					padding-top: 10px;
    	  				}
    	  				.main-content-item{
    	  						list-style: none;
    	  						transition: all  .5s ease-in-out;
    	  						padding-top:15px;
    	  						overflow: hidden;
    	  						transform: translateY(-100%);
    	  						display: none;
    	  						li{
    	  							padding: 10px 0 10px 0;
    	  							color:#929292 ;
    	  							&:hover{
    	  								color:#6389f8 ;
    	  							}
    	  						}
    	  					}
	    	  			 .show{
	    	  			 	display: block;
	    	  			 	transform: translateY(0);
	    	  			 }
    	  			}
    	  		}
    	  	}
    	  }
    }
    @keyframes itemList{
    	from{transform: translateY(-100%);}
    	to{transform: translate(0);}
    }
  }
</style>
