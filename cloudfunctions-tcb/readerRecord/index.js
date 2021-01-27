'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// 添加阅读记录
	
	// console.log('event : ', event)
	const db=uniCloud.database()
	let type;
	await db.collection('readerRecord').where({
		accountId:event.accountId,
		bookid:event.bookid
	}).get().then(res=>{
		type=res.data.length==0?'add':'update'
	})
	console.log(type)
	if(type=='add'){
		console.log(123)
		await db.collection('readerRecord').add({
			accountId:event.accountId,
			bookid:event.bookid,
			chapterName:event.chapterName,
			chapterIndex:event.chapterIndex
		}).then(res=>{
			console.log(456)
			console.log(res)
		})
	}else{
		await db.collection('readerRecord').where({
			accountId:event.accountId,
			bookid:event.bookid
		}).update({
			chapterName:event.chapterName,
			chapterIndex:event.chapterIndex
		})
	}
	
	
	//返回数据给客户端
	return event
};
