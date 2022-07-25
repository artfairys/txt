<template>
	<div id="Search">
		<!-- ../assets/imgs/QQ图片20210627180822.jpg -->
		<img ref="bgbox" class="bgbox" src="../assets/imgs/QQ图片20191120171652.jpg" />
		<div @click="coverClick(true)" id="Searchcover" class="Searchcover" style="opacity: 1;"></div>
		<div id="searchEngineBox" class="engine" ref="engine">

			<span @click="selectEngine(1,'baidu')" :class="selected==1 ? 'selected' : ''" class="baidu">
				<svg t="1636132298635" class="icon" viewBox="0 0 1024 1024" version="1.1"
					xmlns="http://www.w3.org/2000/svg" p-id="5489" width="20" height="20">
					<path
						d="M412.54 94.74c13.82-2.69 28.21 0.67 40.52 7.13 18.32 10.72 32.2 27.86 41.03 46.99 18.82 40.57 19.04 88.91 2.38 130.23-7.83 18.05-19.17 35.23-35.44 46.7-14.17 10.44-32.65 15.51-50.08 12.14-14.7-2.84-28.09-10.75-38.4-21.51-16.41-16.26-26.44-37.85-32.21-59.97-7.82-32.14-6.07-66.64 5.6-97.63 7.58-20.05 19.98-38.77 37.36-51.6 8.68-6.21 18.62-10.89 29.24-12.48zM642.54 112.74c14.09-3.24 28.43 1.98 40.47 9.09 12.5 7.77 23.39 18.14 31.82 30.2 13.27 17.99 21.69 39.65 23.54 61.95 1.2 20.12-4.42 39.95-11.88 58.44-8.6 20.17-20.6 39.39-37.41 53.73-11.2 9.99-25.06 17.06-39.91 19.51-15.25 2.42-31.08 0-45.41-5.48-16.19-6.35-29.7-18.93-37.51-34.43-9.97-19.57-12.73-42-12.38-63.72 0.38-12.08 1-24.34 4.57-35.97 5.44-18.49 15.28-35.39 26.82-50.71 9.67-12.59 21.15-23.86 34.29-32.81 7.03-4.53 14.79-8.01 22.99-9.8zM228.55 276.76c14.19-2.87 29.11-0.38 42.36 5.14 27.56 12.82 48.47 37.44 59.87 65.31 4.69 11.29 5.89 23.58 6.5 35.67 1.23 21.99-0.51 44.34-7.05 65.44-5.65 17.81-15.84 34.6-30.88 46-15.06 11.23-33.63 17.35-52.32 18.33-20.48 1.2-41.53-6-56.36-20.3-14.41-13.11-24.12-30.65-30.28-48.96-6.19-18.39-9.2-38.17-6.38-57.49 3.11-23.27 9.52-46.34 20.89-66.98 5.74-10.16 12.93-19.57 21.82-27.18 9.15-7.51 20.19-12.76 31.83-14.98zM773.09 335.14c16.95-1.24 34.45 1.2 49.77 8.79 16.02 7.8 28.92 21.02 38.19 36.07 10.21 17.52 16.89 37.52 16.85 57.94 0.51 21.72 0.12 43.77-5.45 64.91-4.39 15.87-11.71 31.45-23.77 42.96-14.07 13.2-33.49 19.59-52.57 19.96-19.19 0.57-39.12-0.89-56.7-9.27-17.16-7.33-30.5-22.16-37.31-39.39-7.85-19.67-9.44-41.14-9.35-62.12-0.01-24.34 2.7-49.22 12.47-71.74 6.11-13.99 15.56-26.85 28.47-35.25 11.5-8.11 25.55-11.68 39.4-12.86zM499.58 415.76c19.31-2.26 39.11 0.99 56.87 8.84 27.51 12.15 49.18 34.47 65.89 59.02 21.56 32.4 47.59 61.52 74.73 89.3 23.38 23.32 47.52 45.93 72.92 67.05 5.74 4.96 11.94 9.4 17.25 14.85 18.04 18.41 29.75 42.69 33.91 68.05 5.31 31.4-1.18 63.71-13.33 92.79-8.36 21.32-23.98 39.76-43.85 51.21-21.13 12.43-45.72 17.37-69.93 18.95-34.13 1.93-68.29-3.36-101.12-12.43-41.83-13.18-86.85-16.16-130.03-8.51-21.43 4.49-42.94 8.86-64.77 10.85-26.62 2.82-53.48 3.1-80.2 1.62-19.06-0.37-38.15-5.73-54.21-16.1-17.72-10.45-31.47-26.56-41.39-44.4-8.27-15.27-13.79-31.93-17.34-48.89-5.11-24.73-3.54-50.94 5.59-74.56 12.72-33.67 37.73-61.18 65.64-83.21 6.93-5.78 14.54-10.69 21.4-16.56 14.15-13.89 29.74-26.2 43.84-40.14 21.96-21.36 42.44-44.56 58.28-70.89 20.78-35.88 58.42-62.08 99.85-66.84z"
						p-id="5490" fill="rgba(255,255,255,.8)"></path>
				</svg>
			</span>
			<span @click="selectEngine(2,'bing')" :class="selected==2 ? 'selected' : ''" class="bing">
				<svg t="1636132113564" class="icon" viewBox="0 0 1024 1024" version="1.1"
					xmlns="http://www.w3.org/2000/svg" p-id="3885" width="17" height="17">
					<path
						d="M917.077333 447.061333c0-0.256 0.170667-0.512 0.170667-0.768-0.085333-1.152-0.938667-2.048-1.194667-3.157333a20.992 20.992 0 0 0-2.602666-6.826667c-0.853333-1.28-2.048-2.133333-3.157334-3.2-1.194667-1.152-2.005333-2.645333-3.456-3.498666-0.64-0.384-1.408-0.256-2.090666-0.597334-0.554667-0.256-0.853333-0.853333-1.450667-1.066666l-469.333333-170.666667a21.205333 21.205333 0 0 0-27.050667 27.946667l85.333333 213.333333a21.162667 21.162667 0 0 0 11.946667 11.904l137.429333 54.4-390.826666 217.130667 105.6-105.6A21.162667 21.162667 0 0 0 362.666667 661.333333v-554.666666a21.290667 21.290667 0 0 0-13.397334-19.797334l-213.333333-85.333333A21.376 21.376 0 0 0 106.666667 21.333333v853.333334c0 0.597333 0.469333 1.066667 0.512 1.664a20.650667 20.650667 0 0 0 2.858666 9.344c0.725333 1.194667 1.92 1.92 2.858667 2.944 1.365333 1.450667 2.389333 3.242667 4.138667 4.266666l213.333333 128a21.418667 21.418667 0 0 0 22.144-0.042666l554.666667-341.333334a21.333333 21.333333 0 0 0 10.154666-18.176v-213.333333c0-0.341333-0.213333-0.597333-0.256-0.938667z"
						p-id="3886" fill="rgba(255,255,255,.8)"></path>
				</svg>
			</span>
		</div>
		<!--  v-if="searchResul && searchResul.g && searchResul.g.length > 0"  -->
		<div class="container" ref="containerText">
			<div class="row ">
				<!-- style="display: none;" -->
				<div ref="textCol"
					class="col-sm-8 col-md-6 col-lg-6 col-sm-push-2 col-md-push-3 col-lg-push-3 col-xs-10 col-xs-push-1">
					<div class="text-list">
						<div class="advSuggest" @click="trans()"><i class="el-icon-sort"></i><span>翻译：{{wd}}</span>
						</div>
						<div v-for="g in searchResul.g" @click="searchEnter(g.q)">
							{{g.q}}
						</div>
					</div>
				</div>

			</div>
		</div>

		<input autocomplete="off" ref="searchInput" @keyup.enter="searchEnter()" id="SearchInput" class="input" @focus="inputFocus"
			@blur="inputBlur" placeholder="Search" @input="search($event)" v-model="wd" />
		<!-- <el-button @click="search">搜索</el-button> -->
		<div class="current-time" id="currentTime">
			<h1 ref="currentTime" @click="timeClick">{{currenTime}}</h1>
		</div>
		<div class="navbox" id="navbox" @click="navboxClick">
			<div class="all-container">
				<div class="box" id="box1">
					<div class="nav-box">
						<div class="navboxCustom">
							<div class="customNav" v-for="n in navs" @click="toWeb(n)" @mouseover="mouseOver"
								@contextmenu.prevent="openControl(n,$event)" @mouseleave="mouseLeave">
								<template v-if="n">
									<i v-if="n.icon" :class="n.icon" :style="'color:'+ n.color"></i>
									<img v-else :src="'https://www.google.cn/s2/favicons?domain='+n.url" />
									<!-- <i v-else :class="n.icon" :style="'color:'+ n.color"></i> -->
									<div class="nav-title">{{n.title}}</div>
								</template>
							</div>
							<!-- :visible-arrow="false" -->
							<div class="customNav add-nav" id="addNav" @mouseover="mouseOver" @mouseleave="mouseLeave"
								@click="openAddNavBox($event)">
								<i class="el-icon-plus"></i>
							</div>

						</div>
					</div>
				</div>
				<div class="box" id="box2" @mouseover="mouseOver" @mouseleave="mouseLeave">
					<div class="note-list-container">
						<div class="note-list">
							<div class="note-item" @click="addNote">
								<div class="add-note">
									<i class="el-icon-plus"></i>新便签
								</div>
							</div>
							<div v-for="(n,i) in notes" class="note-item" :class="noteSelected == i ? 'note-selected' : ''" @click="noteItemClick(n,i)">
								<span class="note-title">{{n.content}}</span>
								<span class="datetime">{{n.datetime}}</span>
							</div>
						</div>
					</div>
					<textarea id="noteTextarea" @change="noteChange" @input="noteInput" placeholder="在此输入以创建新的便签" v-model="selectedNote.content"></textarea>
					<div class="note-control" id="noteControl">
						<div class="note-delete"><i @click="delNote" class="el-icon-delete-solid"></i></div>
						<div class="note-save"><i @click="saveNote"  class="el-icon-check"></i></div>
						<div class="pull-right" id="saveOk">
							<i class="el-icon-check i-save"></i>已保存
						</div>
					</div>
				</div>

			</div>
			<!-- 切换 nav <-> 便签-->
			<div class="navboxSwitch" id="navboxSwitch" ref="navboxSwitch" @mouseover="mouseOver"
				@mouseleave="mouseLeave">
				<span class="switch-pr left" @click="navclick(1)">
					<span :class="current == 1 ? 'current' : ''"></span>
				</span>
				<span class="switch-pr right" @click="navclick(2)">
					<span :class="current == 2 ? 'current' : ''"></span>
				</span>
			</div>
			<!-- 设置 -->
			<div class="settting-box" id="setttingBox" @mouseover="mouseOver" @mouseleave="mouseLeave"
				@click="settingClick($event)">
				<div class="btns"><i class="el-icon-s-tools"></i></div>
			</div>
			<!-- 设置菜单 -->
			<div id="SettingMenu" class="setting-menu" style="display: none;opacity: 0;transform: scale(0);">
				<div class="setting-item" @click="openBackgroundSettingBox">背景图片</div>
				<div class="setting-item" @click="goto('https://space.bilibili.com/182650267')">反馈</div>
			</div>
		</div>
		<!-- 右键编辑nav弹出div -->
		<div id="editNav"
			style="transform-origin: 0% 0%;transform: scale(0);display: none;visibility: hidden;opacity: 0;transition: .25s;position: absolute;">
			<div class="edit" id="edit" @click="openEditBox($event)">
				<i class="el-icon-edit-outline"></i>
				<span>编辑</span>
			</div>
			<div class="delete" @click="deleteNav()">
				<i class="el-icon-delete"></i>
				<span>删除</span>
			</div>
		</div>
		<!-- 添加nav弹出div -->
		<div id="addNavBox" class="add-nav-popover" style="width:300px;transform: scale(0);">
			<span>{{addBoxTitle}}网址快捷
				<i class="el-icon-close pull-right" @click="clearAdd"></i>
			</span>
			<input class="url" maxlength="1000" autocomplete="off" v-model="nav.url" placeholder="网址"
				@keyup.enter="saveOrEditNav" />

			<input class="title" maxlength="255" autocomplete="off" v-model="nav.title" placeholder="标题"
				@keyup.enter="saveOrEditNav" />

			<span class="pull-right btn-add" @click="saveOrEditNav">保存</span>
		</div>
		<!--  -->
		<div id="settingCover" class="setting-cover" style="display: none;opacity: 0;">
			<div id="biChangeBok" style="display: none;opacity: 0;transform: none;">
				<span title="关闭" class="close-btn" @mouseover="biChangeBokMouseOver" @mouseleave="biChangeBokMouseLeave"
					@click="onClose"><i class="el-icon-close"></i></span>
				<div class="text-center title"></div>
				<div class="setimg-container">
					<h2>设置背景图片</h2>
					<div class="ti">自定义</div>
					<div class="cus-backgound">
						<div class="row">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col">
								<div class="bi-box">
									<div id="backimgSm" class="img">
									</div>
									<div  @mouseover="imgMouseOver" @mouseleave="imgMouseLeave" class="img-mask" id="imgMask"><i  id="iconCheck" class="el-icon-check"></i></div>
								</div>
								<div class="tip">
									<p><strong>将你喜爱的任意图片设为壁纸</strong></p>
									<p><span>建议图像尺寸：1920x1080或更高</span></p>
									<button @click="selectImg">浏览...</button>
									<input @change="imgInputChange" type="file" accept="image/*" id="imgInput" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import moment from 'moment';
	export default {
		name: "Search",
		data() {
			return {
				user: JSON.parse(localStorage.getItem("user")),
				wd: '',
				searchResul: {},
				engine: "baidu",

				selected: 1,
				isFoul: false,
				currenTime: new Date(),
				current: 1,
				navs: [],
				isHover: false,
				nav: {
					url: "",
					title: "",
					createTime: null
				},
				// 判断是编辑还是添加
				editFlag: false,
				addBoxTitle: "添加",
				// 根据这个删除 
				delNav: {
					url: "",
					title: "",
					createTime: null
				},
				notes:[],
				// 是否选中noteItem
				noteSelected:-1,
				selectedNote:{
					userId:null,
					content:null,
					timestamp:null,
					datetime:null
				}
			}
		},
		mounted() {
			document.addEventListener("keydown", function(e) {
				let p = window.location.href
				if (p.indexOf("/start") != -1 && e) {
					var SearchInput = document.getElementById("SearchInput")
					if (e.keyCode == 13) {
						SearchInput.focus()
						return
					}
					for (let code = 65; code <= 90; code++) {
						if (e.keyCode == code) {
							SearchInput.focus()
							break
						}
					}
				}

			})
			// 右键事件 #Search
			var _this = this
			var Searchcover = document.getElementById("Searchcover")
			Searchcover.oncontextmenu = function(e) {
				_this.timeClick()
				return false
			}
			this.$nextTick(() => {
				// 鼠标滚轮事件 #navboxSwitch
				var g = document.getElementById("navboxSwitch")
				g.addEventListener('mousewheel', this.handleScroll, false)
			})

		},
		created() {
			
			var eg = localStorage.getItem("engine")
			if (eg) {
				this.engine = eg
				if (eg == "baidu") {
					this.selected = 1
				} else {
					this.selected = 2
				}
			}
			this.inputNoFocus()
			this.$nextTick(() => {
				this.RefreshLocalTime()
				this.startTime()
				var navs = JSON.parse(localStorage.getItem("haruhi_havs"))
				if (!navs) {
					if (this.user) {
						this.$get(this.API.API_GET_START_NAV, {
							userId: this.user.id
						}).then(res => {
							if (res.code == 0) {
								this.navs = res.data
								localStorage.setItem("haruhi_havs", JSON.stringify(res.data))
								return
							}
							// this.$message.error("失败")
						})
					} else {
						this.$get(this.API.API_GET_START_NAV_DEF).then(res => {
							this.navs = res.data
							localStorage.setItem("haruhi_havs", JSON.stringify(res.data))
						})
					}
				}
				this.navs = navs
				var localNote = JSON.parse(localStorage.getItem("start_notes"))
				if(localNote && localNote.length > 0){
					this.notes = localNote
				}else if(localNote && localNote.length == 0 && this.user){
					this.getNotesByUser()
				}else if(!localNote && this.user){
					this.getNotesByUser()
				}
				
			})
			this.$nextTick(()=>{
				var localBackgoundImg = localStorage.getItem("start_backgoundImg")
				if(localBackgoundImg){
					var backimgSm = document.getElementById("backimgSm")
					this.$refs.bgbox.src = localBackgoundImg
					backimgSm.style.backgroundImage = "url(" + localBackgoundImg + ")"
				}
				
				// var localNotes = JSON.parse(localStorage.getItem("start_notes"))
				// if(localNotes){
				// 	this.notes = localNotes
				// }
			})
		},
		methods: {
			// 根据用户id获取
			getNotesByUser(){
				var u = JSON.parse(localStorage.getItem("user"))
				if(u){
					this.$get(this.API.API_GET_GET_NOTES+"/" + u.id).then(res=>{
						if(res && res.code==0){
							this.notes = res.data
							localStorage.setItem("start_notes",JSON.stringify(res.data))
						}
					})
				}
				
			},
			// 删除便签同步
			delNoteSyn(n){
				// console.log(n)
				if(n && n.length > 0 && this.user && n[0].timestamp){
					this.$post(this.API.API_POST_NOTE_DEL,{
						userId:this.user.id,
						timestamp:n[0].timestamp
					}).then(res=>{
						// console.log(res)
					})
				}
			},
			// 添加或者修改便签同步
			noteChangeSyn(n){
				
				if(n && this.user && n.timestamp){
					n.userId = this.user.id
					this.$post(this.API.API_POST_NOTE_CHANGE,{
						userId:this.user.id,
						timestamp:n.timestamp,
						datetime:n.datetime,
						content:n.content
					}).then(res=>{
						// console.log(res)
					})
				}
			},
			// 添加便签同步
			addNoteSyn(n){
				if(n && this.user && n.userId && n.timestamp){
					this.$post(this.API.API_POST_ADDNOTE,n).then(res=>{
						// console.log(res)
					})
				}
			},
				
			//删除便签
			delNote(){
				var n;
				for(var i = 0,l = this.notes.length;i<l;i++){
					if(this.notes[i].timestamp == this.selectedNote.timestamp){
						n = this.notes.splice(i,1)
						localStorage.setItem("start_notes",JSON.stringify(this.notes))
						var noteControl = document.getElementById("noteControl")
						noteControl.style.display = "none"
						this.noteSelected = -1
						this.selectedNote = {}
						this.delNoteSyn(n)
						break
					}
				}
				
			},
			// 点击保存图标时
			saveNote(){
				// this.noteChange()
				this.showSaveOk()
			},
			showSaveOk(){
				var saveOk = document.getElementById("saveOk")
				saveOk.style.display = "block"
				setTimeout(function(){
					saveOk.style.display = "none"
				},1000)
			},
			// 便签文本框输入事件
			noteInput(){
				if(this.noteSelected == -1){
					var t = new Date()
					var n = {
						userId:this.user ? this.user.id : null,
						content:this.selectedNote.content,
						timestamp:t.getTime(),
						datetime:this.timeFormat(t)
					}
					this.notes.push(n)
					this.$nextTick(()=>{
						localStorage.setItem("start_notes",JSON.stringify(this.notes))
						this.noteItemClick(n,this.notes.length-1)
					})
				}
			},
			// 便签值改变时
			noteChange(){
				var t = new Date()
				var n = null;
				for(var i = 0,l = this.notes.length;i<l;i++){
					if(this.notes[i].timestamp == this.selectedNote.timestamp){
						this.notes[i].datetime = this.timeFormat(t)
						this.noteChangeSyn(this.notes[i])
						break
					}
				}
				localStorage.setItem("start_notes",JSON.stringify(this.notes))
				this.showSaveOk()
			},
			// 点击添加note
			addNote(){
				var t = new Date();
				var n = {
					userId:this.user ? this.user.id : null,
					content:"",
					timestamp:t.getTime(),
					datetime:this.timeFormat(t)
				}
				this.notes.push(n)
				this.$nextTick(()=>{
					let l = this.notes.length
					var noteTextarea = document.getElementById("noteTextarea")
					
					var noteControl = document.getElementById("noteControl")
					
					while(l--){
						if(this.notes[l] === n){
							this.noteSelected = l
							this.selectedNote = this.notes[l]
							// 文本框获取焦点
							noteTextarea.focus()
							// 显示note控件
							noteControl.style.display = "block"
							localStorage.setItem("start_notes",JSON.stringify(this.notes))
							break
						}
					}
					this.addNoteSyn(n)
				})
			},
			// 点击noteitem
			noteItemClick(n,i){
				this.noteSelected = i
				this.selectedNote = n
				if(this.noteSelected != -1){
					// 显示note控件
					var noteControl = document.getElementById("noteControl")
					noteControl.style.display = "block"
					// 文本框获取焦点
					var noteTextarea = document.getElementById("noteTextarea")
					noteTextarea.focus()
				}
			},
			// img 预览图 鼠标移出事件
			imgMouseLeave(){
				var backimgSm = document.getElementById("backimgSm")
				backimgSm.style.transform = "scale(1)"
				this.$nextTick(()=>{
					var imgMask = document.getElementById("imgMask")
					imgMask.style.backgroundColor = "rgba(0,0,0,.5)"
					
					var iconCheck = document.getElementById("iconCheck")
					iconCheck.style.opacity = "1"
				})
			},
			// img 预览图 鼠标移入事件
			imgMouseOver(){
				var imgMask = document.getElementById("imgMask")
				imgMask.style.backgroundColor = "transparent"
				this.$nextTick(()=>{
					var backimgSm = document.getElementById("backimgSm")
					backimgSm.style.transform = "scale(1.05)"
					
					var iconCheck = document.getElementById("iconCheck")
					iconCheck.style.opacity = "0"
				})
			},
			// 当file input值改变时
			imgInputChange() {
				var backimgSm = document.getElementById("imgInput")
				// console.dir((backimgSm.files[0].size / 1024 / 1024).toFixed(2))
				var file = backimgSm.files[0]
				if(file){
					if(file.size < 4 * 1024 * 1024){
						var backimgSm = document.getElementById("backimgSm")
						var reader = new FileReader();
						reader.readAsDataURL(file);
						var _this = this
						//转换成功后
						reader.onloadend = function() {
							var base64 = reader.result
							//将转换结果赋值给img标签
							backimgSm.style.backgroundImage = "url(" + base64 + ")"
							_this.$refs.bgbox.src=base64
							localStorage.setItem("start_backgoundImg",base64)
						}
					}else{
						layer.msg("图片大小不能超过4MB")
					}
				}
			},
			// 打开选择图片窗口
			selectImg() {
				document.getElementById("imgInput").click()
			},
			// 关闭按钮点击事件
			onClose() {
				// 遮罩
				var settingCover = document.getElementById("settingCover")
				settingCover.style.opacity = 0
				setTimeout(function() {
					settingCover.style.display = "none"
				}, 300)

				// box
				var biChangeBok = document.getElementById("biChangeBok")
				biChangeBok.style.opacity = 0

				setTimeout(function() {
					biChangeBok.style.display = "none"
				}, 300)
			},
			// 关闭修改背景的按钮鼠标移除事件
			biChangeBokMouseLeave() {
				// console.log("出去")
				var biChangeBok = document.getElementById("biChangeBok")
				biChangeBok.style.transform = "none"
			},

			// 关闭修改背景的按钮鼠标移入事件
			biChangeBokMouseOver() {
				var biChangeBok = document.getElementById("biChangeBok")
				biChangeBok.style.transform = "rotate3d(1,1,0,5deg)"
			},
			// 打开设置背景图片的窗口
			openBackgroundSettingBox() {
				// 遮罩
				var settingCover = document.getElementById("settingCover")
				settingCover.style.display = "block"
				settingCover.style.opacity = 1
				// box
				var biChangeBok = document.getElementById("biChangeBok")
				biChangeBok.style.display = "block"
				biChangeBok.style.opacity = 1
			},
			// 关闭设置菜单
			settingMenuIsShow() {
				var SettingMenu = document.getElementById("SettingMenu")
				if (SettingMenu.style.display == "block") {
					SettingMenu.style.transform = "scale(0)"
					SettingMenu.style.opacity = "0"
					setTimeout(function() {
						SettingMenu.style.display = "none"
					}, 100)
					return true
				}
				return false
			},
			// 点击设置图标
			settingClick(event) {
				if (this.settingMenuIsShow()) {
					return
				}
				var SettingMenu = document.getElementById("SettingMenu")
				SettingMenu.style.display = "block"
				setTimeout(function() {
					SettingMenu.style.transform = "scale(1.1)"
					SettingMenu.style.opacity = "1"
				})
				setTimeout(function() {
					SettingMenu.style.transform = "scale(1)"
				}, 300)
			},
			// 删除同步数据库
			delNavSyn(param) {
				if (param && this.user && param.createTime && this.user.id) {
					this.$post(this.API.API_POST_NAV_DEL, {
						userId: this.user.id,
						createTime: param.createTime
					}).then(res => {
						// console.log(res)
					})
				}
			},
			// 登录状态,同步添加数据
			addNavSyn(param) {
				if (param && this.user && param.createTime && this.user.id) {
					this.$post(this.API.API_POST_NAV_ADD, {
						userId: this.user.id,
						title: param.title,
						url: param.url,
						createTime: param.createTime
					}).then(res => {
						// console.log(res)
					})
				}
			},
			// 登录状态,同步编辑数据
			editByUser(param) {
				if (param && this.user && param.createTime && this.user.id) {
					this.$post(this.API.API_POST_NAV_UPDATE, {
						userId: this.user.id,
						title: param.title,
						url: param.url,
						createTime: param.createTime
					}).then(res => {
						// console.log(res)
					})
				}
			},
			// 点击编辑打开编辑box
			openEditBox(e) {
				this.editBoxIsShow()
				this.editFlag = true
				this.addBoxTitle = "编辑"
				// this.nav.title = ""
				// this.nav.url = ""
				this.openEOS(e)
			},
			// 删除 nav
			deleteNav() {
				var navs = JSON.parse(localStorage.getItem("haruhi_havs"))
				let l = navs.length
				if (navs && l > 0) {
					for (let i = 0; i < l; i++) {
						if (navs[i].createTime == this.delNav.createTime) {
							var n = navs.splice(i, 1)[0]
							if (n.userId != 0) {
								this.delNavSyn(n)
							}
							break
						}
					}
					this.navs = navs
					localStorage.setItem("haruhi_havs", JSON.stringify(navs))
					this.editBoxIsShow()

				}
			},
			// 添加或者编辑的执行事件
			saveOrEditNav() {

				if (this.nav && this.nav.url && this.nav.title &&
					this.nav.url.trim() != "" && this.nav.title.trim() != "") {
					var navs = JSON.parse(localStorage.getItem("haruhi_havs"))
					// true  = 编辑
					var prefix = new RegExp("http");
					if (this.editFlag) {
						let l = navs.length
						for (let i = 0; i < l; i++) {
							if (navs[i].createTime == this.nav.createTime) {
								navs[i].url = prefix.test(this.nav.url) ? this.nav.url : "http://" + this.nav.url
								navs[i].title = this.nav.title
								this.editByUser(navs[i])
								break
							}
						}

					} else {
						
						// 添加
						var n = {
							userId: this.user ? this.user.id : null,
							url: prefix.test(this.nav.url.trim()) ? this.nav.url.trim() : "http://" + this.nav.url.trim(),
							title: this.nav.title,
							createTime: new Date().getTime()
						}
						navs.push(n)
						this.addNavSyn(n)
					}

					this.navs = navs
					localStorage.setItem("haruhi_havs", JSON.stringify(navs))
					this.$nextTick(() => {
						this.addNavBoxIsShow()
					})
				}

			},
			// 添加box的X
			clearAdd() {
				if (this.addNavBoxIsShow()) {
					return
				}
			},
			// 加号点击事件 显示添加弹框
			openAddNavBox(event) {
				this.editBoxIsShow()
				this.editFlag = false
				this.addBoxTitle = "添加"
				this.nav.title = ""
				this.nav.url = ""
				this.openEOS(event)

			},
			// 打开添加或者编辑box
			openEOS(event) {
				var addBox = document.getElementById("addNavBox")
				if (this.addNavBoxIsShow()) {
					return
				}

				// 弹框从鼠标点击的位置出现
				addBox.style.left = event.clientX - 150 + "px";
				addBox.style.top = event.clientY - 167 + "px";
				// 左边超出时
				if (150 > event.clientX) {
					addBox.style.left = 0 + "px"
				}
				// 右边超出浏览器时
				if (150 > document.body.clientWidth - event.clientX) {
					addBox.style.left = document.body.clientWidth - 300 + "px"
				}
				addBox.style.display = "block"
				// if(event.clientY+147>document.body.clientHeight){
				// 	addBox.style.top = event.clientY - 147 + "px"
				// }
				setTimeout(function() {

					addBox.style.visibility = "visible"
					addBox.style.opacity = 1
					addBox.style.transform = "scale(1.05)"
				}, 15)
				setTimeout(function() {
					addBox.style.transform = "scale(1)"
				}, 300)

			},
			// 判断添加navbox是都存在
			addNavBoxIsShow() {
				var addBox = document.getElementById("addNavBox")
				if (addBox.style.display == "block") {
					addBox.style.visibility = "hidden";
					addBox.style.opacity = 0;
					addBox.style.transform = "scale(0)"
					setTimeout(function() {
						addBox.style.display = "none"
					}, 80)

					return true
				}
				return false
			},
			// 判断右键num是否存在
			editBoxIsShow() {
				var editBox = document.getElementById("editNav")
				if (editBox.style.display == "block") {
					editNav.style.visibility = "hidden";
					editNav.style.opacity = 0;
					editNav.style.transform = "scale(0)"
					setTimeout(function() {
						editNav.style.display = "none"
					}, 50)

					return true
				}
				return false
			},
			// 右键nav 事件 打开编辑右键num
			openControl(param, event) {
				// 判断是否是预设捷径网址
				if (param.userId == 0) {
					document.getElementById("edit").style.display = "none"
				} else {
					document.getElementById("edit").style.display = "block"
				}
				this.addNavBoxIsShow()
				this.nav.url = param.url
				this.nav.title = param.title
				this.nav.createTime = param.createTime
				this.delNav.url = param.url
				this.delNav.title = param.title
				this.delNav.createTime = param.createTime
				var editNav = document.getElementById("editNav")
				editNav.style.display = "block"
				editNav.style.left = event.clientX + "px";
				editNav.style.top = event.clientY + "px";
				if (140 > document.body.clientWidth - event.clientX) {
					editNav.style.left = document.body.clientWidth - 140 + "px"
				}
				setTimeout(function() {
					editNav.style.transform = "scale(1.05)"
					editNav.style.visibility = "visible";
					editNav.style.opacity = 1;
				}, 15)
				setTimeout(function() {
					editNav.style.transform = "scale(1)"
				}, 300)

			},
			toWeb(n) {
				var prefix = new RegExp("http");
				if(prefix.test(n.url)){
					window.open(n.url)
				}else{
					window.open("http://"+n.url)
				}
				
			},
			// 移入
			mouseOver(v) {
				this.isHover = true
			},
			// 移出
			mouseLeave(v) {
				this.isHover = false
			},
			// 鼠标滚轮事件
			handleScroll(e) {
				// 上滑
				if (e.deltaY > 0) {
					this.navclick(2)
				} else {
					// 下滑
					this.navclick(1)
				}
			},
			watchkey() {

			},
			startTime() {
				window.setInterval(() => {
					this.RefreshLocalTime()
				}, 1000)
			},
			RefreshLocalTime() {
				// console.log(new Date())
				let current = new Date()
				let h = current.getHours()
				let m = current.getMinutes()
				if (m < 10) {
					m = "0" + m.toString()
				}
				this.currenTime = h + ":" + m
			},
			clearData() {
				this.wd = ""
				this.searchResul = {}
			},
			// 点击翻译
			trans() {
				if (this.wd) {
					window.open("https://fanyi.baidu.com/#zh/en/" + this.wd)
					this.clearData()
				}

			},
			// 切换卡片
			navclick(t) {
				this.current = t
				var box1 = document.getElementById("box1")
				var box2 = document.getElementById("box2")
				if (t == 1) {
					box2.style.left = "100%"
					box1.style.left = "0px"
					return false;
				} else {
					box1.style.left = "-100%"
					box2.style.left = "0px"
					return false;
				}

			},
			// 主动获取焦点
			inputNoFocus() {
				// console.log(this.$router.history.current.path)
				this.$nextTick((v) => {
					this.$refs.searchInput.focus()
				})
			},
			// 主动失去焦点
			inputNoBlur() {
				this.$nextTick((v) => {
					this.$refs.searchInput.blur()
				})
			},
			searchEnter(w) {
				let wd = w
				if (!wd) {
					wd = this.wd
				}
				if (this.engine && wd) {
					switch (this.engine) {
						case 'baidu':
							window.open("https://www.baidu.com/s?ie=utf-8&word=" + wd)
							break;
						case 'bing':
							window.open("https://cn.bing.com/search?q=" + wd)
							break;
						default:
							break
					}
					this.clearData()
				}
			},
			// 搜索方式点击事件
			selectEngine(code, name) {

				// 控制样式
				this.selected = code
				// 变换搜索方式
				this.engine = name
				localStorage.setItem("engine", name)
				this.inputNoFocus()
				this.searchEnter()

			},
			// 点击时间 h1
			timeClick() {
				var navbox = document.getElementById("navbox")
				if (navbox.style.display == "block") {
					this.navboxClick()
					return
				}

				navbox.style.display = "block"
				navbox.style.visibility = "visible"
				navbox.style.opacity = "1"
				this.$refs.bgbox.className = "bgbox focus"
				var searchInput = this.$refs.searchInput

				this.coverClick(false)
				searchInput.style.visibility = "hidden"
				searchInput.style.opacity = "0"
			},
			// 点击navBox遮罩
			navboxClick() {
				if (this.isHover || this.editBoxIsShow() || this.addNavBoxIsShow() || this.settingMenuIsShow()) {
					return
				}

				var navbox = document.getElementById("navbox")
				// navbox.style.display="none"
				navbox.style.visibility = "hidden"
				navbox.style.opacity = "0"
				this.$refs.bgbox.className = "bgbox"
				var searchInput = this.$refs.searchInput
				searchInput.style.visibility = "visible"
				searchInput.style.opacity = "1"
				searchInput.placeholder = "Search"
				setTimeout(function() {
					navbox.style.display = "none"
				}, 200)

			},
			// 搜索框获取焦点
			inputFocus() {

				var searchInput = this.$refs.searchInput
				// alert(1)
				var engine = this.$refs.engine
				engine.classList.add('active')
				this.$refs.bgbox.className = "bgbox focus"
				searchInput.className = "input inputClick"
				searchInput.placeholder = ""

				if (window.innerWidth <= 600) {
					searchInput.classList.add("input-focus")
					this.$refs.currentTime.style.marginTop = "-40px"

				}

			},
			// 搜索框失去焦点
			inputBlur() {

			},
			// 点击遮罩事件
			coverClick(flag) {
				this.inputNoBlur()
				this.clearData()
				var searchInput = this.$refs.searchInput
				if (flag) {
					this.$refs.bgbox.className = "bgbox"
				}

				searchInput.className = "input"
				searchInput.placeholder = "Search"
				this.$nextTick(function() {
					var engine = this.$refs.engine
					engine.classList.remove('active')
				})

				if (window.innerWidth <= 600) {
					if (searchInput != document.activeElement) {
						searchInput.classList.remove("input-focus")
						this.$refs.currentTime.style.marginTop = "30px"
					}
				}
				// this.searchResul= {}
			},
			// 搜索事件
			search(e) {

				if (!this.wd || this.wd.trim() == "") {
					this.clearData()
					return
				}
				this.$bget(this.API.API_GET_SEARCH, {
					engine: this.engine,
					wd: this.wd
				}).then(res => {
					if (res.code == 0) {
						if (this.engine == "bing") {
							this.bingResult(res.data)
						} else {
							this.searchResul = JSON.parse(res.data)
						}

					}
				})
			},
			// 对bing搜索的返回结果做处理 
			bingResult(htmlData) {
				let list = []
				var doc = new DOMParser().parseFromString(htmlData, 'text/html');
				var textList = doc.querySelectorAll(".sa_tm_text")
				for (var i = 0, l = textList.length; i < l; i++) {
					let textobj = {
						q: textList[i].innerText
					}
					list.push(textobj)
				}
				let searchResul = {
					g: list,
					q: this.wd
				}
				this.searchResul = searchResul
			},
			clearText() {
				var _this = this
				var ct = new Promise(function(resolve, reject) {
					var textList = _this.$refs.textCol
					textList.style.opacity = "0"
					textList.style.transition = "0.3s"
					textList.style.visibility = "hidden"
					// console.log("执行了关闭")
					resolve(textList);

				})
				return ct
				// textList.style.height = "0px"

			},
			// 判断鼠标是否在元素上
			isHoverById(id) {
				var doc = document.getElementById(id)
				if (doc) {
					var wx = window.event.clientX;
					var wy = window.event.clientY;
					var d_left = doc.offsetLeft;
					var d_top = doc.offsetTop;
					var d_width = doc.clientWidth;
					var d_height = doc.clientHeight;
					if (wx < d_left || wy < d_top || wx > (d_left + d_width) || wy > (d_top + d_height)) {
						return false
					}
					return true
				}
				// return false
			},
			isHoverByClass(clazz) {
				var docs = document.getElementsByClassName(clazz)
				let l = docs.length
				let flag = true
				if (docs && l > 0) {
					let flagList = []

					for (let i = 0; i < l; i++) {
						console.dir(docs[i].onmouseover)
						var wx = window.event.clientX;
						var wy = window.event.clientY;
						var d_left = docs[i].offsetLeft;
						var d_top = docs[i].offsetTop;
						var d_width = docs[i].clientWidth;
						var d_height = docs[i].clientHeight;
						if (wx < d_left || wy < d_top || wx > (d_left + d_width) || wy > (d_top + d_height)) {
							flagList.push(false)
							// break
						} else {
							flagList.push(true)
						}
					}
				}

			},
			// 时间戳转 y+"年"+M+"月"+d+"日 "+h+":"+m
			timeFormat(t){
				var y  = t.getFullYear()
				var M = t.getMonth()+1
				var d = t.getDate()
				var h = t.getHours()
				var m = t.getMinutes()
				return y+"年"+M+"月"+d+"日 "+h+":"+m
			},
			goto(url){
				
				window.open(url)
			}
		},
		watch: {
			wd: function(newVal, oldVal) {

				if (newVal && newVal.trim() != "") {
					// this.clearText().then(res=>{
					// 	if(res){
					// 		console.log("开启")
					// 		res.style.opacity = "1"
					// 		res.style.visibility = "visible"
					// 	}
					// })
					this.$refs.textCol.style.opacity = "1"
					this.$refs.textCol.style.visibility = "visible"
					// this.$refs.textCol.style.display = "block"
				} else {
					this.clearText()
				}

			}
		}
	}
</script>

<style>
	@import url("../assets/css/Search.css");
</style>
