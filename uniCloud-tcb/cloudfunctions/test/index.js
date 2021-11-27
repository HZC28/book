'use strict';
let getAllBook=require("./api/getAllBook.js")
let getBookChapter=require("./api/getBookChapter.js")
let getBookComment=require("./api/getBookComment.js")
let test=require("./api/test.js")
let shareIdea=require("./api/shareIdea.js")
let getPatch=require("./api/getPatch.js")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let result={
		
	};
	console.log(event)
	if(event.type=="getAllBook"){
		result = await getAllBook()
	}
	if(event.type=="getBookChapter"){
		result = await getBookChapter()
	}
	if(event.type=="lbcx"){
		result=await getBookComment()
	}
	if(event.type=="test"){
		let z=await test()
		result=await test()
	}
	if(event.type=="shareIdea"){
		result=await shareIdea()
	}
	if(event.type=="getPatch"){
		result=await getPatch()
	}
	//返回数据给客户端
	return result
};
