<template>
	<div id="chatRoom">
		<div class="panel panel-warning panel-chatroom">
			<div class="panel-heading ">
				<h3>
					<svg t="1627726116053" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="9726" width="24" height="24">
						<path
							d="M653.2096 828.9792H490.752l-180.48 86.528 0.6144-86.528c-86.3232 0-156.2624-73.4208-156.2624-163.9936v-150.3232c0-90.5728 69.9392-163.9936 156.2624-163.9936h342.3232c86.3232 0 156.2624 73.4208 156.2624 163.9936v150.3232c0 90.5728-69.9392 163.9936-156.2624 163.9936z"
							fill="#FFF7E6" p-id="9727"></path>
						<path
							d="M649.6768 299.3664H278.4256s-10.4448-162.0992 120.2688-162.0992h432.6912s120.576 12.5952 120.576 139.0592v197.5808s-20.5824 136.7552-142.4896 136.7552V471.552s-8.8064-172.1856-159.7952-172.1856z"
							fill="#FD973F" p-id="9728"></path>
						<path
							d="M948.8896 379.0848c-14.1312 0-25.6-11.4688-25.6-25.6v-12.2368c0-14.1312 11.4688-25.6 25.6-25.6s25.6 11.4688 25.6 25.6v12.2368c0 14.1312-11.4688 25.6-25.6 25.6z"
							fill="#44454A" p-id="9729"></path>
						<path
							d="M948.8896 408.6784c-14.1312 0-25.6 11.4688-25.6 25.6v43.008c0 54.6304-38.5024 99.7888-88.2176 106.7008V471.552c0-114.2784-89.1392-207.2064-198.656-207.2064H294.5536v-1.792c0-59.392 45.5168-107.7248 101.4784-107.7248h425.8304c55.9616 0 101.4784 48.3328 101.4784 107.7248 0 14.1312 11.4688 25.6 25.6 25.6s25.6-11.4688 25.6-25.6c0-87.6544-68.5056-158.9248-152.6784-158.9248H395.9808c-84.1728 0-152.6784 71.3216-152.6784 158.9248v2.3552c-103.0656 7.4752-184.7808 97.28-184.7808 206.6432v166.5024c0 105.1648 75.4688 192.256 172.9024 205.4656l-0.512 71.7824c-0.0512 8.8064 4.4544 17.0496 11.8784 21.8112 4.1472 2.6624 8.96 3.9936 13.7216 3.9936 3.7888 0 7.5776-0.8192 11.0592-2.5088l194.6112-93.3376h174.1312c109.568 0 198.656-92.9792 198.656-207.2064v-2.4064c77.9776-7.0144 139.4176-75.3152 139.4176-158.3104v-43.008a25.46688 25.46688 0 0 0-25.4976-25.6512z m-165.0176 229.3248c0 86.016-66.1504 156.0064-147.456 156.0064H456.448c-3.84 0-7.6288 0.8704-11.0592 2.5088l-162.9184 78.1312 0.4096-54.8352a25.63072 25.63072 0 0 0-25.6-25.8048c-81.3056 0-147.5072-69.9904-147.5072-156.0064V471.552c0-86.016 66.1504-156.0064 147.5072-156.0064h379.136c81.3056 0 147.456 69.9904 147.456 156.0064v166.4512z"
							fill="#44454A" p-id="9730"></path>
						<path d="M263.9872 559.616a38.3488 36.5568 90 1 0 73.1136 0 38.3488 36.5568 90 1 0-73.1136 0Z"
							fill="#44454A" p-id="9731"></path>
						<path d="M404.8896 559.616a38.3488 36.5568 90 1 0 73.1136 0 38.3488 36.5568 90 1 0-73.1136 0Z"
							fill="#44454A" p-id="9732"></path>
						<path d="M547.072 559.616a38.3488 36.5568 90 1 0 73.1136 0 38.3488 36.5568 90 1 0-73.1136 0Z"
							fill="#44454A" p-id="9733"></path>
					</svg>聊天室(<b v-on:click="onLineUsersDrawer=true" title="聊天室人数">{{onLineUsers.length}}</b>)
					<b class="pull-right">
						<el-badge :value="newPriavteMsgCount" :max="99" class="item">
							<el-popover trigger="hover" popper-class="el-popover-private-chat" placement="bottom" width="240">
								<div v-if="newPriavteMsg.length>0" class="container-fluid">
									<div v-for="user in newPriavteMsg" class="row" v-on:click="openPrivateChatWind(user.id,user.nickName)">
										<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col">
											<img v-if="user.face" :src="user.face" class="img-circle img-responsive img-thumbnail" />
											<img v-else :src="STATICC.DEFAULT_FACE" class="img-circle img-responsive img-thumbnail" />
										</div>
										<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col col-nickname">
											<b>{{user.nickName}}</b>
										</div>
										<sup v-if="user.size>0" class="el-badge__content el-badge__content--undefined">
											{{user.size}}
										</sup>
									</div>
								</div>
								<div v-else class="text-center">
									<b>No Message...</b>
								</div>
								<i slot="reference" class="fa fa-commenting"></i>
							</el-popover>
						</el-badge>
					</b>
				</h3>
			</div>
			<div class="panel-body panel-body-msg " id="chatRoom-panel-body">
				<div v-for="res in resMsg" class="row row-msg-item">
					<div v-if="res.system" class="msg-online text-center">
						<div class="msg-online-datetime">
							-- {{res.dateTime}} --
						</div>
						<div class="msg-online-resmsg">
							『<b>{{res.data.user.nickName}}</b>』<span v-if="res.data.isOpen"
								class="span-online-open">{{res.message}}</span><span v-else
								class="span-online-close">{{res.message}}</span>
						</div>
					</div>
					<!-- 左边 别人的消息 -->
					<div v-if="userId!=res.data.id && !res.system"
						class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-msg-item col-msg-item-left">
						<div class="container-fluid">
							<div class="row ">
								<!-- 别人头像 -->
								<div class="col-xs-2 col-sm-1 col-md-1 col-lg-1 padding-0-5-0-10">
									<img v-if="res.data.face" :src="res.data.face"
										class="img-responsive img-circle img-face" />
									<img v-else :src="STATICC.DEFAULT_FACE"
										class="img-responsive img-circle img-face" />
									
								</div>
								<!-- 别人昵称和消息 -->
								<div class="col-xs-9 col-sm-7 col-md-8 col-lg-8 no-padding">
									<div class="container-fluid no-padding">
										<div class="col-lg-12 no-padding">
											<span v-if="res.data.id==1"
												class="label label-warning label-is-stationmaster">站长</span>
												<el-popover trigger="hover" popper-class="el-popover-userInfo" placement="top"
													width="300">
													<div slot="reference">
														<b class="b-nickname">{{res.data.nickName}}</b>
													</div>
													<div class="container-fluid">
														<div class="row row-face text-center">
															<img v-if="res.data.face" :src="res.data.face"
																class="img-responsive img-circle img-thumbnail" />
															<img v-else :src="STATICC.DEFAULT_FACE"
																class="img-responsive img-circle img-thumbnail " />
														</div>
														<div class="row row-uid text-center">
															UID：{{res.data.id}}
														</div>
														<div class="row row-info text-center">
															<b>{{res.data.nickName}}</b>
															<b class="b-sex">
																<i v-if="res.data.sex==0" class="fa fa-venus"></i>
																<i v-else-if="res.data.sex==1" class="fa fa-mars"></i>
															</b>
														</div>
														<el-divider></el-divider>
														<div class="row-sign">
															<span class="sign" v-if="res.data.sign">{{res.data.sign}}</span>
															<span class="no-sign" v-else>萌新还没有签名。。。</span>
														</div>
														<el-divider></el-divider>
														<div class="row row-btn text-center">
															<div class="row-btn-container text-center center-block">
																<el-button class="btn-private" size="mini"
																	v-on:click="openPrivateChatWind(res.data.id,res.data.nickName)">
																	私信</el-button>
																<el-button class=" btn-addfriend" size="mini">加好友</el-button>
															</div>
														</div>
													</div>
												</el-popover>
											
										</div>
										<div class="col-lg-12 padding-0-10 ">
											<div class="col-msg-content col-msg-content-left">
												<pre>{{res.message}}</pre>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 右边 自己的消息 -->
					<div v-else-if="userId==res.data.id && !res.system"
						class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-msg-item">
						<div class="container-fluid">
							<div class="row">
								<!-- 自己头像 -->
								<div class="col-xs-2 col-sm-1 col-md-1 col-lg-1 padding-0-10-0-5 col-xs-push-10 col-sm-push-11 col-md-push-11 col-lg-push-11">
									<img v-if="res.data.face" :src="res.data.face" class="img-responsive img-circle img-face" />
									<img v-else :src="STATICC.DEFAULT_FACE" class="img-responsive img-circle img-face" />
								</div>
								<!-- 自己昵称和消息 -->
								<div
									class="col-xs-8 col-sm-7 col-md-8 col-lg-8 col-sm-push-3 col-md-push-2 col-lg-push-2 no-padding">
									<div class="container-fluid no-padding">
										<div class="col-lg-12 no-padding text-align-right height-20px">
											<!-- 占位 自己的消息 不需要显示昵称 -->
											<span v-if="res.data.id==1"
												class="label label-warning label-is-stationmaster">站长</span>
										</div>
										<div class="col-lg-12 padding-0-10 float-none text-align-right">
											<div class="col-msg-content col-msg-content-right">
												<pre>{{res.message}}</pre>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <icon :icon="['fa','smile-beam']"></icon> -->
			<div class="panel-footer">
				<div class="row row-sendmsg-funs">
					<!-- 表情气泡 -->
					<el-popover popper-class="el-popover-faces" placement="top" width="300" v-model="faceVisible">
						<div class="face">
							<div v-for="face in faces" class="face-item" v-on:click="selectFace(face)">
								{{face}}
							</div>
						</div>

						<i slot="reference" class="fa fa-smile-o"></i>
					</el-popover>
				</div>
				<textarea placeholder="Message..." class="form-control" v-model="msg"
					@keyup.enter="checkKeyEvent($event)"></textarea>
				<div class="row row-send-btn text-right">
					<button class="btn btn-default" v-on:click="sendMessage">发送</button>
				</div>
			</div>
		</div>
		<!-- 弹出部分 -->
		<!-- 在线用户列表抽屉 -->
		<el-drawer title="在线用户" :visible.sync="onLineUsersDrawer" direction="ltr"
			custom-class="el-drawer-chatroom-online-users" :modal="false">
			<div class="container-fluid">
				<div class="row">
					<!-- me -->
					<div class="col-lg-12 col-online-users-item" :title="localUser.nickName">
						<el-card shadow="hover">
							<span>
								<img v-if="localUser.face" class="img-circle img-responsive img-thumbnail" :src="localUser.face" />
								<img v-else class="img-circle img-responsive img-thumbnail" :src="STATICC.DEFAULT_FACE" />

								<b>{{localUser.nickName}}</b>
							</span>
						</el-card>
					</div>
				</div>
				<div class="row row-for" v-for="oluser in onLineUsers">
					<div v-if="oluser.id!=userId" class="col-lg-12 col-online-users-item col-for"
						:title="oluser.nickName">
						<el-card shadow="hover">
							<span>
								<el-popover trigger="click" popper-class="el-popover-userInfo" placement="top"
									width="300">
									<div slot="reference">
										<img v-if="oluser.face" class="img-circle img-responsive img-thumbnail" :src="oluser.face" />
										<img v-else class="img-circle img-responsive img-thumbnail" :src="STATICC.DEFAULT_FACE" />
										<b>{{oluser.nickName}}</b>
									</div>
									<div class="container-fluid">
										<div class="row row-face text-center">
											<img v-if="oluser.face" :src="oluser.face"
												class="img-responsive img-circle img-thumbnail " />
											<img v-else :src="STATICC.DEFAULT_FACE"
												class="img-responsive img-circle img-thumbnail" />
										</div>
										<div class="row row-uid text-center">
											UID：{{oluser.id}}
										</div>
										<div class="row row-info text-center">
											<b>{{oluser.nickName}}</b>
											<b class="b-sex">
												<i v-if="oluser.sex==0" class="fa fa-venus"></i>
												<i v-else-if="oluser.sex==1" class="fa fa-mars"></i>
											</b>
										</div>
										<el-divider></el-divider>
										<div class="row-sign">
											<span class="sign" v-if="oluser.sign">{{oluser.sign}}</span>
											<span class="no-sign" v-else>萌新还没有签名。。。</span>
										</div>
										<el-divider></el-divider>
										<div class="row row-btn text-center">
											<div class="row-btn-container text-center center-block">
												<el-button class="btn-private" size="mini"
													v-on:click="openPrivateChatWind(oluser.id,oluser.nickName)">私信
												</el-button>
												<el-button class=" btn-addfriend" size="mini">加好友</el-button>
											</div>
										</div>
									</div>
								</el-popover>
							</span>
						</el-card>
					</div>
				</div>
			</div>
		</el-drawer>
		<!-- 私聊窗口 html -->
		<div id="privateChatContainer" class="container-fluid">
			
			<div class="row row-private-caht-container" id="row-private-caht-container">
				<div class="col-lg-12 ">
					<div class="alert alert-danger alert-dismissible" role="alert">
					  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					  <strong>警告!</strong> 实时聊天中，退出聊天室或刷新页面将会清除聊天记录，重要记录请使用其他方式保存
					</div>
					<div v-for="rpm in resPrivateMsg" v-if="(rpm.data.to.id==SocketMsgVO.toUserId && rpm.data.from.id==userId) ||
							(rpm.data.to.id==userId && rpm.data.from.id==SocketMsgVO.toUserId)"
							class="priva-msg-item">
						<!-- 对方的消息 -->
						<div v-if="rpm.data.from.id!=userId">
							<!-- 对方头像 -->
							<div class="private-chat-face ">
								<img v-if="rpm.data.from.face" :src="rpm.data.from.face" 
									class=" img-circle "/>
								<img v-else :src="STATICC.DEFAULT_FACE"
									class=" img-circle " />
							</div>
							<div class="private-chat-msg private-chat-msg-left col-xs-9 col-sm-9 col-md-9 col-lg-9">
								<pre>{{rpm.message}}</pre>
							</div>
						</div>
						<div v-else class="me">
							<!-- 我的头像 -->
							<div class="private-chat-face me-face">
								<img v-if="localUser.face" :src="localUser.face" 
									class=" img-circle "/>
								<img v-else :src="STATICC.DEFAULT_FACE"
									class=" img-circle " />
							</div>
							<div class="private-chat-msg private-chat-msg-right col-xs-9 col-sm-9 col-md-9 col-lg-9 me-msg">
								<pre>{{rpm.message}}</pre>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row row-p-faces">
				<div class="col-lg-12 ">
					<!-- 表情气泡 -->
					<el-popover popper-class="el-popover-private-faces" style="z-index: 19999999;" placement="top" width="200" v-model="privateFaceVisible">
						<div class="face">
							<div v-for="face in faces" class="face-item" v-on:click="priChatAddFace(face)">
								{{face}}
							</div>
						</div>
						<i slot="reference" class="fa fa-smile-o"></i>
					</el-popover>
				</div>
			</div>
			<div class="row row-private-textarea">
				<textarea placeholder="Message..." class="form-control" v-model="privateMsg"
				@keyup.enter="checkKeyPrivateEvent($event)"></textarea>
			</div>
			<div class="row">
				<div class="col-lg-12 col-p-send">
					<el-button size="mini" class="btn-private-send pull-right " v-on:click="sendMessageTo">发送</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'chatRoom',
		data() {
			return {
				// JSON.parse(localStorage.getItem("user")).nickName
				//  "ws://" + this.API.SERVERLOCAL + "/chat/" +"haruhi" 
				path: "ws://" + this.API.SERVERLOCAL + "/chat/" + this.appUser.id,
				userId: this.appUser.id,
				socket: null,
				// JSON.parse(localStorage.getItem("user")),
				localUser: this.appUser,
				msg: '',
				resMsg: [],
				count: 0,
				faces: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍',
					'🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐',
					'🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒',
					'🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟',
					'🙁', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣',
					'😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💩', '🤡', '👹', '👺', '👻',
					'👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '💋',
					'💌', '💘', '💝', '💖', '💗', '💓', '💕', '💟', '❣', '💔', '❤', '🧡', '💛', '💚', '💙', '💜', '🤎',
					'🖤'
				],
				faceVisible: false,
				privateFaceVisible: false,
				onLineUsers: [], //当前在线用户集合
				onLineUsersDrawer: false,
				privateMsg: '',//用来发送的私信
				// 用来提交给服务器的对象模型（转json），服务器端也有对象的VO实体
				SocketMsgVO: {
					type: null,
					fromUserId: null,
					toUserId: null,
					msg: null
				},
				toUser: null,
				resPrivateMsg: [],
				LI: 0,// 当前打开的私聊窗口下标
				newPriavteMsg:[],//未读的私信 ！！这里面存的直接是from用户对象 不包含消息text
				newPriavteMsgCount:null//未读私信总数量
			}
		},
		mounted() {
			this.init()
		},
		created() {
		},
		methods: {
			// 打开私聊窗口
			openPrivateChatWind(toUid, nickName) {
				let _this = this
				// 方法里嵌套方法， this的指向将改变
				this.newPriavteMsg.forEach(function(item){
					if(item.id==toUid){
						// forEach里面不能使用break中断循环
						_this.newPriavteMsgCount -= item.size
						_this.newPriavteMsgCount = _this.newPriavteMsgCount==0 ? null : _this.newPriavteMsgCount
						item.size = 0
					}
				})
				this.SocketMsgVO.toUserId = toUid
				this.SocketMsgVO.fromUserId = this.appUser.id
				layer.close(this.LI)
				this.$nextTick(function(){
					let layerIndex = layer.open({
						type: 1, //Page层类型
						title: nickName,
						resize:false,
						skin: 'layer-private-chat',
						area:['300px','80%'],
						shade: 0, //遮罩透明度
						content: $("#privateChatContainer"),
						zIndex:1000,
						end:function(){
							_this.SocketMsgVO.toUserId=0
							_this.privateMsg=""
						}
					});
					this.LI=layerIndex
				})
			},
			priChatAddFace(f){
				this.privateMsg+=f
			},
			// 选择表情
			selectFace(f) {
				this.msg += f
			},
			checkKeyPrivateEvent(e){
				if (e.keyCode == 13 && e.ctrlKey) {
					this.privateMsg += "\n"; //换行
				} else if (e.keyCode == 13) {
					this.sendMessageTo(); 
					e.preventDefault(); //禁止回车的默认换行
				}
			},
			// 发送消息检查 
			checkKeyEvent(e) {
				if (e.keyCode == 13 && e.ctrlKey) {
					this.msg += "\n"; //换行
				} else if (e.keyCode == 13) {
					this.sendMessage(); 
					e.preventDefault(); //禁止回车的默认换行
				}
			},
			// 私聊发送消息 回车事件，也要分开
			sendMessageTo() {
				if (!this.privateMsg || this.privateMsg == '\n') {
					this.privateMsg = ''
					return layer.msg("请输入消息")
				}
				this.SocketMsgVO.type = 1
				this.SocketMsgVO.msg = this.privateMsg
				let upMsg = JSON.stringify(this.SocketMsgVO)
				this.socket.send(upMsg)
				this.$nextTick(function() {
					this.privateMsg = ''
				})
				var scrollTarget = document.getElementById("row-private-caht-container");
				scrollTarget.scrollTop = scrollTarget.scrollHeight;
			},
			// 群里发送消息 
			sendMessage() {
				if (!this.msg || this.msg == '\n') {
					this.msg = ''
					return layer.msg("请输入消息")
				}
				this.SocketMsgVO.type = 2
				this.SocketMsgVO.msg = this.msg
				let upMsg = JSON.stringify(this.SocketMsgVO)
				this.socket.send(upMsg)

				var scrollTarget = document.getElementById("chatRoom-panel-body");
				scrollTarget.scrollTop = scrollTarget.scrollHeight;
				this.$nextTick(function() {
					this.msg = ''
				})
			},
			init() {
				if (typeof(WebSocket) === "undefined") {
					this.$message.warning("您的浏览器不支持socket")
				} else {
					// 实例化socket
					this.socket = new WebSocket(this.path)
					// 监听socket连接
					this.socket.onopen = this.onOpen
					// 监听socket错误信息
					this.socket.onerror = this.onError
					// 监听socket消息
					this.socket.onmessage = this.onMessage
				}
			},
			onOpen(val) {
				//console.log("连接成功", val)
			},
			onError(e) {
				console.log("连接错误", e)
			},
			// 收到了来自服务端的消息
			onMessage(res) {
				let _this = this
				//console.log("收到了消息",res.data)
				let rm = JSON.parse(res.data) //此处的.data是获取resMsg{time,data,system,message}
				if (rm.type == 2) {
					// 群聊
					if (rm.system) { //系统消息
						this.resMsg.push(rm)
						// rm.data 就是一个map map里面有user{} size isOpen onlineUsers[]
						if (rm.data.isOpen) { //判断是连接还是关闭 有人进入聊天室
							this.openNotify(rm, "top-right", "span-msg-open")
						} else {
							this.openNotify(rm, "top-lef", "span-msg-close")
						}
						this.SocketMsgVO.fromUser = rm.sid
						this.onLineUsers = rm.data.onlineUsers
						//this.count = rm.data.size
					} else { //用户消息
						this.resMsg.push(rm)
					}
				} else if (rm.type == 1) {
					// 单聊
					if (rm.system) {
						layer.msg(rm.message)
					} else {
						// 给新来的消息对方对象添加/创建一个属性，值1
						rm.data.from['size'] = 1
						// 排除to为自己的消息 排除发送人是当前正在聊天的人 
						if(rm.data.to.id==this.userId && rm.data.from.id!=this.SocketMsgVO.toUserId){
							// 总消息数量
							this.newPriavteMsgCount++
							if(this.newPriavteMsg.length==0){
								this.newPriavteMsg.push(rm.data.from)
							}else{
								let flag = true
								this.newPriavteMsg.forEach(function(item){
									if(item.id==rm.data.from.id){
										// 若是同一个人发来的消息（并且未读）则+1
										item.size += 1
										flag = false
									}
								})
								if(flag){
									this.newPriavteMsg.push(rm.data.from)
								}
							}
						}
						this.resPrivateMsg.push(rm)
					}
				}

			},
			// 打开提示
			openNotify(rm, position, msgClass) {
				if (rm.data.user.id != this.appUser.id) { //判断别人上线
					let nname = rm.data.user.nickName.length > 6 ? rm.data.user.nickName.slice(0, 6) + "..." : rm.data.user
						.nickName
					if (!rm.data.user.face) {
						rm.data.user.face = this.STATICC.DEFAULT_FACE
					}
					this.$notify({
						dangerouslyUseHTMLString: true,
						duration: 3000,
						position: position,
						customClass: 'chatRoom-online-el-notification',
						message: "<div><img title='" + rm.data.user.nickName +
							"' class='img-responsive img-circle img-thumbnail' src=" + rm.data.user.face +
							"><b class='notification-nickname' title='" + rm.data.user.nickName + "'>" + nname +
							"</b> <span class='" + msgClass + "'>" + rm.message + "</span></div>"
					});
				}
				this.count = rm.data.size
			}
		},
		// 监听页面/组件销毁 时断开连接
		destroyed() {
			//alert(1)
			var isClose = this.socket.close()
			console.log("断开", isClose)
		}
	}
</script>

<style>
	@import url("../../assets/css/chat-room.css");
</style>
