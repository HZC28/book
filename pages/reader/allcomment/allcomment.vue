<template>
	<view class="allcomment">
		<u-button @click="toComment">发表评论</u-button>
	</view>
</template>

<script>
	export default{
		methods:{
			toComment(){
				uni.navigateTo({
					url:"/pages/reader/release/release"
				})
			}
		}
	}
</script>

<style>
</style>
