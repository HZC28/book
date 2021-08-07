function doSave(){
	const fs = require('fs');
	//2. 创建并写入文件  
	fs.open('1.txt','r+',function(err,fd){
	    if(err){
	        console.log('文件打开失败');
	    }else{
	        fs.write(fd,'12345',function(err,len,str){
	            console.log(err);//null
	            console.log(len);//5
	            console.log(str);//<Buffer 74 65 73 74>
	        })
	    }
	});
	console.log(fs)
}
export default doSave