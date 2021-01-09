<template>
	<!-- 书架 -->
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			init(){
				let db-uniCloud.database()
				let collection=db.collection('bookshelf')
				let account=uni.getStorageSync("userInfo").account
				collection.where({
					account:account
				}).get().then(res=>{
					
				})
			}
		},
		created() {
			
		}
	}
</script>

<style>
</style>
