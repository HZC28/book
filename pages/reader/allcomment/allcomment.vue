<template>
	<view class="allcomment">
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
		<view class="edit" @click="toComment">
			<u-icon size="44" name="edit-pen"></u-icon>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				bookId:"",
				comments:[],
				pagesNum:1,
				total:0
			}
		},
		onLoad(option) {
			this.bookId=option.id;
			console.log(this.bookId)
			this.getTotal()
		},
		onReachBottom(){
			this.getComment()
		},
		methods:{
			getTotal(){
				let db = uniCloud.database();//代码块为cdb
				db.collection('comment').where({
					"bookId":this.bookId
				}).count().then((res)=>{
					console.log(res.result.total)
					this.total=res.result.total
					this.getComment()
				})
			},
			getComment(){
				// 获取评论信息
				let db = uniCloud.database();//代码块为cdb
				if(this.total>(this.pagesNum-1)*10){
					uni.showLoading({
						title:"加载中"
					})
					db.collection('comment').skip(10*(this.pagesNum-1)).limit(10).where({
						"bookId":this.bookId
					}).orderBy('updataTime','desc').get().then((res)=>{
							this.comments=res.result.data
							this.pagesNum++;
							console.log(res.result.data)
							uni.hideLoading()
					  }).catch((err)=>{
							console.log(err)
							uni.hideLoading()
					 })
				}
			},
			onReachBottom(){
				if(this.total>this.pageNum*10){
					this.pageNum++;
					this.getComment()
				}
			},
			toComment(){
				uni.navigateTo({
					url:"/pages/reader/release/release"
				})
			},
			toCommentDetail(){
				uni.navigateTo({
					url:"/pages/reader/comment-detail/comment-detail"
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.allcomment{
		padding:10rpx 30rpx;
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
			border-bottom: 1rpx solid #cccccc;
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
	.edit{
		position: fixed;
		bottom:80rpx;
		right:30rpx;
		width: 80rpx;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		background: #8d8d8d;
		color:#FFFFFF;
	}
</style>
