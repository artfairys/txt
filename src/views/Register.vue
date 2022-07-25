<template>
	<div id="Register">
		<div class="cover">
			<header class="htmleaf-header">
			</header>
			<div class="container-fluid">
				<div class="container  m-auto">
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-push-3 col-lg-push-3 ">
							<form class="form-horizontal border-box-shaow">
								<span class="heading">Register</span>
								<div class="form-group">
									<input v-model="nickName" maxLength="18"
									oninput="this.value=this.value.replace(/[, ]/g,'')"@keyup.enter="register"
									autocomplete="off" type="text" class="form-control" placeholder="昵  称">
									<i class="fa fa-star"></i>

								</div>
								<div class="form-group">
									<input v-model="mid" maxLength="12" 
									oninput="this.value=this.value.replace(/[, ]/g,'')"@keyup.enter="register"
									autocomplete="off" type="text" class="form-control" placeholder="账  号">
									<i class="fa fa-user"></i>
									<el-tooltip class="item" effect="dark" content="6-12位数字或字母任意组合,不能输入空格和符号" placement="top">
										<a href="javascript:void(0)" class="fa fa-question-circle"></a>
									</el-tooltip>

								</div>
								<div class="form-group help">
									<input v-model="pswd" maxLength="15" @keyup.enter="register"
									oninput="this.value=this.value.replace(/[, ]/g,'')" type="password"
										class="form-control" placeholder="密  码">
									<i class="fa fa-lock"></i>
									<el-tooltip class="item" effect="dark" content="6-15位数字或字母任意组合,不能输入空格和符号" placement="top">
										<a href="javascript:void(0)" class="fa fa-question-circle"></a>
									</el-tooltip>
								</div>
								<div class="form-group help">
									<input v-model="repswd" maxLength="15" @keyup.enter="register"
									oninput="this.value=this.value.replace(/[, ]/g,'')" type="password"
										class="form-control" placeholder="确 认 密 码">
									<i class="fa fa-lock"></i>
								</div>
								<div class="form-group">
									<!-- <div class="main-checkbox">
										<input type="checkbox" value="None" id="checkbox1" name="check" />
										<label for="checkbox1"></label>
									</div> -->
									<span class="text">
										<router-link :to="{path:'/login'}" class="font-change-login">去登陆</router-link>
									</span>
									<button type="button" class="btn btn-default" v-on:click="register">注册</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			<div class="related">
			</div>
		</div>
		<div class="overlay">
			<div id="particles-js">

			</div>
		</div>




	</div>
</template>

<script>
	//import $ from 'jquery'
	import particlesJs from "particles.js";
	import particlesConfig from '../plugins/particles/particles.json'
	export default {
		name: 'Register',
		data() {
			return {
				nickName:'',
				mid:'',
				pswd:'',
				repswd:'',
				lastRouter:sessionStorage.getItem("last_router")
			}
		},
		mounted() {

			this.init()
		},
		methods: {
			register(){
				if(this.nickName.trim()==''||this.nickName.trim()==null){
					layer.msg('昵称不能为空~')
				}else if(this.mid.trim()==''||this.mid.trim()==null){
					layer.msg('账号不能为空~')
				}else if(this.mid.length<6||this.mid.length>12){
					layer.msg('账号在6-12位~')
				}else if(this.pswd.trim()==''||this.pswd.trim()==null){
					layer.msg('密码不能为空~')
				}else if(this.pswd.length<6||this.pswd.length>15){
					layer.msg('密码在6-15位哦')
				}else if(this.repswd != this.pswd){
					layer.msg('确认密码与密码不相同')
				}else{
					this.$post(this.API.API_USER_INSERT,{
						mid:this.mid,
						nickName:this.nickName,
						password:this.pswd
					}).then(res=>{
						//console.log(res)
						// if(res.itEx==1){
						// 	this.$message.warning('该账号已经被使用了哦~')
						// }else if(res.newId!=0 && res.itEx==0){
						// 	layer.msg('注册成功！感谢你的加入~')
						// 	this.$localStorage.set('token',res.token)
						// 	this.goto("/","Home")
						// }
						
						if(res.code<0){
							return this.$message({
								type:res.type,
								message:res.msg
							})
						}
						layer.msg(res.msg)
						this.$localStorage.set('token',res.data.token)
						this.$localStorage.set('user',JSON.stringify(res.data.user))
						if(this.lastRouter){
							sessionStorage.removeItem("last_router")
							this.$router.replace(this.lastRouter)
						}else{
							this.goto("/","Home")
						}
						
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
			
			goto(path, name) {
				//替换url
				this.$router.replace({
					path: path,
					name: name
				});
			}
		}
	}
</script>

<style src="../assets/css/register.css" scoped="scoped">
	
</style>
