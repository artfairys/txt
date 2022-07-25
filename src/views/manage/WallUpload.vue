<template>
	<div id="WallUpload">
		<div class="container">
			<el-upload class="upload-demo" drag :action="AAPI.API_ADMIN_PALLPAPER_UPLOAD"
			:headers="header"
				:on-success="handleAvatarSuccess" multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip" slot="tip">只能上传图片文件，且不超过30MB</div>
			</el-upload>
		</div>
		<!-- <div class="container img-container" v-if="imageURLs && imageURLs.length>0">
			<div class="row">
				<div class="col-lg-4" v-for="url,i in imageURLs">
					<img class="newImage" :src="API.UPLOADURL + url" />
				</div>
			</div>
			
		</div> -->
	</div>
</template>

<script>
	export default{
		name:"",
		data() {
			return{
				header:null,
				imageURLs:[]
			}
		},
		created() {
			let at  = localStorage.getItem("A_T")
			if(at){
				this.header = {
					at:at
				}
				// console.log(this.header)
			}
		},
		methods:{
			handleAvatarSuccess(res, file){
				if(res.code==0){
					this.imageURLs.push("/upload/"+res.data)
				}
				this.$message({
					type:res.type,
					message:res.msg
				})
			}
		}
	}
</script>

<style>
	#WallUpload .el-upload__input {
		display: none;
	}

	#WallUpload .container .upload-demo {
		height: 40vh;
	}

	#WallUpload .container .upload-demo .el-upload {
		height: 100%;
		width: 100%;
	}

	#WallUpload .container .upload-demo .el-upload-dragger {
		height: 100%;
		width: 100%;
	}
	#WallUpload .img-container {
		margin-top: 100px;
	}
	#WallUpload .img-container .row .newImage{
		width: 100%;
	}
</style>
