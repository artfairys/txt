<!-- 未启用 -->
<template>
	<div v-if="page_flag==6" id="ShowNote">
		<div class="panel panel-success panel-shownote-main">
			<div class=" panel-heading">
				<h3><i class="el-icon-tickets"></i>
					{{fnote.title}}
					<b class="pull-right">
						<el-popconfirm v-on:confirm="removeNote"
							title="确定删除吗？" icon-color="red"
							confirm-button-type="danger" icon="el-icon-delete">
							
							<a slot="reference" title="删除" href="javascript:void(0)">
								<i class="el-icon-delete el-icon-delete-note"></i>
							</a>
						</el-popconfirm>
						<a title="我的笔记" href="javascript:void(0)"v-on:click="page_flag=7">
							<i class="el-icon-menu"></i>
						</a>
						
						<a title="编辑" href="javascript:void(0)" v-on:click="toEditNote()">
							<i class="el-icon-edit"></i>
						</a>
						
					</b>
				</h3>
			</div>
			<div class="panel-body">
				<p class="note-time">
					创建时间：{{fnote.createTime}}<br />上次更新时间：{{fnote.lastUpdateTime}}
				</p>
				<el-divider></el-divider>
				<div class="note-content ql-editor" v-html="fnote.content"></div>
			</div>
		</div>
	</div>
	<div class="#editOpen" v-else>
		<MyNote v-if="page_flag==7"/>
		<EditNote v-if="page_flag==2" />
	</div>
</template>

<script>
	export default {
		name: "ShowNote",
		inject:['Note'],
		data() {
			return {
				sNote: {},
				fnote: {},
				page_flag:6//默认6 show note
			}
		},
		provide() {
			return {
				// 右边方法不能写括号
				reNote: this.findNoteById
			}
		},
		created() {
			var storageNote = JSON.parse(this.$localStorage.get("LOCAL_NOET"))
			if (storageNote != null) {
				this.sNote = storageNote
				this.findNoteById(storageNote)
			}
		},
		methods: {
			// 删除
			removeNote(){
				this.$post(this.API.API_NOTE_DELETE,{
					id:this.fnote.id,
					userId:this.appUser.id
				}).then(res=>{
					if(res.code<0){
						return this.$message({
							type:res.type,
							message:res.msg
						})
					}
					this.Note()
					layer.msg(res.msg)
					this.page_flag=7
				})
			},
			// 去编辑
			toEditNote(){
				this.page_flag=2
				this.$localStorage.set("LOCAL_NOET",JSON.stringify(this.fnote))
			},
			findNoteById(storNote) {
				let index = layer.msg('加载中', {
				  icon: 16,
				  shade: 0.1,
				  time: 30000
				});
				this.$post(this.API.API_NOTE_FINDONEBUID, {
					id: this.sNote.id,
					userId: this.appUser.id
				}).then(res => {
					if (res.code < 0) {
						return this.$message({
							type: res.type,
							message: res.msg
						})
					}
					this.fnote = res.data
					return layer.close(index)
					//console.log(this.fnote)
				})
			}
		}
	}
</script>

<style>
	@import url("../../assets/css/note.css");
</style>
