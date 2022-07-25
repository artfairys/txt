<template>
	<div id="WallpapersWish">
		<WallpaperHead/>
		<div class="parent-container">
			<div class="container wallpaper-container">
				<div class="row" v-if="list && list.length>0">
					<template v-for="wall,i in list">
						<div v-if="wall" class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-img">
							<div class="img-box img-thumbnail pull-left"
								:style="'background-image:url(' +API.UPLOADURL +wall.resizeUrl+ '); background-position: center center ;'">
								<div class="download" title="下载" @click="downImage(wall)">下载</div>
								<div title="宽*高" v-if="wall.width && wall.width!=0 && wall.height && wall.height!=0" class="width-height">
									{{wall.width}}*{{wall.height}}
								</div>
								<div title="大小/MB" v-if="wall.size && wall.size!=0" class="size">{{(wall.size).toFixed(2)}}MB</div>
								<div class="wish" @click="cancelWish(wall)">
									<i class="el-icon-close"></i>
									<!-- glyphicon glyphicon-heart-empty -->
								</div>
								
							</div>
						</div>
		
					</template>
		
				</div>
				<div class="row no-wish" v-else>
					<div class="container">
						<span>你还没有喜欢的壁纸，点击图片右下角
						<i class="glyphicon glyphicon-heart"></i>
						喜欢收藏图片
					</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import WallpaperHead from "../components/WallpaperHead.vue"
	export default{
		name:"WallpapersWish",
		components:{
			WallpaperHead:WallpaperHead
		},
		data() {
			return{
				list:[]
			}
		},
		created() {
			let localWall = JSON.parse(localStorage.getItem("wish_wallpaper"))
			if(localWall && localWall.length>0){
				this.list = localWall
			}
		},
		methods:{
			downImage(wallpaper) {
				// 同源情况下才会调用浏览器下载
				let a = document.createElement('a')
				a.download = wallpaper.name
				a.href = this.API.UPLOADURL + wallpaper.url
				a.click();
			},
			// 取消收藏
			cancelWish(wallpaper){
				if(this.list && this.list.length>0){
					let list = this.list
					let l = list.length
					for(let i =0;i<l;i++){
						if(list[i].id == wallpaper.id){
							// i:从i开始移除元素 1:从i开始往后,移除的数量 ,返回被移除的元素
							list.splice(i,1)
							layer.msg("已取消")
							break
						}
						
					}
					localStorage.setItem("wish_wallpaper",JSON.stringify(list))
				}
			}
			
		}
	}
</script>

<style>
	@import url("../assets/css/WallpapersWish.css");
</style>
