<template>
	<div id="onlyid-wallpaperHead">
		<div class="navbar navbar-fixed-top navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
						data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand"><b>Haruhi 壁纸</b></a>
				</div>
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav navbar-right">
						<li>
							<!-- <a title="我的喜欢" @click="toWish"></a> -->
							<router-link to="/wallpaper/wish"><b><i class="glyphicon glyphicon-heart"></i></b></router-link>
						</li>
						<li>
							<a title="上传壁纸" @click="openUpload"><b><i class="el-icon-upload"></i>上传壁纸</b></a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 上传图片弹框 抽屉-->
		<div class="user-upload-container">
			
				<el-drawer
					direction="btt"
					custom-class="upload-drawer"
					:visible.sync="drawer"
					:show-close="true"
					:withHeader="false"
					size="70%">
					<div class="container">
						<div class="el-upload__tip" slot="tip">
							<b>只能上传
								<el-tooltip class="item" effect="light" content="支持的格式：jpg、png、jpeg、jpe、bmp" placement="top-start">
									<a>图片文件<sup><font color="red">*</font></sup></a>，
									
								</el-tooltip>
								且单张大小不超过<font color="red">8MB</font>
								不小于<font color="red">0.5MB</font> 
								<!-- ，最大同时上传<font color="red">5</font>张 -->
							</b>
							
						</div>
						<template v-if="isLogin">
							
							<el-upload class="upload-demo" drag :action="API.API_WALLPAPER_UPLOAD"
							
							ref="uploadContrl"
							:headers="header"
								:on-success="handleAvatarSuccess" 
								:before-upload="beforeAvatarUpload"
								:auto-upload="false"
								:file-list="fileList"
								accept=".jpg,.png,.jpeg,.jpe,.bmp"
								multiple>
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">将文件拖到此处，或<em>点击选择</em></div>
								
							</el-upload>
							<el-button size="small" icon="el-icon-upload" type="default " class="pull-right" @click="submitUpload">开始上传</el-button>
						</template>
						
						<template v-else>
							<div class="not-upload-text" @click="toLogin">
								<div class="row">
									<p><i class="el-icon-warning"></i></p>
									<p>
										<span>上传文件需要
											<font color="#409EFF">登录</font>
										</span>
									</p>
								</div>
								
							</div>
						</template>
					</div>
				</el-drawer>
		</div>
	</div>
</template>

<script>
	export default{
		name:"WallpaperHead",
		data() {
			return{
				header:null,
				drawer:false,
				isLogin:false,
				fileList:[]
			}
		},
		created() {
			let token = localStorage.getItem("token")
			if(token){
				this.header = {
					token:token
				}
				this.isLogin = true
			}
		},
		methods:{
			toLogin(){
				sessionStorage.setItem("last_router","/wallpaper")
				this.$router.push("/login")
			},
			openUpload(){
				this.drawer = true
			},
			// 点击开始上传按钮
			submitUpload(){
				this.$refs.uploadContrl.submit()
			},
			// 请求成功回调，不一定上传成功
			handleAvatarSuccess(res, file){
				this.$message({
					type:res.type,
					message:res.msg
				})
				console.log(this.fileList)
			},
			// 请求之前的拦截方法
			beforeAvatarUpload(file){
				
				if(localStorage.getItem("token")){
					// jpg、png、jpeg、jpe、bmp
					let fileTypes=['jpg','png','jpeg','jpe','bmp']
					let typeNotSup = true
					let fileType = file.type
					if(fileType){
						for(let i = 0,l=fileTypes.length;i<l;i++){
							if(fileType.indexOf(fileTypes[i]) != -1){
								typeNotSup = false
								break
							}
						}
					}
					if(typeNotSup){
						layer.msg("格式不支持！",{
							icon:7
						})
						return false
					}
					
					const sizeOK = file.size / 1024 / 1024 > 0.5 && file.size / 1024 / 1024 < 8;
					if(!sizeOK){
						layer.msg("文件大小请在0.5MB~8MB之间！",{
							icon:7
						})
						return false
					}
				}
				return true
			}
		}
	}
</script>

<style>
	@import url("../assets/css/WallpaperHead.css");
</style>
