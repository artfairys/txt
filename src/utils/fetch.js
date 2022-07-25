import axios from 'axios'
import {Message} from 'element-ui'
//携带cookie
//axios.defaults.withCredentials = true

// respone拦截器
axios.interceptors.response.use(response => {
	return response
}, error => {
	var p = window.location.href
	if(p.indexOf("start") == -1){
		Message.error("发生错误！")
	}
	return error
})
//这是7月9号的第一条测试数据。

/**
 * ncget() 
 * 
 * */
export default {
	post(url, data) {
		return axios({
			method: 'post',
			url,
			// data: qs.stringify(data),
			data,
			withCredentials: true, //开启携带cookie
			timeout: 15000,
			headers: {
				"token": localStorage.getItem("token")
			}
		}).then(
			({
				data
			}) => {
				return data
			}
		).catch(
			(res) => {
				return res
			}
		)
	},
	get(url, params) {
		return axios({
			method: 'get',
			// baseURL: process.env.BASE_API,
			url,
			params, // get 请求时带的参数
			withCredentials: true,
			timeout: 15000,
			headers: {
				"token": localStorage.getItem("token")
			}
		}).then(
			({
				data
			}) => {
				return data
			}
		).then(
			(res) => {
				return res
			}
		)
	},
	//axios最基本get请求,请求头不懈怠任何其他值,请求成功回调函数返回整个请求的信息(包括请求头，响应头，请求body，状态，控制器返回的data)
	bget(url, params) {
		return axios({
			method: 'get',
			// baseURL: process.env.BASE_API,
			url,
			params // get 请求时带的参数
			// timeout: 15000,
		}).then(
			({data}) => {
				return data
			}
		).then(
			(res) => {
				return res
			}
		)
	},
	apost(url, data) {
		return axios({
			method: 'post',
			url,
			// data: qs.stringify(data),
			data,
			withCredentials: true, //开启携带cookie
			timeout: 15000,
			headers: {
				"at": localStorage.getItem("A_T")
			}
		}).then(
			({
				data
			}) => {
				return data
			}
		).catch(
			(res) => {
				return res
			}
		)
	},
	aget(url, params) {
		return axios({
			method: 'get',
			// baseURL: process.env.BASE_API,
			url,
			params, // get 请求时带的参数
			withCredentials: true,
			timeout: 15000,
			headers: {
				"at": localStorage.getItem("A_T")
			}
		}).then(
			({
				data
			}) => {
				return data
			}
		).then(
			(res) => {
				return res
			}
		)
	},
	upload(url, data) {
		let form = new FormData()
		Object.keys(data).forEach(value => {
			form.append(value, data[value])
		})
		return axios({
			method: 'post',
			// baseURL: process.env.BASE_API,
			url,
			data,
			transformRequest: [function(data) {
				let ret = ''
				for (let it in data) {
					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}],
			timeout: 15000,
			headers: {
				// 'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(
			(response) => {
				return response
			}
		).then(
			(res) => {
				return res
			}
		)
	},

	put(url, data) {
		return axios({
			method: 'put',
			baseURL: process.env.BASE_API,
			url,
			data,
			timeout: 15000
		}).then(
			(response) => {
				return response
			}
		).then(
			(res) => {
				return res
			}
		)
	},
	time(tamp) {
		return tamp
	}
}
