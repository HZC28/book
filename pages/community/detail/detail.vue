<template>
	<view class="ideaDetail">
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
			<view v-if="info.ideaTitle" class="">
				{{info.ideaTitle}}
			</view>
			<view class="">
				{{info.ideaContent}}
			</view>
		</view>
		<view class="ideaImg">
			<image @click="previewImage(url)" :src="url" mode="center" v-for="url in info.ideaImg"></image>
		</view>
		<view style="text-align: right;">
			<text style="margin-right: 50rpx;">评论{{info.ideaReply}}</text>
			<text>评论{{info.ideaPraise}}</text>
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
		}
	}
</script>

<style lang="less" scoped>
	.ideaDetail{
		padding:10rpx 30rpx;
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
		.ideaImg{
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
			image{
				width: 330rpx;
				height: 220rpx;
				border-radius: 10rpx;
				margin-bottom: 20rpx;
			}
		}
	}
</style>
