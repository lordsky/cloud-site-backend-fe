<template>
  <div class="management">
    <Sidebar :switchLeft="switchLeft"></Sidebar>
    <HeadTop @onLeft="onLeft"></HeadTop>
    <ContentCommon>
     <!--组件切换区-->
      <router-view></router-view>
    </ContentCommon>
  </div>
</template>

<script>
  import Sidebar from './common/sidebar';//侧边栏
  import HeadTop from './common/headTop';//顶部栏
  import ContentCommon from './common/content';//内容区块
  export default {
    name: 'management',
    data() {
      return {
        switchLeft: false,
      }
    },
    components: {
      Sidebar,
      HeadTop,
      ContentCommon,
    },
    methods: {
    	//伸缩按钮
      onLeft(res) {
//    	console.log(res)
        this.switchLeft = !this.switchLeft
      },
      
    }
  }
</script>

<style lang="less">

</style>