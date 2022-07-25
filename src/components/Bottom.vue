<template>
	<div id="Bottom">
		<!-- 目前无法获取网易歌单 -->
		<meting-js :server="music.server" type="playlist" :id="music.id" volume="0.1" loop="all"
			order="random" autoplay="true" preload="auto" list-folded="false" theme="#ffa500" fixed="true">
		</meting-js>
		
		
		<!-- <div id="aplayer" class="aplayer aplayer-withlist aplayer-fixed aplayer-narrow" 
		data-order="random" data-id="" data-server="" data-type="playlist" data-fixed="true" data-autoplay="true" data-volume="0.8">
		
		</div> -->
	</div>
</template>

<script>
	export default{
		name:'Bottom',
		data() {
			return{
				music: {
					// netease
					// tencent
					//默认歌单
					server: 'netease',
					// 5013433554 凉宫春日
					id: '5013433554'
				},
			}
		},
		created() {
			//判断本地是否有自定义歌单
			var cusMusicServ = this.$localStorage.get("CUS_MUSIC_SERVER")
			var cusMusicId = this.$localStorage.get("CUS_MUSIC_ID")
			if (cusMusicServ != null && cusMusicId != null) {
				this.music.server = cusMusicServ
				this.music.id = cusMusicId
			}
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
