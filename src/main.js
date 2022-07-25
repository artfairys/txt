import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/fontawesome'
// import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
//import axios from 'axios'
import fetch from './utils/fetch'
import tutil from './utils/time-Util'

import VueLocalStorage from 'vue-localstorage'
import $ from 'jquery'
import qs from 'qs'
// 导入富文本框
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


import particles from 'particles.js'
import API from '@/utils/APIUtil'
import AAPI from '@/utils/AdminAPIUtil'
import staConst from '@/utils/StaticConstant'
// 全局组件
import Bottom from './components/Bottom.vue'
import Upload from './components/Upload.vue'
import RightMenu from './components/RightMenu.vue'

// 局部视图
// import AccountIndex from './views/part/AccountIndex.vue'
import WelcomePage from './views/part/welcome_page.vue'
import MyPlaylist from './views/part/MyPlaylist.vue'
import EditNote from './views/part/EditNote.vue'
import EditUser from './views/part/EditUser.vue'
import MyHikotoko from './views/part/MyHikotoko.vue'
import ShowNote from './views/part/ShowNote.vue' // 由于富文本框里的class外部无效，所以...
import MyNote from './views/part/MyNote.vue'
import DefaultFaces from './views/part/DefaultFaces.vue'

import ChatRoom from './views/part/chat-room.vue'
Vue.config.productionTip = false

//全局变量ncget

const extend = Vue.prototype
extend.qs = qs
extend.API = API
extend.AAPI = AAPI
extend.$post = fetch.post
extend.$get = fetch.get
extend.$bget = fetch.bget
extend.$form = fetch.form

extend.$apost = fetch.apost
extend.$aget = fetch.aget

extend.timeParse = tutil.timeParse
extend.timestampToTime = tutil.timestampToTime
extend.standardParse = tutil.standardParse
extend.checkDate = tutil.checkDate
extend.STATICC = staConst


Vue.prototype.Vuepro = Vue.prototype

// fetch.post(API.API_USER_TOKEN_VERIFY).then(res => {
// 	if (res.code == 0) {
// 		console.log("main", res)

// 		Vue.prototype.appUser = res.user
// 		//console.log(Vue.prototype)
// 	}
// 	Vue.prototype.appUser = res.user
// })


//全局使用
Vue.use(VueLocalStorage)
Vue.use(particles)
Vue.use(VueQuillEditor)

//注册全局组件
Vue.component('Bottom', Bottom);
Vue.component('Upload', Upload);
Vue.component('RightMenu', RightMenu);

// Vue.component('AccountIndex', AccountIndex);

Vue.component('WelcomePage', WelcomePage);
Vue.component('MyPlaylist', MyPlaylist);
Vue.component('EditNote', EditNote);
Vue.component('EditUser', EditUser);
Vue.component('MyHikotoko', MyHikotoko);
Vue.component('ShowNote', ShowNote);
Vue.component('MyNote', MyNote);
Vue.component('DefaultFaces', DefaultFaces);
Vue.component('ChatRoom', ChatRoom);

//监听localStorage
// Vue.prototype.monitorSetItem = function (key, newVal) {
//   //这个key就是我们要监听的那个key
//     if (key === 'user_key') {
//         // 创建一个StorageEvent事件
//         var newStorageEvent = document.createEvent('StorageEvent');
//         const storage = {
//             setItem: function (k, val) {
//                 //这里可以灵活更改local和session
//                 //localStorage.setItem(k, val);
// 				//alert(1)
// 				this.$localStorage.set(k, val);
//                 // 初始化创建的事件
//                 newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
//                 // 派发对象
//                 window.dispatchEvent(newStorageEvent)
//             }
//         }
//         return storage.setItem(key, newVal);
//     }
// }


//路由拦截
router.beforeEach(function(to, from, next) {

	if (to.meta.title) {
	    document.title = to.meta.title
	  }
	//alert(1)
	fetch.post(API.API_USER_TOKEN_VERIFY).then(res => {
		if (res.code == 0) {
			//console.log("main", res)
			localStorage.setItem('user',JSON.stringify(res.user))
			localStorage.setItem("user_key",res.user.id)
			Vue.prototype.appUser = res.user
			//console.log("main",Vue.prototype.appUser)
			return 
			//console.log(Vue.prototype)
		}
		//Vue.prototype.appUser = null
	})
	var token = localStorage.getItem('token'); //获取token

	if (to.path.indexOf('/account') != -1) {

		fetch.post(API.API_USER_TOKEN_VERIFY).then(res => {
			if (res.code < 0) {
				// 还未登录或者token过期
				router.replace({
					path: '/login',
					name: 'Login'
				})
				if (token != null) {
					localStorage.removeItem('token');
				}
			}
		})
	} else {
		if (to.path.indexOf('/login') != -1 ||
			to.path.indexOf('/register') != -1) {
			fetch.post(API.API_USER_TOKEN_VERIFY).then(res => {
				// 已经登录过了
				if (res.code >= 0) {
					router.replace({
						path: '/',
						name: 'Home'
					})
				}
			})
		}
	}
	// 若进入manage下的路径，判断有没有admin token
	// 没有则跳转首页
	if(to.path.indexOf('/manage') != -1){
		let at = localStorage.getItem("A_T")
		if(!at){
			// replace 替换当前路由
			router.replace({
				path: '/',
				name: 'Home'
			})
		}
	}
	if(to.path.indexOf('/admin') != -1){
		let at = localStorage.getItem("A_T")
		if(at){
			// replace 替换当前路由
			router.replace({
				path: '/manage',
				name: 'Manage'
			})
		}
	}
	// 最后要放行路由
	next(true)
})



new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
