'use strict';
const fs = require("fs");
let cheerio = require("cheerio")
let request = require('request');
let allChapter = []

async function start(event) {
	let html = await gethtml(event.addressId)
	let $html = cheerio.load(html)
	let arr = $html('.chaw_c>li>a')
	//   console.log(arr.length)
	arr.each(function(index, item) {
		let obj = {}
		obj.chapterName = item.children[0].data
		obj.href = item.attribs.href
		allChapter.push(obj)
	})
	let startnum = parseInt(event.limit) * parseInt(event.current)
	let max = allChapter.length < (startnum + parseInt(event.limit)) ? allChapter.length : (startnum + parseInt(event.limit))
	for (let i = startnum; i < max; i++) {
		let d = await Request(i)
	}
	let requestArr = allChapter.filter(function (val) {
		return val.chapterContent && val.chapterContent != ''
	})
	return {
		chapter: requestArr,
		total: allChapter.length,
		finish: false
	}

}

function Request(i) {
	return new Promise(function(resolve, reject) {
		request(`https://www.27k.net${allChapter[i].href}`, function(error, response, body) {
			// console.log(response.body)
			if (response && response.body) {
				let $cheeiro = cheerio.load(response.body)
				allChapter[i].chapterContent = ''
				$cheeiro('.txtnav p').each(function(index, item) {
					allChapter[i].chapterContent = allChapter[i].chapterContent + $cheeiro(item)
						.text() + '\n'
				})
			}
			resolve(i)
		})
	})

}

async function getTotal(event) {
	let html = await gethtml(event.addressId)
	let $html = cheerio.load(html)
	let arr = $html('.chaw_c>li>a')
	//   console.log(arr.length)
	arr.each(function(index, item) {
		let obj = {}
		obj.chapterName = item.children[0].data
		obj.href = item.attribs.href
		allChapter.push(obj)
	})
	if (allChapter.length > event.limit) {
		return {
			total: allChapter.length,
			finish: false
		}
	} else {
		//章节小于一次请求的数量
		for (let i = 0; i < allChapter.length; i++) {
			let d = await Request(i)
		}
		return {
			chapter: allChapter,
			total: allChapter.length,
			finish: true
		}
	}
}

function gethtml(address) {
	return new Promise(function(resolve, reject) {
		request(`https://www.27k.net/read/${address}`, function(error, response, body) {
			resolve(response.body)
		})
	})
}
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let result = {}
	allChapter = []
	if (event.type == 0) {
		result = await getTotal(event)
	} else {
		result = await start(event)
	}
	// let result = await uniCloud.uploadFile({
	// 	 cloudPath: "/json/b.json",
	// 	 fileContent: fs.createReadStream(`./a.json`)
	// });
	//返回数据给客户端
	return result
};
