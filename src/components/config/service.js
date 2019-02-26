//请求接口
const API = {
	//登录
	login:'backend/adminLogin',
	//组件
	componentAdd:'backend/component/add',
	componentList:'backend/component/list',
	queryCompon:'backend/findCatByType',
    componentAddClass:'backend/addCat',
    componentDel:'backend/delCat/',
	//素材
	materialsUpload:'backend/uploadMaterials',
	getMaterials:'backend/getMaterials',
	materialsAllDel:'backend/deleteMaterialsItems',
}

export default API
