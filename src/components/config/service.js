//请求接口
const API = {
	//登录
	login:'backend/adminLogin',
	//验证码
	code:'backend/sendVerifyCode',
	/*
	 *   用户信息 
	 */
	//显示用户列表
	userList:'backend/showUserList',
	//禁用用户
    userDisable:'backend/refuseLogin',
    //重置密码
    resetUserPassword:'backend/ResetPwd',
    //用户详情
    userDetails:'backend/showUserDetail',
    //站点停用
    siteDetails:'backend/stopUserTemplate',
    /**
     *   权限管理
     */
    //添加角色
    addRole:'backend/addRole',
    //取消授权
    cancelAuthorization:'backend/delRoleMenu',
    //编辑角色
    editRole:'backend/editRole',
    //查找角色
    findRole:'backend/findRole',
    //设置菜单
    menuList:'backend/setRoleMenu',
    //获取菜单
    showMenu:'backend/showAllMenus',
	/*
	 *   组件 
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
    /*
     *   素材
     * */
	//上传素材
	materialsUpload:'backend/uploadMaterials',
	//获取素材列表
	getMaterials:'backend/getMaterials',
	//删除素材
	materialsAllDel:'backend/deleteMaterialsItems',
	/*
	 * 消息管理
	 * */
	//反馈消息
	getFeedback:'backend/feedbackList'
    

	
}

export default API
