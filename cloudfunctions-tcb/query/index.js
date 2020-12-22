'use strict';
// 查询图书信息
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db=uniCloud.database();
	const collection=db.collection("book")
	let res;
	if(event.keyWords==''){
		res=await collection.where({}).get()
	}else{
		res=await collection.where({
			bookName:new RegExp(event.keyWords+'+')
		}).get()
	}
	//返回数据给客户端
	return res
};
