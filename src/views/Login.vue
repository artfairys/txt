<template>
	<div id="Login">
		<div class="cover">
			<header class="htmleaf-header">
			</header>
			<div class="container-fluid" >
				<div class="container  m-auto">
					<div class="row" >
						<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-push-3 col-lg-push-3 ">
							<form class="form-horizontal border-box-shaow">
								<span class="heading">Login</span>
								<div class="form-group">
									<input @keyup.enter="login"
									v-model="mid" maxlength="255" autocomplete="off" type="text" class="form-control"  placeholder="账　号">
									<i class="fa fa-user"></i>
								</div>
								<div class="form-group help">
									<input maxlength="255" oninput="this.value=this.value.replace(/[, ]/g,'')" @keyup.enter="login"
									v-model="pswd" type="password" class="form-control" placeholder="密　码">
									<i class="fa fa-lock"></i>
									
								</div>
								<div class="form-group">
									<!-- <div class="main-checkbox">
										<input type="checkbox" value="None" id="checkbox1" name="check" />
										<label for="checkbox1"></label>
									</div> -->
									<span class="text">
										<router-link :to="{path:'/register'}" class="font-change-login">没有账号？</router-link>
									</span>
									<button type="button" class="btn btn-default" v-on:click="login">登录</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			
			<div class="related">
			</div>
		</div>
		<div class="overlay" >
			<div id="particles-js" > 
				
			</div>
		</div>



	</div>
</template>

<script>
	//import $ from 'jquery'
	import particlesJs from "particles.js";
	import particlesConfig from '../plugins/particles/particles.json'
	export default {
		name: 'Login',
		data() {
			return {
				mid:'',//账号
				pswd:'',
				lastRouter:sessionStorage.getItem("last_router")
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			goto(path, name) {
				//替换url
				this.$router.replace({
					path: path,
					name: name
				});
			},
			login(){
				if(this.mid.trim()==''||this.mid==null){
					layer.msg('账号不能为空~')
				}else if(this.pswd.trim()==''||this.pswd==null){
					layer.msg('密码不能为空~')
				}else if(this.pswd.length>15||this.pswd.length<6){
					layer.msg('密码在6-15位哦')
				}else{
					this.$post(this.API.API_LOGIN,{
						mid:this.mid,
						password:this.pswd
					}).then(res=>{
						if(res.code<0){
							layer.msg(res.msg)
						}else{
							this.$localStorage.set('token',res.data.token)
							this.$localStorage.set('user',JSON.stringify(res.data.user))
							if(this.lastRouter){
								sessionStorage.removeItem("last_router")
								this.$router.replace(this.lastRouter)
							}else{
								this.goto("/","Home")
							}
							
						}
						//console.log(res)
					})
				}
				
			},
			init() {
				var jparticle = this.$localStorage.get("JPARTICLE_FLAG")
				if(jparticle==1){
					particlesJS("particles-js", particlesConfig)
					document.body.style.overflow = "hidden"
				}
				
			},
		}
	}
	
</script>

<style src="../assets/css/login.css" scoped="scoped">
	/*  */
</style>
