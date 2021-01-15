<template>
	<view class="book-info">
		<view class="book-baseinfo" v-if="baseInfo.bookName">
			<view class="book-img">
				<image :src="baseInfo.img"></image>
			</view>
			<view class="book-base">
				<view class="bookName">{{baseInfo.bookName}}</view>
				<view>{{baseInfo.author}}</view>
				<view class="introduction">{{baseInfo.introduction}}</view>
				<u-rate size="44" :current="baseInfo.score" :disabled="true"></u-rate>
			</view>
		</view>
		<view class="book-operation" v-if="baseInfo.bookName">
			<!-- heart-fill -->
			<!-- <view><u-icon class="icon" size="32" name="heart"></u-icon>收藏</view>
			<view><image class="icon" src="../../../static/icon1/shujia.png" style="width:32rpx;height: 32rpx;"></image>加入书架</view>
			<view><u-icon class="icon" size="32" name="list-dot"></u-icon>目录</view> -->
		</view>
		<view class="book-comment">
			<view class="comment-title">
				<text>评论</text>
				<text  @click="allComment">全部评论<u-icon name="arrow-right"></u-icon></text>
			</view>
			<view class="allcomment-item" v-for="comment in comments" :key="comment.commentId">
				<view class="left" @click="toCommentDetail">
					<image :src="comment.headPortrait" mode=""></image>
				</view>
				<view class="right">
					<view class="top">
						<text>{{comment.comentBy}}</text>
						<u-rate size="22" active-color="#d3d3d3" inactive-color="#e8e8e8" :current="comment.score" :disabled="true"></u-rate>
					</view>
					<view class="center">
						<view class="">
							{{comment.commentContent}}
						</view>
					</view>
					<view class="bom">
						<view class="time">
							<text>{{comment.commentTime}}</text>
						</view>
						<view class="num">
							<text class="reply"><u-icon name="chat" style="margin-right: 10rpx;"></u-icon>{{comment.commentReply}}</text>
							<text class="praise"><u-icon name="thumb-up" style="margin-right: 10rpx;"></u-icon>{{comment.commentPraise}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <u-button type="info" class="btn" @click="allComment">点击查看全部评论</u-button> -->
		<view class="fixed">
			<view class="left" @click="addBookshelf(id)">加入书架</view>
			<view class="right" @click="toreader(id)">点击阅读</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				baseInfo:{},
				comments:[],
				id:""
			}
		},
		methods:{
			toreader(id){
				uni.navigateTo({
					url:"/pages/reader/reader?bookid="+id
				})
			},
			// 获取基本信息
			init(){
				const db = uniCloud.database();//代码块为cdb
				// 使用uni-clientDB
				db.collection('book').where({
					"bookid":this.id
				}).get({getOne:true}).then((res)=>{
						console.log(res.result.data.img.toString())
						this.baseInfo=res.result.data
				    // res 为数据库查询结果
						uni.setNavigationBarTitle({
								title:this.baseInfo.bookName
						});
				  }).catch((err)=>{
						console.log(err)
				  })
					
					
					
			},
			// 获取评论
			getComments(){
				const db = uniCloud.database();//代码块为cdb
				db.collection('comment').skip(0).limit(3).where({
					"bookId":this.id
				}).orderBy('commentTime','asc').get().then((res)=>{
						this.comments=res.result.data
						console.log(res.result.data)
				  }).catch((err)=>{
						console.log(err)
				  })
			},
			allComment(){
				uni.navigateTo({
					url:"/pages/reader/allcomment/allcomment?id="+this.id
				})
			},
			
		},
		onLoad(option){
			this.id=option.id
			// 获取db引用
			this.init()
			this.getComments()
		}
	}
</script>

<style lang="scss" scoped>
	.book-info{
		
		padding-bottom: 100rpx;
	}
	.book-baseinfo{
		display: flex;
		padding:10rpx 30rpx;
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
		padding: 15rpx 30rpx;
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
		padding: 0 30rpx;
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
	}
	.allcomment-item{
		padding-top: 30rpx;
		display: flex;
		.left{
			image{
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
		}
		.right{
			flex: 1;
			padding-bottom: 30rpx;
			// border-bottom: 1rpx solid #cccccc;
			.top{
				
			}
			.center{
				margin-top: 10rpx;
			}
			.bom{
				margin-top: 15rpx;
				display: flex;
				.time{
					flex: 1;
				}
				.num{
					flex: 1;
					display: flex;
					justify-content: center;
					text{
						flex:1;
						text-align: right;
					}
				}
			}
		}
	}
	.btn{
		width: 690rpx;
		 // margin-bottom: 100rpx;
	}
	.fixed{
		position: fixed;
		bottom: 0;
		display: flex;
		width: 100%;
		background: #cccccc;
		height: 100rpx;
		justify-content: space-around;
		align-items: center;
		font-size: 38rpx;
		letter-spacing: 5rpx;
		font-weight: 500;
		.left{
			background: #FFFFFF;
			color:#ff5500;
			width: 300rpx;
			border-radius: 40rpx;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
		}
		.right{
			background: #ff5500;
			color:#FFFFFF;
			width: 300rpx;
			border-radius: 40rpx;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
		}
	}
</style>
