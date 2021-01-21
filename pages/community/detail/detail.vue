<template>
	<view class="ideaDetail">
		<view class="ideaBy">
			<!-- 发布人信息 -->
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
				<!-- 标签 -->
				<view class="tabs" style="margin:20rpx 0;">
					<u-tag @click="toSearch(tab)" v-for="tab in info.tabs" style="text-align: center;border-radius: 10rpx;" :text="tab" shape="square" />
				</view>
				<!-- 评论标题 -->
				<view v-if="info.ideaTitle" class="">
					{{info.ideaTitle}}
				</view>
				<!-- 评论内容 -->
				<view class="">
					{{info.ideaContent}}
				</view>
			</view>
			<view style="text-align: right;">
				<!-- 评论 -->
				<view style="margin-right: 50rpx;display: inline-block;"><u-icon size="34rpx" name="chat" style="margin-right: 8rpx;"></u-icon>{{info.ideaReply}}</view>
				<!-- 点赞 -->
				<view style="display: inline-block;">
					<u-icon @click="thumbs(info._id)" :color="praise==true?'red':'inherit'"
					name="thumb-up" size="34rpx" style="margin-right: 8rpx;">
					</u-icon>{{info.ideaPraise}}
				</view>
			</view>
			
		</view>
		<!-- 发布的图片 -->
		<view class="ideaImg">
			<image @click="previewImage(url)" :src="url" mode="widthFix" v-for="url in info.ideaImg"></image>
		</view>
		<!-- 回复信息 -->
		<view class="reply" v-if="replys!=0">
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
				<!-- 查看回复信息 -->
				<view @click="lookReply(index)" class="child" v-if="reply.children&&reply.children.length!=0">
					查看{{reply.children.length}}条回复>>
				</view>
			</view>
		</view>
		<u-popup z-index="8" class="popup" v-model="show" :closeable="true" length="70%" mode="bottom" border-radius="14">
			<div class="title">回复信息</div>
			<view v-if="show">
				<view class="popupitem"  v-for="child in replys[index].children">
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
			</view>
			
		</u-popup>
		<view class="bom" v-show="openIssue==false">
			<input @click="openInput" disabled border placeholder="我来评论" class="bom-input"></input>
			<!-- <view class="bom-btn">
				回复
			</view> -->
		</view>
		<view v-show="openIssue" class="issue">
			<view class="responerInfo">
				回复阿松大：撒大大
			</view>
			<view class="issue-main">
				<textarea class="content" placeholder="我来评论" type="textarea"></textarea>
				<view class="btn">
					<view>发表</view>
				</view>
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
				replys:[],
				praise:false,
				openIssue:false
			}
		},
		onLoad(option) {
			// console.log(option.id)
			this.id=option.id
			this.praise=option.praise=='true'?true:false
			// 获取评论的详细信息
			this.getIdeaDetail(option.id)
			this.getReply()
		},
		methods:{
			openInput(){
				this.openIssue=true
			},
			thumbs(id){
				let userInfo=uni.getStorageSync("userInfo");
				// 判断用户是否登录
				if(!userInfo){
					uni.showModal({
					    title: '提示',
					    content: '您还没有登录,是否登录',
							confirmText:"去登录",
					    success: function (res) {
					        if (res.confirm) {
					            uni.redirectTo({
					            	url:"/pages/login/login"
					            })
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
					return
				}
				this.praise=!this.praise
				// 点赞数加一还是减一
				if(this.praise){
					this.info.ideaPraise=this.info.ideaPraise+1
				}else{
					this.info.ideaPraise=this.info.ideaPraise-1
				}
				// 添加用户点赞信息或删除该用户的点赞信息
				let type=this.praise?"add":"del"
				console.log(type)
				console.log(this.info.ideaPraise)
				uniCloud.callFunction({
					name:'idea_thumbs-up',
					data:{
						id:id,
						type:type,
						accountId:userInfo.accountId?userInfo.accountId:"",
						ideaPraise:this.info.ideaPraise
					}
				}).then(res=>{
					console.log(res)
				})
			},
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
				font-size: 26rpx;
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
	.bom{
			position: fixed;
			bottom: 0;
			background-color: #FFFFFF;
			width: 100%;
			z-index: 9;
			height: 100rpx;
			// line-height: 100rpx;
			.bom-input{
				width: 600rpx;
				height: 60rpx;
				background-color: #f8f8f8;
				margin-top: 20rpx;
				margin-left: 75rpx;
				border-radius: 30rpx;
				font-size: 24rpx;
				padding-left:30rpx;
				// line-height: 30rpx;
				
			}
		}
	}
	.issue{
		// <view v-show="openIssue" class="issue">
		// 	<view class="responerInfo">
		// 		回复阿松大：撒大大
		// 	</view>
		// 	<view class="issue-main">
		// 		<u-input placeholder="我来评论" type="textarea"></u-input>
		// 		<view class="btn">
		// 			发表
		// 		</view>
		// 	</view>
		// </view>
		position: fixed;
		bottom: 0;
		background-color: #FFFFFF;
		width: 100%;
		z-index: 9;
		// height: 300rpx;
		padding:20rpx 30rpx;
		.responerInfo{
			padding-bottom: 20rpx;
			font-size: 24rpx;
			display: flex;
		}
		.issue-main{
			display: flex;
			.content{
				width: 570rpx;
				height: 90rpx;
				border-radius: 30rpx;
				background-color: #f8f8f8;
				padding: 30rpx;
				font-size: 28rpx;
			}
			.btn{
				width: 120rpx;
				text-align: center;
				margin-left: 20rpx;
				align-self: flex-end;
				view{
					width: 100rpx;
					background: #ffaaff;
					color:#FFFFFF;
					padding:5rpx 20rpx;
					border-radius: 20rpx;
				}
			}
		}
	}
</style>
