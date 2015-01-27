var express = require('express');
var bodyParser = require('body-parser');
var app 	= express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var getRenderBase64 = require('./getRenderBase64');

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  /*
  
	res.header('Access-Control-Allow-Origin', 'example.com');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
   */
  next();
});

app.get('/', function (req, res) {
	try{
		var url = req.query.url;
		var img_width = req.query.width;
		var img_height = req.query.height;
		var viewHeight = req.query.viewHeight;
		var viewWidth = req.query.viewWidth;

		console.log(req.query);
		getRenderBase64(url, function(data) {
			res.end('data:image/png;base64,'+data);
		},{
			width: viewWidth - 0,
			height: viewHeight - 0
		},{
			width: img_width - 0,
			height: img_height - 0
		});
	}catch(e){
		console.log('error')
		res.end('error');
	}
})

var server = app.listen(64916, function(){
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})



