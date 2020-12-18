<template>
	<view class="content">
		<button @click="addClound">
			reader
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				title:"三体",
				obj:{
					name:"asda",
					tel:"1231wa"
				}
			}
		},
		onLoad() {

		},
		onNavigationBarSearchInputClicked(){
			uni.navigateTo({
				url:"/pages/search/search"
			})
		},
		methods: {
			addClound(){
				uni.navigateTo({
					url:"/pages/reader/book-baseinfo/book-baseinfo?bookName="+this.title+"&id='001'"
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
