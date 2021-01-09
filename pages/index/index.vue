<template>
	<view class="content">
		<view class="theclassify" v-for="i in 3">
			<view class="title">
				分类•{{classifion.classifyName}}
			</view>
			<view class="main">
				<view class="bookInfo" v-for="i in 6">
					<view class="left">
						<image :src="classifion.children[0].imgUrl" mode=""></image>
					</view>
					<view class="right">
						<view class="name">
							{{classifion.children[0].name}}
						</view>
						<view class="author">
							{{classifion.children[0].author}}
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="thebook" v-for="book in books">
			<view class="top">
				<view class="left">
					<image :src="book.img" mode="widthFix"></image>
				</view>
				<view class="right">
					<view class="info">
						<view class="bookName">{{book.bookName}}</view>
						<view class="classify">{{book.classify}}</view>
					</view>
					<view class="author">
						{{book.author}}
					</view>
				</view>
			</view>
			<view class="hr"></view>
			<view class="bom">
				{{book.content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pagesNum:1,
				classifion:{
					classifyName:"玄幻灵异",
					children:[
						{
							name:"太古神王",
							id:"1",
							author:"靳无痕",
							imgUrl:"https://7463-tcb-pko5yqgb8bfjobuecbade-03b550-1304438654.tcb.qcloud.la/book/book1018082.jpg"
						}
					]
				},
				books:[
					{
						bookName:"修仙",
						classify:"悬疑",
						content:"夏薇在这个夏天的中午终于充分的体会到了人倒霉了到底有多严重！那可真是喝口凉水都塞牙，放屁都砸脚后跟，系个鞋带都崴了脚，总而言之用广东话说就是衰到家了！",
						author:"仙人掌的花",
						img:"https://7463-tcb-pko5yqgb8bfjobuecbade-03b550-1304438654.tcb.qcloud.la/book/book1018082.jpg"
					},
					{
						bookName:"修仙",
						classify:"悬疑",
						content:"夏薇在这个夏天的中午终于充分的体会到了人倒霉了到底有多严重！那可真是喝口凉水都塞牙，放屁都砸脚后跟，系个鞋带都崴了脚，总而言之用广东话说就是衰到家了！",
						author:"仙人掌的花",
						img:"https://7463-tcb-pko5yqgb8bfjobuecbade-03b550-1304438654.tcb.qcloud.la/book/book1018082.jpg"
					},
					{
						bookName:"修仙",
						classify:"悬疑",
						content:"夏薇在这个夏天的中午终于充分的体会到了人倒霉了到底有多严重！那可真是喝口凉水都塞牙，放屁都砸脚后跟，系个鞋带都崴了脚，总而言之用广东话说就是衰到家了！",
						author:"仙人掌的花",
						img:"https://7463-tcb-pko5yqgb8bfjobuecbade-03b550-1304438654.tcb.qcloud.la/book/book1018082.jpg"
					},
					{
						bookName:"修仙",
						classify:"悬疑",
						content:"夏薇在这个夏天的中午终于充分的体会到了人倒霉了到底有多严重！那可真是喝口凉水都塞牙，放屁都砸脚后跟，系个鞋带都崴了脚，总而言之用广东话说就是衰到家了！",
						author:"仙人掌的花",
						img:"https://7463-tcb-pko5yqgb8bfjobuecbade-03b550-1304438654.tcb.qcloud.la/book/book1018082.jpg"
					},
					{
						bookName:"修仙",
						classify:"悬疑",
						content:"夏薇在这个夏天的中午终于充分的体会到了人倒霉了到底有多严重！那可真是喝口凉水都塞牙，放屁都砸脚后跟，系个鞋带都崴了脚，总而言之用广东话说就是衰到家了！",
						author:"仙人掌的花",
						img:"https://7463-tcb-pko5yqgb8bfjobuecbade-03b550-1304438654.tcb.qcloud.la/book/book1018082.jpg"
					}
				]
			}
		},
		onLoad() {
			
		},
		onReachBottom() {
			this.init()
		},
		onPullDownRefresh() {
			this.pagesNum=1;
			this.init()
		},
		created() {
			this.init()
		},
		onNavigationBarSearchInputClicked(){
			uni.navigateTo({
				url:"/pages/search/search"
			})
		},
		methods: {
			init(){
				let db=uniCloud.database()
				let collection=db.collection('book')
				uni.showLoading({
					title: '',
					mask: false
				});
				collection.skip(this.pagesNum).limit(10).get().then(res=>{
					console.log(res)
					this.pagesNum=this.pagesNum+10
					uni.hideLoading()
				}).catch(err=>{
					uni.hideLoading()
				})
				uniCloud.callFunction({
					name:'getBookType'
				}).then(res=>{
				})
			},
			addClound(){
				uni.navigateTo({
					url:"/pages/reader/book-baseinfo/book-baseinfo?&id=10001"
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.content{
		padding: 30rpx;
	}
	.theclassify{
		width:690rpx;
		background: #FFFFFF;
		margin-bottom: 50rpx;
		border-radius: 30rpx;
		padding: 30rpx;
		.title{
			margin-bottom: 30rpx;
			font-size: 40rpx;
			letter-spacing: 4rpx;
		}
		.main{
			display: flex;
			flex-wrap: wrap;
			
			.bookInfo{
				width: 50%;
				display: flex;
				align-items: center;
				margin-bottom: 15rpx;
				.left{
					image{
						width:110rpx;
						height: 150rpx;
					}
				}
				.right{
					display: flex;
					flex-direction: column;
					margin-left: 30rpx;
					.name{
						font-size: 32rpx;
						font-weight: 500;
						
					}
					.author{
						margin-top: 10rpx;
						font-size: 28rpx;
						font-weight: 400;
					}
				}
			}
		}
	}
.thebook{
	width:690rpx;
	background: #FFFFFF;
	margin-bottom: 50rpx;
	border-radius: 30rpx;
	padding: 30rpx 0;
	.top{
		width:100%;
		height: 150rpx;
		display: flex;
		align-items: center;
		padding: 0rpx 30rpx;
		.left{
			image{
				width: 100rpx;
				height: 100rpx;
			}
		}
		.right{
			margin-left: 40rpx;
			.info{
				display: flex;
				align-items: center;
				.bookName{
					font-size: 36rpx;
					font-weight: 400;
					letter-spacing: 5rpx;
				}
				.classify{
					font-size: 32rpx;
					padding: 5rpx 15rpx;
					border-radius: 10rpx;
					margin-left: 30rpx;
					color: #FFFFFF;
					background: #aa5500;
				}
			}
			.author{
				margin-top: 20rpx;
				letter-spacing: 3rpx;
			}
		}
	}
	.hr{
		width:690rpx;
		display: block;
		height: 1rpx;
		background: #cccccc;
		margin-top: 30rpx;
		margin-bottom: 15rpx;
	}
	.bom{
		padding: 0rpx 30rpx;
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:4;
		font-size: 32rpx;
		line-height: 74rpx;
		letter-spacing: 2rpx;
	}
}
</style>
