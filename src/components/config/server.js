
import http from './http2'

// login
const apiLogin = (data) => {
	return new Promise((resolve, reject)=>{
		http.post('/login',data).then((res)=> {
			resolve(res.data)
		}).catch(err => {
			reject(err)
		})
	})
}


// register
const apiRegister = (data) => {
	return new Promise((resolve, reject)=>{
		http.post('/register',data).then((res)=> {
			resolve(res.data)
		}).catch(err => {
			reject(err)
		})
	})
}

//添加分类
const apiAddCat = (data) => {
  return new Promise((resolve, reject)=>{
    http.post('/addCat',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询分类
const apiCatType = (data) => {
  return new Promise((resolve, reject)=>{
    http.get(`/findCatByType?catType=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询模板套件
const apiTemplateList= (data) => {
  return new Promise((resolve, reject)=>{
    http.get(`/template/list?catId=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询模板
const apiPageList= (data) => {
  return new Promise((resolve, reject)=>{
    http.get(`/page/list?catId=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//添加模板
const apiAddPage = (data) => {
  return new Promise((resolve, reject)=>{
    http.post('/page/add',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//添加模板(新增套件)
const apiAddTemplate = (data) => {
  return new Promise((resolve, reject)=>{
    http.post('/template/add',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//添加模板组件
const apiAddTemplateComponent = (data) => {
  return new Promise((resolve, reject)=>{
    http.post('/template/component/add',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//添加模板页面（新增套件页面)
const apiAddTemplatePage = (data) => {
  return new Promise((resolve, reject)=>{
    http.post('/template/page/add',data).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询模板组件
const apiTemplateComponentList= (data) => {
  return new Promise((resolve, reject)=>{
    http.get(`/template/component/list?templateId=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询模板页面（查看模板页面)
const apiTemplatePageList= (data) => {
  return new Promise((resolve, reject)=>{
    http.get(`/template/page/list?templateId=${data}`).then((res)=> {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询组件（查看组件页面)
const apiComponentList= (data) => {
  return new Promise((resolve, reject)=>{
    http.get(`/component/list?catId=${data}`).then((res)=> {
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
  apiComponentList
}
