 var express = require('express');
 var tm_api_router=express.Router();
 var jsonq=require('jsonq');
 tm_api_router.use(function(req,res,next){
	  console.log('tm use router');
	  next();
  }
);
var site_config={
	'asset_url':"http://127.0.0.1:3003/",
	'root_url':"http://127.0.0.1:3003/"
};
var tm_list=[
	{'station':'n12a',
	'station_name':'N12A',
		'agency':'ศูนย์อุทกภาคเหนือตอนล่าง'
		,'lat':null,'lng':null,
		'api':'https://spreadsheets.google.com/feeds/list/1x7kWKQxMLNQHavAYHLO9zQeoanSnY57Yr3pBYzV5JsY/14/public/values?alt=json'
	},
	{'station':'n2b',
	'station_name':'N2B',
	'api':'https://spreadsheets.google.com/feeds/list/1x7kWKQxMLNQHavAYHLO9zQeoanSnY57Yr3pBYzV5JsY/15/public/values?alt=json',
	'agency':'ศูนย์อุทกภาคเหนือตอนล่าง','lat':null,'lng':null},
	{'station':'n60',
	'station_name':'N60',
	'api':'https://spreadsheets.google.com/feeds/list/1x7kWKQxMLNQHavAYHLO9zQeoanSnY57Yr3pBYzV5JsY/16/public/values?alt=json',
	'agency':'ศูนย์อุทกภาคเหนือตอนล่าง','lat':null,'lng':null},
	{'station':'n27a',
	'station_name':'N27A',
	'api':'https://spreadsheets.google.com/feeds/list/1x7kWKQxMLNQHavAYHLO9zQeoanSnY57Yr3pBYzV5JsY/17/public/values?alt=json',
	'agency':'ศูนย์อุทกภาคเหนือตอนล่าง','lat':null,'lng':null},
	{'station':'n22',
	'station_name':'N22',
	'api':'https://spreadsheets.google.com/feeds/list/1x7kWKQxMLNQHavAYHLO9zQeoanSnY57Yr3pBYzV5JsY/18/public/values?alt=json',
	'agency':'ศูนย์อุทกภาคเหนือตอนล่าง','lat':null,'lng':null},
	{'station':'n5a',
	'station_name':'N5A',
	'api':'https://spreadsheets.google.com/feeds/list/1x7kWKQxMLNQHavAYHLO9zQeoanSnY57Yr3pBYzV5JsY/19/public/values?alt=json',
	'agency':'ศูนย์อุทกภาคเหนือตอนล่าง','lat':null,'lng':null},
	{'station':'n36',
	'station_name':'N36',
	'api':'https://spreadsheets.google.com/feeds/list/1x7kWKQxMLNQHavAYHLO9zQeoanSnY57Yr3pBYzV5JsY/20/public/values?alt=json',
	'agency':'ศูนย์อุทกภาคเหนือตอนล่าง','lat':null,'lng':null},
	{'station':'n24a',
	'station_name':'N24A',
	'api':'https://spreadsheets.google.com/feeds/list/1x7kWKQxMLNQHavAYHLO9zQeoanSnY57Yr3pBYzV5JsY/21/public/values?alt=json',
	'agency':'ศูนย์อุทกภาคเหนือตอนล่าง','lat':null,'lng':null},
	{'station':'n55',
	'station_name':'N55',
	'api':'https://spreadsheets.google.com/feeds/list/1x7kWKQxMLNQHavAYHLO9zQeoanSnY57Yr3pBYzV5JsY/22/public/values?alt=json',
	'agency':'ศูนย์อุทกภาคเหนือตอนล่าง','lat':null,'lng':null},
	{'station':'n7a',
	'station_name':'N7A',
	'api':'https://spreadsheets.google.com/feeds/list/1x7kWKQxMLNQHavAYHLO9zQeoanSnY57Yr3pBYzV5JsY/23/public/values?alt=json',
	'agency':'ศูนย์อุทกภาคเหนือตอนล่าง','lat':null,'lng':null},
	{'station':'n8a',
	'station_name':'N8A',
	'api':'https://spreadsheets.google.com/feeds/list/1x7kWKQxMLNQHavAYHLO9zQeoanSnY57Yr3pBYzV5JsY/24/public/values?alt=json',
	'agency':'ศูนย์อุทกภาคเหนือตอนล่าง','lat':null,'lng':null},
	{'station':'n43a',
	'station_name':'N43A',
	'api':'',
	'agency':'ศูนย์อุทกภาคเหนือตอนล่าง','lat':null,'lng':null},
	
	
	
	// สถานีหลักอื่น ๆ
	{'station':'ma',
	'station_name':'มะขามเฒ่า-อู่ทอง',//1byLGNGPbYnLsk8JGFE7ZogOUrT3jFYX8ePn2wiBZNII
	'api':'https://spreadsheets.google.com/feeds/list/1byLGNGPbYnLsk8JGFE7ZogOUrT3jFYX8ePn2wiBZNII/1/public/values?alt=json',
	'agency':'สำนักงานชลประทานที่ 12','lat':null,'lng':null},
	{'station':'pt',
	'station_name':'พลเทพ',//1byLGNGPbYnLsk8JGFE7ZogOUrT3jFYX8ePn2wiBZNII
	'api':'https://spreadsheets.google.com/feeds/list/1byLGNGPbYnLsk8JGFE7ZogOUrT3jFYX8ePn2wiBZNII/2/public/values?alt=json',
	'agency':'สำนักงานชลประทานที่ 12','lat':null,'lng':null},
	{'station':'bt',
	'station_name':'บรมธาตุ',//1byLGNGPbYnLsk8JGFE7ZogOUrT3jFYX8ePn2wiBZNII
	'api':'https://spreadsheets.google.com/feeds/list/1byLGNGPbYnLsk8JGFE7ZogOUrT3jFYX8ePn2wiBZNII/3/public/values?alt=json',
	'agency':'สำนักงานชลประทานที่ 12','lat':null,'lng':null},
	{'station':'mnr',
	'station_name':'มโนรมณ์',//1byLGNGPbYnLsk8JGFE7ZogOUrT3jFYX8ePn2wiBZNII
	'api':'https://spreadsheets.google.com/feeds/list/1byLGNGPbYnLsk8JGFE7ZogOUrT3jFYX8ePn2wiBZNII/4/public/values?alt=json',
	'agency':'สำนักงานชลประทานที่ 12','lat':null,'lng':null},
	{'station':'mhr',
	'station_name':'มหาราช',//1byLGNGPbYnLsk8JGFE7ZogOUrT3jFYX8ePn2wiBZNII
	'api':'https://spreadsheets.google.com/feeds/list/1byLGNGPbYnLsk8JGFE7ZogOUrT3jFYX8ePn2wiBZNII/5/public/values?alt=json',
	'agency':'สำนักงานชลประทานที่ 12','lat':null,'lng':null},
	{'station':'bp',
	'station_name':'ท่าสาร-บางปลา',//1byLGNGPbYnLsk8JGFE7ZogOUrT3jFYX8ePn2wiBZNII
	'api':'https://spreadsheets.google.com/feeds/list/1byLGNGPbYnLsk8JGFE7ZogOUrT3jFYX8ePn2wiBZNII/6/public/values?alt=json',
	'agency':'สำนักงานชลประทานที่ 12','lat':null,'lng':null},
	{'station':'cpd',
	'station_name':'ท้ายเขื่อนเจ้าพระยา',//1byLGNGPbYnLsk8JGFE7ZogOUrT3jFYX8ePn2wiBZNII
	'api':'https://spreadsheets.google.com/feeds/list/1byLGNGPbYnLsk8JGFE7ZogOUrT3jFYX8ePn2wiBZNII/7/public/values?alt=json',
	'agency':'สำนักงานชลประทานที่ 12','lat':null,'lng':null},
	{'station':'rama6d',
	'station_name':'ท้ายเขื่อนพระราม 6',//1byLGNGPbYnLsk8JGFE7ZogOUrT3jFYX8ePn2wiBZNII
	'api':'https://spreadsheets.google.com/feeds/list/1byLGNGPbYnLsk8JGFE7ZogOUrT3jFYX8ePn2wiBZNII/8/public/values?alt=json',
	'agency':'สำนักงานชลประทานที่ 12','lat':null,'lng':null},
];

