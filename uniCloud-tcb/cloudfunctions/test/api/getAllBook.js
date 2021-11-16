'use strict';
async function getAllBook(){
	const db = uniCloud.database();
	const dbcmd=db.command
	let result=await	db.collection('book').get({
		getCount:true
	})
	return result
}
module.exports=getAllBook
