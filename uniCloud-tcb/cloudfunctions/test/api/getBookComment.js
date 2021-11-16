'use strict';
async function getBookComment(){
	const db = uniCloud.database();
	const dbcmd=db.command
	let result;
	// bookChater
	// result=await db.collection('bookChater').where({
	// 	bookid:"16118004952801"
	// }).get()
	result = await db.collection('book').aggregate()
	  .lookup({
	    from: 'comment',
	    localField: 'bookid',
	    foreignField: 'bookid',
	    as: 'comments',
	  }).end()
	console.log(result,"cs")
	return result
}
module.exports=getBookComment