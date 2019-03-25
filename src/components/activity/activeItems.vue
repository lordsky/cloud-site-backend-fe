<template>
  <div class="activeItems">
    <div class="template-edit-head">
      <i class="el-icon-arrow-left icon-size"></i>
      <el-button type="text" @click="backCompon">返回</el-button>
    </div>
    <div class="course-shadow">
      <div class="course-header">
        <div class="main_title">
          <span>{{active.name}}</span>
          <p><span>发布日期：{{active.actTime}}</span></p>
        </div>
      </div>
      <div class="course-item">
        <div style="width: 100%" v-html="active.description">{{active.description}}</div>
      </div>
      <div class="foot-nav">
        <span v-if="active.beforeId != null" @click="getActiveInfo(active.beforeId)">
          &lt;  {{active.beforeName}}
        </span>
            <span v-if="active.beforeId == null">
          &lt;  暂无上一个
        </span>
            <span v-if="active.afterId != null" @click="getActiveInfo(active.afterId)">
          {{active.afterName}}  &gt;
        </span>
            <span v-if="active.afterId == null">
          暂无下一个  &gt;
        </span>
      </div>
    </div>
  </div>
</template>

<script>
	export default{
		name:"ActiveItems",
		data(){
			return{
				active:{}
			}
		},
    methods:{
      backCompon(){
        this.$router.go(-1)
      },
      getActiveInfo(val){
        this.$api.apiActivityDetails(val).then(res=>{
          if(res.code === 200){
            this.active = res.data
          }else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    mounted() {
		  this.getActiveInfo(this.$route.query.data.id)
      // this.active = this.$route.query.data
    }
  }
</script>

<style lang="less">
  .activeItems{
    position: relative;
    /*background: #f7fcfd;*/
    .template-edit-head {
      .icon-size{
        margin-left: 20px;
        font-size: 20px;
      }
      button {
        font-size: 20px;
      }
    }
    .course-shadow{
      position: relative;
      box-shadow: -1px 5px 20px #e0e1e0;
      .foot-nav{
        position: absolute;
        padding: 0 32px;
        bottom: 20px;
        width: 100%;
        font-size: 13px;
        color: #6B6B6B;
        span{
          cursor: pointer;
          &:hover{
            color: #6389f8;
          }
        }
        span:nth-child(2){
          float: right;
          /*padding-right: 60px;*/
        }
      }
    }
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
          font-size: 14px;
          padding-top: 15px;
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
    .course-item{
      position: relative;
        padding: 20px 32px 40px 32px;
        height: 75vh;
      overflow: hidden;
      overflow-y: auto;
      img{
        width: 100%;
      }
        .title{
           padding: 30px 0 28px 0;
           font-size: 18px;
           color: #959595;
        }
        .detail{
          font-size: 18px;
          color: #6B6B6B;
          padding-bottom: 26px;
          font-weight: 400;
        }
        .text{
          font-size: 14px;
          color: #959595;
          line-height: 28px;
        }
      }
  }
</style>
