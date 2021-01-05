'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db=uniCloud.database()
	const collection=db.collection("userinfo")
	let res=await collection.add({
		account:event.account,
		password:event.password,
		userName:event.account,
		role:"reader",
		headPortrait:"https://7463-tcb-pko5yqgb8bfjobuecbade-03b550-1304438654.tcb.qcloud.la/userImg/touxiang.png",
		money:"0",
		sex:"无"
	})
	//返回数据给客户端
	return event
};
