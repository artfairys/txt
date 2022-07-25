<template>
	<div id="hitoko">
		<div class="container-fluid" style="padding: 0;">
			<div class="panel panel-info panel-hitoko">
				<!-- 头部 -->
				<div class="panel-heading panel-heading-hitoko">
					<h3><i class="el-icon-chat-dot-square"></i>历史一言
						<b class="pull-right">
							<a title="order by date asc/desc" href="javascript:void(0)" v-on:click="hikoList.reverse()">
								<i class="el-icon-sort"></i>
							</a>
							<a title="添加一言" href="javascript:void(0)" v-on:click="openAddBox">
								<i class="el-icon-plus"></i>
							</a>
							
						</b>
					</h3>
						
				</div>
				<div class="panel-body panel-body-hitoko">
					<div v-if="hikoList.length>0" class="hitokos-body-exist">
						<el-timeline>
							<el-timeline-item v-for="(hiko,i) in hikoList"
							:timestamp="hiko.createTime" placement="top" icon="el-icon-date" size="large" color="#67c23a">
								<a href="javascript:void(0)" :title="hiko.content"
								v-on:dblclick="showEditBox(hiko)">
									<el-card>
										<h4><span>{{hiko.content}}</span></h4>
									</el-card>
								</a>
								
							</el-timeline-item>
						</el-timeline>
					</div>
					<!-- 没有记录时... -->
					<div v-else class="hitokos-body-notexist ">
						<div class="container-fluid">
							<div class="row row-notexist ">
								<div class="col-xs-12 col-md-12 col-sm-12 col-lg-12 col-text text-center">
									<h3 ><span>目前还没有记录,从现在开始记录一言吧!</span></h3>
								</div>
								<div class="col-xs-12 col-md-12 col-sm-12 col-lg-12 col-tbox">
									<textarea v-model="newHitoko" class="form-control" maxlength="60"
									placeholder="开始记录吧..." ></textarea>
								</div>
								<div class="col-xs-12 col-md-12 col-sm-12 col-lg-12 col-btn">
									<button class="notexist-sub pull-right" v-on:click="subHikoto">提交</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- 底部 默认不打开，点击修改或者添加时出现 -->
				<div v-if="footer_falg==1" class="panel-footer">
					<div class="container-fluid">
						<div class="row">
							<textarea v-model="newHitoko" class="form-control" maxlength="60"
							:placeholder="placeholder" ></textarea>
						</div>
						<div class="row">
							<button v-if="addOrEdit==1" class=" pull-right" v-on:click="updateHikoto">修改</button>
							<button v-else class=" pull-right" v-on:click="subHikoto">提交</button>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "hitoko",
		data() {
			return {
				user:{},
				hikoList:{},
				newHitoko:"",//预添加的hitoko
				footer_falg:0,//panel-footer是否打开 1：打开 0 关闭
				addOrEdit:1,//0表示添加
				placeholder:"",
				ehId:0,//预修改的数据id
				temHitoko:''//临时，用来判断预修改的和原..是否一致
			}
		},
		created() {
			var u = JSON.parse(this.$localStorage.get('user'))
			if (u != null) {
				this.user = u
				//sessionStorage.setItem("user",JSON.stringify(u))
			}
			this.findHitoByUid()
		},
		methods: {
			// 开打添加box
			openAddBox(){
				this.footer_falg = this.footer_falg == 1 ? 0 : 1;
				// this.footer_falg=1
				this.addOrEdit = 0
				this.newHitoko=""
				this.placeholder="添加今天的一言吧"
			},
			//修改当天的...
			updateHikoto(){
				if(this.newHitoko.trim()==""){
					return layer.msg("你还什么都没写~")
				}
				if(this.temHitoko==this.newHitoko){
					return layer.msg("你还没有修改~")
				}
				this.$post(this.API.API_HITOKO_UPDATE,{
					id:this.ehId,
					content:this.newHitoko
				}).then(res=>{
					console.log(res)
					if(res.code<0){
						return this.$message({
							type:res.type,
							message:res.msg
						})
					}
					this.newHitoko=""
					this.footer_falg = 0
					this.findHitoByUid()
					layer.msg("已更新~")
				})
			},
			//双击事件 判断是否修改当天的。。。
			showEditBox(hitoko){
				// checkDate 返回的是一个已经存在结果的请求
				//需要.then(=>{})获取结果，其他$post...等同理
				// console.log("hitoko.createTime",hitoko.createTime)
				// this.checkDate(this.standardParse(this.timeParse(hitoko.createTime))).then(({flag})=>{
				// 	if(flag){
				// 		this.footer_falg = this.footer_falg == 1 ? 0 : 1;
				// 		this.ehId = hitoko.id
				// 		this.addOrEdit = 1
				// 		this.temHitoko = hitoko.content 
				// 		this.newHitoko=hitoko.content 
				// 		this.placeholder = '只能修改当天添加的一言'
				// 	}else{
				// 		layer.msg("只能修改当天添加的哦~")
				// 		this.footer_falg = 0
				// 	}
				// })
				// if(this.footer_falg == 1){
				// 	this.footer_falg = this.footer_falg == 1 ? 0 : 1;
				// 	return
				// }
				this.$post(this.API.API_HITOKO_CHECKDATEEQUALSNOW,{
					id:hitoko.id
				}).then(res=>{
					if(res.data){
						this.footer_falg = this.footer_falg == 1 ? 0 : 1;
						this.ehId = hitoko.id
						this.addOrEdit = 1
						this.temHitoko = hitoko.content 
						this.newHitoko=hitoko.content 
						this.placeholder = '只能修改当天添加的一言'
					}else{
						layer.msg("只能修改当天添加的哦~")
						this.footer_falg = 0
					}
				})
				
			},
			//提交 公用...
			subHikoto(){
				//ActiveXObject
				if(this.newHitoko.trim()==""){
					return layer.msg("你还什么都没写~")
				}
				this.$post(this.API.API_HITOKO_INSERT,{
					userId:this.appUser.id,
					content:this.newHitoko
				}).then(res=>{
					if(res.code<0){
						this.newHitoko=""
						this.footer_falg = 0
						return this.$message({
							type:res.type,
							message:res.msg
						})
					}
					this.newHitoko=""
					this.footer_falg = 0
					this.findHitoByUid()
					layer.msg("添加成功~")
				})
			},
			findHitoByUid() {
				this.$get(this.API.API_HITOKO_QUERY, {
					uid: this.user.id
				}).then(res => {
					this.hikoList = res.hitokos
				})
			}
		}
	}
</script>

<style>
	@import url("../../assets/css/hitoko.css");
</style>
