var http = require('http');
var fs = require('fs');
var spawn = require('child_process').spawn;
var child = {};

function downloadImage(){
	var request;
	if(child.hasOwnProperty('stdin')){
		//if a process is already running then close it first
		console.log('process already running, lets kill it. pid: ', child.pid);
		child.kill();
		//child.stdin.end();
		//process.kill(child.pid);
	}	
	request = http.request({
			hostname: 'localhost',
			port: 3000,
			path: '/pics/random',
			method: 'GET'
		}, function(response){
			var fileName = response.headers.image_name;
			console.log('image_name header: ', fileName);

			var file = fs.createWriteStream(__dirname + '/images/' + fileName);

			response.on('data', function(data){
				file.write(data);
			});

			response.on('end', function(a){
				console.log('request complete: ', a);
				file.end();
				child = spawn('eog', ['./images/' + fileName, '-f']);
			});
		});

	request.on('error', function(e){
		console.log('error:', e);
	});

	request.end();	
}

var loop = (function(loop){
	var interval;

	loop.start = function(){
		interval = setInterval(function(){
			downloadImage();
		}, 5000);
	}

	return loop;
}(loop || {}));

loop.start();