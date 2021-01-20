'use strict';
// 社区的回复
exports.main = async (event, context) => {
	const db=uniCloud.database()
	const collection=db.collection("ideaReply")
	const dbCmd = db.command
	//event为客户端上传的参数
	console.log('event : ', event)
	let res;
	let num=Math.floor(Math.random() * 100)
	let time=`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
	let id=new Date().getTime()+''+num
	// 0为评论的回复添加新的回复记录
	// 1是回复回复信息的,修改该回复信息下的children
	if(event.type==0){
		res = await collection.add({
			ideaId:event.ideaId,
			id:id,
			content:event.content,
			userName:event.userName,
			headPortrait:event.headPortrait,
			time:time,
			praise:0,
			children:[]
		})
		await db.collection('shareIdea_table').where({
			ideaId:event.ideaId
		}).update({
			ideaReply:dbCmd.inc(1)
		})
	}else if(event.type==1){
		event.obj.time=time
		res = await collection.doc(event.id).update({
			children:dbCmd.push(event.obj)
		})
	}
	//返回数据给客户端
	return res
};
