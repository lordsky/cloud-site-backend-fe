//顶部栏信息
const navHead = [{
    path: 'userData',
    index: '1-1',
    text: ['用户管理', '个人资料']
  },
  {
    path: 'userInfo',
    index: '1-1',
    text: ['用户管理', '个人资料', '查看用户信息']
  },
  {
    path: 'userWhite',
    index: '1-2',
    text: ['用户管理', '用户白名单']
  },
  {
    path: 'manageComponent',
    index: '2-1',
    text: ['模板管理', '组件管理']
  },
  {
    path: 'componentEditor',
    index: '2-1',
    text: ['模板管理', '组件管理']
  },
  {
    path: 'allTemplate',
    index: '2-2',
    text: ['模板管理', '页面模版']
  },
  {
    path: 'templateEditor',
    index: '2-2',
    text: ['模板管理', '页面模版']
  },
  {
    path: 'addTemplate',
    index: '2-2',
    text: ['模板管理', '页面模版','新增模板']
  },
  {
    path: 'designTemplate',
    index: '2-2',
    text: ['模板管理', '页面模版']
  },
  {
    path: 'suiteManagement',
    index: '2-3',
    text: ['模板管理', '模板套件']
  },
  {
    path: 'suiteClassification',
    index: '2-3',
    text: ['模板管理', '模板套件']
  },
  {
    path: 'suiteAdd',
    index: '2-3',
    text: ['模板管理', '模板套件', '新增套件']
  },
  {
    path: 'suiteEditor',
    index: '2-3',
    text: ['模板管理', '模板套件']
  },
  {
    path: 'websiteEditor',
    index: '2-3',
    text: ['模板管理', '模板套件']
  },
  {
    path: 'websiteUpdate',
    index: '2-3',
    text: ['模板管理', '模板套件']
  },
  
  {
    path: 'siteManage',
    index: '3',
    text: ['站点管理']
  },
  {
    path: 'passwordChange',
    index: '4-1',
    text: ['安全设置','登陆密码设置']
  },
  
  {
    path: 'banner',
    index: '5-1',
    text: ['活动管理','banner管理']
  },
  {
    path: 'bannerAdd',
    index: '5-1',
    text: ['活动管理','banner管理','新增banner']
  },
  {
    path: 'bannerEdit',
    index: '5-1',
    text: ['活动管理','banner管理','编辑banner']
  },
  {
    path: 'activeConfiguration',
    index: '5-2',
    text: ['活动管理','活动配置']
  },
  {
    path: 'activeAdd',
    index: '5-2',
    text: ['活动管理','活动配置','新增活动']
  },
  {
    path: 'activeEdit',
    index: '5-2',
    text: ['活动管理','活动配置','编辑活动']
  },
  {
    path: 'activeItems',
    index: '5-2',
    text: ['活动管理','活动配置','活动详情']
  },
  {
    path: 'courseManagement',
    index: '6-1',
    text: ['内容管理','教程管理']
  },
  {
    path: 'courseAdd',
    index: '6-1',
    text: ['内容管理','教程管理','新增教程']
  },
  {
    path: 'courseEdit',
    index: '6-1',
    text: ['内容管理','教程管理','编辑教程']
  },
  {
    path: 'caseManagement',
    index: '6-2',
    text: ['内容管理','案例管理']
  },
  {
    path: 'caseAdd',
    index: '6-2',
    text: ['内容管理','教程管理','新增案例']
  },
  {
    path: 'caseEdit',
    index: '6-2',
    text: ['内容管理','教程管理','编辑案例']
  },
  {
    path: 'courseList',
    index: '6-1',
    text: ['内容管理','教程管理','教程详情']
  },
  {
    path: 'operationLog',
    index: '7-1',
    text: ['系统设置','操作日志']
  },
  {
    path: 'backup',
    index: '7-2',
    text: ['系统设置','数据备份']
  },
  {
    path: 'informationSet',
    index: '7-3',
    text: ['系统设置','平台基本信息设置']
  },
  {
    path: 'systemMessage',
    index: '8-1',
    text: ['消息管理','系统消息']
  },
  {
    path: 'systemItem',
    index: '8-1',
    text: ['消息管理','系统消息','查看消息']
  },
  {
    path: 'feedbackMessage',
    index: '8-2',
    text: ['消息管理','反馈消息']
  },
   {
    path: 'feedbackItem',
    index: '8-2',
    text: ['消息管理','反馈消息','查看详情']
  },
  {
    path: 'workersManage',
    index: '9-1',
    text: ['权限管理','员工管理']
  },
  {
    path: 'roleManage',
    index: '9-2',
    text: ['权限管理','角色管理']
  },
  {
    path: 'pictureManage',
    index: '10',
    text: ['素材库']
  },
]
//侧边栏信息
const sideText = [
   {
    title: '用户管理',
    index: '1',
    ico: 'el-icon-tickets',
    list: [{
        name: '个人资料',
        index: '1-1',
        path: '/userData'
      },
      {
        name: '用户白名单',
        index: '1-2',
        path: '/userWhite'
      },
    ]
},
  {
    title: '模板管理',
    index: '2',
    ico: 'el-icon-edit-outline',
    list: [{
        name: '组件管理',
        index: '2-1',
        path: '/manageComponent'
      },
      {
        name: '页面模板',
        index: '2-2',
        path: '/allTemplate'
      },
      {
        name: '模板套件',
        index: '2-3',
        path: '/suiteManagement'
      }
    ]
  },
{
    title: '站点管理',
    index: '3',
    ico: 'el-icon-share',
    path: '/siteManage',
    list: []
},
{
 title: '安全设置',
 index: '4',
 ico: 'el-icon-view',
 list: [{
     name: '登陆密码设置',
     index: '4-1',
     path: '/passwordChange'
   },
 ]
},
  {
   title: '活动管理',
   index: '5',
   ico: 'el-icon-menu',
   list: [
     {
       name: 'banner管理',
       index: '5-1',
       path: '/banner'
     },
     {
       name: '活动配置',
       index: '5-2',
       path: '/activeConfiguration'
     }
   ]
  },
  {
    title: '内容管理',
    index: '6',
    ico: 'el-icon-document',
    list: [
      {
        name: '教程管理',
        index: '6-1',
        path: '/courseManagement'
      },
      {
        name: '案例配置',
        index: '6-2',
        path: '/caseManagement'
      }
    ]
  },
  {
    title: '系统设置',
    index: '7',
    ico: 'el-icon-setting',
    list: [
      {
        name: '操作日志',
        index: '7-1',
        path: '/operationLog'
      },
      {
        name: '数据备份',
        index: '7-2',
        path: '/backup'
      },
      {
        name: '平台基本信息设置',
        index: '7-3',
        path: '/informationSet'
      }
    ]
  },
{
 
    title: '消息管理',
    index: '8',
    ico: 'el-icon-bell',
    state:false,
    deter:false,
    list: [{
        name: '系统消息',
        index: '8-1',
        path: '/systemMessage',
        state:false,
      },
      {
        name: '反馈消息',
        index: '8-2',
        path: '/feedbackMessage',
        state:false,
      },
    ]
},
{
    title: '权限管理',
    index: '9',
    ico: 'el-icon-refresh',
    state:false,
    deter:false,
    list: [{
        name: '员工管理',
        index: '9-1',
        path: '/workersManage',
        state:false,
      },
      {
        name: '角色管理',
        index: '9-2',
        path: '/roleManage',
        state:false,
      },
    ]
},
  {
    title: '素材库',
    index: '10',
    ico: 'el-icon-picture-outline',
    path: '/pictureManage',
    list: []
  },
]

function setNav(router, val) {
  for(let i = 0; i < navHead.length; i++) {
    if(router.name == navHead[i].path) {
      if(val && navHead[i].text.length > 2){
        navHead[i].text.splice(2,1)
      }
      if(val && navHead[i].text.length <= 2) {
        navHead[i].text.push(val)
      }
      return navHead[i].text
    }
  }
}

export {
  setNav,
  navHead,
  sideText
}
