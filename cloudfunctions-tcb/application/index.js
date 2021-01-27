'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// reader提交申请成为author
	console.log('event : ', event)
	// 笔名
	// 简介
	// 姓名
	// 电话
	// 身份者证件
	const db=uniCloud.database()
	//返回数据给客户端
	return event
};
