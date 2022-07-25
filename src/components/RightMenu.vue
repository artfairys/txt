<template>
	<div id="right-menu">
		<div class="menu-item" :title="jpText=='打开'?'会占用一定的GPU资源':''" v-on:click="jpartControl">{{jpText}}粒子特效</div>
		<!-- <div class="menu-item" v-on:click="live2dControl">{{live2dText}}看板娘</div> -->
		<div class="menu-item" :title="aplayerText=='隐藏'?'不会停止播放':''"
		 v-on:click="aplayerControl">{{aplayerText}}播放器</div>
		<!-- <div class="menu-item-separator"></div> -->
		<div class="menu-item" v-on:click="toNotice">公告</div>
		<div class="menu-item" v-on:click="feedback">反馈</div>
		
	</div>
</template>

<script>
	export default{
		name:"RightMenu",
		data() {
			return{
				jf:this.$localStorage.get("JPARTICLE_FLAG"),
				jpText:"关闭",
				live2dText:'',
				live2dflag:this.$localStorage.get("LIVE2D_FLAG"),
				aplayerText:''
			}
		},
		created() {
			//粒子特效部分
			//var jparticle = this.$localStorage.get("JPARTICLE_FLAG")
			if(this.jf==null&&this.jf!=1&&this.jf!=0){
				this.$localStorage.set("JPARTICLE_FLAG",1)
				this.jpText = "关闭"
			}
			this.jpText = this.jf==1?"关闭":"打开"
			// 看板娘部分
			// var liveflag = this.$localStorage.get("LIVE2D_FLAG")
			// if(liveflag==null||(liveflag!=1&&liveflag!=0)){
			// 	this.$localStorage.set("LIVE2D_FLAG",1)
			// 	$("#waifu").show()
			// }
			// // if(liveflag==0){
			// // 	$("#waifu").hide()
			// // }
			// this.live2dText= $("#waifu").is(':hidden') ? "显示":"隐藏"
			// 播放器部分
			var aplayerflag =  this.$localStorage.get("APLAYER_FLAG")
			if(aplayerflag==null || (aplayerflag!=0&&aplayerflag!=1)){
				this.$localStorage.set("APLAYER_FLAG",1)
				$("meting-js").show()
			}
			if(aplayerflag==0){
				$("meting-js").hide()
			}
			this.aplayerText= $("meting-js").is(':hidden') ? "显示":"隐藏"
			//console.dir($('meting-js'))
			
		},
		mounted() {
			
		},
		methods:{
			feedback(){
				window.open("https://space.bilibili.com/182650267")
			},
			toNotice(){
				layer.msg('暂无')
			},
			aplayerShow(met){
				met.show()
				this.aplayerText="隐藏"
				this.$localStorage.set("APLAYER_FLAG",1)
				
			},
			aplayerHide(met){
				met.hide()
				this.aplayerText="显示"
				this.$localStorage.set("APLAYER_FLAG",0)
				
			},
			aplayerControl(){
				var $met = $('meting-js')
				if($met.is(":hidden")){
					this.aplayerShow($met)
					layer.msg("已显示")
				}else{
					this.aplayerHide($met)
					layer.msg("已隐藏")
				}
			},
			// live2dControl(){
			// 	var $live2d = $("#waifu")
			// 	if($live2d.is(':hidden')){
			// 		// 显示
			// 		$live2d.show()
			// 		this.live2dText="隐藏"
			// 		this.$localStorage.set("LIVE2D_FLAG",1)
			// 		layer.msg("已显示")
			// 	}else{
			// 		// 隐藏
			// 		$live2d.hide()
			// 		this.live2dText="显示"
			// 		this.$localStorage.set("LIVE2D_FLAG",0)
			// 		layer.msg("已隐藏")
			// 	}
			// },
			jpartControl(){
				var j_falg = this.$localStorage.get("JPARTICLE_FLAG")
				var flag = j_falg == 1 ? 0 : 1;
				this.jpText = flag == 1 ? '关闭':'打开'
				this.$localStorage.set("JPARTICLE_FLAG",flag)
				
				
				if(flag==1){
					layer.msg("已打开！刷新/下次进入 页面生效")
				}else{
					layer.msg("已关闭！刷新/下次进入 页面生效")
				}
				
				// this.reinitHome();
				// this.reinitMsgb();
			}
		}
	}
	window.oncontextmenu = function(e) {
		let p = window.location.href
		if(p.indexOf("/start") == -1){
			e.preventDefault(); //阻止浏览器自带的右键菜单显示
			var menu = document.getElementById("right-menu");
			menu.style.display = "block"; //将自定义的“右键菜单”显示出来
			menu.style.left = e.clientX + "px"; //设置位置，跟随鼠标200
			menu.style.top = e.clientY + "px";//131
			// console.log("点击位置x=",e.clientX+200,"点击位置y=",e.clientY)
			// console.log("高=",document.body.clientHeight,"宽=",document.body.clientWidth);
			if(e.clientX+200>document.body.clientWidth){
				menu.style.left = e.clientX - 200 + "px"; 
			}
			if(e.clientY+131>document.body.clientHeight){
				menu.style.top = e.clientY - 131 + "px"
			}
		}
		
	}
	window.onclick = function(e) { //点击窗口，右键菜单隐藏
		var menu = document.getElementById("right-menu");
		menu.style.display = "none";
	}
</script>

<style>
	#right-menu {
		position: absolute;
		width: 160px;
		height: auto;
		border: 1px solid #ddd;
		display: none;
		padding: 10px 15px;
		
		box-shadow: 0 0 10px rgb(0 0 0 / 20%);
		border-radius: 10px;
		background-color: #fff;
		z-index: 19999;
	}
	
	#right-menu .menu-item {
		height: 25px;
		line-height: 25px;
		margin: 4px 0;
		transition: all 0.3s ease;
		background: transparent;
		padding: 0 10px;
		cursor: pointer;
		/* color: #ffa500; */
		opacity: 0.5;
		letter-spacing: 2px;
		font-size: 12px;
		font-weight: bold;
	}
	#right-menu .menu-item:not(:last-child){
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	#right-menu .menu-item:hover {
		color: #FFA500;
		opacity: 1;
	}
	
	#right-menu .menu-item-separator {
		border-top: 1px #ccc solid;
		height: 1px;
	}
</style>
