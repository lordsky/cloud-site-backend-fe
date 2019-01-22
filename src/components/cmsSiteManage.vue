<template>
  <div class="siteManage">
    <div class="site-manage-noWeb" style="display: none;">
      <div class="site-manage-noWeb-title">
        <div class="noWeb-text">
          <p>你还没有自己的网站，创建一个吧！</p>
          <el-button type="primary">新建网站</el-button>
        </div>
      </div>
      <div class="site-manage-noWeb-box">
      </div>
    </div>
    <div class="site-manage-web">
      <div class="site-manage-web-title">
        <p>我的站点列表</p>
      </div>
      <div class="site-manage-web-box">
        <div class="site-manage-web-item" v-for="x in 3">
          <div class="web-item-head">
            <div class="web-item-head-text">
              <p>xxx的网站 <span class="web-item-ico" @click="editSite"><i class="el-icon-edit-outline"></i></span></p>
              <p>状态：未发布</p>
              <a href="">
                <p>http://www.baidu.com</p>
              </a>
            </div>
          </div>
          <div class="web-item-head-btn">
            <div class="item-btns borSet">
              <el-button type="" round size="small">设计</el-button>
            </div>
            <div class="item-btns">
              <el-button type="primary" round size="small">预览</el-button>
            </div>
            <div class="item-btns">
              <el-button type="primary" round size="small" @click="releaseWeb">一键发布</el-button>
            </div>
            <div class="item-btns borSet">
              <el-button type="primary" round size="small">导出</el-button>
            </div>
            <div class="item-btns">
              <el-button type="danger" round size="small" @click="delWeb">删除</el-button>
            </div>
            <div class="item-btns"></div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogShow" width="600px">
      <el-form :model="formInline" class="demo-form-inline">
        <div class="dialog-box-rename" v-show="renameShow">
          <el-form-item label="网站重命名：">
            <el-input v-model="formInline.user" placeholder="请输入重命名"></el-input>
          </el-form-item>
        </div>
        <div class="dialog-box-setSite" v-show="setSiteShwo">
          <p class="dialog-box-setSite-title">域名由移动云建站免费提供</p>
          <div class="setSite-input">
            <el-input placeholder="请输入内容" v-model="inputSite">
              <template slot="prepend">Http://</template>
              <template slot="append">.yjz.com</template>
            </el-input>
            <div class="setSite-remind">
              <p><i class="el-icon-warning"></i>请输入4到16位正确域名，域名不能包括中文#@;或空格等特殊字符</p>
              <p :class="{'warn-ico':warnShow}" v-show="warnShow"><i class="el-icon-warning"></i>此域名已被使用</p>
            </div>
          </div>
        </div>
      </el-form>
      <div class="dialog-btn">
        <el-button @click="dialogShow = false,warnShow = false">取 消</el-button>
        <el-button type="primary" @click="warnShow = true">确 定</el-button>
      </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'siteManage',
    data() {
      return {
        dialogShow: false,
        dialogTitle: '',
        inputSite: '',
        renameShow: false,
        setSiteShwo: false,
        warnShow: false,
        formInline: {
          user: ''
        }
      }
    },
    methods: {
      //网站重命名
      editSite() {
        this.dialogShow = true
        this.dialogTitle = ''
        this.renameShow = true
        this.setSiteShwo = false
      },
      //发布网站
      releaseWeb() {
        this.dialogShow = true
        this.renameShow = false
        this.setSiteShwo = true
        this.dialogTitle = '请填写新的站点域名'
      },
      //删除网站
      delWeb() {
        this.renameShow = false
        this.setSiteShwo = false
        this.dialogShow = true
        this.dialogTitle = '删除站点后数据不可找回，确定删除站点吗？'
      }
    }
  }
</script>

<style scoped>
  .site-manage-noWeb-title {
    height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .noWeb-text>p {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  
  .noWeb-text>button {
    display: block;
    margin: 0 auto;
  }
  
  .site-manage-noWeb-box {
    height: 50vh;
    border: 1px solid black;
  }
  
  .site-manage-web-title {
    padding: 30px 0 30px 0;
    font-size: 16px;
    font-weight: 600;
  }
  
  .site-manage-web-box {
    display: flex;
    justify-content: space-between;
  }
  
  .site-manage-web-item {
    width: 30%;
    height: 300px;
  }
  
  .web-item-head {
    width: 100%;
    height: 40%;
    border: 1px black solid;
  }
  
  .web-item-head-text {
    margin: 10px 0 0 30px;
    font-size: 14px;
  }
  
  .web-item-head-text>p:nth-child(1) {
    font-size: 18px;
    font-weight: 600;
  }
  
  .web-item-ico {
    cursor: pointer;
    color: #999999;
  }
  
  .warn-ico {
    position: relative;
    animation: war .1s linear;
  }
  
  @keyframes war {
    0% {
      top: 5px;
    }
    30% {
      top: -5px;
    }
    60% {
      top: 5px;
    }
    100% {
      top: -5px;
    }
  }
  
  .web-item-head-btn {
    height: 60%;
    width: 100%;
    border: 1px black solid;
    border-top: 0;
    border-bottom: 0;
  }
  
  .item-btns {
    width: 33.33%;
    height: 50%;
    border: 1px black solid;
    float: left;
    border-top: 0;
    border-right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .borSet {
    border-left: 0;
  }
  
  .dialog-btn {
    display: flex;
    justify-content: center;
  }
  
  .dialog-box-rename .el-input {
    width: 65%;
  }
  
  .dialog-box-setSite {
    margin-bottom: 20px;
  }
  
  .dialog-box-setSite-title {
    text-align: center;
    padding-bottom: 10px;
  }
  
  .setSite-remind {
    color: red;
    margin-top: 10px;
  }
</style>