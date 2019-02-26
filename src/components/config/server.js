
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

//查询分类
const apiCatType = (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/findCatByType?catType=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询模板套件
const apiTemplateList= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/template/list?catId=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询模板
const apiPageList= (data) => {
  return new Promise((resolve, reject)=>{
    instance.get(`backend/page/list?catId=${data}`).then((res)=> {
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
  apiUpdateTemplatePage
}
