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
				<view class="">
					<image :src="imgurl" mode="widthFix" v-for="imgurl in item.images"></image>
				</view>
			</view>
			<view class="ci-bom">
				<view @click="toComment(item.id)">评论{{item.huifu}}</view>
				<view @click="praise">点赞{{item.num}}</view>
			</view>
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
							"../../static/image/book1018082.jpg",
							"../../static/image/book1018082.jpg"
						]
					}
				]
			}
		},
		methods:{
			toComment(id){
				
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
				text{
					
				}
				view{
					image{
						width: 300rpx;
					}
				}
			}
			.ci-bom{
				display: flex;
			}
		}
	}
</style>
