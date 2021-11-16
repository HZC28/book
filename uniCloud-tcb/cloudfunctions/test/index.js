'use strict';
let getAllBook=require("./api/getAllBook.js")
let getBookChapter=require("./api/getBookChapter.js")
let getBookComment=require("./api/getBookComment.js")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let result;
	console.log(event)
	if(event.type=="getAllBook"){
		result=await getAllBook()
	}
	if(event.type=="getBookChapter"){
		result=await getBookChapter()
	}
	if(event.type=="lbcx"){
		result=await getBookComment()
	}
	//返回数据给客户端
	return result
};
