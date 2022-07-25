<template>
	<div v-if="page_flag==2" id="EditNote">
		
		<div class="panel panel-success panel-edit">
			<div v-if="sNote && sNote!=null" class="clTime panel-body">
				<span class="pull-left">
					<label>上次更新时间：</label>{{fnote.lastUpdateTime}}
				</span>
				
				<span class="pull-right">
					<label>创建时间：</label>{{fnote.createTime}}
				</span>
			</div>
			<div class="panel-body">
				<input v-model="title" v-on:change="titleChange" maxlength="25" placeholder="请输入标题"/>
			</div>
			<div class="panel-body">
				<quill-editor class="content" v-model="content" ref="myNoteEditor" :options="editorOption"
					v-on:blur="onEditorBlur($event)" v-on:focus="onEditorFocus($event)" v-on:change="onEditorChange($event)">
				</quill-editor>
			</div>
			<div class="panel-body panel-note-footer">
				<div class="container-fluid">
					<!-- 编辑状态时的按钮 -->
					<div v-if="sNote && sNote!=null" class="row row-edit">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-btn">
							<button class="note-del-btn" type="button" v-on:click="removeNote"><i class="el-icon-delete"></i>删除</button>
						</div>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-btn">
							<button class="note-edit-btn" type="button" v-on:click="updateSave"><i class="el-icon-check"></i>修改</button>
						</div>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-btn">
							<button class="note-close-btn" type="button" v-on:click="closeEdit(1)"><i class="el-icon-close"></i>取消</button>
						</div>
					</div>
					<!-- 添加状态时的按钮 -->
					<div v-else class="row row-add">
						<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-btn">
							<button class="note-add-btn" type="button" v-on:click="addSave"><i class="el-icon-check"></i>添加</button>
						</div>
						<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-btn">
							<button class="note-close-btn" type="button" v-on:click="closeEdit(0)"><i class="el-icon-close"></i>取消</button>
						</div>
						
					</div>
				</div>
				
			</div>
		</div>
	</div>
	<div v-else>
		<MyNote v-if="page_flag==7"/>
	</div>
	
</template>

