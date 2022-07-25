<template>
	<div id="User">
		<div class="container-fluid container-bg cover">

			<div class="container container-main">
				<!-- 头部 -->
				<div class="row head-row">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
						<a href="javascript:void(0);" class="font-change" v-on:click="page_flag=0">Suzumi Haruhi</a>
						<a class="pull-right font-change" href="javascript:void(0)" v-on:click="logout">
							logout<icon :icon="['fa','sign-out-alt']"></icon>
						</a>

					</div>
				</div>
				<div class="row main-row">
					<!-- 左边 -->
					<!-- style="min-height: 100vh;" -->
					<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 ">
						<!-- 用户信息开始 -->
						<div class="container-fluid">
							<div class="row">
								<div class="panel panel-default face-panel">
									<div class="panel-body ">
										<div class="row text-center">
											<a href="javascript:void(0)" v-on:click="page_flag=8">
												<img v-if="user.face" class="face-img img-thumbnail img-circle img-rounded" 
												:src="user.face"/>
												<img v-else class="face-img img-thumbnail img-circle img-rounded"
													src="../../assets/imgs/haruhi_default_face.jpg" />
											</a>
										</div>
									</div>
									<div class="panel-footer" style="background-color: #fff;">
										<div v-on:click="page_flag=3">
											<el-card shadow="hover" style="border: 0px solid;" >
												<div class="row" >
													<div class="col-xs-12">
														<label>UID：</label>{{user.id}}
													</div>
													<div class="col-xs-12">
														<label>昵称：</label>{{user.nickName}} 
														<b class="b-sex">
															<i v-if="user.sex==0" class="fa fa-venus"></i>
															<i v-else-if="user.sex==1" class="fa fa-mars"></i>
														</b>
													</div>
													<div class="col-xs-12">
														{{user.sign}}
													</div>
													
													
												</div>
											</el-card>
										</div>
										
									</div>
								</div>
							</div>
						</div>
						
						
						<!-- 切换歌单开始 -->
						<div class="panel panel-info pl-panel-info">
							<div class="panel-heading">切换歌单
								<el-button style="padding: 2px 0;" type="text" class="pull-right"
									v-on:click="page_flag=1"><i class="el-icon-headset"></i>我的歌单</el-button>
							</div>
							<div class="panel-body">
								<el-input v-model="plID" placeholder="歌单ID" class="input-with-select"
									oninput="value=value.replace(/[^\d]/g,'')">
									<el-select v-model="msrever" style="width: 110px" slot="prepend" placeholder="选择平台">
										<el-option v-for="(serv,index) in mServerList" :label="serv.label"
											:value="serv.scode"></el-option>
									</el-select>
								</el-input>
								<div class="row">
									<div class="col-xs-12" style="margin-top: 15px;">
										<!-- <button class="btn btn-default btn-sm pull-left" v-on:click="drawerPlayLlis=true">整理</button> -->
										<el-button class="pull-left" icon="el-icon-document" circle size="small"
											v-on:click="drawerPlayLlis=true"></el-button>
										<!-- <button class="btn btn-success btn-sm pull-right" v-on:click="savepl">保存</button> -->
										<el-button class="pull-right" type="success" icon="el-icon-check" circle
											size="small" v-on:click="savepl"
											style="background-color: #ffa500;border: 1px solid #ffa500;"></el-button>
									</div>

								</div>
							</div>
						</div>
						<!-- 记事本 -->
						<div class="panel panel-success panel-note">
							<div class="panel-heading">
								<el-badge :value="notes.length" type="success">
									<el-link type="success" v-on:click="openMyNote">我的笔记</el-link>
								</el-badge>
								<a class="pull-right" title="新建笔记"
								href="javascript:void(0)" v-on:click="toAddNote">
									<i class="el-icon-plus"></i>
								</a>
								<a class="pull-right"
								title="order by lastUpdateTime asc/desc" href="javascript:void(0)" v-on:click="notes.reverse()">
									<i class="el-icon-sort"></i>
								</a>
								
							</div>
							<div class="panel-body">
								<ul v-if="notes.length>0" class="list-group">
								<!-- v-on:dblclick="showNoteById(note)" -->
									<a href="javascript:void(0)" class="list-group-item" :title="note.title"
									v-for="(note,i) in notes" 
									v-on:click="toShowOneNote(note)">{{note.title}}</a>
									
									<li class="list-group-item">到底了...</li>
								</ul>
								
								<div v-else  class="no-note" v-on:click="toAddNote">
									<span>没有笔记，去添加...</span>
								</div>
								
							</div>
						</div>
						<!-- 聊天室 -->
						<div id="openChatRoom" class="panel panel-warning text-center chatroom-panel" v-on:click="page_flag=9">
							<span class="center-block">聊天室</span>
						</div>
						<!-- 每日一言开始 -->
						<a href="javascript:void(0)" style="text-decoration:none" title="每日一言" v-on:click="page_flag=5">
							<div class="panel panel-info pl-panel-info hikotoko-panel">
								<!-- maxstr 60 -->
								<span id="ityped" ref="ityped"></span>
							</div>
						</a>
						
					</div>
					<!-- 右边 -->
					<div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 user-right-main">
						<!-- <el-main style="height: 100vh;padding: 0;">
							
						</el-main> -->
						<!-- <div v-if="page_flag==0" class="right-default">
							
						</div> -->
						<!-- 
						可以用嵌套路由实现
						已经实现过了，当做练手，但是发现与我原本的业务产生了冲突，顾舍弃
						只能以将局部视图作为组件来使用了
						<router-view></router-view>
						 -->

						<!-- <AccountIndex v-if="page_flag==0" /> -->
						<WelcomePage v-if="page_flag==0" />
						<MyPlaylist v-if="page_flag==1" />
						<EditNote v-if="page_flag==2" />
						<EditUser v-if="page_flag==3" />
						<!-- <Upload v-if="page_flag==4" /> -->
						<MyHikotoko v-if="page_flag==5" />
						<ShowNote v-if="page_flag==6"/>
						<MyNote v-if="page_flag==7"/>
						<DefaultFaces  v-if="page_flag==8"/>
						<ChatRoom  v-if="page_flag==9"/>
					</div>
				</div>
				<div class="row footer-row">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="height: 3vh;">
						<!-- no html -->
					</div>
				</div>
			</div>
		</div>
		<!-- 弹出部分 -->
		<!-- 歌单整理 -->
		<el-drawer :title="'歌单整理 '+serverList.plCont" :visible.sync="drawerPlayLlis" direction="btt" size="100%">
			<el-main style="height: 92vh;">
				<div class="container-fluid">
					<!-- 搜索歌单 输入框 部分 -->
					<div class="row">
						<div class="col-md-4 col-lg-4 col-sm-6 col-xs-12">
							<el-input type="text" placeholder="请输入歌单备注进行搜索" v-model="peWord" maxlength="20"
								show-word-limit v-on:focus="show = true" v-on:input="searchChange"
								class="input-with-select"
								onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
								clearable="true">
								<el-select v-model="selectSId" slot="prepend" placeholder="选择平台" style="width:130px;"
									v-on:change="searchChange">
									<el-option label="所有(默认)" value="0"></el-option>
									<el-option v-for="(serv,index) in mServerList" :label="serv.label" :value="serv.id">
									</el-option>
								</el-select>
								<i slot="prefix" class="el-input__icon el-icon-search"></i>
								<el-button v-if="show" title="收起" slot="append" icon="el-icon-arrow-up"
									v-on:click="show = false,selectSId='',peWord='',playLists=[]"></el-button>
							</el-input>
						</div>
					</div>
					<div class="row">
						<!-- <div class="col-md-4 col-lg-3 col-sm-6 col-xs-12" style="margin-top: 20px;"> -->
						<transition name="el-zoom-in-top">
							<div v-show="show" class="transition-box">
								<el-divider v-if="playLists.length>0">
									<el-badge :value="playLists.length" class="item" type="success">
										<h3 :title="playLists.length+'条'">搜索结果</h3>
									</el-badge>
								</el-divider>
								<!-- 搜索歌单结果 开始 -->
								<div v-for="(plList,index) in playLists"
									class="col-md-4 col-lg-3 col-sm-6 col-xs-12 form-inline" style="margin-top: 20px;">
									<!-- 气泡框info -->
									<el-popover placement="top" trigger="click">
										<!-- 歌单列表 -->
										<div slot="reference" class="form-group input-group">
											<span class="input-group-addon" title="平台"
												style="background-color:  #F0F9EB;">
												<img :src="'https://www.google.cn/s2/favicons?domain='+plList.sourceUrl"
													height="15" />
											</span>
											<input title="歌单ID" type="text" class="form-control"
												v-model="plList.playListId" style="width: 100%;" readonly="readonly">
											<span class="input-group-addon" title="备注"
												style="background-color:  #F0F9EB;color:#67C23A;">
												<b>{{plList.plExplain}}</b>
											</span>
										</div>
										<!-- 气泡体 -->
										<el-card class="box-card" shadow="never" style="border: none;">
											<div slot="header" class="clearfix">
												<span class="plExp">{{plList.plExplain}}</span>
												<span style="float: right; padding: 3px 0"
													type="text">歌曲数:{{plList.total}}</span>
											</div>
											<!-- .el-card__header -->
											<div class="text item">
												<dl>
													<dt>歌曲ID：</dt>
													<dd>{{plList.playListId}}</dd>
													<dt>歌单源地址:</dt>
													<dd><a target="_blank"
															:href="plList.sourceUrl">{{plList.sourceUrl}}</a>
													</dd>
													<dt>录入时间：</dt>
													<dd>{{plList.createTime}}</dd>
												</dl>
											</div>
										</el-card>
									</el-popover>
								</div>
								<!-- 搜索歌单结果 结束 -->
							</div>
						</transition>
						<!-- </div> -->
					</div>
					<!-- 所有歌单 -->
					<div class="row row-playlist" v-for="(server,index) in serverList.msList" style="margin-top: 20px;">
						<!-- 平台标题 -->
						<el-divider>
							<el-badge :value="server.playList.length" class="item" type="info">
								<h3 title="平台">{{server.label}}</h3>
							</el-badge>
						</el-divider>
						<div v-for="(plList,index) in server.playList"
							class="col-md-4 col-lg-3 col-sm-6 col-xs-12 form-inline" style="margin-top: 20px;">
							<!-- 气泡框info -->
							<el-popover placement="top" trigger="click">
								<!-- 歌单列表 -->
								<div slot="reference" class="form-group input-group">
									<span class="input-group-addon" title="平台">
										<img :src="'https://www.google.cn/s2/favicons?domain='+plList.sourceUrl"
											height="15" />
									</span>
									<input title="歌单ID" type="text" class="form-control" v-model="plList.playListId"
										style="width: 100%;" readonly="readonly">
									<span class="input-group-addon" title="备注">
										<b>{{plList.plExplain}}</b>
									</span>
								</div>
								<!-- 气泡体 -->
								<el-card class="box-card popover-ard" shadow="never" style="border: none;">
									<div slot="header" class="clearfix">
										<span class="plExp">{{plList.plExplain}}</span>
										<span style="float: right; padding: 3px 0"
											type="text">歌曲数:{{plList.total}}</span>
									</div>
									<!-- .el-card__header -->
									<div class="text item">
										<dl>
											<dt>歌单ID：</dt>
											<dd>{{plList.playListId}}</dd>
											<dt>歌单源地址:</dt>
											<dd><a target="_blank" :href="plList.sourceUrl">{{plList.sourceUrl}}</a>
											</dd>
											<dt>录入时间：</dt>
											<dd>{{plList.createTime}}</dd>
										</dl>
									</div>
								</el-card>
							</el-popover>
						</div>
					</div>
				</div>
			</el-main>

		</el-drawer>
	</div>
