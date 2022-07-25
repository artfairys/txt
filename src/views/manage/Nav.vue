<template>
	<div id="manageNavs">
		<div class="row">
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 ">
				<label>名称：</label>
				<el-input v-model="aname" clearable placeholder="名称"></el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-1 ">
				<label class="">类型：</label>
				<el-select v-model="selTypeId" placeholder="请选择" clearable>
					<el-option v-for="at in atList" :key="at.value" :label="at.label" :value="at.id">
					</el-option>
				</el-select>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-1 ">
				<label class="">状态：</label>
				<el-select v-model="state" placeholder="请选择" clearable>
					<el-option label="未启用" value=0></el-option>
					<el-option label="启用" value=1></el-option>
				</el-select>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 ">
				<label class="">URL：</label>
				<el-input v-model="aURL" clearable placeholder="URL"></el-input>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 col-btn">
				<el-button icon="el-icon-refresh-right" v-on:click="reset">重置</el-button>
				<el-button type="primary" icon="el-icon-search" v-on:click="search(1,20)">查询</el-button>
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
							<th>名称</th>
							<th>类型</th>
							<th>标题</th>
							<th>scontent</th>
							<th>hcontent</th>
							<th>状态</th>
							<th>isrequest</th>
							<th>url</th>
							<th>
								<a href="javascript:void(0)" v-on:click="addressList.reverse()">录入时间
									<i class="el-icon-sort"></i></a>
							</th>
							<th>
								操作
							</th>
						</tr>

					</thead>
					<tbody>
						<tr v-for="(address,i) in addressList" :title="address.name">
							<td>{{i+1}}</td>
							<td>{{address.id}}</td>
							<td>{{address.name}}</td>

							<td>{{address.type.label}}</td>
							<td>{{address.title}}</td>
							<td>{{address.scontent}}</td>
							<td>{{address.hcontent}}</td>
							<!-- {{address.flag | parseState}} -->
							<td>
								<input class="el-checkbox" type="checkbox" :checked="address.flag==1"
									@change="stateChange($event,address.id)" />
							</td>
							<td>{{address.isRequest}}</td>
							<td>
								<a target="_blank" :href="address.url">{{address.url}}</a>
							</td>
							<td>{{address.createTime}}</td>
							<td class="text-center">
								<el-button type="warning" size="mini" v-on:click="findById(address.id)">编辑</el-button>
								<el-button type="danger" size="mini" v-on:click="delById(address.id)">删除</el-button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="pull-right">
					<!-- :pager-count="6" 超过某页码数隐藏按钮 -->
					<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
						:current-page="page" :page-sizes="[20, 35, 60, 90]" :page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>

			</div>
		</div>
		<!-- 弹框部分 -->
		<!-- 用于添加的弹框 -->
		<el-dialog title="添加网址" :visible.sync="dialogAddForm">
			<el-form :model="addNetwork">
				<el-form-item label="名称" label-width="80px">
					<el-input v-model="addNetwork.name" autocomplete="off" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item label="类型" label-width="80px">
					<el-select v-model="addNetwork.typeId" placeholder="请选择" clearable>
						<el-option v-for="at in atList" :key="at.value" :label="at.label" :value="at.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="标题" label-width="80px">
					<el-input v-model="addNetwork.title" autocomplete="off" placeholder="标题"></el-input>
				</el-form-item>
				<el-form-item label="scontent" label-width="80px">
					<el-input v-model="addNetwork.scontent" autocomplete="off" placeholder="scontent"></el-input>
				</el-form-item>
				<el-form-item label="hcontent" label-width="80px">
					<el-input v-model="addNetwork.hcontent" autocomplete="off" placeholder="hcontent"></el-input>
				</el-form-item>
				<el-form-item label="isrequest" label-width="80px">
					<el-select v-model="addNetwork.isrequest" placeholder="请选择" clearable>
						<el-option label="0" value=0></el-option>
						<el-option label="1" value=1></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态" label-width="80px">
					<el-select v-model="addNetwork.state" placeholder="请选择(未选=未启用)" clearable>
						<el-option v-for="(s,i) in states" :label="s.text" :value="s.state"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="网址" label-width="80px">
					<el-input v-model="addNetwork.url" autocomplete="off" placeholder="url"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogAddForm = false">取 消</el-button>
				<el-button type="primary" @click="addSave">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 用于修改的弹框 -->
		<el-dialog :title="'编辑 ：'+updateNetwork.name" :visible.sync="dialogEditForm">
			<el-form :model="updateNetwork">
				<el-form-item label="名称" label-width="80px">
					<el-input v-model="updateNetwork.name" autocomplete="off" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item label="类型" label-width="80px">
					<el-select v-model="updateNetwork.typeId" placeholder="请选择" clearable>
						<el-option v-for="at in atList" :key="at.value" :label="at.label" :value="at.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="标题" label-width="80px">
					<el-input v-model="updateNetwork.title" autocomplete="off" placeholder="标题"></el-input>
				</el-form-item>
				<el-form-item label="scontent" label-width="80px">
					<el-input v-model="updateNetwork.scontent" autocomplete="off" placeholder="scontent"></el-input>
				</el-form-item>
				<el-form-item label="hcontent" label-width="80px">
					<el-input v-model="updateNetwork.hcontent" autocomplete="off" placeholder="hcontent"></el-input>
				</el-form-item>
				<el-form-item label="isrequest" label-width="80px">
					<el-select v-model="updateNetwork.isRequest" placeholder="请选择" clearable>
						<el-option label="0" value=0></el-option>
						<el-option label="1" value=1></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态" label-width="80px">
					<el-select v-model="updateNetwork.flag" placeholder="请选择(未选=未启用)" clearable>
						<el-option v-for="(s,i) in states" :label="s.text" :value="s.state"></el-option>
						<!-- <el-option label="启用" value=1></el-option> -->
					</el-select>
				</el-form-item>
				<el-form-item label="网址" label-width="80px">
					<el-input v-model="updateNetwork.url" autocomplete="off" placeholder="url"></el-input>
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
	export default {
		name: 'manageNavs',
		data() {
			return {
				atList: [],
				selTypeId: '',
				state: '',
				aname: '',
				aURL: '',
				addressList: [],
				page: 1,
				pageSize: 20,
				total: 0,
				dialogAddForm: false, //控制添加弹框
				dialogEditForm: false, //控制修改弹框
				addNetwork: { //添加用。。。
					name: '',
					typeId: '',
					title: '',
					scontent: '',
					hcontent: '',
					state: '',
					url: '',
					isrequest: 1
				},
				updateNetwork: {},
				states:[{
					state:0,
					text:'未启用'
				},{
					state:1,
					text:'启用'
				}]

			}
		},
		created() {
			this.allAddressType()
			this.search(this.page, this.pageSize)
		},
		methods: {
			// 删除
			delById(id) {
				this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$apost(this.AAPI.API_ADMIN_ADDRESS_DELETE,{
						id:id
					}).then(res=>{
						if(res.code<0){
							this.$message({
								type: res.type,
								message: res.msg
							});
						}
						layer.msg(res.msg)
						this.search(this.page,this.pageSize)
					})
				}).catch(() => {/* 取消回调 **/});
			},
			// 根据id找网址 用于编辑 打开弹框
			findById(id) {
				this.$aget(this.AAPI.API_ADMIN_ADDRESS_ONE, {
					id: id
				}).then(res => {
					//res.flag = res.flag == 1 ? '启用' : '未启用'

					this.updateNetwork = res
					//console.log(this.updateNetwork.flag)
					this.dialogEditForm = true
				})
			},
			// 修改保存
			editSave() {
				if (this.updateNetwork.name.trim() == "" ||
					this.updateNetwork.typeId == 0 || this.updateNetwork.typeId == "" ||
					//this.updateNetwork.flag == "" ||
					this.updateNetwork.url.trim() == "") {
					return this.$message.warning("请将必填字段填写完整！")
				}
				//console.log(this.updateNetwork)
				//return
				this.$apost(this.AAPI.API_ADMIN_ADDRESS_UPDATE_ALL, {
					name: this.updateNetwork.name,
					typeId: this.updateNetwork.typeId,
					title: this.updateNetwork.title,
					scontent: this.updateNetwork.scontent,
					hcontent: this.updateNetwork.hcontent,
					flag: this.updateNetwork.flag,
					isRequest: this.updateNetwork.isRequest,
					url: this.updateNetwork.url,
					id: this.updateNetwork.id
				}).then(res => {
					if (res.code < 0) {
						return this.$message({
							type: res.type,
							message: res.msg
						})
					}
					this.updateNetwork = {}
					this.dialogEditForm = false
					//this.reset()
					this.search(this.page,this.pageSize)
					layer.msg(res.msg)

				})

			},
			// 添加保存
			addSave() {
				console.log(this.addNetwork)
				if (this.addNetwork.name.trim() == "" ||
					this.addNetwork.typeId == 0 || this.addNetwork.typeId == "" ||
					this.addNetwork.state === "" ||
					this.addNetwork.url.trim() == "") {
					return this.$message.warning("请将必填字段填写完整！")
				}
				this.$apost(this.AAPI.API_ADMIN_ADDRESS_INSERT, {
					name: this.addNetwork.name,
					typeId: this.addNetwork.typeId,
					title: this.addNetwork.title,
					scontent: this.addNetwork.scontent,
					hcontent: this.addNetwork.hcontent,
					flag: this.addNetwork.state,
					isRequest: this.addNetwork.isrequest == "" ? 1 : this.addNetwork.isrequest,
					url: this.addNetwork.url
				}).then(res => {
					if (res.code < 0) {
						return this.$message({
							type: res.type,
							message: res.msg
						})
					}
					this.emptyAddNetWork()
					this.dialogAddForm = false
					this.reset()
					layer.msg(res.msg)
				})
			},
			// 修改状态
			stateChange(event, val) {

				//console.log(event,val)
				this.$apost(this.AAPI.API_ADMIN_ADDRESS_UPDATE_STATE, {
					flag: event.srcElement.checked ? 1 : 0,
					id: val
				}).then(res => {
					if (res.code < 0) {
						return this.$message({
							type: res.type,
							message: res.msg
						})
					}
					this.search(this.page,this.pageSize)
					layer.msg(res.msg)
				})

			},
			// pageSize改变
			handleSizeChange(val) {
				this.search(this.page, val)
				this.pageSize = val

			},
			// 当前页码改变
			handleCurrentChange(val) {
				this.page = val
				this.search(val, this.pageSize)
				// console.log(this.pageSize)
			},
			search(p, ps) {
				this.$apost(this.AAPI.API_ADMIN_ADDRESS_LIST, {
					name: this.aname,
					typeId: this.selTypeId,
					flag: this.state,
					url: this.aURL,
					page: p,
					pageSize: ps
				}).then(res => {
					if(res.code!=null && res.code<0){
						return this.$message({
							type: res.type,
							message: res.msg
						})
					}
					if (this.aname != '' || this.selTypeId != '' || this.state != '' || this.aURL != '') {
						this.addressList = res.data.list
						this.total = res.data.list.length
					}
					this.addressList = res.data.list
					this.total = res.data.count

				})
			},
			reset() {
				this.aname = ""
				this.selTypeId = ""
				this.state = ""
				this.aURL = ""
				this.$nextTick(function() {
					this.search(1, 20)
				})
			},
			allAddressType() {
				this.$aget(this.AAPI.API_ADMIN_ADDRESSTYPE_LIST).then(res => {
					this.atList = res
				})
			},
			emptyAddNetWork() {
				this.addNetwork.name = ""
				this.addNetwork.typeId = ""
				this.addNetwork.title = ""
				this.addNetwork.scontent = ""
				this.addNetwork.hcontent = ""
				this.addNetwork.state = ""
				this.addNetwork.isrequest = ""
				this.addNetwork.url = ""
			}
			// emptyUpdateNetwork(){
			// 	this.updateNetwork.name = "" 
			// 	this.updateNetwork.typeId = "" 
			// 	this.updateNetwork.title = "" 
			// 	this.updateNetwork.scontent = "" 
			// 	this.updateNetwork.hcontent = "" 
			// 	this.updateNetwork.state = "" 
			// 	this.updateNetwork.isrequest = "" 
			// 	this.updateNetwork.url = "" 
			// }
		},
		filters: {
			parseState(value) {
				return value == 1 ? '启用' : '未启用'
			}
		}
	}
</script>

<style>
	#manageNavs .row .col-btn{
		margin-top: 24px;
	}
	#manageNavs .row-table {
		margin-top: 20px;
	}
</style>
