<template>
	<!-- 申请创作 -->
	<view class="application">
		<u-form :model="form" ref="uForm" class="form">
				<u-form-item label-width="140" label="书籍编号:"><u-input placeholder="https://www.27k.net/read/1157/"  v-model="form.address" /></u-form-item>
				<u-form-item label-width="140" label="书ID:"><u-input placeholder="书id生成图书时生成"  v-model="form.bookId" /></u-form-item>
				<u-form-item label-width="140" label="书名:"><u-input placeholder="请输入书名" v-model="form.bookName" /></u-form-item>
				<u-form-item label-width="140" label="作者:"><u-input placeholder="请输入作者名" v-model="form.author" /></u-form-item>
				<u-form-item label-width="140" label="类型:">
					<text class="imgtext" @click="selectType">{{bookType}}</text>
					<u-select v-model="show" @confirm="confirm" :list="list"></u-select>
				</u-form-item>
				<u-form-item label-width="140" label="作品图片:">
					<image class="img" v-show="imgUrl!=''" :src="imgUrl" mode=""></image>
					<text class="imgtext" @click="changeHeadPortrait">{{imgText}}</text>
				</u-form-item>
				<u-form-item label-width="140" label="简介:">
					<u-input maxlength="1000" :disabled="this.form.status!=undefined&&this.form.status!=-1" laceholder="请输入图书简介" border type="textarea" v-model="form.introduction" />
				</u-form-item>
				<u-button  style="margin-top: 20rpx;" @click="submit" type="success">另开新书</u-button>
				<u-button  style="margin-top: 20rpx;" @click="del" type="error">删除图书</u-button>
				<u-button v-show="form.bookId!=''&&form.address!=''"  style="margin-top: 20rpx;" @click="addLocaltionChapter" type="success">爬取章节</u-button>
			</u-form>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				form:{
					bookId:'',
					address:''
				},
				begin:false,
				chapters:[],
				limit:20,
				current:0,
				statusText:"提交申请",
				loading:false,
				imgUrl:"",
				imgText:"上传图片",
				show:false,
				bookType:"请选择作品类型",
				list: [
					{value: '1',label: '末世危机'},
					{value: '2',label: '玄幻小说'},
					{value: '3',label: '悬疑/推理小说'},
					{value: '4',label: '科幻小说'},
					{value: '5',label: '都市小说'},
				],
			}
		},
		onShow() {
			
		},
		methods:{
			confirm(e){
				this.bookType=e[0].label
			},
			// 获取章节信息
			async addLocaltionChapter(){
				if(this.form.bookId==''||this.form.bookId==undefined){
					this.toast("未输入图书ID，无法添加章节")
					return 
				}
				if(this.form.address==''||this.form.address==undefined){
					this.toast("未输入图书地址，无法添加章节")
					return 
				}
				if(this.begin){
					this.toast("爬取中请勿重复进行")
					return 
				}
				this.begin=true
				this.toast("开始爬取中!!!")
				uniCloud.callFunction({
					name:"uploadFile",
					data:{
						// 0返回的是章节总数，1是一次返回的章节
						type:1,
						current:0,
						limit:this.limit,
						addressId:this.form.address
					},
					success:async (res)=> {
						if(this.limit>res.result.total){
							this.chapters=res.result.chapter
							for(let i=0;i<this.chapters.length;i++){
								await this.loadLocaltion(i,this.form.bookId,this.form.bookName)
							}
						}else{
							this.chapters=res.result.chapter
							let times=parseInt(res.result.total/this.limit)
							for(let i=1;i<=times;i++){
								let array=await this.getChapterArr(i);
								this.chapters=[...this.chapters,...array]
							}
							for(let i=0;i<this.chapters.length;i++){
								await this.loadLocaltion(i,this.form.bookId,this.form.bookName)
							}
							this.begin=false
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
							addressId:this.form.address
						},
						success:async (res)=> {
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
					 
				 })
			},
			// 删除图书
			async del(){
				if(this.form.bookId==''||this.form.bookId==undefined){
					this.toast("未输入图书ID，无法删除图书")
					return 
				}
				// 清理全部数据
				const db = uniCloud.database()
				let bookid=this.form.bookId
				await db.collection('book').where({
				  bookid: bookid
				}).remove().then(res=>{
					if(res.result.deleted==0){
						this.toast("未找到该图书。请请输入正确书籍ID")
					}else{
						this.toast("删除成功")
					}
				})
				await db.collection('bookChater').where({
				  bookid: bookid
				}).remove()
				await db.collection('chapters').where({
				  bookid: bookid
				}).remove()
				
			},
			// 新增图书
			submit(){
				if(this.form.bookName==''||this.form.bookName==undefined){
					this.toast("未输入图书名")
					return 
				}
				if(this.form.introduction==''||this.form.introduction==undefined){
					this.toast("未输入简介内容")
					return 
				}
				if(this.bookType=='请选择作品类型'||this.bookType==undefined){
					this.toast("未选择作品类型")
					return 
				}
				if(this.imgUrl==''||this.imgUrl==undefined){
					this.toast("未上传作品图片")
					return 
				}
				this.form.type=this.bookType
				this.form.img=this.imgUrl
				uniCloud.callFunction({
					name:"newBook",
					data:{
						bookName:this.form.bookName,
						author:this.form.author,
						img:this.form.img,
						introduction:this.form.introduction,
						type:this.form.type
					}
				}).then(res=>{
					if(res.result.code&&res.result.code==100){
						this.toast("新增失败，书籍名已存在")
						this.form.bookId=res.result.id+''
						this.$forceUpdate()
					}else{
						this.form.bookId=res.result+''
						this.toast("新增图书成功！！！")
					}
				})
			},
			newbook(){
				this.form={}
				this.imgUrl=""
				this.imgText="上传图片",
				this.bookType="请选择作品类型"
			},
			selectType(){
				if(this.form.status==0||this.form.status==1){
					return
				}
				this.show=true
			},
			changeHeadPortrait(){
				let self=this
				if(this.form.status==0||this.form.status==1){
					return
				}
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success: function (res) {
								self.uploadImg(res.tempFilePaths)
				    }
				});
				
			},
			// 上传图片到云存储
			async uploadImg(lists){
				let num=Math.floor(Math.random() * 100)
				let filename=new Date().getTime()+''+num
				const result = await uniCloud.uploadFile({
							filePath: lists[0],
							cloudPath: 'book/text'+filename+".jpg",
				 }).then(res=>{
					 let arr=[]
					 arr.push(res.fileID)
					 uniCloud.getTempFileURL({
					     fileList: arr
					 }).then(res1=>{
						 this.imgUrl=res1.fileList[0].tempFileURL
						 this.imgText="更改图片"
					 })
				 })
			}
		}
	}
</script>

<style scoped lang="less">
	.application{
		.form{
			padding:0 30rpx;
		}
	}
	.img{
		width: 120rpx;
		height: 160rpx;
		margin-right: 20rpx;
	}
	.imgtext{
		color:#2B85E4;
	}
</style>
