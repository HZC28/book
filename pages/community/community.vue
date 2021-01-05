<template>
	<view class="community">
		<view v-for="item in items" class="community-item">
			<view class="ci-top">
				<view class="head">
					<image src="../../static/image/book1018082.jpg" mode=""></image>
				</view>
				<view class="detail">
					<text class="name">{{item.name}}</text>
					<text class="title">{{item.title}}</text>
				</view>
			</view>
			<view class="ci-center">
				<text>{{item.content}}</text>
				<view class="imgbox">
					<view class="img" v-if="item.images.length==3">
						<image style="height: 200rpx;" :src="imgurl" mode="widthFix" v-for="imgurl in item.images"></image>
					</view>
					<view class="img" v-if="item.images.length==2">
						<image style="height: 300rpx;" :src="imgurl" mode="widthFix" v-for="imgurl in item.images"></image>
					</view>
					<view class="img" v-if="item.images.length==1">
						<image style="width: 400rpx;" :src="imgurl" mode="center" v-for="imgurl in item.images"></image>
					</view>
				</view>
			</view>
			<view class="ci-bom">
				<view @click="toComment(item.id)">评论{{item.huifu}}</view>
				<view @click="praise">点赞{{item.num}}</view>
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
				items:[
					{
						head:"",
						name:"12",
						id:"001",
						num:123,
						title:"绝世武神",
						huifu:"343",
						content:"为你才开始打内存卡省的，大苏打大多都是十大动物弹道式导弹说",
						images:[
							"../../static/image/book1018082.jpg",
							"../../static/image/book1018082.jpg",
							"../../static/image/book1018082.jpg"
						]
					},
					{
						head:"",
						name:"123",
						id:"002",
						num:123,
						huifu:"343",
						title:"绝世武神",
						content:"为你才开始打内存卡省的，大苏打大多都是十大动物弹道式导弹说",
						images:[
							"../../static/image/book1018082.jpg",
							"../../static/image/book1018082.jpg"
						]
					},
					{
						head:"",
						name:"123",
						id:"003",
						num:123,
						huifu:"343",
						title:"绝世武神",
						content:"为你才开始打内存卡省的，大苏打大多都是十大动物弹道式导弹说",
						images:[
							"../../static/image/book1018082.jpg",
							"../../static/image/book1018082.jpg"
						]
					},
					{
						head:"",
						name:"123",
						id:"004",
						num:123,
						huifu:"343",
						title:"绝世武神",
						content:"为你才开始打内存卡省的，大苏打大多都是十大动物弹道式导弹说",
						images:[
							"../../static/image/book1018082.jpg"
						]
					}
				]
			}
		},
		created() {
			this.getShareIdea()
		},
		onReachBottom() {
			this.getShareIdea()
		},
		methods:{
			getShareIdea(){
				const db = uniCloud.database();//代码块为cdb
				uni.showLoading({
				    title: '加载中'
				});
				// 使用uni-clientDB
				db.collection('shareIdea_table').get().then((res)=>{
						console.log(res.result.data)
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
