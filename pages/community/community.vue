<template>
	<view class="community">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view v-for="idea in ideas" class="community-item">
			<view class="ci-top">
				<view class="head">
					<image :src="idea.headPortrait" mode=""></image>
				</view>
				<view class="detail">
					<text class="name">{{idea.ideaBy}}</text>
					<text class="title">{{idea.ideaTime}}</text>
				</view>
			</view>
			<view class="ci-center">
				<text @click="toComment(idea.ideaId)">{{idea.ideaContent}}</text>
				<view class="imgbox">
					<view class="img" v-if="idea.ideaImg.length==3">
						<image @click="previewImage(imgurl)" style="height: 200rpx;" :src="imgurl" mode="widthFix" v-for="imgurl in idea.ideaImg"></image>
					</view>
					<view class="img" v-if="idea.ideaImg.length==2">
						<image @click="previewImage(imgurl)" style="height: 300rpx;" :src="imgurl" mode="widthFix" v-for="imgurl in idea.ideaImg"></image>
					</view>
					<view class="img" v-if="idea.ideaImg.length==1">
						<image @click="previewImage(imgurl)" style="width: 400rpx;border-radius: 10rpx;" :src="imgurl" mode="widthFix" v-for="imgurl in idea.ideaImg"></image>
					</view>
				</view>
			</view>
			<view class="ci-bom">
				<view @click="toComment(idea.ideaId)">评论{{idea.ideaReply}}</view>
				<view @click="praise">点赞{{idea.ideaPraise}}</view>
			</view>
		</view>
		<view class="release" @click="release()">
			+
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				ideas:[]
			}
		},
		created() {
			this.getShareIdea()
		},
		onReachBottom() {
			this.getShareIdea()
		},
		methods:{
			previewImage(url){
				let arr=[]
				arr.push(url)
				uni.previewImage({
				   urls: arr
				});
			},
			getShareIdea(){
				const db = uniCloud.database();//代码块为cdb
				uni.showLoading({
				    title: '加载中'
				});
				// 使用uni-clientDB
				db.collection('shareIdea_table').get().then((res)=>{
						console.log(res.result.data)
						this.ideas=res.result.data;
						uni.hideLoading()
				  }).catch((err)=>{
						console.log(err)
						uni.hideLoading()
				  })
			},
			toComment(id){
				uni.navigateTo({
					url:"/pages/community/detail/detail?id="+id
				})
			},
			release(){
				uni.navigateTo({
					url:"/pages/community/idea/idea"
				})
			},
			praise(){
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.community{
		.community-item{
			width: 92%;
			margin:0 auto;
			border-radius: 30rpx;
			margin-top: 30rpx;
			padding: 20rpx 30rpx;
			background:#FFFFFF;
			.ci-top{
				display: flex;
				.head{
					margin-right: 15rpx;
					image{
						width: 70rpx;
						height: 70rpx;
						border-radius: 70rpx;
					}
				}
				.detail{
					display: flex;
					flex-direction: column;
					.name{
						
					}
					.title{
						
					}
				}
			}
			.ci-center{
				margin-top: 10rpx;
				text{
					
				}
				.imgbox{
					margin-top: 15rpx;
					border-radius: 10rpx;
					overflow: hidden;
					.img{
						display: flex;
						image{
							margin-right: 10rpx;
						}
						image:last-child{
							margin-right: 0rpx;
						}
					}
					
				}
			}
			.ci-bom{
				margin-top: 15rpx;
				display: flex;
				view{
					flex:1;
				}
				view:nth-child(2){
					text-align: right;
				}
			}
		}
	}
	.release{
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 100rpx;
		text-align: center;
		background: #710000;
		position: fixed;
		bottom: 100rpx;
		right:30rpx;
		font-size: 60rpx;
		color:#FFFFFF;
	}
</style>