</template>

<script>
	/*   
	page_flag
	1:我的歌单
	*/
	export default {
		name: "User",
		inject: ['reloadbtm'], //
		data() {
			return {
				userId: null,
				user: {},
				msrever: '', //切换歌单选择的平台code
				plID: '', //切换歌单输入的歌单id
				//所有平台
				mServerList: [],
				//歌单整理
				serverList: [],
				drawerPlayLlis: false, //歌单整理抽屉key
				peWord: '', //搜索歌单备注单词
				show: false,
				selectSId: '', //搜索歌单平台id
				//搜索结果
				playLists: [],
				page_flag: 0, //默认打开页
				hikoList: ['每日一言，必有精进', 'hello world!', '学如逆水行舟，不进则退。', 'world.Execute(me)'],
				notes:[],
				oneNote:{}
			}
		},
		mounted() {
			//console.log(this.$refs)
			this.findHitoByUid()
		},
		created() {
			this.getMusicServer()
			this.getPlaylistbyid()
			
			var u = JSON.parse(this.$localStorage.get('user'))
			if (u != null) {
				this.user = u
				//sessionStorage.setItem("user",JSON.stringify(u))
				this.findNoteByUId()
			}
			
		},
		// 该方法只能跨级获取父组件的方法或者参数
		// 父组件里无法获取子组件里的方法或者参数
		provide() {
			return {
				// 右边方法不能写括号
				reUser: this.findUserById,
				Note:this.findNoteByUId
			}
		},
		methods: {
			// 去添加
			toAddNote(){
				this.page_flag = -1
				this.$localStorage.remove("LOCAL_NOET")
				this.$nextTick(function() {
					this.page_flag=2
				})
				
			},
			openMyNote(){
				this.page_flag=-1
				this.$nextTick(function() {
					this.page_flag=7
				})
			},
			// 展示一条笔记详情 双击事件
			// showNoteById(note){
			// 	this.$localStorage.set("LOCAL_NOET",JSON.stringify(note))
			// 	this.page_flag = -1
			// 	this.$nextTick(function() {
			// 		this.page_flag = 2
			// 	})
				
			// },
			toShowOneNote(note){
				this.$localStorage.set("LOCAL_NOET",JSON.stringify(note))
				this.page_flag = -1
				this.$nextTick(function() {
					this.page_flag = 6
				})
			},
			// 获取用户note
			findNoteByUId(){
				
				this.$get(this.API.API_NOTE_FINDBUUIDNOCONTENT,{
					uid:this.user.id
				}).then(res=>{
					if(res.code<0){
						return this.$message({
							type:res.type,
							message:res.msg
						})
					}
					this.notes = res.data
				})
			},
			findHitoByUid() {
				this.$get(this.API.API_HITOKO_QUERY, {
					uid: this.user.id
				}).then(res => {
					//console.log(res)
					let inithitoko = this.hikoList
					let hitokos = res.strs.length > 0 ? res.strs : inithitoko
					ityped.init(this.$refs.ityped, {
						strings: hitokos,
						startDelay: 200,
						loop: true,
						typeSpeed: 150,
						showCursor: true,
						CursorChar: "|"
					});
				})
			},
			//获取音乐平台
			getMusicServer() {
				this.$get(this.API.API_MUSIC_ALL_SERVER).then(res => {
					this.mServerList = res
				})
			},
			searchChange() {
				//var empty = ''
				var sid = this.selectSId === '' ? 0 : this.selectSId;
				if (this.peWord != '') {
					this.$get(this.API.API_MUSIC_SEARCH_PLAYLIST, {
						exp: this.peWord,
						sid: sid
					}).then(res => {
						this.playLists = res
					})

				} else {
					this.playLists = []
					console.log("peWord is Empty")
				}

			},
			// 歌单整理
			getPlaylistbyid() {
				this.$get(this.API.API_MUSIC_ALL_PLAYLIST).then(res => {
					this.serverList = res
				})
			},

			// 保存切换歌单
			savepl() {
				var v = this
				if (this.msrever.trim() == '') {
					layer.msg('你还没有选择平台！', {
						icon: 7,
						time: 2000
					})
				} else if (this.plID == '') {
					layer.msg('你还没有输入歌单id！', {
						icon: 7,
						time: 2000
					})
				} else if (this.$localStorage.get('CUS_MUSIC_SERVER') == this.msrever &&
					this.$localStorage.get('CUS_MUSIC_ID') == this.plID) {
					layer.msg('目前已是该歌单了！', {
						icon: 7,
						time: 2000
					})
				} else {
					this.$localStorage.set('CUS_MUSIC_SERVER', this.msrever)
					this.$localStorage.set('CUS_MUSIC_ID', this.plID)
					this.msrever == ''
					this.plID == ''
					layer.msg('已切换歌单 ヾ(≧▽≦*)o', {
						time: 2500
					}, function() {
						v.reloadbtm(); //刷新底部音乐播放器
					})
				}
			},
			// userTokenVerify() {
			// 	this.$post(this.API.API_USER_TOKEN_VERIFY).then(res => {
			// 		if (res.code == 0) {
			// 			this.user = res.user
			// 		} else {

			// 		}
			// 	})
			// },
			findUserById() {
				this.$get(this.API.API_USER_FINDBYUID, {
					uid: this.user.id
				}).then(res => {
					if (res.code == 0) {
						this.user = res.user
						this.Vuepro.appUser = res.user
						this.$localStorage.set("user", JSON.stringify(res.user))
					} else {
						//this.$localStorage.remove('user_key')
					}
				})
			},
			logout() {
				this.Vuepro.appUser = null
				this.$localStorage.remove('token')
				this.$localStorage.remove('user')
				this.$localStorage.remove('user_key')
				this.$localStorage.remove("TEMP_ADD_NOTE")
				// this.goto('/', 'Home')
				this.$router.replace({
					path: '/',
					name: 'Home'
				});
			},
			goto(path, name) {
				this.$router.push({
					path: path,
					name: name
				});
			}
		}
	}
</script>

<style src="../../assets/css/user.css">
</style>
