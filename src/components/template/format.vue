<template>
  <div class="formatside">
    <label>版式区</label>
    <table border="0" cellspacing="0" cellpadding="0" v-if="typographyId==0">
      <tr>
        <td :class="{'side-right-border':formatDate == ''}">
          <div class="formatside-right-list" :class="{'height_auto':formatDate != ''}" @mousemove="showFormat = true" @mouseleave="showFormat=false">
            <el-button type="primary" v-if="formatDate == ''" @click="addComponent('formatDate')">+添加组件</el-button>
            <div v-if="formatDate != ''" v-html="formatDate" style="width: 100%">
              {{formatDate}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate != ''" :class="{'delItem':showFormat}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat}" @click="addComponent"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat}" @click="delComponent('formatDate')"></i>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td :class="{'side-right-border':formatDate2 == ''}">
          <div class="formatside-right-list" :class="{'height_auto':formatDate2 != ''}" @mousemove="showFormat2 = true" @mouseleave="showFormat2=false">
            <el-button type="primary" v-if="formatDate2 == ''" @click="addComponent('formatDate2')">+添加组件</el-button>
            <div v-if="formatDate2 != ''" v-html="formatDate2" style="width: 100%">
              {{formatDate2}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate2 != ''" :class="{'delItem':showFormat2}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat2}" @click="addComponent"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat2}" @click="delComponent('formatDate2')"></i>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td :class="{'side-right-border':formatDate3 == ''}">
          <div class="formatside-right-list" :class="{'height_auto':formatDate3 != ''}" @mousemove="showFormat3 = true" @mouseleave="showFormat3=false">
            <el-button type="primary" v-if="formatDate3 == ''" @click="addComponent('formatDate3')">+添加组件</el-button>
            <div v-if="formatDate3 != ''" v-html="showFormat3" style="width: 100%">
              {{formatDate3}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate3 != ''" :class="{'delItem':showFormat3}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat3}" @click="addComponent"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat3}" @click="delComponent('formatDate3')"></i>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <table border="0" cellspacing="0" cellpadding="0" v-if="typographyId==1">
      <tr>
        <td :class="{'side-right-border':formatDate == ''}">
          <div class="formatside-right-list2" @mousemove="showFormat = true" @mouseleave="showFormat=false">
            <el-button type="primary" v-if="formatDate == ''" @click="addComponent('formatDate')">+添加组件</el-button>
            <div v-if="formatDate != ''" v-html="formatDate" style="width: 100%">
              {{formatDate}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate != ''" :class="{'delItem':showFormat}">
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
          showFormat:false,
          showFormat2:false,
          showFormat3:false,
          type:''
        }
      },
      props:['typographyId','formatDate','formatDate2','formatDate3'],
      methods:{
        addComponent(type) {
          this.type=type
          this.$emit('addComponent', type)
        },
        //删除组件
        delComponent(type) {
          switch(type) {
            case 'formatDate':

              break;
            case 'formatDate2':
              break;
            case 'formatDate3':
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
