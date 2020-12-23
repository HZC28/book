<template>
	<view class="allcomment">
		<view class="allcomment-item" v-for="comment in comments" :key="comment._id">
			<view class="" @click="toCommentDetail">
				{{comment._id}}
			</view>
		</view>
		<u-button @click="toComment">发表评论</u-button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				bookId:"",
				comments:[],
				pageNum:1,
				total:0
			}
		},
		onLoad(option) {
			this.bookId=option.id;
			this.getComment()
		},
		methods:{
			getComment(){
				// 获取评论信息
				const db = uniCloud.database();//代码块为cdb
				db.collection('comment').skip(10*(this.pageNum-1)).limit(10).where({
					"bookId":this.bookId
				}).orderBy('commentTime','asc').get().then((res)=>{
						this.comments=res.result.data
						console.log(res.result.data)
				  }).catch((err)=>{
						console.log(err)
				  })
				db.collection('comment').where({
					"bookId":this.bookId
				}).count().then((res)=>{
					console.log(res.result.total)
					this.total=res.result.total
				})
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

<style>
</style>
