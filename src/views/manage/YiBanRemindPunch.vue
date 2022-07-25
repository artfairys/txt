<template>
	<div id="YiBanRemindPunch">
		<!-- 自定义发送邮箱内容（详情）部分 -->
		<div class="row">
			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 ">
				<label>主题/标题：</label>
				<el-input v-model="EmailDetails.subject" placeholder="主题/标题" type="textarea"></el-input>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 ">
				<label>内容：</label>
				<el-input v-model="EmailDetails.text" placeholder="内容" type="textarea"></el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 padding-top-20">
				<el-button v-on:click="saveEmailDetails" class="">保存</el-button>
			</div>
		</div>
		<!-- 搜索用户部分 -->
		<div class="row">
			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 ">
				<label>名称：</label>
				<el-input v-model="selectUser.name" clearable placeholder="名称" maxlength="5"></el-input>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 ">
				<label>邮箱：</label>
				<el-input v-model="selectUser.email" clearable placeholder="邮箱"></el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-1 ">
				<label>状态：</label>
				<el-select v-model="selectUser.isOpen" clearable placeholder="状态">
					<el-option v-for="s in states" :value="s.key" :label="s.text"></el-option>
				</el-select>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-3 padding-top-20">
				<el-button icon="el-icon-refresh-right" v-on:click="reset">重置</el-button>
				<el-button type="primary" icon="el-icon-search" v-on:click="query">查询</el-button>
				<el-button type="success" icon="el-icon-circle-plus-outline" v-on:click="dialogAddForm=true">添加</el-button>
			</div>
		</div>
		<!-- 用户列表部分 -->
		<div class="row row-table margin-top-20">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
				<table class="table table-bordered table-hover table-condensed">
					<thead>
						<tr>
							<th>序号</th>
							<th>id</th>
							<th>名称</th>
							<th>邮箱</th>
							<th>状态</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(u,i) in users">
							<td>{{i+1}}</td>
							<td>{{u.id}}</td>
							<td>{{u.name}}</td>
							<td>{{u.email}}</td>
							<td>
								<el-switch v-model="u.isOpen==1" active-color="#13ce66" disabled>
								</el-switch>
							</td>
							<td class="text-center" width="180">
								<el-button type="warning"size="mini" @click="openEditForm(u.id)">编辑</el-button>
								<el-button type="danger"size="mini" @click="remove(u.id)">删除</el-button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- 弹框部分 -->
		<!-- 用于添加的弹框 -->
		<el-dialog title="添加用户" :visible.sync="dialogAddForm">
			<el-form :model="addUser">
				<el-form-item label="名称" label-width="80px">
					<el-input v-model="addUser.name" autocomplete="off" placeholder="名称" clearable maxlength="5"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" label-width="80px">
					<el-input v-model="addUser.email" autocomplete="off" placeholder="邮箱" clearable></el-input>
				</el-form-item>
				<el-form-item label="状态" label-width="80px">
					<el-select v-model="addUser.isOpen">
						<el-option v-for="s in states" :value="s.key" :label="s.text"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogAddForm = false">取 消</el-button>
				<el-button type="primary" @click="addSave">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 用于编辑的弹框 -->
		<el-dialog :title="'正在编辑:'+editUser.name" :visible.sync="dialogEditForm">
			<el-form :model="editUser">
				<el-form-item label="名称" label-width="80px">
					<el-input v-model="editUser.name" autocomplete="off" placeholder="名称" clearable maxlength="5"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" label-width="80px">
					<el-input v-model="editUser.email" autocomplete="off" placeholder="邮箱" clearable></el-input>
				</el-form-item>
				<el-form-item label="状态" label-width="80px">
					<el-select v-model="editUser.isOpen">
						<el-option v-for="s in states" :value="s.key" :label="s.text"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditForm = false">取 消</el-button>
				<el-button type="primary" @click="editSave">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		name:'YiBanRemindPunch',
		data() {
			return{
				dialogAddForm:false,
				dialogEditForm:false,
				addUser:{
					name:'',
					email:'',
					isOpen:1
				},
				editUser:{},
				EmailDetails:{
					subject:'',
					text:''
				},
				selectUser:{
					name:'',
					email:'',
					isOpen:null
				},
				users:[],
				states:[{
					key:0,
					text:'关闭'
				},{
					key:1,
					text:'开启'
				}]
			}
		},
		created:function(){
			this.getEmailDetails()
			this.query()
		},
		methods:{
			// 删除
			remove(id){
				this.$confirm('该操作将会永久删除数据库该条记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$apost(this.AAPI.API_ADMIN_YIBAN_REMOVEUSER, {
						id: id
					}).then(res => {
						if (res.code < 0) {
							return this.$message({
								type: res.type,
								message: res.msg
							})
						}
						this.$message({type:res.type,message:res.msg}) 
						this.query()
					})
				}).catch(() => {
					/* 取消回调 **/ });
			},
			editSave(){
				let emailModel = /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/
				if(!this.editUser.name || this.editUser.name.trim()==''||
					!this.editUser.email || this.editUser.email.trim()==''){
					return this.$message.warning("请填写完整！")
				}else if(!emailModel.test(this.editUser.email)){
					return this.$message.warning("邮箱格式错误！")
				}else{
					this.$apost(this.AAPI.API_ADMIN_YIBAN_UPDATEUSER,{
						id:this.editUser.id,
						name:this.editUser.name,
						email:this.editUser.email.trim(),
						isOpen:this.editUser.isOpen
					}).then(res=>{
						if(res.code<0){
							return this.$message({
								type:res.type,
								message:res.msg
							}) 
						}
						this.$message({type:res.type,message:res.msg}) 
						this.query()
						this.dialogEditForm=false
					})
				}
			},
			// 打开编辑窗口
			openEditForm(id){
				this.$aget(this.AAPI.API_ADMIN_YIBAN_FINDBYID+"/"+id).then(res=>{
					if(res.code<0){
						return this.$message({
							type:res.type,
							message:res.msg
						}) 
					}
					this.editUser = res.data
					this.dialogEditForm=true
				})
			},
			// 添加保存
			addSave(){
				let emailModel = /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/
				if(!this.addUser.name || this.addUser.name.trim()==''||
					!this.addUser.email || this.addUser.email.trim()==''){
					return this.$message.warning("请填写完整！")
				}else if(!emailModel.test(this.addUser.email)){
					return this.$message.warning("邮箱格式错误！")
				}else{
					this.$apost(this.AAPI.API_ADMIN_YIBAN_ADDUSER,{
						name:this.addUser.name,
						email:this.addUser.email.trim(),
						isOpen:this.addUser.isOpen
					}).then(res=>{
						if(res.code<0){
							return this.$message({
								type:res.type,
								message:res.msg
							})
						}
						this.addUser.name=''
						this.addUser.email=''
						this.$message({type:res.type,message:res.msg})
						this.dialogAddForm=false
						this.reset()
					})
				}
			},
			
			// 获取/查询用户
			query(){
				this.$aget(this.AAPI.API_ADMIN_YIBAN_QUERYUSER,{
					name:this.selectUser.name,
					email:this.selectUser.email,
					isOpen:this.selectUser.isOpen
				}).then(res=>{
					this.users=res.data
				})
			},
			// 保存发送邮箱详情
			saveEmailDetails(){
				if(!this.EmailDetails.subject || this.EmailDetails.subject.trim()==''){
					return this.$message.warning("主题不能为空")
				}
				this.$apost(this.AAPI.API_ADMIN_YIBAN_UPDATEEMAILDETAILS,{
					subject:this.EmailDetails.subject,
					text:this.EmailDetails.text
				}).then(res=>{
					// 这里更新后不需要刷新，所有不做判断
					return this.$message({
						type:res.type,
						message:res.msg
					})
				})
			},
			// 获取邮箱详情
			getEmailDetails(){
				this.$aget(this.AAPI.API_ADMNI_YIBAN_EMAILDETAILS).then(res=>{
					this.EmailDetails = res.data
				})
			},
			reset(){
				this.selectUser.name=''
				this.selectUser.email=''
				this.selectUser.isOpen=null
				this.$nextTick(function() {
					this.query()
				})
			}
		}
	}
</script>

<style>
	.padding-top-20{
		padding-top: 24px;
	}
	.margin-top-20{
		margin-top:20px
	}
</style>
