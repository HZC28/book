import jq from './loadhtml'
import $ from './jquery/jq.js' 
import doSave from './write.js'
// 主start程序
let allChapter=[]
function start(){
    let html='123'
    // http.get("https://www.27k.net/read/155133/62641445.html",function(res){
    //     console.log(res)
    // })
    // console.log(jq)
    let arr=jq.find('.chaw_c>li>a')
    
    arr.each(function (index, item){
        let obj={}
        obj.chapterName=$(item).text()
        obj.href='https://www.27k.net'+$(item).attr("href")
        allChapter.push(obj)
    })
    // console.log(allChapter)
	let length=allChapter.length
	for(let i=0;i<allChapter.length;i++){
		// new Promise((resolve, reject) => {
		//    //queryList[i]是请求参数
		//    Request(allChapter,i)
		// })
		setTimeout(()=>{
			Request(allChapter,i)
		},600*i)
		
	}
	// const tasks = [];
	// const output = (i) => new Promise((resolve) => {
	//   setTimeout(() => {
	//     console.log(new Date, i);
	//     resolve();
	//   }, 1000 * i);
	// });
	
	// for (var i = 0; i < 5; i++) {
	//   tasks.push(output(i));
	// }
	// //最后的i的值是在异步全部完成之后
	// Promise.all(tasks).then(() => {
	//   setTimeout(() => {
	//     console.log(new Date, i);
	//   }, 1000);
	// });
    return html
}

function Request(allChapter,i){
	uni.request({
	    url: allChapter[i].href, 
	    success: (res) => {
			allChapter[i].chapterContent=''
			$(res.data).find('.txtnav p').each(function (index, item){
				// console.log(index,item)
				if(index!=0){
					allChapter[i].chapterContent=allChapter[i].chapterContent+$(item).text()+'\n'
				}
				
			})
			console.log(i)
			if(i==allChapter.length-1){
				console.log(JSON.stringify(allChapter))
			}
			
	    }
	});
}
export default start