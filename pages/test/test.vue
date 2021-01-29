<template>
	<view class="Box">
		<button type="default" @click="reader">读取文件</button>
		{{content}}
		<button type="default" @click="del">删除</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content:"",
				chapters:[],
				img:"",
				title:"",
				bookid:"book3145494"
			}
		},
		methods:{
			reader(){
				uni.request({
				    url: 'https://7463-tcb-pko5yqgb8bfjobuecbade-03b550-1304438654.tcb.qcloud.la/bookInfo/'+this.bookid+'/'+this.bookid+'.json',
				    success: (res) => {
							this.content=res.data.context
							this.img=res.data.img
							this.title=res.data.title
							this.chapters=res.data.chapters
				      console.log(res.data);
							uniCloud.callFunction({
								name:"newBook",
								data:{
									"bookName":this.title,
									"author":"战神霸婿",
									"img":this.img,
									"introduction":this.content,
									"type":"悬疑/推理小说"
								}
							}).then(res=>{
								console.log(res.result)
								this.addChapter(res.result)
							})
				    }
				});
			},
			async addtoChapter(i,id){
				await uni.request({
					url:"https://7463-tcb-pko5yqgb8bfjobuecbade-03b550-1304438654.tcb.qcloud.la/bookInfo/"+this.bookid+"/chapter/"+this.chapters[i].chapterid+".json",
					success:async (res)=> {
						// console.log(res.data.chapter)
						let ret=res.data.chapter?res.data.chapter:''
					  if(ret!=''){
							await uniCloud.callFunction({
								name:"uploadChapter",
								data:{
										bookName:this.title,
										bookid:id,
										chapterContent:ret,
										chapterName:this.chapters[i].chapter
								}
							}).then(res=>{
								console.log(i)
							})
						}
					}
				})
			},
			addChapter(id){
				for(let i=0;i<this.chapters.length;i++){
					setTimeout(()=>{
						this.addtoChapter(i,id)
					},1000*i)
				}
			},
			async del(){
				// 清理全部数据
				const db = uniCloud.database()
				let bookid='161190421498377'
				await db.collection('book').where({
				  bookid: bookid
				}).remove().then(res=>{
					console.log(res)
				})
				await db.collection('bookChater').where({
				  bookid: bookid
				}).remove()
				await db.collection('chapters').where({
				  bookid: bookid
				}).remove()
				
			}
		}
	}
</script>

<style>
	
</style>
