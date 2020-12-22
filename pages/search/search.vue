<template>
	
</template>

<script>
	export default{
		data(){
			return{
				keyWords:""
			}
		},
		onNavigationBarSearchInputChanged(e){
			this.keyWords=e.text
			console.log(this.keyWords)
		},
		onNavigationBarButtonTap(obj){
			if(obj.text=="搜索"){
				uniCloud.callFunction({
					name:"query",
					data:{
						keyWords:this.keyWords
					}
				}).then(res=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style>
</style>
