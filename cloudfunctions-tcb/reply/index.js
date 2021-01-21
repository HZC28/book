'use strict';
// 书籍评论的回复
exports.main = async (event, context) => {
	const db=uniCloud.database()
	const collection=db.collection("reply")
	const dbCmd = db.command
	//event为客户端上传的参数
	console.log('event : ', event)
	// event.bookId
	// event.commentId
	// event.content
	let res;
	let time=`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
	if(event.type==0){
		res = await collection.add({
			bookId:event.bookId,
			commentId:event.commentId,
			content:event.content,
			createBy:event.createBy,
			headPortrait:event.headPortrait,
			time:time,
			praise:'0',
			children:[]
		})
	}else if(event.type==1){
		event.obj.time=time
		// let obj=JSON.parse(event.obj)
		// let arr=[]
		// arr.push(obj)
		// console.log(event.obj)
		res = await collection.where({
			bookId:event.bookId,
			commentId:event.commentId
		}).update({
			children:dbCmd.push(event.obj)
		})
	}
	//返回数据给客户端
	return res
};
