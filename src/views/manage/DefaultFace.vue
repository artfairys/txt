<template>
	<div id="DefFaceManage">
		<div class="row">
			
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 ">
				<label class="">URL：</label>
				<el-input v-model="url" clearable placeholder="URL"></el-input>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 col-btn">
				<el-button icon="el-icon-refresh-right" v-on:click="reset">重置</el-button>
				<el-button type="primary" icon="el-icon-search" v-on:click="search()">查询</el-button>
				<el-button type="success" icon="el-icon-plus" v-on:click="dialogAddForm=true">添加</el-button>
			</div>
		</div>
		<div class="row row-table">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
				<table class="table table-bordered table-hover table-condensed">
					<thead>
						<tr>
							<th>序号</th>
							<th>id</th>
							<th width="70">浏览</th>
							<th>URL</th>
							<th>
								<a href="javascript:void(0)" v-on:click="dfaces.list.reverse()">录入时间
									<i class="el-icon-sort"></i></a>
							</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(face,i) in dfaces.list">
							<td>{{i+1}}</td>
							<td>{{face.id}}</td>
							<td>
								<img :src="face.url" class="img-circle img-responsive img-thumbnail"/>
							</td>
							<td>{{face.url}}</td>
							<td>{{face.createTime}}</td>
							<td class="text-center">
								<el-button type="warning" size="mini" v-on:click="findById(face.id)">编辑</el-button>
								<el-button type="danger" size="mini" v-on:click="delById(face.id)">删除</el-button>
							</td>
						</tr>
						
					</tbody>
				</table>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="pull-right">
					<el-pagination background layout="prev, pager, next" v-on:current-change="pageChange"
						:page-count="Math.ceil(dfaces.size / 15)">
					</el-pagination>
				</div>
		
			</div>
		</div>
		<!-- 弹框部分 -->
		<!-- 修改弹框 -->
		<el-dialog title="修改默认头像" :visible.sync="dialogEditForm">
			<el-form :model="findDFace">
				<el-form-item label="浏览" label-width="80px">
					<img :src="oldImg" class="img-circle img-responsive img-thumbnail e-img"  />
				</el-form-item>
				
				<el-form-item label="URL" label-width="80px">
					<el-input v-model="findDFace.url" autocomplete="off" placeholder="URL"
					v-on:input="urlChange(findDFace.url)" clearable maxlength="255"></el-input>
				</el-form-item>
				<div class="container-fluid">
					<img v-if="previewImg" :src="previewImg" class="img-circle img-responsive img-thumbnail text-center center-block e-img"/>
					
				</div>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditForm = false">取 消</el-button>
				<el-button type="primary" @click="editSave">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 添加弹框 -->
		<el-dialog title="添加默认头像" :visible.sync="dialogAddForm">
			<el-form :model="addDFace">
				
				
				<el-form-item label="URL" label-width="80px">
					<el-input v-model="addDFace.url" autocomplete="off" placeholder="URL"
					v-on:input="AddUrlChange(addDFace.url)" clearable maxlength="255"></el-input>
				</el-form-item>
				<div class="container-fluid">
					<img v-if="AddPreviewImg" :src="AddPreviewImg" class="img-circle img-responsive img-thumbnail text-center center-block e-img"/>
					
				</div>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogAddForm = false,AddPreviewImg='',addDFace.url=''">取 消</el-button>
				<el-button type="primary" @click="addSave">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		name:'DefFaceManage',
		data() {
			return{
				dialogEditForm:false,
				dialogAddForm:false,
				page:1,
				pageSize:15,
				url:'',
				dfaces:{},
				findDFace:{},
				previewImg:'',
				oldImg:'',
				addDFace:{
					url:''
				},
				AddPreviewImg:''
			}
		},
		created() {
			this.search()
		},
		methods:{
			AddUrlChange(url){
				this.AddPreviewImg = url
			},
			urlChange(url){
				this.previewImg = url
			},
			// 添加保存
			addSave(){
				if(this.addDFace.url.trim()=='' || !this.addDFace.url){
					return layer.msg("url不能为空")
				}
				this.$apost(this.AAPI.API_ADMIN_DEFAULTFACE_INSERT,{
					url:this.addDFace.url
				}).then(res=>{
					if (res.code < 0) {
						return this.$message({
							type: res.type,
							message: res.msg
						})
					}
					layer.msg(res.msg)
					this.dialogAddForm = false
					this.AddPreviewImg=''
					this.addDFace.url=''
					this.search()
				})
			},
			// 编辑保存
			editSave(){
				if(this.oldImg==this.findDFace.url){
					return layer.msg("你没有修改")
				}
				if(this.findDFace.url.trim()=='' || !this.findDFace.url){
					return layer.msg("url不能为空")
				}
				this.$apost(this.AAPI.API_ADMIN_DEFAULTFACE_UPDATE,{
					id:this.findDFace.id,
					url:this.findDFace.url
				}).then(res=>{
					if (res.code < 0) {
						return this.$message({
							type: res.type,
							message: res.msg
						})
					}
					layer.msg(res.msg)
					this.dialogEditForm = false
					this.search()
				})
			},
			// 删除
			delById(id){
				this.$confirm('此操作将永久删除该头像, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$apost(this.AAPI.API_ADMIN_DEFAULTFACE_REMOVE,{
						id:id
					}).then(res=>{
						if (res.code < 0) {
							return this.$message({
								type: res.type,
								message: res.msg
							})
						}
						layer.msg(res.msg)
						this.search()
					})
				}).catch(() => {/* 取消回调 **/});
			},
			findById(id){
				this.$aget(this.AAPI.API_ADMIN_DEFAULTFACE_ONE+"/"+id).then(res=>{
					this.findDFace= res
					this.previewImg = res.url
					this.oldImg=res.url
					this.dialogEditForm=true
				})
			},
			pageChange(val){
				this.page = val
				this.$nextTick(function(){
					this.search()
				})
			},
			search(){
				this.$apost(this.AAPI.API_ADMIN_DEFAULTFACE_LIST,{
					page:this.page,
					pageSize:this.pageSize,
					url:this.url
				}).then(res=>{
					this.dfaces= res.data 
				})
			},
			reset(){
				this.url = ''
				this.page=1
				this.$nextTick(function(){
					this.search()
				})
			}
		}
	}
</script>

<style>
	#DefFaceManage .row .col-btn{
		margin-top: 24px;
	}
	#DefFaceManage .row-table{
		margin-top: 20px;
	}
	#DefFaceManage .row-table .img-thumbnail{
		padding: 1px;
	}
	#DefFaceManage .el-dialog__wrapper .el-form .e-img{
		max-width: 10vw;
		padding: 1px;
	}
</style>
