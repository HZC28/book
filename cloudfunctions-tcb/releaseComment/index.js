'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db=uniCloud.database()
	const collection = db.collection('comment');
	let num=Math.floor(Math.random() * 100)
	let time=`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
	let commentId=new Date().getTime()+''+num
	const res = await collection.add({
		comentBy:event.comentBy,
		comentTitle:event.comentTitle,
		commentContent:event.commentContent,
		commentPraise:'0',
		commentTime:time,
		score:event.score,
		commentId:commentId
	})
	console.log('event : ', event)
	
	//返回数据给客户端
	return res
};
