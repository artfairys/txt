<template>
	<div id="Wallpapers">
		<!-- 头部 -->
		<WallpaperHead />
		<!-- -fluid -->
		<div class="parent-container">
			<div class="container wallpaper-container">
				<div class="row">
					<template v-for="wall,i in wallpaperData.list">
						<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-img ">
							<div class="img-box img-thumbnail pull-left"
								:style="'background-image:url(' +API.UPLOADURL +wall.resizeUrl+ '); background-position: center center ;'">
								<div class="download" title="下载" @click="downImage(wall)">下载</div>
								<div title="宽*高" v-if="wall.width && wall.width!=0 && wall.height && wall.height!=0" class="width-height">
									{{wall.width}}*{{wall.height}}
								</div>
								<div title="大小/MB" v-if="wall.size && wall.size!=0" class="size">{{(wall.size).toFixed(2)}}MB</div>
								<div class="wish" title="喜欢" @click="addWish(wall)">
									<i class="glyphicon glyphicon-heart"></i>
									<!-- glyphicon glyphicon-heart-empty -->
								</div>
								
							</div>
						</div>

					</template>

				</div>
			</div>
		</div>
		<div v-if="wallpaperData.count / pageSize > 1" class="container page-container">
			<el-pagination :pager-count="9" background layout="prev, pager, next"
				:total="wallpaperData.count / pageSize * 10" @current-change="currentPageChange">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import WallpaperHead from "../components/WallpaperHead.vue"
	export default {
		name: "",
		data() {
			return {
				wallpaperData: {},
				currentPage: 1,
				pageSize: 24,
				wishWallpaper:[]
			}
		},
		components:{
			WallpaperHead:WallpaperHead
		},
		created() {
			this.getWallpaper()
			
		},
		methods: {
			// 添加喜欢
			addWish(wallpaper){
				let localWall = JSON.parse(localStorage.getItem("wish_wallpaper"))
				if(!localWall){
					let localWall = []
					localWall.unshift(wallpaper)
					localStorage.setItem("wish_wallpaper",JSON.stringify(localWall))
					layer.msg("已添加")
					return
				}
				let flag = true
				for(let i = 0,l=localWall.length;i < l;i++){
					if(localWall[i] && localWall[i].id == wallpaper.id){
						flag = false
						layer.msg("已经在 '我的喜欢' 了")
						break
					}
					
				}
				if(flag){
					localWall.unshift(wallpaper)
					this.$nextTick(function(){
						localStorage.setItem("wish_wallpaper",JSON.stringify(localWall))
						layer.msg("已添加")
					})
				}
			},
			downImage(wallpaper) {
				// 同源情况下才会调用浏览器下载
				let a = document.createElement('a')
				a.download = wallpaper.name
				a.href = this.API.UPLOADURL + wallpaper.url
				a.click();
			},
			// 当前页改变时
			currentPageChange(val) {
				this.currentPage = val
				this.$nextTick(function() {
					this.getWallpaper()
				})
			},
			// 分页获取壁纸
			getWallpaper() {
				this.$post(this.API.API_WALLPAPER_LIST + "/" + this.pageSize + "/" + this.currentPage,{
					enabled:true
				}).then(res => {
					if (res.code == 0) {
						this.wallpaperData = res.data
					} else {
						this.$message.error(res.msg)
					}

				})
			}
		}
	}
</script>

<style>
	@import url("../assets/css/Wallpapers.css");
</style>
