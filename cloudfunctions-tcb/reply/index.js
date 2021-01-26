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
	let timezone = 8; //目标时区时间，东八区
	let offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
	let nowDate = new Date().getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
	let targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
	// console.log(new Date())
	let time=`${targetDate.getFullYear()}-${targetDate.getMonth()+1}-${targetDate.getDate()} ${targetDate.getHours()}:${targetDate.getMinutes()}`
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
