'use strict';
async function test(){
	const db = uniCloud.database();
	const dbcmd=db.command
	let result;
	await db.collection('shareIdea_table').where({
		account:"admin"
	}).get().then(res=>{
		result=res
		console.log(res)
	})
	return result
}
module.exports=test