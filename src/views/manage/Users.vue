<template>
	<div id="manageUsers">
		<div class="row">
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 ">
				<label>UID：</label>
				<el-input v-model="id" clearable placeholder="UID" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 ">
				<label>MID：</label>
				<el-input v-model="mid" clearable placeholder="MID"></el-input>
			</div>
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 ">
				<label>昵称：</label>
				<el-input v-model="nickName" clearable placeholder="昵称"></el-input>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 col-btn" style="margin-top:24px;">
				<el-button icon="el-icon-refresh-right" v-on:click="reset">重置</el-button>
				<el-button type="primary" icon="el-icon-search" v-on:click="search">查询</el-button>
			</div>
		</div>
		<div class="row row-table">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
				<table class="table table-bordered table-hover table-condensed">
					<thead>
						<tr>
							<th>序号</th>
							<th>UID</th>
							<th>MID</th>
							<th>头像</th>
							<th>昵称</th>
							<th>性别</th>
							<th>个性签名</th>
							<th>注册时间</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(u,i) in Users">
							<td>{{i+1}}</td>
							<td>{{u.id}}</td>
							<td>{{u.mid}}</td>
							<td width="70">
								<div v-if="u.face"><img :src="u.face" class="img-responsive img-circle u-face" /></div>
								<div v-else>随机</div>
							</td>
							<td>{{u.nickName}}</td>
							<td>{{u.sex | checkSex}}</td>
							<td>{{u.sign}}</td>
							<td>{{u.createTime}}</td>
							<td class="text-center">
								<el-button type="danger" size="mini" v-on:click="delUser(u.id)">删除</el-button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- 弹框部分 -->
	</div>
</template>

<script>
	export default {
		name: 'manageUsers',
		data() {
			return {
				Users: [],
				id: null,
				mid: "",
				nickName: "",
				dialogEditForm: false,
				findUser: {},
			}
		},
		created() {
			this.search()
		},
		methods: {
			// 删除用户
			delUser(id) {

			},
			// 根据uid查询用户，用于打开编辑
			findUserById(id) {

			},
			search() {
				this.$apost(this.AAPI.API_ADMIN_USER_LIST, {
					id: this.id,
					mid: this.mid,
					nickName: this.nickName
				}).then(res => {
					if(res.code!=null && res.code<0){
						return this.$message({
							type: res.type,
							message: res.msg
						})
					}
					this.Users = res;
				})
			},
			reset() {
				this.id = null
				this.mid = ''
				this.nickName = ''
				this.$nextTick(function() {
					this.search()
				})
			}
		},
		filters: {
			checkSex(val) {
				return val == 1 ? '男' : val == 0 ? '女' : '保密'
			}
		}
	}
</script>

<style>
	#manageUsers .row-table {
		margin-top: 20px;
	}
	/* #manageUsers .row-table tbody .u-face{
		max-width: 5vw;
	} */
</style>
