'use strict';
exports.main = async (event, context) => {
	// 新建书籍
	//event为客户端上传的参数
	const db=uniCloud.database()
	let num=Math.floor(Math.random() * 100)
	let time=`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
	let id=new Date().getTime()+''+num
	let result;
	await db.collection('book').add({
		bookid:id,
		chapter:0,
		bookName:event.bookName,
		author:event.author,
		createTime:time,
		img:event.img,
		introduction:event.introduction,
		replyNum:0,
		score:5,
		type:event.type
	}).then(res=>{
		console.log("res")
		result=res.id
	})
	await db.collection('bookChater').add({
		bookid:id,
		chapters:[]
	}).then(res=>{
		console.log(res.data)
		result=res
	})
	console.log('event : ', event)
	
	//返回数据给客户端
	return id
};
