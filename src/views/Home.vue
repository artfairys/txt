<template>
	<div id="haruhihome">
		<div class="cover" >
			<div class="navbar-wrapper" >
				<div class="container" id="navcontainer">
					<nav class="navbar navbar-inverse navbar-fixed-top " role="navigation" >
						<div class="container">
							<div href="#" class="navbar-brand">
								<img v-if="user.face" class="img-thumbnail img-responsive img-circle img-rounded"
									:src="user.face">
								<img v-else class="img-thumbnail img-responsive img-circle img-rounded"
									:src="STATICC.DEFAULT_FACE">
								<span class="font-change">Suzumiya Haruhi</span>
							</div>
							<ul v-if="user && token && user.id" class="sub-menu">
								<li class="pull-right">
									<!-- <a @click="goto('/login','Login')">登录</a> -->
									<router-link :to="{path:'/account/user'}" class="font-change-login">{{user.nickName}}</router-link>
								</li>
							</ul>
							<ul v-else class="sub-menu">
								<li class="pull-right">
									<!-- <a @click="goto('/login','Login')">登录</a> -->
									<router-link :to="{path:'/login'}" class="font-change-login">登录</router-link>
								</li>
								<li class="pull-right">
									<router-link :to="{path:'/register'}" class="font-change-login">注册</router-link>
								</li>
								
							</ul>
						</div>
					</nav>

				</div>
			</div>
			<div  id="container">
				<div class="container">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
						<div class="container-fluid hito-h2" >
							<h2 class="text-center ">
								<span class="float-left">『</span>
								<span class="span-hitok" >{{hitokototext.hitokoto}}</span>
								<span class="float-right">』</span>
					
							</h2>
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-right hiko-from">
									—— <span
										v-if="hitokototext.from_who">{{hitokototext.from_who}}</span>「{{hitokototext.from}}」
								</div>
							</div>
						</div>
					
					</div>
				</div>
				
				<div class="overlay" id="particles-js">
					
				</div>
				<div class="container">
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 "style="margin-top: 25vh;">
							<h2 class="title-sh color-ffa500">SuzumiyaHaruhi</h2>
							<p>
								<!-- <a target="_blank" href="http://haruhinav.rthe.xyz/" class="btn-a">导航</a> -->
								<router-link :to="{path:'/nav'}" class="btn-a">导航</router-link>
								<router-link :to="{path:'/msgboard'}" class="btn-a btn-msg">留言</router-link>
								
								<a href="javascript:void(0)" class="btn-b" v-on:click="love()">
									<icon icon="heart"></icon>
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div id="footer" class="noselect">
				<span id="ceratetime" title="建站时间" class="font-change" style="font-size: 14px;">{{ceratetime}}</span>
			</div>
		</div>
	</div>

</template>

<script>
	/* 用户表：添加头像url，ip
	留言表：ip，name，email，你的某账号平台网址，msg time*/ 
	//import $ from 'jquery'

	import particlesJs from "particles.js";
	import particlesConfig from '../plugins/particles/particles.json'

	export default {
		name: 'home',
		data() {
			return {
				// 
				token:this.$localStorage.get('token'),
				userId:null,
				user:{},
				ceratetime: '',
				hitokototext: {},
				//auser:JSON.parse(this.$localStorage.get('user')),
			}
		},
		provide(){
			return{
				reinitHome:this.init
			}
		},
		created() {
			//this.userId = this.$localStorage.get('user_key')
		
			this.show_date_time()
			this.RefreshCreateTime()
			// this.start_gethitokoto()
			this.getHitokoto()
			
			//this.login()
			//this.getIP()
			// if(this.token!=null){
			// 	//this.verify()
			// }
			
		},
		mounted() {
			this.init()
			var u = JSON.parse(this.$localStorage.get('user'))
			if(u){
				this.user = u
			}
		},
		methods: {
			love(){
				layer.msg('感谢您的喜欢~')
			},
			getIP() {//暂时未用
				var v = this
				var ip = returnCitySN["cip"]
				$.ajax({
					type: 'get',
					url: 'http://api.map.baidu.com/location/ip?ak=rg3c2fj4QBZwa6v3h1w95Sp9&ip=' + ip,
					dataType: 'jsonp',
					success: function(res) {
						//console.log(res)

					},
					error: function(res) {

					}
				})
			},
			init() {
				//alert(1)
				var jparticle = this.$localStorage.get("JPARTICLE_FLAG")
				if(jparticle==1){
					//alert(jparticle)
					particlesJS("particles-js", particlesConfig)
					document.body.style.overflow = "hidden"
				}
				
			},//haruhi005
			goto(path, name) {
				this.$router.push({
					path: path,
					name: name
				});
			},
			// findUserById(){
			// 	console.log("home",this.appUser)
			// 	console.log("home",this.appUser.id)
			// 	this.$get(this.API.API_USER_FINDBYUID,{
			// 		uid:this.appUser.id
			// 	}).then(res=>{
			// 		if(res.code==0){
			// 			this.user = res.user
			// 		}else{
						
			// 		}
			// 	})
			// },
			verify(){
				this.$post(this.API.API_USER_TOKEN_VERIFY).then(res=>{
					if(res.code==0){
						this.user = res.user
					}else{
						
					}
				})
			},
			getHitokoto() {
				let seshi = JSON.parse(sessionStorage.getItem("hitokoto_session"))
				if(seshi){
					this.hitokototext = seshi
					return
				}
				
				let _this = this
				$.ajax({
					url:'https://v1.hitokoto.cn',
					success:function(res){
						_this.hitokototext = res
						// hitokototextSession= res
						sessionStorage.setItem("hitokoto_session",JSON.stringify(res))
					}
				})
				
			},
			RefreshCreateTime() {
				var BirthDay = new Date("04-12-2021 20:42:00"); //建站日期
				var today = new Date();
				var timeold = (today.getTime() - BirthDay.getTime());
				var sectimeold = timeold / 1000
				var secondsold = Math.floor(sectimeold);
				var msPerDay = 24 * 60 * 60 * 1000
				var e_daysold = timeold / msPerDay
				var daysold = Math.floor(e_daysold);
				var e_hrsold = (daysold - e_daysold) * -24;
				var hrsold = Math.floor(e_hrsold);
				var e_minsold = (hrsold - e_hrsold) * -60;
				var minsold = Math.floor((hrsold - e_hrsold) * -60);
				var seconds = Math.floor((minsold - e_minsold) * -60);
				//var ceratetime = document.getElementById("ceratetime")
				this.ceratetime = daysold + "天" + hrsold + "小时" + minsold + "分" + seconds + "秒";

			},
			start_gethitokoto() {

				window.setInterval(() => {
					this.getHitokoto()
				}, 60000)
			},
			show_date_time() {
				window.setInterval(() => {
					this.RefreshCreateTime()
				}, 1000)

			}
		}
	}
</script>

<!-- src="../assets/css/home.css" scoped -->
<style >
	@import url("../assets/css/home.css");
</style>
