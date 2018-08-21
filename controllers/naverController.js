var naver = require('../config/naver_key.js')
var request = require('request')

var options = (api_url)=>{
	return{
		url : api_url,
		headers : { 'X-Naver-Client-Id' : naver.Client_Id,'X-Naver-Client-Secret': naver.Client_Secret }
	}
}
module.exports= (app) => {
	
	app.get('/naver/map',(req,res)=>{res.render('index',{body:'map'})})
	
	app.get('/naver/map/:addr',(req,res)=>{
		
		let addr = req.params.addr
//		addr = '광주시 북구 경양로 170'
			
		let api_url = 'https://openapi.naver.com/v1/map/geocode'
		api_url += '?query='+ encodeURI(addr)
		
		console.log(options(api_url))
		
		request.get(options(api_url),(err,response,data)=>{
			if(!err && response.statusCode==200){	
				console.log(data)
				
				let jSonData = JSON.parse(data)
				let addrXY = jSonData.result.items[0].point
	
				console.log(addrXY)
				
				res.render('index',{body:'map',point:addrXY})
			}else{
				console.log(response)
				console.log(err)
			}
		})
	})
}