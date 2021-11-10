<template>
	<view class="Box">
		<!-- <button type="default" @click="reader">读取文件</button>
		{{content}} -->
		
		<button type="default" @click="del('163635585472549')">删除</button>
		<button type="error" @click="addnewbook">手动添加一本新图书</button>
		<button type="default" @click="addLocaltionChapter('163645114024317','至上玄主')">添加本地章节</button>
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
				bookid:"book3145494",
				limit:20,
				current:1,
				addressId:"1352"
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
			
			async del(delid){
				// 清理全部数据
				// "bookid":"161190427615654"
				const db = uniCloud.database()
				let bookid=delid
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
						"bookName":'至上玄主',
						"author":"小飞鼬",
						"img":'https://cdn.27k.net/article/image/0/868/868s.jpg',
						"introduction":`《至上玄主》 至上之力，我为新生代之主，且看拥有七星灵兽之力的坚毅少年，如何面对隐藏在暗中的神秘势力，如何登上新一代巅峰境界..... 《至上玄主》*无泪邀请`,
						"type":"玄幻小说"
					}
				}).then(res=>{
					console.log(res.result)
				})
			},
			/* // 获取章节信息
			async addLocaltionChapter(bookid,bookname){
				uni.request({
					url:"https://7463-tcb-pko5yqgb8bfjobuecbade-03b550-1304438654.tcb.qcloud.la/a.json",
					success:async (res)=> {
						console.log(res.data)
						this.chapters=res.data
						for(let i=0;i<this.chapters.length;i++){
							await this.loadLocaltion(i,bookid,bookname)
							console.log(i)
						}
					}
				})
				
			}, */
			// 获取章节信息
			async addLocaltionChapter(bookid,bookname){
				uniCloud.callFunction({
					name:"uploadFile",
					data:{
						// 0返回的是章节总数，1是一次返回的章节
						type:1,
						current:0,
						limit:this.limit,
						addressId:this.addressId
					},
					success:async (res)=> {
						console.log(res)
						if(this.limit>res.result.total){
							this.chapters=res.result.chapter
							for(let i=0;i<this.chapters.length;i++){
								await this.loadLocaltion(i,bookid,bookname)
							}
						}else{
							this.chapters=res.result.chapter
							let times=parseInt(res.result.total/this.limit)
							for(let i=1;i<=times;i++){
								let array=await this.getChapterArr(i);
								this.chapters=[...this.chapters,...array]
							}
							console.log(this.chapters)
							// for(let i=0;i<this.chapters.length;i++){
							// 	await this.loadLocaltion(i,bookid,bookname)
							// }
						}
						
					}
				})
			},
			async getChapterArr(current){
				return new Promise((reslove,reject)=>{
					uniCloud.callFunction({
						name:"uploadFile",
						data:{
							// 0返回的是章节总数，1是一次返回的章节
							type:1,
							current:current,
							limit:this.limit,
							addressId:this.addressId
						},
						success:async (res)=> {
							console.log(res)
							reslove(res.result.chapter)
						}
					})
				})
			},
			// 导入章节
			async loadLocaltion(i,id,bookname){
				 await uniCloud.callFunction({
				 	name:"uploadChapter",
				 	data:{
				 		bookName:bookname,
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
