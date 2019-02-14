<template>
  <div class="bannerside" v-if="typographyId == 0">
    <label>横幅区</label>
    <div class="bannerside-right" :class="{'side-right-border':html1.length == 0}">
      <div class="bannerside-right-list" :class="{'height_auto':html1.length != 0}" @mousemove="showBanner = true" @mouseleave="showBanner=false">
        <el-button type="primary" v-if="html1.length == 0" @click="addComponent">+添加组件</el-button>
        <div v-if="html1.length != 0" v-html="html1" style="width: 100%">
          {{html1}}
        </div>
        <!--<img src="@/assets/img/topside.png">-->
        <div v-if="html1.length != 0" :class="{'delItem':showBanner}">
          <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showBanner}" @click="addComponent"></i>
          <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showBanner}" @click="delComponent('banner')"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "banner",
      data() {
        return {
          html1:'',
          formatDate:[],
          showBanner:false,
        }
      },
      props:['typographyId'],
      methods:{
        addComponent() {
          this.$emit('addComponent', 'on')
        },
        //删除组件
        delComponent(type) {
          switch(type) {
            case 'top':
              console.log('顶部区')
              break;
            case 'banner':
              console.log('横幅区')
              this.html1 = ''
              break;
            case 'format':
              this.html2 = ''
              console.log('版式区')
              break;
            case 'footer':
              console.log('页脚区')
              break;
          }
        },
      }
    }
</script>

<style lang="scss" scoped>
  .bannerside{
    display: flex;
    margin-top: 20px;
    font-size: 18px;
    font-weight: 600;
    align-items: center;
    label{
      width: 80px;
    }
    .bannerside-right{
      width: 90%;
      .bannerside-right-list{
        position: relative;
        height: 126px;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .height_auto{
        height: auto;
      }
      img{
        width: 100%;
        border: 1px solid #cccccc;
      }
      .compon-edit-ico {
        display: none;
        font-size: 30px;
        color: #ffffff;
        margin-right: 30px;
        cursor: pointer;
      }
      .icoShow {
        display: block;
      }
    }
    .side-right-border{
      border: 2px #4d78ff dashed;
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
      justify-content: center;
    }
  }
</style>
