var express = require( "express" ),  
    nunjucks = require( "nunjucks" ),
    path = require( "path" ),
	request = require('request'),
	jsonq=require('jsonq');
app = express();
  // var nunjucksEnv = new nunjucks.Environment( new nunjucks.FileSystemLoader( path.join( __dirname, '/public' )));
  
  
//nunjucksEnv.express( app );
nunjucks.configure('templates', {
    autoescape: true,
    express: app
});
app.use(express.static('assets_swan'));
app.use(express.static('assets_app'));

//var request = require('request');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/*
app.get('/', function(req, res){  
    res.render( "nunjucks.html", { helloworld: "Hello World"});
});*/
app.all('/', function(req, res) {
	var site_config={
		'asset_url':"http://127.0.0.1:3003/",
		'root_url':"http://127.0.0.1:3003/"
	};
  res.render('welcome.html',{test:'testAAAA'});
});
app.get(/\/(.*\.html)/, function(req, res) {
	var site_config={
		'asset_url':"http://127.0.0.1:3003/",
		'root_url':"http://127.0.0.1:3003/"
	};
  res.render(req.params[0],{test:'testAAAA'});
  console.log(req.params);
});
app.get('/test',function(req,res){
	request('http://www.google.com', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body) // Show the HTML for the Google homepage.
	  }
	});
});
var mayapiModule=require('./tm_api.js');
app.use('/tm_api',mayapiModule);
app.listen(3003);

console.log('Server running at http://127.0.0.1:3003/');  
