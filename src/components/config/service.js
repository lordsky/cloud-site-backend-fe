//请求接口
const API = {
	//登录
	login:'backend/adminLogin',
	/*
	 * 用户信息 
	 */
	userList:'backend/showUserList',
   
	
	
	/*
	 * 组件 component
	 */
	//新增组件
	componentAdd:'backend/component/add',
	//获取组件列表
	componentList:'backend/component/list',
	//获取组件分类列表、查询组件分类
	queryCompon:'backend/findCatByType',
	//新增组件分类
    componentAddClass:'backend/addCat',
    //删除组件分类
    componentDel:'backend/delCat',
    //修改组件分类
    setComponent:'backend/updateCat',
   //删除组件
    delItems:'backend/component/delete',
	//素材
	materialsUpload:'backend/uploadMaterials',
	getMaterials:'backend/getMaterials',
	materialsAllDel:'backend/deleteMaterialsItems',
}

export default API
