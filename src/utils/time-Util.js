import axios from 'axios'
export default{
	// 年月日转yyyy-mm-dd 有bug
	timeParse(dateTime){
		var yyyy = dateTime.slice(0,4)
		var mm = dateTime.slice(6,7)
		var dd = dateTime.slice(8,9)
		return yyyy+"-"+mm+"-"+dd
	},
	// 时间戳转 yyyy-mm-dd hh:mm:ss
	timestampToTime(timestamp,isTime) {
		let date = new Date(timestamp),
			Y = date.getFullYear(),
			M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
			D = date.getDate(),
			h = date.getHours(),
			m = date.getMinutes(),
			s = date.getSeconds()
			if(isTime){
				return Y +"-" +M+"-" + D +" "+ h +":"+ m +":"+ s
			}
		return Y + "-" + M + "-" + D
	},
	// yyyy-mm-dd 转标准时间 
	standardParse(dateTime){
		return new Date(Date.parse(dateTime))
	},
	checkDate(lastDate){
		return axios.get("http://localhost:8081/api.haruhi/tool/e/getWebsiteDatetime").then(({data})=>{
			// 传过来的参数是不带time的标准时间格式，直接转时间戳
			var ld = Date.parse(lastDate)
			/**
			 * 1:时间戳转字符串格式(为了去掉time) 
			 * 2:转标准时间格式(time为00:00:00) 
			 * 2:将没有time的标准时间转时间戳
			 * */
			var nd = Date.parse(this.standardParse(this.timestampToTime(data.data,false)))
			// console.log("ld",ld)
			// console.log("nd",nd)
			return {flag:ld==nd}
		})
	}
}
