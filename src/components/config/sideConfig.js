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
    path: 'pictureManage',
    index: '4',
    text: ['素材库']
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
    path: 'activeConfiguration',
    index: '5-2',
    text: ['活动管理','活动配置']
  }
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
    ico: 'el-icon-setting',
    path: '/siteManage',
    list: []
},
  {
    title: '素材库',
    index: '4',
    ico: 'el-icon-picture-outline',
    path: '/pictureManage',
    list: []
  },
//{
//  title: '活动管理',
//  index: '5',
//  ico: 'el-icon-menu',
//  // path: '/banner',
//  list: [
//    {
//      name: 'banner管理',
//      index: '5-1',
//      path: '/banner'
//    },
//    {
//      name: '活动配置',
//      index: '5-2',
//      path: '/activeConfiguration'
//    }
//  ]
//},
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
