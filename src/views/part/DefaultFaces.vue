<template>
	<div id="DefaultFaces">
		<div class="container-fluid" style="padding: 0;">
			<div class="panel panel-info panel-main">
				<div class="panel-heading">
					<h3><i class="el-icon-user-solid"></i>修改头像</h3>
				</div>
				<div class="panel-body">
					<div class="row">
						<div v-for="(f,i) in faces" class="col-xs-3 col-sm-3 col-md-2 col-lg-2 img-item">
							<img :src="f.url" class="img-responsive img-circle img-thumbnail" 
							v-on:dblclick="updateUserFace(f.url)"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'DefaultFaces',
		inject: ['reUser'], 
		data() {
			return{
				faces:[]
			}
		},
		created() {
			this.queryAllFace()
		},
		methods:{
			updateUserFace(url){
				this.$post(this.API.API_USER_UPDATE_FACE,{
					id:this.appUser.id,
					face:url
				}).then(res=>{
					if (res.code < 0) {
						return this.$message({
							type: res.type,
							message: res.msg
						})
					}
					layer.msg("修改成功")
					this.reUser()
					
				})
			},
			queryAllFace(){
				this.$get(this.API.API_DEFAULRFACE_LIST).then(res=>{
					this.faces = res
				})
			}
		}
	}
</script>

<style>
	@import url("../../assets/css/default-faces.css");
</style>
