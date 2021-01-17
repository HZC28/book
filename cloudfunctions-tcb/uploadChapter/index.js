'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// 上传章节
	console.log('event : ', event)
	let num=Math.floor(Math.random() * 100)
	let time=`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
	let id=new Date().getTime()+''+num
	const db=uniCloud.database()
	const dbCmd = db.command
	let obj={}
	obj.chapterName=event.chapterName
	obj.chapterId=id
	await db.collection('bookChater').where({
		bookid:event.bookid
	}).update({
		chapters: dbCmd.push(obj)
	})
	await db.collection('chapters').add({
		bookName:event.bookName,
		bookid:event.bookid,
		chapterContent:event.chapterContent,
		chapterId:id,
		chapterName:event.chapterName,
		price:100,
		time:time
	})
	
	//返回数据给客户端
	return event
};
