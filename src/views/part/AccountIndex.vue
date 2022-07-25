<template>
	<div id="account-index">
		<div class="panel panel-default ai-main-panel">
			<main class="main">
				<section class="list-item" v-for="(card,i) in cardList">
					<div class="item-image" :title="card.cardTitle">
						<img  class="aimg" :src="card.cardImg" alt="image-1" />
					</div>
					<div class="item-text">
						<div class="text-title">「{{card.cardTitle}}」</div>
						<div class="text-desc">
							{{card.cardDesc}}
						</div>
					</div>
				</section>
			</main>
		</div>
		
	</div>
</template>

<script>
	export default{
		name:"accountIndex",
		data() {
			return{
				cardList:[]
			}
		},
		created() {
			this.queryAnimeCard()
		},
		methods:{
			queryAnimeCard(){
				this.$get(this.API.API_OTHER_ANIMECARD_LIST).then(res=>{
					this.cardList = res;
					//console.log(this.cardList)
				})
			}
		}
	}
</script>

<style src="../../assets/css/account-index.css" scoped="scoped">
	
</style>
