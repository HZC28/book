'use strict';
async function getBookChapter(){
	const db = uniCloud.database();
	const dbcmd=db.command
	let result;
	// bookChater
	result=await db.collection('bookChater').where({
		bookid:"16118004952801"
	}).get()
	console.log(result,"cs")
	return result
}
module.exports=getBookChapter