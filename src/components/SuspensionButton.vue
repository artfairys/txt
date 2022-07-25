<template>
	<div id="SuspensionButton">

		<!-- <div id="dg" style="z-index: 9999; position: fixed !important; right: 0px; bottom: 0px;">
			<div width="100%" style="position: absolute; right: 0px; bottom: 0px;">
				table 内部控件代码
			</div>
		</div> -->
		<div ref="action" class="action" @click="actionTogger()">
			<span class="push-btn">+</span>
			<ul>
				<li @click="goto('/')"><i class="el-icon-s-home"></i>首页</li>
				<li @click="goto('/nav')"><i class="el-icon-location"></i>导航</li>
				<li @click="goto('/wallpaper')"><i class="el-icon-picture"></i>壁纸</li>
				<li @click="goto('/start')"><i class="el-icon-star-on"></i>
					起始页<span class="label label-danger">new</span>
				</li>
				<li @click="goto('/msgboard')"><i class="el-icon-chat-line-round"></i>留言</li>
				<li @click="goto('/account/user')"><i class="el-icon-user-solid"></i>我的</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name:"SuspensionButton",
		methods:{
			actionTogger(){
				var action = this.$refs.action
				action.classList.toggle('active')
			},
			goto(path){
				this.$router.push(path)
			}
		}
	}
</script>

<style>
	@import url("../assets/css/SuspensionButton.css");
</style>
