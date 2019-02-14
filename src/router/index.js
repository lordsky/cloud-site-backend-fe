import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'//登录
import Management from '@/components/management'//管理首页
import UserData from '@/components/userData'//用户管理
import UserInfo from '@/components/userInfo'//用户信息
import ManageComponent from '@/components/manageComponent'//模板管理
import ComponentEditor from '@/components/componentEditor'//组件管理
import AllTemplate from '@/components/template/allTemplate'//全部模版
import TemplateEditor from '@/components/template/templateEditor'//模版管理
import AddTemplate from '@/components/template/addTemplate'//新增模版
import DesignTemplate from '@/components/template/designTemplate'//新增模版--设计模版
import SuiteManagement from '@/components/suite/suiteManagement'//套件管理
import SuiteAdd from '@/components/suite/suiteAdd'//套件管理-新增套件
import SuiteEditor from '@/components/suite/suiteEditor'//套件管理-编辑套件
import SuiteClassification from '@/components/suite/suiteClassification'//套件管理
import WebsiteEditor from '@/components/suite/websiteEditor'//套件管理--网站编辑器
import SiteManage from '@/components/siteManage'//站点管理
import PictureManage from '@/components/pictureManage'//素材库


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
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
		  path: '/allTemplate',
		  name: 'allTemplate',
		  component: AllTemplate
		 },
		 {
		  path: '/templateEditor',
		  name: 'templateEditor',
		  component: TemplateEditor
		 },
		 {
		  path: '/addTemplate',
		  name: 'addTemplate',
		  component: AddTemplate
		 },
     {
      path: '/designTemplate',
      name: 'designTemplate',
      component: DesignTemplate
     },
     {
      path: '/suiteManagement',
      name: 'suiteManagement',
      component: SuiteManagement
     },
     {
      path: '/suiteClassification',
      name: 'suiteClassification',
      component: SuiteClassification
     },
     {
      path: '/suiteAdd',
      name: 'suiteAdd',
      component: SuiteAdd
     },
     {
      path: '/suiteEditor',
      name: 'suiteEditor',
      component: SuiteEditor
     },
     {
      path: '/websiteEditor',
      name: 'websiteEditor',
      component: WebsiteEditor
     },
		 {
		  path: '/siteManage',
		  name: 'siteManage',
		  component: SiteManage
		 },
		 {
		  path: '/pictureManage',
		  name: 'pictureManage',
		  component: PictureManage
		 },
      ]
    }]

})
