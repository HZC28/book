<template>
	<view class="user">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="exit">
			<image src="../../static/icon/tuichu.png" mode="" @click="exit()"></image>
			<!-- <text>退出登录</text> -->
		</view>
		<view class="personInfo">
			<view class="userImg">
				<!-- <uni-icons type=""></uni-icons> -->
				<u-image width="100rpx" height="100rpx" class="img" :src="headPortrait" shape="circle"></u-image>
			</view>
			<view class="userInfo">
				<view class="name">{{name}}</view>
				<view class="me">{{signature}}</view>
			</view>
			
		</view>
		<view class="edit" @click="toEdit()">编辑资料</view>
		<!-- 基本的读者板块 -->
		<view class="reader">
			<view class="reader-top">
				<view class="reader-item">
					<image src="../../static/icon/qiandao.png" mode=""></image>
					<text>签到</text>
				</view>
				<view class="reader-item">
					<image src="../../static/icon/yue.png" mode=""></image>
					<text>余额</text>
				</view>
				<view class="reader-item">
					<image src="../../static/icon/shujia.png" mode=""></image>
					<text>书架</text>
				</view>
				<view class="reader-item">
					<image src="../../static/icon/chongzhi.png" mode=""></image>
					<text>充值</text>
				</view>
			</view>
			<view class="reader-bom">
				<view class="reader-item">
					<image src="../../static/icon/xiangfa.png" mode=""></image>
					<text>想法</text>
				</view>
				<view class="reader-item">
					<image src="../../static/icon/shouchang.png" mode=""></image>
					<text>收藏</text>
				</view>
				<view class="reader-item">
					<image src="../../static/icon/shucheng.png" mode=""></image>
					<text>书城</text>
				</view>
				<view class="reader-item">
					<image src="../../static/icon/xssq.png" mode=""></image>
					<text>申请创作</text>
				</view>
			</view>
		</view>
		<!-- 作家板块 -->
		<view class="author">
			<view class="author-item">
				<image src="../../static/icon/wdcz.png" mode=""></image>
				<text>我的创作</text>
			</view>
			<view class="author-item">
				<image src="../../static/icon/sczj.png" mode=""></image>
				<text>上传章节</text>
			</view>
			<view class="author-item">
				<image src="../../static/icon/dzly.png" mode=""></image>
				<text>读者留言</text>
			</view>
			<view class="author-item">
				<image src="../../static/icon/xssq.png" mode=""></image>
				<text>新书申请</text>
			</view>
		</view>
		<!-- 管理员管理板块 -->
		<view class="admin">
			<view class="admin-item">
				<image src="../../static/icon/sjsh.png" mode=""></image>
				<text>书籍审核</text>
			</view>
			<view class="admin-item">
				<image src="../../static/icon/zjsp.png" mode=""></image>
				<text>作家审批</text>
			</view>
			<view class="admin-item">
				<image src="../../static/icon/sjsj.png" mode=""></image>
				<text>书籍上架</text>
			</view>
			<view class="admin-item">
				<image src="../../static/icon/jbxx.png" mode=""></image>
				<text>举报信息</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:"name",
				signature:"我们读书,就不孤独我们读书,就不孤独",
				headPortrait:""
			}
		},
		onShow() {
			let userInfo=uni.getStorageSync("userInfo");
			if(userInfo){
				this.name=userInfo.userName;
				this.headPortrait=userInfo.headPortrait;
				this.signature=userInfo.signature;
			}
		},
		methods:{
			toEdit(){
				uni.navigateTo({
					url:"/pages/user/userinfo/userinfo"
				})
			},
			exit(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.exit{
		display: flex;
		justify-content: flex-end;
		padding: 30rpx;
		image{
			width:35rpx;
			height:35rpx;
		}
	}
	.edit{
		padding-left: 20rpx;
		font-size: 28rpx;
		color: #F29100;
	}
	.personInfo{
		display: flex;
		// background-color: #69f0f7;
		// height: 300rpx;
		padding: 20rpx 30rpx;
		// justify-content: center;
		align-items: center;
		.userImg{
			padding-right: 30rpx;
			.img{
				
			}
		}
		.userInfo{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.name{
				
				padding-bottom: 20rpx;
			}
			.me{
				overflow: hidden;
			}
		}
	}
	.reader{
		background-color: #FFF;
		padding: 30rpx 10rpx;
		width:96%;
		margin:0 auto;
		border-radius: 20rpx;
		margin-top: 30rpx;
		// position: relative;
		// top: -40rpx;
		.reader-top{
			display: flex;
			align-items: center;
			justify-content: center;
			.reader-item{
				flex: 1;
				// background-color: red;
				text-align: center;
				image{
					width: 60rpx;
					height: 60rpx;
				}
				text{
					display: block;
				}
			}
		}
		.reader-bom{
			margin-top:20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.reader-item{
				flex: 1;
				// background-color: red;
				text-align: center;
				image{
					width: 60rpx;
					height: 50rpx;
				}
				text{
					display: block;
				}
			}
		}
	}
	.author{
		background-color: #FFF;
		padding: 30rpx 10rpx;
		width:96%;
		margin:0 auto;
		margin-top: 50rpx;
		border-radius: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.author-item{
			flex: 1;
			text-align: center;
			image{
				width: 60rpx;
				height: 50rpx;
			}
			text{
				display: block;
			}
		}
	}
	.admin{
		display: flex;
		background-color: #FFF;
		padding: 30rpx 10rpx;
		width:96%;
		margin:0 auto;
		border-radius: 20rpx;
		margin-top: 50rpx;
		.admin-item{
			flex: 1;
			text-align: center;
			image{
				width: 60rpx;
				height: 50rpx;
			}
			text{
				display: block;
			}
		}
	}
</style>
