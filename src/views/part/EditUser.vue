<template>
	<div id="EditUser">
		<div class="container-fluid" style="padding: 0;">
			<div class="panel panel-info panel-box-show">
				<div class="panel-heading">
					<h3><i class="el-icon-user"></i>基础信息</h3>
				</div>
				<div class="panel-body edu-panel-body">
					<el-form label-position="top">
						<el-form-item label="UID">
							<el-input v-model="user.id" disabled></el-input>
						</el-form-item>
						<el-form-item label="MID/账号">
							<el-input v-model="user.mid" maxlength="12" disabled></el-input>
						</el-form-item>
						<el-form-item label="昵称">
							<el-input v-model="user.nickName" maxlength="18"></el-input>
						</el-form-item>
						<el-form-item label="注册时间">
							<el-input v-model="user.createTime" disabled></el-input>
						</el-form-item>
						<el-form-item label="性别">
							<el-radio-group v-model="user.sex">
								<el-radio :label="0">女</el-radio>
								<el-radio :label="1">男</el-radio>
								<el-radio :label="2">保密</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="个性签名">
							<el-input v-model="user.sign" placeholder="个性签名" maxlength="100"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button v-on:click="save" type="success" class="pull-right" icon="el-icon-check" circle>
							</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div class="panel panel-warning panel-box-show">
				<div class="panel-heading">
					<h3 style="margin: 0;"><i class="fa fa-key" aria-hidden="true"></i>更改密码</h3>
				</div>
				<div class="panel-body updpwd-panel-body">
					<el-steps :active="active" finish-status="success" align-center>
						<el-step title="验证密码" description="输入当前密码进行验证"></el-step>
						<el-step title="新的密码" description="输入新的密码"></el-step>
						<el-step title="修改成功" description="更改成功后需要重新登录"></el-step>
					</el-steps>

					<div class="container-fluid">
						<div class="row">
							<div class="col-lg-12 col-sm-12 col-md-12 col-lg-12">
								<p v-if="active==0" class="padding-top-40">
									<el-input placeholder="当前密码" v-model="nowPwd" maxlength="15" type="password"
										clearable>
										<el-button title="验证" slot="append" icon="fa fa-check" v-on:click="checkPwd">
										</el-button>
									</el-input>
								</p>
								<p v-if="active==1" class="padding-top-40">
									<el-input placeholder="设置新的密码" v-model="newPswd" maxlength="15" type="password"
										show-password clearable>
										<el-button title="保存" slot="append" icon="fa fa-check" v-on:click="savePwd">
										</el-button>
									</el-input>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'EditUser',
		inject: ['reUser'], 
		data() {
			return {
				userId: this.$localStorage.get('user_key'),
				user: {},

				sex: '',
				active: 0,
				nowPwd: '', //当前密码
				newPswd: '' //新的密码
			}
		},
		created() {
			this.findUserById()
			//this.userTokenVerify()
		},
		methods: {
			goto(path, name) {
				this.$router.push({
					path: path,
					name: name
				});
			},
			// 保存新的密码
			savePwd() {
				var v = this
				if(this.newPswd.trim()==''){
					layer.msg('密码不能为空！', {icon: 0})
				}else if(this.newPswd.length<6){
					layer.msg('密码不能少于6个字符！', {icon: 0})
				}else if(this.newPswd==this.nowPwd){
					layer.msg('与旧密码相同！', {icon: 0})
				} else {
					this.$post(this.API.API_USER_UPDATE_PSWD,{
						id:this.appUser.id,
						password:this.newPswd
					}).then(res=>{
						if(res.code!=0){
							return this.$message.error('错误！修改失败')
						}
						this.active++
						this.$localStorage.remove('token')
						layer.open({
							content: '修改密码成功！身份已过期，请重新登录！',
							success: function(layero, index) {
								setTimeout(function() {
									layer.close(index)
									v.goto('/login', 'Login')
								}, 3000);
							},
							yes: function(index, layero) {
								layer.close(index);
								v.goto('/login', 'Login')
							},
							cancel: function(index, layero) {
								layer.close(index);
								v.goto('/login', 'Login')
							}
						});
					})
				}
			},
			// 验证当前密码
			checkPwd() {
				if (this.nowPwd.trim() == '') {
					layer.msg('您什么都没输入!', {
						icon: 0
					})
				} else if (this.nowPwd.length < 6) {
					layer.msg('密码不能少于6个字符！', {
						icon: 0
					})
				} else {
					this.$post(this.API.API_USER_CHECK_PSWD, {
						id: this.appUser.id,
						password: this.nowPwd //验证当前密码
					}).then(res => {
						if (res.code != 0) {
							return layer.msg('密码错误！', {
								icon: 2
							})
						}
						this.active++
						return layer.msg('正确！进入下一步', {
							icon: 1
						})
					})
				}
			},
			// userTokenVerify(){
			// 	this.$post(this.API.API_USER_TOKEN_VERIFY).then(res=>{
			// 		if(res.code==0){
			// 			this.user = res.user
			// 		}else{
						
			// 		}
			// 	})
			// },
			findUserById() {
				this.$get(this.API.API_USER_FINDBYUID, {
					uid: this.appUser.id
				}).then(res => {
					if(res.code==0){
						this.user = res.user
					}else{
						this.$localStorage.remove('user_key')
					}
				})
			},
			save() {
				if(this.appUser.nickName==this.user.nickName &&
					this.appUser.sex == this.user.sex &&
					this.appUser.sign == this.user.sign){
					return layer.msg('你没有修改信息哦~')
				}
				if (this.user.nickName.trim() == '' || this.user.nickName == null) {
					layer.msg('昵称不能为空~')
				} else {
					this.$post(this.API.API_USER_UPDATE, {
						id: this.appUser.id,
						nickName: this.user.nickName,
						sex: this.user.sex,
						sign:this.user.sign
					}).then(res => {
						if(res.code<0){
							return this.$message({
								type:res.type,
								message:res.msg
							})
						}
						layer.msg(res.msg)
						this.reUser()
					})
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.panel-box-show {
		box-shadow: 0 0 1rem rgb(161 177 204 / 40%);
	}

	.updpwd-panel-body {
		padding: 15px 0;
	}

	.panel-body {}

	.padding-top-40 {
		padding-top: 40px;
	}
</style>
