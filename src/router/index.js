import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'//登录
import Management from '@/components/management'//管理首页
import UserData from '@/components/user/userData'//用户管理
import UserInfo from '@/components/user/userInfo'//用户信息
import PasswordChange from '@/components/user/passwordChange'//密码修改
import ManageComponent from '@/components/component/manageComponent'//模板管理
import ComponentEditor from '@/components/component/componentEditor'//组件管理
import AllTemplate from '@/components/template/allTemplate'//全部模版
import TemplateEditor from '@/components/template/templateEditor'//模版管理
import AddTemplate from '@/components/template/addTemplate'//新增模版
import DesignTemplate from '@/components/template/designTemplate'//新增模版--设计模版
import SuiteManagement from '@/components/suite/suiteManagement'//套件管理
import SuiteAdd from '@/components/suite/suiteAdd'//套件管理-新增套件
import SuiteEditor from '@/components/suite/suiteEditor'//套件管理-编辑套件
import SuiteClassification from '@/components/suite/suiteClassification'//套件管理
import WebsiteEditor from '@/components/suite/websiteEditor'//套件管理--网站编辑器
import WebsiteUpdate from '@/components/suite/websiteUpdate'//套件管理--网站编辑器
import SiteManage from '@/components/siteManage/siteManage'//站点管理
import Preview from '@/components/suite/preview'//预览套件设计页面
import PreviewTemplate from '@/components/suite/previewTemplate'//预览模板查询页面
import PictureManage from '@/components/materialManage/pictureManage'//素材库
import Banner from '@/components/activity/banner'//banner管理
import BannerAdd from '@/components/activity/bannerAdd'//banner新增
import BannerEdit from '@/components/activity/bannerEdit'//banner编辑
import ActiveConfiguration from '@/components/activity/activeConfiguration'//活动配置
import ActiveAdd from '@/components/activity/activeAdd'//活动新增
import ActiveEdit from '@/components/activity/activeEdit'//活动编辑
import ActiveItems from '@/components/activity/activeItems'//活动详情
import CourseManagement from '@/components/content/courseManagement'//教程管理
import CourseAdd from '@/components/content/courseAdd'//教程新增
import CourseEdit from '@/components/content/courseEdit'//教程编辑
import CourseList from '@/components/content/courseList'//教程详情
import CaseManagement from '@/components/content/caseManagement'//案例管理
import CaseAdd from '@/components/content/caseAdd'//案例新增
import CaseEdit from '@/components/content/caseEdit'//案例编辑
import OperationLog from '@/components/system/operationLog'//操作日志
import Backup from '@/components/system/backup'//操作日志
import InformationSet from '@/components/system/informationSet'//操作日志
import WorkersManage from '@/components/rightsManage/workersManage'//员工管理
import RoleManage from '@/components/rightsManage/roleManage'//角色管理



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview
    },
    {
      path: '/previewTemplate',
      name: 'previewTemplate',
      component: PreviewTemplate
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
		  path: '/passwordChange',
		  name: 'passwordChange',
		  component: PasswordChange,
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
      path: '/websiteUpdate',
      name: 'websiteUpdate',
      component: WebsiteUpdate
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
     {
      path: '/banner',
      name: 'banner',
      component: Banner
     },
     {
      path: '/bannerAdd',
      name: 'bannerAdd',
      component: BannerAdd
     },
     {
      path: '/bannerEdit',
      name: 'bannerEdit',
      component: BannerEdit
     },
     {
      path: '/activeConfiguration',
      name: 'activeConfiguration',
      component: ActiveConfiguration
     },
      {
        path: '/activeAdd',
        name: 'activeAdd',
        component: ActiveAdd
      },
      {
        path: '/activeEdit',
        name: 'activeEdit',
        component: ActiveEdit
      },
      {
        path: '/activeItems',
        name: 'activeItems',
        component: ActiveItems
      },
      {
        path: '/courseManagement',
        name: 'courseManagement',
        component: CourseManagement
      },
      {
        path: '/courseAdd',
        name: 'courseAdd',
        component: CourseAdd
      },
      {
        path: '/courseEdit',
        name: 'courseEdit',
        component: CourseEdit
      },
      {
        path: '/courseList',
        name: 'courseList',
        component: CourseList
      },
      {
        path: '/caseManagement',
        name: 'caseManagement',
        component: CaseManagement
      },
      {
        path: '/caseAdd',
        name: 'caseAdd',
        component: CaseAdd
      },
      {
        path: '/caseEdit',
        name: 'caseEdit',
        component: CaseEdit
      },
      {
        path: '/operationLog',
        name: 'operationLog',
        component: OperationLog
      },
      {
        path: '/backup',
        name: 'backup',
        component: Backup
      },
      {
        path: '/informationSet',
        name: 'informationSet',
        component: InformationSet
      },
      {
        path: '/backup',
        name: 'backup',
        component: Backup
      },
      {
        path: '/workersManage',
        name: 'workersManage',
        component: WorkersManage
      },
      {
        path: '/roleManage',
        name: 'roleManage',
        component: RoleManage
      },
      ]
    }]

})
