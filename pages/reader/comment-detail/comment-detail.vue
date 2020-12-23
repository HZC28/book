<template>
	<view class="comment-detail">
		<view class="">1</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				bookId:"10001",
				commentId:"1",
				pageNum:1,
				total:0
			}
		},
		onLoad(option) {
			// this.bookId=option.bookId
			// this.commentId=option.commentId
			this.init()
		},
		methods:{
			init(){
				const db=uniCloud.database()
				db.collection("reply").skip(10*(this.pageNum-1)).limit(10).where({
					bookId:this.bookId,
					commentId:this.commentId
				}).get().then(res=>{
					console.log(res.result.data)
				})
				db.collection("reply").where({
					bookId:this.bookId,
					commentId:this.commentId
				}).count().then(res=>{
					console.log(res.result.total)
					this.total=res.result.total
				})
			}
		},
		onReachBottom(){
			if(this.total>this.pageNum*10){
				this.pageNum++;
				this.init()
			}
		}
	}
</script>

<style>
</style>
