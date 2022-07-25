<template>
	<div id="NavType">
		<div class="row">
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 ">
				<label>名称：</label>
				<el-input v-model="tname" clearable placeholder="名称"></el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 ">
				<label>标签：</label>
				<el-input v-model="tlabel" clearable placeholder="名称"></el-input>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 col-btn" style="margin-top:24px;">
				<el-button icon="el-icon-refresh-right" v-on:click="reset">重置</el-button>
				<el-button type="primary" icon="el-icon-search" v-on:click="search">查询</el-button>
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
							<th>name</th>
							<th>标签</th>
							<th>labelColor</th>
							<th>tagColor</th>
							<th>排序</th>
							<th>录入时间</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(t,i) in atypes">
							<td>{{i+1}}</td>
							<td>{{t.id}}</td>
							<td>{{t.name}}</td>
							<td>{{t.label}}</td>
							<td><el-color-picker @change="colorChange($event,t.id,'label')" v-model="t.labelColor"></el-color-picker></td>
							<td><el-color-picker @change="colorChange($event,t.id,'tag')" v-model="t.tagColor"></el-color-picker></td>
							<td>{{t.atIndex}}</td>
							<td>{{t.createTime}}</td>
							<td class="text-center">
								<el-button type="warning" size="mini" v-on:click="findATById(t.id)">编辑</el-button>
								<el-button type="danger" size="mini" v-on:click="delAddressType(t.id,t.atIndex)">删除</el-button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- 弹框部分 -->
		<!-- 添加地址类型弹框 -->
		<el-dialog title="添加类型" :visible.sync="dialogAddForm">
			<el-form :model="addType">
				<el-form-item label="name" label-width="85px">
					<el-input v-model="addType.name" autocomplete="off" placeholder="name"
					maxlength="15"></el-input>
				</el-form-item>
				<el-form-item label="标签" label-width="85px">
					<el-input v-model="addType.label" autocomplete="off" placeholder="label"
					maxlength="5"></el-input>
				</el-form-item>
				<el-form-item label="labelColor" label-width="85px">
					<el-color-picker v-model="addType.labelColor"></el-color-picker>
				</el-form-item>
				<el-form-item label="tagColor" label-width="85px">
					<el-color-picker v-model="addType.tagColor"></el-color-picker>
				</el-form-item>
				<el-form-item label="排序" label-width="85px">
					<el-input v-model="addType.atIndex" autocomplete="off" placeholder="排序"
					oninput="value=value.replace(/[^\d]/g,'')" ></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogAddForm = false">取 消</el-button>
				<el-button type="primary" v-on:click="addSave">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 修改地址类型弹框 -->
		<el-dialog :title="'修改：'+findAT.label" :visible.sync="dialogEditForm">
			<el-form :model="findAT">
				<el-form-item label="name" label-width="85px">
					<el-input v-model="findAT.name" autocomplete="off" placeholder="name"
					maxlength="15"></el-input>
				</el-form-item>
				<el-form-item label="标签" label-width="85px">
					<el-input v-model="findAT.label" autocomplete="off" placeholder="label"
					maxlength="5"></el-input>
				</el-form-item>
				<el-form-item label="labelColor" label-width="85px">
					<el-color-picker v-model="findAT.labelColor"></el-color-picker>
				</el-form-item>
				<el-form-item label="tagColor" label-width="85px">
					<el-color-picker v-model="findAT.tagColor"></el-color-picker>
				</el-form-item>
				<el-form-item label="排序" label-width="85px">
					<el-input v-model="findAT.atIndex" autocomplete="off" placeholder="排序"
					oninput="value=value.replace(/[^\d]/g,'')" ></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditForm = false">取 消</el-button>
				<el-button type="primary" v-on:click="editSave">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		name:'',
		data() {
			return{
				tname:'',
				tlabel:'',
				dialogAddForm:false,
				dialogEditForm:false,
				atypes:[],
				addType:{
					name:'',
					label:'',
					labelColor:null,
					tagColor:null,
					atIndex:0
				},
				findAT:{}//用于修改的地址类型对象
			}
		},
		created() {
			this.search()
		},
		methods:{
			// 编辑保存
			editSave(){
				if(this.findAT.name.trim()===""||this.findAT.name==null||
					this.findAT.label.trim()===""||this.findAT.label==null||
					this.findAT.atIndex===""||this.findAT.atIndex==null){
					return this.$message.warning("请将必填字段填写完整！")
				}
				this.$apost(this.AAPI.API_ADMIM_ADDRESSTYPE_UPDATE,{
					name:this.findAT.name,
					label:this.findAT.label,
					labelColor:this.findAT.labelColor,
					tagColor:this.findAT.tagColor,
					atIndex:this.findAT.atIndex,
					id:this.findAT.id
				}).then(res=>{
					if(res.code<0){
						this.$message({
							type: res.type,
							message: res.msg
						});
					}
					layer.msg(res.msg)
					this.dialogEditForm = false
					this.search()
				})
			},
			// 打开编辑弹框，同时根据id查找地址类型
			findATById(id){
				this.$aget(this.AAPI.API_ADMIN_ADDRESSTYPE_ONE,{
					tid:id
				}).then(res=>{
					this.findAT = res
					this.dialogEditForm = true
				})
				
			},
			// 删除地址
			delAddressType(id,i){
				this.$confirm('该类型下可能还有导航地址，删除类型将把对应的地址连同删除，确认删除？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$apost(this.AAPI.API_ADMIN_ADDRESSTYPE_DELETE,{
						id:id,
						atIndex:i
					}).then(res=>{
						if(res.code<0){
							this.$message({
								type: res.type,
								message: res.msg
							});
						}
						layer.msg(res.msg)
						this.search()
					})
				}).catch(() => {/* 取消回调 **/});
			},
			// 添加保存
			addSave(){
				if(this.addType.name.trim()===""||this.addType.name==null||
					this.addType.label.trim()===""||this.addType.label==null||
					this.addType.atIndex==null){
					return this.$message.warning("请将必填字段填写完整！")
				}
				this.$apost(this.AAPI.API_ADMIN_ADDRESSTYPE_INSERT,{
					name:this.addType.name,
					label:this.addType.label,
					labelColor:this.addType.labelColor,
					tagColor:this.addType.tagColor,
					atIndex:this.addType.atIndex
				}).then(res=>{
					if(res.code<0){
						return this.$message({
							type: res.type,
							message: res.msg
						})
					}
					layer.msg(res.msg)
					this.dialogAddForm=false
					this.reset()
				})
			},
			// 表格 label color 改变事件 
			// event 就是颜色值（16进制颜色值）
			colorChange(event,id,mark){
				//console.log(event,id,mark)
				this.$apost(this.AAPI.API_ADMIN_ADDRESSTYPE_UPDATE_COLOE,{
					labelColor:event,
					tagColor:event,
					id:id,
					mark:mark
				}).then(res=>{
					if(res.code<0){
						return this.$message({
							type: res.type,
							message: res.msg
						})
					}
					layer.msg(res.msg)
					//this.search()
				})
			},
			// 搜索或查询
			search(){
				this.$aget(this.AAPI.API_ADMIN_ADDRESSTYPE_FINDLIST,{
					n:this.tname,
					l:this.tlabel
				}).then(res=>{
					if(res.code!=null && res.code<0){
						return this.$message({
							type: res.type,
							message: res.msg
						})
					}
					this.atypes = res
				})
			},
			// 重置
			reset(){
				this.tname=''
				this.tlabel=''
				this.$nextTick(function() {
					this.search()
				})
			}
		}
	}
</script>

<style>
	#NavType .row-table{
		margin-top: 20px;
	}
</style>
