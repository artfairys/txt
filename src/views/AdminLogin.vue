<template>
	<div id="AdminLogin">
		<!-- <div id="login-box">
			<h1>Login</h1>
			<div class="input-box">
				<i class="el-icon-user"></i>

				<input type="text" placeholder="UserName" v-model="name" @keyup.enter="adminLogin" />
			</div>
			<div class="input-box">
				<i class="el-icon-lock"></i>
				<input type="password" placeholder="UserPassword" v-model="pswd" @keyup.enter="adminLogin" />
			</div>
			<button v-on:click="adminLogin">Sign in</button>
		</div> -->
		<el-form
		      class="login-container"
		      ref="loginForm"
		      v-loading="loading"
		      element-loading-text="正在登录..."
		      element-loading-spinner="el-icon-loading"
		      element-loading-background="rgba(0, 0, 0, 0.8)"
		    >
		      <h3 class="login-title">后台登录</h3>
		      <el-form-item>
		        <el-input @keyup.enter="adminLogin"
		          type="text"
		          auto-complete="false"
		          v-model="name"
		          placeholder="输入用户名"
		        ></el-input>
		      </el-form-item>
		      <el-form-item prop="password">
		        <el-input @keyup.enter="adminLogin"
		          type="password"
		          auto-complete="false"
		          v-model="pswd"
		          placeholder="输入密码"
		        ></el-input>
		      </el-form-item>
		      <el-button type="primary" class="log-btn" @click="adminLogin"
		        >登录</el-button
		      >
		    </el-form>
	</div>
</template>

<script>
	export default {
		name: "AdminLogin",
		data() {
			return {
				name: '',
				pswd: '',
				loading:false
			}
		},
		methods: {
			adminLogin() {
				
				if (this.name.trim() == "" || this.name == null) {
					return layer.msg("用户名为空！")
				}
				if (this.pswd.trim() == "" || this.pswd == null) {
					return layer.msg("密码为空！")
				}
				this.loading=true
				this.$apost(this.AAPI.API_ADMIN_LOGIN, {
					mid: this.name,
					password: this.pswd
				}).then(res => {
					if (res.code < 0) {
						this.loading = false
						return this.$message({
							type: res.type,
							message: res.msg
						})
					}
					this.$localStorage.set('A_T', res.data.token)
					this.loading = false
					this.$router.replace({
						path: "/manage/users",
						name: "manageUsers"
					});
				})
			}
		}
	}
</script>

<style>
	
	#AdminLogin {
		overflow-y: hidden;
		height: 100vh;
		background: transparent url(https://api.ixiaowai.cn/api/api.php) center center no-repeat;
		background-size: cover;
		
	}
	
	#AdminLogin .log-btn {
	  width: 100%;
	}
	#AdminLogin .login-container {
	  border-radius: 15px;
	  background-clip: padding-box;
	  margin: 180px auto;
	  width: 350px;
	  padding: 15px 35px 15px 35px;
	  background-color: white;
	  border: 1px solid white;
	  box-shadow: 0 0 25px #cac6c6;
	}
	#AdminLogin .login-container .login-title {
	  margin: 0 auto 40px auto;
	  text-align: center;
	}
	#AdminLogin .login-container .captcha-input {
	  width: 250px;
	  margin-right: 5px;
	}
	#AdminLogin .login-container .login-remember {
	  text-align: left;
	  margin: 0 0 15px 0;
	}
	#AdminLogin .el-form-item__content {
	  display: flex;
	  align-content: center;
	}
	
	
	
	
	
	
	/* 
	#AdminLogin #login-box {
		background-color: #00000068;
		border-radius: 13px;
		text-align: center;
		margin: 0px auto;

		width: 350px;
		height: 400px;
	}

	#AdminLogin #login-box h1 {
		padding-top: 60px;
		color: #ffffff;
	}

	#AdminLogin #login-box .input-box {
		margin-top: 30px;
	}

	#AdminLogin #login-box .input-box input {
		border: none;
		background: none;
		border-bottom: #FFFFFF 2px solid;
		padding: 5px 10px;
		outline: none;
		color: #FFFFFF;
	}

	#AdminLogin #login-box button {
		line-height: 30px;
		margin-top: 30px;
		width: 130px;
		height: 30px;
		border-radius: 13px;
		outline: none;
		border: none;
		background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
		color: #FFFFFF;

	}

	#AdminLogin #login-box button:hover {
		background-image: linear-gradient(to top, #f68084 0%, #a6c0fe 100%);
	}

	#AdminLogin #login-box .input-box i {
		color: #FFFFFF;
	} */
</style>
