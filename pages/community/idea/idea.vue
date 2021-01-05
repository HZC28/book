<template>
	<view class="release">
		<u-input placeholder="评论标题" class="title" v-model="title" />
		<u-input type="textarea" placeholder="尽情发挥你的想象" v-model="content" class="content"></u-input>
		<!-- <view class="score">
			<text >评分:</text>
			<u-rate  style="padding: 20rpx 0;" size="44" v-model="score"></u-rate>
		</view> -->
		<u-upload upload-text=""   @on-choose-complete="uploadImg" :auto-upload="false" @on-remove="removeImg"></u-upload>

	</view>
</template>

<script>
	export default{
		data(){
			return{
				title:"",
				content:"",
				fileList: [],
				cloudIds:[],
				score:""
			}
		},
		methods:{
			// 上传图片到云存储
			async uploadImg(lists, name){
				 let num=Math.floor(Math.random() * 100)
				let filename=new Date().getTime()+''+num
				const result = await uniCloud.uploadFile({
							filePath: lists[0].url,
							cloudPath: 'upload/'+filename+".jpg",
				 }).then(res=>{
					 let arr=[];
					 arr.push(res.fileID)
					 this.cloudIds.push(res.fileID)
					 uniCloud.getTempFileURL({
					     fileList: arr
					 }).then(res1=>{
						 console.log(res1.fileList[0].tempFileURL)
						 this.fileList.push(res1.fileList[0].tempFileURL)
					 })
				 }).catch(err=>{
					 console.log(err)
				 });
			},
			async getUrl(){
				let result = await uniCloud.getTempFileURL({
				    fileList: this.fileList
				});
				console.log(result.fileList[0].tempFileURL)
			},
			removeImg(index, lists, name){
				console.log(index, lists, name)
				let ids=[]
				ids.push(this.cloudIds[index])
				uniCloud.callFunction({
					name:"removeImage",
					data:{
						ids:ids
					}
				}).then(res=>{
					this.fileList.splice(index,1)
					this.cloudIds.splice(index,1)
					console.log(this.fileList)
				}).catch(err=>{
					console.log(err,"123")
				})
			},
			vrification(){
				let userInfo=uni.getStorageSync("userInfo")
				if(this.content==''){
					this.toast("没有输入评论内容")
					return false
				}
				if(this.score==''){
					this.toast("请先评分再发布")
					return false
				}
				if(!userInfo){
					uni.showModal({
					    title: '提示',
					    content: '您还没有登录,无法发布评论',
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
					return false
				}
				return true
			}
		},
		onNavigationBarButtonTap(obj){
			if(obj.text=="发布"){
				if(!this.vrification()){return}
				console.log(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`)
				let userInfo=uni.getStorageSync("userInfo")
				uniCloud.callFunction({
					name:"releaseComment",
					data:{
						comentBy:userInfo.userName,
						comentTitle:this.title,
						commentContent:this.content,
						score:this.score
					}
				}).then(res=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.release{
		padding:0rpx 30rpx;
		.title{
			border-bottom: 1rpx solid #f5f5f5;
			
		}
		.score{
			text{
				font-size: 36rpx;
				margin-right: 10rpx;
			}
		}
		.content{
			margin-top: 15rpx;
		}
	}
</style>
