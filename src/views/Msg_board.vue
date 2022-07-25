<template>
	<div id="MsgBoard">

		<div class="inner-banner">
			<div class="inner-banner-bottom" id="particles-js">
				<div class="container bottom-container">
					<!-- <input class="form-control" /> -->
				</div>
				<!-- <img class="img-responsive pull-right"style="height:190px;position: absolute;top: 31vh;"
				src="http://pngimg.com/uploads/anime_girl/anime_girl_PNG48.png" /> -->
				<!-- 矢量图
				 http://pngimg.com/images/fantasy/anime_girl
				 -->
			</div>
			<div class="container banner-container">
				<div class="contacts-main pt-lg-5 pt-3">

					<div class="form-41-mian section-gap mt-5">
						<div class="container">

							<div class="row" style="position: relative;">
								<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8
									 col-md-push-2 col-lg-push-2">
									<div class="form-inner-cont">
										<form>
											<div class="form-top-left row">
												<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
													<input v-model="nkname" class="msg-input form-control" type="text"
														placeholder="昵  称(选填)" required="">
												</div>

												<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
													<input v-model="email" class="msg-input form-control" type="text"
														title="选填" placeholder="邮  箱(选填)" required="">
												</div>

												<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
													<input v-model="network" class="msg-input form-control" type="text"
														placeholder="网  站(选填)" title="选填" required="">
												</div>


											</div>
											<div class="form-top-righ row">
												<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
													<textarea v-model="msg" class="msg-input form-control"
														placeholder="留  言" required=""></textarea>
												</div>

											</div>
											<div class="form-submit pull-right">

												<button type="button" class="btn btn-style btn-a"
													v-on:click="checkMsg">提交</button>
											</div>
											<span class="col-lg-1 pull-right">
												<el-popover width="200" trigger="click">
													<div class="input-group">
														<input class="input-reply form-control" title="头像地址(选填)" v-model="faceurl" maxlength="255"
														placeholder="Image URL" oninput="this.value=this.value.replace(/[, ]/g,'')"/>
														<span class="input-group-btn">
															<button title="清除" class="btn btn-default btn-reply" v-on:click="faceurl=null">
																<i class="el-icon-close"></i>
															</button>
														</span>
													</div>
													<a slot="reference" href="javascript:void(0)" :title="faceurl==null||faceurl==''? '头像':'头像地址：'+faceurl">
														<i class="el-icon-picture-outline"></i>
													</a>
												</el-popover>
											</span>

										</form>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>

			</div>
			<div class="container-fluid">
				<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6
									 col-md-push-3 col-lg-push-3" style="padding: 0 !important;">
					<span class="text-right">
						<div class="block">
							<el-pagination v-on:current-change="pageChange" layout="prev, pager, next"
								:page-count="pageCount" :pager-count="3">
							</el-pagination>
						</div>
					</span>
				</div>
			
			</div>
			<!--  -->
			<div class="container-fluid background-fafafa" style="padding: 10px !important;">
				<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6
								 col-md-push-3 col-lg-push-3" style="padding: 0 !important;">
					<div class="text-item comments">
						<span class="com-count">{{msgCount}}条留言</span>
						<ul class="commentwrap">
							<li class="comment even thread-even depth-1" v-for="(com,index) in comment">
								<div id="comment-936" class="comment_body contents">
									<div class="profile">
										<!-- onerror="javascript:this.src='https://api.yimian.xyz/img?type=head'" -->
										<a href="javascript:void(0)">
											<img v-if="com.msgFace!=null && com.msgFace!=''" :src="com.msgFace"
												class="gravatar" :alt="com.msgNickName"onerror="javascript:this.src='https://api.yimian.xyz/img?type=head';">
											<img v-else src="https://api.yimian.xyz/img?type=head" class="gravatar"
												:alt="com.msgNickName">
										</a>
									</div>
									<div class="main shadow">
										<div class="commentinfo">
											<section class="commeta">
												<div class="shang">
													<h4 class="author"><a
															href="javascript:void(0)">{{com.msgNickName}}</a>
													</h4>
												</div>
											</section>
										</div>
										<div class="body msg-body">
											<p style="">{{com.context}}</p>
										</div>
										<div class="xia info">
											<span><time style="padding: 0 10px 0 0;">{{com.createTime}}</time></span>
											<span><a href="javascript:void(0)" v-on:click="showReplyTextBox(com.id,com.id,com.msgNickName),openRTBFlag=com.id">
											<i class="el-icon-chat-dot-square"></i></a></span>
										</div>
										<!-- 这是第一级评论的回复框 -->
										<div :id="'replyBox'+com.id" class="row hidden padding-15-0" >
											<div class="container-fluid">
												<div class="row">
													<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
														
														<textarea maxlength="249" class="msg-input input-reply form-control" :placeholder="respondent" v-model="rtext"></textarea>
														
													</div>
													<!--  col-sm-push-6 col-md-push-6 col-lg-push-8 -->
													<!-- 第一级评论的回复name和头像-->
													<div class="col-xs-9 col-sm-4 col-md-7 col-lg-4 " style="margin-top: 5px;">
														<div class="input-group ">
															<input class=" form-control input-reply " maxlength="15"
																placeholder="昵称(选填)"v-model="rname"/>
															<span class="input-group-btn">
																<button class="btn btn-default btn-reply" v-on:click="replySub">回复</button>
															</span>
														</div>
														
													</div>
													<div class="col-xs-3 col-sm-2 col-md-3 col-lg-2 ">
														<!-- 第一级回复气泡 -->
														<el-popover width="200" trigger="click">
															<div class="input-group">
																<input class=" form-control input-reply" title="头像地址(选填)" v-model="rface" maxlength="255"
																placeholder="Image URL" oninput="this.value=this.value.replace(/[, ]/g,'')"/>
																<span class="input-group-btn">
																	<button title="清除" class="btn btn-default btn-reply" v-on:click="rface=null">
																		<i class="el-icon-close"></i>
																	</button>
																</span>
															</div>
															<a slot="reference" href="javascript:void(0)" :title="rface==null||rface==''? '头像':'头像地址：'+rface">
																<i class="el-icon-picture-outline"></i>
															</a>
														</el-popover>
													</div>
												</div>
												
											</div>
											
										</div>
										<!-- 回复 -->
										<div class="container-fluid reply-body">
											<!-- 单条回复 -->
											<div class="row reply-row" v-for="reply in com.replyMsgs">
												<!-- 回复者的头像和name区 -->
												<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
													<div>
														<!-- 头像 -->
														<div class="reply-face pull-left">
															<img v-if="reply.msgFace!=null && reply.msgFace!=''" :src="reply.msgFace"
																class="gravatar" :alt="reply.msgNickName" onerror="javascript:this.src='https://api.yimian.xyz/img?type=head';">
															<img v-else src="https://api.yimian.xyz/img?type=head" class="gravatar"
																:alt="reply.msgNickName">
														</div>
														<!-- name -->
														<div class="reply-name pull-left">
															<a href="javascript:void(0)" class="reply-name-a reply-name-a-first">{{reply.msgNickName}}</a>
															 <span v-if="reply.replyId!=reply.sourceMsgId">回复
															<a href="javascript:void(0)" class="reply-name-a">@{{reply.replyName}}</a></span><b>:</b>
														</div>
													</div>
													<!-- 回复内容区 -->
													<span>
														{{reply.context}}
													</span>
												</div>
												<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12  info">
													<time style="padding: 0 20px 0 30px;">{{reply.createTime}}</time>
													<span><a href="javascript:void(0)" v-on:click="showReplyTextBox(com.id,reply.id,reply.msgNickName),openRTBFlag=reply.id">
													<i class="el-icon-chat-dot-square"></i></a></span>
												</div>
												<!-- 这是子级评论的回复框 -->
												<div :id="'replyBox'+reply.id" class="hidden padding-15-0" >
													<div class="container-fluid">
														<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
															<textarea maxlength="249" class="msg-input input-reply form-control" :placeholder="respondent" v-model="rtext"></textarea>
															
														</div>
														<!--  col-sm-push-6 col-md-push-6 col-lg-push-8 -->
														<div class="col-xs-9 col-sm-4 col-md-7 col-lg-4 " style="margin-top: 5px;">
															<div class="input-group ">
																<input class=" form-control input-reply "maxlength="15"
																	placeholder="昵称(选填)" v-model="rname"/>
																<span class="input-group-btn">
																	<button class="btn btn-default btn-reply" v-on:click="replySub">回复</button>
																</span>
															</div>
															
														</div>
														<div class="col-xs-3 col-sm-2 col-md-3 col-lg-2 ">
															<!-- 子级回复气泡 -->
															<el-popover width="200" trigger="click">
																<div class="input-group">
																	<input class=" form-control input-reply" title="头像地址(选填)" v-model="rface" maxlength="255"
																	placeholder="Image URL" oninput="this.value=this.value.replace(/[, ]/g,'')"/>
																	<span class="input-group-btn">
																		<button title="清除" class="btn btn-default btn-reply" v-on:click="rface=null">
																			<i class="el-icon-close"></i>
																		</button>
																	</span>
																</div>
																<a slot="reference" href="javascript:void(0)" :title="rface==null||rface==''? '头像':'头像地址：'+rface">
																	<i class="el-icon-picture-outline"></i>
																</a>
															</el-popover>
														</div>
													</div>
												</div>
											</div>
											
										</div>
										
									</div>
									
								</div>
								
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div class="inner-banner-bottom " id="particles-js2">
			<div class="container bottom-container">

			</div>
		</div>

	</div>

