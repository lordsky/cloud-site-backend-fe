import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'//登录
import Management from '@/components/management'//管理首页
import UserData from '@/components/userData'//用户管理
import UserInfo from '@/components/userInfo'//用户信息
import ManageComponent from '@/components/manageComponent'//模板管理
import ComponentEditor from '@/components/componentEditor'//组件管理
import SiteManage from '@/components/siteManage'//站点管理

import CmsUser from '@/components/cmsUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/management',
      name: 'management',
      component: Management,
      children:[
          {
		  path: '/userData',
		  name: 'userData',
		  component: UserData,
		 },
		 {
		  path: '/userInfo',
		  name: 'userInfo',
		  component: UserInfo
		 },
		 {
		  path: '/manageComponent',
		  name: 'manageComponent',
		  component: ManageComponent
		 },
		 {
		  path: '/componentEditor',
		  name: 'componentEditor',
		  component: ComponentEditor
		 },
		 {
		  path: '/siteManage',
		  name: 'siteManage',
		  component: SiteManage
		 },
		{
		  path: '/cmsUser',
		  name: 'cmsUser',
		  component: CmsUser
		 },
      ]
    }]

})
