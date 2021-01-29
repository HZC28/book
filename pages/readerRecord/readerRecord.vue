<template>
	<view>
		sdfs
	</view>
</template>

<script>
	export default{
		data(){
			return{
				records:[]
			}
		},
		created(){
			const db=uniCloud.database()
			let userInfo=uni.getStorageSync('userInfo')
			db.collection('readerRecord').where({
				accountId:userInfo.accountId
			}).get().then(res=>{
				// console.log(res.result.data)
				this.records=res.result.data
				console.log(res.result.data[0].updateTime)
				let nowTime=new Date().getTime()
				this.records.forEach(val=>{
					let updateTime=new Date(val.updateTime).getTime()
					let IntervalTime=nowTime-updateTime
					// let minute,hour,day,month;
					let time;
					if(IntervalTime/60000<60){
						time=parseInt(IntervalTime/60000)==0?'刚刚':parseInt(IntervalTime/60000)+"分钟前"
					}else if(60<IntervalTime/60000 && IntervalTime/60000<(60*24)){
						time=parseInt(IntervalTime/(60000*60))+"小时前"
					}else if(60*24<IntervalTime/60000 && IntervalTime/60000<(60*24*30)){
						time=parseInt(IntervalTime/(60000*60*24))+"天前"
					}else if(60*24*30<IntervalTime/60000 && IntervalTime/60000<(60*24*365)){
						time=parseInt(IntervalTime/(60000*60*24*30))+"月前"
					}
					console.log(time)
				})
				
			})
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