</template>

<script>
	import particlesJs from "particles.js";
	import particlesConfig from '../plugins/particles/particles.json'

	export default {
		name: 'msg',
		data() {
			return {
				uid: null,
				nkname: '',
				email: '',
				network: '',
				msg: '',
				page: 1,
				pageSize: 5,
				pageCount: 0,
				msgCount: 0,
				comment: [],
				faceurl:null,//自定义头像URL
				openRTBFlag:0,//上一个打开的回复区id
				respondent:'',//被回复人名
				rtext:'',//回复文本
				rface:null,//回复人的头像url
				rname:null,//回复人的昵称
				replyId:0,//用于回复的父级id
				sourceMsgid:0//用于回复的源id
			}
		},
		mounted() {
			this.init()
		},
		provide(){
			return{
				reinitMsgb:this.init
			}
		},
		created: function() {
			//this.uid = this.$localStorage.get('user_key')
			this.msgLimit()
			// this.$axios.post('https://api.yimian.xyz/mail',{
			// 	to:'1904963149@qq.com',
			// 	subject:'测试001',
			// 	body:'testBody',
			// 	from:'1527188922@qq.com'
			// }).then(res=>{
			// 	console.log(res)
			// })
		},
		methods: {
			//回复子级评论时：replyId 是被回复评论本身的id 而不是被回复评论的父级id 因为需要将该评论的本身id给新的回复数据当作父级id
			//回复第一级评论时：如果这两个参数相同，表示回复的对象是第一级评论，将第一级评论的本身id作为新回复的源id和父级id
			//respondent 被回复人nickName
			showReplyTextBox(sourceMsgid,replyId,respondent){
				this.replyId = replyId
				this.sourceMsgid = sourceMsgid
				this.respondent = "回复 @"+respondent+"："
				//当前点击的文本框
				var replyDIV = $("#replyBox"+replyId)
				//openRTBFlag 是上一个打开的文本框的id 
				
				 //判断当前点击的回复是否与上一次相同（是否对同一个回复点击了两次或以上）
				if(this.openRTBFlag == replyId){
					//判断文本框打开状态，打开则关闭，反之....
					if(replyDIV.is(':hidden')){
						//打开
						replyDIV.removeClass("hidden")
					}else{
						//关闭
						replyDIV.addClass("hidden")
					}
				}else{
					this.rtext = ""//让回复清空
					//当没有重复点击时进入
					//上一个...关闭
					$("#replyBox"+this.openRTBFlag).addClass("hidden")
					//当前...打开
					replyDIV.removeClass("hidden")
				}
				
				//回复需要参数 源id：sourceMsgid；父级id：replyId；context
				//console.log("源id",sourceMsgid,"父级id",replyId)
			},
			replySub(){
				/**
				 * 回复需要的参数
				 * nickname;context;ip;msg_face;reply_id;source_msg_id
				 * reply_id:是父级id，被回复的评论本身id就是本次的父级id
				 * source_msg_id：是源id，在某个第一级评论下回复，这个第一级评论的本身id就是本次的源id
				 * */
				var ip = returnCitySN["cip"]
				if(this.rtext.trim()==""||this.rtext==null){
					return layer.msg('您还没有输入回复呢~')
				}
				var name = '匿名游客'//传给后端的name
				if(this.rname!=null&&this.rname.trim()!=""){
					name = this.rname  
				}
				// 
				//console.log("昵称",name," ip",ip," 父级id",this.replyId," 源id",this.sourceMsgid," 头像",this.rface," 内容",this.rtext)
				this.$post(this.API.API_MSG_REPLY,{
					msgNickName:name,
					context:this.rtext,
					ip:ip,
					msgFace:this.rface,
					replyId:this.replyId,
					sourceMsgId:this.sourceMsgid
				}).then(res=>{
					if(res){
						this.rname=""
						this.rface=""
						this.rtext=""
						$("#replyBox"+this.replyId).addClass("hidden")
						this.msgLimit()
						layer.msg('发送成功~')
					}else{
						this.$message.error('失败')
					}
				}).catch(error=>{
					alert(error)
				})
			},
			checkMsg() {
				var emailTest = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
				var id = 0;
				var nname = '匿名游客';
				var nk = '';
				if (this.msg.trim() == '') {
					layer.msg('您还没有写留言呢~')
					return
				}
				if (this.uid != null) {
					id = this.uid
				}
				if (this.nkname.trim() != '') {
					nname = this.nkname
				}
				if (this.email.trim() != '' && !emailTest.test(this.email)) {
					layer.msg('邮箱格式错误~')
					return
				}
				if (this.network.trim() != '') {
					nk = this.network
				}
				this.insertMsg(id, nname, this.email, nk)
			},
			insertMsg(uid, name, email, nwork) {
				var ip = returnCitySN["cip"]
				//console.log(uid, name, email, nwork, ip, this.msg)
				this.$post(this.API.API_MSG_INSERT, {
					uid: uid,
					msgNickName: name,
					msgEmail: email,
					network: nwork,
					context: this.msg,
					ip: ip,
					msgFace: this.faceurl
				}).then(res => {
					if (res) {
						this.nkname = ''
						this.email = ''
						this.network = ''
						this.msg = ''
						this.page = 1
						this.faceurl = null
						this.msgLimit()
						layer.msg('发布成功啦~')
					} else {
						this.$message.error('发生错误!')
					}
				})

			},
			init() {
				// params:jparticle true or false 
				var jparticle = this.$localStorage.get("JPARTICLE_FLAG")
				if(jparticle==1){
					particlesJS("particles-js", particlesConfig)
					particlesJS("particles-js2", particlesConfig)
					document.body.style.overflow = "hidden"
				}
			},
			// 分页
			// msgLimit() {
			// 	this.$get(this.API.API_MSG_ALL, {
			// 		page: this.page,
			// 		size: this.pageSize
			// 	}).then(res=>{
			// 		this.comment = res.msgList
			// 		this.pageCount = Math.ceil(res.msgCount / 5)
			// 		this.msgCount = res.msgCount
			// 	})
			// },
			// allmsg
			msgLimit() {
				this.$get(this.API.API_MSG_ALL, {
					page: this.page,
					size: this.pageSize
				}).then(res=>{
					this.comment = res.msgList
					this.pageCount = Math.ceil(res.pageCount / 5)
					this.msgCount = res.msgCount
				})
			},
			// 分页改变时
			pageChange(data) {
				$("#replyBox"+this.openRTBFlag).addClass("hidden")
				this.page = data
				this.msgLimit();
			}
		}
	}

	// document.body.parentNode.style.overflow = "hidden";//隐藏且禁用横向纵向两个滚动条
	// document.body.parentNode.style.overflow = "auto";//开启横向纵向两个滚动条
	// document.body.parentNode.style.overflowX = "hidden";//隐藏横向滚动条
	// document.body.parentNode.style.overflowX = "auto";//开启横向滚动条
	// document.body.parentNode.style.overflowY = "hidden";//隐藏纵向滚动条
	document.body.parentNode.style.overflowY = "auto"; //开启纵向滚动条
</script>

<style src="../assets/css/msg-board.css" scoped="scoped">

</style>
