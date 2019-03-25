
import {instance} from './http'

// login
const apiLogin = (data) => {
	return new Promise((resolve, reject)=>{
		instance.post('/login',data).then((res)=> {
			resolve(res.data)
		}).catch(err => {
			reject(err)
		})
	})
}


// register
const apiRegister = (data) => {
	return new Promise((resolve, reject)=>{
		instance.post('/register',data).then((res)=> {
			resolve(res.data)
		}).catch(err => {
			reject(err)
		})
	})
}

//添加分类
const apiAddCat = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post('backend/addCat',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询分类列表（只传catType的时候用这个)
const apiByCatType = (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/findCatByTypeNoPage?catType=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询分类列表（查询所有分类 不分页)
const apiBySizeCatType = (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/findCatByType?catType=${data.catType}&pageSize=${data.pageSize}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询分类
const apiCatType = (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/findCatByType?catType=${data.catType}&catName=${data.catName}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&startDate=${data.startDate}&endDate=${data.endDate}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询模板套件
const apiTemplateList= (data) => {
  return new Promise((resolve, reject)=>{
    instance.post('backend/template/list',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询模板
const apiPageList= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/page/list?catId=${data.catId}&name=${data.name}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//添加模板
const apiAddPage = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post('backend/page/add',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//添加模板(新增套件)
const apiAddTemplate = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post('backend/template/add',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//添加模板组件
const apiAddTemplateComponent = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post('backend/template/component/add',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//添加模板页面（新增套件页面)
const apiAddTemplatePage = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post('backend/template/page/add',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询模板组件
const apiTemplateComponentList= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/template/component/list?templateId=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询模板页面（查看模板页面)
const apiTemplatePageList= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/template/page/list?templateId=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询组件（查看组件页面)
const apiComponentList= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/component/list?catId=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询组件（查看组件页面)通过catName
const apiComponentByName= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/component/byName?catName=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除模板页面
const apiDelTemplatePage= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/template/page/delete?id=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除页面模板
const apiDelPage= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/page/delete?id=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除套件模板
const apiDelTemplate= (data) => {
  return new Promise((resolve, reject)=>{
    instance.delete(`backend/template/delete?id=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//编辑模板页面
const apiUpdateTemplatePage = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post('backend/template/page/update',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//编辑模板套件
const apiUpdateTemplateComponent = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post('backend/template/component/update',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//编辑页面模板
const apiUpdatePage = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post('backend/page/update',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//编辑组件页面套件分类
const apiUpdateCat = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post('backend/updateCat',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//页面套件上下线
const apiOnlineOperate = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post('backend/template/onlineOperate',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//修改套件模板
const apiUpdateTemplate = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post('backend/template/update',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询案例分类
const apiSelectCaseCat= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/caseCat/select?id=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//案例列表
const apiCaseList= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/case/caseList?caseCatsId=${data.caseCatsId}&name=${data.name}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&startTime=${data.startDate}&endTime=${data.endDate}&state=${data.state}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//新增/修改案例分类
const apiAddCaseType = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post('backend/caseCat/addCase',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//新增/修改案例
const apiAddCase = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post('backend/case/editCase',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除案例分类
const apiDelCaseType= (data) => {
  return new Promise((resolve, reject)=>{
    instance.delete(`backend/caseCat/delCase?id=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除案例
const apiDelCase= (data) => {
  return new Promise((resolve, reject)=>{
    instance.post(`backend/case/delCase`,data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询案例通过id
const apiSelectCaseCatById= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/case/select?id=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//案例上线/下线操作
const apiCaseOnlineOperate = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post(`backend/case/onlineOperate?id=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//新增/修改banner
const apiAddBanner = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post(`backend/addBanner`,data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//上线/下线banner
const apiBannerOnlineOperate = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post(`backend/banOnlineOperate`,data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//banner列表
const apiBannerList= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/bannerList?pageNum=${data.pageNum}&pageSize=${data.pageSize}&positionId=${data.positionId}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除banner
const apiDelBanner= (data) => {
  return new Promise((resolve, reject)=>{
    instance.post(`backend/delBanner`,data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//活动列表
const apiActiveList= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/activityList?name=${data.name}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&startTime=${data.startDate}&endTime=${data.endDate}&status=${data.status}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查看活动详情
const apiActivityDetails= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/activityDetails?id=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//上线/下线活动
const apiActiveOnlineOperate = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post(`backend/actOnlineOperate?id=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//新增/修改活动
const apiAddActive = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post(`backend/addActivity`,data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除活动
const apiDelActive= (data) => {
  return new Promise((resolve, reject)=>{
    instance.post(`backend/delActivity`,data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//获取素材库图片/视频
const apiMaterials= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/getMaterials?materialsType=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//获取教程分类列表
const apiCatList= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/catList`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//新增/修改教程分类
const apiAddCatType = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post(`backend/editCat`,data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除教程分类
const apiDelCatType= (data) => {
  return new Promise((resolve, reject)=>{
    instance.post(`backend/delCourseCat?id=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查看教程
const apiCourseDetails= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/courseDetails?id=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//新增/修改教程
const apiAddCourse = (data) => {
  return new Promise((resolve, reject)=>{
    instance.post(`backend/editCourse`,data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查看活动列表无分页上线
const apiActivityListNoPage= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/activityListNoPage`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除教程
const apiDelCourse= (data) => {
  return new Promise((resolve, reject)=>{
    instance.post(`backend/delCourse`,data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//教程列表
const apiCourseList= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/courseList?catId=${data.catId}&title=${data.title}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&startTime=${data.startDate}&endTime=${data.endDate}&onlineStatus=${data.state}&type=${data.type}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//上线/下线教程
const apiCourseOnlineOperate = (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/courseOnlineOperate?id=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//系统日志列表
const apiListSystemLog= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/listSystemLog?ipAddress=${data.ipAddress}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&startTime=${data.startDate}&endTime=${data.endDate}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//平台信息列表
const apiListSystemInfo = (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/listSystemInfo?type=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//平台信息删除
const apiDelSystemInfo= (data) => {
  return new Promise((resolve, reject)=>{
    instance.post(`backend/delSystemInfo`,data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//添加/修改平台信息
const apiEditSystemInfo= (data) => {
  return new Promise((resolve, reject)=>{
    instance.post(`backend/editSystemInfo?id=${data.id}&name=${data.name}&type=${data.type}&url=${data.url}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//导航信息状态改变
const apiNavigationStatus = (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/navigationStatus?id=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default {
  apiAddCat,
  apiCatType,
  apiTemplateList,
  apiAddTemplate,
  apiAddTemplateComponent,
  apiAddTemplatePage,
  apiTemplateComponentList,
  apiTemplatePageList,
  apiPageList,
  apiAddPage,
  apiComponentList,
  apiComponentByName,
  apiDelTemplatePage,
  apiUpdateTemplatePage,
  apiUpdateTemplateComponent,
  apiUpdatePage,
  apiUpdateCat,
  apiDelPage,
  apiByCatType,
  apiOnlineOperate,
  apiUpdateTemplate,
  apiDelTemplate,
  apiBySizeCatType,
  apiSelectCaseCat,
  apiCaseList,
  apiAddCaseType,
  apiAddCase,
  apiDelCaseType,
  apiSelectCaseCatById,
  apiDelCase,
  apiCaseOnlineOperate,
  apiAddBanner,
  apiBannerOnlineOperate,
  apiBannerList,
  apiActiveList,
  apiActivityDetails,
  apiActiveOnlineOperate,
  apiAddActive,
  apiDelActive,
  apiMaterials,
  apiCatList,
  apiAddCatType,
  apiCourseDetails,
  apiAddCourse,
  apiDelCourse,
  apiActivityListNoPage,
  apiDelBanner,
  apiDelCatType,
  apiCourseList,
  apiCourseOnlineOperate,
  apiListSystemLog,
  apiListSystemInfo,
  apiDelSystemInfo,
  apiEditSystemInfo,
  apiNavigationStatus
}
