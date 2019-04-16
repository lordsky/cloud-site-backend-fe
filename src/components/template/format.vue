<template>
  <div class="formatside">
    <label>版式区</label>
    <table border="0" cellspacing="0" cellpadding="0" v-if="typographyId==0">
      <tr>
        <td :class="{'side-right-border':formatDate == ''}">
          <div class="formatside-right-list2" @mousemove="showFormat = true" @mouseleave="showFormat=false">
            <el-button type="primary" v-if="formatDate == ''" @click="addComponent('formatDate')">+添加组件</el-button>
            <div v-if="formatDate != ''" v-html="formatDate" style="width: 100%">
              {{formatDate}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate != ''" :class="{'delItem':showFormat}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat}" @click="addComponent('formatDate')"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat}" @click="delComponent('formatDate')"></i>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <table border="0" cellspacing="0" cellpadding="0" v-if="typographyId==1">
      <tr>
        <td :class="{'side-right-border':formatDate == ''}">
          <div class="formatside-right-list" :class="{'height_auto':formatDate != ''}" @mousemove="showFormat = true" @mouseleave="showFormat=false">
            <el-button type="primary" v-if="formatDate == ''" @click="addComponent('formatDate')">+添加组件</el-button>
            <div v-if="formatDate != ''" v-html="formatDate" style="width: 100%">
              {{formatDate}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate != ''" :class="{'delItem':showFormat}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat}" @click="addComponent('formatDate')"></i>
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
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat2}" @click="addComponent('formatDate2')"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat2}" @click="delComponent('formatDate2')"></i>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <table border="0" cellspacing="0" cellpadding="0" v-if="typographyId==2">
      <tr>
        <td :class="{'side-right-border':formatDate == ''}">
          <div class="formatside-right-list" :class="{'height_auto':formatDate != ''}" @mousemove="showFormat = true" @mouseleave="showFormat=false">
            <el-button type="primary" v-if="formatDate == ''" @click="addComponent('formatDate')">+添加组件</el-button>
            <div v-if="formatDate != ''" v-html="formatDate" style="width: 100%">
              {{formatDate}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate != ''" :class="{'delItem':showFormat}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat}" @click="addComponent('formatDate')"></i>
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
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat2}" @click="addComponent('formatDate2')"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat2}" @click="delComponent('formatDate2')"></i>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td :class="{'side-right-border':formatDate3 == ''}">
          <div class="formatside-right-list" :class="{'height_auto':formatDate3 != ''}" @mousemove="showFormat2 = true" @mouseleave="showFormat2=false">
            <el-button type="primary" v-if="formatDate3 == ''" @click="addComponent('formatDate3')">+添加组件</el-button>
            <div v-if="formatDate3 != ''" v-html="formatDate3" style="width: 100%">
              {{formatDate3}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate3 != ''" :class="{'delItem':showFormat3}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat3}" @click="addComponent('formatDate3')"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat3}" @click="delComponent('formatDate3')"></i>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <table border="0" cellspacing="0" cellpadding="0" v-if="typographyId==3">
      <tr>
        <td :class="{'side-right-border':formatDate == ''}">
          <div class="formatside-right-list" :class="{'height_auto':formatDate != ''}" @mousemove="showFormat = true" @mouseleave="showFormat=false">
            <el-button type="primary" v-if="formatDate == ''" @click="addComponent('formatDate')">+添加组件</el-button>
            <div v-if="formatDate != ''" v-html="formatDate" style="width: 100%">
              {{formatDate}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate != ''" :class="{'delItem':showFormat}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat}" @click="addComponent('formatDate')"></i>
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
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat2}" @click="addComponent('formatDate2')"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat2}" @click="delComponent('formatDate2')"></i>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td :class="{'side-right-border':formatDate3 == ''}">
          <div class="formatside-right-list" :class="{'height_auto':formatDate3 != ''}" @mousemove="showFormat2 = true" @mouseleave="showFormat2=false">
            <el-button type="primary" v-if="formatDate3 == ''" @click="addComponent('formatDate3')">+添加组件</el-button>
            <div v-if="formatDate3 != ''" v-html="formatDate3" style="width: 100%">
              {{formatDate3}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate3 != ''" :class="{'delItem':showFormat3}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat3}" @click="addComponent('formatDate3')"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat3}" @click="delComponent('formatDate3')"></i>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <table border="0" cellspacing="0" cellpadding="0" v-if="typographyId==4">
      <tr>
        <td :class="{'side-right-border':formatDate == ''}">
          <div class="formatside-right-list" :class="{'height_auto':formatDate != ''}" @mousemove="showFormat = true" @mouseleave="showFormat=false">
            <el-button type="primary" v-if="formatDate == ''" @click="addComponent('formatDate')">+添加组件</el-button>
            <div v-if="formatDate != ''" v-html="formatDate" style="width: 100%">
              {{formatDate}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate != ''" :class="{'delItem':showFormat}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat}" @click="addComponent('formatDate')"></i>
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
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat2}" @click="addComponent('formatDate2')"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat2}" @click="delComponent('formatDate2')"></i>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td :class="{'side-right-border':formatDate3 == ''}">
          <div class="formatside-right-list" :class="{'height_auto':formatDate3 != ''}" @mousemove="showFormat3 = true" @mouseleave="showFormat3=false">
            <el-button type="primary" v-if="formatDate3 == ''" @click="addComponent('formatDate3')">+添加组件</el-button>
            <div v-if="formatDate3 != ''" v-html="formatDate3" style="width: 100%">
              {{formatDate3}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate3 != ''" :class="{'delItem':showFormat3}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat3}" @click="addComponent('formatDate3')"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat3}" @click="delComponent('formatDate3')"></i>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td :class="{'side-right-border':formatDate4 == ''}">
          <div class="formatside-right-list" :class="{'height_auto':formatDate4 != ''}" @mousemove="showFormat4 = true" @mouseleave="showFormat4=false">
            <el-button type="primary" v-if="formatDate4 == ''" @click="addComponent('formatDate4')">+添加组件</el-button>
            <div v-if="formatDate4 != ''" v-html="formatDate4" style="width: 100%">
              {{formatDate4}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate4 != ''" :class="{'delItem':showFormat4}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat4}" @click="addComponent('formatDate4')"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat4}" @click="delComponent('formatDate4')"></i>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td :class="{'side-right-border':formatDate5 == ''}">
          <div class="formatside-right-list" :class="{'height_auto':formatDate5 != ''}" @mousemove="showFormat5 = true" @mouseleave="showFormat5=false">
            <el-button type="primary" v-if="formatDate5 == ''" @click="addComponent('formatDate5')">+添加组件</el-button>
            <div v-if="formatDate5 != ''" v-html="formatDate5" style="width: 100%">
              {{formatDate5}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate5 != ''" :class="{'delItem':showFormat5}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat5}" @click="addComponent('formatDate5')"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat5}" @click="delComponent('formatDate5')"></i>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td :class="{'side-right-border':formatDate6 == ''}">
          <div class="formatside-right-list" :class="{'height_auto':formatDate6 != ''}" @mousemove="showFormat6 = true" @mouseleave="showFormat6=false">
            <el-button type="primary" v-if="formatDate6 == ''" @click="addComponent('formatDate6')">+添加组件</el-button>
            <div v-if="formatDate6 != ''" v-html="formatDate6" style="width: 100%">
              {{formatDate6}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate6 != ''" :class="{'delItem':showFormat6}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat6}" @click="addComponent('formatDate6')"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat6}" @click="delComponent('formatDate6')"></i>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td :class="{'side-right-border':formatDate7 == ''}">
          <div class="formatside-right-list" :class="{'height_auto':formatDate7 != ''}" @mousemove="showFormat7 = true" @mouseleave="showFormat7=false">
            <el-button type="primary" v-if="formatDate7 == ''" @click="addComponent('formatDate7')">+添加组件</el-button>
            <div v-if="formatDate7 != ''" v-html="formatDate6" style="width: 100%">
              {{formatDate7}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate7 != ''" :class="{'delItem':showFormat7}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat7}" @click="addComponent('formatDate7')"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat7}" @click="delComponent('formatDate7')"></i>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td :class="{'side-right-border':formatDate8 == ''}">
          <div class="formatside-right-list" :class="{'height_auto':formatDate8 != ''}" @mousemove="showFormat8 = true" @mouseleave="showFormat8=false">
            <el-button type="primary" v-if="formatDate8 == ''" @click="addComponent('formatDate8')">+添加组件</el-button>
            <div v-if="formatDate8 != ''" v-html="formatDate8" style="width: 100%">
              {{formatDate8}}
            </div>
            <!--<img src="@/assets/img/topside.png">-->
            <div v-if="formatDate8 != ''" :class="{'delItem':showFormat8}">
              <i class="el-icon-edit-outline compon-edit-ico" :class="{'icoShow':showFormat8}" @click="addComponent('formatDate8')"></i>
              <i class="el-icon-delete compon-edit-ico" :class="{'icoShow':showFormat8}" @click="delComponent('formatDate8')"></i>
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
          showFormat4:false,
          showFormat5:false,
          showFormat6:false,
          showFormat7:false,
          showFormat8:false,
          type:''
        }
      },
      props:['typographyId','formatDate','formatDate2','formatDate3','formatDate4','formatDate5','formatDate6','formatDate7','formatDate8'],
      methods:{
        addComponent(type) {
          this.type=type
          this.$emit('addComponent', type)
        },
        //删除组件
        delComponent(type) {
          this.type=type
          this.$emit('delComponent', type)
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
      overflow: hidden;
      label{
        width: 80px;
        white-space: nowrap;
      }
      table{
        width: 90%;
        /*height: 220px;*/
        //border: 2px #242dff dashed;
        border-collapse: collapse;
        td{
          /*width: 100%;*/
          height: 126px;
          /*text-align: center;*/
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
            height: auto;
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
