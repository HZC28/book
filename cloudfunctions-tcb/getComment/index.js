'use strict';
exports.main = async (event, context) => {
	// 获取不同图书的评论信息
	//event为客户端上传的参数
	const db = uniCloud.database();
	let result;
	let comments=[];
	let praise=[]
	let total;
	await	db.collection('comment').where({
		bookId:event.bookid
	}).count().then((res)=>{
			// console.log(res)
			total=res.total
			// res=res.result.data?res.result.data:[]
	  })
	await db.collection('comment').orderBy("updataTime", "desc")
	.orderBy("ideaPraise", "asc").skip(event.skip).limit(event.limit).where({
		bookId:event.bookid
	}).get().then((res)=>{
			// console.log(res)
			comments=res.data
	  })
		
		for(let i=0;i<comments.length;i++){
			if(event.accountId==""){
				comments[i].praise=false
			}else{
				// console.log(comments[i]._id)
				await	db.collection('comment_thumbs-up').where({
							accountId:event.accountId,
							id:comments[i]._id,
							bookId:event.bookid
					}).get().then(res=>{
						if(res.data.length!=0){
							comments[i].praise=true
						}else{
							comments[i].praise=false
						}
					})
			}
		}
		let obj={}
		obj.total=total;
		obj.comments=comments
		result=obj
	// console.log('event : ', event)
	
	//返回数据给客户端
	return result
};
