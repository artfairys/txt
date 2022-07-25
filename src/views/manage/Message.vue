<template>
	<div id="MessageManage">
		<div class="row">
			<div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 ">
				<label>ID：</label>
				<el-input v-model="msgId" clearable placeholder="ID" oninput="value=value.replace(/[^\d]/g,'')">
				</el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 ">
				<label>UID：</label>
				<el-input v-model="uId" clearable placeholder="UID" oninput="value=value.replace(/[^\d]/g,'')">
				</el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 ">
				<label>源ID：</label>
				<el-input v-model="sid" clearable placeholder="源ID" oninput="value=value.replace(/[^\d]/g,'')">
				</el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 ">
				<label>父级ID：</label>
				<el-input v-model="rid" clearable placeholder="父级ID" oninput="value=value.replace(/[^\d]/g,'')">
				</el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 ">
				<label>昵称：</label>
				<el-input v-model="nickName" clearable placeholder="昵称"></el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 ">
				<label>留言：</label>
				<el-input v-model="msg" clearable placeholder="留言"></el-input>
			</div>

			<div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 ">
				<label>邮箱：</label>
				<el-input v-model="email" clearable placeholder="邮箱"></el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 ">
				<label>网站：</label>
				<el-input v-model="netWork" clearable placeholder="网站"></el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 ">
				<label>IP：</label>
				<el-input v-model="IP" clearable placeholder="IP"></el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-2 col-lg-1 ">
				<label>状态：</label>
				<el-select v-model="flag" clearable>
					<el-option v-for="(s,i) in state" :label="s.text" :value="s.flag" :key="i"></el-option>
				</el-select>
				<!-- <el-input v-model="flag" clearable placeholder="状态"></el-input> -->
			</div>
			<div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 col-btn pull-right">
				<el-button icon="el-icon-refresh-right" size="mini" v-on:click="reset">重置</el-button>
				<el-button type="primary" size="mini" icon="el-icon-search" v-on:click="search">查询</el-button>

			</div>
		</div>
		<div class="row row-table">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
				<table class="table table-bordered table-hover table-condensed">
					<thead>
						<tr>
							<th>序号</th>
							<th>ID</th>
							<th>UID</th>
							<th>头像</th>
							<th>昵称</th>
							<th>邮箱</th>
							<th>网站</th>
							<th width="500">留言</th>
							<th>IP</th>
							<th>留言时间</th>
							<th>源id</th>
							<th>父级id</th>
							<th>
								<a href="javascript:void(0)" v-on:click="msgs.msgList.reverse()">录入时间
									<i class="el-icon-sort"></i></a>
							</th>
							<th>状态</th>
							<th>
								操作
							</th>
						</tr>

					</thead>
					<tbody>
						<tr v-for="(msg,i) in msgs.msgList">
							<td>{{i+1}}</td>
							<td>{{msg.id}}</td>
							<td>{{msg.uid}}</td>
							<td>
								<img :src="msg.msgFace" class="img-responsive u-face img-circle" />
							</td>
							<td>{{msg.msgNickName}}</td>
							<td>{{msg.msgEmail}}</td>
							<td>{{msg.network}}</td>
							<td>{{msg.context}}</td>
							<td>{{msg.ip}}</td>
							<td>{{msg.createTime}}</td>
							<td>{{msg.sourceMsgId}}</td>
							<td>{{msg.replyId}}</td>
							<td>{{msg.createTime}}</td>
							<td>
								<!-- <input class="el-checkbox" type="checkbox" :checked="msg.flag==1"
									@change="stateChange($event,msg.id)" disabled="disabled" /> -->
								<el-switch v-model="msg.flag==1" active-color="#13ce66" disabled>
								</el-switch>
							</td>
							<td class="text-center">
								<el-button type="danger" size="mini" v-on:click="delById(msg)">删除</el-button>
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
						:page-count="Math.ceil(msgs.msgCount / 20)">
					</el-pagination>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'MessageManage',
		data() {
			return {
				page: 1,
				pageSize: 20,
				msgs: {},
				msgId: null,
				uId: null,
				sid: null, //源
				rid: null, //父
				nickName: '',
				msg: '',
				email: '',
				netWork: '',
				IP: '',
				flag: null,
				state: [{
					flag: null,
					text: '全部'
				}, {
					flag: 0,
					text: '无效'
				}, {
					flag: 1,
					text: '生效'
				}]
			}
		},
		created() {
			this.search()
		},
		methods: {
			// 删除
			delById(msg) {
				this.$confirm('删除留言会将对其回复的留言也连同删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$apost(this.AAPI.API_ADMIN_MESSAGE_REMOVE, {
						id: msg.id,
						replyId: msg.replyId,
						sourceMsgId: msg.sourceMsgId
					}).then(res => {
						if (res.code < 0) {
							return this.$message({
								type: res.type,
								message: res.msg
							})
						}
						layer.msg(res.msg)
						this.search()
					})
				}).catch(() => {
					/* 取消回调 **/ });

			},
			stateChange(e, msgId) {
				console.log(e.srcElement.checked, msgId)
			},
			pageChange(val) {
				this.page = val
				this.$nextTick(function() {
					this.search()
				})
			},
			search() {
				this.$apost(this.AAPI.API_ADMIN_MESSAGE_LIST, {
					id: this.msgId,
					uid: this.uId,
					replyId: this.rid,
					sourceMsgId: this.sid,
					msgNickName: this.nickName,
					msgEmail: this.email,
					network: this.netWork,
					context: this.msg,
					ip: this.IP,
					flag: this.flag,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					this.msgs = res
				})
			},
			reset() {
				this.msgId = null
				this.uId = null
				this.sid = null
				this.rid = null
				this.nickName = ''
				this.email = ''
				this.netWork = ''
				this.msg = ''
				this.IP = ''
				this.flag = null
				this.page = 1
				this.pageSize = 20
				this.$nextTick(function() {
					this.search()
				})
			}
		},
		filters: {
			checkState(val) {
				return val == 1 ? '有效' : '无效'
			}
		}
	}
</script>

<style>
	#MessageManage .row .col-btn {
		margin-top: 6px;
		/* 	padding: 0px; */
	}

	#MessageManage .row .col-btn button {
		/* 	margin-left: 0px; */
		height: 40px;
	}

	#MessageManage .row-table {
		margin-top: 20px;
	}

	#MessageManage .row-table table .u-face {
		max-width: 45px;
	}
</style>
