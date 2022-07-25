<template>
	<div v-if="page_flag==7" id="MyNote">
		<div class="panel panel-success panel-mynote-main">
			<div class="panel-heading">
				<h3><i class="el-icon-document"></i>我的笔记
				<b class="pull-right">
					<a title="order by lastUpdateTime asc/desc" href="javascript:void(0)" v-on:click="notes.reverse()">
						<i class="el-icon-sort"></i>
					</a>
					<a title="新建笔记" href="javascript:void(0)" v-on:click="toAddNote">
						<i class="el-icon-plus"></i>
					</a>
					
				</b>
				</h3>
				
			</div>
			<div class="panel-body panel-body-notes">
				<div class="container-fluid">
					<div class="row">
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-note">
							<a href="javascript:void(0)" v-on:click="toAddNote" title="新建笔记">
								<div class="panel panel-success">
									<div class="panel-body">
										<i class="el-icon-plus"></i>新建笔记...
									</div>
								</div>
							</a>
							
						</div>
						<div v-for="(note,i) in notes" class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-note">
							<a href="javascript:void(0)"v-on:click="toShowOneNote(note)" :title="note.title">
								<div class="panel panel-success">
									<div class="panel-body">
										{{note.title}}
									</div>
									
								</div>
							</a>
							<div class="panel-footer">
								<span><label>上次更新时间：</label>{{note.lastUpdateTime}}<br/>
								<label>创建时间：</label>{{note.createTime}}</span>
							</div>
							<div class="div-edit-note">
								<a href="javascript:void(0)" title="编辑" v-on:click="toEditNote(note)">
									<i class="el-icon-edit"></i>
								</a>
							</div>
							<div class="div-remove-note">
								<el-popconfirm v-on:confirm="removeNote(note)"
									title="确定删除吗？" icon-color="red"
									confirm-button-type="danger" icon="el-icon-delete">
									
									<a slot="reference" title="删除" href="javascript:void(0)">
										<i class="el-icon-delete el-icon-delete-note  "></i>
									</a>
								</el-popconfirm>
							</div>
						</div>
						
						
					</div>
				</div>
			</div>
		</div>
	</div>
	<div v-else class="#editOpen">
		<EditNote v-if="page_flag==2" />
		<ShowNote v-if="page_flag==6"/>
	</div>
</template>

<script>
	export default {
		name: 'MyNote',
		inject:['Note'],
		data() {
			return {
				user:{},
				notes:[],
				page_flag:7
			}
		},
		created() {
			let u = JSON.parse(this.$localStorage.get('user'))
			if (u != null) {
				this.user = u
				this.findNoteByUId()
			}
		},
		methods:{
			// 删除
			removeNote(note){
				this.$post(this.API.API_NOTE_DELETE,{
					id:note.id,
					userId:this.appUser.id
				}).then(res=>{
					if(res.code<0){
						return this.$message({
							type:res.type,
							message:res.msg
						})
					}
					this.findNoteByUId()
					this.Note()
					layer.msg(res.msg)
				})
			},
			// 去编辑
			toEditNote(note){
				this.$localStorage.set("LOCAL_NOET",JSON.stringify(note))
				// this.page_flag = -1
				this.page_flag = 2
			},
			// 去添加
			toAddNote(){
				this.page_flag = 2
				this.$localStorage.remove("LOCAL_NOET")
			},
			// 单击 showNote 一条note
			toShowOneNote(note){
				//let _this = this
				this.$localStorage.set("LOCAL_NOET",JSON.stringify(note))
				this.page_flag = 6
				
			},
			findNoteByUId(){
				this.$get(this.API.API_NOTE_FINDBUUIDNOCONTENT,{
					uid:this.appUser.id
				}).then(res=>{
					if(res.code<0){
						return this.$message({
							type:res.type,
							message:res.msg
						})
					}
					this.notes = res.data
				})
			}
		}
	}
</script>

<style>
</style>
