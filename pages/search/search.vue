<template>
	<view class="search">
		<view class="search-item" v-for="book in books" @click="tobookInfo(book.bookid)">
			<image :src="book.img" mode=""></image>
			<view class="">
				{{book.bookName}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				keyWords:"",
				books:[]
			}
		},
		methods:{
			tobookInfo(bookid){
				uni.navigateTo({
					url:"/pages/reader/book-baseinfo/book-baseinfo?id="+bookid
				})
			}
		},
		onNavigationBarSearchInputChanged(e){
			this.keyWords=e.text
			console.log(this.keyWords)
		},
		onNavigationBarButtonTap(obj){
			if(obj.text=="搜索"){
				uniCloud.callFunction({
					name:"query",
					data:{
						keyWords:this.keyWords
					}
				}).then(res=>{
					console.log(res.result.data)
					this.books=res.result.data
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.search{
		.search-item{
			display: flex;
			align-items: center;
			padding:5rpx 30rpx;
			background-color: #FFFFFF;
			border-bottom: 1rpx solid #f5f5f5;
			image{
				width: 80rpx;
				height: 120rpx;
			}
			view{
				margin-left: 20rpx;
			}
		}
	}
</style>
