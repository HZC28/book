'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db = uniCloud.database();
	const collection = db.collection('userinfo');
	let obj={}
	const res = await collection.where({
		account:event.account
	}).get()
	let msg=res.data.length==0?"用户不存在":"";
	let code=res.data.length==0?401:200;
	if(res.data.length!=0){
		if(res.data[0].password==event.password){
			msg="success";
			obj.role=res.data[0].role
			obj.headPortrait=res.data[0].headPortrait
			obj.signature=res.data[0].signature
			code=200
		}else{
			msg="密码有误"
			code=401
		}
	}
	console.log(res)
	
	obj.code=code
	obj.msg=msg
	
	//返回数据给客户端
	return obj
};
