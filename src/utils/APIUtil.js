/**
 * /e 为不会被token拦截器验证的api
 * 120.24.224.57:8080
 *  localhost
 * 上线环境在端口后加 "/h" war包名是h.war
 * */ 
var local = "localhost:8080"
var uploadURL = 'http://localhost:8080'
//部署tomcat一定要加 /h
var serverBase=uploadURL+'/h'
	local += '/h'
var baseAPI = serverBase+'/api'
export default {
	UPLOADURL:uploadURL,
	SERVERLOCAL:local,
	SERVERBASE :serverBase,
	/* 根据uid获取用户对象 */
    API_USER_FINDBYUID:baseAPI+"/user/a/find",
	/* token验证用户 */
	API_USER_TOKEN_VERIFY:baseAPI+"/user/a/verify",
	// 登录
	API_LOGIN:baseAPI+"/e/login",
	// 注册（添加用户）
	API_USER_INSERT:baseAPI+"/user/e/insert",
	// 修改用户（不修改密码）
	API_USER_UPDATE:baseAPI+"/user/a/update",
	// 验证用户密码
	API_USER_CHECK_PSWD:baseAPI+"/user/a/checkpswd",
	// 修改用户密码
	API_USER_UPDATE_PSWD:baseAPI+"/user/a/update-pswd",
	// 修改头像
	API_USER_UPDATE_FACE:baseAPI+"/user/a/update/face",
	// 分页获取留言
	API_MSG_LIMIT:baseAPI+"/msg/e/limit",
	// 所有留言 回复
	API_MSG_ALL:baseAPI+"/msg/e/all",
	// 添加留言
	API_MSG_INSERT:baseAPI+"/msg/e/insert",
	// 回复
	API_MSG_REPLY:baseAPI+"/msg/e/reply",
	// 获取音乐平台
	API_MUSIC_ALL_SERVER:baseAPI+"/music/a/all-server",
	// 搜索歌单
	API_MUSIC_SEARCH_PLAYLIST:baseAPI+"/music/a/search-playlist",
	// 所有网址歌单（一对多 根据平台id）
	API_MUSIC_ALL_PLAYLIST:baseAPI+"/music/a/all-playlist_bysid",
	// 根据pid找到用户歌单
	API_MUSIC_U_FIND:baseAPI+"/music/a/find",
	// 仅修改user歌单备注
	API_MUSIC_U_UPDATE_PLEXP:baseAPI+"/music/a/update-upl-exp",
	// 修改user歌单id和备注
	API_MUSIC_U_UPDATE_UPL:baseAPI+"/music/a/update-upl",
	// 获取用户歌单
	API_MUSIC_FIND_PL_BYU:baseAPI+"/music/a/find-playlistbyu",
	// 删除用户某平台全部歌单
	API_MUSIC_DEL_BYUIDANDSID:baseAPI+"/music/a/delupl-byuidasid",
	// 删除用户单个歌单
	API_MUSIC_DEL_BYPLID:baseAPI+"/music/a/delupl-byid",
	// 获取用户没有歌单的平台
	API_MUSIC_FIND_SERVERNOTIN:baseAPI+"/music/a/find-msevernotin",
	// 用户添加歌单保存(添加平台同一api)
	API_MUSIC_UPLST_INSERT:baseAPI+"/music/a/add-playlist",
	// 多文件上传
	API_FILE_UPLOAD_V1:baseAPI+"/file/a/upload/v1",
	// 单壁纸上传 用户用
	API_WALLPAPER_UPLOAD:baseAPI+"/wall/a/upload",
	// 获取用户一言
	API_HITOKO_QUERY:baseAPI+"/hitoko/a/query",
	// 添加一言
	API_HITOKO_INSERT:baseAPI+"/hitoko/a/insert",
	// 修改一言
	API_HITOKO_UPDATE:baseAPI+"/hitoko/a/update",
	// 检查 修改 hitoko 判断预备修改 一言 是否是今天修改的
	API_HITOKO_CHECKDATEEQUALSNOW:baseAPI+"/hitoko/a/checkdate",
	// 获取北京标准时间
	API_TOOL_GETWEBDATETIME:baseAPI+"/tool/e/getWebsiteDatetime",
	// 根据uid查询笔记 不需要内容
	API_NOTE_FINDBUUIDNOCONTENT:baseAPI+"/note/a/query/nocontent",
	// 根据uid查询笔记 完整
	API_NOTE_FINDBUUID:baseAPI+"/note/a/query",
	// 根据id查询note
	API_NOTE_FINDONEBUID:baseAPI+"/note/a/query/one",
	// 修改note
	API_NOTE_UPDATE:baseAPI+"/note/a/update",
	// 删除 note
	API_NOTE_DELETE:baseAPI+"/note/a/delete",
	// 添加 note
	API_NOTE_ADD:baseAPI+"/note/a/add",
	// 获取导航地址
	API_ADDRESS_ALL_TYPE:baseAPI+"/address/e/all-bytype",
	// 获取导航地址 V2 取消返回一些字段 (属性还在，只是值为null)
	API_ADDRESS_ALL_TYPE_V2:baseAPI+"/address/e/all-bytype/v2",
	//  6条动漫卡片
	API_OTHER_ANIMECARD_LIST:baseAPI+"/other/a/animecard/list",
	// 所有默认头像 
	API_DEFAULRFACE_LIST:baseAPI+"/defaultface/a/list",
	// 获取所有壁纸
	API_WALLPAPER_LIST:baseAPI+"/wall/e/list",
	// 搜索接口
	API_GET_SEARCH:baseAPI+"/start/e/tips",
	// 搜索页导航 获取用户
	API_GET_START_NAV:baseAPI +"/start/e/navs",
	// 获取默认nav
	API_GET_START_NAV_DEF:baseAPI+"/start/e/navs/default",
	// 修改 根据用户和时间
	API_POST_NAV_UPDATE:baseAPI+"/start/e/navs/update",
	// 添加快捷
	API_POST_NAV_ADD:baseAPI+"/start/e/navs/add",
	// 删除快捷
	API_POST_NAV_DEL:baseAPI+"/start/e/navs/del",
	// 获取用户便签
	API_GET_GET_NOTES:baseAPI+"/start/e/note",
	// 添加便签
	API_POST_ADDNOTE:baseAPI+"/start/e/note/add",
	// 改变便签 修改或者添加
	API_POST_NOTE_CHANGE:baseAPI+"/start/e/note/change",
	// 删除
	API_POST_NOTE_DEL:baseAPI+"/start/e/note/del"
}
