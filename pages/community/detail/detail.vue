<template>
	<view class="ideaDetail">
		<view class="ideaBy">
			<view class="userInfo">
				<view class="left">
					<image :src="info.headPortrait" mode=""></image>
				</view>
				<view class="right">
					<view>{{info.ideaBy}}</view>
					<view>{{info.ideaTime}}</view>
				</view>
			</view>
			<view class="body">
				<view class="tabs" style="margin:10rpx 0;">
					<u-tag @click="toSearch(tab)" v-for="tab in info.tabs" style="min-width: 140rpx;text-align: center;border-radius: 10rpx;" :text="tab" shape="square" />
				</view>
				<view v-if="info.ideaTitle" class="">
					{{info.ideaTitle}}
				</view>
				<view class="">
					{{info.ideaContent}}
				</view>
			</view>
			<view style="text-align: right;">
				<text style="margin-right: 50rpx;">评论{{info.ideaReply}}</text>
				<text>评论{{info.ideaPraise}}</text>
			</view>
			
		</view>
		<view class="ideaImg">
			<image @click="previewImage(url)" :src="url" mode="widthFix" v-for="url in info.ideaImg"></image>
		</view>
		<view class="reply">
			<u-input border="" class="reply-input"></u-input>
			<view class="reply-btn">
				回复
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			
			return{
				id:"",
				info:{}
			}
		},
		onLoad(option) {
			console.log(option.id)
			this.id=option.id
			this.getIdeaDetail(option.id)
		},
		methods:{
			// 图片预览
			previewImage(url){
				let arr=[]
				arr.push(url)
				uni.previewImage({
				   urls: arr
				});
			},
			toSearch(tab){
				uni.navigateTo({
					url:"/pages/search/search?keyWord="+tab
				})
			},
			getIdeaDetail(){
				let db=uniCloud.database()
				let collection=db.collection("shareIdea_table")
				collection.where({
					ideaId:this.id
				}).get().then(res=>{
					console.log(res.result.data[0])
					this.info=res.result.data[0]
				})
			}
		},
		
	}
</script>

<style lang="less" scoped>
	.ideaDetail{
		
		.ideaBy{
			width: 690rpx;
			margin:0 auto;
			padding:20rpx 20rpx;
			border-radius: 15rpx;
			background: #FFFFFF;
			.userInfo{
				display: flex;
				.left{
					image{
						width:80rpx;
						height: 80rpx;
						border-radius: 40rpx;
					}
				}
				.right{
					margin-left:20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
				}
			}
			
		}
		.ideaImg{
			width: 690rpx;
			margin:0 auto;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-top: 20rpx;
			image{
				// width: 420rpx;
				// height: 220rpx;
				border-radius: 10rpx;
				margin-bottom: 20rpx;
			}
		}
		.reply{
			position: fixed;
			bottom: 0;
			display: flex;
			background-color: #efefef;
			align-items: center;
			width: 100%;
			.reply-input{
				flex:6;
				width: 80%;
			}
			.reply-btn{
				fleX:1;
			}
		}
	}
</style>
