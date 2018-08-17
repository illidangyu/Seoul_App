var api = require('../config/seoul_key.js').seoul

var s_url = api.api_url
var s_key = api.api_key
var s_service = api.api_cult
var s_pet = api.api_pet

var request = require('request')

module.exports = (app)=>{
	app.get('/seoul/:id',(req,res)=>{ 
		let seoul_url = s_url+s_key+'/json/'+s_service+'/1/100/'+req.params.id
		request({url:seoul_url,method:'GET'},(err,response,data)=>{
			let json_data= JSON.parse(data)
			let data_row = json_data.SearchPerformanceBySubjectService.row
			let data_count = json_data.SearchPerformanceBySubjectService.list_total_count
			res.render('index',{body:'cult',seoul:data_row})
		})
		
	})
	app.get('/pet',(req,res)=>{
		let seoul_url=s_url+s_key+'/json/'+s_pet+'/1/100'
		request({url:seoul_url,method:"GET"},(err,response,data)=>{
			
			let json_data= JSON.parse(data)
			let data_row = json_data.vtrHospitalInfo.row
			let data_count = json_data.vtrHospitalInfo.list_total_count
			res.render('index',{body:'pet',seoul:data_row})
			
		})
	})
}