<template>
  <div class="formatside">
    <label>版式区</label>
    <table border="0" cellspacing="0" cellpadding="0" v-if="typographyId==0">
      <tr>
        <td :class="{'side-right-border':html2.length == 0}">
          <div class="formatside-right-list" @mousemove="showFormat = true" @mouseleave="showFormat=false">
            <el-button type="primary" v-if="html2.length == 0" @click="addComponent">+添加组件</el-button>
            <div v-if="html2.length != 0" v-html="html2" style="width: 100%">
              {{html2}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="html2.length != 0" :class="{'delItem':showFormat}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat}" @click="addComponent"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat}" @click="delComponent('format')"></i>
            </div>
          </div>
        </td>
        <td :class="{'side-right-border':formatDate.length == 0}">
          <el-button type="primary" v-if="formatDate.length == 0" @click="addComponent">+添加组件</el-button>
        </td>
      </tr>
      <tr>
        <td :class="{'side-right-border':formatDate.length == 0}">
          <el-button type="primary" v-if="formatDate.length == 0" @click="addComponent">+添加组件</el-button>
        </td>
        <td :class="{'side-right-border':formatDate.length == 0}">
          <el-button type="primary" v-if="formatDate.length == 0" @click="addComponent">+添加组件</el-button>
        </td>
      </tr>
    </table>
    <table border="0" cellspacing="0" cellpadding="0" v-if="typographyId==1">
      <tr>
        <td :class="{'side-right-border':html2.length == 0}">
          <div class="formatside-right-list2" @mousemove="showFormat = true" @mouseleave="showFormat=false">
            <el-button type="primary" v-if="html2.length == 0" @click="addComponent">+添加组件</el-button>
            <div v-if="html2.length != 0" v-html="html2" style="width: 100%">
              {{html2}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="html2.length != 0" :class="{'delItem':showFormat}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat}" @click="addComponent"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat}" @click="delComponent('format')"></i>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
    export default {
      name: "format",
      data() {
        return {
            html2:'<div class="headTop"><div class="head-left"></div> <div class="head-right"><span class="head-user-ico"></span> <div class="el-dropdown"><span class="el-dropdown-link el-dropdown-selfdefine" aria-haspopup="list" aria-controls="dropdown-menu-1584" role="button" tabindex="0"><span class="head-right-user">用户名称</span> <i class="el-icon-arrow-down el-icon--right"></i></span> <ul class="el-dropdown-menu el-popper" id="dropdown-menu-1584" style="display: none;"><button type="button" class="el-button el-button--text" style="padding: 5px 30px;"><!----><!----><span>退出登录</span></button></ul></div></div> <div class="el-dialog__wrapper" style="display: none;"><div role="dialog" aria-modal="true" aria-label="退出" class="el-dialog" style="margin-top: 15vh;"><div class="el-dialog__header"><span class="el-dialog__title">退出</span><button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button></div><!----><div class="el-dialog__footer"><span class="dialog-footer"><button type="button" class="el-button el-button--default"><!----><!----><span>取 消</span></button> <button type="button" class="el-button el-button--primary"><!----><!----><span>确 定</span></button></span></div></div></div></div>',
          formatDate:[],
          showFormat:false,
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
  .addTemplate{
    .formatside{
      display: flex;
      margin-top: 20px;
      font-size: 18px;
      font-weight: 600;
      align-items: center;
      label{
        width: 80px;
      }
      table{
        width: 90%;
        height: 220px;
        //border: 2px #242dff dashed;
        border-collapse: collapse;
        td{
          width: 50%;
          height: 110px;
          text-align: center;
          overflow: hidden;
          //border: 2px #242dff dashed
          .formatside-right-list{
            position: relative;
            height: 126px;
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .formatside-right-list2{
            position: relative;
            height: 252px;
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: center;
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
