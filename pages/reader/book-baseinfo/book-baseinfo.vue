<template>
	<view class="book-info">
		<view class="book-baseinfo">
			<view class="book-img">
				<image :src="baseInfo.img"></image>
			</view>
			<view class="book-base">
				<view class="bookName">{{baseInfo.name}}</view>
				<view>{{baseInfo.author}}</view>
				<view class="introduction">{{baseInfo.introduction}}</view>
				<u-rate size="44" :current="baseInfo.score" :disabled="true"></u-rate>
			</view>
		</view>
		<view class="book-operation">
			<!-- heart-fill -->
			<view><u-icon class="icon" size="32" name="heart"></u-icon>收藏</view>
			<view><image class="icon" src="../../../static/icon1/shujia.png" style="width:32rpx;height: 32rpx;"></image>加入书架</view>
			<view><u-icon class="icon" size="32" name="list-dot"></u-icon>目录</view>
		</view>
		<view class="book-comment">
			<view class="comment-title">
				<text>评论</text>
				<text  @click="allComment">全部评论<u-icon name="arrow-right"></u-icon></text>
			</view>
			<view class="comment-item"  v-for="i in 4">
				<view class="title">三体的文采和细节</view>
				<view class="content">由两大家族资助的科研团队在百慕大三角洲发现了一种从未被记录过的新物质，经过研究，发现这种物质作用极其强大，甚至能被一些人吸</view>
				<view class="createinfo">
					<view class="crateby">
						<text style="margin-right: 10rpx;">任飘渺</text>
						<u-rate size="32" :current="4" :disabled="true"></u-rate>
					</view>
					<view class="praise"><u-icon style="margin-right: 5rpx;" name="heart"></u-icon>8</view>
				</view>
			</view>
		</view>
		<u-button type="info" class="btn" @click="allComment">点击查看全部评论</u-button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				baseInfo:{
					img:"../../../static/image/book64141.jpg",
					name:"吞噬灵体",
					author:"唐家三少",
					introduction:"2030年，由两大家族资助的科研团队在百慕大三角洲发现了一种从未被记录过的新物质，经过研究，发现这种物质作用极其强大，甚至能被一些人吸收，从而改变提升身体的素质，他们把这种物质称为灵，把能吸收这种物质的人叫做灵体，两大家族在决定如何使用这种物质的过程中发生分歧，至此两大家族关系破裂。两大家族在进一步研究灵的同时在全世界寻找灵体，两大家族的财力与权利相当，想要超越另一方只能在灵的研究和灵体的数量上下功夫，双方的对抗一直僵持不下，直到2036年一个S级灵体的出现",
					score:"4.4"
				},
				comment:[],
				id:""
			}
		},
		methods:{
			allComment(){
				uni.navigateTo({
					url:"/pages/reader/allcomment/allcomment"
				})
			}
		},
		onLoad(option){
			this.id=option.id
			uni.setNavigationBarTitle({
					title:option.bookName
			});
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #FFFFFF;
	}
	.book-info{
		padding: 0 30rpx;
	}
	.book-baseinfo{
		display: flex;
		padding:10rpx 0rpx;
		.book-img{
			flex: 1;
			image{
				width: 90%;
				height: 300rpx;
			}
		}
		.book-base{
			flex: 2;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.bookName{
				font-size: 42rpx;
				font-weight: bold;
				letter-spacing: 3rpx;
			}
			.introduction{
				overflow:hidden; 
				text-overflow:ellipsis;
				display:-webkit-box; 
				-webkit-box-orient:vertical;
				-webkit-line-clamp:3;
			}
		}
	}
	.book-operation{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 15rpx 0rpx;
		font-size: 35rpx;
		view{
			.icon{
				margin-right: 10rpx;
			}
			flex:1;
			text-align: center;
		}
	}
	.book-comment{
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		// padding: 0 30rpx;
		.comment-title{
			display: flex;
			width: 100%;
			margin-bottom: 30rpx;
			text:nth-child(1){
				flex:1;
				font-size: 32rpx;
				text-align: left;
				font-weight: 600;
			}
			text:nth-child(2){
				flex:1;
				text-align:right;
			}
		}
		.comment-item{
			background: #c8c8c8;
			border-radius: 20rpx;
			padding: 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-bottom: 30rpx;
			.title{
				font-weight: bold;
				font-size: 38rpx;
				padding-bottom: 40rpx;
			}
			.content{
				overflow:hidden;
				text-overflow:ellipsis;
				display:-webkit-box; 
				-webkit-box-orient:vertical;
				-webkit-line-clamp:2;
			}
			.createinfo{
				display: flex;
				padding-top:30rpx;
				align-items: center;
				width: 100%;
				.createby{
					flex:1;
				}
				.praise{
					flex:1;
					text-align: right;
					margin-right: 0rpx;
				}
			}
		}
	}
	.btn{
		// margin-bottom: 100rpx;
		// border-radius: 100rpx;
	}
</style>
