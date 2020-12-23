'use strict';
// 更改用户信息
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db=uniCloud.database()
	const collection=db.collection("userinfo")
	if(event.password){
		collection.where({
			account:event.account
		}).update({
			password:event.password
		})
	}else if(event.headPortrait){
		collection.where({
			account:event.account
		}).update({
			headPortrait:event.headPortrait
		})
	}else if(event.role){
		collection.where({
			account:event.account
		}).update({
			role:event.role
		})
	}else if(event.money){
		collection.where({
			account:event.account
		}).update({
			money:event.money
		})
	}else{
		collection.where({
			account:event.account
		}).update({
			signature:event.signature,
			userName:event.userName
		})
	}
	//返回数据给客户端
	return event
};
