// /x 不会被拦截
var serverBase='http://localhost:8080/h'
var baseAPI = serverBase+'/api/admin'
export default{
	// 登录
	API_ADMIN_LOGIN:baseAPI+"/x/login",
	// 所有地址类型
	API_ADMIN_ADDRESSTYPE_LIST:baseAPI+"/address/y/type/list",
	// 所有地址
	API_ADMIN_ADDRESS_LIST:baseAPI+"/address/y/list",
	// 修改地址状态
	API_ADMIN_ADDRESS_UPDATE_STATE:baseAPI+"/address/y/update/state",
	// 添加地址
	API_ADMIN_ADDRESS_INSERT:baseAPI+"/address/y/insert",
	// 根据id查找地址
	API_ADMIN_ADDRESS_ONE:baseAPI+"/address/y/one",
	// 修改地址
	API_ADMIN_ADDRESS_UPDATE_ALL:baseAPI+"/address/y/update/all",
	// 删除地址
	API_ADMIN_ADDRESS_DELETE:baseAPI+"/address/y/delete",
	// 查询地址类型 或者所有
	API_ADMIN_ADDRESSTYPE_FINDLIST:baseAPI+"/address/y/type/list/by",
	// 添加地址类型
	API_ADMIN_ADDRESSTYPE_INSERT:baseAPI+"/address/y/type/insert",
	// 修改地址类型颜色
	API_ADMIN_ADDRESSTYPE_UPDATE_COLOE:baseAPI+"/address/y/type/update/color",
	// 删除地址类型
	API_ADMIN_ADDRESSTYPE_DELETE:baseAPI+"/address/y/type/delete",
	// 修改地址类型
	API_ADMIM_ADDRESSTYPE_UPDATE:baseAPI+"/address/y/type/update",
	// 根据tid查询地址类型
	API_ADMIN_ADDRESSTYPE_ONE:baseAPI+"/address/y/type/one",
	// 所有用户，没有密码
	API_ADMIN_USER_LIST:baseAPI+"/user/y/list",
	// 所有留言
	API_ADMIN_MESSAGE_LIST:baseAPI+"/message/y/list",
	// 删除留言
	API_ADMIN_MESSAGE_REMOVE:baseAPI+"/message/y/remove",
	// 条件查询默认头像
	API_ADMIN_DEFAULTFACE_LIST:baseAPI+"/dface/y/list",
	// 添加默认头像
	API_ADMIN_DEFAULTFACE_INSERT:baseAPI+"/dface/y/insert",
	// 根据id查询默认头像 RESTful
	API_ADMIN_DEFAULTFACE_ONE:baseAPI+"/dface/y/one",
	// 修改
	API_ADMIN_DEFAULTFACE_UPDATE:baseAPI+"/dface/y/update",
	// 删除
	API_ADMIN_DEFAULTFACE_REMOVE:baseAPI+"/dface/y/remove",
	// 获取自动发送邮箱详情
	API_ADMNI_YIBAN_EMAILDETAILS:baseAPI+"/yb/y/email-etails",
	// 获取/查询易班提醒用户
	API_ADMIN_YIBAN_QUERYUSER:baseAPI+"/yb/y/user-list",
	// 修改发送邮箱详情
	API_ADMIN_YIBAN_UPDATEEMAILDETAILS:baseAPI+"/yb/y/update-emailDetails",
	// 添加易班用户
	API_ADMIN_YIBAN_ADDUSER:baseAPI+"/yb/y/add-ybuser",
	// 修改易班用户
	API_ADMIN_YIBAN_UPDATEUSER:baseAPI+"/yb/y/update-ybuser",
	// 删除易班用户
	API_ADMIN_YIBAN_REMOVEUSER:baseAPI+"/yb/y/remove-ybuser",
	// 根据id查找。。full
	API_ADMIN_YIBAN_FINDBYID:baseAPI+"/yb/y/user",
	// 上传壁纸
	API_ADMIN_PALLPAPER_UPLOAD:baseAPI+"/wallpaper/y/upload",
	// 条件获取壁纸 以及分页
	API_ADMIN_WALLPAPER_LIST:baseAPI+"/wallpaper/y/list",
	// 更新 根据id
	API_ADMIN_WALLPAPER_UPDATE:baseAPI+"/wallpaper/y/update",
	// 删除 根据id
	API_ADMIN_WALLPAPER_DELETE:baseAPI+"/wallpaper/y/del",
	// 批量删除 ids
	API_ADMIN_WALLPAPER_DELETE_BATCH:baseAPI+"/wallpaper/y/batchDel",
	//批量审核/下架 
	API_ADMIN_WALLPAPER_UPDATE_ENABLE_BATCH:baseAPI+"/wallpaper/y/batchUpdate/enabled",
	//
	API_ADMIN_WALLPAPER_GROUPBYMD5:baseAPI+"/wallpaper/y/groupByMD5",
	
}