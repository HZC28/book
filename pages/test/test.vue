<template>
	<view class="Box">
		<!-- <button type="default" @click="reader">读取文件</button>
		{{content}} -->
		
		<button type="default" @click="del">删除</button>
		<button type="error" @click="addnewbook">手动添加一本新图书</button>
		<button type="default" @click="addLocaltionChapter">添加本地章节</button>
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
		mounted() {
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
				// "bookid":"161190427615654"
				const db = uniCloud.database()
				let bookid='162832145157538'
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
				
			},
			// 手动新增一本新的图书
			addnewbook(){
				uniCloud.callFunction({
					name:"newBook",
					data:{
						"bookName":'大主宰',
						"author":"天蚕土豆",
						"img":'https://www.biquwx.la/files/article/image/0/921/921s.jpg',
						"introduction":`大千世界，位面交汇，万族林立，群雄荟萃，一位位来自下位面的天之至尊，在这无尽世界，演绎着令人向往的传奇，追求着那主宰之路。`,
						"type":"玄幻小说"
					}
				}).then(res=>{
					console.log(res.result)
				})
			},
			// 获取章节信息
			async addLocaltionChapter(){
				uni.request({
					url:"https://7463-tcb-pko5yqgb8bfjobuecbade-03b550-1304438654.tcb.qcloud.la/a.json",
					success:async (res)=> {
						console.log(res.data)
						this.chapters=res.data
						for(let i=0;i<this.chapters.length;i++){
							await this.loadLocaltion(i,"16283216441767")
						}
					}
				})
				
			},
			// 导入章节
			async loadLocaltion(i,id){
				 await uniCloud.callFunction({
				 	name:"uploadChapter",
				 	data:{
				 		bookName:'大主宰',
				 		bookid:id,
				 		chapterContent:this.chapters[i].chapterContent,
				 		chapterName:this.chapters[i].chapterName
				 	}
				 }).then(res=>{
				 	console.log(i)
				 })
			},
		}
	}
</script>

<style>
	
</style>
