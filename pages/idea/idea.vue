<template>
	<!-- 想法 -->
	<view class="idea">
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				ideas:[]
			}
		},
		created(){
			const db=uniCloud.database()
			let userInfo=uni.getStorageSync('userInfo')
			db.collection('shareIdea_table').where({
				accountId:userInfo.accountId
			}).get().then(res=>{
				console.log(res)
			})
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="less">
</style>
