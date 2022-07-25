<template>
	<div id="ManageNavMenu">
		<el-container>
			<el-header>
				<el-menu
				  class="el-menu-demo"
				  mode="horizontal"
				  active-text-color="#ffa500">
				  <!-- <el-menu-item index="1" class="pull-right">处理中心</el-menu-item> -->
				  <!-- https://himg.bdimg.com/sys/portrait/item/pp.1.a3ddae16.aaVVoaDOrGPgaVPxkwN14w.jpg?tt=1597994429974 -->
				  <el-submenu index="1" class="pull-right">
				    <template slot="title">{{user.nickName}}
						<el-avatar v-if="user.face" size="large" :src="user.face"></el-avatar>
						<el-avatar v-else size="large" src="https://himg.bdimg.com/sys/portrait/item/pp.1.a3ddae16.aaVVoaDOrGPgaVPxkwN14w.jpg?tt=1597994429974"></el-avatar>
					</template>
				   <!-- <el-menu-item index="1-1">选项1</el-menu-item>
				    <el-menu-item index="1-2">选项2</el-menu-item> -->
					<a v-on:click="logout" style="text-decoration: none;">
						<el-menu-item index="1-3" >退出登录</el-menu-item>
					</a>
				  </el-submenu>
				</el-menu>
			</el-header>
		</el-container>
		<div class="left">
			<el-button v-on:click="change">
				<i :class="icon"></i>
			</el-button>
			<el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse"
				background-color="#545c64" text-color="#fff" active-text-color="#ffa500"
				style="height: 90vh;">
				<router-link to="/manage/users">
					<el-menu-item index="1">
						<i class="el-icon-user"></i>
						<span slot="title">用户管理</span>
					</el-menu-item>
				</router-link>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-position"></i>
						<span>导航管理</span>
					</template>
					<el-menu-item-group>
						<router-link to="/manage/nav">
							<el-menu-item index="2-1">网址管理</el-menu-item>
						</router-link>

						<router-link to="/manage/navtype">
							<el-menu-item index="2-2">类型管理</el-menu-item>
						</router-link>
					</el-menu-item-group>
				</el-submenu>
				<router-link to="/manage/msg">
					<el-menu-item index="3">
						<i class="el-icon-chat-dot-square"></i>
						<span slot="title">留言管理</span>
					</el-menu-item>
				</router-link>
				<router-link to="/manage/defaultface">
					<el-menu-item index="4">
						<i class="el-icon-user-solid"></i>
						<span slot="title">默认头像管理</span>
					</el-menu-item>
				</router-link>
				<router-link to="/manage/autoYiBanRemindPunch">
					<el-menu-item index="5">
						<i class="el-icon-time"></i>
						<span slot="title">易班打卡提醒管理</span>
					</el-menu-item>
				</router-link>
				<el-submenu index="6">
					<template slot="title">
						<i class="el-icon-picture-outline"></i>
						<span>壁纸管理</span>
					</template>
					<el-menu-item-group>
						<router-link to="/manage/wallpaper/upload">
							<el-menu-item index="6-1">上传壁纸</el-menu-item>
						</router-link>
						<router-link to="/manage/wallpaper">
							<el-menu-item index="6-2">壁纸管理</el-menu-item>
						</router-link>
					</el-menu-item-group>
				</el-submenu>
				<el-menu-item index="7">
					<i class="el-icon-headset"></i>
					<span slot="title">歌单管理</span>
				</el-menu-item>
				<el-menu-item index="8">
					<i class="el-icon-collection-tag"></i>
					<span slot="title">一言管理</span>
				</el-menu-item>
				<el-menu-item index="9">
					<i class="el-icon-edit"></i>
					<span slot="title">笔记管理</span>
				</el-menu-item>
			</el-menu>
		</div>
		<div class="right">
			<div class="container-fluid">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ManageNavMenu',
		data() {
			return {
				user:{},
				isCollapse: true,
				icon: "el-icon-arrow-right",

			}
		},
		created() {
			var u = JSON.parse(this.$localStorage.get('user'))
			if (u != null) {
				this.user = u
				//sessionStorage.setItem("user",JSON.stringify(u))
			}
		},
		methods: {
			change() {
				this.isCollapse = this.isCollapse ? false : true
				this.icon = this.icon == "el-icon-arrow-right" ? "el-icon-arrow-left" : "el-icon-arrow-right"
			},
			logout(){
				localStorage.removeItem("A_T")
				this.$nextTick(function(){
					this.$router.replace({
						path: "/admin",
						name: "AdminLogin"
					})
				})
				
			}
		}
	}
</script>

<style>
	/* #ManageNavMenu .el-menu-vertical-demo {
		margin: 0 ;
		width: 100%;
	} */
	
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}

	/* #ManageNavMenu .el-main{
		height: 90vh;
		overflow-y: auto;
	} */
	#ManageNavMenu .left {
		float: left;
		height: 100%;
	}

	#ManageNavMenu .left button {
		width: 100%;
		height: 100%;
		/* background-color: #545c64; */
		margin-bottom: 5px;
	}

	#ManageNavMenu .right {
		/* background-color: #BBBBBB; */
		max-width: 100%;
		height: 90vh;
		overflow-y: auto;
		margin-top: 20px;

	}

	#ManageNavMenu .right::-webkit-scrollbar {
		width: 0px;
	}
	
</style>
