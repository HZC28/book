<template>
	<!-- 书架 -->
	<view class="bookshelf">
		<view class="book">
			<view class="bookitem" v-for="book in books">
				<image class="img" :src="book.img" mode=""></image>
				<!-- <u-checkbox @click="changeStaus" v-show="operate" class="select" shape="circle" v-model="book.checked" active-color="#F29100"></u-checkbox> -->
				<view class="bookname">{{book.bookName}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				books:[],
				operate:true,
				checked:false
			}
		},
		onLoad() {
			this.init()
		},
		onPullDownRefresh() {
			this.init()
		},
		// 去搜索图书
		onNavigationBarSearchInputClicked(){
			uni.navigateTo({
				url:"/pages/search/search"
			})
		},
		methods:{
			init(){
				let db=uniCloud.database()
				let collection=db.collection('bookshelf')
				let userInfo=uni.getStorageSync("userInfo")
				collection.where({
					accountId:userInfo.accountId
				}).get().then(res=>{
					console.log(res)
					this.books=res.result.data[0].books
					this.books.forEach(val=>{
						val.checked=false
						console.log(val)
					})
					uni.stopPullDownRefresh()
				})
			},
			changeStaus(){
				console.log(asd)
			}
		},
		created() {
			
		}
	}
</script>

<style scoped lang="less">
	.bookshelf{
		// color: #F29100;
	}
	.book{
		display: flex;
		width: 100%;
		padding: 30rpx;
		flex-wrap: wrap;
		
		.bookitem{
			text-align: center;
			width: 230rpx;
			margin-bottom: 50rpx;
			position: relative;
			.img{
				width: 200rpx;
				height:270rpx;
			}
			.select{
				position: absolute;
				right:-10rpx;
				z-index: 10;
			}
			.bookname{
				margin-top: 10rpx;
				font-weight: 500;
				font-size: 32rpx;
			}
		}
	}
</style>
