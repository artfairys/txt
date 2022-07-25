<template>
	<div id="Nav">
		<div class="cover">
			<!-- <div class="overlay"></div> -->
			<div class="container">
				<div class="container-fluid">
					<div class="row nav-head">
						<div class="col-xs-12 col-sm-7 col-md-7 col-lg-8">
							<!-- https://api.ixiaowai.cn/api/api.php -->
							<!-- https://api.dongmanxingkong.com/suijitupian/acg/1080p/index.php -->
							<!-- https://count.getloli.com/get/@haruhi -->
							<!-- http://localhost:8081/static/img/QQ%E5%9B%BE%E7%89%8720210508091723.9a7bd035.jpg -->
							<img class="img-responsive img-thumbnail" src="https://api.ixiaowai.cn/api/api.php"
								onerror="javascript:this.src='https://api.dongmanxingkong.com/suijitupian/acg/1080p/index.php';" />
						</div>
						<div class="col-xs-12 col-sm-5 col-md-5 col-lg-4">

							<!-- <div class="views-img ">
								<img class="img-thumbnail" title="访问数" src="https://count.getloli.com/get/@haruhi_v2"
									onerror="javascript:this.src='https://count.getloli.com/get/@haruhi_v2';" 
									alt="访问数"/>
									
							</div> -->
							<div class="views-text ">
								<h2 class="text-center">Haruhi 导航</h2>
							</div>
							<div class="panel panel-default panel-search">
								<div class="panel-body">
									<form target="_blank" action="https://www.baidu.com/s" method="GET">
										<input name="wd" class="form-control" placeholder="百度搜索" autocomplete="off"/>
									</form>
								</div>
								<div class="panel-body">
									<form target="_blank" action="http://clg5.net/search?word=" method="GET">
										<input name="word" class="form-control" placeholder="BT搜索" autocomplete="off"/>
									</form>
								</div>
								<div class="panel-body">
									<form target="_blank" action="https://zh.moegirl.org.cn/index.php?search="
										method="GET">
										<input name="search" class="form-control" placeholder="萌娘百科搜索" autocomplete="off"/>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div class="row nav-body">
						<div v-for="(type,i) in links" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<div class="panel panel-default nav-panel">
								<div class="panel-heading nav-panel-head">
									<i class="glyphicon glyphicon-tag"></i> <strong>{{type.label}}</strong>
								</div>
								<div class="panel-body nav-panel-body">
									<div class="row">
										<div v-for="address in type.addressList"
											class="col-xs-6 col-sm-4 col-md-4 col-lg-3 nav-item"
											v-on:click="toNet(address.url)" :title="address.url">
											<el-tooltip popper-class="nav-el-tooltip" effect="light" :content="address.scontent"
												placement="top">
												<el-card shadow="hover">
													<strong>
														<img class=" img-circle img-thumbnail"
															:src="'https://www.google.cn/s2/favicons?domain='+address.url" />
														{{address.name}}
													</strong>
												</el-card>
											</el-tooltip>

										</div>
									</div>

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
	export default {
		name: 'Nav',
		data() {
			return {
				// imgurls: ['https://tvax4.sinaimg.cn/large/0072Vf1pgy1foxkd4s1rxj31hc0u0qo0.jpg',
				// 	'https://tvax4.sinaimg.cn/large/0072Vf1pgy1foxk7j6oxuj31hc0u0k6u.jpg',
				// 	'http://localhost:8081/static/img/QQ%E5%9B%BE%E7%89%8720210508091723.9a7bd035.jpg'
				// ],
				links: []
			}
		},
		created() {
			// layui.use('carousel', function() {
			// 	var carousel = layui.carousel;
			// 	//建造实例
			// 	carousel.render({
			// 		elem: '#test1',
			// 		width: '100%', //设置容器宽度
			// 		arrow: 'none', //箭头
			// 		indicator: 'none', //指示
			// 		interval: 2000
			// 	});
			// });

			this.getAddress()
		},
		methods: {
			toNet(url) {
				window.open(url)
			},
			getAddress() {
				this.$get(this.API.API_ADDRESS_ALL_TYPE_V2).then(res => {
					this.links = res
					//console.log(res)
				})
			}
		}
	}
</script>

<style>
	@import url("../assets/css/nav.css");
</style>
