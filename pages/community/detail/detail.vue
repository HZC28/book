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
				<text style="margin-right: 50rpx;"><u-icon size="34rpx" name="chat" style="margin-right: 8rpx;"></u-icon>{{info.ideaReply}}</text>
				<text>
					<u-icon @click="thumbs()" 
					name="thumb-up" size="34rpx" style="margin-right: 8rpx;">
					</u-icon>{{info.ideaPraise}}
				</text>
			</view>
			
		</view>
		<view class="ideaImg">
			<image @click="previewImage(url)" :src="url" mode="widthFix" v-for="url in info.ideaImg"></image>
		</view>
		<view class="reply">
			<view class="replyitem" v-for="(reply,index) in replys">
				<div class="baseinfo">
					<div class="img"><image :src="reply.headPortrait" mode=""></image></div>
					<div class="rigth">
						<div class="createBy">{{reply.userName}}</div>
						<div class="time">{{reply.time}}</div>
					</div>
				</div>
				<view class="content">
					{{reply.content}}
				</view>
				<view @click="lookReply(index)" class="child" v-if="reply.children&&reply.children.length!=0">
					查看{{reply.children.length}}条回复>>
				</view>
			</view>
		</view>
		<u-popup class="popup" v-model="show" :closeable="true" length="70%" mode="bottom" border-radius="14">
			<div class="title">回复信息</div>
			<view class="popupitem" v-if="replys[index].children" v-for="child in replys[index].children">
				<div class="baseinfo">
					<div class="img"><image :src="child.headPortrait" mode=""></image></div>
					<div class="rigth">
						<div class="createBy">{{child.originator}}</div>
						<div class="time">{{child.time}}</div>
					</div>
				</div>
				<view class="content">
					{{child.content}}
				</view>
			</view>
		</u-popup>
		<view class="bom">
			<u-input border="" class="bom-input"></u-input>
			<view class="bom-btn">
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
				show:false,
				info:{},
				index:0,
				replys:[]
			}
		},
		onLoad(option) {
			console.log(option.id)
			this.id=option.id
			// 获取评论的详细信息
			this.getIdeaDetail(option.id)
			this.getReply()
		},
		methods:{
			getReply(){
				let db=uniCloud.database()
				db.collection('ideaReply').where({
					ideaId:this.id
				}).get().then(res=>{
					console.log(res)
					this.replys=res.result.data
				})
			},
			// 点击查看回复信息
			lookReply(index){
				this.show=true
				this.index=index
			},
			// 图片预览
			previewImage(url){
				let arr=[]
				arr.push(url)
				uni.previewImage({
				   urls: arr
				});
			},
			// 点击标签到搜索界面搜索图书
			toSearch(tab){
				uni.navigateTo({
					url:"/pages/search/search?keyWord="+tab
				})
			},
			// 获取评论的详细信息
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
		.bom{
			position: fixed;
			bottom: 0;
			display: flex;
			background-color: #efefef;
			align-items: center;
			width: 100%;
			.bom-input{
				flex:6;
				width: 80%;
			}
			.bom-btn{
				fleX:1;
			}
		}
	}
	.reply{
		background: #FFFFFF;
		margin-bottom: 100rpx;
		width: 690rpx;
		margin:0 auto;
		border-radius: 20rpx;
		padding-bottom: 80rpx;
		.replyitem{
			
			padding:20rpx 0;
			.baseinfo{
				display: flex;
				.img{
					image{
						margin-left: 20rpx;
						margin-right: 20rpx;
						width:80rpx;
						height: 80rpx;
						border-radius: 40rpx;
					}
				}
				.right{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.name{
						flex: 1;
					}
					.time{
						flex: 1;
					}
				}
			}
			.content{
				// border-bottom: 1rpx solid #cccccc;
				margin-left:120rpx;
				margin-right: 30rpx;
				word-wrap: break-word;
				padding-bottom: 20rpx;
				font-size: 30rpx;
				letter-spacing: 2rpx;
				line-height: 36rpx;
			}
			.child{
				margin-left:120rpx;
				color:#00aaff;
				font-size: 20rpx;
			}
		}
	}
	.popup{
		.title{
			padding: 30rpx;
			text-align: center;
			font-size: 33rpx;
		}
		.popupitem{
			border-bottom: 1rpx solid #cccccc;
			padding: 20rpx 0;
			.baseinfo{
				display: flex;
				.img{
					image{
						margin-left: 20rpx;
						margin-right: 20rpx;
						width:80rpx;
						height: 80rpx;
						border-radius: 40rpx;
					}
				}
				.right{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.name{
						flex: 1;
					}
					.time{
						flex: 1;
					}
				}
			}
			.content{
				// border-bottom: 1rpx solid #cccccc;
				margin-left:120rpx;
				margin-right: 30rpx;
				word-wrap: break-word;
				padding-bottom: 20rpx;
				font-size: 30rpx;
				letter-spacing: 2rpx;
				line-height: 36rpx;
			}
		}
	}
</style>
