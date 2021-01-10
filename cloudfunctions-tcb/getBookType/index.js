'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let arr=[]
	const db=uniCloud.database()
	const collection=await db.collection("book")
	collection.limit(6).where({
		type:"经典著作"
	}).field({
		'author':true,
		'bookName':true,
		'bookid':true,
		'img':true
	}).get().then(res=>{
		let obj={}
		obj.type="经典著作"
		obj.bookList=res.data
		arr.push(obj)
	})
	
	let res1=await collection.limit(6).where({
		type:"武侠小说"
	}).field({
		'author':true,
		'bookName':true,
		'bookid':true,
		'img':true
	}).get().then(res=>{
		let obj={}
		obj.type="武侠小说"
		obj.bookList=res.data
		arr.push(obj)
	})
	
	let res2=await collection.limit(6).where({
		type:"悬疑/推理小说"
	}).field({
		'author':true,
		'bookName':true,
		'bookid':true,
		'img':true,
		'_id':false
	}).get().then(res=>{
		let obj={}
		obj.type="悬疑/推理小说"
		obj.bookList=res.data
		arr.push(obj)
	})
	//返回数据给客户端
	return arr
};