var convertSpreadsheet2json=function(RESTdata){
	var ent=RESTdata.feed.entry;
	var ent2=[];
	for(i=0;i<=ent.length-1;i++){
		var each_tm_data={};	
			each_tm_data['dateTime']=new Date(ent[i].gsx$sysdate.$t);
			each_tm_data['cms']=ent[i].gsx$cms.$t;
			each_tm_data['level']=ent[i].gsx$level.$t;
			ent2.push(each_tm_data);
	}
	return ent2;
};

function find_sta(station){
	var tm_q=jsonq(tm_list);
	var a=tm_q.find('station',function(v){
		return this==station;
	}).parent().value();
	if(a.length>0){
		return a[0];	
	}else{
		return null;
	}
}

 tm_api_router.get('/',function(req,res){
	 res.send('Nothing here please enter \/tm_list\/ or \/[stationname]\/');
 });
 tm_api_router.get('/tm_list',function(req,res){
	 //var document_content={'tm_list':tm_list};
	 var document_content=site_config;
	 document_content.tm_list=tm_list;
	 
	 if(req.query.type=='html'){
		 res.render('station_list.html',document_content);
	 }else{
	 	res.json(tm_list);
	 } 
 });
 
 tm_api_router.get('/station/:station_name',function(req,res){
	var request = require('request');
	var sta=find_sta(req.params.station_name),api='',mapFunction;
	if(!sta){
		api='';
		mapFunction=null;
	}else{
		api=sta.api;
		mapFunction=convertSpreadsheet2json;
	}
	
	 	request(api, function (error, response, body) {
 	  if (!error && response.statusCode == 200) {
 	  //  console.log(body) // Show the HTML for the Google homepage.
		  var resultStream=mapFunction(JSON.parse(body));
		  var result={'meta':sta,'data':resultStream};
		  res.json(result);
 	  }else{
		  res.status(204).json();
 	  }
 	});
 });

tm_api_router.get('/test',function(req,res){
	var knex = require('knex')({
	  client: 'mysql',
	  connection: {
	    host     : '119.59.120.57 ',
	    user     : 'hydroco2',
	    password : '5mv1N2Rdi7',
	    database : 'hydroco2_hydro5'
	  }
	});
	knex.select('id,stationcode').from('wq_hourly').limit(10).map(function(row) {
	  return row.stationcode;
	}).then(function(names) {
	  console.log(names);
	}).catch(function(e) {
	  console.error(e);
	});
	/*
	knex.select().from('users').limit(10).then(function(rows) {
		console.log(rows);
//	}).then(function(names) {
//	  console.log(names);
	}).catch(function(e) {
	  console.error(e);
	});
	*/
});

module.exports=tm_api_router;