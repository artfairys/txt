<template>
	<div id="MyPlaylist">
		<!-- <div class="container-fluid">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0 5px">
					<div class="jumbotron">
					  <h3>菜鸟教程</h3> 
					  <p>学的不仅是技术，更是梦想！！！</p> 
					</div>
				</div>
			</div>
		</div> -->
		<div class="container-fluid" style="padding: 0;">
			<div class="panel panel-info panel-main">
				<div class="panel-heading">
					<h3><i class="el-icon-headset"></i>我的歌单
						<span class="pull-right">
							<el-popover popper-class="el-popover-download" title="下载单曲" placement="bottom" width="300"
								v-model="downloadVisible">
								<p><label>1：</label>仅支持网易云平台的单曲下载；<br /><label>2：</label>填写歌曲ID进行下载；<br /><label>3：</label>获取歌曲ID方式百度可查；<br /><label>4：</label>可以下载除‘无音源’和‘无版权’之外的任何单曲。
								</p>

								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 6px 0;">
									<div class="input-group">
										<input class=" form-control " v-model="songID" title="输入歌曲id"
											placeholder="Song ID" oninput="value=value.replace(/[^\d]/g,'')" />
										<span class="input-group-btn">
											<!-- 开始下载按钮 -->
											<button title="下载" class="btn btn-default" v-on:click="downSong()">
												<i class="glyphicon glyphicon-download-alt"></i>
											</button>
										</span>
									</div>
								</div>
								<div v-if="songURL!=''||showVideo" v-loading="songLoading"
									style="padding: 0;height: 45px;" class=" col-xs-12 col-sm-12 col-md-12 col-lg-12">
									<video v-if="songURL!=''" class="baaaefbb-audios" controls="" name="media">
										<source :src="songURL" type="audio/mpeg">
									</video>
								</div>
								<el-button slot="reference" type="text" style="padding: 0 ;color: #67C23A;">
									<i class="glyphicon glyphicon-download-alt"></i>下载单曲
								</el-button>
							</el-popover>

						</span>
					</h3>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" style="padding: 0 5px;margin-top: 20px;"
							v-for="(server,index) in serverList">
							<el-card class="pl-el-card" shadow="hover">
								<div class="panel panel-inside">
									<div class="panel-heading">
										<!-- 显示数量 -->
										<el-badge :value="server.userPlaylistList.length" class="item" type="info">
											<b>{{server.label}}</b>
										</el-badge>
										<a title="删除全部" href="javascript:void(0)" v-on:click="delByServer(server.id)">
											<i class="el-icon-delete-solid text-danger
										pull-right del-all-icon"></i></a>
										<!-- 添加歌单，自动选择平台 打开模态框和传递平台id-->
										<a title="添加" data-toggle="modal" data-target="#myModal"
											href="javascript:void(0)" class="pull-right"
											v-on:click="addPlaylist(server.id,server.label)">
											<i style="font-size: 18px;"
												class="el-icon-circle-plus-outline text-success"></i>
										</a>
									</div>
									<div class="panel-body" style="padding: 0 ">
										<el-main style="height: 33vh; padding: 0;">
											<ul class="list-group" style="margin-bottom: 0;">
												<li class="list-group-item"
													v-for="(plList,index) in server.userPlaylistList">
													<div class="row">
														<div class="col-xs-10 col-lg-10 col-md-10 col-sm-10">
															<span><code
																	title="歌单ID"><b>{{plList.playlistId}}</b></code></span>
																	<br />
															<span title="备注">{{plList.plExplain}}</span><br />
															<span style="font-size: 12px;color: #B6B6B6;">{{plList.createTime}}</span>
														</div>
														<div class="col-xs-2 col-lg-2 col-md-2 col-sm-2">
															<el-popconfirm v-on:confirm="delSingle(plList.id)"
																title="确定删除吗？" icon-color="red"
																confirm-button-type="danger" icon="el-icon-delete">
																<a slot="reference" title="删除"
																	href="javascript:void(0)"><i
																		class="el-icon-delete text-danger"></i></a>
															</el-popconfirm>
															<a slot="reference" title="编辑"
																v-on:click="openEdit(plList,server.label)"
																href="javascript:void(0)">
																<i class="el-icon-edit"></i>
															</a>
														</div>
													</div>
												</li>
											</ul>
										</el-main>
									</div>
								</div>
							</el-card>
						</div>
						<div v-if="mServerList.length>0" class="col-xs-12 col-sm-12 col-md-12 col-lg-6"
							style="padding: 0 5px;margin-top: 20px;">
							<div class="panel panel-inside">
								<div class="panel-heading" style="background-color: #F0B386;">
									<b>添加平台</b>
								</div>
								<div class="panel-body" style="padding: 0 ">
									<div style="height: 33vh; padding: 0;">
										<div class="container-fluid">
											<form class="form-horizontal" role="form">
												<div class="row" style="padding: 40px 0;">
													<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
														<div class="form-group">
															<label
																class="control-label col-sm-3 col-md-3 col-lg-3">选择平台：</label>
															<div class="col-sm-9 col-md-9 col-lg-9">
																<select class="form-control" v-model="newMSerId">
																	<option value='' disabled selected
																		style='display:none;'>选择平台</option>
																	<option v-for="(serv,index) in mServerList"
																		:value="serv.id">{{serv.label}}
																	</option>
																</select>
															</div>
														</div>
														<div class="form-group">
															<label
																class="control-label col-sm-3 col-md-3 col-lg-3">歌单ID：</label>
															<div class="col-sm-9 col-md-9 col-lg-9">
																<input class="form-control" v-model="newID"
																	maxlength="20" placeholder="纯数字ID"
																	oninput="value=value.replace(/[^\d]/g,'')" />
															</div>
														</div>
														<div class="form-group">
															<label
																class="control-label col-sm-3 col-md-3 col-lg-3">备注：</label>
															<div class="col-sm-9 col-md-9 col-lg-9">
																<input class="form-control" v-model="newExp"
																	maxlength="30" placeholder="必须要有备注~" />
															</div>
														</div>
														<div class="form-group">
															<div class="col-lg-12">
																<button v-on:click="addplSave(0)" type="button"
																	class="btn btn-default pull-right">保存</button>
															</div>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 弹出部分 -->
		<div id="editPlaylist">
			<div class="input-group">
				<input v-model="playlist.playlistId" class="form-control" maxlength="20"
					oninput="value=value.replace(/[^\d]/g,'')" />
				<input style="margin-top:15px;" v-model="playlist.plExplain" maxlength="30" class="form-control" />
			</div>
		</div>
		<!-- 模态框 -->
		<div class="modal fade" id="myModal">
			<div class="modal-dialog">
				<div class="modal-content">
					<!-- 模态框头部 -->
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title">添加歌单（{{titleLabel}}）</h4>
					</div>
					<!-- 模态框主体 -->
					<div class="modal-body">
						<!-- 已有的平台上添加歌单    -->
						<form class="form-horizontal" role="form">
							<div class="row">
								<!-- col-xs-push-1 col-sm-push-1 col-md-push-1 col-lg-push-1 -->
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

									<div class="form-group">
										<label class="control-label col-sm-3 col-md-3 col-lg-3">歌单ID：</label>
										<div class="col-sm-8 col-md-8 col-lg-8">
											<input id="newplId" class="form-control" v-model="newplId" maxlength="20"
												placeholder="纯数字ID" oninput="value=value.replace(/[^\d]/g,'')" />
										</div>
									</div>
									<div class="form-group">
										<label class="control-label col-sm-3 col-md-3 col-lg-3">备注：</label>
										<div class="col-sm-8 col-md-8 col-lg-8">
											<input id="newplExp" class="form-control" v-model="newplExp" maxlength="30"
												placeholder="一定要写备注哦~" />
										</div>
									</div>
								</div>
							</div>

						</form>
					</div>

					<!-- 模态框底部 -->
					<div class="modal-footer">
						<button type="button" class="btn btn-default" v-on:click="addplSave(1)">保存</button>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'MyPlaylist',
		data() {
			return {
				token:this.$localStorage.get('token'),
				userId: null,
				serverList: [], //用户歌单 一对多
				mServerList: [], //平台list
				newMSerId: '', //新的平台id
				newID: '', //新的平台歌单id
				newExp: '', //新的平台歌单备注
				titleLabel: '', //已有平台添加歌单模态框标题
				newplId: '', //已有平台添加歌单id
				newplExp: '', //已有平台添加歌单备注
				newplsid: '', //已有平台添加歌单平台id
				playlist: {},
				downloadVisible: false,
				songID: '',
				songURL: '',
				songLoading: false,
				showVideo: false
			}

		},
		created() {
			if (this.token != null) {
				this.getPlaylistbyid()
				this.getMServer()
			}

		},
		methods: {
			//下载歌曲
			downSong() {
				if (this.songLoading) {
					layer.msg('拼命加载中...')
					return
				}
				if (this.songID.trim() == '' || this.songID == null) {
					layer.msg('你还未填写歌曲ID')

				} else {
					this.songURL = ''
					this.showVideo = true
					this.songLoading = true
					this.$bget("https://api.mizore.cn/meting/api.php", {
						server: 'netease',
						type: 'url',
						id: this.songID
					}).then(res => {
						this.songURL = res.request.responseURL
						this.songLoading = false
						//window.open(res.request.responseURL);
					})
				}
			},

			// 打开编辑
			openEdit(plst, titleLabel) {
				var v = this
				this.$get(this.API.API_MUSIC_U_FIND, {
					id: plst.id
				}).then(res => {
					this.playlist = res
					layer.open({
						type: 1,
						title: "编辑歌单（" + titleLabel + "）",
						content: $('#editPlaylist'),
						skin: 'demo-class',
						btn: ['取消', '保存'],
						shade: 0,
						btn2: function(index, layero) { //点击保存触发事件
							if (v.playlist.playlistId == '' || v.playlist.playlistId == null) {
								layer.msg('歌单ID不能为空~')
							} else if (v.playlist.plExplain.trim() == '' || 
										v.playlist.plExplain == null) {
								layer.msg('必须要有备注~')
							} else if (plst.playlistId == v.playlist.playlistId && 
										plst.plExplain == v.playlist.plExplain) {
								layer.msg('你没做任何修改~')
							}  else {
								// 修改歌单id和备注
								v.$post(v.API.API_MUSIC_U_UPDATE_UPL, {
									userId: v.userId,
									id: v.playlist.id,
									serverId: v.playlist.serverId,
									playlistId: v.playlist.playlistId,
									plExplain: v.playlist.plExplain
								}).then(res => {
									if (res.itEx == 1 && res.Updates == 0) {
										v.$message.warning('此歌单已存在该平台下了，不能重复哦！')
									} else if (res.itEx == 0 && res.Updates != 0) {
										v.getPlaylistbyid() //刷新歌单
										layer.msg('已更新！')
										layer.close(index)
									} else {
										v.$message.error('错误！修改失败')
									}
								})
							}
							return false
						}
					})
				})
			},
			// 获取用户的歌单
			getPlaylistbyid() {
				this.$get(this.API.API_MUSIC_FIND_PL_BYU,{
					uid:this.appUser.id
				}).then(res=>{
					this.serverList = res
				})
			},
			// 删除某平台所有歌单
			delByServer(serId) {
				this.$confirm('你要删除整个平台的歌单吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true,
					roundButton: true
				}).then(() => {
					this.$post(this.API.API_MUSIC_DEL_BYUIDANDSID, {
						serverId: serId
						//userId: this.userId
					}).then(res => {
						if (res != 0) {
							this.getPlaylistbyid() //刷新歌单
							this.getMServer() //刷新平台
							layer.msg('已经删除了~')
						} else {
							this.$message.error('删除失败！')
						}
					})
				}).catch(() => {});
			},
			// 删除单个歌单
			delSingle(plId) {
				this.$post(this.API.API_MUSIC_DEL_BYPLID, {
					id: plId
				}).then(res => {
					if (res != 0) {
						this.getPlaylistbyid() //刷新歌单
						this.getMServer() //刷新平台
						layer.msg('已经删除了~')
					} else {
						this.$message.error('删除失败！')
					}
				})
			},
			//获取还没有歌单的平台 
			getMServer() {
				this.$get(this.API.API_MUSIC_FIND_SERVERNOTIN,{
					uid:this.appUser.id
				}).then(res=>{
					this.mServerList = res
				})
			},

			// 添加歌单，自动选择平台
			addPlaylist(serId, label) {
				this.newplId = ''
				this.newplExp = ''
				this.titleLabel = label
				this.newplsid = serId
			},
			//添加歌单，保存
			addplSave(add_flag) {
				if (add_flag == 1) {
					// 添加歌单 自动选择平台
					if (this.newplId.trim() == '') {
						layer.msg('你还没有输入歌单~')
					} else if (this.newplExp.trim() == '') {
						layer.msg('你还没有填写备注~')
					} else {
						this.$post(this.API.API_MUSIC_UPLST_INSERT, {
							//userId: this.userId,
							serverId: this.newplsid,
							playlistId: this.newplId,
							plExplain: this.newplExp
						}).then(res => {
							if (res.itEx == 1) {
								this.$message.warning('此歌单已存在该平台下了，不能重复添加哦！')
							} else {
								this.newplId = ''
								this.newplExp = ''
								this.getPlaylistbyid() //刷新歌单
								$('#myModal').modal('hide')
								layer.msg('添加成功！')
							}
						})
					}
				} else {
					// 添加平台
					if (this.newMSerId == '') {
						layer.msg('还未选择平台哦~')
					} else if (this.newID == '') {
						layer.msg('平台至少须有一个歌单')
					} else if (this.newExp.trim() == '') {
						layer.msg('还没有填备注哦~')
					} else {
						this.$post(this.API.API_MUSIC_UPLST_INSERT, {
							//userId: this.userId,
							serverId: this.newMSerId,
							playlistId: this.newID,
							plExplain: this.newExp
						}).then(res => {
							if (res.newId != 0) {
								this.newMSerId = ''
								this.newID = ''
								this.newExp = ''
								this.getPlaylistbyid() //刷新歌单
								this.getMServer() //刷新平台
								layer.msg('添加成功！')
							} else {
								this.$message.error('发生错误！添加失败')
							}
						})
					}
				}

			}
		}
	}
</script>

<style>
	@import url("../../assets/css/myplaylist.css");
</style>
