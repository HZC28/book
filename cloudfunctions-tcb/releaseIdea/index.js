'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db=uniCloud.database()
	const collection = db.collection('shareIdea_table');
	let num=Math.floor(Math.random() * 100)
	let time=`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
	let ideaId=new Date().getTime()+''+num
	const res = await collection.add({
		ideaBy:event.ideaBy,
		ideaTitle:event.ideaTitle,
		ideaContent:event.ideaContent,
		accountId:event.accountId,
		ideaPraise:0,
		ideaTime:time,
		updataTime:ideaId,
		ideaId:ideaId,
		ideaImg:event.ideaImg,
		tabs:event.tabs,
		headPortrait:event.headPortrait,
		account:event.account,
		ideaReply:0
	})
	console.log('event : ',res)
	
	//返回数据给客户端
	return event
};
