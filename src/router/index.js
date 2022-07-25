import Vue from 'vue'
import VueRouter from 'vue-router'
// 无需拦截（viwes根目录下）
import Home from '../views/Home.vue'
import Nav from '../views/Navigation.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Msgboard from '../views/Msg_board.vue'
import AdminLogin from '../views/AdminLogin.vue'
import Manage from '../components/ManageNavMenu.vue'
import Wallpapers from "../views/Wallpapers.vue"
import WallpapersWish from "../views/WallpaperWish.vue"
import Search from "../views/Search.vue"

// 需要登录拦截(views/account 下的)
import User from '../views/account/User.vue'


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = []

const router = new VueRouter({
	// mode:'history',
	routes: [{
			path: '/',
			name: 'Home',
			component: Home,
			meta: {
				title: 'haruhi 首页'
			}
		},
		{
			path: '/nav',
			name: 'Nav',
			component: Nav,
			meta: {
				title: 'haruhi 导航'
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				title: 'haruhi 登录'
			}
		},
		{
			path: '/register',
			name: 'Register',
			component: Register,
			meta: {
				title: 'haruhi 注册'
			}
		},
		{
			path: '/msgboard',
			name: 'Msgboard',
			component: Msgboard,
			meta: {
				title: 'haruhi 留言'
			}
		},{
			path: '/wallpaper',
			name: 'Wallpapers',
			component: Wallpapers,
			meta: {
				title: 'haruhi 壁纸'
			}
		},{
			path: '/wallpaper/wish',
			name: 'WallpapersWish',
			component: WallpapersWish,
			meta: {
				title: 'haruhi 我的喜欢'
			}
		},{
			path: '/account/user',
			name: 'User',
			component: User,
			meta: {
				title: JSON.parse(localStorage.getItem("user")) != null ? JSON.parse(localStorage.getItem("user")).nickName : 'user'
			}
		},
		{
			path:'/admin',
			name:'AdminLogin',
			component:AdminLogin
		},{
			path:'/start',
			name:'Search',
			component:Search,
			meta: {
				title: 'haruhi 起始页'
			}
		},{
			path:'/manage',
			name:'Manage',
			redirect:'/manage/users',
			component:Manage,
			meta: {
				title: 'haruhi 管理'
			},
			children:[
				{
					path:'/manage/users',
					name:'manageUsers',
					component:()=>import('../views/manage/Users.vue'),
					meta: {
						title: 'haruhi 用户管理'
					}
				},{
					path:'/manage/nav',
					name:'manageNavs',
					component:()=>import('../views/manage/Nav.vue'),
					meta: {
						title: 'haruhi 导航管理'
					}
				},{
					path:'/manage/navtype',
					name:'NavType',
					component:()=>import('../views/manage/NavType.vue'),
					meta: {
						title: 'haruhi 导航类型管理'
					}
				},{
					path:'/manage/msg',
					name:'MessageManage',
					component:()=>import('../views/manage/Message.vue'),
					meta: {
						title: 'haruhi 留言管理'
					}
				},{
					path:'/manage/defaultface',
					name:'DefaultFace',
					component:()=>import('../views/manage/DefaultFace.vue'),
					meta: {
						title: 'haruhi 默认头像管理'
					}
				},{
					path:'/manage/autoYiBanRemindPunch',
					name:'YiBanRemindPunch',
					component:()=>import('../views/manage/YiBanRemindPunch.vue'),
					meta: {
						title: 'haruhi 易班打卡自动提醒管理'
					}
				},{
					path:'/manage/wallpaper/upload',
					name:'WallUpload',
					component:()=>import('../views/manage/WallUpload.vue'),
					meta: {
						title: 'haruhi 上传壁纸'
					}
				},{
					path:'/manage/wallpaper',
					name:'Wallpaper',
					component:()=>import('../views/manage/WallpaperManage.vue'),
					meta: {
						title: 'haruhi 壁纸管理'
					}
				}]
		}
	]
	//,4294967295 
	
})

export default router
