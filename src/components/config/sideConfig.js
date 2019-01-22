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
    path: 'cmsUser',
    index: '1-2',
    text: ['cms管理']
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
    path: 'siteManage',
    index: '3',
    text: ['站点管理']
  },
]
//侧边栏信息
const sideText = [{
    title: '用户管理',
    index: '1',
    ico: 'el-icon-tickets',
    list: [{
        name: '个人资料',
        index: '1-1',
        path: '/userData'
      },
      {
        name: 'cms用户信息',
        index: '1-2',
        path: '/cmsUser'
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
        name: '全部模板',
        index: '2-2',
        path: ''
      },
      {
        name: '套件管理',
        index: '2-3',
        path: ''
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
]

function setNav(router, val) {
  for(var i = 0; i < navHead.length; i++) {
    if(router.name == navHead[i].path) {
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