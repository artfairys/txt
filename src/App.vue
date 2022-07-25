<template>
	<div id="wrapper">
		<router-view />
		<RightMenu />
		<SuspensionButton v-if="SuspensionButtonFlag" />
		<Bottom ref="Bottom" v-if="isRouterAlive" />
	</div>
</template>

<script>
	import SuspensionButton from "./components/SuspensionButton.vue"
	export default {
		name: 'app',
		//inject: ['reinitHome'], 
		components: {
			SuspensionButton: SuspensionButton
		},
		data() {
			return {
				SuspensionButtonFlag: true,
				isRouterAlive: true //默认显示播放器
			}
		},
		provide() {
			// var _0xde02 = ["length", "", "debugger", "constructor"];
			// !(function anonymous() {
			// 	try {
			// 		!(function _0x6ba3x2(_0x6ba3x3) {
			// 			((_0xde02[1] + _0x6ba3x3 / _0x6ba3x3)[_0xde02[0]] !== 1 || _0x6ba3x3 === 0) && function() {}
			// 			[_0xde02[3]](_0xde02[2])(),
			// 			_0x6ba3x2(++_0x6ba3x3)
			// 		}(0))
			// 	} catch (e) {
			// 		setTimeout(anonymous)
			// 	}
			// }())

			return {
				reloadbtm: this.reloadbtm
			}
		},
		created() {

		},
		//模板编译完成，数据挂载完毕
		mounted() {
			// window.addEventListener('storage', event => {
			// 	console.log(event)
			// 	//localStorage.setItem(event.key,event.oldValue)
			// })
			var p = window.location.href
			this.SuspensionButtonFlag = p.indexOf("/start") == -1
		},
		methods: {
			reloadbtm() {
				this.isRouterAlive = false;
				this.$nextTick(function() {
					this.isRouterAlive = true
				})
			}
		},
		watch: {
			$route(to, from) {
				this.SuspensionButtonFlag = to.path.indexOf("/start") == -1
			}
		}
	}
</script>

<style>
	body::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 0px;
		/*高宽分别对应横竖滚动条的尺寸*/
		/* height: 1px; */
	}
</style>
