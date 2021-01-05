'use strict';
// 更改用户信息
exports.main = async (event,context) => {
	//event为客户端上传的参数
	console.log('event : ', event.sex)
	const db=uniCloud.database()
	const collection=db.collection("userinfo");
	let res;
	if(event.password){
		res=collection.where({
			account:event.account
		}).update({
			password:event.password
		})
	}else if(event.headPortrait){
		res=collection.where({
			account:event.account
		}).update({
			headPortrait:event.headPortrait
		})
	}else if(event.sex){
		res=collection.where({
			account:event.account
		}).update({
			sex:event.sex,
			signature:event.signature,
			userName:event.userName
		})
	}else if(event.role){
		res=collection.where({
			account:event.account
		}).update({
			role:event.role
		})
	}else if(event.money){
		res=collection.where({
			account:event.account
		}).update({
			money:event.money
		})
	}
	//返回数据给客户端
	return res
};
