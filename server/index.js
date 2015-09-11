var express = require('express');
var app = express();
var fs = require('fs');
var IMG_DIR = '/images/';

app.get('/pics/random', function(req, res){
	var images = fs.readdirSync(__dirname + IMG_DIR);
	//console.log('__dirname = ' + __dirname);
	//generate random int between 0 and num images - 1
	var randomNum = Math.floor(Math.random() * images.length);
	res.sendFile(__dirname + IMG_DIR + images[randomNum], function(err){
		if(err){
			console.log(err);
		}else{
			console.log('sent filename: ', images[randomNum]);
		}
	});
});

app.get('/pics', function (req, res) {
	var images = fs.readdirSync(__dirname + IMG_DIR);
	res.json(images);
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});