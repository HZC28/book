'use strict';
async function getPatch(){
	const db = uniCloud.database();
	const dbcmd=db.command
	let result;
	await db.collection('PatchManage').get().then(res=>{
		result=res
		console.log(res)
	})
	return result
}
module.exports=getPatch