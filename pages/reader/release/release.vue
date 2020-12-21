<template>
	<view class="release">
		<u-upload   @on-choose-complete="uploadImg" :auto-upload="false"></u-upload>
		<button type="default" @click="getUrl()">获取地址</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				action: 'http://www.example.com/upload',
				fileList: []
			}
		},
		methods:{
			
			// 上传图片到云存储
			 async uploadImg(lists, name){
				 let num=Math.floor(Math.random() * 100)
				let filename=new Date().getTime()+''+num
				// console.log(filename)
				// console.log(num)
				const result = await uniCloud.uploadFile({
							filePath: lists[0].url,
							cloudPath: 'upload/'+filename+".jpg",
				 }).then(res=>{
					 console.log(res.fileID)
					 this.fileList.push(res.fileID)
				 }).catch(err=>{
					 console.log(err)
				 });
			},
			async getUrl(){
				let result = await uniCloud.getTempFileURL({
				    fileList: this.fileList
				});
				console.log(result.fileList[0].tempFileURL)
			}
		}
	}
</script>

<style>
</style>
