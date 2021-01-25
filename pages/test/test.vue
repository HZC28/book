<template>
	<view class="Box">
		<button type="default" @click="reader">读取文件</button>
		{{content}}
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content:"",
				chapters:[],
				img:"",
				title:""
			}
		},
		onShow(){this.actionSheet()},
		methods:{
			text(){
				// #ifdef APP-PLUS
				console.log(123)
					plus.nativeUI.actionSheet(this.actionSheet);
				// #endif
			},
			// 弹出系统选择按钮框
			// function actionSheet(){
			// 	var actionbuttons=[{title:"不同意",style:"destructive"},{title:"1"},{title:"2"},{title:"3"}];
			// 	var actionstyle={title:"Hello HTML5 plus!",cancel:"取消",buttons:actionbuttons};
			// 	plus.nativeUI.actionSheet(actionstyle, function(e){
			// 		console.log("User pressed: "+e.index );
			// 	});
			// }
			actionSheet(){
				plus.nativeUI.actionSheet(
						{title:"Plus is ready!",
						cancel:"取消",
						buttons:[
							{
								title:"1"
							},{
								title:"2"
								}
						]},
						function(e){
							console.log("User pressed: "+e.index);
						}
					);
			},
			reader(){
				uni.request({
				    url: 'https://7463-tcb-pko5yqgb8bfjobuecbade-03b550-1304438654.tcb.qcloud.la/bookInfo/book3188832/book3188832.json',
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
									"author":"不知道",
									"img":this.img,
									"introduction":this.content,
									"type":"经典著作"
								}
							}).then(res=>{
								console.log(res.result)
								this.addChapter(res.result)
							})
				    }
				});
			},
			addtoChapter(i,id){
				uni.request({
					url:"https://7463-tcb-pko5yqgb8bfjobuecbade-03b550-1304438654.tcb.qcloud.la/bookInfo/book3188832/chapter/"+this.chapters[i].chapterid+".json",
					success:(res)=> {
						// console.log(res.data.chapter)
						let ret=res.data.chapter
					  uniCloud.callFunction({
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
				})
			},
			addChapter(id){
				for(let i=0;i<10;i++){
					setTimeout(()=>{
						this.addtoChapter(i,id)
					},500*i)
					
					
				}
			}
		}
	}
</script>

<style>
	
</style>