<script>
	export default {
		name: "EditNote",
		inject:['Note'],
		data() {
			return{
				editorOption:{
					modules: {
						toolbar: [
							['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
							['blockquote', 'code-block'],     //引用，代码块
							[{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
							[{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
							[{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
							[{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
							[{ 'direction': 'rtl' }],             // 文本方向
							[{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
							[{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
							[{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
							[{ 'font': [] }],     //字体
							[{ 'align': [] }],    //对齐方式
							['clean'],    //清除字体样式
							['link','image','video']    //上传图片、上传视频 （目前不支持）
						]
					},
					placeholder: "请输入正文",
					theme:"snow"
				},
				sNote: null,//
				fnote:{},
				title:'',
				content:'',
				page_flag:2
			}
		},
		computed: {
			editor() {
				return this.$refs.myNoteEditor.quill;
			}
		},
		created() {
			var storageNote = JSON.parse(this.$localStorage.get("LOCAL_NOET"))
			if (storageNote != null) {
				// 编辑状态
				this.sNote = storageNote
				this.findNoteById()
			}else{
				// 添加状态
				let sTempNote = JSON.parse(this.$localStorage.get("TEMP_ADD_NOTE"))
				if(sTempNote!=null){
					this.title = sTempNote.title
					this.content = sTempNote.content
				}
			}
		},
		methods: {
			onEditorReady(editor) { // 准备编辑器

			},
			// 内容改变事件
			onEditorChange(event){
				if(this.sNote==null){
					this.$localStorage.set("TEMP_ADD_NOTE",JSON.stringify({
						title:this.title,
						content:this.content
					}))
				}
				
			},
			titleChange(){
				if(this.sNote==null){
					this.$localStorage.set("TEMP_ADD_NOTE",JSON.stringify({
						title:this.title,
						content:this.content
					}))
				}
			},
			// 失去焦点事件
			onEditorBlur(event){
				
			},
			// 获得焦点事件
			onEditorFocus(event){
			},
			// 删除
			removeNote(){
				let _this = this
				layer.open({
					title: "提示",
					content: "确定删除吗？",
					skin: 'note-delete-check',
					btn: ['取消', '确定'],
					shade: 0,
					btn2:function(index, layero){
						_this.$post(_this.API.API_NOTE_DELETE,{
							id:_this.fnote.id,
							userId:_this.appUser.id
						}).then(res=>{
							if(res.code<0){
								return _this.$message({
									type:res.type,
									message:res.msg
								})
							}
							_this.Note()
							layer.msg(res.msg)
							_this.page_flag=7
						}).catch(error=>{
							alert(1)
							layer.msg('图片太大/多了！', {icon: 2});
						})
						return false
					}
				})
				
			},
			// 添加 save
			addSave(){
				if(this.title.trim() == ""){
					return layer.msg('标题不能为空！')
				}
				// if($('.ql-editor').text().trim() == ""){
				// 	return layer.msg('内容不能为空！')
				// }
				let index = layer.msg('加载中', {
				  icon: 16,
				  shade: 0.1,
				  time: 30000
				});
				this.$post(this.API.API_NOTE_ADD,{
					userId:this.appUser.id,
					title:this.title,
					content:this.content
				}).then(res=>{
					if(res.code<0){
						return this.$message({
							type:res.type,
							message:res.msg
						})
					}
					// 添加成功 将执行...
					this.Note()
					layer.msg(res.msg)
					this.page_flag=7
					this.$localStorage.remove("TEMP_ADD_NOTE")
					return layer.close(index)
				})
			},
			// 编辑 save
			updateSave(){
				let _this = this
				if(this.title.trim() == ""){
					return layer.msg('标题不能为空！')
				}
				// if($('.ql-editor').text().trim() == ""){
				// 	return layer.msg('内容不能为空！')PacketTooBigException
				// }
				layer.open({
					title: "提示",
					content: "确定修改吗？",
					skin: 'note-update-check',
					btn: ['取消', '确定'],
					shade: 0,
					btn2:function(index, layero){//确定
					let index1 = layer.msg('加载中', {
					  icon: 16,
					  shade: 0.1,
					  time: 30000
					});
					layer.close(index)//关闭
					_this.$post(_this.API.API_NOTE_UPDATE,{
						id:_this.fnote.id,
						userId:_this.fnote.userId,
						title:_this.title,
						content:_this.content
					}).then(res=>{
						if(res.code<0){
							return _this.$message({
								type:res.type,
								message:res.msg
							})
						}
						_this.Note()
						layer.msg("修改成功！")
						
						_this.page_flag=7
						layer.close(index1)
					})
					return false
					}
				}); 
				
			},
			// 根据id找笔记 (用于编辑)
			findNoteById() {
				//alert(1)
				let index = layer.msg('加载中', {
				  icon: 16,
				  shade: 0.1,
				  time: 30000
				});
				this.$post(this.API.API_NOTE_FINDONEBUID, {
					id: this.sNote.id,
					userId: this.sNote.userId
				}).then(res => {
					if (res.code < 0) {
						return this.$message({
							type: res.type,
							message: res.msg
						})
					}
					this.content = res.data.content
					this.title = res.data.title
					this.fnote = res.data
					return layer.close(index)
					//console.log(this.fnote)
				})
			},
			// 关闭编辑
			// isEdit 1:编辑 0:保存
			closeEdit(isEdit){
				// 暂时未用到 isEdit
				if(isEdit==0){
					this.$localStorage.remove("TEMP_ADD_NOTE")
				}
				// this.$localStorage.set("LOCAL_NOET",JSON.stringify(this.fnote))
				this.page_flag=7
			}
		}
	}
</script>

<style>
	@import url("../../assets/css/note.css");
</style>
